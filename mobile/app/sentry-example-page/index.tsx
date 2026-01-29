import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert, SafeAreaView } from "react-native";
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

export default function SentryExamplePage() {
  const [hasSentError, setHasSentError] = useState(false);
  const [isConnected, setIsConnected] = useState(true);

  // Simulating connectivity check
  useEffect(() => {
    // In a real app this would check network status
    console.log("Checking connectivity...");
  }, []);

  const throwError = async () => {
    try {
      console.log("Simulating Sentry Error...");
      // Simulate API call failure or error
      // In a real app: Sentry.captureException(...)

      // Simulate "throw" for UI feedback
      setHasSentError(true);
      Alert.alert("Simulated Error", "Error would be sent to Sentry in production.");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white justify-center items-center px-4">
      <StatusBar style="dark" />

      <View className="items-center max-w-lg w-full">
        {/* Logo Replacement */}
        <View className="mb-8 p-4 bg-gray-100 rounded-full">
          <MaterialIcons name="bug-report" size={60} color="#333" />
        </View>

        <View className="bg-[#18142308] px-2 rounded mb-6">
          <Text className="font-mono text-xl text-center">sentry-example-page</Text>
        </View>

        <Text className="text-gray-600 text-center text-lg mb-8 leading-relaxed max-w-xs">
          Click the button below to simulate an error capture. (Sentry not yet configured on mobile)
        </Text>

        <TouchableOpacity
          onPress={throwError}
          disabled={!isConnected}
          className={`rounded-lg bg-[#553DB8] w-full items-center justify-center mb-6 mt-2 relative overflow-hidden ${!isConnected ? 'opacity-60' : ''}`}
          style={{ height: 60 }}
        >
          <View className={`w-full h-full items-center justify-center bg-[#7553FF] absolute top-[-4px] border border-[#553DB8] rounded-lg active:top-0 transition-all`}>
            <Text className="text-white text-lg font-bold">Throw Sample Error</Text>
          </View>
        </TouchableOpacity>

        {hasSentError ? (
          <View className="bg-[#00F261] border border-[#00BF4D] px-4 py-3 rounded-lg w-full">
            <Text className="text-[#181423] text-lg text-center font-bold">Error sent to Sentry (Simulated).</Text>
          </View>
        ) : !isConnected ? (
          <View className="bg-[#E50045] border border-[#A80033] px-4 py-3 rounded-lg w-full">
            <Text className="text-white text-center">Network connectivity issue simulated.</Text>
          </View>
        ) : (
          <View style={{ height: 46 }} />
        )}
      </View>
    </SafeAreaView>
  );
}
