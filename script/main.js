let input = document.getElementById("descripe");
let tbody = document.getElementById("home");
let addBtn = document.getElementById("ADD");
let allData;

if (localStorage.products == null) {
    allData = [];
} else {
    allData = JSON.parse(localStorage.products)
}
let title = `
    <h2>Tasks:</h2>
`;

let creatProductObject = ()=> {
    let newProduct = {des : input.value};
    allData.push(newProduct);
    console.log(allData);
    localStorage.setItem("products" , JSON.stringify(allData));
    showData();
    input.value = "";
}

addBtn.addEventListener("click" , creatProductObject);

let showData = ()=> {
    let task = "";
    for (let index = 0; index < allData.length; index++) {
        task += `
        <div class="item">
        <input type="text" id="in-${index}" class="data"  value="${allData[index].des}" disabled>
        <div class="buttons">
            <button onclick="edit(${index})" id="ed-${index}" class="edit">Edit</button>
            <button onclick="removeOneItem(${index})" class="delete">Delete</button>
        </div>
        </div>
        `
    }
    tbody.innerHTML = title + task;
}

let removeOneItem = (index)=> {
    allData.splice(index , 1);
    localStorage.products = JSON.stringify(allData);
    showData()
}

let edit = (index)=>{
    let is = true;
    let data = document.getElementById(`in-${index}`);
    data.toggleAttribute("disabled");
    let edBtn = document.getElementById(`ed-${index}`);
    if (edBtn.innerText == "Edit") {
        edBtn.innerText = "Done";
        edBtn.className = "done";
    } else {
        edBtn.innerText = "Edit";
        edBtn.className = "edit";
    }
    allData[index].des = data.value;
    localStorage.products = JSON.stringify(allData);
}

showData();