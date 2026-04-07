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
	const IGNORED_UTM_SOURCES = new Set(["google", "facebook", "instagram"]);

	const isIgnoredAdUtmSource = (raw) => {
		if (raw == null || raw === "") return false;
		return IGNORED_UTM_SOURCES.has(raw.trim().toLowerCase());
	};

	// Detecta se estamos em uma página de parceiro ou com utm_source e salva no sessionStorage
	const savePartnerFromCurrentUrl = () => {
		const path = window.location.pathname;
		const partnerMatch = path.match(/^\/parceiros\/([^/]+)/);
		if (partnerMatch) {
			const partnerPath = `/parceiros/${partnerMatch[1]}`;
			sessionStorage.setItem(PARTNER_STORAGE_KEY, partnerPath);
			return partnerPath;
		}
		const utmSource = new URLSearchParams(window.location.search).get(
			"utm_source",
		);
		if (utmSource && !isIgnoredAdUtmSource(utmSource)) {
			const slug = utmSource.replace(/_5pi?$/, "").replace(/_/g, "-");
			const partnerPath = `/parceiros/${slug}`;
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

	// Na home: sem utm_source ou com utm de anúncio (google/facebook/instagram), remove parceiro salvo
	const homeSearch = new URLSearchParams(window.location.search);
	const homeUtmSource = homeSearch.get("utm_source");
	if (
		window.location.pathname === "/" &&
		(!homeUtmSource || isIgnoredAdUtmSource(homeUtmSource))
	) {
		sessionStorage.removeItem(PARTNER_STORAGE_KEY);
	}

	// Ao clicar, se houver parceiro salvo (de /parceiros/NAME ou utm_source), navega para ele
	const attachPartnerClickHandler = (linkEl) => {
		if (!linkEl) return;
		linkEl.addEventListener("click", (event) => {
			const partner = getSavedPartner();
			if (partner) {
				event.preventDefault();
				window.location.href = partner;
			}
		});
	};

	attachPartnerClickHandler(document.querySelector(".logo-header-link"));

	const menubar = document.querySelector('[role="menubar"]');
	if (menubar) {
		attachPartnerClickHandler(menubar.querySelector("li:first-child a"));
	}

	const footerNav = document.querySelector(".navigation-footer nav ul");
	if (footerNav) {
		attachPartnerClickHandler(footerNav.querySelector("li:first-child a"));
	}
});
