import type { ReactNode } from 'react';
import { X } from 'lucide-react';
import { useEffect } from 'react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
}

const serif = { fontFamily: "'Newsreader', Georgia, serif" };

export function Modal({ open, onClose, title, description, children }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-[#14213D]/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-sm border border-[#14213D]/10 bg-[#F7F3E8] shadow-2xl lg:max-w-3xl">
        {/* Header (fixed) */}
        <div className="flex items-start justify-between gap-4 border-b-2 border-[#B8863B] px-6 py-5 sm:px-8">
          <div>
            <h2 style={serif} className="text-xl font-medium text-[#14213D]">{title}</h2>
            {description && <p className="mt-1 text-sm text-[#14213D]/60">{description}</p>}
          </div>
          <button
            onClick={onClose}
            className="rounded-sm p-2 text-[#14213D]/40 transition hover:bg-[#14213D]/5 hover:text-[#14213D]"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body (scrolls if content overflows) */}
        <div className="overflow-y-auto px-6 py-6 sm:px-8">
          {children}
        </div>
      </div>
    </div>
  );
}

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  loading = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <Modal open={open} onClose={onCancel} title={title}>
      <p className="text-sm text-[#14213D]/70">{message}</p>
      <div className="mt-6 flex items-center justify-end gap-3">
        <button
          onClick={onCancel}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-sm border border-[#14213D]/20 px-5 py-2.5 text-sm font-semibold text-[#14213D] transition hover:border-[#14213D] hover:bg-[#14213D]/5 disabled:opacity-60"
        >
          {cancelLabel}
        </button>
        <button
          onClick={onConfirm}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-sm bg-[#B3413A] px-5 py-2.5 text-sm font-semibold text-[#F7F3E8] transition hover:bg-[#7A2C26] disabled:opacity-60"
        >
          {loading ? 'Deleting...' : confirmLabel}
        </button>
      </div>
    </Modal>
  );
}