<?php
header('Content-Type: application/json');
include_once('../../config/db_connect.php');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Método não permitido.']);
    exit;
}

$id = $_POST['id'] ?? null;

if (!$id) {
    echo json_encode(['success' => false, 'message' => 'ID do funcionário não fornecido.']);
    exit;
}

$stmt = $db_connect->prepare("DELETE FROM funcionario WHERE id_funcionario = ?");
$stmt->bind_param("i", $id);

if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Erro ao excluir funcionário.']);
}

$stmt->close();
$db_connect->close();
?>