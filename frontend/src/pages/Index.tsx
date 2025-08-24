import React from "react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MessageCircle, Users, Zap, ArrowRight, Shield } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-purple-50">
      {/* Hero Section */}
      <section className="relative py-24 px-6 md:px-12">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-purple-700 via-pink-600 to-red-500 bg-clip-text text-transparent select-none tracking-tight drop-shadow-lg">
              Connect Through Conversations
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed tracking-wide">
              Join ThreadWave, where meaningful discussions happen. Share ideas,
              ask questions, and connect with a vibrant community of thinkers
              and creators.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-md mx-auto">
              {/* User Login */}
              <Link to="/login" className="flex-1">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300 border-0 w-full"
                >
                  User Login
                  <ArrowRight className="ml-3 h-5 w-5" />
                </Button>
              </Link>

              {/* Admin Login */}
              <Link to="/admin/login" className="flex-1">
                <Button
                  size="lg"
                  variant="outline"
                  className="flex items-center justify-center gap-2 border-purple-600 text-white-700 hover:bg-purple-100  hover:text-black hover:scale-105 transition-transform duration-300 w-full"
                >
                  <Shield className="h-5 w-5" />
                  Admin Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 md:px-12 bg-purple-100">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-extrabold mb-4 text-purple-800 tracking-wide drop-shadow-sm">
              Why Choose ThreadWave?
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg tracking-wide">
              Experience the next generation of online discussions with features
              designed for meaningful connections.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {[
              {
                Icon: MessageCircle,
                title: "Rich Discussions",
                description:
                  "Engage in threaded conversations that keep discussions organized and easy to follow.",
              },
              {
                Icon: Users,
                title: "Active Community",
                description:
                  "Connect with like-minded individuals across various topics and interests.",
              },
              {
                Icon: Zap,
                title: "Real-time Updates",
                description:
                  "Stay connected with live notifications and real-time conversation updates.",
              },
            ].map(({ Icon, title, description }) => (
              <Card
                key={title}
                className="text-center shadow-lg rounded-xl border border-transparent hover:border-purple-400 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              >
                <CardHeader>
                  <div className="w-14 h-14 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-5 text-white shadow-md">
                    <Icon className="h-7 w-7" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-purple-900">
                    {title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-700 px-6 pb-6">
                    {description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
    </div>
  );
};

export default Index;
