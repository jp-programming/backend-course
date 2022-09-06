# Test command

This command bash runs products API test and creates a report of output.
```
$ npx mocha -R spec products.test.js | tee ./reports/products-test_report
```