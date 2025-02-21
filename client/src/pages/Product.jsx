import "react";
import { startsGenerator } from "../contants/helper";
import { Circle, Minus, Plus } from "lucide-react";
import { Colors } from "../contants/colors";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "../components/ui/button";
import ReviewsComponent from "../components/custom/ReviewsComponent";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import useToast from "../hooks/use-toast";
import { addToCart } from "../redux/slices/cartSlice";

const imageArray = [
  {
    url: "https://tse2.mm.bing.net/th?id=OIP.B8P5nnc41g_vIddPtUXorgHaE8&pid=Api&P=0&h=180",
    id: 1,
  },
  {
    url: "https://tse2.mm.bing.net/th?id=OIP.B8P5nnc41g_vIddPtUXorgHaE8&pid=Api&P=0&h=180",
    id: 2,
  },
  {
    url: "https://tse2.mm.bing.net/th?id=OIP.B8P5nnc41g_vIddPtUXorgHaE8&pid=Api&P=0&h=180",
    id: 3,
  },
  {
    url: "https://tse2.mm.bing.net/th?id=OIP.B8P5nnc41g_vIddPtUXorgHaE8&pid=Api&P=0&h=180",
    id: 14,
  },
];
const productStock = 10;

const Product = () => {
  const { productName } = useParams();
  console.log(productName);
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const {toast} = useToast();
  const dispatch = useDispatch();

  const [productQuantity, setProductQuantity] = useState(1);
  const [pincode, setPincode] = useState("");
  const [availabilityMessage, setAvailabilityMessage] = useState("");
  const [purchaseProduct, setPurchaseProduct] = useState(false);
  const [address, setAddress] = useState("");
  const [product, setProduct] = useState({});
  const [selectedImage, setSelectedImage] = useState(0);
  const [productColor, setProductColor] = useState("");

  useEffect(() => {
    const fetchProductByName = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/get-product-by-name/${productName
            ?.split("-")
            .join()}`
        );
        const { data } = await res.data;
        setProduct(data);
        console.log(product);
      } catch (e) {
        // handle error
        console.error(e);
      }
    };
    fetchProductByName();
  }, [productName]);

  const calculateEMI = (price) => Math.round(price / 6);
  const checkAvailability = async () => {
    if (pincode.trim() === "") {
      setAvailabilityMessage("Please enter your pincode");
      return;
    }
    const res = await axios.get(
      `http://localhost:5000/api/get-pincodes/${pincode}`
    );
    const data = await res.data;
    setAvailabilityMessage(data.message);
    console.log(data.message);
  };
  const handleAddTocart = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    if (productColor == "") {
      toast({
        title: "Please select a color",
      });
      return;
    }
    dispatch(
      addToCart({
        _id: product._id,
        name: product.name,
        price: product.price,
        quantity: productQuantity,
        color: productColor,
        image: product.images[0].url,
        stock: product.stock,
      })
    );
    setProductQuantity(1);
    toast({
      title: "Product added to cart",
    });
  };
  return (
    <>
      <div>
        <main className="w-[93vw] lg:w-[70vw] flex flex-col sm:flex-row justify-start items-start gap-10 mx-auto my-10">
          {/* Left Side */}
          <div className="grid sm:w-[50%] gap-3">
            <img
              src={product?.images?.[selectedImage]?.url}
              alt="Product Image"
              className="w-full lg:h-[30rem] rounded-xl object-center object-cover border dark:border-none"
            />
            <div className="grid grid-cols-4 gap-3">
              {product?.images?.map(({ url, id }, index) => (
                <img
                  key={id}
                  src={url}
                  alt="pro"
                  onClick={() => setSelectedImage(index)}
                  className="rounded-xl hover:brightness-50 cursor-pointer transition-all ease-in-out duration-300 border dark:border-none"
                />
              ))}
            </div>
          </div>
          {/* Right Side */}
          <div className="sm:w-[50%] lg:w-[30%]">
            <div className="pb-5">
              <h2 className="font-extrabold text-2xl">{product?.name}</h2>
              <p className="text-sm my-2">{product?.description}</p>
              <div className="flex items-center">
                {startsGenerator(product.rating, "0", 15)}
                <span className="text-md ml-1">
                  ({product?.reviews?.length})
                </span>
              </div>
            </div>
            <div className="py-5 border-l border-b">
              <h3 className="font-bold text-xl">
                Rs.{product.price} or Rs.{calculateEMI(product.price)}/month
              </h3>
              <p className="text-sm">
                Suggested payments with 6 months special financing
              </p>
            </div>
            <div className="py-5 border-b">
              <h3 className="font-bold text-lg">Choose Color</h3>
              <div className="flex items-center my-2">
                {product?.colors?.map((color, index) => (
                  <Circle
                    key={index + color}
                    fill={color}
                    strokeOpacity={0.2}
                    strokeWidth={0.2}
                    size={40}
                    onClick={() => setProductColor(color)}
                    className="cursor-pointer filter hover:brightness-50"
                  />
                ))}
              </div>
            </div>
            <div className="py-5">
              <div className="flex gap-3 items-center">
                <div className="flex items-center gap-5 bg-gray-100 rounded-full px-3 py-2 w-fit">
                  <Minus
                    stroke={Colors.customGray}
                    cursor={"pointer"}
                    onClick={() =>
                      setProductQuantity((qty) => (qty > 1 ? qty - 1 : 1))
                    }
                  />
                  <span className="text-slate-950">{productQuantity}</span>
                  <Plus
                    stroke={Colors.customGray}
                    cursor={"pointer"}
                    onClick={() =>
                      setProductQuantity((qty) =>
                        qty < productStock ? qty + 1 : qty
                      )
                    }
                  />
                </div>
                {product.stock - productQuantity > 0 && (
                  <div className="grid text-sm font-semibold text-gray-600">
                    <span>
                      Only{" "}
                      <span className="text-custumYellow">
                        {product.stock - productQuantity} items
                      </span>{" "}
                      left!
                    </span>
                    <span>Don;t miss it</span>
                  </div>
                )}
              </div>
              <div className="grid gap-3 my-5">
                <div className="flex gap-3">
                  <Input
                    placehokder="Enter Your Pincode here"
                    onChange={(e) => setPincode(e.target.value)}
                  />
                  <Button onClick={checkAvailability}>
                    Check Availability
                  </Button>
                </div>
                <p className="text-sm px-2">{availabilityMessage}</p>
              </div>
              <div className="flex gap-3">
                <Button onClick={() => setPurchaseProduct(true)}>
                  Buy Now
                </Button>
                <Button variant="outline" onClick={handleAddTocart}>
                  Add to cart
                </Button>
              </div>
              {purchaseProduct && (
                <div className="my-2 space-y-2">
                  <Input
                    placeholder="Enter your addredd here..."
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <Button>Confirm Order</Button>
                </div>
              )}
            </div>
          </div>
        </main>
        {/* Review Section */}
        <ReviewsComponent />
      </div>
    </>
  );
};

export default Product;
