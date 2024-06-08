Submit.addEventListener("click",(e)=>{
    e.preventDefault()
    let title=title.value
    let desc=desc.value
    localStorage.setItem("todo",JSON.stringify[titlec,descc])
    console.log(e)
    todo.innerHTML=`
    <h1>${titlec}</h1>
    <p> ${descc}</p>
    `
    title.value=""
    desc.value=""
})

deleteBtn.addEventListener("click",(e)=>{
    e.preventDefault()
    localStorage.setItem("todo")
    todo.innerHTML=""
    
})