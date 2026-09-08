# Compteur — minimal Expo app

One screen, one title, one button that increments a counter.

- `App.js` — the whole app
- `app.json` — Expo config (Android package `com.testapp.counter`)
- `eas.json` — EAS Build profiles; `preview` produces a standalone `.apk`

## Run it in development

```bash
npm install
npx expo start
```

## Build a standalone APK

Two independent paths produce the same thing: an APK you sideload directly,
with no Google Play developer account.

### 1. GitHub Actions (no Expo account needed)

`.github/workflows/android-apk.yml` runs on every push to the feature branch,
and can be started manually from the Actions tab. It prebuilds the native
project and runs `./gradlew assembleRelease`, then publishes the APK twice:

- as a workflow artifact (`compteur-apk`)
- as a GitHub release asset (`apk-build-<run number>`) for a direct link

The release build is signed with the template's debug keystore, which is what
makes the APK installable straight away. Before shipping to real users,
generate your own keystore and wire it into `android/app/build.gradle` — the
debug key is public and identical for every developer, so it is fine for
testing and not for distribution.

### 2. EAS Build (needs a free Expo account)

```bash
npx eas-cli login
npx eas-cli build --platform android --profile preview
```

EAS returns a download link when the build finishes. The `preview` profile is
already set to `buildType: "apk"` with internal distribution.
