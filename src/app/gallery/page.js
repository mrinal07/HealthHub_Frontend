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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Year and Month List</h1>
      <ul className="space-y-4">
        {data.map((item, index) => (
          <li key={item.id} id={item.id} className=" p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-900">{item.name}</h2>
            <Link href={{ pathname: "/docDetail", query: { code: item.id } }}>
              {item.name}
            </Link>
            {/* <ul className="mt-2 space-y-2">
              {item.month.map((month, idx) => (
                <li key={idx} className=" mt-1 truncate text-lg text-gray-500 cursor-pointer">                  
                  <Link href="/">{month.split("|")[0]}</Link>
                </li>
              ))}
            </ul> */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Gallery;
