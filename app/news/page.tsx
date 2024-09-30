"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";

// Define Article Type
interface Article {
  title: string;
  text: string;
  img: string;
  time: string;
  url: string;
}

// API fetching function
const fetchArticles = async (): Promise<Article[]> => {
  const options = {
    method: "GET",
    url: "https://yahoo-finance15.p.rapidapi.com/api/v2/markets/news",
    params: {
      tickers: "AAPL",
      type: "ALL",
    },
    headers: {
      "x-rapidapi-key": "2fb4de21b3mshecfe4b75cdf6729p1a9222jsnceb3d70fbff1", // Replace with your actual API key
      "x-rapidapi-host": "yahoo-finance15.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    return response.data.body as Article[]; // Cast the response data to Article[]
  } catch (error) {
    console.error(error);
    return []; // Return an empty array on error
  }
};

export default function FinancialNewsPage() {
  const [articles, setArticles] = useState<Article[]>([]); // State to store articles
  const [searchQuery, setSearchQuery] = useState("");

  // Function to fetch articles when the component mounts
  useEffect(() => {
    const loadArticles = async () => {
      const fetchedArticles = await fetchArticles();
      setArticles(fetchedArticles);
    };
    loadArticles();
  }, []);

  const loadMoreArticles = () => {
    // Simulating loading more articles if needed
  };

  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#171717] text-white">
      {/* Header */}
      <header className="bg-black bg-opacity-50 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <h1 className="text-2xl font-bold mr-8">FinNews</h1>
             
            </div>
            <div className="relative w-full md:w-64">
              <Input
                type="text"
                placeholder="Search articles..."
                className="w-full pl-10 pr-4 py-2 rounded-full bg-white bg-opacity-10 focus:bg-opacity-20 transition-all duration-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-8">Latest Financial News</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredArticles.map((article: Article, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-black bg-opacity-50 rounded-lg overflow-hidden shadow-lg"
                whileHover={{ scale: 1.05 }} // Scale up on hover
              >
                <img
                  src={article.img}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-300 mb-4">{article.text}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">
                      {article.time}
                    </span>
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#4f47e6] hover:bg-[#3f39b6] text-white px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-300"
                    >
                      Read More
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        {filteredArticles.length === 0 && (
          <p className="text-center text-gray-400 mt-8">
            No articles found matching your search.
          </p>
        )}
        {filteredArticles.length > 0 && filteredArticles.length % 3 === 0 && (
          <motion.div
            className="flex justify-center mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button onClick={loadMoreArticles} className="bg-[#4f47e6]">
              Load More
            </Button>
          </motion.div>
        )}
      </main>
    </div>
  );
}