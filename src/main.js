Handlebars.registerHelper("lt", (a, b) => a < b);
Handlebars.registerHelper("gt", (a, b) => a > b);
Handlebars.registerHelper("eq", (a, b) => a === b);
Handlebars.registerHelper("safe", (text) => new Handlebars.SafeString(text));

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
				const modal = document.querySelector(".video-modal-overlay");
				const closeButton = document.querySelector(".video-modal-close");

				closeButton.addEventListener("click", videoModal.close);

				modal.addEventListener("click", (e) => {
					if (e.target === modal) {
						videoModal.close();
					}
				});

				document.addEventListener("keydown", videoModal.handleEscape);
				document.body.style.overflow = "hidden";
			},
		});
	},

	close: () => {
		const modalContainer = document.getElementById("video-modal-container");
		modalContainer.innerHTML = "";

		document.removeEventListener("keydown", videoModal.handleEscape);
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
