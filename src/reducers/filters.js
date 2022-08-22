const initialState = {
    filters: [],
    activeFilter: 'all',
    filterStatusError: 'none'
}

const filters = (state = initialState, action) => {
    switch (action.type) {
        case 'FILTER__LOADED':
            return {
                ...state,
                filters: action.payload
            }
        case 'FILTER_SET':
            return {
                ...state,
                activeFilter: action.payload,
            }
        case 'FILTER_EROR':
            return {
                ...state,
                filterStatusError: 'error'
            }
        default: return state
    }
}

export default filters;