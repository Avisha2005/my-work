let addBtn=document.getElementById("add_btn");
addBtn.addEventListener("click",addchapter);
let parentList=document.getElementById("parentList");

function addchapter(e){
    if(parentList.children[0].className == "emptyMsg"){
        parentList.children[0].remove()
    }
   let currentBtn=e.currentTarget;
   let currentInput=currentBtn.previousElementSibling
   let CurrentChapterName=currentInput.value

   let newli= document.createElement("li");
  // newli.classList.add("list-group-item")
  newli.className="list-group-item d-flex justify-content-center"
   newli.innerHTML=`<h3 class="flex-grow-1">${CurrentChapterName}</h3> 
   <button class="btn btn-warning mx-3">Edit</button></li>
   <button class="btn btn-danger " onclick="removeChapter(this)">Remove</button></li>`
  

  
   parentList.appendChild(newli)
}

function removeChapter(currentElement){
    currentElement.parentElement.remove()
    let parentList=document.getElementById("parentList");
    if(parentList.children.length <= 0){
        let newEmptyMsg = document.createElement("h3")
        newEmptyMsg.classList.add("emptymsg")
        newEmptyMsg.textContent="nothing is here.please add a chapter!!!"
        parentList.appendChild(newEmptyMsg)
    }
}

function editChapter(currentElement){
    if(currentElement.textContent =="Done"){
        currentElement.textContent="Edit"
        let CurrentChapterName=currentElement.previousElementSibling.value
        let currentHeding =document.createElement("h3");
        currentHeding.className="flex-grow-1"
        currentHeding.textContent=CurrentChapterName
        currentElement.parentElement.replaceChild(currentHeding,currentElement.previousElementSibling)
    }else{
    currentElement.textContent="Done"
    let CurrentChapterName=currentElement.previousElementSibling.textContent
    let currentInput =document.createElement("input");
    currentInput.type="text"
    currentInput.placeholder="chapter name"
    currentInput.className="form-control"
    currentInput.value =CurrentChapterName
    currentElement.parentElement.replaceChild(currentInput,currentElement.previousElementSibling)
        
}
}