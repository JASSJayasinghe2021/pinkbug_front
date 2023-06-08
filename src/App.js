import { Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/Login";
import { ProtectedLayout } from "./components/ProtectedLayout";
import { HomeLayout } from "./components/HomeLayout";
import { DashboardPage } from "./pages/Dashboard";
import {DipositPage} from "./pages/DipositPage";
import { ReportPage } from "./pages/ReportPage";
import { BackupPage } from "./pages/BackupPage";
import {AdmininstrationPage}  from "./pages/AdmininstrationPage";
import {StockPage}  from "./pages/StockPage";
import {SalesPage}  from "./pages/SalesPage";

export default function App() {
  return (
    <Routes>
      <Route element={<HomeLayout />}>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>

      <Route path="/dashboard" element={<ProtectedLayout />}>
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="administration" element={<AdmininstrationPage />} />
        <Route path="stock" element={<StockPage/>} />
        <Route path="sales" element={<SalesPage />} />
        <Route path="reports" element={<ReportPage />} />
        <Route path="backup" element={<BackupPage />} />
        <Route path="deposits" element={<DipositPage />} />
        
      </Route>
    </Routes>
  );
}
