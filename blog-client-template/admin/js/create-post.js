let form = document.getElementById('new-post');
form.addEventListener('submit', createPun);

async function createPun(e) {
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
        await fetch('http://localhost:3000/posts', {
            method: 'POST', // GET, POST, PATCH, DELETE
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(postContent) // body data type must match "Content-Type" header
        });
    
        window.location.replace('index.html') // redirects to the index.html page
        } catch (message) {
            throw new Error(message);
    }
}

function formatFormData(formData) {
    let obj = {};
    for (let key of formData.keys()) {
        obj[key] = formData.get(key);
    }

    return obj;
}