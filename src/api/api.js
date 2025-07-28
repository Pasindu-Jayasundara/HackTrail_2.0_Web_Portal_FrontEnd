import axios from "axios";

const BASE_URL = "http://localhost:5000";

export const fetchTeams = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/teams`);
    return res.data;
  } catch (err) {
    console.error("Error fetching JSON data:", err.message);
    throw err;
  }
};

export const registerTeam = async (team) => {
  try {
    const res = await axios.post(`${BASE_URL}/registration/team`, team);
    return res.data;
  } catch (err) {
    console.error("Error Registering Team", err.message);
    throw err;
  }
};

export const getTeam = async (id) => {
  try {
    const res = await axios.get(`${BASE_URL}/teams/${id}`);
    return res.data;
  } catch (err) {
    console.error("Error fetching JSON data:", err.message);
    throw err;
  }
};

export const registerUser = async (user) => {
  try {
    const res = await axios.post(`${BASE_URL}/registration/user`, user);
    return res.data;
  } catch (err) {
    console.error("Error Registering User", err.message);
    throw err;
  }
};
