import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prismadb from "@/lib/prismadb";
import { MAX_FREE_COUNTS } from "@/constants";


export const increaseApiLimit = async () => {
    // get the user's session from the server
    const session = await getServerSession(authOptions);
   console.log('session', session)

    if(!session) return false;

    // retrieve the user's api limit from the database
    const userApiLimit = await prismadb.userApiLimit.findUnique({
        where: {
            userId: session.user.id
        }
    });

    // if the user's api limit exists, update the count
    if(userApiLimit) {
        await prismadb.userApiLimit.update({
            where: {
                userId: session.user.id
            },
            data: {
                count: userApiLimit.count + 1
            }
        });
    } else {
        // if the user's api limit does not exist, create a new one
        await prismadb.userApiLimit.create({
            data: {
                userId: session.user.id,
                count: 1
            }
        });
    }
};

export const checkApiLimit = async () => {
    const session = await getServerSession(authOptions);
    console.log('session', session)
    if(!session) return false;

    const userApiLimit = await prismadb.userApiLimit.findUnique({
        where: {
            userId: session.user.id
        }
    });

    if(!userApiLimit || userApiLimit.count < MAX_FREE_COUNTS){ 
        return true
    } 
    else {
        return false
    };
};

export const getApiLimitCount = async () => {    
    const session = await getServerSession(authOptions);
  console.log('session', session)
    if(!session) return false;

    const userApiLimit = await prismadb.userApiLimit.findUnique({
        where: {
            userId: session.user.id
        }
    });

    if(!userApiLimit) return 0;

    return userApiLimit.count;
}
