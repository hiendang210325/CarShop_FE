import React from 'react';
import { Car } from '../../types';
import { Modal, Badge, Button } from '../../components';
import { formatCurrencyUSD, formatNumber, formatDate } from '../../utils';
import { Gauge, Zap, Calendar, ShieldCheck, Fuel, Sliders } from 'lucide-react';
import { useAuthStore } from '../../stores';

interface CarDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  car: Car | null;
  onEdit?: (car: Car) => void;
}

export const CarDetailModal: React.FC<CarDetailModalProps> = ({
  isOpen,
  onClose,
  car,
  onEdit,
}) => {
  const { hasPermission } = useAuthStore();
  const canEdit = hasPermission('canManageCars');

  if (!car) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`${car.brand} ${car.model} (${car.year})`}
      maxWidth="780px"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Đóng
          </Button>
          {canEdit && onEdit && (
            <Button
              variant="primary"
              onClick={() => {
                onClose();
                onEdit(car);
              }}
            >
              Chỉnh Sửa Xe
            </Button>
          )}
        </>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Top Image + Badges */}
        <div
          style={{
            position: 'relative',
            height: '280px',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
          }}
        >
          <img
            src={car.imageUrl}
            alt={`${car.brand} ${car.model}`}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div
            style={{
              position: 'absolute',
              top: '16px',
              left: '16px',
              display: 'flex',
              gap: '8px',
            }}
          >
            <Badge
              variant={
                car.status === 'AVAILABLE'
                  ? 'success'
                  : car.status === 'RESERVED'
                  ? 'warning'
                  : car.status === 'SOLD'
                  ? 'neutral'
                  : 'danger'
              }
            >
              {car.status}
            </Badge>
            <Badge variant="primary">{car.bodyType}</Badge>
          </div>
          <div
            style={{
              position: 'absolute',
              bottom: '16px',
              right: '16px',
              backgroundColor: 'rgba(15, 23, 42, 0.85)',
              backdropFilter: 'blur(8px)',
              padding: '8px 16px',
              borderRadius: 'var(--radius-md)',
              color: '#ffffff',
              fontWeight: 800,
              fontSize: '1.25rem',
            }}
          >
            {formatCurrencyUSD(car.price)}
          </div>
        </div>

        {/* VIN & Financial Details */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '12px',
            padding: '16px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--bg-tertiary)',
          }}
        >
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Số VIN Định Danh:</span>
            <p style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: '0.875rem' }}>{car.vin}</p>
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Màu sắc ngoại thất:</span>
            <p style={{ fontWeight: 600, fontSize: '0.875rem' }}>{car.color}</p>
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Lợi nhuận gộp dự kiến:</span>
            <p style={{ fontWeight: 700, color: 'var(--color-success)', fontSize: '0.875rem' }}>
              +{formatCurrencyUSD(car.price - car.costPrice)}
            </p>
          </div>
        </div>

        {/* Specifications Grid */}
        <div>
          <h4 style={{ fontSize: '0.9375rem', fontWeight: 700, marginBottom: '12px' }}>
            Thông Số Kỹ Thuật Hiệu Năng
          </h4>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '12px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
              <Zap size={20} color="var(--color-primary)" />
              <div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Công suất</p>
                <p style={{ fontWeight: 700, fontSize: '0.875rem' }}>{car.specs.horsepower} HP</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
              <Gauge size={20} color="var(--color-warning)" />
              <div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>0 - 100 km/h</p>
                <p style={{ fontWeight: 700, fontSize: '0.875rem' }}>{car.specs.acceleration}</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
              <Fuel size={20} color="var(--color-success)" />
              <div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Nhiên liệu</p>
                <p style={{ fontWeight: 700, fontSize: '0.875rem' }}>{car.fuelType}</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
              <Sliders size={20} color="#8b5cf6" />
              <div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Hộp số</p>
                <p style={{ fontWeight: 700, fontSize: '0.875rem' }}>{car.transmission}</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
              <Calendar size={20} color="var(--text-muted)" />
              <div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Đã đi (ODO)</p>
                <p style={{ fontWeight: 700, fontSize: '0.875rem' }}>{formatNumber(car.specs.mileage)} km</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
              <ShieldCheck size={20} color="var(--color-primary)" />
              <div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Động cơ</p>
                <p style={{ fontWeight: 700, fontSize: '0.875rem' }}>{car.specs.engine}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <h4 style={{ fontSize: '0.9375rem', fontWeight: 700, marginBottom: '6px' }}>Mô Tả Sản Phẩm</h4>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {car.description}
          </p>
        </div>

        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          Ngày nhập kho: {formatDate(car.createdAt, true)}
        </div>
      </div>
    </Modal>
  );
};
