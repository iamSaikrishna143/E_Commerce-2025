import "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Success = () => {
  const [count, setCount] = useState(5);
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  setTimeout(() => {
    window.location.href = "/";
  }, 3000);
  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen">
      <h1 className="text-3xl sm:text-4xl font-bold">Payment Sucessfull</h1>
      <Link to={"/"} className="underline text-sm sm:text-lg">
        Clear to Home (redirecting you in {count} seconds)
      </Link>
    </div>
  );
};

export default Success;
