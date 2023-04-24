import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNote } from "../features/note/noteSlice";
import Markdown from "../components/Markdown";
import { useNavigate } from "react-router-dom";


const CreatePost = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(state => state.auth)

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if(!user) {
      navigate('/login')
    }

  }, [user, navigate, dispatch, isSuccess, message])

    

    const [inputs, setInputs] = useState({})

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setInputs(values => ({...values, [name]: value }));
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(inputs)
        dispatch(createNote(inputs));
    }

  return (
    <>
      <div className=" container mx-auto pt-10 lg:px-40 p-2">
        <h1 className="mb-10 text-3xl font-bold">Create Post</h1>
        <div className="grid lg:grid-cols-2 lg:gap-x-5 gap-y-3 lg:gap-y-0 bg-slate-50 lg:p-5 rounded-xl">
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
                  value={inputs.title || ""}
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
                value={inputs.description || ""}
                onChange={handleChange}
                rows="10"
                className=" border rounded-xl p-2 px-3"
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
            <Markdown markdown={inputs.description || ""}/>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreatePost