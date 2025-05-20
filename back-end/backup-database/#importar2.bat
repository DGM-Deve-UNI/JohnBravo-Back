@echo off
chcp 65001 >NUL
setlocal enabledelayedexpansion

:: Ajuste para depuração
echo DEBUG: Iniciando script...
pause

:: Configurações do MySQL
set MYSQL_USER=root
set MYSQL_PASSWORD=

:: Verifica se senha foi definida
if defined MYSQL_PASSWORD (
    set MYSQL_PASSWORD_PARAM=-p%MYSQL_PASSWORD%
) else (
    set MYSQL_PASSWORD_PARAM=
)

set MYSQL_HOST=localhost
set XAMPP_PATH=C:\xampp

:: Verifica se o MySQL existe no caminho esperado
if not exist "%XAMPP_PATH%\mysql\bin\mysql.exe" (
    echo Erro: MySQL não encontrado em %XAMPP_PATH%\mysql\bin\mysql.exe
    pause
    exit /b
)

:: Caminhos
set SCRIPT_DIR=%~dp0
set BACKUP_DIR=%SCRIPT_DIR%database

echo.
echo === Script de Restauração de Banco de Dados MySQL ===
echo.

echo Arquivos de backup disponíveis:
echo.
dir /b "%BACKUP_DIR%\*.sql" 2>nul
echo.

set /p BACKUP_NAME=Digite o nome do arquivo de backup (.sql) ou caminho completo: 

if exist "%BACKUP_NAME%" (
    set BACKUP_FILE=%BACKUP_NAME%
) else (
    set BACKUP_FILE=%BACKUP_DIR%\%BACKUP_NAME%
)

if not "%BACKUP_FILE:~-4%" == ".sql" set BACKUP_FILE=%BACKUP_FILE%.sql

if not exist "%BACKUP_FILE%" (
    echo Erro: O arquivo de backup não foi encontrado.
    pause
    goto :EOF
)

for %%F in ("%BACKUP_FILE%") do (
    set FILENAME=%%~nF
)

for /f "tokens=1 delims=_" %%a in ("!FILENAME!") do (
    set DB_NAME=%%a
)

echo.
echo Restaurando o banco de dados '!DB_NAME!' a partir do arquivo:
echo %BACKUP_FILE%
echo.
set /p CONFIRM=Confirma a restauração? Isso substituirá qualquer dado existente (S/N): 

if /i "%CONFIRM%" NEQ "S" (
    echo Restauração cancelada pelo usuário.
    goto :EOF
)

:: Cria o banco
"%XAMPP_PATH%\mysql\bin\mysql.exe" -u%MYSQL_USER% %MYSQL_PASSWORD_PARAM% -h%MYSQL_HOST% -e "CREATE DATABASE IF NOT EXISTS %DB_NAME%;"

:: Restaura
echo Restaurando o backup...
"%XAMPP_PATH%\mysql\bin\mysql.exe" -u%MYSQL_USER% %MYSQL_PASSWORD_PARAM% -h%MYSQL_HOST% %DB_NAME% < "%BACKUP_FILE%"

if %ERRORLEVEL% EQU 0 (
    echo Restauração concluída com sucesso!
) else (
    echo Erro ao restaurar o backup. Verifique o arquivo e tente novamente.
)

echo.
pause
exit /b
