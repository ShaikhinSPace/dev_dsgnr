/**
 * Represents details about an app in an app store.
 */
export interface AppDetails {
  /**
   * The name of the app.
   */
  appName: string;
  /**
   * The number of users (downloads, installs, etc.).
   */
  userBase: number;
  /**
   * A description of what you did on the application
   */
  contributionDetails: string;
}

// Mock data store
const mockAppDetails: Record<string, Omit<AppDetails, 'appName'>> = {
  "Nagarik App": {
    userBase: 5000000,
    contributionDetails: "Led the development of the core authentication module and integrated various government services APIs. Focused on performance optimization and security enhancements.",
  },
  "Ambition Guru": {
    userBase: 150000,
    contributionDetails: "Developed the video streaming feature and offline download functionality. Implemented interactive quiz modules and real-time progress tracking.",
  },
  "National Path Labs": {
    userBase: 50000,
    contributionDetails: "Built the appointment booking system and integrated online payment gateways. Developed features for viewing lab reports and managing user profiles securely.",
  },
  "CPN UML App": {
    userBase: 100000,
    contributionDetails: "Created the news feed and event notification system. Implemented features for membership management and internal communication.",
  },
  "Budhanilkantha Municipality": {
    userBase: 20000,
    contributionDetails: "Developed modules for citizen reporting, online tax payment, and accessing municipal notices. Focused on user-friendly UI/UX for diverse user groups.",
  },
  "Kathmandu Metropolitan City": {
    userBase: 300000,
    contributionDetails: "Contributed to the development of the public service directory and complaint lodging system. Integrated mapping features for locating city resources.",
  },
  "Default App": { // Fallback
    userBase: 10000,
    contributionDetails: "Developed key features and optimized performance for various modules.",
  }
};


/**
 * Asynchronously retrieves app details from an app store (mock implementation).
 * Simulates an API call delay.
 *
 * @param appName The name of the app to retrieve details for.
 * @returns A promise that resolves to an AppDetails object.
 */
export async function getAppDetails(appName: string): Promise<AppDetails> {
  console.log(`Fetching details for: ${appName}`); // Log which app is being fetched

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 500)); // 500ms to 1500ms delay

  const details = mockAppDetails[appName] || mockAppDetails["Default App"];

  if (!details) {
    // This should technically not happen with the default fallback, but good practice
    throw new Error(`Details not found for app: ${appName}`);
  }

  return {
    appName: appName,
    ...details,
  };
}
