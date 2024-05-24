var swiper = new Swiper(".slide-content", {
    slidesPerView: 3,
    spaceBetween: 25,
    loop: true,
    centerSlide: 'true',
    fade: 'true',
    grabCursor: 'true',
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    breakpoints:{
        0: {
            slidesPerView: 1,
        },
        520: {
            slidesPerView: 2,
        },
        950: {
            slidesPerView: 3,
        },
    },
  });


function showhide(val){
  if (val == 1){
    document.getElementById('bg').style.display='block';
    document.getElementById('apply_for_donation_divition').style.display='none';
  }
  if (val == 2){
    document.getElementById('bg').style.display='none';
    document.getElementById('apply_for_donation_divition').style.display='block';
    document.getElementById('popup').style.display='block';
    document.getElementById('top').style.display='none';
    document.getElementById('menu-jk').style.display='none';
    document.getElementById('foot').style.display='none';
    document.getElementById('footer-down').style.display='none';
    document.getElementById('navigation').style.display='none';
    // document.getElementById('apply_for_donation_divition').style.display='none';
  }
  if(val == 3){
    document.getElementById('popup').style.display='none';
    document.getElementById('top').style.display='block';
    document.getElementById('apply_for_donation_divition').style.display='block';
    document.getElementById('foot').style.display='block';
    document.getElementById('menu-jk').style.display='block';
    document.getElementById('footer-down').style.display='block';
    document.getElementById('navigation').style.display='block';
  }
}
function redirectToPage() {
//  You can specify the URL you want to navigate to
   window.location.href = '/donater_login';
}

 