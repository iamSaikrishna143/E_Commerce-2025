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

const CreateProducts = () => {
  const [currentColor, setCurrentColor] = useState("#000000");
  const [colors, setColors] = useState([]);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fileInputRef = useRef(null);
  const handleImageUpload = () => {};

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
  return (
    <div className="w-full max-w-2xl -z-10">
      <CardHeader>
        <CardTitle className="text-2xl">Create New Product</CardTitle>
        <CardDescription>Add a new product to your store</CardDescription>
      </CardHeader>
      <form>
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
                <Button onClick={addColor} variant="outline">
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
                  <div className="relative">
                    <img
                      src="https://i5.walmartimages.com/asr/b1a7afa9-286a-43a2-a83f-2a318cbbce3c_1.8b9b34a87753ffc45d48a9681c3d1d60.jpeg"
                      alt={`Product image ${1}`}
                      width={100}
                      height={100}
                      className="rounded-md object-cover"
                    />
                    <Button
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                      variant="destructive"
                      size="icon"
                      onClick={() => removeImage(0)}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Remove Image</span>
                    </Button>
                  </div>
                  {images.length > 4 && (
                    <Button
                      onClick={() => fileInputRef.current?.click()}
                      className="w-[100px] h-[100px]"
                      variant="outline"
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
