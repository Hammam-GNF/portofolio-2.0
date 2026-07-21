const PRESENCE_API_URL = "http://localhost:3001/api/presence";

class PresenceService {
  async getPresence() {
    const response = await fetch(PRESENCE_API_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch presence");
    }

    const data = await response.json();

    return this.normalize(data.activities || []);
  }


  normalize(activities) {
    return activities
      .slice(0, 2)
      .map((activity, index) => {

        if (activity.type === "spotify") {
          return {
            key: `spotify-${index}`,
            title: activity.title,
            subtitle: activity.artist,
            image: activity.image,
            type: "spotify",
            icon: "spotify",
            iconImage: activity.iconImage || null
          };
        }


        if (activity.type === "coding") {
          return {
            key: `coding-${index}`,
            title: activity.details || "Coding",
            subtitle: activity.state || activity.app,
            type: "coding",
            icon: "vscode",
            iconImage: activity.iconImage || null
          };
        }


        return {
          key: `activity-${index}`,
          title: activity.name || "Playing a Game",
          subtitle: activity.state || activity.type,
          type: activity.type || "unknown",
          icon: "gaming",
          iconImage: activity.iconImage || null
        };
      });
  }
}

export default new PresenceService();
