import React, { useState } from 'react';

const AddHabitForm = ({ onAddHabit }) => {
    const [habitName, setHabitName] = useState('');
    const [date, setDate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Only add the habit if both the habit and date are provided
        if (habitName.trim() && date) {
          onAddHabit({ name: habitName, date });
          setHabitName('');  // Reset habitName after adding the habit
          setDate('');       // Reset date after adding the habit
        }
      };
    
    return (
        <form onSubmit={handleSubmit} className="mt-4">
            <input
                type="text"
                value={habitName}
                onChange={(e) => setHabitName(e.target.value)}
                placeholder="Add a new habit"
                className="border rounded p-2 w-full"
            />
            {/* Date Input */}
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="p-2 border border-gray-300 rounded-md"
            />

            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
                Add Habit
            </button>
        </form>
    );
};

export default AddHabitForm;
