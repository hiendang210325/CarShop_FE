import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { orderService } from '../../api/orderService';
import { Order, OrderStatus } from '../../types';
import { formatCurrencyUSD, formatDate } from '../../utils';
import { useToast } from '../../contexts/ToastContext';
import { useAuthStore } from '../../stores';
import {
  FileCheck2,
  CheckCircle2,
  Clock,
  Truck,
  XCircle,
  Search,
  RefreshCw,
  X,
  Eye,
  FileSpreadsheet,
  Download,
  DollarSign,
  Car,
  UserCheck,
  CreditCard,
  Building,
} from 'lucide-react';

export const OrdersPage: React.FC = () => {
  const { showToast } = useToast();
  const { hasPermission } = useAuthStore();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const canApprove = hasPermission('canApproveOrders');

  const loadOrders = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await orderService.getOrders();
      setOrders(Array.isArray(data) ? data : []);
    } catch {
      showToast('Không thể tải danh sách đơn hàng', 'error');
      setOrders([]);
    } finally {
      setIsLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const handleUpdateStatus = async (orderId: string, newStatus: OrderStatus) => {
    try {
      await orderService.updateOrderStatus(orderId, newStatus);
      showToast(`Đã chuyển trạng thái hợp đồng sang: ${newStatus}`, 'success');
      loadOrders();
      setSelectedOrder(null);
    } catch {
      showToast('Không thể cập nhật trạng thái đơn hàng', 'error');
    }
  };

  const safeOrders = useMemo(() => (Array.isArray(orders) ? orders : []), [orders]);

  // Filtered orders
  const filteredOrders = useMemo(() => {
    return safeOrders.filter((order) => {
      const q = search.toLowerCase().trim();
      const matchSearch =
        !q ||
        order.orderCode?.toLowerCase().includes(q) ||
        order.customerName?.toLowerCase().includes(q) ||
        order.customerPhone?.toLowerCase().includes(q) ||
        order.customerEmail?.toLowerCase().includes(q);

      const matchStatus = filterStatus === 'ALL' || order.status === filterStatus;

      return matchSearch && matchStatus;
    });
  }, [safeOrders, search, filterStatus]);

  // Statistics calculation
  const stats = useMemo(() => {
    return {
      total: safeOrders.length,
      pending: safeOrders.filter((o) => o.status === 'PENDING').length,
      approved: safeOrders.filter((o) => o.status === 'APPROVED').length,
      delivering: safeOrders.filter((o) => o.status === 'DELIVERING').length,
      completed: safeOrders.filter((o) => o.status === 'COMPLETED').length,
      cancelled: safeOrders.filter((o) => o.status === 'CANCELLED').length,
    };
  }, [safeOrders]);

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'COMPLETED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-[10px] text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 size={12} className="text-emerald-600" />
            Hoàn Tất
          </span>
        );
      case 'APPROVED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-[10px] text-[11px] font-bold bg-blue-50 text-[#0066ff] border border-blue-200">
            <CheckCircle2 size={12} className="text-[#0066ff]" />
            Đã Duyệt Cọc
          </span>
        );
      case 'DELIVERING':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-[10px] text-[11px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
            <Truck size={12} className="text-indigo-600" />
            Đang Giao Xe
          </span>
        );
      case 'CANCELLED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-[10px] text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
            <XCircle size={12} className="text-rose-600" />
            Đã Hủy
          </span>
        );
      case 'PENDING':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-[10px] text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
            <Clock size={12} className="text-amber-600" />
            Chờ Duyệt Cọc
          </span>
        );
    }
  };

  const getPaymentMethodLabel = (method: string) => {
    switch (method) {
      case 'INSTALLMENT':
        return 'Trả Góp Ngân Hàng';
      case 'CREDIT_CARD':
        return 'Thẻ Tín Dụng';
      case 'CASH':
        return 'Tiền Mặt';
      case 'BANK_TRANSFER':
      default:
        return 'Chuyển Khoản';
    }
  };

  // Export CSV
  const handleExportCSV = () => {
    if (safeOrders.length === 0) {
      showToast('Chưa có hợp đồng nào để xuất!', 'info');
      return;
    }
    const headers = ['Mã HĐ', 'Khách Hàng', 'Số Điện Thoại', 'Tổng Giá Trị', 'Tiền Cọc', 'Phương Thức TT', 'Trạng Thái', 'Ngày Ký'];
    const rows = safeOrders.map((o) => [
      o.orderCode,
      `"${o.customerName}"`,
      o.customerPhone,
      o.totalAmount,
      o.depositAmount,
      `"${getPaymentMethodLabel(o.paymentMethod)}"`,
      o.status,
      formatDate(o.createdAt),
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `CarShop_Orders_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Đã xuất danh sách hợp đồng sang CSV', 'success');
  };

  return (
    <div className="space-y-3 pb-8 animate-fade-in font-sans">
      {/* 1. HEADER TINH GỌN */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-slate-900 tracking-tight">
            Hợp Đồng & Giao Dịch Showroom
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Theo dõi tiến độ hợp đồng mua bán xe, giải ngân tiền cọc và lịch bàn giao xe ({safeOrders.length} hợp đồng)
          </p>
        </div>
      </div>

      {/* 2. STATS BAR (4 Ô NHỎ GỌN, BORDER 10PX) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
        {/* Total */}
        <div className="bg-white p-3 rounded-[10px] border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
              Tổng Hợp Đồng
            </span>
            <div className="text-xl font-bold text-slate-900 mt-0.5">
              {stats.total}
            </div>
          </div>
          <div className="w-8 h-8 rounded-[10px] bg-blue-50 text-[#0066ff] flex items-center justify-center">
            <FileSpreadsheet size={16} />
          </div>
        </div>

        {/* Pending */}
        <div className="bg-white p-3 rounded-[10px] border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
              Chờ Duyệt Cọc
            </span>
            <div className="text-xl font-bold text-amber-600 mt-0.5">
              {stats.pending}
            </div>
          </div>
          <div className="w-8 h-8 rounded-[10px] bg-amber-50 text-amber-600 flex items-center justify-center">
            <Clock size={16} />
          </div>
        </div>

        {/* Delivering */}
        <div className="bg-white p-3 rounded-[10px] border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
              Đang Giao Xe
            </span>
            <div className="text-xl font-bold text-indigo-600 mt-0.5">
              {stats.delivering}
            </div>
          </div>
          <div className="w-8 h-8 rounded-[10px] bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Truck size={16} />
          </div>
        </div>

        {/* Completed */}
        <div className="bg-white p-3 rounded-[10px] border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
              Hoàn Tất Bàn Giao
            </span>
            <div className="text-xl font-bold text-emerald-600 mt-0.5">
              {stats.completed}
            </div>
          </div>
          <div className="w-8 h-8 rounded-[10px] bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 size={16} />
          </div>
        </div>
      </div>

      {/* 3. TOOLBAR TINH GỌN (BỘ LỌC, TÌM KIẾM, LÀM MỚI, XUẤT CSV) */}
      <div className="bg-white p-2.5 rounded-[10px] border border-slate-200/80 shadow-2xs flex flex-col lg:flex-row lg:items-center justify-between gap-2.5">
        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
          {[
            { id: 'ALL', label: `Tất Cả (${stats.total})` },
            { id: 'PENDING', label: `Chờ Cọc (${stats.pending})` },
            { id: 'APPROVED', label: `Đã Duyệt (${stats.approved})` },
            { id: 'DELIVERING', label: `Đang Giao (${stats.delivering})` },
            { id: 'COMPLETED', label: `Hoàn Tất (${stats.completed})` },
          ].map((tab) => {
            const active = filterStatus === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setFilterStatus(tab.id)}
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

        {/* Search, Actions */}
        <div className="flex items-center flex-wrap gap-2">
          {/* Search Input */}
          <div className="relative w-full sm:w-56">
            <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm mã HĐ, tên, SĐT..."
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

          {/* Reset Filters */}
          {(search || filterStatus !== 'ALL') && (
            <button
              onClick={() => {
                setSearch('');
                setFilterStatus('ALL');
              }}
              title="Xóa bộ lọc"
              className="p-1.5 rounded-[10px] text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all cursor-pointer"
            >
              <X size={14} />
            </button>
          )}

          {/* Nút Làm Mới */}
          <button
            onClick={loadOrders}
            disabled={isLoading}
            title="Làm mới danh sách hợp đồng"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] text-xs font-semibold bg-[#0066ff] hover:bg-blue-600 text-white shadow-xs transition-all cursor-pointer disabled:opacity-70"
          >
            <RefreshCw size={13} className={isLoading ? 'animate-spin' : ''} />
            <span>Làm Mới</span>
          </button>

          {/* Nút Xuất CSV */}
          <button
            onClick={handleExportCSV}
            title="Xuất danh sách hợp đồng ra CSV"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] text-xs font-semibold bg-slate-100 hover:bg-slate-200/80 text-slate-700 border border-slate-200 transition-all cursor-pointer"
          >
            <Download size={13} />
            <span>Xuất CSV</span>
          </button>
        </div>
      </div>

      {/* 4. ORDERS DIRECTORY TABLE (BORDER 10PX) */}
      <div className="bg-white rounded-[10px] border border-slate-200/80 shadow-2xs overflow-hidden">
        {isLoading ? (
          <div className="py-12 text-center space-y-2">
            <RefreshCw size={22} className="animate-spin text-[#0066ff] mx-auto" />
            <p className="text-xs text-slate-500 font-medium">Đang tải danh sách hợp đồng giao dịch...</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="py-12 text-center space-y-2">
            <FileCheck2 size={28} className="text-slate-300 mx-auto" />
            <p className="text-xs text-slate-500 font-medium">Không tìm thấy hợp đồng giao dịch nào</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/70 border-b border-slate-200/80 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  <th className="py-2.5 px-3.5">Mã Hợp Đồng</th>
                  <th className="py-2.5 px-3.5">Khách Hàng</th>
                  <th className="py-2.5 px-3.5">Mẫu Xe & Thanh Toán</th>
                  <th className="py-2.5 px-3.5">Tổng Giá Trị</th>
                  <th className="py-2.5 px-3.5">Tiền Đã Cọc</th>
                  <th className="py-2.5 px-3.5">Trạng Thái</th>
                  <th className="py-2.5 px-3.5">Ngày Ký</th>
                  <th className="py-2.5 px-3.5 text-right">Thao Tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredOrders.map((order) => {
                  const carTitle = order.car ? `${order.car.brand} ${order.car.model}` : null;

                  return (
                    <tr
                      key={order.id}
                      className="hover:bg-slate-50/80 transition-colors"
                    >
                      {/* Order Code */}
                      <td className="py-2.5 px-3.5">
                        <span className="font-mono font-bold text-[#0066ff] bg-blue-50/60 px-2 py-0.5 rounded-[6px] border border-blue-100">
                          {order.orderCode}
                        </span>
                      </td>

                      {/* Customer Info */}
                      <td className="py-2.5 px-3.5">
                        <div className="leading-tight">
                          <div className="font-bold text-slate-900">{order.customerName}</div>
                          <div className="text-[11px] text-slate-400 font-mono mt-0.5">{order.customerPhone}</div>
                        </div>
                      </td>

                      {/* Car / Payment Method */}
                      <td className="py-2.5 px-3.5">
                        <div className="leading-tight">
                          <div className="font-semibold text-slate-800">
                            {carTitle || 'Xe đã chọn trong hợp đồng'}
                          </div>
                          <div className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1">
                            <CreditCard size={11} className="text-slate-400" />
                            <span>{getPaymentMethodLabel(order.paymentMethod)}</span>
                          </div>
                        </div>
                      </td>

                      {/* Total Amount */}
                      <td className="py-2.5 px-3.5 font-bold text-slate-900">
                        {formatCurrencyUSD(order.totalAmount || 0)}
                      </td>

                      {/* Deposit Amount */}
                      <td className="py-2.5 px-3.5 font-bold text-emerald-600">
                        {formatCurrencyUSD(order.depositAmount || 0)}
                      </td>

                      {/* Status */}
                      <td className="py-2.5 px-3.5">
                        {getStatusBadge(order.status)}
                      </td>

                      {/* Created date */}
                      <td className="py-2.5 px-3.5 text-slate-500 text-[11px]">
                        {formatDate(order.createdAt)}
                      </td>

                      {/* Actions */}
                      <td className="py-2.5 px-3.5 text-right">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-[10px] text-xs font-semibold bg-slate-100 hover:bg-slate-200/80 text-slate-700 transition-all cursor-pointer"
                        >
                          <Eye size={13} />
                          <span>Chi Tiết</span>
                        </button>
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
          <span>Hiển thị <strong>{filteredOrders.length}</strong> / <strong>{safeOrders.length}</strong> hợp đồng</span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Cơ sở dữ liệu CarShop Enterprise
          </span>
        </div>
      </div>

      {/* 5. MODAL: CHI TIẾT VÀ DUYỆT HỢP ĐỒNG (BORDER 10PX) */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-[10px] max-w-lg w-full p-5 shadow-xl border border-slate-100 space-y-4">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Hợp Đồng Giao Dịch: {selectedOrder.orderCode}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Ngày tạo: {formatDate(selectedOrder.createdAt, true)}
                </p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-1 rounded-[10px] text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Contract Summary Box */}
            <div className="p-3 bg-slate-50 rounded-[10px] border border-slate-100 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-medium">Khách Hàng:</span>
                <span className="font-bold text-slate-900">{selectedOrder.customerName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-medium">Số Điện Thoại:</span>
                <span className="font-mono font-semibold text-slate-800">{selectedOrder.customerPhone}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-medium">Email:</span>
                <span className="text-slate-800">{selectedOrder.customerEmail}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-medium">Phương Thức Thanh Toán:</span>
                <span className="font-semibold text-slate-800">{getPaymentMethodLabel(selectedOrder.paymentMethod)}</span>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-slate-200/60">
                <span className="text-slate-500 font-medium">Tổng Giá Trị Xe:</span>
                <span className="text-sm font-bold text-slate-900">{formatCurrencyUSD(selectedOrder.totalAmount || 0)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-medium">Tiền Đã Đặt Cọc:</span>
                <span className="text-sm font-bold text-emerald-600">{formatCurrencyUSD(selectedOrder.depositAmount || 0)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-medium">Trạng Thái Hiện Tại:</span>
                <span>{getStatusBadge(selectedOrder.status)}</span>
              </div>
            </div>

            {/* Notes */}
            <div className="text-xs space-y-1">
              <span className="text-slate-500 font-medium">Ghi Chú Tiến Độ / Điều Khoản:</span>
              <p className="p-2.5 rounded-[10px] bg-slate-50 border border-slate-100 text-slate-700 leading-relaxed">
                {selectedOrder.notes || 'Không có ghi chú thêm cho hợp đồng này.'}
              </p>
            </div>

            {/* Status Change Buttons (For Admin & Sales Manager) */}
            {canApprove && (
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-900 block">
                  Chuyển Đổi Tiến Độ Hợp Đồng:
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    onClick={() => handleUpdateStatus(selectedOrder.id, 'APPROVED')}
                    className="p-2 rounded-[10px] font-semibold bg-blue-50 text-[#0066ff] hover:bg-blue-100 border border-blue-200 transition-all cursor-pointer"
                  >
                    Duyệt Hồ Sơ Cọc
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(selectedOrder.id, 'DELIVERING')}
                    className="p-2 rounded-[10px] font-semibold bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200 transition-all cursor-pointer"
                  >
                    Lên Lịch Giao Xe
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(selectedOrder.id, 'COMPLETED')}
                    className="p-2 rounded-[10px] font-semibold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition-all cursor-pointer"
                  >
                    Hoàn Tất Bàn Giao
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(selectedOrder.id, 'CANCELLED')}
                    className="p-2 rounded-[10px] font-semibold bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 transition-all cursor-pointer"
                  >
                    Hủy Hợp Đồng
                  </button>
                </div>
              </div>
            )}

            {/* Modal Footer */}
            <div className="flex items-center justify-end pt-2 border-t border-slate-100">
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-4 py-1.5 rounded-[10px] text-xs font-semibold text-slate-600 hover:bg-slate-100 border border-slate-200 cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
