const offers = [
	{
		position: 1,
		sku: "book-1",
		name: "Book 15 contratos",
		plan: "standard",
		attributes: {
			margemReal: 1500,
			margemDePerda: 1400,
			diasParaAprovacao: 10,
			repasse: 90,
			plataformaGratuitaReal: "Sim",
			proftOneGratis: "Sim",
			educaionalEspecialistas: 50,
			salasAoVivoComMentores: "Diária",
			gerenciamentoDeRisco: "Sim",
			acessoriaEspecializada: "Sim",
			suportePsicologico: "Sim",
			cashback: "Sim",
			saqueQuinzenalOuMensal: "Sim",
			cartaoBlack: "Sim",
		},
		pricing: {
			price: "550,40",
			installments: 21,
		},
	},
	{
		position: 2,
		sku: "book-2",
		name: "Book 30 contratos",
		plan: "standard",
		attributes: {
			margemReal: 1500,
			margemDePerda: 1400,
			diasParaAprovacao: 10,
			repasse: 90,
			plataformaGratuitaReal: "Sim",
			proftOneGratis: "Sim",
			educaionalEspecialistas: 50,
			salasAoVivoComMentores: "Diária",
			gerenciamentoDeRisco: "Sim",
			acessoriaEspecializada: "Sim",
			suportePsicologico: "Sim",
			cashback: "Sim",
			saqueQuinzenalOuMensal: "Sim",
			cartaoBlack: "Sim",
		},
		variants: {
			duo: {
				price: 1550.4,
				installments: 21,
			},
			miniDolar: {
				price: 1850.4,
				installments: 21,
			},
			miniIndice: {
				price: 2150.4,
				installments: 21,
			},
			approvalDays: {
				5: 300,
				10: 500,
			},
		},
	},
	{
		position: 3,
		sku: "book-3",
		name: "Book 40 contratos",
		plan: "standard",
		attributes: {
			margemReal: 4000,
			margemDePerda: 1400,
			diasParaAprovacao: 10,
			repasse: 90,
			plataformaGratuitaReal: "Sim",
			proftOneGratis: "Sim",
			educaionalEspecialistas: 50,
			salasAoVivoComMentores: "Diária",
			gerenciamentoDeRisco: "Sim",
			acessoriaEspecializada: "Sim",
			suportePsicologico: "Sim",
			cashback: "Sim",
			saqueQuinzenalOuMensal: "Sim",
			cartaoBlack: "Sim",
		},
		pricing: {
			price: "2550,40",
			installments: 21,
		},
	},
];

window.addEventListener("DOMContentLoaded", () => {
	window.orion.renderTemplate({
		templateId: "offers-template",
		containerId: "offers-container",
		data: { offers: offers },
		callback: () => {
			console.log("Offers template rendered successfully");

			const planSelects = document.querySelectorAll(".plan-combobox");

			for (const planSelect of planSelects) {
				planSelect.addEventListener("change", (e) => {
					const selectedValue = e.target.value;
					for (const otherSelect of planSelects) {
						if (otherSelect !== e.target) {
							otherSelect.value = selectedValue;
						}
					}
				});
			}

			// dayTrade: {
			// 	selector: ".swiper-day-trade",
			// 	config: {
			// 		slidesPerView: 1,
			// 		spaceBetween: 24,
			// 		breakpoints: {
			// 			320: { slidesPerView: 1, enabled: false },
			// 			640: { slidesPerView: 2 },
			// 			1024: { slidesPerView: 4 },
			// 		},
			// 		grabCursor: true,
			// 		navigation: {
			// 			nextEl: ".swiper-day-trade-button-next",
			// 			prevEl: ".swiper-day-trade-button-prev",
			// 		},
			// 	},
			// },
		},
	});
});
