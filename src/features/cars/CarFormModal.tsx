import React, { useState, useEffect } from 'react';
import { Car, CarBodyType, FuelType, Transmission, CarStatus } from '../../types';
import { Modal, Input, Select, Button } from '../../components';
import { useToast } from '../../contexts/ToastContext';

interface CarFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  carToEdit?: Car | null;
  onSubmit: (data: Omit<Car, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
}

export const CarFormModal: React.FC<CarFormModalProps> = ({
  isOpen,
  onClose,
  carToEdit,
  onSubmit,
}) => {
  const { showToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    vin: '',
    year: 2024,
    color: '',
    bodyType: 'SEDAN' as CarBodyType,
    fuelType: 'PETROL' as FuelType,
    transmission: 'AUTOMATIC' as Transmission,
    price: 95000,
    costPrice: 80000,
    status: 'AVAILABLE' as CarStatus,
    engine: '3.0L Twin-Turbo',
    horsepower: 400,
    torque: '500 Nm',
    acceleration: '4.2s',
    mileage: 1000,
    seatingCapacity: 5,
    imageUrl: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&auto=format&fit=crop&q=80',
    description: '',
  });

  useEffect(() => {
    if (carToEdit) {
      setFormData({
        brand: carToEdit.brand,
        model: carToEdit.model,
        vin: carToEdit.vin,
        year: carToEdit.year,
        color: carToEdit.color,
        bodyType: carToEdit.bodyType,
        fuelType: carToEdit.fuelType,
        transmission: carToEdit.transmission,
        price: carToEdit.price,
        costPrice: carToEdit.costPrice,
        status: carToEdit.status,
        engine: carToEdit.specs.engine,
        horsepower: carToEdit.specs.horsepower,
        torque: carToEdit.specs.torque,
        acceleration: carToEdit.specs.acceleration,
        mileage: carToEdit.specs.mileage,
        seatingCapacity: carToEdit.specs.seatingCapacity,
        imageUrl: carToEdit.imageUrl,
        description: carToEdit.description,
      });
    } else {
      setFormData({
        brand: '',
        model: '',
        vin: `VN${Date.now().toString().slice(-10)}`,
        year: 2024,
        color: 'Trắng Ngọc Trai',
        bodyType: 'SEDAN',
        fuelType: 'PETROL',
        transmission: 'AUTOMATIC',
        price: 95000,
        costPrice: 82000,
        status: 'AVAILABLE',
        engine: '3.0L Turbo',
        horsepower: 380,
        torque: '500 Nm',
        acceleration: '4.5s',
        mileage: 500,
        seatingCapacity: 5,
        imageUrl: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&auto=format&fit=crop&q=80',
        description: 'Mẫu xe sang trọng, đầy đủ tiện nghi, nhập khẩu chính hãng.',
      });
    }
  }, [carToEdit, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.brand || !formData.model || !formData.vin) {
      showToast('Vui lòng điền đầy đủ các thông tin bắt buộc (Hãng, Mẫu xe, Số VIN)', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit({
        brand: formData.brand,
        model: formData.model,
        vin: formData.vin,
        year: Number(formData.year),
        color: formData.color,
        bodyType: formData.bodyType,
        fuelType: formData.fuelType,
        transmission: formData.transmission,
        price: Number(formData.price),
        costPrice: Number(formData.costPrice),
        status: formData.status,
        specs: {
          engine: formData.engine,
          horsepower: Number(formData.horsepower),
          torque: formData.torque,
          acceleration: formData.acceleration,
          mileage: Number(formData.mileage),
          seatingCapacity: Number(formData.seatingCapacity),
        },
        imageUrl: formData.imageUrl,
        description: formData.description,
      });
      onClose();
    } catch {
      showToast('Có lỗi xảy ra khi lưu thông tin xe', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={carToEdit ? `Chỉnh Sửa Xe: ${carToEdit.brand} ${carToEdit.model}` : 'Thêm Mới Xe Vào Kho Showroom'}
      maxWidth="720px"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Hủy Bỏ
          </Button>
          <Button variant="primary" isLoading={isSubmitting} onClick={handleSubmit}>
            {carToEdit ? 'Lưu Thay Đổi' : 'Thêm Xe Mới'}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Row 1: Brand & Model */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
          <Input
            label="Hãng Xe *"
            placeholder="Porsche, Mercedes-Benz, BMW..."
            value={formData.brand}
            onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
            required
          />
          <Input
            label="Mẫu Xe (Model) *"
            placeholder="911 Carrera, S500, M4..."
            value={formData.model}
            onChange={(e) => setFormData({ ...formData, model: e.target.value })}
            required
          />
        </div>

        {/* Row 2: VIN & Year & Color */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', gap: '14px' }}>
          <Input
            label="Số VIN (17 Ký tự) *"
            placeholder="WP0AB2A99..."
            value={formData.vin}
            onChange={(e) => setFormData({ ...formData, vin: e.target.value })}
            required
          />
          <Input
            label="Năm Sản Xuất"
            type="number"
            value={formData.year}
            onChange={(e) => setFormData({ ...formData, year: Number(e.target.value) })}
          />
          <Input
            label="Màu Ngoại Thất"
            placeholder="Đen, Đỏ, Trắng..."
            value={formData.color}
            onChange={(e) => setFormData({ ...formData, color: e.target.value })}
          />
        </div>

        {/* Row 3: Prices & Status */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px' }}>
          <Input
            label="Giá Bán Niêm Yết ($ USD) *"
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
            required
          />
          <Input
            label="Giá Vốn Nhập ($ USD)"
            type="number"
            value={formData.costPrice}
            onChange={(e) => setFormData({ ...formData, costPrice: Number(e.target.value) })}
          />
          <Select
            label="Trạng Thái Kho"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as CarStatus })}
            options={[
              { label: 'Sẵn sàng giao (AVAILABLE)', value: 'AVAILABLE' },
              { label: 'Đã đặt cọc (RESERVED)', value: 'RESERVED' },
              { label: 'Đã bán (SOLD)', value: 'SOLD' },
              { label: 'Bảo trì (MAINTENANCE)', value: 'MAINTENANCE' },
            ]}
          />
        </div>

        {/* Row 4: Body Type, Fuel & Transmission */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px' }}>
          <Select
            label="Kiểu Dáng Thân Xe"
            value={formData.bodyType}
            onChange={(e) => setFormData({ ...formData, bodyType: e.target.value as CarBodyType })}
            options={[
              { label: 'Sedan', value: 'SEDAN' },
              { label: 'SUV', value: 'SUV' },
              { label: 'Coupe', value: 'COUPE' },
              { label: 'Hatchback', value: 'HATCHBACK' },
              { label: 'Crossover', value: 'CROSSOVER' },
            ]}
          />
          <Select
            label="Nhiên Liệu"
            value={formData.fuelType}
            onChange={(e) => setFormData({ ...formData, fuelType: e.target.value as FuelType })}
            options={[
              { label: 'Xăng (Petrol)', value: 'PETROL' },
              { label: 'Điện (Electric)', value: 'ELECTRIC' },
              { label: 'Hybrid', value: 'HYBRID' },
              { label: 'Dầu (Diesel)', value: 'DIESEL' },
            ]}
          />
          <Select
            label="Hộp Số"
            value={formData.transmission}
            onChange={(e) => setFormData({ ...formData, transmission: e.target.value as Transmission })}
            options={[
              { label: 'Tự động (Automatic)', value: 'AUTOMATIC' },
              { label: 'Số sàn (Manual)', value: 'MANUAL' },
            ]}
          />
        </div>

        {/* Row 5: Specs (Horsepower, Engine, Acceleration, Mileage) */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '14px' }}>
          <Input
            label="Động Cơ"
            value={formData.engine}
            onChange={(e) => setFormData({ ...formData, engine: e.target.value })}
          />
          <Input
            label="Mã Lực (HP)"
            type="number"
            value={formData.horsepower}
            onChange={(e) => setFormData({ ...formData, horsepower: Number(e.target.value) })}
          />
          <Input
            label="0 - 100 km/h"
            value={formData.acceleration}
            onChange={(e) => setFormData({ ...formData, acceleration: e.target.value })}
          />
          <Input
            label="Số ODO (km)"
            type="number"
            value={formData.mileage}
            onChange={(e) => setFormData({ ...formData, mileage: Number(e.target.value) })}
          />
        </div>

        {/* Row 6: Image URL */}
        <Input
          label="URL Hình Ảnh Xe"
          value={formData.imageUrl}
          onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
        />

        {/* Row 7: Description */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
            Mô Tả Chi Tiết / Tùy Chọn Option
          </label>
          <textarea
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            style={{
              padding: '10px 14px',
              fontSize: '0.875rem',
              color: 'var(--text-primary)',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              resize: 'vertical',
            }}
          />
        </div>
      </form>
    </Modal>
  );
};
