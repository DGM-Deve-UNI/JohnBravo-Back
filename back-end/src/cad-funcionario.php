<?php
header('Content-Type: application/json');
include_once('../config/db_connect.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Recebendo dados do formulário
    $nome     = $_POST['nomeFuncionario']     ?? '';
    $cargo    = $_POST['cargoFuncionario']    ?? '';
    $telefone = $_POST['telefoneFuncionario'] ?? '';
    $email    = $_POST['emailFuncionario']    ?? '';
    $status   = $_POST['statusFuncionario']   ?? '';

    // Processar a imagem, se enviada
    // $foto = null;
    // if (isset($_FILES['fotoFuncionario']) && $_FILES['fotoFuncionario']['error'] === UPLOAD_ERR_OK) {
    //     $foto = file_get_contents($_FILES['fotoFuncionario']['tmp_name']);
    // }

    // Verifica se o e-mail já existe
    $sqlCheck = "SELECT email FROM funcionario WHERE email = ?";
    $stmtCheck = $db_connect->prepare($sqlCheck);
    $stmtCheck->bind_param("s", $email);
    $stmtCheck->execute();
    $result = $stmtCheck->get_result();

    if ($result->num_rows > 0) {
        echo json_encode(['success' => false, 'message' => 'E-mail já cadastrado.']);
        exit;
    }
    $stmtCheck->close();

    // Insere novo funcionário
    $sqlInsert = "INSERT INTO funcionario (nome_completo, cargo, telefone, email, status, foto)
                  VALUES (?, ?, ?, ?, ?, ?)";
    $stmt = $db_connect->prepare($sqlInsert);
    $stmt->bind_param("sssssb", $nome, $cargo, $telefone, $email, $status, $foto);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Funcionário cadastrado com sucesso!']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Erro ao cadastrar funcionário.']);
    }

    $stmt->close();
    $db_connect->close();
}
?>