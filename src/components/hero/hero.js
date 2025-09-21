window.addEventListener("DOMContentLoaded", () => {
	// Use event delegation so it works with dynamically injected content (e.g., Duda)
	document.addEventListener("click", (e) => {
		const playButton = e.target.closest(".video-play-hero-button");
		if (playButton) {
			const videoId = playButton.getAttribute("video-id");
			window.orion.videoModal.open(videoId);
		}
	});

	const button = document.getElementById("hero-cta--buton");
	if (button) {
		button.addEventListener("click", () => {
			const offersContainer = document.getElementById("offers-container");
			if (!offersContainer) {
				return;
			}
			document.getElementById("start-plan-selection-section")?.scrollIntoView({
				behavior: "smooth",
				block: "start",
			});
		});
	}

	const headerButton = document.querySelector(".cta-header-button a");
	if (headerButton) {
		headerButton.addEventListener("click", () => {
			const offersContainer = document.getElementById("offers-container");
			if (!offersContainer) {
				return;
			}
			document.getElementById("start-plan-selection-section")?.scrollIntoView({
				behavior: "smooth",
				block: "start",
			});
		});
	}

	const titleEl = document.getElementById("hero-title");
	const line1 = titleEl?.querySelector(".text-1");
	const line2 = titleEl?.querySelector(".text-2");
	if (titleEl && line1 && line2) {
		const setStableHeight = () => {
			const maxHeight = Math.max(line1.scrollHeight, line2.scrollHeight);
			titleEl.style.height = `${maxHeight}px`;
		};
		setStableHeight();
		let showingFirst = true;
		setInterval(() => {
			if (showingFirst) {
				line1.classList.remove("is-active");
				line1.classList.add("is-inactive");
				line2.classList.remove("is-inactive");
				line2.classList.add("is-active");
			} else {
				line2.classList.remove("is-active");
				line2.classList.add("is-inactive");
				line1.classList.remove("is-inactive");
				line1.classList.add("is-active");
			}
			showingFirst = !showingFirst;
		}, 4000);
	}
});
