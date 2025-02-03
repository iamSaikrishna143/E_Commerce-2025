import { Input } from "@/components/ui/input";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
        <div className="w-[60vw] lg:w-[25vw] mx-auto my-10 grid gap-3">
        <h1 className="text-2xl font-bold">Login into your account</h1>
        <form className="grid gap-3">
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
  )
}

export default Login