let contract
let tronWebApi

window.addEventListener('load', async function () {
  try {
    const contractAddress = contractConfig.contractAddress
    tronWebApi = window.tronWeb

    contract = await tronWebApi.contract().at(contractAddress)
    const candidateCount = (await contract.candidatecount().call()).toNumber()
    const candidates = []
    for (let i = 0; i < candidateCount; i++) {
      const candidate = await getCandidate(contract, i)
      candidates.push(candidate)
    }
    console.log(candidateCount)
    console.log(candidates)
    loadTableWithCandidates(candidates)
  } catch (e) {
    console.error(e)
    // Deal with the fact the chain failed
  }
});

document.addEventListener(
  'click',
  async function (event) {
    // If the clicked element doesn't have the right selector, bail
    if (!event.target.matches('.vote-candidate')) return

    // Don't follow the link
    event.preventDefault()

    // Log the clicked element in the console
    const candidateId = event.target.getAttribute('data-candidate')
    console.log(event.target)
    const txId = await contract.methods.vote(candidateId).send()
    let res = await tronWebApi.trx.getTransactionInfo(txId)
    while (!res.result) {
      res = await tronWebApi.trx.getTransactionInfo(txId)
    }
    console.log(res)
  },
  false,
);

async function getCandidate (contract, candidateId) {
  const callResult = await contract.candidates(candidateId).call()
  console.log(callResult)
  return {
    id: callResult.id.toNumber(),
    name: tronWebApi.toUtf8(callResult.name).trim(),
    voteCount: callResult.voteCount.toNumber(),
  }
}

function loadTableWithCandidates (candidates) {
  const table = document.querySelector('#candidates')
  for (const element of candidates) {
    const row = table.insertRow()
    for (const key in element) {
      const cell = row.insertCell()
      const text = document.createTextNode(element[key])
      cell.appendChild(text)
    }
    const cell = row.insertCell()
    const a = document.createElement('a')
    a.innerText = 'Vote'
    a.setAttribute('data-candidate', element.id)
    a.setAttribute('class', 'button vote-candidate')
    cell.appendChild(a)
  }
}
