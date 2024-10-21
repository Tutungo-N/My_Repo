import React, { useState } from 'react';
import HabitList from '../components/HabitList';
import AddHabitForm from '../components/AddHabitForm';

const HabitManagement = () => {
    const [habits, setHabits] = useState([]);

    const addHabit = (habit) => {
        setHabits([...habits, habit]);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Create and Manage Your Habits Here</h1>
            <div className="flex flex-col md:flex-row justify-between">
                <main className = "mt-8">
                <h2 className="text-2xl font-semibold">Your Habits</h2>
                <HabitList habits={habits} />
                <AddHabitForm onAddHabit={addHabit} />
            </main>
            </div>
        </div>
    );
};

export default HabitManagement;

