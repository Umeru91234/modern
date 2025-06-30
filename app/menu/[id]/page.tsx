"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Edit,
  Trash2,
  Package,
  Tag,
  DollarSign,
  Star,
} from "lucide-react";

export default function MenuItemDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [menuItem, setMenuItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get menu item from localStorage (in real app, fetch from API)
    const items = JSON.parse(localStorage.getItem("menuItems") || "[]");
    const item = items.find((item: any) => item.id.toString() === params.id);

    if (item) {
      setMenuItem(item);
    }
    setLoading(false);
  }, [params.id]);

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this menu item?")) {
      const items = JSON.parse(localStorage.getItem("menuItems") || "[]");
      const updatedItems = items.filter(
        (item: any) => item.id.toString() !== params.id,
      );
      localStorage.setItem("menuItems", JSON.stringify(updatedItems));
      router.push("/?tab=menu");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading menu item...</p>
        </div>
      </div>
    );
  }

  if (!menuItem) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold text-red-600 mb-4">
              Item Not Found
            </h2>
            <p className="text-gray-600 mb-6">
              The menu item you're looking for doesn't exist.
            </p>
            <Link href="/?tab=menu">
              <Button>Back to Menu</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-300 to-purple-400 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-purple-300 to-pink-400 rounded-full opacity-20 animate-pulse animation-delay-2000"></div>
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
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Menu Item Details
            </h1>
            <p className="text-gray-600">
              View and manage menu item information
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image Section */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl animate-slideInLeft">
              <CardContent className="p-6">
                <div className="aspect-square relative rounded-lg overflow-hidden bg-gray-100">
                  <Image
                    src={menuItem.image || "https://placehold.co/400x400"}
                    alt={menuItem.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge
                      className={`${
                        menuItem.stock > 10
                          ? "bg-green-500"
                          : menuItem.stock > 0
                            ? "bg-orange-500"
                            : "bg-red-500"
                      } animate-pulse`}
                    >
                      {menuItem.stock > 0 ? "In Stock" : "Out of Stock"}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Details Section */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl animate-slideInRight">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-t-lg">
                <CardTitle className="text-2xl">{menuItem.name}</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {/* Price */}
                <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                  <DollarSign className="h-6 w-6 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-600">Price</p>
                    <p className="text-2xl font-bold text-green-700">
                      Rs. {menuItem.price}
                    </p>
                  </div>
                </div>

                {/* Category */}
                <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                  <Tag className="h-6 w-6 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Category</p>
                    <Badge
                      variant="outline"
                      className="text-blue-700 border-blue-300 capitalize"
                    >
                      {menuItem.category}
                    </Badge>
                  </div>
                </div>

                {/* Stock */}
                <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg border border-orange-200">
                  <Package className="h-6 w-6 text-orange-600" />
                  <div>
                    <p className="text-sm text-gray-600">Stock Quantity</p>
                    <p className="text-xl font-bold text-orange-700">
                      {menuItem.stock || "N/A"}
                    </p>
                  </div>
                </div>

                {/* Description */}
                {menuItem.description && (
                  <div className="space-y-2">
                    <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                      <Star className="h-4 w-4" />
                      Description
                    </h3>
                    <p className="text-gray-600 leading-relaxed p-4 bg-gray-50 rounded-lg border">
                      {menuItem.description}
                    </p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button
                    variant="outline"
                    className="flex-1 hover:scale-105 transition-transform"
                    onClick={() => router.push(`/menu/${menuItem.id}/edit`)}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Item
                  </Button>
                  <Button
                    variant="destructive"
                    className="flex-1 hover:scale-105 transition-transform"
                    onClick={handleDelete}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Item
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
