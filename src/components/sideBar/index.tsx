import logo from '../../assets/logo.png';
import { Separator } from '../ui/separator';
import { Button } from '../ui/button';
import { IoBookOutline, IoCalendarNumberOutline, IoCalendarOutline, IoExitOutline, IoHomeOutline, IoLibraryOutline, IoMailUnreadOutline, IoRibbonOutline, IoSchoolOutline, IoSettingsOutline } from 'react-icons/io5';

type MenuItem = {
  label: string;
  icon: JSX.Element;
  link: string;
};

const menuItems: MenuItem[] = [
  {
    label: "Visão geral",
    link: "/",
    icon: <IoHomeOutline className='text-xl' />
  },
  {
    label: "Estudantes",
    link: "/estudantes",
    icon: <IoSchoolOutline className='text-xl' />
  },
  {
    label: "Professores",
    link: "/professores",
    icon: <IoRibbonOutline className='text-xl' />
  },
  {
    label: "Turmas",
    link: "/turmas",
    icon: <IoBookOutline className='text-xl' />
  },
  {
    label: "Disciplinas",
    link: "/disciplinas",
    icon: <IoLibraryOutline className='text-xl' />
  },
  {
    label: "Calendário",
    link: "/calendario",
    icon: <IoCalendarNumberOutline className='text-xl' />
  },
  {
    label: "Comunicado",
    link: "/comunicados",
    icon: <IoMailUnreadOutline className='text-xl' />
  },
  {
    label: "Horário",
    link: "/horario",
    icon: <IoCalendarOutline className='text-xl' />
  },
];

export function SideBar() {
  return (
    <aside className='sticky top-0 right-0 w-64 p-10 flex flex-col items-center justify-between gap-5 border-r-2 min-h-screen max-h-screen text-neutral-700'>
      <div className='flex flex-col items-center gap-5'>
        <img src={logo} alt="Logo do Senac" className='w-3/4' />
        <nav className='flex flex-col gap-3 text- '>
          {menuItems.map((item) => (
            <a className="flex gap-2 items-center  px-2 py-3 hover:bg-primary hover:text-white rounded-lg transition-all hover:shadow-lg" key={item.link} href={item.link}>
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
          <IoSettingsOutline className='text-xl' />
          Configurações
        </Button>
        <Button variant={'ghost'} className='flex gap-2'>
          <IoExitOutline className='text-xl' />
          Sair
        </Button>
      </div>
    </aside>
  );
};
