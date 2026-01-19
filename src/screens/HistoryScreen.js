import React, { useState, useEffect } from 'react';
import { getAllRecords, deleteRecord } from '../services/StorageService';

const HistoryScreen = ({ setActiveTab }) => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEngine, setSelectedEngine] = useState(null);

  useEffect(() => {
    loadRecords();
  }, []);

  const loadRecords = async () => {
    setLoading(true);
    try {
      const allRecords = await getAllRecords();
      // Sort by date descending
      const sorted = allRecords.sort((a, b) => new Date(b.date) - new Date(a.date));
      setRecords(sorted);
      if (sorted.length > 0) {
        setSelectedEngine(sorted[0].engineId);
      }
    } catch (error) {
      console.error('Failed to load records:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRecord = async (recordId, engineName) => {
    if (window.confirm(`Delete record for ${engineName}?`)) {
      try {
        await deleteRecord(recordId);
        loadRecords();
      } catch (error) {
        console.error('Failed to delete record:', error);
      }
    }
  };

  const filteredRecords = selectedEngine
    ? records.filter(r => r.engineId === selectedEngine)
    : records;

  const groupedByEngine = {};
  records.forEach(record => {
    if (!groupedByEngine[record.engineId]) {
      groupedByEngine[record.engineId] = [];
    }
    groupedByEngine[record.engineId].push(record);
  });

  const getUniqueEngines = () => {
    return Object.keys(groupedByEngine);
  };

  const calculateDaysSinceChange = (date) => {
    const lastChange = new Date(date);
    const today = new Date();
    const diffTime = Math.abs(today - lastChange);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (loading) {
    return (
      <div className="screen" style={{ textAlign: 'center', paddingTop: 50 }}>
        <p>Loading...</p>
      </div>
    );
  }

  if (records.length === 0) {
    return (
      <div className="screen">
        <div className="screen-title">History</div>
        <div className="empty-state">
          <div className="empty-state-icon">📋</div>
          <p>No records yet</p>
          <button
            className="btn btn-primary"
            onClick={() => setActiveTab('Record')}
            style={{ width: 200, marginTop: 20 }}
          >
            Record First Oil Change
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="screen">
      <div className="screen-title">History</div>

      {getUniqueEngines().length > 1 && (
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>
            Filter by Engine:
          </label>
          <select
            value={selectedEngine || ''}
            onChange={(e) => setSelectedEngine(e.target.value)}
            className="form-input"
            style={{ cursor: 'pointer' }}
          >
            <option value="">All Engines</option>
            {getUniqueEngines().map((engineId) => (
              <option key={engineId} value={engineId}>
                {groupedByEngine[engineId][0]?.engineName || engineId}
              </option>
            ))}
          </select>
        </div>
      )}

      {filteredRecords.length === 0 ? (
        <div className="empty-state">
          <p>No records for this engine</p>
        </div>
      ) : (
        <div>
          {filteredRecords.map((record, index) => (
            <div key={record.id} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                <div>
                  <div className="card-title">{record.engineName}</div>
                  <p style={{ fontSize: 12, color: '#999', marginTop: 2 }}>ID: {record.engineId}</p>
                </div>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteRecord(record.id, record.engineName)}
                  style={{ padding: '6px 12px', fontSize: 12 }}
                >
                  Delete
                </button>
              </div>

              <div className="card-content">
                <p style={{ marginBottom: 8 }}>
                  <strong>Date:</strong> {new Date(record.date).toLocaleDateString()}
                </p>
                <p style={{ marginBottom: 8 }}>
                  <strong>Hours:</strong> {record.hours} hours
                </p>
                <p style={{ marginBottom: 8 }}>
                  <strong>Oil Type:</strong> {record.oilType}
                </p>
                {record.notes && (
                  <p style={{ marginBottom: 8 }}>
                    <strong>Notes:</strong> {record.notes}
                  </p>
                )}
                <p style={{ color: '#666', fontSize: 12 }}>
                  {calculateDaysSinceChange(record.date)} days ago
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryScreen;
  const [loading, setLoading] = useState(true);
  const [selectedEngine, setSelectedEngine] = useState(null);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadRecords();
    });
    return unsubscribe;
  }, [navigation]);

  const loadRecords = async () => {
    setLoading(true);
    try {
      const allRecords = await getAllRecords();
      // Sort by date descending
      const sorted = allRecords.sort((a, b) => new Date(b.date) - new Date(a.date));
      setRecords(sorted);
      if (sorted.length > 0) {
        setSelectedEngine(sorted[0].engineId);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to load records');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRecord = (recordId, engineName) => {
    Alert.alert(
      'Delete Record',
      `Are you sure you want to delete this record for ${engineName}?`,
      [
        { text: 'Cancel', onPress: () => {} },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              await deleteRecord(recordId);
              loadRecords();
              Alert.alert('Success', 'Record deleted');
            } catch (error) {
              Alert.alert('Error', 'Failed to delete record');
            }
          },
          style: 'destructive',
        },
      ]
    );
  };

  const filteredRecords = selectedEngine
    ? records.filter(r => r.engineId === selectedEngine)
    : records;

  const groupedByEngine = {};
  records.forEach(record => {
    if (!groupedByEngine[record.engineId]) {
      groupedByEngine[record.engineId] = [];
    }
    groupedByEngine[record.engineId].push(record);
  });

  const getUniqueEngines = () => {
    return Object.keys(groupedByEngine);
  };

  const calculateDaysSinceChange = (date) => {
    const lastChange = new Date(date);
    const today = new Date();
    const diffTime = Math.abs(today - lastChange);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (records.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Icon name="history" size={60} color="#999" />
        <Text style={styles.emptyText}>No records yet</Text>
        <Text style={styles.emptySubtext}>
          Start recording oil changes to see history
        </Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('Record')}
        >
          <Icon name="plus" size={24} color="white" />
          <Text style={styles.addButtonText}>Record Now</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.engineFilter}
        contentContainerStyle={styles.engineFilterContent}
      >
        {getUniqueEngines().map(engineId => {
          const engineName = records.find(r => r.engineId === engineId)?.engineName || engineId;
          return (
            <TouchableOpacity
              key={engineId}
              style={[
                styles.engineButton,
                selectedEngine === engineId && styles.engineButtonActive,
              ]}
              onPress={() => setSelectedEngine(engineId)}
            >
              <Text
                style={[
                  styles.engineButtonText,
                  selectedEngine === engineId && styles.engineButtonTextActive,
                ]}
              >
                {engineName}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <ScrollView style={styles.recordsList}>
        {filteredRecords.length === 0 ? (
          <View style={styles.noRecordsContainer}>
            <Text style={styles.noRecordsText}>No records for this engine</Text>
          </View>
        ) : (
          filteredRecords.map((record, index) => (
            <View key={record.id} style={styles.recordCard}>
              <View style={styles.recordHeader}>
                <View>
                  <Text style={styles.recordDate}>
                    {new Date(record.date).toLocaleDateString('en-US', {
                      weekday: 'short',
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </Text>
                  <Text style={styles.recordTime}>
                    {calculateDaysSinceChange(record.date)} days ago
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => handleDeleteRecord(record.id, record.engineName)}
                  style={styles.deleteButton}
                >
                  <Icon name="trash-can-outline" size={20} color="#FF6B6B" />
                </TouchableOpacity>
              </View>

              <View style={styles.recordContent}>
                <View style={styles.recordItem}>
                  <Icon name="speedometer" size={16} color="#666" />
                  <View style={styles.recordItemText}>
                    <Text style={styles.recordLabel}>Hours at Change</Text>
                    <Text style={styles.recordValue}>{record.hours} hours</Text>
                  </View>
                </View>

                <View style={styles.recordItem}>
                  <Icon name="oil" size={16} color="#666" />
                  <View style={styles.recordItemText}>
                    <Text style={styles.recordLabel}>Oil Type</Text>
                    <Text style={styles.recordValue}>{record.oilType}</Text>
                  </View>
                </View>

                {record.notes && (
                  <View style={styles.recordItem}>
                    <Icon name="note-text" size={16} color="#666" />
                    <View style={styles.recordItemText}>
                      <Text style={styles.recordLabel}>Notes</Text>
                      <Text style={styles.recordValue}>{record.notes}</Text>
                    </View>
                  </View>
                )}
              </View>

              {index < filteredRecords.length - 1 && <View style={styles.divider} />}
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 15,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 5,
    textAlign: 'center',
  },
  addButton: {
    flexDirection: 'row',
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  engineFilter: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  engineFilterContent: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    gap: 8,
  },
  engineButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  engineButtonActive: {
    borderColor: '#007AFF',
    backgroundColor: '#E3F2FD',
  },
  engineButtonText: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },
  engineButtonTextActive: {
    color: '#007AFF',
    fontWeight: '600',
  },
  recordsList: {
    flex: 1,
    paddingHorizontal: 10,
  },
  noRecordsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  noRecordsText: {
    fontSize: 14,
    color: '#999',
  },
  recordCard: {
    backgroundColor: 'white',
    marginVertical: 8,
    borderRadius: 10,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
  },
  recordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  recordDate: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  recordTime: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  deleteButton: {
    padding: 8,
  },
  recordContent: {
    gap: 8,
  },
  recordItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  recordItemText: {
    marginLeft: 12,
    flex: 1,
  },
  recordLabel: {
    fontSize: 12,
    color: '#999',
    fontWeight: '500',
  },
  recordValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginTop: 12,
  },
});

export default HistoryScreen;
