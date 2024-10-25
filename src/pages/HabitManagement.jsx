import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HabitList from '../components/HabitList';
import AddHabitForm from '../components/AddHabitForm';

const HabitManagement = () => {
    const [habits, setHabits] = useState([]);

    // Fetch habits from the backend API when the component mounts
    useEffect(() => {
        fetchHabits();
    }, []);

    // Fetch habits from the backend
    const fetchHabits = async () => {
        try {
            const response = await axios.get('http://localhost:5000/habits'); // Adjust URL as needed
            setHabits(response.data); // Set fetched habits to state
        } catch (error) {
            console.error("Error fetching habits:", error);
        }
    };

    // Add habit with API call, then refetch data to sync
    const addHabit = async (habitData) => {
        try {
            await axios.post('http://localhost:5000/habits', habitData);
            fetchHabits(); // Refetch to get updated list
        } catch (error) {
            console.error("Error adding habit:", error);
        }
    };

    const deleteHabit = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/habits/${id}`);
            fetchHabits(); // Refetch to get updated list after deletion
        } catch (error) {
            console.error("Error deleting habit:", error);
        }
    };

    const editHabit = async (id, newName) => {
        try {
            await axios.put(`http://localhost:5000/habits/${id}`, { name: newName });
            fetchHabits(); // Refetch to get updated list after edit
        } catch (error) {
            console.error("Error editing habit:", error);
        }
    };

    const toggleHabitType = async (id) => {
        try {
            const habit = habits.find(h => h.id === id);
            await axios.put(`http://localhost:5000/habits/${id}`, { isGood: !habit.isGood });
            fetchHabits(); // Refetch to get updated list after toggle
        } catch (error) {
            console.error("Error toggling habit type:", error);
        }
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
                        startEditingHabit={(index) => setHabits(prev => {
                            const updated = [...prev];
                            updated[index].isBeingEdited = true;
                            return updated;
                        })}
                    />
                    <AddHabitForm onAddHabit={addHabit} />
                </main>
            </div>
        </div>
    );
};

export default HabitManagement;
