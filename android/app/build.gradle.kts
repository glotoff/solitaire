plugins {
  alias(libs.plugins.android.application)
}

android {
    namespace = "io.github.glotoff.solitaire"
    compileSdk = 36

    defaultConfig {
        applicationId = "io.github.glotoff.solitaire"
        minSdk = 24
        targetSdk = 35
        versionCode = 1
        versionName = "1.0.0"
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(getDefaultProguardFile("proguard-android-optimize.txt"), "proguard-rules.pro")
        }
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_21
        targetCompatibility = JavaVersion.VERSION_21
    }

    packaging {
        resources {
            excludes += "/META-INF/{AL2.0,LGPL2.1}"
        }
    }
}

kotlin {
    jvmToolchain(21)
}

val syncWebAssets by tasks.registering(Copy::class) {
    from(rootProject.projectDir.resolve("..")) {
        include("index.html", "manifest.webmanifest", "icon.svg", "icon-192.png", "icon-512.png", "icon-maskable.png", "apple-touch-icon.png", "og-image.jpg", "og-image.png")
    }
    into(layout.projectDirectory.dir("src/main/assets"))
}

tasks.matching { it.name.startsWith("generate") || it.name.startsWith("merge") || it.name == "preBuild" }.configureEach {
    dependsOn(syncWebAssets)
}

dependencies {
    implementation(libs.androidx.core.ktx)
    implementation(libs.androidx.activity.ktx)
    implementation(libs.androidx.webkit)
}
