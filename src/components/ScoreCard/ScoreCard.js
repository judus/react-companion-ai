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
    const animationDuration = 3000; // Duration of the animation in milliseconds

    useEffect(() => {
        const newAnimateChange = {};
        Object.keys(scorecard).forEach(key => {
            const hasChanged = scorecard[key] !== previousScores[key];
            newAnimateChange[key] = hasChanged;

            // Debugging: Log if there's a change
            if(hasChanged) {
                console.log(`Animation triggered for ${key}: ${previousScores[key]} -> ${scorecard[key]}`);
            }

            setTimeout(() => {
                setAnimateChange(prev => ({...prev, [key]: false}));
            }, animationDuration);
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
