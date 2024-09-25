import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/config";

const API_URL = "/api/doctor";

//? ------------------------------------------
// بننشئ دالة async function باستخدام createAsyncThunk
// * الهدف منها انو في اشياء بتحتاج وقت لترجع بيانات من sever

//TODOO ------------------- setAvailability --------------------
export const setAvailability = createAsyncThunk(
  //* تسمية ال action تعبر عن slice name / اسم ال controller
  "doctorScheduling/setAvailability",
  // availabilityData هاي اسم المعطيات المدخلة اعطيتها اسم
  //rejectWithValue هاي دالة موجودة من مكتبة Redux Toolkit الهدف منها ارجاع قيمة عند فشل العملية
  async (availabilityData, { rejectWithValue }) => {
    // هون يتم تمرير معطين الأول هي المطيات الثاني ارجاع قيمة معينة في حال الفشل
    try {
      const response = await api.post(
        `${API_URL}/set-availability`,
        availabilityData //المتغير الي بيحتوي على البيانات المراد ارسالها
      );
      return response.data.availability; //هلأ خليني افهم معلومة مهمة ال response لما يرجع بيرجع معه معلومات حول الاستجابة على سبيل المثال (status و headers و data) هلأ انا بدي بس data عشان هيك حطيت data
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "An error occurred" }
      );
    }
  }
);
//TODOO ------------------- getAvailabilities --------------------
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
//TODOO ------------------- updateAvailability --------------------
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
//TODOO ------------------- deleteAvailability --------------------
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

//TODOO ------------------- createSlice --------------------

const doctorSchedulingSlice = createSlice({
  // انشئنا ال SLICE فيها name و initialState و reducers
  //?-----------------
  name: "doctorScheduling", // يستخدم لتعريف action
  //?-----------------
  initialState: {
    availabilities: [], // يمثل حالة اولية
    loading: false, //اذا في عملية تحميل حالية
    error: null, //لتخزين اي خطأ
  },
  //?-----------------
  reducers: {}, // لاحظ هون ما عندي قيم لل reducer  هون انا بحط ال function بس مو بحاجة لأنو بستخدم createAsyncThunk
  //?-----------------
  extraReducers: (builder) => {
    //* لمعالجة إجراءات (actions) غير متزامنة.
    //!في extraReducers، يمكنك إضافة حالات (مثل pending, fulfilled, وrejected) للإجراءات غير المتزامنة.
    // pending: عندما يبدأ الطلب (مثل بدء تحميل البيانات).
    // fulfilled: عندما يكتمل الطلب بنجاح (مثل استلام البيانات).
    // rejected: عندما يفشل الطلب (مثل حدوث خطأ).

    builder //*builder هو object يحتوي على دوال تُستخدم لإضافة حالات (cases) للإجراءات (actions) غير المتزامنة.

      //todoo ---------- setAvailability ----------------
      //* addCase هي دالة تُستخدم داخل كائن builder في extraReducers عند تعريف شريحة (slice) في Redux Toolkit.
      // تأخد اول معطى action والمعطى الثاني يعطي تُحدد ما يحدث عند تفعيل الإجراء
      .addCase(setAvailability.pending, (state) => {
        //state يمثل الحالة الحالية
        // هون بدأنا بال setAvailability الي جبناه من createAsyncThunk
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

      //todoo ---------- getAvailabilities ----------------
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

      //todoo ---------- updateAvailability ----------------
      //تمثل الحالة الي يبدأ فيها
      .addCase(updateAvailability.pending, (state) => {
        state.loading = true; // عملية التحميل بدأت
        state.error = null; // لتأكد من عدم وجود اخطاء
      })
      .addCase(updateAvailability.fulfilled, (state, action) => {
        // تمثل الحالة لما يكتمل طلب التحديث بنجاح
        state.loading = false; // ليحكي انو عملية التحميل انتهت
        const index = state.availabilities.findIndex(
          // هيك يعني جبنا كل حالة ابتدائية لطبيب
          //* findIndex: هي دالة تُستخدم على المصفوفات (arrays) في JavaScript للبحث عن عنصر معين بناءً على شرط محدد.
          //* إذا لم تجد أي عنصر يطابق الشرط، ستعيد -1.

          (a) => a.available_id === action.payload.available_id //a تمثل العنصر الحالي
          // من payload جبنا اله اال id
        );
        // الهدف من الشرط اننا لا نحاول تحديث عنصر غير موجود
        if (index !== -1) {
          state.availabilities[index] = action.payload; // يحتوي على البيانات الجديدة
        }
      })
      .addCase(updateAvailability.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || "An error occurred";
      })

      //todoo ---------- deleteAvailability ----------------
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
