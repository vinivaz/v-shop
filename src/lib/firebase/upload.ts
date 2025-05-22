import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '@/services/firebase';
import { v4 } from 'uuid';

export const uploadFile = async (file: File, path: string): Promise<string> => {
  const fileRef = ref(storage, `${path}/${file.name}_${v4()}`);
  await uploadBytes(fileRef, file);
  return getDownloadURL(fileRef);
};

export const uploadMultipleImages = async (
  images: { file: File }[],
  path: string
): Promise<string[]> => {
  const uploads = images.map((img, index) =>
    uploadFile(img.file, path)
  );

  return Promise.all(uploads);
};