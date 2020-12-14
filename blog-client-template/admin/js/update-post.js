window.onload = function() {
    prefillForm();
    updatePost();
}

async function prefillForm() {
    let urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams.get('id'));

    try {
        let response = await fetch('http://localhost:3000/posts/' + urlParams.get('id'));
        let data = await response.json();
        console.log(data.content, data.title);

        document.getElementById('title').value = data.title;
        document.getElementById('author').value = data.author;
        document.getElementById('content').value = data.content;



    } catch (message) {
        throw new Error(message);
    }
}

function updatePost() {
    let urlParams = new URLSearchParams(window.location.search);
    
    let form = document.getElementById('update-post');
    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        let formData = new FormData(this);
        
        let postContent = {
            title: formData.get('title'),
            author: formData.get('author'),
            content: formData.get('content')
        }
        console.log(postContent);
        console.log(JSON.stringify(postContent));
    
        try {
            await fetch('http://localhost:3000/posts/' + urlParams.get('id'), {
                method: 'PATCH', // GET, POST, PATCH, DELETE
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postContent) // body data type must match "Content-Type" header
            });
    
            window.location.replace('index.html') // redirects to the index.html page
        } catch (message) {
            throw new Error(message);
        }
    });
}