@echo off
echo ========================================
echo Kaggle Dataset Downloader
echo Earthquake Indonesia Dataset
echo ========================================
echo.

REM Check if kaggle is installed
where kaggle >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Kaggle CLI not installed!
    echo.
    echo Please install Kaggle CLI first:
    echo   pip install kaggle
    echo.
    echo Then setup your API credentials:
    echo   1. Login to Kaggle.com
    echo   2. Go to Account -^> API -^> Create New API Token
    echo   3. Save kaggle.json to: C:\Users\%USERNAME%\.kaggle\
    echo.
    pause
    exit /b 1
)

echo [INFO] Kaggle CLI found!
echo.

REM Create data directory if not exists
if not exist "data" mkdir data

echo [INFO] Downloading dataset from Kaggle...
echo Dataset: kekavigi/earthquakes-in-indonesia
echo.

cd data
kaggle datasets download -d kekavigi/earthquakes-in-indonesia

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [ERROR] Download failed!
    echo Please check:
    echo   1. Kaggle credentials are set up correctly
    echo   2. You have accepted the dataset terms on Kaggle website
    echo   3. Your internet connection is working
    echo.
    cd ..
    pause
    exit /b 1
)

echo.
echo [INFO] Download complete! Extracting...
echo.

REM Extract ZIP file
powershell -command "Expand-Archive -Path 'earthquakes-in-indonesia.zip' -DestinationPath '.' -Force"

if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Extraction failed!
    cd ..
    pause
    exit /b 1
)

echo [INFO] Extraction complete!
echo.

REM Find CSV file and rename to earthquakes.csv
for %%f in (*.csv) do (
    echo [INFO] Found CSV file: %%f
    copy "%%f" "earthquakes.csv" >nul
    echo [INFO] Renamed to earthquakes.csv
)

cd ..

echo.
echo ========================================
echo [SUCCESS] Dataset ready!
echo ========================================
echo.
echo File location: backend\data\earthquakes.csv
echo.
echo Next step: Import to database
echo   cd backend
echo   npm run import-csv
echo.
pause
