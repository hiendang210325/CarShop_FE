import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  DollarSign,
  Car,
  FileCheck2,
  Users2,
  TrendingUp,
  ArrowUpRight,
  Plus,
  ShieldCheck,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import { useAuthStore, useCarStore } from '../../stores';
import { Card, Button, Badge } from '../../components';
import { MOCK_ORDERS } from '../../constants';
import { formatCurrencyUSD, formatDate } from '../../utils';
import { ROUTES } from '../../constants';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { cars } = useCarStore();

  const totalStockCount = cars.length > 0 ? cars.length : 6;
  const availableCount = cars.filter((c) => c.status === 'AVAILABLE').length || 4;

  const kpis = [
    {
      title: 'Tổng Doanh Thu Tháng',
      value: '$356,000',
      change: '+18.4%',
      positive: true,
      icon: <DollarSign size={22} color="var(--color-primary)" />,
      badgeBg: 'var(--color-primary-light)',
    },
    {
      title: 'Xe Trong Kho (Showroom)',
      value: `${totalStockCount} xe`,
      subText: `${availableCount} xe sẵn sàng giao ngay`,
      change: '+3 xe mới',
      positive: true,
      icon: <Car size={22} color="var(--color-success)" />,
      badgeBg: 'var(--color-success-light)',
    },
    {
      title: 'Hợp Đồng & Cọc',
      value: `${MOCK_ORDERS.length} hợp đồng`,
      subText: '2 hợp đồng chờ giải ngân',
      change: '+8.2%',
      positive: true,
      icon: <FileCheck2 size={22} color="var(--color-warning)" />,
      badgeBg: 'var(--color-warning-light)',
    },
    {
      title: 'Khách Hẹn Lái Thử',
      value: '14 lượt',
      subText: 'Tỉ lệ chốt đơn đạt 32%',
      change: '+24%',
      positive: true,
      icon: <Users2 size={22} color="#8b5cf6" />,
      badgeBg: 'rgba(139, 92, 246, 0.12)',
    },
  ];

  const brandDistribution = [
    { brand: 'Porsche', share: 38, count: '3 xe', color: '#ef4444' },
    { brand: 'Mercedes-Benz', share: 32, count: '4 xe', color: '#3b82f6' },
    { brand: 'BMW M Power', share: 18, count: '2 xe', color: '#10b981' },
    { brand: 'Lexus & Audi', share: 12, count: '2 xe', color: '#f59e0b' },
  ];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Welcome Banner */}
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Xin chào, {user?.fullName}!
            </h1>
            <Badge variant="primary" icon={<ShieldCheck size={12} />}>
              {user?.role}
            </Badge>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            Tổng hợp tình hình kinh doanh, số liệu tồn kho và hợp đồng giao xe trong ngày.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {user?.role === 'ADMIN' && (
            <Button
              variant="outline"
              leftIcon={<Users2 size={16} />}
              onClick={() => navigate(ROUTES.USERS)}
            >
              Quản Lý Người Dùng
            </Button>
          )}
          <Button
            variant="primary"
            leftIcon={<Plus size={16} />}
            onClick={() => navigate(ROUTES.CARS)}
          >
            Quản Lý Kho Xe
          </Button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '18px',
        }}
      >
        {kpis.map((kpi, idx) => (
          <Card key={idx} className="card-interactive">
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '4px' }}>
                  {kpi.title}
                </p>
                <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  {kpi.value}
                </h3>
              </div>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: kpi.badgeBg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {kpi.icon}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--color-success)', fontWeight: 600 }}>
                <TrendingUp size={14} />
                <span>{kpi.change}</span>
              </div>
              <span style={{ color: 'var(--text-muted)' }}>{kpi.subText || 'So với tháng trước'}</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Mid Section: Brand Distribution + Operations Overview */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '20px',
        }}
      >
        {/* Brand Share Card */}
        <Card
          title="Tỷ Trọng Doanh Thu Phân Khúc"
          subtitle="Thống kê cơ cấu doanh thu theo các thương hiệu xe trong tháng"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '8px' }}>
            {brandDistribution.map((item) => (
              <div key={item.brand}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', marginBottom: '6px' }}>
                  <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{item.brand}</span>
                  <span style={{ color: 'var(--text-muted)' }}>{item.count} ({item.share}%)</span>
                </div>
                <div
                  style={{
                    height: '8px',
                    width: '100%',
                    backgroundColor: 'var(--bg-tertiary)',
                    borderRadius: 'var(--radius-full)',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: `${item.share}%`,
                      backgroundColor: item.color,
                      borderRadius: 'var(--radius-full)',
                      transition: 'width 0.8s ease',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Operational Status */}
        <Card
          title="Quy Trình Giao Nhận Xe Hôm Nay"
          subtitle="Trạng thái hồ sơ đăng ký biển số & bàn giao chìa khóa cho khách"
          action={
            <Button variant="ghost" size="sm" rightIcon={<ArrowUpRight size={14} />} onClick={() => navigate(ROUTES.ORDERS)}>
              Xem tất cả
            </Button>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-tertiary)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <CheckCircle2 size={20} color="var(--color-success)" />
                <div>
                  <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    Bàn giao Audi RS6 Avant
                  </p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Khách: Nguyễn Văn Hùng • Nhân viên: Lê Thảo My
                  </p>
                </div>
              </div>
              <Badge variant="success">Hoàn Tất</Badge>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-tertiary)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Clock size={20} color="var(--color-warning)" />
                <div>
                  <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    Thẩm định vay trả góp BMW M4
                  </p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Khách: Phạm Đăng Khoa • Nhân viên: Trần Minh Hoàng
                  </p>
                </div>
              </div>
              <Badge variant="warning">Chờ Duyệt</Badge>
            </div>
          </div>
        </Card>
      </div>

      {/* Bottom Section: Recent Orders Table */}
      <Card
        title="Hợp Đồng Giao Dịch Gần Đây"
        subtitle="Danh sách các đơn đặt cọc và hợp đồng ký kết trong hệ thống"
        action={
          <Button variant="outline" size="sm" onClick={() => navigate(ROUTES.ORDERS)}>
            Quản lý đơn hàng
          </Button>
        }
      >
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', fontSize: '0.875rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                <th style={{ padding: '12px 14px' }}>Mã HĐ</th>
                <th style={{ padding: '12px 14px' }}>Khách Hàng</th>
                <th style={{ padding: '12px 14px' }}>Tổng Giá Trị</th>
                <th style={{ padding: '12px 14px' }}>Tiền Cọc</th>
                <th style={{ padding: '12px 14px' }}>Trạng Thái</th>
                <th style={{ padding: '12px 14px' }}>Ngày Tạo</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_ORDERS.map((order) => (
                <tr
                  key={order.id}
                  style={{
                    borderBottom: '1px solid var(--border-color)',
                    transition: 'background-color var(--transition-fast)',
                  }}
                >
                  <td style={{ padding: '14px', fontWeight: 600, color: 'var(--color-primary)' }}>
                    {order.orderCode}
                  </td>
                  <td style={{ padding: '14px' }}>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{order.customerName}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{order.customerPhone}</div>
                  </td>
                  <td style={{ padding: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {formatCurrencyUSD(order.totalAmount)}
                  </td>
                  <td style={{ padding: '14px', color: 'var(--color-success)', fontWeight: 600 }}>
                    {formatCurrencyUSD(order.depositAmount)}
                  </td>
                  <td style={{ padding: '14px' }}>
                    <Badge
                      variant={
                        order.status === 'COMPLETED'
                          ? 'success'
                          : order.status === 'APPROVED'
                          ? 'primary'
                          : 'warning'
                      }
                    >
                      {order.status}
                    </Badge>
                  </td>
                  <td style={{ padding: '14px', color: 'var(--text-muted)', fontSize: '0.8125rem' }}>
                    {formatDate(order.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
