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
      setTitle(paste.title);
      setValue(paste.content);
    }
  }, [pasteId]);

  function createPaste() {
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(23),
      createdAt: new Date().toDateString(),
    };

    if (pasteId) {
      // update if paste id is available
      dispatch(updatePaste(paste));
    } else {
      // create if paste id is not available
      dispatch(addPaste(paste));
    }

    // after updation
    setTitle("");
    setValue("");
    setSearchParams({});
  }

  return (
    <>
      <div className="flex flex-row gap-6 place-content-between">
        <input
          className="p-2 rounded-lg mt-4 w-[65%]"
          type="text"
          placeholder="Enter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button
          onClick={createPaste}
          className="p-2 rounded-lg mt-2 bg-blue-700"
        >
          {pasteId ? "Update My Paste" : "Create My Paste"}
        </button>
      </div>
      <div className="mt-4">
        <textarea
          className="min-w-[500px] rounded-xl p-3 mt-5 bg-black resize-none"
          value={value}
          placeholder="Enter your paste here"
          onChange={(e) => setValue(e.target.value)}
          rows={20}
        ></textarea>
      </div>
    </>
  );
};

export default Home;
