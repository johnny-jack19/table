const userTable = document.getElementById('user-table');
const modal = document.getElementById('modal');
fetch('https://jsonplaceholder.typicode.com/users')
  .then((response) => response.json())
  .then((json) => {for (user in json) {
    userTable.innerHTML += (`
    <tr class="${(user % 2 ===0) ? 'even' : 'odd'}">
        <td>${json[user].id}</td>
        <td>${json[user].name}</td>
        <td>${json[user].username}</td>
        <td class="info" id="info-${json[user].id}">View Info</td>
        <td class="posts" id="post-${json[user].id}">View Post</td>
    </tr>`)
  }})
  .then(() => {
    let myUsers = document.getElementsByClassName('info')
    for (let i = 0; i <  myUsers.length; i++) {
    myUsers[i].addEventListener('click', (e) => {modalInfo(myUsers[i].id.slice(5))});
  }})
  .then(() => {
    let userPosts = document.getElementsByClassName('posts')
    for (let i = 0; i <  userPosts.length; i++) {
    userPosts[i].addEventListener('click', (e) => {modalPosts(userPosts[i].id.slice(5))});
  }});

function modalInfo(id) {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((response) => response.json())
      .then((user) => modal.innerHTML = (`
        <button class="exit" onclick="closeModal()">X</button>
        <p class="modal-data"><span class="bold underline">User ID:</span> ${user.id}</p>
        <p class="modal-data"><span class="bold underline">Name:</span> ${user.name}</p>
        <p class="modal-data"><span class="bold underline">Username:</span> ${user.username}</p>
        <p class="modal-data"><span class="bold underline">Email:</span> ${user.email}</p>
        <p class="modal-data"><span class="bold underline">Address:</span><br>
        &emsp; ${user.address.street}, ${user.address.suite}<br>
        &emsp; ${user.address.city}, ${user.address.zipcode}<br>
        &emsp; Lat: ${user.address.geo.lat} Lng: ${user.address.geo.lng}</p>
        <p class="modal-data"><span class="bold underline">Phone:</span> ${user.phone}</p>
        <p class="modal-data"><span class="bold underline">Website:</span> ${user.website}</p>
        <p class="modal-data"><span class="bold underline">Company:</span><br> 
        &emsp; <span class="bold">Name:</span>${user.company.name}<br>
        &emsp; <span class="bold">Catch Phrase:</span> ${user.company.catchPhrase}<br>
        &emsp; <span class="bold">BS:</span> ${user.company.bs}</p>
        `))
      .then(modal.classList.remove('hidden'));
    }
    
    function modalPosts(id) {
      fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
      .then((response) => response.json())
      .then((posts) => {
        modal.innerHTML = `<button class="exit" onclick="closeModal()">X</button>`
        for (post of posts) {
          modal.innerHTML += (`
          <div class="post">
            <p><span class="bold underline">Post ID:</span> ${post.id}</p>
            <p><span class="bold underline">Title:</span> ${post.title}</p>
            <p><span class="bold underline">Message:</span> ${post.body}</p>
          </div>
          `)
        }
      })
      .then(modal.classList.remove('hidden'));
}

function closeModal() {
  modal.classList.add('hidden');
  modal.innerHTML = '';
}