## Setup & Run Locally

To get this project up and running on your local machine, follow these steps:

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the server locally:**
   ```bash
   npx cds watch
   ```
   *This command spins up an in-memory SQLite database, loads the mock data from `db/data`, and enables live reload for continuous development.*

3. **Run tests:**
   ```bash
   npm run test
   ```

## Design Decisions

Throughout the development of this project, several architectural decisions were made to improve maintainability, testing, and alignment with SAP CAP's best practices:

- **Business Logic Extraction (Handlers Folder):** 
  Instead of tightly coupling business logic and routing directly within the `srv/spm-service.ts` file, all custom logic (such as fetching external ratings and handling custom actions) has been extracted into a dedicated `srv/handlers/` folder.
  
- **DummyJSON vs FakeStore API:**
  FakeStore doesn't work. It seems to reject calls from unknown servers and bruno. I switched to dummyjson instead, hope it's ok!

- **UUIDs for Primary Keys:**
  Instead of using auto-incrementing integer IDs, I utilized UUIDs (`cuid` from `@sap/cds/common`) for the primary keys across all entities.

## File Tree
```text
.
├── brunoAPI/              # API testing collections
├── db/                    # Database models and mock data
│   ├── data/
│   │   ├── spm-Product.csv
│   │   ├── spm-ProductReview.csv
│   │   └── spm-Supplier.csv
│   └── schema.cds
├── fake-store/            # External API JSON stubs
├── srv/                   # Service definitions and logic
│   ├── handlers/          # Decoupled business logic handlers
│   │   ├── products.ts
│   │   └── reviews.ts
│   ├── spm-service.cds    # Service projections and actions
│   └── spm-service.ts     # Service routing and event registrations
├── tests/                 # Vitest unit test files
│   ├── products.test.ts
│   └── reviews.test.ts
├── types/                 # TypeScript interfaces
│   └── fakestore.ts
├── package.json
└── readme.md
```

---

## API Documentation

### Products

# Create a Product
POST /catalog/Products
```json
{
  "name": "T-Shirt",
  "price": 29.99,
  "category": "clothing",
  "supplier_ID": "123e4567-e89b-12d3-a456-426614174000"
}
```

# List all Products
GET /catalog/Products

# Get Product By ID
GET /catalog/Products/{ID}

# Update a Product
PUT /catalog/Products/{ID}
```json
{
  "price": 34.99
}
```

# Delete a Product
DELETE /catalog/Products/{ID}

### Suppliers

# Create a Supplier
POST /catalog/Suppliers
```json
{
  "name": "Acme Corp",
  "email": "contact@acme.com",
  "rating": 5
}
```

# List all Suppliers
GET /catalog/Suppliers

# Get Supplier By ID
GET /catalog/Suppliers/{ID}

# Update a Supplier
PUT /catalog/Suppliers/{ID}
```json
{
  "rating": 4
}
```

# Delete a Supplier
DELETE /catalog/Suppliers/{ID}

### Product Reviews

# Create a Product Review
POST /catalog/ProductReviews
```json
{
  "product_ID": "123e4567-e89b-12d3-a456-426614174000",
  "rating": 4,
  "comment": "Great quality!",
  "reviewer": "John Doe"
}
```

# Submit a Custom Review (Unbound Action)
POST /catalog/submitReview
```json
{
  "productID": "123e4567-e89b-12d3-a456-426614174000",
  "rating": 4,
  "comment": "Excellent item!"
}
```

# List all Product Reviews
GET /catalog/ProductReviews

# Get Product Review By ID
GET /catalog/ProductReviews/{ID}

# Update a Product Review
PUT /catalog/ProductReviews/{ID}
```json
{
  "rating": 5,
  "comment": "Changed my mind, it is excellent!"
}
```

# Delete a Product Review
DELETE /catalog/ProductReviews/{ID}
