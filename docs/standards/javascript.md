# JavaScript, TypeScript, React, Next.js, Node

Read `CODING-STANDARDS.md` first. Same 16 headings, stack-specific rules.

Applies to: TypeScript, React, Next.js App Router, Node services, Supabase.

---

## 1. Naming conventions

- **MUST** use `camelCase` for variables and functions, `PascalCase` for components, types, and classes, `SCREAMING_SNAKE_CASE` for module constants.
- **MUST** name component files `PascalCase.tsx` and everything else `kebab-case.ts`.
- **MUST** name hooks `useThing`. A function starting `use` must follow hook rules.
- **MUST** name event handlers `handleSubmit` on the definition and `onSubmit` on the prop.
- **MUST** name types after the domain: `Invoice`, `InvoiceDraft`. No `IInvoice`, no `TInvoice`.
- **MUST** name Zod schemas `ThingSchema` and derive the type from it, not the other way round.
- **MUST** name a boolean prop as a question: `isLoading`, `hasError`, `canEdit`.
- **NEVER** use default-exported anonymous functions in shared modules. Name them so stack traces are readable.

```ts
// good
export const OrderSchema = z.object({ quantity: z.number().int().positive() });
export type Order = z.infer<typeof OrderSchema>;
```

## 2. Variable names

- **MUST** include units: `timeoutMs`, `priceCents`, `maxUploadBytes`.
- **MUST** use plural for arrays: `orders`, not `orderArr`.
- **MUST** name the awaited thing, not the promise: `const user = await getUser()`.
- **MUST** destructure with meaning: `const { data: invoices, error } = await ...`.
- **NEVER** leave `res`, `d`, `tmp`, `obj`, `x` in merged code. `res` for an Express response is fine.
- **NEVER** name a variable `data` when you know what it is.

## 3. Directory structure

- **MUST** group by feature once past roughly 20 files: `src/orders/` holds its component, hook, schema, and test.
- **MUST** keep shared code in `src/shared/` or `src/lib/`, and keep it genuinely shared. One consumer means it belongs in the feature.
- **MUST** put server-only code in a clearly named place (`src/server/`, `app/api/`) so nobody imports it from a client component.
- **MUST** co-locate tests as `thing.test.ts` next to `thing.ts`.
- **MUST** keep `README.md`, `CLAUDE.md`, `.env.example`, and the lockfile at root.
- **NEVER** create `utils/index.ts` as a dumping ground. Name the module after what it does: `format-currency.ts`.
- **NEVER** import across features by deep relative path. Set a path alias (`@/orders`).

```
src/
  app/
  orders/
    OrderList.tsx
    order-schema.ts
    use-orders.ts
    order-schema.test.ts
  server/
  shared/
```

## 4. Globals

- **NEVER** attach anything to `window` or `globalThis`. Use a module export or React context.
- **NEVER** hold request or user state in a module-level variable in a Node or Next server. The process is shared across requests, so one user's data leaks to another.
- **MUST** read config once into a frozen exported object, validated at start-up. Fail loudly at boot if a required var is missing.
- **MUST** use React context or a store for shared UI state. Not a module-level mutable object.
- **MUST** use the documented singleton pattern for a database or Supabase client in dev, so hot reload does not open a new pool every save.
- **SHOULD** keep module-level caches out entirely unless the value is immutable and safe to share.

```ts
// good — validated once, frozen
const env = Object.freeze(EnvSchema.parse(process.env));
export default env;
```

## 5. Comments

- **MUST** use JSDoc on exported functions whose behaviour is not obvious from the types.
- **MUST** explain non-obvious React choices: why an effect depends on what it does, why a memo exists, why a ref is used.
- **MUST** comment every `@ts-expect-error` with the reason and what would let it be removed.
- **MUST** comment any browser or vendor bug you worked around, with the date.
- **NEVER** leave a commented-out component or a `console.log`.
- **NEVER** restate the type in a comment. TypeScript already says it.

## 6. Documentation

- **MUST** list in the README: Node version, package manager, install, dev, lint, test, build, deploy.
- **MUST** document every env var in `.env.example`, and mark which are browser-exposed.
- **MUST** document every API route: method, path, auth requirement, request shape, response shape.
- **MUST** document Supabase RLS policies per table, in the repo, in plain words.
- **MUST** document what the app expects from any external system, and what happens when it is down.
- **SHOULD** let the Zod schemas be the source of truth for request shapes, and point the docs at them.

## 7. Exception handling

- **MUST** use `strict: true` in `tsconfig.json`.
- **NEVER** use `any` to silence an error. Use `unknown` and narrow it.
- **NEVER** use `@ts-ignore`. Use `@ts-expect-error` with a comment.
- **MUST** type a caught error as `unknown` and narrow before use. `error.message` on an unknown throw crashes the handler.
- **MUST** handle every rejected promise. No floating promises: `await`, `.catch()`, or `void` with a comment.
- **MUST** wrap every `fetch` and `JSON.parse` in a try/catch. `fetch` does not reject on a 4xx or 5xx, so check `res.ok` yourself.
- **MUST** put a React error boundary around any route or widget that can fail, and show a real fallback.
- **NEVER** return a 200 with an error object inside. Use the status code.
- **MUST** set a timeout with `AbortSignal.timeout()` on every outbound call.
- **NEVER** catch and continue silently. Log with context, then rethrow or return a handled result.

```ts
try {
  const res = await fetch(url, { signal: AbortSignal.timeout(10_000) });
  if (!res.ok) throw new VendorError(`Vendor returned ${res.status}`);
  return OrderSchema.parse(await res.json());
} catch (err: unknown) {
  const message = err instanceof Error ? err.message : "unknown";
  log.error("vendor.fetch_failed", { requestId, message });
  throw err;
}
```

## 8. Logging

- **MUST** use a structured logger (`pino` or the platform logger) on the server. Not `console.log`.
- **MUST** attach a request ID to every log line in a request, and return it in the error response so support can trace it.
- **NEVER** leave `console.log` in merged code. ESLint should fail on it.
- **NEVER** log a token, cookie header, `Authorization` header, or a full request body.
- **NEVER** log personal data in the browser. Client-side logs end up in third-party session tools.
- **MUST** redact by allow-list, not by trying to strip known keys.
- **MUST** log auth failures, permission denials, and Supabase RLS rejections. An RLS denial means either an attack or a bug.
- **SHOULD** use Next.js instrumentation or middleware to generate and pass the request ID.

## 9. Security controls

### Client-side

- **NEVER** put a secret, API key, service key, or admin token in client code. Anything in the bundle is public.
- **MUST** be deliberate about `NEXT_PUBLIC_` and `VITE_` prefixes. Nothing sensitive behind them.
- **NEVER** use `dangerouslySetInnerHTML` with user data. Sanitise with DOMPurify if rich text is truly needed.
- **MUST** validate a URL before using it in `href` or `src`. Block `javascript:` and `data:` schemes.
- **MUST** add `rel="noopener noreferrer"` to every `target="_blank"`.
- **NEVER** use `eval()`, `new Function()`, or `setTimeout` with a string.
- **MUST** store auth tokens in `HttpOnly` cookies, not `localStorage`.

```jsx
// NEVER
<div dangerouslySetInnerHTML={{ __html: comment.body }} />

// good
<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(comment.body) }} />
```

### Server and Next.js

- **MUST** keep secrets in server components, route handlers, or server actions only.
- **MUST** re-check permission inside every server action. A server action is a public endpoint, not a private function.
- **MUST** validate server action and route handler input with a schema.
- **NEVER** pass a database client, or a raw record with hidden fields, from a server component into a client component. Select only the fields the UI needs.
- **MUST** set security headers in `next.config.js` or middleware: CSP, HSTS, `X-Content-Type-Options`, `Referrer-Policy`.
- **MUST** be explicit about caching on user-specific routes. A wrongly cached page leaks one user's data to another.
- **NEVER** use middleware alone as the auth control. Check again in the handler.

```ts
'use server';
export async function updateProfile(input: unknown) {
  const data = ProfileSchema.parse(input);
  const session = await auth();
  if (!session) throw new Error('Unauthorised');
  return db.profile.update({ where: { userId: session.user.id }, data });
}
```

### Node

- **NEVER** use `child_process.exec` with interpolated input. Use `execFile` with an argument array.
- **MUST** cap request body size and set an allow-list CORS origin.
- **MUST** use `helmet` or set the equivalent headers by hand.
- **MUST** verify webhook signatures before trusting a body, using a constant-time compare.
- **MUST** rate-limit public endpoints.

### Supabase

- **MUST** enable Row Level Security on every table. A table without RLS plus a public anon key is an open database.
- **MUST** write and test an RLS policy per table before shipping. Test as anonymous and as the wrong user.
- **NEVER** ship the service role key to the browser. It bypasses RLS entirely.
- **MUST** keep the service role key to server code and edge functions.
- **MUST** review generated policies by hand. A policy that returns data is not proof it is scoped.

```sql
alter table invoices enable row level security;
create policy "own invoices only" on invoices for select using (auth.uid() = user_id);
```

## 10. Privacy controls

- **MUST** keep personal data out of `localStorage`, `sessionStorage`, and the URL.
- **MUST** get client approval before adding analytics, session replay, heatmaps, or an AI widget. Session replay records form fields by default.
- **MUST** mask input fields in any session replay tool that stays.
- **MUST** load third-party scripts only after consent where the client's policy requires it.
- **MUST** select explicit columns from Supabase. `select('*')` sends fields the UI never needed to a browser.
- **NEVER** seed a local or staging database from a production dump without masking emails and phone numbers.
- **NEVER** send personal data to a logging or error tool without checking the client contract. Configure the error reporter to strip request bodies and user fields.
- **SHOULD** set a short retention on client-side error reporting.

## 11. Dependency management

- **MUST** commit the lockfile and use `npm ci` in CI and deploy.
- **MUST** run `npm audit` in CI and fail on high or critical.
- **NEVER** install a package whose name an agent produced from memory. Check npm for the real package, the download count, and the repo. Hallucinated names are a live supply chain attack.
- **NEVER** add a single-function micro-package. Write the four lines.
- **MUST** check the licence before adding anything to client work.
- **MUST** keep one package manager per repo. Do not mix `npm` and `pnpm` lockfiles.
- **SHOULD** check bundle impact before adding a client-side dependency. A date library can cost more than the feature.
- **SHOULD** run `npm outdated` monthly and update in a dedicated PR.

## 12. API design

- **MUST** use nouns and HTTP verbs: `GET /api/v1/orders/42`.
- **MUST** version any API a client or another team consumes.
- **MUST** validate every request with a Zod schema at the top of the handler, and return 422 on failure with field-level detail.
- **MUST** return correct status codes and one consistent error shape across the API.
- **MUST** paginate every list route and cap `per_page` server-side.
- **MUST** accept an idempotency key on payment and order creation, and honour it.
- **MUST** set CORS to an allow-list. **NEVER** `*` with credentials.
- **MUST** rate-limit and return 429 with `Retry-After`.
- **NEVER** put a token or personal data in a query string.
- **NEVER** return a whole database record because it was convenient. Map to a response type.
- **SHOULD** keep route handlers thin: validate, authorise, call a service, map the response.

```ts
const parsed = CreateOrderSchema.safeParse(await req.json());
if (!parsed.success) {
  return Response.json({ error: { code: 'invalid_body', fields: parsed.error.flatten() } }, { status: 422 });
}
```

## 13. Database practices

- **MUST** put every schema change in a committed migration. No changes made by hand in the Supabase dashboard.
- **MUST** version RLS policies in migrations too, so an environment cannot drift.
- **MUST** index every column used in a filter, join, sort, or an RLS policy. An unindexed RLS predicate runs on every row.
- **MUST** select named columns. **NEVER** `select('*')`.
- **MUST** use a transaction for multi-step writes, and a server-side function when the steps must be atomic.
- **MUST** batch instead of querying in a loop. Fetch the parents, then fetch children with one `in` query.
- **MUST** store money as integer cents, timestamps as `timestamptz` in UTC.
- **MUST** use the singleton client so hot reload does not exhaust the connection pool.
- **NEVER** run an unbounded query. Always a `limit`.
- **NEVER** delete or update without a filter, and never against production without a counted dry run.
- **MUST** back up and get human approval before a migration on a live client database.
- **SHOULD** use generated types from the schema so a column rename fails the build, not production.

## 14. Performance guidelines

- **MUST** measure before optimising. Use the React profiler and the Next build output, not a hunch.
- **MUST** fix the request count first. A component fetching per row is the usual cause.
- **MUST** fetch on the server where possible, so the browser makes fewer round trips.
- **MUST** use `next/image` with real dimensions, and `next/font` instead of a blocking font link.
- **MUST** keep the client bundle honest: dynamic-import heavy widgets, keep `'use client'` as low in the tree as possible.
- **MUST** paginate or virtualise any list that can pass a few hundred rows.
- **MUST** set explicit cache and revalidate behaviour on every fetch. Do not rely on the default.
- **MUST** debounce input-driven requests such as search-as-you-type.
- **MUST** hold Core Web Vitals green: LCP under 2.5s, CLS under 0.1, INP under 200ms.
- **MUST** build responsive CSS as one adapting stylesheet, breakpoints factored in while building desktop.
- **SHOULD** reach for `useMemo` and `useCallback` only after the profiler shows a problem.
- **SHOULD** question every third-party script. Load it async or defer.

## 15. Version control

- **MUST** branch from `main` with the standard prefixes, and never push to `main` directly.
- **MUST** gitignore `node_modules/`, `.next/`, `dist/`, `.env*` except `.env.example`, and coverage output.
- **NEVER** commit build output or a `.next` folder.
- **NEVER** commit a Supabase service role key, even in a seed script.
- **MUST** keep the lockfile change in the same commit as the `package.json` change.
- **MUST** stop and tell a human if a secret was pushed. Do not rewrite shared history alone.

## 16. Commit hygiene

- **MUST** use `type(scope): what changed`: `feat(orders): add idempotency key to create route`.
- **MUST** keep a dependency bump in its own commit.
- **MUST** keep a formatting-only change in its own commit so the real diff stays readable.
- **MUST** run lint, typecheck, and tests before pushing.
- **NEVER** commit with `wip`, `fix`, or `update` as the whole message.
- **MUST** get two approvals on any PR touching auth, payments, RLS policies, or personal data.
