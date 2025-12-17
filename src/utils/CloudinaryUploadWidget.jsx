import React, { useEffect } from "react";
import { Button } from "react-bootstrap";

const CLOUDNAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOADPRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

// CloudinaryUploadWidget.jsx

// ... 생략 ...

const CloudinaryUploadWidget = ({ uploadImage }) => {
    useEffect(() => {
      let widget = null;
      const btn = document.getElementById("upload_widget");
  
      function initWidget() {
        // 위젯을 한 번만 생성합니다.
        widget = window.cloudinary.createUploadWidget(
          {
            cloudName: CLOUDNAME,
            uploadPreset: UPLOADPRESET,
          },
          (err, result) => {
            if (!err && result && result.event === "success") {
              console.log("Uploaded:", result.info.secure_url);
              // 이미지는 NewItemDialog에서 관리하므로 document.getElementById("uploadedimage")는 제거해도 됩니다.
              uploadImage(result.info.secure_url);
            }
          }
        );
  
        // 이벤트 리스너를 한 번만 연결하는 함수
        const openWidget = () => widget.open();
        btn.addEventListener("click", openWidget, false);
        
        // 클린업 함수: 컴포넌트가 언마운트되거나 useEffect가 다시 실행될 때 리스너를 제거합니다.
        return () => {
            btn.removeEventListener("click", openWidget, false);
        };
      } // initWidget 끝
  
      // ... 스크립트 로드 로직 (initWidget 호출) ...
      if (!window.cloudinary) {
        const script = document.createElement("script");
        script.src = "https://widget.cloudinary.com/v2.0/global/all.js";
        script.async = true;
        script.onload = () => initWidget();
        document.body.appendChild(script);
        
        return () => { // 스크립트 제거 (선택 사항이지만 안전함)
            document.body.removeChild(script);
        }
      } else {
        return initWidget();
      }
  
    }, []); // 🌟 의존성 배열을 비워서 마운트 시 한 번만 실행되게 합니다.
             // uploadImage는 useCallback으로 안정화되었으므로 배열에서 제외해도 안전합니다.
    
    return <Button id="upload_widget">Upload Image +</Button>;
  };
  
  export default CloudinaryUploadWidget;