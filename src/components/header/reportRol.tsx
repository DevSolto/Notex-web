import { AccordionContent } from "@radix-ui/react-Accordion";
import { Report } from "./reports";
import { useEffect, useState } from "react";
import { User } from "../userTable/columns";
import axios from "axios";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { AccordionItem, AccordionTrigger } from "../ui/accordion";

type ReportRolProps = {
  report: Report;
};

export function ReportRol(props: ReportRolProps) {
  const [creator, setCreator] = useState<User | null>(null); // Use null for better typing
  const report = props.report;
  const formattedDate = new Date(report.createdAt).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<User>(
          `https://q01b4kvh-4000.brs.devtunnels.ms/users/${report.creatorId}`
        );
        setCreator(response.data);

      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [report.creatorId]);
  console.log(creator);

  return (
    <AccordionItem value={report.id}>
      <AccordionTrigger>{props.report.title}</AccordionTrigger>
      <AccordionContent>
        <div>
          <p>{report.title}</p>
          <p>{formattedDate}</p>
        </div>
        <div>
          <p>Remetente:</p>
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback>{creator?.name[0]}</AvatarFallback>
              <AvatarImage src={creator?.avatarUrl || "https://github.com/DevSolto.png"} />
            </Avatar>
            <p className="flex flex-col">
              <span className="font-semibold">{creator?.name}</span>
              <span className="text-sm text-neutral-600">{creator?.role}</span>
            </p>
          </div>
          <p>
            {report.description}
          </p>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
