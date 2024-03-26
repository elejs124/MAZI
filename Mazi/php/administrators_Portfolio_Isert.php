<?php

    header('Content-Type:text/html; charset=utf-8');

    $category= $_POST['category'];
    $projectname = $_POST['projectname'];
    $file= $_FILES['images'];

    $imgData = array();

    foreach ($file['tmp_name'] as $tmp_name) {
        $imgData[] = [
            'encoded' => base64_encode(file_get_contents($tmp_name))
        ];
    }

    $jsonData = json_encode($imgData);

    $db= mysqli_connect('localhost', 'mazi0226', 'mazitogether0226!', 'mazi0226');

    $sql = "SELECT * FROM Portfolio WHERE category = ? ORDER BY c_no DESC LIMIT 1";
    $stmt = mysqli_prepare($db, $sql);
    mysqli_stmt_bind_param($stmt, "s", $category);
    mysqli_stmt_execute($stmt);

    $result = mysqli_stmt_get_result($stmt);

    // $result= mysqli_query($db, $sql);

    if (mysqli_num_rows($result) > 0) {
        while($row = mysqli_fetch_assoc($result)) {
            $c_no= $row['c_no'] + 1;
        }
    }else {
        $c_no= 1;
    }

    $sql= "INSERT INTO Portfolio (date, category, c_no, projectname, data) VALUES (NOW(), '$category', '$c_no', '$projectname', '$jsonData')";
    
    $result= mysqli_query($db, $sql);
    
    if($result){
        echo "응답 성공<br>";
    }else{
        echo "응답 실패<br>";
        echo $category . "<br>";
        echo $c_no . "<br>";
        echo $projectname . "<br>";
        echo $jsonData . "<br>";
    }

    mysqli_close($db);

?>