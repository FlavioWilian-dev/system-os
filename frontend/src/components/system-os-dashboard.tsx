"use client";

import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import { api } from "@/src/services/api";
import type { Client, PaymentMethod, Product, ServiceOrder, ServiceOrderStatus } from "@/src/types/api";

type Section = "Visão geral" | "Ordens de serviço" | "Clientes" | "Produtos" | "Pagamentos";
type ModalType = Exclude<Section, "Visão geral"> | null;

const sections: Section[] = ["Visão geral", "Ordens de serviço", "Clientes", "Produtos", "Pagamentos"];
const statusLabel: Record<ServiceOrderStatus, string> = {
  ABERTA: "Aberta",
  EM_ANDAMENTO: "Em andamento",
  AGUARDANDO_PECAS: "Aguardando peças",
  AGUARDANDO_CLIENTE: "Aguardando cliente",
  FINALIZADA: "Finalizada",
  CANCELADA: "Cancelada",
};

function clientName(client: Client) {
  return client.nomeCliente ?? client.nomecliente ?? "Cliente sem nome";
}

function productName(product: Product) {
  return product.nomeProduto ?? product.nomeproduto ?? "Produto sem nome";
}

function formatCurrency(value: number | string | undefined) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(Number(value ?? 0));
}

function formatDate(value?: string | null) {
  return value ? new Intl.DateTimeFormat("pt-BR").format(new Date(value)) : "—";
}

function statusClass(status: ServiceOrderStatus) {
  if (status === "FINALIZADA") return "bg-emerald-50 text-emerald-700 ring-emerald-100";
  if (status === "CANCELADA") return "bg-rose-50 text-rose-700 ring-rose-100";
  if (status === "EM_ANDAMENTO") return "bg-blue-50 text-blue-700 ring-blue-100";
  return "bg-amber-50 text-amber-700 ring-amber-100";
}

function NavSymbol({ index }: { index: number }) {
  return <span className="grid size-6 place-items-center rounded-md bg-current/10 text-xs font-bold">{index + 1}</span>;
}

export function SystemOsDashboard() {
  const [section, setSection] = useState<Section>("Visão geral");
  const [modal, setModal] = useState<ModalType>(null);
  const [clients, setClients] = useState<Client[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [payments, setPayments] = useState<PaymentMethod[]>([]);
  const [orders, setOrders] = useState<ServiceOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [clientData, productData, paymentData, orderData] = await Promise.all([
        api.getClients(),
        api.getProducts(),
        api.getPaymentMethods(),
        api.getServiceOrders(),
      ]);
      setClients(clientData);
      setProducts(productData);
      setPayments(paymentData);
      setOrders(orderData);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Não foi possível conectar à API.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadData();
  }, [loadData]);

  const totalOpen = useMemo(
    () => orders.filter((order) => !["FINALIZADA", "CANCELADA"].includes(order.status)).reduce((sum, order) => sum + Number(order.total), 0),
    [orders],
  );

  async function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!modal) return;
    const values = Object.fromEntries(new FormData(event.currentTarget));
    setSaving(true);
    setError(null);
    try {
      if (modal === "Clientes") {
        await api.createClient({
          nomeCliente: String(values.nomeCliente),
          cpfCnpj: String(values.cpfCnpj),
          ...(values.fone ? { fone: String(values.fone) } : {}),
          ...(values.email ? { email: String(values.email) } : {}),
        });
      }
      if (modal === "Produtos") {
        await api.createProduct({
          nomeProduto: String(values.nomeProduto),
          preco: String(values.preco),
          estoque: String(values.estoque),
          unidade: String(values.unidade),
        });
      }
      if (modal === "Pagamentos") {
        await api.createPaymentMethod({ descricao: String(values.descricao), status: "ATIVO" });
      }
      if (modal === "Ordens de serviço") {
        await api.createServiceOrder({
          ordemMovimentoOS: String(values.ordemMovimentoOS),
          codigoCliente: Number(values.codigoCliente),
          status: values.status as ServiceOrderStatus,
          observacao: String(values.observacao || ""),
          total: Number(values.total || 0),
        });
      }
      setNotice(`${modal.slice(0, -1)} cadastrado(a) com sucesso.`);
      setModal(null);
      await loadData();
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Não foi possível salvar o cadastro.");
    } finally {
      setSaving(false);
    }
  }

  function openSection(nextSection: Section) {
    setSection(nextSection);
    setNotice(null);
  }

  return (
    <main className="min-h-screen bg-[#f4f7fb] text-[#162033]">
      <div className="mx-auto flex min-h-screen max-w-[1600px]">
        <aside className="hidden w-72 shrink-0 flex-col border-r border-slate-200 bg-[#102a43] px-5 py-7 text-slate-300 lg:flex">
          <div className="mb-12 flex items-center gap-3 px-3">
            <div className="grid size-10 place-items-center rounded-xl bg-blue-500 text-lg font-black text-white">S</div>
            <div><p className="font-semibold text-white">System OS</p><p className="text-xs text-slate-400">Gestão empresarial</p></div>
          </div>
          <nav className="space-y-1" aria-label="Navegação principal">
            {sections.map((item, index) => (
              <button key={item} onClick={() => openSection(item)} className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium transition ${section === item ? "bg-blue-600 text-white shadow-lg shadow-blue-950/20" : "hover:bg-white/10 hover:text-white"}`}>
                <NavSymbol index={index} />{item}
              </button>
            ))}
          </nav>
          <div className="mt-auto rounded-xl border border-white/10 bg-white/5 p-4 text-xs leading-5 text-slate-400"><span className="font-semibold text-slate-200">API conectada</span><br />Dados sincronizados com o System OS.</div>
        </aside>

        <section className="min-w-0 flex-1">
          <header className="flex min-h-20 items-center justify-between border-b border-slate-200 bg-white px-5 sm:px-8">
            <div><p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">Operação</p><h1 className="text-lg font-semibold text-slate-800">{section}</h1></div>
            <div className="flex items-center gap-3"><button onClick={() => void loadData()} className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">Atualizar</button><div className="grid size-9 place-items-center rounded-full bg-slate-100 text-sm font-bold text-slate-600">AD</div></div>
          </header>

          <div className="p-5 sm:p-8">
            {error && <div className="mb-6 flex items-center justify-between rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700"><span>{error}</span><button onClick={() => setError(null)} className="font-semibold">Fechar</button></div>}
            {notice && <div className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{notice}</div>}
            {section === "Visão geral" && <Overview orders={orders} clients={clients} products={products} totalOpen={totalOpen} loading={loading} onNavigate={openSection} />}
            {section === "Ordens de serviço" && <OrdersTable orders={orders} loading={loading} onCreate={() => setModal("Ordens de serviço")} />}
            {section === "Clientes" && <ClientsTable clients={clients} loading={loading} onCreate={() => setModal("Clientes")} />}
            {section === "Produtos" && <ProductsTable products={products} loading={loading} onCreate={() => setModal("Produtos")} />}
            {section === "Pagamentos" && <PaymentsTable payments={payments} loading={loading} onCreate={() => setModal("Pagamentos")} />}
          </div>
        </section>
      </div>
      {modal && <CreateModal type={modal} clients={clients} onClose={() => setModal(null)} onSubmit={submitForm} saving={saving} />}
    </main>
  );
}

function Overview({ orders, clients, products, totalOpen, loading, onNavigate }: { orders: ServiceOrder[]; clients: Client[]; products: Product[]; totalOpen: number; loading: boolean; onNavigate: (section: Section) => void }) {
  const cards = [["Ordens em andamento", orders.filter((order) => order.status === "EM_ANDAMENTO").length, "Acompanhe as execuções"], ["Valor em aberto", formatCurrency(totalOpen), "Ordens não finalizadas"], ["Clientes cadastrados", clients.length, "Base de relacionamento"], ["Produtos ativos", products.length, "Itens disponíveis"]] as const;
  return <><div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><h2 className="text-2xl font-bold tracking-tight text-slate-900">Bom dia, administrador.</h2><p className="mt-1 text-sm text-slate-500">Acompanhe os indicadores e mantenha a operação em movimento.</p></div><button onClick={() => onNavigate("Ordens de serviço")} className="rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-800">Nova ordem de serviço</button></div><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{cards.map(([title, value, subtitle]) => <article key={title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><p className="text-sm font-medium text-slate-500">{title}</p><p className="mt-4 text-2xl font-bold text-slate-900">{loading ? "—" : value}</p><p className="mt-2 text-xs text-slate-400">{subtitle}</p></article>)}</div><section className="mt-7 rounded-2xl border border-slate-200 bg-white shadow-sm"><div className="flex items-center justify-between border-b border-slate-100 px-5 py-4"><div><h3 className="font-semibold text-slate-800">Ordens recentes</h3><p className="mt-1 text-xs text-slate-400">Últimas movimentações registradas</p></div><button onClick={() => onNavigate("Ordens de serviço")} className="text-sm font-semibold text-blue-700">Ver todas</button></div><OrderRows orders={orders.slice(0, 5)} loading={loading} /></section></>;
}

function SectionHeader({ title, description, button, onCreate }: { title: string; description: string; button: string; onCreate: () => void }) {
  return <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><h2 className="text-2xl font-bold tracking-tight text-slate-900">{title}</h2><p className="mt-1 text-sm text-slate-500">{description}</p></div><button onClick={onCreate} className="rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-800">{button}</button></div>;
}

function OrdersTable({ orders, loading, onCreate }: { orders: ServiceOrder[]; loading: boolean; onCreate: () => void }) {
  return <><SectionHeader title="Ordens de serviço" description="Controle o andamento e o financeiro da sua operação." button="Nova OS" onCreate={onCreate} /><section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"><div className="border-b border-slate-100 px-5 py-4 text-sm font-medium text-slate-600">{orders.length} registros encontrados</div><OrderRows orders={orders} loading={loading} /></section></>;
}

function OrderRows({ orders, loading }: { orders: ServiceOrder[]; loading: boolean }) {
  if (loading) return <div className="p-8 text-center text-sm text-slate-400">Carregando dados da operação...</div>;
  if (!orders.length) return <div className="p-10 text-center text-sm text-slate-400">Nenhuma ordem de serviço cadastrada.</div>;
  return <div className="overflow-x-auto"><table className="w-full min-w-[680px] text-left text-sm"><thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-400"><tr><th className="px-5 py-3 font-semibold">OS</th><th className="px-5 py-3 font-semibold">Abertura</th><th className="px-5 py-3 font-semibold">Status</th><th className="px-5 py-3 font-semibold">Total</th></tr></thead><tbody>{orders.map((order) => <tr key={order.codigoMovimentoOS} className="border-t border-slate-100"><td className="px-5 py-4 font-semibold text-slate-700">{order.ordemMovimentoOS}</td><td className="px-5 py-4 text-slate-500">{formatDate(order.dataAbertura)}</td><td className="px-5 py-4"><span className={`rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${statusClass(order.status)}`}>{statusLabel[order.status]}</span></td><td className="px-5 py-4 font-medium text-slate-700">{formatCurrency(order.total)}</td></tr>)}</tbody></table></div>;
}

function ClientsTable({ clients, loading, onCreate }: { clients: Client[]; loading: boolean; onCreate: () => void }) {
  return <><SectionHeader title="Clientes" description="Gerencie a base de clientes e seus dados de contato." button="Novo cliente" onCreate={onCreate} /><SimpleTable loading={loading} empty="Nenhum cliente cadastrado." headers={["Cliente", "CPF/CNPJ", "Telefone", "E-mail"]} rows={clients.map((client, index) => [clientName(client), client.cpfCnpj ?? client.cpfcnpj ?? "—", client.fone ?? "—", client.email ?? "—", String(index)])} /></>;
}

function ProductsTable({ products, loading, onCreate }: { products: Product[]; loading: boolean; onCreate: () => void }) {
  return <><SectionHeader title="Produtos" description="Consulte itens, preços e o saldo disponível em estoque." button="Novo produto" onCreate={onCreate} /><SimpleTable loading={loading} empty="Nenhum produto cadastrado." headers={["Produto", "Preço", "Estoque", "Unidade"]} rows={products.map((product, index) => [productName(product), formatCurrency(product.preco), String(product.estoque ?? 0), product.unidade ?? "—", String(index)])} /></>;
}

function PaymentsTable({ payments, loading, onCreate }: { payments: PaymentMethod[]; loading: boolean; onCreate: () => void }) {
  return <><SectionHeader title="Formas de pagamento" description="Cadastre e acompanhe os meios de recebimento aceitos." button="Nova forma" onCreate={onCreate} /><SimpleTable loading={loading} empty="Nenhuma forma de pagamento cadastrada." headers={["Descrição", "Status"]} rows={payments.map((payment, index) => [payment.descricao, payment.status, String(index)])} /></>;
}

function SimpleTable({ headers, rows, loading, empty }: { headers: string[]; rows: string[][]; loading: boolean; empty: string }) {
  return <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">{loading ? <div className="p-8 text-center text-sm text-slate-400">Carregando registros...</div> : !rows.length ? <div className="p-10 text-center text-sm text-slate-400">{empty}</div> : <div className="overflow-x-auto"><table className="w-full min-w-[620px] text-left text-sm"><thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-400"><tr>{headers.map((header) => <th key={header} className="px-5 py-3 font-semibold">{header}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row.at(-1)} className="border-t border-slate-100">{row.slice(0, -1).map((value, index) => <td key={`${value}-${index}`} className={`px-5 py-4 ${index === 0 ? "font-medium text-slate-700" : "text-slate-500"}`}>{value}</td>)}</tr>)}</tbody></table></div>}</section>;
}

function CreateModal({ type, clients, onClose, onSubmit, saving }: { type: Exclude<ModalType, null>; clients: Client[]; onClose: () => void; onSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void> }) {
  const title = type === "Ordens de serviço" ? "Nova ordem de serviço" : `Novo ${type.slice(0, -1).toLowerCase()}`;
  return <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/45 p-4"><div className="w-full max-w-xl rounded-2xl bg-white shadow-2xl"><div className="flex items-center justify-between border-b border-slate-100 px-6 py-5"><div><h2 className="font-semibold text-slate-800">{title}</h2><p className="mt-1 text-sm text-slate-500">Preencha os dados para concluir o cadastro.</p></div><button onClick={onClose} className="rounded-lg px-2 py-1 text-lg text-slate-400 hover:bg-slate-100">×</button></div><form onSubmit={(event) => void onSubmit(event)} className="space-y-4 p-6">{type === "Clientes" && <><Field label="Nome completo" name="nomeCliente" required /><Field label="CPF ou CNPJ" name="cpfCnpj" required /><div className="grid gap-4 sm:grid-cols-2"><Field label="Telefone" name="fone" /><Field label="E-mail" name="email" type="email" /></div></>}{type === "Produtos" && <><Field label="Nome do produto" name="nomeProduto" required /><div className="grid gap-4 sm:grid-cols-3"><Field label="Preço" name="preco" placeholder="0.00" required /><Field label="Estoque" name="estoque" placeholder="0" required /><Field label="Unidade" name="unidade" placeholder="UN" required /></div></>}{type === "Pagamentos" && <Field label="Descrição" name="descricao" placeholder="Ex.: Cartão de crédito" required />}{type === "Ordens de serviço" && <><Field label="Número da OS" name="ordemMovimentoOS" placeholder="OS-2026-001" required /><label className="block text-sm font-medium text-slate-700">Cliente<select name="codigoCliente" required className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-slate-700 outline-none focus:border-blue-500"><option value="">Selecione um cliente</option>{clients.map((client, index) => <option key={index} value={client.codigoCliente ?? client.codigocliente}>{clientName(client)}</option>)}</select></label><div className="grid gap-4 sm:grid-cols-2"><label className="block text-sm font-medium text-slate-700">Status<select name="status" defaultValue="ABERTA" className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-slate-700 outline-none focus:border-blue-500">{Object.entries(statusLabel).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label><Field label="Valor inicial" name="total" placeholder="0.00" /></div><label className="block text-sm font-medium text-slate-700">Observação<textarea name="observacao" rows={3} className="mt-1.5 w-full resize-none rounded-xl border border-slate-200 px-3 py-2.5 text-slate-700 outline-none focus:border-blue-500" /></label></>}<div className="flex justify-end gap-3 border-t border-slate-100 pt-5"><button type="button" onClick={onClose} className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100">Cancelar</button><button disabled={saving} className="rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-60">{saving ? "Salvando..." : "Salvar cadastro"}</button></div></form></div></div>;
}

function Field({ label, name, type = "text", required, placeholder }: { label: string; name: string; type?: string; required?: boolean; placeholder?: string }) {
  return <label className="block text-sm font-medium text-slate-700">{label}<input name={name} type={type} required={required} placeholder={placeholder} className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-slate-700 outline-none placeholder:text-slate-300 focus:border-blue-500" /></label>;
}
