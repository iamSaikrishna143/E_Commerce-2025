import "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const Settings = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-center items-center gap-3 w-screen sm:w-[80vw] sm:justify-start">
      <div>
        <h2 className="text-2xl font-bold mb-3">Change Username</h2>
        <form className="grid gap-3 w-[80vw] sm:w-[30vw]">
          <Input
            type="text"
            placeholder="Enter previous username"
            name="previousUsername"
          />
          <Input
            type="text"
            placeholder="Enter mew username"
            name="newUsername"
          />
          <Button type="submit">Chnage Username</Button>
        </form>
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-3">Change Password</h2>
        <form className="grid gap-3 w-[80vw] sm:w-[30vw]">
          <Input
            type="text"
            placeholder="Enter previous password"
            name="previouspassword"
          />
          <Input
            type="text"
            placeholder="Enter mew password"
            name="newpassword"
          />
          <Button type="submit">Chnage Password</Button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
