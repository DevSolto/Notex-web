import { AvatarImage } from "@radix-ui/react-avatar";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { IoEye } from "react-icons/io5";

export type UserReport = {
  userId: string;
  reportId: string;
  viewed: boolean;
  createdAt: string;
  updatedAt: string;
};

type ReportCardProps = {
  title: string;
  description: string;
  createdAt: Date;
  creatorName: string;
  creatorAvatar: string;
  usersReport: UserReport[]; // usersReport agora é opcional
};

export function ReportCard(props: ReportCardProps) {

  // Verifica se usersReport está definido antes de usar o filter
  const viewsCount = props.usersReport ? props.usersReport.filter((userReport) => userReport.viewed).length : 0;

  const formattedDate = props.createdAt.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex  items-center gap-3">
          <Avatar>
            <AvatarFallback>{props.creatorName[0]}</AvatarFallback>
            <AvatarImage src={props.creatorAvatar} />
          </Avatar>
          <div>
            <CardTitle className="text-base">{props.title}</CardTitle>
            <p className="text-xs">
              criado por <span className="font-semibold">{props.creatorName}</span>
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center text-sm">
            <IoEye className="mr-1 text-orange-500" />
            <span>{viewsCount}/{props.usersReport.length}</span>
          </div>
          <div className="bg-orange-500 p-2 rounded-xl text-white">
            <p>{formattedDate}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription>{props.description}</CardDescription>
      </CardContent>
    </Card>
  );
}
