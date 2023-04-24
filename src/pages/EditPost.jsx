import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNote, editNote, getNote, reset } from "../features/note/noteSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import Markdown from "../components/Markdown";


const EditPost = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()

  const { user, isLoading, isError, isSuccess, message } = useSelector(state => state.auth)

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/login')
    }

  }, [user, navigate, dispatch, isSuccess, message])
    
    let {id} = useParams()

    const [data, setData] = useState(null);
    // console.log(data.title)
    
    useEffect(() => {
      fetch(`https://note-api-zeta.vercel.app/api/note?id=${id}`)
        .then((res) => res.json())
        .then((data) => setData(data));
    }, []);
  
    const [inputs, setInputs] = useState({});

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setInputs(values => ({...values, [name]: value }));
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(editNote({ id, inputs }));
    }

  return (
    <>
      <div className=" container mx-auto pt-10 px-5 lg:px-40">
        <Link onClick={() => dispatch(getNote(id))} to="/" className=" bg-green-500 text-white px-3 py-2 rounded-xl text-xs ring-2 ring-green-200">
          <i className="bi bi-arrow-left-circle"></i> Back
        </Link>
        <h1 className="mb-10 mt-5">Edit Post</h1>
        <div className="grid lg:grid-cols-2 lg:gap-x-5 bg-slate-50 p-5 rounded-xl">
          <form className="space-y-6 bg-white p-5 rounded-xl h-auto" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label
                htmlFor="title"
                className=" w-full text-xs mb-3 text-slate-500"
              >
                Title
              </label>

              <div className="border rounded-xl p-2 px-3 flex gap-x-2">
                <i className="bi bi-type-h1"></i>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={inputs.title || (data !== null && data.title)}
                  onChange={handleChange}
                  className=" w-full outline-none text-xs focus:border-0"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="description"
                className=" w-full text-xs mb-3 text-slate-500"
              >
                Description
              </label>
              <textarea
                type="text"
                id="description"
                name="description"
                value={inputs.description || (data !== null && data.description)}
                onChange={handleChange}
                rows="15"
                className=" border rounded-xl p-2 px-3 text-xs"
              />
            </div>
            <button
              type="submit"
              className=" bg-green-400 w-full py-5 rounded-xl"
            >
              Post
            </button>
          </form>
          <div className="bg-white rounded-xl p-5 h-[700px] overflow-scroll">
            <Markdown markdown={inputs.description || (data !== null && data.description)}/>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditPost
