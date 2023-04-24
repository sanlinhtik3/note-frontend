import { useDispatch, useSelector } from "react-redux";
import { getNote } from "../features/note/noteSlice";
import PostList from "./PostList";
import Sidebar from "../components/Sidebar";
import Loading from "./Loading";
import { useEffect, useState } from "react";

const Home = () => {
  const dispatch = useDispatch();
  const { notes, note, isLoading, isError } = useSelector((state) => state.notes);

  useEffect(() => {
    if(isError) {
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
          <PostList note={note} />
        </div>
      </div>
    </>
  );
};

export default Home;
