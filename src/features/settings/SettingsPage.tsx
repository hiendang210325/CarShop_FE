import React, { useState } from 'react';
import { Card, Input, Button, Select } from '../../components';
import { useToast } from '../../contexts/ToastContext';
import { useCarStore } from '../../stores';
import { Building2, Save, RefreshCw, ShieldCheck, Database } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { showToast } = useToast();
  const { resetToDefaultInventory } = useCarStore();

  const [companyInfo, setCompanyInfo] = useState({
    name: 'CarShop Enterprise Luxury Auto',
    taxCode: '0109988776',
    hotline: '1900 8899',
    email: 'contact@carshop.com',
    address: 'Số 88 Đường Lê Duẩn, Quận 1, TP. Hồ Chí Minh',
    currency: 'USD',
    minStockAlert: '2',
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Đã lưu cấu hình doanh nghiệp thành công!', 'success');
  };

  const handleResetData = async () => {
    await resetToDefaultInventory();
    showToast('Đã khôi phục toàn bộ kho xe và giao dịch về dữ liệu gốc!', 'info');
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)' }}>
          Cài Đặt Hệ Thống Showroom
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
          Quản trị thông số vận hành, thông tin pháp lý showroom và quản lý dữ liệu demo.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px' }}>
        {/* Business Info Form */}
        <Card title="Thông Tin Pháp Lý Doanh Nghiệp" subtitle="Thông tin sẽ xuất hiện trên hợp đồng mua bán xe và hóa đơn GTGT">
          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <Input
              label="Tên Doanh Nghiệp / Showroom"
              value={companyInfo.name}
              onChange={(e) => setCompanyInfo({ ...companyInfo, name: e.target.value })}
              leftIcon={<Building2 size={16} />}
            />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <Input
                label="Mã Số Thuế"
                value={companyInfo.taxCode}
                onChange={(e) => setCompanyInfo({ ...companyInfo, taxCode: e.target.value })}
              />
              <Input
                label="Hotline Kinh Doanh"
                value={companyInfo.hotline}
                onChange={(e) => setCompanyInfo({ ...companyInfo, hotline: e.target.value })}
              />
            </div>

            <Input
              label="Email Tiếp Nhận Hợp Đồng"
              value={companyInfo.email}
              onChange={(e) => setCompanyInfo({ ...companyInfo, email: e.target.value })}
            />

            <Input
              label="Địa Chỉ Trụ Sở & Showroom"
              value={companyInfo.address}
              onChange={(e) => setCompanyInfo({ ...companyInfo, address: e.target.value })}
            />

            <div style={{ marginTop: '10px' }}>
              <Button type="submit" variant="primary" leftIcon={<Save size={16} />}>
                Lưu Cấu Hình Doanh Nghiệp
              </Button>
            </div>
          </form>
        </Card>

        {/* System Operations & Maintenance */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Card title="Tùy Chọn Vận Hành & Bán Hàng" subtitle="Cấu hình luồng xử lý tự động">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <Select
                label="Đơn Vị Tiền Tệ Hiển Thị Mặc Định"
                value={companyInfo.currency}
                onChange={(e) => setCompanyInfo({ ...companyInfo, currency: e.target.value })}
                options={[
                  { label: 'USD ($ - Đô la Mỹ)', value: 'USD' },
                  { label: 'VND (₫ - Việt Nam Đồng)', value: 'VND' },
                ]}
              />

              <Input
                label="Cảnh Báo Tồn Kho Tối Thiểu (Số xe)"
                type="number"
                value={companyInfo.minStockAlert}
                onChange={(e) => setCompanyInfo({ ...companyInfo, minStockAlert: e.target.value })}
                helperText="Hệ thống sẽ gửi cảnh báo khi số lượng xe sẵn sàng giao nhỏ hơn mức này."
              />
            </div>
          </Card>

          <Card title="Quản Trị Dữ Liệu Demo" subtitle="Thao tác dành cho người dùng thử nghiệm">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Nếu bạn đã thêm, sửa hoặc xóa nhiều xe và muốn đưa hệ thống về trạng thái demo ban đầu với đầy đủ xe Porsche, Mercedes, BMW, Audi, Tesla:
              </p>
              <Button
                variant="secondary"
                leftIcon={<RefreshCw size={15} />}
                onClick={handleResetData}
              >
                Khôi Phục Dữ Liệu Ban Đầu
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
