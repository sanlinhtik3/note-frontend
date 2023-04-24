import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import noteService from "./noteService";

const initialState = {
    notes: [],
    note: null,
    isError: false,
    isLoading: false,
    message: ''
}

// Get notes
export const getNotes = createAsyncThunk("note/getAll", async (_, thunkAPI) => {
    try {
        return await noteService.getNotes();
    } catch (error) {
        const message = (error.response && error.response.data & error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
});

// Get notes
export const getNote = createAsyncThunk("note/getSingleNote", async (id, thunkAPI) => {
    try {
        return await noteService.getNote(id);
    } catch (error) {
        const message = (error.response && error.response.data & error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
});

// Create notes
export const createNote = createAsyncThunk("note/create", async(data, thunkAPI) => {
  try {
        return await noteService.createNote(data);
    } catch (error) {
        const message = (error.response && error.response.data & error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
});

// Create notes
export const editNote = createAsyncThunk("note/edit", async(data, thunkAPI) => {
  try {
      return await noteService.editNote(data.id, data.inputs);
    } catch (error) {
        const message = (error.response && error.response.data & error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
});

// Create notes
export const deleteNote = createAsyncThunk("note/delete", async(noteID, thunkAPI) => {
  try {
        return await noteService.deleteNote(noteID);
    } catch (error) {
        const message = (error.response && error.response.data & error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
});

export const noteSlice = createSlice({
    name: "notes",
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
          .addCase(createNote.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(createNote.fulfilled, (state, action) => {
            (state.isLoading = false),
              (state.isError = false),
              (state.notes = action.payload);
          })
          .addCase(createNote.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
          })
          .addCase(editNote.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(editNote.fulfilled, (state, action) => {
            state.isLoading = false,
            state.isError = false,
            state.notes = action.payload;
          })
          .addCase(editNote.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
          })
          .addCase(getNotes.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(getNotes.fulfilled, (state, action) => {
            (state.isLoading = false),
              (state.isError = false),
              (state.notes = action.payload);
          })
          .addCase(getNotes.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
          })
          .addCase(getNote.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(getNote.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.note = action.payload;
          })
          .addCase(getNote.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
          })
          .addCase(deleteNote.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(deleteNote.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.notes = state.notes.filter(
              (note) => note._id !== action.payload._id
            );
          })
          .addCase(deleteNote.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
          });
    }
})

export const {reset} = noteSlice.actions
export default noteSlice.reducer