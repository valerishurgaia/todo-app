import { createTodo , handleDeleteTodo, newTodoCard, updateTodo } from "../js/requests.js"

const form = document.querySelector(".todo-form")
const todoCards = Array.from(document.querySelectorAll(".todo-card"))
const btnClear  = form.querySelector("#btn-clear")
const todoCardsDiv = document.querySelector(".todo-cards-div")
const editCardDiv = document.querySelector(".edit-card-div")
const formMessageDiv = document.querySelector(".form-message")

function setupDeleteButton(card) {
    const deleteBtn = card.querySelector('.btn-delete');
    if(deleteBtn) {

        deleteBtn.addEventListener("click", async (e) => {
            const {status} = await handleDeleteTodo(e.target.dataset.todoId);
            if(status === 201) {
                card.remove();
            }
        });
    }
}

todoCards.forEach(setupDeleteButton);

form.addEventListener("submit" , async (e) => {
    e.preventDefault()
    let isValid
    let todoId = window.location.href.split("/").pop()
    

    if (!form.title.value || form.title.value.length < 3 ) {
        isValid = false
        form.title.style.border = "1px solid red"
    }  else {
        isValid= true
        form.title.style.border = "1px solid #e2e8f0"
    }

    const title = form.title.value
    const description = form.description.value
    const status = form.status.value
    const priority = form.priority.value

    const todo = {title , description , status , priority}

    if(isValid && !todoId) {
        try {
            const newTodo = await createTodo(todo)
            const res = await newTodoCard(newTodo.data)
            const cardHtml = await res.text();

            todoCardsDiv.insertAdjacentHTML("afterbegin" , cardHtml)
            const newCard = todoCardsDiv.firstElementChild
            formMessageDiv.textContent = newTodo.message;
            todoCards.push(newCard)
            
            setupDeleteButton(newCard);

            form.reset()

            setTimeout(() => {
                formMessageDiv.textContent = ""
            }, 2000)
        } catch (error) {
            console.log(error)
        }
    }
    if(isValid && todoId) {
        const updatedTodo = await updateTodo(todo , todoId)
        const res = await newTodoCard({...updatedTodo.data , isEdit : true})
        const cardHtml = await res.text();
        editCardDiv.innerHTML = cardHtml;
        formMessageDiv.textContent = updatedTodo.message;
        setTimeout(() => {
            formMessageDiv.textContent = ""
        }, 2000)
    }
})

if(btnClear) {
    btnClear.addEventListener("click" , () => {
        form.reset()
    })
}