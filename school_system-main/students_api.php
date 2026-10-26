<?php
// students_api_simple.php  -  prints ALL students as JSON
// IMPORTANT: "<?php" must be the very first thing in this file (no blank line or space before it)
 
ob_start();   // catches any accidental output so the JSON stays clean
 
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
 
try {
    $conn = mysqli_connect("localhost", "root", "", "school_db");
    $result = mysqli_query($conn, "SELECT * FROM students ORDER BY student_id");
 
    $students = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $row["student_id"] = (int) $row["student_id"];
        $row["gender"] = ((int) $row["gender"] === 1) ? "Female" : "Male";
        $students[] = $row;
    }
    $output = json_encode($students);
} catch (Throwable $e) {
    http_response_code(500);
    $output = json_encode(["error" => $e->getMessage()]);
}
 
ob_end_clean();
header("Content-Type: application/json; charset=utf-8");
echo $output;
echo $output;