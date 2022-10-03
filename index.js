const fetchData = async (link, callback) => {
    const data = await fetch(link)
    const json = await data.json()
    callback(json)
}

fetchData('./getSolvedProposals.php', proposals => {
    const lastProposals = proposals.reverse().map((proposal, proposalId) => proposalId < 4 && proposal).reverse()
    console.log(lastProposals)
    lastProposals.forEach(proposal => {
        const userProposal = document.querySelector('#proposal-template').content.cloneNode(true)
        userProposal.querySelector('.proposal__name').textContent = proposal.name
        userProposal.querySelector('.proposal__time').textContent = proposal.time

        if (proposal.initialImage === '') userProposal.querySelector('.proposal__image').src = proposal.secondImage
        else userProposal.querySelector('.proposal__image').src = proposal.initialImage

        userProposal.querySelector('.proposal__category').textContent = proposal.categoryName

        document.querySelector('.proposals').appendChild(userProposal)
    })

})

fetchData('./getSolvedProposals.php', proposals => {
    const proposalsNumberHTML = document.querySelector('.proposals-number') 
    proposalsNumberHTML.textContent = proposals.length;
    setInterval(() => {
        fetchData('./getSolvedProposals.php', proposals => {
            if (parseInt(proposalsNumberHTML.textContent) !== proposals.length){
                new Audio('//localhost/cityPortal/src/sounds/notify.mp3').play();
                console.log('music')
            }
            proposalsNumberHTML.textContent = proposals.length;
    
        })
    }, 5000)
})

