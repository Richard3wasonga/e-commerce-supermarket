let form = document.querySelector("form")
form.addEventListener('submit',handlesubmit)


let base_url= 'http://localhost:3000/items'

function handlesubmit(event){
    event.preventDefault()
    let formData = new FormData(form)
    let data = Object.fromEntries(formData)
    let jsonData = JSON.stringify(data)

    if(data.price){
        data.price = parseFloat(data.price).toFixed(2)
    }

    fetch(base_url,{
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: jsonData
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(error => console.log(error))
}