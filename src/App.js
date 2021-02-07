import React, { useState, useEffect } from "react";
import "./App.css";

const initMatrix = [];
function App() {

  const [matrix, setMatrix] = useState([]);
  const[currentPlayer, setCurrentPlayer] = useState('X');
  const[c, setC] = useState(null);
  const[r, setRow] = useState(null);
  const[winner, setWinner] = useState(null);
  const[isWinner, setIswinner] = useState(false);
  const[reset, setReset] = useState(true)

  useEffect(()=>{
    const tempRow = new Array(3).fill(null);
    const dummyArray = [];
    for(let i=0; i<3; i++){
      dummyArray.push([...tempRow])
    }
    setMatrix([...dummyArray]);
    setIswinner(false)
    console.log("start")
  },[reset])

  const onClickHandler = (r, c)=>{
    if(!matrix[r][c]&&!isWinner){
      setRow(r);
      setC(c)
      const dummyMatrix = [...matrix];
      let nextPlayer = currentPlayer==='X'?'O':'X';
      setCurrentPlayer(nextPlayer)
      dummyMatrix[r][c] = nextPlayer;
      setMatrix(dummyMatrix)
      
    }
    
  }
  const checkForWinner = ()=>{
    console.log("checkForWinner",matrix.length)
    let horizantal = true;
    let vertical = true;
    let d1 = true;
    let d2 = true;

    if(c === null || r === null)
    return

    for(let i=0;i<3;i++){
      console.log(matrix[r][i], matrix[i][c])
      if(matrix[r][i] !== currentPlayer){
        horizantal = false
      }
      if(matrix[i][c] !== currentPlayer){
        vertical = false;
      }
      if(matrix[i][i] !== currentPlayer){
        d1=false
      }
      console.log('>>>>',i, matrix.length - (i+1))
      if(matrix[i][matrix.length - (i+1)] !== currentPlayer){
        d2 = false
      }
    }
    console.log(horizantal, vertical,currentPlayer)
    if(horizantal || vertical ||d1||d2){
      setWinner(currentPlayer)
      setIswinner(true)
      console.log("end")
    }
  }

  useEffect(()=>{
    if(!isWinner)
    checkForWinner()
  })
  return (
    <div className="App">
      <header className="App-header">
        <h3>Tic-Toc-Toe</h3>
        <button onClick={()=>setReset(!reset)}>reset</button>
        {
        matrix.map((row,r)=>{
          return <div key={r} className="dinline">
            {row.map((col,c)=>{
              return <div className="cell" key={c} onClick={()=>onClickHandler(r,c)}>{col}</div>
            })}
          </div>
        })}
        <div>Now {currentPlayer ==='X'?'O':'X'}'s Turn</div>
        {isWinner&&
        <h3>{winner} is the winner</h3>}
      </header>
    </div>
  );
}

export default App;