import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../states/hooks.tsx';
import { loginUser } from '../states/reducers/userSlice';
import { toast } from 'react-toastify';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const { status, error, token } = useAppSelector(state => state.user);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };
  useEffect(() => {
    if (status === 'succeeded') {
      toast.success('Login successful');
      navigate('/');
    }
  }, [status, navigate]);

  return (
    <div className="flex h-screen justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-xl font-semibold mb-4">Login</h2>
        <form onSubmit={handleLogin}>
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
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Login</button>
          {status === 'loading' && <p>Loading...</p>}
          {status === 'failed' && <p className="text-red-500">{error}</p>}
          <p className="mt-4 text-gray-600">
            Not registered? <Link to="/signup" className="text-blue-500">Register now</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
