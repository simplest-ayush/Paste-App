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
  console.log(pastes);

  const [visibleShareId, setVisibleShareId] = useState(null);

  const dispatch = useDispatch();
  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeAllPaste(pasteId));
  }

  const handleShareClick = (pasteId) => {
    // Toggle visibility of sharing options
    setVisibleShareId(visibleShareId === pasteId ? null : pasteId);
  };

  return (
    <>
      <div>
        <input
          type="search"
          placeholder="Search here"
          className="p-2 rounded-xl mt-4 min-w-[500px]"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
        <div className="flex flex-col gap-5 mt-4">
          {filteredData.length > 0 &&
            filteredData.map((paste) => {
              return (
                <div className="border rounded-xl p-2 m-2" key={paste?._id}>
                  <div>{paste.title}</div>

                  <div>{paste.content}</div>

                  <div className="flex flex-row place-content-evenly p-2">
                    <button>
                      <NavLink to={`/?pasteId=${paste?._id}`}>Edit</NavLink>
                    </button>

                    <button>
                      <NavLink to={`/pastes/${paste?._id}`}>View</NavLink>
                    </button>

                    <button onClick={() => handleDelete(paste?._id)}>
                      Delete
                    </button>

                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(paste?.content);
                        toast.success("Copied to Clipboard", {
                          duration: 1000,
                        });
                      }}
                    >
                      Copy
                    </button>

                    <button onClick={() => handleShareClick(paste?._id)}>
                      Share
                    </button>
                  </div>
                  <div>{paste.createdAt}</div>
                  {/* Render sharing options if this paste's ID matches visibleShareId */}
                  {visibleShareId === paste?._id && (
                    <div className="flex flex-row place-content-center space-x-2 mt-2">
                      <TwitterShareButton
                        url={window.location.href + `/?pasteId=${paste._id}`}
                      >
                        <TwitterIcon size={32} round />
                      </TwitterShareButton>

                      <FacebookShareButton
                        url={window.location.href + `/?pasteId=${paste._id}`}
                      >
                        <FacebookIcon size={32} round />
                      </FacebookShareButton>

                      <LinkedinShareButton
                        url={window.location.href + `/?pasteId=${paste._id}`}
                      >
                        <LinkedinIcon size={32} round />
                      </LinkedinShareButton>

                      <EmailShareButton
                        url={window.location.href + `/?pasteId=${paste._id}`}
                      >
                        <EmailIcon size={32} round />
                      </EmailShareButton>
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Paste;
