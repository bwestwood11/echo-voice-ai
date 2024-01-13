"use server"

import { signOut } from "@/auth"

export const logout = async () => {
    // If you want to do some server stuff
await signOut();
}