import axios from "axios";

const API_URL = "https://reqres.in/api";

export const loginUser = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { email, password });
        return response.data; // { token: "generated_token" }
    } catch (error) {
        throw error.response?.data?.error || "Login failed";
    }
};
