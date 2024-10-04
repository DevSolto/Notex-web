import { ColumnDef } from '@tanstack/react-table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { IoBookOutline, IoCopyOutline, IoPencilOutline, IoTrashBinOutline } from 'react-icons/io5'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Button } from '../ui/button'

import {
  CaretSortIcon,
} from "@radix-ui/react-icons"

export type User = {
  id: string
  avatarUrl: string
  name: string
  email: string
  cpf: string
  password: string
  role: string
  phone: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'avatarUrl',
    header: '',
    cell: ({ row }) => {
      return (
        <Avatar>
          <AvatarImage className='w-8 h-8 my-auto' src={row.getValue('avatarUrl')} />
        </Avatar>
      )
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
          onClick={() => column.toggleSorting(isSortedAsc || !isSortedDesc)}
        >
          Nome
          <CaretSortIcon className={`ml-2 h-4 w-4 ${isSortedAsc ? 'rotate-180' : ''}`} />
        </Button>
      )
    },
  },
  {
    accessorKey: 'email',
    header: ({ column }) => {
      const isSortedAsc = column.getIsSorted() === "asc";
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(isSortedAsc)}
        >
          Email
          <CaretSortIcon className={`ml-2 h-4 w-4 ${isSortedAsc ? 'rotate-180' : ''}`} />
        </Button>
      )
    },
  },
  {
    accessorKey: 'phone',
    header: ({ column }) => {
      const isSortedAsc = column.getIsSorted() === "asc";
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(isSortedAsc)}
        >
          Telefone
          <CaretSortIcon className={`ml-2 h-4 w-4 ${isSortedAsc ? 'rotate-180' : ''}`} />
        </Button>
      )
    },
  },
  {
    accessorKey: 'cpf',
    header: ({ column }) => {
      const isSortedAsc = column.getIsSorted() === "asc";
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(isSortedAsc)}
        >
          CPF
          <CaretSortIcon className={`ml-2 h-4 w-4 ${isSortedAsc ? 'rotate-180' : ''}`} />
        </Button>
      )
    },
  },
  {
    accessorKey: 'id',
    header: '',
    cell: ({ row }) => {
      const user = row.original; // O dado original do usuário completo

      const handleCopyName = () => {
        navigator.clipboard.writeText(user.name);
        alert("Nome copiado!");
      };

      const handleEdit = () => {
        console.log(`Editando usuário: ${user.id}`);
      };

      const handleAddToClass = () => {
        console.log(`Adicionando usuário ${user.id} à turma`);
      };

      const handleDelete = () => {
        console.log(`Excluindo usuário: ${user.id}`);
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger className='bg-orange-500 text-white  px-3 py-2 rounded-md'>
            Gerenciar
          </DropdownMenuTrigger>
          <DropdownMenuContent className='bg-white flex items-center justify-between'>
            <DropdownMenuGroup className='w-40'>
              <DropdownMenuItem className='flex items-center justify-between' onClick={handleCopyName}>
                Copiar nome
                <IoCopyOutline />
              </DropdownMenuItem>
              <DropdownMenuItem className='flex items-center justify-between' onClick={handleEdit}>
                Editar
                <IoPencilOutline />
              </DropdownMenuItem>
              <DropdownMenuItem className='flex items-center justify-between' onClick={handleAddToClass}>
                Adicionar a turma
                <IoBookOutline />
              </DropdownMenuItem>
              <DropdownMenuItem className='flex items-center justify-between' onClick={handleDelete}>
                Excluir
                <IoTrashBinOutline />
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  }
]
