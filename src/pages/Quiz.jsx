import { useEffect, useRef, useState } from 'react'
import Question from "../Question";
import { useNavigate } from 'react-router-dom';
import { decode } from 'html-entities';
import preLoader from '../assets/infinite-spinner.svg'


export default function Quiz({ handleQuestions, handleAnswers }) {
    const [fetchedQuestions, setFetchedQuestions] = useState([])
    const navigate = useNavigate()

    let stop = false

    useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5&type=multiple")
            .then(res => res.json())
            .then(data => {
                if (!stop) {
                    fetchData(data)
                    shuffleAnswers()
                    stop = true
                }
            })
    }, [])

    useEffect(() => {
        handleQuestions(fetchedQuestions)
    }, [fetchedQuestions])

    function fetchData(data) {
        setFetchedQuestions(() => {
            return data.results.map((question, index) => (
                {
                    id: index + 1,
                    questionTitle: decode(question.question),
                    correctAnswer: decode(question.correct_answer),
                    incorrectAnswers: question.incorrect_answers.map(answer => decode(answer)),
                    randAnswersArrangement: []
                }
            ))
        })


    }
    function shuffleAnswers() {
        setFetchedQuestions(prev => prev.map(question => (
            { ...question, randAnswersArrangement: [...question.incorrectAnswers, question.correctAnswer].sort(() => Math.random() - 0.5) }
        )))
    }

    function goToResultPage() {
        navigate('/result')
    }

    function handleFormData(formData) {
        let answers = []
        formData.forEach(item => answers.push(item))
        // console.log(answers)
        handleAnswers(answers)
        goToResultPage()
    }

    return (
        <main className="quize">
            <form action={handleFormData}>
                {
                    fetchedQuestions.length > 0 ?
                        fetchedQuestions.map((question, index) => <Question key={index} question={question} />) :
                        <div className="preloader">
                            <img alt="preloader" src={preLoader} />
                            <span>Loading your quize...</span>
                        </div>
                }
                {fetchedQuestions.length > 0 && <button className='btn check-answers-btn'>Check answers</button>}
            </form>
        </main>
    )
}