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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { RestaurantLogo } from "@/components/ui/restaurant-logo";
import {
  ChefHat,
  Users,
  UtensilsCrossed,
  ClipboardList,
  Plus,
  Edit,
  Trash2,
} from "lucide-react";

export default function RestaurantDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [menuItems, setMenuItems] = useState([
    {
      id: 1,
      name: "Biryani",
      description: "Delicious chicken biryani",
      price: 250,
      category: "Main Course",
      image: "https://placehold.co/300x200",
    },
    {
      id: 2,
      name: "Karahi",
      description: "Spicy chicken karahi",
      price: 300,
      category: "Main Course",
      image: "https://placehold.co/300x200",
    },
    {
      id: 3,
      name: "Chai",
      description: "Hot tea",
      price: 50,
      category: "Beverages",
      image: "https://placehold.co/300x200",
    },
  ]);

  const [orders, setOrders] = useState([
    {
      id: 1,
      table_number: 5,
      item: "Biryani",
      price: 250,
      order_time: "2024-01-15 14:30:00",
      status: "pending",
    },
    {
      id: 2,
      table_number: 3,
      item: "Karahi",
      price: 300,
      order_time: "2024-01-15 14:25:00",
      status: "completed",
    },
  ]);

  const [tables, setTables] = useState([
    { id: 1, number: 1, capacity: 4, status: "available" },
    { id: 2, number: 2, capacity: 2, status: "occupied" },
    { id: 3, number: 3, capacity: 6, status: "occupied" },
    { id: 4, number: 4, capacity: 4, status: "available" },
    { id: 5, number: 5, capacity: 2, status: "occupied" },
  ]);

  const [staff, setStaff] = useState([
    {
      id: 1,
      name: "Ahmad Ali",
      position: "Chef",
      phone: "+92-300-1234567",
      salary: 50000,
    },
    {
      id: 2,
      name: "Fatima Khan",
      position: "Waiter",
      phone: "+92-301-9876543",
      salary: 30000,
    },
    {
      id: 3,
      name: "Hassan Ahmed",
      position: "Manager",
      phone: "+92-302-5555555",
      salary: 70000,
    },
  ]);

  useEffect(() => {
    try {
      const userData = localStorage.getItem("user");
      if (userData) {
        const parsedUser = JSON.parse(userData);
        if (parsedUser && parsedUser.username) {
          setUser(parsedUser);
        } else {
          router.push("/login");
        }
      } else {
        router.push("/login");
      }
    } catch (error) {
      console.error("Error reading user data:", error);
      router.push("/login");
    }
    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <RestaurantLogo size="lg" className="mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const completeOrder = (id: number) => {
    setOrders(
      orders.map((order) =>
        order.id === id ? { ...order, status: "completed" } : order,
      ),
    );
  };

  const updateTableStatus = (id: number, status: string) => {
    setTables(
      tables.map((table) => (table.id === id ? { ...table, status } : table)),
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-300 to-teal-400 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-teal-300 to-cyan-400 rounded-full opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/3 left-1/3 w-32 h-32 bg-gradient-to-r from-green-300 to-emerald-400 rounded-full opacity-15 animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-gradient-to-r from-amber-300 to-emerald-400 rounded-full opacity-15 animate-bounce animation-delay-1000"></div>
      </div>

      <div className="container mx-auto p-6 relative z-10">
        <div className="flex items-center justify-between mb-8 animate-fadeInDown">
          <div className="flex items-center gap-4">
            <RestaurantLogo size="lg" className="animate-bounce" />
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 bg-clip-text text-transparent animate-fadeIn">
                RestaurantOS
              </h1>
              <p className="text-sm text-gray-500 tracking-wider font-medium">
                MANAGEMENT SYSTEM
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 animate-fadeInUp">
            <span className="text-sm bg-gradient-to-r from-emerald-100 to-teal-100 px-4 py-2 rounded-full border border-emerald-200 animate-slideInRight">
              Welcome,{" "}
              <strong className="text-emerald-700">{user.username}</strong>
            </span>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="bg-gradient-to-r from-red-50 to-pink-50 border-red-200 text-red-700 hover:from-red-100 hover:to-pink-100 hover:border-red-300 transition-all duration-300 transform hover:scale-105"
            >
              Logout
            </Button>
          </div>
        </div>

        <Tabs
          defaultValue="dashboard"
          className="space-y-6 animate-fadeInUp animation-delay-300"
        >
          <TabsList className="grid w-full grid-cols-5 bg-gradient-to-r from-white/90 to-emerald-50/90 backdrop-blur-sm border border-emerald-200/50 shadow-xl">
            <TabsTrigger
              value="dashboard"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-teal-600 data-[state=active]:text-white transition-all duration-300 hover:scale-105"
            >
              Dashboard
            </TabsTrigger>
            <TabsTrigger
              value="menu"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-600 data-[state=active]:text-white transition-all duration-300 hover:scale-105"
            >
              Menu Items
            </TabsTrigger>
            <TabsTrigger
              value="orders"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-cyan-600 data-[state=active]:text-white transition-all duration-300 hover:scale-105"
            >
              Orders
            </TabsTrigger>
            <TabsTrigger
              value="tables"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-green-600 data-[state=active]:text-white transition-all duration-300 hover:scale-105"
            >
              Tables
            </TabsTrigger>
            <TabsTrigger
              value="staff"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-emerald-600 data-[state=active]:text-white transition-all duration-300 hover:scale-105"
            >
              Staff
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 animate-slideInLeft">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-blue-800">
                    Total Menu Items
                  </CardTitle>
                  <UtensilsCrossed className="h-4 w-4 text-blue-600 animate-pulse" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-700 animate-fadeIn">
                    {menuItems.length}
                  </div>
                  <div className="text-xs text-blue-600 mt-1">
                    📋 Items available
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 animate-slideInLeft animation-delay-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-orange-800">
                    Active Orders
                  </CardTitle>
                  <ClipboardList className="h-4 w-4 text-orange-600 animate-bounce" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-orange-700 animate-fadeIn">
                    {orders.filter((o) => o.status === "pending").length}
                  </div>
                  <div className="text-xs text-orange-600 mt-1">
                    🍽️ Pending orders
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 animate-slideInLeft animation-delay-400">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-purple-800">
                    Occupied Tables
                  </CardTitle>
                  <UtensilsCrossed className="h-4 w-4 text-purple-600 animate-pulse" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-700 animate-fadeIn">
                    {tables.filter((t) => t.status === "occupied").length}
                  </div>
                  <div className="text-xs text-purple-600 mt-1">
                    🪑 Tables in use
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 animate-slideInLeft animation-delay-600">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-green-800">
                    Staff Members
                  </CardTitle>
                  <Users className="h-4 w-4 text-green-600 animate-bounce" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-700 animate-fadeIn">
                    {staff.length}
                  </div>
                  <div className="text-xs text-green-600 mt-1">
                    👥 Team members
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card className="bg-gradient-to-br from-white/90 to-emerald-50/80 backdrop-blur-sm border border-emerald-200/50 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 animate-slideInRight animation-delay-800">
                <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-2">
                    <ClipboardList className="h-5 w-5" />
                    Recent Orders
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    {orders.slice(0, 5).map((order, index) => (
                      <div
                        key={order.id}
                        className={`flex items-center justify-between p-4 border-2 rounded-xl bg-gradient-to-r transition-all duration-300 hover:scale-105 animate-fadeIn ${
                          order.status === "completed"
                            ? "from-green-50 to-emerald-50 border-green-200 hover:border-green-300"
                            : "from-orange-50 to-yellow-50 border-orange-200 hover:border-orange-300"
                        }`}
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div>
                          <p className="font-bold text-gray-800">
                            Table {order.table_number}
                          </p>
                          <p className="text-sm text-gray-600">
                            {order.item} -{" "}
                            <span className="font-semibold text-green-600">
                              Rs. {order.price}
                            </span>
                          </p>
                        </div>
                        <Badge
                          variant={
                            order.status === "completed"
                              ? "default"
                              : "secondary"
                          }
                          className={`animate-pulse ${
                            order.status === "completed"
                              ? "bg-green-500 hover:bg-green-600"
                              : "bg-orange-500 text-white hover:bg-orange-600"
                          }`}
                        >
                          {order.status === "completed"
                            ? "✅ Completed"
                            : "⏳ Pending"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-white/90 to-teal-50/80 backdrop-blur-sm border border-teal-200/50 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 animate-slideInLeft animation-delay-1000">
                <CardHeader className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-2">
                    <UtensilsCrossed className="h-5 w-5" />
                    Table Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="grid grid-cols-3 gap-3">
                    {tables.map((table, index) => (
                      <div
                        key={table.id}
                        className={`p-4 border-2 rounded-xl text-center transition-all duration-300 hover:scale-110 animate-zoomIn cursor-pointer ${
                          table.status === "available"
                            ? "bg-gradient-to-br from-green-100 to-emerald-100 border-green-300 hover:from-green-200 hover:to-emerald-200"
                            : "bg-gradient-to-br from-red-100 to-pink-100 border-red-300 hover:from-red-200 hover:to-pink-200"
                        }`}
                        style={{ animationDelay: `${index * 150}ms` }}
                      >
                        <p className="font-bold text-gray-800">
                          Table {table.number}
                        </p>
                        <p className="text-sm text-gray-600">
                          Capacity: {table.capacity} people
                        </p>
                        <Badge
                          variant={
                            table.status === "available"
                              ? "default"
                              : "destructive"
                          }
                          className={`mt-2 animate-pulse ${
                            table.status === "available"
                              ? "bg-green-500 hover:bg-green-600"
                              : "bg-red-500 hover:bg-red-600"
                          }`}
                        >
                          {table.status === "available"
                            ? "✅ Available"
                            : "🔴 Occupied"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="menu" className="space-y-6">
            <Card className="bg-gradient-to-br from-white/80 to-gray-50/80 backdrop-blur-sm border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 animate-slideInUp animation-delay-600">
              <CardHeader>
                <CardTitle>Menu Management</CardTitle>
                <CardDescription>
                  Manage your restaurant menu items
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 mb-6">
                  <Link href="/menu/add" className="flex-1">
                    <Button className="w-full bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 hover:scale-105 transition-all duration-300">
                      <Plus className="h-4 w-4 mr-2" />
                      Add New Menu Item
                    </Button>
                  </Link>
                  <Link href="/orders/create" className="flex-1">
                    <Button className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 hover:scale-105 transition-all duration-300">
                      <Plus className="h-4 w-4 mr-2" />
                      Create Order
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-white/80 to-gray-50/80 backdrop-blur-sm border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 animate-slideInUp animation-delay-800">
              <CardHeader>
                <CardTitle>Menu Items</CardTitle>
                <CardDescription>
                  Click on any item to view details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {menuItems.map((item, index) => (
                    <Link key={item.id} href={`/menu/${item.id}`}>
                      <div
                        className="border-2 border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 cursor-pointer animate-fadeIn"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-32 object-cover rounded-md mb-3"
                        />
                        <h3 className="font-semibold text-gray-800">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                          {item.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-lg text-green-600">
                            Rs. {item.price}
                          </span>
                          <Badge className="bg-blue-500">{item.category}</Badge>
                        </div>
                        <div className="mt-3 text-center">
                          <span className="text-sm text-blue-600 font-medium">
                            Click to view details →
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Orders Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">
                            Table {order.table_number}
                          </h3>
                          <p className="text-muted-foreground">
                            {order.item} - Rs. {order.price}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {order.order_time}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              order.status === "completed"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {order.status}
                          </Badge>
                          {order.status === "pending" && (
                            <Button
                              size="sm"
                              onClick={() => completeOrder(order.id)}
                            >
                              Complete Order
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tables" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Table Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {tables.map((table) => (
                    <div
                      key={table.id}
                      className={`border rounded-lg p-4 ${
                        table.status === "available"
                          ? "bg-green-50"
                          : "bg-red-50"
                      }`}
                    >
                      <h3 className="font-semibold text-lg">
                        Table {table.number}
                      </h3>
                      <p className="text-muted-foreground">
                        Capacity: {table.capacity} people
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        <Badge
                          variant={
                            table.status === "available"
                              ? "default"
                              : "destructive"
                          }
                        >
                          {table.status}
                        </Badge>
                        <Button
                          size="sm"
                          onClick={() =>
                            updateTableStatus(
                              table.id,
                              table.status === "available"
                                ? "occupied"
                                : "available",
                            )
                          }
                        >
                          {table.status === "available"
                            ? "Mark Occupied"
                            : "Mark Available"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="staff" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Staff Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {staff.map((member) => (
                    <div key={member.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">{member.name}</h3>
                          <p className="text-muted-foreground">
                            {member.position}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {member.phone}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">
                            Rs. {member.salary.toLocaleString()}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Monthly Salary
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
