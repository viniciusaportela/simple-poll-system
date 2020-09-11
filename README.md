# signovote

> Candidato: Vinicius de Araújo Portela
>
> Email: vinicius.portela.stm@gmail.com

**Signovote** é apenas um pseudo-nome dado ao projeto

# Pre-requisitos

O projeto foi construido e testado usando as seguintes versões:

> - Mysql: ^5.7 ou MariaDB ^10.5.0
> - Apache 2.4.46
> - PHP 7.2.33
> - Node: ^12.16.3 (React)
> - Ratchet 0.4.3 para Websocket (Composer)

> Usando 'mysql_native_password' como credenciais para acessar ao banco

# Introdução

As tabelas do banco Mysql podem ser encontrados em
`api/database/migrations/`

Atente a mudar as configurações de acesso ao banco de dados mysql em `api/config/config.php`

E mudar também o endereço da API como necessário em `src/constants/index.ts`

Use `composer dump-autoload` se necessário em `api/`

O servidor deve ser inicializado para que as votações em "tempo-real" funcione.

Obs: Dado o limitado tempo, e o meu não tão aprofundado conhecimento em PHP (trabalho mais com NodeJS)
apenas fiz com que os dados sejam verificados e atualizado de tempo em tempo no lado do servidor, e esses
dados sejam enviados para o cliente via websocket

> php server.php

# Front-End

O front-end foi construido com ReactJS e Typescript. Algumas bibliotecas foram utilizadas para auxiliar o desenvolvimento:

### styled-components

Para o uso de CSS-in-JS para aumentar legibilidade e reaproveitamento

### axios

Para realizar as requisições HTTP ao back-end em PHP

### react-calendar

Calendário 'out-of-box' para selecionar as datas das votações

### react-router-dom

Registrar rotas e tratar slugs no site

## Instruções para o Front-End

Para criar a versão de produção, basta executa:

> npm run build

Sob condições normais eu não incluiria o `/build` no projeto mas como se trata de um teste, deixei a pasta pronta para acesso e uso

# Back-End

O back-end foi desenvolvido em PHP com uma estrutura que se assemelha à arquitetura MVC, com as seguintes observações:

1. Views não incluídos, uma vez que os dados são acessados pelo front com React

2. Controllers, Services e Routes são reunidos em uma única pasta separado pela sua função, logo, para qualquer ação relacionadas à votação, será localizada em `/api/v1/polls/**/*`

3. os arquivos `index.php` em `/api/v1/*/index.php` exercem a função de routers, logo, "escutam" e redirecionam para o Controller correto dependendo do método HTTP e de dependendo do caso, do payload

## Routes

Fazem o processamento inicial da requisição e redirecionam esta para o Controller correto ou retornam `erro 404` se não houver nenhum Controller adequado à requisição

## Controllers

Fazem a verificação dos dados com os Validators e chamam o Service adequado

## Services

Realizam a comunicação com o banco de dados

## Validators

Responsáveis por todo o processo de validação da requisição.

As validações em si são feitas pelos ValidatorChains

# API Reference

## Polls

### `GET` /v1/polls/

> Get a list of polls or a specific poll if
> **poll_id** was provided

Example request to get all polls:

```
GET http://localhost/api/v1/polls/
```

Example response to the request above:

```json
{
  "going": [
    {
      "id": "3",
      "title": "Título",
      "date_start": "2020-09-10",
      "date_end": "2020-09-11",
      "votes": "0"
    },
    {
      "id": "4",
      "title": "Teste",
      "date_start": "2020-09-10",
      "date_end": "2020-09-11",
      "votes": "8"
    },
    {
      "id": "10",
      "title": "a",
      "date_start": "2020-09-10",
      "date_end": "2020-09-10",
      "votes": "0"
    }
  ],
  "finished": [
    {
      "id": "9",
      "title": "Outro",
      "date_start": "2020-01-01",
      "date_end": "2020-01-02",
      "votes": "0"
    }
  ],
  "soon": []
}
```

Example request to get a specific polls:

```
GET http://localhost/api/v1/polls/?pollId=3
```

Example response to the request above:

```json
{
  "id": 4,
  "title": "Teste",
  "date_start": "2020-09-10",
  "date_end": "2020-09-11",
  "votes": 9,
  "options": [
    {
      "id": 7,
      "value": "1",
      "votes": 2
    },
    {
      "id": 8,
      "value": "2",
      "votes": 7
    },
    {
      "id": 9,
      "value": "3",
      "votes": 0
    }
  ]
}
```

### `POST` /v1/polls/

> Creates a Poll

example payload:

```json
{
  "title": "title",
  "date_start": "2020/09/10",
  "date_end": "2020/09/11",
  "options": ["option 1", "option 2"]
}
```

Example response:

```json
{
  "id": 31
}
```

### `DELETE` /v1/polls/

> Deletes a certain poll

Example payload:

```json
{
  "title": "title",
  "date_start": "2020-09-10",
  "date_end": "2020-09-11",
  "options": ["option 1", "option 2"]
}
```

### `PUT` /v1/polls/

> Updates a certain poll
>
> The options field is separated in 3 categories:
>
> - add: lista de adições de novas opções
> - edit: lista de edições dos valores de uma opção
> - remove: lista de remoções de opções de uma votação

Example payload:

```json
{
  "poll_id": 10,
  "title": "test",
  "date_start": "2020-10-10",
  "date_end": "2020-10-11",
  "options": {
    "add": ["new option"],
    "edit": [
      {
        "id": 19,
        "value": "I was edited hehe"
      }
    ],
    "remove": [20]
  }
}
```

## Polls-Votes

### `POST` /v1/poll-votes/

> Creates a Poll Vote

example payload:

```json
{
  "option_id": 3
}
```
