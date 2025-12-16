import React, { useEffect } from "react";
import { Button } from "react-bootstrap";

const CLOUDNAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOADPRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const CloudinaryUploadWidget = ({ uploadImage }) => {
  useEffect(() => {
    // window.cloudinary 존재 여부 확인
    if (!window.cloudinary) {
      const script = document.createElement("script");
      script.src = "https://widget.cloudinary.com/v2.0/global/all.js";
      script.async = true;
      script.onload = () => initWidget();
      document.body.appendChild(script);
    } else {
      initWidget();
    }

    function initWidget() {
      const widget = window.cloudinary.createUploadWidget(
        {
          cloudName: CLOUDNAME,
          uploadPreset: UPLOADPRESET,
        },
        (err, result) => {
          if (!err && result && result.event === "success") {
            console.log("Uploaded:", result.info.secure_url);
            const imgEl = document.getElementById("uploadedimage");
            if (imgEl) imgEl.src = result.info.secure_url;
            uploadImage(result.info.secure_url);
          }
        }
      );

      const btn = document.getElementById("upload_widget");
      btn.addEventListener("click", () => widget.open(), false);
    }
  }, [uploadImage]);

  return <Button id="upload_widget">Upload Image +</Button>;
};

export default CloudinaryUploadWidget;
