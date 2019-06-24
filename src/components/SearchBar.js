
import React from 'react';
import {StyleSheet, View, TextInput, Image} from 'react-native';

const searchIcon = require('../assets/static/Search.png');

const styles = StyleSheet.create({
    searchContainer: {
        flex: 1,
        backgroundColor: 'grey',
        flexDirection: 'row',
        maxHeight: 40,
        paddingLeft: 16,
        paddingRight: 16,
        margin: 10,
        borderRadius: 20,
        alignItems: 'center'
    },
    searchInput: {
        flex: 1,
        color: '#fff',
        fontSize: 16
    },
    searchIcon: {
        width: 22,
        height: 21,
        marginLeft: 10
    },
})

export default class SearchBar extends React.Component {
    render() {
        return (
            <View style={styles.searchContainer}>
                <TextInput
                    placeholder={'Search Movies...'}
                    placeholderTextColor={'#fff'}
                    style={styles.searchInput}
                    value={this.props.text}
                    onChangeText={this.props.onChangeText}
                    onSubmitEditing={() => this.props.onSearch(this.props.text, () => {})}
                    returnKeyType={'search'}
                    clearButtonMode={'always'}
                />
                <Image source={searchIcon} style={styles.searchIcon} />
            </View>
        )
    }
}
