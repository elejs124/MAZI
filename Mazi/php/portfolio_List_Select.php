<?php

    header('Content-Type: application/json; charset=utf-8');

    $category= $_GET['category'];

    $db= mysqli_connect('localhost', 'mazi0226', 'mazitogether0226!', 'mazi0226');

    $sql = "SELECT * FROM Portfolio WHERE category = ? ORDER BY C_no ASC";

    $stmt = mysqli_prepare($db, $sql);
    mysqli_stmt_bind_param($stmt, "s", $category);
    mysqli_stmt_execute($stmt);

    $result = mysqli_stmt_get_result($stmt);

    $jsonData= array();

    if (mysqli_num_rows($result) > 0) {

        while($row = mysqli_fetch_assoc($result)) {
            $c_no= $row['c_no'];
            $projectname= urldecode($row['projectname']);
            $jsonData[]= [
                'category' => $category,
                'c_no' => $c_no,
                'projectname' => $projectname
            ];
        }

    }else {
        echo "데이터가 없습니다";
    }
    
    if($result){
        echo json_encode($jsonData);
    }
    
    mysqli_close($db);

?>