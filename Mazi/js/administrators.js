$(document).ready(function() {
    init();
});


function init() {
    $('.header>div').click(function() {
        
        removedisplay();
        var clicked = $(this).text();
        
        $(`.form.${clicked}`).removeClass('display_none');
    });
}

function removedisplay() {
    $('.form').each(function(index, element) {
        $(this).addClass('display_none');
    });
}