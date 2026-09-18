# System OS — Backend

API REST do **System OS**, destinada ao cadastro de clientes, produtos e formas de pagamento, além da gestão de ordens de serviço, seus itens e parcelas. A aplicação é escrita em TypeScript, executada sobre Express e persiste os dados em PostgreSQL.

> Este documento descreve o estado atual da implementação. As tabelas do banco devem existir previamente; o repositório não contém migrations ou DDL.

## Tecnologias

| Camada | Tecnologia |
| --- | --- |
| Runtime | Node.js |
| Linguagem | TypeScript |
| HTTP | Express 5 |
| Banco de dados | PostgreSQL, via `pg` |
| Validação | Zod |
| Desenvolvimento | `tsx` |
| Segurança disponível | `bcryptjs` e `jsonwebtoken` (ainda não integrados ao fluxo) |

## Arquitetura

```text
src/
├── config/          # Pool e teste de conexão PostgreSQL
├── middlewares/     # Validação, tratamento de erros e autenticação
├── modules/         # Controladores HTTP por domínio
├── routes/          # Definição dos endpoints
├── schemas/         # Contratos Zod para os corpos das requisições
├── services/        # Regras de negócio e consultas SQL parametrizadas
├── types/           # Interfaces TypeScript
├── app.ts           # Configuração do Express e montagem das rotas
└── server.ts        # Inicialização após teste de conexão com o banco
```

O fluxo de cada requisição segue `rota → validação → controlador → serviço → PostgreSQL`. As consultas usam parâmetros do `pg`, reduzindo o risco de injeção de SQL.

## Pré-requisitos

- Node.js 20 LTS ou superior
- npm 10 ou superior
- PostgreSQL acessível pela máquina que executará a API
- Um banco com as tabelas usadas pela aplicação: `CADCLIENTE`, `CADPRODUTO`, `CADFORMAPAGAMENTO`, `CADMOVIMENTOOS`, `CADMOVIMENTOITEMSOS`, `CADMOVIMENTOPARCELAOS` e, para o módulo não exposto, `CADUSUARIO`

## Configuração e execução

No diretório `backend`, instale as dependências:

```bash
npm install
```

Crie um arquivo `.env` no mesmo diretório, usando o exemplo abaixo. Não versione credenciais reais.

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=sua_senha
DB_NAME=system_os
```

Inicie em desenvolvimento:

```bash
npm run dev
```

Para gerar e executar a versão compilada:

```bash
npm run build
npm start
```

Ao iniciar, o servidor executa `SELECT 1` antes de abrir a porta. Assim, uma configuração de banco inválida impede que a API fique disponível parcialmente.

## API

Base URL local: `http://localhost:3000/api`

Todos os `POST` e `PUT` recebem JSON e devem usar `Content-Type: application/json`. As validações inválidas retornam `400` no formato:

```json
{
  "erro": "Dados inválidos",
  "detalhes": []
}
```

### Clientes

| Método | Rota | Descrição |
| --- | --- | --- |
| `POST` | `/clientes` | Cria um cliente. |
| `GET` | `/clientes?nomeCliente=ana` | Lista clientes e permite filtrar por nome. |

```json
{
  "nomeCliente": "Ana Silva",
  "cpfCnpj": "12345678901",
  "fone": "85999999999",
  "email": "ana@exemplo.com",
  "endereco": "Rua das Flores",
  "bairro": "Centro",
  "numero": "100",
  "cep": "60000000",
  "cidade": "Fortaleza",
  "estado": "CE"
}
```

### Produtos

| Método | Rota | Descrição |
| --- | --- | --- |
| `POST` | `/produtos` | Cria um produto. |
| `GET` | `/produtos?nomeProduto=filtro` | Lista produtos e permite filtrar por nome. |

```json
{
  "nomeProduto": "Filtro de óleo",
  "preco": "45.90",
  "estoque": "12",
  "unidade": "UN"
}
```

### Formas de pagamento

| Método | Rota | Descrição |
| --- | --- | --- |
| `POST` | `/pagamentos` | Cadastra uma forma de pagamento. |
| `GET` | `/pagamentos?descricao=cartão` | Lista formas de pagamento ativas e permite filtrar por descrição. |

```json
{
  "descricao": "Cartão de crédito",
  "status": "ATIVO"
}
```

### Ordens de serviço

| Método | Rota | Descrição |
| --- | --- | --- |
| `POST` | `/ordens-servico` | Cria uma OS. |
| `GET` | `/ordens-servico` | Lista as OS, da mais recente para a mais antiga. |
| `GET` | `/ordens-servico/:codigoMovimentoOS` | Obtém uma OS pelo código. |
| `PUT` | `/ordens-servico/:codigoMovimentoOS` | Atualiza uma OS. |
| `DELETE` | `/ordens-servico/:codigoMovimentoOS` | Exclui uma OS. |

```json
{
  "ordemMovimentoOS": "OS-2026-001",
  "codigoCliente": 1,
  "dataAbertura": "2026-09-18T10:00:00.000Z",
  "dataFechamento": null,
  "status": "ABERTA",
  "observacao": "Avaliar ruído no motor",
  "total": 0
}
```

Valores aceitos para `status`: `ABERTA`, `EM_ANDAMENTO`, `AGUARDANDO_PECAS`, `AGUARDANDO_CLIENTE`, `FINALIZADA` e `CANCELADA`.

### Itens de ordem de serviço

| Método | Rota | Descrição |
| --- | --- | --- |
| `POST` | `/itens-os` | Adiciona um item a uma OS. |
| `GET` | `/itens-os/os/:codigoMovimentoOS` | Lista itens de uma OS. |
| `GET` | `/itens-os/:codigoItemOS` | Obtém um item. |
| `PUT` | `/itens-os/:codigoItemOS` | Atualiza um item. |
| `DELETE` | `/itens-os/:codigoItemOS` | Exclui um item. |

```json
{
  "codigoMovimentoOS": 1,
  "codigoProduto": 10,
  "descricao": "Troca de filtro de óleo",
  "quantidade": 1,
  "valorUnitario": 45.9,
  "valorTotal": 45.9
}
```

O campo `valorTotal` é exigido pelo schema, mas o serviço recalcula o valor a partir de `quantidade × valorUnitario` antes de persistir.

### Parcelas de ordem de serviço

| Método | Rota | Descrição |
| --- | --- | --- |
| `POST` | `/parcelas-os` | Cria uma parcela. |
| `GET` | `/parcelas-os/os/:codigoMovimentoOS` | Lista parcelas de uma OS. |
| `GET` | `/parcelas-os/:codigoParcelaOS` | Obtém uma parcela. |
| `PUT` | `/parcelas-os/:codigoParcelaOS` | Atualiza uma parcela. |
| `DELETE` | `/parcelas-os/:codigoParcelaOS` | Exclui uma parcela. |

```json
{
  "codigoMovimentoOS": 1,
  "codigoFormaPagamento": 1,
  "numeroParcela": 1,
  "valor": 150.5,
  "dataVencimento": "2026-10-18T00:00:00.000Z",
  "dataPagamento": null,
  "status": "PENDENTE",
  "observacao": null
}
```

Valores aceitos para `status`: `PENDENTE`, `PAGO`, `ATRASADO` e `CANCELADO`. A forma de pagamento referenciada precisa estar ativa no banco (`STATUS = 'ATIVO'`).

## Respostas e erros

- `201 Created`: criação bem-sucedida.
- `200 OK`: consulta ou atualização bem-sucedida.
- `204 No Content`: exclusão bem-sucedida.
- `400 Bad Request`: corpo incompatível com o schema Zod.
- `404 Not Found`: apenas OS e cliente são convertidos explicitamente para 404 pelo middleware atual.
- `409 Conflict`: CPF/CNPJ, descrição de pagamento, nome de produto, usuário ou número de OS duplicados, conforme os casos tratados.
- `500 Internal Server Error`: falhas não mapeadas.

## Autenticação

Existe um middleware `autenticar`, que exige o cabeçalho `Authorization: Bearer <token>`, mas ele não está associado às rotas e não valida a assinatura do JWT. Portanto, **os endpoints atualmente são públicos**. Antes de publicar a API, implemente login, validação efetiva do token e aplique o middleware às rotas que exigirem acesso autenticado.

## Estado atual e pontos de atenção

- Os módulos de usuários existem, porém `users.router.ts` não é montado em `app.ts`; não há endpoint de usuários exposto pela aplicação.
- Os `INSERT` e `UPDATE` não usam `RETURNING`; por isso, as rotas de criação/atualização podem responder sem o registro criado/alterado, embora a operação tenha sido executada no banco.
- Não há testes automatizados, endpoint de health check, migrations nem documentação OpenAPI no estado atual.

## Próximos passos recomendados

1. Adicionar CI com `npm run build` e testes.
2. Criar migrations versionadas e constraints no PostgreSQL para chaves estrangeiras e unicidade.
3. Padronizar respostas de erro e incluir todos os erros de domínio relevantes como `404` ou `409`.
4. Implementar autenticação com hash de senha, emissão/verificação de JWT e autorização por grupo de permissão.
5. Publicar contrato OpenAPI/Swagger e incluir paginação, filtros por query string e testes de integração.

## Scripts

| Comando | Finalidade |
| --- | --- |
| `npm run dev` | Executa o servidor TypeScript em modo observação. |
| `npm run build` | Compila `src/` para `dist/`. |
| `npm start` | Inicia a aplicação compilada em `dist/server.js`. |
