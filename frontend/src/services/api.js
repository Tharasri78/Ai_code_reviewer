import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://ai-code-reviewer-backend-656997228650.us-central1.run.app/api';

export const reviewCode = async (code, language) => {
  try {
    const response = await axios.post(`${API_URL}/review`, {
      code,
      language
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.detail || 'An error occurred while analyzing the code.';
  }
};
