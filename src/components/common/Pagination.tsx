import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { usePagination, DOTS } from '../../hooks/usePagination';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems?: number;
  pageSize?: number;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  pageSize,
}) => {
  const paginationRange = usePagination({
    currentPage,
    totalPages,
    siblingCount: 1,
  });

  if (totalPages <= 1) return null;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        paddingTop: '16px',
        borderTop: '1px solid var(--border-color)',
      }}
    >
      {totalItems !== undefined && pageSize !== undefined && (
        <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
          Hiển thị{' '}
          <strong style={{ color: 'var(--text-primary)' }}>
            {Math.min((currentPage - 1) * pageSize + 1, totalItems)}
          </strong>{' '}
          -{' '}
          <strong style={{ color: 'var(--text-primary)' }}>
            {Math.min(currentPage * pageSize, totalItems)}
          </strong>{' '}
          trong tổng số{' '}
          <strong style={{ color: 'var(--text-primary)' }}>{totalItems}</strong> kết quả
        </p>
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        {/* Previous Button */}
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '34px',
            height: '34px',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-color)',
            backgroundColor: 'var(--bg-secondary)',
            color: 'var(--text-primary)',
            opacity: currentPage === 1 ? 0.4 : 1,
            cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
          }}
          title="Trang trước"
        >
          <ChevronLeft size={16} />
        </button>

        {/* Page Buttons */}
        {paginationRange.map((pageNumber, index) => {
          if (pageNumber === DOTS) {
            return (
              <span
                key={`dots-${index}`}
                style={{
                  padding: '0 8px',
                  color: 'var(--text-muted)',
                  fontSize: '0.875rem',
                }}
              >
                &#8230;
              </span>
            );
          }

          const isCurrent = pageNumber === currentPage;

          return (
            <button
              key={pageNumber}
              onClick={() => onPageChange(pageNumber as number)}
              style={{
                width: '34px',
                height: '34px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.8125rem',
                fontWeight: 600,
                border: `1px solid ${isCurrent ? 'var(--color-primary)' : 'var(--border-color)'}`,
                backgroundColor: isCurrent ? 'var(--color-primary)' : 'var(--bg-secondary)',
                color: isCurrent ? '#ffffff' : 'var(--text-primary)',
                transition: 'all var(--transition-fast)',
              }}
            >
              {pageNumber}
            </button>
          );
        })}

        {/* Next Button */}
        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '34px',
            height: '34px',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-color)',
            backgroundColor: 'var(--bg-secondary)',
            color: 'var(--text-primary)',
            opacity: currentPage === totalPages ? 0.4 : 1,
            cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
          }}
          title="Trang tiếp theo"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};
