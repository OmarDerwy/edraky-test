using {cuid} from '@sap/cds/common';
namespace spm;

entity Supplier : cuid {
        name   : String(100);
        email  : String(100);
        rating : Integer @assert.range: [
            1,
            5
        ];
}

entity Product : cuid {
    name            : String(100);
    price           : Decimal(10, 2) @assert.range: [
        (0),
        _
    ];
    category        : String(50);
    external_rating : Decimal(3, 2);
    average_rating  : Decimal(3, 2);
    supplier        : Association to Supplier;
}

entity ProductReview : cuid {
    product  : Association to Product;
    rating   : Integer @assert.range: [
        1,
        5
    ];
    comment  : String(255);
    reviewer : String(100);
}
