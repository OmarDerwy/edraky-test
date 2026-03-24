using {spm} from '../db/schema';

service CatalogService @(requires: 'authenticated-user') {
    entity Suppliers      as projection on spm.Supplier;

    entity Products       as
        projection on spm.Product {
            *,
            ID              @Core.Computed,
            external_rating @readonly,
            average_rating  @readonly,
        };
    entity ProductReviews as projection on spm.ProductReview;

    action submitReview(productID: UUID, rating: Integer, comment: String);
}
