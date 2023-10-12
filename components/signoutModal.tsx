"use client"

import { signOut } from "next-auth/react"
import { useSession } from "next-auth/react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";


const SignoutModal = () => {
    return (
         <div>
              <Dialog open>
               <DialogContent>
                <DialogHeader>
                    <DialogTitle>Sign Out</DialogTitle>
                    <DialogDescription>Are you sure you want to sign out?</DialogDescription>
                    <Button onClick={() => signOut({ callbackUrl: '/'})} variant='ghost'>Sign Out Here </Button>
                </DialogHeader>
               </DialogContent>
                </Dialog>
         </div>
         )
}

export default SignoutModal