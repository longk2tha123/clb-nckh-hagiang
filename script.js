/**
 * CLB NGHIÊN CỨU KHOA HỌC - PHÂN HIỆU ĐHTN TẠI HÀ GIANG (HG-SRC)
 * Main Interactive JavaScript Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initSpaNavigation();
  initStatsCounter();
  initFreshmenTabs();
  initQuiz();
  initFaqAccordion();
  initActivityFilters();
  initDailyVisitorCounter();
  initDevFeatureModals();
  initWelcomeModal();
  initDocPreviewer();
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

    // Close menu when clicking outside header
    document.addEventListener('click', (e) => {
      if (navLinks.classList.contains('open') && !header.contains(e.target)) {
        navLinks.classList.remove('open');
        const icon = navToggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      }
    });
  }
}

/* --------------------------------------------------------------------------
   1.1 SPA SECTION SWITCHER (TABS NAVIGATION)
   -------------------------------------------------------------------------- */
function initSpaNavigation() {
  const sections = document.querySelectorAll('.app-section');
  const navLinks = document.querySelectorAll('.nav-link');
  const allHashLinks = document.querySelectorAll('a[href^="#"]');

  function showSection(targetId) {
    const rawId = (targetId || 'trangchu').replace('#', '');
    let cleanId = rawId;
    if (cleanId === 'gioithieu' || cleanId === 've-clb') {
      cleanId = 'trangchu';
    }

    let targetSection = document.getElementById(cleanId);
    if (!targetSection || !targetSection.classList.contains('app-section')) {
      targetSection = document.getElementById('trangchu');
    }

    if (!targetSection) return;

    // Hide all sections
    sections.forEach(sec => sec.classList.remove('active'));

    // Show target section
    targetSection.classList.add('active');

    // Update active class on nav links
    navLinks.forEach(link => {
      const linkHref = link.getAttribute('href');
      if (linkHref === `#${targetSection.id}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Scroll handling: if targeted specifically at ve-clb, scroll to that element
    if (rawId === 've-clb' || rawId === 'gioithieu') {
      setTimeout(() => {
        const veClb = document.getElementById('ve-clb');
        if (veClb) {
          veClb.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
    } else {
      // Scroll to top smoothly
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // If switching to home, re-trigger stat counter if needed
    if (targetSection.id === 'trangchu') {
      triggerStatCounter();
    }
  }

  // Intercept all hash links across the page (Header, Hero CTA, Footer, Modals)
  allHashLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        const targetId = href.substring(1);
        if (targetId === 've-clb' || targetId === 'gioithieu') {
          e.preventDefault();
          history.pushState(null, null, href);
          showSection(targetId);
          return;
        }
        const targetEl = document.getElementById(targetId);
        if (targetEl && targetEl.classList.contains('app-section')) {
          e.preventDefault();
          history.pushState(null, null, href);
          showSection(targetId);
        }
      }
    });
  });

  // Handle browser back/forward buttons
  window.addEventListener('popstate', () => {
    const hash = window.location.hash || '#trangchu';
    showSection(hash);
  });

  // Initial load according to URL hash
  const initialHash = window.location.hash || '#trangchu';
  showSection(initialHash);
}

/* --------------------------------------------------------------------------
   2. HERO STATS COUNTER ANIMATION
   -------------------------------------------------------------------------- */
let triggerStatCounter = () => {};

function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  let animated = false;

  const countUp = () => {
    statNumbers.forEach(stat => {
      const target = +stat.getAttribute('data-target');
      const suffix = stat.getAttribute('data-suffix') || '+';
      const current = +stat.innerText.replace(/[^0-9]/g, '') || 0;
      const increment = Math.max(1, Math.ceil(target / 30));

      if (current < target) {
        stat.innerText = Math.min(current + increment, target) + suffix;
        setTimeout(countUp, 35);
      } else {
        stat.innerText = target + suffix;
      }
    });
  };

  triggerStatCounter = () => {
    if (!animated) {
      animated = true;
      statNumbers.forEach(stat => {
        stat.innerText = '0' + (stat.getAttribute('data-suffix') || '+');
      });
      setTimeout(countUp, 100);
    }
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        countUp();
      }
    });
  }, { threshold: 0.1 });

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
   4. INTERACTIVE MINI QUIZ FOR FRESHMEN
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
   5. FAQ ACCORDION
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
   6. FEATURE UNDER DEVELOPMENT MODAL
   -------------------------------------------------------------------------- */
function initDevFeatureModals() {
  const devModal = document.getElementById('devModal');
  const closeDevModal = document.getElementById('closeDevModal');
  const btnDevAcknowledge = document.getElementById('btnDevAcknowledge');
  const btnDevContact = document.getElementById('btnDevContact');
  const devFeatureTitle = document.getElementById('devFeatureTitle');
  const triggers = document.querySelectorAll('.dev-trigger');

  if (!devModal) return;

  const openModal = (featureName) => {
    if (devFeatureTitle) {
      devFeatureTitle.textContent = featureName ? `Tính năng "${featureName}" đang được phát triển` : 'Tính năng đang được phát triển';
    }
    devModal.classList.add('active');
  };

  const closeModal = () => {
    devModal.classList.remove('active');
  };

  triggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const feature = trigger.getAttribute('data-feature') || trigger.innerText.trim();
      openModal(feature);
    });
  });

  if (closeDevModal) {
    closeDevModal.addEventListener('click', closeModal);
  }

  if (btnDevAcknowledge) {
    btnDevAcknowledge.addEventListener('click', closeModal);
  }

  if (btnDevContact) {
    btnDevContact.addEventListener('click', closeModal);
  }

  devModal.addEventListener('click', (e) => {
    if (e.target === devModal) {
      closeModal();
    }
  });

  // ESC key to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && devModal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* --------------------------------------------------------------------------
   7. TOAST NOTIFICATION UTILITY
   -------------------------------------------------------------------------- */
function showToast(message, duration = 3000) {
  const toast = document.getElementById('toastMsg');
  const text = document.getElementById('toastText');
  if (!toast || !text) return;
}

/* --------------------------------------------------------------------------
   8. WELCOME MODAL FOR FRESHMEN K4 & K26
   -------------------------------------------------------------------------- */
function initWelcomeModal() {
  const welcomeModal = document.getElementById('welcomeModal');
  const closeWelcomeModal = document.getElementById('closeWelcomeModal');
  const btnWelcomeExplore = document.getElementById('btnWelcomeExplore');
  const btnWelcomeDismiss = document.getElementById('btnWelcomeDismiss');

  if (!welcomeModal) return;

  const openWelcome = () => {
    welcomeModal.classList.add('active');
  };

  const closeWelcome = () => {
    welcomeModal.classList.remove('active');
  };

  // Automatically trigger popup on page load
  setTimeout(() => {
    openWelcome();
  }, 600);

  if (closeWelcomeModal) {
    closeWelcomeModal.addEventListener('click', closeWelcome);
  }

  if (btnWelcomeDismiss) {
    btnWelcomeDismiss.addEventListener('click', closeWelcome);
  }

  if (btnWelcomeExplore) {
    btnWelcomeExplore.addEventListener('click', (e) => {
      e.preventDefault();
      closeWelcome();
      const link = document.querySelector('.nav-link[href="#tansinhvien"]') || btnWelcomeExplore;
      history.pushState(null, null, '#tansinhvien');
      window.dispatchEvent(new PopStateEvent('popstate'));
    });
  }

  welcomeModal.addEventListener('click', (e) => {
    if (e.target === welcomeModal) {
      closeWelcome();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && welcomeModal.classList.contains('active')) {
      closeWelcome();
    }
  });
}

/* --------------------------------------------------------------------------
   9. ACTIVITIES & EVENTS FILTER
   -------------------------------------------------------------------------- */
function initActivityFilters() {
  const filterBtns = document.querySelectorAll('.activity-filter-btn');
  const eventCards = document.querySelectorAll('.event-card[data-category]');
  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-category');
      eventCards.forEach(card => {
        if (cat === 'all' || card.getAttribute('data-category') === cat) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   10. REALTIME FIREBASE VISITOR COUNTER
   -------------------------------------------------------------------------- */
const firebaseConfig = {
  apiKey: "AIzaSyBUO3HAKCGZNjwz4zhHJVKAljmwt9DkdOI",
  authDomain: "clb-nckh---tnu---hgc.firebaseapp.com",
  databaseURL: "https://clb-nckh---tnu---hgc-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "clb-nckh---tnu---hgc",
  storageBucket: "clb-nckh---tnu---hgc.firebasestorage.app",
  messagingSenderId: "380373887219",
  appId: "1:380373887219:web:e475884da91cde244a6f86",
  measurementId: "G-DHXZ17FHF6"
};

function initDailyVisitorCounter() {
  const countEl = document.getElementById('dailyVisitorCount');
  if (!countEl) return;

  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const todayStr = `${year}-${month}-${day}`;
  const sessionKey = `src_hg_visit_${todayStr}`;

  let displayedCount = 0;

  function updateDisplay(target) {
    if (typeof target !== 'number' || isNaN(target)) return;
    if (displayedCount === 0) {
      let current = Math.max(0, target - 10);
      const stepTime = 25;
      const increment = Math.max(1, Math.ceil(10 / 8));
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        countEl.textContent = current.toLocaleString('vi-VN');
      }, stepTime);
    } else {
      countEl.textContent = target.toLocaleString('vi-VN');
    }
    displayedCount = target;
  }

  // Fallback to local storage if Firebase fails or is offline
  function runFallback() {
    const storageKey = 'src_hg_daily_visitor_stats';
    let stats = null;
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) stats = JSON.parse(raw);
    } catch (e) {}

    if (!stats || stats.date !== todayStr) {
      stats = { date: todayStr, count: 1 };
    }

    if (!sessionStorage.getItem(sessionKey)) {
      stats.count += 1;
      sessionStorage.setItem(sessionKey, '1');
      try { localStorage.setItem(storageKey, JSON.stringify(stats)); } catch (e) {}
    }
    updateDisplay(stats.count);
  }

  // Connect Firebase Realtime Database
  if (typeof firebase !== 'undefined') {
    try {
      if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      }
      const db = firebase.database();
      const dailyRef = db.ref(`daily_visitors/${todayStr}`);

      // If user hasn't visited in this browser session today, increment atomically
      if (!sessionStorage.getItem(sessionKey)) {
        dailyRef.transaction(current => {
          return (current || 0) + 1;
        }, (error, committed) => {
          if (committed) {
            sessionStorage.setItem(sessionKey, '1');
          }
        });
      }

      // Realtime listener: triggers whenever anyone accesses the site
      dailyRef.on('value', snapshot => {
        const val = snapshot.val();
        if (val !== null && typeof val === 'number') {
          updateDisplay(val);
        } else if (val === null) {
          updateDisplay(1);
        }
      }, err => {
        console.warn('Firebase Realtime Database listener error:', err);
        runFallback();
      });

    } catch (err) {
      console.warn('Firebase initialization error:', err);
      runFallback();
    }
  } else {
    runFallback();
  }
}

/* --------------------------------------------------------------------------
   11. DOCUMENT PREVIEWER & ADMINISTRATIVE PAPER VIEWER
   -------------------------------------------------------------------------- */
function initDocPreviewer() {
  const modal = document.getElementById('docPreviewModal');
  const closeBtn = document.getElementById('closeDocPreviewModal');
  const modalTitle = document.getElementById('docModalTitle');
  const modalBadge = document.getElementById('docModalBadge');
  const modalSub = document.getElementById('docModalSub');
  const modalBody = document.getElementById('docModalBody');
  const downloadBtn = document.getElementById('docModalDownloadBtn');
  const printBtn = document.getElementById('docModalPrintBtn');
  const previewBtns = document.querySelectorAll('.preview-doc-btn');

  if (!modal || !modalBody) return;

  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function openModal() {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }

  const docsData = {
    'don-gia-nhap': {
      title: 'Đơn Xin Gia Nhập CLB Nghiên Cứu Khoa Học (SRC)',
      badge: '<i class="fa-solid fa-file-word"></i> Biểu Mẫu .DOCX',
      sub: 'Phân hiệu Đại học Thái Nguyên tại Hà Giang • Năm học 2026 – 2027',
      downloadUrl: 'MAU_DON_XIN_GIA_NHAP_CLB/MAU_DON_XIN_GIA_NHAP_CLB_SRC_FINAL.docx',
      downloadName: 'Don_xin_gia_nhap_CLB_SRC.docx',
      canPrint: true,
      render: () => `
        <div class="doc-paper">
          <div class="doc-paper-header">
            <div class="doc-header-left">
              <h5>PHÂN HIỆU ĐHTN TẠI HÀ GIANG</h5>
              <p>CLB NGHIÊN CỨU KHOA HỌC (SRC)</p>
              <div class="doc-header-divider"></div>
            </div>
            <div class="doc-header-right">
              <h5>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</h5>
              <p>Độc lập - Tự do - Hạnh phúc</p>
              <div class="doc-header-divider"></div>
            </div>
          </div>

          <div class="doc-main-title">
            <h2>ĐƠN XIN GIA NHẬP</h2>
            <p>CÂU LẠC BỘ NGHIÊN CỨU KHOA HỌC - SRC</p>
          </div>

          <div class="doc-recipient">
            <strong>Kính gửi:</strong> Ban Chủ nhiệm Câu lạc bộ Nghiên cứu khoa học (SRC) - Phân hiệu ĐHTN tại Hà Giang
          </div>

          <p style="text-indent: 24px; text-align: justify; margin-bottom: 20px;">
            Tôi làm đơn này với nguyện vọng được gia nhập Câu lạc bộ Nghiên cứu khoa học (SRC), tham gia các hoạt động học thuật, nghiên cứu khoa học, đổi mới sáng tạo và các chương trình do Câu lạc bộ tổ chức. Tôi xin cung cấp các thông tin sau:
          </p>

          <h4 class="doc-section-title"><i class="fa-solid fa-user"></i> I. THÔNG TIN CÁ NHÂN</h4>
          <div class="doc-field-row">
            <span class="doc-field-label">Họ và tên:</span>
            <div class="doc-field-line"></div>
          </div>
          <div class="doc-field-row">
            <span class="doc-field-label">Ngày, tháng, năm sinh:</span>
            <span style="font-size: 0.9rem; color: #64748b;">....../....../...........</span>
            <span style="margin-left: 20px; font-weight: 600;">Giới tính:</span>
            <span class="doc-checkbox-item"><span class="doc-box"></span> Nam</span>
            <span class="doc-checkbox-item"><span class="doc-box"></span> Nữ</span>
            <span class="doc-checkbox-item"><span class="doc-box"></span> Khác</span>
          </div>
          <div class="doc-field-row">
            <span class="doc-field-label">Mã sinh viên:</span>
            <div class="doc-field-line" style="max-width: 140px;"></div>
            <span style="margin-left: 16px; font-weight: 600;">Khóa:</span>
            <div class="doc-field-line" style="max-width: 90px;"></div>
            <span style="margin-left: 16px; font-weight: 600;">Lớp:</span>
            <div class="doc-field-line"></div>
          </div>
          <div class="doc-field-row">
            <span class="doc-field-label">Ngành/Chuyên ngành:</span>
            <div class="doc-field-line"></div>
          </div>
          <div class="doc-field-row">
            <span class="doc-field-label">Đơn vị/Khoa/Bộ môn:</span>
            <div class="doc-field-line"></div>
          </div>
          <div class="doc-field-row">
            <span class="doc-field-label">Số điện thoại:</span>
            <div class="doc-field-line" style="max-width: 200px;"></div>
            <span style="margin-left: 16px; font-weight: 600;">Email:</span>
            <div class="doc-field-line"></div>
          </div>
          <div class="doc-field-row">
            <span class="doc-field-label">Zalo (nếu có):</span>
            <div class="doc-field-line"></div>
          </div>

          <h4 class="doc-section-title"><i class="fa-solid fa-compass"></i> II. LĨNH VỰC QUAN TÂM VÀ NĂNG LỰC CÁ NHÂN</h4>
          <p style="font-weight: 600; margin: 8px 0 6px;">1. Lĩnh vực nghiên cứu quan tâm (có thể chọn nhiều):</p>
          <div class="doc-checkbox-group">
            <span class="doc-checkbox-item"><span class="doc-box"></span> Tự nhiên</span>
            <span class="doc-checkbox-item"><span class="doc-box"></span> Xã hội Nhân văn</span>
            <span class="doc-checkbox-item"><span class="doc-box"></span> Giáo dục</span>
            <span class="doc-checkbox-item"><span class="doc-box"></span> Kĩ thuật</span>
            <span class="doc-checkbox-item"><span class="doc-box"></span> Môi trường cơ sở</span>
            <span class="doc-checkbox-item"><span class="doc-box"></span> Khác: ..............................</span>
          </div>

          <p style="font-weight: 600; margin: 12px 0 6px;">2. Kỹ năng/sở trường hiện có:</p>
          <div class="doc-checkbox-group">
            <span class="doc-checkbox-item"><span class="doc-box"></span> Tin học văn phòng</span>
            <span class="doc-checkbox-item"><span class="doc-box"></span> Thiết kế/Truyền thông</span>
            <span class="doc-checkbox-item"><span class="doc-box"></span> Thuyết trình</span>
            <span class="doc-checkbox-item"><span class="doc-box"></span> Xử lý số liệu</span>
            <span class="doc-checkbox-item"><span class="doc-box"></span> Sử dụng AI</span>
            <span class="doc-checkbox-item"><span class="doc-box"></span> Tổ chức sự kiện</span>
            <span class="doc-checkbox-item"><span class="doc-box"></span> Viết học thuật</span>
            <span class="doc-checkbox-item"><span class="doc-box"></span> Ngoại ngữ</span>
          </div>

          <p style="font-weight: 600; margin: 12px 0 6px;">3. Kinh nghiệm nghiên cứu khoa học/hoạt động học thuật (nếu có):</p>
          <div class="doc-field-line" style="margin-bottom: 10px;"></div>
          <div class="doc-field-line" style="margin-bottom: 10px;"></div>

          <h4 class="doc-section-title"><i class="fa-solid fa-bullseye"></i> III. NGUYỆN VỌNG KHI THAM GIA CLB</h4>
          <p style="font-weight: 600; margin: 8px 0 6px;">1. Lý do mong muốn gia nhập SRC:</p>
          <div class="doc-field-line" style="margin-bottom: 10px;"></div>
          <div class="doc-field-line" style="margin-bottom: 14px;"></div>

          <p style="font-weight: 600; margin: 8px 0 6px;">2. Mong muốn được tham gia/hỗ trợ ở nhóm hoạt động:</p>
          <div class="doc-checkbox-group">
            <span class="doc-checkbox-item"><span class="doc-box"></span> Nghiên cứu khoa học & học thuật</span>
            <span class="doc-checkbox-item"><span class="doc-box"></span> Truyền thông - Thiết kế</span>
            <span class="doc-checkbox-item"><span class="doc-box"></span> Tổ chức workshop/sự kiện</span>
            <span class="doc-checkbox-item"><span class="doc-box"></span> AI - Công nghệ - Dữ liệu</span>
            <span class="doc-checkbox-item"><span class="doc-box"></span> Khởi nghiệp/Đổi mới sáng tạo</span>
            <span class="doc-checkbox-item"><span class="doc-box"></span> Chưa xác định, mong được định hướng</span>
          </div>

          <p style="font-weight: 600; margin: 12px 0 6px;">3. Mục tiêu cá nhân trong 01 năm đầu tham gia CLB:</p>
          <div class="doc-field-line" style="margin-bottom: 10px;"></div>
          <div class="doc-field-line" style="margin-bottom: 14px;"></div>

          <h4 class="doc-section-title"><i class="fa-solid fa-scale-balanced"></i> IV. CAM KẾT CỦA NGƯỜI ĐĂNG KÝ</h4>
          <ol class="doc-list-ol">
            <li>Tuân thủ Điều lệ/Quy chế hoạt động, nội quy và sự phân công hợp lý của Câu lạc bộ;</li>
            <li>Tham gia các hoạt động với tinh thần tự nguyện, chủ động, hợp tác và có trách nhiệm;</li>
            <li>Tôn trọng giảng viên, Ban Chủ nhiệm, thành viên CLB và các cá nhân/đơn vị phối hợp;</li>
            <li>Bảo đảm trung thực học thuật; trích dẫn nguồn đầy đủ, không đạo văn, không làm sai lệch dữ liệu nghiên cứu;</li>
            <li>Sử dụng AI và công nghệ một cách có trách nhiệm, có kiểm chứng và phù hợp với yêu cầu học thuật;</li>
            <li>Không tự ý sử dụng thông tin nội bộ, dữ liệu nghiên cứu hoặc hình ảnh/tài liệu của CLB cho mục đích không phù hợp;</li>
            <li>Cung cấp thông tin đăng ký trung thực và chịu trách nhiệm về nội dung đã kê khai.</li>
          </ol>

          <h4 class="doc-section-title"><i class="fa-solid fa-shield-halved"></i> V. ĐỒNG Ý VỀ THÔNG TIN CÁ NHÂN</h4>
          <p style="font-size: 0.9rem; text-align: justify; color: #475569; margin-bottom: 12px;">
            Tôi đồng ý để Câu lạc bộ thu thập và sử dụng các thông tin tôi cung cấp trong đơn này nhằm phục vụ quản lý thành viên, liên hệ, tổ chức hoạt động, tổng hợp danh sách và thực hiện các nhiệm vụ liên quan đến hoạt động của CLB theo đúng quy định.
          </p>
          <div class="doc-checkbox-item" style="margin-bottom: 24px;">
            <span class="doc-box"></span>
            <strong>Tôi đã đọc, hiểu và đồng ý với toàn bộ nội dung trên.</strong>
          </div>

          <div class="doc-signatures">
            <div class="doc-signature-block">
              <h5>XÁC NHẬN TIẾP NHẬN CỦA CLB</h5>
              <p>Phó Chủ nhiệm CLB<br>(Ký, ghi rõ họ tên)</p>
              <div class="doc-signer-name">Ma Văn Long</div>
            </div>
            <div class="doc-signature-block">
              <h5>NGƯỜI LÀM ĐƠN</h5>
              <p>Tuyên Quang, ngày ..... tháng ..... năm 2026<br>(Ký và ghi rõ họ tên)</p>
              <div class="doc-signer-name" style="font-weight: normal; color: #64748b;">(Ký tên)</div>
            </div>
          </div>
        </div>
      `
    },

    'cv-huong-dan': {
      title: 'Hướng Dẫn Đề Xuất Đề Tài KH&CN Cấp Cơ Sở 2027',
      badge: '<i class="fa-solid fa-file-pdf"></i> Công Văn .PDF',
      sub: 'Phân hiệu Đại học Thái Nguyên tại Hà Giang • Văn bản hướng dẫn chính thức',
      downloadUrl: 'THU_VIEN/CV%20HD%20%C4%90X%20%C4%91%E1%BB%81%20t%C3%A0i%20KHCN%20c%E1%BA%A5p%20c%C6%A1%20s%E1%BB%9F%202027.pdf',
      downloadName: 'CV_HD_DX_de_tai_KHCN_cap_co_so_2027.pdf',
      canPrint: false,
      render: () => `
        <div class="doc-pdf-container">
          <iframe
            class="doc-pdf-iframe"
            src="THU_VIEN/CV%20HD%20%C4%90X%20%C4%91%E1%BB%81%20t%C3%A0i%20KHCN%20c%E1%BA%A5p%20c%C6%A1%20s%E1%BB%9F%202027.pdf#toolbar=1&navpanes=0"
            title="Công văn Hướng dẫn Đề xuất đề tài KHCN cấp cơ sở 2027"
          ></iframe>
          <div style="margin-top: 12px; display: flex; align-items: center; justify-content: space-between; background: #ffffff; padding: 12px 18px; border-radius: 8px; border: 1px solid #cbd5e1; flex-wrap: wrap; gap: 10px;">
            <span style="font-size: 0.88rem; color: #64748b;">
              <i class="fa-solid fa-circle-info text-teal"></i> Nếu trình duyệt của bạn không hỗ trợ hiển thị PDF trực tiếp, hãy bấm nút bên cạnh:
            </span>
            <div style="display: flex; gap: 8px;">
              <a href="THU_VIEN/CV%20HD%20%C4%90X%20%C4%91%E1%BB%81%20t%C3%A0i%20KHCN%20c%E1%BA%A5p%20c%C6%A1%20s%E1%BB%9F%202027.pdf" target="_blank" rel="noopener" class="btn btn-secondary btn-sm">
                <i class="fa-solid fa-arrow-up-right-from-square"></i> Mở Trong Tab Mới
              </a>
              <a href="THU_VIEN/CV%20HD%20%C4%90X%20%C4%91%E1%BB%81%20t%C3%A0i%20KHCN%20c%E1%BA%A5p%20c%C6%A1%20s%E1%BB%9F%202027.pdf" download="CV_HD_DX_de_tai_KHCN_cap_co_so_2027.pdf" class="btn btn-primary btn-sm">
                <i class="fa-solid fa-download"></i> Tải File PDF
              </a>
            </div>
          </div>
        </div>
      `
    },

    'phu-luc-cv': {
      title: 'Phụ Lục Mẫu Đề Xuất Nhiệm Vụ KH&CN Cấp Cơ Sở',
      badge: '<i class="fa-solid fa-file-word"></i> Trọn Bộ Biểu Mẫu .DOCX',
      sub: 'Hệ thống 12 Mẫu biểu chuẩn phục vụ đề xuất, thuyết minh & nghiệm thu đề tài',
      downloadUrl: 'THU_VIEN/Ph%E1%BB%A5%20l%E1%BB%A5c%20k%C3%A8m%20CV.docx',
      downloadName: 'Phu_luc_bieu_mau_kem_CV.docx',
      canPrint: true,
      render: () => `
        <div class="doc-paper">
          <div class="doc-paper-header">
            <div class="doc-header-left">
              <h5>ĐẠI HỌC THÁI NGUYÊN</h5>
              <p>ĐƠN VỊ: PHÂN HIỆU ĐHTN TẠI HÀ GIANG</p>
              <div class="doc-header-divider"></div>
            </div>
            <div class="doc-header-right">
              <h5>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</h5>
              <p>Độc lập - Tự do - Hạnh phúc</p>
              <div class="doc-header-divider"></div>
            </div>
          </div>

          <div class="doc-main-title">
            <span style="font-size: 0.88rem; font-weight: 700; color: var(--accent-gold-dark); text-transform: uppercase; letter-spacing: 0.05em;">Mẫu I (Trọng tâm)</span>
            <h2>ĐỀ XUẤT NHIỆM VỤ KHOA HỌC VÀ CÔNG NGHỆ</h2>
            <p>CẤP CƠ SỞ NĂM 2027</p>
          </div>

          <p style="font-size: 0.9rem; font-style: italic; text-align: right; color: #64748b; margin-bottom: 20px;">
            ............., ngày ...... tháng ...... năm 202...
          </p>

          <h4 class="doc-section-title"><i class="fa-solid fa-file-pen"></i> NỘI DUNG ĐỀ XUẤT NHIỆM VỤ</h4>
          
          <div style="margin-bottom: 16px;">
            <p style="font-weight: 700; color: #1e293b; margin-bottom: 6px;">1. Tên đề xuất nhiệm vụ:</p>
            <div class="doc-field-line" style="margin-bottom: 8px;"></div>
            <div class="doc-field-line"></div>
          </div>

          <div style="margin-bottom: 16px;">
            <p style="font-weight: 700; color: #1e293b; margin-bottom: 6px;">2. Tính cấp thiết:</p>
            <p style="font-size: 0.86rem; color: #64748b; margin-bottom: 6px;">(Nêu rõ lý do xuất phát từ thực tiễn sản xuất, kinh tế - xã hội hoặc đào tạo tại Phân hiệu/Hà Giang)</p>
            <div class="doc-field-line" style="margin-bottom: 8px;"></div>
            <div class="doc-field-line" style="margin-bottom: 8px;"></div>
            <div class="doc-field-line"></div>
          </div>

          <div style="margin-bottom: 16px;">
            <p style="font-weight: 700; color: #1e293b; margin-bottom: 6px;">3. Mục tiêu nghiên cứu:</p>
            <p style="font-size: 0.86rem; color: #64748b; margin-bottom: 6px;">- Mục tiêu chung: ............................................................................................................</p>
            <p style="font-size: 0.86rem; color: #64748b; margin-bottom: 6px;">- Mục tiêu cụ thể: ...........................................................................................................</p>
            <div class="doc-field-line"></div>
          </div>

          <div style="margin-bottom: 16px;">
            <p style="font-weight: 700; color: #1e293b; margin-bottom: 6px;">4. Nội dung chính & Phương pháp nghiên cứu:</p>
            <div class="doc-field-line" style="margin-bottom: 8px;"></div>
            <div class="doc-field-line" style="margin-bottom: 8px;"></div>
            <div class="doc-field-line"></div>
          </div>

          <div style="margin-bottom: 16px;">
            <p style="font-weight: 700; color: #1e293b; margin-bottom: 6px;">5. Sản phẩm dự kiến:</p>
            <p style="font-size: 0.86rem; color: #64748b; margin-bottom: 6px;">- Dạng I: Mẫu sản phẩm, mô hình, quy trình công nghệ, phần mềm, thiết bị...</p>
            <p style="font-size: 0.86rem; color: #64748b; margin-bottom: 6px;">- Dạng II: Báo cáo kết quả nghiên cứu, bài báo đăng tạp chí khoa học hoặc kỷ yếu hội nghị...</p>
            <p style="font-size: 0.86rem; color: #64748b; margin-bottom: 6px;">- Dạng III: Đóng góp cho công tác đào tạo, học phần giảng dạy của trường...</p>
          </div>

          <div style="margin-bottom: 16px;">
            <p style="font-weight: 700; color: #1e293b; margin-bottom: 6px;">6. Kinh phí thực hiện dự kiến & Thời gian:</p>
            <p style="font-size: 0.9rem; color: #334155;">- Tổng kinh phí dự kiến: .......................................... triệu đồng.</p>
            <p style="font-size: 0.9rem; color: #334155;">- Thời gian thực hiện: Từ tháng ....../202...... đến tháng ....../202......</p>
          </div>

          <h4 class="doc-section-title" style="margin-top: 32px;"><i class="fa-solid fa-list-check"></i> DANH MỤC 12 BIỂU MẪU KÈM THEO TRONG TẬP TIN</h4>
          <p style="font-size: 0.88rem; color: #64748b; margin-bottom: 14px;">
            Tập tin Word chứa đầy đủ 12 biểu mẫu chuẩn hóa theo Thông tư 03/2023/TT-BKHCN và quy chế Đại học Thái Nguyên:
          </p>

          <div class="doc-table-wrap">
            <table class="doc-table">
              <thead>
                <tr>
                  <th style="width: 15%;">Mẫu số</th>
                  <th>Tên biểu mẫu quy chuẩn</th>
                  <th style="width: 25%;">Đối tượng sử dụng</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Mẫu I</strong></td>
                  <td>Đề xuất nhiệm vụ KH&CN cấp Cơ sở năm 2027</td>
                  <td>Chủ nhiệm đề tài / Sinh viên</td>
                </tr>
                <tr>
                  <td><strong>Mẫu II</strong></td>
                  <td>Thuyết minh đề tài KH&CN cấp Cơ sở</td>
                  <td>Nhóm nghiên cứu</td>
                </tr>
                <tr>
                  <td><strong>Mẫu III</strong></td>
                  <td>Dự toán kinh phí chi tiết (Thông tư 03/2023)</td>
                  <td>Nhóm nghiên cứu</td>
                </tr>
                <tr>
                  <td><strong>Mẫu IV</strong></td>
                  <td>Báo cáo định kỳ tình hình thực hiện nhiệm vụ</td>
                  <td>Chủ nhiệm đề tài</td>
                </tr>
                <tr>
                  <td><strong>Mẫu V</strong></td>
                  <td>Báo cáo tổng kết khoa học & kỹ thuật của đề tài</td>
                  <td>Nhóm nghiên cứu</td>
                </tr>
                <tr>
                  <td><strong>Mẫu VI</strong></td>
                  <td>Bản nhận xét đánh giá hồ sơ nhiệm vụ</td>
                  <td>Chuyên gia phản biện</td>
                </tr>
                <tr>
                  <td><strong>Mẫu VII</strong></td>
                  <td>Phiếu đánh giá nghiệm thu đề tài cấp Cơ sở</td>
                  <td>Hội đồng nghiệm thu</td>
                </tr>
                <tr>
                  <td><strong>Mẫu VIII</strong></td>
                  <td>Biên bản họp Hội đồng tư vấn tuyển chọn</td>
                  <td>Thư ký Hội đồng</td>
                </tr>
                <tr>
                  <td><strong>Mẫu IX</strong></td>
                  <td>Báo cáo quyết toán kinh phí đề tài</td>
                  <td>Bộ phận tài chính / Nhóm</td>
                </tr>
                <tr>
                  <td><strong>Mẫu X</strong></td>
                  <td>Biên bản kiểm tra tiến độ định kỳ</td>
                  <td>Ban QLKH Phân hiệu</td>
                </tr>
                <tr>
                  <td><strong>Mẫu XI</strong></td>
                  <td>Đơn đề nghị điều chỉnh nội dung / gia hạn</td>
                  <td>Chủ nhiệm nhiệm vụ</td>
                </tr>
                <tr>
                  <td><strong>Mẫu XII</strong></td>
                  <td>Bảng giải trình chỉnh sửa sau góp ý Hội đồng</td>
                  <td>Chủ nhiệm nhiệm vụ</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style="background: #e0f2fe; padding: 14px 18px; border-radius: 6px; border: 1px solid #bae6fd; margin-top: 20px;">
            <strong style="color: #0369a1;"><i class="fa-solid fa-lightbulb"></i> Lưu ý dành cho sinh viên & nhóm nghiên cứu:</strong>
            <p style="font-size: 0.88rem; color: #0c4a6e; margin: 4px 0 0;">
              Hãy bấm nút <strong>"Tải Về"</strong> ở góc trên để tải file Word (.DOCX) nguyên bản có thể nhập liệu và in ấn trực tiếp trên máy tính. Ban Chủ Nhiệm SRC luôn sẵn sàng hỗ trợ sửa đề cương và soát mẫu trước khi nộp chính thức.
            </p>
          </div>
        </div>
      `
    }
  };

  previewBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const docKey = btn.getAttribute('data-doc');
      const doc = docsData[docKey];
      if (!doc) return;

      modalTitle.textContent = doc.title;
      modalBadge.innerHTML = doc.badge;
      modalSub.textContent = doc.sub;
      downloadBtn.setAttribute('href', doc.downloadUrl);
      downloadBtn.setAttribute('download', doc.downloadName);

      if (printBtn) {
        printBtn.style.display = doc.canPrint ? 'inline-flex' : 'none';
      }

      modalBody.innerHTML = doc.render();
      openModal();
    });
  });
}
