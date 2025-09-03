window.addEventListener("DOMContentLoaded", () => {
	const videoPlayButton = document.querySelector(".video-play-hero-button");
	videoPlayButton.addEventListener("click", () => {
		window.orion.videoModal.open("dQw4w9WgXcQ");
	});

	setInterval(() => {
		document.querySelector("#hero-title .text-1").classList.toggle("hidden");
		document.querySelector("#hero-title .text-2").classList.toggle("hidden");
	}, 6000);
});
