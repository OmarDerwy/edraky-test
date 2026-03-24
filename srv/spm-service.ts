import cds from '@sap/cds';
import { fetchExternalRating } from './handlers/products';
import { submitReviewHandler } from './handlers/reviews';

const LOG = cds.log('spm-service');

export default class CatalogService extends cds.ApplicationService {
    async init() {
        LOG.info('Initializing CatalogService');

        this.before('CREATE', 'Products', async (req) => {
            const category = req.data.category;
            
            if (!category) {
                LOG.info('No category provided for product creation, skipping external rating fetch');
                return;
            }

            LOG.info(`Processing product creation for category: ${category}`);
            const externalRating = await fetchExternalRating(category);

            if (externalRating !== undefined) {
                req.data.external_rating = externalRating;
                LOG.info(`Assigned external rating ${externalRating} to the new product`);
            }
        });

        this.on('submitReview', submitReviewHandler);

        return super.init();
    }
}
