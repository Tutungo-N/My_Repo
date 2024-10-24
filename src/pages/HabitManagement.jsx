import React, { useState, useEffect } from 'react';
import HabitList from '../components/HabitList';
import AddHabitForm from '../components/AddHabitForm';

const HabitManagement = () => {
    const [habits, setHabits] = useState([]);

    // Load habits from localStorage when the component mounts
    useEffect(() => {
        const savedHabits = JSON.parse(localStorage.getItem('habits'));
        if (savedHabits) {
            setHabits(savedHabits);
        }
    }, []);

    // Save habits to localStorage whenever the habit list updates
    useEffect(() => {
        localStorage.setItem('habits', JSON.stringify(habits));
    }, [habits]);

    // Modify to accept the habit object passed from AddHabitForm
    const addHabit = ({ name, date }) => {
        const newHabit = {
            name: name,   
            date: date,
            isGood: true, // Default to a "good" habit when added
            isBeingEdited: false 
        };
        setHabits([...habits, newHabit]);
    };

    const deleteHabit = (index) => {
        const updatedHabits = habits.filter((_, i) => i !== index);
        setHabits(updatedHabits);
    };

    const editHabit = (index, newName) => {
        const updatedHabits = habits.map((habit, i) => 
            i === index ? { ...habit, name: newName, isBeingEdited: false } : habit
        );
        setHabits(updatedHabits);
    };

    const startEditingHabit = (index) => {
        const updatedHabits = habits.map((habit, i) => 
            i === index ? { ...habit, isBeingEdited: true } : habit
        );
        setHabits(updatedHabits);
    };

    const toggleHabitType = (index) => {
        const updatedHabits = habits.map((habit, i) =>
            i === index ? { ...habit, isGood: !habit.isGood } : habit
        );
        setHabits(updatedHabits);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Create and Manage Your Habits Here</h1>
            <div className="flex flex-col md:flex-row justify-between">
                <main className="mt-8">
                    <h2 className="text-2xl font-semibold">Your Habits</h2>
                    <HabitList
                        habits={habits}
                        onDeleteHabit={deleteHabit}
                        onEditHabit={editHabit}
                        onToggleHabitType={toggleHabitType}
                        startEditingHabit={startEditingHabit}
                    />
                    <AddHabitForm onAddHabit={addHabit} />
                </main>
            </div>
        </div>
    );
};

export default HabitManagement;
