import React from 'react';
import Link from 'next/link';
import {LuTent} from "react-icons/lu";
import {Button} from '../ui/button';

const Logo = () => {
  return (
    <Button size='icon' asChild>
      <Link href='/'>
        <LuTent size='32px' />
      </Link>
    </Button>
  );
}

export default Logo;
