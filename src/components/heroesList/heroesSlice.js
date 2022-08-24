import {createSlice, createAsyncThunk, createEntityAdapter} from '@reduxjs/toolkit';
import { useHttp } from '../../hooks/http.hook';
import { createSelector } from '@reduxjs/toolkit';

const heroesAdapter = createEntityAdapter();

// const initialState = {
//     heroes: [],
//     heroesLoadingStatus: 'idle',
// }
 
const initialState = heroesAdapter.getInitialState({
    heroesLoadingStatus: 'idle'
});

export const fecthHeroes = createAsyncThunk(
    'heroes/fecthHeroes',
    () => {
        const { request } = useHttp();
        return request("http://localhost:3001/heroes");
    }
);

const heroesSlice = createSlice({
    name: 'heroes',
    initialState,
    reducers: {
        heroesDelete: (state, action) => {heroesAdapter.removeOne(state, action.payload)},
        heroesAdd: (state, action) => {heroesAdapter.addOne(state, action.payload)}
    },
    extraReducers: (builder) => {
        builder
            .addCase(fecthHeroes.pending,  state => {state.heroesLoadingStatus = 'loading'})
            .addCase(fecthHeroes.fulfilled, (state, action) => {state.heroesLoadingStatus = 'idle';
                                                                heroesAdapter.setAll(state, action.payload);})
            .addCase(fecthHeroes.rejected, state => {state.heroesLoadingStatus = 'error'})
            .addDefaultCase(() => {});
    }
});

const {actions, reducer} = heroesSlice;

const { selectAll } = heroesAdapter.getSelectors(state => state.heroes);



export const filteredHeroesSelector = createSelector(
    (state) => state.filters.activeFilter,
    selectAll,
    (filter, heroes) => {
        if (filter === 'all') {
            return heroes;
        } else {
            return heroes.filter(item => item.element === filter)
        }
    }
);
export default reducer;
export const {
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    heroesDelete,
    heroesAdd
} = actions;