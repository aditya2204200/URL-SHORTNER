// import React from "react";
import UrlForm from "../components/UrlForm";
import UserUrl from "../components/UserUrl";

const DashBoardPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-10 px-4 font-sans">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-6">
          URL Shortener
        </h1>
        <UrlForm />
        <UserUrl />
      </div>
    </div>
  );
};

export default DashBoardPage;
