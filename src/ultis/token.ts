import { TOKEN_KEY } from "~/config";

export const setToken = (data: string): void => {
  try {
    localStorage.setItem(TOKEN_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Error setting token in localStorage:", error);
  }
};

export const getToken = (): string | null => {
  try {
    const token = localStorage.getItem(TOKEN_KEY);
    return token ? JSON.parse(token) : null;
  } catch (error) {
    console.error("Error getting token from localStorage:", error);
    return null;
  }
};

export const clearToken = (): void => {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch (error) {
    console.error("Error clearing token from localStorage:", error);
  }
};
