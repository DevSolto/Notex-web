import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { IoArrowBackOutline, IoArrowForwardOutline } from "react-icons/io5";

export type HttpParams = {
  page: string;
  limit: string;
  orderBy: string;
  order: string;
};

type ReportsFilterProps = {
  httpParams: HttpParams;
  setHttpParams: React.Dispatch<React.SetStateAction<HttpParams>>;
  totalPages: number;
};

export function ReportsFilter(props: ReportsFilterProps) {

  const handlePageChange = (direction: 'next' | 'previous') => {
    const currentPage = parseInt(props.httpParams.page, 10) || 1;

    const newPage = direction === 'next' ? currentPage + 1 : Math.max(1, currentPage - 1);

    props.setHttpParams({
      ...props.httpParams,
      page: String(newPage),
    });
  };


  return (
    <div className="w-full flex justify-between mb-5">
      <div className="flex gap-3">
        <Input type="search" placeholder="Procurar..." className="w-72" />
        <Select
          onValueChange={(value) => {
            const [orderBy, order] = value.split(":");
            props.setHttpParams({
              ...props.httpParams,
              orderBy,
              order,
            });
          }}
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Ordenar por..." />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="title:asc">Título (Crescente)</SelectItem>
              <SelectItem value="title:desc">Título (Decrescente)</SelectItem>
            </SelectGroup>
            <SelectGroup>
              <SelectItem value="description:asc">Descrição (Crescente)</SelectItem>
              <SelectItem value="description:desc">Descrição (Decrescente)</SelectItem>
            </SelectGroup>
            <SelectGroup>
              <SelectItem value="createdAt:asc">Data de Criação (Crescente)</SelectItem>
              <SelectItem value="createdAt:desc">Data de Criação (Decrescente)</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-5 items-center">
        <Button
          className="bg-white border text-black shadow-sm hover:bg-neutral-100"
          onClick={() => handlePageChange('previous')}
          disabled={parseInt(props.httpParams.page, 10) === 1}
        >
          <IoArrowBackOutline />
        </Button>

        <span>{props.httpParams.page || '1'}</span>

        <Button
          className="bg-white border text-black shadow-sm hover:bg-neutral-100"
          onClick={() => handlePageChange('next')}
          disabled={parseInt(props.httpParams.page, 10) === props.totalPages}
        >
          <IoArrowForwardOutline />
        </Button>
      </div>
    </div>
  );
}
