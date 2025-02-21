import "react";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useRef, useState } from "react";
import { Button } from "../ui/button";
import { Loader2, Upload, X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import useToast from "../../hooks/use-toast";
import useErrorLogout from "@/hooks/use-error-logout";
import axios from "axios";

const CreateProducts = () => {
  const [currentColor, setCurrentColor] = useState("#000000");
  const [colors, setColors] = useState([]);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const handleErrorLogout = useErrorLogout();

  const fileInputRef = useRef(null);
  const handleImageUpload = (e) => {
    const files = e.target.files;
    console.log(files);

    if (files) {
      const newImages = Array.from(files).map((file) => ({
        preview: URL.createObjectURL(file),
        file,
      }));
      setImages((prevImages) => [...prevImages, ...newImages].slice(0, 4));
    }
  };

  const addColor = () => {
    if (!colors.includes(currentColor)) {
      setColors([...colors, currentColor]);
    }
  };
  const removeColor = (color) => {
    setColors(colors.filter((c) => c !== color));
  };
  const removeImage = (image) => {
    setImages(images.filter((_, i) => i !== image));
  };
  // const onSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log(e.target);
  //   console.log("sasa");
  // };

  const HandleSubmit = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const description = e.target.description.value;
    const price = e.target.price.value;
    const category = e.target.category.value;
    const stock = e.target.stock.value;
    console.log(name, description, price, category, stock);

    // if (
    //   !name ||
    //   !description ||
    //   !price ||
    //   !category ||
    //   !stock ||
    //   colors.length === 0 ||
    //   images.length === 0
    // ) {
    //   toast({
    //     title: "Error",
    //     description: "Pleasefill out all the required fields",
    //   });
    // }
    // if (
    //   name.trim() === "" ||
    //   description.trim() === "" ||
    //   price <= 0 ||
    //   stock <= 0 ||
    //   category.trim() === ""
    // ) {
    //   return toast({
    //     title: "Error",
    //     description:
    //       "All fields are required and price and stock should be positive numbers",
    //   });
    // }
    // if (images.length < 4) {
    //   return toast({
    //     title: "Error",
    //     description: "Please upload at least 4 images for the product",
    //   });
    // }
    setIsLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("stock", stock);
    colors.forEach((color) => formData.append("colors", color));
    images.forEach((image) => formData.append("images", image.file));
    console.log(formData);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/create-product",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast({
        title: "Success",
        description: res?.data?.message,
      });
    location.reload();

    } catch (e) {
      return handleErrorLogout(e, "Error uploading product");
    } finally {
      setIsLoading(false);
    }
  };
  if (isLoading) {
    return (
      <div className="flex items-center justify-center absolute inset-8">
        <Loader2 className="animate-spin h-12 w-12 text-gray-500" />
      </div>
    );
  }
  return (
    <div className="w-full max-w-2xl -z-10">
      <CardHeader>
        <CardTitle className="text-2xl">Create New Product</CardTitle>
        <CardDescription>Add a new product to your store</CardDescription>
      </CardHeader>
      <form onSubmit={HandleSubmit}>
        <div className="flex flex-col lg:flex-row lg:w-[70vw]">
          <CardContent className="w-full">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter Product name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                rows={"4"}
                id="description"
                name="description"
                placeholder="Enter Product Description"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                name="price"
                type="number"
                placeholder="0.00"
                required
                step="0.01"
                min="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stock">Stock</Label>
              <Input
                id="stock"
                name="stock"
                type="number"
                placeholder="00"
                required
                min="0"
              />
            </div>
          </CardContent>
          <CardContent className="w-full">
            <div className="space-y-2">
              <label htmlFor="category">Category</label>
              <Select name="category">
                <SelectTrigger name="category">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Headset">Headset</SelectItem>
                  <SelectItem value="Keyboard">Keyboard</SelectItem>
                  <SelectItem value="Mouse">Mouse</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label htmlFor="color">Color</label>
              <div className="flex items-center space-x-2">
                <Input
                  id="color"
                  name="color"
                  type="color"
                  value={currentColor}
                  onChange={(e) => setCurrentColor(e.target.value)}
                  className="w-12 h-12 p-1 rounded-md"
                />
                <Button type="button" onClick={addColor} variant="outline">
                  Add Color
                </Button>
              </div>
              {/* </div> */}
              <div className="flex flex-wrap gap-2 mt-2">
                {colors.map((color, i) => (
                  <div
                    key={i}
                    className="flex items-center bg-gray-100 rounded-full pl-2 pr-1 py-1"
                  >
                    <div
                      className="w-4 h-4 rounded-full mr-2"
                      style={{ backgroundColor: color }}
                    ></div>
                    <span className="text-sm mr-1 dark:text-slate-900">
                      {color}
                    </span>
                    <Button
                      type="button"
                      onClick={() => removeColor(color)}
                      variant="ghost"
                      className="h-6 w-6 p-0 rounded-full"
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Remove Color</span>
                    </Button>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <Label htmlFor="images">Product Images</Label>
                <div className="flex flex-wrap gap-4">
                  {images.map((image, i) => (
                    <div className="relative" key={i}>
                      <img
                        src={image?.preview}
                        alt={`Product image ${i + 1}`}
                        width={100}
                        height={100}
                        className="rounded-md object-cover"
                      />
                      <Button
                        type="button"
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                        variant="destructive"
                        size="icon"
                        onClick={() => removeImage(0)}
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Remove Image</span>
                      </Button>
                    </div>
                  ))}

                  {images.length < 4 && (
                    <Button
                      onClick={() => fileInputRef.current?.click()}
                      className="w-[100px] h-[100px]"
                      variant="outline"
                      type="button"
                    >
                      <Upload className="h-6 w-6" />
                      <span className="sr-only">Upload Image</span>
                    </Button>
                  )}
                </div>
                <Input
                  type="file"
                  id="images"
                  name="images"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleImageUpload}
                  ref={fileInputRef}
                />
                <p className="text-sm text-muted-foreground mt-2">
                  Upload up to 4 images. Supported formats: JPG, PNG, GIF
                </p>
              </div>
            </div>
          </CardContent>
        </div>
        <CardFooter>
          <Button type="submit" className=" w-full" disable={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? "Adding Product..." : "Add Product"}
          </Button>
        </CardFooter>
      </form>
    </div>
  );
};

export default CreateProducts;
