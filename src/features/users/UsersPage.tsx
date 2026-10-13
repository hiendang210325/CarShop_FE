import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { userService } from '../../api/userService';
import { User, Role } from '../../types';
import { useToast } from '../../contexts/ToastContext';
import { useAuthStore } from '../../stores';
import {
  Users,
  ShieldCheck,
  Briefcase,
  Search,
  RefreshCw,
  Lock,
  Unlock,
  Trash2,
  Edit3,
  CheckCircle2,
  X,
  Award,
  UserCheck,
  Download,
  Eye,
  Check,
} from 'lucide-react';
import { formatDate } from '../../utils';

export const UsersPage: React.FC = () => {
  const { showToast } = useToast();
  const { user: currentUser } = useAuthStore();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Modal: Edit Role
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [selectedNewRole, setSelectedNewRole] = useState<Role>('CUSTOMER');
  const [isUpdatingRole, setIsUpdatingRole] = useState(false);

  // Modal: View Detail Profile
  const [viewingUser, setViewingUser] = useState<User | null>(null);

  // Load users from PostgreSQL backend
  const loadUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await userService.getUsers();
      setUsers(data);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Không thể tải danh sách người dùng từ Database';
      showToast(msg, 'error');
    } finally {
      setIsLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  // Filtered users calculation
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const q = search.toLowerCase().trim();
      const matchSearch =
        !q ||
        u.fullName?.toLowerCase().includes(q) ||
        u.email?.toLowerCase().includes(q) ||
        u.phone?.toLowerCase().includes(q) ||
        u.id?.toLowerCase().includes(q);

      const matchRole =
        roleFilter === 'ALL' ||
        (roleFilter === 'ADMIN' && u.role === 'ADMIN') ||
        (roleFilter === 'MANAGEMENT' && (u.role === 'SALES_MANAGER' || u.role === 'STAFF')) ||
        (roleFilter === 'CUSTOMER' && u.role === 'CUSTOMER') ||
        u.role === roleFilter;

      const matchStatus =
        statusFilter === 'ALL' ||
        (statusFilter === 'ACTIVE' && u.isActive !== false) ||
        (statusFilter === 'LOCKED' && u.isActive === false);

      return matchSearch && matchRole && matchStatus;
    });
  }, [users, search, roleFilter, statusFilter]);

  // Statistics calculation
  const stats = useMemo(() => {
    return {
      total: users.length,
      admins: users.filter((u) => u.role === 'ADMIN').length,
      staff: users.filter((u) => u.role === 'STAFF' || u.role === 'SALES_MANAGER').length,
      customers: users.filter((u) => u.role === 'CUSTOMER').length,
      active: users.filter((u) => u.isActive !== false).length,
      locked: users.filter((u) => u.isActive === false).length,
    };
  }, [users]);

  // Toggle User Lock/Unlock Status
  const handleToggleStatus = async (targetUser: User) => {
    if (targetUser.id === currentUser?.id) {
      showToast('Bạn không thể tự khóa tài khoản của chính mình!', 'warning');
      return;
    }

    const newStatus = targetUser.isActive === false;
    try {
      await userService.updateUserStatus(targetUser.id, newStatus);
      showToast(
        newStatus
          ? `Đã kích hoạt tài khoản "${targetUser.fullName}"`
          : `Đã tạm khóa tài khoản "${targetUser.fullName}"`,
        'success'
      );
      loadUsers();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Cập nhật trạng thái thất bại';
      showToast(msg, 'error');
    }
  };

  // Open Edit Role Modal
  const handleOpenEditRole = (targetUser: User) => {
    setEditingUser(targetUser);
    setSelectedNewRole(targetUser.role);
  };

  // Save Role Change
  const handleSaveRole = async () => {
    if (!editingUser) return;
    if (editingUser.id === currentUser?.id && selectedNewRole !== 'ADMIN') {
      showToast('Bạn không thể tự hạ quyền của chính tài khoản mình!', 'warning');
      return;
    }

    setIsUpdatingRole(true);
    try {
      await userService.updateUserRole(editingUser.id, selectedNewRole);
      showToast(`Đã cập nhật vai trò của "${editingUser.fullName}" thành [${selectedNewRole}]`, 'success');
      setEditingUser(null);
      loadUsers();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Cập nhật vai trò thất bại';
      showToast(msg, 'error');
    } finally {
      setIsUpdatingRole(false);
    }
  };

  // Delete User
  const handleDeleteUser = async (targetUser: User) => {
    if (targetUser.id === currentUser?.id) {
      showToast('Bạn không thể tự xóa tài khoản của chính mình!', 'warning');
      return;
    }

    if (!window.confirm(`Xác nhận xóa tài khoản "${targetUser.fullName}" (${targetUser.email})?`)) {
      return;
    }

    try {
      await userService.deleteUser(targetUser.id);
      showToast(`Đã xóa tài khoản "${targetUser.fullName}"`, 'success');
      loadUsers();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Xóa người dùng thất bại';
      showToast(msg, 'error');
    }
  };

  // Export CSV
  const handleExportCSV = () => {
    if (users.length === 0) {
      showToast('Chưa có dữ liệu để xuất!', 'info');
      return;
    }
    const headers = ['ID', 'Họ Và Tên', 'Email', 'Số Điện Thoại', 'Vai Trò', 'Phòng Ban', 'Trạng Thái', 'Ngày Đăng Ký'];
    const rows = users.map((u) => [
      u.id,
      `"${u.fullName}"`,
      u.email,
      u.phone || 'Chưa có',
      u.role,
      `"${u.department || 'Khách hàng'}"`,
      u.isActive !== false ? 'Hoạt động' : 'Đã khóa',
      formatDate(u.createdAt),
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `CarShop_Users_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Đã xuất danh sách người dùng sang CSV', 'success');
  };

  // Role visual specs
  const getRoleBadge = (role: Role) => {
    switch (role) {
      case 'ADMIN':
        return {
          label: 'Quản Trị Viên',
          badgeClass: 'bg-rose-50 text-rose-700 border-rose-200',
          icon: <ShieldCheck size={12} className="text-rose-600" />,
        };
      case 'SALES_MANAGER':
        return {
          label: 'Trưởng Phòng',
          badgeClass: 'bg-amber-50 text-amber-700 border-amber-200',
          icon: <Award size={12} className="text-amber-600" />,
        };
      case 'STAFF':
        return {
          label: 'Chuyên Viên',
          badgeClass: 'bg-blue-50 text-[#0066ff] border-blue-200',
          icon: <Briefcase size={12} className="text-[#0066ff]" />,
        };
      case 'CUSTOMER':
      default:
        return {
          label: 'Khách Hàng',
          badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          icon: <UserCheck size={12} className="text-emerald-600" />,
        };
    }
  };

  // Role options for modal
  const ROLE_OPTIONS = [
    {
      id: 'CUSTOMER' as Role,
      title: 'Khách Hàng (User)',
      desc: 'Tài khoản người dùng xem kho xe trực tuyến, đăng ký lái thử, gửi yêu cầu định giá xe cũ.',
      icon: <UserCheck size={18} className="text-emerald-600" />,
    },
    {
      id: 'STAFF' as Role,
      title: 'Chuyên Viên Tư Vấn (Staff)',
      desc: 'Xem và cập nhật kho xe, tiếp nhận khách hàng, tạo đơn hàng và theo dõi lái thử.',
      icon: <Briefcase size={18} className="text-[#0066ff]" />,
    },
    {
      id: 'SALES_MANAGER' as Role,
      title: 'Trưởng Phòng Kinh Doanh (Sales Manager)',
      desc: 'Quản lý toàn bộ giao dịch, duyệt hợp đồng, phân bổ khách hàng tiềm năng.',
      icon: <Award size={18} className="text-amber-600" />,
    },
    {
      id: 'ADMIN' as Role,
      title: 'Quản Trị Viên (Admin)',
      desc: 'Toàn quyền quản trị cơ sở dữ liệu, phân quyền tài khoản và cấu hình hệ thống.',
      icon: <ShieldCheck size={18} className="text-rose-600" />,
    },
  ];

  return (
    <div className="space-y-3 pb-8 animate-fade-in font-sans">
      {/* 1. HEADER COMPACT (TINH GỌN) */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-slate-900 tracking-tight">
            Quản Lý Người Dùng & Phân Quyền
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Danh sách tài khoản nhân viên showroom và khách hàng ({users.length} tài khoản)
          </p>
        </div>
      </div>

      {/* 2. STATS BAR (4 Ô NHỎ GỌN, BORDER 10PX) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
        {/* Total */}
        <div className="bg-white p-3 rounded-[10px] border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
              Tổng Tài Khoản
            </span>
            <div className="text-xl font-bold text-slate-900 mt-0.5">
              {stats.total}
            </div>
          </div>
          <div className="w-8 h-8 rounded-[10px] bg-blue-50 text-[#0066ff] flex items-center justify-center">
            <Users size={16} />
          </div>
        </div>

        {/* Admins */}
        <div className="bg-white p-3 rounded-[10px] border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
              Ban Quản Trị
            </span>
            <div className="text-xl font-bold text-rose-600 mt-0.5">
              {stats.admins}
            </div>
          </div>
          <div className="w-8 h-8 rounded-[10px] bg-rose-50 text-rose-600 flex items-center justify-center">
            <ShieldCheck size={16} />
          </div>
        </div>

        {/* Staff */}
        <div className="bg-white p-3 rounded-[10px] border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
              Nhân Sự & Sales
            </span>
            <div className="text-xl font-bold text-amber-600 mt-0.5">
              {stats.staff}
            </div>
          </div>
          <div className="w-8 h-8 rounded-[10px] bg-amber-50 text-amber-600 flex items-center justify-center">
            <Briefcase size={16} />
          </div>
        </div>

        {/* Customers */}
        <div className="bg-white p-3 rounded-[10px] border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
              Khách Hàng
            </span>
            <div className="text-xl font-bold text-emerald-600 mt-0.5">
              {stats.customers}
            </div>
          </div>
          <div className="w-8 h-8 rounded-[10px] bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <UserCheck size={16} />
          </div>
        </div>
      </div>

      {/* 3. TOOLBAR TINH GỌN (GỘP TÌM KIẾM, LỌC, XUẤT CSV, LÀM MỚI VÀO CHUNG 1 KHỐI BORDER 10PX) */}
      <div className="bg-white p-2.5 rounded-[10px] border border-slate-200/80 shadow-2xs flex flex-col lg:flex-row lg:items-center justify-between gap-2.5">
        {/* Role Filter Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
          {[
            { id: 'ALL', label: `Tất Cả (${users.length})` },
            { id: 'ADMIN', label: `Quản Trị (${stats.admins})` },
            { id: 'MANAGEMENT', label: `Nhân Sự (${stats.staff})` },
            { id: 'CUSTOMER', label: `Khách Hàng (${stats.customers})` },
          ].map((tab) => {
            const active = roleFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setRoleFilter(tab.id)}
                className={`px-2.5 py-1.5 rounded-[10px] text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  active
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Search, Status, Làm Mới & Xuất CSV */}
        <div className="flex items-center flex-wrap gap-2">
          {/* Search Input */}
          <div className="relative w-full sm:w-52">
            <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm tên, email, SĐT..."
              className="w-full pl-8 pr-7 py-1.5 rounded-[10px] bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#0066ff] focus:border-[#0066ff]"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X size={13} />
              </button>
            )}
          </div>

          {/* Status Dropdown */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-2 py-1.5 rounded-[10px] bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#0066ff] cursor-pointer"
          >
            <option value="ALL">Tất Cả Trạng Thái</option>
            <option value="ACTIVE">Hoạt Động</option>
            <option value="LOCKED">Tạm Khóa</option>
          </select>

          {/* Reset Filters */}
          {(search || roleFilter !== 'ALL' || statusFilter !== 'ALL') && (
            <button
              onClick={() => {
                setSearch('');
                setRoleFilter('ALL');
                setStatusFilter('ALL');
              }}
              title="Xóa bộ lọc"
              className="p-1.5 rounded-[10px] text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all cursor-pointer"
            >
              <X size={14} />
            </button>
          )}

          {/* Nút Làm Mới (Gộp vào đây) */}
          <button
            onClick={loadUsers}
            disabled={isLoading}
            title="Làm mới dữ liệu từ PostgreSQL"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] text-xs font-semibold bg-[#0066ff] hover:bg-blue-600 text-white shadow-xs transition-all cursor-pointer disabled:opacity-70"
          >
            <RefreshCw size={13} className={isLoading ? 'animate-spin' : ''} />
            <span>Làm Mới</span>
          </button>

          {/* Nút Xuất CSV (Gộp vào đây) */}
          <button
            onClick={handleExportCSV}
            title="Xuất file danh sách người dùng"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] text-xs font-semibold bg-slate-100 hover:bg-slate-200/80 text-slate-700 border border-slate-200 transition-all cursor-pointer"
          >
            <Download size={13} />
            <span>Xuất CSV</span>
          </button>
        </div>
      </div>

      {/* 4. USER DIRECTORY TABLE (BORDER 10PX) */}
      <div className="bg-white rounded-[10px] border border-slate-200/80 shadow-2xs overflow-hidden">
        {isLoading ? (
          <div className="py-12 text-center space-y-2">
            <RefreshCw size={22} className="animate-spin text-[#0066ff] mx-auto" />
            <p className="text-xs text-slate-500 font-medium">Đang tải danh sách tài khoản từ PostgreSQL...</p>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="py-12 text-center space-y-2">
            <Users size={28} className="text-slate-300 mx-auto" />
            <p className="text-xs text-slate-500 font-medium">Không tìm thấy người dùng phù hợp với bộ lọc</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/70 border-b border-slate-200/80 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  <th className="py-2.5 px-3.5">Người Dùng</th>
                  <th className="py-2.5 px-3.5">Vai Trò</th>
                  <th className="py-2.5 px-3.5">Liên Hệ</th>
                  <th className="py-2.5 px-3.5">Phòng Ban</th>
                  <th className="py-2.5 px-3.5">Trạng Thái</th>
                  <th className="py-2.5 px-3.5">Ngày Tạo</th>
                  <th className="py-2.5 px-3.5 text-right">Thao Tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredUsers.map((u) => {
                  const isCurrent = u.id === currentUser?.id;
                  const isActive = u.isActive !== false;
                  const roleBadge = getRoleBadge(u.role);

                  return (
                    <tr
                      key={u.id}
                      className={`hover:bg-slate-50/80 transition-colors ${
                        isCurrent ? 'bg-blue-50/25' : ''
                      }`}
                    >
                      {/* Name + Avatar */}
                      <td className="py-2.5 px-3.5">
                        <div className="flex items-center gap-2.5">
                          <div className="relative shrink-0">
                            <img
                              src={
                                u.avatarUrl ||
                                'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'
                              }
                              alt={u.fullName}
                              className="w-8 h-8 rounded-full object-cover border border-slate-200"
                            />
                            <span
                              className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white ${
                                isActive ? 'bg-emerald-500' : 'bg-rose-500'
                              }`}
                            />
                          </div>

                          <div className="leading-tight">
                            <div className="flex items-center gap-1.5 font-bold text-slate-900">
                              <span>{u.fullName}</span>
                              {isCurrent && (
                                <span className="px-1.5 py-0.2 rounded-[10px] text-[9px] font-bold bg-[#0066ff] text-white">
                                  Bạn
                                </span>
                              )}
                            </div>
                            <span className="text-[11px] text-slate-400">{u.email}</span>
                          </div>
                        </div>
                      </td>

                      {/* Role */}
                      <td className="py-2.5 px-3.5">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-[10px] text-[11px] font-bold border ${roleBadge.badgeClass}`}
                        >
                          {roleBadge.icon}
                          {roleBadge.label}
                        </span>
                      </td>

                      {/* Phone */}
                      <td className="py-2.5 px-3.5 text-slate-600 font-mono text-[11px]">
                        {u.phone || '—'}
                      </td>

                      {/* Department */}
                      <td className="py-2.5 px-3.5 text-slate-600">
                        {u.department || (u.role === 'CUSTOMER' ? 'Khách hàng' : 'Showroom')}
                      </td>

                      {/* Status */}
                      <td className="py-2.5 px-3.5">
                        {isActive ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[10px] text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            Hoạt động
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[10px] text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                            <Lock size={10} />
                            Đã khóa
                          </span>
                        )}
                      </td>

                      {/* Created date */}
                      <td className="py-2.5 px-3.5 text-slate-500 text-[11px]">
                        {formatDate(u.createdAt)}
                      </td>

                      {/* Actions */}
                      <td className="py-2.5 px-3.5 text-right">
                        <div className="flex items-center justify-end gap-1">
                          {/* View Detail */}
                          <button
                            onClick={() => setViewingUser(u)}
                            title="Xem chi tiết"
                            className="p-1.5 rounded-[10px] text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-all cursor-pointer"
                          >
                            <Eye size={14} />
                          </button>

                          {/* Edit Role */}
                          <button
                            onClick={() => handleOpenEditRole(u)}
                            title="Phân quyền vai trò"
                            className="p-1.5 rounded-[10px] text-[#0066ff] hover:bg-blue-50 transition-all cursor-pointer"
                          >
                            <Edit3 size={14} />
                          </button>

                          {/* Lock / Unlock */}
                          <button
                            disabled={isCurrent}
                            onClick={() => handleToggleStatus(u)}
                            title={isActive ? 'Khóa tài khoản' : 'Mở khóa tài khoản'}
                            className={`p-1.5 rounded-[10px] transition-all cursor-pointer ${
                              isCurrent
                                ? 'opacity-30 cursor-not-allowed text-slate-300'
                                : isActive
                                ? 'text-amber-600 hover:bg-amber-50'
                                : 'text-emerald-600 hover:bg-emerald-50'
                            }`}
                          >
                            {isActive ? <Lock size={14} /> : <Unlock size={14} />}
                          </button>

                          {/* Delete */}
                          <button
                            disabled={isCurrent}
                            onClick={() => handleDeleteUser(u)}
                            title="Xóa tài khoản"
                            className={`p-1.5 rounded-[10px] transition-all cursor-pointer ${
                              isCurrent
                                ? 'opacity-30 cursor-not-allowed text-slate-300'
                                : 'text-rose-500 hover:bg-rose-50'
                            }`}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Footer info */}
        <div className="py-2 px-3.5 bg-slate-50 border-t border-slate-200/80 flex items-center justify-between text-[11px] text-slate-500">
          <span>Hiển thị <strong>{filteredUsers.length}</strong> / <strong>{users.length}</strong> tài khoản</span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Cơ sở dữ liệu PostgreSQL
          </span>
        </div>
      </div>

      {/* 5. MODAL: PHÂN QUYỀN VAI TRÒ (BORDER 10PX) */}
      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-[10px] max-w-lg w-full p-5 shadow-xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Phân Quyền Vai Trò
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Tài khoản: <strong className="text-slate-800">{editingUser.fullName}</strong> ({editingUser.email})
                </p>
              </div>
              <button
                onClick={() => setEditingUser(null)}
                className="p-1 rounded-[10px] text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <div className="space-y-2">
              {ROLE_OPTIONS.map((opt) => {
                const isSelected = selectedNewRole === opt.id;
                return (
                  <div
                    key={opt.id}
                    onClick={() => setSelectedNewRole(opt.id)}
                    className={`p-3 rounded-[10px] border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'border-[#0066ff] bg-blue-50/40 ring-1 ring-[#0066ff]'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-[10px] bg-white border border-slate-100 shadow-2xs">
                        {opt.icon}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">{opt.title}</div>
                        <div className="text-[11px] text-slate-500 mt-0.5">{opt.desc}</div>
                      </div>
                    </div>
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                        isSelected ? 'border-[#0066ff] bg-[#0066ff] text-white' : 'border-slate-300'
                      }`}
                    >
                      {isSelected && <Check size={10} strokeWidth={3} />}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setEditingUser(null)}
                className="px-3.5 py-1.5 rounded-[10px] text-xs font-semibold text-slate-600 hover:bg-slate-100 border border-slate-200 cursor-pointer"
              >
                Hủy
              </button>
              <button
                disabled={isUpdatingRole}
                onClick={handleSaveRole}
                className="px-4 py-1.5 rounded-[10px] text-xs font-semibold bg-[#0066ff] hover:bg-blue-600 text-white shadow-xs disabled:opacity-60 cursor-pointer"
              >
                {isUpdatingRole ? 'Đang lưu...' : 'Xác nhận'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. MODAL: CHI TIẾT HỒ SƠ (BORDER 10PX) */}
      {viewingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-[10px] max-w-md w-full p-5 shadow-xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <h3 className="text-base font-bold text-slate-900">Chi Tiết Hồ Sơ</h3>
              <button
                onClick={() => setViewingUser(null)}
                className="p-1 rounded-[10px] text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-[10px] border border-slate-100">
              <img
                src={
                  viewingUser.avatarUrl ||
                  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'
                }
                alt={viewingUser.fullName}
                className="w-12 h-12 rounded-full object-cover border border-slate-200"
              />
              <div>
                <h4 className="text-sm font-bold text-slate-900">{viewingUser.fullName}</h4>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className={`px-2 py-0.5 rounded-[10px] text-[10px] font-bold border ${getRoleBadge(viewingUser.role).badgeClass}`}>
                    {getRoleBadge(viewingUser.role).label}
                  </span>
                  <span className={`px-2 py-0.5 rounded-[10px] text-[10px] font-bold ${
                    viewingUser.isActive !== false ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                  }`}>
                    {viewingUser.isActive !== false ? 'Hoạt động' : 'Tạm khóa'}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-[10px] bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-400">Email</span>
                <p className="font-semibold text-slate-800 truncate mt-0.5">{viewingUser.email}</p>
              </div>
              <div className="p-2.5 rounded-[10px] bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-400">Số Điện Thoại</span>
                <p className="font-semibold text-slate-800 mt-0.5">{viewingUser.phone || 'Chưa cập nhật'}</p>
              </div>
              <div className="p-2.5 rounded-[10px] bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-400">Phòng Ban</span>
                <p className="font-semibold text-slate-800 mt-0.5">{viewingUser.department || 'Khách hàng'}</p>
              </div>
              <div className="p-2.5 rounded-[10px] bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-400">Ngày Tạo</span>
                <p className="font-semibold text-slate-800 mt-0.5">{formatDate(viewingUser.createdAt)}</p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setViewingUser(null)}
                className="px-3.5 py-1.5 rounded-[10px] text-xs font-semibold text-slate-600 hover:bg-slate-100 border border-slate-200 cursor-pointer"
              >
                Đóng
              </button>
              <button
                onClick={() => {
                  const target = viewingUser;
                  setViewingUser(null);
                  handleOpenEditRole(target);
                }}
                className="px-3.5 py-1.5 rounded-[10px] text-xs font-semibold bg-[#0066ff] hover:bg-blue-600 text-white cursor-pointer"
              >
                Đổi Vai Trò
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersPage;
