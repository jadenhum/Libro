import * as React from "react";
import { createBrowserRouter, RouterProvider, Outlet, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BookViaURLPage from "./pages/BookViaURLPage";
import Dashboard from "./pages/Dashboard";
import CreateBookingPage from "./pages/CreateBookingPage";
import ViewBookingPage from "./pages/ViewBookingPage";
import { CreatePoll } from "./pages/CreatePoll";
import { ViewPolls } from "./pages/ViewPolls";
import { PollPage } from "./pages/PollPage";
import { TestPage } from "./pages/TestPage";
import { ReserveMeetingPage } from "./pages/ReserveMeetingPage";
import { LogoutPage } from "./pages/LogoutPage";
import { SelectBookingPage } from "./pages/SelectBookingPage";
import LoginPage from "./pages/LoginPage"; // Import the LoginPage
import "./index.css";
import { getAuthorization } from "./util/getAuthorization";
import ViewStudentAppointments from "./pages/ViewStudentAppointments";
import RequestAltBookingPage from "./pages/RequestAltBookingPage";
import AppointmentsPortal from "./pages/AppointmentsPortal";
import BookingsPortal from "./pages/BookingsPortal";

const App = () => {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <Outlet />
    </div>
  );
};

const ProtectedRoute = () => {
  //check if user is authenticated
  // To be used as a global state > React Context
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const getAuth = async () => {
      console.log("Checking authentication");
      setIsAuthenticated(await getAuthorization());
      setIsLoading(false);
    };
    getAuth();
  }, []);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!isAuthenticated) {
    //if not authenticated, redirect to home
    return <Navigate to="/" replace />;
  }

  return (
    <div className="w-full min-h-screen flex flex-col">
      <Outlet />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          //Protected routes
          {
            path: "/dashboard",
            element: <Dashboard />,
          },
          {
            path: "/create-booking",
            element: <CreateBookingPage />,
          },
          {
            path: "/create-poll",
            element: <CreatePoll />,
          },
          {
            path: "/view-polls",
            element: <ViewPolls />,
          },
          {
            path: "/view-booking/:bookingId",
            element: <ViewBookingPage />,
          },
          {
            path: "/logout",
            element: <LogoutPage />,
          },
        ],
      },
      {
        element: <App />,
        children: [
          //Public routes
          {
            path: "/",
            element: <HomePage />,
          },
          {
            path: "/book",
            element: <BookingsPortal />,
          },
          {
            path: "/book/:url",
            element: <BookViaURLPage />,
          },
          {
            path: "/book/:meetingId/:dateparam",
            element: <ReserveMeetingPage />,
          },
          {
            path: "/book/requestAltBooking/:bookingID",
            element: <RequestAltBookingPage />,
          },
          {
            path: "/poll/:pollUrl",
            element: <PollPage />,
          },
          {
            path: "/appointments/:studentCode",
            element: <ViewStudentAppointments />,
          },
          {
            path: "/appointments",
            element: <AppointmentsPortal />,
          },
          {
            path: "/mytest",
            element: <TestPage />,
          },
          {
            path: "/login", // Add the login route
            element: <LoginPage />,
          },
        ],
      },
    ],
  },
  {
    // NotFound
    path: "*",
    element: <h1>404 Not Found</h1>,
  },
]);

export default function Root() {
  return <RouterProvider router={router} />;
}
