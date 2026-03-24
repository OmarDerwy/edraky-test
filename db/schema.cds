namespace spm;

entity Supplier {
    key id     : Integer;
        name   : String(100);
        email  : String(100);
        rating : Integer @assert.range: [
            1,
            5
        ];
}

entity Product {
    key id             : Integer;
        name           : String(100);
        price          : Decimal(10, 2);
        category       : String(50);
        externalRating : Decimal(3, 2);
        averageRating  : Decimal(3, 2);
        supplierId     : Association to Supplier;
}

entity ProductReview {
    key id        : Integer;
        productId : Association to Product;
        rating    : Integer @assert.range: [
            1,
            5
        ];
        comment   : String(255);
        reviewer  : String(100);
}
