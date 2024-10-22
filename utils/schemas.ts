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