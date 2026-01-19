const STORAGE_KEY = '@oil_intervals_data';

// Get all records
export const getAllRecords = async () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error getting records:', error);
    return [];
  }
};

// Add new record
export const addRecord = async (record) => {
  try {
    const records = await getAllRecords();
    const newRecord = {
      id: Date.now().toString(),
      ...record,
      date: new Date().toISOString(),
    };
    records.push(newRecord);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
    return newRecord;
  } catch (error) {
    console.error('Error adding record:', error);
    throw error;
  }
};

// Delete record
export const deleteRecord = async (recordId) => {
  try {
    const records = await getAllRecords();
    const filtered = records.filter(r => r.id !== recordId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Error deleting record:', error);
    throw error;
  }
};

// Update record
export const updateRecord = async (recordId, updates) => {
  try {
    const records = await getAllRecords();
    const index = records.findIndex(r => r.id === recordId);
    if (index !== -1) {
      records[index] = { ...records[index], ...updates };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
      return records[index];
    }
    throw new Error('Record not found');
  } catch (error) {
    console.error('Error updating record:', error);
    throw error;
  }
};

// Get records by engine
export const getRecordsByEngine = async (engineId) => {
  try {
    const records = await getAllRecords();
    return records.filter(r => r.engineId === engineId);
  } catch (error) {
    console.error('Error filtering records:', error);
    return [];
  }
};

// Get latest record for an engine
export const getLatestRecord = async (engineId) => {
  try {
    const records = await getRecordsByEngine(engineId);
    if (records.length === 0) return null;
    return records.sort((a, b) => new Date(b.date) - new Date(a.date))[0];
  } catch (error) {
    console.error('Error getting latest record:', error);
    return null;
  }
};

// Export data
export const exportData = async () => {
  try {
    const records = await getAllRecords();
    return JSON.stringify(records, null, 2);
  } catch (error) {
    console.error('Error exporting data:', error);
    throw error;
  }
};

// Clear all data
export const clearAllData = async () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing data:', error);
    throw error;
  }
};
