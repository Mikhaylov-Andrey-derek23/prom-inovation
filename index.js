class WorkingForm{
    constructor(form, path){
        this.form = form;
        this.path = path;
        this.result = false;
        this.status = [];
        this.name = '';
        this.surname = '';
        this.email = '';
        this.password = '';
        this.repeatPassword = '';  

        this.render();
    }

    sendFormRequest(){
        document.querySelector('.send-form-request').addEventListener('click', ()=>{
            this.checkForm();
            if(this.status.length == 0){
                const data = {
                    method : "add",
                        user : {
                            id : Date.now(),
                            name : document.getElementById('name').value,
                            surname : document.getElementById('surname').value,
                            email : document.getElementById('email').value,
                            pass : document.getElementById('password').value,
                            passRepeat : document.getElementById('repeatPassword').value
                        }
                }


                const xhr = new XMLHttpRequest();
                xhr.open('POST', this.path, true);
                xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xhr.send('data='+JSON.stringify(data));
                xhr.onreadystatechange = () => {
                    if (xhr.readyState != 4) return;

                    if (xhr.status != 200) {
                        console.log("Error");
                    } else {
                        const answer = JSON.parse(xhr.responseText);
                        this.result = answer.result;
                        this.status = answer.status;
                        this.render();
                    }
                }

                //this.render();
                return
            }
            
            this.render();
            return
        })
    }

    checkForm(){
        let status = []

        if(this.name == ''){
            status.push('errorName')
        }

        if(this.surname == ''){
            status.push('errorSurname')
        }

        if(this.email== ''){
            status.push('errorEmptyEmail')
        }

        if(status.indexOf('errorEmptyEmail') == -1){
            const re  = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(!re.test(this.email)){
                status.push('errorEmail');
            }
        }

        if(this.password == ''){
            status.push('errorEmptyPass')
        }

        if(this.repeatPassword == ''){
            status.push('errorEmptyReapetPass')
        }

        if(status.indexOf('errorEmptyEmail') == -1 && status.indexOf('errorEmptyReapetPass') == -1){
            if(this.password != this.repeatPassword){
                status.push('errorPass');
            }
        }


        this.status = status;
    }

    changeInput(){
        document.getElementById('name').addEventListener('change', ()=>{
            this.name = document.getElementById('name').value;
        })
        document.getElementById('surname').addEventListener('change', ()=>{
            this.surname = document.getElementById('surname').value;
        })
        document.getElementById('email').addEventListener('change', ()=>{
            this.email = document.getElementById('email').value;
        })
        document.getElementById('password').addEventListener('change', ()=>{
            this.password = document.getElementById('password').value;
        })
        document.getElementById('repeatPassword').addEventListener('change', ()=>{
            this.repeatPassword = document.getElementById('repeatPassword').value;
        })
    }

    render()
    {
        if(this.result == true){
            this.form.innerHTML = `
                <h4 class="text-center text-success my-4">Новый пользователь добавлен</h4>
            `
        }else{
            this.form.innerHTML = `
                ${this.status.length > 0 ? '<p class="bg-danger text-light text-center py-2 rounded">Исправьте ошибки в форме, они выделены красным</p>' : ''}
                <div class="mb-3">
                  <label class="form-label">Имя</label>
                  <input type="text" value="${this.name}"class="form-control ${this.status.indexOf('errorName') != -1 ? 'bg-danger text-light' : ''}" id="name">
                  ${this.status.indexOf('errorName') != -1 ? '<div class="form-text text-danger">Поле не должно быть пустым</div>' : ''}
                </div>
                <div class="mb-3">
                  <label class="form-label">Фамилия</label>
                  <input type="text" value="${this.surname}" class="form-control ${this.status.indexOf('errorSurname') != -1 ? 'bg-danger text-light' : ''}" id="surname">
                  ${this.status.indexOf('errorSurname') != -1 ? '<div class="form-text text-danger">Поле не должно быть пустым</div>' : ''}
                </div>
                <div class="mb-3">
                  <label class="form-label">Email</label>
                  <input type="email" value="${this.email}" class="form-control ${this.status.indexOf('errorEmptyEmail') != -1 ? 'bg-danger text-light' : ''} ${this.status.indexOf('errorEmail') != -1 ? 'bg-danger text-light' : ''} ${this.status.indexOf('errorDoubleEmail') != -1 ? 'bg-danger text-light' : ''}" id="email">
                  ${this.status.indexOf('errorEmptyEmail') != -1 ? '<div class="form-text text-danger">Поле не должно быть пустым</div>' : ''}
                  ${this.status.indexOf('errorEmail') != -1 ? '<div class="form-text text-danger">Не валидный email</div>' : ''}
                  ${this.status.indexOf('errorDoubleEmail') != -1 ? '<div class="form-text text-danger">Данный email зарегистрирован</div>' : ''}
                </div>
                <div class="mb-3">
                  <label lass="form-label">Пароль</label>
                  <input type="password"  value="${this.password}" class="form-control ${this.status.indexOf('errorEmptyPass') != -1 ? 'bg-danger text-light' : ''} ${this.status.indexOf('errorPass') != -1 ? 'bg-danger text-light' : ''}" id="password">
                  ${this.status.indexOf('errorEmptyPass') != -1 ? '<div class="form-text text-danger">Поле не должно быть пустым</div>' : ''}
                  ${this.status.indexOf('errorPass') != -1 ? '<div class="form-text text-danger">Пароли не совпадают</div>' : ''}
                </div>
                <div class="mb-3">
                    <label class="form-label">Повторите пароль</label>
                    <input type="password" value="${this.repeatPassword}" class="form-control ${this.status.indexOf('errorEmptyReapetPass') != -1 ? 'bg-danger text-light' : ''} ${this.status.indexOf('errorPass') != -1 ? 'bg-danger text-light' : ''}" id="repeatPassword">
                    ${this.status.indexOf('errorEmptyReapetPass') != -1 ? '<div class="form-text text-danger">Поле не должно быть пустым</div>' : ''}
                    ${this.status.indexOf('errorPass') != -1 ? '<div class="form-text text-danger">Пароли не совпадают</div>' : ''}
                </div>
                

                <button type="submit" class="btn btn-primary  send-form-request">Отправить</button>
            `;
            this.sendFormRequest();
            this.changeInput();
        } 
    }
}


document.addEventListener("DOMContentLoaded", 
    
    (()=> {
        const form = new WorkingForm(document.querySelector('.form-container'), 'servis.php');
        

    })()
    
    );