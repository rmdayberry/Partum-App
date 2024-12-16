const MorePage = ({ navigation }) => {
  const { setUserId, languagePreference } = useContext(UserContext);

  const t = translations[languagePreference || "English"];

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("userId");
      await AsyncStorage.removeItem("languagePreference");
      setUserId(null); // Reset user context
      Alert.alert(t.logout, t.logoutMessage);
      navigation.replace("Login");
    } catch (error) {
      console.error("Logout error:", error);
      Alert.alert(t.error, t.errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t.title}</Text>
      <Button title={t.logout} onPress={handleLogout} />
    </View>
  );
};
export default MorePage;
