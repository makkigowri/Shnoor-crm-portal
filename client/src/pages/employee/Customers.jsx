import { useMemo, useState } from "react";
import { Contact } from "lucide-react";
import ListToolbar from "../../components/employee/ListToolbar";
import FilterSelect from "../../components/employee/FilterSelect";
import StatusBadge from "../../components/employee/StatusBadge";
import RowActions from "../../components/employee/RowActions";
import Pagination from "../../components/employee/Pagination";
import EmptyState from "../../components/employee/EmptyState";
import Modal from "../../components/employee/Modal";
import { customers as initialCustomers, CUSTOMER_STATUSES } from "../../mock/customers";

const PAGE_SIZE = 6;

function Customers() {
  const [customers, setCustomers] = useState(initialCustomers);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeCustomer, setActiveCustomer] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const filtered = useMemo(() => {
    return customers.filter((c) => {
      const matchesSearch =
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.company.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = status ? c.status === status : true;
      return matchesSearch && matchesStatus;
    });
  }, [customers, search, status]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function openAddModal() {
    setActiveCustomer(null);
    setModalOpen(true);
  }

  function openEditModal(customer) {
    setActiveCustomer(customer);
    setModalOpen(true);
  }

  function handleSave(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    const payload = {
      name: form.get("name"),
      company: form.get("company"),
      email: form.get("email"),
      phone: form.get("phone"),
      status: form.get("status"),
      industry: form.get("industry"),
      totalSpend: Number(form.get("totalSpend")) || 0,
      since: activeCustomer?.since || new Date().toISOString().slice(0, 10),
    };

    if (activeCustomer) {
      setCustomers((prev) => prev.map((c) => (c.id === activeCustomer.id ? { ...c, ...payload } : c)));
    } else {
      setCustomers((prev) => [{ id: `CU-${Math.floor(2000 + Math.random() * 9000)}`, ...payload }, ...prev]);
    }
    setModalOpen(false);
  }

  function confirmDelete() {
    setCustomers((prev) => prev.filter((c) => c.id !== deleteTarget.id));
    setDeleteTarget(null);
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
      <ListToolbar
        searchValue={search}
        onSearchChange={(v) => { setSearch(v); setPage(1); }}
        searchPlaceholder="Search customers by name, company, email..."
        addLabel="Add Customer"
        onAddClick={openAddModal}
        filters={
          <FilterSelect value={status} onChange={(v) => { setStatus(v); setPage(1); }} options={CUSTOMER_STATUSES} allLabel="All Statuses" />
        }
      />

      {pageItems.length === 0 ? (
        <EmptyState
          icon={Contact}
          title="No customers found"
          description="Try adjusting your search or filters, or add a new customer to get started."
          actionLabel="Add Customer"
          onAction={openAddModal}
        />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-gray-400 uppercase tracking-wide border-b border-gray-100">
                <th className="px-6 py-3 font-medium">Customer</th>
                <th className="px-6 py-3 font-medium">Company</th>
                <th className="px-6 py-3 font-medium">Industry</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Total Spend</th>
                <th className="px-6 py-3 font-medium">Customer Since</th>
                <th className="px-6 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {pageItems.map((customer) => (
                <tr key={customer.id} className="border-b border-gray-50 hover:bg-gray-50/60 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900">{customer.name}</p>
                    <p className="text-xs text-gray-400">{customer.email}</p>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{customer.company}</td>
                  <td className="px-6 py-4 text-gray-600">{customer.industry}</td>
                  <td className="px-6 py-4"><StatusBadge value={customer.status} /></td>
                  <td className="px-6 py-4 text-gray-600">₹{customer.totalSpend.toLocaleString("en-IN")}</td>
                  <td className="px-6 py-4 text-gray-600">{customer.since}</td>
                  <td className="px-6 py-4">
                    <RowActions
                      onView={() => openEditModal(customer)}
                      onEdit={() => openEditModal(customer)}
                      onDelete={() => setDeleteTarget(customer)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} totalItems={filtered.length} pageSize={PAGE_SIZE} />

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={activeCustomer ? "Edit Customer" : "Add Customer"}
        footer={
          <>
            <button onClick={() => setModalOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-100">
              Cancel
            </button>
            <button type="submit" form="customer-form" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
              {activeCustomer ? "Save Changes" : "Add Customer"}
            </button>
          </>
        }
      >
        <form id="customer-form" onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-gray-500">Full Name</label>
              <input name="name" defaultValue={activeCustomer?.name} required className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500">Company</label>
              <input name="company" defaultValue={activeCustomer?.company} required className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-gray-500">Email</label>
              <input type="email" name="email" defaultValue={activeCustomer?.email} required className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500">Phone</label>
              <input name="phone" defaultValue={activeCustomer?.phone} className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-gray-500">Industry</label>
              <input name="industry" defaultValue={activeCustomer?.industry} className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500">Status</label>
              <select name="status" defaultValue={activeCustomer?.status || CUSTOMER_STATUSES[0]} className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500">
                {CUSTOMER_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500">Total Spend (₹)</label>
            <input type="number" name="totalSpend" defaultValue={activeCustomer?.totalSpend} className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500" />
          </div>
        </form>
      </Modal>

      <Modal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="Delete Customer"
        footer={
          <>
            <button onClick={() => setDeleteTarget(null)} className="px-4 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-100">
              Cancel
            </button>
            <button onClick={confirmDelete} className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700">
              Delete
            </button>
          </>
        }
      >
        <p className="text-sm text-gray-600">
          Are you sure you want to delete <span className="font-medium text-gray-900">{deleteTarget?.name}</span>? This action cannot be undone.
        </p>
      </Modal>
    </div>
  );
}

export default Customers;
