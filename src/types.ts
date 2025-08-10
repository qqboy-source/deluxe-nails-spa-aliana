export interface ServiceItem {
    name: string;
    price: string;
    description?: string;
}

export interface ServiceCategory {
    category: string;
    note?: string;
    layout?: 'grid' | 'list';
    items: ServiceItem[];
}
