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