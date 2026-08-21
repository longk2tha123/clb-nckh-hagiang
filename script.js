/**
 * CLB NGHIÊN CỨU KHOA HỌC - PHÂN HIỆU ĐHTN TẠI HÀ GIANG (HG-SRC)
 * Main Interactive JavaScript Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initStatsCounter();
  initFreshmenTabs();
  initQuiz();
  initFaqAccordion();
  initDevFeatureModals();
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
      const targetLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
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

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        countUp();
      }
    });
  }, { threshold: 0.3 });

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

