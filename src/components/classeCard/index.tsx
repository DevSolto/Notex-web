import { IoDocumentLockOutline, IoDocumentTextOutline, IoPeopleOutline, IoPersonAddOutline, IoTrashBinOutline } from "react-icons/io5"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuShortcut, ContextMenuTrigger } from "../ui/context-menu"
import { UpdateClasse } from "../updateClasse"
import { DeleteClasse } from "../deleteClasse"
import { ClassData } from "@/pages/classes"

type ClasseCardProps = {
  id: string
  title: string
  code: string
  year: string
  numberOfStudents: number
  setClasses: React.Dispatch<React.SetStateAction<ClassData[]>>;
}
export function ClasseCard(props: ClasseCardProps) {

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Card className="shadow">
          <CardHeader className="flex-row justify-between items-center">
            <CardTitle className="text-neutral-700 font-medium flex gap-3">
              {props.title}
              <span className="font-normal">({props.year})</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="flex items-center gap-2">
              <IoDocumentLockOutline className="text-2xl" /> ID: {props.code}
            </p>
            <div className="flex w-full items-center justify-between">
              <p className="flex items-center gap-2">
                <IoPeopleOutline className="text-2xl" /> Estudantes: {props.numberOfStudents}
              </p>

              <Button>
                Horário
              </Button>
            </div>
          </CardContent>
        </Card>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-56">
        <UpdateClasse
          setClasses={props.setClasses}
          id={props.id}
          title={props.title}
          code={props.code}
          year={props.year}
        />
        <ContextMenuItem >
          Adicionar aluno
          <ContextMenuShortcut>
            <IoPersonAddOutline className="text-lg" />
          </ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem >
          Adicionar Horário
          <ContextMenuShortcut>
            <IoDocumentTextOutline className="text-lg" />
          </ContextMenuShortcut>
        </ContextMenuItem>
        <DeleteClasse setClasses={props.setClasses} id={props.id} />
      </ContextMenuContent>
    </ContextMenu>
  )
}