<?php
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
    header('Content-Type: application/json');
    include_once('../../config/db_connect.php');

    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        echo json_encode(['success' => false, 'message' => 'Método não permitido.']);
        exit;
    }

    $nome     = trim($_POST['nomeFuncionario'] ?? '');
    $cargo    = trim($_POST['cargoFuncionario'] ?? '');
    $telefone = trim($_POST['telefoneFuncionario'] ?? '');
    $email    = trim($_POST['emailFuncionario'] ?? '');
    $status   = trim($_POST['statusFuncionario'] ?? '');
    $foto     = null;

    // Validações no back-end
    if (!$nome || !$cargo || !$telefone || !$email || !$status) {
        echo json_encode(['success' => false, 'message' => 'Todos os campos são obrigatórios.']);
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['success' => false, 'message' => 'E‑mail inválido.']);
        exit;
    }

    if (!preg_match('/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/', $telefone)) {
        echo json_encode(['success' => false, 'message' => 'Telefone inválido.']);
        exit;
    }

    if (isset($_FILES['fotoFuncionario']) && $_FILES['fotoFuncionario']['error'] === UPLOAD_ERR_OK) {
        $file = $_FILES['fotoFuncionario'];
        if (!str_starts_with($file['type'], 'image/')) {
            echo json_encode(['success' => false, 'message' => 'Formato inválido da foto.']);
            exit;
        }
        if ($file['size'] > 2 * 1024 * 1024) {
            echo json_encode(['success' => false, 'message' => 'Foto deve ter no máximo 2MB.']);
            exit;
        }
        $foto = file_get_contents($file['tmp_name']);
    }

    // Verifica duplicidade de e‑mail
    $stmtCheck = $db_connect->prepare("SELECT id_funcionario FROM funcionario WHERE email = ?");
    $stmtCheck->bind_param("s", $email);
    $stmtCheck->execute();
    if ($stmtCheck->get_result()->num_rows > 0) {
        echo json_encode(['success' => false, 'message' => 'E‑mail já cadastrado.']);
        exit;
    }
    $stmtCheck->close();

    $stmt = $db_connect->prepare("
    INSERT INTO funcionario (nome_completo, cargo, telefone, email, status, foto)
    VALUES (?, ?, ?, ?, ?, ?)
    ");
    $stmt->bind_param("sssssb", $nome, $cargo, $telefone, $email, $status, $foto);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Funcionário cadastrado com sucesso!']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Erro ao cadastrar funcionário.']);
    }

    $stmt->close();
    $db_connect->close();
?>