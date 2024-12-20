import React from 'react';
import FormContainer from '@/components/form/FormContainer';
import {updateProfileAction, fetchProfile, updateProfileImageAction} from '@/utils/actions';
import FormInput from '@/components/form/FormInput';
import {SubmitButton} from '@/components/form/Buttons';
import ImageInputContainer from '@/components/form/ImageInputContainer';

const ProfilePage = async () => {
  const profile = await fetchProfile();
  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <section>
      <h1 className='text-2x; font-semibold mb-8 capitalize'>user profile</h1>
      <div className='border p-8 rounded-md'>
        <ImageInputContainer
          image={profile.profileImage}
          name={profile.firstName}
          action={updateProfileImageAction}
          text='Update Profile Image'
        />
        <FormContainer action={updateProfileAction}>
          <div className='grid md:grid-cols-2 gap-4 mt-4'>
            <FormInput type='text' label='First Name' name='firstName' defaultValue={profile.firstName} />
            <FormInput type='text' label='Last Name' name='lastName' defaultValue={profile.lastName} />
            <FormInput type='text' label='Username' name='username' defaultValue={profile.username} />
          </div>
          <SubmitButton text='update profile' />
        </FormContainer>
      </div>
    </section>
  );
}

export default ProfilePage;
