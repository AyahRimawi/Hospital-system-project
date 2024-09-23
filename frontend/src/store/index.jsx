// import { configureStore } from '@reduxjs/toolkit';
// import authReducer from '../store/authSlice';
// import messageSlice from '../store/messageSlice';

// export const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     message:messageSlice,
//   },
// });



import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../store/authSlice';
import messageSlice from '../store/messageSlice';
import doctorReducer from '../store/doctorSlice';  
import adminAuthReducer from '../store/adminAuthSlice'; 
import appointmentsReducer from "../store/appointmentsSlice";
import doctorSchedulingSlice from "./doctorSchedulingSlice";
import reviewReducer from "./reviewSlice";
import MappointmentsReducer from "./MappointmentsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    message: messageSlice,
    doctor: doctorReducer,
    adminAuth: adminAuthReducer,
    appointments: appointmentsReducer,
    doctorScheduling: doctorSchedulingSlice,
    review: reviewReducer,
    Mappointments: MappointmentsReducer
  },
});