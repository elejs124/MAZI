<?php

    header('content-Type:application/html; charset=utf-8');

    $conn = mysqli_connect('localhost', 'mazi0226', 'mazitogether0226!', 'mazi0226');

    $sql = "SELECT * FROM News ORDER BY no DESC ";

    $result = mysqli_query($conn,$sql);

    $jsonData = array();

    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_assoc($result)) {
            $no = $row["no"];
            $date = $row["date"];
            $title = $row["title"];
            $message = $row["message"];
            $img_data = $row["img_data"];
            $jsonData[] = [
                'no' => $no,
                'date' => $date,
                'title' => $title,
                'message' => $message,
                'img_data' => $img_data
            ];
        }
        } else {
        echo "데이터가 없습니다.";
        }
    
    if($result){
        echo json_encode($jsonData);
    }
?>