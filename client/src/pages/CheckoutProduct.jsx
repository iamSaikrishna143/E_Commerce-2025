import "react";
import { Colors } from "../contants/colors";

const CheckoutProduct = (
  name = "pumashoes",
  price = 200,
  quantity = 2,
  image = {
    url: "https://rukminim2.flixcart.com/image/416/416/xif0q/shoe/i/h/j/-original-imagyxqzyyfe6fps.jpeg?q=70&crop=false",
  },
  color = Colors.custumYellow
) => {
  return (
    <div className="flex justify-between items-start p-3 rounded-lg bg-gray-100 dark:bg-zinc-900">
      <div className="flex flex-row items-center gap-2">
        <img src={image.url} alt={name} className="w-20 sm:w-24 rounded-lg" />
        <div className="grid sm:gap-1">
          <h1 className="font-semibold text-sm sm:text-base">
            Custom Designed Keyboard
          </h1>
          <p className="flex flex-col sm:flex-row sm:gap-2 text-gray-500 dark:text-customGray text-xs sm:text-sm my-0">
            <span className="font-semibold">
              Color: <span style={{ backgroundColor: color }}>{color}</span>
            </span>
            <span className="hidden sm:block">|</span>
            <span>
              Qty: <span className="font-medium ">{quantity}</span>{" "}
            </span>
            <span className="hidden sm:block">|</span>
            <span>
              Price :  {" "}<span className="font-medium ">₹599</span> {" "}
            </span>
          </p>
        </div>
      </div>
    </div>
 
  );
};

export default CheckoutProduct;
