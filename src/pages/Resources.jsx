import React from 'react';

const Resources = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Resources</h1>
            <ul className="list-disc list-inside">
                <li>
                    <a href="https://www.habitscience.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                        Habit Science
                    </a> – Learn the science behind habit formation.
                </li>
                <li>
                    <a href="https://www.goalsetting.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                        Goal Setting
                    </a> – Effective goal-setting techniques for productivity.
                </li>
                <li>
                    <a href="https://www.productivityhub.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                        Productivity Hub
                    </a> – Tips and tools for improving personal productivity.
                </li>
            </ul>
        </div>
    );
};

export default Resources;

