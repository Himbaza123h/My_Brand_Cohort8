function ValidateEmail(inputText)
{
var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
if(inputText.value.match(mailformat))
{
alert("Valid email address!");
document.form1.text1.focus();
return true;
}
else
{
alert("You have entered an invalid email address!");
document.form1.text1.focus();
return false;
}
$('.form-control md-textarea').on('keyup' , function(){
	if($('input').val().length > 0 && $('textarea').val().length > 0){
		$('.btn btn-primary').prop('disabled', false);
	}
	else{
		$('.btn btn-primary').prop('disabled', true);
	}
});

