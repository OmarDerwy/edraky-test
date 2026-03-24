import cds from '@sap/cds';
import { FakeStoreResponse } from '../../types/fakestore';

const LOG = cds.log('products-handler');

/**
 * Fetches the external rating for a given product category from FakeStore API.
 * @param category The product category to search for.
 * @returns The external rating or undefined if not found or on error.
 */
export async function fetchExternalRating(category: string): Promise<number | undefined> {
    LOG.info(`Fetching external rating for category: ${category}`);
    
    try {
        const response = await fetch('https://dummyjson.com/products?limit=100');
        
        if (!response.ok) {
            LOG.warn(`FakeStore API request failed with status: ${response.status}`);
            return undefined;
        }

        const data: FakeStoreResponse = await response.json();

        const matchedProduct = data.products.find(
            (p) => p.category.toLowerCase() === category.toLowerCase()
        );

        if (matchedProduct && typeof matchedProduct.rating === 'number') {
            LOG.info(`Found rating ${matchedProduct.rating} for category: ${category}`);
            return matchedProduct.rating;
        } else {
            LOG.info(`No matching product or rating found for category: ${category}`);
            return undefined;
        }
    } catch (err) {
        LOG.error(`Error while fetching external rating from FakeStore API:`, err);
        return undefined;
    }
}
