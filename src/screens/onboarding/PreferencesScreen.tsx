import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
} from 'react-native';

const PROPERTY_TYPES = [
  {
    id: 'single',
    label: 'Single Family',
    image: require('../../../assets/images/singlefamily.png'),
  },
  {
    id: 'condo',
    label: 'Condo',
    image: require('../../../assets/images/singlefamily.png'),
  },
  {
    id: 'townhouse',
    label: 'Townhouse',
    image: require('../../../assets/images/singlefamily.png'),
  },
  {
    id: 'multi',
    label: 'Multi Family',
    image: require('../../../assets/images/singlefamily.png'),
  },
];

const GoalsScreen = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null);

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <Text style={styles.title}>
            Tell us a little more about what you’re looking for.
          </Text>

          <Text style={styles.sectionTitle}>Price range</Text>

          <View style={styles.priceRow}>
            <View style={styles.dropdown}>
              <Text style={styles.dropdownText}>Minimum</Text>
            </View>
            <View style={styles.dropdown}>
              <Text style={styles.dropdownText}>Maximum</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Property type</Text>

          <View style={styles.grid}>
            {PROPERTY_TYPES.map((item) => {
              const isSelected = selectedType === item.id;

              return (
                <TouchableOpacity
                  key={item.id}
                  activeOpacity={0.8}
                  onPress={() => setSelectedType(item.id)}
                  style={[
                    styles.propertyCard,
                    isSelected && styles.propertyCardSelected,
                  ]}
                >
                  <Image
                    source={item.image}
                    style={styles.propertyImage}
                    resizeMode="contain"
                  />

                  <Text
                    style={[
                      styles.propertyText,
                      isSelected && styles.propertyTextSelected,
                    ]}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>

        <TouchableOpacity style={styles.continueButton}>
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default GoalsScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F4F4F4',
  },

  container: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 120,
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    marginTop: 30,
    marginBottom: 30,
    lineHeight: 36,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
  },

  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },

  dropdown: {
    width: '48%',
    height: 60,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#FFF',
  },

  dropdownText: {
    fontSize: 16,
    color: '#888',
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  propertyCard: {
    width: '48%',
    height: 160,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    backgroundColor: '#FFF',
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },

  propertyCardSelected: {
    backgroundColor: '#000',
    borderWidth: 0,
  },

  propertyImage: {
    width: 100,
    height: 70,
    marginBottom: 12,
  },

  propertyText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
  },

  propertyTextSelected: {
    color: '#FFF',
  },

  continueButton: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#1A4DFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  continueText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
});