new JustValidate('.fcf-form-class', {
    rules: {
        "Name": {
            "required": true,
            "minLength": 3,
            "maxLength": 100
        },
        "Email": {
            "required": true,
            "minLength": 10,
            "maxLength": 100,
            "email": true
        },
        "subject": {
            "required": true,
            "minLength": 5,
            "maxLength": 40
        },
        "Message": {
            "required": true,
            "minLength": 10,
            "maxLength": 3000
        }
    },
   
});

function getButtonValue(id) {
    //return document.getElementById(id).innerText;
}

function enableButon(id, val) {
    document.getElementById(id).innerText = val;
    document.getElementById(id).disabled = false;
}

function showFailMessage(message) {
    var display = '<strong>Unexpected errors. </strong>(form has been misconfigured)<br>';
    display += message.substring(5);
    document.getElementById('fcf-status').innerHTML = display;
}

function showErrorMessage(message) {
    var display = '<strong>Validation problem:</strong><br>';
    display += message.substring(6);
    document.getElementById('fcf-status').innerHTML = display;
}

function showDebugMessage(message) {
    var display = '<strong>Debug details.</strong><br>(Please remember to switch off DEBUG mode when done!)<br>';
    display += message.substring(6);
    document.getElementById('fcf-status').innerHTML = display;

if(success){

    let myHeaders = new Headers();
    myHeaders.append("x-auth-token", window.localStorage.getItem("x-auth-token"));
    myHeaders.append("Content-Type", "application/json");
  
    let raw = JSON.stringify({
                "name": document.getElementById("name").value,
                "email": document.getElementById("amail").value,
                "subject": document.getElementById("subject").value,
                "message": document.getElementById("message").value
            });
  
    let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
  
    fetch("https://my-brand-cohort8.herokuapp.com/queries", requestOptions)
    .then(response => response.json())
    .then((result) => {
        formResetor();
    })
    .catch(error => console.log('error', error));
  }
}