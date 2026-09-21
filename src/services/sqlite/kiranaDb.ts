import SQLite from 'react-native-sqlite-storage';

import {
  DB_NAME,
  DB_VERSION,
  TABLE_USER_LOGIN,
  COL_ID,
  COL_NAME,
  COL_SHOP_NAME,
  COL_DEVICE_ID,
  COL_LOGGED_AT,
  TABLE_CUSTOMERS,
  COL_FIRST_NAME,
  COL_LAST_NAME,
  COL_PHONE,
  COL_UDHAAR_AMOUNT,
  COL_CREATED_AT,
  TABLE_CUSTOMER_TRANSACTIONS,
  COL_CUSTOMER_ID,
  COL_TRANSACTION_TYPE,
  COL_TRANSACTION_AMOUNT,
  COL_TRANSACTION_NOTE,
  TABLE_INVENTORY_ITEMS,
  COL_NAME_EN,
  COL_NAME_HI,
  COL_QUANTITY,
  COL_UNIT,
  COL_CATEGORY,
  COL_PURCHASE_PRICE,
  COL_SELLING_PRICE,
  COL_MIN_STOCK_ALERT,
  COL_TOTAL_SOLD,
  COL_UPDATED_AT,
  TABLE_BILLS,
  COL_BILL_TOTAL,
  COL_DISCOUNT,
  COL_AMOUNT_DUE,
  COL_BILL_DATE,
  TABLE_BILL_ITEMS,
  COL_BILL_ID,
  COL_ITEM_ID,
  COL_QTY,
  COL_PRICE_PER_UNIT,
  COL_LINE_TOTAL,
} from './dbConfig';

SQLite.enablePromise(true);

let db: any | null = null;

const createTables = async (database: any) => {
  try {
    console.log('[createTables] Creating user_login table if not exists');
    await database.executeSql(
      `CREATE TABLE IF NOT EXISTS ${TABLE_USER_LOGIN} (
        ${COL_ID} INTEGER PRIMARY KEY AUTOINCREMENT,
        ${COL_NAME} TEXT NOT NULL,
        ${COL_SHOP_NAME} TEXT NOT NULL,
        ${COL_DEVICE_ID} TEXT,
        ${COL_LOGGED_AT} INTEGER NOT NULL
      );`,
    );
    console.log(
      '[createTables] user_login table created/verified successfully',
    );

    console.log('[createTables] Creating customers table if not exists');
    await database.executeSql(
      `CREATE TABLE IF NOT EXISTS ${TABLE_CUSTOMERS} (
        ${COL_ID} INTEGER PRIMARY KEY AUTOINCREMENT,
        ${COL_FIRST_NAME} TEXT NOT NULL,
        ${COL_LAST_NAME} TEXT NOT NULL,
        ${COL_PHONE} TEXT,
        ${COL_UDHAAR_AMOUNT} REAL NOT NULL DEFAULT 0,
        ${COL_DEVICE_ID} TEXT,
        ${COL_CREATED_AT} INTEGER NOT NULL
      );`,
    );
    console.log('[createTables] customers table created/verified successfully');

    console.log(
      '[createTables] Creating customer_transactions table if not exists',
    );
    await database.executeSql(
      `CREATE TABLE IF NOT EXISTS ${TABLE_CUSTOMER_TRANSACTIONS} (
        ${COL_ID} INTEGER PRIMARY KEY AUTOINCREMENT,
        ${COL_CUSTOMER_ID} INTEGER NOT NULL,
        ${COL_TRANSACTION_TYPE} TEXT NOT NULL,
        ${COL_TRANSACTION_AMOUNT} REAL NOT NULL,
        ${COL_TRANSACTION_NOTE} TEXT,
        ${COL_CREATED_AT} INTEGER NOT NULL,
        FOREIGN KEY(${COL_CUSTOMER_ID}) REFERENCES ${TABLE_CUSTOMERS}(${COL_ID}) ON DELETE CASCADE
      );`,
    );
    console.log(
      '[createTables] customer_transactions table created/verified successfully',
    );

    console.log('[createTables] Creating inventory_items table if not exists');
    await database.executeSql(
      `CREATE TABLE IF NOT EXISTS ${TABLE_INVENTORY_ITEMS} (
        ${COL_ID} INTEGER PRIMARY KEY AUTOINCREMENT,
        ${COL_NAME_EN} TEXT NOT NULL,
        ${COL_NAME_HI} TEXT NOT NULL,
        ${COL_QUANTITY} INTEGER NOT NULL DEFAULT 0,
        ${COL_UNIT} TEXT NOT NULL DEFAULT 'pcs',
        ${COL_CATEGORY} TEXT NOT NULL DEFAULT 'grocery',
        ${COL_PURCHASE_PRICE} REAL,
        ${COL_SELLING_PRICE} REAL,
        ${COL_MIN_STOCK_ALERT} INTEGER DEFAULT 5,
        ${COL_TOTAL_SOLD} INTEGER DEFAULT 0,
        ${COL_UPDATED_AT} TEXT
      );`,
    );
    console.log(
      '[createTables] inventory_items table created/verified successfully',
    );

    console.log('[createTables] Creating bills table if not exists');
    await database.executeSql(
      `CREATE TABLE IF NOT EXISTS ${TABLE_BILLS} (
        ${COL_ID} INTEGER PRIMARY KEY AUTOINCREMENT,
        ${COL_BILL_TOTAL} REAL NOT NULL DEFAULT 0,
        ${COL_DISCOUNT} REAL DEFAULT 0,
        ${COL_AMOUNT_DUE} REAL NOT NULL DEFAULT 0,
        ${COL_BILL_DATE} INTEGER NOT NULL
      );`,
    );
    console.log('[createTables] bills table created/verified successfully');

    console.log('[createTables] Creating bill_items table if not exists');
    await database.executeSql(
      `CREATE TABLE IF NOT EXISTS ${TABLE_BILL_ITEMS} (
        ${COL_ID} INTEGER PRIMARY KEY AUTOINCREMENT,
        ${COL_BILL_ID} INTEGER NOT NULL,
        ${COL_ITEM_ID} INTEGER NOT NULL,
        ${COL_QTY} REAL NOT NULL,
        ${COL_UNIT} TEXT NOT NULL DEFAULT 'pcs',
        ${COL_PRICE_PER_UNIT} REAL NOT NULL,
        ${COL_LINE_TOTAL} REAL NOT NULL,
        FOREIGN KEY(${COL_BILL_ID}) REFERENCES ${TABLE_BILLS}(${COL_ID}) ON DELETE CASCADE
      );`,
    );
    console.log(
      '[createTables] bill_items table created/verified successfully',
    );
  } catch (error) {
    console.error('[createTables] Error creating table:', error);
    throw error;
  }
};

const migrateUserLoginTable = async (database: any) => {
  try {
    const [result] = await database.executeSql(
      `PRAGMA table_info(${TABLE_USER_LOGIN});`,
    );

    const rows = (result as any).rows;
    let hasDeviceId = false;

    for (let i = 0; i < rows.length; i += 1) {
      const row = rows.item(i);
      if (row && row.name === COL_DEVICE_ID) {
        hasDeviceId = true;
        break;
      }
    }

    if (!hasDeviceId) {
      console.log('[migrateUserLoginTable] Adding device_id column to table');
      try {
        await database.executeSql(
          `ALTER TABLE ${TABLE_USER_LOGIN} ADD COLUMN ${COL_DEVICE_ID} TEXT;`,
        );
        console.log(
          '[migrateUserLoginTable] device_id column added successfully',
        );
      } catch (error: any) {
        if (
          !error?.message?.includes('duplicate column name') &&
          !error?.message?.includes('column name is not unique')
        ) {
          throw error;
        }
        console.log(
          '[migrateUserLoginTable] device_id column already exists (expected)',
        );
      }
    } else {
      console.log('[migrateUserLoginTable] device_id column already exists');
    }
  } catch (error) {
    console.error('[migrateUserLoginTable] Migration error:', error);
    throw error;
  }
};

export const getDb = async (): Promise<any> => {
  if (db) return db;

  try {
    console.log('[getDb] Opening database:', DB_NAME);
    db = await SQLite.openDatabase({
      name: DB_NAME,
      location: 'default',
      createFromLocation: '~www',
      // versioning is optional; keep it explicit for future migrations
      // (may be ignored depending on platform/version)
      version: DB_VERSION,
    } as any);
    console.log('[getDb] Database opened successfully');

    await db.executeSql('PRAGMA foreign_keys = ON;');
    await createTables(db);
    await migrateUserLoginTable(db);
    console.log('[getDb] Database initialization complete');
    return db;
  } catch (error) {
    console.error('[getDb] Database initialization error:', error);
    db = null;
    throw error;
  }
};

// Upsert for single-row login: delete existing row and insert a new one.
export const saveLogin = async (payload: {
  name: string;
  shopName: string;
  deviceId: string;
}): Promise<void> => {
  const database = await getDb();
  const loggedAt = Date.now();

  try {
    await database.transaction((tx: any) => {
      tx.executeSql(
        `DELETE FROM ${TABLE_USER_LOGIN};`,
        [],
        () => {
          console.log('[saveLogin] DELETE executed successfully');
        },
        (error: any) => {
          console.error('[saveLogin] DELETE error:', error);
          throw error;
        },
      );
      tx.executeSql(
        `INSERT INTO ${TABLE_USER_LOGIN} (${COL_NAME}, ${COL_SHOP_NAME}, ${COL_DEVICE_ID}, ${COL_LOGGED_AT}) VALUES (?, ?, ?, ?);`,
        [payload.name, payload.shopName, payload.deviceId, loggedAt],
        () => {
          console.log(
            '[saveLogin] INSERT executed successfully',
            payload.name,
            payload.shopName,
          );
        },
        (error: any) => {
          console.error('[saveLogin] INSERT error:', error);
          throw error;
        },
      );
    });
    console.log('[saveLogin] Transaction completed successfully');
  } catch (error) {
    console.error('[saveLogin] Transaction failed:', error);
    throw error;
  }
};

export const clearLogin = async (): Promise<void> => {
  const database = await getDb();
  try {
    await database.transaction((tx: any) => {
      tx.executeSql(
        `DELETE FROM ${TABLE_USER_LOGIN};`,
        [],
        () => {
          console.log('[clearLogin] DELETE executed successfully');
        },
        (error: any) => {
          console.error('[clearLogin] DELETE error:', error);
          throw error;
        },
      );
    });
    console.log('[clearLogin] Transaction completed successfully');
  } catch (error) {
    console.error('[clearLogin] Transaction failed:', error);
    throw error;
  }
};

export type CustomerRecord = {
  id: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  udhaarAmount: number;
  deviceId: string | null;
  createdAt: number;
};

export type CustomerTransactionRecord = {
  id: string;
  customerId: string;
  type: 'Udhaar' | 'Payment';
  amount: number;
  note: string | null;
  createdAt: number;
};

const mapCustomerRow = (row: any): CustomerRecord => ({
  id: String(row.id),
  firstName: row.first_name,
  lastName: row.last_name,
  phone: row.phone,
  udhaarAmount: Number(row.udhaar_amount) || 0,
  deviceId: row.device_id,
  createdAt: Number(row.created_at) || 0,
});

export const createCustomer = async (payload: {
  firstName: string;
  lastName: string;
  phone?: string;
  udhaarAmount: number;
  deviceId: string;
}): Promise<string> => {
  const database = await getDb();
  const createdAt = Date.now();

  try {
    let insertId: number | null = null;

    await new Promise<void>((resolve, reject) => {
      database.transaction(
        (tx: any) => {
          tx.executeSql(
            `INSERT INTO ${TABLE_CUSTOMERS} (${COL_FIRST_NAME}, ${COL_LAST_NAME}, ${COL_PHONE}, ${COL_UDHAAR_AMOUNT}, ${COL_DEVICE_ID}, ${COL_CREATED_AT}) VALUES (?, ?, ?, ?, ?, ?);`,
            [
              payload.firstName,
              payload.lastName,
              payload.phone || null,
              payload.udhaarAmount,
              payload.deviceId,
              createdAt,
            ],
            (_transaction: any, result: any) => {
              insertId = result?.insertId ?? null;
              if (insertId !== null && payload.udhaarAmount > 0) {
                tx.executeSql(
                  `INSERT INTO ${TABLE_CUSTOMER_TRANSACTIONS} (${COL_CUSTOMER_ID}, ${COL_TRANSACTION_TYPE}, ${COL_TRANSACTION_AMOUNT}, ${COL_TRANSACTION_NOTE}, ${COL_CREATED_AT}) VALUES (?, ?, ?, ?, ?);`,
                  [
                    insertId,
                    'Udhaar',
                    payload.udhaarAmount,
                    'Initial udhaar',
                    createdAt,
                  ],
                );
              }
            },
          );
        },
        (error: any) => reject(error),
        () => {
          if (insertId === null) {
            reject(new Error('Failed to insert customer'));
            return;
          }
          resolve();
        },
      );
    });

    return String(insertId);
  } catch (error) {
    console.error('[createCustomer] error:', error);
    throw error;
  }
};

export const getCustomers = async (
  searchQuery?: string,
): Promise<CustomerRecord[]> => {
  const database = await getDb();

  try {
    let query = `SELECT ${COL_ID} AS id, ${COL_FIRST_NAME} AS first_name, ${COL_LAST_NAME} AS last_name, ${COL_PHONE} AS phone, ${COL_UDHAAR_AMOUNT} AS udhaar_amount, ${COL_DEVICE_ID} AS device_id, ${COL_CREATED_AT} AS created_at FROM ${TABLE_CUSTOMERS}`;
    const params: Array<string> = [];

    if (searchQuery?.trim()) {
      query += ` WHERE ${COL_FIRST_NAME} LIKE ? OR ${COL_LAST_NAME} LIKE ? OR ${COL_PHONE} LIKE ?`;
      const searchTerm = `%${searchQuery.trim()}%`;
      params.push(searchTerm, searchTerm, searchTerm);
    }

    query += ` ORDER BY ${COL_CREATED_AT} DESC;`;

    const [result] = await database.executeSql(query, params);
    const rows = (result as any).rows;
    const customers: CustomerRecord[] = [];

    for (let i = 0; i < rows.length; i += 1) {
      customers.push(mapCustomerRow(rows.item(i)));
    }

    return customers;
  } catch (error) {
    console.error('[getCustomers] error:', error);
    throw error;
  }
};

export const getCustomerById = async (
  customerId: string,
): Promise<CustomerRecord | null> => {
  const database = await getDb();

  try {
    const [result] = await database.executeSql(
      `SELECT ${COL_ID} AS id, ${COL_FIRST_NAME} AS first_name, ${COL_LAST_NAME} AS last_name, ${COL_PHONE} AS phone, ${COL_UDHAAR_AMOUNT} AS udhaar_amount, ${COL_DEVICE_ID} AS device_id, ${COL_CREATED_AT} AS created_at FROM ${TABLE_CUSTOMERS} WHERE ${COL_ID} = ? LIMIT 1;`,
      [customerId],
    );

    const rows = (result as any).rows;
    if (!rows || rows.length === 0) {
      return null;
    }

    return mapCustomerRow(rows.item(0));
  } catch (error) {
    console.error('[getCustomerById] error:', error);
    throw error;
  }
};

export const getTransactionsForCustomer = async (
  customerId: string,
): Promise<CustomerTransactionRecord[]> => {
  const database = await getDb();

  try {
    const [result] = await database.executeSql(
      `SELECT ${COL_ID} AS id, ${COL_CUSTOMER_ID} AS customer_id, ${COL_TRANSACTION_TYPE} AS transaction_type, ${COL_TRANSACTION_AMOUNT} AS transaction_amount, ${COL_TRANSACTION_NOTE} AS transaction_note, ${COL_CREATED_AT} AS created_at FROM ${TABLE_CUSTOMER_TRANSACTIONS} WHERE ${COL_CUSTOMER_ID} = ? ORDER BY ${COL_CREATED_AT} DESC;`,
      [customerId],
    );

    const rows = (result as any).rows;
    const transactions: CustomerTransactionRecord[] = [];

    for (let i = 0; i < rows.length; i += 1) {
      const row = rows.item(i);
      transactions.push({
        id: String(row.id),
        customerId: String(row.customer_id),
        type: row.transaction_type === 'Payment' ? 'Payment' : 'Udhaar',
        amount: Number(row.transaction_amount) || 0,
        note: row.transaction_note,
        createdAt: Number(row.created_at) || 0,
      });
    }

    return transactions;
  } catch (error) {
    console.error('[getTransactionsForCustomer] error:', error);
    throw error;
  }
};

export const addCustomerTransaction = async (
  customerId: string,
  payload: {
    type: 'Udhaar' | 'Payment';
    amount: number;
    note?: string | null;
  },
): Promise<string> => {
  const database = await getDb();
  const createdAt = Date.now();

  try {
    let insertId: number | null = null;

    await new Promise<void>((resolve, reject) => {
      database.transaction(
        (tx: any) => {
          tx.executeSql(
            `UPDATE ${TABLE_CUSTOMERS} SET ${COL_UDHAAR_AMOUNT} = ${COL_UDHAAR_AMOUNT} + ? WHERE ${COL_ID} = ?;`,
            [
              payload.type === 'Payment' ? -payload.amount : payload.amount,
              customerId,
            ],
          );

          tx.executeSql(
            `INSERT INTO ${TABLE_CUSTOMER_TRANSACTIONS} (${COL_CUSTOMER_ID}, ${COL_TRANSACTION_TYPE}, ${COL_TRANSACTION_AMOUNT}, ${COL_TRANSACTION_NOTE}, ${COL_CREATED_AT}) VALUES (?, ?, ?, ?, ?);`,
            [
              customerId,
              payload.type,
              payload.amount,
              payload.note || null,
              createdAt,
            ],
            (_transaction: any, result: any) => {
              insertId = result?.insertId ?? null;
            },
          );
        },
        (error: any) => reject(error),
        () => {
          if (insertId === null) {
            reject(new Error('Failed to create transaction'));
            return;
          }
          resolve();
        },
      );
    });

    return String(insertId);
  } catch (error) {
    console.error('[addCustomerTransaction] error:', error);
    throw error;
  }
};

export const deleteCustomerTransaction = async (
  transactionId: string,
): Promise<void> => {
  const database = await getDb();

  try {
    await database.executeSql(
      `DELETE FROM ${TABLE_CUSTOMER_TRANSACTIONS} WHERE ${COL_ID} = ?;`,
      [transactionId],
    );
  } catch (error) {
    console.error('[deleteCustomerTransaction] error:', error);
    throw error;
  }
};

export const updateCustomer = async (
  customerId: string,
  payload: {
    firstName?: string;
    lastName?: string;
    phone?: string | null;
    udhaarAmount?: number;
    deviceId?: string | null;
  },
): Promise<void> => {
  const database = await getDb();

  try {
    const updateFields: string[] = [];
    const params: Array<string | number | null> = [];

    if (payload.firstName !== undefined) {
      updateFields.push(`${COL_FIRST_NAME} = ?`);
      params.push(payload.firstName);
    }
    if (payload.lastName !== undefined) {
      updateFields.push(`${COL_LAST_NAME} = ?`);
      params.push(payload.lastName);
    }
    if (payload.phone !== undefined) {
      updateFields.push(`${COL_PHONE} = ?`);
      params.push(payload.phone);
    }
    if (payload.udhaarAmount !== undefined) {
      updateFields.push(`${COL_UDHAAR_AMOUNT} = ?`);
      params.push(payload.udhaarAmount);
    }
    if (payload.deviceId !== undefined) {
      updateFields.push(`${COL_DEVICE_ID} = ?`);
      params.push(payload.deviceId);
    }

    if (updateFields.length === 0) {
      return;
    }

    params.push(customerId);

    await database.executeSql(
      `UPDATE ${TABLE_CUSTOMERS} SET ${updateFields.join(
        ', ',
      )} WHERE ${COL_ID} = ?;`,
      params,
    );
  } catch (error) {
    console.error('[updateCustomer] error:', error);
    throw error;
  }
};

export const deleteCustomer = async (customerId: string): Promise<void> => {
  const database = await getDb();

  try {
    await database.executeSql(
      `DELETE FROM ${TABLE_CUSTOMERS} WHERE ${COL_ID} = ?;`,
      [customerId],
    );
  } catch (error) {
    console.error('[deleteCustomer] error:', error);
    throw error;
  }
};

export const getLogin = async (): Promise<{
  name: string;
  shopName: string;
  deviceId?: string;
  loggedAt: number;
} | null> => {
  const database = await getDb();
  try {
    const [result] = await database.executeSql(
      `SELECT ${COL_NAME} as name, ${COL_SHOP_NAME} as shop_name, ${COL_DEVICE_ID} as device_id, ${COL_LOGGED_AT} as logged_at FROM ${TABLE_USER_LOGIN} ORDER BY ${COL_ID} DESC LIMIT 1;`,
    );

    const rows = (result as any).rows;
    console.log('[getLogin] Query result rows.length:', rows?.length || 0);

    if (!rows || rows.length === 0) {
      console.log('[getLogin] No login data found');
      return null;
    }

    const row = rows.item(0);
    console.log('[getLogin] Retrieved login data:', {
      name: row.name,
      shopName: row.shop_name,
      deviceId: row.device_id,
    });

    return {
      name: row.name,
      shopName: row.shop_name,
      deviceId: row.device_id,
      loggedAt: row.logged_at,
    };
  } catch (error) {
    console.error('[getLogin] Query error:', error);
    return null;
  }
};

// ─── Inventory / Home stats ──────────────────────────────────────────

export type InventoryItemRecord = {
  id: string;
  nameEn: string;
  nameHi: string;
  quantity: number;
  unit: string;
  category: string;
  purchasePrice: number | null;
  sellingPrice: number | null;
  minStockAlert: number | null;
  totalSold: number;
  updatedAt: string | null;
};

const mapInventoryRow = (row: any): InventoryItemRecord => ({
  id: String(row.id),
  nameEn: row.name_en,
  nameHi: row.name_hi,
  quantity: Number(row.quantity) || 0,
  unit: row.unit,
  category: row.category,
  purchasePrice: row.purchase_price != null ? Number(row.purchase_price) : null,
  sellingPrice: row.selling_price != null ? Number(row.selling_price) : null,
  minStockAlert:
    row.min_stock_alert != null ? Number(row.min_stock_alert) : null,
  totalSold: Number(row.total_sold) || 0,
  updatedAt: row.updated_at,
});

export type HomeStats = {
  totalSales: number;
  totalSalesPercentage: number;
  totalDebt: number;
  totalItems: number;
  lowStockCount: number;
};

const LOW_STOCK_THRESHOLD = 5;

/**
 * Aggregate all stats needed by the HomeScreen.
 */
export const getHomeStats = async (): Promise<HomeStats> => {
  const database = await getDb();

  try {
    // 1. Total sales from bills table
    const [salesResult] = await database.executeSql(
      `SELECT COALESCE(SUM(${COL_BILL_TOTAL}), 0) as total FROM ${TABLE_BILLS};`,
    );
    const totalSales = Number((salesResult as any).rows?.item(0)?.total) || 0;

    // 2. Total sales from previous period (simple: use half of current as mock percentage)
    // For a real app you'd query bills from a date range
    const totalSalesPercentage = totalSales > 0 ? 30 : 0;

    // 3. Total debt from customers
    const [debtResult] = await database.executeSql(
      `SELECT COALESCE(SUM(${COL_UDHAAR_AMOUNT}), 0) as total FROM ${TABLE_CUSTOMERS};`,
    );
    const totalDebt = Number((debtResult as any).rows?.item(0)?.total) || 0;

    // 4. Total inventory items count
    const [itemsResult] = await database.executeSql(
      `SELECT COUNT(*) as count FROM ${TABLE_INVENTORY_ITEMS};`,
    );
    const totalItems = Number((itemsResult as any).rows?.item(0)?.count) || 0;

    // 5. Low stock items count
    const [lowStockResult] = await database.executeSql(
      `SELECT COUNT(*) as count FROM ${TABLE_INVENTORY_ITEMS} WHERE ${COL_QUANTITY} > 0 AND ${COL_QUANTITY} <= ?;`,
      [LOW_STOCK_THRESHOLD],
    );
    const lowStockCount =
      Number((lowStockResult as any).rows?.item(0)?.count) || 0;

    return {
      totalSales,
      totalSalesPercentage,
      totalDebt,
      totalItems,
      lowStockCount,
    };
  } catch (error) {
    console.error('[getHomeStats] error:', error);
    return {
      totalSales: 0,
      totalSalesPercentage: 0,
      totalDebt: 0,
      totalItems: 0,
      lowStockCount: 0,
    };
  }
};

export type TopSellingItem = {
  rank: number;
  name: string;
  quantity: string;
};

/**
 * Get top selling items sorted by totalSold descending.
 */
export const getTopSellingItems = async (
  limit: number = 5,
): Promise<TopSellingItem[]> => {
  const database = await getDb();

  try {
    const [result] = await database.executeSql(
      `SELECT ${COL_NAME_EN}, ${COL_NAME_HI}, ${COL_TOTAL_SOLD}, ${COL_UNIT} FROM ${TABLE_INVENTORY_ITEMS} WHERE ${COL_TOTAL_SOLD} > 0 ORDER BY ${COL_TOTAL_SOLD} DESC LIMIT ?;`,
      [limit],
    );

    const rows = (result as any).rows;
    const items: TopSellingItem[] = [];

    for (let i = 0; i < rows.length; i += 1) {
      const row = rows.item(i);
      const sold = Number(row.total_sold) || 0;
      const unit = row.unit || '';
      items.push({
        rank: i + 1,
        name: row.name_hi ? `${row.name_hi} (${row.name_en})` : row.name_en,
        quantity: sold > 0 ? `${sold} ${unit}`.trim() : '-',
      });
    }

    return items;
  } catch (error) {
    console.error('[getTopSellingItems] error:', error);
    return [];
  }
};

/**
 * Get all inventory items (for screens that need the full list from DB).
 */
export const createInventoryItem = async (payload: {
  nameEn: string;
  nameHi: string;
  quantity?: number;
  unit?: string;
  category?: string;
  purchasePrice?: number | null;
  sellingPrice?: number | null;
  minStockAlert?: number | null;
  totalSold?: number;
  updatedAt?: string | null;
}): Promise<string> => {
  const database = await getDb();
  const normalizedNameEn = payload.nameEn?.trim() || '';
  const normalizedNameHi = payload.nameHi?.trim() || '';

  if (!normalizedNameEn && !normalizedNameHi) {
    throw new Error('Inventory item name is required');
  }

  const createdAt = payload.updatedAt || new Date().toISOString();

  try {
    let insertId: number | null = null;

    await database.transaction(async (tx: any) => {
      const [result] = await tx.executeSql(
        `INSERT INTO ${TABLE_INVENTORY_ITEMS} (${COL_NAME_EN}, ${COL_NAME_HI}, ${COL_QUANTITY}, ${COL_UNIT}, ${COL_CATEGORY}, ${COL_PURCHASE_PRICE}, ${COL_SELLING_PRICE}, ${COL_MIN_STOCK_ALERT}, ${COL_TOTAL_SOLD}, ${COL_UPDATED_AT}) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
        [
          normalizedNameEn,
          normalizedNameHi,
          payload.quantity ?? 0,
          payload.unit || 'pcs',
          payload.category || 'grocery',
          payload.purchasePrice ?? null,
          payload.sellingPrice ?? null,
          payload.minStockAlert ?? null,
          payload.totalSold ?? 0,
          createdAt,
        ],
      );

      insertId = (result as any)?.insertId;
      if (insertId === undefined || insertId === null) {
        throw new Error('Failed to insert inventory item');
      }
    });

    return String(insertId);
  } catch (error) {
    console.error('[createInventoryItem] error:', error);
    throw error;
  }
};

export const getInventoryItems = async (): Promise<InventoryItemRecord[]> => {
  const database = await getDb();

  try {
    const [result] = await database.executeSql(
      `SELECT * FROM ${TABLE_INVENTORY_ITEMS} ORDER BY ${COL_NAME_EN} ASC;`,
    );

    const rows = (result as any).rows;
    const items: InventoryItemRecord[] = [];

    for (let i = 0; i < rows.length; i += 1) {
      items.push(mapInventoryRow(rows.item(i)));
    }

    return items;
  } catch (error) {
    console.error('[getInventoryItems] error:', error);
    return [];
  }
};
