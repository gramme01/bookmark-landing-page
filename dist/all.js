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
		console.log(e.target.href.indexOf("#1"));
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV2ZW50TGlzdGVuZXJzLmpzIiwic2Nyb2xsQW5pbWF0aW9uLmpzIiwidmFsaWRhdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNqREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFsbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vY2FjaGVET01cclxuY29uc3QgdG9nZ2xlQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5icmFuZF9fdG9nZ2xlXCIpO1xyXG5jb25zdCBsb2dvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5icmFuZF9fbG9nb1wiKTtcclxuY29uc3QgdG9wQmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5icmFuZFwiKTtcclxuY29uc3Qgb3ZlcmxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubmF2YmFyXCIpO1xyXG5jb25zdCBzaG93TGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm5hdmJhcl9fbGlua3NcIik7XHJcbmNvbnN0IG5hdkxpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5uYXZsaW5rc19fbGlua1wiKTtcclxuY29uc3QgdGFidGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnRhYi1oZWFkX190aXRsZVwiKTtcclxuY29uc3QgdGFiY29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudGFiXCIpO1xyXG5jb25zdCBhY2RuSGVhZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuYWNjb3JkaW9uX19oZWFkXCIpO1xyXG5cclxuLy8qKioqKioqKioqKipcclxuLy9EZWZpbmUgRXZlbnQgRnVuY3Rpb25zXHJcbi8vKioqKioqKioqKioqXHJcbmNvbnN0IHNjcm9sbGVkTmF2YmFyID0gKCkgPT4ge1xyXG5cdChkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCA+IDEwNSB8fFxyXG5cdFx0ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCA+IDEwNSkgJiZcclxuXHQhb3ZlcmxheS5jbGFzc0xpc3QuY29udGFpbnMoXCJuYXZiYXItLW92ZXJsYXlcIilcclxuXHRcdD8gdG9wQmFyLmNsYXNzTGlzdC5hZGQoXCJicmFuZC0tc2Nyb2xsZWRcIilcclxuXHRcdDogdG9wQmFyLmNsYXNzTGlzdC5yZW1vdmUoXCJicmFuZC0tc2Nyb2xsZWRcIik7XHJcbn07XHJcblxyXG5jb25zdCBtb2JpbGVUb2dnbGUgPSAoKSA9PiB7XHJcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcclxuXHRcdC8vaGFtYnVyZ2VyVG9nZ2xlXHJcblx0XHR0b2dnbGVCdG4uY2hpbGRyZW5baV0uY2xhc3NMaXN0LnRvZ2dsZShcImJyYW5kX19iYXItLWNsb3NlXCIpO1xyXG5cdH1cclxuXHRsb2dvLmNsYXNzTGlzdC50b2dnbGUoXCJicmFuZF9fbG9nby0tbW9iaWxlXCIpO1xyXG5cdG92ZXJsYXkuY2xhc3NMaXN0LnRvZ2dsZShcIm5hdmJhci0tb3ZlcmxheVwiKTtcclxuXHRzaG93TGlua3MuY2xhc3NMaXN0LnRvZ2dsZShcIm5hdmJhcl9fbGlua3MtLWFjdGl2ZVwiKTtcclxuXHRzY3JvbGxlZE5hdmJhcigpO1xyXG59O1xyXG5cclxubGV0IGFjdGl2ZUxpbmtUb2dnbGUgPSBlID0+IHtcclxuXHRsZXQgbmF2TGlua3NBY3RpdmUgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFxyXG5cdFx0XCJuYXZsaW5rc19fbGluay0tYWN0aXZlXCJcclxuXHQpO1xyXG5cdG5hdkxpbmtzQWN0aXZlWzBdLmNsYXNzTGlzdC5yZW1vdmUoXCJuYXZsaW5rc19fbGluay0tYWN0aXZlXCIpO1xyXG5cdGUudGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJuYXZsaW5rc19fbGluay0tYWN0aXZlXCIpO1xyXG5cdHNldFRpbWVvdXQobW9iaWxlVG9nZ2xlLCA0MDApO1xyXG59O1xyXG5cclxuLy9GZWF0dXJlcyBTZWN0aW9uXHJcbmxldCB0YWJNZW51VG9nZ2xlID0gZSA9PiB7XHJcblx0bGV0IHRhYnRpdGxlQWN0aXZlID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcclxuXHRcdFwidGFiLWhlYWRfX3RpdGxlLS1hY3RpdmVcIlxyXG5cdCk7XHJcblx0bGV0IHRhYmNvbnRlbnRBY3RpdmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiIC50YWItLWFjdGl2ZVwiKTtcclxuXHJcblx0dGFidGl0bGVBY3RpdmVbMF0uY2xhc3NMaXN0LnJlbW92ZShcInRhYi1oZWFkX190aXRsZS0tYWN0aXZlXCIpO1xyXG5cdGUudGFyZ2V0LmNsYXNzTGlzdC50b2dnbGUoXCJ0YWItaGVhZF9fdGl0bGUtLWFjdGl2ZVwiKTtcclxuXHJcblx0bGV0IGlkID0gZS50YXJnZXQuaWQ7XHJcblx0dGFiY29udGVudEFjdGl2ZS5jbGFzc0xpc3QucmVtb3ZlKFwidGFiLS1hY3RpdmVcIik7XHJcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCB0YWJjb250ZW50Lmxlbmd0aDsgaSsrKSB7XHJcblx0XHRpZiAodGFiY29udGVudFtpXS5pZCA9PSBgdGFiLSR7aWR9YCkge1xyXG5cdFx0XHR0YWJjb250ZW50W2ldLmNsYXNzTGlzdC5hZGQoXCJ0YWItLWFjdGl2ZVwiKTtcclxuXHRcdH1cclxuXHR9XHJcbn07XHJcblxyXG4vL0FjY29yZGlvblxyXG5sZXQgYWNkblRvZ2dsZSA9IGUgPT4ge1xyXG5cdGxldCBwYW5lbCA9IGUudGFyZ2V0Lm5leHRFbGVtZW50U2libGluZztcclxuXHRsZXQgYWNkbkhlYWRBY3RpdmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFjY29yZGlvbl9faGVhZC0tYWN0aXZlXCIpO1xyXG5cdGxldCBwYW5lbEFjdGl2ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWNjb3JkaW9uX19wYW5lbC0tYWN0aXZlXCIpO1xyXG5cdGlmIChhY2RuSGVhZEFjdGl2ZSAhPT0gbnVsbCAmJiBhY2RuSGVhZEFjdGl2ZSAhPT0gZS50YXJnZXQpIHtcclxuXHRcdGFjZG5IZWFkQWN0aXZlLmNsYXNzTGlzdC5yZW1vdmUoXCJhY2NvcmRpb25fX2hlYWQtLWFjdGl2ZVwiKTtcclxuXHRcdHBhbmVsQWN0aXZlLmNsYXNzTGlzdC5yZW1vdmUoXCJhY2NvcmRpb25fX3BhbmVsLS1hY3RpdmVcIik7XHJcblx0XHRwYW5lbEFjdGl2ZS5zdHlsZS5tYXhIZWlnaHQgPSBudWxsO1xyXG5cdH1cclxuXHJcblx0ZS50YXJnZXQuY2xhc3NMaXN0LnRvZ2dsZShcImFjY29yZGlvbl9faGVhZC0tYWN0aXZlXCIpO1xyXG5cclxuXHRpZiAocGFuZWwuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYWNjb3JkaW9uX19wYW5lbC0tYWN0aXZlXCIpKSB7XHJcblx0XHRwYW5lbC5jbGFzc0xpc3QucmVtb3ZlKFwiYWNjb3JkaW9uX19wYW5lbC0tYWN0aXZlXCIpO1xyXG5cdFx0cGFuZWwuc3R5bGUubWF4SGVpZ2h0ID0gbnVsbDtcclxuXHR9IGVsc2Uge1xyXG5cdFx0cGFuZWwuY2xhc3NMaXN0LmFkZChcImFjY29yZGlvbl9fcGFuZWwtLWFjdGl2ZVwiKTtcclxuXHRcdHBhbmVsLnN0eWxlLm1heEhlaWdodCA9IHBhbmVsLnNjcm9sbEhlaWdodCArIDIwICsgXCJweFwiO1xyXG5cdH1cclxufTtcclxuXHJcbi8vKioqKioqKioqKioqXHJcbi8vQWRkIEV2ZW50IExpc3RlbmVyc1xyXG4vLyoqKioqKioqKioqKlxyXG53aW5kb3cub25zY3JvbGwgPSBmdW5jdGlvbigpIHtcclxuXHRzY3JvbGxlZE5hdmJhcigpO1xyXG59O1xyXG5cclxudG9nZ2xlQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBtb2JpbGVUb2dnbGUpO1xyXG5cclxuZm9yIChsZXQgaSA9IDA7IGkgPCBuYXZMaW5rcy5sZW5ndGg7IGkrKykge1xyXG5cdG5hdkxpbmtzW2ldLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhY3RpdmVMaW5rVG9nZ2xlKTtcclxufVxyXG5cclxuZm9yIChsZXQgaSA9IDA7IGkgPCB0YWJ0aXRsZS5sZW5ndGg7IGkrKykge1xyXG5cdHRhYnRpdGxlW2ldLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0YWJNZW51VG9nZ2xlKTtcclxufVxyXG5cclxuZm9yIChsZXQgaSA9IDA7IGkgPCBhY2RuSGVhZC5sZW5ndGg7IGkrKykge1xyXG5cdGFjZG5IZWFkW2ldLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhY2RuVG9nZ2xlKTtcclxufVxyXG4iLCJjb25zdCBzY3JvbGxBbmNob3JzID0gKGUsIHJlc3BvbmQgPSBudWxsKSA9PiB7XHJcblx0Y29uc3QgZGlzdGFuY2VUb1RvcCA9IGVsID0+IE1hdGguZmxvb3IoZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wKTtcclxuXHJcblx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdGNvbnN0IHRhcmdldElEID0gcmVzcG9uZFxyXG5cdFx0PyByZXNwb25kLmdldEF0dHJpYnV0ZShcImhyZWZcIilcclxuXHRcdDogdGhpcy5nZXRBdHRyaWJ1dGUoXCJocmVmXCIpO1xyXG5cdGNvbnN0IHRhcmdldEFuY2hvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0SUQpO1xyXG5cclxuXHRpZiAoIXRhcmdldEFuY2hvcikgcmV0dXJuO1xyXG5cclxuXHRjb25zdCBvcmlnaW5hbFRvcCA9IGRpc3RhbmNlVG9Ub3AodGFyZ2V0QW5jaG9yKTtcclxuXHR3aW5kb3cuc2Nyb2xsQnkoeyB0b3A6IG9yaWdpbmFsVG9wLCBsZWZ0OiAwLCBiZWhhdmlvcjogXCJzbW9vdGhcIiB9KTtcclxuXHJcblx0Y29uc3QgY2hlY2tJZkRvbmUgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcblx0XHRjb25zdCBhdEJvdHRvbSA9XHJcblx0XHRcdHdpbmRvdy5pbm5lckhlaWdodCArIHdpbmRvdy5wYWdlWU9mZnNldCA+PVxyXG5cdFx0XHRkb2N1bWVudC5ib2R5Lm9mZnNldEhlaWdodCAtIDI7XHJcblx0XHRpZiAoZGlzdGFuY2VUb1RvcCh0YXJnZXRBbmNob3IpID09PSAwIHx8IGF0Qm90dG9tKSB7XHJcblx0XHRcdHRhcmdldEFuY2hvci50YWJJbmRleCA9IFwiLTFcIjtcclxuXHRcdFx0dGFyZ2V0QW5jaG9yLmZvY3VzKCk7XHJcblxyXG5cdFx0XHRpZiAoXCJoaXN0b3J5XCIgaW4gd2luZG93KSB7XHJcblx0XHRcdFx0d2luZG93Lmhpc3RvcnkucHVzaFN0YXRlKFwiXCIsIFwiXCIsIHRhcmdldElEKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR3aW5kb3cubG9jYXRpb24gPSB0YXJnZXRJRDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Y2xlYXJJbnRlcnZhbChjaGVja0lmRG9uZSk7XHJcblx0XHR9XHJcblx0fSwgMTAwKTtcclxufTtcclxuXHJcbmNvbnN0IHNjcm9sbEFuaW1hdGlvbiA9IGUgPT4ge1xyXG5cdGlmIChlLnRhcmdldC50YWdOYW1lICE9PSBcIkFcIikgcmV0dXJuO1xyXG5cdGlmIChcclxuXHRcdGUudGFyZ2V0LmhyZWYgJiZcclxuXHRcdGUudGFyZ2V0LmhyZWYuaW5kZXhPZihcIiNcIikgIT0gLTEgJiZcclxuXHRcdGUudGFyZ2V0LmhyZWYuaW5kZXhPZihcIiNudWxsXCIpID09IC0xICYmXHJcblx0XHQoZS50YXJnZXQucGF0aG5hbWUgPT0gbG9jYXRpb24ucGF0aG5hbWUgfHxcclxuXHRcdFx0XCIvXCIgKyBlLnRhcmdldC5wYXRobmFtZSA9PSBsb2NhdGlvbi5wYXRobmFtZSkgJiZcclxuXHRcdGUudGFyZ2V0LnNlYXJjaCA9PSBsb2NhdGlvbi5zZWFyY2hcclxuXHQpIHtcclxuXHRcdGNvbnNvbGUubG9nKGUudGFyZ2V0LmhyZWYuaW5kZXhPZihcIiMxXCIpKTtcclxuXHRcdHNjcm9sbEFuY2hvcnMoZSwgZS50YXJnZXQpO1xyXG5cdH1cclxufTtcclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBzY3JvbGxBbmltYXRpb24pO1xyXG4iLCIvL2NhY2hlRE9NXHJcbmNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZvcm1cIik7XHJcbmNvbnN0IGZvcm1JbnB1dCA9IGZvcm0ucXVlcnlTZWxlY3RvcihcIi5mb3JtX19pbnB1dFwiKTtcclxuY29uc3QgZm9ybVN1Ym1pdCA9IGZvcm0ucXVlcnlTZWxlY3RvcihcIi5mb3JtX19idG5cIik7XHJcbmNvbnN0IGVycm9yTXNnID0gZm9ybS5xdWVyeVNlbGVjdG9yKFwiLmZvcm1fX2Vycm9yXCIpO1xyXG5jb25zdCB3YXJuSWNvbiA9IGZvcm0ucXVlcnlTZWxlY3RvcihcIi5mb3JtX193YXJuaW5nXCIpO1xyXG5cclxuLy8gY29uc29sZS5sb2coZm9ybSk7XHJcblxyXG5jb25zdCB2YWxpZGF0ZUVtYWlsID0gZSA9PiB7XHJcblx0Y29uc3QgbWFpbGZvcm1hdCA9IC9eXFx3KyhbXFwuLV0/XFx3KykqQFxcdysoW1xcLi1dP1xcdyspKihcXC5cXHd7MiwzfSkrJC87XHJcblx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdGlmIChmb3JtSW5wdXQudmFsdWUubWF0Y2gobWFpbGZvcm1hdCkpIHtcclxuXHRcdGVycm9yTXNnLmNsYXNzTGlzdC5yZW1vdmUoXCJmb3JtX19lcnJvci0tYWN0aXZlXCIpO1xyXG5cdFx0ZXJyb3JNc2cuc3R5bGUubWF4SGVpZ2h0ID0gMDtcclxuXHRcdGZvcm1JbnB1dC5jbGFzc0xpc3QucmVtb3ZlKFwiZm9ybV9faW5wdXQtLWVycm9yXCIpO1xyXG5cdFx0d2Fybkljb24uY2xhc3NMaXN0LnJlbW92ZShcImZvcm1fX3dhcm5pbmctLWVycm9yXCIpO1xyXG5cdFx0d2Fybkljb24uY2xhc3NMaXN0LmFkZChcImZvcm1fX3dhcm5pbmctLWNvcnJlY3RcIik7XHJcblx0XHRmb3JtSW5wdXQuYmx1cigpO1xyXG5cdFx0Ly9jb2RlIHRvIHN0aW5naWZ5IGFuZCBzZW5kIGZvcm1cclxuXHRcdGZvcm1JbnB1dC52YWx1ZSA9IFwiXCI7XHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0ZXJyb3JNc2cuY2xhc3NMaXN0LmFkZChcImZvcm1fX2Vycm9yLS1hY3RpdmVcIik7XHJcblx0XHRlcnJvck1zZy5zdHlsZS5tYXhIZWlnaHQgPSBlcnJvck1zZy5zY3JvbGxIZWlnaHQgKyAyICsgXCJweFwiO1xyXG5cdFx0Zm9ybUlucHV0LmNsYXNzTGlzdC5hZGQoXCJmb3JtX19pbnB1dC0tZXJyb3JcIik7XHJcblx0XHR3YXJuSWNvbi5jbGFzc0xpc3QuYWRkKFwiZm9ybV9fd2FybmluZy0tZXJyb3JcIik7XHJcblx0XHRmb3JtSW5wdXQuZm9jdXMoKTtcclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9XHJcbn07XHJcblxyXG4vL2FkZCBFdmVudFxyXG5mb3JtU3VibWl0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB2YWxpZGF0ZUVtYWlsKTtcclxuIl19
