window.addEventListener("DOMContentLoaded", () => {
	const videoPlayTestimonialsButton = document.querySelectorAll(
		".video-play-testimonials-button",
	);

	if (videoPlayTestimonialsButton.length > 0) {
		for (const button of videoPlayTestimonialsButton) {
			const videoId = button.getAttribute("video-id");
			button.addEventListener("click", () => {
				window.orion.videoModal.open(videoId);
			});
		}
	}
});
