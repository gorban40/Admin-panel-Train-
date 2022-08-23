import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    filters: [],
    activeFilter: 'all',
    filterStatusLoading: 'idle'
}

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        filtersLoaded: (state, action) => {state.filters = action.payload;
                                            state.filterStatusLoading = 'idle'},
        filtersFetching: (state) => {state.filterStatusLoading = 'loading'},
        filterSet: (state, action) => {state.activeFilter = action.payload},
        filterError: (state) => {state.filterStatusLoading = 'error'}
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


