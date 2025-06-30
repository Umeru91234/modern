"use client";

import { useState, useEffect } from "react";
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
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Plus,
  Minus,
  ShoppingCart,
  Receipt,
  Percent,
} from "lucide-react";

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export default function CreateOrderPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [tables, setTables] = useState<any[]>([]);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [selectedTable, setSelectedTable] = useState("");
  const [discountType, setDiscountType] = useState<"flat" | "percentage">(
    "flat",
  );
  const [discountValue, setDiscountValue] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    // Load menu items and tables
    const items = JSON.parse(localStorage.getItem("menuItems") || "[]");
    const tablesData = [
      { id: 1, number: 1, capacity: 4, status: "available" },
      { id: 2, number: 2, capacity: 2, status: "available" },
      { id: 3, number: 3, capacity: 6, status: "available" },
      { id: 4, number: 4, capacity: 4, status: "available" },
      { id: 5, number: 5, capacity: 2, status: "available" },
    ];
    setMenuItems(items);
    setTables(tablesData);
  }, []);

  const addToOrder = (item: any) => {
    const existingItem = orderItems.find(
      (orderItem) => orderItem.id === item.id,
    );
    if (existingItem) {
      setOrderItems(
        orderItems.map((orderItem) =>
          orderItem.id === item.id
            ? { ...orderItem, quantity: orderItem.quantity + 1 }
            : orderItem,
        ),
      );
    } else {
      setOrderItems([...orderItems, { ...item, quantity: 1 }]);
    }
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      setOrderItems(orderItems.filter((item) => item.id !== id));
    } else {
      setOrderItems(
        orderItems.map((item) =>
          item.id === id ? { ...item, quantity } : item,
        ),
      );
    }
  };

  const calculateSubtotal = () => {
    return orderItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  };

  const calculateDiscount = () => {
    const subtotal = calculateSubtotal();
    const discount = parseFloat(discountValue) || 0;

    if (discountType === "percentage") {
      return Math.min((subtotal * discount) / 100, subtotal);
    } else {
      return Math.min(discount, subtotal);
    }
  };

  const calculateTotal = () => {
    return calculateSubtotal() - calculateDiscount();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (orderItems.length === 0 || !selectedTable) return;

    setLoading(true);

    try {
      const order = {
        id: Date.now(),
        tableId: selectedTable,
        items: orderItems,
        subtotal: calculateSubtotal(),
        discount: calculateDiscount(),
        total: calculateTotal(),
        discountType,
        discountValue: parseFloat(discountValue) || 0,
        notes,
        status: "pending",
        orderTime: new Date().toISOString(),
      };

      // Save order (in real app, send to API)
      const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");
      existingOrders.push(order);
      localStorage.setItem("orders", JSON.stringify(existingOrders));

      // Redirect to bill print page
      router.push(`/orders/bill/${order.id}`);
    } catch (error) {
      console.error("Error creating order:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-emerald-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-teal-300 to-emerald-400 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-emerald-300 to-green-400 rounded-full opacity-20 animate-pulse animation-delay-2000"></div>
      </div>

      <div className="container mx-auto p-6 relative z-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8 animate-fadeInDown">
          <Link href="/?tab=orders">
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
              <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
                Create New Order
              </h1>
              <p className="text-gray-600">
                Add items and process customer orders
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Menu Items */}
          <div className="lg:col-span-2">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl animate-slideInLeft">
              <CardHeader className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  Menu Items
                </CardTitle>
                <CardDescription className="text-orange-100">
                  Select items to add to the order
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {menuItems.map((item, index) => (
                    <div
                      key={item.id}
                      className="p-4 border-2 border-gray-200 rounded-lg hover:border-orange-300 transition-all duration-300 hover:shadow-lg animate-fadeIn"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-gray-800">
                          {item.name}
                        </h3>
                        <Badge className="bg-green-500">Rs. {item.price}</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        {item.description}
                      </p>
                      <Button
                        onClick={() => addToOrder(item)}
                        size="sm"
                        className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add to Order
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl animate-slideInRight">
              <CardHeader className="bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <Receipt className="h-5 w-5" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Table Selection */}
                  <div className="space-y-2">
                    <Label>Table *</Label>
                    <Select onValueChange={setSelectedTable} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select table" />
                      </SelectTrigger>
                      <SelectContent>
                        {tables.map((table) => (
                          <SelectItem
                            key={table.id}
                            value={table.id.toString()}
                          >
                            Table {table.number} (Capacity: {table.capacity})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Order Items */}
                  <div className="space-y-3">
                    <Label>Order Items</Label>
                    {orderItems.length === 0 ? (
                      <p className="text-gray-500 text-center py-4">
                        No items added yet
                      </p>
                    ) : (
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        {orderItems.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                          >
                            <div className="flex-1">
                              <p className="font-medium">{item.name}</p>
                              <p className="text-sm text-gray-600">
                                Rs. {item.price} each
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                type="button"
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-8 text-center">
                                {item.quantity}
                              </span>
                              <Button
                                type="button"
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Discount Section */}
                  <div className="space-y-3 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                    <Label className="flex items-center gap-2">
                      <Percent className="h-4 w-4" />
                      Apply Discount (Optional)
                    </Label>
                    <div className="flex gap-2">
                      <Select
                        value={discountType}
                        onValueChange={(value: "flat" | "percentage") =>
                          setDiscountType(value)
                        }
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="flat">Flat Rs.</SelectItem>
                          <SelectItem value="percentage">Percent %</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input
                        type="number"
                        placeholder="0"
                        value={discountValue}
                        onChange={(e) => setDiscountValue(e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="space-y-2">
                    <Label>Special Instructions</Label>
                    <Textarea
                      placeholder="Any special notes for the kitchen..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={3}
                    />
                  </div>

                  {/* Order Total */}
                  {orderItems.length > 0 && (
                    <div className="space-y-2 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                      <div className="flex justify-between text-sm">
                        <span>Subtotal:</span>
                        <span>Rs. {calculateSubtotal()}</span>
                      </div>
                      {calculateDiscount() > 0 && (
                        <div className="flex justify-between text-sm text-orange-600">
                          <span>Discount:</span>
                          <span>- Rs. {calculateDiscount()}</span>
                        </div>
                      )}
                      <div className="flex justify-between font-bold text-lg border-t pt-2">
                        <span>Total:</span>
                        <span className="text-green-600">
                          Rs. {calculateTotal()}
                        </span>
                      </div>
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={
                      loading || orderItems.length === 0 || !selectedTable
                    }
                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white py-3"
                  >
                    {loading ? (
                      <div className="flex items-center">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Processing...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <Receipt className="h-4 w-4 mr-2" />
                        Create Order & Print Bill
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
