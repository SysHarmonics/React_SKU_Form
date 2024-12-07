export interface SKUDetails {
    name: string;
    description: string;
    sku: string;
    branding: string;
    color: string;
    imageURL: string;
    sizeRange: string;
    shopifyProductId?: string;
    shopifyVariants?: {
        id: string;
        size: string;
    }[];
    price?: number;
    inventory?: {
        size: string;
        quantity: number;
        available: boolean;
    }[];
    lastUpdated: string;
}


export interface InventoryProduct extends SKUDetails {
    price: number;
    inventory: {
        size: string;
        quantity: number;
        available: boolean;
    }[];
    status: 'in_stock' | 'low_stock' | 'out_of_stock';
}