const addform = document.getElementById("personalInfoForm")
const articleide = location.hash.substring(1)
//console.log(articleide)
addform.addEventListener("submit",(e)=>{
  e.preventDefault()
  const token = window.localStorage.getItem("token")
  console.log(token)
  var myHeaders = new Headers();
  myHeaders.append("Authorization",'Bearer'+ " " +window.localStorage.getItem("token")) ;
   myHeaders.append("Content-Type", "application/json");
  
  var raw = JSON.stringify({
    "articleId": articleide,
    "comment": document.getElementById("comment").value
  });
  
  var requestOptions = {
    method: 'POST',
    headers: myHeadsers,
    body: raw,
    redirect: 'follow'
  };
  
  fetch("https://my-brand-cohort8.herokuapp.com/articles/{articleId}/comments", requestOptions)
    .then(response => response.json())
    .then((result) => console.log(result))
    .catch(error => console.log('error', error));
})