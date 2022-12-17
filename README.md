The function suppresses errors caused by the `Handler`. If no errors happened
during the execution, `suppress` will return `SuccessResult`. Otherwise
`suppress` will return `FailureResult`.

```ts
import {
  ResultType,
  suppress,
} from "https://deno.land/x/suppress@1.0.0/mod.ts";

const result = await suppress(async () => await fetch("https://deno.land/"));

switch (result.type) {
  case ResultType.SUCCESS:
    console.log(result.data);
    break;
  case ResultType.FAILURE:
    console.error(result.message);
    break;
}
```
