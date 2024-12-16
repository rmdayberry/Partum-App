const HomeTabs = ({ userId }) => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === "Home") {
          iconName = focused ? "home" : "home-outline";
        } else if (route.name === "Appointments") {
          iconName = focused ? "calendar" : "calendar-outline";
        } else if (route.name === "Learn") {
          iconName = focused ? "book" : "book-outline";
        } else if (route.name === "More") {
          iconName = focused
            ? "ellipsis-horizontal"
            : "ellipsis-horizontal-outline";
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: "#007Aff",
      tabBarInactiveTintColor: "gray",
      tabBarStyle: { backgroundColor: "#fff" },
    })}
  >
    <Tab.Screen name="Home">
      {() => <DashboardStack userId={userId} />}
    </Tab.Screen>
    <Tab.Screen name="Appointments" component={AppointmentsStack} />
    <Tab.Screen name="Learn" component={EducationStack} />
    <Tab.Screen name="More" component={MoreStack} />
  </Tab.Navigator>
);

const App = () => {
  const [fontsLoaded, setFontsLoaded] = React.useState(false);
  const [userId, setUserId] = React.useState(null);
  const [languagePreference, setLanguagePreference] = React.useState("English");

  React.useEffect(() => {
    const loadResources = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
        await fetchFonts();

        const storedUserId = await AsyncStorage.getItem("userId");
        const storedLanguagePreference = await AsyncStorage.getItem(
          "languagePreference"
        );

        if (storedUserId) setUserId(storedUserId);
        if (storedLanguagePreference)
          setLanguagePreference(storedLanguagePreference);

        setFontsLoaded(true);
        await SplashScreen.hideAsync();
      } catch (error) {
        console.warn("Error loading resources:", error);
      }
    };
    loadResources();
  }, []);

  if (!fontsLoaded) {
    return null; // Show nothing while fonts are being loaded
  }

  return (
    <UserContext.Provider
      value={{
        userId,
        setUserId,
        languagePreference,
        setLanguagePreference,
      }}
    >
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {userId ? (
            <Stack.Screen name="HomeTabs">
              {() => <HomeTabs userId={userId} />}
            </Stack.Screen>
          ) : (
            <>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Registration" component={Registration} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
};

export default App;
