@echo off
chcp 65001 >NUL
setlocal enabledelayedexpansion

:: Configurações do MySQL
set MYSQL_USER=root
set MYSQL_PASSWORD=
set MYSQL_HOST=localhost
set XAMPP_PATH=C:\xampp

echo.
echo === Script de Restauração de Banco de Dados MySQL ===
echo.

:: Pasta de backups (na mesma pasta do script)
set SCRIPT_DIR=%~dp0
set BACKUP_DIR=%SCRIPT_DIR%database

echo Arquivos de backup disponíveis:
echo.
dir /b "%BACKUP_DIR%\*.sql" 2>nul
echo.

:: Solicitar o nome do arquivo de backup
set /p BACKUP_NAME=Digite o nome do arquivo de backup (.sql) ou caminho completo: 

:: Verificar se é caminho completo ou apenas nome do arquivo
if exist "%BACKUP_NAME%" (
    set BACKUP_FILE=%BACKUP_NAME%
) else (
    set BACKUP_FILE=%BACKUP_DIR%\%BACKUP_NAME%
)

:: Se não tiver extensão .sql, adiciona
if not "%BACKUP_FILE:~-4%" == ".sql" set BACKUP_FILE=%BACKUP_FILE%.sql

:: Verificar se o arquivo existe
if not exist "%BACKUP_FILE%" (
    echo Erro: O arquivo de backup não foi encontrado.
    goto :EOF
)

:: Extrair o nome do banco de dados do nome do arquivo
for %%F in ("%BACKUP_FILE%") do (
    set FILENAME=%%~nF
)

:: Separar o nome do banco da data
for /f "tokens=1 delims=_" %%a in ("!FILENAME!") do (
    set DB_NAME=%%a
)

echo.
echo Restaurando o banco de dados '%DB_NAME%' a partir do arquivo:
echo %BACKUP_FILE%
echo.
set /p CONFIRM=Confirma a restauração? Isso substituirá qualquer dados existente (S/N): 

if /i "%CONFIRM%" NEQ "S" (
    echo Restauração cancelada pelo usuário.
    goto :EOF
)

:: Criar o banco de dados se não existir
"%XAMPP_PATH%\mysql\bin\mysql" -u%MYSQL_USER% %MYSQL_PASSWORD_PARAM% -h%MYSQL_HOST% -e "CREATE DATABASE IF NOT EXISTS %DB_NAME%;"

:: Restaurar o backup
echo Restaurando o backup...
"%XAMPP_PATH%\mysql\bin\mysql" -u%MYSQL_USER% %MYSQL_PASSWORD_PARAM% -h%MYSQL_HOST% < "%BACKUP_FILE%"

if %ERRORLEVEL% EQU 0 (
    echo Restauração concluída com sucesso!
) else (
    echo Erro ao restaurar o backup. Verifique o arquivo e tente novamente.
)

echo.
pause
exit /b