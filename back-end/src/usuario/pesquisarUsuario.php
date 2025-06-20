<?php
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
    header('Content-Type: application/json');
    include_once('../../config/db_connect.php');

    // Parâmetros de paginação
    $limit = 10; // Quantos usuários por página
    $page = isset($_GET['page']) ? max(intval($_GET['page']), 1) : 1;
    $offset = ($page - 1) * $limit;

    $pesquisa = isset($_GET['pesquisa']) ? trim($_GET['pesquisa']) : '';
    $totalUsuarios = 0;

    try {
        // Contar total para paginação
        $sqlTotal = "SELECT COUNT(*) AS total FROM usuario";
        $resultTotal = $db_connect->query($sqlTotal);
        $totalUsuarios = $resultTotal->fetch_assoc()['total'];

        if ($pesquisa !== '') {
            $stmt = $db_connect->prepare("
                SELECT 
                    u.id_user,
                    u.nome_user,
                    u.cel_user,
                    u.email_user,
                    u.data_cadastro_user,
                    a.nome_assinatura
                FROM usuario u
                LEFT JOIN assinatura a ON a.id_usuario = u.id_user AND a.ativo = 1
                WHERE u.nome_user LIKE ?
                LIMIT ? OFFSET ?
            ");
            $param = "%" . $pesquisa . "%";
            $stmt->bind_param("sii", $param, $limit, $offset);
        } else {
            $stmt = $db_connect->prepare("
                SELECT 
                    u.id_user,
                    u.nome_user,
                    u.cel_user,
                    u.email_user,
                    u.data_cadastro_user,
                    a.nome_assinatura
                FROM usuario u
                LEFT JOIN assinatura a ON a.id_usuario = u.id_user AND a.ativo = 1
                LIMIT ? OFFSET ?
            ");
            $stmt->bind_param("ii", $limit, $offset);
        }

        $stmt->execute();
        $result = $stmt->get_result();

        $usuarios = [];
        while ($row = $result->fetch_assoc()) {
            $dataFormatada = '';
            if (!empty($row['data_cadastro_user'])) {
                $dataObj = new DateTime($row['data_cadastro_user']);
                $dataFormatada = $dataObj->format('d/m/Y - H:i:s');
            }

            $usuarios[] = [
                "id_user" => $row["id_user"],
                "nome_user" => $row["nome_user"],
                "cel_user" => $row["cel_user"],
                "email_user" => $row["email_user"],
                "data_cadastro_user" => $dataFormatada,
                "assinatura" => $row["nome_assinatura"] ?? null
            ];
        }

        echo json_encode([
            "success" => true,
            "usuarios" => $usuarios,
            "total" => $totalUsuarios,
            "pagina" => $page,
            "porPagina" => $limit
        ]);
    } catch (Exception $e) {
        echo json_encode([
            "success" => false,
            "message" => "Erro ao buscar usuários.",
            "error" => $e->getMessage()
        ]);
    }
    $stmt->close();
    $db_connect->close();
?>