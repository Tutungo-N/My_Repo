import React from 'react';

const HabitList = ({ habits }) => {
    return (
        <ul className="list-disc ml-5">
            {habits.map((habit, index) => (
                <li key={index} className="mt-2">{habit}</li>
            ))}
        </ul>
    );
};

export default HabitList;

