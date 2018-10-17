var todolist = $("ul:first");

var selectall = $("#select-all");
var active = $("#active");
var completed = $("#completed");
var clear = $("#clear-completed");
var all = $("#all");
var footer = $("#footer");
var ctnall = $("#ctn-all");
var z="";


function border(id) {
    $(".act").addClass("border-non");
    $(".act").removeClass("border");
    $("#"+id).addClass("border");
    $("#"+id).removeClass("border-non");
    z = id;
}


function ht() {
    var total =$("li").length- $("li").find("input:checked").length;
    $(".total").html( total  + " item");
    if (total == 0) {
        $("#select-all").addClass("select-all");
    }
    else {
        $("#select-all").removeClass("select-all");
    }
    if ($(".check").length) {
        clear.html("clear completed");
        clear.addClass("clear-completed");
    }
    else {
        clear.html("");
        clear.removeClass("clear-completed");
    }
}

function hint() {
    if ($("li").length == 0) {
        selectall.addClass("non");
        footer.addClass("display");
    } else {
        selectall.removeClass("non");
        footer.removeClass("display");
    }

}

function addTodo(text) {
    var todo= "<li class=\"row item\">\n" +
        "          <input class=\"select\" type=\"checkbox\" name=\"check\"  >\n" +
        "          <span class=\"cont\">"+text+"</span>\n" +
        "          <i class=\"fas fa-times delete\" id=\"delete\"></i>\n" +
        "          <input type=\"text\" id=\"edit\" class=\"edit\" "+
        "      </li>";
    todolist.append(todo);
}


function Add(event) {
    var k =event.key;
    if (k == "Enter") {
        var text = $("#text").val();
        text=text.trim();
        if (text != "") {
            $("#text").val("");
            addTodo(text);
            $(".edit").hide();
            ht();
            hint();
            if(z=="" || z== "all"){
                border("all");
            }
            else if (z == "active") {
                act();
            }
            else comp();

        }
    }
}
selectall.click(function () {
    var total =$("li").length- $("li").find("input:checked").length;
    if (total == 0 ){
        $("li").each(function (index) {
            $("li").find("input:checkbox").prop("checked",false)
            $("li").removeClass("check")
        });
        if (z == "completed") {
            comp();
        }
    }
    else if (z == "completed"){
        $("li").each(function (index) {
            $("li").find("input:checkbox").prop("checked",false)
            $("li").removeClass("check")
        });
        comp();
    }
    else {
        $("li").each(function () {
            $("li").find("input:checkbox").prop("checked",true)
            $("li").addClass("check")
        });
    }
    if (z == "active") {
        act();
    }
    hint();
    ht();
});

todolist.click(function (event) {
    var a = event.target;
    if (a.tagName == "INPUT") {
        if (a.checked){
            $(a).parent().addClass("check");
            if( z == "active"){
                act();
            }
        }
        else{
            $(a).parent().removeClass("check");
            if (z == "completed") {
                comp();
            }
        }
    }
    if (a.tagName == "I"){
        $(a).parent().remove();
    }
    ht();
    hint();
});



all.click(function () {
    border("all");
    ctnall.show();
    $("li").each(function () {
        $(this).show()
    });
});

function act() {
    border("active");
    ctnall.show();
    var t=0;
    $("li").each(function () {
        if ($(this).find("input").prop("checked")) {
            $(this).hide()
        }
        else {
            $(this).show()
            t++
        }
    });
    if (t==0) {
        ctnall.hide();
    }
}

function comp() {
    border("completed");
    ht();
    ctnall.show();
    var t=0;
    $("li").each(function () {
        if ($(this).find("input").prop("checked")) {
            $(this).show()
            t++;
        }
        else {
            $(this).hide()
        }
    });
    if (t==0) {
        ctnall.hide();
    }
}

clear.click( function () {
    $(".check").each(function () {
        $(".check").remove();
    });
    ht();
    hint();

});


todolist.dblclick(function (event) {
    var a =event.target;
    var b =  $(a).parent();
    if (a.tagName == "SPAN") {
        b.children(".select").hide();
        b.children(".cont").hide();
        b.children("#delete").hide();
        b.children(".edit").show();
        var c = b.children(".cont").text();
        b.children(".edit").val(c);
        if (b.children(".select").prop("checked")) {
            b.removeClass("check")
        }
        $(document).click(function (event) {
            if(event.target.id !== "edit"){
                var text = b.children(".edit").val();
                text=$.trim(text);
                console.log(b.children(".select").prop("checked"))
                if (text != "") {
                    b.children(".select").show();
                    b.children(".cont").show();
                    b.children("#delete").show();
                    b.children(".edit").hide();
                    if (b.children(".select").prop("checked")) {
                        b.addClass("check")
                    }
                    b.children(".cont").text(text);
                    b.children(".edit").val(text)
                }
                else {
                    b.remove();
                    ht();
                    hint();
                }
            }
        })
    }
})  ;


