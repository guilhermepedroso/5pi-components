// Swiper configurations
const swiperConfigs = {
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

Handlebars.registerHelper("lt", (a, b) => a < b);
Handlebars.registerHelper("gt", (a, b) => a > b);
Handlebars.registerHelper("eq", (a, b) => a === b);

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
