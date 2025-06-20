<?php // -====- Recebe dados do cadastro e envia ao servidor -====- \\
    header('Content-Type: application/json');
    include_once('../../config/db_connect.php');
// ===========================================================================\\
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // ----- Coleta os dados do formulário ----- \\
        $nome = $_POST['nome'] ?? '';
        $sobrenome = $_POST['sobrenome'] ?? '';
        $dataNascimento = $_POST['data'] ?? '';
        $genero = $_POST['genero'] ?? '';
        $cpf = $_POST['cpf'] ?? '';
        $email = $_POST['email'] ?? '';
        $celular = $_POST['cel'] ?? '';
        $telefoneFixo = $_POST['tel'] ?? '';
        $cep = $_POST['cep'] ?? '';
        $endereco = $_POST['endereco'] ?? '';
        $numero = $_POST['numero'] ?? '';
        $bairro = $_POST['bairro'] ?? '';
        $cidade = $_POST['cidade'] ?? '';
        $estado = $_POST['estado'] ?? '';
        $complemento = $_POST['complemento'] ?? '';
        $login = $_POST['login'] ?? '';
        $senha = password_hash($_POST['senha'] ?? '', PASSWORD_DEFAULT);
// ===========================================================================\\
    // ----- Validação dos dados ----- \\
    $sql = "INSERT INTO usuario 
        (nome_user, sobrenome_user, data_nasc_user, gen_user, cpf_user, 
        email_user, cel_user, tel_user, cep_user, endereco_user, 
        num_end_user, bairro_user, cidade_user, estado_user, 
        complemento_user, login_user, senha_user)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
// ===========================================================================\\
// ----- Verificação de usuário existente via CPF, E-mail e Login ----- \\
    $sqlNewUser = "SELECT cpf_user, email_user, login_user FROM usuario WHERE cpf_user = ? OR email_user = ? OR login_user = ?";
    $stmtNewUser = $db_connect->prepare($sqlNewUser);
    $stmtNewUser->bind_param("sss", $cpf, $email, $login);
    $stmtNewUser->execute();
    $resultNewUser = $stmtNewUser->get_result();
// ----- Verifica individualmente cada campo duplicado ----- \\
    $erros = [];

    while ($row = $resultNewUser->fetch_assoc()) {
        if ($row['cpf_user'] === $cpf) {
            $erros[] = "CPF já cadastrado";
        }
        if ($row['email_user'] === $email) {
            $erros[] = "E-mail já cadastrado";
        }
        if ($row['login_user'] === $login) {
            $erros[] = "Login já cadastrado";
        }
    }

    if (!empty($erros)) {
        echo json_encode([
            'success' => false,
            'message' => implode(" | ", $erros)
        ]);
        exit;
    }
// -------------------------------------------------------------------------- \\
        $stmtNewUser->close();
// ===========================================================================\\
    // ----- Insere os dados no banco de dados ----- \\
    if ($stmt = $db_connect->prepare($sql)) {
        $stmt->bind_param("sssssssssssssssss",
            $nome, $sobrenome, $dataNascimento, $genero, $cpf, $email, $celular, 
            $telefoneFixo, $cep, $endereco, $numero, $bairro, $cidade, $estado, 
            $complemento, $login, $senha
        );
    // ----- Executa o cadastro ----- \\
    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Cadastro realizado com sucesso!']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Erro ao cadastrar no banco.']);
    }
        $stmt->close();
    } else {
        echo json_encode(['success' => false, 'message' => 'Erro ao preparar a query.']);
    }
// -------------------------------------------------------------------------- \\
        $db_connect->close();
    }
?>