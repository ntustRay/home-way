import React from 'react';



const createProfileAction = async (formData: FormData) => {
  'use server'
  const firstName = formData.get('firstName') as string;
  console.log(firstName);
}

const CreateProfilePage = () => {
  return (
    <section>
      <h1 className='mb-8 font-semibold text-2xl capitalize'>
        new user
      </h1>
      <div className='p-8 border max-w-lg roundered-md'>
        <form action={createProfileAction}>

        </form>
      </div>
    </section>
  );
}

export default CreateProfilePage;
