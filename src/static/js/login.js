form.addEventListener('submit', (event)=>{
    event.preventDefault()
    fetch('', {
        method: 'POST',
        body: JSON.stringify({
            email: email.value,
            password: password.value
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
})