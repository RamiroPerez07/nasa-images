const dateInput = document.getElementById("date")
const form = document.getElementById("form")
const container = document.getElementById("container")
const messageSmall = document.getElementById("message")
const loadingSpinner = document.getElementById("loading-spinner")

const key = "NVGoFHkNxgWWAgH5fbFqZ4j1Xey9Hokfg489cLFp"
const url = `https://api.nasa.gov/planetary/apod?api_key=${key}`

async function getDataFromURL(url, queryParameters=""){
    try{
        const res = await fetch(url+queryParameters);
        const data = await res.json();
        return data;
    }catch(error){
        return new Error(error);
    }
}

async function searchImg(event){
    event.preventDefault();
    const dateValue = dateInput.value
    if (!isDateValid(dateValue)) {
        showError("Try with a valid date")
        return
    }
    showSuccess()
    showLoadAnimation();
    const data = await getDataFromURL(url,`&date=${dateValue}`)
    renderImg(data);
    hideLoadAnimation();
    form.reset()
}

function renderImg(obj){
    const html = `
    <div class="card">
        <h2>${obj.title}</h2>
        <div class="img-card" style='background-image:url("${obj.hdurl}")'></div>
        <p class="explanation">${obj.explanation}</p>
        <time>${formatDate(obj.date)}</time>
    </div>
    `
    container.innerHTML = html;
}

function formatDate(date){
    date = date.toString().split("-").reverse().join("-")
    return date;
}

function isDateValid(value){
    const selectedDate = new Date(value)
    const limInf = new Date("1996-01-01")
    return selectedDate < new Date() && selectedDate >= limInf
}

function showError(message){
    messageSmall.textContent = message;
}

function showSuccess(){
    messageSmall.textContent = "";
}

function setDate(value=new Date()){
    dateInput.value = `${value.getFullYear()}-${(value.getMonth()+1).toString().padStart(2,0)}-${value.getDate().toString().padStart(2,0)}`;
}

function showLoadAnimation(){
    loadingSpinner.classList.add("show")
}

function hideLoadAnimation(){
    loadingSpinner.classList.remove("show")
}

function init(){
    setDate();
    form.addEventListener("submit", searchImg)
}

init()