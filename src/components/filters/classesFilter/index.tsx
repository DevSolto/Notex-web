import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HttpParams } from "@/pages/classes";
import { IoArrowBackOutline, IoArrowForwardOutline } from "react-icons/io5";

type ClassesFilterProps = {
  httpParams: HttpParams;
  setHttpParams: React.Dispatch<React.SetStateAction<HttpParams>>;
  totalPages: number
}

export function ClassesFilter(props: ClassesFilterProps) {
  const years: number[] = [];


  Array.from({ length: 4 }, (_, i) => {
    const year = new Date().getFullYear() + (i + 1);
    years.push(year);
  });

  Array.from({ length: 5 }, (_, i) => {
    const year = new Date().getFullYear() - i;
    years.push(year);
  });

  years.sort((a, b) => b - a);

  const handlePageChange = (direction: 'next' | 'previous') => {
    const currentPage = parseInt(props.httpParams.page, 10) || 1;

    const newPage = direction === 'next' ? currentPage + 1 : Math.max(1, currentPage - 1);

    props.setHttpParams({
      ...props.httpParams,
      page: String(newPage),
    });
  };

  return (
    <div className="w-full flex justify-between">
      <div className="flex gap-3">
        <Select
          onValueChange={(value) => {
            if (value !== 'all') {
              props.setHttpParams({
                ...props.httpParams,
                year: value
              });
            } else {
              props.setHttpParams({
                ...props.httpParams,
                year: ''
              });
            }
          }}
        >
          <SelectTrigger className="w-36">
            <SelectValue placeholder="Ano" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectGroup>
              {years.map((value) => (
                <SelectItem key={value} value={String(value)}>
                  {value}
                </SelectItem>
              ))}
              <SelectItem value='all'>
                Todos
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

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
          <SelectTrigger className=" w-40">
            <SelectValue placeholder='Ordenar por...' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="title:asc">Nome (Crescente)</SelectItem>
              <SelectItem value="title:desc">Nome (Decrescente)</SelectItem>
            </SelectGroup>
            <SelectGroup>
              <SelectItem value="code:asc">Código (Crescente)</SelectItem>
              <SelectItem value="code:desc">Código (Decrescente)</SelectItem>
            </SelectGroup>
            <SelectGroup>
              <SelectItem value="year:asc">Ano (Crescente)</SelectItem>
              <SelectItem value="year:desc">Ano (Decrescente)</SelectItem>
            </SelectGroup>
            <SelectGroup >
              <SelectItem value="createdAt:asc">Data de Criação (Crescente)</SelectItem>
              <SelectItem value="createdAt:desc">Data de Criação (Decrescente)</SelectItem>
            </SelectGroup>
            <SelectGroup >
              <SelectItem value="updatedAt:asc">Data de atualização (Crescente)</SelectItem>
              <SelectItem value="updatedAt:desc">Data de atualização (Decrescente)</SelectItem>
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

        <span>
          {props.httpParams.page || '1'}
        </span>

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
