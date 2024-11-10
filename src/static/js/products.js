//отримує кнопку з HTML по ID
const button = document.querySelector('#button')
//виконує функцію при натисканні на кнопку(обробник подій)
button.addEventListener('click', () => {
    // Функция которая есть по-умолчанию в js 
    // Позволяет отправлять запросы всё
    fetch('/product/create', {
        //пишемо який метод використовуємо
        method: 'POST',
        // Переделывает объект в json-строку по типу: ' "name": "Ринат-котик" '
        body: JSON.stringify({
            name: 'Ринат-котик',
            src: 'https://ih1.redbubble.net/image.4984926493.8694/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.jpg',
            // src: 'https://cdn.27.ua/799/20/ab/6693035_1.jpeg',
            price: 'За красивые глаза',
            description: 'Милый хороший котик Ринат недорого в хорошие руки',
        }),
        //додаткова інформація про запит
        headers: {
            // При отправке данных в формате json 
            // нужно обязательно указать тип данных, которые мы отправляем на сервер
            // В случае с json - 'application/json'
            'Content-Type': 'application/json'
        }
    })
})

