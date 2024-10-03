import React from 'react';
import NavSearch from './NavSearch';
import LinksDropdown from './LinksDropdown';
import DarkMode from './DarkMode';
import Logo from './Logo';

const Navbar = () => {
  return (
    <nav className='border-b'>
      <div className='flex sm:flex-row flex-col flex-wrap sm:justify-between sm:items-center gap-4 py-8 container'>
        <Logo />
        <NavSearch />
        <div className='flex items-center gap-4'>
          <LinksDropdown />
          <DarkMode />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
