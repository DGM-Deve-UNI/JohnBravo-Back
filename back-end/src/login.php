<?php // -====- Realiza requisição ao banco para realizar login -====- \\
    header('Content-Type: application/json');
    include_once('../config/db_connect.php');
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
    $sql = "SELECT * FROM usuarios WHERE login_user = ? OR email_user = ?";
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
            // Retornar sucesso e dados do usuário
                echo json_encode([
                    'success' => true,
                    'message' => 'Login realizado com sucesso',
                    'userData' => [
                        // 'id' => $user['id_users'],
                        'nome' => $user['nome_user'],
                        'sobrenome' => $user['sobrenome_user'],
                        // 'email' => $user['email_user'],
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
