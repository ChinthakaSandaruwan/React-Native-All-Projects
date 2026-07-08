# Troubleshooting: Android Emulator Offline / ADB Connection Issues

If you run `npx expo start` (or standard React Native commands) and see errors like:
* `[ADB] Couldn't reverse port: adb.exe: device offline`
* `Error: adb.exe: device offline`
* `emulator-5554 offline` (when running `adb devices`)

This happens when the emulator process (`qemu`) gets into a hung state or its saved snapshot is corrupted, preventing ADB from establishing a proper connection.

Follow these steps to resolve the issue:

---

## Step 1: Terminate Hung Emulator Processes

Open PowerShell or command prompt and kill any active or zombie emulator instances:

```powershell
# In PowerShell:
Stop-Process -Name emulator -Force -ErrorAction SilentlyContinue
Stop-Process -Name qemu-system-i386 -Force -ErrorAction SilentlyContinue
```

*(Or close any emulator windows manually.)*

---

## Step 2: Restart the ADB Server

Restart the ADB server to clear out any stale connections:

```powershell
# Replace $env:LOCALAPPDATA\Android\Sdk with your actual SDK path if different
& "$env:LOCALAPPDATA\Android\Sdk\platform-tools\adb.exe" kill-server
& "$env:LOCALAPPDATA\Android\Sdk\platform-tools\adb.exe" start-server
```

Verify that no devices are currently listed by running:
```powershell
& "$env:LOCALAPPDATA\Android\Sdk\platform-tools\adb.exe" devices
```

---

## Step 3: Cold Boot the Emulator

Launch the emulator from scratch by disabling snapshot loading (this bypasses any corrupted save states):

```powershell
# Start-Process runs the emulator in a separate background window
Start-Process -FilePath "$env:LOCALAPPDATA\Android\Sdk\emulator\emulator.exe" -ArgumentList @("-avd", "Small_Phone", "-no-snapshot-load")
```

Wait around 10-15 seconds for the boot sequence to start.

---

## Step 4: Verify Online Status

Check if the emulator transitions to the online (`device`) state:

```powershell
& "$env:LOCALAPPDATA\Android\Sdk\platform-tools\adb.exe" devices
```

It should output:
```text
List of devices attached
emulator-5554	device
```

---

## Step 5: Reverse Expo/Metro Port

If you are running Metro on a non-default port (e.g., `8082` because port `8081` is occupied), reverse the port manually so the emulator can reach the bundler:

```powershell
& "$env:LOCALAPPDATA\Android\Sdk\platform-tools\adb.exe" reverse tcp:8082 tcp:8082
```

Now you are ready to run `npx expo start` and press `a` to open the app on Android.
