import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import { parseIds, SERVER_API_ENDPOINT } from 'store/utils';
import { Availability } from 'store/types';

export const getAvailabilities = createAsyncThunk(
  'getAvailabilities',
  async (practitionerId: number) => {
    const response = await fetch(
      `${SERVER_API_ENDPOINT}/availabilities/${practitionerId}`,
    );
    const parsedResponse = await response.json();
    return parseIds(parsedResponse) as Availability[];
  },
);

const availabilitiesAdapter = createEntityAdapter<Availability>({
  sortComparer: (a, b) =>
    new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
});

export const availabilitiesSelectors = availabilitiesAdapter.getSelectors();
export const selectedAvailabilityId = (state) =>
  state.availabilities.selectedAvailabilityId;

const availabilitiesSlice = createSlice({
  name: 'patients',
  initialState: availabilitiesAdapter.getInitialState({
    loading: false,
    error: null,
    selectedAvailabilityId: undefined,
  }),
  reducers: {
    setSelectedAvailabilityId: (state, action) => {
      state.selectedAvailabilityId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAvailabilities.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAvailabilities.fulfilled, (state, action) => {
      availabilitiesAdapter.setAll(state, action.payload);
      state.error = null;
      state.loading = false;
    });
    builder.addCase(getAvailabilities.rejected, (state, action) => {
      state.error = action.error;
      state.loading = false;
    });
  },
});

export const { setSelectedAvailabilityId } = availabilitiesSlice.actions;
export default availabilitiesSlice;
