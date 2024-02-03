"use client"
import { useState, ChangeEvent } from 'react';
import axios from 'axios';

const EyeImageUploader: React.FC = () => {
  const [eyeImage, setEyeImage] = useState<File | null>(null);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setEyeImage(event.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    try {
      if (!eyeImage) {
        console.error('Please select an eye image');
        return;
      }

      const formData = new FormData();
      formData.append('eye_image', eyeImage);

      const response = await axios.post('/upload_eye_image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Eye Image Uploader</h1>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default EyeImageUploader;
