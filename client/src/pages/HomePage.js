import Header from "../components/Header";
import Footer from "../components/Footer";
import AuthBox from "../components/AuthBox";
import { getAuthorization } from "../util/getAuthorization";
import { useState, useEffect } from "react";

const HomePage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const getAuth = async () => {
      console.log("Checking authentication");
      setIsAuthenticated(await getAuthorization());
    };
    getAuth();
  }, []);

  return (
    <div className="w-full h-screen flex flex-col">
      <Header />
      <div className="flex-grow flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8 px-4 md:px-8">
        <div className="text-center md:text-left md:w-1/2 md:ml-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-snug md:leading-relaxed">
            Simplify scheduling for professors and students
          </h1>
          <p className="text-xl md:text-2xl leading-relaxed md:leading-loose">
            Create, manage, and book appointments effortlessly.
          </p>
        </div>
        {!isAuthenticated && <AuthBox />}
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
