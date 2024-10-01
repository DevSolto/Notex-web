import { AddUser } from "@/components/addUser";
import { UserTable } from "@/components/userTable";
import { columns } from "@/components/userTable/columns";

export function Students() {
  return (
    <>
      <header className="flex w-full justify-between mb-5">
        <div>
          <h1 className="text-2xl">
            Estudantes
          </h1>
          <p className="text-neutral-600">
            Lista de estudantes
          </p>
        </div>
        <AddUser role='STUDENT' />
      </header>
      <UserTable role="STUDENT" columns={columns} />
    </>
  )
}