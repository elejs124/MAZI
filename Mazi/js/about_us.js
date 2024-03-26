// 페이지 로드시 함수 실행
window.onload = ClickEvent;

// 클릭 이벤트 실행 대기
function ClickEvent(){
    // 컨테이너에 네비게이션에 select 되는 애들 데이터 값 삽입
    NavigationContainer = $(".Select_Button") // 0-3 배열. 0 - Logo, 1 - Moto, 2 - Expertise, 3 - Location
    // 이후 눌리는 거에 따라 검증하여 css html 변화 및 이외 것들 초기화
    function SelectButton(elem){
        for(var i = 0; i<4 ; i++){
            $(NavigationContainer[i]).css('background-color','#9A9A9A').css('color','#0b1a2e')
        }
        if(elem % 2 == 0){
            $(NavigationContainer[elem]).css('background-color','white')
            $(".nav_btn").removeClass('color')
            $(".Logo").removeClass('color')
            $(".blank").removeClass('blank_color')
        }else{
            $(NavigationContainer[elem]).css('background-color','#0b1a2e').css('color','white')
            $(".nav_btn").addClass('color')
            $(".Logo").addClass('color')
            $(".blank").addClass('blank_color')
        }
    }
    
    $(".Select_Button").click(function(){
        if(NavigationContainer[0].id === this.id){ // Logo 부분 클릭시 실행
            $("#Select_Bar").css("background-color", "#0b1a2e")
            SelectButton(0);
            setTimeout(function(){ // 추가하는 속도의 차등을 둬서 fade out 효과 삽입
                $("#Logo").css("display","flex") // display flex 추가 맨 처음 영역이라 나오는 속도가 달라 div라 속도 차이 따로 삽입.
                $("#Moto").css("display","none")
                $("#Expertise").css("display","none")
                $("#Location").css("display","none")
            }, 200)
            setTimeout(function(){
                $("#Logo").addClass('act')
                $("#Moto").removeClass('act')
                $("#Expertise").removeClass('act')
                $("#Location").removeClass('act')
            }, 0)
        }
        if(NavigationContainer[1].id === this.id){ // Moto 부분 클릭시 실행 
            $("#Select_Bar").css("background-color", "white")
            $("#Moto").css("display","flex") // display flex 추가
            SelectButton(1);
            setTimeout(function(){ // 추가하는 속도의 차등을 둬서 fade out 효과 삽입
                $("#Expertise").css("display","none")
                $("#Logo").css("display","none")
                $("#Location").css("display","none")
            }, 200)
            setTimeout(function(){ // css act 부분에서 opacity 기능을 추가하여 fade in 효과 삽입
                $("#Logo").removeClass('act')
                $("#Moto").addClass('act')
                $("#Expertise").removeClass('act')
                $("#Location").removeClass('act')
            }, 0)
        }
        if(NavigationContainer[2].id === this.id){ // Expertise 부분 클릭시 실행
            $("#Select_Bar").css("background-color", "#0b1a2e")
            $("#Expertise").css("display","flex")
            SelectButton(2);
            setTimeout(function(){ // 추가하는 속도의 차등을 둬서 fade out 효과 삽입
                $("#Moto").css("display","none")
                $("#Logo").css("display","none")
                $("#Location").css("display","none")
            }, 200)
            setTimeout(function(){ // css act 부분에서 opacity 기능을 추가하여 fade in 효과 삽입
                $("#Logo").removeClass('act')
                $("#Moto").removeClass('act')
                $("#Expertise").addClass('act')
                $("#Location").removeClass('act')
            }, 0)
        }
        if(NavigationContainer[3].id === this.id){ // Location 부분 클릭시 실행
            $("#Select_Bar").css("background-color", "white")
            $("#Location").css("display","flex")
            SelectButton(3);
            setTimeout(function(){
                $("#Moto").css("display","none")
                $("#Logo").css("display","none")
                $("#Expertise").css("display","none")
            }, 200)
            setTimeout(function(){ // css act 부분에서 opacity 기능을 추가하여 fade in 효과 삽입
                $("#Logo").removeClass('act')
                $("#Moto").removeClass('act')
                $("#Expertise").removeClass('act')
                $("#Location").addClass('act')
            }, 0)

    }})
}
