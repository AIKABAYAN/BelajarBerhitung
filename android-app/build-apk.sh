#!/bin/bash

echo "Building Monster Math Quest Android APK..."
echo

if [ ! -f "./gradlew" ]; then
    echo "Error: gradlew not found. Please run this script from the android-app directory."
    exit 1
fi

echo "Cleaning previous builds..."
./gradlew clean
if [ $? -ne 0 ]; then
    echo "Error during clean phase"
    exit 1
fi

echo
echo "Building debug APK..."
./gradlew assembleDebug
if [ $? -ne 0 ]; then
    echo "Error during build phase"
    exit 1
fi

echo
echo "Build completed successfully!"
echo "APK location: app/build/outputs/apk/debug/app-debug.apk"
echo
echo "To install on a connected device, run:"
echo "adb install app/build/outputs/apk/debug/app-debug.apk"