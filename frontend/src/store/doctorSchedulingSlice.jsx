// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import api from '../api/config';

// const API_URL = "/api/doctor";

// export const setAvailability = createAsyncThunk(
//   "doctorScheduling/setAvailability",
//   async (availabilityData, { rejectWithValue }) => {
//     try {
//       const response = await api.post(`${API_URL}/set-availability`, availabilityData);
//       return response.data.availability;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || { message: "An error occurred" });
//     }
//   }
// );

// export const getAvailabilities = createAsyncThunk(
//   "doctorScheduling/getAvailabilities",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await api.get(`${API_URL}/availabilities`);
//       return response.data.availabilities;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || { message: "An error occurred" });
//     }
//   }
// );

// export const updateAvailability = createAsyncThunk(
//   "doctorScheduling/updateAvailability",
//   async ({ availableId, ...availabilityData }, { rejectWithValue }) => {
//     try {
//       const response = await api.put(`${API_URL}/availability/${availableId}`, availabilityData);
//       return response.data.availability;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || { message: "An error occurred" });
//     }
//   }
// );

// export const deleteAvailability = createAsyncThunk(
//   "doctorScheduling/deleteAvailability",
//   async (availableId, { rejectWithValue }) => {
//     try {
//       await api.delete(`${API_URL}/availability/${availableId}`);
//       return availableId;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || { message: "An error occurred" });
//     }
//   }
// );

// const doctorSchedulingSlice = createSlice({
//   name: "doctorScheduling",
//   initialState: {
//     availabilities: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(setAvailability.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(setAvailability.fulfilled, (state, action) => {
//         state.loading = false;
//         state.availabilities.push(action.payload);
//       })
//       .addCase(setAvailability.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload.message || "An error occurred";
//       })
//       .addCase(getAvailabilities.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(getAvailabilities.fulfilled, (state, action) => {
//         state.loading = false;
//         state.availabilities = action.payload;
//       })
//       .addCase(getAvailabilities.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload.message || "An error occurred";
//       })
//       .addCase(updateAvailability.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(updateAvailability.fulfilled, (state, action) => {
//         state.loading = false;
//         const index = state.availabilities.findIndex(
//           (a) => a.available_id === action.payload.available_id
//         );
//         if (index !== -1) {
//           state.availabilities[index] = action.payload;
//         }
//       })
//       .addCase(updateAvailability.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload.message || "An error occurred";
//       })
//       .addCase(deleteAvailability.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(deleteAvailability.fulfilled, (state, action) => {
//         state.loading = false;
//         state.availabilities = state.availabilities.filter(
//           (a) => a.available_id !== action.payload
//         );
//       })
//       .addCase(deleteAvailability.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload.message || "An error occurred";
//       });
//   },
// });

// export default doctorSchedulingSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/config";

const API_URL = "/api/doctor";

export const setAvailability = createAsyncThunk(
  "doctorScheduling/setAvailability",
  async (availabilityData, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `${API_URL}/set-availability`,
        availabilityData
      );
      return response.data.availability;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "An error occurred" }
      );
    }
  }
);

export const getAvailabilities = createAsyncThunk(
  "doctorScheduling/getAvailabilities",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/availabilities`);
      return response.data.availabilities;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "An error occurred" }
      );
    }
  }
);

export const updateAvailability = createAsyncThunk(
  "doctorScheduling/updateAvailability",
  async ({ availableId, ...availabilityData }, { rejectWithValue }) => {
    try {
      const response = await api.put(
        `${API_URL}/availability/${availableId}`,
        availabilityData
      );
      return response.data.availability;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "An error occurred" }
      );
    }
  }
);

export const deleteAvailability = createAsyncThunk(
  "doctorScheduling/deleteAvailability",
  async (availableId, { rejectWithValue }) => {
    try {
      const response = await api.delete(
        `${API_URL}/availability/${availableId}`
      );
      return response.data.availability;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "An error occurred" }
      );
    }
  }
);

const doctorSchedulingSlice = createSlice({
  name: "doctorScheduling",
  initialState: {
    availabilities: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setAvailability.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(setAvailability.fulfilled, (state, action) => {
        state.loading = false;
        state.availabilities.push(action.payload);
      })
      .addCase(setAvailability.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || "An error occurred";
      })
      .addCase(getAvailabilities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAvailabilities.fulfilled, (state, action) => {
        state.loading = false;
        state.availabilities = action.payload;
      })
      .addCase(getAvailabilities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || "An error occurred";
      })
      .addCase(updateAvailability.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAvailability.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.availabilities.findIndex(
          (a) => a.available_id === action.payload.available_id
        );
        if (index !== -1) {
          state.availabilities[index] = action.payload;
        }
      })
      .addCase(updateAvailability.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || "An error occurred";
      })
      .addCase(deleteAvailability.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAvailability.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.availabilities.findIndex(
          (a) => a.available_id === action.payload.available_id
        );
        if (index !== -1) {
          state.availabilities[index] = action.payload;
        }
      })
      .addCase(deleteAvailability.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || "An error occurred";
      });
  },
});

export default doctorSchedulingSlice.reducer;
