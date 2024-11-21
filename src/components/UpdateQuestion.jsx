import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const UpdateQuestion = ({ onUpdateSuccess }) => {
    const { id } = useParams();
    const [question, setQuestion] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                const response = await axios.get(`https://eduacers-backend.onrender.com/questions/${id}`);
                setQuestion(response.data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchQuestion();
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.put(`https://eduacers-backend.onrender.com/questions/${id}`, {
                title: question.title,
                description: question.description
            });
            onUpdateSuccess();
        } catch (error) {
            setError('Error updating question: ' + error.message);
        }
    };

    if (!question) return <p className="text-gray-500 text-lg">Loading...</p>;

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6">
            {error && <p className="text-red-500">{error}</p>}
            <h2 className="text-lg font-semibold mb-4">Update Question</h2>
            <input
                type="text"
                value={question.title}
                onChange={(e) => setQuestion({ ...question, title: e.target.value })}
                required
                className="w-full p-3 mb-4 border-2 border-gray-300 rounded focus:outline-none focus:border-green-500"
            />
            <textarea
                value={question.description}
                onChange={(e) => setQuestion({ ...question, description: e.target.value })}
                required
                className="w-full p-3 mb-4 border-2 border-gray-300 rounded focus:outline-none focus:border-green-500"
            />
            <button 
                type="submit" 
                className="w-full bg-yellow-600 text-white font-semibold py-3 rounded hover:bg-yellow-500 transition duration-200"
            >
                Update Question
            </button>
        </form>
    );
};

export default UpdateQuestion;