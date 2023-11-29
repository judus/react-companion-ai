import React, {useEffect, useState} from 'react';

const emotionToEmoji = {
    happiness: '😊',
    interest: '🤔',
    sadness: '😢',
    frustration: '😠',
    fear: '😨',
    surprise: '😮',
    trust: '🤝',
    romantic_attachment: '💞',
    confidence: '💪',
    loneliness: '🙍‍♂️',
    confusion: '😕'
};

const ScoreCard = ({scorecard}) => {
    const [previousScores, setPreviousScores] = useState(scorecard);
    const [animateChange, setAnimateChange] = useState({});

    useEffect(() => {
        const newAnimateChange = {};
        Object.keys(scorecard).forEach(key => {
            newAnimateChange[key] = scorecard[key] !== previousScores[key];
        });
        setAnimateChange(newAnimateChange);
        setPreviousScores(scorecard);
    }, [scorecard]);

    const capitalizeWords = (str) => {
        return str.replace(/\b\w/g, char => char.toUpperCase()).replace(/_/g, ' ');
    }

    return (
        <div className="scorecard">
            {Object.entries(scorecard).map(([emotion, value]) => (
                <div key={emotion} className="scorecard-item" title={emotion}>
                    <div className="label">
                        {emotion === 'romantic_attachment' ? 'Romance' : capitalizeWords(emotion)}
                    </div>
                    <span className="emotion">{emotionToEmoji[emotion]}</span>
                    <span className={`value ${animateChange[emotion] ? 'animate-change' : ''}`}>
                        x{value}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default ScoreCard;
