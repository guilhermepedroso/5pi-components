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
		// If external control requests header to be disabled (e.g., offers-header-small visible),
		// force hide and skip scroll-driven logic
		if (window.__flexHeaderDisabled) {
			hide();
			lastScrollY = window.scrollY;
			applyBodyPadding();
			return;
		}
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

// BUTTON HEADER
window.addEventListener("DOMContentLoaded", () => {
	// If URL has ?scrollTo=some-id, smooth scroll to it and then remove the param
	const params = new URLSearchParams(window.location.search);
	const scrollTargetId = params.get("scrollTo");
	if (scrollTargetId) {
		const targetEl = document.getElementById(scrollTargetId);
		if (targetEl) {
			targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
			const cleanedUrl = new URL(window.location.href);
			cleanedUrl.searchParams.delete("scrollTo");
			history.replaceState(null, "", cleanedUrl.toString());
		}
	}

	const headerButton = document.querySelector(".cta-header-button a");
	if (headerButton) {
		headerButton.addEventListener("click", (event) => {
			const targetId = "start-plan-selection-section";
			const targetOnThisPage = document.getElementById(targetId);
			if (targetOnThisPage) {
				event.preventDefault();
				targetOnThisPage.scrollIntoView({ behavior: "smooth", block: "start" });
				return;
			}

			// Not on the homepage (target not present): redirect to home with scroll param
			event.preventDefault();
			const baseHref = headerButton.getAttribute("href") || "/";
			const destination = new URL(baseHref, window.location.href);
			destination.searchParams.set("scrollTo", targetId);
			window.location.href = destination.toString();
		});
	}
});

// PARCEIROS PERSISTENCE
window.addEventListener("DOMContentLoaded", () => {
	const PARTNER_STORAGE_KEY = "partnerUrl";

	// Detecta se estamos em uma página de parceiro e salva no sessionStorage
	const savePartnerFromCurrentUrl = () => {
		const path = window.location.pathname;
		const partnerMatch = path.match(/^\/parceiros\/([^/]+)/);
		if (partnerMatch) {
			const partnerPath = `/parceiros/${partnerMatch[1]}`;
			sessionStorage.setItem(PARTNER_STORAGE_KEY, partnerPath);
			return partnerPath;
		}
		return null;
	};

	// Obtém o parceiro salvo do sessionStorage
	const getSavedPartner = () => {
		return sessionStorage.getItem(PARTNER_STORAGE_KEY);
	};

	// Salva o parceiro da URL atual, se houver
	savePartnerFromCurrentUrl();

	// Se estiver na home, remove o parceiro salvo para navegação normal
	if (window.location.pathname === "/") {
		sessionStorage.removeItem(PARTNER_STORAGE_KEY);
	}

	const savedPartner = getSavedPartner();

	// Se houver parceiro salvo, atualiza os hrefs dos links
	if (savedPartner) {
		// Logo header link - altera o href para o parceiro
		const logoLink = document.querySelector(".logo-header-link");
		if (logoLink) {
			logoLink.setAttribute("href", savedPartner);
		}

		// Primeiro link do navigation-header (UL com role="menubar")
		const menubar = document.querySelector('[role="menubar"]');
		if (menubar) {
			const firstMenuItem = menubar.querySelector("li:first-child a");
			if (firstMenuItem) {
				firstMenuItem.setAttribute("href", savedPartner);
			}
		}

		// Primeiro link do navigation-footer (NAV > UL > LI:first-child > A)
		const footerNav = document.querySelector(".navigation-footer nav ul");
		if (footerNav) {
			const firstFooterLink = footerNav.querySelector("li:first-child a");
			if (firstFooterLink) {
				firstFooterLink.setAttribute("href", savedPartner);
			}
		}
	}
});
