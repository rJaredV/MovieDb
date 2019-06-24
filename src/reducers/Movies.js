import * as types from '../actions/actionTypes';
const initialState = {
    trendingMovies: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case types.FETCH_MOVIES: {
            const result = action.payload;
            if (result) {
                return {
                    ...state,
                    trendingMovies: result,
                };
            }
            break;
        }

        default: {
            return state;
        }
    }
}