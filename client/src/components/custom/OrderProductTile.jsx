import "react";

const OrderProductTile = () => {
  return (
    <div className="flex justify-between items-start sm:items-center p-3 rounded-lg bg-gray-100 dark:bg-zinc-900">
      <div className="flex flex-row items-center gap-2">
        <img
          className="w-20 sm:w-24 rounded-lg"
          src="https://techienize.com/wp-content/uploads/2017/06/gionee-m6-S-plus.jpg"
          alt="Product"
        />
        <div className="grid sm:gap-1">
          <h1 className="text-sm font-semibold sm:text-base">new Keyboard</h1>
          <p className="flex flex-col sm:flex-row sm:gap-2 text-gray-500 dark:text-customGray text-xs sm:text-sm my-0">
            <span className="font-semibold">
              Color :{" "}
              <span style={{ backgroundColor: "#ffffff" }}>#FFFFFF</span>
            </span>
            <span className="hidden sm:block">|</span>
            <span className="font-semibold">
              Qty :{" "}
              <span className="font-medium text-custumYellow">2</span>
            </span>
            <span className="hidden sm:block">|</span>
            <span className="font-semibold">
              Price :{" "}
              <span className="font-medium text-custumYellow">₹ 5000</span>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderProductTile;
