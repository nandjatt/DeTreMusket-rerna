let form = document.getElementById('new-post');
form.addEventListener('submit', createPun);

async function createPun(e) {
    e.preventDefault();

    let formData = new FormData(this);

    let object = {
        // content: document.getElementById('content-textarea').value
        content: formData.get('content')
    }

    try {
        await fetch('https://puns-app.herokuapp.com/puns', {
            method: 'POST', // GET, POST, PATCH, DELETE
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(object) // body data type must match "Content-Type" header
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