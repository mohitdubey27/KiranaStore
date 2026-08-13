export const DB_NAME = 'kirana_store.db';
export const DB_VERSION = 1;

// Single-row table for the current login
export const TABLE_USER_LOGIN = 'user_login';

export const COL_ID = 'id';
export const COL_NAME = 'name';
export const COL_SHOP_NAME = 'shop_name';
export const COL_DEVICE_ID = 'device_id';
export const COL_LOGGED_AT = 'logged_at';

// Customers (udhaar)
export const TABLE_CUSTOMERS = 'customers';
export const COL_FIRST_NAME = 'first_name';
export const COL_LAST_NAME = 'last_name';
export const COL_PHONE = 'phone';
export const COL_UDHAAR_AMOUNT = 'udhaar_amount';
export const COL_CREATED_AT = 'created_at';

export const TABLE_CUSTOMER_TRANSACTIONS = 'customer_transactions';
export const COL_CUSTOMER_ID = 'customer_id';
export const COL_TRANSACTION_TYPE = 'transaction_type';
export const COL_TRANSACTION_AMOUNT = 'transaction_amount';
export const COL_TRANSACTION_NOTE = 'transaction_note';

// Inventory items
export const TABLE_INVENTORY_ITEMS = 'inventory_items';
export const COL_NAME_EN = 'name_en';
export const COL_NAME_HI = 'name_hi';
export const COL_QUANTITY = 'quantity';
export const COL_UNIT = 'unit';
export const COL_CATEGORY = 'category';
export const COL_PURCHASE_PRICE = 'purchase_price';
export const COL_SELLING_PRICE = 'selling_price';
export const COL_MIN_STOCK_ALERT = 'min_stock_alert';
export const COL_TOTAL_SOLD = 'total_sold';
export const COL_UPDATED_AT = 'updated_at';

// Bills / Sales transactions
export const TABLE_BILLS = 'bills';
export const COL_BILL_TOTAL = 'bill_total';
export const COL_DISCOUNT = 'discount';
export const COL_AMOUNT_DUE = 'amount_due';
export const COL_BILL_DATE = 'bill_date';

// Bill items (line items within a bill)
export const TABLE_BILL_ITEMS = 'bill_items';
export const COL_BILL_ID = 'bill_id';
export const COL_ITEM_ID = 'item_id';
export const COL_QTY = 'qty';
export const COL_PRICE_PER_UNIT = 'price_per_unit';
export const COL_LINE_TOTAL = 'line_total';
