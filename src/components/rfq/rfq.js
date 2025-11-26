// RFQ component: simple state -> view model -> render via window.orion.renderTemplate
// Keep it framework-agnostic and mirror plan-selector patterns

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
