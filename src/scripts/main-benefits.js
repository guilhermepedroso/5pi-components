const benefits = [
	{
		title: "Opere 5 vezes mais contratos",
		description: "Seu capital não precisa ser o limite da sua operação.",
		imageUrl:
			"https://irp.cdn-website.com/a02461d5/dms3rep/multi/5xcapital.png",
	},
	{
		title: "Gestão de risco independente",
		description: "Opere como um profissional e ganhe muito mais.",
		imageUrl:
			"https://irp.cdn-website.com/a02461d5/dms3rep/multi/gerenciamentoderisco5pi.png",
	},
	{
		title: "Resgate mensal ou quinzenal",
		description: "Receba pelo nosso cartão ou via Pix, você decide.",
		imageUrl:
			"https://irp.cdn-website.com/a02461d5/dms3rep/multi/cartao5pi.png",
	},
	{
		title: "Parcele em até 21x no cartão",
		description: "Facilitamos o pagamento no cartão com juros baixos.",
		imageUrl:
			"https://irp.cdn-website.com/a02461d5/dms3rep/multi/parcelamento21x5pi.png",
	},
	{
		title: "A melhor assessoria para o trader",
		description: "Especialistas prontos para atender com agilidade e precisão.",
		imageUrl:
			"https://irp.cdn-website.com/a02461d5/dms3rep/multi/assessoria5pi.png",
	},
	{
		title: "Cashback de R$ 250 reais por compra",
		description: "Resgate imediato em mais de 2000 lojas parceiras",
		imageUrl:
			"https://irp.cdn-website.com/a02461d5/dms3rep/multi/cashback5pi.png",
	},
	{
		title: "Sala ao vivo e educacional",
		description:
			"Operações em tempo real, análises detalhadas e mentoria contínua.",
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
