import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { IoChatboxEllipsesOutline, IoNotificationsOutline } from "react-icons/io5";

const user = {
  "id": "cm1j7lipr0003oz5nw3osgezv",
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
        <Button variant={'ghost'} className="border-2 rounded-full py-6 hover:bg-orange-500 hover:text-white transition-all">
          <IoNotificationsOutline className="text-lg" />
        </Button>
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