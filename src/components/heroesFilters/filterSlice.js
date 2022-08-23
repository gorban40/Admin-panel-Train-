import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { useHttp } from '../../hooks/http.hook';


const initialState = {
    filters: [],
    activeFilter: 'all',
    filterStatusLoading: 'idle'
}

export const fetchFilters = createAsyncThunk(
    'filters/fetchFilters',
    () => {
        const { request } = useHttp();
        return request("http://localhost:3001/filters");
    }
);

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        // filtersLoaded: (state, action) => {state.filters = action.payload;
        //                                     state.filterStatusLoading = 'idle'},
        // filtersFetching: (state) => {state.filterStatusLoading = 'loading'},
        filterSet: (state, action) => {state.activeFilter = action.payload},
        // filterError: (state) => {state.filterStatusLoading = 'error'}
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFilters.pending, (state) => {state.filterStatusLoading = 'loading'},)
            .addCase(fetchFilters.fulfilled,(state, action) => {state.filters = action.payload;
                                                                state.filterStatusLoading = 'idle'})
            .addCase(fetchFilters.rejected, (state) => {state.filterStatusLoading = 'error'})
    }
})

const {actions, reducer} = filterSlice;

export default reducer;
export const {
    filtersLoaded,
    filtersFetching,
    filterSet,
    filterError
} = actions;


