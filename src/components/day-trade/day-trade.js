const benefits = [
	{
		sup: "Alavancagem 5PI",
		title: "Opere 5 vezes mais contratos",
		description: "Seu capital não precisa ser o limite da sua operação.",
		theme: "dark",
		background:
			"linear-gradient(168deg, rgba(255, 255, 255, 0.20) 8.83%, rgba(255, 251, 251, 0.00) 91.32%), linear-gradient(7deg, #E5CD94 7.75%, #EEDDAD 37.34%, #E9CE95 54.41%, #E6CC91 86.66%)",
		imageUrl:
			"https://irp.cdn-website.com/a02461d5/dms3rep/multi/5X+%287%29+%281%29.png",
	},
	{
		title: "Gestão de risco independente",
		description: "Opere como um profissional e ganhe muito mais.",
		background: "#0B0A09",
		theme: "light",
		imageUrl:
			"https://irp.cdn-website.com/a02461d5/dms3rep/multi/Gestao+%281%29+%281%29.png",
	},
	{
		title: new Handlebars.SafeString("Parcele em até <br />21x no cartão"),
		description: "Facilitamos o pagamento no cartão com juros baixos.",
		background:
			"linear-gradient(180deg, rgba(245,245,245,1) 0%, rgba(214,214,214,1) 100%)",
		theme: "dark",
		imageUrl:
			"https://irp.cdn-website.com/a02461d5/dms3rep/multi/21x+%283%29+%281%29.png",
	},
	{
		title: "A melhor assessoria para o trader",
		description: "Especialistas para atender com agilidade e precisão.",
		background:
			"linear-gradient(180deg, rgba(245, 237, 223, 1) 0%, rgba(214, 193, 157, 1) 100%)",
		theme: "dark",
		imageUrl:
			"https://irp.cdn-website.com/a02461d5/dms3rep/multi/Assessoria+%281%29+%281%29.png",
	},
	{
		title: "Cartão black para receber lucros",
		description: "Menos impostos e acesso ao clube de benefícios.",
		background:
			"linear-gradient(180deg, rgba(242,246,247,1) 0%, rgba(220,230,233,1) 100%)",
		theme: "dark",
		imageUrl:
			"https://irp.cdn-website.com/a02461d5/dms3rep/multi/Cartao+%281%29.png",
	},
	{
		title: "Cashback de R$ 250 por compra",
		description: "Resgate imediato em mais de 2000 lojas parceiras",
		background:
			"linear-gradient(180deg, rgba(28,28,28,1) 0%, rgba(10,10,10,1) 100%)",
		theme: "white",
		imageUrl:
			"https://irp.cdn-website.com/a02461d5/dms3rep/multi/Cashback+%281%29.png",
	},
	{
		title: "Sala ao vivo e educacional",
		description:
			"Operações em tempo real, análises detalhadas e mentoria contínua.",
		background:
			"linear-gradient(180deg, rgba(240,248,244,1) 0%, rgba(200,225,215,1) 100%)",
		theme: "dark",
		imageUrl: "https://irp.cdn-website.com/a02461d5/dms3rep/multi/Sala.png",
	},
];

window.addEventListener("DOMContentLoaded", () => {
	window.orion.renderTemplate({
		templateId: "day-trade-template",
		containerId: "day-trade-container",
		data: { benefits: benefits.concat(benefits).concat(benefits) },
		callback: () => {
			const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
			const swiperConfig = {
				slidesPerView: "auto",
				grabCursor: true,
				navigation: {
					nextEl: ".swiper-day-trade-button-next",
					prevEl: ".swiper-day-trade-button-prev",
				},
			};

			if (isDesktop) {
				swiperConfig.speed = 7000;
				swiperConfig.direction = "horizontal";
				swiperConfig.autoplay = {
					delay: 0,
					disableOnInteraction: true,
					pauseOnMouseEnter: true,
				};
			}
			new Swiper(".swiper-day-trade", swiperConfig);
		},
	});
});

// old
// window.addEventListener("DOMContentLoaded", () => {
// 	window.orion.renderTemplate({
// 		templateId: "day-trade-template",
// 		containerId: "day-trade-container",
// 		data: { benefits: benefits },
// 		callback: () => {
// 			new Swiper(".swiper-day-trade", {
// 				slidesPerView: "auto",
// 				grabCursor: true,
// 				autoPlay: 2000,
// 				navigation: {
// 					nextEl: ".swiper-day-trade-button-next",
// 					prevEl: ".swiper-day-trade-button-prev",
// 				},
// 			});
// 		},
// 	});
