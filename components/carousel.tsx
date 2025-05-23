"use client"

import { useState, useRef } from "react"
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from "react-native"
import Animated, { useSharedValue, useAnimatedScrollHandler } from "react-native-reanimated"
import { useTheme } from "@/context/theme-context"

const { width: SCREEN_WIDTH } = Dimensions.get("window")

interface CarouselItem {
  title: string
  subtitle: string
  image: any
}

interface CarouselProps {
  items: CarouselItem[]
}

export default function Carousel({ items }: CarouselProps) {
  const { theme } = useTheme()
  const [activeIndex, setActiveIndex] = useState(0)
  const scrollX = useSharedValue(0)
  const flatListRef = useRef<Animated.FlatList<CarouselItem>>(null)

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x
    },
  })

  const onViewableItemsChanged = ({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index)
    }
  }

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  }

  const handleDotPress = (index: number) => {
    flatListRef.current?.scrollToIndex({ index, animated: true })
  }

  const handlePrevPress = () => {
    if (activeIndex > 0) {
      flatListRef.current?.scrollToIndex({ index: activeIndex - 1, animated: true })
    }
  }

  const handleNextPress = () => {
    if (activeIndex < items.length - 1) {
      flatListRef.current?.scrollToIndex({ index: activeIndex + 1, animated: true })
    }
  }

  return (
    <View style={styles.container}>
      <Animated.FlatList
        ref={flatListRef}
        data={items}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <Image source={item.image} style={styles.image} />
            <View style={styles.overlay}>
              <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.subtitle}>{item.subtitle}</Text>
              </View>
            </View>
          </View>
        )}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        keyExtractor={(_, index) => index.toString()}
      />

      <View style={styles.controls}>
        <TouchableOpacity
          style={[styles.navButton, { backgroundColor: "rgba(0, 0, 0, 0.3)" }]}
          onPress={handlePrevPress}
        >
          <Text style={styles.navButtonText}>‹</Text>
        </TouchableOpacity>

        <View style={styles.pagination}>
          {items.map((_, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.paginationDot,
                {
                  backgroundColor: index === activeIndex ? "white" : "rgba(255, 255, 255, 0.5)",
                },
              ]}
              onPress={() => handleDotPress(index)}
            />
          ))}
        </View>

        <TouchableOpacity
          style={[styles.navButton, { backgroundColor: "rgba(0, 0, 0, 0.3)" }]}
          onPress={handleNextPress}
        >
          <Text style={styles.navButtonText}>›</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    width: SCREEN_WIDTH,
    height: "100%",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontFamily: "Inter-Bold",
    color: "white",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    fontFamily: "Inter-Medium",
    color: "white",
    textAlign: "center",
  },
  controls: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  navButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  navButtonText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
})
