"use client"

import { signOut } from "@/auth";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";

const signingOut = () => {
    signOut()
}

const SignoutModal = () => {
    return (
         <div>
              <Dialog open>
               <DialogContent>
                <DialogHeader>
                    <DialogTitle>Sign Out</DialogTitle>
                    <DialogDescription>Are you sure you want to sign out?</DialogDescription>
                    <Button onClick={signingOut} variant='ghost'>Sign Out Here </Button>
                </DialogHeader>
               </DialogContent>
                </Dialog>
         </div>
         )
}

export default SignoutModal