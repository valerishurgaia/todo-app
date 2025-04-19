import { createTodo , handleDeleteTodo, newTodoCard } from "../js/requests.js"

const form = document.querySelector(".todo-form")
const todoCards = document.querySelectorAll(".todo-card")
const btnClear  = form.querySelector("#btn-clear")
const todoCardsDiv = document.querySelector(".todo-cards-div")

form.addEventListener("submit" , async (e) => {
    e.preventDefault()
    let isValid

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

    if(isValid) {
        try {
        const newTodo = await createTodo(todo)

        const res = await newTodoCard(newTodo.data)
        const cardHtml = await res.text();
        console.log(todoCardsDiv)

        todoCardsDiv.insertAdjacentHTML("afterbegin" , cardHtml)
        // console.log(newCard)

        form.reset()

        // window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }
})

Array.from(todoCards).forEach((el) => {
    const deleteBtn = el.querySelector('.btn-delete');
    deleteBtn.addEventListener("click", async (e) => {
        const {status} = await handleDeleteTodo(e.target.dataset.todoId);
        if(status === 201) {
            el.remove();
        }
    });
});

btnClear.addEventListener("click" , () => {
    form.reset()
})