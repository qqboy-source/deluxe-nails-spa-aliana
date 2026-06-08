import servicesJson from './services.json'

export interface ServiceItem {
  name: string
  price: string
  description?: string
}

export interface ServiceCategory {
  category: string
  note?: string
  layout?: 'grid'
  items: ServiceItem[]
}

export const servicesData: ServiceCategory[] = servicesJson as ServiceCategory[]
