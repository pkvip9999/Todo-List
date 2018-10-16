var todolist = document.getElementsByTagName("ul")[0];
var arrayTodo =todolist.children;
var selectall = document.getElementById("select-all");
var active = document.getElementById("active");
var completed = document.getElementById("completed");
var clear = document.getElementById("clear-completed");
var all = document.getElementById("all");
var footer = document.getElementById("footer");

function dem (a){
    var d=0;
    for (var i = 0; i < a.length; i++) {
        if (!a[i].children[0].checked){
            d++;
        }
    }
    return d;
}

function border(id) {
    var b = document.getElementsByClassName("act");
    for (var i = 0; i < b.length; i++) {
        b[i].classList.remove("border");
        b[i].classList.add("border-non");
    }
    var a = document.getElementById(id);
    a.classList.add("border");
    a.classList.remove('border-non');
}

function hint() {
    if (arrayTodo.length == 0) {
        selectall.classList.add("non");
        footer.classList.add("display")
    } else {
        selectall.classList.remove("non");
        footer.classList.remove("display");
    }

}
function ht() {
    // arrayTodo =todolist.children;
    total = dem(arrayTodo);
    document.getElementsByClassName('total')[0].innerHTML= total  + " item";
    if (total == 0) {
        selectall.classList.add("select-all");
    }
    else {
        selectall.classList.remove("select-all");
    }
    if (document.getElementsByClassName("check").length) {
        clear.innerHTML = "clear completed";
        clear.classList.add("clear-completed")
    }
    else {
        clear.innerHTML = ""
        clear.classList.remove("clear-completed")
    }
}

function addTodo(text) {
    var todo= "<li class=\"row item\">\n" +
        "          <input class=\"select\" type=\"checkbox\" name=\"check\"  >\n" +
        "          <span class=\"cont\">"+text+"</span>\n" +
        "          <i class=\"fas fa-times delete\" id=\"delete\"></i>\n" +
                    "<input type=\"text\" id=\"edit\" class=\" display\" value=\"dddd\">"+
        "      </li>";
    todolist.insertAdjacentHTML('beforeend',todo);
}

function Add(event) {
    var k =event.key;
    if (k == "Enter") {
        var text = document.getElementById("text").value;
        text=text.trim();
        if (text != "") {
            document.getElementById("text").value="";
            addTodo(text);
            ht();
            hint();
            border("all");
        }
    }
}

todolist.onclick = function(event){
   var a =event.target;
   var b =  a.parentElement;
   if (a.tagName == "INPUT") {
        if (a.checked) {
            b.classList.add("check");
            ht();
        }
        else {
            b.classList.remove("check");
            arrayTodo =todolist.children;
            ht();
        }
    }
    if (a.tagName == "I") {
        todolist.removeChild(b);
        ht();
        hint();
    }
};
selectall.onclick = function () {
    if (dem(arrayTodo) == 0 ){
        for (var i = 0; i < arrayTodo.length; i++) {
            arrayTodo[i].children[0].checked=false;
            arrayTodo[i].classList.remove("check");

        }
        ht();
    }
    else {
        for (var i = 0; i < arrayTodo.length; i++) {
            if (!arrayTodo[i].children[0].checked){
                arrayTodo[i].children[0].checked=true;
                arrayTodo[i].classList.add("check");
            }
        }
        ht();
    }
};

all.onclick = function () {
    border("all");
    for (var i = 0; i < arrayTodo.length; i++) {
            arrayTodo[i].classList.remove("display");
    }

};

active.onclick = function () {
    border("active");
    for (var i = 0; i < arrayTodo.length; i++) {
        if (arrayTodo[i].children[0].checked){
            arrayTodo[i].classList.add("display");
        }
        else {
            arrayTodo[i].classList.remove("display");
        }
    }
};
completed.onclick = function () {
    border("completed");
    for (var i = 0; i < arrayTodo.length; i++) {
        if (!arrayTodo[i].children[0].checked){
            arrayTodo[i].classList.add("display");
        }
        else {
            arrayTodo[i].classList.remove("display");
        }
    }
};

clear.onclick = function () {
    var i=0;
    while (document.getElementsByClassName("check").length) {
        if (arrayTodo[i].children[0].checked){
            todolist.removeChild(arrayTodo[i]);
            i=0;
        }else i++
    }
    ht();
    hint();

};

todolist.ondblclick = function (event) {
    var a =event.target;
    var b = a.parentElement;
    if (a.tagName == "SPAN") {
        b.children[0].classList.add("display");
        b.children[1].classList.add("display");
        b.children[2].className -=("fas fa-times delete");
        b.children[3].classList.remove("display");
        b.children[3].value =  b.children[1].innerHTML;
        if (b.children[0].checked){
            b.classList.remove("check")
        }
        document.onclick = function(event){
            if(event.target.id !== "edit"){
                var text = b.children[3].value;
                text=text.trim();
                if (text != "") {
                    b.children[0].classList.remove("display");
                    b.children[1].classList.remove("display");
                    b.children[2].className +=(" ")+("fas fa-times delete");
                    b.children[3].classList.add("display");
                    if (b.children[0].checked){
                        b.classList.add("check");
                    }
                    b.children[1].innerHTML = text;
                    b.children[3].value= text;
                }
                else {
                    todolist.removeChild(b);
                    ht();
                    hint();

                }
            }
        };

    }
};


