import "react";
import { Card } from "../ui/card";
import { ArrowDownToLine, IndianRupee } from "lucide-react";

const OrderData = ({
  amount = 100,
  address = "Dera srree,konkorada",
  status = "pending",
  createdAt = "2024-02-14",
  updateAt = "2024-02-14",
}) => {
  return (
    <Card className="grid gap-2 p-2">
      <div className="flex flex-col sm:flex-row justify-between items-end sm:items-center border p-3 rounded-lg bg-gray-100 dark:bg-zinc-900">
        <div className="flex items-center gap-2">
          <img
            src="https://images.pexels.com/photos/29343550/pexels-photo-29343550/free-photo-of-scenic-mountain-road-in-majestic-forest-landscape.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            className="w-20 h-20 rounded-lg"
          />
          <div className="grid gap-1">
            <h1 className="font-semibold text-sm sm:text-lg">
              Mechanical keyboard with ghosting keys
            </h1>
            <p className="flex text-sm sm:text-md gap-2 sm:gap-2 text-gray-500 my-2 sm:my-0">
              <span>
                Color:{" "}
                <span style={{ backgroundColor: "white" }}>{"white"}</span>
              </span>
              <span className="hidden sm:block">|</span>
              <span>
                Status : <span className="capitalize">{status}</span>{" "}
              </span>
            </p>
          </div>
        </div>
        <div className="flex sm:flex-col gap-3 sm:gap-0 mt-2 sm:mt-0 sm:items-center">
          <h2 className="text-md sm:text-xl font-bold flex items-center dark:text-custumYellow">
            <IndianRupee size={18} />
            499
          </h2>
          <p className="dark:text-custumYellow text-end">Qty: 1</p>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-between sm:items-center">
        <span>
          Ordered On: <span className="capitalize">01 Jan 2025</span>
        </span>
        <span className="hover:underline text-sm cursor-pointer flex items-center gap-1 dark:text-custumYellow">
          <ArrowDownToLine size={10} />
          download Invoice
        </span>
      </div>
      <hr />
      <span>
        Delivery At: <span className="capitalize">05 Jan 2025</span>
      </span>
    </Card>
  );
};

export default OrderData;
