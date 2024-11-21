import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const VerifyEmail = () => {
    const [email, setEmail] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        setError(null);
        setLoading(true);
        try {
            await axios.post('https://eduacers-backend.onrender.com/auth/verify-email', { email, verificationCode });
            setLoading(false);
            navigate('/login');
        } catch (error) {
            setLoading(false);
            setError('Verification failed: ' + (error.response ? error.response.data : error.message));
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 mb-4">
            {error && <p className="text-red-500">{error}</p>}
            <h2 className="text-lg font-semibold mb-4">Verify Email</h2>
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
            <label htmlFor="verificationCode" className="block mb-1">Verification Code</label>
            <input
                id="verificationCode"
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="Verification Code"
                required
                className="w-full p-2 mb-4 border border-gray-300 rounded"
            />
            <button 
                type="submit" 
                disabled={loading} 
                className={`w-full ${loading ? 'bg-gray-400' : 'bg-[#FFE5B4]'} text-white font-semibold py-2 rounded hover:bg-[#FFCC99] transition`}
            >
                {loading ? 'Verifying...' : 'Verify Email'}
            </button>
        </form>
    );
};

export default VerifyEmail;