
import React, { Component } from 'react';
import Board from "./app/Board"
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';


winState = [
            [ [0,0], [0,1], [0,2] ],
            [ [1,0], [1,1], [1,2] ],
            [ [2,0], [2,1], [2,2] ],
            [ [0,0], [1,0], [2,0] ],
            [ [0,1], [1,1], [2,1] ],
            [ [0,2], [1,2], [2,2] ],
            [ [0,0], [1,1], [2,2] ],
            [ [0,2], [1,1], [2,0] ],
        ];

export default class TicToc extends Component {
  render() {
    return (
      <View style={styles.container}>
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
