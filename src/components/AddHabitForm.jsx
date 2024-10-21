import React, { useState } from 'react';

const AddHabitForm = ({ onAddHabit }) => {
    const [habit, setHabit] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (habit.trim()) {
            onAddHabit(habit);
            setHabit('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-4">
            <input
                type="text"
                value={habit}
                onChange={(e) => setHabit(e.target.value)}
                placeholder="Add a new habit"
                className="border rounded p-2 w-full"
            />
            <button type="submit" className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">Add Habit</button>
        </form>
    );
};

export default AddHabitForm;

