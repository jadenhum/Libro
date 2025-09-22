
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const LogoutPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    //erase JWT cookie and reload page
    document.cookie = "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    console.log("Logged out");
    window.location.reload();
  };

  return (
    <div className="w-full h-screen flex flex-col">
      <Header />
      <div className="flex-grow flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
        <div className="bg-white p-6 rounded shadow-lg mx-5">
          <p className="block text-gray-700 text-center text-xl font-bold">Are you sure you want to log out?</p>

          <div className="flex space-x-4 flex-start mt-5">
            <div
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-400 hover:cursor-pointer"
              onClick={() => navigate("/dashboard")}
            >
              {" "}
              No
            </div>
            <div
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-gray-400 hover:cursor-pointer"
              onClick={handleLogout}
            >
              {" "}
              Yes
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export { LogoutPage };
