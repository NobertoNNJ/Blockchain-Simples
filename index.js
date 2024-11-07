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
        this.hash = '';
        this.merkleTree = this.createMerkleTree();
        this.nonce = 0;
        this.difficulty = 3;
    };

    calculatorHash(){
        return crypto.createHash('sha256').update(this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce).digest('hex');
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
    mineBlock(){
        while(this.hash.substring(0, this.difficulty) != Array(this.difficulty + 1).join('0')){
            this.nonce++;
            this.hash = this.calculatorHash()
        }
        console.log(`Bloco minerado com o hash: ${this.hash} e com o nonce: ${this.nonce}.`);
    }
}
class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 3;
        this.transactionHistory = {};
    }

    createGenesisBlock(){
        return new Block(Date.now(), [], '0', this.difficulty);
    }

    getLastestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLastestBlock().hash;
        newBlock.mineBlock();
        this.chain.push(newBlock);
        
        newBlock.transactions.forEach(transaction => this.updateTransactionHistory(transaction));
    }

    createTransaction(transaction){
        if(this.isValidAddress(transaction.fromUser) && this.isValidAddress(transaction.toUser)){

            let block = new Block(Date.now(), [transaction], this.getLastestBlock().hash, this.difficulty);
            this.addBlock(block);
            
            console.log('\nTransação adicionada');
        }else{
            console.log('Transação invalida, verifique os endereços.')
        }
    }

    isValidAddress(address){
        const regex = /^7f5[a-fA-F0-9]{7}$/;
        return regex.test(address);
    }
    
    updateTransactionHistory(transaction){
        if(!this.transactionHistory[transaction.fromUser]){
            this.transactionHistory[transaction.fromUser] = { sent: [], received: []};
        }
        if(!this.transactionHistory[transaction.toUser]){
            this.transactionHistory[transaction.toUser] = { sent: [], received: []};
        }

        this.transactionHistory[transaction.fromUser].sent.push(transaction);
        this.transactionHistory[transaction.toUser].received.push(transaction);
    }

    getTransactionHistory(address){
        return this.transactionHistory[address] ||{ sent: [], received: []};
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


console.log('\nAdicionando Transações');

gamesCoin.createTransaction(new Transaction('7f5a1b2c3d', '7f59f8e7d6', 100));

console.log('\nAdicionando Transações');

gamesCoin.createTransaction(new Transaction('7f59f8e7d6', '7f5a1b2c3d', 10));

console.log(`\nBlockchain valida? ${gamesCoin.isChainValid()}`);

console.log("\nHistórico de transações do endereço '7f59f8e7d6':", gamesCoin.getTransactionHistory('7f59f8e7d6'));