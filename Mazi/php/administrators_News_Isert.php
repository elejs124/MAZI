<?php

    header('Content-Type:text/html; charset=utf-8');

    // $no= (int)$_POST['no'];
    $title = $_POST['title'];
    $message= $_POST['message'];
    $file= $_FILES['image'];

    $tmp_name = $file["tmp_name"];
    $name = $file["name"];

    $imgdata= base64_encode(file_get_contents($tmp_name));

    $db= mysqli_connect('localhost', 'mazi0226', 'mazitogether0226!', 'mazi0226');

    $sql= "INSERT INTO News (date, title, message, img_data) VALUES (NOW(), '$title', '$message', '$imgdata')";

    $result= mysqli_query($db, $sql);
    
    if($result){
        echo "응답 성공<br>";
    }else{
        echo "응답 실패<br>";
    }

    // echo $imagedata;
    mysqli_close($db);

?>