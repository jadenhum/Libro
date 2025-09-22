
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../config/config";
import apiRequest from "../util/api";

const AuthBox = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e, isLogin) => {
    e.preventDefault();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@(mcgill\.ca|mail\.mcgill\.ca)$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid McGill email address.");
      return;
    }

    setLoading(true);
    setError("");

    const requestBody = {
      email,
      password,
    };

    const url = isLogin ? config.login : config.members;
    const method = "POST";

    try {
      const response = await apiRequest(url, {
        method,
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(`${isLogin ? "Login" : "Registration"} successful`, data);

        if (!isLogin) {
          // Automatically log in after successful registration
          const loginResponse = await apiRequest(config.login, {
            method: "POST",
            body: JSON.stringify({ email, password }),
          });

          const loginData = await loginResponse.json();

          if (loginResponse.ok) {
            document.cookie = `session=${loginData.token}`;
            navigate("/dashboard", { state: { memberId: loginData.id } });
          } else {
            setError(
              "Registration successful, but login failed. Please try to log in manually."
            );
          }
        } else {
          document.cookie = `session=${data.token}`;
          navigate("/dashboard", { state: { memberId: data.id } });
        }
      } else {
        if (data.message.includes("E11000 duplicate key error collection")) {
          setError("Member with email already exists. Please Login.");
        } else {
          setError(
            data.message ||
              `${isLogin ? "Login" : "Registration"} failed. Please try again.`
          );
        }
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
      <form className="space-y-4" onSubmit={(e) => handleSubmit(e, true)}>
        <div>
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="text-red-600">{error}</p>}
        <div className="flex space-x-4">
          <button
            type="submit"
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-400"
            disabled={loading}
            onClick={(e) => handleSubmit(e, true)}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-400"
            disabled={loading}
            onClick={(e) => handleSubmit(e, false)}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthBox;
