window.onload = function() { // Waits for the HTML document to completely load, before running the function
    fetchBlogpost(); 
}

async function fetchBlogpost() {

    try {
        let response = await fetch('http://localhost:3000/posts');
        let data = await response.json();

        let tableHTML = '';
        for (let post of data.reverse()) {
            console.log(post);

            let postDate = new Date(post.date);

            tableHTML += //html skrukturen för varje film hämtning
            `<div class="row">
                 <h2>${post.title}</h2>
                 <p><span class="date">- ${postDate.getFullYear()}-${postDate.getMonth()}-${postDate.getDate()}</span></p>
                 <p>${post.content}</p>
                 <p>${post.author}</p>
           </div>`;
        }
        document.getElementById("content-postschema").innerHTML = tableHTML;
    
    } catch (message) {
        throw new Error(message);
    }
}




// function ShowBlogposts(post){
//     let url = 'http://localhost:3000/posts';
     
//      console.log(url)
   
//      fetch(url)
//      .then((response) => {
//          if (!response.ok) {
//              throw new Error('Somethings wrong with your request');
//          }
//          return response.text();
//      })
//      .then((data) => {
//        var blogposts = JSON.parse(data);
   
//        for (var blog of blogposts) { //loopar genom hämtade url med användarens sökning
//          ShowBlogposts(blog)
//        }
       
//      })
//      .catch((error) => { //fångar fel
//          console.log(error);
//      })
  
//      let showResult = document.getElementById("content-postschema");
//      let htmlResult = //html skrukturen för varje film hämtning
//      `<div class="row">
//           <h2>${post.title}</h2>
//           <p>${post.date}</p>
//           <p>${post.content}</p>
//           <p>${post.author}</p>
//     </div>`;
  
//      showResult.innerHTML += htmlResult;
//    }