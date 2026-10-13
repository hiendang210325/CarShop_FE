import React, { useEffect, useState } from 'react';
import { customerService } from '../../api/customerService';
import { CustomerLead, LeadStatus } from '../../types';
import { Card, Badge, Button, Input, Modal, Select, Spinner } from '../../components';
import { useToast } from '../../contexts/ToastContext';
import { Phone, Mail, UserPlus, Calendar, CheckCircle2 } from 'lucide-react';
import { formatDate } from '../../utils';

export const CustomersPage: React.FC = () => {
  const { showToast } = useToast();
  const [leads, setLeads] = useState<CustomerLead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [newLead, setNewLead] = useState({
    fullName: '',
    phone: '',
    email: '',
    interestedCarBrand: 'Porsche',
    interestedCarModel: '911 Carrera S',
    budgetRange: '$100k - $150k',
    status: 'NEW' as LeadStatus,
    notes: '',
    assignedStaffName: 'Lê Thảo My',
  });

  const loadLeads = async () => {
    setIsLoading(true);
    try {
      const data = await customerService.getLeads();
      setLeads(data);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadLeads();
  }, []);

  const handleAddLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLead.fullName || !newLead.phone) {
      showToast('Vui lòng nhập họ tên và số điện thoại khách hàng', 'error');
      return;
    }
    try {
      await customerService.addLead(newLead);
      showToast(`Đã thêm khách hàng tiềm năng: ${newLead.fullName}`, 'success');
      setIsModalOpen(false);
      loadLeads();
      setNewLead({
        fullName: '',
        phone: '',
        email: '',
        interestedCarBrand: 'Porsche',
        interestedCarModel: '911 Carrera S',
        budgetRange: '$100k - $150k',
        status: 'NEW',
        notes: '',
        assignedStaffName: 'Lê Thảo My',
      });
    } catch {
      showToast('Có lỗi xảy ra khi lưu khách hàng', 'error');
    }
  };

  const handleStatusChange = async (id: string, status: LeadStatus) => {
    try {
      await customerService.updateLeadStatus(id, status);
      showToast('Đã cập nhật giai đoạn chăm sóc khách hàng', 'success');
      loadLeads();
    } catch {
      showToast('Có lỗi xảy ra', 'error');
    }
  };

  const getStatusBadge = (status: LeadStatus) => {
    switch (status) {
      case 'WON':
        return <Badge variant="success" icon={<CheckCircle2 size={12} />}>Đã Ký Hợp Đồng</Badge>;
      case 'TEST_DRIVE_SCHEDULED':
        return <Badge variant="primary" icon={<Calendar size={12} />}>Hẹn Lái Thử</Badge>;
      case 'NEGOTIATING':
        return <Badge variant="warning">Đang Đàm Phán</Badge>;
      case 'CONTACTED':
        return <Badge variant="neutral">Đã Liên Hệ</Badge>;
      case 'LOST':
        return <Badge variant="danger">Thất Bại</Badge>;
      case 'NEW':
      default:
        return <Badge variant="primary">Khách Mới</Badge>;
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            Quản Lý Khách Hàng & Leads
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            Phễu tiếp nhận khách hàng quan tâm lái thử và mua xe tại showroom.
          </p>
        </div>

        <Button
          variant="primary"
          leftIcon={<UserPlus size={16} />}
          onClick={() => setIsModalOpen(true)}
        >
          Tiếp Nhận Lead Mới
        </Button>
      </div>

      {/* Leads Grid */}
      {isLoading ? (
        <Spinner size={36} />
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '18px' }}>
          {leads.map((lead) => (
            <Card key={lead.id} className="card-interactive">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {lead.fullName}
                  </h3>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Tạo ngày: {formatDate(lead.createdAt)}
                  </span>
                </div>
                {getStatusBadge(lead.status)}
              </div>

              {/* Interest Info */}
              <div
                style={{
                  padding: '10px 12px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-tertiary)',
                  marginBottom: '14px',
                  fontSize: '0.8125rem',
                }}
              >
                <p style={{ color: 'var(--text-muted)', marginBottom: '2px' }}>Dòng xe quan tâm:</p>
                <p style={{ fontWeight: 700, color: 'var(--color-primary)' }}>
                  {lead.interestedCarBrand} {lead.interestedCarModel}
                </p>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  Ngân sách: <strong>{lead.budgetRange}</strong>
                </p>
              </div>

              {/* Contact info */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.8125rem', marginBottom: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}>
                  <Phone size={14} color="var(--color-primary)" />
                  <span>{lead.phone}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}>
                  <Mail size={14} color="var(--text-muted)" />
                  <span>{lead.email}</span>
                </div>
              </div>

              {/* Note */}
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontStyle: 'italic', marginBottom: '14px', borderLeft: '2px solid var(--border-color)', paddingLeft: '8px' }}>
                "{lead.notes}"
              </p>

              {/* Phase Switcher */}
              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
                <Select
                  value={lead.status}
                  onChange={(e) => handleStatusChange(lead.id, e.target.value as LeadStatus)}
                  options={[
                    { label: 'Giai đoạn: Khách Mới (NEW)', value: 'NEW' },
                    { label: 'Giai đoạn: Đã Liên Hệ (CONTACTED)', value: 'CONTACTED' },
                    { label: 'Giai đoạn: Hẹn Lái Thử (TEST_DRIVE)', value: 'TEST_DRIVE_SCHEDULED' },
                    { label: 'Giai đoạn: Đang Đàm Phán (NEGOTIATING)', value: 'NEGOTIATING' },
                    { label: 'Giai đoạn: Đã Ký Hợp Đồng (WON)', value: 'WON' },
                    { label: 'Giai đoạn: Thất Bại (LOST)', value: 'LOST' },
                  ]}
                />
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Add Lead Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Tiếp Nhận Khách Hàng Tiềm Năng Mới"
        maxWidth="500px"
        footer={
          <>
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Hủy</Button>
            <Button variant="primary" onClick={handleAddLead}>Lưu Khách Hàng</Button>
          </>
        }
      >
        <form onSubmit={handleAddLead} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <Input
            label="Họ Tên Khách Hàng *"
            value={newLead.fullName}
            onChange={(e) => setNewLead({ ...newLead, fullName: e.target.value })}
            placeholder="Nguyễn Văn A"
            required
          />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <Input
              label="Số Điện Thoại *"
              value={newLead.phone}
              onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })}
              placeholder="0988 123 456"
              required
            />
            <Input
              label="Email"
              value={newLead.email}
              onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
              placeholder="client@company.com"
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <Input
              label="Hãng Xe Quan Tâm"
              value={newLead.interestedCarBrand}
              onChange={(e) => setNewLead({ ...newLead, interestedCarBrand: e.target.value })}
            />
            <Input
              label="Dòng Xe (Model)"
              value={newLead.interestedCarModel}
              onChange={(e) => setNewLead({ ...newLead, interestedCarModel: e.target.value })}
            />
          </div>
          <Input
            label="Dự Toán Ngân Sách"
            value={newLead.budgetRange}
            onChange={(e) => setNewLead({ ...newLead, budgetRange: e.target.value })}
            placeholder="$80k - $120k"
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
              Nhu cầu / Ghi chú ban đầu
            </label>
            <textarea
              rows={3}
              value={newLead.notes}
              onChange={(e) => setNewLead({ ...newLead, notes: e.target.value })}
              style={{
                padding: '10px 14px',
                fontSize: '0.875rem',
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--text-primary)',
              }}
              placeholder="Quan tâm màu sắc nào, thời gian dự kiến lấy xe..."
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};
