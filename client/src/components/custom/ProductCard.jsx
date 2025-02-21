/* eslint-disable react/prop-types */
import "react";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import LinkButton from "./LinkButton";
import { startsGenerator } from "../../contants/helper";

const ProductCard = ({
  name = "Product title",
  price = 2000,
  rating = 4,
  image = {
    url: "https://tse3.mm.bing.net/th?id=OIP.I_a_EfKR6Yc1TfZ7X8Ji4AHaE8&pid=Api&P=0&h=180",
    id: "1254",
  },
}) => {
  return (
    <div className="relative border w-fit overflow-clip grid z-1 hover:shadow-md rounded-xl">
      <img
        src={image.url}
        alt={name}
        className="object-cover w-[30rem] h-[20rem]"
      />
      <div className="px-3 grid gap-1 py-2 absolute bg-white dark:bg-zinc-900 w-full bottom-0 translate-y-[3rem] hover:translate-y-0 transform transition-all ease-in-out rounded-xl duration-300">
        <h2>{name}</h2>
        <div className="flex justify-between">
          <div className="flex">{startsGenerator(rating)}</div>
          <span>₹{price}</span>
        </div>
        {/* <Link to={`/product/${image.id}`} className="inline-block">
          <Button>View Product</Button>
        </Link> */}
        <LinkButton to={`/product/${name.split(" ").join("-")}`} text="View product" />
      </div>
    </div>
  );
};

export default ProductCard;
