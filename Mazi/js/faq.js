$(document).ready(function () {
    initPage();
    eventBind();
});


function initPage() {

}

function eventBind() {
    $(".faq_row_box").on("click", function () {
        var this_num = $(this).attr('class').split(" ")[1];
         if ($(`.faq_row_box.${this_num}`).hasClass("open")) {
             $(`.faq_row_box.${this_num}`).removeClass("open");
             $(`.faq_arrow.${this_num}`).addClass("fa-angle-down");
             $(`.faq_arrow.${this_num}`).removeClass("fa-angle-up");
             $(`.faq_row_detail.${this_num}`).hide();
         } else {
             $(`.faq_row_box.${this_num}`).addClass("open");
             $(`.faq_arrow.${this_num}`).addClass("fa-angle-up");
             $(`.faq_arrow.${this_num}`).removeClass("fa-angle-down");
             $(`.faq_row_detail.${this_num}`).show();
         }
    });
}