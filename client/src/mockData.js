export const vendors = [
  { _id: 'v1', name: 'Campus Canteen', category: 'Indian meals', location: 'Block A · Ground floor', imageUrl: 'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=900&q=80', isActive: true },
  { _id: 'v2', name: 'Green Bites', category: 'Healthy bowls', location: 'Block B · Food court', imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=900&q=80', isActive: true },
  { _id: 'v3', name: 'Bean Theory', category: 'Coffee & snacks', location: 'Library plaza', imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80', isActive: true },
]

const menuItems = {
  v1: [{ _id: 'm1', vendorId: 'v1', name: 'Veg Thali', price: 85, imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=700&q=80', isAvailable: true }, { _id: 'm2', vendorId: 'v1', name: 'Chicken Biryani', price: 130, imageUrl: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=700&q=80', isAvailable: true }, { _id: 'm3', vendorId: 'v1', name: 'Masala Dosa', price: 65, imageUrl: 'https://images.unsplash.com/photo-1630383249896-424e482df921?auto=format&fit=crop&w=700&q=80', isAvailable: false }],
  v2: [{ _id: 'm4', vendorId: 'v2', name: 'Protein Power Bowl', price: 145, imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=700&q=80', isAvailable: true }, { _id: 'm5', vendorId: 'v2', name: 'Fruit Yogurt Bowl', price: 110, imageUrl: 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=700&q=80', isAvailable: true }],
  v3: [{ _id: 'm6', vendorId: 'v3', name: 'Cold Coffee', price: 95, imageUrl: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=700&q=80', isAvailable: true }, { _id: 'm7', vendorId: 'v3', name: 'Paneer Sandwich', price: 75, imageUrl: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=700&q=80', isAvailable: true }],
}

const orders = [{ _id: 'o1', orderId: 'SRM-2841', vendorId: 'v1', tokenNumber: 18, queuePosition: 3, preparingToken: 16, status: 'Preparing', items: ['Veg Thali'], total: 85 }]
const merchantRequests = [{ _id: 'r1', businessName: 'Waffle Cart', category: 'Desserts', location: 'Tech Park', requestedOn: '30 Jul 2026' }, { _id: 'r2', businessName: 'The Juice Lab', category: 'Beverages', location: 'Main gate', requestedOn: '29 Jul 2026' }]

const wait = (data) => new Promise((resolve) => setTimeout(() => resolve(data), 220))

export const mockApi = {
  getVendors: () => wait(vendors),
  getVendor: (id) => wait(vendors.find((vendor) => vendor._id === id)),
  getMenu: (vendorId) => wait(menuItems[vendorId] || []),
  getOrder: (orderId) => wait(orders.find((order) => order.orderId === orderId) || orders[0]),
  getMerchantMenu: () => wait(menuItems.v1),
  getTokens: () => wait([{ tokenNumber: 16, status: 'Preparing' }, { tokenNumber: 17, status: 'Waiting' }, { tokenNumber: 18, status: 'Waiting' }, { tokenNumber: 19, status: 'Ready for Pickup' }]),
  getRevenue: () => wait({ today: 4260, orders: 38, series: [900, 1250, 980, 1670, 1410, 1920, 2260] }),
  getMerchantRequests: () => wait(merchantRequests),
  getMerchants: () => wait(vendors.map((vendor, index) => ({ ...vendor, orders: 24 + index * 11 }))),
}
