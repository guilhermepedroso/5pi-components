const clientsData = {
	clients: [
		{
			imageUrl:
				"https://irp.cdn-website.com/a02461d5/dms3rep/multi/Anderson-Card.jpg",
			videoId: "dQw4w9WgXcQ",
		},
		{
			imageUrl:
				"https://irp.cdn-website.com/a02461d5/dms3rep/multi/Clebson-Card.jpg",
			videoId: "dQw4w9WgXcQ",
		},
		{
			imageUrl:
				"https://irp.cdn-website.com/a02461d5/dms3rep/multi/Jeferson-Card.jpg",
			videoId: "dQw4w9WgXcQ",
		},
		{
			imageUrl:
				"https://irp.cdn-website.com/a02461d5/dms3rep/multi/Joa-o-Luiz-Teixeira-Card.jpg",
			videoId: "dQw4w9WgXcQ",
		},
		{
			imageUrl:
				"https://irp.cdn-website.com/a02461d5/dms3rep/multi/Lauro-Card.jpg",
			videoId: "dQw4w9WgXcQ",
		},
		{
			imageUrl:
				"https://irp.cdn-website.com/a02461d5/dms3rep/multi/Ovidio-Card.jpg",
			videoId: "dQw4w9WgXcQ",
		},
		{
			imageUrl:
				"https://irp.cdn-website.com/a02461d5/dms3rep/multi/Ve-ia-Card.jpg",
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
				spaceBetween: 16,
				grabCursor: true,
			};
			new Swiper(".swiper-clients", clientsSwiperConfig);

			// hover: adiciona/remove classe no card interno
			const slides = document.querySelectorAll(".swiper-clients .swiper-slide");
			for (const slide of slides) {
				const card = slide.querySelector(".client-group-item");
				if (!card) {
					return;
				}
				slide.addEventListener("mouseenter", () => {
					card.classList.add("card--hover");
				});
				slide.addEventListener("mouseleave", () => {
					card.classList.remove("card--hover");
				});
			}

			document.addEventListener("click", (e) => {
				if (e.target.closest(".client-group-button")) {
					e.preventDefault();
					const button = e.target.closest(".client-group-button");
					const videoId = button.getAttribute("video-id");

					if (videoId) {
						window.orion.videoModal.open(videoId);
					}
				}
			});
		},
	});
});
