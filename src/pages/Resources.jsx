import React, {useEffect} from 'react';
import '../index.css';

const Resources = () => {

    useEffect(() => {
        const container = document.querySelector('.resources-container');
        const numberOfStars = 100; // Number of stars you want to create

        for (let i = 0; i < numberOfStars; i++) {
            const star = document.createElement('div');
            const size = Math.random() * 3 + 1; // Random size between 1 and 4
            const x = Math.random() * window.innerWidth; // Random x position
            const y = Math.random() * window.innerHeight; // Random y position

            star.className = 'star';
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.left = `${x}px`;
            star.style.top = `${y}px`;
            container.appendChild(star);
        }
    }, []);

    return (
        <div className="resources-container flex flex-col items-center justify-center">
            <h1 className="text-8xl font-bold mb-6 text-center text-white">Resources</h1>
            <div className="flex flex-wrap gap-6 justify-center">
                <div className="resource-card">
                    <a href="https://www.helpguide.org/mental-health/wellbeing/how-to-break-bad-habits-and-change-negative-behaviors" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline font-semibold text-lg">
                        HelpGuide
                    </a>
                    <p className="text-gray-600 mt-2">How to Break Bad Habits.</p>
                </div>
                <div className="resource-card">
                    <a href="https://learningcenter.unc.edu/tips-and-tools/changing-habits/" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline font-semibold text-lg">
                        The Learning Center
                    </a>
                    <p className="text-gray-600 mt-2">Changing Habits.
                        "We are what we repeatedly do. Excellence, then, is not an act, but a habit".
                        –Aristotle.</p>
                </div>
                <div className="resource-card">
                    <a href="https://drjud.com/" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline font-semibold text-lg">
                        Dr. Jud
                    </a>
                    <p className="text-gray-600 mt-2">Habit change made simple.</p>
                </div>
            </div>
        </div>
    );
};

export default Resources;
