<?php // -====- Realiza requisição ao banco para realizar login -====- \\
    header('Content-Type: application/json');
    include_once('../../config/db_connect.php');
// ===========================================================================\\
    if ($db_connect->connect_error) {
        echo json_encode(['success' => false, 'message' => 'Erro de conexão com o banco de dados']);
        exit();
    }
// ===========================================================================\\
// Receber os dados JSON
    $data = json_decode(file_get_contents("php://input"), true);
// Verificar se os dados foram passados
    $login = $data['login'];
    $senha = $data['senha'];
// ===========================================================================\\
// Buscar o usuário no banco de dados
    $sql = "SELECT * FROM usuario WHERE login_user = ? OR email_user = ?";
    if ($stmt = $db_connect->prepare($sql)) {
        $stmt->bind_param("ss", $login, $login);
        $stmt->execute();
        $result = $stmt->get_result();
    // Se o usuário for encontrado
        if ($result->num_rows > 0) {
            $user = $result->fetch_assoc();
        // Verificar se a senha está correta
            if (password_verify($senha, $user['senha_user'])) {
                $token = bin2hex(random_bytes(16));
        // Formatar a data de nascimento para o formato 'd/m/Y'  
            $data_nasc_formatada = date('d/m/Y', strtotime($user['data_nasc_user']));  
            // Retornar sucesso e dados do usuário
                echo json_encode([
                    'success' => true,
                    'message' => 'Login realizado com sucesso!',
                    'userData' => [
                        // 'id' => $user['id_user'],
                        'nome' => $user['nome_user'],
                        'sobrenome' => $user['sobrenome_user'],
                        'nascimento' => $data_nasc_formatada,
                        'email' => $user['email_user'],
                        'cel' => $user['cel_user'],
                        'tel' => $user['tel_user'],
                        'login' => $user['login_user'],
                        'cep' => $user['cep_user'],
                        'endereco' => $user['endereco_user'],
                        'numEnd' => $user['num_end_user'],
                        'estado' => $user['estado_user'],
                        'cidade' => $user['cidade_user'],
                        'bairro' => $user['bairro_user'],
                    ]
                ]);
            } else {
                echo json_encode(['success' => false, 'message' => 'Usuário ou senha incorretos']);
            }
        } else {
            echo json_encode(['success' => false, 'message' => 'Usuário ou senha incorretos']);
        }
        $stmt->close();
    } else {
        echo json_encode(['success' => false, 'message' => 'Erro ao preparar a query.']);
    }
// ===========================================================================\\
    $db_connect->close();
?>