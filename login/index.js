const form = document.forms[0]

const setError = (element, text) => {
    element.textContent = text
}

form.querySelectorAll('.input-wrapper').forEach(inputWrapper => {
    const input = inputWrapper.querySelector('.input')
    input.addEventListener('input', () => {
        switch(input.id){
            
            case 'login':{
                input.value.length !== 0 ?
                input.classList.remove('input--error') || setError(inputWrapper.querySelector('.error'), ''):
                !input.classList.contains('input--error') && (input.classList.add('input--error') || setError(inputWrapper.querySelector('.error'), 'Введите логин'))
                break
            }
            
            case 'password':{
                input.value.length !== 0 ?
                input.classList.remove('input--error') || setError(inputWrapper.querySelector('.error'), ''):
                !input.classList.contains('input--error') && (input.classList.add('input--error') || setError(inputWrapper.querySelector('.error'), 'Введите пароль'))
                break
            }
            
        }
    })
})

form.querySelector('.submit').addEventListener('click', (event) => {
    event.preventDefault()
    for(input of form.querySelectorAll('.input') ){
        if (input.classList.contains('input--error') || input.value === ''){
            return
        }
    }
    form.submit()
})