
import React from 'react';
import { StyleSheet, View, FlatList, Text, Image, TouchableOpacity } from 'react-native';

const back = require('../assets/static/HeaderTitleBack.png');
const nPage = require('../assets/static/ArrowRightWhite.png');
const pPage = require('../assets/static/back_arrow_white.png');

const styles = StyleSheet.create({
    list: {
        flex: 1,
    },
    movieContainer: {
        padding: 6,
        flexDirection: 'row',
        margin: 10,
        backgroundColor: '#2C3C52',
        alignItems: 'center',
        borderRadius: 10,
    },
    moviePoster: {
        height: 69,
        width: 46,
        backgroundColor: 'grey',
    },
    movieText: {
        fontSize: 16,
        color: '#fff',
    },
    textContainer: {
        flex: 1,
        padding: 8,
        flexDirection: 'column',
        alignSelf: 'stretch',
    },
    subText: {
        color: '#D3D3D3',
        fontSize: 14,
    },
    header: {
        padding: 16,
        alignItems: 'center',
        flexDirection: 'row',
    },
    headerText: {
        fontSize: 20,
        color: '#fff',
    },
    backButton: {
        height: 30,
        width: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomNav: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 16,
        alignSelf: 'stretch',
    },
    left: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingLeft: 16,
        flexDirection: 'row',
    },
    right: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingRight: 16,
        flexDirection: 'row',
    },

    });
/*
                movies={this.state.results}
                page={this.state.page}
                totalPages={this.state.total_pages}
                totalResults={this.state.total_results}
                clearSearch={this.clearSearch}
                query={this.state.text}
 */

export default class SearchResults extends React.Component {

    constructor(props) {
        super(props);
        this.resultRef = null;
    }

    flipPage = (direction) => {
        this.props.changePage(direction, () => {
            if (this.resultRef) {
                this.resultRef.scrollToOffset({x: 0, y: 0, animated: true});
            }
        });
    }

    renderMovieItem = ({ item }) => {
        const { original_title, id, poster_path, name, original_name, overview } = item;
        let titleText = original_title ? original_title : name;
        titleText = titleText.length > 0 ? titleText : original_name;
        const source = { uri: `https://image.tmdb.org/t/p/w185/${poster_path}` };
        source.cache = 'force-cache';
        return (
            <View key={id} style={styles.movieContainer}>
                <Image source={source} style={styles.moviePoster} />
                <View style={styles.textContainer}>
                    <Text style={styles.movieText}>{titleText}</Text>
                    <Text style={styles.subText} numberOfLines={3}>{overview}</Text>
                </View>
            </View>
        );
    }

    renderSearchHeader = () => {
        const titleString = `Search Results for ${this.props.query}`;
        const searchInfo = `Page ${this.props.page} of ${this.props.totalPages}`;
        return (
            <View style={styles.header}>
                <TouchableOpacity onPress={this.props.clearSearch} style={styles.backButton} activeOpacity={1}>
                    <Image source={back} style={{ width: 15, height: 24 }} />
                </TouchableOpacity>
                <View style={{ flexDirection: 'column', marginLeft: 16 }}>
                    <Text style={styles.movieText}>{titleString}</Text>
                    <Text style={styles.movieText}>{searchInfo}</Text>
                </View>
            </View>
        );
    }

    renderPageNav = () => {
        return (
            <View style={styles.bottomNav}>
                <View style={styles.left}>
                    {
                        this.props.page > 1 &&
                        <TouchableOpacity
                            onPress={() => this.flipPage('left')}
                            activeOpacity={1}
                        >
                            <Image source={pPage} style={{height: 20, width: 20}}/>
                        </TouchableOpacity>
                    }
                </View>
                <View style={styles.right}>
                    {
                        this.props.page < this.props.totalPages &&
                        <TouchableOpacity onPress={() => this.flipPage('right')} activeOpacity={1}>
                            <Image source={nPage} style={{height: 20, width: 20}}/>
                        </TouchableOpacity>
                    }
                </View>
            </View>
        )
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    ref={c => this.resultRef = c}
                    keyExtractor={(item) => `${item.id}`}
                    key={'SEARCH_RESULT_LIST'}
                    style={styles.list}
                    data={this.props.movies}
                    renderItem={this.renderMovieItem}
                    ListHeaderComponent={this.renderSearchHeader}
                    ListFooterComponent={this.renderPageNav}
                />
            </View>
        )
    }
}
