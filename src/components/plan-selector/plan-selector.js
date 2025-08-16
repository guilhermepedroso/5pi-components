// Data aligned with component.html
const plansData = {
	standard: {
		title: {
			text: "Starter",
			sup: "Iniciantes",
		},
		cards: [
			{
				name: "Book 15 contratos",
				planOptions: [
					{
						type: "Duo",
						details: "Duo (WDO e WIN)",
						profit: "R$ 1500",
						minLoss: "R$ 1400",
						configurations: [
							{
								minDaysApproval: 5,
								price: "R$ 550,40",
								url: "#standard-duo-5",
							},
							{
								minDaysApproval: 10,
								price: "R$ 500,40",
								url: "#standard-duo-10",
							},
						],
					},
					{
						type: "Mini Dolar",
						details: "Mini Dólar (WDO)",
						profit: "R$ 1200",
						minLoss: "R$ 1100",
						configurations: [
							{
								minDaysApproval: 5,
								price: "R$ 400,00",
								url: "#standard-mini-dolar-5",
							},
							{
								minDaysApproval: 10,
								price: "R$ 350,00",
								url: "#standard-mini-dolar-10",
							},
						],
					},
					{
						type: "Mini Indice",
						details: "Mini Índice (WIN)",
						profit: "R$ 1300",
						minLoss: "R$ 1200",
						configurations: [
							{
								minDaysApproval: 5,
								price: "R$ 450,00",
								url: "#standard-mini-indice-5",
							},
							{
								minDaysApproval: 10,
								price: "R$ 400,00",
								url: "#standard-mini-indice-10",
							},
						],
					},
				],
			},
			{
				name: "Book 30 contratos",
				planOptions: [
					{
						type: "Duo",
						details: "Duo (WDO e WIN)",
						profit: "R$ 2500",
						minLoss: "R$ 2400",
						configurations: [
							{
								minDaysApproval: 5,
								price: "R$ 1550,40",
								url: "#standard-duo-5",
							},
							{
								minDaysApproval: 10,
								price: "R$ 1500,40",
								url: "#standard-duo-10",
							},
						],
					},
					{
						type: "Mini Dolar",
						details: "Mini Dólar (WDO)",
						profit: "R$ 2200",
						minLoss: "R$ 2100",
						configurations: [
							{
								minDaysApproval: 5,
								price: "R$ 1400,00",
								url: "#standard-mini-dolar-5",
							},
							{
								minDaysApproval: 10,
								price: "R$ 1350,00",
								url: "#standard-mini-dolar-10",
							},
						],
					},
					{
						type: "Mini Indice",
						details: "Mini Índice (WIN)",
						profit: "R$ 2300",
						minLoss: "R$ 2200",
						configurations: [
							{
								minDaysApproval: 5,
								price: "R$ 1450,00",
								url: "#standard-mini-indice-5",
							},
							{
								minDaysApproval: 10,
								price: "R$ 1400,00",
								url: "#standard-mini-indice-10",
							},
						],
					},
				],
			},
			{
				name: "Book 40 contratos",
				planOptions: [
					{
						type: "Duo",
						details: "Duo (WDO e WIN)",
						profit: "R$ 4000",
						minLoss: "R$ 3800",
						configurations: [
							{
								minDaysApproval: 5,
								price: "R$ 2550,40",
								url: "#standard-duo-5",
							},
							{
								minDaysApproval: 10,
								price: "R$ 2500,40",
								url: "#standard-duo-10",
							},
						],
					},
					{
						type: "Mini Dolar",
						details: "Mini Dólar (WDO)",
						profit: "R$ 3800",
						minLoss: "R$ 3600",
						configurations: [
							{
								minDaysApproval: 5,
								price: "R$ 2400,00",
								url: "#standard-mini-dolar-5",
							},
							{
								minDaysApproval: 10,
								price: "R$ 2350,00",
								url: "#standard-mini-dolar-10",
							},
						],
					},
					{
						type: "Mini Indice",
						details: "Mini Índice (WIN)",
						profit: "R$ 3900",
						minLoss: "R$ 3700",
						configurations: [
							{
								minDaysApproval: 5,
								price: "R$ 2450,00",
								url: "#standard-mini-indice-5",
							},
							{
								minDaysApproval: 10,
								price: "R$ 2400,00",
								url: "#standard-mini-indice-10",
							},
						],
					},
				],
			},
		],
	},
	pro: {
		title: {
			text: "Plus",
			sup: "Mais comprados",
		},
		cards: [
			{
				name: "Book 20 contratos Pro",
				planOptions: [
					{
						type: "Duo",
						details: "Duo (WDO e WIN)",
						profit: "R$ 2000",
						minLoss: "R$ 1800",
						configurations: [
							{ minDaysApproval: 5, price: "R$ 800,00", url: "#pro-duo-5" },
							{ minDaysApproval: 10, price: "R$ 750,00", url: "#pro-duo-10" },
						],
					},
					{
						type: "Mini Dolar",
						details: "Mini Dólar (WDO)",
						profit: "R$ 1800",
						minLoss: "R$ 1600",
						configurations: [
							{
								minDaysApproval: 5,
								price: "R$ 650,00",
								url: "#pro-mini-dolar-5",
							},
							{
								minDaysApproval: 10,
								price: "R$ 600,00",
								url: "#pro-mini-dolar-10",
							},
						],
					},
					{
						type: "Mini Indice",
						details: "Mini Índice (WIN)",
						profit: "R$ 1900",
						minLoss: "R$ 1700",
						configurations: [
							{
								minDaysApproval: 5,
								price: "R$ 700,00",
								url: "#pro-mini-indice-5",
							},
							{
								minDaysApproval: 10,
								price: "R$ 650,00",
								url: "#pro-mini-indice-10",
							},
						],
					},
				],
			},
			{
				name: "Book 50 contratos Pro",
				planOptions: [
					{
						type: "Duo",
						details: "Duo (WDO e WIN)",
						profit: "R$ 5000",
						minLoss: "R$ 4800",
						configurations: [
							{ minDaysApproval: 5, price: "R$ 2500,00", url: "#pro-duo-5" },
							{ minDaysApproval: 10, price: "R$ 2450,00", url: "#pro-duo-10" },
						],
					},
					{
						type: "Mini Dolar",
						details: "Mini Dólar (WDO)",
						profit: "R$ 4800",
						minLoss: "R$ 4600",
						configurations: [
							{
								minDaysApproval: 5,
								price: "R$ 2300,00",
								url: "#pro-mini-dolar-5",
							},
							{
								minDaysApproval: 10,
								price: "R$ 2250,00",
								url: "#pro-mini-dolar-10",
							},
						],
					},
					{
						type: "Mini Indice",
						details: "Mini Índice (WIN)",
						profit: "R$ 4900",
						minLoss: "R$ 4700",
						configurations: [
							{
								minDaysApproval: 5,
								price: "R$ 2400,00",
								url: "#pro-mini-indice-5",
							},
							{
								minDaysApproval: 10,
								price: "R$ 2350,00",
								url: "#pro-mini-indice-10",
							},
						],
					},
				],
			},
			{
				name: "Book 70 contratos Pro",
				planOptions: [
					{
						type: "Duo",
						details: "Duo (WDO e WIN)",
						profit: "R$ 6500",
						minLoss: "R$ 6200",
						configurations: [
							{ minDaysApproval: 5, price: "R$ 3500,00", url: "#pro-duo-5" },
							{ minDaysApproval: 10, price: "R$ 3450,00", url: "#pro-duo-10" },
						],
					},
					{
						type: "Mini Dolar",
						details: "Mini Dólar (WDO)",
						profit: "R$ 6200",
						minLoss: "R$ 5900",
						configurations: [
							{
								minDaysApproval: 5,
								price: "R$ 3300,00",
								url: "#pro-mini-dolar-5",
							},
							{
								minDaysApproval: 10,
								price: "R$ 3250,00",
								url: "#pro-mini-dolar-10",
							},
						],
					},
					{
						type: "Mini Indice",
						details: "Mini Índice (WIN)",
						profit: "R$ 6300",
						minLoss: "R$ 6000",
						configurations: [
							{
								minDaysApproval: 5,
								price: "R$ 3400,00",
								url: "#pro-mini-indice-5",
							},
							{
								minDaysApproval: 10,
								price: "R$ 3350,00",
								url: "#pro-mini-indice-10",
							},
						],
					},
				],
			},
		],
	},
	premium: {
		title: {
			text: "Private",
			sup: "Maiores lucros",
		},
		cards: [
			{
				name: "Book 30 contratos Premium",
				planOptions: [
					{
						type: "Duo",
						details: "Duo (WDO e WIN)",
						profit: "R$ 3000",
						minLoss: "R$ 2800",
						configurations: [
							{
								minDaysApproval: 5,
								price: "R$ 1800,00",
								url: "#premium-duo-5",
							},
							{
								minDaysApproval: 10,
								price: "R$ 1750,00",
								url: "#premium-duo-10",
							},
						],
					},
					{
						type: "Mini Dolar",
						details: "Mini Dólar (WDO)",
						profit: "R$ 2800",
						minLoss: "R$ 2600",
						configurations: [
							{
								minDaysApproval: 5,
								price: "R$ 1600,00",
								url: "#premium-mini-dolar-5",
							},
							{
								minDaysApproval: 10,
								price: "R$ 1550,00",
								url: "#premium-mini-dolar-10",
							},
						],
					},
					{
						type: "Mini Indice",
						details: "Mini Índice (WIN)",
						profit: "R$ 2900",
						minLoss: "R$ 2700",
						configurations: [
							{
								minDaysApproval: 5,
								price: "R$ 1700,00",
								url: "#premium-mini-indice-5",
							},
							{
								minDaysApproval: 10,
								price: "R$ 1650,00",
								url: "#premium-mini-indice-10",
							},
						],
					},
				],
			},
			{
				name: "Book 60 contratos Premium",
				planOptions: [
					{
						type: "Duo",
						details: "Duo (WDO e WIN)",
						profit: "R$ 6000",
						minLoss: "R$ 5800",
						configurations: [
							{
								minDaysApproval: 5,
								price: "R$ 3000,00",
								url: "#premium-duo-5",
							},
							{
								minDaysApproval: 10,
								price: "R$ 2950,00",
								url: "#premium-duo-10",
							},
						],
					},
					{
						type: "Mini Dolar",
						details: "Mini Dólar (WDO)",
						profit: "R$ 5800",
						minLoss: "R$ 5600",
						configurations: [
							{
								minDaysApproval: 5,
								price: "R$ 2800,00",
								url: "#premium-mini-dolar-5",
							},
							{
								minDaysApproval: 10,
								price: "R$ 2750,00",
								url: "#premium-mini-dolar-10",
							},
						],
					},
					{
						type: "Mini Indice",
						details: "Mini Índice (WIN)",
						profit: "R$ 5900",
						minLoss: "R$ 5700",
						configurations: [
							{
								minDaysApproval: 5,
								price: "R$ 2900,00",
								url: "#premium-mini-indice-5",
							},
							{
								minDaysApproval: 10,
								price: "R$ 2850,00",
								url: "#premium-mini-indice-10",
							},
						],
					},
				],
			},
			{
				name: "Book 100 contratos Premium",
				planOptions: [
					{
						type: "Duo",
						details: "Duo (WDO e WIN)",
						profit: "R$ 10000",
						minLoss: "R$ 9500",
						configurations: [
							{
								minDaysApproval: 5,
								price: "R$ 5000,00",
								url: "#premium-duo-5",
							},
							{
								minDaysApproval: 10,
								price: "R$ 4900,00",
								url: "#premium-duo-10",
							},
						],
					},
					{
						type: "Mini Dolar",
						details: "Mini Dólar (WDO)",
						profit: "R$ 9800",
						minLoss: "R$ 9300",
						configurations: [
							{
								minDaysApproval: 5,
								price: "R$ 4800,00",
								url: "#premium-mini-dolar-5",
							},
							{
								minDaysApproval: 10,
								price: "R$ 4700,00",
								url: "#premium-mini-dolar-10",
							},
						],
					},
					{
						type: "Mini Indice",
						details: "Mini Índice (WIN)",
						profit: "R$ 9900",
						minLoss: "R$ 9400",
						configurations: [
							{
								minDaysApproval: 5,
								price: "R$ 4900,00",
								url: "#premium-mini-indice-5",
							},
							{
								minDaysApproval: 10,
								price: "R$ 4800,00",
								url: "#premium-mini-indice-10",
							},
						],
					},
				],
			},
		],
	},
};

// App state aligned to component.html behavior
const appState = {
	currentPlan: "standard",
	selectedPlanType: "Duo",
	selectedMinDays: 10,
	isExpanded: false,
};

const stripCurrency = (value) => {
	if (typeof value !== "string") return value;
	return value.replace(/\s*R\$\s*/g, "");
};

const buildOffersViewModel = () => {
	const planKey = appState.currentPlan;
	const plan = plansData[planKey];
	const tabs = Object.keys(plansData).map((key) => ({
		key,
		title: plansData[key].title,
		isActive: key === planKey,
	}));

	const cards = plan.cards.map((card) => {
		const selectedOption =
			card.planOptions.find((opt) => opt.type === appState.selectedPlanType) ||
			card.planOptions[0];
		const selectedConfig =
			selectedOption.configurations.find(
				(c) => Number(c.minDaysApproval) === Number(appState.selectedMinDays),
			) || selectedOption.configurations[0];

		return {
			name: card.name,
			planOptions: card.planOptions.map((opt) => ({
				type: opt.type,
				details: opt.details,
				isSelected: opt.type === appState.selectedPlanType,
			})),
			configurations: selectedOption.configurations.map((c) => ({
				minDaysApproval: c.minDaysApproval,
				isSelected:
					Number(c.minDaysApproval) === Number(appState.selectedMinDays),
			})),
			attributes: {
				margemReal: stripCurrency(selectedOption.profit),
				margemDePerda: stripCurrency(selectedOption.minLoss),
				diasParaAprovacao: appState.selectedMinDays,
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
				price: stripCurrency(selectedConfig.price),
				installments: 21,
			},
			ctaUrl: selectedConfig.url,
		};
	});

	return {
		tabs,
		cards,
		isExpanded: appState.isExpanded,
	};
};

let offers = buildOffersViewModel();

const reRenderOffers = () => {
	offers = buildOffersViewModel();
	window.orion.renderTemplate({
		templateId: "offers-template",
		containerId: "offers-container",
		data: { offers },
		callback: () => {
			// keep plan selects synced across cards
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
		},
	});
};

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
		},
	});
});

// Delegated interactions to mirror component.html behavior without changing the block above
window.addEventListener("DOMContentLoaded", () => {
	// Tabs
	document.addEventListener("click", (e) => {
		const tabButton = e.target.closest(".offers-header--button[data-plan]");
		if (tabButton) {
			const newPlan = tabButton.getAttribute("data-plan");
			if (newPlan && newPlan !== appState.currentPlan) {
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
	});

	// Selections
	document.addEventListener("change", (e) => {
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
