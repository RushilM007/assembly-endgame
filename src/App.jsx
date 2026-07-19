import { useState } from 'react'
import Header from "./components/Header.jsx"
import MainGameArea from "./components/MainGameArea"

export default function App(){
  return (
    <>
    <header>
    <Header />
    <MainGameArea />
    </header>
    </>
  )
}