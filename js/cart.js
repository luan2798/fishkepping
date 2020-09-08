function test(){
    document.getElementsByClassName("popup-cart")[0].style.display = "block";
}
function exit(){
    document.getElementsByClassName("popup-cart")[0].style.display = "none";
}
function buttonclick(){
    document.getElementsByClassName("popup-cart")[0].style.display = "block";
    document.getElementsByClassName("price")[0].innerHTML="$ 55.00";
    document.getElementById("price").innerHTML="$ 55.00";
}