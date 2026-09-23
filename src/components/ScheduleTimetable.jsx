import React, { useState, useEffect } from "react";
import { parseRadSchedulerHTML } from "../utils/parseSchedule";
import { Calendar, Clock, MapPin, BookOpen, Upload, Trash2, CheckCircle2, Sparkles, RefreshCw } from "lucide-react";

// Dữ liệu mẫu mặc định lấy từ file html.txt của trường
const DEFAULT_HEADERS = ["T2, 21", "T3, 22", "T4, 23", "T5, 24", "T6, 25", "T7, 26", "CN, 27"];

const TIME_SLOTS = [
  { label: "7", ampm: "SA", hour: 7 },
  { label: "8", ampm: "SA", hour: 8 },
  { label: "9", ampm: "SA", hour: 9 },
  { label: "10", ampm: "SA", hour: 10 },
  { label: "11", ampm: "SA", hour: 11 },
  { label: "12", ampm: "CH", hour: 12 },
  { label: "1", ampm: "CH", hour: 13 },
  { label: "2", ampm: "CH", hour: 14 },
  { label: "3", ampm: "CH", hour: 15 },
  { label: "4", ampm: "CH", hour: 16 },
  { label: "5", ampm: "CH", hour: 17 },
  { label: "6", ampm: "CH", hour: 18 },
  { label: "7", ampm: "CH", hour: 19 },
  { label: "8", ampm: "CH", hour: 20 },
  { label: "9", ampm: "CH", hour: 21 },
  { label: "10", ampm: "CH", hour: 22 },
];

function timeToMinutes(timeStr) {
  if (!timeStr) return 0;
  const [h, m] = timeStr.split(":").map(Number);
  return h * 60 + m;
}

export default function ScheduleTimetable() {
  const [rawHtml, setRawHtml] = useState("");
  const [events, setEvents] = useState([]);
  const [headers, setHeaders] = useState(DEFAULT_HEADERS);
  const [currentDateCol, setCurrentDateCol] = useState(2); // Mặc định T4
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notification, setNotification] = useState("");

  // Tải dữ liệu đã lưu từ localStorage
  useEffect(() => {
    const saved = localStorage.getItem("saved_schedule_events");
    const savedHeaders = localStorage.getItem("saved_schedule_headers");
    const savedCol = localStorage.getItem("saved_schedule_curr_col");

    if (saved) {
      try {
        setEvents(JSON.parse(saved));
        if (savedHeaders) setHeaders(JSON.parse(savedHeaders));
        if (savedCol) setCurrentDateCol(Number(savedCol));
      } catch (e) {
        console.error("Lỗi đọc dữ liệu đã lưu:", e);
      }
    }
  }, []);

  const showToast = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(""), 3500);
  };

  // Hàm xử lý khi người dùng dán và bấm Parse
  const handleParse = (htmlString) => {
    const content = htmlString || rawHtml;
    if (!content.trim()) {
      alert("Vui lòng dán mã outerHTML vào ô nhập!");
      return;
    }

    const { events: parsedEvents, headers: parsedHeaders, currentDateCol: col } =
      parseRadSchedulerHTML(content);

    if (parsedEvents.length === 0) {
      alert("Không tìm thấy sự kiện lịch học nào trong đoạn mã HTML vừa dán. Vui lòng kiểm tra lại!");
      return;
    }

    setEvents(parsedEvents);
    if (parsedHeaders.length >= 7) setHeaders(parsedHeaders);
    if (col >= 0) setCurrentDateCol(col);

    // Lưu vào LocalStorage
    localStorage.setItem("saved_schedule_events", JSON.stringify(parsedEvents));
    localStorage.setItem("saved_schedule_headers", JSON.stringify(parsedHeaders));
    localStorage.setItem("saved_schedule_curr_col", String(col));

    setIsModalOpen(false);
    setRawHtml("");
    showToast(`Đã tải thành công ${parsedEvents.length} tiết lịch học!`);
  };

  const handleClear = () => {
    if (confirm("Bạn có chắc chắn muốn xóa dữ liệu thời khóa biểu hiện tại?")) {
      setEvents([]);
      localStorage.removeItem("saved_schedule_events");
      localStorage.removeItem("saved_schedule_headers");
      localStorage.removeItem("saved_schedule_curr_col");
      showToast("Đã xóa dữ liệu lịch học.");
    }
  };

  // Cấu hình tỷ lệ chiều cao
  const START_HOUR = 7;
  const TOTAL_HOURS = 15; // 7h -> 22h
  const HOUR_HEIGHT = 64; // mỗi 1 tiếng tương ứng 64px
  const TOTAL_HEIGHT = TOTAL_HOURS * HOUR_HEIGHT; // 960px

  return (
    <div className="min-h-screen bg-[#f1f5f9] text-slate-800 antialiased font-sans p-2 sm:p-4 md:p-6">
      {/* Toast thông báo */}
      {notification && (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2 bg-emerald-600 text-white px-4 py-2.5 rounded-lg shadow-xl animate-bounce text-sm font-medium">
          <CheckCircle2 className="size-4" />
          <span>{notification}</span>
        </div>
      )}

      <div className="max-w-[1300px] mx-auto bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Thanh công cụ Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white">
          <div>
            <div className="flex items-center gap-2">
              <Calendar className="size-6 text-sky-600" />
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                Thời Khóa Biểu Sinh Viên
              </h1>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-sky-100 text-sky-800">
                RadScheduler Style
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Hiển thị lịch học trực quan theo tuần từ mã outerHTML cổng đào tạo
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-xs sm:text-sm font-medium transition shadow-sm"
            >
              <Upload className="size-4" />
              <span>Dán outerHTML</span>
            </button>

            {events.length > 0 && (
              <button
                onClick={handleClear}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs sm:text-sm font-medium transition"
              >
                <Trash2 className="size-4" />
                <span>Xóa lịch</span>
              </button>
            )}
          </div>
        </div>

        {/* Chú thích màu sắc */}
        <div className="px-5 py-2.5 bg-slate-50 border-b border-slate-200 text-xs flex items-center justify-between flex-wrap gap-2 text-slate-600">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <div className="w-3.5 h-3.5 rounded bg-[#C0FFC0] border border-emerald-400" />
              <span>Môn học Online</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3.5 h-3.5 rounded bg-[#FEF08A] border border-amber-400" />
              <span>Môn học Trực tiếp (Offline)</span>
            </div>
          </div>
          <div className="text-slate-400">
            Tổng cộng: <strong className="text-slate-700 font-semibold">{events.length}</strong> lớp học trong tuần
          </div>
        </div>

        {/* BẢNG LỊCH HỌC DẠNG LƯỚI (TIMETABLE GRID) */}
        <div className="overflow-x-auto select-none">
          <div className="min-w-[900px]">
            {/* Hàng Tiêu Đề Ngày */}
            <div className="grid grid-cols-[70px_repeat(7,1fr)] border-b border-slate-300 bg-slate-100/90 text-center font-semibold text-xs text-slate-700">
              <div className="py-2.5 px-2 border-r border-slate-300 font-medium text-slate-500 flex items-center justify-center">
                Cả ngày
              </div>
              {headers.map((hTitle, idx) => (
                <div
                  key={idx}
                  className={`py-2.5 px-1 border-r border-slate-300 last:border-r-0 ${
                    idx === currentDateCol ? "bg-amber-100/60 text-amber-950 font-bold" : ""
                  }`}
                >
                  {hTitle}
                </div>
              ))}
            </div>

            {/* Khung Chiều Giờ và Nội Dung */}
            <div className="grid grid-cols-[70px_repeat(7,1fr)] relative" style={{ height: `${TOTAL_HEIGHT}px` }}>
              {/* Cột trục giờ bên trái */}
              <div className="border-r border-slate-300 bg-slate-50/70 text-right pr-2 select-none relative">
                {TIME_SLOTS.map((slot, idx) => (
                  <div
                    key={idx}
                    style={{ height: `${HOUR_HEIGHT}px` }}
                    className="border-b border-slate-200 relative"
                  >
                    <span className="absolute -top-2.5 right-2 text-[11px] font-medium text-slate-500">
                      {slot.label}
                      <span className="text-[9px] uppercase text-slate-400 ml-0.5">{slot.ampm}</span>
                    </span>
                  </div>
                ))}
              </div>

              {/* 7 Cột Lịch Học Theo Từng Ngày */}
              {headers.map((_, dayIdx) => {
                const isCurrentDate = dayIdx === currentDateCol;
                const dayEvents = events.filter((ev) => ev.dayIndex === dayIdx);

                return (
                  <div
                    key={dayIdx}
                    className={`border-r border-slate-300 last:border-r-0 relative ${
                      isCurrentDate ? "bg-[#fffdeb]/60" : "bg-white"
                    }`}
                  >
                    {/* Vạch kẻ chia giờ ngang */}
                    {TIME_SLOTS.map((_, hIdx) => (
                      <div
                        key={hIdx}
                        style={{ height: `${HOUR_HEIGHT}px` }}
                        className="border-b border-slate-200 relative"
                      >
                        {/* Vạch kẻ phụ nửa tiếng */}
                        <div className="absolute top-1/2 left-0 right-0 border-b border-slate-100" />
                      </div>
                    ))}

                    {/* Render các thẻ môn học trong ngày này */}
                    {dayEvents.map((ev) => {
                      const startMin = timeToMinutes(ev.startTime);
                      const endMin = timeToMinutes(ev.endTime);

                      const top = ((startMin - START_HOUR * 60) / (TOTAL_HOURS * 60)) * TOTAL_HEIGHT;
                      const height = Math.max(
                        ((endMin - startMin) / (TOTAL_HOURS * 60)) * TOTAL_HEIGHT - 2,
                        40
                      );

                      return (
                        <div
                          key={ev.id}
                          style={{
                            top: `${top}px`,
                            height: `${height}px`,
                            left: "3px",
                            right: "3px",
                          }}
                          className={`absolute rounded-sm p-1.5 border text-[11px] leading-tight overflow-hidden transition-all duration-150 hover:shadow-lg hover:z-30 cursor-pointer ${
                            ev.isOnline
                              ? "bg-[#C0FFC0] border-[#9AE6B4] text-[#14532D]"
                              : "bg-[#FFF3B0] border-[#F6E05E] text-[#713F12]"
                          }`}
                          title={`${ev.classCode} | ${ev.subject} | ${ev.room}, ${ev.location} | ${ev.startTime}-${ev.endTime}`}
                        >
                          {/* Biểu tượng và mã lớp */}
                          <div className="font-bold flex items-center gap-1 text-[11px] mb-0.5">
                            <span className="text-[10px]">✏️</span>
                            <span className="tracking-tight">{ev.classCode}</span>
                          </div>

                          {/* Tên môn học */}
                          <div className="font-semibold text-[11px] leading-snug line-clamp-2">
                            {ev.subject}
                          </div>

                          {/* Phòng học & Địa điểm */}
                          <div className="text-[10px] opacity-90 mt-1 flex items-center gap-1 truncate">
                            <span>{ev.room}</span>
                            {ev.location && <span>• {ev.location}</span>}
                          </div>

                          {/* Khung giờ */}
                          <div className="text-[10px] font-mono font-medium opacity-80 mt-0.5">
                            {ev.startTime} - {ev.endTime}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {events.length === 0 && (
          <div className="p-12 text-center text-slate-400 bg-slate-50/50">
            <Calendar className="size-12 mx-auto mb-3 text-slate-300" />
            <h3 className="text-base font-semibold text-slate-600 mb-1">Chưa có dữ liệu lịch học</h3>
            <p className="text-xs max-w-md mx-auto mb-4">
              Bấm nút <strong>"Dán outerHTML"</strong> ở góc phải trên để nhập mã HTML bảng thời khóa biểu từ cổng đào tạo sinh viên.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-xs font-semibold shadow-sm transition"
            >
              Nhập mã HTML ngay
            </button>
          </div>
        )}
      </div>

      {/* MODAL DÁN MÃ OUTERHTML */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-5 border-b border-slate-200 flex justify-between items-center bg-slate-50">
              <div className="flex items-center gap-2">
                <Upload className="size-5 text-sky-600" />
                <h3 className="font-bold text-slate-900 text-base">Nhập outerHTML từ cổng đào tạo</h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-lg leading-none"
              >
                ✕
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div className="bg-sky-50 border border-sky-200 rounded-lg p-3 text-xs text-sky-900 leading-relaxed">
                <div className="font-bold mb-1 flex items-center gap-1">
                  <span>💡 Hướng dẫn lấy mã từ cổng đào tạo:</span>
                </div>
                <ol className="list-decimal list-inside space-y-0.5 text-slate-700">
                  <li>Vào trang xem lịch học tuần của trường.</li>
                  <li>Chuột phải vào bảng lịch $\rightarrow$ Chọn <strong>Kiểm tra (Inspect)</strong>.</li>
                  <li>Chuột phải vào thẻ <code>&lt;table&gt;</code> $\rightarrow$ <strong>Copy</strong> $\rightarrow$ <strong>Copy outerHTML</strong>.</li>
                  <li>Dán vào khung bên dưới và bấm <strong>"Chuyển Đổi Sang Lịch"</strong>.</li>
                </ol>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Dán chuỗi outerHTML vào đây:
                </label>
                <textarea
                  rows={9}
                  value={rawHtml}
                  onChange={(e) => setRawHtml(e.target.value)}
                  placeholder="Dán toàn bộ mã <table class='rsContentTable'...>...</table> vào đây..."
                  className="w-full border border-slate-300 rounded-lg p-3 text-xs font-mono focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none transition"
                />
              </div>

              <div className="flex justify-between items-center pt-2">
                <span className="text-[11px] text-slate-400">
                  Hỗ trợ định dạng bảng Telerik / RadScheduler
                </span>

                <div className="flex gap-2">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100 transition"
                  >
                    Hủy
                  </button>
                  <button
                    onClick={() => handleParse()}
                    className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-xs font-semibold transition shadow-sm flex items-center gap-1.5"
                  >
                    <Sparkles className="size-4" />
                    <span>Chuyển Đổi Sang Lịch</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
