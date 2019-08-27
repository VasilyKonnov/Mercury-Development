class Validator{
    constructor (options) {
        this.id = options.id

        const form = document.getElementById(this.id);
        this.form = form;
                       
        const mail = form.querySelector('#form input[name=email]');
        this.mail = mail; 
        
        mail.addEventListener('change', this.checkIt);

        const error = new Set();  
        this.error = error;
    }
    
    isValid = (elem) => {
        const patternMail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/; 

        if(elem === this.mail){
            if(patternMail.test(this.mail.value)){
                return true;
            }else{
                return false;
            }            
        }      
    }

    showError = (elem) => {
        elem.classList.remove('validator-success');       
        elem.classList.add('validator-error');
    };

    showSucces = (elem) => {
        elem.classList.remove('validator-error');
        elem.classList.add('validator-success');
        if(!(this.form.querySelector('.validator-error'))){
            if((this.form.querySelector('.error-message'))){
                this.form.querySelector('.error-message').remove();
            }            
        }
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
    };
}