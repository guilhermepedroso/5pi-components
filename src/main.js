// Swiper configurations
const swiperConfigs = {
	dayTrade: {
		selector: ".swiper-day-trade",
		config: {
			slidesPerView: 1,
			spaceBetween: 24,
			breakpoints: {
				640: { slidesPerView: 2 },
				1024: { slidesPerView: 4 },
			},
			grabCursor: true,
			navigation: {
				nextEl: ".swiper-day-trade-button-next",
				prevEl: ".swiper-day-trade-button-prev",
			},
		},
	},
	shortsCases: {
		selector: ".swiper-shorts-cases",
		config: {
			slidesPerView: "auto",
			grabCursor: true,
			spaceBetween: 24,
			navigation: {
				nextEl: ".swiper-shorts-cases-button-next",
				prevEl: ".swiper-shorts-cases-button-prev",
			},
		},
	},
	advisors: {
		selector: ".swiper-advisors",
		config: {
			slidesPerView: 4,
			spaceBetween: 24,
			autoplay: {
				delay: 2000,
				disableOnInteraction: false,
			},
			grabCursor: true,
		},
	},
};

// Initialize Swipers
Object.values(swiperConfigs).forEach(({ selector, config }) => {
	new Swiper(selector, config);
});

// Plan Selection and Summary Functionality
class PlanSelector {
	constructor() {
		this.selectedValues = {
			operation: null,
			expiration: null,
			platform: null,
			contracts: null,
			approval: null,
			profitShare: null,
		};

		this.buttonMappings = {
			operation: "summary-operation",
			expiration: "summary-expiration",
			platform: "summary-platform",
			contracts: "summary-contracts",
			approval: "summary-approval",
			"profit-share": "summary-profit-share",
		};

		this.init();
	}

	init() {
		const selectPlanButtons = document.querySelectorAll(".button--select-plan");
		selectPlanButtons.forEach((button) => {
			button.addEventListener("click", this.handleButtonClick.bind(this));
		});
	}

	handleButtonClick(event) {
		const button = event.currentTarget;
		const buttonId = button.id;
		const buttonText = button.textContent.trim();

		this.updateButtonStates(button);
		this.updateSelection(buttonId, buttonText);
	}

	updateButtonStates(clickedButton) {
		const parentUl = clickedButton.closest("ul");
		parentUl.querySelectorAll(".button--select-plan").forEach((btn) => {
			btn.classList.remove("active");
		});
		clickedButton.classList.add("active");
	}

	updateSelection(buttonId, buttonText) {
		for (const [key, summaryId] of Object.entries(this.buttonMappings)) {
			if (buttonId.startsWith(`${key}-`)) {
				this.selectedValues[key.replace("-", "")] = buttonText;
				this.updateSummary(summaryId, buttonText);
				break;
			}
		}
	}

	updateSummary(elementId, value) {
		const summaryElement = document.getElementById(elementId);
		if (summaryElement) {
			summaryElement.textContent = value;
		}
	}
}

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
	new PlanSelector();
});
