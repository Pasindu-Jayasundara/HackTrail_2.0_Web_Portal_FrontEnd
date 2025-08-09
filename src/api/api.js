import * as XLSX from "xlsx";
import axios from "../utils/axios";

export const registerTeam = async (team) => {
  try {
    const res = await axios.post(`/api/v1/registration/team`, team);
    return res.data;
  } catch (err) {
    console.error("Error Registering Team", err.message);
    throw err;
  }
};

export const registerUser = async (user) => {
  try {
    const res = await axios.post(`/registration/user`, user);
    return res.data;
  } catch (err) {
    console.error("Error Registering User", err.message);
    throw err;
  }
};

export const fetchUsers = async () => {
  try {
    const res = await axios.get("/users");
    return res.data;
  } catch (err) {
    console.error("Error logging out user", err.message);
    throw err;
  }
};

export const userExistsByEmail = async (email) => {
  try {
    const res = await axios.get(`/users/`, {
      params: { email },
    });

    return res.data;
  } catch (err) {
    console.error("Error fetching JSON data:", err.message);
  }
};

export const fetchTeams = async () => {
  try {
    const res = await axios.get(`/teams`);
    return res.data;
  } catch (err) {
    console.error("Error fetching JSON data:", err.message);
    throw err;
  }
};

export const getTeam = async (id) => {
  try {
    const res = await axios.get(`/teams/${id}`);
    return res.data;
  } catch (err) {
    console.error("Error fetching JSON data:", err.message);
    throw err;
  }
};

export const updateTeam = async (id, team) => {
  try {
    const res = await axios.put(`/teams/${id}`, team);
    return res.data;
  } catch (err) {
    console.error("Error Registering User", err.message);
    throw err;
  }
};

export const deleteTeam = async (id) => {
  try {
    const res = await axios.delete(`/teams/${id}`);
    return res.data;
  } catch (err) {
    console.error("Error Registering User", err.message);
    throw err;
  }
};

export const jsonToExcel = async () => {
  try {
    const res = await axios.get(`/users`);
    const jsonData = res.data.map((user) => {
      const { _id, ...rest } = user;
      return rest;
    });

    const worksheet = XLSX.utils.json_to_sheet(jsonData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    XLSX.writeFile(workbook, "teams.xlsx");

    console.log("Excel file downloaded successfully");
  } catch (err) {
    console.error("Error fetching JSON data:", err.message);
    throw err;
  }
};

export const handleLogIn = async (credentials) => {
  try {
    const res = await axios.post("/api/v1/auth/login", credentials);
    return res.data;
  } catch (err) {
    console.error("Error logging user", err.message);
    throw err;
  }
};

export const handleLogOut = async () => {
  try {
    const res = await axios.get("/auth/logout");
    return res.data;
  } catch (err) {
    console.error("Error logging out user", err.message);
    throw err;
  }
};
