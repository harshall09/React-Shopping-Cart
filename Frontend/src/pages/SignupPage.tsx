import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../states/hooks.tsx';
import { registerUser } from '../states/reducers/userSlice';

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const dispatch = useAppDispatch();
  const { status, error, token } = useAppSelector(state => state.user);
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(registerUser({ username, email, password }));
  };

  useEffect(() => {
    if (status === 'succeeded') {
      setSuccessMessage('Registration successful');
      setTimeout(() => {
        setSuccessMessage('');
        navigate('/loginpage');
      }, 3000); // Redirect to login page after 3 seconds
    }
  }, [status, history]);

  return (
    <div className="flex h-screen justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-xl font-semibold mb-4">Register</h2>
        {successMessage && <p className="text-green-500">{successMessage}</p>}
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-600">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Register</button>
          {status === 'loading' && <p>Loading...</p>}
          {status === 'failed' && <p className="text-red-500">{error}</p>}
          <p className="mt-4 text-gray-600">
            Already registered? <Link to="/loginpage" className="text-blue-500">Login now</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
