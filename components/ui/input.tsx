"use client"

import type React from "react"
import { View, TextInput, StyleSheet, type TextInputProps, type ViewStyle, type TextStyle } from "react-native"
import { useTheme } from "@/context/theme-context"

interface InputProps extends TextInputProps {
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  error?: string
  containerStyle?: ViewStyle
  inputStyle?: TextStyle
}

export function Input({ leftIcon, rightIcon, error, containerStyle, inputStyle, ...props }: InputProps) {
  const { theme } = useTheme()

  return (
    <View style={[styles.container, containerStyle]}>
      <View
        style={[
          styles.inputContainer,
          {
            borderColor: error ? theme.colors.destructive : theme.colors.border,
            backgroundColor: theme.colors.inputBackground,
          },
        ]}
      >
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
        <TextInput
          style={[
            styles.input,
            {
              color: theme.colors.text,
              paddingLeft: leftIcon ? 0 : 12,
              paddingRight: rightIcon ? 0 : 12,
            },
            inputStyle,
          ]}
          placeholderTextColor={theme.colors.textSecondary}
          {...props}
        />
        {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
    height: 48,
  },
  input: {
    flex: 1,
    height: "100%",
    fontFamily: "Inter-Regular",
    fontSize: 16,
  },
  leftIcon: {
    paddingLeft: 12,
    paddingRight: 8,
  },
  rightIcon: {
    paddingRight: 12,
    paddingLeft: 8,
  },
})
