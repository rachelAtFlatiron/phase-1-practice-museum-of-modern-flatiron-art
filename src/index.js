console.log("Write your code here");

const url = "http://localhost:3000/current-exhibits";

let curExhibit = {}
const commentSection = document.getElementById("comments-section");
const commentForm = document.getElementById('comment-form')
const tickets = document.getElementById("tickets-bought");
const ticketsBtn = document.getElementById('buy-tickets-button') 

fetch(`${url}`)
	.then(res => res.json())
    .then(data => {
        curExhibit = data[0]
        addExhibit(data[0])
    })

const addComment = (cm) => {
	let com = document.createElement("p");
	com.textContent = cm;
	commentSection.append(com);
};

const addExhibit = (data) => {
    const curExhibit = data;
    const title = document.getElementById("exhibit-title");
    const des = document.getElementById("exhibit-description");
    const image = document.getElementById("exhibit-image");

    title.textContent = data.title;
    image.src = `.${curExhibit.image}`;
    des.textContent = curExhibit.description;
    tickets.textContent = `${curExhibit.tickets_bought} Tickets Sold`;

    curExhibit.comments.forEach((cm) => {
        addComment(cm)
    });
}

commentForm.addEventListener('submit', (e) => {
    e.preventDefault()
    let newCom = e.target['comment-input'].value

    fetch(`${url}/1`, {
        method: 'PATCH',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({
            comments: [...curExhibit.comments, newCom]
        })
    })
    .then(res => res.json())
    .then(data => {
        curExhibit = data 
        addComment(newCom)
    })
    e.target.reset()
})

ticketsBtn.addEventListener('click', () => {
    let num = parseInt(tickets.innerText[0])
    // tickets.textContent = `${num + 1} Tickets Sold`
    fetch(`${url}/1`, {
        method: 'PATCH',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({
            tickets_bought: num + 1 
        })
    })
    .then(res => res.json())
    .then(data => {
        tickets.textContent = `${data.tickets_bought} Tickets Sold`
    })
})
