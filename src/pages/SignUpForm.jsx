import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';

const SignupForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.firstName) newErrors.firstName = 'First name is required';
        if (!formData.lastName) newErrors.lastName = 'Last name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.password) newErrors.password = 'Password is required';
        if (formData.password !== formData.confirmPassword)
            newErrors.confirmPassword = 'Passwords do not match';
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            try {
                const response = await fetch('http://localhost:5000/graphql', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        query: `
                            mutation {
                                createUser(
                                    firstName: "${formData.firstName}",
                                    lastName: "${formData.lastName}",
                                    email: "${formData.email}",
                                    password: "${formData.password}"
                                )
                            }
                        `,
                    }),
                });
                const data = await response.json();
                if (data.data.createUser === 'User created successfully') {
                    // Redirect to login page
                    navigate('/login');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };
    

    return (
        <div className="form-container">
            <form className="form-wrapper" onSubmit={handleSubmit}>
                <h2 className="form-heading">Sign Up</h2>

                <div className="mb-4">
                    <label className="form-label" htmlFor="firstName">
                        First Name
                    </label>
                    <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        value={formData.firstName}
                        onChange={handleChange}
                        className={`form-input ${errors.firstName ? 'form-input-error' : ''}`}
                    />
                    {errors.firstName && <p className="error-message">{errors.firstName}</p>}
                </div>

                <div className="mb-4">
                    <label className="form-label" htmlFor="lastName">
                        Last Name
                    </label>
                    <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        value={formData.lastName}
                        onChange={handleChange}
                        className={`form-input ${errors.lastName ? 'form-input-error' : ''}`}
                    />
                    {errors.lastName && <p className="error-message">{errors.lastName}</p>}
                </div>

                <div className="mb-4">
                    <label className="form-label" htmlFor="email">
                        Email
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`form-input ${errors.email ? 'form-input-error' : ''}`}
                    />
                    {errors.email && <p className="error-message">{errors.email}</p>}
                </div>

                <div className="mb-4">
                    <label className="form-label" htmlFor="password">
                        Password
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={`form-input ${errors.password ? 'form-input-error' : ''}`}
                    />
                    {errors.password && <p className="error-message">{errors.password}</p>}
                </div>

                <div className="mb-4">
                    <label className="form-label" htmlFor="confirmPassword">
                        Confirm Password
                    </label>
                    <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={`form-input ${errors.confirmPassword ? 'form-input-error' : ''}`}
                    />
                    {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
                </div>

                <div className="flex items-center justify-between">
                    <button type="submit" className="submit-button">
                        Sign Up
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SignupForm;
