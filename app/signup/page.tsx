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
import { ChefHat, Eye, EyeOff, CheckCircle } from "lucide-react";
import { RestaurantBrand } from "@/components/ui/restaurant-logo";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    if (!formData.email.includes("@")) {
      setError("Please enter a valid email address");
      setLoading(false);
      return;
    }

    try {
      // In a real app, you'd call your API here
      // For demo purposes, we'll simulate success
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSuccess(true);
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err) {
      setError("Registration failed. Please try again.");
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

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Success confetti animation */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random()}s`,
              }}
            ></div>
          ))}
        </div>

        <Card className="w-full max-w-md backdrop-blur-sm bg-white/90 border-0 shadow-2xl animate-zoomIn">
          <CardContent className="pt-8 pb-8">
            <div className="text-center space-y-6">
              <div className="relative">
                <CheckCircle className="h-20 w-20 text-green-500 mx-auto animate-pulse" />
                <div className="absolute inset-0 rounded-full bg-green-400 opacity-20 animate-ping"></div>
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent animate-fadeIn">
                  Account Created! 🎉
                </h2>
                <p className="text-gray-600 animate-fadeIn animation-delay-300">
                  Your account has been created successfully.
                </p>
                <div className="flex items-center justify-center mt-4 animate-fadeIn animation-delay-500">
                  <div className="w-6 h-6 border-2 border-green-500 border-t-transparent rounded-full animate-spin mr-2"></div>
                  <span className="text-green-600 font-medium">
                    Redirecting to login...
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-emerald-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-teal-200 to-emerald-300 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-tr from-emerald-200 to-green-300 rounded-full opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-gradient-to-r from-amber-200 to-emerald-300 rounded-full opacity-15 animate-bounce animation-delay-1000"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="flex items-center justify-center mb-8 animate-fadeInDown">
          <RestaurantBrand />
        </div>

        <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-2xl animate-fadeInUp hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-1">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent animate-fadeIn">
              Create Account
            </CardTitle>
            <CardDescription className="text-gray-600 animate-fadeIn animation-delay-200">
              Sign up to access the restaurant management system
            </CardDescription>
          </CardHeader>
          <CardContent className="animate-fadeIn animation-delay-300">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2 animate-slideInLeft animation-delay-400">
                <Label htmlFor="username" className="text-gray-700 font-medium">
                  Username
                </Label>
                <div className="relative group">
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Choose a username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    className="pl-4 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-300 hover:border-teal-300 bg-white/50"
                  />
                  <div className="absolute inset-y-0 right-3 flex items-center">
                    <div className="w-2 h-2 bg-purple-500 rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
              </div>

              <div className="space-y-2 animate-slideInRight animation-delay-500">
                <Label htmlFor="email" className="text-gray-700 font-medium">
                  Email
                </Label>
                <div className="relative group">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="pl-4 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-300 hover:border-emerald-300 bg-white/50"
                  />
                  <div className="absolute inset-y-0 right-3 flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
              </div>

              <div className="space-y-2 animate-slideInLeft animation-delay-600">
                <Label htmlFor="password" className="text-gray-700 font-medium">
                  Password
                </Label>
                <div className="relative group">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="pl-4 pr-12 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 hover:border-green-300 bg-white/50"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1 h-8 w-8 rounded-md hover:bg-blue-100 transition-colors duration-200"
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

              <div className="space-y-2 animate-slideInRight animation-delay-700">
                <Label
                  htmlFor="confirmPassword"
                  className="text-gray-700 font-medium"
                >
                  Confirm Password
                </Label>
                <div className="relative group">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="pl-4 pr-12 py-3 border-2 border-gray-200 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all duration-300 hover:border-cyan-300 bg-white/50"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1 h-8 w-8 rounded-md hover:bg-pink-100 transition-colors duration-200"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
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
                className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none animate-slideInUp animation-delay-800"
                disabled={loading}
              >
                <div className="flex items-center justify-center">
                  {loading && (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  )}
                  {loading ? "Creating Account..." : "Create Account"}
                </div>
              </Button>

              <div className="text-center text-sm animate-fadeIn animation-delay-900">
                <span className="text-gray-600">Already have an account? </span>
                <Link
                  href="/login"
                  className="text-purple-600 hover:text-purple-700 font-medium transition-colors duration-200 hover:underline"
                >
                  Sign in
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
