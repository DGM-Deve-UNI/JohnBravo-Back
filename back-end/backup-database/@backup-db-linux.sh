#!/usr/bin/bash

# Configurações do MySQL
MYSQL_USER="root"
MYSQL_PASSWORD=""
MYSQL_HOST="localhost"
XAMPP_PATH="/opt/lampp"

# Diretório para armazenar os backups (na mesma pasta do script)
SCRIPT_DIR="$(dirname "$(readlink -f "$0")")"
BACKUP_DIR="$SCRIPT_DIR/database"
mkdir -p "$BACKUP_DIR"

echo ""
echo "=== Script de Backup de Banco de Dados MySQL ==="
echo ""

# Solicitar nome do banco de dados
read -p "Digite o nome do banco de dados que deseja fazer backup: " DB_NAME

# Verificar se o banco existe
if ! $XAMPP_PATH/bin/mysql -u$MYSQL_USER -h$MYSQL_HOST -e "SHOW DATABASES LIKE '$DB_NAME';" &>/dev/null; then
    echo "Erro: O banco de dados '$DB_NAME' não existe."
    exit 1
fi

# Criar nome do arquivo com timestamp
TIMESTAMP=$(date +"%Y-%m-%d_%H-%M-%S")
BACKUP_FILE="$BACKUP_DIR/${DB_NAME}_${TIMESTAMP}.sql"

echo "Iniciando backup do banco '$DB_NAME'..."
echo "Criando backup em: $BACKUP_FILE"

# Executar o backup
$XAMPP_PATH/bin/mysqldump -u$MYSQL_USER -h$MYSQL_HOST --no-tablespaces --add-drop-database --databases $DB_NAME > "$BACKUP_FILE"

# Verificar se o backup foi bem-sucedido
if [ $? -eq 0 ]; then
    echo "Backup concluído com sucesso!"
    echo "Arquivo salvo em: $BACKUP_FILE"
else
    echo "Erro ao criar o backup. Verifique as configurações e tente novamente."
fi

echo ""
read -p "Pressione ENTER para sair..."
