import userRepository from "./userRepository";
import { Prisma } from "@prisma/client";

 


async function authUser(email: string, password: string) {
    let user = await userRepository.findUserByEmail(email);
    // if (user){
    //     if (password == user.password){
    //         return user;
    //     }else {}
    // }else {}
    if (!user){
        return "error";
    }

    if (user.password != password){
        return "error";
    }

    return user;
}   
interface IUserSuccess{
    status: 'success',
    data: IUser
}

interface IUserError{
    status: 'error',
    message: string
}

interface IUser{
    id: number,
    username: string,
    email: string
    password: string
    
}

async function registerUser(data: Prisma.UserCreateInput): Promise< IUserError | IUserSuccess > {
    const user = await userRepository.findUserByEmail(data.email)
    
    if (user) {
        return {status: 'error', message: 'User not register'}
    }
    const yoUser = await userRepository.createUser(data)
    if (!yoUser) {
        return {status: 'error', message: 'create error'}
    } 
    return {status: 'success', data: yoUser}
}

const userService = {
    authUser: authUser,
    registerUser: registerUser
}

export default userService;