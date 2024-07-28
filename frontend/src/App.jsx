import "./App.css";
import Inbox from "./components/Inbox";

import Mail from "./components/Mail";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Body from "./components/Body";
import SendEmail from "./components/SendEmail";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { Toaster } from "react-hot-toast";

function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Body />, // Replaced Body with Inbox
      children: [
        {
          path: "/",
          element: <Inbox />,
        },
        {
          path: "/mail/:id",
          element: <Mail />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
  ]);

  return (
    <div className="bg-[#F6F8FC] h-screen">
      <RouterProvider router={appRouter} />
      <div className="absolute w-[30%] bottom-0 right-20 z-10 ">
        <SendEmail />
      </div>
      <Toaster />
    </div>
  );
}

export default App;
