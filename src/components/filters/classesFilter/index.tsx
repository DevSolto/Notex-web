import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
        <Input type="search" placeholder="Procurar..." className="w-72" />
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
