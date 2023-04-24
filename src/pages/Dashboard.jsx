import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logoutUser, reset } from '../features/auth/authSlice'

const Dashboard = () => {
  const { user, isLoading, isError, isSuccess, message } = useSelector(state => state.auth)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if(!isSuccess || !user) {
      navigate("/login")
    }

    if (isSuccess || user) {
      navigate('/dashboard')
    }

  }, [user, isError, isSuccess, navigate, message])

  const onLogout = () => {
    dispatch(logoutUser())
    dispatch(reset())
    navigate("/login")
  }

  return (
    <div>
      <button onClick={onLogout}>logout</button>
    </div>
  )
}

export default Dashboard