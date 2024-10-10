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

No terminal do diretorio utilizar o comando ``node index.js``, com isso será exibido no console:

~~~
Iniciando a Blockchain...
Adicionando Transações
Block added: 366296861720357e2f57acfaeeba3896f82005e396f018771aab51d92239daaf
Adicionando Transações
Block added: e3933929adb5be9126de14fef237608cc1e4fff9e7937af3c67c5192bf1baad9
Blockchain valida? true
~~~

_obs: Necessario ter o node instalado._

_obs2: O hash não será igual o mostrado acima_

### execução com Docker

No terminal do diretorio utilizar o comando ``docker build -t blockchain .``, após a exetução utilizar o comando ``docker run blockchain``, com isso será exibido no console:

~~~
Iniciando a Blockchain...
Adicionando Transações
Block added: 366296861720357e2f57acfaeeba3896f82005e396f018771aab51d92239daaf
Adicionando Transações
Block added: e3933929adb5be9126de14fef237608cc1e4fff9e7937af3c67c5192bf1baad9
Blockchain valida? true
~~~

_obs: Necessario ter o Docker instalado e aberto._

_obs2: O hash não será igual o mostrado acima_

## Funcionalidades

Esse projeto apenas cria um exemplo simplificado de uma blockchain com algumas transações.

## Explicação do codigo:

**classe Transactions:** Representa uma transação simples entre 2 usuarios.

**classe Block:** Representação de um bloco na blockchain com seus dados.

**calculateHash:** Método que gera o hash do bloco, utiliza da biblioteca crypto com o algoritimo sha-256, esse hash é criado com base no hash do bloco anterior, na data de criação e nas transações incluidads no bloco, ele então gera um hash hexadecimal.

**createMerkleTree:** Método de contrução da árvore de Merkle utilizada para garantir a integridade das transações. Ele gera um hash para cada transação, combina os hashes gerados em pares para gerar novos hashes até sobrar apenas 1 que é armazenado no bloco, essa é a raiz da árvore.*obs: caso o numero de hashes seja ímpar o ultimo é duplicado para gerar o novo hash.*

**classe Blockchain:** Representa a cadeia de blocos da blockchain, nele que fica a lista de blocos adicionados a blockchain e as transações que serão adicionadas a um bloco.

**createGenesisBlock:** método de criação do bloco genesis da blockchain.

**getLastestBlock:** Retorna o ultimo bloco da blockchain

**addBlock:** Método para adcionar novo bloco a blockchain.

**createTransaction:** Adiciona transação a lista de transações a serem adcionadas no bloco.

**addPendingTransaction:** método que adciona as transações pendentes a um novo bloco, e adciina o bloco a blockchain.

**isChainValid:** método para verificar a integridade da blockchain, verifica se o hash de cada bloco e o hash anterior estão corretos, e a integridade da árvore de Merkle.