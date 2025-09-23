window.addEventListener("DOMContentLoaded", () => {
	const headerEl = document.getElementById("flex-header");
	if (!headerEl) return;

	// Ensure animated movement using the top property (similar feel to floating-cta)
	headerEl.style.transition = headerEl.style.transition || "top 300ms ease";
	headerEl.style.willChange = "top";
	if (!headerEl.style.top) headerEl.style.top = "0px";

	let lastScrollY = window.scrollY;
	let isVisible = true;
	const thresholdY = 500; // header always visible until this scroll offset

	const applyBodyPadding = () => {
		// Keep padding equal to header height at all times to avoid layout shift
		document.body.style.setProperty(
			"padding-top",
			`${getHeaderHeight()}px`,
			"important",
		);
	};

	const getHeaderHeight = () => {
		const h = headerEl.offsetHeight;
		return h && h > 0 ? h : 110; // sensible fallback if header is empty at boot
	};

	const show = () => {
		if (isVisible) return;
		isVisible = true;
		headerEl.setAttribute("data-visible", "true");
		headerEl.style.top = "0px";
		applyBodyPadding();
	};

	const hide = () => {
		if (!isVisible) return;
		isVisible = false;
		headerEl.setAttribute("data-visible", "false");
		headerEl.style.top = `-${getHeaderHeight() + 8}px`;
		applyBodyPadding();
	};

	// Previously we checked the day-trade section; now we gate behavior by a fixed threshold

	const update = () => {
		// Desktop: always keep header visible and fixed at the top
		const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
		if (isDesktop) {
			show();
			lastScrollY = window.scrollY;
			applyBodyPadding();
			return;
		}

		// Always visible while near the top before threshold
		if (window.scrollY <= thresholdY) {
			show();
			lastScrollY = window.scrollY;
			return;
		}

		const currentY = window.scrollY;
		const scrollingDown = currentY > lastScrollY + 2;
		const scrollingUp = currentY < lastScrollY - 2;

		if (scrollingDown) {
			hide();
		} else if (scrollingUp) {
			show();
		}

		lastScrollY = currentY;
		// Keep body padding in sync if header height changes across breakpoints
		applyBodyPadding();
	};

	window.addEventListener("scroll", update, { passive: true });
	window.addEventListener("resize", update);

	// Track header size changes (fonts/breakpoints/content) and re-apply padding
	if ("ResizeObserver" in window) {
		const ro = new ResizeObserver(() => applyBodyPadding());
		ro.observe(headerEl);
	}

	// Initial sync
	applyBodyPadding();
	update();
});
