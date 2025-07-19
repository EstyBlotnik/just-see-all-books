import axios from "axios";

const api = `${import.meta.env.VITE_API_BASE_URL}/category`;

export const get_all_categories = async () => {
  try {
    const response = await axios.get(api);
    return response.data;
  } catch (error) {
    throw new Error("לא מצאנו מידע על קטגוריות במערכת");
  }
};
