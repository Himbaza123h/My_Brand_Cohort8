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
