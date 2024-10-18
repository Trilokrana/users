
import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [data, setData] = useState({
        email: '',
        password: '',
    })
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        const auth = localStorage.getItem('user')
        if (auth) {
            navigate('/')
        }
    }, [navigate])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = data; 
        try {
            const response = await axios.post("https://reqres.in/api/login", {
                email,
                password,
            });

            if (response.status === 200) {
                alert('User Logged In Successfully!!')
                localStorage.setItem("token", response.data.token);
                setData({ email: '', password: '' });
                navigate('/users');
            } else {
                console.log('Login Failed');
                setError("Invalid email or password");
            }
        } catch (error) {
            console.error("Internal Server Error:", error);
            setError("Invalid email or password");
        }
    };

    return (
        <div className="h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full bg-white rounded-lg shadow-md p-4">
                <h2 className="text-3xl font-bold mb-4 text-center">Log In</h2>
                {error && <p className="error text-red-500 text-center">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <label className="block mb-2" htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={data.email}
                        className="w-full p-3 text-md text-gray-700 rounded-lg mb-2 border-2 border-gray-300"
                        placeholder="johndoe@example.com"
                        onChange={handleChange}
                        required
                    />
                    <label className="block mb-2" htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={data.password}
                        className="w-full p-3 text-md text-gray-700 rounded-lg border-2 border-gray-300"
                        placeholder="********"
                        onChange={handleChange}
                        required
                    />
                    <button
                        type="submit"
                        className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-lg w-full mt-8 mb-4"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
