import React from 'react';

const HabitList = ({ habits, onDeleteHabit, onEditHabit, onToggleHabitType, startEditingHabit }) => {
    return (
        <ul className="space-y-4">
            {habits.length > 0 ? (
                habits.map((habit, index) => (
                    <li key={index} className="flex justify-between items-center border-b pb-2">
                        {habit.isBeingEdited ? (
                            <input
                                type="text"
                                defaultValue={habit.name}
                                onBlur={(e) => onEditHabit(index, e.target.value)}
                                className="border rounded p-2 w-full"
                            />
                        ) : (
                            <>
                            <span className="w-full">{habit.name}</span>
                            <span className="ml-4 text-gray-500 text-sm">({habit.date})</span>
                            </>
                        )}

                        <div className="flex space-x-4">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    checked={habit.isGood}
                                    onChange={() => onToggleHabitType(index)}
                                    className="form-radio h-5 w-5 text-green-500"
                                />
                                <span className="ml-2 text-green-500">Good Habit</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    checked={!habit.isGood}
                                    onChange={() => onToggleHabitType(index)}
                                    className="form-radio h-5 w-5 text-red-500"
                                />
                                <span className="ml-2 text-red-500">Bad Habit</span>
                            </label>
                        </div>

                        <div className="flex space-x-2">
                            {habit.isBeingEdited ? (
                                <button
                                    className="bg-green-500 text-white px-2 py-1 rounded"
                                    onClick={() => onEditHabit(index, habit.name)}
                                >
                                    Save
                                </button>
                            ) : (
                                <button
                                    className="bg-blue-500 text-white px-2 py-1 rounded"
                                    onClick={() => startEditingHabit(index)}
                                >
                                    Edit
                                </button>
                            )}
                            <button
                                className="bg-red-500 text-white px-2 py-1 rounded"
                                onClick={() => onDeleteHabit(index)}
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))
            ) : (
                <p>No habits added yet.</p>
            )}
        </ul>
    );
};

export default HabitList;
