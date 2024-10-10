const crypto = require('crypto');

class Transaction{
    constructor(fromUser, toUser, value){
        this.fromUser = fromUser;
        this.toUser = toUser;
        this.value = value;
    };
};

class Block{
    constructor(timestamp, transactions, previousHash = ''){
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.hash = this.calculatorHash();
        this.merkleTree = this.createMerkleTree();
    };

    calculatorHash(){
        return crypto.createHash('sha256').update(this.previousHash + this.timestamp + JSON.stringify(this.transactions)).digest('hex');
    }

    createMerkleTree(){
        let hashes = this.transactions.map(tx => crypto.createHash('sha256').update(JSON.stringify(tx)).digest('hex'));

        while (hashes.length > 1){
            if (hashes.length % 2 !== 0) hashes.push(hashes[hashes.length - 1]);

            let newHashes = [];

            for (let i = 0; i < hashes.length; i += 2){
                newHashes.push(crypto.createHash('sha256').update(hashes[i] + hashes[i + 1]).digest('hex'));
            }

            hashes = newHashes;
        }
        return hashes[0];
    }
}
class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.pendingTransactions = [];
    }

    createGenesisBlock(){
        return new Block(Date.now(), [], '0');
    }

    getLastestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLastestBlock().hash;
        newBlock.hash = newBlock.calculatorHash();
        this.chain.push(newBlock);
    }

    createTransaction(transaction){
        this.pendingTransactions.push(transaction);
    }

    addPendingTransaction(){
        let block = new Block(Date.now(), this.pendingTransactions, this.getLastestBlock().hash);
        this.addBlock(block);
        this.pendingTransactions = [];
        console.log(`Block added: ${block.hash}`);
    }

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
console.log('Iniciando a Blockchain...');
let gamesCoin = new Blockchain();


gamesCoin.createTransaction(new Transaction('Wandreus', 'Noberto', 100));


console.log('Adicionando Transações');
gamesCoin.addPendingTransaction();

gamesCoin.createTransaction(new Transaction('Noberto', 'Wandreus', 10));

console.log('Adicionando Transações');
gamesCoin.addPendingTransaction();

console.log(`Blockchain valida? ${gamesCoin.isChainValid()}`);