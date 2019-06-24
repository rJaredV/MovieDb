import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import TrendingMovieList from '../../components/TrendingMovieList';
import SearchBar from '../../components/SearchBar';
import SearchResults from '../../components/SearchResults';
import { requestFetchTrendingMovies } from "../../actions/movies";
import { searchMovies } from "../../net/Network";

const tmdb = require('../../assets/static/TMDB.png')

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(128,128,128, 0.5)',
    },
})
class Home extends React.Component {
    static navigationOptions = {
        title: 'Movie DB',
        headerStyle: {
            backgroundColor: '#085AAF',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        }
    }
    constructor(props) {
        super(props);
        this.state = {
            trendingMovies: [],
            text: '',
            numPages: 1,
            page: 1,
            total_results: 0,
            results: [],
            showResults: false,
            loading: true,
        }
    }

    componentDidMount() {
        this.props.requestFetchTrendingMovies();
    }

    componentWillReceiveProps(newProps) {
        if (newProps && newProps.trendingMovies) {
            this.setState({
                trendingMovies: newProps.trendingMovies,
                loading: false,
            });
        }
    }

    searchForMovie = (cb) => {
        this.setState({ loading: true });
        searchMovies(this.state.text, this.state.page)
            .then(result => {
                if (result && result) {
                    const { total_pages, total_results, results } = result;
                    this.setState({
                        total_pages,
                        total_results,
                        results,
                        showResults: true,
                        loading: false,
                    });
                }
            })
            .then(() => {
                if (cb) { cb() }
            })
    }

    changePage = (direction, cb) => {
        const toPage = direction == 'right' ? this.state.page + 1 : this.state.page - 1;
        this.setState({
            page: toPage,
        }, () => this.searchForMovie(cb))
    }

    onChangeText = (text) => {
        this.setState({text})
    }

    clearSearch = () => {
        this.setState({
            numPages: 1,
            page: 1,
            total_results: 0,
            results: [],
            showResults: false,
        });
    }

    renderMovieList() {
        if (this.state.showResults) {
            return this.renderSearchResults();
        }
        return this.renderTrendingMovies();
    }

    renderLoading() {
        return (
            <View style={styles.loadingContainer}>
                <Image source={tmdb} style={{ height: 113, width: 104 }}/>
                <Text style={{ fontSize: 16, color: '#fff' }}>Loading...</Text>
            </View>
        );
    }

    renderTrendingMovies() {
        if (this.state.loading) {
            return this.renderLoading();
        }
        return (
            <TrendingMovieList movies={this.state.trendingMovies}/>
        );
    }

    renderSearchResults() {
        if (this.state.loading) {
            return this.renderLoading();
        }
        return (
            <SearchResults
                movies={this.state.results}
                page={this.state.page}
                totalPages={this.state.total_pages}
                totalResults={this.state.total_results}
                query={this.state.text}
                clearSearch={this.clearSearch}
                changePage={this.changePage}
            />
        );
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#141C27' }}>
                <SearchBar onSearch={this.searchForMovie} onChangeText={this.onChangeText} value={this.state.text} />
                {this.renderMovieList()}
            </View>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        requestFetchTrendingMovies: () => dispatch(requestFetchTrendingMovies()),
    }
}

function mapStateToProps(state) {
    return {
        trendingMovies: state.movies.trendingMovies,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);