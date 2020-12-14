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

            tableHTML +=
                '<tr>' +
                    '<td>' + `<p>${post.title} </td>` +
                    '<td>' + `<p>${post.content} </td>` +
                    '<td>' + `<p>${post.author} </td>` +
                    '<td>' + `<p class="date">${postDate.getFullYear()}-${postDate.getMonth()}-${postDate.getDate()}</p> </td>` +
                    `<td>
                        <a href="../admin/update-post.html?id=${post['_id']}">Update</a> |
                        <a href="#" class="delete-post-btn" data-id="${post['_id']}">Delete</a>
                    </td>`;
                '</tr>';

            /* tableHTML += `<td>${post.title}</td>`;
            tableHTML += `<td>${post.content}</td>`;
            tableHTML += `<td>${post.author}</td>`;
            tableHTML += `<td class="date">- ${postDate.getFullYear()}-${postDate.getMonth()}-${postDate.getDate()} </td>`;
            tableHTML += `<td><a href="admin/update-post.html?id=${post['_id']}">Update</a> |` +
                         `<a href="#" class="delete-post-btn" data-id="${post['_id']}">Delete</a></td>`; */
        }
        document.querySelector("table tbody").innerHTML = tableHTML;
        ;
    
    } catch (message) {
        throw new Error(message);
    }
    deletePostEvent();
}

function deletePostEvent() {
    let deleteBtns = document.getElementsByClassName('delete-post-btn');
    for (let deleteBtn of deleteBtns) {
        deleteBtn.addEventListener('click', async function(e) {
            e.preventDefault()

            let postId = "/" + this.dataset.id
            console.log(postId);

            try {
                await fetch('http://localhost:3000/posts' + postId, {
                    method: 'DELETE', // GET, POST, PATCH, DELETE
                });

                this.parentNode.parentNode.remove();
            } catch (message) {
                throw new Error(message);
            }
        
        })
    }
}