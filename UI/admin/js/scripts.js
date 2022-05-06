var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };  
    fetch("https://my-brand-cohort8.herokuapp.com/articles", requestOptions)
    .then(response => response.json())
    .then((result) => {
        document.getElementById("col-md-4").innerHTML = "Articles";
        parseArticles(result);
    })
    .catch(error => console.log('error', error));

    const parseArticles = (articlesArray)=> {
        const articleCardParser = (arrayElement) =>{
            const projectCard = `
            <a href="articles/?id=${arrayElement._id}" >
                <div class="card mb-4 box-shadow">
                    <img src="${arrayElement.previewImageURL}" class="card-img-top">
                    <div class="card-body">
                        <p class="card-text"><strong>${arrayElement.content}</strong></p>
                        <small class="text-muted">NEWS | ${arrayElement.readingTime}</small>
                    </div>
                </div>
            </a>
            `
            document.getElementById("col-md-4").innerHTML += projectCard;
        }
        articlesArray.forEach(articleCardParser);
    }