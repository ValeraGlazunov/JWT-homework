import express, { Express, Request, Response } from 'express';
import path from 'path';
import productRouter from './ProductApp/productRouter';
import userRouter from './UserApp/userRouter';
import cookieParser from 'cookie-parser';

// Yuppi

const app: Express = express();
const HOST: string = 'localhost';
const PORT: number = 8000;

//ставимо движок 
app.set('view engine', 'ejs')
//встановлюємо папки з шаблонами для ejs
app.set('views', path.join(__dirname, 'templates'))
//доустановка обробника json формату тому що express не вміє працювати з json за замовчуванням
app.use(express.json())
app.use(cookieParser())
// створення посилання на static файли за посиланням /static/, використовую метод static() бібліотеки express.
app.use('/static/', express.static(path.join(__dirname, 'static')))
app.use('/product/', productRouter)
app.use('/', userRouter)
// метод додатку express, який очікує запит по вказаному посиланню
// другим аргументом передається функція, яка здійсниться в момент запиту
// функція приймає req та res, req - request, res - response
app.get('/', (req, res) => {
    // метод send об'єкта res дозволяє надіслати відповідь
    // res.send("hello world")
    // res.sendFile(path.join(__dirname, "templates", "index.html"))
    // res.sendFile(path.join(__dirname, "./templates/index.html"))
    // res.sendFile(path.resolve(__dirname, "./templates/index.html"))
    // Создаем переменную контекст, которая отвечает за передачу данных в ejs шаблон.
    const context = {
       // words: ['hello', 'world', 'rinat']
       title: 'super shop'
    }
    // Для отправки ejs-шаблонов используем метод render.
    // Первым аргументом пишем навание шаблона БЕЗ РАСШИРЕНИЯ!
    // Вторым аргументом передаются данные(context) которые нужны шаблону.
    res.render('index', context)
})


app.listen(PORT, HOST, () =>{
    console.log('http://localhost:8000')
})