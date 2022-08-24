// const initialState = {
//     filters: [],
//     activeFilter: 'all',
//     filterStatusLoading: 'idle'
// }

// const filters = (state = initialState, action) => {
//     switch (action.type) {
//         case 'FILTER__LOADED':
//             return {
//                 ...state,
//                 filters: action.payload,
//                 filterStatusLoading: 'idle'
//             }
//         case 'FILTER__FETCHING':
//             return {
//                 ...state,
//                 filterStatusLoading: 'loading'
//             }
//         case 'FILTER_SET':
//             return {
//                 ...state,
//                 activeFilter: action.payload,
//             }
//         case 'FILTER_EROR':
//             return {
//                 ...state,
//                 filterStatusLoading: 'error'
//             }
//         default: return state
//     }
// }

// export default filters;