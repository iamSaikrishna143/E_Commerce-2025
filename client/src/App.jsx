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
import { store } from "./redux/store";
import MyOrder from "./pages/MyOrder";
import { Toaster } from "./components/ui/toaster";
import ProtectedRoute from "./components/custom/ProtectedRoute";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <RootLayouts children={<Home />} />
        </ProtectedRoute>
      ),
    },
    {
      path: "/signup",
      element: (
        <ProtectedRoute>
          <RootLayouts children={<Signup />} />
        </ProtectedRoute>
      ),
    },
    {
      path: "/login",
      element: (
        <ProtectedRoute>
          <RootLayouts children={<Login />} />
        </ProtectedRoute>
      ),
    },
    {
      path: "/product/:productName",
      element: <RootLayouts children={<Product />} />,
    },
    {
      path: "/checkout",
      element: (
        <ProtectedRoute>
          <RootLayouts children={<Checkout />} />
        </ProtectedRoute>
      ),
    },
    {
      path: "/orders",
      element: (
        <ProtectedRoute>
          <RootLayouts children={<MyOrder />} />
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin/login",
      element: (
        // <ProtectedRoute>
          <RootLayouts children={<AdminLogin />} />
        // </ProtectedRoute>
      ),
    },
    {
      path: "/admin/dashboard",
      element: (
        <ProtectedRoute>
          <AdminLayout children={<CreateProducts />} />
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin/dashboard/all-products",
      element: (
        <ProtectedRoute>
          <AdminLayout children={<AllProducts />} />
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin/dashboard/orders",
      element: (
        <ProtectedRoute>
          <AdminLayout children={<Orders />} />
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin/dashboard/analytics",
      element: (
        <ProtectedRoute>
          <AdminLayout children={<Analytics />} />
        </ProtectedRoute>
      ),
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
          <Toaster />
          <RouterProvider router={router} />
        </Provider>
      </ThemeProvider>
      {/* <h1 className="text-3xl font-bold underline">Hello world!</h1> */}
    </>
  );
};

export default App;
