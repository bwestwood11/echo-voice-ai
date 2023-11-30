import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prismadb from "@/lib/prismadb";
import { MAX_CHARACTERS, MAX_FREE_COUNTS, MAX_PRO_COUNTS } from "@/constants";


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

    // if the user's api limit does not exist or is less than 5 free tries, return true
    if(!userApiLimit || userApiLimit.count < MAX_FREE_COUNTS){ 
        return true
    } 
    else {
        return false
    };
};
export const checkProApiLimit = async () => {
    // get the user's session from the server
    const session = await getServerSession(authOptions);
    console.log('session', session)
    if(!session) return false;


    const userCharacterLimit = await prismadb.proUserCharacterLimit.findUnique({
        where: {
            userId: session.user.id
        }
    });

    if(!userCharacterLimit || userCharacterLimit.count < MAX_CHARACTERS){
        return true
    }
    else {
        return false
    }

    // // retrieve the user's api limit from the database
    // const userApiLimit = await prismadb.userApiLimit.findUnique({
    //     where: {
    //         userId: session.user.id
    //     }
    // });

    // // if the user's api limit does not exist or is less than 5 free tries, return true
    // if(!userApiLimit || userApiLimit.count < MAX_PRO_COUNTS){ 
    //     return true
    // } 
    // else {
    //     return false
    // };
};

export const getApiLimitCount = async () => {    
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

    // if the user's api limit does not exist, return 0
    if(!userApiLimit) return 0;

    // return the user's api limit count
    return userApiLimit.count;
}

export const increaseCharacterCount = async (text: number) => {
     // get the user's session from the server
     const session = await getServerSession(authOptions);
     console.log('session', session)
       if(!session) return false;
console.log('text', text)
    // retrieve the user's character count from the database
     const userCharacterCount = await prismadb.proUserCharacterLimit.findUnique({
            where: {
                userId: session.user.id
            }
        });

        console.log('userCharacterCount', userCharacterCount)

        if (userCharacterCount) {
            await prismadb.proUserCharacterLimit.update({
                where: {
                    userId: session.user.id
                },
                data: {
                    count: userCharacterCount.count + text
                }
            });
        } else {
            // if the user's character count does not exist, create a new one
            await prismadb.proUserCharacterLimit.create({
                data: {
                    userId: session.user.id,
                    count: text
                }
            });
        }
         console.log('userCharacterCount', userCharacterCount)  

}

export const getCharacterCount = async () => {
    // get the user's session from the server
    const session = await getServerSession(authOptions);
    console.log('session', session)
      if(!session) return false;

    // retrieve the user's character count from the database
    const userCharacterCount = await prismadb.proUserCharacterLimit.findUnique({
        where: {
            userId: session.user.id
        }
    });

    // if the user's character count does not exist, return 0
    if(!userCharacterCount) return 0;

    // return the user's character count
    return userCharacterCount.count;
}