
var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};  
fetch("http://localhost:5000/article", requestOptions)
.then(response => response.json())
.then((result) => {
  document.getElementById("alain").innerHTML = "";
  parseArticles(result);
})
.catch(error => console.log('error', error));

const parseArticles = (articlesArray)=> {
  const articleCardParser = (arrayElement) =>{
      const projectCard = `
      <div class="col-md-3">
        <div class="card mb-4 box-shadow">
          <img class="card-img-top" src="${arrayElement.image}" alt="no image" data-holder-rendered="true" style="height: 225px; width: 100%; display: block;" >
          <div class="card-body">
            <p class="card-text">${arrayElement.content}</p>
            <div class="d-flex justify-content-between align-items-center">
              <div class="btn-group">
                <button type="button" class="btn btn-sm btn-outline-secondary" id ="deleteArticleBtn" value="${arrayElement._id}">Delete</button>
                <a href="editblog.html?articleId=${arrayElement._id}"><button type="button" class="btn btn-sm btn-outline-secondary">Edit</button></a>
              </div>
              <small class="text-muted">${arrayElement.date}</small>
            </div>
          </div>
        </div>
      </div>
      `;
      document.getElementById("alain").innerHTML += projectCard;
  }
  articlesArray.forEach(articleCardParser);
}
let root = document.querySelector("#alain");
root.addEventListener("click", (e) => {
  switch (e.target.id) {
    case "deleteArticleBtn":
      deleteArticle(e.target.value);
      break;

  }
});

function deleteArticle(articleId){
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${localStorage.getItem("token")}`);
  var raw = JSON.stringify({
    "articleId": articleId
  });


fetch(`http://localhost:5000/article/${articleId}`,{
  method:'DELETE',
  headers: myHeaders,
})
  .then(response => response.json())
  .then(result => {
      alert("Article deleted");
      window.location.reload();
  })
  .catch(error => console.log('error', error));
}
   
