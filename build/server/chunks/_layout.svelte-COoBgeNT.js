import { V as head, n as attr } from './renderer-BdOvp8g4.js';
import { s as seriesName } from './parseSeriesName-D50OEYh4.js';

function Footer($$renderer) {
  $$renderer.push(`<footer class="flex-col-start gap-6 w-full max-w-6xl xl:min-w-full bg-neutral-900 px-6 py-3 rounded-xl mt-10 lg:mt-20"><div class="flex-col-start lg:flex-row gap-4 links-hover"><div class="flex-col-items-start"><span class="font-bold">Project links</span> <a href="https://github.com/lassewolpmann-org/f1-countdown-svelte-kit" target="_blank">Code</a> <a href="https://github.com/lassewolpmann-org/f1-countdown-svelte-kit/blob/main/LICENSE.md" target="_blank">License</a> <a href="mailto:support@formulacountdown.com">Contact</a> <a href="/privacy-policy">Privacy Policy</a> <a href="/app-privacy-policy">App Privacy Policy</a> <a href="/support">Support</a></div> <div class="flex-col-items-start"><span class="font-bold">Data sources</span> <a href="https://github.com/sportstimes/f1" target="_blank">sportstimes</a> <a href="https://github.com/sportstimes/f1/blob/main/LICENSE" target="_blank">License</a></div></div> <span class="text-xs text-neutral-400">Made with️ ❤️ by Lasse Wolpmann</span> <div class="text-xs text-neutral-500"><section><p>This website is unofficial and is not associated in any way with the Formula 1 companies.</p> <p>F1, FORMULA ONE, FORMULA 1, FIA FORMULA ONE WORLD CHAMPIONSHIP, GRAND PRIX and related marks are trade marks of Formula One Licensing B.V.</p></section></div></footer>`);
}
function _layout($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data, children } = $$props;
    class MetaDescription {
      metaString;
      constructor(series2, seriesData2) {
        this.metaString = `Countdown to the next ${seriesName(series2)}. Full schedule for all Sessions on the Weekend.`;
        if (!seriesData2) return;
        let nextRace = seriesData2.nextRace;
        if (Object.keys(nextRace).length === 0) return;
        const firstSessionDate = Object.values(nextRace.sessions).at(0);
        const eventYear = firstSessionDate ? new Date(firstSessionDate).getFullYear() : (/* @__PURE__ */ new Date()).getFullYear();
        let metaString = `When is the next ${seriesName(series2)} race? Countdown to the ${eventYear}`;
        const raceName = `${nextRace.name} Grand Prix. Full schedule for`;
        const sessionNames = nextRace.prettySessions.map((session) => {
          return `${session.longName} (${session.shortName})`;
        });
        metaString = metaString.concat(` ${seriesName(series2)} ${raceName} ${sessionNames.join(", ")}.`);
        this.metaString = metaString;
      }
    }
    const { apiData } = data;
    let series = "f1";
    let seriesData = apiData.seriesData[series];
    let metaDescription = new MetaDescription(series, seriesData);
    head("12qhfyh", $$renderer2, ($$renderer3) => {
      $$renderer3.push(`<meta name="apple-itunes-app" content="app-id=6472580786"/> <meta name="description"${attr("content", metaDescription.metaString)}/>`);
    });
    if (apiData) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="flex-col-center px-4 py-6 xl:px-6 xl:py-9 gap-4">`);
      children?.($$renderer2);
      $$renderer2.push(`<!----> `);
      Footer($$renderer2);
      $$renderer2.push(`<!----></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}

export { _layout as default };
//# sourceMappingURL=_layout.svelte-COoBgeNT.js.map
