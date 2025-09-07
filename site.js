let menuicon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let sections = document.querySelectorAll('section');
let navlinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
  sections.forEach(sec => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute('id');

    if (top >= offset && top < offset + height) {
      navlinks.forEach(link => {
        link.classList.remove('active');
      });
      let targetLink = document.querySelector('header nav a[href*="' + id + '"]');
      if (targetLink) {
        targetLink.classList.add('acزtive');
      }
    }
  });
};

menuicon.onclick = () => {
  menuicon.classList.toggle('bx-x');
  navbar.classList.toggle('active');
};



// ........................

const slider = document.querySelector('.slider-container');

// تابع فعال کردن درگ/اسکرول روی موبایل
function setupSliderDrag() {
  // فقط اگر موبایل بود
  if(window.innerWidth <= 768) {
    let isDown = false;
    let startX;
    let scrollLeft;

    // شروع درگ
    function startDrag(e) {
      isDown = true;
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    }

    // پایان درگ
    function stopDrag() {
      isDown = false;
    }

    // حرکت درگ
    function doDrag(e) {
      if(!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 2; // سرعت درگ
      slider.scrollLeft = scrollLeft - walk;
    }

    slider.addEventListener('mousedown', startDrag);
    slider.addEventListener('mouseleave', stopDrag);
    slider.addEventListener('mouseup', stopDrag);
    slider.addEventListener('mousemove', doDrag);

    // برای تاچ موبایل
    slider.addEventListener('touchstart', (e) => {
      startX = e.touches[0].pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });
    slider.addEventListener('touchmove', (e) => {
      const x = e.touches[0].pageX - slider.offsetLeft;
      const walk = (x - startX) * 2;
      slider.scrollLeft = scrollLeft - walk;
    });

  } else {
    // دسکتاپ: اسکرول غیرفعال
    slider.style.overflowX = 'hidden';
  }
}

// راه‌اندازی اولیه
setupSliderDrag();

// دکمه‌ها فقط روی دسکتاپ فعال باشند
function setupSliderButtons() {
  if(window.innerWidth > 768){
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const scrollAmount = 320;

    if(prevBtn && nextBtn){
      nextBtn.addEventListener('click', () => {
        slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      });
      prevBtn.addEventListener('click', () => {
        slider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      });
    }
  }
}

setupSliderButtons();

// اگر سایز پنجره تغییر کند، دوباره چک شود
window.addEventListener('resize', () => {
  // بازنشانی overflow
  slider.style.overflowX = 'auto';
  setupSliderDrag();
  setupSliderButtons();
});


if(window.innerWidth <= 768){
  slider.addEventListener('touchstart', (e) => {
    startX = e.touches[0].pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });
  slider.addEventListener('touchmove', (e) => {
    const x = e.touches[0].pageX - slider.offsetLeft;
    const walk = (x - startX) * 2;
    slider.scrollLeft = scrollLeft - walk;
  });
} else {
  // دسکتاپ فقط دکمه‌ها فعال باشند
  slider.style.overflowX = 'hidden';
}