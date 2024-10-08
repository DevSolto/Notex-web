import { AddSubject } from "@/components/addSubject";
import { SubjectTable } from "@/components/subjectTable";
import { columns } from "@/components/subjectTable/columns";

export function Subjects() {
  return (
    <>
      <header className="flex w-full justify-between mb-5">
        <div>
          <h1 className="text-2xl">
            Disciplinas
          </h1>
          <p className="text-neutral-600">
            Lista de disciplinas
          </p>
        </div>
        <AddSubject />
      </header>
      <SubjectTable columns={columns}/>
    </>
  )
}