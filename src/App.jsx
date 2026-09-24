import { useEffect, useState } from "react";
import { Sidebar, Topbar } from "./components/AppShell";
import CalendarPage from "./pages/CalendarPage";
import ImportPage from "./pages/ImportPage";
import ManagePage from "./pages/ManagePage";
import AdminPage from "./pages/AdminPage";
import SettingsPage from "./pages/SettingsPage";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";

function App() {
  const readPage = () => location.hash.replace(/^#\/?/, "") || "calendar";
  const [page, setPage] = useState(readPage);
  useEffect(() => {
    const onHashChange = () => setPage(readPage());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);
  const go = (nextPage) => { location.hash = "#/" + nextPage; setPage(nextPage); };
  if (page === "home") return <LandingPage go={go} />;
  if (page === "login" || page === "register") return <AuthPage mode={page} go={go} />;
  const titles = { calendar: "Lịch của tôi", import: "Nhập lịch HTML", manage: "Quản lý lịch học", admin: "Quản trị viên", settings: "Cài đặt & kết nối" };
  const pages = { calendar: <CalendarPage />, import: <ImportPage />, manage: <ManagePage />, admin: <AdminPage />, settings: <SettingsPage /> };
  return <div className="app-shell"><Sidebar page={page} go={go} /><div className="main-column"><Topbar title={titles[page] || titles.calendar} /><main className="page-content">{pages[page] || pages.calendar}<footer className="app-footer"><span>© 2025 LichHoc</span><span>Học tập có kế hoạch. Sống trọn từng ngày.</span><a href="#/help">Trung tâm trợ giúp</a></footer></main></div></div>;
}
export default App;
