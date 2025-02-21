import "react";
import {
  Drawer,
  //   DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useSelector } from "react-redux";

const CartDrawer = () => {

  const { cartItems, totalQuantity, totalPrice } = useSelector(
    (state) => state.cart
  );

  return (
    <>
      <Drawer>
        <DrawerTrigger className="relative">
          {totalQuantity > 0 && (
            <Badge className={`absolute px-1 py-0`}>{totalQuantity}</Badge>
          )}
          <ShoppingCart
            strokeWidth={1.3}
            size={28}
            className="text-gray-800 dark:text-white hover:scale-150 transition-all cursor-pointer ease-in-out"
          />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Are you absolutely sure?</DrawerTitle>
            <DrawerDescription>
              Total Items : {totalQuantity}, Total Price: ₹ {totalPrice}
            </DrawerDescription>
          </DrawerHeader>
          <div className="flex flex-col sm:flow-row justify-start gap-3 h-[70vh] overflow-y-scroll sm:overflow-y-scroll sm:h-auto mx-3">
            {/* {
              cartItems.length ===0 ? <h2 className="text-primary text-3xl">Nothing To Show, Please Add some products</h2>:
              cartItems.map((item, index) => (

              ))
            } */}
          </div>
          <DrawerFooter>
            <Button>Checkout</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CartDrawer;
