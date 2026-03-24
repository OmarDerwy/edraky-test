

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
