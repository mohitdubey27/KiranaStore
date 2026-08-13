export type Language = 'english' | 'hindi';

export type TranslationKey =
  | 'appName'
  | 'appDescription'
  | 'selectLanguage'
  | 'appTagline'
  | 'chooseLanguage'
  | 'english'
  | 'hindi'
  | 'next'
  | 'welcome'
  | 'accessDashboard'
  | 'yourName'
  | 'shopName'
  | 'namePlaceholder'
  | 'shopPlaceholder'
  | 'continue'
  | 'loggingIn'
  | 'clearSaved'
  | 'success'
  | 'loggedInSuccessfully'
  | 'error'
  | 'failedToSaveLogin'
  | 'cleared'
  | 'savedLoginRemoved'
  | 'failedToClear'
  | 'home'
  | 'loginSuccessful'
  | 'pleaseWait'
  | 'pleaseEnterYourName'
  | 'pleaseEnterYourShopName'
  | 'totalSales'
  | 'totalOrders'
  | 'totalInventory'
  | 'totalDebt'
  | 'totalItems'
  | 'lowStock'
  | 'quickActions'
  | 'addInventory'
  | 'addItem'
  | 'createBill'
  | 'unitConverter'
  | 'manageUsers'
  | 'inventory'
  | 'reports'
  | 'settings'
  | 'topSelling'
  | 'viewMore'
  | 'homeTab'
  | 'inventoryTab'
  | 'settingsTab'
  | 'billTab'
  | 'debtTab'
  | 'reportsTab'
  | 'language'
  | 'storeInformation'
  | 'storeInformationSubtitle'
  | 'printerSettings'
  | 'backupRestore'
  | 'notifications'
  | 'supportHelp'
  | 'logout'
  | 'all'
  | 'outOfStock'
  | 'inStock'
  | 'stockLabel'
  | 'itemDetailsTitle'
  | 'categoryLabel'
  | 'stockStatusOk'
  | 'purchasePrice'
  | 'sellingPrice'
  | 'minimumStockAlert'
  | 'lastUpdated'
  | 'totalSalesLabel'
  | 'updateStock'
  | 'sellButton'
  | 'itemNotFound'
  | 'unitConverterTitle'
  | 'item'
  | 'qty'
  | 'price'
  | 'total'
  | 'searchItemsBarcode'
  | 'totalAmount'
  | 'discount'
  | 'amountDue'
  | 'cancel'
  | 'payNow'
  | 'unitToCash'
  | 'cashToUnit'
  | 'selectItem'
  | 'enterAmount'
  | 'unitPlaceholder'
  | 'itemPlaceholder'
  | 'grocery'
  | 'beverages'
  | 'snacks'
  | 'household'
  | 'convert'
  | 'convertedTotal'
  | 'searchInventoryPlaceholder'
  | 'noItemsFound'
  | 'itemName'
  | 'unitLabel'
  | 'initialStock'
  | 'initialStockPlaceholder'
  | 'minStockPlaceholder'
  | 'pricePlaceholder'
  | 'save'
  | 'pleaseEnterItemName'
  | 'itemSaved'
  | 'udhaarList'
  | 'searchCustomerPlaceholder'
  | 'searchCustomerLabel'
  | 'addCustomer'
  | 'addCustomerTitle'
  | 'firstName'
  | 'lastName'
  | 'mobileNumber'
  | 'udhaarAmount'
  | 'enterFirstName'
  | 'enterLastName'
  | 'enterMobileNumber'
  | 'enterUdhaarAmount'
  | 'pleaseEnterFirstName'
  | 'pleaseEnterLastName'
  | 'pleaseEnterMobileNumber'
  | 'mobileNumberInvalid'
  | 'pleaseEnterUdhaarAmount'
  | 'udhaarAmountInvalid'
  | 'totalDue'
  | 'customersDue'
  | 'lastUdhaar'
  | 'customerDetails'
  | 'totalUdhaar'
  | 'totalPayment'
  | 'remainingDue'
  | 'transactionHistory'
  | 'viewAll'
  | 'addUdhaar'
  | 'addPayment'
  | 'payment'
  | 'udhaar'
  | 'note'
  | 'due'
  | 'paid'
  | 'loading'
  | 'customerNotFound'
  | 'noUdhaarFound'
  | 'reportsTitle'
  | 'today'
  | 'sevenDays'
  | 'thirtyDays'
  | 'custom'
  | 'totalProfit'
  | 'avgOrder'
  | 'orders'
  | 'avg';

export const STRINGS: Record<Language, Record<TranslationKey, string>> = {
  english: {
    appName: 'Kirana Store',
    appDescription: 'Your neighborhood shopping app',
    selectLanguage: 'Select Language',
    appTagline: 'Your local shop, reimagined for fast everyday needs.',
    chooseLanguage: 'Choose language',
    english: 'English',
    hindi: 'हिंदी',
    next: 'Next',

    welcome: 'Welcome',
    accessDashboard: 'Access your Kirana dashboard',

    yourName: 'Your Name',
    shopName: 'Shop Name',
    namePlaceholder: 'e.g. Rajesh',
    shopPlaceholder: 'e.g. D-Mart Corner',

    continue: 'Continue',
    loggingIn: 'Logging in...',
    clearSaved: 'Clear saved',

    success: 'Success',
    loggedInSuccessfully: 'Logged in successfully',
    error: 'Error',
    failedToSaveLogin: 'Failed to save login',
    cleared: 'Cleared',
    savedLoginRemoved: 'Saved login removed',
    failedToClear: 'Failed to clear',

    home: 'Home',
    loginSuccessful: 'Login successful',
    pleaseWait: 'Please wait...',

    pleaseEnterYourName: 'Please enter your name',
    pleaseEnterYourShopName: 'Please enter your shop name',

    totalSales: 'Total Sales',
    totalOrders: 'Total Orders',
    totalInventory: 'Total Inventory',
    totalDebt: 'Total Debt',
    totalItems: 'Total Items',
    lowStock: 'Low Stock',
    quickActions: 'Quick Actions',
    addInventory: 'Add Inventory',
    addItem: 'Add Item',
    createBill: 'Create Bill',
    unitConverter: 'Unit Converter',
    manageUsers: 'Manage Users',
    inventory: 'Inventory',
    reports: 'Reports',
    settings: 'Settings',
    storeInformation: 'Store Information',
    storeInformationSubtitle: 'Business details & shop info',
    printerSettings: 'Printer Settings',
    language: 'Language',
    backupRestore: 'Backup & Restore',
    notifications: 'Notifications',
    supportHelp: 'Support / Help',
    logout: 'Logout',
    topSelling: 'Top Selling',
    viewMore: 'View More',
    reportsTitle: 'Reports',
    today: 'Today',
    sevenDays: '7 Days',
    thirtyDays: '30 Days',
    custom: 'Custom',
    totalProfit: 'Total Profit',
    avgOrder: 'Avg Order',
    orders: 'orders',
    avg: 'avg',
    homeTab: 'Home',
    inventoryTab: 'Inventory',
    settingsTab: 'Settings',
    billTab: 'Bill',
    debtTab: 'Debt',
    reportsTab: 'Reports',
    all: 'All',
    outOfStock: 'Out of Stock',
    inStock: 'In Stock',
    searchInventoryPlaceholder: 'Search items...',
    noItemsFound: 'No items found',
    stockLabel: 'Stock',
    itemDetailsTitle: 'Item Details',
    categoryLabel: 'Category',
    stockStatusOk: 'Stock OK',
    purchasePrice: 'Purchase Price',
    sellingPrice: 'Selling Price',
    minimumStockAlert: 'Minimum Stock Alert',
    lastUpdated: 'Last Updated',
    totalSalesLabel: 'Total Sales',
    updateStock: 'Update Stock',
    sellButton: 'Sell Now',
    itemNotFound: 'Item not found',
    unitConverterTitle: 'Unit ⇄ Cash Converter',
    item: 'Item',
    qty: 'Qty',
    price: 'Price',
    total: 'Total',
    searchItemsBarcode: 'Search items or scan barcode',
    totalAmount: 'Total Amount',
    discount: 'Discount',
    amountDue: 'Amount Due',
    cancel: 'Cancel',
    payNow: 'Pay Now',
    unitToCash: 'Unit to Cash',
    cashToUnit: 'Cash to Unit',
    selectItem: 'Select item',
    enterAmount: 'Enter amount',
    unitPlaceholder: 'unit (e.g., 250)',
    itemPlaceholder: 'e.g. Sugar',
    grocery: 'Grocery',
    beverages: 'Beverages',
    snacks: 'Snacks',
    household: 'Household',
    convert: 'Convert',
    convertedTotal: 'Total',
    itemName: 'Item name',
    unitLabel: 'Unit',
    initialStock: 'Initial Stock',
    initialStockPlaceholder: 'e.g. 50',
    minStockPlaceholder: 'e.g. 5',
    pricePlaceholder: 'e.g. 40',
    save: 'Save',
    pleaseEnterItemName: 'Please enter item name',
    itemSaved: 'Item saved successfully',
    udhaarList: 'Udhaar List',
    searchCustomerPlaceholder: 'Search customer...',
    searchCustomerLabel: 'Search customer',
    addCustomer: '+ Add Customer',
    addCustomerTitle: 'Add Customer',
    firstName: 'First name',
    lastName: 'Last name',
    mobileNumber: 'Mobile number',
    udhaarAmount: 'Udhaar amount',
    enterFirstName: 'e.g. Rajesh',
    enterLastName: 'e.g. Kumar',
    enterMobileNumber: 'e.g. 9876543210',
    enterUdhaarAmount: 'e.g. 1200',
    pleaseEnterFirstName: 'Please enter first name',
    pleaseEnterLastName: 'Please enter last name',
    pleaseEnterMobileNumber: 'Please enter mobile number',
    mobileNumberInvalid: 'Please enter a valid mobile number',
    pleaseEnterUdhaarAmount: 'Please enter udhaar amount',
    udhaarAmountInvalid: 'Please enter a valid amount',

    totalDue: 'Total Due',
    customersDue: 'customers due',
    lastUdhaar: 'Last udhaar',
    customerDetails: 'Customer Details',
    totalUdhaar: 'Total Udhaar',
    totalPayment: 'Total Payment',
    remainingDue: 'Remaining Due',
    loading: 'Loading...',
    customerNotFound: 'Customer not found',
    transactionHistory: 'Transaction History',
    viewAll: 'View All',
    addUdhaar: 'Add Udhaar',
    addPayment: 'Add Payment',
    payment: 'Payment',
    udhaar: 'Udhaar',
    note: 'Note',
    due: 'Due',
    paid: 'Paid',
    noUdhaarFound: 'No records found',
  },
  hindi: {
    appName: 'किराना स्टोर',
    appDescription: 'आपके मोहल्ले की शॉपिंग ऐप',
    selectLanguage: 'भाषा चुनें',
    appTagline:
      'आपकी स्थानीय दुकान, तेज़ रोज़मर्रा की ज़रूरतों के लिए पुनर्कल्पित।',
    chooseLanguage: 'भाषा चुनें',
    english: 'English',
    hindi: 'हिंदी',
    next: 'आगे',

    welcome: 'स्वागत है',
    accessDashboard: 'अपने किराना डैशबोर्ड तक पहुँचें',

    yourName: 'आपका नाम',
    shopName: 'दुकान का नाम',
    namePlaceholder: 'जैसे: राजेश',
    shopPlaceholder: 'जैसे: डी-मार्ट कॉर्नर',

    continue: 'जारी रखें',
    loggingIn: 'लॉगिन हो रहा है...',
    clearSaved: 'सेव किया साफ़ करें',

    success: 'सफल',
    loggedInSuccessfully: 'लॉगिन सफल रहा',
    error: 'त्रुटि',
    failedToSaveLogin: 'लॉगिन सेव करने में विफल',
    cleared: 'साफ़ कर दिया',
    savedLoginRemoved: 'सेव किया गया लॉगिन हटाया गया',
    failedToClear: 'साफ़ करने में विफल',

    home: 'होम',
    loginSuccessful: 'लॉगिन सफल',
    pleaseWait: 'कृपया प्रतीक्षा करें...',

    pleaseEnterYourName: 'कृपया अपना नाम दर्ज करें',
    pleaseEnterYourShopName: 'कृपया अपनी दुकान का नाम दर्ज करें',

    totalSales: 'कुल बिक्रया',
    totalOrders: 'कुल आउटपुट',
    totalInventory: 'कुल इन्वेंटरी',
    totalDebt: 'कुल कर्ज',
    totalItems: 'कुल आइटम',
    lowStock: 'कम स्टॉक',
    quickActions: 'स्वरित कार्य',
    addInventory: 'इन्वेंटरी जोड़ें',
    addItem: 'आइटम जोड़ें',
    createBill: 'बिल बनाएं',
    unitConverter: 'यूनिट कन्वर्टर',
    manageUsers: 'उपयार बहीं',
    inventory: 'इन्वेंटरी',
    reports: 'रिपोर्ट्स',
    settings: 'सेटिंग्स',
    storeInformation: 'दुकान जानकारी',
    storeInformationSubtitle: 'व्यवसाय विवरण और दुकान जानकारी',
    printerSettings: 'प्रिंटर सेटिंग',
    language: 'भाषा',
    backupRestore: 'बैकअप और रिस्टोर',
    notifications: 'नोटिफिकेशन',
    supportHelp: 'सपोर्ट / मदद',
    logout: 'लॉगआउट',
    topSelling: 'शीर्ष विक्रय उत्पाद',
    viewMore: 'और देखें',
    reportsTitle: 'रिपोर्ट्स',
    today: 'आज',
    sevenDays: '7 दिन',
    thirtyDays: '30 दिन',
    custom: 'कस्टम',
    totalProfit: 'कुल लाभ',
    avgOrder: 'औसत ऑर्डर',
    orders: 'आर्डर',
    avg: 'औसत',
    homeTab: 'होम',
    inventoryTab: 'इनवेंटरी',
    settingsTab: 'सेटिंग्स',
    billTab: 'बिल',
    debtTab: 'कर्ज',
    reportsTab: 'रिपोर्ट',
    all: 'सभी',
    outOfStock: 'स्टॉक ख़त्म',
    inStock: 'स्टॉक में',
    searchInventoryPlaceholder: 'आइटम खोजें...',
    noItemsFound: 'कोई आइटम नहीं मिला',
    stockLabel: 'स्टॉक',
    itemDetailsTitle: 'आइटम विवरण',
    categoryLabel: 'श्रेणी',
    stockStatusOk: 'स्टॉक ठीक',
    purchasePrice: 'खरीद मूल्य',
    sellingPrice: 'विक्रय मूल्य',
    minimumStockAlert: 'न्यूनतम स्टॉक अलर्ट',
    lastUpdated: 'अंतिम अपडेट',
    totalSalesLabel: 'कुल बिक्री',
    updateStock: 'स्टॉक अपडेट करें',
    sellButton: 'विक्रय करें',
    itemNotFound: 'आइटम नहीं मिला',
    unitConverterTitle: 'यूनिट ⇄ कैश कन्वर्टर',
    unitToCash: 'यूनिट से कैश',
    cashToUnit: 'कैश से यूनिट',
    selectItem: 'आइटम चुनें',
    enterAmount: 'मात्रा दर्ज करें',
    unitPlaceholder: 'यूनिट (जैसे: 250)',
    itemPlaceholder: 'जैसे: चीनी',
    grocery: 'किराना',
    beverages: 'पेय पदार्थ',
    snacks: 'नाश्ता',
    household: 'घरेलू सामान',
    convert: 'कन्वर्ट करें',
    convertedTotal: 'कुल',
    itemName: 'आइटम का नाम',
    unitLabel: 'यूनिट',
    initialStock: 'प्रारंभिक स्टॉक',
    initialStockPlaceholder: 'जैसे: 50',
    minStockPlaceholder: 'जैसे: 5',
    pricePlaceholder: 'जैसे: 40',
    save: 'सहेजें',
    pleaseEnterItemName: 'कृपया आइटम नाम दर्ज करें',
    itemSaved: 'आइटम सफलतापूर्वक सहेजा गया',
    udhaarList: 'उधार सूची',
    searchCustomerPlaceholder: 'ग्राहक खोजें...',
    searchCustomerLabel: 'ग्राहक खोजें',
    addCustomer: '+ ग्राहक जोड़ें',
    addCustomerTitle: 'ग्राहक जोड़ें',
    firstName: 'पहला नाम',
    lastName: 'अंतिम नाम',
    mobileNumber: 'मोबाइल नंबर',
    udhaarAmount: 'उधार राशि',
    enterFirstName: 'जैसे: राजेश',
    enterLastName: 'जैसे: कुमार',
    enterMobileNumber: 'जैसे: 9876543210',
    enterUdhaarAmount: 'जैसे: 1200',
    pleaseEnterFirstName: 'कृपया पहला नाम दर्ज करें',
    pleaseEnterLastName: 'कृपया अंतिम नाम दर्ज करें',
    pleaseEnterMobileNumber: 'कृपया मोबाइल नंबर दर्ज करें',
    mobileNumberInvalid: 'कृपया वैध मोबाइल नंबर दर्ज करें',
    pleaseEnterUdhaarAmount: 'कृपया उधार राशि दर्ज करें',
    udhaarAmountInvalid: 'कृपया वैध राशि दर्ज करें',

    totalDue: 'कुल बकाया',
    customersDue: 'ग्राहक बकाया',
    lastUdhaar: 'आखिरी उधार',
    customerDetails: 'ग्राहक विवरण',
    totalUdhaar: 'कुल उधार',
    totalPayment: 'कुल भुगतान',
    remainingDue: 'बाकी बकाया',
    loading: 'लोड हो रहा है...',
    customerNotFound: 'ग्राहक नहीं मिला',
    transactionHistory: 'लेनदेन इतिहास',
    viewAll: 'सब देखें',
    addUdhaar: 'उधार जोड़ें',
    addPayment: 'भुगतान जोड़ें',
    payment: 'भुगतान',
    udhaar: 'उधार',
    note: 'नोट',
    due: 'बकाया',
    paid: 'अदा',
    noUdhaarFound: 'कोई रिकॉर्ड नहीं मिला',
    item: 'आइटम',
    qty: 'मात्रा',
    price: 'कीमत',
    total: 'कुल',
    searchItemsBarcode: 'आइटम खोजें या बारकोड स्कैन करें',
    totalAmount: 'कुल राशि',
    discount: 'छूट',
    amountDue: 'देय राशि',
    cancel: 'रद्द करें',
    payNow: 'भुगतान करें',
  },
};
