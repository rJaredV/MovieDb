
import React from 'react';
import {StyleSheet, View, FlatList, Text, Image} from 'react-native';

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
    },
    headerText: {
        fontSize: 20,
        color: '#fff',
    }
});

export default class TrendingMovieList extends React.Component {

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

    renderTrendingHeader = () => {
        return (
          <View style={styles.header}>
              <Text style={styles.headerText}>Trending Movies</Text>
          </View>
        );
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    key={'TRENDING_LIST'}
                    keyExtractor={(item) => `${item.id}`}
                    style={styles.list}
                    data={this.props.movies}
                    renderItem={this.renderMovieItem}
                    ListHeaderComponent={this.renderTrendingHeader}
                />
            </View>
        )
    }
}
