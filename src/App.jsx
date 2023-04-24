import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { getNotes, reset } from './features/note/noteSlice'
import Home from './pages/Home'
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import './App.css'
import Loading from './pages/Loading';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Detail from './pages/Detail';
import Master from './pages/Master';
import Layout from './pages/Layout';

function App() {
  const dispatch = useDispatch()

  const [count, setCount] = useState(0)
  const {isError, isLoading, message} = useSelector((state) => state.notes)

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    dispatch(getNotes())

    return () => {
      dispatch(reset());
    };

  }, [dispatch, isError, message])

  if (isLoading) {
    return <Loading/>
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/master" element={<Layout />} />
          <Route path="/note/:id" element={<Detail />} />
          <Route path="/note/create" element={<CreatePost />} />
          <Route path="/note/edit/:id" element={<EditPost />} />

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
