const fetchData = async (link, callback) => {
    const data = await fetch(link)
    const json = await data.json()
    callback(json)
}

fetchData('./getSolvedProposals.php', proposals => {
    document.querySelector('.loading-wrapper').classList.add('loading--hidden')
    const proposalsNumberHTML = document.querySelector('.proposals-number') 
    proposalsNumberHTML.textContent = proposals.length;
    setInterval(() => {
        fetchData('./getSolvedProposals.php', proposals => {
            if (parseInt(proposalsNumberHTML.textContent) !== proposals.length){
                new Audio('//localhost/cityPortal/src/sounds/notify.mp3').play();
            }
            proposalsNumberHTML.textContent = proposals.length;
    
        })
    }, 5000)


    const lastProposals = proposals.reverse().map((proposal, proposalId) => proposalId < 4 && proposal).reverse()
    lastProposals.forEach(proposal => {
        const userProposal = document.querySelector('#proposal-template').content.cloneNode(true)
        userProposal.querySelector('.proposal__name').textContent = proposal.name
        userProposal.querySelector('.proposal__time').textContent = proposal.time


        const proposalImage = userProposal.querySelector('.proposal__image')
        const proposalAfterImage = userProposal.querySelector('.proposal__after-image')
        proposalImage.src = proposal.secondImage
        proposalAfterImage.src = proposal.initialImage

        proposalImage.addEventListener('mouseover', () => {
            proposalAfterImage.classList.add("proposal__after-image--open")
        })

        proposalAfterImage.addEventListener('mouseout', () => {
            proposalAfterImage.classList.remove("proposal__after-image--open")
        })

        userProposal.querySelector('.proposal__category').textContent = proposal.categoryName

        document.querySelector('.proposals').appendChild(userProposal)
    })

})

