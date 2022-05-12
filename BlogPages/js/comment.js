var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  const articleId = location.hash.substring(1)
  fetch(`https://my-brand-cohort8.herokuapp.com/articles/${articleId}`, requestOptions)
  .then(response => response.json())
  .then((result) => {
      var image = document.getElementById("image")
      image.setAttribute('src', `${result.image}`)
      var content = document.getElementById("paragraph")
      content.innerHTML = `${result.content}`
  })

//fetch likes for an article
  fetch(`http://localhost:5000/like/article/${articleId}`, requestOptions)
  .then(response => response.json())
  .then((result) => {
      let likes = document.querySelector("#like");

     likes.innerHTML = `${result.likes}`;

  })
//fetch dislikes for an article
    fetch(`http://localhost:5000/like/dislike/${articleId}`, requestOptions)
    .then(response => response.json())
    .then((result) => {
        document.querySelector("#dislike").innerHTML = `${result.dislikes}`
    })

//fetch comments for an article
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  fetch(`https://my-brand-cohort8.herokuapp.com/articles/${articleId}/comments`, requestOptions)
  .then(response => response.json())
  .then((result) => {
      var comment = document.getElementById("comment")
     // comment.innerHTML = `${result.comment}`
    //console.log(result.comments)
      parseComments(result.comments);
  })
  const parseComments = (commentsArray)=> {
    const commentCardParser = (arrayElement) =>{
        const projectCard = `
        <div class="card-body" id="comment">
        <div class="media">
        <div class="media-body">
            <h5 class="media-heading" align="left">User</h5><br>
            <p id="comment">${arrayElement.comment}</p><br>
            <ul class="list-unstyled list-inline media-detail pull-left">
                <li></i>${arrayElement.date}</li><br>
            </ul>
           </div> 
        </div>
    </div>
        `
        document.getElementById("comment").innerHTML += projectCard;
    }
    commentsArray.forEach(commentCardParser)
}


document.body.addEventListener("click", (e) => {
    const articleId = location.hash.substring(1);
    switch (e.target.id) {
        case "likeBtn":
           likeArticle(articleId);
            break;  
        case "dislikeBtn":
            dislikeArticle(articleId);
            break;
        case "commentBtn":
            commentArticle(e.target.value);
            break;
    }
});

function likeArticle(articleId){
    if(localStorage.getItem("token")){
      let  bearer = `Bearer ${localStorage.getItem("token")}`;
       fetch('http://localhost:5000/like', {
          method: 'POST',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Authorization': bearer
          },
          body: JSON.stringify({
              articleId: articleId
          })
          }).then(res => {
           if(res.status == 201){
            alert("Liked successfully");
            window.location.reload();
           }else if(res.status == 405){
            alert("You have already liked this article");
           }
          }).catch((err)=>{
            // alert("Problem connecting to the server")
          })
        }else{
            alert("Please login to like this article")
        }
}

function dislikeArticle(articleId){
    if(localStorage.getItem("token")){
        let  bearer = `Bearer ${localStorage.getItem("token")}`;
            fetch('http://localhost:5000/like/'+ articleId, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                    'Authorization': bearer
                },
                body: JSON.stringify({
                    articleId: articleId
                })
                }).then(res => {
                    if(res.status == 201){
                        alert("Disliked successfully");
                        window.location.reload();
                    }else if(res.status == 405){
                        alert("You have already disliked this article");
                    }
                }).catch((err)=>{
                    alert("Problem connecting to the server")
                }
            )
        }else{
            alert("Please login to dislike this article")
        }
}
