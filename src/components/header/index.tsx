import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { Reports } from "./reports";

const user = {
  "id": "cm1p4at8d000a9wjnj8q3fv9s",
  "name": "Santiago Souto",
  "email": "santiago@example.com",
  "cpf": "338.815.930-04",
  "password": "$2b$10$Vgzv1mJ9DWp9j1WDCx2WQ.yyhfU7QEo4y6t1qIJaFEoJjyCsYr80K",
  "role": "Professor",
  "phone": "565191080",
  "isActive": true
}

export function Header() {
  return (
    <header className="z-50 sticky top-0 bg-white p-5 flex justify-end items-center w-full border-b">
      <div className="flex gap-3">
        <Reports userId={user.id} />
        <Button variant={'ghost'} className="border-2 rounded-full py-6 hover:bg-orange-500 hover:text-white transition-all">
          <IoChatboxEllipsesOutline className="text-lg" />
        </Button>
        <div className="flex items-center gap-3">
          <p className="flex flex-col items-end">
            <span className="font-se">{user.name}</span>
            <span className="text-sm text-neutral-600">{user.role}</span>
          </p>
          <Avatar>
            <AvatarFallback>SS</AvatarFallback>
            <AvatarImage src="https://github.com/DevSolto.png" />
          </Avatar>
        </div>
      </div>
    </header>
  )
}