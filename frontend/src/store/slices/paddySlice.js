import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    submissions: [],
    currentSubmission: null,
    loading: false,
    error: null,
};

const paddySlice = createSlice({
    name: 'paddy',
    initialState,
    reducers: {
        setSubmissions: (state, action) => {
            state.submissions = action.payload;
        },
        addSubmission: (state, action) => {
            state.submissions.unshift(action.payload);
        },
        updateSubmissionStatus: (state, action) => {
            const { id, status } = action.payload;
            const submission = state.submissions.find(s => s.id === id);
            if (submission) {
                submission.status = status;
            }
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        }
    },
});

export const { setSubmissions, addSubmission, updateSubmissionStatus, setLoading } = paddySlice.actions;
export default paddySlice.reducer;
