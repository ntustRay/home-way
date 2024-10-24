import * as z from 'zod';
import {ZodSchema} from 'zod';

export const profileSchema = z.object({
  firstName: z.string().min(2, {
    message: 'First name must be at least 2 characters',
  }),
  lastName: z.string().min(2, {
    message: 'Last name must be at least 2 characters',
  }),
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters',
  }),
});


export const validateWithZodSchema = <T>(schema: ZodSchema<T>, data: unknown): T => {
  const result = schema.safeParse(data);

  if (!result.success) {
    const error = result.error.errors.map((error) => error.message);
    throw new Error(error.join(', '));
  }

  return result.data;
}

const validateFile = () => {
  const maxUploadSize = 1024 * 1024 * 2; // 2MB
  const acceptedFileTypes = ['image/'];
  return z.instanceof(File).refine((file) => {
    return !file || file.size <= maxUploadSize
  }, 'File size must be less than 2MB').refine((file) => {
    return !file || acceptedFileTypes.some((type) => file.type.startsWith(type))
  }, 'File type must be an image');
}

export const imageSchema = z.object({
  image: validateFile()
});