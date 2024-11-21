import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GetAllQuestions from './components/GetAllQuestions';
import GetAQuestionById from './components/GetAQuestionById';
import AddQuestion from './components/AddQuestion';
import UpdateQuestion from './components/UpdateQuestion';
import Register from './components/Register';
import VerifyEmail from './components/VerifyEmail';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
    const [questionsUpdated, setQuestionsUpdated] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false); // New state for authentication

    const handleQuestionAdded = () => {
        setQuestionsUpdated(prev => !prev);
    };

    const handleUpdateSuccess = () => {
        setQuestionsUpdated(prev => !prev);
    };

    const loginSuccess = () => {
        setIsAuthenticated(true); // Set authenticated state to true on successful login
    };

    return (
        <Router>
            <div className="max-w-4xl mx-auto p-4">
                <h1 className="text-3xl font-semibold mb-4">EDUACERS PANEL</h1>

                {/* Routes */}
                <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/verify" element={<VerifyEmail />} />
                    <Route path="/login" element={<Login onLoginSuccess={loginSuccess} />} />
                    
                    {/* Protected Route for main functionality */}
                    <Route 
                        path="/" 
                        element={
                            <ProtectedRoute isAuthenticated={isAuthenticated}>
                                 <AddQuestion onQuestionAdded={handleQuestionAdded} />
                                <GetAllQuestions />
                               
                            </ProtectedRoute>
                        } 
                    />
                    <Route 
                        path="/questions/:id" 
                        element={
                            <ProtectedRoute isAuthenticated={isAuthenticated}>
                                <GetAQuestionById />
                            </ProtectedRoute>
                        } 
                    />
                    <Route 
                        path="/update/:id" 
                        element={
                            <ProtectedRoute isAuthenticated={isAuthenticated}>
                                <UpdateQuestion onUpdateSuccess={handleUpdateSuccess} />
                            </ProtectedRoute>
                        } 
                    />
                </Routes>
            </div>
        </Router>
    );
};

export default App;