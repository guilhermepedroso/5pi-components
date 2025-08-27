const benefits = [
	{
		sup: "Alavancagem 5PI",
		title: "Opere 5 vezes mais contratos",
		description: "Seu capital não precisa ser o limite da sua operação.",
		theme: "dark",
		background:
			"linear-gradient(168deg, rgba(255, 255, 255, 0.20) 8.83%, rgba(255, 251, 251, 0.00) 91.32%), linear-gradient(7deg, #E5CD94 7.75%, #EEDDAD 37.34%, #E9CE95 54.41%, #E6CC91 86.66%)",
		imageUrl:
			"https://irp.cdn-website.com/a02461d5/dms3rep/multi/5xcapital.png",
	},
	{
		title: "Gestão de risco independente",
		description: "Opere como um profissional e ganhe muito mais.",
		background: "#131211",
		theme: "light",
		imageUrl:
			"https://irp.cdn-website.com/a02461d5/dms3rep/multi/gerenciamentoderisco5pi.png",
	},
	{
		title: new Handlebars.SafeString("Parcele em até <br />21x no cartão"),
		description: "Facilitamos o pagamento no cartão com juros baixos.",
		background:
			"linear-gradient(180deg, #332D28 0%, rgba(145, 144, 144, 0.74) 100%)",
		imageUrl:
			"https://irp.cdn-website.com/a02461d5/dms3rep/multi/parcelamento21x5pi.png",
	},
	{
		title: "A melhor assessoria para o trader",
		description: "Especialistas prontos para atender com agilidade e precisão.",
		background: "linear-gradient(180deg, #C7B29B 35.19%, #ECF7F1 104.8%)",
		theme: "dark",
		imageUrl:
			"https://irp.cdn-website.com/a02461d5/dms3rep/multi/assessoria5pi.png",
	},
	{
		title: "Cashback de R$ 250 reais por compra",
		description: "Resgate imediato em mais de 2000 lojas parceiras",
		background: "linear-gradient(180deg, #63A6B7 0%, #ECF7F7 35%);",
		theme: "dark",
		imageUrl:
			"https://irp.cdn-website.com/a02461d5/dms3rep/multi/cashback5pi.png",
	},
	{
		title: "Sala ao vivo e educacional",
		description:
			"Operações em tempo real, análises detalhadas e mentoria contínua.",
		background: "linear-gradient(180deg, #A5CEB8 0%, #ECF7F1 39.68%)",
		theme: "dark",
		imageUrl:
			"https://irp.cdn-website.com/a02461d5/dms3rep/multi/salaovivo5pi.png",
	},
];

window.addEventListener("DOMContentLoaded", () => {
	window.orion.renderTemplate({
		templateId: "day-trade-template",
		containerId: "day-trade-container",
		data: { benefits: benefits },
		callback: () => {
			new Swiper(".swiper-day-trade", {
				slidesPerView: "auto",
				grabCursor: true,
				navigation: {
					nextEl: ".swiper-day-trade-button-next",
					prevEl: ".swiper-day-trade-button-prev",
				},
			});
		},
	});
});
