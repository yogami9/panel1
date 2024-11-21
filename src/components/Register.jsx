import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!email || !password || !confirmPassword) {
            setError("All fields are required.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }

        setError(null);
        setLoading(true);

        try {
            await axios.post('https://eduacers-backend.onrender.com/auth/register', { email, password });
            setLoading(false);
            setSuccessMessage("Registration successful! Please check your email to verify your account.");
            setTimeout(() => navigate('/verify'), 3000); // Redirect after 3 seconds
        } catch (error) {
            setLoading(false);
            setError('Registration failed: ' + (error.response ? error.response.data.message : error.message));
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 mb-4">
            {error && <p className="text-red-500">{error}</p>}
            {successMessage && <p className="text-green-500">{successMessage}</p>}
            <h2 className="text-lg font-semibold mb-4">Register</h2>
            <label htmlFor="email" className="block mb-1">Email</label>
            <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                className="w-full p-2 mb-4 border border-gray-300 rounded"
            />
            <label htmlFor="password" className="block mb-1">Password</label>
            <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="w-full p-2 mb-4 border border-gray-300 rounded"
            />
            <label htmlFor="confirmPassword" className="block mb-1">Confirm Password</label>
            <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                required
                className="w-full p-2 mb-4 border border-gray-300 rounded"
            />
            <button 
                type="submit" 
                disabled={loading} 
                className={`w-full ${loading ? 'bg-gray-400' : 'bg-[#FFE5B4]'} text-white font-semibold py-2 rounded hover:bg-[#FFCC99] transition`}
            >
                {loading ? 'Registering...' : 'Register'}
            </button>
        </form>
    );
};

export default Register;