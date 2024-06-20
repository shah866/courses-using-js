<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Headers: Content-Type");

$servername = "localhost";
$username = "root";
$password = "";
$database = "courses";

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get data from the request
$data = json_decode(file_get_contents("php://input"), true);

// Delete all existing courses
$conn->query("DELETE FROM tbl");

// Prepare and bind SQL statement for insertion
$stmtInsert = $conn->prepare("INSERT INTO tbl (text, confirmed) VALUES (?, ?)");
$stmtInsert->bind_param("si", $text, $confirmed);

if (!empty($data)) {
    // Iterate through each course data and insert into the database
    // Send response
echo "hi";
    foreach ($data as $course) {
        $text = $course['name'];
        $confirmed = $course['isConfirmed'];
        $stmtInsert->execute();
    }
}


// Close statement and connection
$stmtInsert->close();
$conn->close();

// Send response
echo "Courses added successfully in the database.";
?>
