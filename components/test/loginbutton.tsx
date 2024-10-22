import { useSession, signIn, signOut } from "next-auth/react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuShortcut, DropdownMenuTrigger } from "../ui/dropdown-menu";
import {  LogOut, UserCircle } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";

export default function LoginbtnComponent() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Button variant="secondary" >..</Button>;
  }

  if (!session) {
    // Not logged in
    return   <Button variant="secondary" onClick={()=>signIn('google')}>Sign In</Button>;
  }
 
  // Logged in
  return (
    <div className="flex items-center space-x-2 cursor-pointer group" >
   
   

    <DropdownMenu>
      <DropdownMenuTrigger asChild>
      <Image src={session.user.image} width={100} height={100} alt="User" className="w-8 h-8 rounded" />

      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <Link href={'/youranimes'}>
      <DropdownMenuItem >

      <UserCircle/>
          <span>Your Anime</span>
         
        </DropdownMenuItem>
     
        </Link>
      
        <DropdownMenuItem onClick={ ()=> signOut()}>
          <LogOut />
          <span>Log out</span>
         
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

  </div>
  );
}
