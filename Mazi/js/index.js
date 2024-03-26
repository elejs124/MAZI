var _Page1_index = 0;
var _Page1_name = ["mazi", "vision", "trust", "value"];

var _Scroll_token = false;

$(document).ready(function () {
    initPage();
    eventBind();
});


function initPage() {
    init_index1();
}

function eventBind() {
    // 스크롤
    // https://webty.tistory.com/105
    $(".screen").each(function () {
        // 개별적으로 Wheel 이벤트 적용 mousewheel(IE/chrome/opera) DOMMouseScroll(FF)
        $(this).on("mousewheel DOMMouseScroll", function (e) {
            if (_Scroll_token) return;
            e.preventDefault();
            var delta = 0;
            /* IE */
            if (!event) event = window.event; // 들어온게 이벤트일 경우

            //휠에 대한 정보 얻기 파이어폭스 외 IE/Chrome/Opera = wheelDelta
            if (event.wheelDelta) {
                delta = event.wheelDelta / 50;
                //평균 50~120 사이로 요소의 인식높이에 따라 다름(한 화면(height100%)기준일떄는 120
                if (window.opera) delta = -delta;
                //휠에 대한 정보 얻기 Mozilla FF = detail
            } else if (event.detail) delta = -event.detail / 3;

            var moveTop = null;
            // 마우스휠을 위에서 아래로
            if (delta < 0) {
                if ($(this).next().length != 0) {
                    moveTop = $(this).next().offset().top;
                    if ($(this).next()[0].classList[1] == "page2") {
                        $(".Logo").addClass("color");
                        $(".nav_btn").addClass("color");
                        init_index2();
                    } else {
                        $(".Logo").removeClass("color");
                        $(".nav_btn").removeClass(" color");
                    }

                    if ($(this).next()[0].classList[1] == "page1") {
                        init_index1();
                    }

                    if ($(this).next()[0].classList[1] == "page3") {
                        init_index3();
                    }
                } else {
                    return;
                }
                // 마우스휠을 아래에서 위로
            } else {
                if ($(this).prev().length != 0) {
                    moveTop = $(this).prev().offset().top;
                    if ($(this).prev()[0].classList[1] == "page2") {
                        $(".Logo").addClass("color");
                        $(".nav_btn").addClass(" color");
                        init_index2();
                    } else {
                        $(".Logo").removeClass("color");
                        $(".nav_btn").removeClass(" color");
                    }

                    if ($(this).prev()[0].classList[1] == "page1") {
                        init_index1();
                    }

                    if ($(this).prev()[0].classList[1] == "page3") {
                        init_index3();
                    }
                } else {
                    return;
                }
            }
            _Scroll_token = true;
            // 화면 이동 0.8초(800)
            $("html,body").stop().animate({
                scrollTop: moveTop + 'px'
            }, {
                duration: 150,
                complete: function () {
                    _Scroll_token = false;
                }
            });
        });

        $(document).keydown(function (event) {
            if (event.keyCode == 38 || event.keyCode == 40) {
                event.preventDefault();
            }
        });
    });

    // 마우스 우클리 휠클릭 막기
    // https://mylife365.tistory.com/176
    $("body").mousedown(function (e) {
        // 우클릭 방지
        $(this)[0].oncontextmenu = function () {
            return false;
        }
        // 휠클릭 방지
        if (e.which == 2) {
            return false;
        }
    });

    $(document).on("click", ".arrow", function () {
        if ($(this).hasClass("right")) {
            _Page1_index++;
            init_index1();
        } else if ($(this).hasClass("left")) {
            _Page1_index--;
            init_index1();
        }
    });

    $(document).ready(function() {
        $(window).on('load', function() {
            $('html, body').animate({ scrollTop: 0 }, 'slow');
        });
    });
}

function init_index1() {
    $(".page1").empty();
    var left = "";
    var right = "";
    if (_Page1_index == 0) {
        left = "disabled";
    } else if (_Page1_index == _Page1_name.length - 1) {
        right = "disabled";
    }

    var html = `<div class="slide ${_Page1_name[_Page1_index]}_img">
                    <div class="line_box">
                        <div class="line"></div>
                        <div class="line"></div>
                        <div class="line"></div>
                        <div class="line"></div>
                        <div class="line"></div>
                    </div>
                    <div class="${_Page1_name[_Page1_index]}_txt"></div>
                    <div class="arrow_box">
                        <div class="left arrow ${left}"></div>
                        <div class="right arrow ${right}"></div>
                    </div>
                </div>`;
    $(".page1").append(html);
}

function init_index2() {
    animation();
    $(".page2_container").empty();
    var html = `<div class="left_bracket big"></div>
                    <div class="page2_area">
                        <div class="block">
                            <div class="page2_img img1"></div>
                            <div class="block_title">계약</div>
                            <div class="block_eng">Contract</div>
                            <div class="block_text">고객과 협의 를 <br> 통해계약 </div>
                        </div>

                        <div class="fa-sharp fa-solid fa-chevron-right"></div>
                        
                        <div class="block">
                            <div class="page2_img img2"></div>
                            <div class="block_title">기획</div>
                            <div class="block_eng">Plan</div>
                            <div class="block_text">기획서 제작 및 사이트 구조도 <br>제작 </div>
                        </div>

                        <div class="fa-sharp fa-solid fa-angle-right"></div>

                        <div class="block">
                            <div class="page2_img img3"></div>
                            <div class="block_title">1차수정</div>
                            <div class="block_eng">1st Revision</div>
                            <div class="block_text">고객에게 1차 Confirm 요청 <br>추가사항 요청시 <br>작업 진행</div>
                        </div>

                        <div class="fa-sharp fa-solid fa-angle-right"></div>

                        <div class="block">
                            <div class="page2_img img4"></div>
                            <div class="block_title">디자인</div>
                            <div class="block_eng">Design</div>
                            <div class="block_text">디자인 View <br>작업 진행 </div>
                        </div>

                        <div class="fa-sharp fa-solid fa-angle-right"></div>

                        <div class="block">
                            <div class="page2_img img5"></div>
                            <div class="block_title">2차수정</div>
                            <div class="block_eng">2st Revision</div>
                            <div class="block_text">디자인 수정 및 기획서 수정</div>
                        </div>

                        <div class="fa-sharp fa-solid fa-angle-right"></div>

                        <div class="block">
                            <div class="page2_img img6"></div>
                            <div class="block_title">기능설계</div>
                            <div class="block_eng">Functional Design</div>
                            <div class="block_text">요청하신 기능 <br>작업 진행</div>
                        </div>

                        <div class="fa-sharp fa-solid fa-angle-right"></div>

                        <div class="block">
                            <div class="page2_img img7"></div>
                            <div class="block_title">완료</div>
                            <div class="block_eng">Complete</div>
                            <div class="block_text">고객에게 패키지 전달 및 의뢰 <br>완료</div>
                        </div>
                    </div>
                    <div class="right_bracket big"></div>`;
    $(".page2_container").append(html);
}

function init_index3() {
    console.log("tt");
    $(".page3_container").empty();
    var html = `<div class="page3_block">
                    <div class="page3_img android"></div>
                    <div class="page3_text eng">Android Project</div>
                    <div class="page3_text kor">안드로이드 프로젝트</div>
                </div>

                <div class="page3_block">
                    <div class="page3_img web"></div>
                    <div class="page3_text eng">Web Project</div>
                    <div class="page3_text kor">웹 프로젝트</div>
                </div>

                <div class="page3_block">
                    <div class="page3_img design"></div>
                    <div class="page3_text eng">Re-Design Project</div>
                    <div class="page3_text kor">리디자인 프로젝트</div>
                </div>`;
    $(".page3_container").append(html);
     
}

function animation() {
    // var tag = document.querySelector('.title');
    // var letter = document.querySelector('.title').innerHTML; // Business Introduction

    // tag.innerHTML = '';
    // for (let i = 0; i < letter.length; i++) {
    //     setTimeout(function () {
    //         tag.innerHTML += letter[i];
    //     }, (i + 1) * 100)
    // }
}