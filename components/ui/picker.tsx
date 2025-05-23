"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList } from "react-native"
import { useTheme } from "@/context/theme-context"
import { Feather } from "@expo/vector-icons"

interface PickerItem {
  label: string
  value: string
}

interface PickerProps {
  selectedValue: string
  onValueChange: (value: string) => void
  items: PickerItem[]
  placeholder?: string
}

export function Picker({ selectedValue, onValueChange, items, placeholder = "Select an option" }: PickerProps) {
  const { theme } = useTheme()
  const [modalVisible, setModalVisible] = useState(false)

  const selectedItem = items.find((item) => item.value === selectedValue)

  const handleSelect = (value: string) => {
    onValueChange(value)
    setModalVisible(false)
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.pickerButton,
          {
            borderColor: theme.colors.border,
            backgroundColor: theme.colors.inputBackground,
          },
        ]}
        onPress={() => setModalVisible(true)}
      >
        <Text
          style={[
            styles.pickerText,
            {
              color: selectedItem ? theme.colors.text : theme.colors.textSecondary,
            },
          ]}
        >
          {selectedItem ? selectedItem.label : placeholder}
        </Text>
        <Feather name="chevron-down" size={20} color={theme.colors.text} />
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="fade" onRequestClose={() => setModalVisible(false)}>
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setModalVisible(false)}>
          <View
            style={[
              styles.modalContent,
              {
                backgroundColor: theme.colors.cardBackground,
              },
            ]}
          >
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: theme.colors.text }]}>Select an option</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Feather name="x" size={24} color={theme.colors.text} />
              </TouchableOpacity>
            </View>
            <FlatList
              data={items}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.optionItem,
                    item.value === selectedValue && {
                      backgroundColor: theme.colors.primaryLight,
                    },
                  ]}
                  onPress={() => handleSelect(item.value)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      {
                        color: item.value === selectedValue ? theme.colors.primary : theme.colors.text,
                      },
                    ]}
                  >
                    {item.label}
                  </Text>
                  {item.value === selectedValue && <Feather name="check" size={20} color={theme.colors.primary} />}
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  pickerButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: 8,
    height: 48,
    paddingHorizontal: 12,
  },
  pickerText: {
    fontFamily: "Inter-Regular",
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    width: "100%",
    borderRadius: 12,
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.1)",
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: "Inter-SemiBold",
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.05)",
  },
  optionText: {
    fontSize: 16,
    fontFamily: "Inter-Regular",
  },
})
