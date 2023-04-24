import axios from "axios"

// local
// const API_URL = "http://localhost:8000/api/user/";

// onvercel
const API_URL = "https://note-api-zeta.vercel.app/api/user/";

const registerUser = async(userData) => {
    const response = await axios.post(API_URL, userData)

    if(response.data) {
        localStorage.setItem("user", JSON.stringify(response.data))
    }
    return response.data
}

const loginUser = async(userData) => {
    const response = await axios.post(API_URL + "login", userData)

    if(response.data) {
        localStorage.setItem("user", JSON.stringify(response.data))
    }

    return response.data
}

const logoutUser = async() => {
    localStorage.removeItem('user')
}

const authService = {
    registerUser,
    logoutUser,
    loginUser
}

export default authService;