let title = document.getElementById("title");
let blogtext = document.getElementById("blogtext");
let cardTitle = document.querySelector(".card-title");
let cardText = document.querySelector(".card-text");
let blogData = document.getElementById("blogData");


function showData() {
    blogData.innerHTML="";
    let data = JSON.parse(localStorage.getItem("posts")) || [];
    data.forEach((blog,i) => {
    blogData.innerHTML += `
     <div class="col-sm-6 col-lg-4">
                <div class="card mt-2">
                    <div class="card-body">
                        <h5 class="card-title">${blog.title}</h5>
                        <p class="card-text">${blog.blogtext}</p>
                        <a href="edit.html?index=${i}" class="card-link btn btn-primary">Edit</a>
                        <a href="#" class="card-link btn btn-danger" onclick="del(${i})">Delete</a>
                    </div>

                </div>
         </div>
    `
    });
}

function addBlog() {
    let data = JSON.parse(localStorage.getItem("posts")) || [];
       if(title.value=="" || blogtext.value==""){
        alert("title and blogtext can not be empty");
        return;
    }
    data.push({ "title": title.value, "blogtext": blogtext.value });
 
    localStorage.setItem("posts", JSON.stringify(data));
    window.location.href = "post.html";
    title.value = "";
    blogtext.value = "";
    showData();
}
// localStorage.clear();

// delete
function del(i){
    // alert("hii");
    // console.log(i);
     let data = JSON.parse(localStorage.getItem("posts")) || [];
     data.splice(i,1);
    localStorage.setItem("posts", JSON.stringify(data));
    showData();
     
}

// edit
window.onload = function() {
    ed();
};

function ed(){
    let params = new URLSearchParams(window.location.search);
   let i = params.get("index");
    let data = JSON.parse(localStorage.getItem("posts")) || [];
    let sd=data[i];
    alert(sd.title);
    document.getElementById("edit-title").value=sd.title;
     document.getElementById("edit-text").innerHTML=sd.blogtext; 
}

function update() {
    let params = new URLSearchParams(window.location.search);
    let i = params.get("index");

    let data = JSON.parse(localStorage.getItem("posts")) || [];

    data[i] = {
        "title": document.getElementById("edit-title").value,
        "blogtext": document.getElementById("edit-text").value
    };

    localStorage.setItem("posts", JSON.stringify(data));
    alert("Blog updated successfully!");
    window.location.href = "post.html";
}



showData();
