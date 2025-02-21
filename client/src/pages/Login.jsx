import { Input } from "@/components/ui/input";
import { Button } from "../components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import useToast from "../hooks/use-toast";
import axios from "axios";

import { useDispatch } from "react-redux";
import { setUserLogin } from "../redux/slices/authSlice";

const Login = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;
    if (email.value.trim() === "" || password.value.trim() === "") {
      toast({
        title: "Please fill all the fields",
        variant: "destructive",
      });
    }
    try {
      const res = await axios.post("http://localhost:5000/api/login", {
        email: email.value,
        password: password.value,
      });
      const data = await res.data;
      dispatch(setUserLogin(data));
      toast({
        title: data.message,
        variant: "success",
      });
      navigate("/");
    } catch (e) {
      console.log(e.message);

      toast({
        title: "An error occurred",
        variant: "destructive",
      });
    }
  };
  return (
    <>
      <div className="w-[60vw] lg:w-[25vw] mx-auto my-10 grid gap-3">
        <h1 className="text-2xl font-bold">Login into your account</h1>
        <form className="grid gap-3" onSubmit={handleSubmit}>
          {/* Form fields go here */}
          <Input placeholder="Enter Your Email" type="email" name="email" />
          <Input
            placeholder="Enter Your Passowrd"
            type="password"
            name="password"
          />

          <Button>Sign Up</Button>
          <div className="flex gap-2 items-center">
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Don't have an account?
            </label>
            <Link to={"/signup"}>
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                Signup
              </label>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
