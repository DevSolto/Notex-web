import { AddUser } from "@/components/addUser";
import { UserTable } from "@/components/userTable";
import { columns } from "@/components/userTable/columns";

export function Admins() {
  return (
    <>
      <header className="flex w-full justify-between mb-5">
        <div>
          <h1 className="text-2xl">
            Coordenadores
          </h1>
          <p className="text-neutral-600">
            Lista de coordenadores
          </p>
        </div>
        <AddUser role='ADMIN' />
      </header>
      <UserTable role="ADMIN" columns={columns} />
    </>
  )
}