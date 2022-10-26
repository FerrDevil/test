const fetchData = async (link, callback) => {
    const data = await fetch(link)
    const json = await data.json()
    callback(json)
}

const sendData = async (link, data) => {
    const response = await fetch(link, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    return await response.json()
}


if (document.querySelector('.new-proposals') === null) {
    fetchData('./getUserProposals.php', (proposals) => {
        document.querySelector('.loading').classList.add('loading--hidden')
        proposals.reverse().forEach((proposal) => {
            let userProposal = document.querySelector('#user-proposal-template').content.cloneNode(true)
            userProposal.querySelector('.proposal__name').textContent = proposal.name
            userProposal.querySelector('.proposal__time').textContent = proposal.time


            userProposal.querySelector('.proposal__description').textContent = proposal.description
            userProposal.querySelector('.proposal__image').src = proposal.initialImage

            userProposal.querySelector('.proposal__category').textContent = proposal.categoryName

            if (proposal.status !== 'pending'){
                userProposal.querySelector('.delete-proposal').remove()
            }

            const proposalStatus = userProposal.querySelector('.proposal__state')
            const statusName = proposalStatus.querySelector('.state__name')
            const statusImage = proposalStatus.querySelector('.state__image')

            switch (proposal.status) {
                case 'pending':
                    statusName.textContent = 'Новая'
                    statusName.classList.add('state__name--pending')
                    statusImage.src = '//localhost/cityPortal/src/ui/pending.svg'
                    break
                case 'resolved':
                    statusName.textContent = 'Решена'
                    statusName.classList.add('state__name--resolved')
                    statusImage.src = '//localhost/cityPortal/src/ui/resolved.svg'
                    break
                case 'rejected':
                    statusName.textContent = 'Отклонена'
                    statusName.classList.add('state__name--rejected')
                    statusImage.src = '//localhost/cityPortal/src/ui/rejected.svg'
                    break
            }

            userProposal.querySelector('.delete-proposal')?.addEventListener('click', (e) => {
                sendData('./deleteProposal.php', { id: proposal.id })
                e.target.parentNode.parentNode.remove()

            })

            proposalStatus.querySelector('#status').value = proposal.status

            document.querySelector('.user-proposals').appendChild(userProposal)
        })

        const statuses = [
            { name: 'Новые', status: 'pending' },
            { name: 'Решенные', status: 'resolved' },
            { name: 'Отклоненные', status: 'rejected' }
        ]
        const filterChoices = document.querySelector('.proposals-filter__choices');

        statuses.forEach(status => {
            const choiceButton = document.createElement('button')
            choiceButton.classList.add('proposals-filter__choice')
            choiceButton.textContent = status.name
            choiceButton.addEventListener('click', () => {
                filterChoices.classList.remove('proposals-filter__choices--open')
                document.querySelectorAll('.user-proposal').forEach(proposal => {
                    proposal.querySelector('#status').value == status.status ? (proposal.style.display = 'flex') : (proposal.style.display = 'none')
                })
            })
            filterChoices.appendChild(choiceButton)
        })

        document.querySelector('.proposals-filter__button').addEventListener('click', () => {
            filterChoices.classList.contains('proposals-filter__choices--open') ?
                filterChoices.classList.remove('proposals-filter__choices--open') :
                filterChoices.classList.add('proposals-filter__choices--open')
        })

    })
}
else {
    fetchData('./getAllProposals.php', (proposals) => {
        document.querySelector('.loading').classList.add('loading--hidden')
        proposals.forEach(proposal => {
            const userProposal = document.querySelector('#new-proposal-template').content.cloneNode(true)
            userProposal.querySelector('.proposal__name').textContent = proposal.name
            userProposal.querySelector('.proposal__time').textContent = proposal.time
            userProposal.querySelector('.proposal__description').textContent = proposal.description
            userProposal.querySelector('.proposal__image').src = proposal.initialImage
            userProposal.querySelector('.proposal__category').textContent = proposal.categoryName
            userProposal.querySelector('#status').value = proposal.status

            if (proposal.status === "pending") {
                const stateChoice = userProposal.querySelector('.state-choice')
                const proposalStatus = userProposal.querySelector('.proposal__state')
                const statusName = proposalStatus.querySelector('.state__name')
                const statusImage = proposalStatus.querySelector('.state__image')
                statusName.textContent = 'Новая'
                statusName.classList.add('state__name--pending')
                statusImage.src = '//localhost/cityPortal/src/ui/pending.svg'


                const statuses = [
                    { name: 'Решена', image: '//localhost/cityPortal/src/ui/resolved.svg', status: 'resolved' },
                    { name: 'Отклонена', image: '//localhost/cityPortal/src/ui/rejected.svg', status: 'rejected' }
                ]

            
                statuses.forEach(status => {

                    const stateOptionHTML = document.createElement('div')
                    stateOptionHTML.classList.add('states__option')

                    const stateNameHTML = document.createElement('span')
                    stateNameHTML.classList.add('state__name')
                    stateNameHTML.classList.add(`state__name--${status.status}`)
                    stateNameHTML.textContent = status.name
                    stateOptionHTML.appendChild(stateNameHTML)

                    const stateImageHTML = document.createElement('img')
                    stateImageHTML.classList.add('state__image')
                    stateImageHTML.src = status.image
                    stateOptionHTML.appendChild(stateImageHTML)

                    stateOptionHTML.addEventListener('click', () => {
                        statusName.textContent = stateOptionHTML.textContent
                        stateChoice.querySelector('#status').value = status.status

                        statuses.forEach(statusHelper => {
                            statusName.classList.remove(`state__name--${statusHelper.status}`)
                        })
                        statusName.classList.add(`state__name--${status.status}`)

                        statusImage.src = status.image

                        closeChoice()

                        if (status.status === 'rejected') {
                            sendData('./postRejected.php', { id: proposal.id })
                        }
                        else if (status.status === 'resolved') {
                            document.querySelector('.confirmation').classList.add('confirmation--open')
                            document.querySelector('.confirmation').querySelector('#proposal-id').value = proposal.id
                            document.querySelector('.confirmation__close').addEventListener('click', () => {
                                document.querySelector('.confirmation').classList.remove('confirmation--open')
                                statusImage.src = '//localhost/cityPortal/src/ui/pending.svg'
                                statusName.classList.remove(`state__name--resolved`)
                                statusName.classList.add(`state__name--pending`)
                                statusName.textContent = 'Новая'

                            })
                        }
                    })
                    stateChoice.querySelector('.statuses').appendChild(stateOptionHTML)
                })
                stateChoice.querySelector('.proposal__state').addEventListener('click', () => {
                    const statuses = stateChoice.querySelector('.statuses')
                    statuses.classList.contains('statuses--open') ? closeChoice() : openChoice()
                })
        
                const closeChoice = () => {
                    const statuses = stateChoice.querySelector('.statuses')
                    statuses.classList.remove('statuses--open')
        
                    stateChoice.querySelector('.choice__arrow').src = '//localhost/cityPortal/src/ui/downArrow.png'
                }
        
                const openChoice = () => {
                    const statuses = stateChoice.querySelector('.statuses')
                    statuses.classList.add('statuses--open')
        
                    stateChoice.querySelector('.choice__arrow').src = '//localhost/cityPortal/src/ui/upArrow.png'
                }
               
            }

            else{
                userProposal.querySelector('.state__image').src = `//localhost/cityPortal/src/ui/${proposal.status}.svg`
                userProposal.querySelector('.state__image')
                userProposal.querySelector('.choice__arrow').remove()
                userProposal.querySelector('.state__name').classList.add(`state__name--${proposal.status}`)
                userProposal.querySelector('.state__name').textContent = proposal.status === 'resolved' ? "Решена" : "Отклонена"
                userProposal.querySelector('.proposal__state').classList.add('proposal__state--not-active')
            }

        document.querySelector('.user-proposals').appendChild(userProposal)

    })

    const statuses = [
            { name: 'Новые', status: 'pending' },
            { name: 'Решенные', status: 'resolved' },
            { name: 'Отклоненные', status: 'rejected' }
    ]
    const filterChoices = document.querySelector('.proposals-filter__choices');

    statuses.forEach(status => {
        const choiceButton = document.createElement('button')
        choiceButton.classList.add('proposals-filter__choice')
        choiceButton.textContent = status.name
        choiceButton.addEventListener('click', () => {
            filterChoices.classList.remove('proposals-filter__choices--open')
            document.querySelectorAll('.user-proposal').forEach(proposal => {
                proposal.querySelector('#status').value == status.status ? (proposal.style.display = 'flex') : (proposal.style.display = 'none')
            })
        })
        filterChoices.appendChild(choiceButton)
    })

    document.querySelector('.proposals-filter__button').addEventListener('click', () => {
        filterChoices.classList.contains('proposals-filter__choices--open') ?
            filterChoices.classList.remove('proposals-filter__choices--open') :
            filterChoices.classList.add('proposals-filter__choices--open')
    })
    
    document.querySelector('.add-category').addEventListener('click', () => {
        const addCategory = document.querySelector('.category-add')
        addCategory.classList.contains('category-add--open') ?
        addCategory.classList.remove('category-add--open') :
        addCategory.classList.add('category-add--open')
    })
    document.querySelector('.category-add__close').addEventListener('click', () => {
        const addCategory = document.querySelector('.category-add')
        addCategory.classList.contains('category-add--open') ?
        addCategory.classList.remove('category-add--open') :
        addCategory.classList.add('category-add--open')
    })

    fetchData('./getCategories.php', (categories) => {
        const addCategory = document.querySelector('.categories')
        categories.forEach(category => {
            const categoryHTML = document.createElement('div')
            categoryHTML.classList.add('categories__category')
            

            const categoryName = document.createElement('span')
            categoryName.classList.add('category__name')
            categoryName.textContent = category.categoryName

            const categoryDelete = document.createElement('img')
            categoryDelete.classList.add('category__remove')
            categoryDelete.src = '//localhost/cityPortal/src/ui/delete.svg'
            categoryDelete.addEventListener('click', () => {
                sendData('./removeCategory.php', {id: category.categoryId})
                categoryHTML.remove()
            })

            categoryHTML.appendChild(categoryName)
            categoryHTML.appendChild(categoryDelete)
            addCategory.appendChild(categoryHTML)
        })

    })

    document.querySelector('.remove-category').addEventListener('click', () => {
        const categories = document.querySelector('.categories-wrapper')
        categories.classList.contains('categories-wrapper--open') ?
        categories.classList.remove('categories-wrapper--open') :
        categories.classList.add('categories-wrapper--open')
    })
    
    })
}


const setError = (element, text) => {
    element.textContent = text
}


const form = document.forms[0];
form.querySelectorAll('.input-wrapper').forEach(inputWrapper => {
    const input = inputWrapper.querySelector('.input')
    input.addEventListener('input', () => {
        switch (input.id) {
            case 'file-input':
                const fileName = document.querySelector('.filename')
                const inputFile = input.files[0]
                fileName.textContent = inputFile?.name ? inputFile?.name : fileName.textContent

                if (input.value === '') {
                    input.classList.add('input--error')
                    setError(inputWrapper.querySelector('.error'), 'Выберите изображение')
                }
                else if (inputFile.type !== 'image/jpeg' && inputFile.type !== 'image/jpg' && inputFile.type !== 'image/png' && inputFile.type !== 'image/bmp') {
                    input.classList.add('input--error')
                    setError(inputWrapper.querySelector('.error'), 'Выбранный вами файл не является изображением')
                }
                else if (inputFile.size / 1024 / 1024 >= 10) {
                    input.classList.add('input--error')
                    setError(inputWrapper.querySelector('.error'), 'Выбранный вами файл превышает 10 Мб')
                }
                else {
                    input.classList.remove('input--error')
                    setError(inputWrapper.querySelector('.error'), '')
                }
                break
        }
    })
})

form.querySelector('.submit').addEventListener('click', (event) => {
    event.preventDefault()
    if ((!document.querySelector('#file-input').classList.contains('input--error') && document.querySelector('#file-input').value !== '')) {
        form.submit()
    }
})


const addCategoryForm = document.forms[1]
addCategoryForm.querySelectorAll('.input-wrapper').forEach(inputWrapper => {
    const input = inputWrapper.querySelector('.input')
    input.addEventListener('input', () => {
        switch (input.id) {
            case 'category-name':
                if (input.value === '') {
                    input.classList.add('input--error')
                    setError(inputWrapper.querySelector('.error'), 'Введите название категории')
                }
                else{
                    input.classList.remove('input--error')
                    setError(inputWrapper.querySelector('.error'), '')
                }
                
                break
        }
    })
})

addCategoryForm.querySelector('.submit').addEventListener('click', (event) => {
    event.preventDefault()
    if ((!document.querySelector('#category-name').classList.contains('input--error') && document.querySelector('#category-name').value !== '')) {
        addCategoryForm.submit()
    }
})