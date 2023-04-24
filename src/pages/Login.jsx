import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, reset } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    setInputs(values => ({ ...values, [name]: value }))
  }

  const { user, isLoading, isError, isSuccess, message } = useSelector(state => state.auth)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (isSuccess || user) {
      navigate('/')
    }
    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const handleSubmit = (event) => {
    event.preventDefault()

    const userData = {
      email: inputs.email,
      password: inputs.password,
    }
    console.log(userData)
    dispatch(loginUser(userData))

  }

  return (
    <>
      <div className="p-5 lg:p-0">
        <div className="lg:w-4/12 mx-auto shadow rounded-lg mt-10">
          <form className="space-y-6 bg-white p-5 rounded-xl h-auto" onSubmit={handleSubmit} >
            

            <div className="flex flex-col">
              <label htmlFor="email" className=" w-full text-xs mb-3 text-slate-500" >
                email
              </label>

              <div className="border rounded-xl p-2 px-3 flex gap-x-2">
                <i className="bi bi-envelope-at"></i>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={inputs.email || ""}
                  onChange={handleChange}
                  className=" w-full outline-none text-xs focus:border-0"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label htmlFor="password" className=" w-full text-xs mb-3 text-slate-500" >
                password
              </label>

              <div className="border rounded-xl p-2 px-3 flex gap-x-2">
                <i className="bi bi-file-lock2"></i>
                <input
                  type="text"
                  id="password"
                  name="password"
                  value={inputs.password || ""}
                  onChange={handleChange}
                  className=" w-full outline-none text-xs focus:border-0"
                />
              </div>
            </div>

            <button type="submit" className=" bg-green-400 w-full py-5 rounded-xl">
              Post
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login