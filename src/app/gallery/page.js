"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

function Gallery() {
  const [data, setData] = useState([]); // This holds the API response data

  useEffect(() => {
    const fetchData = async () => {
      try {
        // debugger;
        const response = await axios.get(
          "http://localhost:5000/api/google/fetch-data",
          { withCredentials: true } // Important to allow cookies
        );

        // console.log("response->", response.data.result);
        // Replace with your API endpoint
        if (response.status === 200) {
          console.log("response->", response.data.result);
          setData(response.data.result);
        }
      } catch (err) {
        // If user is not authenticated, redirect to home page
        if (err.status === 401) {
          console.log("response->", err);
          window.location.href = "/home";
        }
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="container mx-auto p-4 max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-6 text-indigo-700">
          Year and Month List
        </h1>
        <ul className="space-y-4">
          {data.map((item, index) => (
            <li
              key={item.id}
              id={item.id}
              className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                {item.name}
              </h2>
              <Link
                href={{ pathname: "/docDetail", query: { code: item.id } }}
                className="text-indigo-600 text-lg underline hover:text-indigo-800 transition-colors"
              >
                View Details
              </Link>

              {/* Uncomment and modify this section if required */}
              {/* 
          <ul className="mt-4 space-y-2">
            {item.month.map((month, idx) => (
              <li
                key={idx}
                className="mt-1 truncate text-lg text-gray-500 cursor-pointer"
              >
                <Link href="/" className="hover:text-indigo-600 transition-colors">
                  {month.split("|")[0]}
                </Link>
              </li>
            ))}
          </ul> 
          */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Gallery;
