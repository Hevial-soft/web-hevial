module.exports = function formatOrder(o) {
  return {
    id: o.id,
    number: o.order_number,
    status: o.status,
    type: o.order_type || "PRINT",
    material: o.material_code,
    method: o.method_code,
    size:
      o.size_x && o.size_y && o.size_z
        ? `${o.size_x}×${o.size_y}×${o.size_z} мм`
        : null,
    quantity: o.quantity || 1,
    price: o.total_price ? parseFloat(o.total_price) : null,
    readyDate: o.ready_date,
    description: o.use_description,
    hasFile: !!o.file_url,
    fileName: o.file_name,
    createdAt: o.created_at,
    updatedAt: o.updated_at,
  };
};