document.querySelector('.choice-button').addEventListener('click', () => {
    const categories = document.querySelector('.categories') 
    categories.classList.contains('categories--open') ? closeChoice() : openChoice()
})

const closeChoice = () => {
    const categories = document.querySelector('.categories') 
    categories.classList.remove('categories--open')
    document.querySelector('.choice__button').classList.remove('choice__button--active')
    document.querySelector('.choice__arrow').src = '//localhost/cityPortal/src/ui/downArrow.png'
}

const openChoice = () => {
    const categories = document.querySelector('.categories') 
    categories.classList.add('categories--open')
    document.querySelector('.choice__button').classList.add('choice__button--active')
    document.querySelector('.choice__arrow').src = '//localhost/cityPortal/src/ui/upArrow.png'
}

const form = document.forms[0];
form.querySelectorAll('.input').forEach(input => {
    input.addEventListener('input', () => {
        switch(input.id){
            case 'name':
                input.value !== '' ?
                input.classList.remove('input--invalid') :
                !input.classList.contains('input--invalid') && input.classList.add('input--invalid')
                break
            case 'category':
                input.value !== '' ?
                input.classList.remove('input--invalid') :
                !input.classList.contains('input--invalid') && input.classList.add('input--invalid')
                break
            case 'file-input':
                document.querySelector('.filename').textContent = input.files[0]?.name ? input.files[0]?.name : document.querySelector('.filename').textContent
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
            document.querySelector('#category').value = category.id
            closeChoice()
        })
        categories.appendChild(categoryHTML)
    })
    
})
