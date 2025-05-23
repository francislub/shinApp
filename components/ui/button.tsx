"use client"

import type React from "react"
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, type ViewStyle, type TextStyle } from "react-native"
import { useTheme } from "@/context/theme-context"

interface ButtonProps {
  onPress: () => void
  children: React.ReactNode
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive"
  size?: "sm" | "md" | "lg"
  loading?: boolean
  disabled?: boolean
  style?: ViewStyle
  textStyle?: TextStyle
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export function Button({
  onPress,
  children,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  style,
  textStyle,
  leftIcon,
  rightIcon,
}: ButtonProps) {
  const { theme } = useTheme()

  const getBackgroundColor = () => {
    if (disabled) return theme.colors.disabled

    switch (variant) {
      case "primary":
        return theme.colors.primary
      case "secondary":
        return theme.colors.secondary
      case "outline":
      case "ghost":
        return "transparent"
      case "destructive":
        return theme.colors.destructive
      default:
        return theme.colors.primary
    }
  }

  const getTextColor = () => {
    if (disabled) return theme.colors.disabledText

    switch (variant) {
      case "primary":
      case "secondary":
      case "destructive":
        return "white"
      case "outline":
        return theme.colors.primary
      case "ghost":
        return theme.colors.text
      default:
        return "white"
    }
  }

  const getBorderColor = () => {
    if (disabled) return theme.colors.disabled

    switch (variant) {
      case "outline":
        return theme.colors.primary
      default:
        return "transparent"
    }
  }

  const getPadding = () => {
    switch (size) {
      case "sm":
        return { paddingVertical: 8, paddingHorizontal: 12 }
      case "md":
        return { paddingVertical: 12, paddingHorizontal: 16 }
      case "lg":
        return { paddingVertical: 16, paddingHorizontal: 24 }
      default:
        return { paddingVertical: 12, paddingHorizontal: 16 }
    }
  }

  const getFontSize = () => {
    switch (size) {
      case "sm":
        return 14
      case "md":
        return 16
      case "lg":
        return 18
      default:
        return 16
    }
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button,
        {
          backgroundColor: getBackgroundColor(),
          borderColor: getBorderColor(),
          borderWidth: variant === "outline" ? 1 : 0,
          ...getPadding(),
        },
        style,
      ]}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} size="small" />
      ) : (
        <>
          {leftIcon && <>{leftIcon}</>}
          <Text
            style={[
              styles.text,
              {
                color: getTextColor(),
                fontSize: getFontSize(),
                marginLeft: leftIcon ? 8 : 0,
                marginRight: rightIcon ? 8 : 0,
              },
              textStyle,
            ]}
          >
            {children}
          </Text>
          {rightIcon && <>{rightIcon}</>}
        </>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  text: {
    fontFamily: "Inter-Medium",
    textAlign: "center",
  },
})
