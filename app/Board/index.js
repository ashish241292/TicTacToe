
import React, { Component } from 'react';
import strings from './../values/strings'
import { MiniMax } from './../Algorithms';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Vibration,
  TouchableNativeFeedback,
} from 'react-native';

let miniMax = new MiniMax( 2, 1 );

export default class Board extends Component {
    constructor( props ) {
        super(props);
        let board = miniMax.cloneBoard(this.props.board);
        let moveList = [ [0,0], [1,1], [2,2], [2,0], [0,2] ];
        let botFirstMove = moveList[ parseInt( Math.random() * 10 % 5 ) ];
        board[ botFirstMove[ 0 ] ][ botFirstMove[ 0 ] ] = 1;
        this.state={
            board: board,
            mode: "bot",
            currentPlayer: 2,
            win: false
        }
    }
    botmoves(){
        let { board, currentPlayer } = this.state;
        let { x, y } = miniMax.findMove( board );

        board[x][y] = currentPlayer;
        let win = miniMax.checkWinner(currentPlayer, board );
        let tie = miniMax.isItTie( board );
        this.setState({
            board: board,
            currentPlayer: currentPlayer==1?2:1,
            win: win,
            tie:tie,
            msg: currentPlayer==1?"Bot won":"Humman won",
            botTurn: false,
        })
    }
    handleSelect(row, col){
        Vibration.vibrate([0, 100], false);
        let { currentPlayer, board, mode } = this.state;
        let canMakeMove = miniMax.isItTie(board);
        if ( mode == "humman" && !canMakeMove  ) {
            if( board[row][col] == 0 ){
                board[row][col] = currentPlayer;
                let win = miniMax.checkWinner(currentPlayer, board );
                let tie = miniMax.isItTie(board);
                this.setState({
                    board: board,
                    win: win,
                    tie:tie,
                    msg: win?("Player "+ currentPlayer + "won!"):"",
                    winner: currentPlayer,
                    currentPlayer: currentPlayer==1?2:1,
                })
            }
        } else if ( mode == "bot" && !canMakeMove ) {
            if( board[row][col] == 0 ){
                board[row][col] = currentPlayer;
                let win = miniMax.checkWinner(currentPlayer, board );
                let tie = miniMax.isItTie(board);
                this.setState({
                    board: board,
                    win: win,
                    tie:tie,
                    msg: win?("Player "+ currentPlayer + "won!"):"",
                    winner: currentPlayer,
                    currentPlayer: currentPlayer==1?2:1,
                    botTurn: true,
                });
            }
        }
    }
    componentDidUpdate(){
        if( this.state.mode == "bot" && this.state.botTurn ){
            setTimeout(() => {
                this.botmoves();
            }, 50);
        }
    }
    drawGrid(){
        this.boxes = [];
        let {board, currentPlayer, win, count} = this.state;
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
                            <View style={{flex:1}}>
                                <Text style={[styles.text,{color:val==1?"#FF5722":"#5C6BC0"}]}>
                                    { ( val == 0 ? "" :( val == 1 ? "X" : "O" ) ) }
                                </Text>
                            </View>
                        </View>
                    </TouchableNativeFeedback>
                );
            }
            this.boxes.push(<View style={styles.row} key={i}>{row}</View>)
        }
    }
    handleResetBoard( ){
        Vibration.vibrate([0, 100], false);
        let board = miniMax.cloneBoard(this.props.board);
        let currentPlayer = 1;
        if ( this.state.mode == "bot" ) {
            let moveList = [ [0,0], [1,1], [2,2], [2,0], [0,2] ];
            let botFirstMove = moveList[ parseInt( Math.random() * 10 % 5 ) ];
            board[ botFirstMove[ 0 ] ][ botFirstMove[ 0 ] ] = 1;
            currentPlayer = 2 ;
        }
        this.setState({
            win: false,
            tie: false,
            winner: null,
            board: board,
            msg: "",
            currentPlayer: currentPlayer,
        })
    }
    handleGameMode( otherPlayer ){
        Vibration.vibrate([0, 100], false)
        let component = this;
        this.setState({mode: otherPlayer}, () => {
            component.handleResetBoard( );
        });
    }
    render() {
        this.drawGrid();
        let {msg, win, mode, winner, tie } = this.state;
        return (
            <View style={{flex:1}}>
                <View style={{flex:0.5, backgroundColor: strings.bgColor, alignItems:"center"}}>
                    <View style={{flex:1}}>
                        <Text style={{marginTop:20, fontSize:20, fontWeight:"500", alignSelf:"center"}}>
                            Tic Tac Toe
                        </Text>
                    </View>
                </View>
                <View style={styles.container}>
                    {this.boxes}
                </View>
                <View style={{flex:2, alignItems:"center", backgroundColor: strings.bgColor}}>
                    <View style={{flex:1, flexDirection:"row"}}>
                        <View style={[
                            {backgroundColor: mode=="bot"?"#FF8A65":strings.bgColor},
                            {margin:10, borderWidth:.2, height:35, borderRadius:10}
                        ]}>
                            <TouchableNativeFeedback
                                onPress={this.handleGameMode.bind(this, "bot")}
                                background={TouchableNativeFeedback.SelectableBackground()}
                                >
                                <Text style={{padding:5, fontSize:20, fontWeight:"500", alignSelf:"center"}}>
                                    Humman vs Bot
                                </Text>
                            </TouchableNativeFeedback>
                        </View>
                        <View style={[
                            {backgroundColor: mode=="humman"?"#FF8A65":strings.bgColor},
                            {margin:10, borderWidth:.2, height:35, borderRadius:10}
                        ]}>
                            <TouchableNativeFeedback
                                onPress={this.handleGameMode.bind(this, "humman")}
                                background={TouchableNativeFeedback.SelectableBackground()}
                                >
                                <Text style={{padding:5, fontSize:20, fontWeight:"500", alignSelf:"center"}}>
                                    Humman vs Humman
                                </Text>
                            </TouchableNativeFeedback>
                        </View>
                    </View>
                    <View>
                        {win || tie?
                            <View style={{margin:10, height:35}}>
                                <Text style={{
                                    color: winner==1?"#FF5722":"#5C6BC0",
                                    padding:5,
                                    fontSize:20,
                                    fontWeight:"500",
                                    alignSelf:"center"
                                }}>
                                    {tie?"Game has been draw!":msg}
                                </Text>
                            </View>:
                        null}
                        <View style={[
                            {margin:10, borderWidth:.2, height:35, borderRadius:10}
                        ]}>
                            <TouchableNativeFeedback
                                onPress={this.handleResetBoard.bind(this)}
                                background={TouchableNativeFeedback.SelectableBackground()}
                                >
                                <Text style={{
                                    padding:5,
                                    fontSize:20,
                                    fontWeight:"500",
                                    alignSelf:"center",
                                }}>
                                    Reset board
                                </Text>
                            </TouchableNativeFeedback>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:3,
        flexDirection: 'row',
        backgroundColor: strings.bgColor,
    },
    row:{
        flex: 1,
        flexDirection:"column",
    },
    col:{
        flex: 1,
        flexDirection:"row",
        borderLeftWidth:.5,
        borderTopWidth:.25,
        borderBottomWidth:.25,
        borderColor: "#455A64",
        alignItems: "center",
        justifyContent:"space-between"
    },
    text:{
        fontSize:100,
        fontWeight:"100",
        alignSelf: "center",
        alignItems: "center",
        //color: "#5C6BC0"
    },
});
