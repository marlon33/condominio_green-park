
## Condominio Green Park

# Desafio Técnico Backend NodeJS

Esse repo e publico mas foi construido com o intuido de participar de um processo seletivo da Green Acesso



## Ferramentas Utilizadas

- VSCODE
- Postman


## Tecnologias Utilizadas

- TypeScript
- TypeORM


## Iniciando
Clone esse repositorio:
Rode esses comandos

```bash
cd teste_green_acesso

npm install

npm db:migrate

mkdir uploads
mkdir uploads/csv
mkdir uploads/pdf

npm run dev:server
## Para desenvolvimento

npm start
## Para produção

```


## Documentação da API

#### Upload CSV

```http
  POST /boletos/csv
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `file_upload` | `file` | **Obrigatório**. Arquivo csv |

#### Upload PDF
```
POST /boletos/pdf
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `file_upload` | `file` | **Obrigatório**. Arquivo pdf |

#### Filtros
```
GET /boletos
```

| Parâmetro   | Tipo       |
| :---------- | :--------- |
| `nome` | `string` | 
| `valor_inicial` | `number` |
| `valor_final` | `number` |
| `id_lote` | `number` | 
| `relatorio` | `number` | 

Retorna os dados conforme os Filtros, se ```relatorio=1``` retorna um objeto de um pdf em ```base64```
```
[
    {
        "base64": "JVBERi0xLjMKJf////........"
    }
]

````