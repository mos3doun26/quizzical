import clsx from "clsx"
import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import preLoader from '../assets/infinite-spinner.svg'
import { preload } from "react-dom"

export default function Result({ questions, answers }) {
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    function countCorrectAnswer() {
        return questions.filter((question, index) => question.correctAnswer === answers[index]).length
    }

    function goToQuizPage() {
        navigate('/quiz')
    }


    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 2500)
    }, [])


    const questionsElements = questions.map((question, index) => {
        return (
            <>
                <div key={index} className="question">
                    <h2>{question.questionTitle}</h2>
                    <div className="answers">
                        {
                            question.randAnswersArrangement.map((answer, answerIndex) => {
                                const correctAnswer = answer === question.correctAnswer
                                const isWrongAnswer = answer !== question.correctAnswer && answer === answers[index]
                                const className = clsx("answer", correctAnswer && "correct-answer", isWrongAnswer && 'wrong-answer')
                                return (
                                    <div key={answerIndex} className={className}>{answer}</div>
                                )
                            })
                        }
                    </div>
                </div>
            </>
        )
    })

    return (
        <main className="result">
            {loading ?
                <div className="preloader">
                    <img alt="preloader" src={preLoader} />
                    <span>Wait a while showing your results...</span>
                </div> :
                <>
                    {questionsElements}
                    <div className="score-info">
                        <p>You Scored {countCorrectAnswer()}/5 correct answers</p>
                        <button onClick={() => goToQuizPage()} className="btn play-again-btn">Play again</button>
                    </div>
                </>

            }
        </main>
    )
}