import cds from '@sap/cds';
import { FakeStoreResponse } from '../types/fakestore';

export default class CatalogService extends cds.ApplicationService {
    async init() {
        this.before('CREATE', 'Products', async (req) => {
            if (!req.data.category) return;

            try {
                const response = await fetch('https://dummyjson.com/products?limit=100');
                if (!response.ok) {
                    console.warn(`[Products] FakeStore API returned ${response.status}`);
                    return;
                }

                const data: FakeStoreResponse = await response.json();

                const matchedProduct = data.products.find(
                    (p) => p.category.toLowerCase() === req.data.category.toLowerCase()
                );

                if (matchedProduct && typeof matchedProduct.rating === 'number') {
                    req.data.external_rating = matchedProduct.rating;
                }
            } catch (err) {
                console.error('[Products] Failed to fetch external rating from FakeStore API:', err);
            }
        });

        return super.init();
    }
}
