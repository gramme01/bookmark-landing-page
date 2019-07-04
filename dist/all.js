//cacheDOM
const toggleBtn = document.querySelector(".brand__toggle");
const logo = document.querySelector(".brand__logo");
const topBar = document.querySelector(".brand");
const overlay = document.querySelector(".navbar");
const showLinks = document.querySelector(".navbar__links");
const navLinks = document.querySelectorAll(".navlinks__link");
const tabtitle = document.querySelectorAll(".tab-head__title");
const tabcontent = document.querySelectorAll(".tab");
const acdnHead = document.querySelectorAll(".accordion__head");

// console.log(allNavItem);

//************
//Define Event Functions
//************
const scrolledNavbar = () => {
	(document.body.scrollTop > 105 ||
		document.documentElement.scrollTop > 105) &&
	!overlay.classList.contains("navbar--overlay")
		? topBar.classList.add("brand--scrolled")
		: topBar.classList.remove("brand--scrolled");
};

const mobileToggle = () => {
	for (let i = 0; i < 3; i++) {
		//hamburgerToggle
		toggleBtn.children[i].classList.toggle("brand__bar--close");
	}
	logo.classList.toggle("brand__logo--mobile");
	overlay.classList.toggle("navbar--overlay");
	showLinks.classList.toggle("navbar__links--active");
	scrolledNavbar();
};

let activeLinkToggle = e => {
	let navLinksActive = document.getElementsByClassName(
		"navlinks__link--active"
	);
	navLinksActive[0].classList.remove("navlinks__link--active");
	e.target.classList.add("navlinks__link--active");
	setTimeout(mobileToggle, 400);
};

//Features Section
let tabMenuToggle = e => {
	let tabtitleActive = document.getElementsByClassName(
		"tab-head__title--active"
	);
	let tabcontentActive = document.querySelector(" .tab--active");

	tabtitleActive[0].classList.remove("tab-head__title--active");
	e.target.classList.toggle("tab-head__title--active");

	let id = e.target.id;
	tabcontentActive.classList.remove("tab--active");
	for (let i = 0; i < tabcontent.length; i++) {
		if (tabcontent[i].id == `tab-${id}`) {
			tabcontent[i].classList.add("tab--active");
		}
	}
};

//Accordion
let acdnToggle = e => {
	let panel = e.target.nextElementSibling;
	let acdnHeadActive = document.querySelector(".accordion__head--active");
	let panelActive = document.querySelector(".accordion__panel--active");
	console.log(acdnHeadActive, panelActive);
	if (acdnHeadActive !== null && acdnHeadActive !== e.target) {
		acdnHeadActive.classList.remove("accordion__head--active");
		panelActive.classList.remove("accordion__panel--active");
		panelActive.style.maxHeight = null;
	}

	e.target.classList.toggle("accordion__head--active");

	if (panel.classList.contains("accordion__panel--active")) {
		panel.classList.remove("accordion__panel--active");
		panel.style.maxHeight = null;
	} else {
		panel.classList.add("accordion__panel--active");
		panel.style.maxHeight = panel.scrollHeight + "px";
	}
};

//************
//Add Event Listeners
//************
window.onscroll = function() {
	scrolledNavbar();
};

toggleBtn.addEventListener("click", mobileToggle);

for (let i = 0; i < navLinks.length; i++) {
	navLinks[i].addEventListener("click", activeLinkToggle);
}

for (let i = 0; i < tabtitle.length; i++) {
	tabtitle[i].addEventListener("click", tabMenuToggle);
}

for (let i = 0; i < acdnHead.length; i++) {
	acdnHead[i].addEventListener("click", acdnToggle);
}

const scrollAnchors = (e, respond = null) => {
	const distanceToTop = el => Math.floor(el.getBoundingClientRect().top);

	e.preventDefault();
	const targetID = respond
		? respond.getAttribute("href")
		: this.getAttribute("href");
	const targetAnchor = document.querySelector(targetID);

	if (!targetAnchor) return;

	const originalTop = distanceToTop(targetAnchor);
	window.scrollBy({ top: originalTop, left: 0, behavior: "smooth" });

	const checkIfDone = setInterval(() => {
		const atBottom =
			window.innerHeight + window.pageYOffset >=
			document.body.offsetHeight - 2;
		if (distanceToTop(targetAnchor) === 0 || atBottom) {
			targetAnchor.tabIndex = "-1";
			targetAnchor.focus();

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
		(e.target.pathname == location.pathname ||
			"/" + e.target.pathname == location.pathname) &&
		e.target.search == location.search
	) {
		scrollAnchors(e, e.target);
	}
};

document.addEventListener("click", scrollAnimation);

//cacheDOM
const form = document.querySelector(".form");
const formInput = form.querySelector(".form__input");
const formSubmit = form.querySelector(".form__btn");
const errorMsg = form.querySelector(".form__error");
const warnIcon = form.querySelector(".form__warning");

// console.log(form);

const validateEmail = e => {
	const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	e.preventDefault();
	if (formInput.value.match(mailformat)) {
		errorMsg.classList.remove("form__error--active");
		errorMsg.style.maxHeight = 0;
		formInput.classList.remove("form__input--error");
		warnIcon.classList.remove("form__warning--error");
		warnIcon.classList.add("form__warning--correct");
		formInput.blur();
		//code to stingify and send form
		formInput.value = "";
		return true;
	} else {
		e.preventDefault();
		errorMsg.classList.add("form__error--active");
		errorMsg.style.maxHeight = errorMsg.scrollHeight + 2 + "px";
		formInput.classList.add("form__input--error");
		warnIcon.classList.add("form__warning--error");
		formInput.focus();
		return false;
	}
};

//add Event
formSubmit.addEventListener("click", validateEmail);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV2ZW50TGlzdGVuZXJzLmpzIiwic2Nyb2xsQW5pbWF0aW9uLmpzIiwidmFsaWRhdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDMUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQy9DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYWxsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy9jYWNoZURPTVxyXG5jb25zdCB0b2dnbGVCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJyYW5kX190b2dnbGVcIik7XHJcbmNvbnN0IGxvZ28gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJyYW5kX19sb2dvXCIpO1xyXG5jb25zdCB0b3BCYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJyYW5kXCIpO1xyXG5jb25zdCBvdmVybGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5uYXZiYXJcIik7XHJcbmNvbnN0IHNob3dMaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubmF2YmFyX19saW5rc1wiKTtcclxuY29uc3QgbmF2TGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLm5hdmxpbmtzX19saW5rXCIpO1xyXG5jb25zdCB0YWJ0aXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudGFiLWhlYWRfX3RpdGxlXCIpO1xyXG5jb25zdCB0YWJjb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi50YWJcIik7XHJcbmNvbnN0IGFjZG5IZWFkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5hY2NvcmRpb25fX2hlYWRcIik7XHJcblxyXG4vLyBjb25zb2xlLmxvZyhhbGxOYXZJdGVtKTtcclxuXHJcbi8vKioqKioqKioqKioqXHJcbi8vRGVmaW5lIEV2ZW50IEZ1bmN0aW9uc1xyXG4vLyoqKioqKioqKioqKlxyXG5jb25zdCBzY3JvbGxlZE5hdmJhciA9ICgpID0+IHtcclxuXHQoZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AgPiAxMDUgfHxcclxuXHRcdGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AgPiAxMDUpICYmXHJcblx0IW92ZXJsYXkuY2xhc3NMaXN0LmNvbnRhaW5zKFwibmF2YmFyLS1vdmVybGF5XCIpXHJcblx0XHQ/IHRvcEJhci5jbGFzc0xpc3QuYWRkKFwiYnJhbmQtLXNjcm9sbGVkXCIpXHJcblx0XHQ6IHRvcEJhci5jbGFzc0xpc3QucmVtb3ZlKFwiYnJhbmQtLXNjcm9sbGVkXCIpO1xyXG59O1xyXG5cclxuY29uc3QgbW9iaWxlVG9nZ2xlID0gKCkgPT4ge1xyXG5cdGZvciAobGV0IGkgPSAwOyBpIDwgMzsgaSsrKSB7XHJcblx0XHQvL2hhbWJ1cmdlclRvZ2dsZVxyXG5cdFx0dG9nZ2xlQnRuLmNoaWxkcmVuW2ldLmNsYXNzTGlzdC50b2dnbGUoXCJicmFuZF9fYmFyLS1jbG9zZVwiKTtcclxuXHR9XHJcblx0bG9nby5jbGFzc0xpc3QudG9nZ2xlKFwiYnJhbmRfX2xvZ28tLW1vYmlsZVwiKTtcclxuXHRvdmVybGF5LmNsYXNzTGlzdC50b2dnbGUoXCJuYXZiYXItLW92ZXJsYXlcIik7XHJcblx0c2hvd0xpbmtzLmNsYXNzTGlzdC50b2dnbGUoXCJuYXZiYXJfX2xpbmtzLS1hY3RpdmVcIik7XHJcblx0c2Nyb2xsZWROYXZiYXIoKTtcclxufTtcclxuXHJcbmxldCBhY3RpdmVMaW5rVG9nZ2xlID0gZSA9PiB7XHJcblx0bGV0IG5hdkxpbmtzQWN0aXZlID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcclxuXHRcdFwibmF2bGlua3NfX2xpbmstLWFjdGl2ZVwiXHJcblx0KTtcclxuXHRuYXZMaW5rc0FjdGl2ZVswXS5jbGFzc0xpc3QucmVtb3ZlKFwibmF2bGlua3NfX2xpbmstLWFjdGl2ZVwiKTtcclxuXHRlLnRhcmdldC5jbGFzc0xpc3QuYWRkKFwibmF2bGlua3NfX2xpbmstLWFjdGl2ZVwiKTtcclxuXHRzZXRUaW1lb3V0KG1vYmlsZVRvZ2dsZSwgNDAwKTtcclxufTtcclxuXHJcbi8vRmVhdHVyZXMgU2VjdGlvblxyXG5sZXQgdGFiTWVudVRvZ2dsZSA9IGUgPT4ge1xyXG5cdGxldCB0YWJ0aXRsZUFjdGl2ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXHJcblx0XHRcInRhYi1oZWFkX190aXRsZS0tYWN0aXZlXCJcclxuXHQpO1xyXG5cdGxldCB0YWJjb250ZW50QWN0aXZlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiAudGFiLS1hY3RpdmVcIik7XHJcblxyXG5cdHRhYnRpdGxlQWN0aXZlWzBdLmNsYXNzTGlzdC5yZW1vdmUoXCJ0YWItaGVhZF9fdGl0bGUtLWFjdGl2ZVwiKTtcclxuXHRlLnRhcmdldC5jbGFzc0xpc3QudG9nZ2xlKFwidGFiLWhlYWRfX3RpdGxlLS1hY3RpdmVcIik7XHJcblxyXG5cdGxldCBpZCA9IGUudGFyZ2V0LmlkO1xyXG5cdHRhYmNvbnRlbnRBY3RpdmUuY2xhc3NMaXN0LnJlbW92ZShcInRhYi0tYWN0aXZlXCIpO1xyXG5cdGZvciAobGV0IGkgPSAwOyBpIDwgdGFiY29udGVudC5sZW5ndGg7IGkrKykge1xyXG5cdFx0aWYgKHRhYmNvbnRlbnRbaV0uaWQgPT0gYHRhYi0ke2lkfWApIHtcclxuXHRcdFx0dGFiY29udGVudFtpXS5jbGFzc0xpc3QuYWRkKFwidGFiLS1hY3RpdmVcIik7XHJcblx0XHR9XHJcblx0fVxyXG59O1xyXG5cclxuLy9BY2NvcmRpb25cclxubGV0IGFjZG5Ub2dnbGUgPSBlID0+IHtcclxuXHRsZXQgcGFuZWwgPSBlLnRhcmdldC5uZXh0RWxlbWVudFNpYmxpbmc7XHJcblx0bGV0IGFjZG5IZWFkQWN0aXZlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hY2NvcmRpb25fX2hlYWQtLWFjdGl2ZVwiKTtcclxuXHRsZXQgcGFuZWxBY3RpdmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFjY29yZGlvbl9fcGFuZWwtLWFjdGl2ZVwiKTtcclxuXHRjb25zb2xlLmxvZyhhY2RuSGVhZEFjdGl2ZSwgcGFuZWxBY3RpdmUpO1xyXG5cdGlmIChhY2RuSGVhZEFjdGl2ZSAhPT0gbnVsbCAmJiBhY2RuSGVhZEFjdGl2ZSAhPT0gZS50YXJnZXQpIHtcclxuXHRcdGFjZG5IZWFkQWN0aXZlLmNsYXNzTGlzdC5yZW1vdmUoXCJhY2NvcmRpb25fX2hlYWQtLWFjdGl2ZVwiKTtcclxuXHRcdHBhbmVsQWN0aXZlLmNsYXNzTGlzdC5yZW1vdmUoXCJhY2NvcmRpb25fX3BhbmVsLS1hY3RpdmVcIik7XHJcblx0XHRwYW5lbEFjdGl2ZS5zdHlsZS5tYXhIZWlnaHQgPSBudWxsO1xyXG5cdH1cclxuXHJcblx0ZS50YXJnZXQuY2xhc3NMaXN0LnRvZ2dsZShcImFjY29yZGlvbl9faGVhZC0tYWN0aXZlXCIpO1xyXG5cclxuXHRpZiAocGFuZWwuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYWNjb3JkaW9uX19wYW5lbC0tYWN0aXZlXCIpKSB7XHJcblx0XHRwYW5lbC5jbGFzc0xpc3QucmVtb3ZlKFwiYWNjb3JkaW9uX19wYW5lbC0tYWN0aXZlXCIpO1xyXG5cdFx0cGFuZWwuc3R5bGUubWF4SGVpZ2h0ID0gbnVsbDtcclxuXHR9IGVsc2Uge1xyXG5cdFx0cGFuZWwuY2xhc3NMaXN0LmFkZChcImFjY29yZGlvbl9fcGFuZWwtLWFjdGl2ZVwiKTtcclxuXHRcdHBhbmVsLnN0eWxlLm1heEhlaWdodCA9IHBhbmVsLnNjcm9sbEhlaWdodCArIFwicHhcIjtcclxuXHR9XHJcbn07XHJcblxyXG4vLyoqKioqKioqKioqKlxyXG4vL0FkZCBFdmVudCBMaXN0ZW5lcnNcclxuLy8qKioqKioqKioqKipcclxud2luZG93Lm9uc2Nyb2xsID0gZnVuY3Rpb24oKSB7XHJcblx0c2Nyb2xsZWROYXZiYXIoKTtcclxufTtcclxuXHJcbnRvZ2dsZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgbW9iaWxlVG9nZ2xlKTtcclxuXHJcbmZvciAobGV0IGkgPSAwOyBpIDwgbmF2TGlua3MubGVuZ3RoOyBpKyspIHtcclxuXHRuYXZMaW5rc1tpXS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYWN0aXZlTGlua1RvZ2dsZSk7XHJcbn1cclxuXHJcbmZvciAobGV0IGkgPSAwOyBpIDwgdGFidGl0bGUubGVuZ3RoOyBpKyspIHtcclxuXHR0YWJ0aXRsZVtpXS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGFiTWVudVRvZ2dsZSk7XHJcbn1cclxuXHJcbmZvciAobGV0IGkgPSAwOyBpIDwgYWNkbkhlYWQubGVuZ3RoOyBpKyspIHtcclxuXHRhY2RuSGVhZFtpXS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYWNkblRvZ2dsZSk7XHJcbn1cclxuIiwiY29uc3Qgc2Nyb2xsQW5jaG9ycyA9IChlLCByZXNwb25kID0gbnVsbCkgPT4ge1xyXG5cdGNvbnN0IGRpc3RhbmNlVG9Ub3AgPSBlbCA9PiBNYXRoLmZsb29yKGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCk7XHJcblxyXG5cdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRjb25zdCB0YXJnZXRJRCA9IHJlc3BvbmRcclxuXHRcdD8gcmVzcG9uZC5nZXRBdHRyaWJ1dGUoXCJocmVmXCIpXHJcblx0XHQ6IHRoaXMuZ2V0QXR0cmlidXRlKFwiaHJlZlwiKTtcclxuXHRjb25zdCB0YXJnZXRBbmNob3IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldElEKTtcclxuXHJcblx0aWYgKCF0YXJnZXRBbmNob3IpIHJldHVybjtcclxuXHJcblx0Y29uc3Qgb3JpZ2luYWxUb3AgPSBkaXN0YW5jZVRvVG9wKHRhcmdldEFuY2hvcik7XHJcblx0d2luZG93LnNjcm9sbEJ5KHsgdG9wOiBvcmlnaW5hbFRvcCwgbGVmdDogMCwgYmVoYXZpb3I6IFwic21vb3RoXCIgfSk7XHJcblxyXG5cdGNvbnN0IGNoZWNrSWZEb25lID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG5cdFx0Y29uc3QgYXRCb3R0b20gPVxyXG5cdFx0XHR3aW5kb3cuaW5uZXJIZWlnaHQgKyB3aW5kb3cucGFnZVlPZmZzZXQgPj1cclxuXHRcdFx0ZG9jdW1lbnQuYm9keS5vZmZzZXRIZWlnaHQgLSAyO1xyXG5cdFx0aWYgKGRpc3RhbmNlVG9Ub3AodGFyZ2V0QW5jaG9yKSA9PT0gMCB8fCBhdEJvdHRvbSkge1xyXG5cdFx0XHR0YXJnZXRBbmNob3IudGFiSW5kZXggPSBcIi0xXCI7XHJcblx0XHRcdHRhcmdldEFuY2hvci5mb2N1cygpO1xyXG5cclxuXHRcdFx0aWYgKFwiaGlzdG9yeVwiIGluIHdpbmRvdykge1xyXG5cdFx0XHRcdHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZShcIlwiLCBcIlwiLCB0YXJnZXRJRCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0d2luZG93LmxvY2F0aW9uID0gdGFyZ2V0SUQ7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGNsZWFySW50ZXJ2YWwoY2hlY2tJZkRvbmUpO1xyXG5cdFx0fVxyXG5cdH0sIDEwMCk7XHJcbn07XHJcblxyXG5jb25zdCBzY3JvbGxBbmltYXRpb24gPSBlID0+IHtcclxuXHRpZiAoZS50YXJnZXQudGFnTmFtZSAhPT0gXCJBXCIpIHJldHVybjtcclxuXHRpZiAoXHJcblx0XHRlLnRhcmdldC5ocmVmICYmXHJcblx0XHRlLnRhcmdldC5ocmVmLmluZGV4T2YoXCIjXCIpICE9IC0xICYmXHJcblx0XHQoZS50YXJnZXQucGF0aG5hbWUgPT0gbG9jYXRpb24ucGF0aG5hbWUgfHxcclxuXHRcdFx0XCIvXCIgKyBlLnRhcmdldC5wYXRobmFtZSA9PSBsb2NhdGlvbi5wYXRobmFtZSkgJiZcclxuXHRcdGUudGFyZ2V0LnNlYXJjaCA9PSBsb2NhdGlvbi5zZWFyY2hcclxuXHQpIHtcclxuXHRcdHNjcm9sbEFuY2hvcnMoZSwgZS50YXJnZXQpO1xyXG5cdH1cclxufTtcclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBzY3JvbGxBbmltYXRpb24pO1xyXG4iLCIvL2NhY2hlRE9NXHJcbmNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZvcm1cIik7XHJcbmNvbnN0IGZvcm1JbnB1dCA9IGZvcm0ucXVlcnlTZWxlY3RvcihcIi5mb3JtX19pbnB1dFwiKTtcclxuY29uc3QgZm9ybVN1Ym1pdCA9IGZvcm0ucXVlcnlTZWxlY3RvcihcIi5mb3JtX19idG5cIik7XHJcbmNvbnN0IGVycm9yTXNnID0gZm9ybS5xdWVyeVNlbGVjdG9yKFwiLmZvcm1fX2Vycm9yXCIpO1xyXG5jb25zdCB3YXJuSWNvbiA9IGZvcm0ucXVlcnlTZWxlY3RvcihcIi5mb3JtX193YXJuaW5nXCIpO1xyXG5cclxuLy8gY29uc29sZS5sb2coZm9ybSk7XHJcblxyXG5jb25zdCB2YWxpZGF0ZUVtYWlsID0gZSA9PiB7XHJcblx0Y29uc3QgbWFpbGZvcm1hdCA9IC9eXFx3KyhbXFwuLV0/XFx3KykqQFxcdysoW1xcLi1dP1xcdyspKihcXC5cXHd7MiwzfSkrJC87XHJcblx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdGlmIChmb3JtSW5wdXQudmFsdWUubWF0Y2gobWFpbGZvcm1hdCkpIHtcclxuXHRcdGVycm9yTXNnLmNsYXNzTGlzdC5yZW1vdmUoXCJmb3JtX19lcnJvci0tYWN0aXZlXCIpO1xyXG5cdFx0ZXJyb3JNc2cuc3R5bGUubWF4SGVpZ2h0ID0gMDtcclxuXHRcdGZvcm1JbnB1dC5jbGFzc0xpc3QucmVtb3ZlKFwiZm9ybV9faW5wdXQtLWVycm9yXCIpO1xyXG5cdFx0d2Fybkljb24uY2xhc3NMaXN0LnJlbW92ZShcImZvcm1fX3dhcm5pbmctLWVycm9yXCIpO1xyXG5cdFx0d2Fybkljb24uY2xhc3NMaXN0LmFkZChcImZvcm1fX3dhcm5pbmctLWNvcnJlY3RcIik7XHJcblx0XHRmb3JtSW5wdXQuYmx1cigpO1xyXG5cdFx0Ly9jb2RlIHRvIHN0aW5naWZ5IGFuZCBzZW5kIGZvcm1cclxuXHRcdGZvcm1JbnB1dC52YWx1ZSA9IFwiXCI7XHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0ZXJyb3JNc2cuY2xhc3NMaXN0LmFkZChcImZvcm1fX2Vycm9yLS1hY3RpdmVcIik7XHJcblx0XHRlcnJvck1zZy5zdHlsZS5tYXhIZWlnaHQgPSBlcnJvck1zZy5zY3JvbGxIZWlnaHQgKyAyICsgXCJweFwiO1xyXG5cdFx0Zm9ybUlucHV0LmNsYXNzTGlzdC5hZGQoXCJmb3JtX19pbnB1dC0tZXJyb3JcIik7XHJcblx0XHR3YXJuSWNvbi5jbGFzc0xpc3QuYWRkKFwiZm9ybV9fd2FybmluZy0tZXJyb3JcIik7XHJcblx0XHRmb3JtSW5wdXQuZm9jdXMoKTtcclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9XHJcbn07XHJcblxyXG4vL2FkZCBFdmVudFxyXG5mb3JtU3VibWl0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB2YWxpZGF0ZUVtYWlsKTtcclxuIl19
