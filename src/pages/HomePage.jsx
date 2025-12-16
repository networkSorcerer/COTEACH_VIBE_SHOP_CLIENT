import { useEffect, useState } from "react";
import { getMe } from "../api/auth.js";
import HomeNavbar from "../components/home/HomeNavbar.jsx";
import HeroLink from "../components/home/HeroLink.jsx";
import FeatureBanners from "../components/home/FeatureBanners.jsx";

function HomePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    getMe()
      .then((data) => setUser(data))
      .catch(() => {
        localStorage.removeItem("token");
        setUser(null);
      });
  }, []);

  const isAdmin = user?.user_type === "admin";

  const featureBanners = [
    {
      title: "시선을 멈추는 지배자들",
      href: "https://www.nike.com/kr/w/football-lifestyle-7n4yn",
      image:
        "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1600&q=80",
    },
    {
      title: "르브론 XXIII ‘STOCKING STUFFER’ 컬러웨이",
      href:
        "https://www.nike.com/kr/basketball/lebron-james/lebron-xxiii-stocking-stuffer",
      image:
        "https://static.nike.com/a/images/f_auto,cs_srgb/w_1920,c_limit/4a7d8144-c073-42a5-8d9d-b9827750739f/%EB%A5%B4%EB%A1%A0-xxiii-%E2%80%98stocking-stuffer%E2%80%99-%EC%BB%AC%EB%9F%AC%EC%9B%A8%EC%9D%B4.jpg",
    },
  ];

  return (
    <div className="page page-home">
      <HomeNavbar user={user} isAdmin={isAdmin} />

      <HeroLink
        href="https://www.nike.com/kr/w/lifestyle-13jrmz37eefz7yfb"
        title="스포츠로 완성하는 스타일"
        eyebrow="JUST DO IT."
        subtitle={
          <>
            라이프스타일과 퍼포먼스를 동시에.
            <br />
            지금 바로 나이키 컬렉션을 만나보세요.
          </>
        }
      />

      <FeatureBanners banners={featureBanners} />
    </div>
  );
}

export default HomePage;
