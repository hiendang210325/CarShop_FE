import React, { useEffect, useState } from 'react';
import {
  Search,
  Plus,
  Filter,
  Grid,
  List,
  Edit2,
  Trash2,
  Eye,
  RefreshCw,
  Fuel,
  Gauge,
  Zap,
} from 'lucide-react';
import { useCarStore, useAuthStore } from '../../stores';
import { useToast } from '../../contexts/ToastContext';
import { Button, Input, Select, Badge, Card, Pagination, Spinner, EmptyState, Modal } from '../../components';
import { Car, CarStatus } from '../../types';
import { formatCurrencyUSD, formatNumber } from '../../utils';
import { CarFormModal } from './CarFormModal';
import { CarDetailModal } from './CarDetailModal';

export const CarsPage: React.FC = () => {
  const { showToast } = useToast();
  const { hasPermission } = useAuthStore();
  const {
    cars,
    total,
    page,
    pageSize,
    totalPages,
    isLoading,
    filter,
    fetchCars,
    setFilter,
    setPage,
    createCar,
    updateCar,
    deleteCar,
    resetToDefaultInventory,
  } = useCarStore();

  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [carToEdit, setCarToEdit] = useState<Car | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [carToDelete, setCarToDelete] = useState<Car | null>(null);

  const canManageCars = hasPermission('canManageCars');
  const canDeleteCars = hasPermission('canDeleteCars');

  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter({ search: e.target.value });
  };

  const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter({ brand: e.target.value });
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter({ status: e.target.value as CarStatus | 'ALL' });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter({ sortBy: e.target.value as any });
  };

  const handleOpenAddModal = () => {
    setCarToEdit(null);
    setIsFormModalOpen(true);
  };

  const handleOpenEditModal = (car: Car) => {
    setCarToEdit(car);
    setIsFormModalOpen(true);
  };

  const handleOpenDetailModal = (car: Car) => {
    setSelectedCar(car);
    setIsDetailModalOpen(true);
  };

  const handleSaveCar = async (carData: Omit<Car, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (carToEdit) {
      await updateCar(carToEdit.id, carData);
      showToast(`Đã cập nhật thông tin xe ${carData.brand} ${carData.model}`, 'success');
    } else {
      await createCar(carData);
      showToast(`Đã thêm mới xe ${carData.brand} ${carData.model} vào kho!`, 'success');
    }
  };

  const handleConfirmDelete = async () => {
    if (!carToDelete) return;
    try {
      await deleteCar(carToDelete.id);
      showToast(`Đã xóa xe ${carToDelete.brand} ${carToDelete.model} khỏi hệ thống`, 'success');
      setCarToDelete(null);
    } catch {
      showToast('Có lỗi xảy ra khi xóa xe', 'error');
    }
  };

  const handleResetDefault = async () => {
    await resetToDefaultInventory();
    showToast('Đã khôi phục danh mục kho xe mẫu mặc định!', 'info');
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Top Title & Actions */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            Quản Lý Kho Xe Showroom
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            Toàn bộ {total} xe hạng sang và hiệu năng cao đang được niêm yết trong hệ thống.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Button
            variant="secondary"
            size="sm"
            leftIcon={<RefreshCw size={14} />}
            onClick={handleResetDefault}
            title="Khôi phục danh mục mẫu"
          >
            Dữ liệu mẫu
          </Button>

          {canManageCars && (
            <Button
              variant="primary"
              leftIcon={<Plus size={16} />}
              onClick={handleOpenAddModal}
            >
              Thêm Mới Xe
            </Button>
          )}
        </div>
      </div>

      {/* Filter and Control Bar */}
      <Card>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '14px',
          }}
        >
          {/* Search */}
          <div style={{ flex: '1 1 260px', maxWidth: '380px' }}>
            <Input
              placeholder="Tìm theo tên xe, model hoặc số VIN..."
              value={filter.search || ''}
              onChange={handleSearchChange}
              leftIcon={<Search size={16} />}
            />
          </div>

          {/* Filter Dropdowns */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <div style={{ width: '150px' }}>
              <Select
                value={filter.brand || 'ALL'}
                onChange={handleBrandChange}
                options={[
                  { label: 'Tất cả hãng', value: 'ALL' },
                  { label: 'Porsche', value: 'Porsche' },
                  { label: 'Mercedes-Benz', value: 'Mercedes-Benz' },
                  { label: 'BMW', value: 'BMW' },
                  { label: 'Tesla', value: 'Tesla' },
                  { label: 'Audi', value: 'Audi' },
                  { label: 'Lexus', value: 'Lexus' },
                ]}
              />
            </div>

            <div style={{ width: '160px' }}>
              <Select
                value={filter.status || 'ALL'}
                onChange={handleStatusChange}
                options={[
                  { label: 'Tất cả trạng thái', value: 'ALL' },
                  { label: 'Sẵn sàng giao', value: 'AVAILABLE' },
                  { label: 'Đã đặt cọc', value: 'RESERVED' },
                  { label: 'Đã bán', value: 'SOLD' },
                  { label: 'Bảo trì', value: 'MAINTENANCE' },
                ]}
              />
            </div>

            <div style={{ width: '160px' }}>
              <Select
                value={filter.sortBy || 'newest'}
                onChange={handleSortChange}
                options={[
                  { label: 'Mới nhất', value: 'newest' },
                  { label: 'Giá tăng dần', value: 'price_asc' },
                  { label: 'Giá giảm dần', value: 'price_desc' },
                  { label: 'Năm sản xuất', value: 'year_desc' },
                ]}
              />
            </div>

            {/* Grid / Table View Switcher */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'var(--bg-tertiary)',
                padding: '4px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
              }}
            >
              <button
                onClick={() => setViewMode('grid')}
                style={{
                  padding: '6px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: viewMode === 'grid' ? 'var(--bg-card)' : 'transparent',
                  color: viewMode === 'grid' ? 'var(--color-primary)' : 'var(--text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  boxShadow: viewMode === 'grid' ? 'var(--shadow-xs)' : 'none',
                }}
                title="Hiển thị dạng Lưới Card"
              >
                <Grid size={16} />
              </button>
              <button
                onClick={() => setViewMode('table')}
                style={{
                  padding: '6px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: viewMode === 'table' ? 'var(--bg-card)' : 'transparent',
                  color: viewMode === 'table' ? 'var(--color-primary)' : 'var(--text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  boxShadow: viewMode === 'table' ? 'var(--shadow-xs)' : 'none',
                }}
                title="Hiển thị dạng Bảng Dữ liệu"
              >
                <List size={16} />
              </button>
            </div>
          </div>
        </div>
      </Card>

      {/* Main Content: Loading, Empty, or Car List */}
      {isLoading ? (
        <Spinner size={36} />
      ) : cars.length === 0 ? (
        <EmptyState
          title="Không tìm thấy xe nào phù hợp"
          description="Hãy thử thay đổi từ khóa tìm kiếm hoặc điều chỉnh lại bộ lọc trạng thái và hãng xe."
          actionText="Đặt lại bộ lọc"
          onAction={() => setFilter({ search: '', brand: 'ALL', status: 'ALL' })}
        />
      ) : viewMode === 'grid' ? (
        /* Grid Mode */
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '20px',
          }}
        >
          {cars.map((car) => (
            <div
              key={car.id}
              className="card card-interactive"
              style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
            >
              {/* Image & Price */}
              <div style={{ position: 'relative', height: '190px', width: '100%' }}>
                <img
                  src={car.imageUrl}
                  alt={`${car.brand} ${car.model}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '6px' }}>
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
                </div>
                <div
                  style={{
                    position: 'absolute',
                    bottom: '12px',
                    right: '12px',
                    backgroundColor: 'rgba(15, 23, 42, 0.85)',
                    backdropFilter: 'blur(6px)',
                    padding: '6px 12px',
                    borderRadius: 'var(--radius-sm)',
                    color: '#ffffff',
                    fontWeight: 800,
                    fontSize: '1.05rem',
                  }}
                >
                  {formatCurrencyUSD(car.price)}
                </div>
              </div>

              {/* Info Body */}
              <div style={{ padding: '18px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase' }}>
                        {car.brand}
                      </p>
                      <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
                        {car.model}
                      </h3>
                    </div>
                    <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                      {car.year}
                    </span>
                  </div>

                  {/* Specs Quick Pills */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '10px 0',
                      marginTop: '8px',
                      borderTop: '1px solid var(--border-color)',
                      borderBottom: '1px solid var(--border-color)',
                      fontSize: '0.75rem',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Zap size={14} color="var(--color-primary)" />
                      <span>{car.specs.horsepower} HP</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Gauge size={14} color="var(--color-warning)" />
                      <span>{car.specs.acceleration}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Fuel size={14} color="var(--color-success)" />
                      <span>{car.fuelType}</span>
                    </div>
                  </div>
                </div>

                {/* Actions Footer */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: '16px',
                    paddingTop: '10px',
                  }}
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    leftIcon={<Eye size={14} />}
                    onClick={() => handleOpenDetailModal(car)}
                  >
                    Chi tiết
                  </Button>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {canManageCars && (
                      <button
                        onClick={() => handleOpenEditModal(car)}
                        style={{
                          padding: '6px',
                          borderRadius: 'var(--radius-sm)',
                          border: '1px solid var(--border-color)',
                          color: 'var(--text-secondary)',
                          backgroundColor: 'var(--bg-secondary)',
                        }}
                        title="Chỉnh sửa xe"
                      >
                        <Edit2 size={14} />
                      </button>
                    )}

                    {canDeleteCars && (
                      <button
                        onClick={() => setCarToDelete(car)}
                        style={{
                          padding: '6px',
                          borderRadius: 'var(--radius-sm)',
                          border: '1px solid var(--border-color)',
                          color: 'var(--color-danger)',
                          backgroundColor: 'var(--bg-secondary)',
                        }}
                        title="Xóa xe"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Table Mode */
        <Card style={{ padding: '0', overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', fontSize: '0.875rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)', backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                  <th style={{ padding: '14px 18px' }}>Hình Ảnh & Xe</th>
                  <th style={{ padding: '14px 18px' }}>Số VIN</th>
                  <th style={{ padding: '14px 18px' }}>Kiểu Dáng / Nhiên Liệu</th>
                  <th style={{ padding: '14px 18px' }}>Giá Niêm Yết</th>
                  <th style={{ padding: '14px 18px' }}>Trạng Thái</th>
                  <th style={{ padding: '14px 18px', textAlign: 'right' }}>Thao Tác</th>
                </tr>
              </thead>
              <tbody>
                {cars.map((car) => (
                  <tr
                    key={car.id}
                    style={{
                      borderBottom: '1px solid var(--border-color)',
                      transition: 'background-color var(--transition-fast)',
                    }}
                  >
                    <td style={{ padding: '14px 18px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <img
                          src={car.imageUrl}
                          alt={car.model}
                          style={{ width: '56px', height: '38px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }}
                        />
                        <div>
                          <p style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
                            {car.brand} {car.model}
                          </p>
                          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                            Năm {car.year} • {car.specs.horsepower} HP
                          </p>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '14px 18px', fontFamily: 'monospace', fontSize: '0.8125rem' }}>
                      {car.vin}
                    </td>
                    <td style={{ padding: '14px 18px' }}>
                      <span style={{ fontWeight: 500 }}>{car.bodyType}</span>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{car.fuelType}</div>
                    </td>
                    <td style={{ padding: '14px 18px', fontWeight: 800, color: 'var(--color-primary)' }}>
                      {formatCurrencyUSD(car.price)}
                    </td>
                    <td style={{ padding: '14px 18px' }}>
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
                    </td>
                    <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
                        <Button
                          variant="ghost"
                          size="sm"
                          leftIcon={<Eye size={14} />}
                          onClick={() => handleOpenDetailModal(car)}
                        >
                          Xem
                        </Button>
                        {canManageCars && (
                          <Button
                            variant="secondary"
                            size="sm"
                            leftIcon={<Edit2 size={14} />}
                            onClick={() => handleOpenEditModal(car)}
                          >
                            Sửa
                          </Button>
                        )}
                        {canDeleteCars && (
                          <button
                            onClick={() => setCarToDelete(car)}
                            style={{
                              padding: '6px',
                              borderRadius: 'var(--radius-sm)',
                              color: 'var(--color-danger)',
                            }}
                            title="Xóa"
                          >
                            <Trash2 size={15} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Pagination */}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
        totalItems={total}
        pageSize={pageSize}
      />

      {/* Add / Edit Form Modal */}
      <CarFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        carToEdit={carToEdit}
        onSubmit={handleSaveCar}
      />

      {/* Details Modal */}
      <CarDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        car={selectedCar}
        onEdit={(car) => handleOpenEditModal(car)}
      />

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={Boolean(carToDelete)}
        onClose={() => setCarToDelete(null)}
        title="Xác Nhận Xóa Xe"
        maxWidth="440px"
        footer={
          <>
            <Button variant="secondary" onClick={() => setCarToDelete(null)}>
              Hủy
            </Button>
            <Button variant="danger" onClick={handleConfirmDelete}>
              Xác Nhận Xóa
            </Button>
          </>
        }
      >
        <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
          Bạn có chắc chắn muốn xóa mẫu xe{' '}
          <strong style={{ color: 'var(--text-primary)' }}>
            {carToDelete?.brand} {carToDelete?.model}
          </strong>{' '}
          (VIN: {carToDelete?.vin}) khỏi kho hàng của showroom không? Thao tác này không thể hoàn tác.
        </p>
      </Modal>
    </div>
  );
};
