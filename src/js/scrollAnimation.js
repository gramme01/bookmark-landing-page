const scrollAnchors = (e, respond = null) => {
	const distanceToTop = el => Math.floor(el.getBoundingClientRect().top);

	e.preventDefault();
	const targetID = respond
		? respond.getAttribute("href")
		: this.getAttribute("href");
	const targetAnchor = document.querySelector(targetID);

	if (!targetAnchor) return;

	const originalTop = distanceToTop(targetAnchor);
	window.scrollBy({ top: originalTop - 100, left: 0, behavior: "smooth" });

	const checkIfDone = setInterval(() => {
		const atBottom =
			window.innerHeight + window.pageYOffset >=
			document.body.offsetHeight - 2;
		if (distanceToTop(targetAnchor) === 0 || atBottom) {
			targetAnchor.tabIndex = "-1";

			if ("history" in window) {
				window.history.pushState("", "", targetID);
			} else {
				window.location = targetID;
			}

			clearInterval(checkIfDone);
		}
	}, 100);
};

const scrollAnimation = e => {
	if (e.target.tagName !== "A") return;
	if (
		e.target.href &&
		e.target.href.indexOf("#") != -1 &&
		e.target.href.indexOf("#null") == -1 &&
		(e.target.pathname == location.pathname ||
			"/" + e.target.pathname == location.pathname) &&
		e.target.search == location.search
	) {
		scrollAnchors(e, e.target);
	}
};

document.addEventListener("click", scrollAnimation);
