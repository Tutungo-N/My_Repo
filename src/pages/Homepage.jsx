import React, {useState} from 'react';
import HabitList from '../components/HabitList';
import AddHabitForm from '../components/AddHabitForm';
import ImageCarousel from '../components/ImageCarousel';

const HomePage = () => {
    const [habits, setHabits] =useState([]);

    const addHabit= (habit) => {
        setHabits([...habits, habit]);
    };
    return (
        <div className="container mx-auto p-4">
            <header className = "text-center">
                <h1 className = "text-4xl font-bold">Welcome to TrackiBits</h1>
                <p className = "mt-2 text-lg">Track your habits easily and effectively!</p>
                <ImageCarousel /> 
            </header>
            <main className = "mt-8">
                <h2 className="text-2xl font-semibold">Your Habits</h2>
                <HabitList habits={habits} />
                <AddHabitForm onAddHabit={addHabit} />
            </main> 
        </div>
    );
};
export default HomePage;
