import { useMemo, useState } from "react";
import { Plus, CalendarDays, User } from "lucide-react";
import Modal from "../../components/employee/Modal";
import { deals as initialDeals, DEAL_STAGES } from "../../mock/deals";

const STAGE_STYLES = {
  New: "border-t-blue-500",
  Qualified: "border-t-sky-500",
  Proposal: "border-t-amber-500",
  Negotiation: "border-t-orange-500",
  Won: "border-t-emerald-500",
  Lost: "border-t-red-500",
};

function formatValue(value) {
  return `₹${(value / 100000).toFixed(1)}L`;
}

function Deals() {
  const [deals, setDeals] = useState(initialDeals);
  const [modalOpen, setModalOpen] = useState(false);
  const [draggedId, setDraggedId] = useState(null);

  const columns = useMemo(() => {
    return DEAL_STAGES.map((stage) => ({
      stage,
      items: deals.filter((d) => d.stage === stage),
    }));
  }, [deals]);

  function handleDrop(stage) {
    if (!draggedId) return;
    setDeals((prev) => prev.map((d) => (d.id === draggedId ? { ...d, stage } : d)));
    setDraggedId(null);
  }

  function handleSave(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    const payload = {
      id: `DL-${Math.floor(3000 + Math.random() * 9000)}`,
      title: form.get("title"),
      company: form.get("company"),
      stage: form.get("stage"),
      value: Number(form.get("value")) || 0,
      owner: "Priya Sharma",
      closeDate: form.get("closeDate"),
    };
    setDeals((prev) => [payload, ...prev]);
    setModalOpen(false);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500">
          {deals.length} deals · Total pipeline value {formatValue(deals.reduce((s, d) => s + d.value, 0))}
        </p>
        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          <Plus size={16} />
          Add Deal
        </button>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4">
        {columns.map((col) => (
          <div
            key={col.stage}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(col.stage)}
            className="w-72 shrink-0"
          >
            <div className="flex items-center justify-between mb-3 px-1">
              <h3 className="text-sm font-semibold text-gray-700">{col.stage}</h3>
              <span className="text-xs text-gray-400 bg-gray-100 rounded-full px-2 py-0.5">{col.items.length}</span>
            </div>

            <div className="space-y-3 min-h-[120px]">
              {col.items.map((deal) => (
                <div
                  key={deal.id}
                  draggable
                  onDragStart={() => setDraggedId(deal.id)}
                  className={`bg-white rounded-xl border border-gray-200 border-t-4 ${STAGE_STYLES[deal.stage]} shadow-sm p-4 cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow`}
                >
                  <p className="text-sm font-medium text-gray-900">{deal.title}</p>
                  <p className="text-xs text-gray-400 mt-1">{deal.company}</p>
                  <p className="text-sm font-semibold text-blue-600 mt-3">{formatValue(deal.value)}</p>
                  <div className="flex items-center justify-between mt-3 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <User size={12} /> {deal.owner.split(" ")[0]}
                    </span>
                    <span className="flex items-center gap-1">
                      <CalendarDays size={12} /> {deal.closeDate}
                    </span>
                  </div>
                </div>
              ))}
              {col.items.length === 0 && (
                <div className="border border-dashed border-gray-200 rounded-xl p-6 text-center text-xs text-gray-400">
                  No deals here
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Add Deal"
        footer={
          <>
            <button onClick={() => setModalOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-100">
              Cancel
            </button>
            <button type="submit" form="deal-form" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
              Add Deal
            </button>
          </>
        }
      >
        <form id="deal-form" onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="text-xs font-medium text-gray-500">Deal Title</label>
            <input name="title" required className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500" />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500">Company</label>
            <input name="company" required className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-gray-500">Stage</label>
              <select name="stage" defaultValue={DEAL_STAGES[0]} className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500">
                {DEAL_STAGES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500">Value (₹)</label>
              <input type="number" name="value" className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500" />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500">Expected Close Date</label>
            <input type="date" name="closeDate" className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500" />
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default Deals;
