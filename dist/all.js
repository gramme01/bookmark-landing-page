//cacheDOM
let toggleBtn = document.querySelector(".brand__toggle");
let logo = document.querySelector(".brand__logo");
let topBar = document.querySelector(".brand");
let overlay = document.querySelector(".navbar");
let showLinks = document.querySelector(".navbar__links");
let navLinks = document.querySelectorAll(".navlinks__link");
let tabtitle = document.querySelectorAll(".tab-head__title");
let tabcontent = document.querySelectorAll(".tab");
let acdnHead = document.querySelectorAll(".accordion__head");

// console.log(acdnHead);

//************
//Define Event Functions
//************
let scrollFunction = () => {
	(document.body.scrollTop > 105 ||
		document.documentElement.scrollTop > 105) &&
	!overlay.classList.contains("navbar--overlay")
		? topBar.classList.add("brand--scrolled")
		: topBar.classList.remove("brand--scrolled");
};

let mobileToggle = () => {
	//hamburgerToggle
	for (let i = 0; i < 3; i++) {
		toggleBtn.children[i].classList.toggle("brand__bar--close");
	}
	//logoToggle
	logo.classList.toggle("brand__logo--mobile");
	//overlayToggle
	overlay.classList.toggle("navbar--overlay");
	//linksToggle
	showLinks.classList.toggle("navbar__links--active");
	// check scroll
	scrollFunction();
};

let activeLinkToggle = e => {
	let navLinksActive = document.getElementsByClassName(
		"navlinks__link--active"
	);
	navLinksActive[0].classList.remove("navlinks__link--active");
	e.target.classList.add("navlinks__link--active");
};

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
	scrollFunction();
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYWxsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy9jYWNoZURPTVxyXG5sZXQgdG9nZ2xlQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5icmFuZF9fdG9nZ2xlXCIpO1xyXG5sZXQgbG9nbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnJhbmRfX2xvZ29cIik7XHJcbmxldCB0b3BCYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJyYW5kXCIpO1xyXG5sZXQgb3ZlcmxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubmF2YmFyXCIpO1xyXG5sZXQgc2hvd0xpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5uYXZiYXJfX2xpbmtzXCIpO1xyXG5sZXQgbmF2TGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLm5hdmxpbmtzX19saW5rXCIpO1xyXG5sZXQgdGFidGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnRhYi1oZWFkX190aXRsZVwiKTtcclxubGV0IHRhYmNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnRhYlwiKTtcclxubGV0IGFjZG5IZWFkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5hY2NvcmRpb25fX2hlYWRcIik7XHJcblxyXG4vLyBjb25zb2xlLmxvZyhhY2RuSGVhZCk7XHJcblxyXG4vLyoqKioqKioqKioqKlxyXG4vL0RlZmluZSBFdmVudCBGdW5jdGlvbnNcclxuLy8qKioqKioqKioqKipcclxubGV0IHNjcm9sbEZ1bmN0aW9uID0gKCkgPT4ge1xyXG5cdChkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCA+IDEwNSB8fFxyXG5cdFx0ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCA+IDEwNSkgJiZcclxuXHQhb3ZlcmxheS5jbGFzc0xpc3QuY29udGFpbnMoXCJuYXZiYXItLW92ZXJsYXlcIilcclxuXHRcdD8gdG9wQmFyLmNsYXNzTGlzdC5hZGQoXCJicmFuZC0tc2Nyb2xsZWRcIilcclxuXHRcdDogdG9wQmFyLmNsYXNzTGlzdC5yZW1vdmUoXCJicmFuZC0tc2Nyb2xsZWRcIik7XHJcbn07XHJcblxyXG5sZXQgbW9iaWxlVG9nZ2xlID0gKCkgPT4ge1xyXG5cdC8vaGFtYnVyZ2VyVG9nZ2xlXHJcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcclxuXHRcdHRvZ2dsZUJ0bi5jaGlsZHJlbltpXS5jbGFzc0xpc3QudG9nZ2xlKFwiYnJhbmRfX2Jhci0tY2xvc2VcIik7XHJcblx0fVxyXG5cdC8vbG9nb1RvZ2dsZVxyXG5cdGxvZ28uY2xhc3NMaXN0LnRvZ2dsZShcImJyYW5kX19sb2dvLS1tb2JpbGVcIik7XHJcblx0Ly9vdmVybGF5VG9nZ2xlXHJcblx0b3ZlcmxheS5jbGFzc0xpc3QudG9nZ2xlKFwibmF2YmFyLS1vdmVybGF5XCIpO1xyXG5cdC8vbGlua3NUb2dnbGVcclxuXHRzaG93TGlua3MuY2xhc3NMaXN0LnRvZ2dsZShcIm5hdmJhcl9fbGlua3MtLWFjdGl2ZVwiKTtcclxuXHQvLyBjaGVjayBzY3JvbGxcclxuXHRzY3JvbGxGdW5jdGlvbigpO1xyXG59O1xyXG5cclxubGV0IGFjdGl2ZUxpbmtUb2dnbGUgPSBlID0+IHtcclxuXHRsZXQgbmF2TGlua3NBY3RpdmUgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFxyXG5cdFx0XCJuYXZsaW5rc19fbGluay0tYWN0aXZlXCJcclxuXHQpO1xyXG5cdG5hdkxpbmtzQWN0aXZlWzBdLmNsYXNzTGlzdC5yZW1vdmUoXCJuYXZsaW5rc19fbGluay0tYWN0aXZlXCIpO1xyXG5cdGUudGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJuYXZsaW5rc19fbGluay0tYWN0aXZlXCIpO1xyXG59O1xyXG5cclxubGV0IHRhYk1lbnVUb2dnbGUgPSBlID0+IHtcclxuXHRsZXQgdGFidGl0bGVBY3RpdmUgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFxyXG5cdFx0XCJ0YWItaGVhZF9fdGl0bGUtLWFjdGl2ZVwiXHJcblx0KTtcclxuXHRsZXQgdGFiY29udGVudEFjdGl2ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIgLnRhYi0tYWN0aXZlXCIpO1xyXG5cclxuXHR0YWJ0aXRsZUFjdGl2ZVswXS5jbGFzc0xpc3QucmVtb3ZlKFwidGFiLWhlYWRfX3RpdGxlLS1hY3RpdmVcIik7XHJcblx0ZS50YXJnZXQuY2xhc3NMaXN0LnRvZ2dsZShcInRhYi1oZWFkX190aXRsZS0tYWN0aXZlXCIpO1xyXG5cclxuXHRsZXQgaWQgPSBlLnRhcmdldC5pZDtcclxuXHR0YWJjb250ZW50QWN0aXZlLmNsYXNzTGlzdC5yZW1vdmUoXCJ0YWItLWFjdGl2ZVwiKTtcclxuXHRmb3IgKGxldCBpID0gMDsgaSA8IHRhYmNvbnRlbnQubGVuZ3RoOyBpKyspIHtcclxuXHRcdGlmICh0YWJjb250ZW50W2ldLmlkID09IGB0YWItJHtpZH1gKSB7XHJcblx0XHRcdHRhYmNvbnRlbnRbaV0uY2xhc3NMaXN0LmFkZChcInRhYi0tYWN0aXZlXCIpO1xyXG5cdFx0fVxyXG5cdH1cclxufTtcclxuXHJcbmxldCBhY2RuVG9nZ2xlID0gZSA9PiB7XHJcblx0bGV0IHBhbmVsID0gZS50YXJnZXQubmV4dEVsZW1lbnRTaWJsaW5nO1xyXG5cdGxldCBhY2RuSGVhZEFjdGl2ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWNjb3JkaW9uX19oZWFkLS1hY3RpdmVcIik7XHJcblx0bGV0IHBhbmVsQWN0aXZlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hY2NvcmRpb25fX3BhbmVsLS1hY3RpdmVcIik7XHJcblx0Y29uc29sZS5sb2coYWNkbkhlYWRBY3RpdmUsIHBhbmVsQWN0aXZlKTtcclxuXHRpZiAoYWNkbkhlYWRBY3RpdmUgIT09IG51bGwgJiYgYWNkbkhlYWRBY3RpdmUgIT09IGUudGFyZ2V0KSB7XHJcblx0XHRhY2RuSGVhZEFjdGl2ZS5jbGFzc0xpc3QucmVtb3ZlKFwiYWNjb3JkaW9uX19oZWFkLS1hY3RpdmVcIik7XHJcblx0XHRwYW5lbEFjdGl2ZS5jbGFzc0xpc3QucmVtb3ZlKFwiYWNjb3JkaW9uX19wYW5lbC0tYWN0aXZlXCIpO1xyXG5cdFx0cGFuZWxBY3RpdmUuc3R5bGUubWF4SGVpZ2h0ID0gbnVsbDtcclxuXHR9XHJcblxyXG5cdGUudGFyZ2V0LmNsYXNzTGlzdC50b2dnbGUoXCJhY2NvcmRpb25fX2hlYWQtLWFjdGl2ZVwiKTtcclxuXHJcblx0aWYgKHBhbmVsLmNsYXNzTGlzdC5jb250YWlucyhcImFjY29yZGlvbl9fcGFuZWwtLWFjdGl2ZVwiKSkge1xyXG5cdFx0cGFuZWwuY2xhc3NMaXN0LnJlbW92ZShcImFjY29yZGlvbl9fcGFuZWwtLWFjdGl2ZVwiKTtcclxuXHRcdHBhbmVsLnN0eWxlLm1heEhlaWdodCA9IG51bGw7XHJcblx0fSBlbHNlIHtcclxuXHRcdHBhbmVsLmNsYXNzTGlzdC5hZGQoXCJhY2NvcmRpb25fX3BhbmVsLS1hY3RpdmVcIik7XHJcblx0XHRwYW5lbC5zdHlsZS5tYXhIZWlnaHQgPSBwYW5lbC5zY3JvbGxIZWlnaHQgKyBcInB4XCI7XHJcblx0fVxyXG59O1xyXG5cclxuLy8qKioqKioqKioqKipcclxuLy9BZGQgRXZlbnQgTGlzdGVuZXJzXHJcbi8vKioqKioqKioqKioqXHJcbndpbmRvdy5vbnNjcm9sbCA9IGZ1bmN0aW9uKCkge1xyXG5cdHNjcm9sbEZ1bmN0aW9uKCk7XHJcbn07XHJcblxyXG50b2dnbGVCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG1vYmlsZVRvZ2dsZSk7XHJcblxyXG5mb3IgKGxldCBpID0gMDsgaSA8IG5hdkxpbmtzLmxlbmd0aDsgaSsrKSB7XHJcblx0bmF2TGlua3NbaV0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGFjdGl2ZUxpbmtUb2dnbGUpO1xyXG59XHJcblxyXG5mb3IgKGxldCBpID0gMDsgaSA8IHRhYnRpdGxlLmxlbmd0aDsgaSsrKSB7XHJcblx0dGFidGl0bGVbaV0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRhYk1lbnVUb2dnbGUpO1xyXG59XHJcblxyXG5mb3IgKGxldCBpID0gMDsgaSA8IGFjZG5IZWFkLmxlbmd0aDsgaSsrKSB7XHJcblx0YWNkbkhlYWRbaV0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGFjZG5Ub2dnbGUpO1xyXG59XHJcbiJdfQ==
