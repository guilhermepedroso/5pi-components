window.addEventListener("DOMContentLoaded", () => {
	const faqContainer = document.querySelector(".faq-container");
	if (!faqContainer) return;

	const faqItems = faqContainer.querySelectorAll(".faq-item");

	const closeAllItems = () => {
		for (const item of faqItems) {
			item.classList.remove("active");
		}
	};

	for (const item of faqItems) {
		const header = item.querySelector(".faq-header");
		if (!header) continue;

		header.addEventListener("click", () => {
			const isCurrentlyActive = item.classList.contains("active");
			closeAllItems();
			if (!isCurrentlyActive) {
				item.classList.add("active");
			}
		});
	}
});
