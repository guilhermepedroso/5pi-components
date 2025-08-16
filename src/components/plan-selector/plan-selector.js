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
