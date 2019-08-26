class LogInPersone{
    constructor (options) {
        this.id = options.id
        this.buttonSubmitClass = options.buttonSubmitClass

        const form = document.getElementById(this.id);
        this.form = form;
        
        const buttonSubmit = form.querySelector(this.buttonSubmitClass);
        this.buttonSubmit = buttonSubmit;

        let mail = form.querySelector('#form input[name=email]');
        let pass = form.querySelector('#form input[name=password]');
        this.mail = mail;
        this.pass = pass;

        mail.addEventListener('change', this.checkIt);

        // const elementForm = [...form.elements].filter(element => element.tagName !== 'BUTTON');
        // elementForm.forEach((elem) => {
        //     elem.addEventListener('change', this.checkIt);
        // });

        const error = new Set();  
        this.error = error;

        const loginWrapper = document.querySelector('.login-wrapper');
        this.loginWrapper = loginWrapper;

        const logo = document.querySelector('.logo');
        this.logo = logo;

        // form.addEventListener('submit', event => {
        //     if(!mail.value.trim() || !pass.value.trim()) {
        //      event.preventDefault(); 
        //     }
        // });
    }

    isValid = (elem) => {

        const patternMail = /^\w{1,}@\w{2,}\.\w{2,}$/;
        // const patternPass = /[0-9а-яёЁА-Яa-zA-Z!@#$%^&*]{6,}/;   

        if(elem === this.mail){
            if(patternMail.test(this.mail.value)){
                return true;
            }else{
                return false;
            }            
        }

        // if(elem === this.pass){
        //     if(this.pass.value.match(patternPass) === null){
        //         return false
        //     }
        //     else{
        //         return true
        //     }
        // }        
    }

    showError = (elem) => {

        // const btnSub = document.querySelector(this.buttonSubmitClass);

        // const errorDiv = `<div class="error-message">E-Mail or password is incorrect</div>`;

        elem.classList.remove('validator-success');       
        elem.classList.add('validator-error');

        // if(!(document.querySelector('.error-message'))){
        //     btnSub.insertAdjacentHTML('beforebegin', errorDiv); 
        // }

    };

    showSucces = (elem) => {
        elem.classList.remove('validator-error');
        elem.classList.add('validator-success');

        if(!(document.querySelector('.validator-error'))){
            if((document.querySelector('.error-message'))){
                document.querySelector('.error-message').remove();
            }            
        }
    }

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

    send = async (data) => {

        let response = await fetch('https://us-central1-mercdev-academy.cloudfunctions.net/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        });
          
        let result = await response.json();
        const errorDiv = await `<div class="error-message">${result.error}</div>`;
        const errorMessage = this.form.querySelector('.error-message');

        const resultContent = await 
        
            `<div class="wrapper-result">
                <div class="persone-photo">
                    <img src="${result.photoUrl}" alt="Photo">
                </div>
                <h1 class="persone-name">${result.name}</h1>
                <button class="button-logout">Logout</button>
            </div>`;

        if(result.error){            
            if(errorMessage){
                errorMessage.remove();
            }
            this.buttonSubmit.insertAdjacentHTML('beforebegin', errorDiv); 
        }
        if(result.name){

            if(errorMessage){
                errorMessage.remove();
            }

            this.loginWrapper.remove();

            this.logo.insertAdjacentHTML('afterend', resultContent);
        }

        await this.logOut();
    }

    checkIt = (event) => {                  
        let target = event.target;
        if(this.isValid(target)) {
            this.showSucces(target)
            this.error.delete(target)
        }else{
            this.showError(target)
            this.error.add(target)
        }
        
        // console.log(this.error);

        this.buttonSubmit.addEventListener('click', (event) => {

            if(this.mail.value && this.pass.value != 0 && this.error.size === 0){

                const  logData = {
                    email: this.mail.value,
                    password: this.pass.value                    
                }
            
                this.send(logData);                
            }  
        }) 

        document.addEventListener('keydown', (event) => {

            if (event.keyCode === 13 && this.mail.value && this.pass.value != 0 && this.error.size === 0) {


                const  logData = {
                    email: this.mail.value,
                    password: this.pass.value                    
                }
            
                this.send(logData); 


            }
        });


    };
}