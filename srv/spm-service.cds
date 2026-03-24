using {spm} from '../db/schema';

service CatalogService {
    entity Suppliers      as projection on spm.Supplier;
    entity Products       as projection on spm.Product;
    entity ProductReviews as projection on spm.ProductReview;
}
