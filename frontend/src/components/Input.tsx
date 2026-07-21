import type { InputHTMLAttributes, ReactNode } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: ReactNode;
  error?: string;
  hint?: string;
}

export function Input({ label, icon, error, hint, id, className = '', ...rest }: InputProps) {
  const inputId = id || `input-${label.toLowerCase().replace(/\s+/g, '-')}`;
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={inputId}
        style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace" }}
        className="block text-[11px] font-medium uppercase tracking-[0.12em] text-[#14213D]/70"
      >
        {label}
      </label>
      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 text-[#14213D]/40">
            {icon}
          </span>
        )}
        <input
          id={inputId}
          className={`w-full border-0 border-b-2 bg-transparent py-2.5 text-[15px] text-[#14213D] placeholder:text-[#14213D]/30 focus:outline-none focus:ring-0 ${
            icon ? 'pl-6' : ''
          } ${
            error ? 'border-[#B3413A] focus:border-[#B3413A]' : 'border-[#14213D]/15 focus:border-[#B8863B]'
          } ${className}`}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...rest}
        />
      </div>
      {error ? (
        <p id={`${inputId}-error`} className="text-xs font-medium text-[#B3413A]">
          {error}
        </p>
      ) : hint ? (
        <p className="text-xs text-[#14213D]/50">{hint}</p>
      ) : null}
    </div>
  );
}