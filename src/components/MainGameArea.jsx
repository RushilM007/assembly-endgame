import React from "react"
import {languages} from "../languages.js"
import {nanoid} from "nanoid"
import {clsx} from "clsx"
import {getFarewellText, chooseRandomWord} from "../utils.js"
import {useWindowSize} from 'react-use'
import Confetti from 'react-confetti'

export default function MainGameArea(){
    const {width,height} = useWindowSize()

    let wrongGuessCount = 0;
    
    const [currentWord, setCurrentWord] = React.useState(chooseRandomWord);

    const [guessedLetters, setGuessedLetters] = React.useState([]);

    const currentWordSplit = currentWord.toLowerCase().split("");

    for (let i = 0; i < guessedLetters.length; i++){
        if (!currentWord.includes(guessedLetters[i])){
            wrongGuessCount++;
        }
    }

    let isGameOver = false;
    if (wrongGuessCount >= languages.length-1 ){
        isGameOver = true;
    }
    
    if (currentWordSplit.every(letter=>guessedLetters.includes(letter)) && guessedLetters.length===currentWordSplit.length){
        isGameOver = true;
    }
    
    const isGameWon = currentWord.split("").every(letter=>guessedLetters.includes(letter))

    const isGameLost = wrongGuessCount >= languages.length-1
    isGameOver = isGameWon || isGameLost

    const guessedLettersOfCurrentWord = currentWordSplit.map((letter, index)=>{
        return <span key = {index}>{guessedLetters.includes(letter)?letter.toUpperCase():""}</span>
    });

    const displayWordAtEnd = currentWordSplit.map((letter, index)=>{
        return <span key = {index} style = {{color:guessedLetters.includes(letter)?"white":"red"}}>{letter.toUpperCase()}</span>
    })

    const languageChips = languages.map((language, index)=>{
    return <span key = {language.name} 
    style = {{backgroundColor: language.backgroundColor, color: language.color, marginLeft: 5, marginRight: 5, borderRadius:4, height:27, marginBottom: 5}}
    className = {wrongGuessCount<=index?"":"lostLanguageChip"}
    >{language.name}</span>
    })
    
    function addLettersToArray(letter){
        guessedLetters.includes(letter)?guessedLetters:setGuessedLetters(prev=>[...prev,letter])

    }

    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    const alphabetArray1 = alphabet.slice(0,10).split("");
    const keyboardRow1 = alphabetArray1.map((letter)=>{
        return <button 
            onClick = {()=>addLettersToArray(letter)} key = {nanoid()}
            className = {clsx(
                {   "letterPresent": guessedLetters.includes(letter) && currentWordSplit.includes(letter),
                    "letterNotPresent": guessedLetters.includes(letter) && !currentWordSplit.includes(letter),
                    "keyNotGuessed": !guessedLetters.includes(letter) 
                })} disabled = {isGameOver} aria-disabled={guessedLetters.includes(letter)} aria-label={`Letter ${letter}`}>{letter.toUpperCase()}
        
        </button>
    })
    
    const alphabetArray2 = alphabet.slice(10,20).split("");
    const keyboardRow2 = alphabetArray2.map((letter)=>{
        return <button className = {clsx(
                {   "letterPresent": guessedLetters.includes(letter) && currentWordSplit.includes(letter),
                    "letterNotPresent": guessedLetters.includes(letter) && !currentWordSplit.includes(letter),
                    "keyNotGuessed": !guessedLetters.includes(letter) 
                })} onClick = {()=>addLettersToArray(letter)} key = {nanoid()} disabled = {isGameOver} aria-disabled={guessedLetters.includes(letter)} aria-label={`Letter ${letter}`}>{letter.toUpperCase()}  </button>
    })

    const alphabetArray3 = alphabet.slice(20,27).split("");
    const keyboardRow3 = alphabetArray3.map((letter)=>{
        return <button className = {clsx(
                {   "letterPresent": guessedLetters.includes(letter) && currentWordSplit.includes(letter),
                    "letterNotPresent": guessedLetters.includes(letter) && !currentWordSplit.includes(letter),
                    "keyNotGuessed": !guessedLetters.includes(letter) 
                })} onClick = {()=>addLettersToArray(letter)} key = {nanoid()} aria-disabled={guessedLetters.includes(letter)}
                disabled = {isGameOver} aria-label={`Letter ${letter}`}>{letter.toUpperCase()} </button>
    })

    function renderFarewellMessage(){
        if (!currentWord.includes(guessedLetters[guessedLetters.length-1])&& wrongGuessCount>0 && !isGameOver){
           
            return (
                <h3 style = {{backgroundColor:"#7A5EA7",
                            borderRadius: 4,
                            width:400,
                            margin: "0 auto",
                            height: 50,
                            display:"flex",
                            alignItems: "center",
                            justifyContent:"center"
                }}>{getFarewellText(languages[wrongGuessCount-1].name)}</h3>
            )
        }
    }
    return(
        <>
        {(isGameOver && isGameWon) && <Confetti width = {width} height = {height} />}
        <section className = {isGameOver && isGameLost?"game-status-lost":isGameOver && isGameWon?"game-status-won":""}>
                {renderFarewellMessage()}
                <h2>{isGameOver && isGameLost?"You Lose!":isGameOver&&isGameWon?"You Win!":""}</h2>
                <h4>{isGameOver && isGameLost?"You lose! Better start learning Assembly 😭":isGameOver&&isGameWon?"Well done! 🎉":""}</h4>
        </section>
        <section id = "languageChips">
            {languageChips}
        </section>
        <section id = "currentWord">
            {isGameOver?displayWordAtEnd:guessedLettersOfCurrentWord}
        </section>
        <section id = "keyboard">
            <div className = "lettersRow">
                {keyboardRow1}
            </div>
            <div className = "lettersRow">
                {keyboardRow2}
            </div>
            <div className = "lettersRow" id = "thirdRow">
                {keyboardRow3}
            </div>
            <div id = "buttonContainer">
                {isGameOver && <button onClick = {()=>window.location.reload()} id = "newGameButton">New Game</button>}
            </div>
        </section>
        </>
    )
}