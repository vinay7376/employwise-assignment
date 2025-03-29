import axios from "axios";

const API_URL = "https://reqres.in/api";

export const getUsers = async (page = 1) => {
    try {
        const response = await axios.get(`${API_URL}/users?page=${page}`);
        return response.data; // { data: [...] }
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error.response?.data?.error || "Failed to fetch users";
    }
};

export const loginUser = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { email, password });
        return response.data; // { token: "xyz" }
    } catch (error) {
        console.error("Login Error:", error);
        throw error.response?.data?.error || "Login failed";
    }
};
