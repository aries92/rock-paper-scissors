import React, {useState} from "react";
import paper from './img/paper.png';
import rock from './img/rock.png';
import scissors from './img/scissors.png';
import './App.scss';

const animationTime = 1500;

const rules = {
    scissors: {
        img: scissors,
        beats: 'paper'
    },
    rock: {
        img: rock,
        beats: 'scissors'
    },
    paper: {
        img: paper,
        beats: 'rock'
    },
};

function App() {

    const [animation, setAnimation] = useState(false);
    const [result, setResult] = useState('');
    const [choice, setChoice] = useState({
        user: 'rock',
        pc: 'rock'
    });
    const [score, setScore] = useState({
        user: 0,
        pc: 0,
    });

    const handleChoice = (userChoice) => {

        let pcChoice = getPcChoice();

        setChoice({
            user: 'rock',
            pc: 'rock'
        });

        setAnimation(true);

        setTimeout(() => {

            setChoice({
                user: userChoice,
                pc: pcChoice
            });

            if (userChoice === pcChoice) {
                setResult('draw')
            } else {
                if (rules[userChoice].beats === pcChoice) {
                    setScore({...score, user: score.user += 1});
                    setResult('user win')
                }
                if (rules[userChoice].beats !== pcChoice) {
                    setScore({...score, pc: score.pc += 1});
                    setResult('pc win')
                }
            }

            setAnimation(false)
        }, animationTime)

    };

    const getPcChoice = () => {
        let rulesArray = Object.keys(rules);
        return rulesArray[rulesArray.length * Math.random() << 0];
    };

    return (
        <div className={'game'}>
            <section>
                <h1>
                    score {score.user} : {score.pc}
                </h1>
            </section>

            <section className={`body ${animation ? 'active' : ''}`} data-testid="body">
                <div>
                    <h3>User</h3>
                    <div className={'hand user'}>
                        <div className={'icon'}>
                            <img src={rules[choice.user].img} alt=""/>
                        </div>
                    </div>
                </div>
                <div>
                    <h3>PC</h3>
                    <div className={'hand pc'}>
                        <div className={'icon'}>
                            <img src={rules[choice.pc].img} alt=""/>
                        </div>
                    </div>
                </div>
            </section>

            <section className={'controls'}>
                <button onClick={e => handleChoice('rock')} disabled={animation} data-testid="button">
                    Rock
                </button>
                <button onClick={e => handleChoice('paper')} disabled={animation} data-testid="button">
                    Paper
                </button>
                <button onClick={e => handleChoice('scissors')} disabled={animation} data-testid="button">
                    Scissors
                </button>
            </section>
            <section>
                {!animation && result && <h2 data-testid="result">{result}</h2>}
            </section>
        </div>
    )
}

export default App;