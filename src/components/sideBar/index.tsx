import { Home, LucideBookCopy, LucideBookOpen, LucideGraduationCap, LucideLogOut, LucideMedal, LucideSettings } from 'lucide-react';

import logo from '../../assets/logo.png';
import { Separator } from '../ui/separator';
import { Button } from '../ui/button';

type MenuItem = {
  label: string;
  icon: JSX.Element;
  link: string;
};

const menuItems: MenuItem[] = [
  {
    label: "Visão geral",
    link: "/",
    icon: <Home />
  },
  {
    label: "Estudantes",
    link: "/estudantes",
    icon: <LucideGraduationCap />
  },
  {
    label: "Professores",
    link: "/professores",
    icon: <LucideMedal />
  },
  {
    label: "Turmas",
    link: "/turmas",
    icon: <LucideBookOpen />
  },
  {
    label: "Disciplinas",
    link: "/disciplinas",
    icon: <LucideBookCopy />
  },
];

export function SideBar() {
  return (
    <aside className='w-64 p-10 flex flex-col items-center justify-between gap-5 border-r-2 min-h-screen text-neutral-700'>
      <div className='flex flex-col items-center gap-5'>
        <img src={logo} alt="Logo do Senac" className='w-3/4' />
        <nav className='flex flex-col gap-3 text- '>
          {menuItems.map((item) => (
            <a className="flex gap-2 items-center  px-2 py-3 hover:bg-orange-500 hover:text-white rounded-lg transition-all hover:shadow-lg" key={item.link} href={item.link}>
              <span >
                {item.icon}
              </span>
              {item.label}
            </a>
          ))}
        </nav>
      </div>
      <div className='space-y-5'>
        <Separator orientation='horizontal' />
        <Button variant={'ghost'} className='flex gap-2'>
          <LucideSettings />
          Configurações
        </Button>
        <Button variant={'ghost'} className='flex gap-2'>
          <LucideLogOut />
          Sair
        </Button>
      </div>
    </aside>
  );
};
