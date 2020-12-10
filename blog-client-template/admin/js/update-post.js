window.onload = function() {
    prefillForm();
    updatePunEvent();
}

async function prefillForm() {
    let urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams.get('id'));

    try {
        let response = await fetch('https://puns-app.herokuapp.com/puns/' + urlParams.get('id'));
        let data = await response.json();
        console.log(data.content);

        document.getElementById('content').value = data.content;

    } catch (message) {
        throw new Error(message);
    }
}

function updatePunEvent() {
    let urlParams = new URLSearchParams(window.location.search);
    
    let form = document.getElementById('update-post');
    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        let formData = new FormData(this);
        let object = {content: formData.get('content')}
        console.log(object);
        console.log(JSON.stringify(object));
    
        try {
            await fetch('https://puns-app.herokuapp.com/puns/' + urlParams.get('id'), {
                method: 'PATCH', // GET, POST, PATCH, DELETE
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(object) // body data type must match "Content-Type" header
            });
    
            window.location.replace('index.html') // redirects to the index.html page
        } catch (message) {
            throw new Error(message);
        }
    });
}