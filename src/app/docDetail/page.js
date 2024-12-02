"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

function page() {
  const [data, setData] = useState([]); // This holds the API response data

  useEffect(() => {
    // console.log("code->", code);
    const fetchData = async () => {
      try {
        //debugger;
        const urlParams = new URLSearchParams(window.location.search);
        // console.log("urlParams->", urlParams.get("code"));
        const code = urlParams.get("code");

        const response = await axios.get(
          "http://localhost:5000/api/google/fetch-detailed-data?code=" + code,
          { withCredentials: true } // Important to allow cookies
        );
        // console.log("response->", response.data.result);
        // Replace with your API endpoint
        if (response.status === 200) {
          console.log("response->", response.data.result);
          setData(response.data.result);
          //   console.log("data->", data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    data && (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
        <form className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-xl font-semibold text-gray-800">
            Health Information
          </h2>
          {data.map((item, index) => (
            <div key={item._id} className="space-y-8">
              <div key={index} className="border-b border-gray-300 pb-8">
                <p className="mt-10 text-base text-indigo-600 font-bold">
                  [{item.Date}]
                </p>

                {item.img.map((img, idx) => (
                  <div key={img._id} className="mt-6">
                    <p className="text-sm text-gray-500">({idx + 1})</p>
                    <div
                      id={img._id}
                      className="grid grid-cols-1 gap-y-6 gap-x-6 sm:grid-cols-2"
                    >
                      <div>
                        <label
                          htmlFor="dbDocumentName"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Document Name
                        </label>
                        <input
                          id="dbDocumentName"
                          name="dbDocumentName"
                          type="text"
                          value={img.dbDocumentName}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="dbDocumentType"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Document Type
                        </label>
                        <input
                          id="dbDocumentType"
                          name="dbDocumentType"
                          type="text"
                          value={img.dbDocumentType}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>

                      <div className="col-span-2">
                        <label
                          htmlFor="dbDocumentDescription"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Document Description/ Notes
                        </label>
                        <textarea
                          id="dbDocumentDescription"
                          name="dbDocumentDescription"
                          value={img.dbDocumentDescription}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="dbDocumentUploadDate"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Upload Date
                        </label>
                        <input
                          id="dbDocumentUploadDate"
                          name="dbDocumentUploadDate"
                          type="text"
                          value={img.dbDocumentUploadDate}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="fileThumbnailLink"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Download Document
                        </label>
                        <Link
                           href={`https://drive.google.com/uc?id=${img.dbDocumentDriveId}&export=download`}
                          target="_blank"
                          className="mt-1 block text-indigo-600 underline"
                        >
                          Click to Download
                        </Link>
                        {/* <iframe
                          src={img.fileThumbnailLink}
                          width="100%"
                          height="500px"
                        ></iframe> */}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* <div className="mt-6 flex items-center justify-end gap-4">
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Save
            </button>
          </div> */}
        </form>
      </div>
    )
  );
}

export default page;
