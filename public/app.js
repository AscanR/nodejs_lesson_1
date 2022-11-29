document.addEventListener('click', event => {
    if (event.target.dataset.type === 'remove') {
        const id = event.target.dataset.id
        remove(id).then(() => {
            event.target.closest('li').remove()
        })
    }
})

document.addEventListener('click', event => {
    if (event.target.dataset.type === 'edit') {
        const id = event.target.dataset.id
        const data = prompt('Please enter new title')
        if (data.length) {
            edit(id, data)
        }
    }
})

async function remove(id) {
    await fetch(`/${id}`, {
        method: "DELETE"
    })
}

async function edit(id, data) {
    await fetch([`/${id}`, data], {
        method: "PUT"
    })
}
