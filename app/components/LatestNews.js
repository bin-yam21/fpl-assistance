"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function LatestNews() {
  const API_KEY = "ad5206210ef740efac5e2738c45e9784";
  const [news, setNews] = useState([]);

  useEffect(() => {
    // Fetch latest news from an API (Replace with actual FPL news API)
    const fetchNews = async () => {
      try {
        const response = await fetch(
          "https://newsapi.org/v2/everything?q=Premier+League&apiKey=ad5206210ef740efac5e2738c45e9784"
        ); // Example API endpoint
        const data = await response.json();
        setNews(data.articles.slice(0, 4)); // Show only latest 4 articles
      } catch (error) {
        console.error("Failed to fetch news:", error);
      }
    };

    fetchNews();
  }, []);

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-6 lg:px-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center">
          Latest News
        </h2>
        <p className="text-gray-600 text-center mt-2">
          Stay updated with the latest FPL insights and match reports.
        </p>

        {/* News Grid */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {news.length > 0 ? (
            news.map((article, index) => (
              <Link href={article.url} key={index} target="_blank">
                <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition transform hover:-translate-y-1 cursor-pointer">
                  <Image
                    src={article.urlToImage || "/placeholder-news.jpg"} // Default image if none provided
                    alt={article.title}
                    width={400}
                    height={250}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {article.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-2">
                      {new Date(article.publishedAt).toLocaleDateString()}
                    </p>
                    <p className="text-gray-600 mt-2 text-sm">
                      {article.description.slice(0, 100)}...
                    </p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center text-gray-500">No news available</p>
          )}
        </div>

        {/* View More Button */}
        <div className="flex justify-center mt-8">
          <Link href="/news">
            <button className="px-6 py-3 bg-blue-600 text-white text-lg font-medium rounded-lg hover:bg-blue-700 transition">
              View More News
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
