import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { submitReviewHandler } from '../srv/handlers/reviews';
import cds from '@sap/cds';

vi.mock('@sap/cds', () => {
    const mockTx = {
        run: vi.fn(),
        model: {
            entities: vi.fn().mockReturnValue({
                ProductReviews: 'CatalogService.ProductReviews',
                Products: 'CatalogService.Products'
            })
        }
    };
    return {
        default: {
            log: vi.fn().mockReturnValue({
                info: vi.fn(),
                warn: vi.fn(),
                error: vi.fn()
            }),
            tx: vi.fn().mockReturnValue(mockTx),
            ql: {
                INSERT: { into: vi.fn().mockReturnThis(), entries: vi.fn().mockReturnThis() },
                SELECT: { from: vi.fn().mockReturnThis(), where: vi.fn().mockReturnThis() },
                UPDATE: vi.fn().mockReturnValue({ set: vi.fn().mockReturnThis(), where: vi.fn().mockReturnThis() })
            }
        }
    };
});

describe('submitReviewHandler', () => {
    let mockReq: any;
    let mockTx: any;

    beforeEach(() => {
        mockTx = cds.tx({} as any);
        (mockTx.run as any).mockClear();
        
        mockReq = {
            data: {
                productID: 'prod-123',
                rating: 4,
                comment: 'Great product'
            },
            user: { id: 'test-user' },
            reject: vi.fn((code, msg) => {
                const err = new Error(msg);
                (err as any).code = code;
                throw err;
            })
        };
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should reject if productID is missing', async () => {
        mockReq.data.productID = undefined;
        await expect(submitReviewHandler(mockReq)).rejects.toThrow('productID and rating are required.');
    });

    it('should successfully add review and update average rating', async () => {
        // Mocking the sequence of returns for `tx.run`
        (mockTx.run as any)
            .mockResolvedValueOnce(undefined) // INSERT
            .mockResolvedValueOnce([{ rating: 4 }, { rating: 5 }]) // SELECT
            .mockResolvedValueOnce(1); // UPDATE

        const result = await submitReviewHandler(mockReq);

        expect(result).toEqual({ message: 'Review submitted successfully', averageRating: 4.5 });
        expect(mockTx.run).toHaveBeenCalledTimes(3);
    });
});
