// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useSearchParams } from "react-router-dom";
// import { addPaste, updatePaste } from "../redux/pasteSlice";

// const Home = () => {
//   const [title, setTitle] = useState("");
//   const [value, setValue] = useState("");
//   const [searchParams, setSearchParams] = useSearchParams();
//   const pasteId = searchParams.get("pasteId");
//   const dispatch = useDispatch();
//   const allPaste = useSelector((state) => state.paste.pastes);

//   useEffect(() => {
//     if (pasteId) {
//       const paste = allPaste.find((p) => p._id === pasteId);
//       setTitle(paste.title);
//       setValue(paste.content);
//     }
//   }, [pasteId]);

//   function createPaste() {
//     const paste = {
//       title: title,
//       content: value,
//       _id: pasteId || Date.now().toString(23),
//       createdAt: new Date().toDateString(),
//     };

//     if (pasteId) {
//       // update if paste id is available
//       dispatch(updatePaste(paste));
//     } else {
//       // create if paste id is not available
//       dispatch(addPaste(paste));
//     }

//     // after updation
//     setTitle("");
//     setValue("");
//     setSearchParams({});
//   }

//   return (
//     <>
//       <div className="flex flex-row gap-6 place-content-between">
//         <input
//           className="p-2 rounded-lg mt-4 w-[65%]"
//           type="text"
//           placeholder="Enter Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />

//         <button
//           onClick={createPaste}
//           className="p-2 rounded-lg mt-2 bg-blue-700"
//         >
//           {pasteId ? "Update My Paste" : "Create My Paste"}
//         </button>
//       </div>
//       <div className="mt-4">
//         <textarea
//           className="min-w-[500px] rounded-xl p-3 mt-5 bg-black resize-none"
//           value={value}
//           placeholder="Enter your paste here"
//           onChange={(e) => setValue(e.target.value)}
//           rows={20}
//         ></textarea>
//       </div>
//     </>
//   );
// };

// export default Home;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addPaste, updatePaste } from "../redux/pasteSlice";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const allPaste = useSelector((state) => state.paste.pastes);

  useEffect(() => {
    if (pasteId) {
      const paste = allPaste.find((p) => p._id === pasteId);
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      }
    }
  }, [pasteId, allPaste]);

  function createPaste() {
    if (!title.trim() || !value.trim()) {
      return; // Add validation if needed
    }

    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(23),
      createdAt: new Date().toDateString(),
    };

    if (pasteId) {
      dispatch(updatePaste(paste));
    } else {
      dispatch(addPaste(paste));
    }

    setTitle("");
    setValue("");
    setSearchParams({});
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            {pasteId ? "Edit Your Paste" : "Create New Paste"}
          </h1>
          <p className="text-gray-300 text-lg sm:text-xl max-w-2xl mx-auto">
            {pasteId
              ? "Make changes to your existing paste and save them instantly."
              : "Share your code, notes, or any text content with the world."}
          </p>
        </div>

        {/* Main Form */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl border border-white/20">
          {/* Title Input Section */}
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 mb-8">
            <div className="flex-1">
              <label className="block text-white text-sm font-medium mb-2">
                Title
              </label>
              <input
                className="w-full p-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                type="text"
                placeholder="Enter a descriptive title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="lg:flex lg:items-end">
              <button
                onClick={createPaste}
                disabled={!title.trim() || !value.trim()}
                className="w-full lg:w-auto px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-2xl hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {pasteId ? "Update Paste" : "Create Paste"}
              </button>
            </div>
          </div>

          {/* Content Textarea Section */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Content
            </label>
            <div className="relative">
              <textarea
                className="w-full min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] p-6 rounded-2xl bg-gray-900/50 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 resize-none backdrop-blur-sm font-mono text-sm sm:text-base leading-relaxed"
                value={value}
                placeholder="Paste your content here... 

• Code snippets
• Notes and ideas  
• Configuration files
• Any text content you want to share"
                onChange={(e) => setValue(e.target.value)}
              />

              {/* Character Count */}
              <div className="absolute bottom-4 right-4 text-gray-400 text-sm bg-gray-800/70 px-3 py-1 rounded-lg backdrop-blur-sm">
                {value.length} characters
              </div>
            </div>
          </div>

          {/* Action Buttons Mobile */}
          <div className="lg:hidden mt-6">
            <button
              onClick={createPaste}
              disabled={!title.trim() || !value.trim()}
              className="w-full px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-2xl hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {pasteId ? "Update Paste" : "Create Paste"}
            </button>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-blue-400"
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
            <h3 className="text-white font-semibold mb-2">Secure & Private</h3>
            <p className="text-gray-300 text-sm">
              Your pastes are stored securely with privacy in mind.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-purple-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                />
              </svg>
            </div>
            <h3 className="text-white font-semibold mb-2">Easy Sharing</h3>
            <p className="text-gray-300 text-sm">
              Share your pastes instantly with customizable links.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 sm:col-span-2 lg:col-span-1">
            <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="text-white font-semibold mb-2">Lightning Fast</h3>
            <p className="text-gray-300 text-sm">
              Create and access your pastes with blazing speed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
