let user = document.getElementById('user');
let password = document.getElementById('password');
let sign_up = document.getElementById('sign_up');
let user_name = localStorage.getItem('user_name')
let login_info = document.getElementById('login_info');

user.value = "hase744"
password.value = "password"
var req = new XMLHttpRequest();



sign_up.onclick = fetch_func;

window.onload = function(){
    if(user_name == "" || user_name == null){
        console.log("ログインしていません")
        login_info.innerText = "サインアップ"
    }else{
        login_info.innerText = `${user_name}でログイン`
    }
}
function sigu_up(){
    console.log(user.value);
    req.open('POST', '/user/sign_up', true);
    req.datatype = "html"
    req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    req.withCredentials = true;
    console.log(req)
    console.log( "xhr.responseText : " + req[1] );
    req.onreadystatechange = respond(req);
    req.send(`user=${user.value}&password=${password.value}`);
    //localStorage.setItem('user_name',user.value);
    user_name = localStorage.getItem('user_name')
    console.log(user.value);
    console.log(user_name);
    
}

function fetch_func(){
    console.log("fech_func")
    fetch('/user/sign_up', {
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
        console.log('registered:', data.registered);
        if(data.registered == true){
            log_in(data.user, data.password)
        }else{
            login_info.innerText = "登録されています"
        }

      })
      .catch((error) => {
        console.error('Error:', error);
      });
}

function respond(xhr) {
    console.log(`xhr.readyState : ${xhr.readyState}, xhr.status : ${xhr.status}`);
    console.log( "xhr.responseText : " + xhr.responseText );
}

function log_in(user,password){
    localStorage.setItem('user_name',user);
    user_name = localStorage.getItem('user_name')
    console.log(user)
    console.log(localStorage.getItem('user_name'))
    login_info.innerText = `${user_name}でログイン`
}

function logOut(){
    localStorage.setItem('user_name',null);
    console.log(localStorage.getItem('user_name'))
    window.location.href = '/user/sign_up';
}