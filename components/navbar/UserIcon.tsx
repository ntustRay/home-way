import React from 'react';
import {LuUser2} from 'react-icons/lu';
import {fetchProfileImage} from '@/utils/actions';
import Image from 'next/image';

const UserIcon = async () => {
  const profileImage = await fetchProfileImage();
  if (profileImage) {
    return <Image src={profileImage} alt="Profile Image" className="rounded-full" width={24} height={24} />
  }
  return (
    <LuUser2 className="bg-primary rounded-full w-6 h-6 text-white" />
  );
}

export default UserIcon;
