import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import type { applicantType } from "../../types/UserType";

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: "#FFFFFF",
    fontSize: 12,
    fontFamily: "Helvetica",
  },
  header: {
    marginBottom: 20,
    textAlign: "center",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
  },
  contactInfo: {
    marginTop: 5,
    fontSize: 12,
    color: "gray",
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    borderBottom: "1px solid #ccc",
    paddingBottom: 3,
  },
  text: {
    marginBottom: 4,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    margin: "auto",
    marginBottom: 10,
  },
});

// Resume Document Component { data }: { data: applicantType }
export const MyDocument = ({ data }: { data?: applicantType }) => (
  <Document
    style={{
      width: "full",
      height: "full",
    }}
  >
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        {/* Image */}
        <Image style={styles.image} src={data?.aImage} />
        {/* name and email */}
        <Text style={styles.name}>{data?.fullName}</Text>
        <Text style={styles.contactInfo}>
          {data?.email} | {data?.aLocation}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.text}>{data?.aAbout}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Experience</Text>
        <Text style={styles.text}>{data?.aExperience}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Qualifications</Text>
        <Text style={styles.text}>{data?.aQualifications}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Skills</Text>
        <Text style={styles.text}>{data?.aSkills}</Text>
      </View>
    </Page>
  </Document>
);
