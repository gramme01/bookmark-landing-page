//cacheDOM
const toggleBtn = document.querySelector(".brand__toggle");
const logo = document.querySelector(".brand__logo");
const topBar = document.querySelector(".brand");
const navbar = document.querySelector(".navbar");
const showLinks = document.querySelector(".navbar__links");
const navLinks = document.querySelectorAll(".navlinks__link");
const tabtitle = document.querySelectorAll(".tab-head__title");
const tabcontent = document.querySelectorAll(".tab");
const acdnHead = document.querySelectorAll(".accordion__head");

//************
//Define Event Functions
//************
const scrolledNavbar = () => {
	if (
		(document.body.scrollTop > 105 ||
			document.documentElement.scrollTop > 105) &&
		!navbar.classList.contains("navbar--overlay")
	) {
		navbar.classList.add("navbar--scrolled");
		topBar.classList.add("brand--scrolled");
	} else {
		navbar.classList.remove("navbar--scrolled");
		topBar.classList.remove("brand--scrolled");
	}
};

const mobileToggle = () => {
	for (let i = 0; i < 3; i++) {
		//hamburgerToggle
		toggleBtn.children[i].classList.toggle("brand__bar--close");
	}
	logo.classList.toggle("brand__logo--mobile");
	navbar.classList.toggle("navbar--overlay");
	showLinks.classList.toggle("navbar__links--active");
	scrolledNavbar();
};

const closeOverlay = () => {
	logo.classList.remove("brand__logo--mobile");
	navbar.classList.remove("navbar--overlay");
	showLinks.classList.remove("navbar__links--active");
	scrolledNavbar();
};

let activeLinkToggle = e => {
	let navLinksActive = document.getElementsByClassName(
		"navlinks__link--active"
	);
	navLinksActive[0].classList.remove("navlinks__link--active");
	e.target.classList.add("navlinks__link--active");
	setTimeout(closeOverlay, 400);
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
		panel.style.maxHeight = panel.scrollHeight + 20 + "px";
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
		e.target.href.indexOf("#null") == -1 &&
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV2ZW50TGlzdGVuZXJzLmpzIiwic2Nyb2xsQW5pbWF0aW9uLmpzIiwidmFsaWRhdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFsbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vY2FjaGVET01cclxuY29uc3QgdG9nZ2xlQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5icmFuZF9fdG9nZ2xlXCIpO1xyXG5jb25zdCBsb2dvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5icmFuZF9fbG9nb1wiKTtcclxuY29uc3QgdG9wQmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5icmFuZFwiKTtcclxuY29uc3QgbmF2YmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5uYXZiYXJcIik7XHJcbmNvbnN0IHNob3dMaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubmF2YmFyX19saW5rc1wiKTtcclxuY29uc3QgbmF2TGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLm5hdmxpbmtzX19saW5rXCIpO1xyXG5jb25zdCB0YWJ0aXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudGFiLWhlYWRfX3RpdGxlXCIpO1xyXG5jb25zdCB0YWJjb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi50YWJcIik7XHJcbmNvbnN0IGFjZG5IZWFkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5hY2NvcmRpb25fX2hlYWRcIik7XHJcblxyXG4vLyoqKioqKioqKioqKlxyXG4vL0RlZmluZSBFdmVudCBGdW5jdGlvbnNcclxuLy8qKioqKioqKioqKipcclxuY29uc3Qgc2Nyb2xsZWROYXZiYXIgPSAoKSA9PiB7XHJcblx0aWYgKFxyXG5cdFx0KGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wID4gMTA1IHx8XHJcblx0XHRcdGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AgPiAxMDUpICYmXHJcblx0XHQhbmF2YmFyLmNsYXNzTGlzdC5jb250YWlucyhcIm5hdmJhci0tb3ZlcmxheVwiKVxyXG5cdCkge1xyXG5cdFx0bmF2YmFyLmNsYXNzTGlzdC5hZGQoXCJuYXZiYXItLXNjcm9sbGVkXCIpO1xyXG5cdFx0dG9wQmFyLmNsYXNzTGlzdC5hZGQoXCJicmFuZC0tc2Nyb2xsZWRcIik7XHJcblx0fSBlbHNlIHtcclxuXHRcdG5hdmJhci5jbGFzc0xpc3QucmVtb3ZlKFwibmF2YmFyLS1zY3JvbGxlZFwiKTtcclxuXHRcdHRvcEJhci5jbGFzc0xpc3QucmVtb3ZlKFwiYnJhbmQtLXNjcm9sbGVkXCIpO1xyXG5cdH1cclxufTtcclxuXHJcbmNvbnN0IG1vYmlsZVRvZ2dsZSA9ICgpID0+IHtcclxuXHRmb3IgKGxldCBpID0gMDsgaSA8IDM7IGkrKykge1xyXG5cdFx0Ly9oYW1idXJnZXJUb2dnbGVcclxuXHRcdHRvZ2dsZUJ0bi5jaGlsZHJlbltpXS5jbGFzc0xpc3QudG9nZ2xlKFwiYnJhbmRfX2Jhci0tY2xvc2VcIik7XHJcblx0fVxyXG5cdGxvZ28uY2xhc3NMaXN0LnRvZ2dsZShcImJyYW5kX19sb2dvLS1tb2JpbGVcIik7XHJcblx0bmF2YmFyLmNsYXNzTGlzdC50b2dnbGUoXCJuYXZiYXItLW92ZXJsYXlcIik7XHJcblx0c2hvd0xpbmtzLmNsYXNzTGlzdC50b2dnbGUoXCJuYXZiYXJfX2xpbmtzLS1hY3RpdmVcIik7XHJcblx0c2Nyb2xsZWROYXZiYXIoKTtcclxufTtcclxuXHJcbmNvbnN0IGNsb3NlT3ZlcmxheSA9ICgpID0+IHtcclxuXHRsb2dvLmNsYXNzTGlzdC5yZW1vdmUoXCJicmFuZF9fbG9nby0tbW9iaWxlXCIpO1xyXG5cdG5hdmJhci5jbGFzc0xpc3QucmVtb3ZlKFwibmF2YmFyLS1vdmVybGF5XCIpO1xyXG5cdHNob3dMaW5rcy5jbGFzc0xpc3QucmVtb3ZlKFwibmF2YmFyX19saW5rcy0tYWN0aXZlXCIpO1xyXG5cdHNjcm9sbGVkTmF2YmFyKCk7XHJcbn07XHJcblxyXG5sZXQgYWN0aXZlTGlua1RvZ2dsZSA9IGUgPT4ge1xyXG5cdGxldCBuYXZMaW5rc0FjdGl2ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXHJcblx0XHRcIm5hdmxpbmtzX19saW5rLS1hY3RpdmVcIlxyXG5cdCk7XHJcblx0bmF2TGlua3NBY3RpdmVbMF0uY2xhc3NMaXN0LnJlbW92ZShcIm5hdmxpbmtzX19saW5rLS1hY3RpdmVcIik7XHJcblx0ZS50YXJnZXQuY2xhc3NMaXN0LmFkZChcIm5hdmxpbmtzX19saW5rLS1hY3RpdmVcIik7XHJcblx0c2V0VGltZW91dChjbG9zZU92ZXJsYXksIDQwMCk7XHJcbn07XHJcblxyXG4vL0ZlYXR1cmVzIFNlY3Rpb25cclxubGV0IHRhYk1lbnVUb2dnbGUgPSBlID0+IHtcclxuXHRsZXQgdGFidGl0bGVBY3RpdmUgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFxyXG5cdFx0XCJ0YWItaGVhZF9fdGl0bGUtLWFjdGl2ZVwiXHJcblx0KTtcclxuXHRsZXQgdGFiY29udGVudEFjdGl2ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIgLnRhYi0tYWN0aXZlXCIpO1xyXG5cclxuXHR0YWJ0aXRsZUFjdGl2ZVswXS5jbGFzc0xpc3QucmVtb3ZlKFwidGFiLWhlYWRfX3RpdGxlLS1hY3RpdmVcIik7XHJcblx0ZS50YXJnZXQuY2xhc3NMaXN0LnRvZ2dsZShcInRhYi1oZWFkX190aXRsZS0tYWN0aXZlXCIpO1xyXG5cclxuXHRsZXQgaWQgPSBlLnRhcmdldC5pZDtcclxuXHR0YWJjb250ZW50QWN0aXZlLmNsYXNzTGlzdC5yZW1vdmUoXCJ0YWItLWFjdGl2ZVwiKTtcclxuXHRmb3IgKGxldCBpID0gMDsgaSA8IHRhYmNvbnRlbnQubGVuZ3RoOyBpKyspIHtcclxuXHRcdGlmICh0YWJjb250ZW50W2ldLmlkID09IGB0YWItJHtpZH1gKSB7XHJcblx0XHRcdHRhYmNvbnRlbnRbaV0uY2xhc3NMaXN0LmFkZChcInRhYi0tYWN0aXZlXCIpO1xyXG5cdFx0fVxyXG5cdH1cclxufTtcclxuXHJcbi8vQWNjb3JkaW9uXHJcbmxldCBhY2RuVG9nZ2xlID0gZSA9PiB7XHJcblx0bGV0IHBhbmVsID0gZS50YXJnZXQubmV4dEVsZW1lbnRTaWJsaW5nO1xyXG5cdGxldCBhY2RuSGVhZEFjdGl2ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWNjb3JkaW9uX19oZWFkLS1hY3RpdmVcIik7XHJcblx0bGV0IHBhbmVsQWN0aXZlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hY2NvcmRpb25fX3BhbmVsLS1hY3RpdmVcIik7XHJcblx0aWYgKGFjZG5IZWFkQWN0aXZlICE9PSBudWxsICYmIGFjZG5IZWFkQWN0aXZlICE9PSBlLnRhcmdldCkge1xyXG5cdFx0YWNkbkhlYWRBY3RpdmUuY2xhc3NMaXN0LnJlbW92ZShcImFjY29yZGlvbl9faGVhZC0tYWN0aXZlXCIpO1xyXG5cdFx0cGFuZWxBY3RpdmUuY2xhc3NMaXN0LnJlbW92ZShcImFjY29yZGlvbl9fcGFuZWwtLWFjdGl2ZVwiKTtcclxuXHRcdHBhbmVsQWN0aXZlLnN0eWxlLm1heEhlaWdodCA9IG51bGw7XHJcblx0fVxyXG5cclxuXHRlLnRhcmdldC5jbGFzc0xpc3QudG9nZ2xlKFwiYWNjb3JkaW9uX19oZWFkLS1hY3RpdmVcIik7XHJcblxyXG5cdGlmIChwYW5lbC5jbGFzc0xpc3QuY29udGFpbnMoXCJhY2NvcmRpb25fX3BhbmVsLS1hY3RpdmVcIikpIHtcclxuXHRcdHBhbmVsLmNsYXNzTGlzdC5yZW1vdmUoXCJhY2NvcmRpb25fX3BhbmVsLS1hY3RpdmVcIik7XHJcblx0XHRwYW5lbC5zdHlsZS5tYXhIZWlnaHQgPSBudWxsO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRwYW5lbC5jbGFzc0xpc3QuYWRkKFwiYWNjb3JkaW9uX19wYW5lbC0tYWN0aXZlXCIpO1xyXG5cdFx0cGFuZWwuc3R5bGUubWF4SGVpZ2h0ID0gcGFuZWwuc2Nyb2xsSGVpZ2h0ICsgMjAgKyBcInB4XCI7XHJcblx0fVxyXG59O1xyXG5cclxuLy8qKioqKioqKioqKipcclxuLy9BZGQgRXZlbnQgTGlzdGVuZXJzXHJcbi8vKioqKioqKioqKioqXHJcbndpbmRvdy5vbnNjcm9sbCA9IGZ1bmN0aW9uKCkge1xyXG5cdHNjcm9sbGVkTmF2YmFyKCk7XHJcbn07XHJcblxyXG50b2dnbGVCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG1vYmlsZVRvZ2dsZSk7XHJcblxyXG5mb3IgKGxldCBpID0gMDsgaSA8IG5hdkxpbmtzLmxlbmd0aDsgaSsrKSB7XHJcblx0bmF2TGlua3NbaV0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGFjdGl2ZUxpbmtUb2dnbGUpO1xyXG59XHJcblxyXG5mb3IgKGxldCBpID0gMDsgaSA8IHRhYnRpdGxlLmxlbmd0aDsgaSsrKSB7XHJcblx0dGFidGl0bGVbaV0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRhYk1lbnVUb2dnbGUpO1xyXG59XHJcblxyXG5mb3IgKGxldCBpID0gMDsgaSA8IGFjZG5IZWFkLmxlbmd0aDsgaSsrKSB7XHJcblx0YWNkbkhlYWRbaV0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGFjZG5Ub2dnbGUpO1xyXG59XHJcbiIsImNvbnN0IHNjcm9sbEFuY2hvcnMgPSAoZSwgcmVzcG9uZCA9IG51bGwpID0+IHtcclxuXHRjb25zdCBkaXN0YW5jZVRvVG9wID0gZWwgPT4gTWF0aC5mbG9vcihlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3ApO1xyXG5cclxuXHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0Y29uc3QgdGFyZ2V0SUQgPSByZXNwb25kXHJcblx0XHQ/IHJlc3BvbmQuZ2V0QXR0cmlidXRlKFwiaHJlZlwiKVxyXG5cdFx0OiB0aGlzLmdldEF0dHJpYnV0ZShcImhyZWZcIik7XHJcblx0Y29uc3QgdGFyZ2V0QW5jaG9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXRJRCk7XHJcblxyXG5cdGlmICghdGFyZ2V0QW5jaG9yKSByZXR1cm47XHJcblxyXG5cdGNvbnN0IG9yaWdpbmFsVG9wID0gZGlzdGFuY2VUb1RvcCh0YXJnZXRBbmNob3IpO1xyXG5cdHdpbmRvdy5zY3JvbGxCeSh7IHRvcDogb3JpZ2luYWxUb3AsIGxlZnQ6IDAsIGJlaGF2aW9yOiBcInNtb290aFwiIH0pO1xyXG5cclxuXHRjb25zdCBjaGVja0lmRG9uZSA9IHNldEludGVydmFsKCgpID0+IHtcclxuXHRcdGNvbnN0IGF0Qm90dG9tID1cclxuXHRcdFx0d2luZG93LmlubmVySGVpZ2h0ICsgd2luZG93LnBhZ2VZT2Zmc2V0ID49XHJcblx0XHRcdGRvY3VtZW50LmJvZHkub2Zmc2V0SGVpZ2h0IC0gMjtcclxuXHRcdGlmIChkaXN0YW5jZVRvVG9wKHRhcmdldEFuY2hvcikgPT09IDAgfHwgYXRCb3R0b20pIHtcclxuXHRcdFx0dGFyZ2V0QW5jaG9yLnRhYkluZGV4ID0gXCItMVwiO1xyXG5cdFx0XHR0YXJnZXRBbmNob3IuZm9jdXMoKTtcclxuXHJcblx0XHRcdGlmIChcImhpc3RvcnlcIiBpbiB3aW5kb3cpIHtcclxuXHRcdFx0XHR3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUoXCJcIiwgXCJcIiwgdGFyZ2V0SUQpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHdpbmRvdy5sb2NhdGlvbiA9IHRhcmdldElEO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRjbGVhckludGVydmFsKGNoZWNrSWZEb25lKTtcclxuXHRcdH1cclxuXHR9LCAxMDApO1xyXG59O1xyXG5cclxuY29uc3Qgc2Nyb2xsQW5pbWF0aW9uID0gZSA9PiB7XHJcblx0aWYgKGUudGFyZ2V0LnRhZ05hbWUgIT09IFwiQVwiKSByZXR1cm47XHJcblx0aWYgKFxyXG5cdFx0ZS50YXJnZXQuaHJlZiAmJlxyXG5cdFx0ZS50YXJnZXQuaHJlZi5pbmRleE9mKFwiI1wiKSAhPSAtMSAmJlxyXG5cdFx0ZS50YXJnZXQuaHJlZi5pbmRleE9mKFwiI251bGxcIikgPT0gLTEgJiZcclxuXHRcdChlLnRhcmdldC5wYXRobmFtZSA9PSBsb2NhdGlvbi5wYXRobmFtZSB8fFxyXG5cdFx0XHRcIi9cIiArIGUudGFyZ2V0LnBhdGhuYW1lID09IGxvY2F0aW9uLnBhdGhuYW1lKSAmJlxyXG5cdFx0ZS50YXJnZXQuc2VhcmNoID09IGxvY2F0aW9uLnNlYXJjaFxyXG5cdCkge1xyXG5cdFx0c2Nyb2xsQW5jaG9ycyhlLCBlLnRhcmdldCk7XHJcblx0fVxyXG59O1xyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHNjcm9sbEFuaW1hdGlvbik7XHJcbiIsIi8vY2FjaGVET01cclxuY29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZm9ybVwiKTtcclxuY29uc3QgZm9ybUlucHV0ID0gZm9ybS5xdWVyeVNlbGVjdG9yKFwiLmZvcm1fX2lucHV0XCIpO1xyXG5jb25zdCBmb3JtU3VibWl0ID0gZm9ybS5xdWVyeVNlbGVjdG9yKFwiLmZvcm1fX2J0blwiKTtcclxuY29uc3QgZXJyb3JNc2cgPSBmb3JtLnF1ZXJ5U2VsZWN0b3IoXCIuZm9ybV9fZXJyb3JcIik7XHJcbmNvbnN0IHdhcm5JY29uID0gZm9ybS5xdWVyeVNlbGVjdG9yKFwiLmZvcm1fX3dhcm5pbmdcIik7XHJcblxyXG4vLyBjb25zb2xlLmxvZyhmb3JtKTtcclxuXHJcbmNvbnN0IHZhbGlkYXRlRW1haWwgPSBlID0+IHtcclxuXHRjb25zdCBtYWlsZm9ybWF0ID0gL15cXHcrKFtcXC4tXT9cXHcrKSpAXFx3KyhbXFwuLV0/XFx3KykqKFxcLlxcd3syLDN9KSskLztcclxuXHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0aWYgKGZvcm1JbnB1dC52YWx1ZS5tYXRjaChtYWlsZm9ybWF0KSkge1xyXG5cdFx0ZXJyb3JNc2cuY2xhc3NMaXN0LnJlbW92ZShcImZvcm1fX2Vycm9yLS1hY3RpdmVcIik7XHJcblx0XHRlcnJvck1zZy5zdHlsZS5tYXhIZWlnaHQgPSAwO1xyXG5cdFx0Zm9ybUlucHV0LmNsYXNzTGlzdC5yZW1vdmUoXCJmb3JtX19pbnB1dC0tZXJyb3JcIik7XHJcblx0XHR3YXJuSWNvbi5jbGFzc0xpc3QucmVtb3ZlKFwiZm9ybV9fd2FybmluZy0tZXJyb3JcIik7XHJcblx0XHR3YXJuSWNvbi5jbGFzc0xpc3QuYWRkKFwiZm9ybV9fd2FybmluZy0tY29ycmVjdFwiKTtcclxuXHRcdGZvcm1JbnB1dC5ibHVyKCk7XHJcblx0XHQvL2NvZGUgdG8gc3RpbmdpZnkgYW5kIHNlbmQgZm9ybVxyXG5cdFx0Zm9ybUlucHV0LnZhbHVlID0gXCJcIjtcclxuXHRcdHJldHVybiB0cnVlO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRlcnJvck1zZy5jbGFzc0xpc3QuYWRkKFwiZm9ybV9fZXJyb3ItLWFjdGl2ZVwiKTtcclxuXHRcdGVycm9yTXNnLnN0eWxlLm1heEhlaWdodCA9IGVycm9yTXNnLnNjcm9sbEhlaWdodCArIDIgKyBcInB4XCI7XHJcblx0XHRmb3JtSW5wdXQuY2xhc3NMaXN0LmFkZChcImZvcm1fX2lucHV0LS1lcnJvclwiKTtcclxuXHRcdHdhcm5JY29uLmNsYXNzTGlzdC5hZGQoXCJmb3JtX193YXJuaW5nLS1lcnJvclwiKTtcclxuXHRcdGZvcm1JbnB1dC5mb2N1cygpO1xyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH1cclxufTtcclxuXHJcbi8vYWRkIEV2ZW50XHJcbmZvcm1TdWJtaXQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHZhbGlkYXRlRW1haWwpO1xyXG4iXX0=
