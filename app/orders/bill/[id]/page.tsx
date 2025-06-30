"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Print, CheckCircle } from "lucide-react";

export default function BillPage() {
  const router = useRouter();
  const params = useParams();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get order from localStorage (in real app, fetch from API)
    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    const foundOrder = orders.find(
      (order: any) => order.id.toString() === params.id,
    );

    if (foundOrder) {
      setOrder(foundOrder);
    }
    setLoading(false);
  }, [params.id]);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Create a simple text version for download
    if (!order) return;

    const billText = `
RESTAURANT BILL
===============

Order ID: ${order.id}
Table: ${order.tableId}
Date: ${new Date(order.orderTime).toLocaleDateString()}
Time: ${new Date(order.orderTime).toLocaleTimeString()}

ITEMS ORDERED:
--------------
${order.items
  .map(
    (item: any) =>
      `${item.name} x${item.quantity} @ Rs.${item.price} = Rs.${item.price * item.quantity}`,
  )
  .join("\n")}

BILL SUMMARY:
-------------
Subtotal: Rs.${order.subtotal}
${order.discount > 0 ? `Discount (${order.discountType === "percentage" ? order.discountValue + "%" : "Rs." + order.discountValue}): Rs.${order.discount}` : ""}
TOTAL: Rs.${order.total}

${order.notes ? `Special Instructions: ${order.notes}` : ""}

Thank you for dining with us!
    `;

    const blob = new Blob([billText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bill-${order.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading bill...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold text-red-600 mb-4">
              Order Not Found
            </h2>
            <p className="text-gray-600 mb-6">
              The order you're looking for doesn't exist.
            </p>
            <Link href="/?tab=orders">
              <Button>Back to Orders</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Header - Hidden in print */}
      <div className="print:hidden">
        <div className="container mx-auto p-6">
          <div className="flex items-center justify-between mb-8 animate-fadeInDown">
            <div className="flex items-center gap-4">
              <Link href="/orders/create">
                <Button
                  variant="outline"
                  size="icon"
                  className="hover:scale-110 transition-transform"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  Order Bill
                </h1>
                <p className="text-gray-600">Order #{order.id}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={handleDownload}
                variant="outline"
                className="hover:scale-105 transition-transform"
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button
                onClick={handlePrint}
                className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 hover:scale-105 transition-transform"
              >
                <Print className="h-4 w-4 mr-2" />
                Print Bill
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bill Content */}
      <div className="container mx-auto p-6 print:p-0">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-white shadow-2xl print:shadow-none animate-fadeInUp">
            <CardHeader className="text-center border-b bg-gradient-to-r from-green-500 to-blue-500 text-white print:bg-none print:text-black">
              <div className="space-y-2">
                <CardTitle className="text-2xl font-bold">
                  🍽️ Restaurant Name
                </CardTitle>
                <p className="text-green-100 print:text-gray-600">
                  123 Main Street, City Name
                </p>
                <p className="text-green-100 print:text-gray-600">
                  Phone: (555) 123-4567
                </p>
              </div>
            </CardHeader>

            <CardContent className="p-8 space-y-6">
              {/* Order Success Animation */}
              <div className="text-center mb-6 print:hidden">
                <div className="relative inline-block">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto animate-bounce" />
                  <div className="absolute inset-0 rounded-full bg-green-400 opacity-20 animate-ping"></div>
                </div>
                <h2 className="text-2xl font-bold text-green-700 mt-4">
                  Order Confirmed! 🎉
                </h2>
                <p className="text-gray-600">
                  Your order has been successfully placed
                </p>
              </div>

              {/* Order Details */}
              <div className="grid grid-cols-2 gap-4 text-sm border-b pb-4">
                <div>
                  <p className="font-semibold">Order ID:</p>
                  <p className="text-gray-600">#{order.id}</p>
                </div>
                <div>
                  <p className="font-semibold">Table:</p>
                  <p className="text-gray-600">Table {order.tableId}</p>
                </div>
                <div>
                  <p className="font-semibold">Date:</p>
                  <p className="text-gray-600">
                    {new Date(order.orderTime).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="font-semibold">Time:</p>
                  <p className="text-gray-600">
                    {new Date(order.orderTime).toLocaleTimeString()}
                  </p>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h3 className="text-lg font-bold mb-4 text-gray-800">
                  Items Ordered
                </h3>
                <div className="space-y-3">
                  {order.items.map((item: any, index: number) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex-1">
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-gray-600">
                          Rs. {item.price} × {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">
                          Rs. {item.price * item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Special Instructions */}
              {order.notes && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-800 mb-2">
                    Special Instructions:
                  </h4>
                  <p className="text-yellow-700">{order.notes}</p>
                </div>
              )}

              {/* Bill Summary */}
              <div className="border-t pt-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>Rs. {order.subtotal}</span>
                  </div>

                  {order.discount > 0 && (
                    <div className="flex justify-between text-orange-600">
                      <span>
                        Discount (
                        {order.discountType === "percentage"
                          ? `${order.discountValue}%`
                          : `Rs. ${order.discountValue}`}
                        ):
                      </span>
                      <span>- Rs. {order.discount}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-xl font-bold border-t pt-2">
                    <span>Total Amount:</span>
                    <span className="text-green-600">Rs. {order.total}</span>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="text-center border-t pt-6 text-gray-600">
                <p className="text-lg font-semibold mb-2">
                  Thank you for dining with us! 🙏
                </p>
                <p className="text-sm">
                  Please keep this receipt for your records
                </p>
                <p className="text-sm mt-2">Visit us again soon!</p>
              </div>

              {/* Print timestamp */}
              <div className="text-center text-xs text-gray-400 print:block hidden">
                <p>Printed on: {new Date().toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons - Print Hidden */}
          <div className="mt-8 text-center space-y-4 print:hidden animate-fadeIn animation-delay-500">
            <div className="flex gap-4 justify-center">
              <Button
                onClick={() => router.push("/orders/create")}
                variant="outline"
                className="hover:scale-105 transition-transform"
              >
                Create Another Order
              </Button>
              <Button
                onClick={() => router.push("/?tab=orders")}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 hover:scale-105 transition-transform"
              >
                View All Orders
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body {
            -webkit-print-color-adjust: exact;
          }
          @page {
            margin: 0.5in;
          }
        }
      `}</style>
    </div>
  );
}
