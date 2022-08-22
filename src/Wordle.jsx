import { useState,useEffect } from "react"
import "./Wordle.css"
import Node from "./Letter"




function Wordle() {
    const wordsArray=["DEPOT","MOVIE","SPILL","AROMA","THESE","THOSE","SHARD","MOIST","WRATH","SURGE","PURGE","HINGE","PRINT","LOGIN","SHALL","STOVE","SHAPE","SHARE","TRIPS","LIVES","LOVES","HATER","HATES","LOOPS","LYRIC","LUCKY","ANGRY","ANGER","ANGEL","BRICK","BUSHY","BRAWN","BRAWL"]
    let [grid,setGrid]=useState([])
    let [currentIdx,setCurrentIdx]=useState(0)
    let [currentRow,setCurrentRow]=useState(0)
    let [word,setWord]=useState("")
    let [userGuess,setUserGuess]=useState("")

    function generateGrid(){
        let newGrid=[]
        for(let col=1;col<=6;col++){
                const rowArray=[]
                for(let row=1;row<=5;row++){
                    rowArray.push("⠀")//invisible unicode caracter so that it occuppies space in the html
                }
                newGrid.push(rowArray)
        }
        return newGrid
    }
    function addLetter(e){
        if(currentIdx==5) return
        const letter=e.target.innerHTML
        setUserGuess(userGuess+letter)
        console.log(userGuess)
        const newGrid=grid.slice()
        newGrid[currentRow][currentIdx]=letter
        setCurrentIdx(++currentIdx)
        setGrid(newGrid)
    }
    function removeLetter(){
        if (currentIdx<=0)return
        const newGrid=grid.slice()
        setCurrentIdx(--currentIdx)
        setUserGuess(userGuess.slice(0, -1))
        newGrid[currentRow][currentIdx]="⠀"
        setGrid(newGrid)
    }
    function enterWord(){
        if(currentIdx<5) return
        let colorsArray=compareWords()
        animateWord(colorsArray)
        setCurrentRow(++currentRow)
        setCurrentIdx(0)
    }
    function compareWords(){
        let colorsArray=[]
        for (let i=0;i<=userGuess.length-1;i++){
            console.log(userGuess[i],word[i])
            if(userGuess[i]==word[i]){
                colorsArray.push('green')
            }
            else if(word.includes(userGuess[i])){
                colorsArray.push('yellow')
            }
            else colorsArray.push('gray')
        }
        return colorsArray
    }
    const animateWord=(colorsArray)=>{
        const nodes=document.querySelectorAll(`.node-${currentRow}`)
        for (let i=0;i<colorsArray.length;i++){
            setTimeout(()=>{
                console.log(word[i])
                nodes[i].classList.add(`${colorsArray[i]}-letter`)    
                console.log(i)
            },80*i)
        }
        setTimeout(()=>{ 
            for (let i=0;i<colorsArray.length;i++){
                const key= document.querySelector(`.key-${userGuess[i]}`)
                key.classList.add(`${colorsArray[i]}-letter`)   
            }
        },80*colorsArray.length)
        setUserGuess("")
    }
    useEffect(()=>{
        const newGrid = generateGrid()
        setGrid(newGrid)
        const newWord=wordsArray[Math.floor(Math.random()*wordsArray.length)]
        setWord(newWord)
        console.log(newWord)
    },[])

    return(
        <>
        <header>
            <div className="logo">Wordle</div>
        </header>
        <div className="grid">
            {grid.map((row, rowIdx) => {
                return (
                <div key={rowIdx} className="row ">
                    {row.map((letter, letterIdx) => {
                        return (
                            <Node letter={letter} key={letterIdx} row={rowIdx}></Node>
                        );
                    })}
                </div>
                );
            })}
        </div>
        <div className="keys">
            <div className="row-1">
                <button className="key key-Q" onClick={addLetter}>Q</button>
                <button className="key key-W" onClick={addLetter}>W</button>
                <button className="key key-E" onClick={addLetter}>E</button>
                <button className="key key-R" onClick={addLetter}>R</button>
                <button className="key key-T" onClick={addLetter}>T</button>
                <button className="key key-Y" onClick={addLetter}>Y</button>
                <button className="key key-U" onClick={addLetter}>U</button>
                <button className="key key-I" onClick={addLetter}>I</button>
                <button className="key key-O" onClick={addLetter}>O</button>
                <button className="key key-P" onClick={addLetter}>P</button>
            </div>
            <div className="row-2">
                <button className="key key-A" onClick={addLetter}>A</button>
                <button className="key key-S" onClick={addLetter}>S</button>
                <button className="key key-D" onClick={addLetter}>D</button>
                <button className="key key-F" onClick={addLetter}>F</button>
                <button className="key key-G" onClick={addLetter}>G</button>
                <button className="key key-H" onClick={addLetter}>H</button>
                <button className="key key-J" onClick={addLetter}>J</button>
                <button className="key key-K" onClick={addLetter}>K</button>
                <button className="key key-L" onClick={addLetter}>L</button>
            </div>
            <div className="row-3">
                <button className="enter" onClick={enterWord}>ENTER</button>
                <button className="key key-Z" onClick={addLetter}>Z</button>
                <button className="key key-X" onClick={addLetter}>X</button>
                <button className="key key-C" onClick={addLetter}>C</button>
                <button className="key key-V" onClick={addLetter}>V</button>
                <button className="key key-B" onClick={addLetter}>B</button>
                <button className="key key-M" onClick={addLetter}>N</button>
                <button className="key key-N" onClick={addLetter}>M</button>
                <button className="backspace" onClick={removeLetter}>DEL</button>
            </div>

        </div>
        </>
    )
}


export default Wordle