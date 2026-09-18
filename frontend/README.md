# System OS — Frontend

Painel empresarial para clientes, produtos, formas de pagamento e ordens de serviço. Desenvolvido com Next.js, React e Tailwind CSS, consome a API REST localizada em `../backend`.

## Requisitos

- Node.js 20 ou superior
- Backend em execução com acesso ao PostgreSQL

## Configuração

Crie o arquivo `.env.local` a partir de `.env.example` e defina a URL da API:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

Use portas diferentes para cada aplicação. Por exemplo, configure `PORT=3001` no `.env` do backend e mantenha o frontend na porta padrão `3000`.

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`.

## Scripts

| Comando | Finalidade |
| --- | --- |
| `npm run dev` | Inicia o ambiente de desenvolvimento. |
| `npm run lint` | Executa as verificações de qualidade. |
| `npm run build` | Gera a versão de produção. |
| `npm start` | Executa a versão compilada. |

## Funcionalidades

- Dashboard com indicadores operacionais e últimas ordens de serviço.
- Listagem e cadastro de clientes, produtos e formas de pagamento.
- Listagem e criação de ordens de serviço vinculadas a clientes.
- Estados de carregamento, erro de integração e confirmação de cadastro.

## Integração

A URL da API é configurada por `NEXT_PUBLIC_API_URL`. O navegador chama diretamente as rotas documentadas no README do backend; o CORS já está habilitado pela API.
