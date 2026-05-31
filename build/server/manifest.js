const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["ads.txt","favicon.png","robots.txt","sitemap.xml"]),
	mimeTypes: {".txt":"text/plain",".png":"image/png",".xml":"text/xml"},
	_: {
		client: {start:"_app/immutable/entry/start.frQR81OY.js",app:"_app/immutable/entry/app.x-269gIc.js",imports:["_app/immutable/entry/start.frQR81OY.js","_app/immutable/chunks/Bh9F3YOw.js","_app/immutable/chunks/CWZ4ozNx.js","_app/immutable/chunks/m0SYZcmg.js","_app/immutable/chunks/DGvW-XZp.js","_app/immutable/entry/app.x-269gIc.js","_app/immutable/chunks/CWZ4ozNx.js","_app/immutable/chunks/Dljallfm.js","_app/immutable/chunks/BEJrxy7p.js","_app/immutable/chunks/DGvW-XZp.js","_app/immutable/chunks/DAkWOuib.js","_app/immutable/chunks/DYw8hZep.js","_app/immutable/chunks/CSGv1O-8.js","_app/immutable/chunks/m0SYZcmg.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./chunks/0-BdgmmHyx.js')),
			__memo(() => import('./chunks/1-4O7qTuQT.js')),
			__memo(() => import('./chunks/2-CCLL_RvT.js')),
			__memo(() => import('./chunks/3-BeVwDRph.js')),
			__memo(() => import('./chunks/4-B9hUFsIk.js')),
			__memo(() => import('./chunks/5-D62Aawze.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/app-privacy-policy",
				pattern: /^\/app-privacy-policy\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/privacy-policy",
				pattern: /^\/privacy-policy\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/support",
				pattern: /^\/support\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

const prerendered = new Set([]);

const base = "";

export { base, manifest, prerendered };
//# sourceMappingURL=manifest.js.map
