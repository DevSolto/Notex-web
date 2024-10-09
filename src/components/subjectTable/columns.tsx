import { ColumnDef } from '@tanstack/react-table';
import { IoBookOutline, IoTrashBinOutline } from 'react-icons/io5';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { CaretSortIcon } from "@radix-ui/react-icons";

export type Subject = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  _count: {
    SubjectClass: number; // Contagem de turmas associadas
  };
};

export const columns: ColumnDef<Subject>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      const isSortedAsc = column.getIsSorted() === 'asc';
      const isSortedDesc = column.getIsSorted() === 'desc';
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(isSortedAsc || !isSortedDesc)}
        >
          Nome
          <CaretSortIcon className={` h-4 w-4 ${isSortedAsc ? 'rotate-180' : ''}`} />
        </Button>
      );
    },
    cell: ({ row }) => {
      console.log(row);

      return (
        <div className='w-full flex items-center p-5'>
          {
            row.original.name
          }
        </div>
      )
    }
  },
  {
    accessorKey: '_count.SubjectClass',
    header: ({ column }) => {
      const isSortedAsc = column.getIsSorted() === 'asc';
      const isSortedDesc = column.getIsSorted() === 'desc';
      return (
        <div className='w-full flex items-center justify-center'>

          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(isSortedAsc || !isSortedDesc)}
          >
            Quantidade de turmas
            <CaretSortIcon className={`ml-2 h-4 w-4 ${isSortedAsc ? 'rotate-180' : ''}`} />
          </Button>
        </div>
      )
    },
    cell: ({ row }) => {
      console.log(row);

      return (
        <div className='w-full flex items-center justify-center'>
          {
            row.original     ? row.original._count.SubjectClass : '0'
          }
        </div>
      )
    }
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => {
      const isSortedAsc = column.getIsSorted() === 'asc';
      const isSortedDesc = column.getIsSorted() === 'desc';
      return (
        <div className='w-full flex items-center justify-center'>

          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(isSortedAsc || !isSortedDesc)}
          >
            Data de criação
            <CaretSortIcon className={`ml-2 h-4 w-4 ${isSortedAsc ? 'rotate-180' : ''}`} />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const formattedDate = new Date(row.original.createdAt).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
      return (
        <div className='w-full flex items-center justify-center'>
          {
            formattedDate
          }
        </div>
      )
    }
  },
  {
    accessorKey: 'id',
    header: '',
    cell: ({ row }) => {
      const subject = row.original;

      const handleAddToClass = () => {
        console.log(`Adicionando disciplina ${subject.id} à turma`);
      };

      const handleDelete = () => {
        console.log(`Excluindo disciplina: ${subject.id}`);
      };

      return (
        <div className='w-full flex items-center justify-center'>
          <DropdownMenu>
            <DropdownMenuTrigger className="bg-orange-500 text-white px-3 py-2 rounded-md">
              Gerenciar
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white flex items-center justify-between">
              <DropdownMenuGroup className="w-40">
                <DropdownMenuItem className="flex items-center justify-between" onClick={handleAddToClass}>
                  Adicionar a turma
                  <IoBookOutline />
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center justify-between" onClick={handleDelete}>
                  Excluir
                  <IoTrashBinOutline />
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
