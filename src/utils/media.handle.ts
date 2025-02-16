import { diskStorage, StorageEngine } from 'multer';
import e from 'express';

export const storage: StorageEngine = diskStorage({
  destination: '/tmp',
  filename: (
    req: e.Request,
    file: Express.Multer.File,
    callback: (error: Error | null, filename: string) => void,
  ): void => {
    const extension = file.originalname.split('.').pop();
    const filename = `${Date.now()}.${extension}`;
    callback(null, filename);
  },
});
