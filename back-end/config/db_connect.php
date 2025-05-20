<?php // -===- Conexão com o banco de dados -===- \\
    $host = "localhost";
    $dbname = "johnbravo";
    $username = "root";
    $password = ""; 
// -------------------------------------------------------------------------- \\
    $db_connect = new mysqli($host, $username, $password, $dbname);
// -------------------------------------------------------------------------- \\
    if ($db_connect->connect_errno) {
        echo json_encode(['success' => false, 'message' => 'Erro de conexão com o banco de dados']);
        exit();
    }
?>