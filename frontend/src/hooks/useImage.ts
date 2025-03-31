import { useState, useEffect } from "react";
import {getImage, getOthersImage} from "../services/imageService";
import { useNavigate } from "react-router-dom";


export const useImage = () => {
  const [image, setImage] = useState<string>("");
  const [imageError, setImmageError] = useState<string | null>(null);
  const [othersImage, setOthersImage] = useState<string>("");
  const [othersImageError, setOthersImmageError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [othersLoading, setOthersLoading] = useState(true);
  const navigate = useNavigate();

  async function handleFetchOthersImage(userId: string) {
    try {
      const imageData = await getOthersImage(userId);
      setOthersImage(imageData);
    } catch (err) {
      setOthersImmageError("Error fetching image.");
    } finally {
      setOthersLoading(false);
    }
  }

  useEffect(() => {
    async function fetchImage() {
      try {
        const imageData = await getImage();
        setImage(imageData);
      } catch (err) {
        setImmageError("Error fetching image.");
      } finally {
        setLoading(false);
      }
    }

    fetchImage();

  }, [navigate]);


  return {
    image,
    othersImage,
    imageError,
    othersImageError,
    loading,
    othersLoading,
    handleFetchOthersImage
  };
};
