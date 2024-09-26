import { SideBar } from "@/components/sideBar";

export function Home() {
  return (
    <div className="flex">
      <SideBar />
      <main>
        <h1>Home</h1>
      </main>
    </div>
  )
}