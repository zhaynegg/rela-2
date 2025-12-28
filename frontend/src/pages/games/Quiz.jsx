import { useState } from "react";
import "../../styles/Quiz.css";


const questions = [
    {
        question: "What is my name?",
        options: ["Json", "Jason", "Zhassyn", "Zhasyn"],
        answer: "Zhassyn",
    },
    {
        question: "Why do I like you?",
        options: ["I don't know", "C++", "You're just the one I want to marry", "You're beautiful"],
        answer: "You're just the one I want to marry",
    },
    {
        question: "How many times I kissed you?",
        options: [
            "Nearly 3000 times",
            "The same number as you",
            "The number of stars in the sky",
            "Infinite times",
        ],
        answer: "Nearly 3000 times",
    },
];

function Quiz() {
    const [current, setCurrent] = useState(0);
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(false);

    const handleAnswer = (option) => {
        if (option === questions[current].answer) {
            setScore(score + 1);
        }

        if (current + 1 < questions.length) {
            setCurrent(current + 1);
        } else {
            setFinished(true);
        }
    };

    return (
        <div className="quiz-container">
            {!finished ? (
                <>
                    <h2>Question {current + 1}</h2>
                    <p className="quiz-question">
                        {questions[current].question}
                    </p>

                    <div className="quiz-options">
                        {questions[current].options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleAnswer(option)}
                                className="quiz-button"
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </>
            ) : (
                <>
                    <h2>Quiz Finished 🎉</h2>
                    <p>
                        Your score: {score} / {questions.length}
                    </p>
                    <button
                        className="quiz-button"
                        onClick={() => {
                            setCurrent(0);
                            setScore(0);
                            setFinished(false);
                        }}
                    >
                        Restart Quiz
                    </button>
                </>
            )}
        </div>
    );
}

export default Quiz;
