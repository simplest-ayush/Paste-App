import { createSlice } from "@reduxjs/toolkit";
import toast from 'react-hot-toast';
const initialState = {
    pastes: localStorage.getItem("pastes")
        ? JSON.parse(localStorage.getItem("pastes"))
        : []
}


export const pasteSlice = createSlice({
    name: 'paste',
    initialState,
    reducers: {
        addPaste: (state, action) => {
            const paste = action.payload;
            if (paste.title === '') {
                toast.error("Paste cannot be empty", { duration: 1000 });
                return;
            }

            state.pastes.push(paste);
            localStorage.setItem('pastes', JSON.stringify(state.pastes));
            toast.success("Paste created successfully", { duration: 1000 });
        },
        updatePaste: (state, action) => {
            const paste = action.payload;
            const index = state.pastes.findIndex((item) => item._id === paste._id);
            if (index >= 0) {
                state.pastes[index] = paste;
                localStorage.setItem('pastes', JSON.stringify(state.pastes));
                toast.success("Paste updated");
            }
        },
        resetAllPaste: (state, action) => {
            state.pastes = [];
            localStorage.removeItem('pastes');
        },
        removeAllPaste: (state, action) => {
            const pasteId = action.payload;
            console.log(pasteId);
            const index = state.pastes.findIndex((item) => item._id === pasteId);
            if (index >= 0) {
                state.pastes.splice(index, 1);
                localStorage.setItem('pastes', JSON.stringify(state.pastes));
                toast.success("Paste deleted", { duration: 1000 })
            }
        }
    }
})

export const { addPaste, updatePaste, resetAllPaste, removeAllPaste } = pasteSlice.actions

export default pasteSlice.reducer