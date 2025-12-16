"use client";
import { useEffect } from "react";
import Swiper from "swiper";
import { Navigation, Pagination, Autoplay, Thumbs, Mousewheel, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import "swiper/css/free-mode";

function initSwipers() {
  // Prevent double initialization
  if(document.querySelector('.swiper-treatments') && !document.querySelector('.swiper-treatments').swiper){
    new Swiper(".swiper-treatments", {
      modules: [Pagination],
      slidesPerView: 6,
      spaceBetween: 30,
      speed: 600,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      breakpoints :{
        0: {
          slidesPerView: 2,
      spaceBetween: 20,
        },
        767:{
          slidesPerView: 4,
      spaceBetween: 30,
        },
        991:{
          slidesPerView: 5,
        },
        1200: {
          slidesPerView: 6,
        }
      }
    });
  }

  if(document.querySelector('.swiper-packages') && !document.querySelector('.swiper-packages').swiper){
    new Swiper(".swiper-packages", {
      modules: [Pagination],
      spaceBetween: 30,
      speed: 600,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      breakpoints :{
        0: {
          slidesPerView: 1,
        },
        767:{
          slidesPerView: 2,
        },
        991:{
          slidesPerView: 3,
        }
      }
    });
  }

  if(document.querySelector('.product-gallery') && !document.querySelector('.product-gallery').swiper){
    new Swiper(".product-gallery .swiper", {
      modules: [Navigation],
      slidesPerView: 1,
      spaceBetween: 10,
      speed: 600,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }

  if(document.querySelector('.before-surgery-slider') && !document.querySelector('.before-surgery-slider').swiper){
    new Swiper(".before-surgery-slider", {
      modules: [Pagination],
      slidesPerView: 1,
      spaceBetween: 10,
      speed: 600,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      }
    });
  }
  


  if(document.querySelector('.swiper-clinics') && !document.querySelector('.swiper-clinics').swiper){
    const swiperPrev = document.querySelector('.swiper-clinics')
    ?.parentElement
    ?.querySelector('.swiper-button-prev');

    const swiperNext = document.querySelector('.swiper-clinics')
    ?.parentElement
    ?.querySelector('.swiper-button-next');

    new Swiper(".swiper-clinics", {
      modules: [Navigation],
      spaceBetween: 30,
      speed: 600,
      navigation: {
        nextEl: swiperNext,
        prevEl: swiperPrev,
      },
      breakpoints :{
        0: {
          slidesPerView: 1,
        },
        767:{
          slidesPerView: 2,
        },
        991:{
          slidesPerView: 3,
        },
        1200: {
          slidesPerView: 4,
        }
      }
    });
  }
  if(document.querySelector('.swiper-testimonials') && !document.querySelector('.swiper-testimonials').swiper){
    const swiperPrev = document.querySelector('.swiper-testimonials')
    ?.parentElement
    ?.querySelector('.swiper-button-prev');

    const swiperNext = document.querySelector('.swiper-testimonials')
    ?.parentElement
    ?.querySelector('.swiper-button-next');
    new Swiper(".swiper-testimonials", {
      modules: [Navigation],
      spaceBetween: 30,
      speed: 600,
      navigation: {
        nextEl: swiperNext,
        prevEl: swiperPrev,
      },
      breakpoints :{
        0: {
          slidesPerView: 1,
        },
        767:{
          slidesPerView: 2,
        },
        992: {
          slidesPerView: 3,
        }
      }
    });
  }
  if(document.querySelector('.stays-slider') && !document.querySelector('.stays-slider').swiper){
    new Swiper(".stays-slider", {
      modules: [Navigation],
      spaceBetween: 30,
      speed: 600,
      navigation: {
        nextEl: ".stays-slider-outer .swiper-button-next",
        prevEl: ".stays-slider-outer .swiper-button-prev",
      },
      breakpoints :{
        0: {
          slidesPerView: 1,
        },
        767:{
          slidesPerView: 2,
        },
        992: {
          slidesPerView: 4,
        }
      }
    });
  }
  if(document.querySelector('.events-slider') && !document.querySelector('.events-slider').swiper){
    new Swiper(".events-slider", {
      modules: [Navigation],
      spaceBetween: 30,
      speed: 600,
      navigation: {
        nextEl: ".events-slider-outer .swiper-button-next",
        prevEl: ".events-slider-outer .swiper-button-prev",
      },
      breakpoints :{
        0: {
          slidesPerView: 1,
        },
        767:{
          slidesPerView: 2,
        },
        992: {
          slidesPerView: 4,
        }
      }
    });
  }

}

export default function SwiperInit() {
  useEffect(() => {
    // Initial try in case HTML is already present
    initSwipers();
    // Observe for DOM changes
    const observer = new MutationObserver(() => {
      initSwipers();
    });
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);
  return null;
} 