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

orion.renderTemplate({
	templateId: "clients-template",
	containerId: "clients-container",
	data: clientsData,
	callback: () => {
		const clientsSwiperConfig = {
			slidesPerView: "auto",
			// spaceBetween: 16,
			// loop: true,
			// loopedSlides: clientsData.clients.length,
			// loopedSlidesLimit: false,
			// loopAdditionalSlides: 5,
			// watchSlidesProgress: true,
			// observer: true,
			// observeParents: true,
			autoplay: {
				delay: 2000,
				disableOnInteraction: false,
				pauseOnMouseEnter: false,
			},
			grabCursor: true,
		};
		new Swiper(".swiper-clients", clientsSwiperConfig);
	},
});
