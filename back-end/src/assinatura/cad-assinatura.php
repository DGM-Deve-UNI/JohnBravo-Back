<?php
header('Content-Type: application/json');
error_reporting(E_ALL);
ini_set('display_errors', 1);
include_once('../../config/db_connect.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nome = $_POST['nome'] ?? '';
    $descricao = $_POST['descricao'] ?? '';
    $valor = $_POST['valor'] ?? 0;
    $servicos = $_POST['servicos'] ?? [];
    
    $servicos_json = json_encode($servicos);
    
    // Validação simples
    // if (empty($nome) || empty($valor) || empty($periodo)) {
    //     echo json_encode([
    //         'success' => false,
    //         'message' => 'Nome, valor e período são obrigatórios.'
    //     ]);
    //     exit;
    // }
    
    // Para guardar os serviços em formato JSON no banco
    // $servicos_json = json_encode($servicos);

    // Verificar duplicidade do nome da assinatura (exemplo)
    $sqlCheck = "SELECT id_assinatura FROM assinatura WHERE nome_assinatura = ?";
    $stmtCheck = $db_connect->prepare($sqlCheck);
    $stmtCheck->bind_param("s", $nome);
    $stmtCheck->execute();
    $resultCheck = $stmtCheck->get_result();

    if ($resultCheck->num_rows > 0) {
        echo json_encode([
            'success' => false,
            'message' => 'Já existe uma assinatura com este nome.'
        ]);
        exit;
    }
    $stmtCheck->close();

    // Inserir dados da assinatura
    $sqlInsert = "INSERT INTO assinatura (nome_assinatura, descricao, servicos_incluidos, preco_mensal) VALUES (?, ?, ?, ?)";
    $stmt = $db_connect->prepare($sqlInsert);
    if (!$stmt) {
        echo json_encode([
            'success' => false,
            'message' => 'Erro ao preparar a query: ' . $db_connect->error
        ]);
        exit;
    }
    
    $stmt->bind_param("sssd", $nome, $descricao, $servicos_json, $valor);

    if ($stmt->execute()) {
        echo json_encode([
            'success' => true,
            'message' => 'Assinatura cadastrada com sucesso!'
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Erro ao cadastrar a assinatura: ' . $stmt->error
        ]);
    }

    $stmt->close();
    $db_connect->close();
}
?>