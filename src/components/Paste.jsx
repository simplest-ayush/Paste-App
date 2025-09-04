// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { removeAllPaste } from "../redux/pasteSlice";
// import toast from "react-hot-toast";
// import { NavLink } from "react-router-dom";
// import {
//   FacebookShareButton,
//   FacebookIcon,
//   TwitterShareButton,
//   TwitterIcon,
//   LinkedinShareButton,
//   LinkedinIcon,
//   EmailShareButton,
//   EmailIcon,
// } from "react-share";

// const Paste = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const pastes = useSelector((state) => state.paste.pastes);
//   console.log(pastes);

//   const [visibleShareId, setVisibleShareId] = useState(null);

//   const dispatch = useDispatch();
//   const filteredData = pastes.filter((paste) =>
//     paste.title.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   function handleDelete(pasteId) {
//     dispatch(removeAllPaste(pasteId));
//   }

//   const handleShareClick = (pasteId) => {
//     // Toggle visibility of sharing options
//     setVisibleShareId(visibleShareId === pasteId ? null : pasteId);
//   };

//   return (
//     <>
//       <div>
//         <input
//           type="search"
//           placeholder="Search here"
//           className="p-2 rounded-xl mt-4 min-w-[500px]"
//           value={searchTerm}
//           onChange={(e) => {
//             setSearchTerm(e.target.value);
//           }}
//         />
//         <div className="flex flex-col gap-5 mt-4">
//           {filteredData.length > 0 &&
//             filteredData.map((paste) => {
//               return (
//                 <div className="border rounded-xl p-2 m-2" key={paste?._id}>
//                   <div>{paste.title}</div>

//                   <div>{paste.content}</div>

//                   <div className="flex flex-row place-content-evenly p-2">
//                     <button>
//                       <NavLink to={`/?pasteId=${paste?._id}`}>Edit</NavLink>
//                     </button>

//                     <button>
//                       <NavLink to={`/pastes/${paste?._id}`}>View</NavLink>
//                     </button>

//                     <button onClick={() => handleDelete(paste?._id)}>
//                       Delete
//                     </button>

//                     <button
//                       onClick={() => {
//                         navigator.clipboard.writeText(paste?.content);
//                         toast.success("Copied to Clipboard", {
//                           duration: 1000,
//                         });
//                       }}
//                     >
//                       Copy
//                     </button>

//                     <button onClick={() => handleShareClick(paste?._id)}>
//                       Share
//                     </button>
//                   </div>
//                   <div>{paste.createdAt}</div>
//                   {/* Render sharing options if this paste's ID matches visibleShareId */}
//                   {visibleShareId === paste?._id && (
//                     <div className="flex flex-row place-content-center space-x-2 mt-2">
//                       <TwitterShareButton
//                         url={window.location.href + `/?pasteId=${paste._id}`}
//                       >
//                         <TwitterIcon size={32} round />
//                       </TwitterShareButton>

//                       <FacebookShareButton
//                         url={window.location.href + `/?pasteId=${paste._id}`}
//                       >
//                         <FacebookIcon size={32} round />
//                       </FacebookShareButton>

//                       <LinkedinShareButton
//                         url={window.location.href + `/?pasteId=${paste._id}`}
//                       >
//                         <LinkedinIcon size={32} round />
//                       </LinkedinShareButton>

//                       <EmailShareButton
//                         url={window.location.href + `/?pasteId=${paste._id}`}
//                       >
//                         <EmailIcon size={32} round />
//                       </EmailShareButton>
//                     </div>
//                   )}
//                 </div>
//               );
//             })}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Paste;

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeAllPaste } from "../redux/pasteSlice";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
  EmailShareButton,
  EmailIcon,
} from "react-share";

const Paste = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const pastes = useSelector((state) => state.paste.pastes);
  const [visibleShareId, setVisibleShareId] = useState(null);
  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeAllPaste(pasteId));
    toast.success("Paste deleted successfully!", { duration: 2000 });
  }

  const handleShareClick = (pasteId) => {
    setVisibleShareId(visibleShareId === pasteId ? null : pasteId);
  };

  const handleCopy = (content, title) => {
    navigator.clipboard.writeText(content);
    toast.success(`"${title}" copied to clipboard!`, { duration: 2000 });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            My Pastes
          </h1>
          <p className="text-gray-300 text-lg sm:text-xl max-w-2xl mx-auto">
            Manage, share, and organize all your saved pastes in one place.
          </p>
        </div>

        {/* Search Section */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-8 shadow-xl border border-white/20">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="search"
              placeholder="Search your pastes by title..."
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Search Stats */}
          <div className="mt-4 flex items-center justify-between text-sm text-gray-400">
            <span>
              {filteredData.length} of {pastes.length} pastes
            </span>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                Clear search
              </button>
            )}
          </div>
        </div>

        {/* Pastes Grid */}
        {filteredData.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredData.map((paste) => (
              <div
                key={paste?._id}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105"
              >
                {/* Paste Header */}
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-white mb-2 line-clamp-2">
                    {paste.title}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Created on {paste.createdAt}
                  </p>
                </div>

                {/* Paste Content Preview */}
                <div className="mb-6">
                  <div className="bg-gray-900/50 rounded-lg p-4 max-h-32 overflow-hidden relative">
                    <pre className="text-gray-300 text-sm font-mono whitespace-pre-wrap line-clamp-4">
                      {paste.content}
                    </pre>
                    <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-gray-900/50 to-transparent"></div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <NavLink
                    to={`/?pasteId=${paste?._id}`}
                    className="flex items-center justify-center px-3 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-all duration-300 text-sm font-medium"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
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
                    Edit
                  </NavLink>

                  <NavLink
                    to={`/pastes/${paste?._id}`}
                    className="flex items-center justify-center px-3 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-all duration-300 text-sm font-medium"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    View
                  </NavLink>

                  <button
                    onClick={() => handleCopy(paste?.content, paste?.title)}
                    className="flex items-center justify-center px-3 py-2 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-all duration-300 text-sm font-medium"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
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
                    onClick={() => handleDelete(paste?._id)}
                    className="flex items-center justify-center px-3 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all duration-300 text-sm font-medium"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    Delete
                  </button>
                </div>

                {/* Share Button */}
                <button
                  onClick={() => handleShareClick(paste?._id)}
                  className="w-full flex items-center justify-center px-3 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white rounded-lg hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-300 text-sm font-medium mb-4"
                >
                  <svg
                    className="w-4 h-4 mr-2"
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
                  Share Paste
                </button>

                {/* Social Sharing Options */}
                {visibleShareId === paste?._id && (
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <h4 className="text-white text-sm font-medium mb-3 text-center">
                      Share via
                    </h4>
                    <div className="flex justify-center space-x-3">
                      <TwitterShareButton
                        url={`${window.location.origin}/?pasteId=${paste._id}`}
                        title={paste.title}
                        className="transform hover:scale-110 transition-transform duration-200"
                      >
                        <TwitterIcon size={40} round />
                      </TwitterShareButton>

                      <FacebookShareButton
                        url={`${window.location.origin}/?pasteId=${paste._id}`}
                        quote={paste.title}
                        className="transform hover:scale-110 transition-transform duration-200"
                      >
                        <FacebookIcon size={40} round />
                      </FacebookShareButton>

                      <LinkedinShareButton
                        url={`${window.location.origin}/?pasteId=${paste._id}`}
                        title={paste.title}
                        className="transform hover:scale-110 transition-transform duration-200"
                      >
                        <LinkedinIcon size={40} round />
                      </LinkedinShareButton>

                      <EmailShareButton
                        url={`${window.location.origin}/?pasteId=${paste._id}`}
                        subject={`Check out this paste: ${paste.title}`}
                        body={`I wanted to share this paste with you: ${paste.title}`}
                        className="transform hover:scale-110 transition-transform duration-200"
                      >
                        <EmailIcon size={40} round />
                      </EmailShareButton>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          // Empty State
          <div className="text-center py-16">
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-12 max-w-md mx-auto">
              <div className="w-24 h-24 bg-gray-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">
                {searchTerm ? "No pastes found" : "No pastes yet"}
              </h3>
              <p className="text-gray-400 mb-8">
                {searchTerm
                  ? `No pastes match "${searchTerm}". Try adjusting your search.`
                  : "You haven't created any pastes yet. Start by creating your first paste!"}
              </p>
              {searchTerm ? (
                <button
                  onClick={() => setSearchTerm("")}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300"
                >
                  Clear Search
                </button>
              ) : (
                <NavLink
                  to="/"
                  className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300"
                >
                  Create Your First Paste
                </NavLink>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Paste;
