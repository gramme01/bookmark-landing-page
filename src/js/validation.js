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
