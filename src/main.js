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
	if (!document.getElementById(templateId)) {
		return;
	}

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

// Video Modal functionality
const videoModal = {
	open: (videoId) => {
		orion.renderTemplate({
			templateId: "video-modal-template",
			containerId: "video-modal-container",
			data: { videoId },
			callback: () => {
				// Add event listeners after modal is rendered
				const modal = document.querySelector(".video-modal-overlay");
				const closeButton = document.querySelector(".video-modal-close");

				// Close modal when clicking the close button
				closeButton.addEventListener("click", videoModal.close);

				// Close modal when clicking outside the content
				modal.addEventListener("click", (e) => {
					if (e.target === modal) {
						videoModal.close();
					}
				});

				// Close modal on Escape key
				document.addEventListener("keydown", videoModal.handleEscape);

				// Prevent body scroll when modal is open
				document.body.style.overflow = "hidden";
			},
		});
	},

	close: () => {
		const modalContainer = document.getElementById("video-modal-container");
		modalContainer.innerHTML = "";

		// Remove escape key listener
		document.removeEventListener("keydown", videoModal.handleEscape);

		// Restore body scroll
		document.body.style.overflow = "";
	},

	handleEscape: (e) => {
		if (e.key === "Escape") {
			videoModal.close();
		}
	},
};

window.orion = {
	renderTemplate,
	videoModal,
};
