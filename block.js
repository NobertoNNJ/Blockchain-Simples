const crypto = require('crypto');

class Block{
    constructor(timestamp, transactions, previousHash = '', miner =''){
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.hash = '';
        this.miner = miner;
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
    mineBlock(minerAddress){
        this.miner = minerAddress;

        while(this.hash.substring(0, this.difficulty) != Array(this.difficulty + 1).join('0')){
            this.nonce++;
            this.hash = this.calculatorHash()
        }
        console.log(`Bloco minerado com o hash: ${this.hash} e com o nonce: ${this.nonce}, pelo endereço ${this.miner}`);
    }
}

module.exports = Block;