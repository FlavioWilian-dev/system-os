import type {
  Client,
  CreateClient,
  CreatePaymentMethod,
  CreateProduct,
  CreateServiceOrder,
  PaymentMethod,
  Product,
  ServiceOrder,
} from "@/src/types/api";

const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api";

type ApiEnvelope<T> = { data?: T; message?: string };

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...options.headers },
  });
  const payload = (await response.json().catch(() => null)) as ApiEnvelope<T> & { erro?: string };

  if (!response.ok) {
    throw new Error(payload?.erro ?? "Não foi possível concluir a solicitação.");
  }

  return (payload?.data ?? payload) as T;
}

function list<T>(path: string) {
  return request<T[]>(path).then((data) => data ?? []);
}

export const api = {
  getClients: (term = "") => list<Client>(`/clientes?nomeCliente=${encodeURIComponent(term)}`),
  getProducts: (term = "") => list<Product>(`/produtos?nomeProduto=${encodeURIComponent(term)}`),
  getPaymentMethods: (term = "") => list<PaymentMethod>(`/pagamentos?descricao=${encodeURIComponent(term)}`),
  getServiceOrders: () => list<ServiceOrder>("/ordens-servico"),
  createClient: (data: CreateClient) => request<Client>("/clientes", { method: "POST", body: JSON.stringify(data) }),
  createProduct: (data: CreateProduct) => request<Product>("/produtos", { method: "POST", body: JSON.stringify(data) }),
  createPaymentMethod: (data: CreatePaymentMethod) => request<PaymentMethod>("/pagamentos", { method: "POST", body: JSON.stringify(data) }),
  createServiceOrder: (data: CreateServiceOrder) => request<ServiceOrder>("/ordens-servico", { method: "POST", body: JSON.stringify(data) }),
};
