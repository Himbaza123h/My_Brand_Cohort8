var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };  
    fetch("https://my-brand-cohort8.herokuapp.com/articles", requestOptions)
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
                      <a href="blog4.html#${arrayElement._id}"><button type="button" class="btn btn-sm btn-outline-secondary">View more</button></a>
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
    