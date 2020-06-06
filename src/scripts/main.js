let contract
let tronWebApi
let loggedIn = false
/**
 * Fetches candidates from contract and formats output
 * @param {Contract} contract
 * @param {int} candidateId
 */
async function getCandidate (contract, candidateId) {
  const callResult = await contract.candidates(candidateId).call()
  return {
    id: callResult.id.toNumber(),
    name: tronWebApi.toUtf8(callResult.name).trim(),
    voteCount: callResult.voteCount.toNumber(),
  }
}

/**
 * Adds displats candidates array
 * @param {Array<{}>} candidates
 */
function loadTableWithCandidates (candidates) {
  const table = document.querySelector('#candidates')
  for (const element of candidates) {
    const row = table.insertRow()
    for (const key in element) {
      const cell = row.insertCell()
      const text = document.createTextNode(element[key])
      cell.appendChild(text)
      if (key === 'voteCount') {
        cell.setAttribute('data-candidate', element.id)
        cell.setAttribute('class', 'vote-count')
      }
    }
    const cell = row.insertCell()
    const a = document.createElement('a')
    a.innerText = 'Vote'
    a.setAttribute('data-candidate', element.id)
    a.setAttribute('class', 'button vote-candidate')
    cell.appendChild(a)
  }
}

/**
 * Checks if tronlink is enabled and loads contract
 */
async function tronWebInit () {
  if (window.tronWeb) {
    // TronLink installed
    tronWebApi = window.tronWeb
    loggedIn = true
  } else {
    tronWebApi = new TronWeb({
      fullHost: contractConfig.fullHost,
      privateKey: contractConfig.privateKey,
    })
  }
  contract = await tronWebApi.contract().at(contractConfig.contractAddress)
  toPromise = tronWeb.injectPromise
}

window.addEventListener('load', async function () {
  try {
    await tronWebInit()
    const candidateCount = (await contract.candidatecount().call()).toNumber()
    const candidates = []
    for (let i = 0; i < candidateCount; i++) {
      const candidate = await getCandidate(contract, i)
      candidates.push(candidate)
    }
    loadTableWithCandidates(candidates)
  } catch (e) {
    console.error(e)
  }
})

document.addEventListener(
  'click',
  async function (event) {
    // If the clicked element doesn't have the right selector, bail
    if (!event.target.matches('.vote-candidate')) return
    if (!loggedIn) {
      alert('You need tronLink instaled to vote')
      return
    }

    event.preventDefault()

    const candidateId = event.target.getAttribute('data-candidate')
    try {
      // Call SmartContracts map to check if voted
      const didVote = await contract
        .voter(tronWebApi.defaultAddress.base58)
        .call()
      if (didVote) {
        alert('You can only vote once')
        return
      }
      // Send transaction to the blockchain
      await contract.methods
        .vote(candidateId)
        .send({ shouldPollResponse: true })
      // Increase display count
      document.querySelector('td[data-candidate="' + candidateId + '"]')
        .innerText++
    } catch (e) {
      console.error(e)
    }
  },
  false,
)
