import React, { useState } from 'react'
import './TicTacToe.css'
import oIcon from '../assets/o.png'
import xIcon from '../assets/x.png'

function TicTacToe() {

    const [turn,setTurn] = useState(0);
    const [board,setBoard] = useState(["","","","","","","","",""]);

    const clickHandler = (index)=>{
        if(board[index] !== "") return;

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

    return (
        <div>
            <span>TicTacToe</span>
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
        </div>
    )
}

export default TicTacToe