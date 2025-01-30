import "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/custom/Navbar";
import { ThemeProvider } from "@/components/provider/theme-provider";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Navbar />
          <Home />
        </>
      ),
    },
  ]);
  return (
    <>
    <ThemeProvider>

      <RouterProvider router={router} />
    </ThemeProvider>
      {/* <h1 className="text-3xl font-bold underline">Hello world!</h1> */}
    </>
  );
};

export default App;
