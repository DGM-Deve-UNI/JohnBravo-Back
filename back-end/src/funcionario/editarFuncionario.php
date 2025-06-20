<?php
header('Content-Type: application/json');
include_once('../../config/db_connect.php');

if ($_SERVER['REQUEST_METHOD'] !== 'PUT') {
    echo json_encode(['success' => false, 'message' => 'Método não permitido.']);
    exit;
}

$input = json_decode(file_get_contents("php://input"), true);

$id       = $input['id']       ?? null;
$nome     = $input['nome']     ?? '';
$cargo    = $input['cargo']    ?? '';
$telefone = $input['telefone'] ?? '';
$email    = $input['email']    ?? '';
$status   = $input['status']   ?? '';

if (!$id || !$nome || !$cargo || !$telefone || !$email || !$status) {
    echo json_encode(['success' => false, 'message' => 'Dados incompletos.']);
    exit;
}

$stmt = $db_connect->prepare("UPDATE funcionario SET nome_completo = ?, cargo = ?, telefone = ?, email = ?, status = ? WHERE id_funcionario = ?");
$stmt->bind_param("sssssi", $nome, $cargo, $telefone, $email, $status, $id);

if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Erro ao atualizar.']);
}

$stmt->close();
$db_connect->close();
?>