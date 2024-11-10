import { Prisma, PrismaClient } from '@prisma/client';
import client from '../client/prismaClient';


async function getAllProducts(){
    try{
        let products = await client.product.findMany({
        
        })
        return products
    } catch(err){
        if (err instanceof Prisma.PrismaClientKnownRequestError){
            if (err.code == 'P2002'){
                console.log(err.message);
                throw err;
            }
        }
    }
}

async function getProductById(id: number){
    let product = await client.product.findUnique({
        where:{
            id: id
        }
    })
    return product

}


async function createProduct(data: Prisma.ProductCreateInput){
    let product = await client.product.create({
        data: data
    })
    return product
}  


const productRepository = {
    getAllProducts:getAllProducts
}
export default productRepository

