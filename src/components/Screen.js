import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '../theme';

/** Container base de tela: safe area + cor de fundo do tema. */
export default function Screen({ children, style, edges = ['top'], padded = false }) {
  const theme = useTheme();
  return (
    <SafeAreaView edges={edges} style={[styles.flex, { backgroundColor: theme.bg }]}>
      <StatusBar style={theme.mode === 'dark' ? 'light' : 'dark'} />
      <View style={[styles.flex, padded && { paddingHorizontal: theme.spacing(5) }, style]}>
        {children}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({ flex: { flex: 1 } });
