import React from "react";

const Gallery = () => {
  return (
    <div className="relative flex flex-col items-center justify-center h-[80vh] text-center bg-gradient-to-br from-orange-50 to-white overflow-hidden">
      {/* Background square grid pattern */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0,0,0,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Gallery</h1>
        <p className="text-lg text-gray-600 mb-6">
          This page is currently under construction 🚧
        </p>
        <div className="px-6 py-3 bg-orange-500 text-white rounded-lg shadow-md">
          Coming live on Oct, 2025
        </div>
      </div>
    </div>
  );
};

export default Gallery;
