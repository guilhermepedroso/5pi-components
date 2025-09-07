window.addEventListener("DOMContentLoaded", () => {
	const floatingCta = document.getElementById("floating-cta");
	if (!floatingCta) {
		return;
	}

	const show = () => {
		floatingCta.setAttribute("data-visible", "true");
		document.body.style.paddingBottom = "76px";
	};
	const hide = () => {
		document.body.style.paddingBottom = "0px";
		floatingCta.setAttribute("data-visible", "false");
	};

	let sectionEl = document.getElementById("day-trade-container");
	let unlocked = floatingCta.getAttribute("data-unlocked") === "true";

	let startMarker = document.getElementById("start-plan-selection-section");
	let endMarker = document.getElementById("end-plan-selection-section");

	const update = () => {
		// Hide CTA when plan-selection region is visible in the viewport
		// Use bounding rects for better cross-platform compatibility (e.g., Duda)
		const viewportTop = 0;
		const viewportBottom = window.innerHeight;

		if (startMarker && endMarker) {
			const startRect = startMarker.getBoundingClientRect();
			const endRect = endMarker.getBoundingClientRect();
			const regionTop = Math.min(startRect.top, endRect.top);
			const regionBottom = Math.max(startRect.bottom, endRect.bottom);
			const intersects =
				regionBottom > viewportTop && regionTop < viewportBottom;
			if (intersects) {
				hide();
				return;
			}
		}

		if (!sectionEl) return;

		const sectionMiddle = sectionEl.offsetTop + sectionEl.offsetHeight / 2;
		const currentY = window.scrollY;

		// Unlock once we pass the middle of the section (persist attribute)
		if (!unlocked && currentY >= sectionMiddle) {
			unlocked = true;
			floatingCta.setAttribute("data-unlocked", "true");
		}

		// Visibility rule for both directions: visible when past middle; hidden otherwise
		if (!unlocked) {
			hide();
			return;
		}
		if (currentY >= sectionMiddle) {
			show();
		} else {
			hide();
		}
	};

	window.addEventListener("scroll", update, { passive: true });
	window.addEventListener("resize", update);

	if (!sectionEl) {
		const mo = new MutationObserver(() => {
			const el = document.getElementById("day-trade-container");
			if (el) {
				sectionEl = el;
				mo.disconnect();
				update();
			}
		});
		mo.observe(document.body, { childList: true, subtree: true });
	} else {
		update();
	}

	// Observe for plan-selection markers if not present yet
	let markersMo;
	if (!startMarker || !endMarker) {
		markersMo = new MutationObserver(() => {
			const s = document.getElementById("start-plan-selection-section");
			const e = document.getElementById("end-plan-selection-section");
			let changed = false;
			if (s && !startMarker) {
				startMarker = s;
				changed = true;
			}
			if (e && !endMarker) {
				endMarker = e;
				changed = true;
			}
			if (startMarker && endMarker && markersMo) {
				markersMo.disconnect();
			}
			if (changed) update();
		});
		markersMo.observe(document.body, { childList: true, subtree: true });
	}

	const button = document.getElementById("floating-cta-button");
	button.addEventListener("click", () => {
		const offersContainer = document.getElementById("offers-container");
		if (!offersContainer) {
			return;
		}
		document.getElementById("offers-container")?.scrollIntoView({
			behavior: "smooth",
			block: "nearest", // or "center", "end", "nearest"
		});
	});
});
