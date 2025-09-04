// import React, { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams, useSearchParams } from "react-router-dom";

// const ViewPaste = () => {
//   const { id } = useParams();
//   const allPaste = useSelector((state) => state.paste.pastes);
//   const paste = allPaste.filter((p) => p._id === id)[0];

//   function handleCopy() {
//     navigator.clipboard.writeText(paste.content);
//     toast.success("Copied to clipboard", { duration: 1000 });
//   }

//   return (
//     <>
//       <div className="flex flex-row gap-6 place-content-between">
//         <input
//           className="p-2 rounded-lg mt-2 min-w-[500px]"
//           type="text"
//           value={paste.title}
//           disabled
//         />
//       </div>
//       <div className="mt-4 relative">
//         <textarea
//           className="min-w-[500px] rounded-xl p-3 mt-5 bg-black resize-none"
//           value={paste.content}
//           disabled
//           rows={20}
//         ></textarea>
//         <button
//           className="bg-gray-900 absolute right-2 top-7"
//           onClick={handleCopy}
//         >
//           Copy
//         </button>
//       </div>
//     </>
//   );
// };

// export default ViewPaste;

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, NavLink } from "react-router-dom";

const ViewPaste = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const allPaste = useSelector((state) => state.paste.pastes);
  const paste = allPaste.find((p) => p._id === id);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (!paste) {
      toast.error("Paste not found!");
      navigate("/pastes");
    }
  }, [paste, navigate]);

  function handleCopy() {
    navigator.clipboard.writeText(paste.content);
    toast.success("Content copied to clipboard!", { duration: 2000 });
  }

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([paste.content], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `${paste.title}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success("File downloaded!", { duration: 2000 });
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  if (!paste) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-white text-xl">Loading paste...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 ${
        isFullscreen ? "fixed inset-0 z-50" : "p-4 sm:p-6 lg:p-8"
      }`}
    >
      <div
        className={`${
          isFullscreen ? "h-full flex flex-col p-4" : "max-w-6xl mx-auto"
        }`}
      >
        {/* Header Section */}
        <div className={`${isFullscreen ? "mb-4" : "text-center mb-8"}`}>
          {!isFullscreen && (
            <>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                View Paste
              </h1>
              <p className="text-gray-300 text-lg sm:text-xl max-w-2xl mx-auto">
                Read-only view of your saved paste with handy tools.
              </p>
            </>
          )}
        </div>

        {/* Paste Container */}
        <div
          className={`bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 ${
            isFullscreen ? "flex-1 flex flex-col" : "p-6 sm:p-8 lg:p-10"
          }`}
        >
          {/* Title Section */}
          <div
            className={`flex flex-col lg:flex-row gap-4 lg:gap-6 ${
              isFullscreen ? "p-6 pb-4" : "mb-6"
            }`}
          >
            <div className="flex-1">
              <label className="block text-white text-sm font-medium mb-2">
                Title
              </label>
              <div className="relative">
                <input
                  className="w-full p-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm cursor-not-allowed"
                  type="text"
                  value={paste.title}
                  disabled
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 lg:items-end">
              <button
                onClick={handleCopy}
                className="px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-600 hover:to-emerald-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                Copy
              </button>

              <button
                onClick={handleDownload}
                className="px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Download
              </button>
            </div>
          </div>

          {/* Content Section */}
          <div className={`${isFullscreen ? "flex-1 p-6 pt-0" : ""}`}>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-white text-sm font-medium">
                Content
              </label>
              <div className="flex items-center gap-2">
                <span className="text-gray-400 text-sm">
                  {paste.content.length} characters
                </span>
                <button
                  onClick={toggleFullscreen}
                  className="p-2 text-gray-400 hover:text-white transition-colors duration-200"
                  title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                >
                  {isFullscreen ? (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 9V4.5M9 9H4.5M9 9L3.5 3.5M15 9h4.5M15 9V4.5M15 9l5.5-5.5M9 15v4.5M9 15H4.5M9 15l-5.5 5.5M15 15h4.5M15 15v4.5m0 0l5.5 5.5"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className={`relative ${isFullscreen ? "h-full" : ""}`}>
              <textarea
                className={`w-full p-6 rounded-2xl bg-gray-900/50 border border-white/20 text-gray-100 focus:outline-none resize-none backdrop-blur-sm font-mono text-sm sm:text-base leading-relaxed cursor-text select-all ${
                  isFullscreen
                    ? "h-full"
                    : "min-h-[400px] sm:min-h-[500px] lg:min-h-[600px]"
                }`}
                value={paste.content}
                disabled
              />

              {/* Copy button overlay */}
              <button
                onClick={handleCopy}
                className="absolute top-4 right-4 bg-gray-800/70 hover:bg-gray-700/70 text-white px-3 py-2 rounded-lg backdrop-blur-sm transition-all duration-200 flex items-center gap-2 text-sm"
                title="Copy content"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                <span className="hidden sm:inline">Copy</span>
              </button>
            </div>
          </div>

          {/* Footer Actions */}
          {!isFullscreen && (
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mt-8 p-6 bg-white/5 rounded-2xl border border-white/10">
              <div className="text-gray-400 text-sm">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Created on {paste.createdAt}
                </div>
              </div>

              <div className="flex gap-3">
                <NavLink
                  to={`/?pasteId=${paste._id}`}
                  className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-all duration-300 flex items-center gap-2 text-sm font-medium"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  Edit Paste
                </NavLink>

                <NavLink
                  to="/pastes"
                  className="px-4 py-2 bg-gray-500/20 text-gray-400 rounded-lg hover:bg-gray-500/30 hover:text-white transition-all duration-300 flex items-center gap-2 text-sm font-medium"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  Back to Pastes
                </NavLink>
              </div>
            </div>
          )}

          {/* Fullscreen mode footer */}
          {isFullscreen && (
            <div className="p-4 border-t border-white/20 flex justify-between items-center">
              <div className="text-gray-400 text-sm">
                Created on {paste.createdAt}
              </div>
              <button
                onClick={toggleFullscreen}
                className="px-4 py-2 bg-gray-500/20 text-gray-400 rounded-lg hover:bg-gray-500/30 hover:text-white transition-all duration-300 flex items-center gap-2 text-sm font-medium"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                Exit Fullscreen
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewPaste;
