import productRepository from "./productRepository";
const posts = [
    {
        "name": 'SR 71',
        "src": "https://quto.ru/imgs/2022/03/30/10/5336771/f620abcd10e24ea4f6a7e90c9a393d3ef29889bc.jpg",
        "price": "1500000000 $",
        "description": "Розвідувальний літак"
    },
    {
        "name": 'F 22 Raptor',
        "src": "https://upload.wikimedia.org/wikipedia/commons/1/1e/F-22_Raptor_edit1_%28cropped%29.jpg",
        "price": "1 пак КК",
        "description": "Винищувач 5 покоління"
    },
    {
        "name": 'F 35 lightning',
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/F-35A_flight_%28cropped%29.jpg/1200px-F-35A_flight_%28cropped%29.jpg",
        "price": "5 ПЧ",
        "description": "Винищувач 5 покоління"
    },
    {
        "name": 'Su 27',
        "src": "https://upload.wikimedia.org/wikipedia/commons/a/ab/Ukrainian_Air_Force_Sukhoi_Su-27P_Flanker_%2829583343448%29.jpg",
        "price": "200000 грн ",
        "description": "Літак 4 покоління"
    },
    {
        "name": 'Mig 29',
        "src": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhYbCWDOn6VP98lCNDJDjnv01pBw3m_rdHAQid7AFCZsvLLsTj78opm8_6FmqE16KSMXIT8bT1cHZJYxsdls90oQ02230SHt6cRXRqc_0_Ar8UYbnn6HJKqNtgs0AtbYPljEUKG4GkM9VWI/s1600/0000093618_large.jpeg",
        "price": "200 грн",
        "description": "Літак пілотажної группи Українські соколи"
    }
]

type Product = {
    name: string;
    src: string;
    price: string;
    description: string;
}

async function getAllPosts(max: number){
    
    const context = {
        products: await productRepository.getAllProducts()
    }
    // if (max <= products.length) {
    //     context.products = products.slice(0, max)
    // }
    return context
}

function getPostById(id: number){
    const context = {
        product: posts[id-1]
    }
    
    return {
        context: context,
        length: posts.length
    }

}

function createPost(data: Product){
    posts.push(data)
}

const productService = {
    getAllProducts: getAllPosts,
    getProductById: getPostById,
    createProduct: createPost
} 

export default productService