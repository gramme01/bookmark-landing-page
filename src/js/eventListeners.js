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
