import org.jetbrains.compose.desktop.application.dsl.TargetFormat

plugins {
    kotlin("jvm") version "2.1.21"
    id("org.jetbrains.kotlin.plugin.compose") version "2.1.21"
    id("org.jetbrains.compose") version "1.8.2"
    kotlin("plugin.serialization") version "2.1.21"
}

java {
    sourceCompatibility = JavaVersion.VERSION_23
    targetCompatibility = JavaVersion.VERSION_23
}

group = "com.daripper91"
version = "1.0.0"

repositories {
    mavenCentral()
    google()
}

dependencies {
    implementation(compose.desktop.currentOs)
    implementation(compose.material)
    implementation(compose.materialIconsExtended)
    implementation("org.jetbrains.kotlinx:kotlinx-serialization-json:1.7.3")
    implementation("com.akuleshov7:ktoml-core:0.7.1")
    
    // Coroutines
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.9.0")

    testImplementation(compose.desktop.uiTestJUnit4)
}

kotlin {
    compilerOptions {
        jvmTarget.set(org.jetbrains.kotlin.gradle.dsl.JvmTarget.JVM_23)
    }
}

compose.desktop {
    application {
        mainClass = "MainKt"
        jvmArgs += listOf("--enable-native-access=ALL-UNNAMED", "-Djava.awt.headless=false")

        nativeDistributions {
            targetFormats(TargetFormat.Dmg, TargetFormat.Msi, TargetFormat.Deb)
            packageName = "StarCommandDesktop"
            packageVersion = "1.0.0"
            description = "Starship Prompt Theme Editor"
            copyright = "© 2026 DaRipper"
            
            linux {
                shortcut = true
                menuGroup = "Development"
            }
        }
    }
}
