import cds from '@sap/cds';

const LOG = cds.log('reviews-handler');

export async function submitReviewHandler(req: any) {
    const { productID, rating, comment } = req.data;

    if (!productID || rating === undefined || rating === null) {
        return req.reject(400, 'productID and rating are required.');
    }

    if (rating < 1 || rating > 5) {
        return req.reject(400, 'Rating must be between 1 and 5.');
    }

    const reviewer = req.user?.id || 'anonymous';
    LOG.info(`Creating review for product: ${productID} by ${reviewer} with rating: ${rating}`);

    try {
        const tx = cds.tx(req) as any;
        const { ProductReviews, Products } = tx.model.entities('CatalogService');

        // 1. Create a new ProductReview record
        await tx.run(
            (cds.ql as any).INSERT.into(ProductReviews).entries({
                product_ID: productID,
                rating,
                comment,
                reviewer
            })
        );

        // 2. Recalculate the average rating
        const reviews = await tx.run(
            (cds.ql as any).SELECT.from(ProductReviews).where({ product_ID: productID })
        );

        if (!reviews || reviews.length === 0) {
            LOG.warn(`No reviews found for product ${productID} during recalculation.`);
            return;
        }

        const totalRating = reviews.reduce((sum: number, r: any) => sum + r.rating, 0);
        const averageRating = parseFloat((totalRating / reviews.length).toFixed(2));

        LOG.info(`New average rating for product ${productID} is ${averageRating}`);

        // 3. Persist the new averageRating value on the Product entity
        const updated = await tx.run(
            (cds.ql as any).UPDATE(Products)
                .set({ average_rating: averageRating })
                .where({ ID: productID })
        );

        if (updated === 0) {
            LOG.warn(`Product ${productID} was not found to update its average rating.`);
            return req.reject(404, `Product with ID ${productID} not found.`);
        }

        return { message: 'Review submitted successfully', averageRating };
    } catch (err) {
        LOG.error('Error submitting review:', err);
        return req.reject(500, 'Failed to submit review.');
    }
}
