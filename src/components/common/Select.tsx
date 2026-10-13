import React, { SelectHTMLAttributes, forwardRef } from 'react';

export interface SelectOption {
  label: string;
  value: string | number;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: SelectOption[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, style, disabled, ...props }, ref) => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
        {label && (
          <label
            style={{
              fontSize: '0.8125rem',
              fontWeight: 600,
              color: 'var(--text-secondary)',
            }}
          >
            {label}
          </label>
        )}

        <select
          ref={ref}
          disabled={disabled}
          style={{
            width: '100%',
            padding: '10px 14px',
            fontSize: '0.875rem',
            color: 'var(--text-primary)',
            backgroundColor: 'var(--bg-secondary)',
            border: `1px solid ${error ? 'var(--color-danger)' : 'var(--border-color)'}`,
            borderRadius: 'var(--radius-md)',
            cursor: disabled ? 'not-allowed' : 'pointer',
            opacity: disabled ? 0.65 : 1,
            ...style,
          }}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {error && (
          <span style={{ fontSize: '0.75rem', color: 'var(--color-danger)', fontWeight: 500 }}>
            {error}
          </span>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
