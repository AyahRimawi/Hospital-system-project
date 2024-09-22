import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/axiosConfig";

export const fetchAppointments = createAsyncThunk(
  "appointments/fetchAppointments",
  async (_, { rejectWithValue }) => {
    try {
      const [totalResponse, todayResponse] = await Promise.all([
        axios.get("/doctor/appointments"),
        axios.get("/doctor/today-appointments"),
      ]);
      return {
        total: totalResponse.data.appointmentsCount,
        today: todayResponse.data.appointmentsCount,
        todayAppointments: todayResponse.data.appointments,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "An error occurred" }
      );
    }
  }
);

export const updateAppointmentStatus = createAsyncThunk(
  "appointments/updateStatus",
  async ({ appointmentId, isDone }, { rejectWithValue }) => {
    try {
      const response = await axios.put("/doctor/update-appointment", {
        appointmentId,
        isDone,
      });
      return response.data.appointment;
    } catch (error) {
      console.error(
        "Error updating appointment status:",
        error.response?.data || error.message
      );
      return rejectWithValue(
        error.response?.data || {
          message: "Failed to update appointment status",
        }
      );
    }
  }
);
export const addHealthcareRecord = createAsyncThunk(
  "appointments/addRecord",
  async (
    { patientId, staffId, diagnosis, drugs, treatmentPlan },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post("/doctor/add-record", {
        patientId,
        staffId,
        diagnosis,
        drugs,
        treatmentPlan,
      });
      return response.data.record;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to add healthcare record" }
      );
    }
  }
);
export const fetchPatientRecords = createAsyncThunk(
  "appointments/fetchPatientRecords",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/doctor/patient-records");
      return response.data.records; // Make sure to return the right part of the data
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "An error occurred" }
      );
    }
  }
);

export const updatePatientInfo = createAsyncThunk(
  "appointments/updatePatientInfo",
  async ({ patientId, updates }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `/doctor/patients/${patientId}/update`,
        updates
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          message: "Failed to update patient information",
        }
      );
    }
  }
);

export const updateHealthcareRecord = createAsyncThunk(
  "appointments/updateHealthcareRecord",
  async ({ recordId, updates }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `/doctor/healthcare_records/${recordId}/update`,
        updates
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          message: "Failed to update healthcare record",
        }
      );
    }
  }
);

export const deleteHealthcareRecord = createAsyncThunk(
  "appointments/deleteHealthcareRecord",
  async (recordId, { rejectWithValue }) => {
    try {
      await axios.patch(`/doctor/healthcare_records/${recordId}/softdelete`);
      return recordId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          message: "Failed to delete healthcare record",
        }
      );
    }
  }
);

const appointmentsSlice = createSlice({
  name: "appointments",
  initialState: {
    total: 0,
    today: 0,
    todayAppointments: [],
    loading: false,
    error: null,
    patientRecords: [],
    loadingRecords: false,
    errorRecords: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppointments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.total = action.payload.total;
        state.today = action.payload.today;
        state.todayAppointments = action.payload.todayAppointments;
      })
      .addCase(fetchAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(updateAppointmentStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateAppointmentStatus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.todayAppointments.findIndex(
          (app) => app.appointment_id === action.payload.appointment_id
        );
        if (index !== -1) {
          state.todayAppointments[index] = action.payload;
        }
      })
      .addCase(updateAppointmentStatus.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload.message ||
          "An error occurred while updating the appointment";
      })

      .addCase(addHealthcareRecord.fulfilled, (state, action) => {
        // You might want to update the appointment status here as well
      })
      .addCase(fetchPatientRecords.pending, (state) => {
        state.loadingRecords = true;
      })
      .addCase(fetchPatientRecords.fulfilled, (state, action) => {
        state.loadingRecords = false;
        state.patientRecords = action.payload;
      })
      .addCase(fetchPatientRecords.rejected, (state, action) => {
        state.loadingRecords = false;
        state.errorRecords = action.payload.message;
      })
      .addCase(updatePatientInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePatientInfo.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.patientRecords.findIndex(
          (p) => p.id === action.payload.id
        );
        if (index !== -1) {
          state.patientRecords[index] = {
            ...state.patientRecords[index],
            ...action.payload,
          };
        }
      })
      .addCase(updatePatientInfo.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload.message ||
          "An error occurred while updating patient information";
      })
      .addCase(updateHealthcareRecord.fulfilled, (state, action) => {
        const index = state.patientRecords.findIndex(
          (r) => r.record_id === action.payload.record_id
        );
        if (index !== -1) {
          state.patientRecords[index] = action.payload;
        }
      })
      .addCase(deleteHealthcareRecord.fulfilled, (state, action) => {
        state.patientRecords = state.patientRecords.filter(
          (r) => r.record_id !== action.payload
        );
      });
  },
});

export default appointmentsSlice.reducer;
