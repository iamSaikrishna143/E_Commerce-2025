import "react";
import { Input } from "@/components/ui/input";
import { Button } from "../components/ui/button";

const AdminLogin = () => {
  return (
    <div className="w-[60vw] lg:w-[25vw] mx-auto my-10 grid gap-3">
      <h1 className="text-2xl font-bold">Login into your account</h1>
      <form className="grid gap-3">
        {/* Form fields go here */}
        <Input placeholder="Username Here..." type="text" name="username" />
        <Input placeholder="Password Here..." type="password" name="password" />

        <Button>Log In</Button>
      </form>
    </div>
  );
};

export default AdminLogin;
