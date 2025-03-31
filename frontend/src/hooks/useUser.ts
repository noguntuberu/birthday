import { useState, useEffect } from "react";
import { getUser } from "../services/userService";

export const useUser = () => {
  const [user, setUser] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const userData = await getUser();
        setUser(userData);
      } catch (err) {
        setError("Error fetching user data.");
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  return {
    user,
    error,
    loading,
  };
};
