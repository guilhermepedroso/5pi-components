const clientsData = {
	clients: [
		{
			imageUrl:
				"https://lirp.cdn-website.com/a02461d5/dms3rep/multi/opt/Mask+group-2x+%281%29-160w.png",
			videoId: "dQw4w9WgXcQ",
		},
		{
			imageUrl:
				"https://lirp.cdn-website.com/a02461d5/dms3rep/multi/opt/Mask+group-2x+%281%29-160w.png",
			videoId: "dQw4w9WgXcQ",
		},
		{
			imageUrl:
				"https://lirp.cdn-website.com/a02461d5/dms3rep/multi/opt/Mask+group-2x+%281%29-160w.png",
			videoId: "dQw4w9WgXcQ",
		},
		{
			imageUrl:
				"https://lirp.cdn-website.com/a02461d5/dms3rep/multi/opt/Mask+group-2x+%281%29-160w.png",
			videoId: "dQw4w9WgXcQ",
		},
		{
			imageUrl:
				"https://lirp.cdn-website.com/a02461d5/dms3rep/multi/opt/Mask+group-2x+%281%29-160w.png",
			videoId: "dQw4w9WgXcQ",
		},
		{
			imageUrl:
				"https://lirp.cdn-website.com/a02461d5/dms3rep/multi/opt/Mask+group-2x+%281%29-160w.png",
			videoId: "dQw4w9WgXcQ",
		},
		{
			imageUrl:
				"https://lirp.cdn-website.com/a02461d5/dms3rep/multi/opt/Mask+group-2x+%281%29-160w.png",
			videoId: "dQw4w9WgXcQ",
		},
		{
			imageUrl:
				"https://lirp.cdn-website.com/a02461d5/dms3rep/multi/opt/Mask+group-2x+%281%29-160w.png",
			videoId: "dQw4w9WgXcQ",
		},
		{
			imageUrl:
				"https://lirp.cdn-website.com/a02461d5/dms3rep/multi/opt/Mask+group-2x+%281%29-160w.png",
			videoId: "dQw4w9WgXcQ",
		},
		{
			imageUrl:
				"https://lirp.cdn-website.com/a02461d5/dms3rep/multi/opt/Mask+group-2x+%281%29-160w.png",
			videoId: "dQw4w9WgXcQ",
		},
		{
			imageUrl:
				"https://lirp.cdn-website.com/a02461d5/dms3rep/multi/opt/Mask+group-2x+%281%29-160w.png",
			videoId: "dQw4w9WgXcQ",
		},
		{
			imageUrl:
				"https://lirp.cdn-website.com/a02461d5/dms3rep/multi/opt/Mask+group-2x+%281%29-160w.png",
			videoId: "dQw4w9WgXcQ",
		},
		{
			imageUrl:
				"https://lirp.cdn-website.com/a02461d5/dms3rep/multi/opt/Mask+group-2x+%281%29-160w.png",
			videoId: "dQw4w9WgXcQ",
		},
	],
};

window.addEventListener("DOMContentLoaded", () => {
	window.orion.renderTemplate({
		templateId: "clients-template",
		containerId: "clients-container",
		data: clientsData,
		callback: () => {
			const clientsSwiperConfig = {
				slidesPerView: "auto",
				autoplay: {
					delay: 2000,
					disableOnInteraction: false,
					pauseOnMouseEnter: true,
				},
				grabCursor: true,
			};
			new Swiper(".swiper-clients", clientsSwiperConfig);

			// missing: on play, pause the autoplay, on close, resume the autoplay

			document.addEventListener("click", (e) => {
				if (e.target.closest(".play-button")) {
					e.preventDefault();
					const button = e.target.closest(".play-button");
					const videoId = button.getAttribute("video-id");

					if (videoId) {
						window.orion.videoModal.open(videoId);
					}
				}
			});
		},
	});
});
