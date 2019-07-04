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
