<<<<<<< HEAD
<<<<<<< HEAD
let img ;

document.addEventListener("DOMContentLoaded",function (e) {                 
  document.querySelector("#image").addEventListener("change",function(){
  const reader = new FileReader();

  reader.addEventListener("load",() =>{
       img = reader.result;
  });

  reader.readAsDataURL(this.files[0]);
  })
  
})

const addform = document.getElementById("personalInfoForm")
addform.addEventListener("submit",(e)=>{
  e.preventDefault()

  const newArticle = {
    heading :document.getElementById("heading").value,
    content : document.getElementById("content").value,
    image: img,
 }
  let  bearer = `Bearer ${localStorage.getItem("token")}`;
   fetch('http://localhost:5000/article', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Authorization': bearer
      },
      body: JSON.stringify(newArticle)
      }).then(res => {
       if(res.ok){
         alert("New article Added successfully");
         window.location= 'blog.html';
       }
      }).catch((err)=>{
         alert("Problem connecting to the server")
      })
    });
=======
=======
>>>>>>> 1a23486134e34121f8e9d822622b9224bc360e09
const addform = document.getElementById("personalInfoForm")
addform.addEventListener("submit",(e)=>{
  e.preventDefault()
  const token = window.localStorage.getItem("token")
  
  var myHeaders = new Headers();
//myHeaders.append("", "");
myHeaders.append("Authorization",'Bearer'+ " "+ token ) ;
var formdata = new FormData();
formdata.append("heading", document.getElementById("heading"));
formdata.append("content", document.getElementById("content"));
formdata.append("image", fileInput.files[0], document.getElementById("image"));

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: formdata,
  redirect: 'follow'
};

fetch("https://my-brand-cohort8.herokuapp.com/articles", requestOptions)
  .then(response => response.json())
  .then((result) => console.log(result))
  .catch(error => console.log('error', error));
<<<<<<< HEAD
})
>>>>>>> 1a23486134e34121f8e9d822622b9224bc360e09
=======
})
>>>>>>> 1a23486134e34121f8e9d822622b9224bc360e09
