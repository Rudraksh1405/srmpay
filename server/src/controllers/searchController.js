import Vendor from '../models/Vendor.js';
import MenuItem from '../models/MenuItem.js';

export const globalSearch = async (request, response) => {
  try {
    const query = request.query.q || '';
    if (!query) return response.json({ vendors: [], menuItems: [] });

    const regex = new RegExp(query, 'i');

    const vendors = await Vendor.find({
      $or: [{ name: regex }, { category: regex }]
    }).limit(10);

    const menuItems = await MenuItem.find({
      name: regex
    }).populate('vendorId', 'name imageUrl').limit(20);

    response.json({ vendors, menuItems });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: 'Search failed' });
  }
};
