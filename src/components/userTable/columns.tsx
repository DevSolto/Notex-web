import { ColumnDef } from '@tanstack/react-table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { IoBookOutline, IoCopyOutline, IoPencilOutline, IoTrashBinOutline } from 'react-icons/io5'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'

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
    header: 'Nome'
  },
  { accessorKey: 'email', header: 'E-mail' },
  { accessorKey: 'phone', header: 'Telefone' },
  { accessorKey: 'cpf', header: 'CPF' },
  {
    accessorKey: 'id',
    header: '',
    cell: ({ row }) => {

      return (
        <DropdownMenu>
          <DropdownMenuTrigger className='bg-orange-500 text-white  px-3 py-2 rounded-md'>
            Gerenciar
          </DropdownMenuTrigger>
          <DropdownMenuContent className='bg-white flex items-center justify-between'>
            <DropdownMenuGroup className='w-40 '>
              <DropdownMenuItem className='flex items-center justify-between'>
                Copiar nome
                <IoCopyOutline />
              </DropdownMenuItem>
              <DropdownMenuItem className='flex items-center justify-between'>
                Editar
                <IoPencilOutline />
              </DropdownMenuItem>
              <DropdownMenuItem className='flex items-center justify-between'>
                Adicionar a turma
                <IoBookOutline />
              </DropdownMenuItem>
              <DropdownMenuItem className='flex items-center justify-between'>
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
