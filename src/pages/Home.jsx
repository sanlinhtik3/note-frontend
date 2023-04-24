import { useDispatch, useSelector } from "react-redux";
import { getNote } from "../features/note/noteSlice";
import PostList from "./PostList";
import Sidebar from "../components/Sidebar";
import Loading from "./Loading";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Home = ({ children }) => {
  const {id} = useParams()
  const dispatch = useDispatch();
  const { notes, note, isLoading, isError } = useSelector((state) => state.notes);
  const { user } = useSelector(state => state.auth)


  useEffect(() => {
    if (isError) {
      console.log('Home Error')
    }
  }, [notes, note])


  // sidebar toggle
  const [sidebarClose, setSidebarClose] = useState(false);
  console.log(sidebarClose);
  
  if(isLoading) <Loading/>

  return (
    <>
      <div className="flex justify-center items-start">
        {/* Left */}
        <Sidebar sidebarClose={sidebarClose} />

        {/* Right */}
        <div className="h-screen bg-slate-50 w-full p-5 lg:p-10 overflow-scroll">
          <div className=" mb-5 lg:hidden" onClick={() => setSidebarClose(!sidebarClose)}>
            <i className="bi bi-layout-sidebar"></i>
          </div>

          <div className="mb-5 space-x-3">
            {user && (
              <Link to="/note/create" className=" bg-green-500 text-white px-3 py-2 rounded-xl text-xs ring-2 ring-green-200">
                <i className="bi bi-pencil-square"></i> Create Post
              </Link>
            )}

          </div>
          <div className=" bg-white rounded-xl lg:p-5">
            {!id ? (
              <div className="h-48 flex justify-center items-center">
                <h1 className="text-xl">You need to select one.</h1>
              </div>
            ) : (
                <div className="">
                  {children}
                </div>
            )}
          </div>

          {/* <PostList note={note} /> */}
        </div>
      </div>
    </>
  );
};

export default Home;
