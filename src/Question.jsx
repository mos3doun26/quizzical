export default function Question({ question }) {


    return (
        <div className="question">
            <h2>{question.questionTitle}</h2>
            <div className="answers">
                {
                    question.randAnswersArrangement.map((answer, index) => {
                        return (
                            <>
                                <input type="radio" id={`${question.id}-answer-${index + 1}`} name={question.id} value={answer} />
                                <label htmlFor={`${question.id}-answer-${index + 1}`}>{answer}</label>
                            </>
                        )
                    })
                }
            </div>
        </div>
    )
}