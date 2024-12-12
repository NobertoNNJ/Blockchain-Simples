const Address = require('./address');
const Block = require('./block');

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 3;
        this.transactionHistory = {};
        this.addresses = {};
        this.miningReward = 10;
    }

    createGenesisBlock(){
        return new Block(Date.now(), [], '0', this.difficulty);
    }


    getLastestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){

        const miners = Object.keys(this.addresses);
        const minerAddress = miners[Math.floor(Math.random() * miners.length)];
        
        newBlock.previousHash = this.getLastestBlock().hash;
        newBlock.mineBlock(minerAddress);
        this.chain.push(newBlock);

        let totalFee = 0;
        newBlock.transactions.forEach(transaction => {
            this.processTransaction(transaction);
            totalFee += transaction.gas
        });
        if (!this.addresses[minerAddress]) this.addresses[minerAddress] = new Address(minerAddress);
        this.addresses[minerAddress].addBalance(this.miningReward + totalFee);

        console.log(`\nRecompensa de mineração (${this.miningReward}) e taxas (${totalFee}) adicionadas ao minerador ${minerAddress}.`);
    }
    processTransaction(transaction) {
        this.addresses[transaction.fromUser].deductBalance(transaction.value);
        this.addresses[transaction.toUser].addBalance(transaction.value);

        if (!this.transactionHistory[transaction.fromUser]) {
            this.transactionHistory[transaction.fromUser] = { sent: [], received: [] };
        }
        if (!this.transactionHistory[transaction.toUser]) {
            this.transactionHistory[transaction.toUser] = { sent: [], received: [] };
        }

        this.transactionHistory[transaction.fromUser].sent.push(transaction);
        this.transactionHistory[transaction.toUser].received.push(transaction);
    }

    getTransactionHistory(address){
        return this.transactionHistory[address] ||{ sent: [], received: []};
    };

    isChainValid(){
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[ i -1];
            
            if(currentBlock.hash !== currentBlock.calculatorHash()){
                return false;
            }
            if (currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
            if (currentBlock.merkleTree !== currentBlock.createMerkleTree()){
                return false;
            }
        }
        return true;
    }
}

module.exports = Blockchain;