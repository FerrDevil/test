const form = document.forms[0];

const fetchData = async (link, callback) => {
    const data = await fetch(link)
    const json = await data.json()
    callback(json)
}


form.querySelectorAll('.input').forEach(input =>{
    input.addEventListener('input', () => {
        switch(input.id){
            case 'fio':
                input.value?.match(/[а-я ]/gi)?.length === input.value?.length ?
                input.classList.remove('input--error') :
                !input.classList.contains('input--error') && input.classList.add('input--error')
                break
            case 'login':
                fetchData('./getUsers.php', (users) => {
                    const userLogins = users.reduce((prev, next) => [...prev, next.login], [])
                    !userLogins.includes(input.value) && input.value?.match(/[a-z]/gi)?.length === input.value?.length ?
                    input.classList.remove('input--error') :
                    !input.classList.contains('input--error') && input.classList.add('input--error')
                })
                break
            case 'email':
                input.value?.match(/[a-z0-9]+@[a-z]+.[a-z]+/gi) !== null && input.value?.match(/[a-z0-9]+@[a-z]+.[a-z]+/gi)[0] === input.value ?
                input.classList.remove('input--error') :
                !input.classList.contains('input--error') && input.classList.add('input--error')
                break
            case 'password':
                input.value.length !== '' ?
                input.classList.remove('input--error') :
                !input.classList.contains('input--error') && input.classList.add('input--error')
                break
            case 'confirmPassword':
                input.value.length !== '' && input.value.length === form.querySelector('#password').value.length ?
                input.classList.remove('input--error') :
                !input.classList.contains('input--error') && input.classList.add('input--error')
                break
            case 'agreement':
                input.checked ?
                input.classList.remove('input--error') :
                !input.classList.contains('input--error') && input.classList.add('input--error')
                break
        }
    })
})

form.querySelector('.submit').addEventListener('click', (event) => {
    event.preventDefault()
    for(input of form.querySelectorAll('.input') ){
        if (input.classList.contains('input--error') || input.value === ''){
            console.log(input)
            return
        }
    }
    form.submit()
})