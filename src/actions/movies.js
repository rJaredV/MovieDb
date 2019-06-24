import * as types from './actionTypes';

import {fetchPopularMovies} from "../net/Network";

export function requestFetchTrendingMovies() {
    return (dispatch, getState) => {
        fetchTrendingMovies(dispatch, getState);
    }
}

function fetchTrendingMovies(dispatch) {
    return fetchPopularMovies().then(resp => {
        if (resp && resp.results) {
            const results = resp.results;
            dispatch({
                type: types.FETCH_MOVIES,
                payload: results,
            });
            return results;
        }
    });
}