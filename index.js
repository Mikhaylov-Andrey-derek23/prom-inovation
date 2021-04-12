class WorkingForm{
    constructor(form, path){
        this.form = form;
        this.path = path;
        this.result = false;
        this.status = [];
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

        if(document.getElementById('name').value == ''){
            status.push('errorName')
        }

        if(document.getElementById('surname').value == ''){
            status.push('errorSurname')
        }

        if(document.getElementById('email').value == ''){
            status.push('errorEmptyEmail')
        }

        if(status.indexOf('errorEmptyEmail') == -1){
            const re  = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(!re.test(document.getElementById('email').value)){
                status.push('errorEmail');
            }
        }

        if(document.getElementById('password').value == ''){
            status.push('errorEmptyPass')
        }

        if(document.getElementById('repeatPassword').value == ''){
            status.push('errorEmptyReapetPass')
        }

        if(status.indexOf('errorEmptyEmail') == -1 && status.indexOf('errorEmptyReapetPass') == -1){
            if(document.getElementById('password').value != document.getElementById('repeatPassword').value){
                status.push('errorPass');
            }
        }


        this.status = status;
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
                  <input type="text" class="form-control ${this.status.indexOf('errorName') != -1 ? 'bg-danger text-light' : ''}" id="name">
                  ${this.status.indexOf('errorName') != -1 ? '<div class="form-text text-danger">Поле не должно быть пустым</div>' : ''}
                </div>
                <div class="mb-3">
                  <label class="form-label">Фамилия</label>
                  <input type="text" class="form-control ${this.status.indexOf('errorSurname') != -1 ? 'bg-danger text-light' : ''}" id="surname">
                  ${this.status.indexOf('errorSurname') != -1 ? '<div class="form-text text-danger">Поле не должно быть пустым</div>' : ''}
                </div>
                <div class="mb-3">
                  <label class="form-label">Email</label>
                  <input type="email" class="form-control ${this.status.indexOf('errorEmptyEmail') != -1 ? 'bg-danger text-light' : ''} ${this.status.indexOf('errorEmail') != -1 ? 'bg-danger text-light' : ''} ${this.status.indexOf('errorDoubleEmail') != -1 ? 'bg-danger text-light' : ''}" id="email">
                  ${this.status.indexOf('errorEmptyEmail') != -1 ? '<div class="form-text text-danger">Поле не должно быть пустым</div>' : ''}
                  ${this.status.indexOf('errorEmail') != -1 ? '<div class="form-text text-danger">Не валидный email</div>' : ''}
                  ${this.status.indexOf('errorDoubleEmail') != -1 ? '<div class="form-text text-danger">Данный email зарегистрирован</div>' : ''}
                </div>
                <div class="mb-3">
                  <label lass="form-label">Пароль</label>
                  <input type="password" class="form-control ${this.status.indexOf('errorEmptyPass') != -1 ? 'bg-danger text-light' : ''} ${this.status.indexOf('errorPass') != -1 ? 'bg-danger text-light' : ''}" id="password">
                  ${this.status.indexOf('errorEmptyPass') != -1 ? '<div class="form-text text-danger">Поле не должно быть пустым</div>' : ''}
                  ${this.status.indexOf('errorPass') != -1 ? '<div class="form-text text-danger">Пароли не совпадают</div>' : ''}
                </div>
                <div class="mb-3">
                    <label class="form-label">Повторите пароль</label>
                    <input type="password" class="form-control ${this.status.indexOf('errorEmptyReapetPass') != -1 ? 'bg-danger text-light' : ''} ${this.status.indexOf('errorPass') != -1 ? 'bg-danger text-light' : ''}" id="repeatPassword">
                    ${this.status.indexOf('errorEmptyReapetPass') != -1 ? '<div class="form-text text-danger">Поле не должно быть пустым</div>' : ''}
                    ${this.status.indexOf('errorPass') != -1 ? '<div class="form-text text-danger">Пароли не совпадают</div>' : ''}
                </div>
                

                <button type="submit" class="btn btn-primary  send-form-request">Отправить</button>
            `;
            this.sendFormRequest();
        } 
    }
}


document.addEventListener("DOMContentLoaded", 
    
    (()=> {
        const form = new WorkingForm(document.querySelector('.form-container'), 'servis.php');
        

    })()
    
    );