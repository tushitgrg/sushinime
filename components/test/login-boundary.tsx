import { useSession, signIn } from "next-auth/react";
import { Button } from "../ui/button";



export default function LoginBoundary({ children, fallback }) {
  const { data: session, status } = useSession();


  if (!session) {
    
    return <>
    {fallback?<div className="flex gap-4">
   <span>{fallback}</span> 
    <Button variant="secondary" onClick={()=>signIn('google')}>Sign In</Button>
    </div>:''}
    </>
  }

  
  return (<>
   {children}
   </>
  );
}
