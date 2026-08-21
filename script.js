/**
 * CLB NGHIÊN CỨU KHOA HỌC - PHÂN HIỆU ĐHTN TẠI HÀ GIANG (HG-SRC)
 * Main Interactive JavaScript Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initStatsCounter();
  initFreshmenTabs();
  initQuiz();
  initEventFiltersAndModals();
  initResourceLibrary();
  initFaqAccordion();
  initJoinForm();
});

/* --------------------------------------------------------------------------
   1. NAVBAR & NAVIGATION
   -------------------------------------------------------------------------- */
function initNavbar() {
  const header = document.getElementById('header');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const links = document.querySelectorAll('.nav-link');

  // Sticky header with blur on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const icon = navToggle.querySelector('i');
      if (navLinks.classList.contains('open')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
      } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
      }
    });

    // Close menu when clicking nav item
    links.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        const icon = navToggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      });
    });
  }

  // Active Link on Scroll (IntersectionObserver)
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const targetLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);
      if (targetLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          links.forEach(l => l.classList.remove('active'));
          targetLink.classList.add('active');
        }
      }
    });
  });
}

/* --------------------------------------------------------------------------
   2. HERO STATS COUNTER ANIMATION
   -------------------------------------------------------------------------- */
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number');
  let animated = false;

  const countUp = () => {
    statNumbers.forEach(stat => {
      const target = +stat.getAttribute('data-target');
      const count = +stat.innerText;
      const increment = Math.ceil(target / 40);

      if (count < target) {
        stat.innerText = Math.min(count + increment, target);
        setTimeout(countUp, 35);
      } else {
        stat.innerText = target + (target >= 100 && target !== 100 ? '+' : target === 100 ? '%' : '+');
      }
    });
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        countUp();
      }
    });
  }, { threshold: 0.5 });

  const statsSection = document.querySelector('.hero-stats');
  if (statsSection) {
    observer.observe(statsSection);
  }
}

/* --------------------------------------------------------------------------
   3. FRESHMEN HUB TABS
   -------------------------------------------------------------------------- */
function initFreshmenTabs() {
  const tabBtns = document.querySelectorAll('.hub-tab-btn');
  const panes = document.querySelectorAll('.hub-tab-pane');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      tabBtns.forEach(b => b.classList.remove('active'));
      panes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const activePane = document.getElementById(`pane-${targetTab}`);
      if (activePane) {
        activePane.classList.add('active');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   4. INTERACTIVE MINI QUIZ
   -------------------------------------------------------------------------- */
function initQuiz() {
  const quizForm = document.getElementById('quizForm');
  const quizResult = document.getElementById('quizResult');
  const quizResultTitle = document.getElementById('quizResultTitle');
  const quizResultDesc = document.getElementById('quizResultDesc');
  const btnRetakeQuiz = document.getElementById('btnRetakeQuiz');

  if (!quizForm) return;

  const groupResults = {
    tech: {
      title: "Nhóm Chuyển Đổi Số & Ứng Dụng CNTT",
      desc: "Bạn có tư duy logic sắc sảo và niềm say mê với công nghệ số! Hướng nghiên cứu lý tưởng của bạn tại Phân hiệu là: Ứng dụng AI trong giáo dục, giải pháp số hóa di sản văn hóa Hà Giang, hoặc xây dựng hệ thống thương mại điện tử cho nông sản vùng cao."
    },
    culture: {
      title: "Nhóm Văn Hóa & Du Lịch Bản Sắc Hà Giang",
      desc: "Bạn có tâm hồn yêu thích khám phá và trách nhiệm cao với cộng đồng! Hướng nghiên cứu phù hợp nhất với bạn là: Khảo sát mô hình du lịch cộng đồng bền vững tại Công viên địa chất toàn cầu Cao nguyên đá Đồng Văn, bảo tồn văn hóa các dân tộc H'Mông, Dao, Lô Lô..."
    },
    biz: {
      title: "Nhóm Kinh Tế & Khởi Nghiệp Nông Sản Vùng Cao",
      desc: "Bạn có óc phân tích thực tế và khát khao tạo ra giá trị kinh tế! Hướng nghiên cứu tuyệt vời của bạn là: Chuỗi giá trị nông sản OCOP Hà Giang (chè Shan tuyết, cam sành, mật ong bạc hà), quản trị tài chính doanh nghiệp vừa và nhỏ vùng biên giới."
    },
    edu: {
      title: "Nhóm Sư Phạm & Kỹ Năng Phát Triển Sinh Viên",
      desc: "Bạn sở hữu kỹ năng sư phạm, thấu cảm và truyền cảm hứng tự nhiên! Hướng nghiên cứu rất tiềm năng của bạn là: Đổi mới phương pháp dạy học cho học sinh vùng cao, giải pháp nâng cao kỹ năng mềm và tâm lý học đường cho sinh viên đại học."
    }
  };

  quizForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const q1 = quizForm.querySelector('input[name="q1"]:checked')?.value || 'tech';
    const q2 = quizForm.querySelector('input[name="q2"]:checked')?.value || 'culture';
    const q3 = quizForm.querySelector('input[name="q3"]:checked')?.value || 'biz';

    // Count preferences
    const counts = { tech: 0, culture: 0, biz: 0, edu: 0 };
    counts[q1] = (counts[q1] || 0) + 1;
    counts[q2] = (counts[q2] || 0) + 1;
    counts[q3] = (counts[q3] || 0) + 1;

    let dominantGroup = 'tech';
    let maxCount = -1;
    for (const key in counts) {
      if (counts[key] > maxCount) {
        maxCount = counts[key];
        dominantGroup = key;
      }
    }

    const res = groupResults[dominantGroup] || groupResults.tech;
    quizResultTitle.textContent = res.title;
    quizResultDesc.textContent = res.desc;

    quizResult.style.display = 'block';
    quizResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    showToast('Đã tìm ra nhóm nghiên cứu gợi ý cho bạn!');
  });

  if (btnRetakeQuiz) {
    btnRetakeQuiz.addEventListener('click', () => {
      quizForm.reset();
      quizResult.style.display = 'none';
      quizForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }
}

/* --------------------------------------------------------------------------
   5. ACTIVITIES / EVENTS FILTER & MODAL
   -------------------------------------------------------------------------- */
function initEventFiltersAndModals() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const eventCards = document.querySelectorAll('.event-card');
  const eventModal = document.getElementById('eventModal');
  const closeEventModal = document.getElementById('closeEventModal');
  const eventModalContent = document.getElementById('eventModalContent');

  // Category Filtering
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.getAttribute('data-category');

      eventCards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Event Details Data Mockup
  const eventDetailsMap = {
    '1': {
      title: "Workshop: Kỹ Năng Tìm Kiếm Tài Liệu & Trích Dẫn Chuẩn APA",
      time: "14:00 - 16:30 | Thứ Bảy hàng tuần",
      location: "Hội trường A2 - Phân hiệu ĐHTN tại Hà Giang",
      speaker: "ThS. Giảng viên Cố Vấn & Ban Chuyên Môn CLB",
      desc: "Buổi workshop chuyên sâu hướng dẫn tân sinh viên từng bước khai thác các nguồn tài nguyên học thuật uy tín (Google Scholar, ScienceDirect, V-LIR...). Giới thiệu chi tiết phần mềm Mendeley và Zotero hỗ trợ tạo danh mục tài liệu tham khảo tự động chuẩn APA 7th.",
      agenda: [
        "14:00 - 14:30: Tổng quan về trích dẫn khoa học & tránh đạo văn",
        "14:30 - 15:30: Hướng dẫn cài đặt & sử dụng Mendeley/Zotero",
        "15:30 - 16:15: Thực hành tra cứu tài liệu theo đề tài thực tế",
        "16:15 - 16:30: Hỏi đáp trực tiếp & Giải đáp thắc mắc"
      ]
    },
    '2': {
      title: "Seminar: Ứng Dụng AI & Phân Tích Dữ Liệu Trong Đề Tài Sinh Viên",
      time: "08:30 - 11:30 | Tháng 9/2026",
      location: "Phòng Lab CNTT – Nhà B",
      speaker: "Chuyên gia CNTT & Giảng viên Bộ môn Khoa học Cơ bản",
      desc: "Hướng dẫn sinh viên cách áp dụng các công cụ AI (ChatGPT, Claude, Gemini) đúng nguyên tắc học thuật để hỗ trợ tổng hợp tài liệu, xử lý bảng hỏi khảo sát SPSS và trực quan hóa số liệu nghiên cứu.",
      agenda: [
        "08:30 - 09:15: Đạo đức học thuật khi ứng dụng AI trong NCKH",
        "09:15 - 10:15: Kỹ thuật Prompting phục vụ tổng quan tài liệu",
        "10:15 - 11:00: Phân tích định lượng bảng hỏi bằng SPSS/Excel",
        "11:00 - 11:30: Thảo luận mở cùng diễn giả"
      ]
    },
    '3': {
      title: "Cuộc Thi: Ý Tưởng Nghiên Cứu Sáng Tạo Trẻ Hà Giang",
      time: "Tháng 10 - Tháng 12/2026",
      location: "Toàn Phân Hiệu ĐHTN tại tỉnh Hà Giang",
      speaker: "Hội đồng Giám khảo gồm các Nhà khoa học & Doanh nghiệp",
      desc: "Sân chơi học thuật lớn nhất trong năm nhằm khuyến khích sinh viên đề xuất các giải pháp sáng tạo phát triển kinh tế, văn hóa, giáo dục và chuyển đổi số cho tỉnh Hà Giang. Tổng giải thưởng lên đến 20.000.000 VNĐ.",
      agenda: [
        "Vòng 1: Nộp tóm tắt ý tưởng nghiên cứu (Executive Summary)",
        "Vòng 2: Hoàn thiện đề cương và thuyết minh đề tài",
        "Vòng Chung kết: Thuyết trình trước Hội đồng Giám khảo & Trao giải"
      ]
    },
    '4': {
      title: "Chuyến Điền Dã Thực Tế & Teambuilding Gắn Kết Thành Viên",
      time: "2 Ngày 1 Đêm | Đầu học kỳ I",
      location: "Làng văn hóa Lũng Cú & Đồng Văn, Hà Giang",
      speaker: "Ban Chủ Nhiệm & Cố Vấn Văn Hóa",
      desc: "Hoạt động trải nghiệm thực tế giúp thành viên tiếp cận hiện trường khảo sát nghiên cứu văn hóa - du lịch, kết hợp các trò chơi gắn kết tình đồng đội, chia sẻ kỹ năng sống và sinh hoạt lửa trại.",
      agenda: [
        "Ngày 1: Xuất phát từ Phân hiệu -> Khảo sát thực địa Làng Lũng Cú -> Lửa trại giao lưu",
        "Ngày 2: Thu thập số liệu mẫu -> Teambuilding -> Tổng kết chuyến đi"
      ]
    },
    '5': {
      title: "Workshop: Kỹ Năng Thiết Kế Slide & Thuyết Trình Trước Hội Đồng",
      time: "14:00 - 17:00 | Trước kỳ bảo vệ đề tài",
      location: "Hội trường B1",
      speaker: "Ban Học Thuật & Khách mời đạt Giải Nhất NCKH cấp Bộ",
      desc: "Trang bị cho sinh viên kỹ năng làm chủ sân khấu, cấu trúc bài nói trong 10 phút, nghệ thuật trực quan hóa bảng biểu và mẹo ứng biến thông minh khi trả lời câu hỏi phản biện của hội đồng.",
      agenda: [
        "14:00 - 15:00: Nguyên lý thiết kế slide thuyết trình học thuật chuẩn",
        "15:00 - 16:15: Thực hành thuyết trình thử & nhận xét trực tiếp",
        "16:15 - 17:00: Kỹ thuật kiểm soát thời gian & phản biện tự tin"
      ]
    },
    '6': {
      title: "Seminar: Con Đường Công Bố Bài Báo Khoa Học Trên Tạp Chí & Kỷ Yếu",
      time: "09:00 - 11:30 | Định kỳ quý",
      location: "Phòng Hội thảo Trực tuyến Zoom & Phòng họp A1",
      speaker: "Tiến sĩ có nhiều bài báo quốc tế ISI/Scopus",
      desc: "Giải đáp toàn bộ quy trình từ chuyển hóa đề tài sinh viên thành bài báo khoa học, cách chọn tạp chí uy tín phù hợp, quy trình phản biện và chuẩn bị tài liệu xin học bổng sau đại học.",
      agenda: [
        "09:00 - 09:45: Cấu trúc chuẩn của một bài báo khoa học",
        "09:45 - 10:45: Cách lựa chọn tạp chí và tương tác với phản biện",
        "10:45 - 11:30: Hỏi đáp kinh nghiệm công bố bài báo"
      ]
    }
  };

  // Open modal on click
  document.querySelectorAll('.btn-event-detail').forEach(btn => {
    btn.addEventListener('click', () => {
      const eventId = btn.getAttribute('data-event-id');
      const data = eventDetailsMap[eventId];
      if (!data) return;

      eventModalContent.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 12px;">
          <span class="section-badge" style="margin-bottom: 0;">Thông Tin Sự Kiện</span>
        </div>
        <h3 style="font-family: var(--font-heading); font-size: 1.35rem; color: var(--primary-900); line-height: 1.4; margin-bottom: 16px;">
          ${data.title}
        </h3>
        
        <div style="background: var(--bg-main); padding: 16px; border-radius: var(--radius-md); margin-bottom: 16px; font-size: 0.9rem;">
          <p style="margin-bottom: 8px;"><i class="fa-solid fa-clock text-teal"></i> <strong>Thời gian:</strong> ${data.time}</p>
          <p style="margin-bottom: 8px;"><i class="fa-solid fa-location-dot text-teal"></i> <strong>Địa điểm:</strong> ${data.location}</p>
          <p><i class="fa-solid fa-user-tie text-teal"></i> <strong>Báo cáo viên:</strong> ${data.speaker}</p>
        </div>

        <p style="font-size: 0.92rem; color: var(--text-muted); line-height: 1.65; margin-bottom: 18px;">
          ${data.desc}
        </p>

        <h4 style="font-size: 1rem; font-weight: 700; color: var(--primary-800); margin-bottom: 10px;">
          <i class="fa-solid fa-list-check text-teal"></i> Chương trình chi tiết:
        </h4>
        <ul style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.7; margin-bottom: 24px; padding-left: 18px; list-style: disc;">
          ${data.agenda.map(item => `<li>${item}</li>`).join('')}
        </ul>

        <div style="display: flex; gap: 12px; justify-content: flex-end;">
          <a href="#join" class="btn btn-primary btn-sm" onclick="document.getElementById('eventModal').classList.remove('active')">
            <i class="fa-solid fa-check"></i> Đăng Ký Tham Gia
          </a>
        </div>
      `;

      eventModal.classList.add('active');
    });
  });

  if (closeEventModal) {
    closeEventModal.addEventListener('click', () => {
      eventModal.classList.remove('active');
    });
  }

  // Close modal when clicking outside
  if (eventModal) {
    eventModal.addEventListener('click', (e) => {
      if (e.target === eventModal) {
        eventModal.classList.remove('active');
      }
    });
  }
}

/* --------------------------------------------------------------------------
   6. ACADEMIC HUB & RESOURCE SEARCH / PREVIEW
   -------------------------------------------------------------------------- */
function initResourceLibrary() {
  const searchInput = document.getElementById('resourceSearchInput');
  const typeSelect = document.getElementById('resourceTypeSelect');
  const resourceCards = document.querySelectorAll('.resource-card');
  const docModal = document.getElementById('docModal');
  const closeDocModal = document.getElementById('closeDocModal');
  const docModalContent = document.getElementById('docModalContent');

  // Search & Filter
  const filterResources = () => {
    const keyword = searchInput?.value.trim().toLowerCase() || '';
    const selectedType = typeSelect?.value || 'all';

    resourceCards.forEach(card => {
      const title = (card.getAttribute('data-title') || '').toLowerCase();
      const type = card.getAttribute('data-type') || '';

      const matchKeyword = title.includes(keyword);
      const matchType = (selectedType === 'all' || type === selectedType);

      if (matchKeyword && matchType) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  };

  if (searchInput) searchInput.addEventListener('input', filterResources);
  if (typeSelect) typeSelect.addEventListener('change', filterResources);

  // Simulated Download
  document.querySelectorAll('.btn-download-res').forEach(btn => {
    btn.addEventListener('click', () => {
      const fileName = btn.getAttribute('data-file') || 'Tai_Lieu_NCKH.docx';
      showToast(`Đang tải xuống: ${fileName}...`);
      
      // Simulate file download creation
      setTimeout(() => {
        const dummyContent = `TÀI LIỆU NCKH - PHÂN HIỆU ĐHTN TẠI HÀ GIANG\nFile: ${fileName}\nCảm ơn bạn đã sử dụng tài liệu của CLB NCKH HG-SRC!`;
        const blob = new Blob([dummyContent], { type: 'text/plain;charset=utf-8' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        link.click();
        URL.revokeObjectURL(link.href);
      }, 600);
    });
  });

  // Document Preview Modal
  document.querySelectorAll('.btn-preview-res').forEach(btn => {
    btn.addEventListener('click', () => {
      const fileTitle = btn.getAttribute('data-file') || 'Tài Liệu NCKH';
      
      docModalContent.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 12px;">
          <span class="section-badge" style="margin-bottom: 0;">Xem Trước Tài Liệu</span>
        </div>
        <h3 style="font-family: var(--font-heading); font-size: 1.35rem; color: var(--primary-900); margin-bottom: 16px;">
          ${fileTitle}
        </h3>

        <div style="border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 20px; background: var(--bg-main); font-size: 0.9rem; line-height: 1.7; max-height: 350px; overflow-y: auto; margin-bottom: 20px;">
          <div style="text-align: center; border-bottom: 1px dashed var(--border-subtle); padding-bottom: 12px; margin-bottom: 14px;">
            <strong>ĐẠI HỌC THÁI NGUYÊN<br>PHÂN HIỆU TẠI TỈNH HÀ GIANG</strong><br>
            <span style="font-size: 0.8rem; color: var(--text-muted);">CÂU LẠC BỘ NGHIÊN CỨU KHOA HỌC (HG-SRC)</span>
          </div>

          <h4 style="text-align: center; color: var(--primary-900); font-weight: 800; margin-bottom: 16px; text-transform: uppercase;">
            ${fileTitle}
          </h4>

          <p><strong>1. Tính cấp thiết của vấn đề nghiên cứu:</strong> Trình bày bối cảnh thực tiễn tại tỉnh Hà Giang, nêu rõ khoảng trống nghiên cứu và lý do đề tài cần được triển khai.</p>
          <p><strong>2. Mục tiêu nghiên cứu:</strong> Xác định rõ mục tiêu tổng quát và các mục tiêu cụ thể (khảo sát thực trạng, đề xuất giải pháp khả thi...).</p>
          <p><strong>3. Đối tượng và phạm vi nghiên cứu:</strong> Không gian thực hiện trên địa bàn Hà Giang, thời gian thu thập dữ liệu và cỡ mẫu khảo sát.</p>
          <p><strong>4. Phương pháp nghiên cứu:</strong> Phương pháp nghiên cứu định tính (phỏng vấn sâu, quan sát) và định lượng (bảng hỏi khảo sát, xử lý số liệu SPSS).</p>
          <p><strong>5. Kế hoạch và tiến độ thực hiện:</strong> Bảng phân công nhiệm vụ cụ thể cho từng thành viên trong nhóm nghiên cứu.</p>
        </div>

        <div style="display: flex; gap: 12px; justify-content: flex-end;">
          <button class="btn btn-secondary btn-sm" onclick="document.getElementById('docModal').classList.remove('active')">
            Đóng
          </button>
          <button class="btn btn-primary btn-sm" onclick="document.getElementById('docModal').classList.remove('active'); showToast('Bắt đầu tải tài liệu...');">
            <i class="fa-solid fa-download"></i> Tải Toàn Văn
          </button>
        </div>
      `;

      docModal.classList.add('active');
    });
  });

  if (closeDocModal) {
    closeDocModal.addEventListener('click', () => {
      docModal.classList.remove('active');
    });
  }

  if (docModal) {
    docModal.addEventListener('click', (e) => {
      if (e.target === docModal) {
        docModal.classList.remove('active');
      }
    });
  }
}

/* --------------------------------------------------------------------------
   7. FAQ ACCORDION
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other items
      faqItems.forEach(i => i.classList.remove('active'));

      // If clicked item wasn't active, open it
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   8. JOIN / ADMISSION FORM & ADMISSION PASS
   -------------------------------------------------------------------------- */
function initJoinForm() {
  const joinForm = document.getElementById('joinForm');
  const admissionModal = document.getElementById('admissionModal');
  const closeAdmissionModal = document.getElementById('closeAdmissionModal');
  const btnDoneAdmission = document.getElementById('btnDoneAdmission');
  const btnPrintPass = document.getElementById('btnPrintPass');

  const passName = document.getElementById('passName');
  const passFaculty = document.getElementById('passFaculty');
  const passCode = document.getElementById('passCode');
  const passDate = document.getElementById('passDate');

  if (!joinForm) return;

  joinForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const fullName = document.getElementById('fullName')?.value.trim() || 'Thành Viên Mới';
    const studentId = document.getElementById('studentId')?.value.trim() || '';
    const faculty = document.getElementById('faculty')?.value.trim() || 'Sinh viên Phân hiệu';
    const phone = document.getElementById('phone')?.value.trim() || '';
    const email = document.getElementById('email')?.value.trim() || '';
    const reason = document.getElementById('reason')?.value.trim() || '';

    // Collect checked interests
    const checkedInterests = [];
    document.querySelectorAll('input[name="interests"]:checked').forEach(cb => {
      checkedInterests.push(cb.value);
    });

    // Generate random application code
    const randomCode = 'SRC-2026-' + Math.floor(100 + Math.random() * 900);
    const currentDate = new Date().toLocaleDateString('vi-VN');

    // Populate Admission Modal Card
    if (passName) passName.textContent = fullName;
    if (passFaculty) passFaculty.textContent = `${faculty} ${studentId ? `(${studentId})` : ''}`;
    if (passCode) passCode.textContent = randomCode;
    if (passDate) passDate.textContent = currentDate;

    // Save to LocalStorage for persistence
    const applicationData = {
      code: randomCode,
      name: fullName,
      studentId: studentId,
      faculty: faculty,
      phone: phone,
      email: email,
      interests: checkedInterests,
      reason: reason,
      date: currentDate
    };

    try {
      const existing = JSON.parse(localStorage.getItem('hg_src_applicants') || '[]');
      existing.push(applicationData);
      localStorage.setItem('hg_src_applicants', JSON.stringify(existing));
    } catch (err) {
      console.warn('LocalStorage not accessible', err);
    }

    // Show Admission Pass Modal
    admissionModal.classList.add('active');
    showToast('Đăng ký thành công! Đã cấp Thẻ Hội Viên.');
    joinForm.reset();
  });

  // Close Admission Modal
  if (closeAdmissionModal) {
    closeAdmissionModal.addEventListener('click', () => {
      admissionModal.classList.remove('active');
    });
  }

  if (btnDoneAdmission) {
    btnDoneAdmission.addEventListener('click', () => {
      admissionModal.classList.remove('active');
    });
  }

  // Print Member Card simulation
  if (btnPrintPass) {
    btnPrintPass.addEventListener('click', () => {
      window.print();
    });
  }

  if (admissionModal) {
    admissionModal.addEventListener('click', (e) => {
      if (e.target === admissionModal) {
        admissionModal.classList.remove('active');
      }
    });
  }
}

/* --------------------------------------------------------------------------
   9. TOAST NOTIFICATION UTILITY
   -------------------------------------------------------------------------- */
function showToast(message, duration = 3000) {
  const toast = document.getElementById('toastMsg');
  const text = document.getElementById('toastText');
  if (!toast || !text) return;

  text.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, duration);
}
