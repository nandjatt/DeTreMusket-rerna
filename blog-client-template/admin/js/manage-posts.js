window.onload = function() { // Waits for the HTML document to completely load, before running the function
    fetchAllPuns();
}


async function fetchAllPuns() {

    try {
        let response = await fetch('https://puns-app.herokuapp.com/puns');
        // let response = await fetch('http://localhost:3000/puns');
        let data = await response.json();

        let punsHTML = '';
        for (let pun of data.reverse()) {
            console.log(pun);
            punsHTML += `<li class="list-group-item">`

            punsHTML += `<p>${pun.content}`;

            let punDate = new Date(pun.date);
            punsHTML += `<br> <span class="date">- ${punDate.getFullYear()}-${punDate.getMonth()}-${punDate.getDate()}</span> </p>`;
            
            punsHTML += `<div>`;
            punsHTML += `<a href="update-pun.html?id=${pun['_id']}">Update</a> | `;
            punsHTML += `<a href="#" class="delete-pun-btn" data-id="${pun['_id']}">Delete</a> `;
            punsHTML += `</div>`;

            punsHTML += `</li>`;

            
        }

        document.getElementById('pun-list').innerHTML = punsHTML;
    } catch (message) {
        throw new Error(message);
    }


    /**
     * Add here an eventlistener to all delete-links, 
     * that makes a request to delete the chosen pun from DB, 
     * And also deletes the pun from the DOM
     * 
     * 1. Begin with selecting all delete-links with an appropiate element selector
     * 2. Loop through all delete-links and add an eventlistener for each delete-link,
     * 3. The eventlisteners should be triggered on the 'click'-event
     * 4. Make sure to use preventDefault(), to prevent the link from reloading the page
     * 5. When triggered, the eventlistener should make a "DELETE" request to the URL: https://puns-app.herokuapp.com/puns/<punID>, and the <punId> should be retrieved from delete-link data-attribute => 'this.dataset.id'
     * 6. Make sure to remove() the whole pun from DOM.
     */

    deletePunEvent();
}

function deletePunEvent() {
    let deleteBtns = document.getElementsByClassName('delete-pun-btn');
    for (let deleteBtn of deleteBtns) {
        deleteBtn.addEventListener('click', async function(e) {
            e.preventDefault()

            let punId = this.dataset.id
            console.log(punId);

            try {
                await fetch('https://puns-app.herokuapp.com/puns/' + punId, {
                    method: 'DELETE', // GET, POST, PATCH, DELETE
                });

                this.parentNode.parentNode.remove();
            } catch (message) {
                throw new Error(message);
            }
        
        })
    }
}