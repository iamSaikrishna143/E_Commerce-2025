import { Label } from "../ui/Label";
import "react";
import { Input } from "@/components/ui/input";
import { Edit, Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Textarea } from "../ui/textarea";
import { useEffect, useState } from "react";

import axios from "axios";

import { useDispatch, useSelector } from "react-redux";

import { setProducts } from "../../redux/slices/productSlice";
import useToast from "../../hooks/use-toast";

import useErrorLogout from "@/hooks/use-error-logout";
import { ToastAction } from "@/components/ui/toast";

const AllProducts = () => {
  const { products } = useSelector((state) => state.product);
  console.log(products);

  const [category, setCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const { toast } = useToast();
  const { handleErrorLogout } = useErrorLogout();
  useEffect(() => {
    const getFilterProducts = async () => {
      console.log("hii");

      const res = await axios.get(
        `http://localhost:5000/api/get-products?category=${category}&search=${searchTerm}`
      );
      const data = await res.data;
      console.log(data);

      dispatch(setProducts(data.data));
    };
    getFilterProducts();
  }, [searchTerm, category]);
  const removeFromBlacklist = async (id) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/remove-from-blacklist/${id}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const { message } = res.data;
      toast({
        title: "Success",
        description: message,
      });
      location.reload();
    } catch (err) {
      handleErrorLogout(err, "Error occured while removing from blacklist");
    }
  };
  const blacklistProduct = async (id) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/blacklist-product/${id}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const { message, data } = res.data;
      toast({
        title: "success",
        description: message,
        action: (
          <ToastAction
            altText="changes change"
            onClick={() => {
              removeFromBlacklist(data._id);
            }}
          >
            Undo Changes
          </ToastAction>
        ),
      });
      location.reload();
    } catch (e) {
      handleErrorLogout(e, "Error occured while blacklisting product");
    }
  };
  const handleEdit = (product) => {
    setIsEditModalOpen(true);
    setEditingProduct(product);
  };
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updateProduct = {
      ...editingProduct,
      name: formData.get("name"),
      description: formData.get("description"),
      price: parseFloat(formData.get("price")),
      category: formData.get("category"),
    };
    dispatch(
      setProducts(
        products.map((p) => (p.id === updateProduct._id ? updateProduct : p))
      )
    );
    try {
      const res = await axios.put(
        `http://localhost:5000/api/update-product/${editingProduct._id}`,
        {
          name: updateProduct.name,
          description: updateProduct.description,
          price: updateProduct.price,
          category: updateProduct.category,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const { message } = res.data;
      toast({
        title: message,
      });
    } catch (e) {
      return handleErrorLogout(e, "Error occurred while updating");
    }
    setIsEditModalOpen(false);
    setEditingProduct(null);
    location.reload();
  };
  return (
    <div className="mx-auto px-4 sm:px-4 -z-10">
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>
      <div className="mb-8">
        <form className="flex gap-4 items-end sm:w-[80vw]">
          <div className="flex-1">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="search"
            >
              Search Products
            </label>
            <div className="relative">
              <Input
                type="text"
                id="search"
                placeholder="Search by name or description"
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search
                size={20}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
            </div>
          </div>
          <div className="w-48">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="category"
            >
              Category
            </label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select a Category" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="headset">Headset</SelectItem>
                <SelectItem value="keyboard">Keyboard</SelectItem>
                <SelectItem value="mouse">Mouse</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </form>
      </div>
      {products?.length === 0 ? (
        <p className="text-center text-gray-500 mt-8">No products found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mx-2 sm:mx-0">
          {products.map((product) => (
            <Card className="flex flex-col" key={product._id}>
              <div className="aspect-square relative">
                <img
                  src={product?.image?.url}
                  alt={product.name}
                  className="rounded-t-lg"
                />
              </div>
              <CardContent className="flex-grow p-4">
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-4">
                  {product.description}
                </p>
                <p className="text-lg font-bold">
                  ₹ {product.price.toFixed(2)}
                </p>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-between">
                <Button variant="outline" onClick={() => handleEdit(product)}>
                  <Edit className="mr-2 h-4 s-4" />
                  Edit
                </Button>

                <Button
                  onClick={() => {
                    !product.blacklisted
                      ? blacklistProduct(product._id)
                      : removeFromBlacklist(product._id);
                  }}
                >
                  {!product.blacklisted
                    ? "Blacklist Product"
                    : "Remove from Blacklist"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditSubmit}>
            <div className="grid grid-4 py-4">
              <div className="grid gap-4 items-center">
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  defaultValue={editingProduct?.name}
                />
              </div>
              <div className="grid gap-4 items-center">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  type="text"
                  id="description"
                  name="description"
                  rows={2}
                  defaultValue={editingProduct?.description}
                />
              </div>
              <div className="grid gap-4 items-center">
                <Label htmlFor="price">Price</Label>
                <Input
                  type="number"
                  id="price"
                  name="price"
                  defaultValue={editingProduct?.price}
                />
              </div>
              <div className="grid gap-4 items-center">
                <Label htmlFor="category">Category</Label>
                <Select name="category" defaultValue={editingProduct?.category}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Headset">Headset</SelectItem>
                    <SelectItem value="Keyboard">Keyboard</SelectItem>
                    <SelectItem value="Mouse">Mouse</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AllProducts;
