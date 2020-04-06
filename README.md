Sample app / project to demonstrate Detox in Perfecto cloud. Project is based on `demo-react-native` example from Wix/detox repo:
https://github.com/wix/detox/tree/master/examples/demo-react-native

Note that only Android works on real devices at the moment (android 5.0 and up), iOS can only be run with simulators.

Detox
-------------


Install (with Homebrew) (for local use / test developement)
-------------

source: https://github.com/wix/detox/blob/master/docs/Introduction.GettingStarted.md

	- For simulator (iOS)
	Install appleSimUtils:

	1. brew tap wix/brew
	2. brew install applesimutils

	Install Detox command line tools (detox-cli)
	1. npm install -g detox-cli



Build project and run test locally in short
-------------------- 


	1. clone repo, go to PerfectoDetoxSample -folder
	
	2. Install dependencies
 		- `npm install`
	
	3. Start detox server (for Android real device)
		- `"${PWD}/node_modules/.bin/detox" run-server &`
	
	4. Connect Android device to detox server port
		- `adb reverse tcp:8099 tcp:8099` 
	
	5. Build app
		- change device id in package.json `android.device.release.local` configuration
		- (Android) `"${PWD}/node_modules/.bin/detox" build --configuration android.device.release`
	
	6. Run test
		- (Android) `"${PWD}/node_modules/.bin/detox" test --configuration android.device.release`



How to make `PerfectoDetoxSample` project run on Perfecto cloud (Android)
-----------------------------------------------------


**add to package.json:**

<pre>
"devDependencies": {
    "detox": "^7.2.0",
    "mocha": "^4.0.1",
  },
</pre>


build configuration for Android real device:

device type:

<pre>
"type": "android.<b>attached</b>" = real device
"type": "android.<b>emulator</b>" = emulator
</pre>


address to connect the device (with sessionId):

```
"session": {
          "server": "ws://localhost:8099",
          "sessionId": "test"
        }
```

<pre>
"detox": {
    "test-runner": "mocha",
    "specs": "e2e",
    "runner-config": "e2e/mocha.opts",
    "configurations": {
      "android.emu.debug": {
        "binaryPath": "android/app/build/outputs/apk/debug/app-debug.apk",
        "build": "pushd android && ./gradlew assembleDebug assembleAndroidTest -DtestBuildType=debug && popd",
        "type": "android.emulator",
        "name": "Nexus_5X_API_24_-_GPlay"
      },
      "android.emu.release": {
        "binaryPath": "android/app/build/outputs/apk/release/app-release.apk",
        "build": "pushd android && ./gradlew assembleRelease assembleAndroidTest -DtestBuildType=release && popd",
        "type": "android.emulator",
        "name": "Nexus_5X_API_24_-_GPlay"
      }<b>,
      "android.device.release": {
        "binaryPath": "android/app/build/outputs/apk/release/app-release.apk",
        "build": "pushd android && ./gradlew assembleRelease assembleAndroidTest -DtestBuildType=release && popd",
        "session": {
          "server": "ws://localhost:8099",
          "sessionId": "test"
        },
        "type": "android.attached",
        "name": ""
      }"</b>
</pre>


**e2e/mocha.opts:**

<pre>
--recursive
--timeout 60000
--bail
</pre>

`--bail` makes all tests to fail (not run) when a test fails, to continue running tests after a failure, remove it from mocha.opts.


**run-tests-android.sh:**

Fetch device id and store it in a variable for future use.
```
adb devices

UDID="$(adb devices | grep device | tr "\n" " " | awk '{print $5}')"
export UDID
echo "UDID: $UDID"
```
screenshots will be stored in project root/screenshots folder

```
screenshots folder creation:
export SCREENSHOTSFOLDER=$PWD/screenshots
rm -rf "$SCREENSHOTSFOLDER"
mkdir -p "$SCREENSHOTSFOLDER"
```

<pre>
install dependencies:
<b>npm install</b>

launch detox server:
<b>"${PWD}/node_modules/.bin/detox" run-server &</b>

connect device to detox server port:
<b>adb -s $UDID reverse tcp:8099 tcp:8099</b>

run detox test:
<b>"${PWD}/node_modules/.bin/detox" test --configuration android.device.release -n $UDID </b>
</pre>


when the project is built, apks are in this location:
`android/app/build/outputs/apk/`

if modifications to tests are made, project needs to be rebuilt with this command (locally):
`"${PWD}/node_modules/.bin/detox" build --configuration android.device.release`
(use `release` build, debug build needs "react-native packager" running at the machine and it is not configured in this sample project)


