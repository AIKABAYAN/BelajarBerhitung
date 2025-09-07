# Monster Math Quest Android Project Structure

This document shows the complete file structure of the Android version of Monster Math Quest.

## Root Directory
```
android-app/
├── app/
│   ├── build.gradle
│   ├── proguard-rules.pro
│   └── src/
│       └── main/
│           ├── AndroidManifest.xml
│           ├── assets/
│           │   ├── boom.mp3
│           │   ├── clock.mp3
│           │   ├── index.html
│           │   ├── quiz-mode.js
│           │   ├── quiz-styles.css
│           │   ├── script.js
│           │   ├── styles.css
│           │   ├── wrong.mp3
│           │   └── yey.mp3
│           ├── java/
│           │   └── com/
│           │       └── monstermath/
│           │           └── quest/
│           │               └── MainActivity.java
│           └── res/
│               ├── drawable/
│               │   └── ic_launcher.xml
│               ├── layout/
│               │   └── activity_main.xml
│               └── values/
│                   └── strings.xml
├── build-apk.bat
├── build-apk.sh
├── build.gradle
├── gradle/
│   └── wrapper/
│       ├── gradle-wrapper.jar
│       └── gradle-wrapper.properties
├── gradle.properties
├── gradlew
├── gradlew.bat
├── local.properties
├── README.md
├── settings.gradle
└── android-conversion-summary.md
```

## Key Components

### 1. Android Application Structure
- **MainActivity.java**: The main entry point with WebView configuration
- **AndroidManifest.xml**: Application configuration and permissions
- **activity_main.xml**: Layout definition for the main activity
- **strings.xml**: String resources
- **ic_launcher.xml**: Simple drawable for the app icon

### 2. Web Assets
All original game files are preserved in the assets folder:
- **index.html**: Main HTML file with game structure
- **styles.css**: Main styling
- **quiz-styles.css**: Quiz mode specific styling
- **script.js**: Learning mode JavaScript logic
- **quiz-mode.js**: Quiz mode JavaScript logic
- **Audio files**: Sound effects (MP3 format)

### 3. Build Configuration
- **build.gradle** (project and app level): Gradle build configuration
- **settings.gradle**: Project module settings
- **gradle.properties**: Gradle properties
- **Gradle Wrapper**: Ensures consistent build environment

### 4. Build Scripts
- **build-apk.bat**: Windows script to build the APK
- **build-apk.sh**: Unix script to build the APK

### 5. Documentation
- **README.md**: Android-specific documentation
- **android-conversion-summary.md**: Summary of the conversion process

## Build Output Location
When built successfully, the APK will be located at:
`app/build/outputs/apk/debug/app-debug.apk`