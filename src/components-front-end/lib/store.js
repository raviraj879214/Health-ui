// lib/store.js

import fs from "fs";
import path from "path";

class GlobalStore {
  constructor() {
    this.dataDir = path.join(process.cwd(), "data");
    this.filePath = path.join(
      this.dataDir,
      "treatment-clicks.json"
    );

    this.initializeFile();
  }

  initializeFile() {
    try {
      // Create data directory
      if (!fs.existsSync(this.dataDir)) {
        fs.mkdirSync(this.dataDir, {
          recursive: true,
        });
      }

      // Create JSON file
      if (!fs.existsSync(this.filePath)) {
        fs.writeFileSync(
          this.filePath,
          JSON.stringify({}, null, 2),
          "utf8"
        );
      }
    } catch (error) {
      console.error(
        "Error initializing treatment-clicks file:",
        error
      );
    }
  }

  loadData() {
    try {
      if (!fs.existsSync(this.filePath)) {
        return {};
      }

      const data = fs.readFileSync(
        this.filePath,
        "utf8"
      );

      return data ? JSON.parse(data) : {};
    } catch (error) {
      console.error(
        "Error reading clicks file:",
        error
      );

      return {};
    }
  }

  saveData(data) {
    try {
      fs.writeFileSync(
        this.filePath,
        JSON.stringify(data, null, 2),
        "utf8"
      );
    } catch (error) {
      console.error(
        "Error saving clicks file:",
        error
      );
    }
  }

  incrementTreatment(name) {
    const treatmentClicks = this.loadData();

    treatmentClicks[name] =
      (treatmentClicks[name] || 0) + 1;

    this.saveData(treatmentClicks);

    return treatmentClicks[name];
  }

  getTreatmentCount(name) {
    const treatmentClicks = this.loadData();

    return treatmentClicks[name] || 0;
  }

  getAllTreatmentCounts() {
    const treatmentClicks = this.loadData();

    return Object.entries(treatmentClicks)
      .map(([name, count]) => ({
        name,
        count,
      }))
      .sort((a, b) => b.count - a.count);
  }

  resetCounts() {
    this.saveData({});
  }
}

const store = new GlobalStore();

export default store;