import { mockVendors, mockMenuItems } from "./mockData";

const BASE_URL = "http://localhost:3000/api/v1";

const getAuthHeaders = () => {
  const token = localStorage.getItem("srmpay-token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

async function fetchWithFallback(url, options, fallbackData) {
  try {
    const response = await fetch(`${BASE_URL}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
        ...(options?.headers || {}),
      },
    });
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.warn(`API call failed for ${url}, using mock data. Error:`, error);
    await new Promise((resolve) => setTimeout(resolve, 300));
    return typeof fallbackData === "function" ? fallbackData() : fallbackData;
  }
}

async function fetchReal(url, options) {
  const response = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
      ...(options?.headers || {}),
    },
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.message || `API error: ${response.status}`);
  }

  return await response.json();
}

const normalizeAuthResponse = (response) => {
  if (response?.student) {
    return {
      token: response.token,
      user: { ...response.student, role: "student" },
    };
  }
  if (response?.vendor) {
    const vendorId = response.vendor.id || response.vendor._id;
    return {
      token: response.token,
      user: { ...response.vendor, _id: vendorId, vendorId, role: "vendor" },
    };
  }
  if (response?.admin) {
    return {
      token: response.token,
      user: { ...response.admin, role: "admin" },
    };
  }
  // Fallback for real responses that just match the expected structure
  if (response?.user) {
    return { token: response.token, user: response.user };
  }

  throw new Error("Unknown authentication response format.");
};

const authRequest = async (url, data) => {
  const response = await fetchReal(url, {
    method: "POST",
    body: JSON.stringify(data),
  });
  return normalizeAuthResponse(response);
};

// Student flow
export const registerStudent = (data) => authRequest("/student/register", data);
export const loginStudent = (data) => authRequest("/student/login", data);

// Vendor flow
export const loginVendor = (data) => authRequest("/vendor/login", data);

// Admin flow
export const loginAdmin = (data) => authRequest("/admin/login", data);

// Common - KEEP FALLBACK
export const getVendors = () => fetchWithFallback("/vendors", {}, mockVendors);
export const getVendorMenu = (vendorId) =>
  fetchWithFallback(
    `/vendors/${vendorId}/menu`,
    {},
    mockMenuItems[vendorId] || [],
  );

// Orders - REAL ONLY
export const createOrder = (orderData) =>
  fetchReal("/orders", { method: "POST", body: JSON.stringify(orderData) });
export const getStudentOrders = (email) =>
  fetchReal(`/orders/student/${email}`, {});
export const getVendorOrders = (vendorId) =>
  fetchReal(`/orders/vendor/${vendorId}`, {});
export const updateOrderStatus = (orderId, status) =>
  fetchReal(`/orders/${orderId}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });

export const createPaymentOrder = (amount) =>
  fetchReal("/payment/create-order", {
    method: "POST",
    body: JSON.stringify({ amount }),
  });

export const verifyPayment = (paymentData) =>
  fetchReal("/payment/verify", {
    method: "POST",
    body: JSON.stringify(paymentData),
  });

// Vendor Menu Update - REAL ONLY
export const updateMenuAvailability = (itemId, isAvailable) =>
  fetchReal(`/vendors/menu/${itemId}`, {
    method: "PATCH",
    body: JSON.stringify({ isAvailable }),
  });

// Admin - REAL ONLY
export const getAdminVendors = () => fetchReal("/admin/vendors", {});
export const getAdminRequests = () => fetchReal("/admin/vendors", {}); // Adapting to whatever endpoint actually exists
export const updateVendorApproval = (id, approvalStatus) =>
  fetchReal(`/admin/vendors/${id}/approval`, {
    method: "PATCH",
    body: JSON.stringify({ approvalStatus }),
  });
export const getAdminAnalytics = () => fetchReal("/admin/analytics", {});
