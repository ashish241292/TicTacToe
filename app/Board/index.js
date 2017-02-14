
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback,
} from 'react-native';

export default class Board extends Component {
    constructor( props ) {
        super(props);
        this.state={
            board: this.props.board,
            currentPlayer: 1,
            msg:"Let's play..."
        }
    }
    checkWinState( board, player ){
        let win = false;
        for (var i in winState) {
            let coord = winState[i]
            if( board[coord[0][0]][coord[0][1]] != 0 &&
                board[coord[0][0]][coord[0][1]] == board[coord[1][0]][coord[1][1]] &&
                board[coord[1][0]][coord[1][1]] == board[coord[2][0]][coord[2][1]] ) {
                win = true;
                break;
            }
        }
        return { win, player };
    }

    handleSelect(row, col){
        let board = this.state.board;
        if (!board[row][col]){
            board[row][col] = this.state.currentPlayer;
            let {win, player} = (this.checkWinState.bind(this))(board, this.state.currentPlayer);
            this.setState({
                board,
                currentPlayer: this.state.currentPlayer == 1 ? 2 : 1,
                msg: win ? `Player ${player == 1 ? 'X' : 'O'} won.`: "Game is going on!!",
                win
            })
        }
    }

    drawGrid(){
        this.boxes = [];
        let {board, currentPlayer, win} = this.state;
        for (var i = 0; i < board.length; i++) {
            let row = [];
            for (var j = 0; j < board[i].length; j++) {
                let val = board[i][j];
                row.push(
                    <TouchableNativeFeedback
                        disabled={win}
                        key={i+j}
                        style={{flex:1}}
                        onPress={this.handleSelect.bind(this, i, j)}
                        background={TouchableNativeFeedback.SelectableBackground()}>
                        <View style={styles.col}>
                            <Text style={styles.text}>{ ( val == 0 ? "" :( val == 1 ? "X" : "O" ) ) }</Text>
                        </View>
                    </TouchableNativeFeedback>
                );
            }
            this.boxes.push(<View style={styles.row} key={i}>{row}</View>)
        }
    }
    render() {
        this.drawGrid();
        let {msg, win} = this.state;
        return (
            <View style={{flex:1}}>
                <View style={{flex:1, backgroundColor: '#b3b3b3', alignItems:"center"}}>
                    <Text style={{paddingTop:20, fontSize:30, fontWeight: "500", color:"#444"}}>
                        {"Tic Tac Toe"}
                    </Text>
                </View>
                <View style={styles.container}>
                    {this.boxes}
                </View>
                <View style={{flex:1, alignItems:"center", backgroundColor: '#b3b3b3'}}>
                    <View style={{flex:1}}>
                        <Text style={{paddingTop:20, fontSize:20, fontWeight: "500", color:"#65c"}}>
                            {msg}
                        </Text>
                    </View>
                    {win != null ?<View style={{marginBottom:5, borderRadius:5, padding:5, backgroundColor:"#999", alignItems:"center"}}>
                        <TouchableNativeFeedback
                            background={TouchableNativeFeedback.SelectableBackground()}
                            onPress={()=>{
                                this.setState({
                                    msg: win ? "New game has been started!!":"Game has been reset!!",
                                    board: [ [0,0,0], [0,0,0], [0,0,0] ],
                                    win: null,
                                })
                                }}>
                            <Text style={{height:20, fontSize:20, fontWeight:"500"}}>Reset</Text>
                        </TouchableNativeFeedback>
                    </View>:null}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:5,
        flexDirection: 'row',
        backgroundColor: '#b3b3b3',
    },
    row:{
        flex: 1,
        flexDirection:"column",
        borderWidth:1,
        borderColor: "#b3b3b3"
    },
    col:{
        flex: 1,
        flexDirection:"row",
        borderWidth:1.5,
        alignItems: "center",
        backgroundColor: '#A3A3A3',
        borderColor: "#b3b3b3",
        borderRadius:10,
    },
    text:{
        fontSize:120,
        paddingLeft:25,
        alignSelf: "center",
        color: "#777777"
    }
});
