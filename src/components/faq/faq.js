const faqItems = [
	{
		position: 1,
		question: "Existe algum regulamento da mesa?",
		answer:
			"Sim. A 5PI possui um regulamento que define como funciona a operação na mesa proprietária: critérios de entrada, regras de consistência, limites de risco e processo para migrar para a conta real. O documento garante transparência e segurança para o trader e para a mesa.",
		link: {
			url: "https://www.thecampusqdl.com/uploads/files/pdf_sample_2.pdf",
			label: "Baixar regulamento",
		},
	},
	{
		position: 2,
		question: "Como a 5PI é diferente de uma corretora?",
		answer:
			"Na corretora você paga corretagem, taxa de custódia e assume 100% do risco. Na 5PI, essas taxas não existem, e o risco é gerenciado pela mesa.",
	},
	{
		position: 3,
		question: "Posso aumentar meu capital operacional ao longo do tempo?",
		answer:
			"Sim. À medida que você demonstra consistência, podemos ampliar seu limite de operação.",
	},
	{
		position: 4,
		question: "Posso operar mais de uma conta 5PI?",
		answer:
			"Sim. Nos planos de avaliação da 5PI, é permitido operar até 4 contas no mesmo CPF",
	},
	{
		position: 5,
		question: "Na 5PI tem drawdown?",
		answer:
			"Não existe Drawdown na 5P. Aqui na 5P nós só olhamos o resultado líquido realizado pelo cliente no relatório de performance.",
	},
	{
		position: 6,
		question: "Qual a politica de cancelamento da 5PI?",
		answer: `A 5PI Investimentos atua com total transparência e responsabilidade na prestação de seus serviços.<br><br>

O trader poderá solicitar a devolução do valor pago apenas nos casos em que fique comprovado algum problema no serviço prestado pela 5PI.<br><br>

Não haverá devolução, ressarcimento ou reembolso nas seguintes situações:<br>

<ul style="padding-top: 4px;">
<li>- Quando o trader atingir o limite total de perda acumulada, ocasionando sua eliminação da mesa proprietária.</li>
<li>- Após a liberação da plataforma pela Nelogica, uma vez que essa liberação gera custos operacionais e tecnológicos para a 5PI.</li>
</ul><br>

Ao contratar nossos serviços, o trader declara estar ciente e de acordo com as condições estabelecidas nesta Política de Cancelamento.`,
	},
];

const initFaqAccordion = () => {
	const faqContainer = document.querySelector(".faq-container");
	if (!faqContainer) return;

	const faqItemElements = faqContainer.querySelectorAll(".faq-item");

	const closeAllItems = () => {
		for (const item of faqItemElements) {
			item.classList.remove("active");
		}
	};

	for (const item of faqItemElements) {
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

	const anchors = Array.from(document.querySelectorAll(".navigation-header a"));

	const link = anchors.find((a) =>
		a.textContent.trim().toLowerCase().startsWith("regulamento"),
	);
	if (link.href) {
		document.querySelector(".faq-container a").href = link.href;
	}
};

window.addEventListener("DOMContentLoaded", () => {
	window.orion.renderTemplate({
		templateId: "faq-template",
		containerId: "faq-container",
		data: { items: faqItems },
		callback: initFaqAccordion,
	});
});
