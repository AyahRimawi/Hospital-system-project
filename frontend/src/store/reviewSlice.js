// src/features/reviewSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.withCredentials = true;

export const submitReview = createAsyncThunk('review/submit', async (reviewData) => {
    const response = await axios.post('http://localhost:5000/api/appointment/submit-review', reviewData);
    return response.data;
});

const reviewSlice = createSlice({
    name: 'review',
    initialState: {
        message: '',
        status: 'idle',
    },
    reducers: {
        clearMessage: (state) => {
            state.message = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(submitReview.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(submitReview.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.message = action.payload.message;
            })
            .addCase(submitReview.rejected, (state) => {
                state.status = 'failed';
                state.message = 'Error submitting review.';
            });
    },
});

export const { clearMessage } = reviewSlice.actions;

export default reviewSlice.reducer;