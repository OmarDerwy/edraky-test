## 0.1.0 (2026-03-24)

### Feat

- **security**: add mocked security for now
- **product-reviews**: add custom action for submitting product reviews
- **product**: add a before hook to get rating from public api when categories match
- **constraints**: add price constraints
- **schema**: add cuid aspect to make all ids uuids
- **schema**: add constraints and foreign keys
- **service**: init service
- **schema**: init schema
- **init**: add commitizen to track versions
- **init**: add dependencies: sqlite and typescript
- **init**: add gitignore
- **init**: init cds project

### Fix

- **public-api**: adjust to using dummyJSON because fakestore doesn't work
- **service**: make external_rating read_only
- **service**: adjust name of service to fit requirements

### Refactor

- **products**: refactor products hook logic into its own file and add logs
