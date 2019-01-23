export JUNIT_REPORT_PATH=./test-reports/unittest/report.xml
nyc \
  --all \
  --reporter text --reporter html \
  --include "ts/src/**.js" \
  --report-dir "./test-reports/coverage" \
  mocha \
    --require source-map-support/register \
    --recursive \
    --reporter mocha-jenkins-reporter \
ts/test/TestConfiguration.js ts/test/*Spec.js ts/test/**/*Spec.js