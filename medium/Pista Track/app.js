let myLeads=[]
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const tabBtn = document.getElementById("tab-btn")
const deleteBtn = document.getElementById("delete-btn")
const ulEl = document.getElementById("ul-el")

let leadsFromLocal = JSON.parse(localStorage.getItem("myLeads"))

inputBtn.addEventListener("click", pushingLeads)
inputEl.addEventListener("keydown", function(e){
    if(e.code==="Enter"){
        pushingLeads()
    }
})

tabBtn.addEventListener("click",function() {
    chrome.tabs.query({active:true, currentWindow:true}, function(tabs){
        myLeads.push(tabs[0].url)
        pushingLeads()
    })
})

deleteBtn.addEventListener("dblclick", deleteLeads)

function deleteLeads() {
    localStorage.clear("myLeads")
    myLeads = []
    renderLeads()
}

if(leadsFromLocal){
    myLeads = leadsFromLocal
    renderLeads()
}

function pushingLeads(){
    myLeads.push(inputEl.value)
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    inputEl.value=""
    renderLeads()
}

function renderLeads(){
    let listItems = ""
    for(let i=0; i<myLeads.length; i++){
        listItems +=`
            <li>
                <a target='_blank' href='${myLeads[i]}'>
                    ${myLeads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}