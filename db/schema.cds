namespace spm;

entity Supplier {
    key id     : Integer;
        name   : String(100);
        email  : String(100);
        rating : Integer;
}

entity Product {
    key id             : Integer;
        name           : String(100);
        price          : Decimal(10, 2);
        category       : String(50);
        externalRating : Decimal(3, 2);
        averageRating  : Decimal(3, 2);
        supplierId     : Integer;
}

entity ProductReview {
    key id        : Integer;
        productId : Integer;
        rating    : Integer;
        comment   : String(255);
        reviewer  : String(100);
}
