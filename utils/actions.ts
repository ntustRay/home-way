'use server'

import {profileSchema} from "./schemas";

export const createProfileAction = async (prevState: any, formData: FormData) => {
  try {
    const rawData = Object.fromEntries(formData);
    console.log('rawData', rawData)
    const validatedFields = profileSchema.parse(rawData);
    console.log('validatedFields', validatedFields)
    return {message: 'Profile created successfully'};
  }
  catch (error) {
    console.log(error)
    return {message: 'there was an error'}
  }
}