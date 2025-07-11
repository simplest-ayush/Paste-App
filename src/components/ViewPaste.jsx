import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";

const ViewPaste = () => {
  const { id } = useParams();
  const allPaste = useSelector((state) => state.paste.pastes);
  const paste = allPaste.filter((p) => p._id === id)[0];

  function handleCopy() {
    navigator.clipboard.writeText(paste.content);
    toast.success("Copied to clipboard", { duration: 1000 });
  }

  return (
    <>
      <div className="flex flex-row gap-6 place-content-between">
        <input
          className="p-2 rounded-lg mt-2 min-w-[500px]"
          type="text"
          value={paste.title}
          disabled
        />
      </div>
      <div className="mt-4 relative">
        <textarea
          className="min-w-[500px] rounded-xl p-3 mt-5 bg-black resize-none"
          value={paste.content}
          disabled
          rows={20}
        ></textarea>
        <button
          className="bg-gray-900 absolute right-2 top-7"
          onClick={handleCopy}
        >
          Copy
        </button>
      </div>
    </>
  );
};

export default ViewPaste;
