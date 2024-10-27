import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/store';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const location = useLocation(); // Get location to check for any state messages
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: `
                        query {
                            getUser(email: "${email}", password: "${password}") {
                                id
                                firstName
                                lastName
                                email
                            }    
                        }
                    `,
                 }),
            });

            const data = await response.json();

            if (data.data.getUser) {
                const user = data.data.getUser;
                
                // Store user data in Redux state
                dispatch(setUser(user));

                //Save user info to local storage or store session
                localStorage.setItem('user', JSON.stringify(user));
                
                //Redirect to home page
                navigate('/');
            } else {
                setError('Invalid email or password');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred. Please try again.');
        }   
    };

    return (
        <div className="container mx-auto p-4">
            {location.state?.successMessage && (
                <div className="success-message mb-4">
                    {location.state.successMessage}
                </div>
            )}
            <h1 className="text-2xl font-bold mb-4">Login</h1>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email:
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="border border-gray-300 p-2 w-full"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password:
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="border border-gray-300 p-2 w-full"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                    Login
                </button>
            </form>
        </div>
    );
};

export default LoginForm;