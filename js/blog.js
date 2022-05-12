/*var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };  
    fetch("https://my-brand-cohort8.herokuapp.com/articles", requestOptions)
    .then(response => response.json())
    .then((result) => {
        document.getElementById("alain").innerHTML = "";
        parseArticles(result);
    })
    console.log(result)
    .catch(error => console.log('error', error));    

    const parseArticles = (articlesArray)=> {
        const articleCardParser = (arrayElement) =>{
            const projectCard = `
            <div class="">
            <div class="card mb-4 box-shadow">
              

              <div class="card-body">
              <img class="card-img-top" data-src="${arrayElement.image}" alt="no image" data-holder-rendered="true" style="height: 225px; width: 100%; display: block;" src="">
                <p class="card-text">${arrayElement.content}</p>
                <div class="d-flex justify-content-between align-items-center">
                  <div class="btn-group">
                   <button type="button" class="btn btn-sm btn-outline-secondary" onclick="getArticle(${arrayElement._id})">View more details</button>
                  
                  </div>
                  <small class="text-muted">${arrayElement.date}</small>
                </div>
              </div>
            </div>
          </div>
            `
            document.getElementById("alain").innerHTML += projectCard;
        }
        articlesArray.forEach(articleCardParser);
    }
    function getArticle(_id){
 
      var raw = "";

      var requestOptions = {
        method: 'GET',
        body: raw,
        redirect: 'follow'
      };
      
      fetch("https://my-brand-cohort8.herokuapp.com/articles/:id", requestOptions)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
  }*/