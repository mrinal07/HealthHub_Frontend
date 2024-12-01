"use client";

import { useState } from "react";
import axios from "axios";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import "antd/dist/reset.css";
import { Button, message, Space } from "antd";


const navigation = [
  { name: "Home", href: "#" },
  { name: "Documents", href: "#" },
  { name: "Users", href: "#" },
];

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();

  const [formData, setFormData] = useState({
    documentName: "testing",
    documentType: "",
    additionalNotes: "testing",
    documentDate: "",
  });

  const handleFileSelect = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  

  const handleGoogleLogin = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/google/google-auth-url");
      console.log("Google login response:", response.data.url);

      const newWindow = window.open(response.data.url, '_blank', 'width=500,height=600');

      // router.push(`/upload?token=${token}`);
    }
    catch (error) {
      console.log("Google login error:", error);
    }
  };

  const testing = async () => { 
    try {
      const response = await axios.get("http://localhost:5000/api/google/fetch-data?token=ya29.a0AeDClZBMPIzDA7WXvK7tWxi4RfRTB8FG2-VOlFgSpNhRuuX-xuzVRhB7r6j0sg0AVuhRJs7I9XiXk4Gmcre9al1b7bLNm7i-s6nJ_olS2xN18UDIn5vFjNPEBvBFUgsQMw7d1obig4mS_zuilA8XbKEVJym32Mdgsa8aCgYKAbwSARASFQHGX2MiOQpbbFOGtajOfvkVnblnIQ0170");
      console.log("Testing response:", response.data.result);
    }
    catch (error) {
      console.log("Testing error:", error);
    }
  }

  

  const handleOnClick = async () => {
    // debugger
    if (!selectedFile) {
      alert("Please select a file.");
      return;
    }
    const data = new FormData();
    data.append("document", selectedFile); // File input
    data.append("Document_Name", formData.documentName); // Document name
    data.append("Document_Type", formData.documentType); // Document type
    data.append("Document_Expire_Date", formData.documentDate); // Expiration date
    data.append("Additional_Notes", formData.additionalNotes); // Additional notes
    data.append("Status_Enum", 1); // Status

    try {
      // debugger
      const response = await axios.post(
        "http://localhost:5000/api/google/upload-data",
        data,
        {
          withCredentials: true, // Ensure credentials (cookies) are sent with the request
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        // debugger
        // console.log("Upload Success:", response.data);
        successMsg("Data uploaded successfully");
        clearFormData();
      }
    } catch (error) {
      errorMsg("Failed to upload data");
      clearFormData();
      console.log("Error:", error);
    }
  };

  //#region Helper functions
  const successMsg = (msg) => {
    messageApi.open({
      type: "success",
      content: msg,
    });
  };

  const errorMsg = (msg) => {
    messageApi.open({
      type: "error",
      content: msg,
    });
  };
  const clearFormData = () => {
    setFormData({
      documentName: "testing",
      documentType: "",
      documentDate: "",
      additionalNotes: "testing",
    });
    setSelectedFile(null);
  };
  //#endregion

  return (
    <div className="bg-white">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          aria-label="Global"
          className="flex items-center justify-between p-6 lg:px-8"
        >
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                alt=""
                src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                className="h-8 w-auto"
              />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm/6 font-semibold text-gray-900"
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a href="#" className="text-sm/6 font-semibold text-gray-900">
              Log out
            </a>
          </div>
        </nav>
        <Dialog
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
          className="lg:hidden"
        >
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  alt=""
                  src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                  className="h-8 w-auto"
                />
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    Log in
                  </a>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>

      <div className="relative isolate px-6 pt-14 lg:px-8 lg:py-52">
        <div className="max-w-lg mx-auto p-6 bg-white rounded shadow">
          <h1 className="text-xl font-bold mb-4 text-center">
            Upload Health Document
          </h1>
          <div className="border-2 border-dashed border-gray-300 p-4 rounded mb-4">
            <input
              type="file"
              name="document"
              id="document"
              className="hidden"
              onChange={handleFileSelect}
            />
            <label
              htmlFor="document"
              className="cursor-pointer text-blue-500 hover:underline"
            >
              Drag and drop files here or click to browse
            </label>
            {selectedFile && (
              <p className="mt-2 text-sm text-gray-600">{selectedFile.name}</p>
            )}
          </div>
          <input
            type="text"
            placeholder="Document Name"
            name="documentName"
            className="w-full border px-3 py-2 rounded mb-4"
            onChange={handleChange}
            value={formData.documentName}
          />
          <select
            name="documentType"
            className="w-full border px-3 py-2 rounded mb-4"
            onChange={handleChange}
            value={formData.documentType}
          >
            <option value="" disabled>
              Select Document Type
            </option>
            <option value="lab-reports">Lab Reports</option>
            <option value="prescriptions">Prescriptions</option>
            <option value="imaging">Imaging (X-rays, MRIs)</option>
            <option value="vaccination">Vaccination Records</option>
            <option value="other">Other</option>
          </select>
          <input
            type="date"
            name="documentDate"
            className="w-full border px-3 py-2 rounded mb-4"
            onChange={handleChange}
            value={formData.documentDate}
          />
          <textarea
            name="additionalNotes"
            placeholder="Add additional notes (optional)"
            className="w-full border px-3 py-2 rounded mb-4"
            onChange={handleChange}
            value={formData.additionalNotes}
          ></textarea>
          {contextHolder}

          <div className="flex space-x-10">
            <div className="w-3/4">
              <button
                onClick={handleOnClick}
                className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                disabled={!selectedFile}
              >
                Upload
              </button>
            </div>

            <div>
              <button
                onClick={handleGoogleLogin}
                className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"               
              >
                Google
              </button>
            </div>

            <div>
              <button
                onClick={testing}
                className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"               
              >
                Testing
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
