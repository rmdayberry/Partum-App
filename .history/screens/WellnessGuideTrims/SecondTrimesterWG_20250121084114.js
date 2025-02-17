const SecondTrimester = () => {
  const { userId } = useContext(UserContext);
  const [languagePreference, setLanguagePreference] = useState("English");
  const [activeTab, setActiveTab] = useState("sleep");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLanguagePreference = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5002/users/${userId}`
        );
        setLanguagePreference(response.data.languagePreference || "English");
      } catch (error) {
        console.error("Error fetching language preference:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLanguagePreference();
  }, [userId]);

  const renderContent = () => {
    const tabContent =
      translations[activeTab]?.[languagePreference] ||
      translations[activeTab]?.English ||
      {};

    const {
      heading,
      content,
      title1,
      content1,
      title2,
      content2,
      title3,
      content3,
      title4,
      content4,
      vitamins,
      avoidTitle,
      avoid,
      nuggetTitle,
      nuggetContent,
      tipsTitle,
      tips,
      bottomText,
    } = tabContent;

    return (
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Image source={topicImages[activeTab]} style={styles.image} />
        <View style={styles.card}>
          <Text style={styles.heading}>{heading || "Content Unavailable"}</Text>
          {content && <Text style={styles.content}>{content}</Text>}

          {title1 && (
            <>
              <Text style={styles.subheading}>{title1}</Text>
              {Array.isArray(content1) &&
                content1.map((item, index) => (
                  <Text key={index} style={styles.bulletPoint}>
                    • {item}
                  </Text>
                ))}
            </>
          )}

          {title2 && (
            <>
              <Text style={styles.subheading}>{title2}</Text>
              {Array.isArray(content2) &&
                content2.map((item, index) => (
                  <Text key={index} style={styles.bulletPoint}>
                    • {item}
                  </Text>
                ))}
            </>
          )}

          {vitamins && (
            <>
              <Text style={styles.subheading}>Vitamins & Supplements</Text>
              {vitamins.map((item, index) => (
                <Text key={index} style={styles.bulletPoint}>
                  • {item}
                </Text>
              ))}
            </>
          )}

          {avoidTitle && <Text style={styles.subheading}>{avoidTitle}</Text>}
          {avoid &&
            avoid.map((item, index) => (
              <Text key={index} style={styles.bulletPoint}>
                • {item}
              </Text>
            ))}

          {nuggetTitle && <Text style={styles.subheading}>{nuggetTitle}</Text>}
          {nuggetContent && <Text style={styles.content}>{nuggetContent}</Text>}

          {tipsTitle && <Text style={styles.subheading}>{tipsTitle}</Text>}
          {tips &&
            tips.map((item, index) => (
              <Text key={index} style={styles.bulletPoint}>
                • {item}
              </Text>
            ))}

          {bottomText && (
            <Text style={[styles.content, styles.bottomText]}>
              {bottomText}
            </Text>
          )}
        </View>
      </ScrollView>
    );
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#6200EE" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        style={styles.tabBar}
        contentContainerStyle={styles.tabBarContent}
      >
        {Object.keys(translations).map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={[
              styles.tabButton,
              activeTab === tab && styles.activeTabButton,
            ]}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {languagePreference === "Español"
                ? translations[tab]?.Español?.heading.split(" ")[0]
                : translations[tab]?.English?.heading.split(" ")[0]}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {renderContent()}
    </View>
  );
};
