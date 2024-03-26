// 페이지 로드시 함수 실행
$(document).ready(function () {
    AjaxSuccess(function (response) {
        NewsList(response);
    })
})

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
var ListNo = localStorage.getItem("ListNo")
function NewsList(data) {
    var date = document.getElementById('date')
    var NewsHeader = document.getElementById('news_Header')
    var inner_Container = document.getElementById('inner_Container')

    console.log(data[0].no)
    console.log(data[data.length-1].no)
    data.forEach(e => {
        if(e.no == ListNo){
            date.innerHTML=`${e.date}`
            NewsHeader.innerHTML=`${e.title}`
            var str = e.message.replace(/\n/g, '<br>')
            inner_Container.innerHTML=`${str}`
        }
    })
    // 페이지 들어왔을때 data no 값 최대치 측정 후 같으면 #back invisible
    if(data[0].no==ListNo){
        $("#back").addClass('hidden')
    }
    // 페이지 들어왔을때 data no 값 최소값 측정 후 같으면 #next invisible
    if(data[data.length-1].no==ListNo){
        $("#next").addClass('hidden')
    }

    $("#back").click(function(){
        ListNo++;
        // 이전 누르면 다음 버튼 활성화
        $("#next").removeClass('hidden')
        // 버튼누를때 data no 값 최대치 측정 후 같으면 #back invisible
        if(data[0].no==ListNo){
            $("#back").addClass('hidden')
        }
        data.forEach(e =>{
            if(e.no == ListNo){
                date.innerHTML=`${e.date}`
                NewsHeader.innerHTML=`${e.title}`
                var str = e.message.replace(/\n/g, '<br>')
                inner_Container.innerHTML=`${str}`
            }
        })
    })
    $("#next").click(function(){
        ListNo--;
        // 다음 눌르면 이전 버튼 활성화
        $("#back").removeClass('hidden')
        // 버튼 누를때 data no 값 최소값 측정 후 같으면 #next invisible
        if(data[data.length-1].no==ListNo){
            $("#next").addClass('hidden')
        }
        data.forEach(e =>{
            if(e.no == ListNo){
                date.innerHTML=`${e.date}`
                NewsHeader.innerHTML=`${e.title}`
                var str = e.message.replace(/\n/g, '<br>')
                inner_Container.innerHTML=`${str}`
                // 넘버가 같은지 검증. 여러번 눌려서 ListNo가 너무 감소하는걸 방지.
            }
        })
    })
    


    $("#list").click(function(){
        window.location = "../view/news.html"
    })
}