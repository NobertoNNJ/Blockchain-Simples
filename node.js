const Address = require('./address');
const Block = require('./block');

class Node{
    constructor(id, blockchain){
        this.id = id;
        this.blockchain = blockchain;
        this.nodes = [];
        this.receivedBlockchains = new Set();
    }
    connectNode(node){
        this.nodes.push(node);
        console.log(`Nó ${this.id} conectado ao nó ${node.id}`);
    }
    propagateBlockchain() {
        const blockchainHash = this.blockchain.getLastestBlock().hash;
        if (this.receivedBlockchains.has(blockchainHash)) return;

        console.log(`Nó ${this.id} propagando blockchain para nós conectados...`);
        this.receivedBlockchains.add(blockchainHash);

        this.nodes.forEach(node => node.receiveBlockchain(this.blockchain));
    }
    receiveBlockchain(blockchain) {
        if (blockchain.chain.length > this.blockchain.chain.length && blockchain.isChainValid()) {
            console.log(`Nó ${this.id} atualizando para a nova blockchain recebida.`);
            this.blockchain = blockchain;
            this.propagateBlockchain();
        } else {
            console.log(`Nó ${this.id} rejeitou a blockchain recebida.`);
        }
    }
    createTransaction(transaction) {
        if (Address.isValidAddress(transaction.fromUser) && Address.isValidAddress(transaction.toUser)) {
            if (!this.blockchain.addresses[transaction.fromUser]) this.blockchain.addresses[transaction.fromUser] = new Address(transaction.fromUser);
            if (!this.blockchain.addresses[transaction.toUser]) this.blockchain.addresses[transaction.toUser] = new Address(transaction.toUser);

            if (this.blockchain.addresses[transaction.fromUser].balance >= transaction.value + transaction.gas) {
                let block = new Block(Date.now(), [transaction], this.blockchain.getLastestBlock().hash, this.blockchain.difficulty);
                this.blockchain.addBlock(block);

                this.propagateBlockchain();

                console.log('\nTransação adicionada');
            } else {
                console.log('Saldo insuficiente para realizar a transação.');
            }
        } else {
            console.log('Transação inválida, verifique os endereços.');
        }
    }
}

module.exports = Node;