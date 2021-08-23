let user = document.getElementById('user');
let password = document.getElementById('password');
let log_in_button = document.getElementById('log_in');
let user_name = localStorage.getItem('user_name')
let login_info = document.getElementById('login_info');

user.value = "hase744";
password.value = "password";

const log_in_message = function(){
    log_in_button.value = "ログアウト";
    login_info.innerText = `${user_name}でログイン`;
}

const log_out_message = function(){
    log_in_button.value = "ログイン";
    login_info.innerText = "ログインしていません";
}

function if_log_in(log_in_message, log_out_message){
    console.log("if_log_in" + user_name)
    if(user_name != null){
        log_out_message
        //log_in_button.value = "ログアウト";
        //login_info.innerText = `${user_name}でログイン`;
    }else{
        log_in_message
        //log_in_button.value = "ログイン";
        //login_info.innerText = "ログインしていません";
    }
}

function log_in_out(){
    if(user_name == null){
       log_in();
    }else{
        log_out();
    }
}

function log_in(){
    fetch('/user/log_in', { 
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `user=${user.value}&password=${password.value}`,
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data.user);
        console.log('password:', data.password);
        console.log('registered:', data.can_log_in);
        if(data.can_log_in == true){
            localStorage.setItem('user_name',data.user);
            user_name = localStorage.getItem('user_name')
            log_in_button.value = "ログアウト"
            login_info.innerText = `${user_name}でログイン`;
        }else{
            login_info.innerText = "ユーザーネーム、もしくはパウワードが違います";
        }

      })
      .catch((error) => {
        console.error('Error:', error);
      });
}

function log_out(){
    //localStorage.setItem("user_name",null)
    localStorage.removeItem("user_name")
    log_in_button.value = "ログイン";
    login_info.innerText = "ログインしていません";
}

if_log_in(log_in_message, log_out_message);
log_in_button.onclick = log_in_out;