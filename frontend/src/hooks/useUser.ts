import { useState, useEffect } from "react";
import { getUser } from "../services/userService";
import { useNavigate } from "react-router-dom";

export const useUser = () => {
  const [user, setUser] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
    const interval = setInterval(fetchUser, 100000);

    return () => clearInterval(interval);
  }, [navigate]);

  return {
    user,
    error,
    loading,
  };
};
