import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.withCredentials = true;

export const fetchUnreviewedAppointments = createAsyncThunk(
  "appointments/fetchUnreviewedAppointments",
  async () => {
    const response = await axios.get(
      "http://localhost:5000/api/appointment/unreviewed-appointments"
    );
    return response.data;
  }
);

const MappointmentsSlice = createSlice({
  name: "Mappointments",
  initialState: {
    appointments: [],
    status: "idle",
    error: null,
  },
  reducers: {
    clearAppointments(state) {
      state.appointments = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUnreviewedAppointments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUnreviewedAppointments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.appointments = action.payload;
      })
      .addCase(fetchUnreviewedAppointments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { clearAppointments } = MappointmentsSlice.actions;

export default MappointmentsSlice.reducer;
