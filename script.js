const apiUrl = "https://randomuser.me/api/?results=10"

let userList = []

const displayElm = document.querySelector("#list")
const countElm = document.querySelector("#count")
const selectElm = document.querySelector("#select")
const searchElm = document.querySelector("#search-input")


const fetchUsers = () => {
    fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
        display(data.results)
        userList = data.results
    })
    .catch((error) => console.log(error))

    // using async/await
    // const users = await fetch(apiUrl)
    // const data = await users.json()
    // userList = data.results

}

const display = (users) => {
    let str = ""

    users.map((user) => {
        str += `
        <div class="card m-2" style="width: 20rem">
        <img src="${user.picture.large}" class="card-img-top" alt="user-img"/>
        <div class="card-body">
        <h5 class="card-title">
        ${user.name.title} ${user.name.first} ${user.name.last}</h5>
        <p  class="card-text">
        <ul class="list-unstyled">
        <li>${user.phone}</li>
        <li>${user.email}</li>
        <li>${user.dob.date}</li>
        <li>${user.location.city} ${user.location.country}</li>
        </ul>
        </p>
        </div>
        </div>
        `
    })

    displayElm.innerHTML = str
    countElm.innerText = users.length
}

fetchUsers()

searchElm.addEventListener("keyup", (e) => {
  let filteredUsers
  let searchTerm = e.target.value

  filteredUsers = userList.filter((user) => {
    const fullName = user.name.first + "" + user.name.last

    return fullName.toLowerCase().includes(searchTerm.toLowerCase())
  })
  display(filteredUsers)
})

selectElm.addEventListener("change", (e) => {
    let filteredUsers
    filteredUsers = userList.filter((user) => user.gender === e.target.value)
    display(filteredUsers)
})