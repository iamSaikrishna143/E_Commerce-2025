import "react";
import { Input } from "@/components/ui/input";
import { Button } from "../components/ui/button";
import useToast from "../hooks/use-toast";

import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserLogin } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    const username = e.target.username.value.trim();
    const password = e.target.password.value.trim();
    if (!username || !password) {
      return toast({
        title: "Please enter your username and password",
      });
    }
    try {
      const res = await axios.post("http://localhost:5000/api/admin-login", {
        username,
        password,
      });
      const data = await res.data;
      dispatch(setUserLogin(data));
      toast({
        title: data.message,
      });
      navigate("/admin/dashboard");
    } catch (error) {
      console.error(error);
      toast({
        title: "Found Somethings Error",
        variant: "destructive",
      });
    }
  };
  return (
    <div className="w-[60vw] lg:w-[25vw] mx-auto my-10 grid gap-3">
      <h1 className="text-2xl font-bold">Login into your account</h1>
      <form className="grid gap-3" onSubmit={handleLogin}>
        {/* Form fields go here */}
        <Input placeholder="Username Here..." type="text" name="username" />
        <Input placeholder="Password Here..." type="password" name="password" />

        <Button>Log In</Button>
      </form>
    </div>
  );
};

export default AdminLogin;
