// RFQ component: simple state -> view model -> render via window.orion.renderTemplate
// Keep it framework-agnostic and mirror plan-selector patterns

/**
 * CustomSlider - A slider component with 3 visual zones
 * - Free zone (orange): included in base price
 * - Paid zone (green): additional cost
 * - Locked zone (gray): not accessible
 */
class CustomSlider {
	constructor(options) {
		this.container = options.container;
		this.min = options.min ?? 0;
		this.max = options.max ?? 100; // max draggable value (end of green zone)
		this.total = options.total ?? this.max; // total track value (end of gray zone)
		this.step = options.step ?? 1;
		this.freeLimit = options.freeLimit ?? this.max; // end of free zone (orange)
		this.value = options.value ?? this.min;
		this.pricePerUnit = options.pricePerUnit ?? 0;
		this.formatValue =
			options.formatValue ?? ((v) => v.toLocaleString("pt-BR"));
		this.formatPrice =
			options.formatPrice ?? ((p) => `R$ ${p.toLocaleString("pt-BR")}`);
		this.onChange = options.onChange ?? (() => {});

		// Internal state
		this.isDragging = false;
		this.elements = {};

		// Bound handlers for cleanup
		this._onMouseMove = this._handleMove.bind(this);
		this._onMouseUp = this._handleEnd.bind(this);
		this._onTouchMove = this._handleMove.bind(this);
		this._onTouchEnd = this._handleEnd.bind(this);

		this._render();
		this._attachEvents();
		this._update();
	}

	_render() {
		this.container.innerHTML = "";
		this.container.classList.add("custom-slider");

		// Bubble
		const bubble = document.createElement("div");
		bubble.className = "slider-bubble slider-bubble--free";
		bubble.innerHTML = `
			<span class="bubble-value"></span>
			<span class="bubble-price"></span>
		`;
		this.elements.bubble = bubble;
		this.elements.bubbleValue = bubble.querySelector(".bubble-value");
		this.elements.bubblePrice = bubble.querySelector(".bubble-price");

		// Track
		const track = document.createElement("div");
		track.className = "slider-track";

		// Fill element that follows the knob
		const trackFill = document.createElement("div");
		trackFill.className = "track-fill track-fill--free";
		this.elements.trackFill = trackFill;

		// Zone backgrounds
		const range = this.total - this.min;
		const hasZones = this.freeLimit < this.max;

		// Paid zone background (green unfilled area)
		if (hasZones) {
			const freeLimitPercent = ((this.freeLimit - this.min) / range) * 100;
			const maxPercent = ((this.max - this.min) / range) * 100;
			const paidZone = document.createElement("div");
			paidZone.className = "track-paid-zone";
			paidZone.style.left = `${freeLimitPercent}%`;
			paidZone.style.width = `${maxPercent - freeLimitPercent}%`;
			track.appendChild(paidZone);
		}

		// Locked zone (if max < total)
		const lockedPercent = ((this.total - this.max) / range) * 100;
		if (lockedPercent > 0) {
			const lockedZone = document.createElement("div");
			lockedZone.className = "track-locked-zone";
			lockedZone.style.width = `${lockedPercent}%`;
			track.appendChild(lockedZone);
		}

		// Markers for zone boundaries (only if there are zones)
		if (hasZones) {
			const freeLimitPercent = ((this.freeLimit - this.min) / range) * 100;
			const freeMarker = document.createElement("div");
			freeMarker.className = "track-marker";
			freeMarker.style.left = `${freeLimitPercent}%`;
			track.appendChild(freeMarker);
		}

		if (this.max < this.total) {
			const maxPercent = ((this.max - this.min) / range) * 100;
			const maxMarker = document.createElement("div");
			maxMarker.className = "track-marker";
			maxMarker.style.left = `${maxPercent}%`;
			track.appendChild(maxMarker);
		}

		const knob = document.createElement("div");
		knob.className = "slider-knob slider-knob--free";

		track.appendChild(trackFill);

		// Wrapper for track + knob (knob outside track to avoid overflow clipping)
		const trackWrapper = document.createElement("div");
		trackWrapper.className = "slider-track-wrapper";
		trackWrapper.appendChild(track);
		trackWrapper.appendChild(knob);

		this.elements.track = track;
		this.elements.trackWrapper = trackWrapper;
		this.elements.knob = knob;
		this.elements.hasZones = hasZones;

		// Labels
		const labels = document.createElement("div");
		labels.className = "slider-labels";
		labels.innerHTML = `
			<span>${this.formatValue(this.min)}</span>
			<span>${this.formatValue(this.total)}</span>
		`;
		this.elements.labels = labels;

		// Append all
		this.container.appendChild(bubble);
		this.container.appendChild(trackWrapper);
		this.container.appendChild(labels);
	}

	_attachEvents() {
		const { track, knob } = this.elements;

		// Mouse events
		knob.addEventListener("mousedown", this._handleStart.bind(this));
		track.addEventListener("mousedown", this._handleTrackClick.bind(this));

		// Touch events
		knob.addEventListener("touchstart", this._handleStart.bind(this), {
			passive: false,
		});
		track.addEventListener("touchstart", this._handleTrackClick.bind(this), {
			passive: false,
		});
	}

	_handleStart(e) {
		e.preventDefault();
		e.stopPropagation();
		this.isDragging = true;

		document.addEventListener("mousemove", this._onMouseMove);
		document.addEventListener("mouseup", this._onMouseUp);
		document.addEventListener("touchmove", this._onTouchMove, {
			passive: false,
		});
		document.addEventListener("touchend", this._onTouchEnd);
	}

	_handleMove(e) {
		if (!this.isDragging) return;
		e.preventDefault();

		const clientX = e.touches ? e.touches[0].clientX : e.clientX;
		this._updateValueFromPosition(clientX);
	}

	_handleEnd() {
		this.isDragging = false;

		document.removeEventListener("mousemove", this._onMouseMove);
		document.removeEventListener("mouseup", this._onMouseUp);
		document.removeEventListener("touchmove", this._onTouchMove);
		document.removeEventListener("touchend", this._onTouchEnd);
	}

	_handleTrackClick(e) {
		// Only handle clicks on the free and paid zones
		if (
			e.target === this.elements.trackLocked ||
			e.target === this.elements.knob
		)
			return;

		const clientX = e.touches ? e.touches[0].clientX : e.clientX;
		this._updateValueFromPosition(clientX);
	}

	_updateValueFromPosition(clientX) {
		const track = this.elements.track;
		const rect = track.getBoundingClientRect();
		const posX = clientX - rect.left;
		const percentage = Math.max(0, Math.min(1, posX / rect.width));

		// Convert to value
		let newValue = this.min + percentage * (this.total - this.min);

		// Limit to max (can't go into locked zone)
		newValue = Math.min(newValue, this.max);
		newValue = Math.max(newValue, this.min);

		// Snap to step
		newValue = Math.round(newValue / this.step) * this.step;

		// Clamp again after snap
		newValue = Math.min(newValue, this.max);
		newValue = Math.max(newValue, this.min);

		if (newValue !== this.value) {
			this.value = newValue;
			this._update();
			this._triggerChange();
		}
	}

	_update() {
		const { bubble, bubbleValue, bubblePrice, knob, trackFill, hasZones } =
			this.elements;

		// Calculate position percentage
		const range = this.total - this.min;
		const positionPercent = ((this.value - this.min) / range) * 100;

		// Update knob position
		knob.style.left = `${positionPercent}%`;

		// Update fill width to follow the knob
		trackFill.style.width = `${positionPercent}%`;

		// Update bubble position
		bubble.style.left = `${positionPercent}%`;
		bubble.style.bottom = "calc(100% - 50px)";

		// Update bubble content
		bubbleValue.textContent = this.formatValue(this.value);
		bubblePrice.textContent = this.formatPrice(this._calculatePrice());

		// Update visual state based on zone
		const isInFreeZone = this.value <= this.freeLimit;

		// Update fill color based on zone
		if (hasZones && !isInFreeZone) {
			// Calculate the percentage where free zone ends
			const freeLimitPercent = ((this.freeLimit - this.min) / range) * 100;
			trackFill.classList.remove("track-fill--free");
			trackFill.classList.add("track-fill--paid");
			trackFill.style.setProperty(
				"--free-percent",
				`${(freeLimitPercent / positionPercent) * 100}%`,
			);
		} else {
			trackFill.classList.remove("track-fill--paid");
			trackFill.classList.add("track-fill--free");
		}

		if (isInFreeZone) {
			bubble.classList.remove("slider-bubble--paid");
			bubble.classList.add("slider-bubble--free");
			knob.classList.remove("slider-knob--paid");
			knob.classList.add("slider-knob--free");
		} else {
			bubble.classList.remove("slider-bubble--free");
			bubble.classList.add("slider-bubble--paid");
			knob.classList.remove("slider-knob--free");
			knob.classList.add("slider-knob--paid");
		}
	}

	_calculatePrice() {
		if (this.value <= this.freeLimit) {
			return 0;
		}
		return (this.value - this.freeLimit) * this.pricePerUnit;
	}

	_triggerChange() {
		const price = this._calculatePrice();
		this.onChange(this.value, price);
	}

	// Public methods
	setValue(value) {
		value = Math.min(value, this.max);
		value = Math.max(value, this.min);
		value = Math.round(value / this.step) * this.step;

		if (value !== this.value) {
			this.value = value;
			this._update();
		}
	}

	getValue() {
		return this.value;
	}

	destroy() {
		document.removeEventListener("mousemove", this._onMouseMove);
		document.removeEventListener("mouseup", this._onMouseUp);
		document.removeEventListener("touchmove", this._onTouchMove);
		document.removeEventListener("touchend", this._onTouchEnd);

		this.container.innerHTML = "";
		this.container.classList.remove("custom-slider");
	}
}

// Export for external use
window.CustomSlider = CustomSlider;

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

	// Initialize sliders
	initSliders();
}

// Store slider instances
let sliderMargin = null;
let sliderContracts = null;

function initSliders() {
	const marginContainer = document.getElementById("slider-margin");
	const contractsContainer = document.getElementById("slider-contracts");

	if (marginContainer && !sliderMargin) {
		sliderMargin = new CustomSlider({
			container: marginContainer,
			min: 100,
			max: 100000,
			total: 100000,
			step: 1000,
			freeLimit: 100000, // Sem limite - todo laranja
			value: 3400,
			pricePerUnit: 0.15,
			formatValue: (v) => v.toLocaleString("pt-BR"),
			formatPrice: (p) => `R$ ${Math.round(p).toLocaleString("pt-BR")}`,
			onChange: (value) => {
				rfqState.risk = String(value);
			},
		});
	}

	if (contractsContainer && !sliderContracts) {
		sliderContracts = new CustomSlider({
			container: contractsContainer,
			min: 1,
			max: 500,
			total: 1000,
			step: 1,
			freeLimit: 200,
			value: 350,
			pricePerUnit: 1.2,
			formatValue: (v) => v.toLocaleString("pt-BR"),
			formatPrice: (p) => `R$ ${Math.round(p).toLocaleString("pt-BR")}`,
			onChange: (value) => {
				rfqState.contracts = value;
			},
		});
	}
}

window.addEventListener("DOMContentLoaded", renderRFQ);
