# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.

## Advanced Usage

If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import {
  getMyProgress,
  getMySessions,
  upsertProgress,
  upsertSession,
} from "@dataconnect/generated";

// Operation GetMyProgress:  For variables, look at type GetMyProgressVars in ../index.d.ts
const { data } = await GetMyProgress(dataConnect, getMyProgressVars);

// Operation GetMySessions:  For variables, look at type GetMySessionsVars in ../index.d.ts
const { data } = await GetMySessions(dataConnect, getMySessionsVars);

// Operation UpsertProgress:  For variables, look at type UpsertProgressVars in ../index.d.ts
const { data } = await UpsertProgress(dataConnect, upsertProgressVars);

// Operation UpsertSession:  For variables, look at type UpsertSessionVars in ../index.d.ts
const { data } = await UpsertSession(dataConnect, upsertSessionVars);
```
