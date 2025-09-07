# Monster Math Quest - Android Version

An educational math game for children aged 7-12 to master multiplication tables through interactive gameplay, now available as a standalone Android application.

## Project Structure

```
android-app/
├── app/
│   ├── src/main/
│   │   ├── java/com/monstermath/quest/
│   │   │   └── MainActivity.java
│   │   ├── res/
│   │   │   ├── layout/
│   │   │   │   └── activity_main.xml
│   │   │   ├── values/
│   │   │   │   └── strings.xml
│   │   │   └── drawable/
│   │   │       └── ic_launcher.xml
│   │   └── assets/
│   │       ├── index.html
│   │       ├── styles.css
│   │       ├── quiz-styles.css
│   │       ├── script.js
│   │       ├── quiz-mode.js
│   │       └── *.mp3 (sound files)
│   ├── build.gradle
│   └── src/main/AndroidManifest.xml
├── build.gradle
├── settings.gradle
├── gradle.properties
├── gradlew
├── gradlew.bat
└── gradle/wrapper/
    ├── gradle-wrapper.jar
    └── gradle-wrapper.properties
```

## Building the Application

### Prerequisites
- Android Studio Flamingo or later
- Android SDK API level 33 (Android 13)
- Java Development Kit (JDK) 8 or later

### Building with Android Studio
1. Open Android Studio
2. Select "Open an existing Android Studio project"
3. Navigate to the `android-app` directory and select it
4. Wait for Gradle to sync the project
5. Connect an Android device or start an emulator
6. Click the "Run" button (green play icon) or press Shift+F10

### Building with Command Line
1. Navigate to the `android-app` directory
2. On Windows, run:
   ```
   gradlew.bat assembleDebug
   ```
3. On macOS/Linux, run:
   ```
   ./gradlew assembleDebug
   ```

The APK will be generated at: `app/build/outputs/apk/debug/app-debug.apk`

## Testing

The application has been tested on:
- Android Emulator (API 21-33)
- Physical devices (Android 7.0 and above)

## Features

- Two game modes: Learning and Quiz
- Visual learning with grid representations
- Progressive difficulty levels
- Score tracking and level progression
- Fun monster-themed gameplay
- Landscape orientation optimized for tablets and phones

## Technical Details

This Android application uses a WebView wrapper approach to embed the existing web-based game:
- All HTML, CSS, and JavaScript code remains unchanged
- WebView settings optimized for game performance
- Audio support for sound effects
- Hardware acceleration enabled
- Landscape orientation locked for optimal gameplay

## Future Enhancements

Potential improvements for future versions:
- Native Android UI components
- Offline progress tracking
- Google Play Services integration
- Multi-language support
- Accessibility improvements