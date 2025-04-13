<?php // -====- Recebe dados do cadastro e envia ao servidor -====- \\
    header('Content-Type: application/json');
    include_once('../config/db_connect.php');
// ===========================================================================\\
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Log dos dados recebidos
    // file_put_contents('../logs/debug.log', print_r($_POST, true));
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
        $sql = "INSERT INTO usuarios 
            (nome_user, sobrenome_user, data_nasc_user, gen_user, cpf_user, 
            email_user, cel_user, tel_user, cep_user, endereco_user, 
            num_end_user, bairro_user, cidade_user, estado_user, 
            complemento_user, login_user, senha_user)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
// ===========================================================================\\
        if ($stmt = $db_connect->prepare($sql)) {
            $stmt->bind_param("sssssssssssssssss",
                $nome, $sobrenome, $dataNascimento, $genero, $cpf, $email, $celular, 
                $telefoneFixo, $cep, $endereco, $numero, $bairro, $cidade, $estado, 
                $complemento, $login, $senha
            );
// -------------------------------------------------------------------------- \\
            if ($stmt->execute()) {
                echo json_encode(['success' => true, 'message' => 'Cadastro realizado com sucesso!']);
            } else {
                echo json_encode(['success' => false, 'message' => 'Erro ao cadastrar no banco.']);
            }
            $stmt->close();
        } else {
            echo json_encode(['success' => false, 'message' => 'Erro ao preparar a query.']);
        }
// ===========================================================================\\
        $db_connect->close();
    }
?>