import { useDispatch, useSelector } from "react-redux";
import { deleteNote, editNote, getNote, getNotes, reset } from "../features/note/noteSlice";
import { useNavigate } from "react-router-dom";
import StringLimit from "./StringLimit";
import { useEffect } from "react";

const Sidebar = ({sidebarClose}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { notes, note, isLoading } = useSelector((state) => state.notes);
  const { user, isError, isSuccess, message } = useSelector(state => state.auth)

  
  const del = (id) => {
    dispatch(deleteNote(id))
    dispatch(getNote(notes[0]._id))
  }

  const edit = (id) => {
    navigate(`/note/edit/${id}`);
  }

  useEffect(() => {
    if(isError) {
      console.log(message)
    }
  }, [navigate, user, note, notes])

  if (isLoading) {
    return <h1>Wait...</h1>
  }

  return (
    <div className={`h-screen ${!sidebarClose && "hidden" } lg:flex absolute md:static bg-white left-0 w-8/12 md:w-6/12 lg:w-3/12 p-3`}>
      <div className="w-full">
        <h1 className=" text-2xl font-bold my-6">Inficreax Note</h1>

        {notes.length === 0 ?
        (<h1 className=" text-center">There is no list</h1>) : (
        <ul className="grid grid-cols-1 gap-y-2">
          {notes.map((note) => (
            <li
              className=" bg-green-50 text-green-600 w-full border-green-500 rounded-lg p-2 py-3 text-start flex justify-between items-center"
              onClick={() => dispatch(getNote(note._id))}
              key={note._id}
            >
              <StringLimit className="text-xs" text={note.title} limit={20} />
              
              {user && (
                <div className="space-x-3 bg-green-500 px-2 py-1 text-xs flex justify-center items-center rounded-lg ring-2 ring-green-200">
                  <span className="cursor-pointer text-green-50" onClick={() => edit(note._id)}>
                    <i className="bi bi-pen"></i>
                  </span>
                  <span className="cursor-pointer text-red-500" onClick={() => del(note._id)}>
                    <i className="bi bi-trash3-fill"></i>
                  </span>
                </div>
              )}

            </li>
          ))}
        </ul>
        )}
        
      </div>
    </div>
  );
};

export default Sidebar;
