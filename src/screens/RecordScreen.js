import React, { useState } from 'react';
import { addRecord } from '../services/StorageService';

const RecordScreen = ({ setActiveTab }) => {
  const [engineName, setEngineName] = useState('');
  const [engineId, setEngineId] = useState('');
  const [hours, setHours] = useState('');
  const [oilType, setOilType] = useState('5W-30');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const validateForm = () => {
    if (!engineName.trim()) {
      setError('Please enter engine name');
      return false;
    }
    if (!engineId.trim()) {
      setError('Please enter engine ID');
      return false;
    }
    if (!hours.trim()) {
      setError('Please enter hours');
      return false;
    }
    if (isNaN(hours)) {
      setError('Hours must be a number');
      return false;
    }
    if (!oilType.trim()) {
      setError('Please select oil type');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const record = {
        engineName: engineName.trim(),
        engineId: engineId.trim(),
        hours: parseInt(hours, 10),
        oilType,
        date: new Date(date).toISOString(),
        notes: notes.trim(),
      };

      await addRecord(record);
      
      // Reset form
      setEngineName('');
      setEngineId('');
      setHours('');
      setOilType('5W-30');
      setNotes('');
      setDate(new Date().toISOString().split('T')[0]);
      setError('');
      
      // Show success and navigate back
      alert('Oil change recorded successfully!');
      setActiveTab('Home');
    } catch (err) {
      setError('Failed to save record: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const oilTypes = ['5W-30', '5W-40', '10W-30', '10W-40', '15W-40', 'Synthetic', 'Semi-Synthetic'];

  return (
    <div className="screen">
      <div className="screen-title">Record Oil Change</div>
      
      {error && (
        <div style={{
          backgroundColor: '#ffebee',
          color: '#c62828',
          padding: 12,
          borderRadius: 5,
          marginBottom: 15,
          border: '1px solid #ef5350'
        }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 25 }}>
          <h3 style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 15 }}>Engine Information</h3>
          
          <div className="form-group">
            <label className="form-label">Engine Name</label>
            <input
              className="form-input"
              type="text"
              placeholder="e.g., Main Engine, Backup Generator"
              value={engineName}
              onChange={(e) => setEngineName(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Engine ID/Serial Number</label>
            <input
              className="form-input"
              type="text"
              placeholder="e.g., ENG-001"
              value={engineId}
              onChange={(e) => setEngineId(e.target.value)}
              disabled={loading}
            />
          </div>
        </div>

        <div style={{ marginBottom: 25 }}>
          <h3 style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 15 }}>Oil Change Details</h3>
          
          <div className="form-group">
            <label className="form-label">Current Engine Hours</label>
            <input
              className="form-input"
              type="number"
              placeholder="Enter current hours"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              disabled={loading}
              step="0.1"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Oil Type</label>
            <select
              className="form-input"
              value={oilType}
              onChange={(e) => setOilType(e.target.value)}
              disabled={loading}
              style={{ cursor: 'pointer' }}
            >
              {oilTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Date of Change</label>
            <input
              className="form-input"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              disabled={loading}
            />
          </div>
        </div>

        <div style={{ marginBottom: 25 }}>
          <h3 style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 15 }}>Additional Notes</h3>
          
          <div className="form-group">
            <label className="form-label">Notes (Optional)</label>
            <textarea
              className="form-input"
              placeholder="Add any additional notes about the oil change..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              disabled={loading}
              rows="4"
              style={{ resize: 'vertical', minHeight: 100 }}
            />
          </div>
        </div>

        <button
          className="btn btn-primary"
          type="submit"
          disabled={loading}
          style={{ opacity: loading ? 0.6 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
        >
          {loading ? 'Recording...' : '✓ Record Oil Change'}
        </button>
      </form>
    </div>
  );
};

export default RecordScreen;
    if (event.type === 'dismissed') {
      setShowDatePicker(false);
      return;
    }
    setDate(selectedDate || date);
    setShowDatePicker(false);
  };

  const validateForm = () => {
    if (!engineName.trim()) {
      Alert.alert('Error', 'Please enter engine name');
      return false;
    }
    if (!engineId.trim()) {
      Alert.alert('Error', 'Please enter engine ID');
      return false;
    }
    if (!hours.trim()) {
      Alert.alert('Error', 'Please enter hours');
      return false;
    }
    if (isNaN(hours)) {
      Alert.alert('Error', 'Hours must be a number');
      return false;
    }
    if (!oilType.trim()) {
      Alert.alert('Error', 'Please select oil type');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const record = {
        engineName: engineName.trim(),
        engineId: engineId.trim(),
        hours: parseInt(hours, 10),
        oilType,
        date: date.toISOString(),
        notes: notes.trim(),
      };

      await addRecord(record);

      Alert.alert('Success', 'Oil change recorded successfully!', [
        {
          text: 'OK',
          onPress: () => {
            // Reset form
            setEngineName('');
            setEngineId('');
            setHours('');
            setOilType('');
            setNotes('');
            setDate(new Date());
            // Navigate back to home
            navigation.navigate('Home');
          },
        },
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to save record: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const oilTypes = ['5W-30', '5W-40', '10W-30', '10W-40', '15W-40', 'Synthetic', 'Semi-Synthetic'];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Engine Information</Text>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Engine Name</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., Main Engine, Backup Generator"
            value={engineName}
            onChangeText={setEngineName}
            editable={!loading}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Engine ID/Serial Number</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., ENG-001"
            value={engineId}
            onChangeText={setEngineId}
            editable={!loading}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Oil Change Details</Text>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Current Engine Hours</Text>
          <View style={styles.inputWithIcon}>
            <Icon name="speedometer" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={[styles.input, styles.inputWithPadding]}
              placeholder="Enter current hours"
              value={hours}
              onChangeText={setHours}
              keyboardType="decimal-pad"
              editable={!loading}
            />
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Oil Type</Text>
          <View style={styles.oilTypeContainer}>
            {oilTypes.map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.oilTypeButton,
                  oilType === type && styles.oilTypeButtonActive,
                ]}
                onPress={() => setOilType(type)}
                disabled={loading}
              >
                <Text
                  style={[
                    styles.oilTypeButtonText,
                    oilType === type && styles.oilTypeButtonTextActive,
                  ]}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Date of Change</Text>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowDatePicker(true)}
            disabled={loading}
          >
            <Icon name="calendar" size={20} color="#007AFF" />
            <Text style={styles.dateButtonText}>
              {date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </Text>
          </TouchableOpacity>
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="spinner"
            onChange={handleDateChange}
          />
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Additional Notes</Text>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Notes (Optional)</Text>
          <TextInput
            style={[styles.input, styles.textarea]}
            placeholder="Add any additional notes about the oil change..."
            value={notes}
            onChangeText={setNotes}
            multiline
            numberOfLines={4}
            editable={!loading}
            textAlignVertical="top"
          />
        </View>
      </View>

      <TouchableOpacity
        style={[styles.submitButton, loading && styles.submitButtonDisabled]}
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <>
            <Icon name="check-circle" size={20} color="white" />
            <Text style={styles.submitButtonText}>Record Oil Change</Text>
          </>
        )}
      </TouchableOpacity>

      <View style={styles.spacer} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  section: {
    backgroundColor: 'white',
    marginVertical: 10,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#333',
    backgroundColor: '#fff',
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputIcon: {
    position: 'absolute',
    left: 12,
    zIndex: 1,
  },
  inputWithPadding: {
    paddingLeft: 40,
  },
  textarea: {
    height: 100,
    textAlignVertical: 'top',
  },
  oilTypeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  oilTypeButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#fff',
  },
  oilTypeButtonActive: {
    borderColor: '#007AFF',
    backgroundColor: '#E3F2FD',
  },
  oilTypeButtonText: {
    color: '#666',
    fontSize: 12,
    fontWeight: '500',
  },
  oilTypeButtonTextActive: {
    color: '#007AFF',
    fontWeight: '600',
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  dateButtonText: {
    color: '#333',
    fontSize: 14,
    marginLeft: 10,
    flex: 1,
  },
  submitButton: {
    flexDirection: 'row',
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 20,
    elevation: 3,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
  spacer: {
    height: 20,
  },
});

export default RecordScreen;
