#!/bin/bash
##### Perfecto Cloud execution starts
## Run the test:
echo " Running test...."

# put local tools to path

export PATH=$PATH:$PWD
export SCREENSHOTSFOLDER=$PWD/screenshots

#################################

cd "$(dirname "$0")" || exit

echo "Before install $(date)"

# Run adb once so API level can be read without the "daemon not running"-message
adb devices

UDID="$(adb devices | grep device | tr "\n" " " | awk '{print $5}')"
export UDID
echo "UDID: $UDID"

#adb -s $UDID shell pm list packages -f | grep detox

rm -rf "$SCREENSHOTSFOLDER"
rm ./*.xml
mkdir -p "$SCREENSHOTSFOLDER"

echo $SCREENSHOTSFOLDER

node --version
npm -version
watchman --version

#echo "Npm install"
#sudo npm install --unsafe-perm=true --allow-root eslint

#build project
"${PWD}/node_modules/.bin/detox" build --configuration android.device.release

echo "Launching Detox server"
#"${PWD}/node_modules/.bin/detox" run-server &
"${PWD}/node_modules/.bin/detox" run-server > detox-server.log 2>&1 &

# allow device to contact host by localhost
adb -s $UDID reverse tcp:8099 tcp:8099

echo "Running tests $(date)"

"${PWD}/node_modules/.bin/detox" test --configuration android.device.release -n $UDID

scriptExitStatus=$?

adb -s $UDID uninstall com.sampleproject
adb -s $UDID uninstall com.sampleproject.test
#
#adb -s $UDID shell pm list packages -f | grep sampleproject
#adb -s $UDID shell pm list instrumentation | grep sampleproject
adb -s $UDID reverse --remove-all
echo "Test has been run $(date), exit status: '${scriptExitStatus}'"

mv ./*.xml TEST-all.xml

exit $scriptExitStatus
