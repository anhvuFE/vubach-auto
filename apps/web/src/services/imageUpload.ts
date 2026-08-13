import axios from 'axios';

/**
 * Image upload helpers for the admin panel. ImgBB / Cloudinary are optional
 * (need env keys); base64 is the always-available fallback for the mock CMS.
 */

const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY ?? '';
const IMGBB_UPLOAD_URL = 'https://api.imgbb.com/1/upload';

const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? '';
const CLOUDINARY_UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET ?? '';

export interface UploadResponse {
  success: boolean;
  url?: string;
  error?: string;
}

export const isImgBBConfigured = (): boolean => Boolean(IMGBB_API_KEY);

export const uploadToImgBB = async (file: File): Promise<UploadResponse> => {
  if (!IMGBB_API_KEY) return { success: false, error: 'ImgBB chưa được cấu hình' };
  try {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('key', IMGBB_API_KEY);
    const response = await axios.post(IMGBB_UPLOAD_URL, formData);
    if (response.data?.success) {
      return { success: true, url: response.data.data.url };
    }
    return { success: false, error: 'Upload thất bại' };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Lỗi không xác định' };
  }
};

export const uploadToCloudinary = async (file: File): Promise<UploadResponse> => {
  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
    return { success: false, error: 'Cloudinary chưa được cấu hình' };
  }
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      formData,
    );
    return { success: true, url: response.data.secure_url };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Lỗi không xác định' };
  }
};

/** Convert a file to a base64 data URL (fallback when no image host configured). */
export const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

/**
 * Upload a file: try ImgBB if configured, otherwise fall back to base64 so the
 * admin panel always works out of the box.
 */
export const uploadImage = async (file: File): Promise<UploadResponse> => {
  if (isImgBBConfigured()) {
    const result = await uploadToImgBB(file);
    if (result.success) return result;
  }
  try {
    const url = await fileToBase64(file);
    return { success: true, url };
  } catch {
    return { success: false, error: 'Không thể xử lý ảnh' };
  }
};
