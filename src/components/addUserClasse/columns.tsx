import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Checkbox } from "../ui/checkbox";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";

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
    id: "select",
    header: ({ table }) => (
      <div className="w-full items-center justify-center flex">
        {/* <Checkbox
          checked={
            table.getIsAllRowsSelected() ||
            (table.getIsSomeRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)} // Altere para `toggleAllRowsSelected` para garantir a seleção de todas as linhas
          aria-label="Select all"
        /> */}
      </div>
    ),
    cell: ({ row }) => (
      <div className="w-full items-center justify-center flex">
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
    accessorKey: "avatarUrl",
    header: "",
    cell: ({ row }) => {
      return (
        <Avatar>
          <AvatarImage
            className="w-8 h-8 my-auto"
            src={row.getValue("avatarUrl")}
          />
        </Avatar>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      const isSortedAsc = column.getIsSorted() === "asc";
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(isSortedAsc)}
        >
          Nome
          <CaretSortIcon className={`ml-2 h-4 w-4 ${isSortedAsc ? 'rotate-180' : ''}`} />
        </Button>
      )
    },
  },
  { accessorKey: "cpf", header:({ column }) => {
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
  }, },
];
