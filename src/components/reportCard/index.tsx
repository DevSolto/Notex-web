import { AvatarImage } from "@radix-ui/react-avatar";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

type ReportCardProps = {
  title: string
  description: string
  createdAt: Date
  creatorName: string
  creatorAvatar: string
}

export function ReportCard(props: ReportCardProps) {

  const formattedDate = props.createdAt.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex  items-center gap-3">
          <Avatar>
            <AvatarFallback>
              {props.creatorName[0]}
            </AvatarFallback>
            <AvatarImage src={props.creatorAvatar} />
          </Avatar>
          <div>
            <CardTitle className="text-base">
              {props.title}
            </CardTitle>
            <p className="text-xs">
              criado por <span className="font-semibold">{props.creatorName}</span>
            </p>
          </div>
        </div>
        <div className="bg-orange-500 p-3 rounded-xl text-white">
          <p>{formattedDate}</p>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription>
          {props.description}
        </CardDescription>
      </CardContent>
    </Card>
  )
}