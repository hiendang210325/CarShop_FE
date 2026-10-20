import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { RoleGuard } from './RoleGuard';
import { MainLayout } from '../layouts/MainLayout/MainLayout';
import { AuthLayout } from '../layouts/AuthLayout/AuthLayout';
import { ROUTES } from '../constants';
import { Spinner } from '../components';

// Lazy-loaded pages for optimized bundle and performance
const CarShopLandingPage = lazy(() =>
  import('../features/home/CarShopLandingPage').then((m) => ({ default: m.CarShopLandingPage }))
);
const BuyCarPage = lazy(() =>
  import('../features/home/BuyCarPage').then((m) => ({ default: m.BuyCarPage }))
);
const SellCarPage = lazy(() =>
  import('../features/home/SellCarPage').then((m) => ({ default: m.SellCarPage }))
);
const ValuationPage = lazy(() =>
  import('../features/home/ValuationPage').then((m) => ({ default: m.ValuationPage }))
);
const PromotionsPage = lazy(() =>
  import('../features/home/PromotionsPage').then((m) => ({ default: m.PromotionsPage }))
);
const LoginPage = lazy(() =>
  import('../features/auth/LoginPage').then((m) => ({ default: m.LoginPage }))
);
const ForgotPasswordPage = lazy(() =>
  import('../features/auth/ForgotPasswordPage').then((m) => ({ default: m.ForgotPasswordPage }))
);
const OtpVerificationPage = lazy(() =>
  import('../features/auth/OtpVerificationPage').then((m) => ({ default: m.OtpVerificationPage }))
);
const ResetPasswordPage = lazy(() =>
  import('../features/auth/ResetPasswordPage').then((m) => ({ default: m.ResetPasswordPage }))
);
const PorscheTaycanDetailPage = lazy(() =>
  import('../features/cars/PorscheTaycanDetailPage').then((m) => ({ default: m.PorscheTaycanDetailPage }))
);
const NewsPage = lazy(() =>
  import('../features/news/NewsPage').then((m) => ({ default: m.NewsPage }))
);
const TestDrivePage = lazy(() =>
  import('../features/test-drive/TestDrivePage').then((m) => ({ default: m.TestDrivePage }))
);
const DashboardPage = lazy(() =>
  import('../features/dashboard/DashboardPage').then((m) => ({ default: m.DashboardPage }))
);
const CarsPage = lazy(() =>
  import('../features/cars/CarsPage').then((m) => ({ default: m.CarsPage }))
);
const OrdersPage = lazy(() =>
  import('../features/orders/OrdersPage').then((m) => ({ default: m.OrdersPage }))
);
const CustomersPage = lazy(() =>
  import('../features/customers/CustomersPage').then((m) => ({ default: m.CustomersPage }))
);
const SettingsPage = lazy(() =>
  import('../features/settings/SettingsPage').then((m) => ({ default: m.SettingsPage }))
);
const UsersPage = lazy(() =>
  import('../features/users/UsersPage').then((m) => ({ default: m.UsersPage }))
);
const NotFoundPage = lazy(() =>
  import('../pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage }))
);
const ForbiddenPage = lazy(() =>
  import('../pages/ForbiddenPage').then((m) => ({ default: m.ForbiddenPage }))
);

const PageLoader = () => (
  <div style={{ display: 'flex', minHeight: '60vh', alignItems: 'center', justifyContent: 'center' }}>
    <Spinner size={36} />
  </div>
);

export const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Public Homepage: CarShop - Trang chủ Mua Bán Ô Tô Cao Cấp (Light Mode) */}
        <Route path={ROUTES.HOME} element={<CarShopLandingPage />} />

        {/* Public Consumer Navigation Routes (Header Pages) */}
        <Route path={ROUTES.BUY_CAR} element={<BuyCarPage />} />
        <Route path="/buy-car" element={<BuyCarPage />} />
        <Route path="/danh-muc-xe" element={<BuyCarPage />} />

        <Route path={ROUTES.SELL_CAR} element={<SellCarPage />} />
        <Route path="/sell-car" element={<SellCarPage />} />
        <Route path="/thu-cu-doi-moi" element={<SellCarPage />} />

        <Route path={ROUTES.VALUATION} element={<PromotionsPage />} />
        <Route path="/valuation" element={<PromotionsPage />} />
        <Route path="/dinh-gia-xe" element={<PromotionsPage />} />

        <Route path={ROUTES.PROMOTIONS} element={<PromotionsPage />} />
        <Route path="/promotions" element={<PromotionsPage />} />
        <Route path="/bang-gia" element={<PromotionsPage />} />
        <Route path="/khuyen-mai" element={<PromotionsPage />} />

        {/* Vehicle Detail Page: Dynamic Car Detail with Brand Logo Marquee Stream */}
        <Route path={ROUTES.CAR_DETAILS} element={<PorscheTaycanDetailPage />} />
        <Route path="/cars/taycan" element={<PorscheTaycanDetailPage />} />
        <Route path="/car-details" element={<PorscheTaycanDetailPage />} />
        <Route path="/chi-tiet-xe/:id" element={<PorscheTaycanDetailPage />} />

        {/* News & Magazine Page: CarShop - Tin Tức, Đánh Giá & Cẩm Nang Ô Tô */}
        <Route path={ROUTES.NEWS} element={<NewsPage />} />
        <Route path="/tin-tuc" element={<NewsPage />} />

        {/* Test Drive Booking Page: CarShop - Đăng Ký Lái Thử Xe Tại Showroom */}
        <Route path={ROUTES.TEST_DRIVE} element={<TestDrivePage />} />
        <Route path="/lai-thu" element={<TestDrivePage />} />

        {/* Redirect legacy master dashboard routes to unified Dashboard */}
        <Route path="/admin/dashboard" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
        <Route path="/master-dashboard" element={<Navigate to={ROUTES.DASHBOARD} replace />} />

        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
          <Route path={ROUTES.VERIFY_OTP} element={<OtpVerificationPage />} />
          <Route path={ROUTES.RESET_PASSWORD} element={<ResetPasswordPage />} />
        </Route>

        {/* Protected Business App Routes */}
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route
            path={ROUTES.DASHBOARD}
            element={
              <RoleGuard allowedRoles={['ADMIN', 'SALES_MANAGER', 'STAFF']}>
                <DashboardPage />
              </RoleGuard>
            }
          />
          <Route path={ROUTES.CARS} element={<CarsPage />} />

          {/* Role Protected: Orders (Admin & Sales Manager only) */}
          <Route
            path={ROUTES.ORDERS}
            element={
              <RoleGuard allowedRoles={['ADMIN', 'SALES_MANAGER']}>
                <OrdersPage />
              </RoleGuard>
            }
          />

          <Route path={ROUTES.CUSTOMERS} element={<CustomersPage />} />

          {/* Role Protected: User Management (Admin only) */}
          <Route
            path={ROUTES.USERS}
            element={
              <RoleGuard allowedRoles={['ADMIN']}>
                <UsersPage />
              </RoleGuard>
            }
          />

          {/* Role Protected: Settings (Admin only) */}
          <Route
            path={ROUTES.SETTINGS}
            element={
              <RoleGuard allowedRoles={['ADMIN']}>
                <SettingsPage />
              </RoleGuard>
            }
          />
        </Route>

        {/* Error Pages */}
        <Route path={ROUTES.FORBIDDEN} element={<ForbiddenPage />} />
        <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};
