<?php

require_once __DIR__ . '/../ac/update_student.php';

$fn = $_POST["first_name"];
$ln = $_POST["last_name"];
$db = $_POST["dob"];
$cl = $_POST["class"];
$em = $_POST["email"];
$gn = $_POST["gender"];
$id_student = $_POST["id_student"];

$sql = "UPDATE student SET
 first_name = '$fn',
 last_name = '$ln',
 dob = '$d0b',
 email = '$email',
 class = '$class', 
 gender = '$gender'
 WHERE student_id = $id_student ";

if(mysqli_query($conn, $sql))
   $response["success"] = 1;
else
   $response["success"] = 0;

echo json_encode($response);

?>