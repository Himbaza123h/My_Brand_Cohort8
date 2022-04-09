new JustValidate('.modal-body', {
    rules: {
        
        "Email": {
            "required": true,
            "minLength": 1,
            "maxLength": 100,
            "email": true
        },
        "Password": {
            "required": true,
            "minLength": 6,
            "maxLength": 3000
        }
    },
    colorWrong: '#dc3545',
    focusWrongField: true,
    submitHandler: function (cform, values, ajax) {

        var button_value = getButtonValue('btn btn-primary btn-md btn-block');
        disableButton('btn btn-primary btn-md btn-block');
        ajax({
            url: cform.getAttribute('action'),
            method: 'POST',
            data: values,
            async: true,
            callback: function (response) {
                var done = false;
                if (response.indexOf('Fail:') == 0) {
                    // configration problem
                    showFailMessage(response);
                    enableButon('btn btn-primary btn-md btn-block', button_value);
                    done = true;
                }

                if (response.indexOf('Error:') == 0) {
                    // validation problem
                    showErrorMessage(response);
                    enableButon('btn btn-primary btn-md btn-block', button_value);
                    done = true;
                }

                if (response.indexOf('Success') == 0) {
                    showSuccessMessage(response);
                    done = true;
                }

                if (response.indexOf('Debug:') == 0) {
                    showDebugMessage(response);
                    enableButon('btn btn-primary btn-md btn-block', button_value);
                    done = true;
                }

                if (done == false) {
                    showErrorMessage('Error:Sorry, an unexpected error occurred. Please try later.');
                    enableButon('fbtn btn-primary btn-md btn-block', button_value);
                }

            }
        });

    },
});

function getButtonValue(id) {
    return document.getElementById(id).innerText;
}

function disableButton(id) {
    document.getElementById(id).innerText = 'Wait Pls...';
    document.getElementById(id).disabled = true;
}

function enableButon(id, val) {
    document.getElementById(id).innerText = val;
    document.getElementById(id).disabled = false;
}

function showFailMessage(message) {
    var display = '<strong>Unexpected errors. </strong>(form has been misconfigured)<br>';
    display += message.substring(5);
    document.getElementById('btn btn-primary btn-md btn-block').innerHTML = display;
}

function showErrorMessage(message) {
    var display = '<strong>Validation problem:</strong><br>';
    display += message.substring(6);
    document.getElementById('btn btn-primary btn-md btn-block').innerHTML = display;
}

function showDebugMessage(message) {
    var display = '<strong>Debug details.</strong><br>(Please remember to switch off DEBUG mode when done!)<br>';
    display += message.substring(6);
    document.getElementById('btn btn-primary btn-md btn-block').innerHTML = display;
}

// Removing this credit is NOT allowed
// Please purchase a pro license for credit removal rights
var creditcontainer = document.querySelector(".buttons");
var creditdiv = document.createElement('div');


function showSuccessMessage(message) {
    var message = '<br><br>' + message.substring(8);
    var content = document.getElementById('fcf-thank-you').innerHTML;
    document.getElementById('fcf-thank-you').innerHTML = content + message;
    document.getElementById('fcf-status').innerHTML = '';
    document.getElementById('fcf-form').style.display = 'none';
    document.getElementById('fcf-thank-you').style.display = 'block';
}