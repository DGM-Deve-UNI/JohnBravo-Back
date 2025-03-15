@echo off
chcp 65001 >NUL
setlocal enabledelayedexpansion

:: Configurações do MySQL
set MYSQL_USER=root
set MYSQL_PASSWORD=
set MYSQL_HOST=localhost
set XAMPP_PATH=C:\xampp

:: Nome do banco de dados para backup
set /p DB_NAME=Digite o nome do banco de dados que deseja fazer backup: 

:: Pasta para salvar o backup (na mesma pasta do script)
set SCRIPT_DIR=%~dp0
set BACKUP_DIR=%SCRIPT_DIR%database
if not exist "%BACKUP_DIR%" mkdir "%BACKUP_DIR%"

:: Nome do arquivo de backup com data e hora
set TIMESTAMP=%date:~6,4%-%date:~3,2%-%date:~0,2%_%time:~0,2%-%time:~3,2%-%time:~6,2%
set TIMESTAMP=%TIMESTAMP: =0%
set BACKUP_FILE=%BACKUP_DIR%\%DB_NAME%_%TIMESTAMP%.sql

echo.
echo === Script de Backup de Banco de Dados MySQL ===
echo.
echo Iniciando backup do banco '%DB_NAME%'...

:: Verificar se o banco existe
"%XAMPP_PATH%\mysql\bin\mysql" -u%MYSQL_USER% %MYSQL_PASSWORD_PARAM% -h%MYSQL_HOST% -e "SHOW DATABASES LIKE '%DB_NAME%';" > nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo Erro: O banco de dados '%DB_NAME%' não existe.
    goto :EOF
)

:: Executar o backup usando mysqldump
echo Criando backup em: %BACKUP_FILE%
"%XAMPP_PATH%\mysql\bin\mysqldump" -u%MYSQL_USER% --no-tablespaces --add-drop-database --databases %DB_NAME% > "%BACKUP_FILE%"

if %ERRORLEVEL% EQU 0 (
    echo Backup concluído com sucesso!
    echo Arquivo salvo em: %BACKUP_FILE%
) else (
    echo Erro ao criar o backup. Verifique as configurações e tente novamente.
)

echo.
pause
exit /b