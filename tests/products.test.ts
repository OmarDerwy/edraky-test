import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { fetchExternalRating } from '../srv/handlers/products';

describe('fetchExternalRating', () => {
    let fetchMock: any;

    beforeEach(() => {
        // Mock global fetch
        fetchMock = vi.fn();
        global.fetch = fetchMock;
        
        // Suppress expected error logs from CDS to keep console clean
        vi.spyOn(console, 'error').mockImplementation(() => {});
        vi.spyOn(console, 'warn').mockImplementation(() => {});
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should return the rating if a matching product is found', async () => {
        const mockResponse = {
            products: [
                { category: 'electronics', rating: 4.5 },
                { category: 'clothing', rating: 3.8 }
            ]
        };

        fetchMock.mockResolvedValue({
            ok: true,
            json: async () => mockResponse
        });

        const rating = await fetchExternalRating('Electronics');
        expect(rating).toBe(4.5);
        expect(fetchMock).toHaveBeenCalledWith('https://fakestoreapi.com/products');
    });

    it('should return undefined if no matching product is found', async () => {
        const mockResponse = {
            products: [
                { category: 'clothing', rating: 3.8 }
            ]
        };

        fetchMock.mockResolvedValue({
            ok: true,
            json: async () => mockResponse
        });

        const rating = await fetchExternalRating('Electronics');
        expect(rating).toBeUndefined();
    });

    it('should return undefined if the matched product has no valid rating', async () => {
        const mockResponse = {
            products: [
                { category: 'electronics' } // missing rating
            ]
        };

        fetchMock.mockResolvedValue({
            ok: true,
            json: async () => mockResponse
        });

        const rating = await fetchExternalRating('Electronics');
        expect(rating).toBeUndefined();
    });

    it('should return undefined if the API response is not ok', async () => {
        fetchMock.mockResolvedValue({
            ok: false,
            status: 500
        });

        const rating = await fetchExternalRating('Electronics');
        expect(rating).toBeUndefined();
    });

    it('should return undefined if the fetch request throws an error', async () => {
        fetchMock.mockRejectedValue(new Error('Network error'));

        const rating = await fetchExternalRating('Electronics');
        expect(rating).toBeUndefined();
    });
});
