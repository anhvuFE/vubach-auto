import axios from 'axios';

// ImgBB API key - Free tier
// Bạn cần đăng ký tại https://imgbb.com/ để lấy API key miễn phí
// Thay thế YOUR_API_KEY bằng key của bạn
const IMGBB_API_KEY = 'YOUR_IMGBB_API_KEY';
const IMGBB_UPLOAD_URL = 'https://api.imgbb.com/1/upload';

export interface UploadResponse {
  success: boolean;
  url?: string;
  error?: string;
}

export const uploadToImgBB = async (file: File): Promise<UploadResponse> => {
  try {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('key', IMGBB_API_KEY);

    const response = await axios.post(IMGBB_UPLOAD_URL, formData);

    if (response.data.success) {
      return {
        success: true,
        url: response.data.data.url,
      };
    }

    return {
      success: false,
      error: 'Upload failed',
    };
  } catch (error) {
    console.error('Image upload error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};

// Alternative: Upload to Cloudinary (also free)
const CLOUDINARY_CLOUD_NAME = 'YOUR_CLOUD_NAME';
const CLOUDINARY_UPLOAD_PRESET = 'YOUR_UPLOAD_PRESET';

export const uploadToCloudinary = async (file: File): Promise<UploadResponse> => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      formData
    );

    return {
      success: true,
      url: response.data.secure_url,
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};

// Convert file to base64 for local storage (fallback option)
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};