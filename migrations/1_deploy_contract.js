const ReentrancyGuard = artifacts.require('ReentrancyGuard')
 
module.exports = async deployer => {
  try {
    await deployer.deploy(ReentrancyGuard)
    const reentrancy = await ReentrancyGuard.deployed()
    console.log({'deployed address here': reentrancy.address})
    
  } catch(err) {
    console.log(err)
  }
}