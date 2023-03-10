// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.18;

contract DRaffle {

    event Winner(uint blockHeight, address winner, uint256 amount);
    event NoWinner(uint blockHeight);
    event Scheduled(uint blockHeight);

    uint256 costPerLotto;
    uint256 drawCutoff;
    uint256 nextLottoBlockHeight;
    uint256 triggerReward;
    address[] candidates;
    uint256 nonsense; // using this to conveniently mine blocks while testing :)

    constructor(uint256 roundCutoff, uint256 cost, uint256 reward) {
        costPerLotto = cost;
        drawCutoff = roundCutoff;
        triggerReward = reward;
        nonsense = 0;

        scheduleNext();
    }

    function enter() external payable {
        require(msg.value == costPerLotto, "you have passed too much or too little money to enter the lotto");
        require(block.number < nextLottoBlockHeight - drawCutoff, "It's too close to the next draw to participate");
        candidates.push(msg.sender);
    }

    function draw() external payable {
        require(block.number >= nextLottoBlockHeight, "it's too early to trigger the draw!");
        uint numberOfEntries = candidates.length;
        if (numberOfEntries == 0) {
            emit NoWinner(block.number);
        } else {
            address winner = candidates[block.prevrandao % numberOfEntries];
            uint256 amount = numberOfEntries * costPerLotto - triggerReward;

            payable(winner).transfer(amount);
            payable(msg.sender).transfer(triggerReward);

            emit Winner(block.number, winner, amount);
        }

        scheduleNext();
    }

    function doNonsense() external {
        nonsense = nonsense + 1;
    }

    function nextDraw() public view returns (uint) {
        return nextLottoBlockHeight;
    }

    function scheduleNext() internal {
        candidates = new address[](0);
        nextLottoBlockHeight = block.number + 10;
        emit Scheduled(nextLottoBlockHeight);
    }
}
