import React, {useState} from 'react';
import HabitList from '../components/HabitList';
import AddHabitForm from '../components/AddHabitForm';
import ImageCarousel from '../components/ImageCarousel';
import NavBar from '../components/NavBar';

const HomePage = () => {
    const [habits, setHabits] =useState([]);

    const addHabit= (habit) => {
        setHabits([...habits, habit]);
    };
    return (
        <div className="container mx-auto p-4">
            <NavBar />
            <header className = "text-center">
                <h1 className = "text-4xl font-bold">Welcome to TrackiBits</h1>
                <p className = "mt-2 text-lg">Track your habits easily and effectively!</p>
                <ImageCarousel /> 
            </header> 
        </div>
    );
};
export default HomePage;
