import Vendor from '../models/Vendor.js';
import MenuItem from '../models/MenuItem.js';

export const getVendors = async (request, response) => {
  try {
    const vendors = await Vendor.find({ isActive: true, $or: [{ approvalStatus: 'Approved' }, { approvalStatus: { $exists: false } }] });
    response.json(vendors);
  } catch (error) {
    response.status(500).json({ message: 'Unable to fetch vendors.' });
  }
};

export const getVendorMenu = async (request, response) => response.json(await MenuItem.find({ vendorId: request.params.id }));
export const updateMenuAvailability = async (request, response) => {
  const item = await MenuItem.findByIdAndUpdate(request.params.itemId, { isAvailable: request.body.isAvailable }, { new: true });
  if (!item) return response.status(404).json({ message: 'Menu item not found.' });
  response.json(item);
};
