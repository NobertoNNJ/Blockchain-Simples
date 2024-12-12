# Blockchain

Blockchain simples desenvolvida para o desafio proposto durante a trilha de aprendizado do programa de bolsas de Blockchain - Compass.

## Pré-Requisitos

:warning: [Node.js](https://nodejs.org/en/download/)

ou

:warning: [Docker](https://www.docker.com/products/docker-desktop)

## Configuração inicial

Antes de utilizar a aplicação é necessario clonar o repositorio para a maquina local, isso pode ser feito através do comando:

``git clone https://github.com/NobertoNNJ/Blockchain-Simples.git``

Para executa-lo é necessario abri o diretorio em  um terminal

## Executando a aplicação

Após abrir o diretorio no terminal basta executa-lo, ele pode ser executado atraves do node da maquina local, ou pode executa-lo através do Docker.

### Execução com node

No terminal do diretorio utilizar o comando ``node index.js``

_obs: Necessario ter o node instalado._

### execução com Docker

No terminal do diretorio utilizar o comando ``docker build -t blockchain .``, após a exetução utilizar o comando ``docker run blockchain``

_obs: Necessario ter o Docker instalado e aberto._

## Funcionalidades

Esse projeto apenas cria um exemplo simplificado de uma blockchain com algumas transações.

## Explicação do codigo:

### **classe Transactions:** Representa uma transação simples entre 2 usuarios.

### **classe Block:** Representação de um bloco na blockchain com seus dados.

**calculateHash:** Método que gera o hash do bloco, utiliza da biblioteca crypto com o algoritimo sha-256, esse hash é criado com base no hash do bloco anterior, na data de criação e nas transações incluidads no bloco, ele então gera um hash hexadecimal.

**createMerkleTree:** Método de contrução da árvore de Merkle utilizada para garantir a integridade das transações. Ele gera um hash para cada transação, combina os hashes gerados em pares para gerar novos hashes até sobrar apenas 1 que é armazenado no bloco, essa é a raiz da árvore.*obs: caso o numero de hashes seja ímpar o ultimo é duplicado para gerar o novo hash.*

**mineBlock:** Realiza a mineração do bloco, utilizando atualização do nonce para atigir uma certa dificuldade, PoW.

### **classe Address:** Representa um endereço pertencente a um usuario da blockchain.

**isValidAddress:** verifica se o endereço atende certos requisitos e é valido.

**addBalance:** adiciona um valor ao saldo da conta.

**deductBalance:** deduz um valor do saldo da conta.

### **classe Blockchain:** Representa a cadeia de blocos da blockchain, nele que fica a lista de blocos adicionados a blockchain e as transações que serão adicionadas a um bloco.

**createGenesisBlock:** método de criação do bloco genesis da blockchain.

**getLastestBlock:** Retorna o ultimo bloco da blockchain

**addBlock:** Método para adcionar novo bloco a blockchain.

**isValidAddres:** verifica se um enderço é valido para os criterios escolhidos na blockchain.

**updateTransactionHistory:** atualiza o historico de transações, com as transações realizadas, de quem enviou para quem recebeu.

**getTransactionHistory:** retorna o historico de transações de um endereço especifico.

**isChainValid:** método para verificar a integridade da blockchain, verifica se o hash de cada bloco e o hash anterior estão corretos, e a integridade da árvore de Merkle.

### **classe Node:** Simular um peer da rede que possui uma copia da blockchain.

**connectNode:** realiza a conexão entre nodes.

**propagateBlockchain:** Dissemina a blockchain para os demais nodes conectados ao node que chamou a função.

**receiveBlockchain:** recebe a blockchain e verifica se é valida e mais longa que a atual para disseminala ou não para os demis nodes.

**createTransaction:** Adiciona a transação a um novo bloco a ser minerado, e adiciona o bloco a blockchain.