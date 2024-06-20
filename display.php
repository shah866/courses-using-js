<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
//header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "courses";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// SQL query to select data from the database
$sql = "SELECT text AS name, confirmed AS isConfirmed FROM tbl";

$result = $conn->query($sql);

$data = array(); // Array to store fetched data

if ($result->num_rows > 0) {
    // Fetch each row of the result and add it to the $data array
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
}

// Close connection
$conn->close();

// Output JSON encoded data
echo json_encode($data);
?>
