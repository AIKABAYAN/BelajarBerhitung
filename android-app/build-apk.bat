@echo off
echo Building Monster Math Quest Android APK...
echo.

if not exist "gradlew.bat" (
    echo Error: gradlew.bat not found. Please run this script from the android-app directory.
    pause
    exit /b 1
)

echo Cleaning previous builds...
call gradlew.bat clean
if %errorlevel% neq 0 (
    echo Error during clean phase
    pause
    exit /b %errorlevel%
)

echo.
echo Building debug APK...
call gradlew.bat assembleDebug
if %errorlevel% neq 0 (
    echo Error during build phase
    pause
    exit /b %errorlevel%
)

echo.
echo Build completed successfully!
echo APK location: app\build\outputs\apk\debug\app-debug.apk
echo.
echo To install on a connected device, run:
echo adb install app\build\outputs\apk\debug\app-debug.apk
echo.
pause