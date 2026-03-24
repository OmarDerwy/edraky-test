export interface FakeStoreReview {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface FakeStoreDimensions {
  width: number;
  height: number;
  depth: number;
}

export interface FakeStoreMeta {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
}

export interface FakeStoreProduct {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand?: string;
  sku: string;
  weight: number;
  dimensions: FakeStoreDimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: FakeStoreReview[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: FakeStoreMeta;
  thumbnail: string;
  images: string[];
}

export interface FakeStoreResponse {
  products: FakeStoreProduct[];
  total: number;
  skip: number;
  limit: number;
}
