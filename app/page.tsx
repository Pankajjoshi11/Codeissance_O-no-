'use client'
import { Container } from "@/components/Container";
import { Hero } from "@/components/Hero";
import { SectionTitle } from "@/components/SectionTitle";
import { Benefits } from "@/components/Benefits";
import { Video } from "@/components/Video";
import { Faq } from "@/components/Faq";
import { Cta } from "@/components/Cta";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { benefitOne, benefitTwo } from "@/components/data";

// Define Article Type
interface Article {
  title: string;
  text: string;
  img: string;
  time: string;
  url: string;
}

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);

  // Function to fetch articles when the component mounts
  useEffect(() => {
    const fetchArticles = async () => {
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
        setArticles(response.data.body.slice(0, 3)); // Limit to 3 articles
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <Container>
      <Hero />
      
      <Benefits data={benefitOne} />
      <Benefits imgPos="right" data={benefitTwo} />

      <Video videoId="fZ0D0cnR88E" />

      <SectionTitle preTitle="LATEST NEWS" title="Current News for Today">
        Reading news is important because it keeps you informed, helps you make
        better decisions, broadens your perspective, and fosters critical
        thinking about global events and issues.
      </SectionTitle>

      {/* Latest Financial News Section */}
      <div className="my-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {articles.map((article, index) => (
          <motion.div
            key={index}
            className="bg-black bg-opacity-60 rounded-xl overflow-hidden shadow-lg transform transition-transform duration-500 hover:scale-105 hover:shadow-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <img
              src={article.img}
              alt={article.title}
              className="w-full h-56 object-cover transition-transform duration-500 hover:scale-110"
            />
            <div className="p-6 space-y-4">
              <h3 className="text-2xl font-bold text-white mb-2">{article.title}</h3>
              <p className="text-gray-300 text-base line-clamp-3">{article.text}</p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-sm text-gray-400">{article.time}</span>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full text-sm font-semibold transition-colors duration-300"
                >
                  Read More
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center my-12">
        <Link href="/news" legacyBehavior>
          <a>
            <button className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-10 py-3 rounded-lg text-lg font-semibold shadow-md transition-all duration-500 transform hover:-translate-y-1 hover:shadow-xl">
              View All News
            </button>
          </a>
        </Link>
      </div>

      <SectionTitle preTitle="FAQ" title="Frequently Asked Questions">
        Answer your customers' possible questions here, it will increase the
        conversion rate as well as reduce support or chat requests.
      </SectionTitle>

      <Faq />
      <Cta />
    </Container>
  );
}
