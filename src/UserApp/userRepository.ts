import client from "../client/prismaClient";
import { Prisma } from "@prisma/client";

async function findUserByEmail(email: string){
    try{
        let user = await client.user.findUnique({
            where: {
                email: email
            }
        })

        return user;
    } catch(error){
        console.log(error);
    }
}

const userRepository = {
    findUserByEmail: findUserByEmail,
    createUser: createUser
}

async function createUser(data: Prisma.UserCreateInput){
    try{
        const user = await client.user.create({
            data: data
        })
        return user;
    }catch(error){
        console.log(error);
    }
    //     ☆*: .｡. o(≧▽≦)o .｡.:*☆
}

export default userRepository;