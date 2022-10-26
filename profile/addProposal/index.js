document.querySelector('.choice-button').addEventListener('click', (event) => {
    if (event.target.classList.contains('category')) return
    const categories = document.querySelector('.categories') 
    const categoryInput = document.querySelector('#category')
    categories.classList.contains('categories--open') ? closeChoice(categoryInput.value === "") : openChoice()
})


const closeChoice = (cancel) => {
    const choice = document.querySelector('.choice')
    const choiceButton = choice.querySelector('.choice__button')
    const categories = choice.querySelector('.categories')
    categories.classList.remove('categories--open')
    choiceButton.classList.remove('choice__button--active')
    choice.querySelector('.choice__arrow').src = '//localhost/cityPortal/src/ui/downArrow.png'
    if (cancel) {
        choice.querySelector('.input').classList.add('input--error')
        choiceButton.classList.add('input--error') 
        setError(choice.querySelector('.error'), 'Выберите категорию')
    }
    else{
        choice.querySelector('.input').classList.remove('input--error')
        choiceButton.classList.remove('input--error')
        setError(choice.querySelector('.error'), '')
    }
    
}

const openChoice = () => {
    const categories = document.querySelector('.categories') 
    categories.classList.add('categories--open')
    document.querySelector('.choice__button').classList.add('choice__button--active')
    document.querySelector('.choice__arrow').src = '//localhost/cityPortal/src/ui/upArrow.png'
}

const setError = (element, text) => {
    element.textContent = text
}

const form = document.forms[0];
form.querySelectorAll('.input-wrapper').forEach(inputWrapper => {
    const input = inputWrapper.querySelector('.input')
    input.addEventListener('input', () => {
        switch(input.id){
            case 'name':
                input.value !== '' ?
                input.classList.remove('input--error') || setError(inputWrapper.querySelector('.error'), ''):
                !input.classList.contains('input--error') && (input.classList.add('input--error') || setError(inputWrapper.querySelector('.error'), 'Введите название'))
                break
            case 'description':
                input.value !== '' ?
                input.classList.remove('input--error') || setError(inputWrapper.querySelector('.error'), ''):
                !input.classList.contains('input--error') && (input.classList.add('input--error') || setError(inputWrapper.querySelector('.error'), 'Введите описание'))
                break
            case 'file-input':
                const fileName = document.querySelector('.filename')
                const inputFile = input.files[0]
                fileName.textContent = inputFile?.name ? inputFile?.name : fileName.textContent
                
                if (input.value === ''){
                    input.classList.add('input--error') 
                    setError(inputWrapper.querySelector('.error'), 'Выберите изображение')
                }
                else if(inputFile.type !== 'image/jpeg' && inputFile.type !== 'image/jpg' && inputFile.type !== 'image/png' && inputFile.type !== 'image/bmp'){
                    input.classList.add('input--error') 
                    setError(inputWrapper.querySelector('.error'), 'Выбранный вами файл не является изображением')
                }
                else if(inputFile.size / 1024 / 1024 >= 10){
                    input.classList.add('input--error') 
                    setError(inputWrapper.querySelector('.error'), 'Выбранный вами файл превышает 10 Мб')
                }
                else{
                    input.classList.remove('input--error')
                    setError(inputWrapper.querySelector('.error'), '')
                }
                break
        }
    })
})

const fetchData = async (link, callback) => {
    const data = await fetch(link)
    const json = await data.json()
    callback(json)
}

fetchData('./getCategories.php', (json) => {
    const categories = form.querySelector('.categories')
    json.forEach(category => {
        const categoryHTML = document.createElement('button')
        categoryHTML.classList.add('category')
        categoryHTML.textContent = category.categoryName
        categoryHTML.type ='button'
        categoryHTML.addEventListener('click', () => {
            document.querySelector('.choice__button').textContent = categoryHTML.textContent
            document.querySelector('#category').value = category.categoryId
           
            closeChoice(false)
        })
        categories.appendChild(categoryHTML)
    })
    
})

form.querySelector('.submit').addEventListener('click', (event) => {
    event.preventDefault()
    if ((!document.querySelector('#name').classList.contains('input--error') && document.querySelector('#name').value !== '') &&
    (!document.querySelector('#category').classList.contains('input--error') && document.querySelector('#category').value !== '') &&
    (!document.querySelector('#description').classList.contains('input--error') && document.querySelector('#description').value !== '') &&
    (!document.querySelector('#file-input').classList.contains('input--error') && document.querySelector('#file-input').value !== '') ){
        form.submit()
    }
})
