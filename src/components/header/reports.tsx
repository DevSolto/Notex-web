import { IoNotificationsOutline } from "react-icons/io5";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { useEffect, useState } from "react";
import axios from "axios";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ScrollArea } from "../ui/scroll-area";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { User } from "../userTable/columns";

type ReportsProps = {
  userId: string;
};

export type Report = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  creatorId: string;
  creator: User
};

export function Reports(props: ReportsProps) {
  const [data, setData] = useState<Report[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<{ reports: Report[] }>(`http://localhost:4000/reports/not-viewed/${props.userId}`);
        setData(response.data.reports);
      } catch (error) {
        setError("Ocorreu um erro ao buscar os dados.");
      }
    };

    fetchData();
  }, [props.userId]);

  const handleAccordionChange = async (reportId: string) => {

    if (!reportId) return;

    try {
      const url = `http://localhost:4000/users/${props.userId}/reports/${reportId}`;
      await axios.patch(url, { viewed: true });
    } catch (error) {
      setError("Ocorreu um erro ao marcar como visualizado.");
    }
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Button
          variant={data.length === 0 ? "ghost" : "default"}
          className="border-2 rounded-full py-6 hover:bg-orange-500 hover:text-white transition-all"
        >
          <IoNotificationsOutline className="text-lg" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="bg-white min-w-96">
        <ScrollArea className="h-96">
          {data.length > 0 ? (
            <Accordion
              type="single"
              collapsible
              className="w-full"
              onValueChange={(value) => handleAccordionChange(value)}
            >
              {data.map((report) => {
                const formattedDate = new Date(report.createdAt).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                });
                return (
                  <AccordionItem value={report.id} key={report.id}>
                    <AccordionTrigger>{report.title}</AccordionTrigger>
                    <AccordionContent>
                      <div>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback>{report.creatorId[0]}</AvatarFallback>
                            <AvatarImage src="https://github.com/DevSolto.png" />
                          </Avatar>
                          <p className="flex flex-col">
                            <span className="font-semibold">{report.creator.name}</span>
                            <span className="">
                              {
                                report.creator.role === 'TEACHER' ? ('Professor') : ('Coordenador')
                              }
                            </span>
                          </p>
                        </div>
                        <p >{formattedDate}</p>
                        <div>
                          <p>
                            {
                              report.description
                            }
                          </p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          ) : (
            <p className="p-2 text-sm text-gray-500">Nenhum comunicado não visto.</p>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
