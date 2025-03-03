/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaSearch, FaMoon, FaSun } from "react-icons/fa";
import { motion } from "framer-motion";

const MovieSearch = () => {
    const [query, setQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [darkMode, setDarkMode] = useState(false);

    const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
    const DEFAULT_QUERY = "Marvel"; // Trending movies

    const fetchMovies = async (searchQuery) => {
        setLoading(true);
        setError("");
        setMovies([]);

        try {
            const response = await axios.get(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${searchQuery}`);
            if (response.data.Response === "True") {
                setMovies(response.data.Search);
            } else {
                setError("No movies found! Try another search.");
            }
        } catch (err) {
            setError("Failed to fetch movies. Please try again later.");
        }

        setLoading(false);
    };

    useEffect(() => {
        fetchMovies(DEFAULT_QUERY);
    }, []);

    const searchMovies = (e) => {
        e.preventDefault();
        if (!query.trim()) return;
        fetchMovies(query);
    };

    return (
        <div className={`min-h-screen transition-colors duration-500 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
            <div className="container mx-auto p-6">
                {/* Header Section */}
                <div className="flex justify-between items-center mb-6">
                    <motion.h1
                        initial={{ opacity: 0, y: -30, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut", type: "spring", stiffness: 100 }}
                        className="text-4xl font-extrabold tracking-wide bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text animate-pulse"
                    >
                        🎬 Movie Search App
                    </motion.h1>

                    {/* Dark Mode Toggle */}
                    <motion.button
                        whileTap={{ scale: 0.85 }}
                        whileHover={{ scale: 1.1, boxShadow: "0px 0px 12px rgba(255, 255, 255, 0.5)" }}
                        onClick={() => setDarkMode(!darkMode)}
                        className="p-3 rounded-full transition-all duration-300 bg-gray-300 dark:bg-gray-700 shadow-lg hover:shadow-2xl focus:outline-none"
                    >
                        {darkMode ? (
                            <FaSun className="text-yellow-400 text-2xl animate-spin-slow" />
                        ) : (
                            <FaMoon className="text-gray-700 text-2xl animate-pulse" />
                        )}
                    </motion.button>
                </div>

                {/* Search Bar */}
                <motion.form
                    onSubmit={searchMovies}
                    className="flex items-center bg-white dark:bg-gray-800 shadow-md rounded-lg p-3"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <input
                        type="text"
                        placeholder="Search movies..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="flex-1 p-2 bg-transparent outline-none text-gray-800 dark:text-white text-lg font-semibold focus:ring-2 focus:ring-blue-500 rounded-md"
                    />
                    <button type="submit" className="p-2 text-gray-600 dark:text-white">
                        <FaSearch className="text-2xl hover:text-blue-500 transition-colors duration-300" />
                    </button>
                </motion.form>

                {/* Loading Animation */}
                {loading && (
                    <motion.div
                        className="flex justify-center items-center mt-6"
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1 }}
                    >
                        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
                    </motion.div>
                )}

                {/* Error Message */}
                {error && <motion.p className="text-center text-red-500 mt-4">{error}</motion.p>}

                {/* Movie Grid */}
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    {movies.map((movie, index) => (
                        <motion.div
                            key={movie.imdbID}
                            className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden cursor-pointer"
                            whileHover={{ scale: 1.05 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                            {/* Movie Poster */}
                            <img
                                src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/150"}
                                alt={movie.Title}
                                className="w-full h-64 object-cover rounded-t-lg"
                            />

                            {/* Movie Details */}
                            <div className="p-4 text-center">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-200">
                                    {movie.Title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">📅 {movie.Year}</p>
                            </div>

                            {/* Overlay Animation */}
                            <motion.div
                                className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-all duration-300"
                            >
                                <p className="text-white text-lg font-bold">🎥 View Details</p>
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default MovieSearch;
