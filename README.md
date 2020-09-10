# signovote

> Candidato: Vinicius de Araújo Portela

**Signovote** é apenas um pseudo-nome dado ao projeto

# Pre-requisitos

O projeto foi construido e testado usando as seguintes versões:

> Mysql: ^5.7 ou MariaDB ^10.5.0
> Apache 2.4.46
> PHP 7.2.33
> Node: ^12.16.3 (React)

> Usando 'mysql_native_password' como credenciais para acessar ao banco

# Introdução

Tabelas do Banco em api/database/migrations/
...

# Front-End

...

# Back-End

...

# API Reference

## Polls

POST /v1/polls/

> Creates a Poll

example payload:

```json
{
  {
	"title": "title",
	"date_start": "2020/09/10",
	"date_end": "2020/09/11",
	"options": [
		"option 1",
		"option 2",
	]
}
}
```

example response:

```json
{
  "id": 31
}
```
