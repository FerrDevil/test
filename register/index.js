const form = document.forms[0];

const fetchData = async (link, callback) => {
    const data = await fetch(link)
    const json = await data.json()
    callback(json)
}

const setError = (element, text) => {
    element.textContent = text
}


form.querySelectorAll('.input-wrapper').forEach(inputWrapper => {
    const input = inputWrapper.querySelector('.input')
    input.addEventListener('input', () => {
        switch(input.id){
            case 'fio':{
                input.value?.match(/[а-я ]/gi)?.length === input.value?.length ?
                input.classList.remove('input--error') || setError(inputWrapper.querySelector('.error'), '') :
                !input.classList.contains('input--error') && (input.classList.add('input--error') || setError(inputWrapper.querySelector('.error'), 'Доступно использование только кириллицы'))
                break
            }
            case 'login':{

                if (input.value?.match(/[a-z]/gi)?.length === input.value?.length){
                    input.classList.remove('input--error')
                    setError(inputWrapper.querySelector('.error'), '')

                    fetchData('./getUsers.php', (users) => {
                        const userLogins = users.reduce((prev, next) => [...prev, next.login], [])
                        
                        !userLogins.includes(input.value) && input.value?.match(/[a-z]/gi)?.length === input.value?.length ?
                        input.classList.remove('input--error') || setError(inputWrapper.querySelector('.error'), '') :
                        !input.classList.contains('input--error') && (input.classList.add('input--error') || setError(inputWrapper.querySelector('.error'), 'Такой пользователь уже существует'))
                    })                    
                }
                else {
                    input.classList.add('input--error')
                    setError(inputWrapper.querySelector('.error'), 'Доступно использование только латиницы')
                }
                
                break
            }
            case 'email':{
                input.value?.match(/[a-z0-9]+@[a-z]+.[a-z]+/gi) !== null && input.value?.match(/[a-z0-9]+@[a-z]+.[a-z]+/gi)[0] === input.value ?
                input.classList.remove('input--error') || setError(inputWrapper.querySelector('.error'), '') :
                !input.classList.contains('input--error') && (input.classList.add('input--error') || setError(inputWrapper.querySelector('.error'), 'Введен неверный email'))
                break
            }
            case 'password':{
                input.value.length !== 0 ?
                input.classList.remove('input--error') || setError(inputWrapper.querySelector('.error'), ''):
                !input.classList.contains('input--error') && (input.classList.add('input--error') || setError(inputWrapper.querySelector('.error'), 'Введите пароль'))
                break
            }
            case 'confirmPassword':{
                input.value.length !== 0 && input.value.length === form.querySelector('#password').value.length ?
                input.classList.remove('input--error') || setError(inputWrapper.querySelector('.error'), ''):
                !input.classList.contains('input--error') && (input.classList.add('input--error') || setError(inputWrapper.querySelector('.error'), 'Повторите пароль'))
                break
            }
            case 'agreement':{
                input.checked ?
                input.classList.remove('input--error'):
                !input.classList.contains('input--error') && input.classList.add('input--error')
                break
            }
        }
    })
})

form.querySelector('.submit').addEventListener('click', (event) => {
    event.preventDefault()
    if (!form.querySelector('#agreement').checked){
        return
    }
    for(input of form.querySelectorAll('.input') ){
        if (input.classList.contains('input--error') || input.value === ''){
            return
        }
    }
    form.submit()
})