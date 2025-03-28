export interface ProfileData {
  username?: string;
  bio?: string;
  dob?: string;
  hobbies?: string;
  location?: string;
  email?: string;
  posts?: number;
  followers?: number;
  following?: number;
  friends?: string[];
  image?: string | null;

  }
  
  export interface ProfileFormProps {
    formData: ProfileData;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent) => void;
    setIsEditing: (isEditing: boolean) => void;
  }
  
  export interface ProfileViewProps {
    profileData: ProfileData;
    setIsEditing: (isEditing: boolean) => void;
  }