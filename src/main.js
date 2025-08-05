// Swiper configurations
const swiperConfigs = {
	dayTrade: {
		selector: ".swiper-day-trade",
		config: {
			slidesPerView: 1,
			spaceBetween: 24,
			breakpoints: {
				640: { slidesPerView: 2 },
				1024: { slidesPerView: 4 },
			},
			grabCursor: true,
			navigation: {
				nextEl: ".swiper-day-trade-button-next",
				prevEl: ".swiper-day-trade-button-prev",
			},
		},
	},
	shortsCases: {
		selector: ".swiper-shorts-cases",
		config: {
			slidesPerView: "auto",
			grabCursor: true,
			spaceBetween: 24,
			navigation: {
				nextEl: ".swiper-shorts-cases-button-next",
				prevEl: ".swiper-shorts-cases-button-prev",
			},
		},
	},
};

const renderTemplate = ({ templateId, data, containerId, callback }) => {
	const template = Handlebars.compile(
		document.getElementById(templateId).innerHTML,
	);

	const promise = new Promise((resolve) => {
		const output = template(data);
		document.getElementById(containerId).innerHTML = output;
		resolve(output);
	});

	promise.then(callback);
};

window.orion = {
	renderTemplate,
};
