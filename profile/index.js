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





document.querySelector('.new-proposals') ===  null ?
fetchData('./getUserProposals.php', (proposals) => {
    proposals.forEach(proposal => {
        const userProposal = document.querySelector('#user-proposal-template').content.cloneNode(true)
        userProposal.querySelector('.proposal__name').textContent = proposal.name
        userProposal.querySelector('.proposal__time').textContent = proposal.time
        
        if (proposal.description === '') userProposal.querySelector('.proposal__description').remove()
        else userProposal.querySelector('.proposal__description').textContent = proposal.description

        if (proposal.initialImage === '') userProposal.querySelector('.proposal__image').remove()
        else userProposal.querySelector('.proposal__image').src = proposal.initialImage
        
        userProposal.querySelector('.proposal__category').textContent = proposal.categoryName

        const proposalStatus = userProposal.querySelector('.proposal__state')
        const statusName = proposalStatus.querySelector('.state__name')
        const statusImage = proposalStatus.querySelector('.state__image')
        switch (proposal.status){
            
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

        document.querySelector('.user-proposals').appendChild(userProposal)
    })
}) :
fetchData('./getNewProposals.php', (proposals) => {
    proposals.forEach(proposal => {
        const userProposal = document.querySelector('#new-proposal-template').content.cloneNode(true)
        userProposal.querySelector('.proposal__name').textContent = proposal.name
        userProposal.querySelector('.proposal__time').textContent = proposal.time
        
        if (proposal.description === '') userProposal.querySelector('.proposal__description').remove()
        else userProposal.querySelector('.proposal__description').textContent = proposal.description

        if (proposal.initialImage === '') userProposal.querySelector('.proposal__image').remove()
        else userProposal.querySelector('.proposal__image').src = proposal.initialImage
        
        userProposal.querySelector('.proposal__category').textContent = proposal.categoryName

        const stateChoice = userProposal.querySelector('.state-choice')
        const proposalStatus = userProposal.querySelector('.proposal__state')
        const statusName = proposalStatus.querySelector('.state__name')
        const statusImage = proposalStatus.querySelector('.state__image')
        statusName.textContent = 'Новая'
        statusName.classList.add('state__name--pending')
        statusImage.src = '//localhost/cityPortal/src/ui/pending.svg'
        const statuses = [
            {name:'Решена', image:'//localhost/cityPortal/src/ui/resolved.svg', status: 'resolved'},
            {name:'Отклонена', image:'//localhost/cityPortal/src/ui/rejected.svg', status: 'rejected'}
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

                if (status.status === 'rejected'){
                    sendData('./postRejected.php', {id : proposal.id})
                }
                else if (status.status === 'resolved'){
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

        document.querySelector('.user-proposals').appendChild(userProposal)
    })
})

const form = document.forms[0];
form.querySelectorAll('.input').forEach(input => {
    input.addEventListener('input', () => {
        switch(input.id){
            case 'file-input':
                document.querySelector('.filename').textContent = input.files[0]?.name ? input.files[0]?.name : document.querySelector('.filename').textContent
                break
        }
    })
})