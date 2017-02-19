
import React, { Component } from 'react';
import Board from "./app/Board";
import {
  AppRegistry,
  StyleSheet,
  StatusBar,
  Text,
  View
} from 'react-native';

export default class TicToc extends Component {
  render() {
    return (
      <View style={styles.container}>
            <StatusBar
                backgroundColor="#CFD8DC"
                barStyle="dark-content"
                networkActivityIndicatorVisible={true}
            />
        <Board board={[ [0,0,0], [0,0,0], [0,0,0] ]} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

AppRegistry.registerComponent('TicToc', () => TicToc);
