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
        
        let updateTitle = {content: formData.get('title')}
        let updateContent = {content: formData.get('content')}
        console.log(updateContent, updateTitle);
        console.log(JSON.stringify(updateContent, updateTitle));
    
        try {
            await fetch('http://localhost:3000/posts/' + urlParams.get('id'), {
                method: 'PATCH', // GET, POST, PATCH, DELETE
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updateContent, updateTitle) // body data type must match "Content-Type" header
            });
    
            window.location.replace('index.html') // redirects to the index.html page
        } catch (message) {
            throw new Error(message);
        }
    });
}