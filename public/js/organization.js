function password(){
    var x = document.getElementById("password");
    var y = document.getElementById("show_password");
    var z = document.getElementById("hide_password");

    if(x.type === "password"){
        x.type ="text";
        y.style.display = "none";
        z.style.display = "block";
    }
    else{
        x.type ="password";
        y.style.display = "block";
        z.style.display = "none";
    }
}