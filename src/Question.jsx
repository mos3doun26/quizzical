export default function Question({ question, register, error }) {


    return (
        <div className="question">
            <h2>{question.questionTitle}</h2>
            <div className="answers">
                {
                    question.randAnswersArrangement.map((answer, index) => {
                        return (
                            <>
                                <input type="radio" id={`${question.id}-answer-${index + 1}`} name={question.id}
                                    value={answer} {...register(`${question.id}`, { required: "Answer this question first before submission." })} />
                                <label htmlFor={`${question.id}-answer-${index + 1}`}>{answer}</label>

                            </>
                        )
                    })
                }
            </div>
            {error && <p className="error">{error.message}</p>}
        </div>
    )
}