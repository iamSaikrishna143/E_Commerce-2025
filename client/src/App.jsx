/* eslint-disable react/no-children-prop */
import "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import { ThemeProvider } from "@/components/provider/theme-provider";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Product from "./pages/Product";
import Checkout from "./pages/Checkout";
import AdminLogin from "./pages/AdminLogin";
import Error from "./pages/Error";
import Success from "./pages/Success";
import RootLayouts from "./layouts/RootLayouts";
import AdminLayout from "./layouts/AdminLayout";
import AllProducts from "./components/custom/AllProducts";
import CreateProducts from "./components/custom/CreateProducts";
import Orders from "./components/custom/Orders";
import Analytics from "./components/custom/Analytics";
import Settings from "./components/custom/Settings";
import { Provider } from "react-redux";
import {store} from "./redux/store";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayouts children={<Home />} />,
    },
    {
      path: "/signup",
      element: <RootLayouts children={<Signup />} />,
    },
    {
      path: "/login",
      element: <RootLayouts children={<Login />} />,
    },
    {
      path: "/product",
      element: <RootLayouts children={<Product />} />,
    },
    {
      path: "/checkout",
      element: <RootLayouts children={<Checkout />} />,
    },
    {
      path: "/admin/login",
      element: <RootLayouts children={<AdminLogin />} />,
    },
    {
      path: "/admin/dashboard",
      element: <AdminLayout children={<CreateProducts />} />,
    },
    {
      path: "/admin/dashboard/all-products",
      element: <AdminLayout children={<AllProducts />} />,
    },
    {
      path: "/admin/dashboard/orders",
      element: <AdminLayout children={<Orders />} />,
    },
    {
      path: "/admin/dashboard/analytics",
      element: <AdminLayout children={<Analytics />} />,
    },
    {
      path: "/admin/dashboard/settings",
      element: <AdminLayout children={<Settings />} />,
    },
    {
      path: "/*",
      element: (
        <>
          <Error />
        </>
      ),
    },
    {
      path: "/success",
      element: (
        <>
          <Success />
        </>
      ),
    },
  ]);
  return (
    <>
      <ThemeProvider>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </ThemeProvider>
      {/* <h1 className="text-3xl font-bold underline">Hello world!</h1> */}
    </>
  );
};

export default App;
