const Transaction =require('./transaction');
const Address = require('./address');
const Blockchain = require('./blockchain');
const Node = require('./node');


console.log('Iniciando a Blockchain...');
let gamesCoin = new Blockchain();

let node1 = new Node('node1', gamesCoin);
let node2 = new Node('node2', new Blockchain());
let node3 = new Node('node3', new Blockchain());
let node4 = new Node('node4', new Blockchain());

node1.connectNode(node2);
node2.connectNode(node3);
node3.connectNode(node4);

node1.blockchain.addresses['7f5a1b2c3d'] = new Address('7f5a1b2c3d');
node1.blockchain.addresses['7f59f8e7d6'] = new Address('7f59f8e7d6');

node1.blockchain.addresses['7f5a1b2c3d'].addBalance(100);

console.log('\nAdicionando Transações');
node1.createTransaction(new Transaction('7f5a1b2c3d', '7f59f8e7d6', 50, 5));
node1.createTransaction(new Transaction('7f5a1b2c3d', '7f59f8e7d6', 10, 5));

console.log(`\nBlockchain válida? ${node1.blockchain.isChainValid()}`);

console.log("\nHistórico de transações do endereço '7f59f8e7d6':", node1.blockchain.getTransactionHistory('7f59f8e7d6'));

console.log("\nSaldo final do endereço '7f59f8e7d6':", node1.blockchain.addresses['7f59f8e7d6'].balance);

console.log("\n Node 4 saldo final do endereço '7f59f8e7d6':", node4.blockchain.addresses['7f59f8e7d6']?.balance || 0);
console.log("\n Node 3 saldo final do endereço '7f59f8e7d6':", node3.blockchain.addresses['7f59f8e7d6']?.balance || 0);

//console.log(node1.blockchain)