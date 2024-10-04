import React from 'react';
import {Input} from '../ui/input';

const NavSearch = () => {
  return (
    <Input
      type='text'
      placeholder='find a propert...'
      className='dark:bg-muted max-w-xs'
    />
  );
}

export default NavSearch;
