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

const CartDrawer = () => {
//   let cartItems = [
//     { id: 1, name: "Product 1", price: 100, quantity: 2 },
//     { id: 2, name: "Product 2", price: 200, quantity: 2 },
//     { id: 3, name: "Product 3", price: 300, quantity: 2 },
//   ];
  const totalQuantity = 5;
  const totalPrice = 5;

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
          <DrawerFooter>
            <Button>Checkout</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CartDrawer;
