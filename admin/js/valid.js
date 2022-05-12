function validate(schema, object) {
  // return new Promise((resolve, reject) => {
  this.objectSchema = {};
  let errors = {};
  let validated = {};
  for (let key in schema) {
    this.objectSchema[key] = {
      rules: schema[key].split(","),
    };
  }
  for (let key in object) {
    if (this.objectSchema[key]) {
      errors[key] = [];
      for (let rule of this.objectSchema[key].rules) {
        let result = separator(rule);
        if (validateFunctions.checkType(result.type)) {
          let valid;
          if (result.type !== "reference") {
            valid = validateFunctions[result.type](
              object[key],
              result.min,
              result.max
            );
          } else {
            valid = validateFunctions[result.type](
              object[key],
              object[result.reference]
            );
          }
          if (valid.errors) {
            errors[key].push(...valid.errors);
            break;
          } else validated[key] = valid.value;
        } else {
          throw new Error("invalid schema");
        }
      }
      if (!errors[key].length) delete errors[key];
    }
  }
  if (Object.keys(errors).length) {
    return { value: null, errors };
  }
  return { value: validated };
  // });
}

function withForm(target, schema, onSuccess) {
  let form = document.querySelector(`#${target}`);
  if (!form) return console.log(`form with id ${target}  not found`);
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    let object = {};
    for (let key in schema) {
      if (form[key]) {
        object[key] = form[key].value;
        form[key].classList.add("success");
      }
    }
    let result = validate(schema, object);
    if (result.errors && Object.keys(result.errors).length) {
      for (let errorKey in result.errors) {
        appendFor(form[errorKey], result.errors[errorKey], errorKey);
      }
    } else {
      for (let key in schema) {
        if (form[key]) {
          form[key].classList.remove("error");
          form[key].classList.remove("success");
          form[key].value = "";
          // object[element].element = form[key].value;
        }
      }
      return onSuccess(result.value);

  
    }
  });
}
function appendFor(target, error, errorKey, classList = [], timeout = 3000) {
  if (!target) return "";
  target.classList.remove("success");
  target.classList.add("error");
  let errorElement = document.getElementById(`error-${errorKey}`);
  if (errorElement) errorElement.textContent;
  else errorElement = document.createElement("div");
  errorElement.textContent = errorKey + " " + error;
  errorElement.id = `error-${errorKey}`;
  errorElement.classList.add("error-box");
  target.parentNode.append(errorElement);
  setTimeout(() => {
    errorElement.textContent = "";
    target.classList.remove("error");
  }, timeout);
}

function separator(rule) {
  let result = {};
  if (!rule || !rule.includes("[")) {
    result.type = rule.toLowerCase().replace(/[^a-z]/g, "");
    return result;
  }
  rule = rule.replace(/\s/g, "");
  let type = rule
    .slice(0, rule.indexOf("["))
    .replace(/[^a-z]/g, "")
    .trim();
  result.type = type;
  rule = rule.slice(rule.indexOf("[")).trim();
  const regex = /\[(\d*\:*\d*)\]/;
  if (rule && regex.test(rule)) {
    if (rule.includes(":")) {
      let [min, max] = rule
        .replace(/[\[\]\:]/g, " ")
        .trim()
        .split(" ");
      if (max < min) {
        let temp = max;
        max = min;
        min = temp;
      }
      if (!isNaN(max)) {
        result.min = parseInt(min);
        result.max = parseInt(max);
      } else {
        result.max = parseInt(min);
      }

      return result;
    }
    let min = rule.replace(/[\[\]\:]/g, " ").trim();
    result.min = parseInt(min);
    return result;
  } else if (rule && /\[(\w*)\]/.test(rule)) {
    let reference = rule.replace(/[\[\]]/g, " ").trim();
    result.reference = reference;
  }
  return result;
}
const validateFunctions = {
  checkType: function (type) {
    return ["string", "number", "required", "reference", "email"].includes(
      type
    );
  },
  string: function (data, minLength, maxLength) {
    let errors = [];
    if (typeof data !== "string") errors.push("not a string");
    if (minLength && data.length < minLength)
      errors.push(`can neither be blank nor less than ${minLength} characters`);
    if (maxLength && data.length > -maxLength)
      errors.push(`must be no more than ${maxLength} characters`);
    if (errors.length) return { value: null, errors };
    return { value: data };
  },
   number: function (data) {
    let errors = [];
    if (!data)
      errors.push(`can't be blank`);
    if (errors.length) return { value: null, errors };
    return { value: data };
  },
 
  required: function (data) {
    let errors = [];
    if (!data) errors.push("must be uploaded to continue");
    if (errors.length) return { value: null, errors };
    return { value: data };
  },
  reference: function (data, referenceData) {
    let errors = [];
    if (data !== referenceData) errors.push("don't match");
    if (errors.length) return { value: null, errors };
    return { value: data };
  },
  email: function (data) {
    let errors = [];
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data))
      errors.push("is not valid");
    if (errors.length) return { value: null, errors };
    return { value: data };
  },
  // regeX: function (regex) {
  //   let regexExp = new RegExp(regex);
  //   if (!regexExp.test(data)) throw new Error("not valid");
  //   return data;
  // },
};

// const schema = {
//   fname: "string",
//   lname: "string[2]",
//   size: "number[2]",
// };

// console.log(validate(schema, { fname: "1", lname: "ok", size: 2 }));

let personalInfoSchema = {
 
 heading: "string[5]",
 image: "required",
 content: "string[10]",
};


function onSuccess(data) {
console.log(data)

};

// const addform = document.getElementById("personalInfoForm")
// addform.addEventListener("submit",()=>{
//   var myHeaders = new Headers();
//   //myHeaders.append("", "");
//   myHeaders.append("Authorization",'Bearer'+ " " +window.localStorage.getItem("token")) ;
//   const headingvalue = document.getElementById("heading").value
//   const contentalue = document.getElementById("content").value
//   const imagevalue = document.getElementById("image").value
//   var formdata = new FormData();
//   formdata.append("heading", `${headingvalue}`);
//   formdata.append("content", `${contentalue}`);
//   formdata.append("image", image.files[0]);
//   var requestOptions = {
//     method: 'POST',
//     mode: 'no-cors',
//     headers: myHeaders,
//     body: formdata,
//     redirect: 'follow',
//   }
//   async function article(){
//     const array = await fetch("https://my-brand-cohort8.herokuapp.com/articles/", requestOptions)
//     console.log(await array.json())
//   }
  
//    article()
  // .then(response => response.json())
  // .then(result => {
  //   console.log(result)
  //  window.location.href = "index.html"
  // })
//   .catch(error => console.log('error', error));
//})

withForm("personalInfoForm", personalInfoSchema, onSuccess);
//This must be the part of this javascript page

window.addEventListener("DOMContentLoaded", () => {
  const toggler = document.querySelector("#toggler");
  const nav = document.querySelector("#navigation");
  const adminContent = document.querySelector("#admin-content");
  const sidebar = document.querySelector("#sidebar");
  if (toggler)
    toggler.addEventListener("click", (e) => {
      e.preventDefault();
      nav.classList.toggle("height-0");
      nav.parentNode.classList.toggle("active");
      console.log(nav);
    });

  const sidebarToggler = document.querySelector("#sidebar-toggler");
  if (sidebarToggler)
    sidebarToggler.addEventListener("click", () => {
      sidebarToggler.parentElement.classList.toggle("active");
      adminContent.classList.toggle("active");
      sidebar.classList.toggle("active");
    });
});

const toast = function (description, timeOut = 3000) {
  let element = document.createElement("div");
  element.classList.add("toast");
  element.innerHTML = description;
  document.body.append(element);
  element.classList.add("animated-bottom");
  setTimeout(() => {
    document.body.removeChild(element);
  }, timeOut);
}
