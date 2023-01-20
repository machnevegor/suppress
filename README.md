The `suppress` function executes the _nested code_ and avoids some of the thrown
errors. You can specify one or more _error-exceptions_ that will be suppressed.
If no errors happened during the execution, `suppress` will return
`SuccessResult`. Otherwise `suppress` will return `FailureResult`.
