// RFQ component: simple state -> view model -> render via window.orion.renderTemplate
// Keep it framework-agnostic and mirror plan-selector patterns

const mock = {
	id: "d8da9fb2-89c5-468d-aab7-60fbede7d395",
	name: "TESTE RFQ #1",
	status: "active",
	settings: {
		name: "TESTE RFQ #1",
		status: "active",
		sections: [
			{
				id: "52d96f68-6652-4184-9244-e2ad6a18354b",
				order: 0,
				title: "Margem de ganho e perda",
				options: [
					{
						id: "fa46c351-f576-4119-9470-ccfaa3138073",
						range: {
							max: 5000,
							min: 1000,
						},
						operation: "ratio_value",
						ratioValue: 0.2,
						operationValue: 0,
					},
					{
						id: "598c723d-33fc-48d6-b677-52027783de72",
						range: {
							max: 10000,
							min: 5001,
						},
						operation: "ratio_value",
						ratioValue: 0.18,
						operationValue: 0,
					},
				],
				uiConfig: {
					max: 10000,
					min: 1000,
					step: 1000,
				},
				inputType: "range",
				sectionType: "profit_margin",
			},
			{
				id: "5dc728ff-c980-4d96-baa8-609aa971d7c8",
				order: 1,
				title: "Numero de contratos",
				options: [
					{
						id: "d4cd8c96-b603-43b8-aa61-ee08ca46651e",
						label: "",
						range: {
							max: 500,
							min: 101,
						},
						operation: "multiply",
						ratioValue: 1,
						operationValue: 1.5,
					},
				],
				uiConfig: {
					max: 500,
					min: 15,
					step: 10,
				},
				inputType: "range",
				sectionType: "contract_quantity",
				customFields: {
					valuePerExcessContract: 1.2,
					maxContractsPer1kMargin: 100,
				},
			},
			{
				id: "5027aecd-dc8c-455b-bb1f-dcc00451cab4",
				order: 2,
				title: "Prazo",
				options: [
					{
						id: "660c23eb-1b74-4107-909d-d689d8acde38",
						label: "60 dias",
						range: {
							max: 100,
							min: 0,
						},
						operation: "multiply",
						ratioValue: 1,
						operationValue: 0,
					},
					{
						id: "4b62af7b-8497-429f-bcd4-17511cbebdae",
						label: "Sem prazo",
						operation: "multiply",
						operationValue: 1.2,
					},
				],
				inputType: "option",
				sectionType: "duration",
			},
		],
		versionId: "d8da9fb2-89c5-468d-aab7-60fbede7d395",
	},
	templateId: null,
	createdAt: "2025-12-10T04:49:02.000Z",
	createdBy: "Wilson Campos",
};

const rfqState = {
	asset: "duo", // duo | wdo | win
	risk: "3000", // amount string without currency separators
	contracts: 15,
	term: "60d", // 60d | no-term
	target: "with", // with | without
	approval: 10, // 5 | 10
	isExpanded: false, // toggle for showing additional benefits
};

const rfqOptions = {
	assets: [
		{ key: "duo", label: "Duo (WDO e WIN)" },
		{ key: "wdo", label: "Mini Dólar" },
		{ key: "win", label: "Mini Índice" },
	],
	risks: ["3000", "6000", "11000", "15000", "18000", "25000"].map((v) => ({
		key: v,
		label: formatBRMoney(v),
	})),
	contracts: [15, 30, 40, 60, 90, 140, 200, 250, 500].map((c) => ({
		key: String(c),
		label: String(c),
	})),
	terms: [
		{ key: "60d", label: "60 Dias" },
		{ key: "no-term", label: "Sem prazo" },
	],
	targets: [
		{ key: "with", label: "Com meta" },
		{ key: "without", label: "Sem meta" },
	],
	approvals: [
		{ key: "5", label: "5 Dias" },
		{ key: "10", label: "10 Dias" },
	],
};

function stripCurrencyBR(v) {
	return String(v ?? "")
		.replace(/\s*R\$\s*/g, "")
		.replace(/\./g, "")
		.replace(",", ".");
}
function formatBRMoney(value) {
	const n = Number(stripCurrencyBR(value));
	if (!Number.isFinite(n)) return "";
	return new Intl.NumberFormat("pt-BR", {
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	}).format(n);
}

function buildRFQViewModel() {
	const form = {
		assets: rfqOptions.assets.map((o) => ({
			...o,
			isActive: o.key === rfqState.asset,
		})),
		risks: rfqOptions.risks.map((o) => ({
			...o,
			isActive: o.key === rfqState.risk,
		})),
		contracts: rfqOptions.contracts.map((o) => ({
			...o,
			isActive: Number(o.key) === Number(rfqState.contracts),
		})),
		terms: rfqOptions.terms.map((o) => ({
			...o,
			isActive: o.key === rfqState.term,
		})),
		targets: rfqOptions.targets.map((o) => ({
			...o,
			isActive: o.key === rfqState.target,
		})),
		approvals: rfqOptions.approvals.map((o) => ({
			...o,
			isActive: Number(o.key) === Number(rfqState.approval),
		})),
	};

	// Simple pricing placeholder logic; replace with real calc if available
	const basePrice = Number(rfqState.contracts) * 200; // arbitrary
	const summary = {
		assetLabel:
			rfqOptions.assets.find((a) => a.key === rfqState.asset)?.label || "",
		minApprovalDays: rfqState.approval,
		contracts: rfqState.contracts,
		gain: formatBRMoney(rfqState.risk),
		loss: formatBRMoney(
			Math.max(Number(stripCurrencyBR(rfqState.risk)) - 100, 0),
		),
		price: formatBRMoney(basePrice),
		ctaUrl: "#", // no backend yet
	};

	return { form, summary, isExpanded: rfqState.isExpanded };
}

function renderRFQ() {
	if (!window.orion?.renderTemplate) return;
	const data = buildRFQViewModel();
	window.orion.renderTemplate({
		templateId: "rfq-template",
		containerId: "rfq-container",
		data,
		callback: () => attachRFQHandlers(),
	});

	const valueBubble = document.querySelector(".value-bubble");
	const valueBubbleRangeElement = valueBubble.closest("range-slider");
	const updateOutput = (event) => (valueBubble.value = event.target.value);

	// Set initial output value
	valueBubble.textContent = valueBubbleRangeElement.value;

	// Update output value
	document.addEventListener("input", updateOutput);
	document.addEventListener("change", updateOutput);
}

function attachRFQHandlers() {
	document.querySelectorAll(".rfq-form [data-group]").forEach((groupEl) => {
		groupEl.addEventListener("click", (e) => {
			const btn = e.target.closest(".rfq-option[data-key]");
			if (!btn) return;
			const group = groupEl.getAttribute("data-group");
			const key = btn.getAttribute("data-key");
			switch (group) {
				case "asset":
					rfqState.asset = key;
					break;
				case "risk":
					rfqState.risk = key;
					break;
				case "contracts":
					rfqState.contracts = Number(key);
					break;
				case "term":
					rfqState.term = key;
					break;
				case "target":
					rfqState.target = key;
					break;
				case "approval":
					rfqState.approval = Number(key);
					break;
			}
			renderRFQ();
		});
	});

	// Toggle details button handler
	document.querySelectorAll(".offers-toggle-details").forEach((btn) => {
		btn.addEventListener("click", (e) => {
			e.preventDefault();
			rfqState.isExpanded = !rfqState.isExpanded;
			renderRFQ();
		});
	});
}

window.addEventListener("DOMContentLoaded", renderRFQ);
