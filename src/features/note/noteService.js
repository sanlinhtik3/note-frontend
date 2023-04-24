import axios from 'axios';

// local
const API_URL = "http://localhost:8000/api/note/";

// Onvercel
// const API_URL = "https://note-api-zeta.vercel.app/api/note/";


const getNotes = async() => {
    const response = await axios.get(API_URL);
    return response.data;
}

const createNote = async(data) => {
  const response = await axios.post(API_URL, data)
  return response.data;
}

const editNote = async (noteId, data) => {
  console.log(noteId, data);
  const response = await axios.put(API_URL + noteId, data);
  return response.data;
};

const getNote = async (noteId) => {
  const response = await axios.get(API_URL + "?id=" + noteId);
  return response.data;
};

const deleteNote = async (noteID) => {
  const response = await axios.delete(API_URL + noteID);
  return response.data;
};

const noteService = {
    getNotes,
    getNote,
    createNote,
    editNote,
    deleteNote
}

export default noteService;