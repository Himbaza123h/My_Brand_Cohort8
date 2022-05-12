var myHeaders = new Headers();
myHeaders.append("Authorization",'Bearer'+ " " +window.localStorage.getItem("token"));
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "name": document.getElementById("name").value,
  "subject": document.getElementById("subject").value,
  "message": document.getElementById("message").value
});

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("https://my-brand-cohort8.herokuapp.com/queries", requestOptions)
  .then(response => response.json())
  .then((result) => {
    document.getElementById("himbaza").innerHTML = "";
    parsequeries(result);
    
  })
  //.catch(error => console.log('error', error));
    //.catch(error => console.log('error', error));

    const parsequeries = (queriesArray)=> {
        const queryCardParser = (arrayElement) =>{
            const projectCard = `
            <tr>
            <td id="name">${arrayElement.name}</td>
            <td id="subject">${arrayElement.subject}</td>
            <td id="message">${arrayElement.message}</td>
            <td>
             
              <button type="button" class="btn btn-danger" onclick="deleteQuery${arrayElement._id}">Delete</button>
            </td>
          </tr>
            `
            document.getElementById("himbaza").innerHTML += projectCard;
        }
        queriesArray.forEach(queryCardParser);
    }
    function deleteQuery(id){
        var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "QueryId": id
});

var requestOptions = {
  method: 'DELETE',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("https://my-brand-cohort8.herokuapp.com/queries/:id", requestOptions)
  .then(response => response.json())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
    }



    