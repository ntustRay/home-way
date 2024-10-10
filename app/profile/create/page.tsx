import React from 'react';
import FormContainer from '@/components/form/FormContainer';
import FormInput from '@/components/form/FormInput';
import {SubmitButton} from '@/components/form/Buttons';


const createProfileAction = async (prevState: any, formData: FormData) => {
  'use server'
  const firstName = formData.get('firstName') as string;
  console.log(firstName);
  return {message: 'Profile created successfully'};
}

const CreateProfilePage = () => {
  return (
    <section>
      <h1 className='mb-8 font-semibold text-2xl capitalize'>
        new user
      </h1>
      <div className='p-8 border max-w-lg roundered-md'>
        <FormContainer action={createProfileAction}>
          <div className='gap-4 grid md:grid-cols-2 mt-4' >
            <FormInput name='firstName' type='text' label='First Name' />
            <FormInput name='lastName' type='text' label='Last Name' />
            <FormInput name='email' type='email' label='Email' />
          </div>
          <SubmitButton text='Create Profile' className='mt-8' />
        </FormContainer>
      </div>
    </section>
  );
}

export default CreateProfilePage;
