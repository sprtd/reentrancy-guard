// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import '@openzeppelin/contracts/utils/math/SafeMath.sol';


contract ReentrancyGuard {
  using SafeMath for uint256;

  event LogDeposit(address indexed sender, uint amount);


  mapping(address => uint256) private _timeEnabled;
  mapping(address => uint256) public sales;

  modifier rateLimiter(uint _time) {
    require(_timeEnabled[msg.sender].add(_time) < block.timestamp, 'rate limiting in effect');
    _timeEnabled[msg.sender] = block.timestamp;
    _;
  }
  

  function deposit() external payable rateLimiter(5 minutes) {
    require(msg.value > 0 ether, 'deposit cannot be 0');
    sales[msg.sender] = sales[msg.sender].add(msg.value);
    emit LogDeposit(msg.sender, msg.value);
  }
 


  function getBal() public view returns(uint) {
    return address(this).balance;
  }

}
