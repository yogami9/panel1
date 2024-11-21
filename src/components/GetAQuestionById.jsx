import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const GetAQuestionById = () => {
    const { id } = useParams();
    const [question, setQuestion] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                const response = await axios.get(`https://eduacers-backend.onrender.com/questions/${id}`);
                setQuestion(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchQuestion();
    }, [id]);

    if (loading) return <p className="text-gray-500 text-lg">Loading...</p>;
    if (error) return <p className="text-red-500 text-lg">Error: {error}</p>;

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            {question ? (
                <>
                    <h1 className="text-3xl font-bold">{question.title}</h1>
                    <p className="mt-2">{question.description}</p>
                </>
            ) : (
                <p className="text-lg text-gray-500">Question not found</p>
            )}
        </div>
    );
};

export default GetAQuestionById;