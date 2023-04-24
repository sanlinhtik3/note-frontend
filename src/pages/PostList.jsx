import { Link } from "react-router-dom";
import Markdown from "../components/Markdown";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const PostList = ({note}) => {
  const { user, isLoading, isError, isSuccess, message } = useSelector(state => state.auth)

  useEffect(() => {
    if(isError) {
      console.log(message)
    }
  }, [note, user])

  return (
    <>
      <div className="mb-5 space-x-3">
        {user && (
          <Link to="/note/create" className=" bg-green-500 text-white px-3 py-2 rounded-xl text-xs ring-2 ring-green-200">
            <i className="bi bi-pencil-square"></i> Create Post 
          </Link>
        )}
        
      </div>
      <div className=" bg-white rounded-xl p-5">
        {note == null ? (
          <div className="h-48 flex justify-center items-center">
            <h1 className="text-xl">You need to select one.</h1>
          </div>
        ) : (
          <Markdown markdown={note.description} />
        )}
      </div>
    </>
  );
};

export default PostList;
