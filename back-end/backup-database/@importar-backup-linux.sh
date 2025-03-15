#!/bin/bash

# Configurações do MySQL
MYSQL_USER="root"
MYSQL_PASSWORD=""
MYSQL_HOST="localhost"
XAMPP_PATH="/opt/lampp"

echo ""
echo "=== Script de Restauração de Banco de Dados MySQL ==="
echo ""

# Diretório dos backups (na mesma pasta do script)
SCRIPT_DIR="$(dirname "$(readlink -f "$0")")"
BACKUP_DIR="$SCRIPT_DIR/database"

echo "Arquivos de backup disponíveis:"
ls -1 "$BACKUP_DIR"/*.sql 2>/dev/null

echo ""
read -p "Digite o nome do arquivo de backup (.sql) ou caminho completo: " BACKUP_NAME

# Verificar se é caminho completo ou apenas nome do arquivo
if [[ -f "$BACKUP_NAME" ]]; then
    BACKUP_FILE="$BACKUP_NAME"
else
    BACKUP_FILE="$BACKUP_DIR/$BACKUP_NAME"
    # Se não tiver extensão .sql, adiciona
    if [[ "$BACKUP_FILE" != *.sql ]]; then
        BACKUP_FILE="${BACKUP_FILE}.sql"
    fi
fi

# Verificar se o arquivo existe
if [ ! -f "$BACKUP_FILE" ]; then
    echo "Erro: O arquivo de backup não foi encontrado."
    exit 1
fi

# Extrair o nome do banco de dados do nome do arquivo
FILENAME=$(basename "$BACKUP_FILE")
DB_NAME=$(echo "$FILENAME" | cut -d'_' -f1)

echo ""
echo "Restaurando o banco de dados '$DB_NAME' a partir do arquivo:"
echo "$BACKUP_FILE"
echo ""
read -p "Confirma a restauração? Isso substituirá qualquer dados existente (S/N): " CONFIRM

if [[ ! "$CONFIRM" =~ ^[Ss]$ ]]; then
    echo "Restauração cancelada pelo usuário."
    exit 0
fi

# Criar o banco de dados se não existir
$XAMPP_PATH/bin/mysql -u$MYSQL_USER -h$MYSQL_HOST -e "CREATE DATABASE IF NOT EXISTS $DB_NAME;"

# Restaurar o backup
echo "Restaurando o backup..."
$XAMPP_PATH/bin/mysql -u$MYSQL_USER -h$MYSQL_HOST < "$BACKUP_FILE"

# Verificar se a restauração foi bem-sucedida
if [ $? -eq 0 ]; then
    echo "Restauração concluída com sucesso!"
else
    echo "Erro ao restaurar o backup. Verifique o arquivo e tente novamente."
fi

echo ""
read -p "Pressione ENTER para sair..."