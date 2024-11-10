import productRepository from "./productRepository";
const products = [
    {
        "name": 'cat1',
        "src": "https://i.ytimg.com/vi/l3hoa-stJs4/maxresdefault.jpg",
        "price": "1.5 БСМ",
        "description": "Не дорогий кіт, крива комплектація, передній привід"
    },
    {
        "name": 'cat2',
        "src": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9z4GJDIYppz98EzOpP0-8sv6vANTnYtFSYg&s",
        "price": "1 ПК",
        "description": "Збірка котів, банда чотирьох."
    },
    {
        "name": 'cat3',
        "src": "https://masterpiecer-images.s3.yandex.net/5f8da4a62a42a89:upscaled",
        "price": "1 КФВ",
        "description": "Кіт елітної комплектації."
    },
    {
        "name": 'cat4',
        "src": "https://img.freepik.com/free-photo/close-up-on-adorable-kitten-in-nature_23-2150782221.jpg",
        "price": "2 К",
        "description": "Звичайний кіт, осінній."
    },
    {
        "name": 'cat5',
        "src": "https://fbi.cults3d.com/uploaders/16600790/illustration-file/16a0b6ea-d282-444a-b222-5853ccd49e35/IMG_0316.webp",
        "price": "200 БСМ",
        "description": "Некоарт"
    }
]

type Product = {
    name: string;
    src: string;
    price: string;
    description: string;
}

async function getAllProducts(max: number){
    
    const context = {
        products: await productRepository.getAllProducts()
    }
    // if (max <= products.length) {
    //     context.products = products.slice(0, max)
    // }
    return context
}

function getProductById(id: number){
    const context = {
        product: products[id-1]
    }
    
    return {
        context: context,
        length: products.length
    }

}

function createProduct(data: Product){
    products.push(data)
}

const productService = {
    getAllProducts: getAllProducts,
    getProductById: getProductById,
    createProduct: createProduct
} 

export default productService