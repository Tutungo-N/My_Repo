import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HabitList from '../components/HabitList';
import AddHabitForm from '../components/AddHabitForm';

const HabitManagement = () => {
    const [habits, setHabits] = useState([]);

    // Fetch habits from the GraphQL API when the component mounts
    useEffect(() => {
        fetchHabits();
    }, []);

    // Fetch habits using GraphQL
    const fetchHabits = async () => {
        try {
            const response = await axios.post('http://localhost:5000/graphql', {
                query: `
                    query {
                        getHabits {
                            id
                            name
                            date
                            isGood    
                        }
                    }
                `
            }); 
            console.log('Fetched Habits:', response.data.data.getHabits);
            setHabits(response.data.data.getHabits); // Set fetched habits to state
        } catch (error) {
            console.error("Error fetching habits:", error);
        }
    };

    // Add habit with GraphQL mutation
    const addHabit = async (habitData) => {
        try {
            await axios.post('http://localhost:5000/graphql', {
                query: `
                    mutation {
                        addHabit(name: "${habitData.name}", date: "${habitData.date}", isGood: ${habitData.isGood || true}) {
                            id 
                            name
                            date
                            isGood
                        }
                    }
                `
            });
            fetchHabits(); // Refetch to get updated list
        } catch (error) {
            console.error("Error adding habit:", error);
        }
    };

    // Delete habit using GraphQL mutation
    const deleteHabit = async (id) => {
        try {
            await axios.post('http://localhost:5000/graphql', {
                query: `
                    mutation {
                        deleteHabit(id: ${id})
                    }
                `
            });
            fetchHabits(); // Refetch to get updated list after deletion
        } catch (error) {
            console.error("Error deleting habit:", error);
        }
    };

    // Edit habit using GraphQL mutation
    const editHabit = async (id, newName, isGood) => {
        try {
            await axios.post('http://localhost:5000/graphql', {
                query: `
                    mutation {
                        updateHabit(id: ${id}, name: "${newName}", isGood: ${isGood})   
                    }
                `
             });
            setHabits(prev => prev.map(habit => habit.id === id ? {...habit, isBeingEdited: false} : habit)); //Reset editing state
             fetchHabits(); // Refetch to get updated list after edit
        } catch (error) {
            console.error("Error editing habit:", error);
        }
    };

    const toggleHabitType = async (id, isGood) => {
        try {
            //const habit = habits.find(h => h.id === id);
            await axios.post('http://localhost:5000/graphql', { 
                query: `
                    mutation {
                        updateHabit(id: ${id}, isGood: ${isGood})
                    }
                `
             });
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
