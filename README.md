
## Documentação da API Condominio Green Park

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