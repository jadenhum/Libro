import { useEffect, useState } from "react";
import NavLinks from "./NavLinks";

const Header = () => {
  const [isMobile, setIsMobile] = useState(false);

  window.addEventListener("resize", () => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  });

  // Check if the window is mobile on load
  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, []);

  return !isMobile ? ( //Not mobile
    <header className="w-full flex justify-between items-center mb-6 bg-red-600 p-4 h-25 shadow">
      <img
        src={require("../assets/logo.svg").default}
        alt="logo"
        className="w-12 h-12 bg-white border-white border-2 rounded absolute ml-1 mt-1 mb-16 left-0 top-0"
      />
      <h1 className="text-2xl font-bold text-white ml-12 absolute">Libro</h1>
      <NavLinks />
    </header>
  ) : (
    //Mobile
    <header className="w-full mb-6 bg-red-600 p-4 h-25 shadow">
      <div className="flex flex-col justify-center items-center">
        <div className="flex items-center justify-center mb-3">
          <img
            src={require("../assets/logo.svg").default}
            alt="logo"
            className="w-12 h-12 bg-white border-white border-2 rounded"
          />
          <h1 className="text-3xl font-bold text-white align-center ml-2">Libro</h1>
        </div>
        <NavLinks />
      </div>
    </header>
  );
};

export default Header;
