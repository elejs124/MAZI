$(document).ready(function () {
    clickEvent();
});


function clickEvent() {
    var container_item = $('.container_item');
    var item_detail_page = $('.item_detail_page');
    var item_category_button = $('.item_category_button');

    container_item.click(function () {
        removeActive();
        var index = $(this).attr('index');
        $('.item_category_button.i' + index).addClass('active');
        item_detail_page.css('display', 'flex');
        console.log($(this).attr('category'));
        listRequest($(this).attr('category'), function (response) {
            insertList(response);
        });
    });

    item_category_button.click(function() {
        removeActive();
        $(this).addClass('active');
        listRequest($(this).attr('category'), function (response) {
            insertList(response);
        });
    });

    $(document).on('keydown', function(e) {
        if (e.key === "Escape") {
            item_detail_page.css('display', 'none');
        }
    });

    $(document).on("click", ".item_detail_sub_img", function() {
        $('.item_detail_main_img').attr('src', $(this).attr('src'));
        $('.item_detail_main_img').attr('index' , $(this).attr('index'));
    })

    $(document).on("click", ".item", function() {
        imgRequest($(this).attr('category'),$(this).attr('c_no'), function(response){
            insertImg(response);
        });
    });

    $('.button_before>div').click(function(){
        var index = parseInt($('.item_detail_main_img').attr('index')) - 1;
        var imgelem = $('.item_detail_sub_img.i' + index);
        if (imgelem.length === 0) return;
        var src = $('.item_detail_sub_img.i' + index).attr('src');
        $('.item_detail_main_img').attr('src', src);
        $('.item_detail_main_img').attr('index' , index);
    });

    $('.button_after>div').click(function(){
        var index = parseInt($('.item_detail_main_img').attr('index')) + 1;
        var imgelem = $('.item_detail_sub_img.i' + index);
        if (imgelem.length === 0) return;
        var src = $('.item_detail_sub_img.i' + index).attr('src');
        $('.item_detail_main_img').attr('src', src);
        $('.item_detail_main_img').attr('index' , index);
    });

}

function autoUpdate(category, c_no, className) {
    if (className === 'item') {
        $('.item_detail_main_img').attr('src', $('.item_detail_sub_img.i0').attr('src'));
        $('.item_detail_main_img').attr('index' , '0');
    }else {
        imgRequest(category, c_no, function(response){
            insertImg(response);
        });
    }
}

/** 디테일 페이지 카테고리 버튼 색 초기화 */
function removeActive() {
    for (var i = 0 ; i < 3; i++) {
        $('.item_category_button.i'+i).removeClass('active');
    }
}

/** 카테고리를 텍스트로 전달받아 GET 요청 json 데이터로 반환 ---------
 * 
 */
function listRequest(category, callback) {
    $.ajax({
        type: 'GET',
        url: '../php/portfolio_List_Select.php',
        data: { 'category': category },
        dataType: 'json',
        success: function(response) {
            callback(response);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            callback();
        }
    });
}

function imgRequest(category, c_no, callback) {
    $.ajax({
        type: 'GET',
        url: '../php/portfolio_Img_Select.php',
        data: { 'category': category, 'c_no': c_no },
        dataType: 'json',
        success: function(response) {
            callback(response);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            callback();
        }
    });
}

function insertList(json) {
    $(".item_list").empty();
    if (json === undefined) return;
    for (var i = 0; i < json.length; i++) {
        var html = `<div class="item" index="${[i]}" category="${json[i].category}" c_no="${json[i].c_no}">${json[i].projectname}</div>`;
        $(".item_list").append(html);
    }
    autoUpdate(json[0].category, json[0].c_no, '');
}

function insertImg(json) {
    $('.item_detail_sub').empty();
    var img_datas = JSON.parse(json[0].img_datas);
    for (var i = 0; i < img_datas.length; i++) {
        var html = `<img class="item_detail_sub_img i${[i]}" index="${[i]}" src="data:image/png;base64,${img_datas[i].encoded}">`;
        $('.item_detail_sub').append(html);
    }
    autoUpdate('', '', 'item');
}