// ===================== Parser robusto BRL =====================
const toNumberBR = (v) =&gt; {
	if (typeof v === "number") return v;
	let s = String(v ?? "").trim();
	s = s.replace(/\u00A0/g, "");        // NBSP
	s = s.replace(/[R$\s]/g, "");        // R, $, espaços
	const hasComma = s.includes(","), hasDot = s.includes(".");
	if (hasComma) s = s.replace(/\./g, "").replace(",", ".");
	else if (hasDot) s = s.replace(/\.(?=.*\.)/g, ""); // remove todos os pontos, menos o último
	s = s.replace(/[^0-9.\-]/g, "");
	const n = Number(s);
	return Number.isFinite(n) ? n : 0;
};
// ===================== DADOS (planilha aplicada) =====================
const plansData = {
	starter: {
		title: { text: "Planos Starter", sup: "Iniciantes" },
		cards: [
			{
				name: "Book 15",
				planOptions: [
					{
						type: "Duo", details: "Duo (WDO e WIN)",
						attributes: { margemReal: "R$ 1.500", margemDePerda: "R$ 1.400", diasParaAprovacao: 10, repasse: 90, plataformaGratuitaReal: "Sim", proftOneGratis: "Sim", educaionalEspecialistas: 50, salasAoVivoComMentores: "Diária", gerenciamentoDeRisco: "Sim", acessoriaEspecializada: "Sim", suportePsicologico: "Sim", cashback: "Sim", saqueQuinzenalOuMensal: "Sim", cartaoBlack: "Sim" },
						configurations: [
							{ minDaysApproval: 60, oldPrice: "R$ 600,00", price: "R$ 450,00", couponCode: "NEW15OFF", url: "https://checkout.cincoporcento.com/pay/book-15-duo-60-dias" },
							{ minDaysApproval: 0,  oldPrice: "R$ 750,00", price: "R$ 500,00", couponCode: "NEW15OFF", url: "https://checkout.cincoporcento.com/pay/book-15-duo-sem-prazo" },
						],
					},
					{
						type: "Mini Dolar", details: "Mini Dólar (WDO)",
						attributes: { margemReal: "R$ 1.200", margemDePerda: "R$ 1.100", diasParaAprovacao: 10, repasse: 90, plataformaGratuitaReal: "Sim", proftOneGratis: "Sim", educaionalEspecialistas: 50, salasAoVivoComMentores: "Diária", gerenciamentoDeRisco: "Sim", acessoriaEspecializada: "Sim", suportePsicologico: "Sim", cashback: "Sim", saqueQuinzenalOuMensal: "Sim", cartaoBlack: "Sim" },
						configurations: [
							{ minDaysApproval: 60, oldPrice: "R$ 600,00", price: "R$ 450,00", couponCode: "NEW150FF", url: "https://checkout.cincoporcento.com/pay/book-15-wdo-60-dias" },
							{ minDaysApproval: 0,  oldPrice: "R$ 750,00", price: "R$ 500,00", couponCode: "NEW250FF", url: "https://checkout.cincoporcento.com/pay/book-15-wdo-sem-prazo" },
						],
					},
					{
						type: "Mini Indice", details: "Mini Índice (WIN)",
						attributes: { margemReal: "R$ 1.300", margemDePerda: "R$ 1.200", diasParaAprovacao: 10, repasse: 90, plataformaGratuitaReal: "Sim", proftOneGratis: "Sim", educaionalEspecialistas: 50, salasAoVivoComMentores: "Diária", gerenciamentoDeRisco: "Sim", acessoriaEspecializada: "Sim", suportePsicologico: "Sim", cashback: "Sim", saqueQuinzenalOuMensal: "Sim", cartaoBlack: "Sim" },
						configurations: [
							{ minDaysApproval: 60, oldPrice: "R$ 600,00", price: "R$ 450,00", couponCode: "NEW150FF", url: "https://checkout.cincoporcento.com/pay/book-15-win-60-dias" },
							{ minDaysApproval: 0,  oldPrice: "R$ 750,00", price: "R$ 500,00", couponCode: "NEW250FF", url: "https://checkout.cincoporcento.com/pay/book-15-win-sem-prazo" },
						],
					},
				],
			},
			{
				name: "Book 30",
				planOptions: [
					{
						type: "Duo", details: "Duo (WDO e WIN)",
						attributes: { margemReal: "R$ 3.000", margemDePerda: "R$ 3.000", diasParaAprovacao: 10, repasse: 90, plataformaGratuitaReal: "Sim", proftOneGratis: "Sim", educaionalEspecialistas: 50, salasAoVivoComMentores: "Diária", gerenciamentoDeRisco: "Sim", acessoriaEspecializada: "Sim", suportePsicologico: "Sim", cashback: "Sim", saqueQuinzenalOuMensal: "Sim", cartaoBlack: "Sim" },
						configurations: [
							{ minDaysApproval: 60, oldPrice: "R$ 1.499,00", price: "R$ 1.096,79", couponCode: "NEW32OFF", url: "https://checkout.cincoporcento.com/pay/book-30-duo-60-dias" },
							{ minDaysApproval: 0,  oldPrice: "R$ 1.640,99", price: "R$ 1.099,00", couponCode: "NEW32OFF", url: "https://checkout.cincoporcento.com/pay/book-30-duo-sem-prazo" },
						],
					},
					{
						type: "Mini Dolar", details: "Mini Dólar (WDO)",
						attributes: { margemReal: "R$ 3.000", margemDePerda: "R$ 3.000", diasParaAprovacao: 10, repasse: 90, plataformaGratuitaReal: "Sim", proftOneGratis: "Sim", educaionalEspecialistas: 50, salasAoVivoComMentores: "Diária", gerenciamentoDeRisco: "Sim", acessoriaEspecializada: "Sim", suportePsicologico: "Sim", cashback: "Sim", saqueQuinzenalOuMensal: "Sim", cartaoBlack: "Sim" },
						configurations: [
							{ minDaysApproval: 60, oldPrice: "R$ 1.340,00", price: "R$ 898,00", couponCode: "NEW330FF", url: "https://checkout.cincoporcento.com/pay/book-30-wdo-60-dias" },
							{ minDaysApproval: 0,  oldPrice: "R$ 1.479,99", price: "R$ 991,74", couponCode: "NEW330FF", url: "https://checkout.cincoporcento.com/pay/book-30-wdo-sem-prazo" },
						],
					},
					{
						type: "Mini Indice", details: "Mini Índice (WIN)",
						attributes: { margemReal: "R$ 3.000", margemDePerda: "R$ 3.000", diasParaAprovacao: 10, repasse: 90, plataformaGratuitaReal: "Sim", proftOneGratis: "Sim", educaionalEspecialistas: 50, salasAoVivoComMentores: "Diária", gerenciamentoDeRisco: "Sim", acessoriaEspecializada: "Sim", suportePsicologico: "Sim", cashback: "Sim", saqueQuinzenalOuMensal: "Sim", cartaoBlack: "Sim" },
						configurations: [
							{ minDaysApproval: 60, oldPrice: "R$ 1.340,00", price: "R$ 898,00", couponCode: "NEW330FF", url: "https://checkout.cincoporcento.com/pay/book-30-win-60-dias" },
							{ minDaysApproval: 0,  oldPrice: "R$ 1.479,99", price: "R$ 991,74", couponCode: "NEW330FF", url: "https://checkout.cincoporcento.com/pay/book-30-win-sem-prazo" },
						],
					},
				],
			},
			{
				name: "Book 40",
				planOptions: [
					{
						type: "Duo", details: "Duo (WDO e WIN)",
						attributes: { margemReal: "R$ 6.000", margemDePerda: "R$ 5.500", diasParaAprovacao: 10, repasse: 90, plataformaGratuitaReal: "Sim", proftOneGratis: "Sim", educaionalEspecialistas: 50, salasAoVivoComMentores: "Diária", gerenciamentoDeRisco: "Sim", acessoriaEspecializada: "Sim", suportePsicologico: "Sim", cashback: "Sim", saqueQuinzenalOuMensal: "Sim", cartaoBlack: "Sim" },
						configurations: [
							{ minDaysApproval: 60, oldPrice: "R$ 2.799,00", price: "R$ 2.101,00", couponCode: "NEW50OFF", url: "https://checkout.cincoporcento.com/pay/book-40-duo-60-dias" },
							{ minDaysApproval: 0,  oldPrice: "R$ 3.088,99", price: "R$ 2.317,67", couponCode: "NEW50OFFF", url: "https://checkout.cincoporcento.com/pay/book-40-duo-sem-prazo" },
						],
					},
					{
						type: "Mini Dolar", details: "Mini Dólar (WDO)",
						attributes: { margemReal: "R$ 6.000", margemDePerda: "R$ 5.500", diasParaAprovacao: 10, repasse: 90, plataformaGratuitaReal: "Sim", proftOneGratis: "Sim", educaionalEspecialistas: 50, salasAoVivoComMentores: "Diária", gerenciamentoDeRisco: "Sim", acessoriaEspecializada: "Sim", suportePsicologico: "Sim", cashback: "Sim", saqueQuinzenalOuMensal: "Sim", cartaoBlack: "Sim" },
						configurations: [
							{ minDaysApproval: 60, oldPrice: "R$ 2.499,00", price: "R$ 1.899,00", couponCode: "NEW240FF", url: "https://checkout.cincoporcento.com/pay/book-40-wdo-60-dias" },
							{ minDaysApproval: 0,  oldPrice: "R$ 2.788,99", price: "R$ 2.119,35", couponCode: "NEW240FF", url: "https://checkout.cincoporcento.com/pay/book-40-wdo-sem-prazo" },
						],
					},
					{
						type: "Mini Indice", details: "Mini Índice (WIN)",
						attributes: { margemReal: "R$ 6.000", margemDePerda: "R$ 5.500", diasParaAprovacao: 10, repasse: 90, plataformaGratuitaReal: "Sim", proftOneGratis: "Sim", educaionalEspecialistas: 50, salasAoVivoComMentores: "Diária", gerenciamentoDeRisco: "Sim", acessoriaEspecializada: "Sim", suportePsicologico: "Sim", cashback: "Sim", saqueQuinzenalOuMensal: "Sim", cartaoBlack: "Sim" },
						configurations: [
							{ minDaysApproval: 60, oldPrice: "R$ 2.499,00", price: "R$ 1.899,00", couponCode: "NEW240FF", url: "https://checkout.cincoporcento.com/pay/book-40-win-60-dias" },
							{ minDaysApproval: 0,  oldPrice: "R$ 2.788,99", price: "R$ 2.119,35", couponCode: "NEW240FF", url: "https://checkout.cincoporcento.com/pay/book-40-win-sem-prazo" },
						],
					},
				],
			},
		],
	},
	plus: {
		title: { text: "Planos Plus", sup: "Mais comprados" },
		cards: [
			{
				name: "Book 90",
				planOptions: [
					{
						type: "Duo", details: "Duo (WDO e WIN)",
						attributes: { margemReal: "R$ 11.000", margemDePerda: "R$ 11.000", diasParaAprovacao: 10, repasse: 90, plataformaGratuitaReal: "Sim", proftOneGratis: "Sim", educaionalEspecialistas: 50, salasAoVivoComMentores: "Diária", gerenciamentoDeRisco: "Sim", acessoriaEspecializada: "Sim", suportePsicologico: "Sim", cashback: "Sim", saqueQuinzenalOuMensal: "Sim", cartaoBlack: "Sim" },
						configurations: [
							{ minDaysApproval: 60, oldPrice: "R$ 6.099,00", price: "R$ 2.851,00", couponCode: "NEW560FF", url: "https://checkout.cincoporcento.com/pay/book-90-duo-60-dias" },
							{ minDaysApproval: 0,  oldPrice: "R$ 6.498,99", price: "R$ 3.073,02", couponCode: "NEW560FF", url: "https://checkout.cincoporcento.com/pay/book-90-duo-sem-prazo" },
						],
					},
					{
						type: "Mini Dolar", details: "Mini Dólar (WDO)",
						attributes: { margemReal: "R$ 11.000", margemDePerda: "R$ 11.000", diasParaAprovacao: 10, repasse: 90, plataformaGratuitaReal: "Sim", proftOneGratis: "Sim", educaionalEspecialistas: 50, salasAoVivoComMentores: "Diária", gerenciamentoDeRisco: "Sim", acessoriaEspecializada: "Sim", suportePsicologico: "Sim", cashback: "Sim", saqueQuinzenalOuMensal: "Sim", cartaoBlack: "Sim" },
						configurations: [
							{ minDaysApproval: 60, oldPrice: "R$ 6.099,00", price: "R$ 2.699,00", couponCode: "NEW550FF", url: "https://checkout.cincoporcento.com/pay/book-90-wdo-60-dias" },
							{ minDaysApproval: 0,  oldPrice: "R$ 6.498,99", price: "R$ 2.875,80", couponCode: "NEW550FF", url: "https://checkout.cincoporcento.com/pay/book-90-wdo-sem-prazo" },
						],
					},
					{
						type: "Mini Indice", details: "Mini Índice (WIN)",
						attributes: { margemReal: "R$ 11.000", margemDePerda: "R$ 11.000", diasParaAprovacao: 10, repasse: 90, plataformaGratuitaReal: "Sim", proftOneGratis: "Sim", educaionalEspecialistas: 50, salasAoVivoComMentores: "Diária", gerenciamentoDeRisco: "Sim", acessoriaEspecializada: "Sim", suportePsicologico: "Sim", cashback: "Sim", saqueQuinzenalOuMensal: "Sim", cartaoBlack: "Sim" },
						configurations: [
							{ minDaysApproval: 60, oldPrice: "R$ 6.099,00", price: "R$ 2.699,00", couponCode: "NEW550FF", url: "https://checkout.cincoporcento.com/pay/book-90-win-60-dias" },
							{ minDaysApproval: 0,  oldPrice: "R$ 6.498,99", price: "R$ 2.875,80", couponCode: "NEW550FF", url: "https://checkout.cincoporcento.com/pay/book-90-win-sem-prazo" },
						],
					},
				],
			},
			{
				name: "Book 140",
				planOptions: [
					{
						type: "Duo", details: "Duo (WDO e WIN)",
						attributes: { margemReal: "R$ 15.000", margemDePerda: "R$ 15.000", diasParaAprovacao: 10, repasse: 90, plataformaGratuitaReal: "Sim", proftOneGratis: "Sim", educaionalEspecialistas: 50, salasAoVivoComMentores: "Diária", gerenciamentoDeRisco: "Sim", acessoriaEspecializada: "Sim", suportePsicologico: "Sim", cashback: "Sim", saqueQuinzenalOuMensal: "Sim", cartaoBlack: "Sim" },
						configurations: [
							{ minDaysApproval: 60, oldPrice: "R$ 8.407,00", price: "R$ 4.020,00", couponCode: "NEW530FF", url: "https://checkout.cincoporcento.com/pay/book-140-duo-60-dias" },
							{ minDaysApproval: 0,  oldPrice: "R$ 8.956,99", price: "R$ 4.155,15", couponCode: "NEW530FF", url: "https://checkout.cincoporcento.com/pay/book-140-duo-sem-prazo" },
						],
					},
					{
						type: "Mini Dolar", details: "Mini Dólar (WDO)",
						attributes: { margemReal: "R$ 15.000", margemDePerda: "R$ 15.000", diasParaAprovacao: 10, repasse: 90, plataformaGratuitaReal: "Sim", proftOneGratis: "Sim", educaionalEspecialistas: 50, salasAoVivoComMentores: "Diária", gerenciamentoDeRisco: "Sim", acessoriaEspecializada: "Sim", suportePsicologico: "Sim", cashback: "Sim", saqueQuinzenalOuMensal: "Sim", cartaoBlack: "Sim" },
						configurations: [
							{ minDaysApproval: 60, oldPrice: "R$ 7.507,00", price: "R$ 3.700,00", couponCode: "NEW550FF", url: "https://checkout.cincoporcento.com/pay/book-140-wdo-60-dias" },
							{ minDaysApproval: 0,  oldPrice: "R$ 8.056,99", price: "R$ 3.971,29", couponCode: "NEW550FF", url: "https://checkout.cincoporcento.com/pay/book-140-wdo-sem-prazo" },
						],
					},
					{
						type: "Mini Indice", details: "Mini Índice (WIN)",
						attributes: { margemReal: "R$ 15.000", margemDePerda: "R$ 15.000", diasParaAprovacao: 10, repasse: 90, plataformaGratuitaReal: "Sim", proftOneGratis: "Sim", educaionalEspecialistas: 50, salasAoVivoComMentores: "Diária", gerenciamentoDeRisco: "Sim", acessoriaEspecializada: "Sim", suportePsicologico: "Sim", cashback: "Sim", saqueQuinzenalOuMensal: "Sim", cartaoBlack: "Sim" },
						configurations: [
							{ minDaysApproval: 60, oldPrice: "R$ 7.507,00", price: "R$ 3.700,00", couponCode: "NEW550FF", url: "https://checkout.cincoporcento.com/pay/book-140-win-60-dias" },
							{ minDaysApproval: 0,  oldPrice: "R$ 8.056,99", price: "R$ 3.971,29", couponCode: "NEW550FF", url: "https://checkout.cincoporcento.com/pay/book-140-win-sem-prazo" },
						],
					},
				],
			},
			{
				name: "Book 200",
				planOptions: [
					{
						type: "Duo", details: "Duo (WDO e WIN)",
						attributes: { margemReal: "R$ 18.000", margemDePerda: "R$ 18.000", diasParaAprovacao: 10, repasse: 90, plataformaGratuitaReal: "Sim", proftOneGratis: "Sim", educaionalEspecialistas: 50, salasAoVivoComMentores: "Diária", gerenciamentoDeRisco: "Sim", acessoriaEspecializada: "Sim", suportePsicologico: "Sim", cashback: "Sim", saqueQuinzenalOuMensal: "Sim", cartaoBlack: "Sim" },
						configurations: [
							{ minDaysApproval: 60, oldPrice: "R$ 9.239,00", price: "R$ 4.620,00", couponCode: "NEWTRADER50", url: "https://checkout.cincoporcento.com/pay/book-200-duo-60-dias" },
							{ minDaysApproval: 0,  oldPrice: "R$ 9.868,99", price: "R$ 4.934,49", couponCode: "NEWTRADER50", url: "https://checkout.cincoporcento.com/pay/book-200-duo-sem-prazo" },
						],
					},
					{
						type: "Mini Dolar", details: "Mini Dólar (WDO)",
						attributes: { margemReal: "R$ 18.000", margemDePerda: "R$ 18.000", diasParaAprovacao: 10, repasse: 90, plataformaGratuitaReal: "Sim", proftOneGratis: "Sim", educaionalEspecialistas: 50, salasAoVivoComMentores: "Diária", gerenciamentoDeRisco: "Sim", acessoriaEspecializada: "Sim", suportePsicologico: "Sim", cashback: "Sim", saqueQuinzenalOuMensal: "Sim", cartaoBlack: "Sim" },
						configurations: [
							{ minDaysApproval: 60, oldPrice: "R$ 8.399,00", price: "R$ 4.200,00", couponCode: "NEW490FF", url: "https://checkout.cincoporcento.com/pay/book-200-wdo-60-dias" },
							{ minDaysApproval: 0,  oldPrice: "R$ 8.899,00", price: "R$ 4.514,49", couponCode: "NEW490FF", url: "https://checkout.cincoporcento.com/pay/book-200-wdo-sem-prazo" },
						],
					},
					{
						type: "Mini Indice", details: "Mini Índice (WIN)",
						attributes: { margemReal: "R$ 18.000", margemDePerda: "R$ 18.000", diasParaAprovacao: 10, repasse: 90, plataformaGratuitaReal: "Sim", proftOneGratis: "Sim", educaionalEspecialistas: 50, salasAoVivoComMentores: "Diária", gerenciamentoDeRisco: "Sim", acessoriaEspecializada: "Sim", suportePsicologico: "Sim", cashback: "Sim", saqueQuinzenalOuMensal: "Sim", cartaoBlack: "Sim" },
						configurations: [
							{ minDaysApproval: 60, oldPrice: "R$ 8.399,00", price: "R$ 4.200,00", couponCode: "NEW490FF", url: "https://checkout.cincoporcento.com/pay/book-200-win-60-dias" },
							{ minDaysApproval: 0,  oldPrice: "R$ 8.899,00", price: "R$ 4.514,49", couponCode: "NEW490FF", url: "https://checkout.cincoporcento.com/pay/book-200-win-sem-prazo" },
						],
					},
				],
			},
		],
	},
	private: {
		title: { text: "Planos Private", sup: "Maiores lucros" },
		cards: [
			{
				name: "Book 250",
				planOptions: [
					{
						type: "Duo", details: "Duo (WDO e WIN)",
						attributes: { margemReal: "R$ 25.000", margemDePerda: "R$ 25.000", diasParaAprovacao: 10, repasse: 90, plataformaGratuitaReal: "Sim", proftOneGratis: "Sim", educaionalEspecialistas: 50, salasAoVivoComMentores: "Diária", gerenciamentoDeRisco: "Sim", acessoriaEspecializada: "Sim", suportePsicologico: "Sim", cashback: "Sim", saqueQuinzenalOuMensal: "Sim", cartaoBlack: "Sim" },
						configurations: [
							{ minDaysApproval: 60, oldPrice: "R$ 13.090,00", price: "R$ 5.999,00", couponCode: "NEW57OFF", url: "https://checkout.cincoporcento.com/pay/book-250-duo-60-dias" },
							{ minDaysApproval: 0,  oldPrice: "R$ 15.298,99", price: "R$ 6.587,75", couponCode: "NEW57OFF", url: "https://checkout.cincoporcento.com/pay/book-250-duo-sem-prazo" },
						],
					},
					{
						type: "Mini Dolar", details: "Mini Dólar (WDO)",
						attributes: { margemReal: "R$ 25.000", margemDePerda: "R$ 25.000", diasParaAprovacao: 10, repasse: 90, plataformaGratuitaReal: "Sim", proftOneGratis: "Sim", educaionalEspecialistas: 50, salasAoVivoComMentores: "Diária", gerenciamentoDeRisco: "Sim", acessoriaEspecializada: "Sim", suportePsicologico: "Sim", cashback: "Sim", saqueQuinzenalOuMensal: "Sim", cartaoBlack: "Sim" },
						configurations: [
							{ minDaysApproval: 60, oldPrice: "R$ 13.090,00", price: "R$ 5.999,00", couponCode: "NEW540FF", url: "https://checkout.cincoporcento.com/pay/book-250-wdo-60-dias" },
							{ minDaysApproval: 0,  oldPrice: "R$ 13.989,99", price: "R$ 6.411,61", couponCode: "NEW540FF", url: "https://checkout.cincoporcento.com/pay/book-250-wdo-sem-prazo" },
						],
					},
					{
						type: "Mini Indice", details: "Mini Índice (WIN)",
						attributes: { margemReal: "R$ 25.000", margemDePerda: "R$ 25.000", diasParaAprovacao: 10, repasse: 90, plataformaGratuitaReal: "Sim", proftOneGratis: "Sim", educaionalEspecialistas: 50, salasAoVivoComMentores: "Diária", gerenciamentoDeRisco: "Sim", acessoriaEspecializada: "Sim", suportePsicologico: "Sim", cashback: "Sim", saqueQuinzenalOuMensal: "Sim", cartaoBlack: "Sim" },
						configurations: [
							{ minDaysApproval: 60, oldPrice: "R$ 13.090,00", price: "R$ 5.999,00", couponCode: "NEW540FF", url: "https://checkout.cincoporcento.com/pay/book-250-win-60-dias" },
							{ minDaysApproval: 0,  oldPrice: "R$ 13.989,99", price: "R$ 6.411,61", couponCode: "NEW540FF", url: "https://checkout.cincoporcento.com/pay/book-250-win-sem-prazo" },
						],
					},
				],
			},
			{
				name: "Book 500",
				planOptions: [
					{
						type: "Duo", details: "Duo (WDO e WIN)",
						attributes: { margemReal: "R$ 6.000", margemDePerda: "R$ 5.800", diasParaAprovacao: 10, repasse: 90, plataformaGratuitaReal: "Sim", proftOneGratis: "Sim", educaionalEspecialistas: 50, salasAoVivoComMentores: "Diária", gerenciamentoDeRisco: "Sim", acessoriaEspecializada: "Sim", suportePsicologico: "Sim", cashback: "Sim", saqueQuinzenalOuMensal: "Sim", cartaoBlack: "Sim" },
						configurations: [
							{ minDaysApproval: 60, oldPrice: "R$ 15.000,00", price: "R$ 10.000,00", couponCode: "NEW5KOFF", url: "https://checkout.cincoporcento.com/pay/book-500-duo-60-dias" },
							{ minDaysApproval: 0,  oldPrice: "R$ 20.000,00", price: "R$ 15.000,00", couponCode: "NEW5KOFF", url: "https://checkout.cincoporcento.com/pay/book-500-duo-sem-prazo" },
						],
					},
					{
						type: "Mini Dolar", details: "Mini Dólar (WDO)",
						attributes: { margemReal: "R$ 5.800", margemDePerda: "R$ 5.600", diasParaAprovacao: 10, repasse: 90, plataformaGratuitaReal: "Sim", proftOneGratis: "Sim", educaionalEspecialistas: 50, salasAoVivoComMentores: "Diária", gerenciamentoDeRisco: "Sim", acessoriaEspecializada: "Sim", suportePsicologico: "Sim", cashback: "Sim", saqueQuinzenalOuMensal: "Sim", cartaoBlack: "Sim" },
						configurations: [
							{ minDaysApproval: 60, oldPrice: "R$ 15.000,00", price: "R$ 10.000,00", couponCode: "NEW5KOFF", url: "https://checkout.cincoporcento.com/pay/book-500-wdo-60-dias" },
							{ minDaysApproval: 0,  oldPrice: "R$ 15.000,00", price: "R$ 10.000,00", couponCode: "NEW5KOFF", url: "https://checkout.cincoporcento.com/pay/book-500-wdo-sem-prazo" },
						],
					},
					{
						type: "Mini Indice", details: "Mini Índice (WIN)",
						attributes: { margemReal: "R$ 5.900", margemDePerda: "R$ 5.700", diasParaAprovacao: 10, repasse: 90, plataformaGratuitaReal: "Sim", proftOneGratis: "Sim", educaionalEspecialistas: 50, salasAoVivoComMentores: "Diária", gerenciamentoDeRisco: "Sim", acessoriaEspecializada: "Sim", suportePsicologico: "Sim", cashback: "Sim", saqueQuinzenalOuMensal: "Sim", cartaoBlack: "Sim" },
						configurations: [
							{ minDaysApproval: 60, oldPrice: "R$ 15.000,00", price: "R$ 10.000,00", couponCode: "NEW5KOFF", url: "https://checkout.cincoporcento.com/pay/book-500-win-60-dias" },
							{ minDaysApproval: 0,  oldPrice: "R$ 15.000,00", price: "R$ 10.000,00", couponCode: "NEW5KOFF", url: "https://checkout.cincoporcento.com/pay/book-500-win-sem-prazo" },
						],
					},
				],
			},
		],
	},
};
// ===================== STATE =====================
const appState = { currentPlan: "starter", selectedPlanType: "Duo", selectedMinDays: 60, isExpanded: false };
// ===================== Utils =====================
const stripCurrency = (value) =&gt; (typeof value !== "string" ? value : value.replace(/\s*R\$\s*/g, ""));
// ===================== ViewModel (calcula % OFF aqui) =====================
const buildOffersViewModel = () =&gt; {
	const planKey = appState.currentPlan;
	const plan = plansData[planKey];
	const tabs = Object.keys(plansData).map((key) =&gt; ({ key, title: plansData[key].title, isActive: key === planKey }));
	const cards = plan.cards.map((card) =&gt; {
		const selectedOption = card.planOptions.find((opt) =&gt; opt.type === appState.selectedPlanType) || card.planOptions[0];
		const selectedConfig = selectedOption.configurations.find((c) =&gt; Number(c.minDaysApproval) === Number(appState.selectedMinDays)) || selectedOption.configurations[0];
		const priceStr = selectedConfig.price;
		const oldStr   = selectedConfig.oldPrice;
		const pNum = toNumberBR(priceStr);
		const oNum = toNumberBR(oldStr);
		const percentOff = (oNum &gt; 0 &amp;&amp; pNum &lt; oNum) ? Math.round((1 - pNum / oNum) * 100) : 0;
		return {
			name: card.name,
			selectedPlanType: appState.selectedPlanType,
			planOptions: selectedOption ? card.planOptions.map((opt) =&gt; ({
				type: opt.type, details: opt.details, isSelected: opt.type === appState.selectedPlanType,
			})) : [],
			configurations: selectedOption ? selectedOption.configurations.map((c) =&gt; ({
				minDaysApproval: c.minDaysApproval,
				isSelected: Number(c.minDaysApproval) === Number(appState.selectedMinDays),
			})) : [],
			attributes: {
				margemReal: stripCurrency(card.attributes?.margemReal ?? selectedOption.attributes?.margemReal ?? "R$ 0,00"),
				margemDePerda: stripCurrency(card.attributes?.margemDePerda ?? selectedOption.attributes?.margemDePerda ?? "R$ 0,00"),
				diasParaAprovacao: selectedOption.attributes?.diasParaAprovacao ?? 10,
				repasse: selectedOption.attributes?.repasse ?? 90,
				plataformaGratuitaReal: selectedOption.attributes?.plataformaGratuitaReal ?? "Sim",
				proftOneGratis: selectedOption.attributes?.proftOneGratis ?? "Sim",
				educaionalEspecialistas: selectedOption.attributes?.educaionalEspecialistas ?? 50,
				salasAoVivoComMentores: selectedOption.attributes?.salasAoVivoComMentores ?? "Diária",
				gerenciamentoDeRisco: selectedOption.attributes?.gerenciamentoDeRisco ?? "Sim",
				acessoriaEspecializada: selectedOption.attributes?.acessoriaEspecializada ?? "Sim",
				suportePsicologico: selectedOption.attributes?.suportePsicologico ?? "Sim",
				cashback: selectedOption.attributes?.cashback ?? "Sim",
				saqueQuinzenalOuMensal: selectedOption.attributes?.saqueQuinzenalOuMensal ?? "Sim",
				cartaoBlack: selectedOption.attributes?.cartaoBlack ?? "Sim",
			},
			pricing: {
				price: stripCurrency(priceStr),
				oldPrice: oldStr ? stripCurrency(oldStr) : null,
				couponCode: selectedConfig.couponCode || null,
				installments: 21,
				percentOff
			},
			ctaUrl: selectedConfig.url,
		};
	});
	return { tabs, cards, isExpanded: appState.isExpanded };
};
let offers = buildOffersViewModel();
// ===================== Swiper =====================
let offersSwiper = null;
const isMobile = () =&gt; window.innerWidth &lt; 1024;
const initializeSwiper = () =&gt; {
	if (isMobile() &amp;&amp; !offersSwiper) {
		const swiperContainer = document.getElementById("offers-swiper");
		if (swiperContainer) {
			swiperContainer.classList.add("swiper");
			offersSwiper = new Swiper("#offers-swiper", {
				slidesPerView: 1,
				spaceBetween: 24,
				pagination: { el: ".offers-swiper-pagination", clickable: true },
			});
		}
	} else if (!isMobile() &amp;&amp; offersSwiper) {
		if (document.getElementById("offers-swiper")) document.getElementById("offers-swiper").classList.remove("swiper");
		offersSwiper.destroy(true, true);
		offersSwiper = null;
	}
};
const updateIcons = () =&gt; {
	const cards = document.querySelectorAll("[data-card-index]");
	cards.forEach((card) =&gt; {
		const planSelect = card.querySelector(".plan-combobox");
		if (planSelect) {
			const selectedPlanType = planSelect.value;
			const iconContainer = card.querySelector(".absolute.top-1\\/2.left-2") || card.querySelector(".absolute.top-1\\/2.left-3");
			if (iconContainer) {
				const imgs = iconContainer.querySelectorAll("img");
				imgs.forEach((img) =&gt; img.classList.add("hidden"));
				if (selectedPlanType === "Duo") imgs[0]?.classList.remove("hidden");
				else if (selectedPlanType === "Mini Indice") imgs[1]?.classList.remove("hidden");
				else if (selectedPlanType === "Mini Dolar") imgs[2]?.classList.remove("hidden");
			}
		}
	});
};
const reRenderOffers = () =&gt; {
	if (offersSwiper) { offersSwiper.destroy(true, true); offersSwiper = null; }
	offers = buildOffersViewModel();
	window.orion.renderTemplate({
		templateId: "offers-template",
		containerId: "offers-container",
		data: { offers },
		callback: () =&gt; {
			const planSelects = document.querySelectorAll(".plan-combobox");
			for (const planSelect of planSelects) {
				planSelect.addEventListener("change", (e) =&gt; {
					const selectedValue = e.target.value;
					for (const otherSelect of planSelects) {
						if (otherSelect !== e.target) otherSelect.value = selectedValue;
					}
					updateIcons();
				});
			}
			updateIcons();
			setTimeout(initializeSwiper, 10);
		},
	});
};
// ===================== INIT =====================
window.addEventListener("DOMContentLoaded", () =&gt; {
	window.orion.renderTemplate({
		templateId: "offers-template",
		containerId: "offers-container",
		data: { offers },
		callback: () =&gt; {
			const planSelects = document.querySelectorAll(".plan-combobox");
			for (const planSelect of planSelects) {
				planSelect.addEventListener("change", (e) =&gt; {
					const selectedValue = e.target.value;
					for (const otherSelect of planSelects) {
						if (otherSelect !== e.target) otherSelect.value = selectedValue;
					}
					updateIcons();
				});
			}
			updateIcons();
			initializeSwiper();
		},
	});
});
window.addEventListener("resize", () =&gt; { initializeSwiper(); });
window.addEventListener("DOMContentLoaded", () =&gt; {
	document.addEventListener("click", (e) =&gt; {
		const tabButton = e.target.closest(".offers-header--button[data-plan]");
		if (tabButton) {
			const newPlan = tabButton.getAttribute("data-plan");
			if (newPlan &amp;&amp; newPlan !== appState.currentPlan) {
				appState.currentPlan = newPlan;
				reRenderOffers();
			}
		}
		const toggle = e.target.closest(".offers-toggle-details");
		if (toggle) {
			e.preventDefault();
			appState.isExpanded = !appState.isExpanded;
			reRenderOffers();
		}
		const copyButton = e.target.closest(".offers-discount button");
		if (copyButton) {
			e.preventDefault();
			const container = e.target.closest(".offers-discount");
			const couponCode = container?.getAttribute("coupon-code");
			if (couponCode) {
				const tryCopy = (text) =&gt; {
					try {
						if (navigator.clipboard?.writeText) return navigator.clipboard.writeText(text);
						const temp = document.createElement("input");
						temp.value = text; document.body.appendChild(temp); temp.select();
						document.execCommand("copy"); document.body.removeChild(temp);
						return Promise.resolve();
					} catch(e) { return Promise.reject(e); }
				};
				tryCopy(couponCode)
					.then(() =&gt; { if (typeof Toastify === "function") Toastify({ text: "Código copiado", duration: 3000, gravity: "bottom", position: "center", stopOnFocus: true }).showToast(); })
					.catch(() =&gt; { if (typeof Toastify === "function") Toastify({ text: "Não foi possível copiar", duration: 3000, gravity: "bottom", position: "center", stopOnFocus: true }).showToast(); });
			}
		}
	});
	document.addEventListener("change", (e) =&gt; {
		if (e.target.matches(".plan-combobox")) {
			appState.selectedPlanType = e.target.value;
			reRenderOffers();
		}
		if (e.target.matches(".approval-combobox")) {
			appState.selectedMinDays = Number.parseInt(e.target.value, 10);
			reRenderOffers();
		}
	});
});