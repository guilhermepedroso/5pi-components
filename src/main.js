new Swiper(".swiper-day-trade", {
	slidesPerView: 1,
	spaceBetween: 24,
	breakpoints: {
		640: {
			slidesPerView: 2,
		},
		1024: {
			slidesPerView: 4,
		},
	},
	grabCursor: true,
	navigation: {
		nextEl: ".swiper-day-trade-button-next",
		prevEl: ".swiper-day-trade-button-prev",
	},
});

new Swiper(".swiper-shorts-cases", {
	slidesPerView: "auto",
	grabCursor: true,
	spaceBetween: 24,
	navigation: {
		nextEl: ".swiper-shorts-cases-button-next",
		prevEl: ".swiper-shorts-cases-button-prev",
	},
});
