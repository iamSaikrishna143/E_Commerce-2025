import "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "../components/ui/button";
import { useState } from "react";
import useToast from "../hooks/use-toast";
import axios from "axios";

const Signup = () => {
  const [enabled, setEnabled] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, phone, password } = e.target.elements;
    if (
      name.value.trim() == "" ||
      email.value.trim() == "" ||
      phone.value.trim() == "" ||
      password.value.trim() == ""
    ) {
      toast({
        title: "Please fill all the fields",
        variant: "destructive",
      });
    }
    try {
      const res = await axios.post("http://localhost:5000/api/signup", {
        name: name.value,
        email: email.value,
        phone: phone.value,
        password: password.value,
      });
      console.log(res);

      const data = await res.data;
      toast({
        title: data.message,
        variant: "success",
      });
      navigate("/login");
    } catch (error) {
      console.log(error);

      toast({
        title: "Please try again differnet email",
        variant: "destructive",
      });
    }
  };
  return (
    <>
      <div className="w-[60vw] lg:w-[25vw] mx-auto my-10 grid gap-3">
        <h1 className="text-2xl font-bold">Register your account</h1>
        <form className="grid gap-3" onSubmit={handleSubmit}>
          {/* Form fields go here */}
          <Input placeholder="Enter Your Name" type="text" name="name" />
          <Input placeholder="Enter Your Email" type="email" name="email" />
          <Input placeholder="Enter Your Phone" type="tel" name="phone" />
          <Input
            placeholder="Enter Your Passowrd"
            type="password"
            name="password"
          />
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" onCheckedChange={(e) => setEnabled(e)} />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Accept terms and conditions
            </label>
          </div>
          <Button disabled={!enabled}>Sign Up</Button>
          <div className="flex gap-2 items-center">
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Already have an account?
            </label>
            <Link to={"/login"}>
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                Login
              </label>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;
