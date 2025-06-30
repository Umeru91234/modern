"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Save, Plus } from "lucide-react";

export default function AddMenuItemPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
    stock: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Here you would normally call your API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Save to localStorage for demo
      const existingItems = JSON.parse(
        localStorage.getItem("menuItems") || "[]",
      );
      const newItem = {
        id: Date.now(),
        ...formData,
        price: parseInt(formData.price),
        stock: parseInt(formData.stock || "0"),
        image: formData.image || "https://placehold.co/300x200",
      };
      existingItems.push(newItem);
      localStorage.setItem("menuItems", JSON.stringify(existingItems));

      router.push("/?tab=menu");
    } catch (error) {
      console.error("Error adding menu item:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-300 to-teal-400 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-teal-300 to-cyan-400 rounded-full opacity-20 animate-pulse animation-delay-2000"></div>
      </div>

      <div className="container mx-auto p-6 relative z-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8 animate-fadeInDown">
          <Link href="/?tab=menu">
            <Button
              variant="outline"
              size="icon"
              className="hover:scale-110 transition-transform"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Add New Menu Item
              </h1>
              <p className="text-gray-600">
                Create a new item for your restaurant menu
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl animate-fadeInUp">
            <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Menu Item Details
              </CardTitle>
              <CardDescription className="text-green-100">
                Fill in the information for your new menu item
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2 animate-slideInLeft">
                    <Label htmlFor="name" className="text-gray-700 font-medium">
                      Item Name *
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter item name"
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      required
                      className="border-2 border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-300"
                    />
                  </div>

                  <div className="space-y-2 animate-slideInRight">
                    <Label
                      htmlFor="price"
                      className="text-gray-700 font-medium"
                    >
                      Price (Rs.) *
                    </Label>
                    <Input
                      id="price"
                      type="number"
                      placeholder="Enter price"
                      value={formData.price}
                      onChange={(e) => handleChange("price", e.target.value)}
                      required
                      className="border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                    />
                  </div>

                  <div className="space-y-2 animate-slideInLeft animation-delay-200">
                    <Label
                      htmlFor="category"
                      className="text-gray-700 font-medium"
                    >
                      Category *
                    </Label>
                    <Select
                      onValueChange={(value) => handleChange("category", value)}
                      required
                    >
                      <SelectTrigger className="border-2 border-gray-200 focus:border-purple-500">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="appetizers">Appetizers</SelectItem>
                        <SelectItem value="main-course">Main Course</SelectItem>
                        <SelectItem value="desserts">Desserts</SelectItem>
                        <SelectItem value="beverages">Beverages</SelectItem>
                        <SelectItem value="fast-food">Fast Food</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2 animate-slideInRight animation-delay-200">
                    <Label
                      htmlFor="stock"
                      className="text-gray-700 font-medium"
                    >
                      Stock Quantity
                    </Label>
                    <Input
                      id="stock"
                      type="number"
                      placeholder="Available quantity"
                      value={formData.stock}
                      onChange={(e) => handleChange("stock", e.target.value)}
                      className="border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-300"
                    />
                  </div>
                </div>

                <div className="space-y-2 animate-slideInUp animation-delay-300">
                  <Label htmlFor="image" className="text-gray-700 font-medium">
                    Image URL
                  </Label>
                  <Input
                    id="image"
                    type="url"
                    placeholder="Enter image URL (optional)"
                    value={formData.image}
                    onChange={(e) => handleChange("image", e.target.value)}
                    className="border-2 border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all duration-300"
                  />
                </div>

                <div className="space-y-2 animate-slideInUp animation-delay-400">
                  <Label
                    htmlFor="description"
                    className="text-gray-700 font-medium"
                  >
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your menu item..."
                    value={formData.description}
                    onChange={(e) =>
                      handleChange("description", e.target.value)
                    }
                    rows={4}
                    className="border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-300"
                  />
                </div>

                <div className="flex gap-4 pt-6 animate-fadeIn animation-delay-500">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                    className="flex-1 hover:scale-105 transition-transform"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white transition-all duration-300 transform hover:scale-105"
                  >
                    <div className="flex items-center justify-center">
                      {loading && (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      )}
                      <Save className="h-4 w-4 mr-2" />
                      {loading ? "Adding Item..." : "Add Menu Item"}
                    </div>
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
