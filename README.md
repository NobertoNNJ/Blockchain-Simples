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