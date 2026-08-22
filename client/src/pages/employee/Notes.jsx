import { useEffect, useMemo, useState } from "react";
import { StickyNote, Plus } from "lucide-react";
import ListToolbar from "../../components/employee/ListToolbar";
import EmptyState from "../../components/employee/EmptyState";
import RowActions from "../../components/employee/RowActions";
import Modal from "../../components/employee/Modal";
import { getNotes, createNote, deleteNote } from "../../services/employeeService";
function Notes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  useEffect(() => {
    let isMounted = true;
    async function loadNotes() {
      try {
        setLoading(true);
        setError("");
        const response = await getNotes();
        if (!isMounted) return;
        setNotes(response.data);
      } catch (err) {
        if (!isMounted) return;
        setError(err.friendlyMessage || "Unable to load notes.");
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadNotes();
    return () => {
      isMounted = false;
    };
  }, []);
  const filtered = useMemo(() => {
    return notes.filter(
      (n) => n.content.toLowerCase().includes(search.toLowerCase()) || (n.relatedTo || "").toLowerCase().includes(search.toLowerCase())
    );
  }, [notes, search]);
  async function handleSave(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    const payload = {
      relatedTo: form.get("relatedTo"),
      relatedType: form.get("relatedType"),
      content: form.get("content"),
    };
    setSaving(true);
    setError("");
    try {
      const response = await createNote(payload);
      setNotes((prev) => [response.data, ...prev]);
      setModalOpen(false);
    } catch (err) {
      setError(err.friendlyMessage || "Unable to save note.");
    } finally {
      setSaving(false);
    }
  }
  async function confirmDelete() {
    setSaving(true);
    setError("");
    try {
      await deleteNote(deleteTarget.id);
      setNotes((prev) => prev.filter((n) => n.id !== deleteTarget.id));
      setDeleteTarget(null);
    } catch (err) {
      setError(err.friendlyMessage || "Unable to delete note.");
    } finally {
      setSaving(false);
    }
  }
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
      <ListToolbar
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search notes..."
        addLabel="Add Note"
        onAddClick={() => setModalOpen(true)}
        filters={null}
      />
      {error && (
        <div className="mx-6 mt-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
          {error}
        </div>
      )}
      {loading ? (
        <div className="p-6 text-sm text-gray-500">Loading notes...</div>
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={StickyNote}
          title="No notes found"
          description="Capture context on leads, customers, and deals so nothing gets lost."
          actionLabel="Add Note"
          onAction={() => setModalOpen(true)}
        />
      ) : (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 p-6">
          {filtered.map((note) => (
            <div key={note.id} className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col gap-3 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-900">{note.relatedTo}</p>
                  <p className="text-xs text-gray-400">{note.relatedType}</p>
                </div>
                <RowActions onDelete={() => setDeleteTarget(note)} />
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">{note.content}</p>
              <p className="text-xs text-gray-400 mt-auto pt-2 border-t border-gray-50">
                {note.author} · {note.createdAt}
              </p>
            </div>
          ))}
        </div>
      )}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Add Note"
        footer={
          <>
            <button onClick={() => setModalOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-100">
              Cancel
            </button>
            <button type="submit" form="note-form" disabled={saving} className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-60">
              <Plus size={15} /> {saving ? "Adding..." : "Add Note"}
            </button>
          </>
        }
      >
        <form id="note-form" onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="text-xs font-medium text-gray-500">Related To</label>
            <input name="relatedTo" required className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500" />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500">Related Type</label>
            <select name="relatedType" defaultValue="Lead" className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500">
              <option>Lead</option>
              <option>Customer</option>
              <option>Deal</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500">Note</label>
            <textarea name="content" rows={4} required className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500" />
          </div>
        </form>
      </Modal>
      <Modal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="Delete Note"
        footer={
          <>
            <button onClick={() => setDeleteTarget(null)} className="px-4 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-100">
              Cancel
            </button>
            <button onClick={confirmDelete} disabled={saving} className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-60">
              {saving ? "Deleting..." : "Delete"}
            </button>
          </>
        }
      >
        <p className="text-sm text-gray-600">Are you sure you want to delete this note?</p>
      </Modal>
    </div>
  );
}
export default Notes;
