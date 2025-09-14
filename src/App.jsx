import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Quiz from './pages/Quiz'
import Result from './pages/Result'
import NotFound from './NotFound'

function App() {
  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState([])

  function handleQuestions(questions) {
    setQuestions(questions)
  }

  function handleAnswers(answers) {
    setAnswers(answers)
  }

  const resultPageConent = answers.length > 0 ?
    <Result questions={questions} answers={answers} handleAnswers={handleAnswers} /> :
    <NotFound resultPage={true} />

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/quiz' element={<Quiz handleQuestions={handleQuestions} handleAnswers={handleAnswers} />} />
        <Route path='/result' element={resultPageConent} />
        <Route path='/*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
