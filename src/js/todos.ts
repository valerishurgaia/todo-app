import { createTodo, handleDeleteTodo, newTodoCard, updateTodo } from "./requests.js"
import { Todo } from "./types/todo.js"

const form = document.querySelector<HTMLFormElement>(".todo-form")!
const todoCards = Array.from(document.querySelectorAll<HTMLElement>(".todo-card"))
const btnClear = form.querySelector<HTMLButtonElement>("#btn-clear")!
const todoCardsDiv = document.querySelector<HTMLDivElement>(".todo-cards-div")!
const editCardDiv = document.querySelector<HTMLDivElement>(".edit-card-div")!
const formMessageDiv = document.querySelector<HTMLDivElement>(".form-message")!

function setupDeleteButton(card: HTMLElement): void {
    const deleteBtn = card.querySelector<HTMLButtonElement>('.btn-delete');
    if(deleteBtn) {
        deleteBtn.addEventListener("click", async (e) => {
            const target = e.target as HTMLButtonElement;
            const { status } = await handleDeleteTodo(target.dataset.todoId!);
            if(status === 201) {
                card.remove();
            }
        });
    }
}

todoCards.forEach(setupDeleteButton);

form.addEventListener("submit", async (e) => {
    e.preventDefault()
    let isValid: boolean = false
    const todoId = window.location.href.split("/").pop()
    
    const titleInput = form.querySelector<HTMLInputElement>('input[name="title"]')!
    const descriptionInput = form.querySelector<HTMLTextAreaElement>('textarea[name="description"]')!
    const statusSelect = form.querySelector<HTMLSelectElement>('select[name="status"]')!
    const prioritySelect = form.querySelector<HTMLSelectElement>('select[name="priority"]')!

    if (!titleInput.value || titleInput.value.length < 3) {
        isValid = false
        titleInput.style.border = "1px solid red"
    } else {
        isValid = true
        titleInput.style.border = "1px solid #e2e8f0"
    }

    const todo: Todo = {
        title: titleInput.value,
        description: descriptionInput.value,
        status: statusSelect.value as Todo['status'],
        priority: prioritySelect.value as Todo['priority']
    }

    if(isValid && !todoId) {
        try {
            const newTodo = await createTodo(todo)
            if (newTodo.data && !Array.isArray(newTodo.data)) {
                const res = await newTodoCard(newTodo.data)
                const cardHtml = await res.text()
                todoCardsDiv.insertAdjacentHTML("afterbegin", cardHtml)
                const newCard = todoCardsDiv.firstElementChild as HTMLElement
                if (formMessageDiv) {
                    formMessageDiv.textContent = newTodo.message
                }
                todoCards.push(newCard)
                setupDeleteButton(newCard)
                form.reset()

                setTimeout(() => {
                    if (formMessageDiv) {
                        formMessageDiv.textContent = ""
                    }
                }, 2000)
            }
        } catch (error) {
            console.error(error)
        }
    }

    if(isValid && todoId) {
        try {
            const updatedTodo = await updateTodo(todo, todoId)
            if (updatedTodo.data && !Array.isArray(updatedTodo.data)) {
                const todoWithEdit = { ...updatedTodo.data }
                const res = await newTodoCard(todoWithEdit, true)
                const cardHtml = await res.text()
                if (editCardDiv) {
                    editCardDiv.innerHTML = cardHtml
                }
                if (formMessageDiv) {
                    formMessageDiv.textContent = updatedTodo.message
                }
                setTimeout(() => {
                    if (formMessageDiv) {
                        formMessageDiv.textContent = ""
                    }
                }, 2000)
            }
        } catch (error) {
            console.error(error)
        }
    }
})

if(btnClear) {
    btnClear.addEventListener("click", () => {
        form.reset()
    })
}