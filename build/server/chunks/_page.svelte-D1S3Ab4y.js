import { V as head, A as ensure_array_like, G as escape_html, al as ssr_context, x as derived, n as attr, an as stringify } from './renderer-BdOvp8g4.js';
import { s as seriesName } from './parseSeriesName-D50OEYh4.js';

function onDestroy(fn) {
  /** @type {SSRContext} */
  ssr_context.r.on_destroy(fn);
}
function TimerElement($$renderer, $$props) {
  let { timeValue, timeValuePct, strokeColor } = $$props;
  let svgWidth = 300;
  let strokeWidth = 8;
  let radius = derived(() => svgWidth / 2 - strokeWidth / 2);
  let dashArray = derived(() => 2 * Math.PI * radius());
  let dashOffset = derived(() => dashArray() - dashArray() * (timeValuePct - Math.floor(timeValuePct)));
  $$renderer.push(`<div class="w-auto aspect-square relative"><span class="absolute top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4 text-2xl lg:text-4xl">${escape_html(timeValue)}</span> <svg class="w-full h-full"><circle class="fill-transparent -rotate-90 origin-center stroke-1 lg:stroke-2 [stroke-linecap:round] [transition:stroke-dashoffset_250ms_ease-in-out]" cx="50%" cy="50%"${attr("r", `${stringify(radius())}px`)}${attr("stroke", strokeColor)}${attr("stroke-dasharray", `${stringify(dashArray())}px`)}${attr("stroke-dashoffset", `${stringify(dashOffset())}px`)}></circle><circle class="fill-transparent opacity-50 stroke-0 lg:stroke-1" cx="50%" cy="50%"${attr("r", `${stringify(radius())}px`)}${attr("stroke", strokeColor)}></circle></svg></div>`);
}
function Timer($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { session, timestamp } = $$props;
    let delta = derived(() => {
      let sessionTimestamp = Math.floor(session.startDate.getTime() / 1e3);
      let delta2 = sessionTimestamp - timestamp;
      return delta2 >= 0 ? delta2 : 0;
    });
    let days = derived(() => Math.floor(delta() / 86400));
    let daysPct = derived(() => days() / 7);
    let hours = derived(() => Math.floor(delta() % 86400 / 3600));
    let hoursPct = derived(() => hours() / 24);
    let minutes = derived(() => Math.floor(delta() % 86400 % 3600 / 60));
    let minutesPct = derived(() => minutes() / 60);
    let seconds = derived(() => Math.floor(delta() % 86400 % 3600 % 60));
    let secondsPct = derived(() => seconds() / 60);
    $$renderer2.push(`<div class="flex-col-center gap-2 lg:gap-4 bg-neutral-900 rounded-xl px-4 py-2 max-w-2xl"><h1 class="text-base lg:text-2xl font-semibold self-start">${escape_html(session.longName)}</h1> <div class="grid grid-cols-4 gap-3">`);
    TimerElement($$renderer2, {
      timeValue: days(),
      timeValuePct: daysPct(),
      strokeColor: "rgb(234, 53, 19)"
    });
    $$renderer2.push(`<!----> `);
    TimerElement($$renderer2, {
      timeValue: hours(),
      timeValuePct: hoursPct(),
      strokeColor: "rgb(244, 200, 68)"
    });
    $$renderer2.push(`<!----> `);
    TimerElement($$renderer2, {
      timeValue: minutes(),
      timeValuePct: minutesPct(),
      strokeColor: "rgb(232, 232, 228)"
    });
    $$renderer2.push(`<!----> `);
    TimerElement($$renderer2, {
      timeValue: seconds(),
      timeValuePct: secondsPct(),
      strokeColor: "rgb(57, 97, 164)"
    });
    $$renderer2.push(`<!----></div> <div class="grid grid-cols-4 gap-3 w-full text-center text-xs lg:text-lg text-neutral-400"><span>days</span> <span>hours</span> <span>minutes</span> <span>seconds</span></div></div>`);
  });
}
function SessionBody($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { session } = $$props;
    $$renderer2.push(`<div class="flex-col-start w-max"><span>${escape_html(session.startDateLocaleString)}</span> <span>${escape_html(session.startTimeLocaleString)} - ${escape_html(session.endTimeLocaleString)}</span></div>`);
  });
}
function UpcomingEvent($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { event } = $$props;
    let scrollOffsetWidth = 0;
    let nippleWidth = 0;
    let currentAriaValue = 0;
    $$renderer2.push(`<div class="flex flex-col gap-2"><span class="font-semibold text-base lg:text-xl bg-neutral-900 rounded-xl px-5 py-2.5">${escape_html(event.flag)} ${escape_html(event.name)}</span> <div class="flex-row-justify-start justify-start overflow-x-auto gap-2 no-scrollbar"${attr("id", `sessions-${stringify(event.slug)}`)}><!--[-->`);
    const each_array = ensure_array_like(event.prettySessions);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let session = each_array[$$index];
      $$renderer2.push(`<div class="flex-col-start gap-1 px-5 py-2.5 bg-neutral-800 rounded-xl w-full"><span class="font-semibold w-max">${escape_html(session.longName)}</span> `);
      SessionBody($$renderer2, { session });
      $$renderer2.push(`<!----></div>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="relative w-full h-1 overflow-hidden rounded-xl cursor-grab" role="scrollbar"${attr("aria-controls", `sessions-${stringify(event.slug)}`)} aria-valuemin="0"${attr("aria-valuemax", scrollOffsetWidth - nippleWidth)}${attr("aria-valuenow", currentAriaValue)} tabindex="0"><div class="background absolute w-full h-full bg-neutral-900 rounded-xl"></div> <div class="absolute h-full bg-neutral-500 rounded-xl"></div></div></div>`);
  });
}
function UpcomingEventList($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { nextEvents } = $$props;
    $$renderer2.push(`<div class="flex flex-col w-full max-w-6xl gap-4 xl:sticky xl:top-0">`);
    if (nextEvents.length > 0) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<span class="text-xl lg:text-2xl xl:text-5xl font-medium">Upcoming Races</span> <div class="flex flex-col gap-6"><!--[-->`);
      const each_array = ensure_array_like(nextEvents);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let event = each_array[$$index];
        UpcomingEvent($$renderer2, { event });
      }
      $$renderer2.push(`<!--]--></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<p>There are no more upcoming races this year</p>`);
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
function RaceTitle($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { nextRace } = $$props;
    $$renderer2.push(`<span class="text-3xl lg:text-5xl font-medium w-full">${escape_html(nextRace.flag)} ${escape_html(nextRace.name)}</span>`);
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    const { apiData } = data;
    let currentSeries = "f1";
    let currentData = derived(() => apiData.seriesData[currentSeries]);
    let timestamp = Math.floor(Date.now() / 1e3);
    let timestampInterval = setInterval(
      () => {
        timestamp += 1;
      },
      1e3
    );
    onDestroy(() => {
      clearInterval(timestampInterval);
    });
    head("1uha8ag", $$renderer2, ($$renderer3) => {
      $$renderer3.push(`<script>window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }<\/script>`);
      $$renderer3.push(` `);
      if (currentData()) {
        $$renderer3.push("<!--[0-->");
        $$renderer3.title(($$renderer4) => {
          $$renderer4.push(`<title>${escape_html(seriesName(currentSeries))} ${escape_html(currentData().nextRace.name)} Countdown</title>`);
        });
      } else {
        $$renderer3.push("<!--[-1-->");
      }
      $$renderer3.push(`<!--]-->`);
    });
    if (apiData) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<main class="flex-col-center gap-4 w-full">`);
      $$renderer2.select(
        {
          value: currentSeries,
          class: "bg-neutral-800 border-0 rounded-xl p-2.5",
          "aria-label": "Selection of Series (F1, F2, F3, F1 Academy)",
          onchange: () => {
            plausible("Series changed", { props: { selectedSeries: currentSeries } });
          }
        },
        ($$renderer3) => {
          $$renderer3.push(`<!--[-->`);
          const each_array = ensure_array_like(apiData.seriesOptions);
          for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
            let seriesOption = each_array[$$index];
            $$renderer3.option({ value: seriesOption }, ($$renderer4) => {
              $$renderer4.push(`${escape_html(seriesName(seriesOption))}`);
            });
          }
          $$renderer3.push(`<!--]-->`);
        }
      );
      $$renderer2.push(` `);
      if (currentData() && Object.keys(currentData().nextRace).length > 0) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<div class="flex-col-center xl:flex-row-items-start w-full gap-8"><div class="flex-col-center gap-4">`);
        RaceTitle($$renderer2, { nextRace: currentData().nextRace });
        $$renderer2.push(`<!----> <!--[-->`);
        const each_array_1 = ensure_array_like(currentData().nextRace.prettySessions);
        for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
          let session = each_array_1[$$index_1];
          Timer($$renderer2, { session, timestamp });
        }
        $$renderer2.push(`<!--]--></div> `);
        UpcomingEventList($$renderer2, { nextEvents: currentData().nextRaces });
        $$renderer2.push(`<!----></div>`);
      } else {
        $$renderer2.push("<!--[-1-->");
        $$renderer2.push(`<div class="p-10"><h1>There doesn't seem to be any data available.</h1> <h2>Please come back at another time.</h2></div>`);
      }
      $$renderer2.push(`<!--]--></main>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-D1S3Ab4y.js.map
