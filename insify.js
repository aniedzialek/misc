const claims = [
  {id: 0, amount: 1},
  {id: 1, amount: 2},
  {id: 2, amount: 200},
]

const insurers = [
  {id: 'A', budget: 100},
  {id: 'B', budget: 20},
  {id: 'C', budget: 0},
  {id: 'D', budget: 5},
  {id: 'E', budget: 59},
  {id: 'F', budget: 300},
]

function payClaims(claims, insurers) {
  const paidOutClaims = {}
  payClaim([...claims], [...insurers], paidOutClaims)
  return paidOutClaims
}

function payClaim(claims, insurers, paidOutClaims) {
  if (!claims.length || !insurers.length) return
  
  if (insurers[0].budget === 0) insurers.shift()

  const claim = claims[0]
  const insurer = insurers[0]

  const currentBudget = insurer.budget - claim.amount
  const claimId = claim.id

  if (currentBudget < 0) {
    const paidOutAmount = claim.amount + currentBudget
    paidOutClaims[claimId] = {
      insurers: [
        ...((paidOutClaims[claimId] && paidOutClaims[claimId].insurers) || []),
        {id: insurer.id, paidOutAmount, payOutComplete: false},
      ],
    }
    claim.amount = claim.amount - paidOutAmount
    insurers.shift()
  } else {
    insurer.budget = currentBudget
    paidOutClaims[claimId] = {
      insurers: [
        ...((paidOutClaims[claimId] && paidOutClaims[claimId].insurers) || []),
        {id: insurer.id, paidOutAmount: claim.amount, payOutComplete: true},
      ],
    }
    claims.shift()
  }

  if (claims.length) payClaim(claims, insurers, paidOutClaims)
}

console.log(payClaims(claims, insurers))
