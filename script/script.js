'use strict';

var controls = document.getElementsByClassName('tabs__controls')[0],
	itemList = document.getElementsByClassName('tabs__controls-item'),
	contentItem = document.getElementsByClassName('tabs__item'),
	buttonControl = document.getElementsByClassName('tabs__buttons');

var form_1 = document.forms['userInfo_part-1'],
	userName = form_1.elements.userName,
	userSurname = form_1.elements.userSurname,
	userPatronymic = form_1.elements.userPatronymic,
	userAge = form_1.elements.userAge,
	userSex = form_1.elements.userSex,
	userСitizenship = form_1.elements.userСitizenship,
	maritalStatus = form_1.elements.maritalStatus;

var form_2 = document.forms['userInfo_part-2'],
	educationLevel = form_2.elements.educationLevel,
	yearGraduation = form_2.elements.yearGraduation,
	institutionEducation = form_2.elements.institutionEducation,
	languages = form_2.elements.languages,
	userOccupation = form_2.elements.userOccupation,
	userIncome = form_2.elements.userIncome,
	userSkills = form_2.elements.userSkills;

var form_3 = document.forms['userInfo_part-3'],
	userPhone = form_3.elements.userPhone,
	userEmail = form_3.elements.userEmail,
	userSkype = form_3.elements.userSkype,
	userSocialNetwork = form_3.elements.userSocialNetwork,
	userAgree = form_3.elements.userAgree;

var form_4 = document.forms['userInfo'],
	fullInfo = contentItem[3].querySelector('.info-user');//поле вывода инф-ции о пользователе

var allField = document.getElementsByClassName('field__name');

var buttonResetForm = document.getElementsByClassName('form__btn_reset'),
	buttonResult = document.getElementById('result'),
	tabResult = document.getElementById('resultTab');

var arrStatus = [];//вспомогательный массив статусов полей

/*------------------------- массивы с данными для получения данных из select -----------------------------------*/
var userSexArr = [, 'Мужской', 'Женский'];

var maritalStatusArr = [, 'Замужем/женат', 'Холост/не замужем', 'Разведен(а)', 'Состоим в официальном браке, но живем отдельно', 'Не состоим в официальном браке, но живем вместе', 'Вдова/вдовец'];

var educationLevelArr = [, 'Неполное среднее', 'Среднее', 'Среднее профессиональное', 'Незаконченное высшее', 'Высшее', 'Есть ученое звание, степень'];

var userOccupationArr = [, 'Руководитель, управленец', 'Индивидуальный предприниматель', 'Служащий', 'Рабочий', 'Студент', 'Домохозяйка', 'Пенсионер', 'Безработный'];

var userIncomeArr = [, 'Денег хватает только на приобретение продуктов питания', 'Денег достаточно для приобретения необходимых продуктов питания и одежды, но на более крупные покупки приходится откладывать', 'Покупка большинства товаров длительного пользования (холодильник, телевизор) не вызывает трудностей, однако купить квартиру мы не можем', 'Денег достаточно, чтобы вообще ни в чем себе не отказывать'];

/*-------------------------- переключение табов ------------------------------*/
function choiceTabs(event) {
	event = event || window.event;
	event.preventDefault();
	var target = event.target || event.srcElement;

	var item = target.closest('.tabs__controls-item');

	if (!item) return;

	var itemPosition = item.getAttribute('data-controls');

	for (var j = 0; j < itemList.length; j++) {
		if (itemList[j].getAttribute('data-controls') === itemPosition) {
			itemList[j].classList.add('active');
		} else {
			itemList[j].classList.remove('active');
		}
	}

	for (var i = 0; i < contentItem.length; i++) {
		if (contentItem[i].getAttribute('data-item') === itemPosition) {
			contentItem[i].classList.add('active');
		} else {
			contentItem[i].classList.remove('active');
		}
	}
}

/*--------------------------- навигационные кнопки -----------------------------*/
function navButton(event) {
	event = event || window.event;
	event.preventDefault();
	var target = event.target || event.srcElement;

	if (!target.classList.contains('tabs__btn')) return;

	var item = target.closest('.tabs__item'),
		itemPosition;

	if (target.classList.contains('tabs__btn_next')) {
		item.nextElementSibling.classList.add('active');
		item.classList.remove('active');

		itemPosition = +item.getAttribute('data-item') + 1;

	} else {
		item.previousElementSibling.classList.add('active');
		item.classList.remove('active');

		itemPosition = +item.getAttribute('data-item') - 1;
	}

	for (var j = 0; j < itemList.length; j++) {
		if (itemList[j].getAttribute('data-controls') == itemPosition) {
			itemList[j].classList.add('active');
		} else {
			itemList[j].classList.remove('active');
		}
	}
}

/*----------------------- активация кнопки следующего шага -------------------------------*/

function activeButtonNext(parent) {

	var buttonNext = parent.querySelector('.tabs__btn_next');

	buttonNext.classList.remove('disabled');

}

/*---------------------- активакия таба следующего шага --------------------------------*/
function activeTabNext(parent) {

	var itemPosition = +parent.getAttribute('data-item') + 1;

	for (var j = 0; j < itemList.length; j++) {
		if (itemList[j].getAttribute('data-controls') == itemPosition) {
			itemList[j].classList.remove('disabled');
		}
	}
}

/*------------------------ определение текущего года (в placeholder) ----------------------------------------*/
function setYear() {
	var timeNow = new Date();
	var year = timeNow.getFullYear();

	yearGraduation.setAttribute('placeholder', year);

	return year;
}

/*------------------- вывод информации об успешности/неуспешности заполнения формы ----------------------*/
function statusOutput(parent, status) {
	var info = parent.getElementsByClassName('tabs__info')[0];
	var infoText = info.getElementsByTagName('p')[0];

	if (status) {
		infoText.classList.remove('status_bad');
		infoText.innerHTML = 'Все поля заполнены корректно! Можете переходить к следующему этапу!'
	} else {
		infoText.classList.add('status_bad');
		infoText.innerHTML = 'Выделенные поля заполнены некорректно! Пожалуйста, проверте введенные данные!'
	}
}

/*--------------------------- очистка пометок ошибок -------------------------------------*/
function clearError(event) {
	event = event || window.event;
	/*event.preventDefault();*/

	var tabsItem = event.target.closest('.tabs__item'),
		resetForm = tabsItem.querySelector('.tabs__form'),
		fieldsError = resetForm.getElementsByClassName('error-field'),
		resetStatus = tabsItem.querySelector('.tabs__info'),
		resetText = resetStatus.getElementsByTagName('p')[0];

	for (var i = 0; i < fieldsError.length; i++) {
		if (fieldsError[i].classList.contains('error-field')) {
			fieldsError[i].classList.remove('error-field');
		}
		i--;
	}

	resetText.classList.remove('status_bad');
	resetText.innerHTML = '';
}

/*---------------------- проверка статусов заполнения всех полей ---------------------------*/
function checkStatusField(arr) {
	return arr.every(function (t) { return t == true; });
}

/*-------------------------- валидация полей форм и запись статуса----------------------------------*/
function validateField(field) {

	var parentTag;

	if (field[0] === undefined) {
		parentTag = field.closest('.field__value');
		if (field.getAttribute('type') === 'text' && !field.value) {
			parentTag.classList.add('error-field');
			field.focus();//сфокусировать на невалидном поле
			arrStatus.push(false);
		} else if (field.getAttribute('type') === 'number' && (!field.value || field.value <= 0 || field.value > setYear())) {
			parentTag.classList.add('error-field');
			field.focus();
			arrStatus.push(false);
		} else if(field.getAttribute('type') === 'checkbox' && !field.checked) {
			parentTag.classList.add('error-field');
			arrStatus.push(false);
		} else if (field.value == '') {
			parentTag.classList.add('error-field');
			arrStatus.push(false);
		} else {
			parentTag.classList.remove('error-field');
			arrStatus.push(true);
		}

	} else if(field[0] != undefined) {
		parentTag = field[0].closest('.field__value');
		if (field.value == '') {
			parentTag.classList.add('error-field');
			document.getElementById('userSex').scrollIntoView();
			arrStatus.push(false);
		} else {
			parentTag.classList.remove('error-field');
			arrStatus.push(true);
		}
	}
}

/*--------------------------------- валидация всей формы -------------------------------------*/
function validateForm(event) {

	event = event || window.event;
	var target = event.target || event.srcElement;

	arrStatus = [];//сброс информации о статусе полей
	var parent,//родительский элемент для валидируемой формы
		status;//итоговый статус по всем полям формы

	if (target.closest('.form_1')) {
		parent = target.closest('.form_1').parentNode;

		try {
			validateField(userName);
			validateField(userSurname);
			validateField(userPatronymic);
			validateField(userAge);
			validateField(userSex);
			validateField(userСitizenship);
			validateField(maritalStatus);

			status = checkStatusField(arrStatus);//определение итогового статуса по всем полям формы
			statusOutput(parent, status);//вывод информации о вылидации формы

			if (status) {
				console.log('Good_1');
				event.preventDefault();
				activeButtonNext(parent);
				activeTabNext(parent);
			} else {
				console.log('Error_1');
				throw 'is empty';
			}

		} catch (err) {
			event.preventDefault();
			console.log('FATAL error_1');
		}
	} else if (target.closest('.form_2')) {
		parent = target.closest('.form_2').parentNode;

		try {
			validateField(educationLevel);
			validateField(yearGraduation);
			validateField(institutionEducation);
			validateField(languages);
			validateField(userOccupation);
			validateField(userIncome);
			validateField(userSkills);

			status = checkStatusField(arrStatus);
			statusOutput(parent, status);

			if (status) {
				console.log('Good_2');
				event.preventDefault();
				activeButtonNext(parent);
				activeTabNext(parent);
			} else {
				console.log('Error_2');
				throw 'is empty';
			}

		} catch (err) {
			event.preventDefault();
			console.log('FATAL error_2');
		}
	} else if (target.closest('.form_3')) {
		parent = target.closest('.form_3').parentNode;

		try {
			validateField(userPhone);
			validateField(userEmail);
			validateField(userSkype);
			validateField(userSocialNetwork);
			validateField(userAgree);

			status = checkStatusField(arrStatus);
			statusOutput(parent, status);

			if (status) {
				console.log('Good_3');
				event.preventDefault();
				activeButtonNext(parent);
				activeTabNext(parent);
			} else {
				console.log('Error_3');
				throw 'is empty';
			}

		} catch (err) {
			event.preventDefault();
			console.log('FATAL error_3');
		}
	}
}

/*----------------------------- хранилище --------------------------------------*/
var usersStorage = new THashStorage;

/*----------------------запись данных в хранилище --------------------------*/
function addUserInfo() {

	var userFullName = userSurname.value + ' ' + userName.value + ' ' + userPatronymic.value;

	var userInfo = {};

	userInfo.userName = userName.value.trim();
	userInfo.userSurname = userSurname.value.trim();
	userInfo.userPatronymic = userPatronymic.value.trim();
	userInfo.userAge = userAge.value;
	userInfo.userSex = userSexArr[userSex.value];
	userInfo.userСitizenship = userСitizenship.value.trim();
	userInfo.userMaritalStatus = maritalStatusArr[maritalStatus.value];

	userInfo.userEducationLevel = educationLevelArr[educationLevel.value];
	userInfo.userYearGraduation = yearGraduation.value;
	userInfo.userInstitutionEducation = institutionEducation.value.trim();
	userInfo.userLanguages = languages.value.trim();
	userInfo.userOccupation = userOccupationArr[userOccupation.value];
	userInfo.userIncome = userIncomeArr[userIncome.value];
	userInfo.userSkills = userSkills.value.trim();

	userInfo.userPhone = userPhone.value.trim();
	userInfo.userEmail = userEmail.value.trim();
	userInfo.userSkype = userSkype.value.trim();
	userInfo.userSocialNetwork = userSocialNetwork.value.trim();

	usersStorage.addValue(userFullName, userInfo);

	//показать созданное хранилище с пользователями
	/*console.log(usersStorage);*/
}

/*--------------------------- получение данных из хранилища --------------------------------------*/
function getUserInfo() {

	fullInfo.innerHTML = '';

	var userFIO = document.getElementById('userFIO').value;//получение ФИО пользователя

	var arrFieldName = [];//массив имен полей со всех форм за исключением чекбокса согласия и ФИО запроса

	for (var i = 0; i < allField.length - 2; i++) {
		if (allField[i].children.length === 1) {
			arrFieldName.push(allField[i].children[0].innerHTML.trim());
		} else {
			arrFieldName.push(allField[i].innerHTML.trim());
		}
	}

	if(userFIO in usersStorage.StorageH){
		var user = usersStorage.getValue(userFIO);//объект информации о конкретном пользователе

		var count = 0;
		for(var key in user) {
			var infoField = document.createElement('p');
			var infoFieldText = document.createTextNode(arrFieldName[count] + ': ' + user[key]);
			infoField.appendChild(infoFieldText);
			fullInfo.appendChild(infoField);
			count++;
		}
	} else{
		var infoField = document.createElement('p');
		var infoFieldText = document.createTextNode('Такого пользователя нету в базе!');
		infoField.appendChild(infoFieldText);
		fullInfo.appendChild(infoField);
	}
}

/*------------------------------- обработчики --------------------------------------------*/
userName.addEventListener('blur', function () {//как пример на одном поле того, что если поле не валидно - не выпускать из него
	validateField(this);
});

form_1.addEventListener('submit', validateForm);
form_2.addEventListener('submit', validateForm);
form_3.addEventListener('submit', validateForm);

for (var i = 0; i < buttonControl.length; i++) {
	buttonControl[i].addEventListener('click', navButton);
}

controls.addEventListener('click', choiceTabs);

for (var b = 0; b < buttonResetForm.length; b++) {
	buttonResetForm[b].addEventListener('click', function (event) {
		clearError(event);
	});
}

buttonResult.addEventListener('click', addUserInfo);
tabResult.addEventListener('click', addUserInfo);

document.addEventListener("DOMContentLoaded", setYear);

form_4.addEventListener('submit', function (event) {
	event = event || window.event;
	event.preventDefault();
	getUserInfo();
});





