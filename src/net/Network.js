const APIkey = ''; //TODO: Put your own API KEY HERE

function writeHttp(route) {
    const url = `https://api.themoviedb.org/3${route}`
    const fetchOptions = {
        method: 'GET',
    };
    return fetch(url, fetchOptions)
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            return json;
        })
}

function urlify(text) {
    text.trim();
    text.replace(' ', '%20');
    return text;
}

export function fetchPopularMovies() {
    const route = `/trending/all/day?api_key=${APIkey}`;
    return writeHttp(route);
}

export function searchMovies(query, cursor) {
    const processedQuery = urlify(query);
    const route = `/search/movie?api_key=${APIkey}&query=${processedQuery}&page=${cursor}`
    return writeHttp(route);
}