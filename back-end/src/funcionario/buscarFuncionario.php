<?php
header('Content-Type: application/json');
include_once('../../config/db_connect.php');

if (!isset($_GET['id']) || !is_numeric($_GET['id'])) {
    echo json_encode(['success' => false, 'message' => 'ID inválido']);
    exit;
}

$id = intval($_GET['id']);

$stmt = $db_connect->prepare("SELECT id_funcionario as id, nome_completo as nome, cargo, telefone, email, status FROM funcionario WHERE id_funcionario = ?");
$stmt->bind_param("i", $id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode(['success' => false, 'message' => 'Funcionário não encontrado']);
    exit;
}

$funcionario = $result->fetch_assoc();

echo json_encode(['success' => true, 'funcionario' => $funcionario]);

$stmt->close();
$db_connect->close();
?>