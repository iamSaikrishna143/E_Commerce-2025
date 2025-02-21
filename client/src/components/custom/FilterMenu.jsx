import "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setProducts } from "../../redux/slices/productSlice";

const categoryData = {
  trigger: "Category",
  items: ["keyboard", "mouse", "headset"],
};
const priceData = {
  trigger: "Price",
  items: [1000, 3000, 5000, 8000],
};

const FilterMenu = () => {
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const getFilterProducts = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/get-products?category=${category}&price=${price}&search=${search}`
      );
      const data = await res.data;
      dispatch(setProducts(data.data));
    };
    getFilterProducts();
  }, [category, price, search]);

  return (
    <div className="w-[93vw] flex flex-col sm:flex-row justify-between items-center mx-auto my-10 gap-3 sm:gap-8">
      <div className="flex sm:w-[30%] w-full gap-3">
        {/* For category */}
        <Select onValueChange={(value) => setPrice(value)}>
          <SelectTrigger id={categoryData.trigger}>
            <SelectValue placeholder={categoryData.trigger} />
          </SelectTrigger>
          <SelectContent position="popper">
            {categoryData.items.map((item, index) => (
              <SelectItem key={index} value={item} className="capitalize">
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {/* ForPrice */}
        <Select onValueChange={(value) => setCategory(value)}>
          <SelectTrigger id={priceData.trigger}>
            <SelectValue placeholder={priceData.trigger} />
          </SelectTrigger>
          <SelectContent position="popper">
            {priceData.items.map((item, index) => (
              <SelectItem key={index} value={item} className="capitalize">
                Less Than {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {/* Search Input */}
      <div className="sm:w-[60%] w-full">
        <Input
          id="search"
          type="text"
          placeholder="Search Here..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </div>
  );
};

export default FilterMenu;
