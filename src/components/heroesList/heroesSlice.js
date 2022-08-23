import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { useHttp } from '../../hooks/http.hook';

const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
}
 
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
        // heroesFetching: state => {state.heroesLoadingStatus = 'loading'},
        // heroesFetched: (state, action) => {state.heroesLoadingStatus = 'idle';
        //                                     state.heroes = action.payload},
        // heroesFetchingError: state => {state.heroesLoadingStatus = 'error'},
        heroesDelete: (state, action) => {state.heroes = state.heroes.filter(item => {return item.id !== action.payload})},
        heroesAdd: (state, action) => {state.heroes.push(action.payload)}
    },
    extraReducers: (builder) => {
        builder
            .addCase(fecthHeroes.pending,  state => {state.heroesLoadingStatus = 'loading'})
            .addCase(fecthHeroes.fulfilled, (state, action) => {state.heroesLoadingStatus = 'idle';
                                                                state.heroes = action.payload})
            .addCase(fecthHeroes.rejected, state => {state.heroesLoadingStatus = 'error'})
            .addDefaultCase(() => {});
    }
});

const {actions, reducer} = heroesSlice;

export default reducer;
export const {
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    heroesDelete,
    heroesAdd
} = actions