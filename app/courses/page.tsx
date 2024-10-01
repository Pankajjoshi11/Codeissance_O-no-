"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for routing
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, DollarSign, PiggyBank, TrendingUp } from "lucide-react";

const courses = [
  {
    title: "Investing",
    description: "Learn the basics of investing and grow your wealth",
    icon: TrendingUp,
    color: "text-green-500",
    route: "courses/investing", // Define the route for each course
  },
  {
    title: "Budgeting",
    description:
      "Master the art of budgeting and take control of your finances",
    icon: DollarSign,
    color: "text-yellow-500",
    route: "courses/budgeting",
  },
  {
    title: "Retirement Planning",
    description: "Prepare for a comfortable retirement with smart planning",
    icon: PiggyBank,
    color: "text-purple-500",
    route: "courses/retirementplanning",
  },
  {
    title: "Saving",
    description:
      "Discover effective strategies to save money and reach your goals",
    icon: BookOpen,
    color: "text-blue-500",
    route: "courses/saving",
  },
];

export default function CoursesPage() {
  const [hoveredCourse, setHoveredCourse] = useState<string | null>(null);
  const router = useRouter(); // Initialize useRouter

  const handleRoute = (route: string) => {
    router.push(route); // Navigate to the route
  };

  return (
    <div className="min-h-screen bg-[#171717] text-white p-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-white">
        Financial Education Courses
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {courses.map((course) => (
          <motion.div
            key={course.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.05 }}
            onHoverStart={() => setHoveredCourse(course.title)}
            onHoverEnd={() => setHoveredCourse(null)}
          >
            <Card className="bg-[#171717] border-[#4f47e6] h-full flex flex-col">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl font-bold text-white">
                    {course.title}
                  </CardTitle>
                  <course.icon className={`w-8 h-8 ${course.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-white">
                  {course.description}
                </CardDescription>
              </CardContent>
              <CardFooter className="mt-auto">
                <Button
                  className="w-full bg-[#4f47e6] hover:bg-[#4f47e6]/80 text-white"
                  onClick={() => handleRoute(course.route)} // Route to the course page
                >
                  Start Learning
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
