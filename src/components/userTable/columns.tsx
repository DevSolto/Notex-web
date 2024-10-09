import { ColumnDef } from '@tanstack/react-table';
import { Avatar, AvatarImage } from '../ui/avatar';
import { IoBookOutline, IoCopyOutline, IoTrashBinOutline } from 'react-icons/io5';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { CaretSortIcon } from "@radix-ui/react-icons";
import { UpdateUser } from '../updateUser';

export type User = {
  id: string;
  avatarUrl: string;
  name: string;
  email: string;
  cpf: string;
  password: string;
  role: string;
  phone: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'avatarUrl',
    header: '',
    cell: ({ row }) => {
      return (
        <Avatar>
          <AvatarImage className='w-8 h-8 my-auto' src={row.getValue('avatarUrl')} />
        </Avatar>
      );
    },
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      const isSortedAsc = column.getIsSorted() === "asc";
      const isSortedDesc = column.getIsSorted() === "desc";
      return (
        <Button
          variant="ghost"
          className='p-0'
          onClick={() => column.toggleSorting(isSortedAsc || !isSortedDesc)}
        >
          Nome
          <CaretSortIcon className={`ml-2 h-4 w-4 ${isSortedAsc ? 'rotate-180' : ''}`} />
        </Button>
      );
    },
  },
  {
    accessorKey: 'email',
    header: ({ column }) => {
      const isSortedAsc = column.getIsSorted() === "asc";
      return (
        <Button
          variant="ghost"
          className='p-0'
          onClick={() => column.toggleSorting(isSortedAsc)}
        >
          Email
          <CaretSortIcon className={`ml-2 h-4 w-4 ${isSortedAsc ? 'rotate-180' : ''}`} />
        </Button>
      );
    },
  },
  {
    accessorKey: 'phone',
    header: ({ column }) => {
      const isSortedAsc = column.getIsSorted() === "asc";
      return (
        <Button
          variant="ghost"
          className='p-0'
          onClick={() => column.toggleSorting(isSortedAsc)}
        >
          Telefone
          <CaretSortIcon className={`ml-2 h-4 w-4 ${isSortedAsc ? 'rotate-180' : ''}`} />
        </Button>
      );
    },
  },
  {
    accessorKey: 'cpf',
    header: ({ column }) => {
      const isSortedAsc = column.getIsSorted() === "asc";
      return (
        <Button
          variant="ghost"
          className='p-0'
          onClick={() => column.toggleSorting(isSortedAsc)}
        >
          CPF
          <CaretSortIcon className={`ml-2 h-4 w-4 ${isSortedAsc ? 'rotate-180' : ''}`} />
        </Button>
      );
    },
  },
  {
    accessorKey: 'id',
    header: '',
    cell: ({ row }) => {
      const user = row.original;

      const handleCopyName = () => {
        navigator.clipboard.writeText(user.name);
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger className='bg-orange-500 text-white px-3 py-2 rounded-md'>
            Gerenciar
          </DropdownMenuTrigger>
          <DropdownMenuContent className='bg-white flex items-center justify-between'>
            <DropdownMenuGroup className='w-40'>
              <Button variant={'ghost'} className='flex w-full justify-between items-center px-2 py-1.5 font-normal' onClick={handleCopyName}>
                Copiar nome
                <IoCopyOutline />
              </Button>
              <UpdateUser
                id={user.id}
                name={user.name}
                email={user.email}
                cpf={user.cpf}
                phone={user.phone}
                role={user.role}
                avatarUrl={user.avatarUrl}
                isActive={user.isActive}
                setUsers={() => { }}  // Substitua por sua lógica de atualização de usuários
              />
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  }
];
