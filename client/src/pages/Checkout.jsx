import "react";
import CheckoutProduct from "./CheckoutProduct";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const Checkout = () => {
  return (
    <div className="mx-auto w-[90vw] sm:w-[60vw] flex justify-between text-center sm:my-20">
      <div className="flex flex-col sm:flex-row gap-5 mx-auto my-10">
        {/* Product Section */}
        <div className="space-y-8">
          <div className="p-4 space-y-4">
            <h2 className="text-xl font-medium">Order Summary</h2>
            <div className="space-y-1 text-3xl">
              <CheckoutProduct />
            </div>
            <hr />
            <div className="p-3 rounded-md">
              <p className="flex justify-between items-center">
                <span className="font-semibold text-customGray">Subtotal:</span>
                <span className="font-bold">₹599</span>
              </p>
              <p className="flex justify-between items-center">
                <span className="font-semibold text-customGray">Tax:</span>
                <span className="font-bold">₹0</span>
              </p>
              <p className="flex justify-between items-center">
                <span className="font-semibold text-customGray">Shipping:</span>
                <span className="font-bold">₹0</span>
              </p>
            </div>
            <hr />
            <p className="flex justify-between items-center">
              <span className="font-semibold text-customGray">Total:</span>
              <span className="font-bold">₹599</span>
            </p>
          </div>
        </div>
      </div>
      {/* Personl Details */}
      <div className="w-[90] sm:w-[20vw]">
        <Card className="p-4 shadow-md space-y-4">
          <h2 className="text-xl font-medium">Biling Info</h2>
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" placeholder="Jhon doe" className="w-full" />
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="jhon.doe@gmail.com"
              className="w-full"
            />
            <Label htmlFor="address">Shipping Address</Label>
            <Textarea
              rows="7"
              id="address"
              placeholder="full Address"
              className="w-full"
            />
          </div>
          <Button className="w-full" type="submit">
            Proceed to Checkout
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Checkout;
