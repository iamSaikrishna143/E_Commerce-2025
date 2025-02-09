import "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { startsGenerator } from "../../contants/helper";

const ReviewsComponent = () => {
  return (
    <div className="my-10 sm:my-20 w-[93vw] lg:w-[70vw] mx-auto">
      <h3 className="font-extrabold text-2xl text-gray-800 dark:text-white mb-8 text-center">
        Reviews
      </h3>

      {/* Write review section */}
      <div className="rounded-lg">
        <h4 className="font-semibold text-lg text-gray-700 dark:text-customIsabelline mb-4">
          Write a review
        </h4>

        <Textarea placeholder="Your Review" className="mb-4" />
        <div className="flex gap-5">
          <Input
            type="number"
            max="5"
            min="1"
            className="mb-4 w-[10rem]"
            placeholder="Rating (1-5)"
          />
          <Button>Submit Review</Button>
        </div>
      </div>
      {/*  review list */}
      <div className="space-y-6 my-10">
        <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-lg dark:bg-zinc-900 dark:border-none">
          {/* Review info */}
          <div className="flex items-center mb-4">
            <img
              src="https://rukminim2.flixcart.com/image/416/416/xif0q/shoe/i/h/j/-original-imagyxqzyyfe6fps.jpeg?q=70&crop=false"
              alt=""
              className="w-10 h-10 rounded-full border border-gray-300"
            />

            <div>
              <h4>Raj Paval</h4>
              <div className="flex items-center mt-1">
                {startsGenerator(5, "0", 15)}
              </div>
            </div>
          </div>
          {/* Review content */}
          <p className="text-gray-600 text-sm dark:text-customGray">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia,
            debitis?
          </p>
          {/* Review section */}
          <div className="mt-5 bg-gray-50 p-4 rounded-lg border dark:bg-zinc-800">
            <h5 className="font-bold text-sm text-gray-700 mb-3 dark:text-custumYellow">
              Replies
            </h5>
            <div className="flex items-center space-x-4 border-b pb-3 last:border-none">
              <img
                src="https://rukminim2.flixcart.com/image/416/416/xif0q/shoe/i/h/j/-original-imagyxqzyyfe6fps.jpeg?q=70&crop=false"
                alt=""
                className="w-10 h-10 rounded-full border border-gray-300"
              />
              <div>
                <h6 className="font-medium text-gray-800 text-sm dark:text-customIsabelline capitalize">
                  Coder29
                </h6>
                <p className="text-gray-600 text-sm dark:text-customGray">
                  Lorem ipsum dolor sit amet.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <Textarea placeholder="write your replay..." />
            <Button size='sm' className="mt-4">Reply</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsComponent;
