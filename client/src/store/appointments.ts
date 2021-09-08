import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import { parseIds, SERVER_API_ENDPOINT } from 'store/utils';
import { Appointment } from 'store/types';

export const getAppointments = createAsyncThunk('getAppointments', async () => {
  const response = await fetch(`${SERVER_API_ENDPOINT}/appointments`);
  const parsedResponse = await response.json();
  return parseIds(parsedResponse) as Appointment[];
});

const appointmentsAdapter = createEntityAdapter<Appointment>({
  sortComparer: (a, b) =>
    new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
});

export const appointmentsSelectors = appointmentsAdapter.getSelectors();

const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState: appointmentsAdapter.getInitialState({
    loading: false,
    error: null,
    availabilities: [],
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAppointments.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAppointments.fulfilled, (state, action) => {
      appointmentsAdapter.setAll(state, action.payload);
      state.error = null;
      state.loading = false;
    });
    builder.addCase(getAppointments.rejected, (state, action) => {
      state.error = action.error;
      state.loading = false;
    });
  },
});

export default appointmentsSlice;
