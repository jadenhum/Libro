
import { useEffect } from "react";
import config from "../config/config";
import apiRequest from "./api";

// Call this function whenever the client tries to access a private page (authorization)
// It is a synchronous post request using a JWT token stored in cookie
// Cookie is set by AuthBox.js upon successful login (authentication)
// It queries authorizeUser in member.route.js in the server

// Pre-condition - no requirements, must be connected to server
// Post-condition - returns true or false depending if auth successful
async function getAuthorization() {
  const cookies = document.cookie.split("; ").reduce((acc, cookie) => {
    const [name, value] = cookie.split("=");
    acc[name] = value;
    return acc;
  }, {});

  const token = cookies.session;

  var isAuth = false;
  console.log(token);

  const myobj = { token: token };
  const method = "POST";
  const url = config.authorization;

  try {
    const response = await apiRequest(url, {
      method,
      body: JSON.stringify(myobj),
    });

    const data = await response.json();

    if (response.ok) {
      if (response.status === 200) {
        isAuth = true;
        console.log("authentication good");
      } else {
        console.log("auth bad: " + response.status);
      }
    } else {
      console.log("auth bad: " + response.status);
    }
  } catch (error) {
    console.log(error);
  } finally {
    console.log("done");
  }

  return isAuth;
}

export { getAuthorization };
