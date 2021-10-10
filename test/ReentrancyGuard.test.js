
const ReentrancyGuard = artifacts.require('ReentrancyGuard')


const truffleAssert = require('truffle-assertions')
let reentrancyGuard,  deployer, addr1, addr2, addr3, addr4

const { default: Web3 } = require('web3')
const { fromWei, toWei } = require('../utils/conversion')

contract('ReentrancyGuard', async payloadAccounts => {

  deployer = payloadAccounts[0]
  addr1 = payloadAccounts[1]
  addr2 = payloadAccounts[2]
  addr3 = payloadAccounts[3]
  addr4 = payloadAccounts[4]


  beforeEach(async() => {
    reentrancyGuard = await ReentrancyGuard.deployed()
  })


  contract('Deposit', () => {
    it('Reverts a given account\'s attempt to deposit ether in less than 15mins after previous deposit', async () => {
      const reentrancyGuardAddress = reentrancyGuard.address
      const reentrancyBalanceBefore = await web3.eth.getBalance(reentrancyGuardAddress)
      console.log({'reentrancy ETH balance before': reentrancyBalanceBefore})  
      
      const depositAmount = toWei(1)
      await reentrancyGuard.deposit({value: depositAmount, from: addr1})

    
      const reentrancyBalanceAfter1 = await web3.eth.getBalance(reentrancyGuardAddress)
      console.log({'reentrancy ETH balance before': reentrancyBalanceAfter1})  
      
      assert.equal(fromWei(reentrancyBalanceAfter1), fromWei(depositAmount))

   
      const REVERT_MSG = 'Returned error: VM Exception while processing transaction: revert rate limiting in effect -- Reason given: rate limiting in effect'
     
      try {
        await reentrancyGuard.deposit({value: depositAmount, from: addr1})
        throw null
      } catch(err) {
        console.log('revert message here', REVERT_MSG)
        assert(err.message.startsWith(REVERT_MSG), `Expected ${REVERT_MSG} but got ${err.message} instead`)
      }
     
    })

  
  })

})