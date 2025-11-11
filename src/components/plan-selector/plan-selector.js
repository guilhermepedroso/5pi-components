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
/* Mantém pontos de milhar e centavos (se existirem) */
function formatBRMoney(value) {
	const raw = String(value ?? "").trim();
	if (!raw) return "";
	const numeric = stripCurrency(raw);
	const hasCents = /\.\d{1,2}$/.test(String(numeric));
	const n = Number(numeric);
	if (!isFinite(n)) return "";
	return new Intl.NumberFormat("pt-BR", {
		minimumFractionDigits: hasCents ? 2 : 0,
		maximumFractionDigits: hasCents ? 2 : 0,
	}).format(n);
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
		title: { text: "Planos Plus", sup: "Mais vendidos" },
		cards: [
			{
				name: "Book 90",
				labels: {
					margemReal: "Margem na real de até:",
					margemDePerda: "Perda Máxima:",
					meta: "Meta",
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
						allowsAutomation: false,
						values: {
							margemReal: "11.000",
							margemDePerda: "11.000",
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
							price: "R$ 2.835",
							couponCode: "NEW90SP",
						},
						url: "https://checkout.5pi.com.br/pay/book-90-duo-10-dias-sem-prazo-sem-meta",
					},
					{
						key: "D10-SP-WITH-AUTOMATION",
						baseDays: 10,
						minDaysApproval: 0,
						allowsAutomation: true,
						values: {
							margemReal: "11.000",
							margemDePerda: "11.000",
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
							price: "R$ 2.835",
							couponCode: "NEW90SP",
						},
						url: "",
					},
					{
						key: "D10-P60",
						baseDays: 10,
						minDaysApproval: 60,
						allowsAutomation: false,
						values: {
							margemReal: "11.000",
							margemDePerda: "11.000",
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
							price: "R$ 2.450",
							couponCode: "NEW90D",
						},
						url: "https://checkout.5pi.com.br/pay/book-90-duo-10-dias-prazo-60-dias",
					},
					{
						key: "D10-P60-WITH-AUTOMATION",
						baseDays: 10,
						minDaysApproval: 60,
						allowsAutomation: true,
						values: {
							margemReal: "11.000",
							margemDePerda: "11.000",
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
							price: "R$ 2.450",
							couponCode: "NEW90D",
						},
						url: "",
					},
					{
						key: "D5-SP",
						baseDays: 5,
						minDaysApproval: 0,
						allowsAutomation: false,
						values: {
							margemReal: "11.000",
							margemDePerda: "11.000",
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
							price: "R$ 3.325",
							couponCode: "NEW5CINCOSP",
						},
						url: "https://checkout.5pi.com.br/pay/book-90-duo-5-dias-sem-prazo-sem-meta",
					},
					{
						key: "D5-SP-WITH-AUTOMATION",
						baseDays: 5,
						minDaysApproval: 0,
						allowsAutomation: true,
						values: {
							margemReal: "11.000",
							margemDePerda: "11.000",
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
							price: "R$ 3.325",
							couponCode: "NEW5CINCOSP",
						},
						url: "",
					},
					{
						key: "D5-P60",
						baseDays: 5,
						minDaysApproval: 60,
						allowsAutomation: false,
						values: {
							margemReal: "11.000",
							margemDePerda: "11.000",
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
							price: "R$ 3.150",
							couponCode: "NEW10CINCOD",
						},
						url: "https://checkout.5pi.com.br/pay/book-90-duo-5-dias-prazo-60-dias",
					},
					{
						key: "D5-P60-WITH-AUTOMATION",
						baseDays: 5,
						minDaysApproval: 60,
						allowsAutomation: true,
						values: {
							margemReal: "11.000",
							margemDePerda: "11.000",
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
							price: "R$ 3.150",
							couponCode: "NEW10CINCOD",
						},
						url: "",
					},
				],
			},
			{
				name: "Book 140",
				labels: {
					margemReal: "Margem na real de até:",
					margemDePerda: "Perda Máxima:",
					meta: "Meta",
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
						allowsAutomation: false,
						values: {
							margemReal: "15.000",
							margemDePerda: "15.000",
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
							price: "R$ 3.895",
							couponCode: "NEW140SP",
						},
						url: "https://checkout.5pi.com.br/pay/book-140-duo-10-dias-sem-prazo-sem-meta",
					},
					{
						key: "D10-SP-WITH-AUTOMATION",
						baseDays: 10,
						minDaysApproval: 0,
						allowsAutomation: true,
						values: {
							margemReal: "15.000",
							margemDePerda: "15.000",
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
							price: "R$ 3.895",
							couponCode: "NEW140SP",
						},
						url: "",
					},
					{
						key: "D10-P60",
						baseDays: 10,
						minDaysApproval: 60,
						allowsAutomation: false,
						values: {
							margemReal: "15.000",
							margemDePerda: "15.000",
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
							price: "R$ 3.330",
							couponCode: "NEW140D",
						},
						url: "https://checkout.5pi.com.br/pay/book-140-duo-10-dias-prazo-60-dias",
					},
					{
						key: "D10-P60-WITH-AUTOMATION",
						baseDays: 10,
						minDaysApproval: 60,
						allowsAutomation: true,
						values: {
							margemReal: "15.000",
							margemDePerda: "15.000",
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
							price: "R$ 3.330",
							couponCode: "NEW140D",
						},
						url: "",
					},
					{
						key: "D5-SP",
						baseDays: 5,
						minDaysApproval: 0,
						allowsAutomation: false,
						values: {
							margemReal: "15.000",
							margemDePerda: "15.000",
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
							price: "R$ 4.512,50",
							couponCode: "NEW5CINCOSP",
						},
						url: "https://checkout.5pi.com.br/pay/book-140-duo-5-dias-sem-prazo-sem-meta",
					},
					{
						key: "D5-SP-WITH-AUTOMATION",
						baseDays: 5,
						minDaysApproval: 0,
						allowsAutomation: true,
						values: {
							margemReal: "15.000",
							margemDePerda: "15.000",
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
							price: "R$ 4.512,50",
							couponCode: "NEW5CINCOSP",
						},
						url: "",
					},
					{
						key: "D5-P60",
						baseDays: 5,
						minDaysApproval: 60,
						allowsAutomation: false,
						values: {
							margemReal: "15.000",
							margemDePerda: "15.000",
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
							price: "R$ 4.280",
							couponCode: "NEW10CINCOD",
						},
						url: "https://checkout.5pi.com.br/pay/book-140-duo-5-dias-prazo-60-dias",
					},
					{
						key: "D5-P60-WITH-AUTOMATION",
						baseDays: 5,
						minDaysApproval: 60,
						allowsAutomation: true,
						values: {
							margemReal: "15.000",
							margemDePerda: "15.000",
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
							price: "R$ 4.280",
							couponCode: "NEW10CINCOD",
						},
						url: "",
					},
				],
			},
			{
				name: "Book 200",
				labels: {
					margemReal: "Margem na real de até:",
					margemDePerda: "Perda Máxima:",
					meta: "Meta",
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
						allowsAutomation: false,
						values: {
							margemReal: "18.000",
							margemDePerda: "18.000",
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
							price: "R$ 4.452,60",
							couponCode: "NEW200SP",
						},
						url: "https://checkout.5pi.com.br/pay/book-200-duo-10-dias-sem-prazo-sem-meta",
					},
					{
						key: "D10-SP-WITH-AUTOMATION",
						baseDays: 10,
						minDaysApproval: 0,
						allowsAutomation: true,
						values: {
							margemReal: "18.000",
							margemDePerda: "18.000",
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
							price: "R$ 4.452,60",
							couponCode: "NEW200SP",
						},
						url: "",
					},
					{
						key: "D10-P60",
						baseDays: 10,
						minDaysApproval: 60,
						allowsAutomation: false,
						values: {
							margemReal: "18.000",
							margemDePerda: "18.000",
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
							price: "R$ 3.800",
							couponCode: "NEW200D",
						},
						url: "https://checkout.5pi.com.br/pay/book-200-duo-10-dias-prazo-60-dias",
					},
					{
						key: "D10-P60-WITH-AUTOMATION",
						baseDays: 10,
						minDaysApproval: 60,
						allowsAutomation: true,
						values: {
							margemReal: "18.000",
							margemDePerda: "18.000",
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
							price: "R$ 3.800",
							couponCode: "NEW200D",
						},
						url: "",
					},
					{
						key: "D5-SP",
						baseDays: 5,
						minDaysApproval: 0,
						allowsAutomation: false,
						values: {
							margemReal: "18.000",
							margemDePerda: "18.000",
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
							price: "R$ 5.158,50",
							couponCode: "NEW5CINCOSP",
						},
						url: "https://checkout.5pi.com.br/pay/book-200-duo-5-dias-sem-prazo-sem-meta",
					},
					{
						key: "D5-SP-WITH-AUTOMATION",
						baseDays: 5,
						minDaysApproval: 0,
						allowsAutomation: true,
						values: {
							margemReal: "18.000",
							margemDePerda: "18.000",
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
							price: "R$ 5.158,50",
							couponCode: "NEW5CINCOSP",
						},
						url: "",
					},
					{
						key: "D5-P60",
						baseDays: 5,
						minDaysApproval: 60,
						allowsAutomation: false,
						values: {
							margemReal: "18.000",
							margemDePerda: "18.000",
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
							price: "R$ 4.880",
							couponCode: "NEW10CINCOD",
						},
						url: "https://checkout.5pi.com.br/pay/book-200-duo-5-dias-prazo-60-dias",
					},
					{
						key: "D5-P60-WITH-AUTOMATION",
						baseDays: 5,
						minDaysApproval: 60,
						allowsAutomation: true,
						values: {
							margemReal: "18.000",
							margemDePerda: "18.000",
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
							price: "R$ 4.880",
							couponCode: "NEW10CINCOD",
						},
						url: "",
					},
				],
			},
		],
	},
	starter: {
		title: { text: "Planos Starter", sup: "Mais acessíveis" },
		cards: [
			{
				name: "Book 15",
				labels: {
					margemReal: "Margem na real de até:",
					margemDePerda: "Perda Máxima:",
					meta: "Meta",
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
						allowsAutomation: false,
						values: {
							margemReal: "2.200",
							margemDePerda: "2.000",
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
							price: "R$ 535",
							couponCode: "NEW15SP",
						},
						url: "https://checkout.5pi.com.br/pay/book-15-duo-10-dias-sem-prazo-sem-meta",
					},
					{
						key: "D10-SP-WITH-AUTOMATION",
						baseDays: 10,
						minDaysApproval: 0,
						allowsAutomation: true,
						values: {
							margemReal: "2.200",
							margemDePerda: "2.000",
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
							price: "R$ 535",
							couponCode: "NEW15SP",
						},
						url: "",
					},
					{
						key: "D10-P60",
						baseDays: 10,
						minDaysApproval: 60,
						allowsAutomation: false,
						values: {
							margemReal: "2.200",
							margemDePerda: "2.000",
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
							price: "R$ 450",
							couponCode: "NEW15D",
						},
						url: "https://checkout.5pi.com.br/pay/book-15-duo-10-dias-prazo-60-dias",
					},
					{
						key: "D10-P60-WITH-AUTOMATION",
						baseDays: 10,
						minDaysApproval: 60,
						allowsAutomation: true,
						values: {
							margemReal: "2.200",
							margemDePerda: "2.000",
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
							price: "R$ 450",
							couponCode: "NEW15D",
						},
						url: "",
					},
					{
						key: "D5-SP",
						baseDays: 5,
						minDaysApproval: 0,
						allowsAutomation: false,
						values: {
							margemReal: "2.200",
							margemDePerda: "2.000",
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
							price: "R$ 617,50",
							couponCode: "NEW5CINCOSP",
						},
						url: "https://checkout.5pi.com.br/pay/book-15-duo-5-dias-sem-prazo-sem-meta",
					},
					{
						key: "D5-SP-WITH-AUTOMATION",
						baseDays: 5,
						minDaysApproval: 0,
						allowsAutomation: true,
						values: {
							margemReal: "2.200",
							margemDePerda: "2.000",
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
							price: "R$ 617,50",
							couponCode: "NEW5CINCOSP",
						},
						url: "",
					},
					{
						key: "D5-P60",
						baseDays: 5,
						minDaysApproval: 60,
						allowsAutomation: false,
						values: {
							margemReal: "2.200",
							margemDePerda: "2.000",
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
							price: "R$ 585",
							couponCode: "NEW10CINCOD",
						},
						url: "https://checkout.5pi.com.br/pay/book-15-duo-5-dias-prazo-60-dias",
					},
					{
						key: "D5-P60-WITH-AUTOMATION",
						baseDays: 5,
						minDaysApproval: 60,
						allowsAutomation: true,
						values: {
							margemReal: "2.200",
							margemDePerda: "2.000",
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
							price: "R$ 585",
							couponCode: "NEW10CINCOD",
						},
						url: "",
					},
				],
			},
			{
				name: "Book 30",
				labels: {
					margemReal: "Margem na real de até:",
					margemDePerda: "Perda Máxima:",
					meta: "Meta",
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
						allowsAutomation: false,
						values: {
							margemReal: "3.400",
							margemDePerda: "3.000",
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
							price: "R$ 939",
							couponCode: "NEW30SP",
						},
						url: "https://checkout.5pi.com.br/pay/book-30-duo-10-dias-sem-prazo-sem-meta",
					},
					{
						key: "D10-SP-WITH-AUTOMATION",
						baseDays: 10,
						minDaysApproval: 0,
						allowsAutomation: true,
						values: {
							margemReal: "3.400",
							margemDePerda: "3.000",
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
							price: "R$ 939",
							couponCode: "NEW30SP",
						},
						url: "",
					},
					{
						key: "D10-P60",
						baseDays: 10,
						minDaysApproval: 60,
						allowsAutomation: false,
						values: {
							margemReal: "3.400",
							margemDePerda: "3.000",
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
							price: "R$ 800",
							couponCode: "NEW30D",
						},
						url: "https://checkout.5pi.com.br/pay/book-30-duo-10-dias-prazo-60-dias",
					},
					{
						key: "D10-P60-WITH-AUTOMATION",
						baseDays: 10,
						minDaysApproval: 60,
						allowsAutomation: true,
						values: {
							margemReal: "3.400",
							margemDePerda: "3.000",
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
							price: "R$ 800",
							couponCode: "NEW30D",
						},
						url: "",
					},
					{
						key: "D5-SP",
						baseDays: 5,
						minDaysApproval: 0,
						allowsAutomation: false,
						values: {
							margemReal: "3.400",
							margemDePerda: "3.300",
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
							price: "R$ 1.083",
							couponCode: "NEW5CINCOSP",
						},
						url: "https://checkout.5pi.com.br/pay/book-30-duo-5-dias-sem-prazo-sem-meta",
					},
					{
						key: "D5-SP-WITH-AUTOMATION",
						baseDays: 5,
						minDaysApproval: 0,
						allowsAutomation: true,
						values: {
							margemReal: "3.400",
							margemDePerda: "3.300",
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
							price: "R$ 1.083",
							couponCode: "NEW5CINCOSP",
						},
						url: "",
					},
					{
						key: "D5-P60",
						baseDays: 5,
						minDaysApproval: 60,
						allowsAutomation: false,
						values: {
							margemReal: "3.400",
							margemDePerda: "3.000",
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
							price: "R$ 1.020",
							couponCode: "NEW30CINCOD",
						},
						url: "https://checkout.5pi.com.br/pay/book-30-duo-5-dias-prazo-60-dias",
					},
					{
						key: "D5-P60-WITH-AUTOMATION",
						baseDays: 5,
						minDaysApproval: 60,
						allowsAutomation: true,
						values: {
							margemReal: "3.400",
							margemDePerda: "3.000",
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
							price: "R$ 1.020",
							couponCode: "NEW30CINCOD",
						},
						url: "",
					},
				],
			},
			{
				name: "Book 40",
				labels: {
					margemReal: "Margem na real de até:",
					margemDePerda: "Perda Máxima:",
					meta: "Meta",
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
						allowsAutomation: false,
						values: {
							margemReal: "6.000",
							margemDePerda: "5.500",
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
							price: "R$ 1.789",
							couponCode: "NEW40SP",
						},
						url: "https://checkout.5pi.com.br/pay/book-40-duo-10-dias-sem-prazo-sem-meta",
					},
					{
						key: "D10-SP-WITH-AUTOMATION",
						baseDays: 10,
						minDaysApproval: 0,
						allowsAutomation: true,
						values: {
							margemReal: "6.000",
							margemDePerda: "5.500",
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
							price: "R$ 1.789",
							couponCode: "NEW40SP",
						},
						url: "",
					},
					{
						key: "D10-P60",
						baseDays: 10,
						minDaysApproval: 60,
						allowsAutomation: false,
						values: {
							margemReal: "6.000",
							margemDePerda: "5.500",
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
							price: "R$ 1.500",
							couponCode: "NEW40D",
						},
						url: "https://checkout.5pi.com.br/pay/book-40-duo-10-dias-prazo-60-dias",
					},
					{
						key: "D10-P60-WITH-AUTOMATION",
						baseDays: 10,
						minDaysApproval: 60,
						allowsAutomation: true,
						values: {
							margemReal: "6.000",
							margemDePerda: "5.500",
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
							price: "R$ 1.500",
							couponCode: "NEW40D",
						},
						url: "",
					},
					{
						key: "D5-SP",
						baseDays: 5,
						minDaysApproval: 0,
						allowsAutomation: false,
						values: {
							margemReal: "6.000",
							margemDePerda: "5.500",
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
							price: "R$ 1.935",
							couponCode: "NEW5CINCOSP",
						},
						url: "https://checkout.5pi.com.br/pay/book-40-duo-5-dias-sem-prazo-sem-meta",
					},
					{
						key: "D5-SP-WITH-AUTOMATION",
						baseDays: 5,
						minDaysApproval: 0,
						allowsAutomation: true,
						values: {
							margemReal: "6.000",
							margemDePerda: "5.500",
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
							price: "R$ 1.935",
							couponCode: "NEW5CINCOSP",
						},
						url: "",
					},
					{
						key: "D5-P60",
						baseDays: 5,
						minDaysApproval: 60,
						allowsAutomation: false,
						values: {
							margemReal: "6.000",
							margemDePerda: "5.500",
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
							price: "R$ 1.930",
							couponCode: "NEW10CINCOD",
						},
						url: "https://checkout.5pi.com.br/pay/book-40-duo-5-dias-prazo-60-dias",
					},
					{
						key: "D5-P60-WITH-AUTOMATION",
						baseDays: 5,
						minDaysApproval: 60,
						allowsAutomation: true,
						values: {
							margemReal: "6.000",
							margemDePerda: "5.500",
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
							price: "R$ 1.930",
							couponCode: "NEW10CINCOD",
						},
						url: "",
					},
				],
			},
		],
	},
	private: {
		title: { text: "Planos Private", sup: "Maiores lucros" },
		cards: [
			{
				name: "Book 250",
				labels: {
					margemReal: "Margem na real de até:",
					margemDePerda: "Perda Máxima:",
					meta: "Meta",
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
						allowsAutomation: false,
						values: {
							margemReal: "25.000",
							margemDePerda: "25.000",
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
							price: "R$ 6.212",
							couponCode: "NEW250SP",
						},
						url: "https://checkout.5pi.com.br/pay/book-250-duo-10-dias-sem-prazo-sem-meta",
					},
					{
						key: "D10-SP-WITH-AUTOMATION",
						baseDays: 10,
						minDaysApproval: 0,
						allowsAutomation: true,
						values: {
							margemReal: "25.000",
							margemDePerda: "25.000",
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
							price: "R$ 6.212",
							couponCode: "NEW250SP",
						},
						url: "",
					},
					{
						key: "D10-P60",
						baseDays: 10,
						minDaysApproval: 60,
						allowsAutomation: false,
						values: {
							margemReal: "25.000",
							margemDePerda: "25.000",
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
							price: "R$ 5.300",
							couponCode: "NEW250D",
						},
						url: "https://checkout.5pi.com.br/pay/book-250-duo-10-dias-prazo-60-dias",
					},
					{
						key: "D10-P60-WITH-AUTOMATION",
						baseDays: 10,
						minDaysApproval: 60,
						allowsAutomation: true,
						values: {
							margemReal: "25.000",
							margemDePerda: "25.000",
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
							price: "R$ 5.300",
							couponCode: "NEW250D",
						},
						url: "",
					},
					{
						key: "D5-SP",
						baseDays: 5,
						minDaysApproval: 0,
						allowsAutomation: false,
						values: {
							margemReal: "25.000",
							margemDePerda: "25.000",
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
							price: "R$ 7.196,25",
							couponCode: "NEW5CINCOSP",
						},
						url: "https://checkout.5pi.com.br/pay/book-250-duo-5-dias-sem-prazo-sem-meta",
					},
					{
						key: "D5-SP-WITH-AUTOMATION",
						baseDays: 5,
						minDaysApproval: 0,
						allowsAutomation: true,
						values: {
							margemReal: "25.000",
							margemDePerda: "25.000",
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
							price: "R$ 7.196,25",
							couponCode: "NEW5CINCOSP",
						},
						url: "",
					},
					{
						key: "D5-P60",
						baseDays: 5,
						minDaysApproval: 60,
						allowsAutomation: false,
						values: {
							margemReal: "25.000",
							margemDePerda: "25.000",
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
							price: "R$ 6.818",
							couponCode: "NEW10CINCOD",
						},
						url: "https://checkout.5pi.com.br/pay/book-250-duo-5-dias-prazo-60-dias",
					},
					{
						key: "D5-P60-WITH-AUTOMATION",
						baseDays: 5,
						minDaysApproval: 60,
						allowsAutomation: true,
						values: {
							margemReal: "25.000",
							margemDePerda: "25.000",
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
							price: "R$ 6.818",
							couponCode: "NEW10CINCOD",
						},
						url: "",
					},
				],
			},
			{
				name: "Book 500",
				labels: {
					margemReal: "Margem na real de até:",
					margemDePerda: "Perda Máxima:",
					meta: "Meta",
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
						allowsAutomation: false,
						values: {
							margemReal: "50.000",
							margemDePerda: "50.000",
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
							price: "R$ 14.450",
							couponCode: "NEW500SP",
						},
						url: "https://checkout.5pi.com.br/pay/book-500-duo-10-dias-sem-prazo-sem-meta",
					},
					{
						key: "D10-SP-WITH-AUTOMATION",
						baseDays: 10,
						minDaysApproval: 0,
						allowsAutomation: true,
						values: {
							margemReal: "50.000",
							margemDePerda: "50.000",
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
							price: "R$ 14.450",
							couponCode: "NEW500SP",
						},
						url: "",
					},
					{
						key: "D10-P60",
						baseDays: 10,
						minDaysApproval: 60,
						allowsAutomation: false,
						values: {
							margemReal: "50.000",
							margemDePerda: "50.000",
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
							price: "R$ 13.000",
							couponCode: "NEW500D",
						},
						url: "https://checkout.5pi.com.br/pay/book-500-duo-10-dias-prazo-60-dias",
					},
					{
						key: "D10-P60-WITH-AUTOMATION",
						baseDays: 10,
						minDaysApproval: 60,
						allowsAutomation: true,
						values: {
							margemReal: "50.000",
							margemDePerda: "50.000",
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
							price: "R$ 13.000",
							couponCode: "NEW500D",
						},
						url: "",
					},
					{
						key: "D5-SP",
						baseDays: 5,
						minDaysApproval: 0,
						allowsAutomation: false,
						values: {
							margemReal: "50.000",
							margemDePerda: "50.000",
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
							price: "R$ 16.150",
							couponCode: "NEW5CINCOSP",
						},
						url: "https://checkout.5pi.com.br/pay/book-500-duo-5-dias-sem-prazo-sem-meta",
					},
					{
						key: "D5-SP-WITH-AUTOMATION",
						baseDays: 5,
						minDaysApproval: 0,
						allowsAutomation: true,
						values: {
							margemReal: "50.000",
							margemDePerda: "50.000",
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
							price: "R$ 16.150",
							couponCode: "NEW5CINCOSP",
						},
						url: "",
					},
					{
						key: "D5-P60",
						baseDays: 5,
						minDaysApproval: 60,
						allowsAutomation: false,
						values: {
							margemReal: "50.000",
							margemDePerda: "50.000",
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
							price: "R$ 15.300",
							couponCode: "NEW10CINCOD",
						},
						url: "https://checkout.5pi.com.br/pay/book-500-duo-5-dias-prazo-60-dias",
					},
					{
						key: "D5-P60-WITH-AUTOMATION",
						baseDays: 5,
						minDaysApproval: 60,
						allowsAutomation: true,
						values: {
							margemReal: "50.000",
							margemDePerda: "50.000",
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
							price: "R$ 15.300",
							couponCode: "NEW10CINCOD",
						},
						url: "",
					},
				],
			},
		],
	},
};
/* ===== Estado ===== */
const appState = {
	currentPlan: "plus",
	selectedBase: "D10", // 10 primeiro
	selectedMinDays: 60, // 60 primeiro
	allowsAutomation: false, // Não é o padrão
	isExpanded: false,
};
/* ===== UTM Helpers ===== */
function getPartnerUtmSource() {
	const path = window.location.pathname;
	const parceirosMatch = path.match(/^\/parceiros\/([^\/]+)/);
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
		const desiredKey = `${appState.selectedBase}-${appState.selectedMinDays === 0 ? "SP" : "P60"}-${appState.allowsAutomation ? "AUTO" : "NO_AUTO"}`;
		const selected =
			variants.find((v) => v.key === desiredKey) ||
			variants.find(
				(v) =>
					v.baseDays === (appState.selectedBase === "D5" ? 5 : 10) &&
					v.minDaysApproval === appState.selectedMinDays &&
					v.allowsAutomation === appState.allowsAutomation,
			) ||
			variants[0] ||
			{};
		// Selects
		const planOptions = [
			{
				key: "D10",
				label: "Mínimo 10 dias operados",
				isSelected: appState.selectedBase === "D10",
			},
			{
				key: "D5",
				label: "Mínimo 5 dias operados",
				isSelected: appState.selectedBase === "D5",
			},
		];
		const approvalOptions = [
			{ minDaysApproval: 60, isSelected: appState.selectedMinDays === 60 },
			{ minDaysApproval: 0, isSelected: appState.selectedMinDays === 0 },
		];
		const automationOptions = [
			{ allowsAutomation: false, isSelected: !appState.allowsAutomation },
			{ allowsAutomation: true, isSelected: appState.allowsAutomation },
		];
		const L = card.labels || {};
		const V = selected.values || {};
		const P = selected.pricing || {};
		const margemRealFmt = formatBRInt(V.margemReal);
		const margemDePerdaFmt = formatBRInt(V.margemDePerda);
		const metaParaAprovacaoText =
			appState.selectedMinDays === 60 ? `R$ ${margemRealFmt}` : "Sem meta";
		const couponExists = hasRealCoupon(P.couponCode);
		const couponClean = couponExists ? normalizeCoupon(P.couponCode) : null;
		return {
			name: card.name,
			planOptions,
			approvalOptions,
			automationOptions,
			fields: {
				labels: {
					margemReal: L.margemReal,
					margemDePerda: L.margemDePerda,
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
	return { tabs, cards, isExpanded: appState.isExpanded };
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
	document.querySelectorAll(".plan-combobox").forEach((sel) => {
		sel.addEventListener("change", (e) => {
			appState.selectedBase = e.target.value;
			reRenderOffers();
		});
	});
	document.querySelectorAll(".approval-combobox").forEach((sel) => {
		sel.addEventListener("change", (e) => {
			appState.selectedMinDays = parseInt(e.target.value, 10) || 0;
			reRenderOffers();
		});
	});
	document.querySelectorAll(".automation-combobox").forEach((sel) => {
		sel.addEventListener("change", (e) => {
			appState.allowsAutomation = e.target.value === "true";
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
	// Open/close tooltip containers
	document.addEventListener("click", (e) => {
		const openTooltipButton = e.target.closest(
			".open-tooltip-button[data-target]",
		);
		if (openTooltipButton) {
			e.preventDefault();
			const targetId = openTooltipButton.getAttribute("data-target");
			if (targetId) {
				const tooltip = document.getElementById(targetId);
				if (tooltip) {
					tooltip.classList.toggle("hidden");
				}
			}
			return;
		}

		const closeTooltipButton = e.target.closest(".close-tooltip-button");
		if (closeTooltipButton) {
			e.preventDefault();
			const container = closeTooltipButton.closest(".offers-tooltip-container");
			if (container) {
				container.classList.add("hidden");
			}
			return;
		}
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
