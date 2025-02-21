import "react";
import OrderData from "../components/custom/OrderData";

const MyOrder = () => {
  return (
    <div className="w-[90vw] lg:w-[50vw] mx-auto my-10 sm:my-32 grid gap-3">
      <h1 className="text-2xl font-bold">My Orders</h1>
      <div className="grid gap-3">
        <OrderData />
      </div>
    </div>
  );
};

export default MyOrder;
