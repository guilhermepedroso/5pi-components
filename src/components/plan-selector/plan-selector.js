/* ===== CONFIG OVERRIDES ===== */
/**
 * Sistema de overrides por parceiro.
 * Chave: path da URL (ex: "parceiros/projeto-monteiro")
 *
 * Seletores disponíveis ("*" = todos):
 *
 * PLANS:
 *   - "plus"     → Planos Plus (Book 90, 140, 200)
 *   - "starter"  → Planos Starter (Book 15, 30, 40)
 *   - "private"  → Planos Private (Book 250, 500)
 *
 * CARDS:
 *   Plus:    "book-90", "book-140", "book-200"
 *   Starter: "book-15", "book-30", "book-40"
 *   Private: "book-250", "book-500"
 *
 * VARIANTS:
 *   - "D10-SP"  → 10 dias operados, Sem Prazo
 *   - "D10-P60" → 10 dias operados, Prazo 60 dias
 *   - "D5-SP"   → 5 dias operados, Sem Prazo
 *   - "D5-P60"  → 5 dias operados, Prazo 60 dias
 *
 * PATCH - campos alteráveis:
 *   values: { margemReal, margemDePerda, repasse, cashback, ... }
 *   pricing: { oldPrice, price, couponCode }
 *   url: string
 *
 * EXEMPLOS:
 *
 * // Alterar repasse de TODOS os planos/cards/variants:
 * { plan: "*", card: "*", variant: "*", patch: { values: { repasse: "80%" } } }
 *
 * // Alterar cupom de um card específico em todas as variants:
 * { plan: "plus", card: "book-90", variant: "*", patch: { pricing: { couponCode: "CUPOM10" } } }
 *
 *  Alterar preço e URL de uma variant específica:
 * {
 * 	plan: "*",
 * 	card: "*",
 * 	variant: "*",
 * 	patch: {
 * 		pricing: { price: "R$ 2.500" },
 * 		url: "https://checkout.5pi.com.br/custom"
 * 	}
 * }}
 */

const configOverrides = {
	"parceiros/somos": [
		{
			plan: "plus",
			card: "book-10k",
			variant: "*",
			patch: { name: "Educacional + Book 10k" },
		},
		{
			plan: "plus",
			card: "book-15k",
			variant: "*",
			patch: { name: "Educacional + Book 15k" },
		},
		{
			plan: "plus",
			card: "book-18k",
			variant: "*",
			patch: { name: "Educacional + Book 18k" },
		},
		{
			plan: "starter",
			card: "book-2k",
			variant: "*",
			patch: { name: "Educacional + Book 2k" },
		},
		{
			plan: "starter",
			card: "book-4k",
			variant: "*",
			patch: { name: "Educacional + Book 4k" },
		},
		{
			plan: "starter",
			card: "book-6k",
			variant: "*",
			patch: { name: "Educacional + Book 6k" },
		},
		{
			plan: "private",
			card: "book-25k",
			variant: "*",
			patch: { name: "Educacional + Book 25k" },
		},
		{
			plan: "private",
			card: "book-30k",
			variant: "*",
			patch: { name: "Educacional + Book 30k" },
		},
		{
			plan: "private",
			card: "book-50k",
			variant: "*",
			patch: { name: "Educacional + Book 50k" },
		},
	],
};

/* ===== ******************** ===== */

function parseBRAmount(x) {
	if (x == null) return NaN;
	let s = String(x)
		.replace(/\u00A0/g, " ") // nbsp
		.replace(/[^\d.,-]/g, "") // mantém só dígitos . , -
		.trim();
	if (!s) return NaN;
	const hasComma = s.includes(",");
	const hasDot = s.includes(".");
	if (hasComma && hasDot) {
		// pt-BR clássico: . milhar, , decimal
		s = s.replace(/\./g, "").replace(",", ".");
		return Number(s);
	}
	if (hasComma) {
		// vírgula = decimal
		return Number(s.replace(",", "."));
	}
	if (hasDot) {
		// apenas ponto: em pt-BR é milhar -> remove pontos
		return Number(s.replace(/\./g, ""));
	}
	return Number(s);
}
function discountPercent(oldP, newP) {
	const o = parseBRAmount(oldP);
	const n = parseBRAmount(newP);
	if (!Number.isFinite(o) || !Number.isFinite(n) || o <= n)
		return Math.max(0, Math.round((1 - n / o) * 100)) || 0;
	return Math.round((1 - n / o) * 100);
}
window.discountPercent = discountPercent;
function formatBRInt(value) {
	const s = String(value ?? "")
		.replace(/\s*R\$\s*/g, "")
		.replace(/\./g, "")
		.replace(",", ".");
	const n = Number(s);
	if (!Number.isFinite(n)) return "";
	return new Intl.NumberFormat("pt-BR", {
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	}).format(n);
}
const stripCurrency = (v) =>
	typeof v === "string"
		? v
				.replace(/\s*R\$\s*/g, "")
				.replace(/\./g, "")
				.replace(",", ".")
		: v;
function formatBRMoney(value) {
	const raw = String(value ?? "").trim();
	if (!raw) return "";
	const numeric = stripCurrency(raw);
	const n = Number(numeric);
	if (!isFinite(n)) return "";
	return new Intl.NumberFormat("pt-BR", {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}).format(n);
}
/* ===== UTM Helpers ===== */
function getPartnerUtmSource() {
	const path = window.location.pathname;
	const parceirosMatch = path.match(/^\/parceiros\/([^/]+)/);
	if (!parceirosMatch) return null;
	const partnerName = parceirosMatch[1];
	// Transforma hífens em underscores e adiciona _5p no final
	return `${partnerName.replace(/-/g, "_")}_5p`;
}
function addUtmToUrl(url, utmSource) {
	if (!url || !utmSource) return url;
	if (url === "#") return url;
	try {
		const urlObj = new URL(url, window.location.origin);
		urlObj.searchParams.set("utm_source", utmSource);
		return urlObj.toString();
	} catch {
		return url;
	}
}
/* Normalização de cupom (mantido) */
function normalizeCoupon(v) {
	if (v == null) return null;
	const s = String(v)
		.replace(/\u00A0/g, " ")
		.replace(/[\r\n\t]+/g, " ")
		.replace(/\s+/g, " ")
		.trim();
	return s ? s.toUpperCase() : null;
}
function hasRealCoupon(v) {
	if (v == null) return false;
	const s = String(v)
		.replace(/\u00A0/g, " ")
		.replace(/[\r\n\t]+/g, " ")
		.replace(/\s+/g, " ")
		.trim();
	return s.length > 0;
}
/* Copiar texto para a área de transferência (com fallback) */
function copyToClipboard(text) {
	if (!text) return Promise.reject(new Error("empty"));
	try {
		if (navigator.clipboard && window.isSecureContext) {
			return navigator.clipboard.writeText(text);
		}
	} catch {}
	return new Promise((resolve, reject) => {
		const textarea = document.createElement("textarea");
		textarea.value = text;
		textarea.setAttribute("readonly", "");
		textarea.style.position = "fixed";
		textarea.style.opacity = "0";
		textarea.style.top = "-9999px";
		textarea.style.left = "-9999px";
		document.body.appendChild(textarea);
		textarea.focus();
		textarea.select();
		let ok = false;
		try {
			ok = document.execCommand("copy");
		} catch {}
		document.body.removeChild(textarea);
		ok ? resolve() : reject(new Error("copy_failed"));
	});
}

/* ===== DADOS ===== */
const plansData = {
	plus: {
		key: "plus",
		title: { text: "Planos Plus", sup: "Mais vendidos" },
		cards: [
			{
				key: "book-10k",
				name: "Book 10k",
				labels: {
					margemReal: "Margem na real de até:",
					margemDePerda: "Perda Máxima:",
					contratos: "Quantidade de contratos:",
					meta: "Meta:",
					repasse: "Repasse:",
					cashback: "Cashback:",
					profitOne: "Profit One grátis no 1º mês:",
					plataforma: "Plataforma gratuita na real:",
					educacional: "Educacional com especialistas:",
					salaAoVivo: "Sala ao vivo com mentores:",
					gerenciamento: "Gerenciamento de Risco:",
					assessoria: "Assessoria especializada:",
				},
				variants: [
					{
						key: "D10-SP",
						baseDays: 10,
						minDaysApproval: 0,
						values: {
							margemReal: "10.000",
							margemDePerda: "10.000",
							contratos: "75",
							repasse: "90%",
							cashback: "R$ 250",
							proftOneGratis: "Sim",
							plataformaGratuitaReal: "Sim",
							educacionalEspecialistas: "50",
							salasAoVivoComMentores: "Diária",
							gerenciamentoDeRisco: "Sim",
							acessoriaEspecializada: "Sim",
						},
						pricing: {
							oldPrice: "R$ 3.500",
							price: "R$ 2.439",
							couponCode: "BOOK10KSP",
						},
						url: "https://checkout.5pi.com.br/pay/book-10k-sem-prazo",
					},
					{
						key: "D10-P60",
						baseDays: 10,
						minDaysApproval: 60,
						values: {
							margemReal: "10.000",
							margemDePerda: "10.000",
							contratos: "75",
							repasse: "90%",
							cashback: "R$ 250",
							proftOneGratis: "Sim",
							plataformaGratuitaReal: "Sim",
							educacionalEspecialistas: "50",
							salasAoVivoComMentores: "Diária",
							gerenciamentoDeRisco: "Sim",
							acessoriaEspecializada: "Sim",
						},
						pricing: {
							oldPrice: "R$ 3.500",
							price: "R$ 1.999",
							couponCode: "BOOK10K",
						},
						url: "https://checkout.5pi.com.br/pay/book-10k-prazo-60-dias",
					},
				],
			},
			{
				key: "book-15k",
				name: "Book 15k",
				labels: {
					margemReal: "Margem na real de até:",
					margemDePerda: "Perda Máxima:",
					contratos: "Quantidade de contratos:",
					meta: "Meta:",
					repasse: "Repasse:",
					cashback: "Cashback:",
					profitOne: "Profit One grátis no 1º mês:",
					plataforma: "Plataforma gratuita na real:",
					educacional: "Educacional com especialistas:",
					salaAoVivo: "Sala ao vivo com mentores:",
					gerenciamento: "Gerenciamento de Risco:",
					assessoria: "Assessoria especializada:",
				},
				variants: [
					{
						key: "D10-SP",
						baseDays: 10,
						minDaysApproval: 0,
						values: {
							margemReal: "15.000",
							margemDePerda: "15.000",
							contratos: "115",
							repasse: "90%",
							cashback: "R$ 250",
							proftOneGratis: "Sim",
							plataformaGratuitaReal: "Sim",
							educacionalEspecialistas: "50",
							salasAoVivoComMentores: "Diária",
							gerenciamentoDeRisco: "Sim",
							acessoriaEspecializada: "Sim",
						},
						pricing: {
							oldPrice: "R$ 4.750",
							price: "R$ 3.659",
							couponCode: "BOOK15KSP",
						},
						url: "https://checkout.5pi.com.br/pay/book-15k-sem-prazo",
					},
					{
						key: "D10-P60",
						baseDays: 10,
						minDaysApproval: 60,
						values: {
							margemReal: "15.000",
							margemDePerda: "15.000",
							contratos: "115",
							repasse: "90%",
							cashback: "R$ 250",
							proftOneGratis: "Sim",
							plataformaGratuitaReal: "Sim",
							educacionalEspecialistas: "50",
							salasAoVivoComMentores: "Diária",
							gerenciamentoDeRisco: "Sim",
							acessoriaEspecializada: "Sim",
						},
						pricing: {
							oldPrice: "R$ 4.750",
							price: "R$ 2.999",
							couponCode: "BOOK15K",
						},
						url: "https://checkout.5pi.com.br/pay/book-15k-60-dias",
					},
				],
			},
			{
				key: "book-18k",
				name: "Book 18k",
				labels: {
					margemReal: "Margem na real de até:",
					margemDePerda: "Perda Máxima:",
					contratos: "Quantidade de contratos:",
					meta: "Meta:",
					repasse: "Repasse:",
					cashback: "Cashback:",
					profitOne: "Profit One grátis no 1º mês:",
					plataforma: "Plataforma gratuita na real:",
					educacional: "Educacional com especialistas:",
					salaAoVivo: "Sala ao vivo com mentores:",
					gerenciamento: "Gerenciamento de Risco:",
					assessoria: "Assessoria especializada:",
				},
				variants: [
					{
						key: "D10-SP",
						baseDays: 10,
						minDaysApproval: 0,
						values: {
							margemReal: "18.000",
							margemDePerda: "18.000",
							contratos: "135",
							repasse: "90%",
							cashback: "R$ 250",
							proftOneGratis: "Sim",
							plataformaGratuitaReal: "Sim",
							educacionalEspecialistas: "50",
							salasAoVivoComMentores: "Diária",
							gerenciamentoDeRisco: "Sim",
							acessoriaEspecializada: "Sim",
						},
						pricing: {
							oldPrice: "R$ 5.430",
							price: "R$ 4.399",
							couponCode: "BOOK18KSP",
						},
						url: "https://checkout.5pi.com.br/pay/book-18k-sem-prazo",
					},
					{
						key: "D10-P60",
						baseDays: 10,
						minDaysApproval: 60,
						values: {
							margemReal: "18.000",
							margemDePerda: "18.000",
							contratos: "135",
							repasse: "90%",
							cashback: "R$ 250",
							proftOneGratis: "Sim",
							plataformaGratuitaReal: "Sim",
							educacionalEspecialistas: "50",
							salasAoVivoComMentores: "Diária",
							gerenciamentoDeRisco: "Sim",
							acessoriaEspecializada: "Sim",
						},
						pricing: {
							oldPrice: "R$ 5.430",
							price: "R$ 3.599",
							couponCode: "BOOK18K",
						},
						url: "https://checkout.5pi.com.br/pay/book-18k-prazo-60-dias",
					},
				],
			},
		],
	},
	starter: {
		key: "starter",
		title: { text: "Planos Starter", sup: "Mais acessíveis" },
		cards: [
			{
				key: "book-2k",
				name: "Book 2k",
				labels: {
					margemReal: "Margem na real de até:",
					margemDePerda: "Perda Máxima:",
					contratos: "Quantidade de contratos:",
					meta: "Meta:",
					repasse: "Repasse:",
					cashback: "Cashback:",
					profitOne: "Profit One grátis no 1º mês:",
					plataforma: "Plataforma gratuita na real:",
					educacional: "Educacional com especialistas:",
					salaAoVivo: "Sala ao vivo com mentores:",
					gerenciamento: "Gerenciamento de Risco:",
					assessoria: "Assessoria especializada:",
				},
				variants: [
					{
						key: "D10-SP",
						baseDays: 10,
						minDaysApproval: 0,
						values: {
							margemReal: "2.000",
							margemDePerda: "2.000",
							contratos: "15",
							repasse: "90%",
							cashback: "R$ 250",
							proftOneGratis: "Sim",
							plataformaGratuitaReal: "Sim",
							educacionalEspecialistas: "50",
							salasAoVivoComMentores: "Diária",
							gerenciamentoDeRisco: "Sim",
							acessoriaEspecializada: "Sim",
						},
						pricing: {
							oldPrice: "R$ 650",
							price: "R$ 489",
							couponCode: "BOOK2KSP",
						},
						url: "https://checkout.5pi.com.br/pay/book-2k-sem-prazo",
					},
					{
						key: "D10-P60",
						baseDays: 10,
						minDaysApproval: 60,
						values: {
							margemReal: "2.000",
							margemDePerda: "2.000",
							contratos: "15",
							repasse: "90%",
							cashback: "R$ 250",
							proftOneGratis: "Sim",
							plataformaGratuitaReal: "Sim",
							educacionalEspecialistas: "50",
							salasAoVivoComMentores: "Diária",
							gerenciamentoDeRisco: "Sim",
							acessoriaEspecializada: "Sim",
						},
						pricing: {
							oldPrice: "R$ 650",
							price: "R$ 399",
							couponCode: "BOOK2K",
						},
						url: "https://checkout.5pi.com.br/pay/book-2k-prazo-60-dias",
					},
				],
			},
			{
				key: "book-4k",
				name: "Book 4k",
				labels: {
					margemReal: "Margem na real de até:",
					margemDePerda: "Perda Máxima:",
					contratos: "Quantidade de contratos:",
					meta: "Meta:",
					repasse: "Repasse:",
					cashback: "Cashback:",
					profitOne: "Profit One grátis no 1º mês:",
					plataforma: "Plataforma gratuita na real:",
					educacional: "Educacional com especialistas:",
					salaAoVivo: "Sala ao vivo com mentores:",
					gerenciamento: "Gerenciamento de Risco:",
					assessoria: "Assessoria especializada:",
				},
				variants: [
					{
						key: "D10-SP",
						baseDays: 10,
						minDaysApproval: 0,
						values: {
							margemReal: "4.000",
							margemDePerda: "4.000",
							contratos: "30",
							repasse: "90%",
							cashback: "R$ 250",
							proftOneGratis: "Sim",
							plataformaGratuitaReal: "Sim",
							educacionalEspecialistas: "50",
							salasAoVivoComMentores: "Diária",
							gerenciamentoDeRisco: "Sim",
							acessoriaEspecializada: "Sim",
						},
						pricing: {
							oldPrice: "R$ 1.140",
							price: "R$ 979",
							couponCode: "BOOK4KSP",
						},
						url: "https://checkout.5pi.com.br/pay/book-4k-sem-prazo",
					},
					{
						key: "D10-P60",
						baseDays: 10,
						minDaysApproval: 60,
						values: {
							margemReal: "4.000",
							margemDePerda: "4.000",
							contratos: "30",
							repasse: "90%",
							cashback: "R$ 250",
							proftOneGratis: "Sim",
							plataformaGratuitaReal: "Sim",
							educacionalEspecialistas: "50",
							salasAoVivoComMentores: "Diária",
							gerenciamentoDeRisco: "Sim",
							acessoriaEspecializada: "Sim",
						},
						pricing: {
							oldPrice: "R$ 1.140",
							price: "R$ 799",
							couponCode: "BOOK4K",
						},
						url: "https://checkout.5pi.com.br/pay/book-4k-prazo-60-dias",
					},
				],
			},
			{
				key: "book-6k",
				name: "Book 6k",
				labels: {
					margemReal: "Margem na real de até:",
					margemDePerda: "Perda Máxima:",
					contratos: "Quantidade de contratos:",
					meta: "Meta:",
					repasse: "Repasse:",
					cashback: "Cashback:",
					profitOne: "Profit One grátis no 1º mês:",
					plataforma: "Plataforma gratuita na real:",
					educacional: "Educacional com especialistas:",
					salaAoVivo: "Sala ao vivo com mentores:",
					gerenciamento: "Gerenciamento de Risco:",
					assessoria: "Assessoria especializada:",
				},
				variants: [
					{
						key: "D10-SP",
						baseDays: 10,
						minDaysApproval: 0,
						values: {
							margemReal: "6.000",
							margemDePerda: "6.000",
							contratos: "45",
							repasse: "90%",
							cashback: "R$ 250",
							proftOneGratis: "Sim",
							plataformaGratuitaReal: "Sim",
							educacionalEspecialistas: "50",
							salasAoVivoComMentores: "Diária",
							gerenciamentoDeRisco: "Sim",
							acessoriaEspecializada: "Sim",
						},
						pricing: {
							oldPrice: "R$ 2.150",
							price: "R$ 1.469",
							couponCode: "BOOK6KSP",
						},
						url: "https://checkout.5pi.com.br/pay/book-6k-sem-prazo",
					},
					{
						key: "D10-P60",
						baseDays: 10,
						minDaysApproval: 60,
						values: {
							margemReal: "6.000",
							margemDePerda: "6.000",
							contratos: "45",
							repasse: "90%",
							cashback: "R$ 250",
							proftOneGratis: "Sim",
							plataformaGratuitaReal: "Sim",
							educacionalEspecialistas: "50",
							salasAoVivoComMentores: "Diária",
							gerenciamentoDeRisco: "Sim",
							acessoriaEspecializada: "Sim",
						},
						pricing: {
							oldPrice: "R$ 2.150",
							price: "R$ 1.199",
							couponCode: "BOOK6K",
						},
						url: "https://checkout.5pi.com.br/pay/book-6k-prazo-60-dias",
					},
				],
			},
		],
	},
	private: {
		key: "private",
		title: { text: "Planos Private", sup: "Maiores lucros" },
		cards: [
			{
				key: "book-25k",
				name: "Book 25k",
				labels: {
					margemReal: "Margem na real de até:",
					margemDePerda: "Perda Máxima:",
					contratos: "Quantidade de contratos:",
					meta: "Meta:",
					repasse: "Repasse:",
					cashback: "Cashback:",
					profitOne: "Profit One grátis no 1º mês:",
					plataforma: "Plataforma gratuita na real:",
					educacional: "Educacional com especialistas:",
					salaAoVivo: "Sala ao vivo com mentores:",
					gerenciamento: "Gerenciamento de Risco:",
					assessoria: "Assessoria especializada:",
				},
				variants: [
					/* Com Stop Diário */
					{
						key: "D10-SP-CS",
						baseDays: 10,
						minDaysApproval: 0,
						values: {
							margemReal: "25.000",
							margemDePerda: "25.000",
							contratos: "190",
							repasse: "90%",
							cashback: "R$ 250",
							proftOneGratis: "Sim",
							plataformaGratuitaReal: "Sim",
							educacionalEspecialistas: "50",
							salasAoVivoComMentores: "Diária",
							gerenciamentoDeRisco: "Sim",
							acessoriaEspecializada: "Sim",
						},
						pricing: {
							oldPrice: "R$ 7.575",
							price: "R$ 6.099",
							couponCode: "BOOK25KSP",
						},
						url: "https://checkout.5pi.com.br/pay/book-25k-sem-prazo-com-stop-diario",
					},
					{
						key: "D10-P60-CS",
						baseDays: 10,
						minDaysApproval: 60,
						values: {
							margemReal: "25.000",
							margemDePerda: "25.000",
							contratos: "190",
							repasse: "90%",
							cashback: "R$ 250",
							proftOneGratis: "Sim",
							plataformaGratuitaReal: "Sim",
							educacionalEspecialistas: "50",
							salasAoVivoComMentores: "Diária",
							gerenciamentoDeRisco: "Sim",
							acessoriaEspecializada: "Sim",
						},
						pricing: {
							oldPrice: "R$ 7.575",
							price: "R$ 4.999",
							couponCode: "BOOK25K",
						},
						url: "https://checkout.5pi.com.br/pay/book-25k-prazo-60-dias-com-stop-diario",
					},
					/* Sem Stop Diário */
					{
						key: "D10-SP-SS",
						baseDays: 10,
						minDaysApproval: 0,
						values: {
							margemReal: "25.000",
							margemDePerda: "25.000",
							contratos: "190",
							repasse: "90%",
							cashback: "R$ 250",
							proftOneGratis: "Sim",
							plataformaGratuitaReal: "Sim",
							educacionalEspecialistas: "50",
							salasAoVivoComMentores: "Diária",
							gerenciamentoDeRisco: "Sim",
							acessoriaEspecializada: "Sim",
						},
						pricing: {
							oldPrice: "R$ 9.090",
							price: "R$ 7.362,90",
							couponCode: "B25KSTSP",
						},
						url: "https://checkout.5pi.com.br/pay/book-25k-sem-prazo-sem-stop-diario",
					},
					{
						key: "D10-P60-SS",
						baseDays: 10,
						minDaysApproval: 60,
						values: {
							margemReal: "25.000",
							margemDePerda: "25.000",
							contratos: "190",
							repasse: "90%",
							cashback: "R$ 250",
							proftOneGratis: "Sim",
							plataformaGratuitaReal: "Sim",
							educacionalEspecialistas: "50",
							salasAoVivoComMentores: "Diária",
							gerenciamentoDeRisco: "Sim",
							acessoriaEspecializada: "Sim",
						},
						pricing: {
							oldPrice: "R$ 9.090",
							price: "R$ 5.999,40",
							couponCode: "B25KST",
						},
						url: "https://checkout.5pi.com.br/pay/book-25k-prazo-60-dias-sem-stop-diario",
					},
				],
			},
			{
				key: "book-30k",
				name: "Book 30k",
				labels: {
					margemReal: "Margem na real de até:",
					margemDePerda: "Perda Máxima:",
					contratos: "Quantidade de contratos:",
					meta: "Meta:",
					repasse: "Repasse:",
					cashback: "Cashback:",
					profitOne: "Profit One grátis no 1º mês:",
					plataforma: "Plataforma gratuita na real:",
					educacional: "Educacional com especialistas:",
					salaAoVivo: "Sala ao vivo com mentores:",
					gerenciamento: "Gerenciamento de Risco:",
					assessoria: "Assessoria especializada:",
				},
				variants: [
					/* Com Stop Diário */
					{
						key: "D10-SP-CS",
						baseDays: 10,
						minDaysApproval: 0,
						values: {
							margemReal: "30.000",
							margemDePerda: "30.000",
							contratos: "230",
							repasse: "90%",
							cashback: "R$ 250",
							proftOneGratis: "Sim",
							plataformaGratuitaReal: "Sim",
							educacionalEspecialistas: "50",
							salasAoVivoComMentores: "Diária",
							gerenciamentoDeRisco: "Sim",
							acessoriaEspecializada: "Sim",
						},
						pricing: {
							oldPrice: "R$ 9.900",
							price: "R$ 7.319",
							couponCode: "BOOK30KSP",
						},
						url: "https://checkout.5pi.com.br/pay/book-30k-sem-prazo-com-stop-diario",
					},
					{
						key: "D10-P60-CS",
						baseDays: 10,
						minDaysApproval: 60,
						values: {
							margemReal: "30.000",
							margemDePerda: "30.000",
							contratos: "230",
							repasse: "90%",
							cashback: "R$ 250",
							proftOneGratis: "Sim",
							plataformaGratuitaReal: "Sim",
							educacionalEspecialistas: "50",
							salasAoVivoComMentores: "Diária",
							gerenciamentoDeRisco: "Sim",
							acessoriaEspecializada: "Sim",
						},
						pricing: {
							oldPrice: "R$ 9.900",
							price: "R$ 5.999",
							couponCode: "BOOK30K",
						},
						url: "https://checkout.5pi.com.br/pay/book-30k-prazo-60-dias-com-stop-diario",
					},
					/* Sem Stop Diário */
					{
						key: "D10-SP-SS",
						baseDays: 10,
						minDaysApproval: 0,
						values: {
							margemReal: "30.000",
							margemDePerda: "30.000",
							contratos: "230",
							repasse: "90%",
							cashback: "R$ 250",
							proftOneGratis: "Sim",
							plataformaGratuitaReal: "Sim",
							educacionalEspecialistas: "50",
							salasAoVivoComMentores: "Diária",
							gerenciamentoDeRisco: "Sim",
							acessoriaEspecializada: "Sim",
						},
						pricing: {
							oldPrice: "R$ 11.880",
							price: "R$ 8.791,20",
							couponCode: "B30KSTSP",
						},
						url: "https://checkout.5pi.com.br/pay/book-30k-sem-prazo-sem-stop-diario",
					},
					{
						key: "D10-P60-SS",
						baseDays: 10,
						minDaysApproval: 60,
						values: {
							margemReal: "30.000",
							margemDePerda: "30.000",
							contratos: "230",
							repasse: "90%",
							cashback: "R$ 250",
							proftOneGratis: "Sim",
							plataformaGratuitaReal: "Sim",
							educacionalEspecialistas: "50",
							salasAoVivoComMentores: "Diária",
							gerenciamentoDeRisco: "Sim",
							acessoriaEspecializada: "Sim",
						},
						pricing: {
							oldPrice: "R$ 11.880",
							price: "R$ 7.246,80",
							couponCode: "B30KST",
						},
						url: "https://checkout.5pi.com.br/pay/book-30k-prazo-60-dias-sem-stop-diario",
					},
				],
			},
			{
				key: "book-50k",
				name: "Book 50k",
				labels: {
					margemReal: "Margem na real de até:",
					margemDePerda: "Perda Máxima:",
					contratos: "Quantidade de contratos:",
					meta: "Meta:",
					repasse: "Repasse:",
					cashback: "Cashback:",
					profitOne: "Profit One grátis no 1º mês:",
					plataforma: "Plataforma gratuita na real:",
					educacional: "Educacional com especialistas:",
					salaAoVivo: "Sala ao vivo com mentores:",
					gerenciamento: "Gerenciamento de Risco:",
					assessoria: "Assessoria especializada:",
				},
				variants: [
					/* Com Stop Diário */
					{
						key: "D10-SP-CS",
						baseDays: 10,
						minDaysApproval: 0,
						values: {
							margemReal: "50.000",
							margemDePerda: "50.000",
							contratos: "385",
							repasse: "90%",
							cashback: "R$ 250",
							proftOneGratis: "Sim",
							plataformaGratuitaReal: "Sim",
							educacionalEspecialistas: "50",
							salasAoVivoComMentores: "Diária",
							gerenciamentoDeRisco: "Sim",
							acessoriaEspecializada: "Sim",
						},
						pricing: {
							oldPrice: "R$ 17.000",
							price: "R$ 13.419",
							couponCode: "BOOK50KSP",
						},
						url: "https://checkout.5pi.com.br/pay/book-50k-sem-prazo-com-stop-diario",
					},
					{
						key: "D10-P60-CS",
						baseDays: 10,
						minDaysApproval: 60,
						values: {
							margemReal: "50.000",
							margemDePerda: "50.000",
							contratos: "385",
							repasse: "90%",
							cashback: "R$ 250",
							proftOneGratis: "Sim",
							plataformaGratuitaReal: "Sim",
							educacionalEspecialistas: "50",
							salasAoVivoComMentores: "Diária",
							gerenciamentoDeRisco: "Sim",
							acessoriaEspecializada: "Sim",
						},
						pricing: {
							oldPrice: "R$ 17.000",
							price: "R$ 10.999",
							couponCode: "BOOK50K",
						},
						url: "https://checkout.5pi.com.br/pay/book-50k-prazo-60-dias-com-stop-diario",
					},
					/* Sem Stop Diário */
					{
						key: "D10-SP-SS",
						baseDays: 10,
						minDaysApproval: 0,
						values: {
							margemReal: "50.000",
							margemDePerda: "50.000",
							contratos: "385",
							repasse: "90%",
							cashback: "R$ 250",
							proftOneGratis: "Sim",
							plataformaGratuitaReal: "Sim",
							educacionalEspecialistas: "50",
							salasAoVivoComMentores: "Diária",
							gerenciamentoDeRisco: "Sim",
							acessoriaEspecializada: "Sim",
						},
						pricing: {
							oldPrice: "R$ 20.400",
							price: "R$ 16.116",
							couponCode: "B50KSTSP",
						},
						url: "https://checkout.5pi.com.br/pay/book-50k-sem-prazo-sem-stop-diario",
					},
					{
						key: "D10-P60-SS",
						baseDays: 10,
						minDaysApproval: 60,
						values: {
							margemReal: "50.000",
							margemDePerda: "50.000",
							contratos: "385",
							repasse: "90%",
							cashback: "R$ 250",
							proftOneGratis: "Sim",
							plataformaGratuitaReal: "Sim",
							educacionalEspecialistas: "50",
							salasAoVivoComMentores: "Diária",
							gerenciamentoDeRisco: "Sim",
							acessoriaEspecializada: "Sim",
						},
						pricing: {
							oldPrice: "R$ 20.400",
							price: "R$ 13.260",
							couponCode: "B50KST",
						},
						url: "https://checkout.5pi.com.br/pay/book-50k-prazo-60-dias-sem-stop-diario",
					},
				],
			},
		],
	},
};

/* ===== Estado ===== */
const appState = {
	currentPlan: "plus",
	/* REVERT: para voltar ao comportamento global, descomente as 2 linhas abaixo
	   e remova selectedMinDaysPerCard/selectedStopPerCard + getCardMinDays/getCardStop */
	// selectedMinDays: 60,
	// selectedStop: "sem-stop",
	selectedMinDaysPerCard: {}, // ex: { "book-25k": 0 } — default 60
	selectedStopPerCard: {}, // ex: { "book-25k": "com-stop" } — default "sem-stop"
	isExpanded: false,
};
const getCardMinDays = (cardKey) =>
	appState.selectedMinDaysPerCard[cardKey] ?? 60;
const getCardStop = (cardKey) =>
	appState.selectedStopPerCard[cardKey] ?? "com-stop";
/* ===== HELPERS: Apply Overrides ===== */
function getOverridesForPath() {
	const path = window.location.pathname;
	for (const [key, overrides] of Object.entries(configOverrides)) {
		if (path.includes(key)) {
			return overrides;
		}
	}
	return [];
}

function matchesSelector(selector, value) {
	return selector === "*" || selector === value;
}

function applyPatch(target, patch) {
	const result = { ...target };
	for (const [key, value] of Object.entries(patch)) {
		if (value && typeof value === "object" && !Array.isArray(value)) {
			result[key] = applyPatch(result[key] || {}, value);
		} else {
			result[key] = value;
		}
	}
	return result;
}

function applyOverridesToVariant(planKey, cardKey, variantKey, variant) {
	const overrides = getOverridesForPath();
	const result = { ...variant };

	for (const override of overrides) {
		const { plan, card, variant: variantSelector, patch } = override;
		if (
			matchesSelector(plan, planKey) &&
			matchesSelector(card, cardKey) &&
			matchesSelector(variantSelector, variantKey)
		) {
			if (patch.values) {
				result.values = applyPatch(result.values || {}, patch.values);
			}
			if (patch.pricing) {
				result.pricing = applyPatch(result.pricing || {}, patch.pricing);
			}
			if (patch.url !== undefined) {
				result.url = patch.url;
			}
			for (const [key, value] of Object.entries(patch)) {
				if (!["values", "pricing", "url"].includes(key)) {
					result[key] = value;
				}
			}
		}
	}

	return result;
}

/* ===== VM ===== */
const buildOffersViewModel = () => {
	const planKey = appState.currentPlan;
	const plan = plansData[planKey];
	const tabs = Object.keys(plansData).map((key) => ({
		key,
		title: plansData[key].title,
		isActive: key === planKey,
	}));
	const cards = (plan.cards || []).map((card) => {
		const variants = card.variants || [];
		const cardMinDays = getCardMinDays(card.key);
		const cardStop = getCardStop(card.key);
		const prazoKey = cardMinDays === 0 ? "SP" : "P60";
		const stopKey = cardStop === "com-stop" ? "CS" : "SS";
		const desiredKeyFull = `D10-${prazoKey}-${stopKey}`;
		const desiredKeyShort = `D10-${prazoKey}`;
		let selected =
			variants.find((v) => v.key === desiredKeyFull) ||
			variants.find((v) => v.key === desiredKeyShort) ||
			variants[0] ||
			{};

		// Apply config overrides
		selected = applyOverridesToVariant(
			planKey,
			card.key,
			selected.key,
			selected,
		);

		const approvalOptions = [
			{ minDaysApproval: 60, isSelected: cardMinDays === 60 },
			{ minDaysApproval: 0, isSelected: cardMinDays === 0 },
		];
		const L = card.labels || {};
		const V = selected.values || {};
		const P = selected.pricing || {};
		const margemRealFmt = formatBRInt(V.margemReal);
		const margemDePerdaFmt = formatBRInt(V.margemDePerda);
		const metaParaAprovacaoText =
			cardMinDays === 60 ? `R$ ${margemRealFmt}` : "Sem meta";
		const couponExists = hasRealCoupon(P.couponCode);
		const couponClean = couponExists ? normalizeCoupon(P.couponCode) : null;
		const stopOptions = [
			{
				value: "sem-stop",
				label: "Sem stop diário na avaliação",
				isSelected: cardStop === "sem-stop",
			},
			{
				value: "com-stop",
				label: "20% de stop diário na avaliação",
				isSelected: cardStop === "com-stop",
			},
		];
		return {
			cardKey: card.key,
			name: selected.name || card.name,
			approvalOptions,
			stopOptions,
			fields: {
				labels: {
					margemReal: L.margemReal,
					margemDePerda: L.margemDePerda,
					contratos: L.contratos,
					meta: L.meta,
					repasse: L.repasse,
					cashback: L.cashback,
					profitOne: L.profitOne,
					plataforma: L.plataforma,
					educacional: L.educacional,
					salaAoVivo: L.salaAoVivo,
					gerenciamento: L.gerenciamento,
					assessoria: L.assessoria,
				},
			},
			attributes: {
				margemReal: stripCurrency(V.margemReal ?? ""),
				margemDePerda: stripCurrency(V.margemDePerda ?? ""),
				contratos: V.contratos ?? "",
				repasse: V.repasse ?? "",
				cashback: V.cashback ?? "",
				proftOneGratis: V.proftOneGratis ?? "",
				plataformaGratuitaReal: V.plataformaGratuitaReal ?? "",
				educacionalEspecialistas: V.educacionalEspecialistas ?? "",
				salasAoVivoComMentores: V.salasAoVivoComMentores ?? "",
				gerenciamentoDeRisco: V.gerenciamentoDeRisco ?? "",
				acessoriaEspecializada: V.acessoriaEspecializada ?? "",
				margemRealFmt,
				margemDePerdaFmt,
				metaParaAprovacaoText,
			},
			pricing: {
				price: formatBRMoney(P.price ?? ""),
				oldPrice: P.oldPrice ? formatBRMoney(P.oldPrice) : null,
				couponCode: couponClean,
				installments: 21,
			},
			ctaUrl: (() => {
				const baseUrl = selected.url || "#";
				const utmSource = getPartnerUtmSource();
				return utmSource ? addUtmToUrl(baseUrl, utmSource) : baseUrl;
			})(),
		};
	});
	return {
		tabs,
		cards,
		isExpanded: appState.isExpanded,
		isPrivate: planKey === "private",
		isPartnerSomos: window.location.pathname.includes("parceiros/somos"),
	};
};
/* ===== Render + Listeners ===== */
let offers = buildOffersViewModel();
let offersSwiper = null;
const isMobile = () => window.innerWidth < 1024;
const initializeSwiper = () => {
	if (isMobile() && !offersSwiper) {
		const c = document.getElementById("offers-swiper");
		if (c) {
			c.classList.add("swiper");
			offersSwiper = new Swiper("#offers-swiper", {
				slidesPerView: 1.2,
				spaceBetween: 24,
				navigation: {
					nextEl: ".swiper-button-next",
					prevEl: ".swiper-button-prev",
				},
				pagination: {
					el: ".offers-swiper-pagination",
					clickable: true,
					type: "bullets",
				},
				breakpoints: { 1024: { enabled: false } },
			});
		}
	} else if (!isMobile() && offersSwiper) {
		const c = document.getElementById("offers-swiper");
		if (c) c.classList.remove("swiper");
		offersSwiper.destroy(true, true);
		offersSwiper = null;
	}
};
// === Mobile small offers header behavior ===
let smallOffersHeaderInited = false;
const isElementOnScreen = (el) => {
	if (!el) return false;
	const r = el.getBoundingClientRect();
	const vh = window.innerHeight || document.documentElement.clientHeight;
	return r.bottom > 0 && r.top < vh;
};
// No longer need dynamic top sync with header. Small header will stick at top:0
function updateSmallOffersHeader() {
	// Disable/enable page header scroll effects based on offers-container visibility (mobile only)
	const offersContainer = document.getElementById("offers-container");
	const containerVisible = isElementOnScreen(offersContainer);
	const shouldDisableHeader = isMobile() && containerVisible;
	if (window.__flexHeaderDisabled !== shouldDisableHeader) {
		window.__flexHeaderDisabled = shouldDisableHeader;
		// Force header to re-evaluate immediately
		window.dispatchEvent(new Event("resize"));
	}
	const small = document.querySelector(".offers-header-small");
	const large = document.querySelector(".offers-header");
	const cards = document.querySelector(".offers-cards-container");
	if (!small || !large || !cards) return;
	if (!isMobile()) {
		small.classList.remove("is-fixed", "is-visible");
		small.style.top = "";
		return;
	}
	const shouldShow = isElementOnScreen(cards) && !isElementOnScreen(large);
	if (!shouldShow) {
		small.classList.remove("is-fixed", "is-visible");
		small.style.top = "";
		return;
	}
	const wasVisible = small.classList.contains("is-visible");
	small.classList.add("is-fixed");
	const top = 0;
	if (!wasVisible) {
		const prevTransition = small.style.transition;
		small.style.transition = "none";
		small.style.top = `${top}px`;
		small.classList.add("is-visible");
		void small.offsetHeight;
		small.style.transition = prevTransition || "";
	} else {
		small.classList.add("is-visible");
		small.style.top = `${top}px`;
	}
	// Header disable is handled globally by offers-container visibility above
}
function initSmallOffersHeaderBehavior() {
	if (!smallOffersHeaderInited) {
		window.addEventListener("scroll", updateSmallOffersHeader, {
			passive: true,
		});
		window.addEventListener("resize", updateSmallOffersHeader);
		smallOffersHeaderInited = true;
	}
	updateSmallOffersHeader();
}
function attachInteractiveHandlers() {
	document
		.querySelectorAll(".offers-header--button[data-plan]")
		.forEach((btn) => {
			btn.addEventListener("click", () => {
				const plan = btn.getAttribute("data-plan");
				if (plan && plan !== appState.currentPlan) {
					appState.currentPlan = plan;
					reRenderOffers();
				}
			});
		});
	document.querySelectorAll(".approval-combobox").forEach((sel) => {
		sel.addEventListener("change", (e) => {
			const cardKey = e.target
				.closest(".offers-card")
				?.getAttribute("data-card-key");
			if (cardKey) {
				appState.selectedMinDaysPerCard[cardKey] =
					parseInt(e.target.value, 10) || 0;
			}
			/* REVERT: appState.selectedMinDays = parseInt(e.target.value, 10) || 0; */
			reRenderOffers();
		});
	});
	document.querySelectorAll(".stop-combobox").forEach((sel) => {
		sel.addEventListener("change", (e) => {
			const cardKey = e.target
				.closest(".offers-card")
				?.getAttribute("data-card-key");
			if (cardKey) {
				appState.selectedStopPerCard[cardKey] = e.target.value;
			}
			/* REVERT: appState.selectedStop = e.target.value; */
			reRenderOffers();
		});
	});
	document.querySelectorAll(".offers-toggle-details").forEach((btn) => {
		btn.addEventListener("click", (e) => {
			e.preventDefault();
			appState.isExpanded = !appState.isExpanded;
			reRenderOffers();
		});
	});
	// Copy coupon code (button inside discount box)
	document.querySelectorAll(".offers-discount button").forEach((btn) => {
		btn.addEventListener("click", (e) => {
			e.preventDefault();
			e.stopPropagation();
			const box = btn.closest(".offers-discount");
			const code =
				(box &&
					(box.getAttribute("coupon-code") ||
						box.getAttribute("data-coupon"))) ||
				"";
			if (!code) return;
			copyToClipboard(code).then(() => {
				if (typeof Toastify === "function") {
					Toastify({
						text: "Código copiado",
						duration: 3000,
						gravity: "bottom",
						position: "center",
						stopOnFocus: true,
					}).showToast();
				}
			});
		});
	});
}
function renderOffers(cb) {
	window.orion.renderTemplate({
		templateId: "offers-template",
		containerId: "offers-container",
		data: { offers, discountPercent },
		callback: () => {
			attachInteractiveHandlers();
			initializeSwiper();
			initSmallOffersHeaderBehavior();
			if (typeof cb === "function") cb();
		},
	});
}
function reRenderOffers() {
	if (offersSwiper) {
		const c = document.getElementById("offers-swiper");
		if (c) c.classList.remove("swiper");
		offersSwiper.destroy(true, true);
		offersSwiper = null;
	}
	offers = buildOffersViewModel();
	renderOffers();
}
window.addEventListener("DOMContentLoaded", () => renderOffers());
window.addEventListener("resize", initializeSwiper);
