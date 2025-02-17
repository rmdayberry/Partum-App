const AppointmentContainer = () => {
  const { userId } = useContext(UserContext); // Get userId from context
  const [nextAppointment, setNextAppointment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNextAppointment = async () => {
      try {
        const appointment = await fetchNextAppointment(userId);
        setNextAppointment(appointment);
      } catch (error) {
        console.error("Error fetching next appointment:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      loadNextAppointment();
    }
  }, [userId]);

  const handleGetDirections = () => {
    if (nextAppointment?.location) {
      const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        nextAppointment.location
      )}`;
      Linking.openURL(url).catch(() => alert("Error opening maps"));
    }
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (!nextAppointment) {
    return (
      <Text style={styles.noAppointmentText}>No upcoming appointments</Text>
    );
  }

  // Format the date with the day of the week
  const formattedDate = new Date(nextAppointment.date).toLocaleDateString(
    "en-US",
    {
      weekday: "long", // Full day name (e.g., "Monday")
      month: "long", // Full month name (e.g., "January")
      day: "numeric", // Day of the month (e.g., "12")
    }
  );
  const formattedTime = nextAppointment.time;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Upcoming Appointments</Text>
      <View style={styles.detailsContainer}>
        <Text style={styles.date}>{formattedDate}</Text>
        <Text style={styles.time}>{formattedTime}</Text>
        <View style={styles.locationContainer}>
          <Image
            style={styles.icon}
            source={require("../../assets/locationIcon.png")}
          />
          <Text style={styles.clinicName}>{nextAppointment.location}</Text>
        </View>
        <Text style={styles.notes}>
          {nextAppointment.notes || "No notes available"}
        </Text>
      </View>
      <View style={styles.actionsContainer}>
        <Pressable style={styles.button} onPress={handleGetDirections}>
          <Text style={styles.buttonText}>Get Directions</Text>
        </Pressable>
      </View>
    </View>
  );
};
