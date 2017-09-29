$(document).ready(function(){
    $("#content").load("home.html");
    
    
});

$('a').click(function(){
    var page = $(this).attr('href');
    $("section").slideUp(100);
    $("#content").load(page);
    $("section").slideDown(3000);
    
    return false;
    
})

