import { getVerificationTokenByEmail } from "@/data/verification-token";
import { v4 as uuidv4 } from "uuid";
import { database } from "./prismadb";
import { getPasswordResetTokenbyEmail } from "@/data/password-reset-token";

export const generateVerificationToken = async (email: string) => {
    const token = uuidv4(); // Generate a verification token
    const expires = new Date(new Date().getTime() + 3600 * 1000) // 1 hour from now
 
    const existingToken = await getVerificationTokenByEmail(email)
 
    if (existingToken) {
     await database.verificationToken.delete({
         where: {
             id: existingToken.id
         }
     });
    }
 
    const verificationToken = await database.verificationToken.create({
         data: {
             email,
             token, 
             expires
         }
    })
 
    return verificationToken;
 };

 export const generatePasswordResetToken = async (email: string) => {
    const token = uuidv4(); // Generate a verification token
    const expires = new Date(new Date().getTime() + 3600 * 1000) // 1 hour from now
    
    const existingToken = await getPasswordResetTokenbyEmail(email)
    
    if (existingToken) {
     await database.passwordResetToken.delete({
         where: {
             id: existingToken.id
         }
     });
    }
    
    const passwordResetToken = await database.passwordResetToken.create({
            data: {
                email,
                token, 
                expires
            }
        })
    
        return passwordResetToken;
    }