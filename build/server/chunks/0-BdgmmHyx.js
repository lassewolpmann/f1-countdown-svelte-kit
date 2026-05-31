const flags = {
  "bahrain-grand-prix": "🇧🇭",
  "bahrain": "🇧🇭",
  "saudi-arabia-grand-prix": "🇸🇦",
  "saudi-arabia": "🇸🇦",
  "australian-grand-prix": "🇦🇺",
  "melbourne": "🇦🇺",
  "japanese-grand-prix": "🇯🇵",
  "chinese-grand-prix": "🇨🇳",
  "miami-grand-prix": "🇺🇸",
  "emilia-romagna-grand-prix": "🇮🇹",
  "emilia-romagna": "🇮🇹",
  "monaco-grand-prix": "🇲🇨",
  "monaco": "🇲🇨",
  "canadian-grand-prix": "🇨🇦",
  "spanish-grand-prix": "🇪🇸",
  "spanish": "🇪🇸",
  "austrian-grand-prix": "🇦🇹",
  "austrian": "🇦🇹",
  "british-grand-prix": "🇬🇧",
  "british": "🇬🇧",
  "hungarian-grand-prix": "🇭🇺",
  "hungarian": "🇭🇺",
  "belgian-grand-prix": "🇧🇪",
  "belgian": "🇧🇪",
  "dutch-grand-prix": "🇳🇱",
  "italian-grand-prix": "🇮🇹",
  "italian": "🇮🇹",
  "azerbaijan-grand-prix": "🇦🇿",
  "azerbaijan": "🇦🇿",
  "singapore-grand-prix": "🇸🇬",
  "us-grand-prix": "🇺🇸",
  "mexico-grand-prix": "🇲🇽",
  "brazilian-grand-prix": "🇧🇷",
  "las-vegas-grand-prix": "🇺🇸",
  "qatar-grand-prix": "🇶🇦",
  "qatar": "🇶🇦",
  "abu-dhabi-grand-prix": "🇦🇪",
  "abu-dhabi": "🇦🇪"
};
class APIData {
  seriesData = {};
  seriesOptions = ["f1", "f2", "f3", "f1-academy"];
  currentYear;
  constructor() {
    for (let series of this.seriesOptions) {
      this.seriesData[series] = {};
    }
    this.currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  }
  async getDataConfig(fetch, series) {
    const configURL = new URL("https://raw.githubusercontent.com");
    configURL.pathname = `sportstimes/f1/main/_db/${series}/config.json`;
    try {
      const res = await fetch(configURL);
      return await res.json();
    } catch (e) {
      return;
    }
  }
  async getAllRaces(fetch, series, dataConfig) {
    const apiURL = new URL("https://raw.githubusercontent.com");
    apiURL.pathname = `sportstimes/f1/main/_db/${series}/${this.currentYear}.json`;
    try {
      const res = await fetch(apiURL);
      const data = await res.json();
      let races = data["races"];
      races = races.map((race) => {
        race.name += " Grand Prix";
        let flag = flags[race.localeKey];
        if (!flag) return race;
        race.flag = flag;
        let sessions = race.sessions;
        let prettySessions = [];
        for (let session of Object.keys(sessions)) {
          let dateString = sessions[session];
          if (!dateString) continue;
          const date = new Date(dateString);
          const timestamp = date.getTime();
          const sessionLength = dataConfig.sessionLengths[session];
          if (!sessionLength) continue;
          const endTimestamp = timestamp + sessionLength * 60 * 1e3;
          const endDate = new Date(endTimestamp);
          let startDateISOString = date.toISOString();
          let endDateISOString = endDate.toISOString();
          prettySessions.push({
            startDate: date,
            endDate,
            startDateISO: startDateISOString,
            endDateISO: endDateISOString,
            startDateLocaleString: this.parseDate(startDateISOString),
            endDateLocaleString: this.parseDate(endDateISOString),
            startTimeLocaleString: this.parseTime(startDateISOString),
            endTimeLocaleString: this.parseTime(endDateISOString),
            shortName: this.shortSessionName(session),
            longName: this.longSessionName(session)
          });
        }
        race.prettySessions = prettySessions;
        return race;
      });
      return races;
    } catch (e) {
      console.error(e);
      return [];
    }
  }
  getNextRaces(allRaces) {
    let nextRaces = allRaces.filter((race) => {
      const lastSessionDate = Object.values(race.sessions).at(-1);
      const lastSessionTimestamp = lastSessionDate ? new Date(lastSessionDate).getTime() : 0;
      const currentTimestamp = (/* @__PURE__ */ new Date()).getTime();
      return lastSessionTimestamp > currentTimestamp;
    });
    if (nextRaces.length > 0) {
      return nextRaces;
    } else {
      let lastRace = allRaces.at(-1);
      return lastRace ? [lastRace] : [{}];
    }
  }
  shortSessionName = (sessionName) => {
    switch (sessionName) {
      case "fp1":
        return "FP1";
      case "fp2":
        return "FP2";
      case "fp3":
        return "FP3";
      case "practice":
        return "P";
      case "qualifying":
        return "Q";
      case "qualifying1":
        return "Q1";
      case "qualifying2":
        return "Q2";
      case "sprintQualifying":
        return "SQ";
      case "sprint":
        return "Sprint";
      case "gp":
        return "Race";
      case "feature":
        return "Feature";
      case "race1":
        return "Race 1";
      case "race2":
        return "Race 2";
      case "race3":
        return "Race 3";
      default:
        return "?";
    }
  };
  longSessionName = (sessionName) => {
    switch (sessionName) {
      case "fp1":
        return "Free Practice 1";
      case "fp2":
        return "Free Practice 2";
      case "fp3":
        return "Free Practice 3";
      case "practice":
        return "Practice";
      case "qualifying":
        return "Qualifying";
      case "qualifying1":
        return "1st Qualifying";
      case "qualifying2":
        return "2nd Qualifying";
      case "sprintQualifying":
        return "Sprint Qualifying";
      case "sprint":
        return "Sprint";
      case "gp":
        return "Race";
      case "feature":
        return "Feature";
      case "race1":
        return "1st Race";
      case "race2":
        return "2nd Race";
      case "race3":
        return "3rd Race";
      default:
        return "Undefined Session";
    }
  };
  parseDate = (date) => {
    return new Date(date).toLocaleString(void 0, {
      day: "2-digit",
      month: "2-digit",
      weekday: "short"
    });
  };
  parseTime = (date) => {
    return new Date(date).toLocaleString(void 0, {
      hour: "2-digit",
      minute: "2-digit"
    });
  };
}
const load = async ({ fetch }) => {
  const apiData = new APIData();
  for (let series of apiData.seriesOptions) {
    let seriesData = apiData.seriesData[series];
    if (!seriesData) continue;
    seriesData.dataConfig = await apiData.getDataConfig(fetch, series);
    seriesData.allRaces = await apiData.getAllRaces(fetch, series, seriesData.dataConfig);
    seriesData.nextRaces = apiData.getNextRaces(seriesData.allRaces);
    let nextRace = seriesData.nextRaces.at(0);
    seriesData.nextRace = nextRace ? nextRace : {};
    apiData.seriesData[series] = seriesData;
  }
  return {
    apiData
  };
};

var _layout_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 0;
let component_cache;
const component = async () => component_cache ??= (await import('./_layout.svelte-COoBgeNT.js')).default;
const universal_id = "src/routes/+layout.ts";
const imports = ["_app/immutable/nodes/0.CZNcPjiw.js","_app/immutable/chunks/BEJrxy7p.js","_app/immutable/chunks/CWZ4ozNx.js","_app/immutable/chunks/DAkWOuib.js","_app/immutable/chunks/G_yJPd5N.js","_app/immutable/chunks/BWeO4FPo.js","_app/immutable/chunks/Dlk4wYe4.js"];
const stylesheets = ["_app/immutable/assets/0.D7H99Ccb.css"];
const fonts = [];

export { component, fonts, imports, index, stylesheets, _layout_ts as universal, universal_id };
//# sourceMappingURL=0-BdgmmHyx.js.map
