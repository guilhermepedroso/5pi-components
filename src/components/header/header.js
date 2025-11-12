window.addEventListener("DOMContentLoaded", () => {
	const headerEl = document.getElementById("flex-header");

	if (!headerEl) {
		return;
	}

	headerEl.removeAttribute("data-sticky");

	// Ensure header is fixed and starts at the top
	headerEl.style.position = "fixed";
	headerEl.style.top = "0px";
	headerEl.style.left = "0";
	headerEl.style.right = "0";
	headerEl.style.zIndex = "40";

	headerEl.style.transition = headerEl.style.transition || "top 300ms ease";
	headerEl.style.willChange = "top";

	let lastScrollY = window.scrollY;
	let isVisible = true;
	const offersContainerSection = document.getElementById("offers-container");
	let isOffersContainerSectionInView = false;

	const applyBodyPadding = () => {
		// Apply padding equal to header height to prevent content from being cut off
		// since header is always fixed
		document.body.style.paddingTop = `${getHeaderHeight()}px`;
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
	};

	const hide = () => {
		if (!isVisible) return;
		isVisible = false;
		headerEl.setAttribute("data-visible", "false");
		headerEl.style.top = `-${getHeaderHeight() + 8}px`;
	};

	// Set up Intersection Observer to track when day-trade section is in view
	if (offersContainerSection && "IntersectionObserver" in window) {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					isOffersContainerSectionInView = entry.isIntersecting;
					update(); // Trigger update when visibility changes
				});
			},
			{ threshold: 0.1 }, // Trigger when at least 10% is visible
		);
		observer.observe(offersContainerSection);
	}

	const update = () => {
		// Desktop: always keep header visible and fixed at the top
		const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
		if (isDesktop) {
			show();
			lastScrollY = window.scrollY;
			applyBodyPadding();
			return;
		}

		// Hide header when day-trade section is in view
		if (isOffersContainerSectionInView) {
			hide();
			lastScrollY = window.scrollY;
			applyBodyPadding();
			return;
		}

		// Otherwise use scroll direction to show/hide
		const currentY = window.scrollY;
		const scrollingDown = currentY > lastScrollY + 2;
		const scrollingUp = currentY < lastScrollY - 2;

		if (scrollingDown) {
			hide();
		} else if (scrollingUp) {
			show();
		}
		lastScrollY = currentY;

		applyBodyPadding();
	};

	window.addEventListener("scroll", update, { passive: true });
	window.addEventListener("resize", update);

	// // Track header size changes (fonts/breakpoints/content) and re-apply padding
	if ("ResizeObserver" in window) {
		const ro = new ResizeObserver(() => applyBodyPadding());
		ro.observe(headerEl);
	}

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
