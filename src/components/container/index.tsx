import React, { FC } from 'react';
import { SideBar } from '../sideBar';
import { Header } from '../header';

interface ContainerProps {
  children: React.ReactNode;
}

export const Container: FC<ContainerProps> = ({ children }) => {
  return (
    <div className='flex w-screen'>
      <SideBar />
      <main className='flex flex-col flex-1'>
        <Header />
        <div className='w-full flex-1 p-5'>
          {children}
        </div>
      </main>
    </div>
  );
};
