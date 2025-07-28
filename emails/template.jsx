import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

const styles = {
  body: {
    backgroundColor: "#000000",
    fontFamily: "-apple-system, sans-serif",
  },
  container: {
    backgroundColor: "#1a1a1a",
    margin: "0 auto",
    padding: "20px",
    borderRadius: "5px",
    boxShadow: "0 2px 6px rgba(255, 215, 0, 0.3)",
  },
  title: {
    color: "#FFD700",
    fontSize: "32px",
    fontWeight: "bold",
    textAlign: "center",
    margin: "0 0 20px",
  },
  texts: {
    color: "#FF0000",
    fontSize: "16px",
    margin: "0 0 16px",
  },
  heading: {
    color: "#ffffff",
    fontSize: "20px",
    fontWeight: "600",
    margin: "0 0 16px",
  },
  text: {
    color: "#FFD700",
    fontSize: "16px",
    margin: "0 0 16px",
  },
  statsContainer: {
    margin: "32px 0",
    padding: "20px",
    backgroundColor: "#111111",
    borderRadius: "5px",
  },
  stat: {
    marginBottom: "16px",
    padding: "12px",
    backgroundColor: "#1a1a1a",
    borderRadius: "4px",
    boxShadow: "0 1px 3px rgba(255, 215, 0, 0.2)",
  },
};

export default function EmailTemplate({
  userName = "",
  type = "budget-alert",
  data = {},
}) {
  if (type === "monthly-report") return null;

  if (type === "budget-alert") {
    const percentageUsed = Number(data?.percentageUsed || 0).toFixed(1);
    const budgetAmount = Number(data?.budgetAmount || 0).toFixed(1);
    const totalExpenses = Number(data?.totalExpenses || 0).toFixed(1);
    const remaining = (data?.budgetAmount || 0) - (data?.totalExpenses || 0);
    const remainingFormatted = Number(remaining).toFixed(1);

    return (
      <Html>
        <Head />
        <Preview>Budget Alert</Preview>
        <Body style={styles.body}>
          <Container style={styles.container}>
            <Heading style={styles.title}>Budget Alert</Heading>
            <Text style={styles.text}>Hello {userName},</Text>
            <Text style={styles.texts}>
              You’ve used {percentageUsed}% of your monthly budget.
            </Text>
            <Section style={styles.statsContainer}>
              <div style={styles.stat}>
                <Text style={styles.text}>Budget Amount</Text>
                <Text style={styles.heading}>${budgetAmount}</Text>
              </div>
              <div style={styles.stat}>
                <Text style={styles.text}>Spent So Far</Text>
                <Text style={styles.heading}>${totalExpenses}</Text>
              </div>
              <div style={styles.stat}>
                <Text style={styles.text}>Remaining</Text>
                <Text style={styles.heading}>${remainingFormatted}</Text>
              </div>
            </Section>
          </Container>
        </Body>
      </Html>
    );
  }

  return null;
}
