import { ColumnDef } from '@tanstack/react-table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Checkbox } from '../ui/checkbox'

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
    id: "select",
    header: ({ table }) => (
      <div className='w-full items-center justify-center flex'>
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className='w-full items-center justify-center flex'>
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
  
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
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
    header: 'Nome',
    enableSorting: true
  },
  { accessorKey: 'cpf', header: 'CPF' },
]
