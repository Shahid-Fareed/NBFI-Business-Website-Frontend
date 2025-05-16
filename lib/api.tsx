import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URI;

// Fetch footer settings
export const getFooterData = async () => {
  try {
    const res = await axios.get(`${API_URL}/frontsettings`);
    return res.data[0] || {};
  } catch (error) {
    console.error("Error fetching footer data:", error);
    return {};
  }
};

// Fetch header menu
export const getHeaderMenu = async () => {
  try {
    const res = await axios.get(`${API_URL}/frontheadermenu`);
    return res.data || [];
  } catch (error) {
    console.error("Error fetching header menu:", error);
    return [];
  }
};

// Fetch other API data
export const getOtherData = async () => {
  try {
    const res = await axios.get(`${API_URL}/other-endpoint`);
    return res.data || [];
  } catch (error) {
    console.error("Error fetching other data:", error);
    return [];
  }
};
