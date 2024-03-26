(function () {
  // gitgub에서 가져온 기능들. https://github.com/dwyl/learn-to-send-email-via-google-script-html-no-server/blob/master/README.ko.md
  function getFormData(form) {
    var elements = form.elements;
    var honeypot;

    var fields = Object.keys(elements).filter(function (k) {
      if (elements[k].name === "honeypot") {
        honeypot = elements[k].value;
        return false;
      }
      return true;
    }).map(function (k) {
      if (elements[k].name !== undefined) {
        return elements[k].name;
        // special case for Edge's html collection
      } else if (elements[k].length > 0) {
        return elements[k].item(0).name;
      }
    }).filter(function (item, pos, self) {
      return self.indexOf(item) == pos && item;
    });

    var formData = {};
    fields.forEach(function (name) {
      var element = elements[name];

      // singular form elements just have one value
      formData[name] = element.value;

      // when our element has multiple items, get their values
      if (element.length) {
        var data = [];
        for (var i = 0; i < element.length; i++) {
          var item = element.item(i);
          if (item.checked || item.selected) {
            data.push(item.value);
          }
        }
        formData[name] = data.join(', ');
      }
    });

    // add form-specific values into the data
    formData.formDataNameOrder = JSON.stringify(fields);
    formData.formGoogleSheetName = form.dataset.sheet || "responses"; // default sheet name
    formData.formGoogleSendEmail = form.dataset.email || ""; // no email by default

    return {
      data: formData,
      honeypot: honeypot
    };
  }

  function handleFormSubmit(event) { // handles form submit without any jquery
    event.preventDefault(); // we are submitting via xhr below
    var form = event.target;
    var formData = getFormData(form);
    var data = formData.data;

    // If a honeypot field is filled, assume it was done so by a spam bot.
    if (formData.honeypot) {
      return false;
    }
    var buttons = document.getElementById('send')
    // action 값 잘 들어오면 버튼 비활성화
    if (document.getElementById('email_form').action == "https://script.google.com/macros/s/AKfycbzl53B4hDVpMgDLv4k3PA0T-GcytT8Ncw7lIbllCBgT1IVsEJ3_SY7aOulOd-b4luk/exec") {
      buttons.disabled = true;
      buttons.style.background = 'gray'
    }

    var url = form.action;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    // xhr.withCredentials = true;
    // 모달 display 변경을 위한 class값 불러오기
    const modal = document.getElementById('modal_Container')
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        form.reset()
        buttons.disabled = false;
        buttons.style.background = 'white'
        modal.classList.remove('hidden');
      }
    };
    // url encode form data for sending as post data
    var encoded = Object.keys(data).map(function (k) {
      return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
    }).join('&');
    xhr.send(encoded);

  }

  function loaded() {
    // bind to the submit event of our form
    var forms = document.querySelectorAll("form.gform");
    for (var i = 0; i < forms.length; i++) {
      forms[i].addEventListener("submit", handleFormSubmit, false);
    }
  };
  document.addEventListener("DOMContentLoaded", loaded, false);

  // 여러번 눌리는거 방지용 submit 버튼 비활성화

  window.onload = ClickEvent();

  function ClickEvent() {
    // 자세히 보기 클릭시 개인정보 이용 동의서 페이지로 넘어가게끔 하는 함수
    const privacy = document.getElementById('privacy_click')
    privacy.addEventListener('click', function () {
      window.open("privacy_policy.html", "_blank,", "width=700,height=600,left=200,top=200")
    })
    // 모달창 x버튼 눌러서 display none으로 바꾸는 기능
    const modalButton = document.getElementById("modalButton")
    modalButton.addEventListener('click', function () {
      const modal = document.getElementById('modal_Container')
      modal.classList.add('hidden');
    })

    // 문의하기 버튼 누르면 예외처리 시작. 
    const submit = document.getElementById('send')
    submit.addEventListener('click', function () {
      document.getElementById("email_form").action = "https://script.google.com/macros/s/AKfycbzl53B4hDVpMgDLv4k3PA0T-GcytT8Ncw7lIbllCBgT1IVsEJ3_SY7aOulOd-b4luk/exec";
      var warring = document.getElementById('warring');
      warring.style.visibility='hidden'

      // 개인정보 이용에 동의 하였는지 검증
      var privacy_check = document.getElementById('privacy')
      if (privacy_check.checked == false) {
        document.getElementById("email_form").action = "";
        warring.style.visibility='visible'
        warring.innerText="개인정보 이용에 동의해주세요.";
      }

      // 디자인 여부 라디오 체크했는지 검증
      var radioYes = document.getElementById('DesignCheckYes')
      var radioNo = document.getElementById('DesignCheckNo')
      if (!radioYes.checked && !radioNo.checked) {
        document.getElementById("email_form").action = "";
        warring.style.visibility='visible'
        warring.innerText="디자인 여부 체크해주세요.";
      }

      // select 구축 예상 선택했는지 검증
      var select_Budget = document.getElementById('budget').value;
      if (select_Budget == "") {
        document.getElementById("email_form").action = "";
        warring.style.visibility='visible';
        warring.innerText="구축 예산을 적어주세요.";
      }

      // select 분야 선택 했는지 검증
      var select_Field = document.getElementById('field');
      if (select_Field.options[select_Field.selectedIndex].value == 'none') {
        document.getElementById("email_form").action = "";
        warring.style.visibility='visible';
        warring.innerText="분야를 선택해주세요.";
      }

      // 이메일 양식 검증
      var email = document.getElementById("email").value;
      if (email != "") {
        // 차후 com net co.kr 등등 도메인까지 확인 하는 예외처리로
        var exptext = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
        if (exptext.test(email) == false) {
          document.getElementById("email_form").action = "";
          warring.style.visibility='visible'
          warring.innerText="이메일을 정확하게 입력해주세요.";
        }
      }

      //전화번호 양식 검증
      var number = document.getElementById("number").value;
      if (number != "") {
        var expnumber = /^010\d\d\d\d\d\d\d\d/;
        // var expnumberhyphen = /^010[-]\d\d\d\d[-]\d\d\d\d/;
        if (expnumber.test(number) == false) {
          document.getElementById("email_form").action = "";
          warring.style.visibility='visible'
          warring.innerText="전화번호를 정확하게 입력해주세요.";
        }
        // if (expnumberhyphen.test(number) == true){
        //   alert("-은 뺴주세요.");
        //   document.getElementById("email_form").action = "";
        // }
      }
      if (number == "") {
        document.getElementById("email_form").action = "";
        warring.style.visibility='visible'
        warring.innerText="전화번호를 입력해주세요.";
      }

      // 이름 양식 검증
      var name = document.getElementById("name").value;
      if (name == "") {
        document.getElementById("email_form").action = "";
        warring.style.visibility='visible'
        warring.innerText="이름을 입력해주세요.";
      }

    })
  }

})();
// 위에 괄호 지우지 마셈..