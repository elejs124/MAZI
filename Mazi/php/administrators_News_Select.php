<?php

    header('Content-Type:text/html; charset=utf-8');

    $conn = mysqli_connect('localhost', 'mazi0226', 'mazitogether0226!', 'mazi0226');

    $sql = "SELECT no, date, title, message, img_data
FROM News
ORDER BY no DESC
LIMIT 3";

    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_assoc($result)) {
            echo "번호: " . $row["no"] . "<br>";
            echo "날짜: " . $row["date"] . "<br>";
            echo "제목: " . $row["title"] . "<br>";
            echo "내용: " . $row["message"] . "<br>";
            echo "<img src=\"data:image/png;base64," . $row["img_data"] . "\">";
            echo "<br><br>";
        }
    } else {
        echo "데이터가 없습니다.";
    }

    mysqli_close($conn);

?>