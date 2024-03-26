// 창 열었을때 바로 함수 실행
$(document).ready(function () {
    AjaxSuccess(function (response) {
        NewsList(response);
    })
});

function AjaxSuccess(callback) {
    $.ajax({
        type: 'POST',
        url: "../php/news.php",
        dataType: 'json',
        success: function (response) {
            callback(response)
        }
    })
}

function NewsList(data) {
    var MainBox = document.querySelectorAll('.mainbox_Con');
    var ListBox = document.getElementById('news_List_row');
    var ListTitle = document.getElementById('title');
    var i = 0;
    // data 자체에 배열이 적용이 되지 않아, I를 1씩 증가시켜, 나중에 들어온 3개는 맨처음에 기입되게끔. 순서는 날짜
    data.forEach(e => {
        if (i < 3) {
            MainBox[i].innerHTML = `<div class="news_ThirdMainBox clickEvent" ListNo="${e.no}">\
            <div class="imgBox_Click">\
                <img class="NewsImg" src="data:image/png;base64, ${e.img_data}">\
                <div class="Tooltip">자세히 보기</div>\
            </div>\
            <div class="imgBox_Header">\
            ${e.title}\
            </div>\
        </div>`
        } else {
            ListTitle.innerHTML = `<span>LIST</span>`
            ListBox.innerHTML += `<div class="col news_List_Imgbox clickEvent" ListNo="${e.no}">\
            <div class="news_List_Imgbox_Click">\
                <img class="NewsImg" src="data:image/png;base64, ${e.img_data}">\
            </div>\
            <div class="news_List_Header">\
                ${e.title}\
            </div>\
        </div>\
    </div>`
        }
        i++
    })
    $('.clickEvent').click(function () {
        localStorage.setItem("ListNo",$(this).attr('ListNo'))
        window.location = '../view/news_deteil.html'
    })
}