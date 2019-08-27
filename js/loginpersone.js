class LogInPersone extends Validator{
    constructor (options) { 
        super(options)
        const pass = form.querySelector('#form input[name=password]');
        this.pass = pass;

        this.loginWrapper = document.querySelector('.login-wrapper');
        const wrapperResult = document.querySelector('.wrapper-result');

        const logo = document.querySelector('.logo');
        this.logo = logo;
        
        this.buttonSubmitClass = options.buttonSubmitClass
        this.buttonSubmit = this.form.querySelector('.' + this.buttonSubmitClass);
        this.submitData();
    }

    submitData = () => {
        this.buttonSubmit.addEventListener('click', (event) => {
            if(this.mail.value && this.pass.value != 0 && this.error.size === 0){
                const  logData = {
                    email: this.mail.value,
                    password: this.pass.value                    
                }
                this.send(logData);                
            }  
        });
        document.addEventListener('keydown', (event) => {
        
            let buttonLogout = document.querySelector('.button-logout');
        
            if (!buttonLogout && event.keyCode === 13 && this.mail.value && this.pass.value != 0 && this.error.size === 0) {
                const  logData = {
                    email: this.mail.value,
                    password: this.pass.value                    
                }
                this.send(logData);
            }
        });
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
        let errorDiv = await `<div class="error-message">${result.error}</div>`;
        let errorMessage = await this.form.querySelector('.error-message');
        let resultContent = await         
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
            this.showError(this.mail);
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
} 