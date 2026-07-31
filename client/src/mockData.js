export const mockVendors = [
  { _id: 'v1', name: 'Campus Canteen', category: 'Indian meals', location: 'Block A · Ground floor', imageUrl: 'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=900&q=80', isActive: true },
  { _id: 'v2', name: 'Green Bites', category: 'Healthy bowls', location: 'Block B · Food court', imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=900&q=80', isActive: true },
  { _id: 'v3', name: 'Bean Theory', category: 'Coffee & snacks', location: 'Library plaza', imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80', isActive: true },
];

export const mockMenuItems = {
  v1: [
    { _id: 'm1', vendorId: 'v1', name: 'Veg Thali', price: 85, imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=700&q=80', isAvailable: true, isVeg: true }, 
    { _id: 'm2', vendorId: 'v1', name: 'Chicken Biryani', price: 130, imageUrl: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=700&q=80', isAvailable: true, isVeg: false }, 
    { _id: 'm3', vendorId: 'v1', name: 'Masala Dosa', price: 65, imageUrl: 'https://images.unsplash.com/photo-1630383249896-424e482df921?auto=format&fit=crop&w=700&q=80', isAvailable: false, isVeg: true }
  ],
  v2: [
    { _id: 'm4', vendorId: 'v2', name: 'Protein Power Bowl', price: 145, imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=700&q=80', isAvailable: true, isVeg: true }, 
    { _id: 'm5', vendorId: 'v2', name: 'Fruit Yogurt Bowl', price: 110, imageUrl: 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=700&q=80', isAvailable: true, isVeg: true }
  ],
  v3: [
    { _id: 'm6', vendorId: 'v3', name: 'Cold Coffee', price: 95, imageUrl: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=700&q=80', isAvailable: true, isVeg: true }, 
    { _id: 'm7', vendorId: 'v3', name: 'Paneer Sandwich', price: 75, imageUrl: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=700&q=80', isAvailable: true, isVeg: true }
  ],
};

export const mockOrders = [
  { _id: 'o1', tokenNumber: '18', items: [{name: 'Veg Thali', qty: 1}], totalAmount: 85, status: 'Preparing', studentEmail: 'student@srmist.edu.in', vendorId: 'v1' },
  { _id: 'o2', tokenNumber: '19', items: [{name: 'Chicken Biryani', qty: 2}], totalAmount: 260, status: 'Placed', studentEmail: 'test@srmist.edu.in', vendorId: 'v1' },
  { _id: 'o3', tokenNumber: '20', items: [{name: 'Cold Coffee', qty: 1}], totalAmount: 95, status: 'Ready', studentEmail: 'student@srmist.edu.in', vendorId: 'v3' },
];

export const mockRequests = [
  { _id: 'req1', name: 'Waffle Cart', category: 'Desserts', location: 'Tech Park', approvalStatus: 'Pending' }, 
  { _id: 'req2', name: 'The Juice Lab', category: 'Beverages', location: 'Main gate', approvalStatus: 'Pending' }
];

export const mockAnalytics = {
  totalOrders: 284,
  totalRevenue: 15420,
};
