/**
    Объявляю переменные на базе которых будем делать проверку поля email на валидность, если в поле ввести данные
    которые не соответсвуют формату email, присвоим этому полю класс 'input-validator-error'
*/

const form = document.getElementById('form-log-in');
const mail = form.querySelector('input[name=email]');
const error = new Set();

/**
    Сравниваем поле email с регулярным выражением
 */
isValid = (elem) => {
    const patternMail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/; 
    if(elem === mail){
        if(patternMail.test(mail.value)){
            return true;
        }else{
            return false;
        }            
    }      
}
/**
    Присваиваем или удаляем класс 'input-validator-error' по итогу проверки и проверяем наличие сообщения об ошибке
 */
showError = (elem) => {   
    elem.classList.add('input-validator-error');
}
showSucces = (elem) => {
    elem.classList.remove('input-validator-error');
    if(!(form.querySelector('.input-validator-error'))){
        if((form.querySelector('.log-in-error-message'))){
            form.querySelector('.log-in-error-message').remove();
        }            
    }
}
/**
    Функция проверки, по результату проверки вносим или удаляем ошибку в коллекцию const error;
 */
checkIt = (event) => {                  
    let target = event.target;
    if(isValid(target)) {
        showSucces(target)
        error.delete(target)
    }else{
        showError(target)
        error.add(target)
    }
}

/**
 Инициализируем функцию по изменению в поле email
 */
mail.addEventListener('change', checkIt);

/**
    Объявляю переменные необходимые для проверки и отправки запроса на сервер
*/

const pass = form.querySelector('input[name=password]');
const loginWrapper = document.querySelector('.log-in-box');
const wrapperResult = document.querySelector('.log-in-box-result');
const logo = document.querySelector('.logo-log-in');
const buttonSubmit = form.querySelector('.form-log-in__button');    

/**
    Функция для возврата страницы в исходное состояние 
 */
logOut = () => {
    if(document.querySelector('.button-logout')){                    
        const buttonLogout = document.querySelector('.button-logout');
        if(buttonLogout){
            buttonLogout.addEventListener('click', (e) => {
                window.location.reload();
            })
        }
    }
}

/**
    Функция для отправки данных на сервер и формированию шаблона с полученными данными 
 */

send = async (data) => {
    let response = await fetch('https://us-central1-mercdev-academy.cloudfunctions.net/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    });
    let result = await response.json();
    let errorDiv = `<div class="log-in-error-message">${result.error}</div>`;
    let errorMessage = form.querySelector('.log-in-error-message');
    let resultContent =         
        `<div class="log-in-box-result">
            <div class="persone-photo">
                <img class="persone-photo__img" src="${result.photoUrl}" alt="Photo">
            </div>
            <h1 class="persone-name">${result.name}</h1>
            <button class="button-logout">Logout</button>
        </div>`;
    if(result.error){            
        if(errorMessage){
            errorMessage.remove();
        }
        buttonSubmit.insertAdjacentHTML('beforebegin', errorDiv); 
        showError(mail);
    }
    if(result.name){
        if(errorMessage){
            errorMessage.remove();
        }
        loginWrapper.remove();
        logo.insertAdjacentHTML('afterend', resultContent);
    }
    logOut();
}

/**
    Функция для проверки полей формы и инициализации отправки данных на сервер 
 */
const errorEmptyFilled = '<div class="log-in-error-message">Email and password must be filled</div>';

submitData = () => {
    buttonSubmit.addEventListener('click', (event) => {
        
        let messageSumError = form.querySelector('.log-in-error-message');

        if(mail.value && pass.value != 0 && error.size === 0){
            if(messageSumError){
                messageSumError.remove();
            }
            const  logData = {
                email: mail.value,
                password: pass.value                    
            }
            send(logData);                
        }else{
            if(messageSumError){
                messageSumError.remove();
            }
            buttonSubmit.insertAdjacentHTML('beforebegin', errorEmptyFilled);
        }
    });
    
    // Добавил функцию для проверки полей формы и инициализации отправки данных на сервер по нажатию на кнопку Enter

    document.addEventListener('keydown', (event) => {

        let messageSumError = form.querySelector('.log-in-error-message');
        let buttonLogout = document.querySelector('.button-logout');

        if (!buttonLogout && event.keyCode === 13 && mail.value && pass.value != 0 && error.size === 0) {

            if(messageSumError){
                messageSumError.remove();
            }
            const  logData = {
                email: mail.value,
                password: pass.value                    
            }
            send(logData);
        }
    });
}

submitData();