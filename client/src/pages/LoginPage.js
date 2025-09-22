import React from "react";
import AuthBox from "../components/AuthBox";
import Header from "../components/Header";
import Footer from "../components/Footer";

const LoginPage = () => {
  return (
    <div className="w-full h-screen flex flex-col">
      <Header />
      <div className="flex-grow flex flex-col items-center justify-center space-y-4">
        <h1 className="text-4xl font-bold text-center mb-4">
          Welcome to Libro
        </h1>
        <AuthBox />
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
