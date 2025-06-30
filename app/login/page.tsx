"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
import { ChefHat, Eye, EyeOff } from "lucide-react";
import { RestaurantBrand } from "@/components/ui/restaurant-logo";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Basic validation
      if (!formData.username.trim() || !formData.password.trim()) {
        setError("Please enter both username and password");
        return;
      }

      if (formData.password.length < 3) {
        setError("Password must be at least 3 characters");
        return;
      }

      // For demo purposes, accept any valid username/password
      localStorage.setItem(
        "user",
        JSON.stringify({
          username: formData.username,
          role: "admin",
        }),
      );

      // Small delay to show loading state
      await new Promise((resolve) => setTimeout(resolve, 500));

      router.push("/");
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-200 to-teal-300 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-teal-200 to-cyan-300 rounded-full opacity-20 animate-pulse animation-delay-2000"></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-green-200 to-emerald-300 rounded-full opacity-10 animate-spin"
          style={{ animationDuration: "20s" }}
        ></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="flex items-center justify-center mb-8 animate-fadeInDown">
          <RestaurantBrand />
        </div>

        <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-2xl animate-fadeInUp hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-1">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent animate-fadeIn">
              Sign In
            </CardTitle>
            <CardDescription className="text-gray-600 animate-fadeIn animation-delay-200">
              Enter your credentials to access the restaurant management system
            </CardDescription>
          </CardHeader>
          <CardContent className="animate-fadeIn animation-delay-300">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2 animate-slideInLeft animation-delay-400">
                <Label htmlFor="username" className="text-gray-700 font-medium">
                  Username
                </Label>
                <div className="relative group">
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Enter your username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    className="pl-4 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-300 hover:border-emerald-300 bg-white/50"
                  />
                  <div className="absolute inset-y-0 right-3 flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
              </div>

              <div className="space-y-2 animate-slideInRight animation-delay-500">
                <Label htmlFor="password" className="text-gray-700 font-medium">
                  Password
                </Label>
                <div className="relative group">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="pl-4 pr-12 py-3 border-2 border-gray-200 rounded-lg focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-300 hover:border-teal-300 bg-white/50"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1 h-8 w-8 rounded-md hover:bg-orange-100 transition-colors duration-200"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-500" />
                    )}
                  </Button>
                </div>
              </div>

              {error && (
                <div className="text-sm text-red-600 bg-red-50 border border-red-200 p-3 rounded-lg animate-shake">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></div>
                    {error}
                  </div>
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none animate-slideInUp animation-delay-600"
                disabled={loading}
              >
                <div className="flex items-center justify-center">
                  {loading && (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  )}
                  {loading ? "Signing In..." : "Sign In"}
                </div>
              </Button>

              <div className="text-center text-sm animate-fadeIn animation-delay-700">
                <span className="text-gray-600">Don't have an account? </span>
                <Link
                  href="/signup"
                  className="text-emerald-600 hover:text-emerald-700 font-medium transition-colors duration-200 hover:underline"
                >
                  Sign up
                </Link>
              </div>

              <div className="text-center text-xs bg-gradient-to-r from-emerald-50 to-teal-50 p-4 rounded-lg border border-emerald-200 animate-fadeIn animation-delay-800">
                <p className="text-gray-600 mb-2 font-medium">Quick Test:</p>
                <div className="space-y-1">
                  <p className="text-gray-500">
                    Try any username (min 1 char) and password (min 3 chars)
                  </p>
                  <p className="text-xs text-emerald-600">
                    Example: username "test" password "123"
                  </p>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
