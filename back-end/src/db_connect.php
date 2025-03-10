<?php
// Configurações do banco de dados
$host = "localhost";  // Servidor do banco (no XAMPP é localhost)
$dbname = "johnBravo"; // Nome do banco de dados (crie esse nome no phpMyAdmin)
$username = "root";  // Usuário padrão do XAMPP
$password = "";  // Senha padrão do XAMPP é vazia

// Criando a conexão
// try {
//     $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
//     $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
// } catch (PDOException $e) {
//     die("Erro de conexão: " . $e->getMessage());
// }

// ou (Vídeo)*
$mysqli = new mysqli($host, $username, $password, $dbname);
if ($mysqli->connect_errno) {
    echo "Erro de conexão: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
} else 
    echo "Conectado!";