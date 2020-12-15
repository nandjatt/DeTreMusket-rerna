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
                 <h2 class="rubrik-text">${post.title}</h2>
                 <p><span class="date">- ${postDate.getFullYear()}-${postDate.getMonth()}-${postDate.getDate()}</span></p>
                 <p class="content-text">${post.content}</p>
                 <p class="author-text">${post.author}</p>
           </div>`;
        }
        document.getElementById("content-postschema").innerHTML = tableHTML;
    
    } catch (message) {
        throw new Error(message);
    }
}
