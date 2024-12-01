"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

function page() {
  const [data, setData] = useState([]); // This holds the API response data

  useEffect(() => {
    // console.log("code->", code);
    const fetchData = async () => {
      try {
        //debugger;
        const urlParams = new URLSearchParams(window.location.search);
        console.log("urlParams->", urlParams.get("code"));
        const code = urlParams.get("code");

        const response = await axios.get(
          "http://localhost:5000/api/google/fetch-detailed-data?code="+code,
          { withCredentials: true } // Important to allow cookies
        );
        // console.log("response->", response.data.result);
        // Replace with your API endpoint
        if (response.status === 200) {
          console.log("response->", response.data);
          setData(response.data.result);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return <div>page</div>;
}

export default page;
