import React, { useEffect, useMemo, useState } from 'react'
import './TicTacToe.css'
import oIcon from '../assets/o.png'
import xIcon from '../assets/x.png'

function TicTacToe() {

    const [turn,setTurn] = useState(0);
    const [board,setBoard] = useState(["","","","","","","","",""]);
    const [winner,setWinner] = useState(null);

    const clickHandler = (index)=>{
        if(board[index] !== "" || winner) return;

        const copy = [...board];
        if(turn%2===0){
            copy[index] = 'O'
        }else{
            copy[index] = 'X'
        }
        setBoard(copy);
        setTurn((turn+1%2));
    }

    const determineIcon = (box)=>{
        if(box==='O'){
            return <img src={oIcon}/>
        } else{ 
            return <img src={xIcon}/>
        }
    }

    const determineWinner = (board)=>{
        //check rows
        for(let i  = 0 ; i < 3 ; i++){
            if(board[i*3] === "" || board[i*3+1] === "" || board[i*3+2] === "" ){
                continue;
            } else if(board[i*3] === board[i*3+1] && board[i*3+1] === board[i*3+2]){
                return board[i*3]
            }
        }

        //check columns
        for(let i  = 0 ; i < 3 ; i++){
            if(board[i] === "" || board[i+3] === "" || board[i+6] === "" ){
                continue;
            } else if(board[i] === board[i+3] && board[i+3] === board[i+6]){
                return board[i]
            }
        }

        //check left-right diag
        if(board[0] === board[4] && board[4] === board[8]){
            return board[0];
        }

        //check right-left diag
        if(board[2] === board[4] && board[4] === board[6]){
            return board[2]
        }

        //check if draw
        if(!board.includes("")) return 'draw';
    }

    const resetGame = () =>{
        setTurn(0);
        setBoard(["","","","","","","","",""]);
        setWinner(null);
    }

    useMemo(()=>{
        const winner = determineWinner(board);
        if(winner){
            setWinner(winner);
        }
    },[board]);

    return (
        <>
            <div className='title'>
                TicTacToe
            </div>
            <div className="title" style={winner === null? {}:{display:'none'}}>Current turn = {turn%2===0? 'O':'X'}</div>
            <div className='title' style={winner === null? {display:'none'}:{}}>
                {winner && winner === 'draw'? 'Nobody wins!':''}
                {winner && winner !== 'draw'? `Winner is ${winner}!`:''}
            </div>

            <div className="board">
                {board.map((box,index)=> (
                    <div
                    key = {index} 
                    className={`box ${box === ""? 'empty':box=="O"? 'o':'x'}`}
                    onClick={()=>clickHandler(index)}>
                        {box!==""? determineIcon(box):''}
                    </div>
                ))}
            </div>
            <div className="button">
                <button onClick={() => resetGame()}>Reset</button>
            </div>
        </>
    )
}

export default TicTacToe