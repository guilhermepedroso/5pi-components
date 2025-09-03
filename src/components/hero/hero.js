window.addEventListener("DOMContentLoaded", () => {
	const videoPlayButton = document.querySelector(".video-play-hero-button");
	if (videoPlayButton) {
		videoPlayButton.addEventListener("click", () => {
			window.orion.videoModal.open("dQw4w9WgXcQ");
		});
	}

	const button = document.getElementById("hero-cta--buton");
	button.addEventListener("click", () => {
		const offersContainer = document.getElementById("offers-container");
		if (!offersContainer) {
			return;
		}
		document.getElementById("offers-container")?.scrollIntoView({
			behavior: "smooth",
			block: "nearest", // or "center", "end", "nearest"
		});
	});

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
		}, 6000);
	}
});
