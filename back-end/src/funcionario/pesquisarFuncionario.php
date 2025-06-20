<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: application/json');
include_once('../../config/db_connect.php');

$limit = 10;
$page = isset($_GET['page']) ? max((int)$_GET['page'], 1) : 1;
$offset = ($page - 1) * $limit;
$pesquisa = isset($_GET['pesquisa']) ? trim($_GET['pesquisa']) : '';

try {
    $sqlTotal = "SELECT COUNT(*) AS total FROM funcionario";
    $resTotal = $db_connect->query($sqlTotal);
    $total = $resTotal->fetch_assoc()['total'];

    if ($pesquisa !== '') {
        $stmt = $db_connect->prepare("
            SELECT id_funcionario, nome_completo, cargo, telefone, email, status
            FROM funcionario
            WHERE nome_completo LIKE ?
            LIMIT ? OFFSET ?
        ");
        $like = '%' . $pesquisa . '%';
        $stmt->bind_param("sii", $like, $limit, $offset);
    } else {
        $stmt = $db_connect->prepare("
            SELECT id_funcionario, nome_completo, cargo, telefone, email, status
            FROM funcionario
            LIMIT ? OFFSET ?
        ");
        $stmt->bind_param("ii", $limit, $offset);
    }

    $stmt->execute();
    $result = $stmt->get_result();

    $funcionarios = [];
    while ($row = $result->fetch_assoc()) {
        $funcionarios[] = [
            'id' => $row['id_funcionario'],
            'nome' => $row['nome_completo'],
            'cargo' => $row['cargo'],
            'telefone' => $row['telefone'],
            'email' => $row['email'],
            'status' => $row['status']
        ];
    }

    echo json_encode([
        'success' => true,
        'funcionarios' => $funcionarios,
        'total' => $total,
        'pagina' => $page,
        'porPagina' => $limit
    ]);
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Erro ao buscar funcionários.',
        'error' => $e->getMessage()
    ]);
}