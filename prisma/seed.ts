import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

async function createOneCategory(){
    const category = await prisma.category.create({
        data: {
            name: 'Keyboards'
        }
    })
}

async function createOneProduct(){
    const product = await prisma.product.create({
        data: {
            name: 'Keyboard1',
            src: '',
            price: 5,
            categoryId: 1
        }
    })
}

async function findOneProduct(){
    const product = await prisma.product.findUnique({
        where: {
            id: 1
        }
    })
    const category = await prisma.category.findUnique({
        where: {
            id: product?.categoryId
        },

        include: {
            products: true
        }
    })
    console.log(category)
}

async function findOneCategory(){
    const category = await prisma.category.findUnique({
        where: {
            id: 1
        },

        include: {
            products: true
        }
    })
    console.log(category)
}

async function createOneUser(){
    const user = await prisma.user.create({
        data:{
            username: "Sergey",
            email: "sergey@gmail.com",
            password: "12345"
        }
    })
}

createOneUser().then(() => {
    prisma.$disconnect()
}).catch(err => {
    console.error(err);
    prisma.$disconnect()
})