import { useState, useRef, useEffect, useLayoutEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { MoreVertical, Pencil, Trash2, Eye } from "lucide-react";
const MENU_WIDTH = 144;
const MENU_MARGIN = 8;
function RowActions({ onView, onEdit, onDelete }) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef(null);
  const menuRef = useRef(null);
  const computePosition = useCallback(() => {
    const trigger = buttonRef.current;
    if (!trigger) return;
    const rect = trigger.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    let left = rect.right - MENU_WIDTH;
    left = Math.min(Math.max(left, MENU_MARGIN), viewportWidth - MENU_WIDTH - MENU_MARGIN);
    const estimatedMenuHeight = 40 * [onView, onEdit, onDelete].filter(Boolean).length + 8;
    const spaceBelow = viewportHeight - rect.bottom;
    const openUpward = spaceBelow < estimatedMenuHeight + MENU_MARGIN;
    const top = openUpward
      ? rect.top - estimatedMenuHeight - 4
      : rect.bottom + 4;
    setPosition({ top, left });
  }, [onView, onEdit, onDelete]);
  useLayoutEffect(() => {
    if (!open) return;
    computePosition();
  }, [open, computePosition]);
  useEffect(() => {
    if (!open) return;
    function handleClickOutside(e) {
      if (
        buttonRef.current && !buttonRef.current.contains(e.target) &&
        menuRef.current && !menuRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }
    function handleReposition() {
      computePosition();
    }
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleReposition, true);
    window.addEventListener("resize", handleReposition);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleReposition, true);
      window.removeEventListener("resize", handleReposition);
    };
  }, [open, computePosition]);
  return (
    <div className="inline-block">
      <button
        ref={buttonRef}
        onClick={() => setOpen((o) => !o)}
        className="h-8 w-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
      >
        <MoreVertical size={16} />
      </button>
      {open && createPortal(
        <div
          ref={menuRef}
          style={{ position: "fixed", top: position.top, left: position.left, width: MENU_WIDTH }}
          className="z-50 bg-white border border-gray-200 rounded-lg shadow-lg py-1"
        >
          {onView && (
            <button
              onClick={() => { setOpen(false); onView(); }}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50"
            >
              <Eye size={14} /> View
            </button>
          )}
          {onEdit && (
            <button
              onClick={() => { setOpen(false); onEdit(); }}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50"
            >
              <Pencil size={14} /> Edit
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => { setOpen(false); onDelete(); }}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
            >
              <Trash2 size={14} /> Delete
            </button>
          )}
        </div>,
        document.body
      )}
    </div>
  );
}
export default RowActions;
