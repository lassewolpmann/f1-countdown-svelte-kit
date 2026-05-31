import { am as store_get, G as escape_html, at as unsubscribe_stores, a7 as noop, K as getContext } from './renderer-BdOvp8g4.js';
import '@sveltejs/kit/internal';
import './root-Bo-qTtGV.js';
import '@sveltejs/kit/internal/server';

const is_legacy = noop.toString().includes("$$") || /function \w+\(\) \{\}/.test(noop.toString());
const placeholder_url = "a:";
if (is_legacy) {
  ({
    url: new URL(placeholder_url)
  });
}
const getStores = () => {
  const stores = getContext("__svelte__");
  return {
    /** @type {typeof page} */
    page: {
      subscribe: stores.page.subscribe
    },
    /** @type {typeof navigating} */
    navigating: {
      subscribe: stores.navigating.subscribe
    },
    /** @type {typeof updated} */
    updated: stores.updated
  };
};
const page = {
  subscribe(fn) {
    const store = getStores().page;
    return store.subscribe(fn);
  }
};
function _error($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    $$renderer2.push(`<div class="flex-col-items-start p-12"><h1>Whoops, something has gone wrong!</h1> `);
    if (store_get($$store_subs ??= {}, "$page", page).error) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<h2><span class="text-red-600">Error message:</span>${escape_html(store_get($$store_subs ??= {}, "$page", page).error.message)}</h2>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <h3>Until we resolve the issue, just sit back and relax.</h3></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}

export { _error as default };
//# sourceMappingURL=_error.svelte-cQfJxCgU.js.map
