import "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const HeaderDisplay = () => {
  const imagesData = [
    {
      src: "https://5.imimg.com/data5/SELLER/Default/2023/3/296178163/GX/GL/SD/186724856/vivo-mobile-phone.jpg",
      alt: "Image 1",
    },
    {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBXvCnSTfMOjdQNMKLY6InPCMO03DigqkETw&s",
      alt: "Image 2",
    },
    {
      src: "https://via.placeholder.com/300x300",
      alt: "Image 3",
    },
  ];
  return (
    <Carousel className="my-10 mx-auto w-[93vw] overflow-x-clip sm:overflow-visible">
      <CarouselContent>
        {imagesData.map((image, index) => {
          return (
            <CarouselItem key={index}>
              <img src={image.src} alt={image.alt} />
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default HeaderDisplay;
