/**
 * Hàm phân tích outerHTML của ASP.NET RadScheduler (cổng đào tạo sinh viên)
 * Trả về danh sách môn học, tiêu đề các ngày trong tuần và cột ngày hiện tại.
 */
export function parseRadSchedulerHTML(rawHtml) {
  if (!rawHtml || typeof rawHtml !== "string") {
    return { events: [], headers: [], currentDateCol: -1 };
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(rawHtml, "text/html");

  // 1. Lấy danh sách tiêu đề các ngày trong tuần (T2, 21 | T3, 22 ...)
  let headers = [];
  const headerLinks = doc.querySelectorAll(".rsDateHeader, .rsHorizontalHeaderTable th");
  if (headerLinks && headerLinks.length >= 7) {
    headers = Array.from(headerLinks).slice(0, 7).map((el) => el.textContent.trim());
  } else {
    headers = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
  }

  // 2. Tìm cột ngày hiện tại (CurrentDate) nếu có
  let currentDateCol = -1;
  const currentCell = doc.querySelector(".CurrentDate");
  if (currentCell && currentCell.parentElement) {
    const parentCells = Array.from(currentCell.parentElement.children);
    currentDateCol = parentCells.indexOf(currentCell);
  }

  // 3. Tìm bảng chứa lịch học chính (rsContentTable)
  const contentTable = doc.querySelector("table.rsContentTable") || doc;
  const rows = contentTable.querySelectorAll("tr");
  const DAY_NAMES = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"];

  const events = [];
  const seenIds = new Set();

  rows.forEach((row) => {
    // Chỉ xử lý các hàng có đúng 7 cột dữ liệu (7 ngày trong tuần)
    const cells = Array.from(row.children).filter(
      (el) => el.tagName.toLowerCase() === "td"
    );
    if (cells.length < 7) return;

    cells.forEach((cell, colIndex) => {
      const aptDivs = cell.querySelectorAll("div.rsApt, div.rsAptSimple");
      aptDivs.forEach((apt) => {
        const title = (apt.getAttribute("title") || "").trim();
        if (!title) return;

        // Tránh trùng lặp nếu thẻ div được quét 2 lần
        const eventKey = `${colIndex}_${title}`;
        if (seenIds.has(eventKey)) return;
        seenIds.add(eventKey);

        // Phân tách title: "Mã lớp | Tên môn | Phòng, Địa điểm | Giờ"
        const parts = title.split("|").map((p) => p.trim());
        const classCode = parts[0] || "";
        const subject = parts[1] || "";
        const roomLocation = parts[2] || "";
        const timeRange = parts[3] || "";

        let room = roomLocation;
        let location = "";
        if (roomLocation.includes(",")) {
          const splitLoc = roomLocation.split(",");
          room = splitLoc[0].trim();
          location = splitLoc.slice(1).join(",").trim();
        }

        let startTime = "";
        let endTime = "";
        const timeMatch = timeRange.match(/(\d{2}:\d{2})-(\d{2}:\d{2})/);
        if (timeMatch) {
          startTime = timeMatch[1];
          endTime = timeMatch[2];
        }

        // Nhận diện học Online (màu xanh lá) hay Offline (màu vàng nhạt)
        const isOnline =
          room.toLowerCase().includes("online") ||
          location.toLowerCase().includes("online") ||
          (apt.getAttribute("style") || "").toLowerCase().includes("#c0ffc0");

        events.push({
          id: apt.id || Math.random().toString(36).substring(2, 9),
          dayIndex: colIndex, // 0 = Thứ 2, ..., 6 = Chủ nhật
          dayName: DAY_NAMES[colIndex] || `Cột ${colIndex}`,
          headerTitle: headers[colIndex] || DAY_NAMES[colIndex],
          classCode,
          subject,
          room,
          location,
          startTime,
          endTime,
          isOnline,
        });
      });
    });
  });

  return { events, headers, currentDateCol };
}
