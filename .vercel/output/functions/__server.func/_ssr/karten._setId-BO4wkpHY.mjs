import { i as __toESM } from "../_runtime.mjs";
import { S as require_jsx_runtime, Y as require_react, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as ArrowRight, n as Shuffle, u as ArrowLeft } from "../_libs/lucide-react.mjs";
import { n as Route } from "./router-D7Vs_JXx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/karten._setId-BO4wkpHY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function shuffle(list) {
	const next = [...list];
	for (let i = next.length - 1; i > 0; i -= 1) {
		const j = Math.floor(Math.random() * (i + 1));
		[next[i], next[j]] = [next[j], next[i]];
	}
	return next;
}
function CardsView({ set }) {
	const [order, setOrder] = (0, import_react.useState)(() => set.cards.map((_, index) => index));
	const [cursor, setCursor] = (0, import_react.useState)(0);
	const [face, setFace] = (0, import_react.useState)("de");
	const [known, setKnown] = (0, import_react.useState)({});
	const card = set.cards[order[cursor]];
	const knownCount = (0, import_react.useMemo)(() => Object.values(known).filter(Boolean).length, [known]);
	function go(next) {
		setCursor((next + order.length) % order.length);
		setFace("de");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto flex min-h-screen w-full max-w-xl flex-col px-4 pb-10 pt-5 sm:px-6 sm:pt-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/",
				className: "inline-flex h-10 items-center gap-1 text-sm font-semibold text-muted",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {
					className: "size-4",
					"aria-hidden": true
				}), "题库"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-xs font-semibold tracking-widest text-primary uppercase",
				children: set.group
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-4xl text-ink",
				children: set.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-muted",
				children: set.titleZh
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm leading-relaxed text-muted",
				children: set.note
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex items-center justify-between text-sm font-semibold text-muted",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "tabular-nums",
					children: [
						cursor + 1,
						"/",
						order.length
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "tabular-nums",
					children: ["认下来 ", knownCount]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => setFace((value) => value === "de" ? "zh" : "de"),
				className: "mt-3 flex min-h-72 flex-col rounded-3xl bg-paper p-5 text-left ring-1 ring-line",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-xs font-semibold tracking-widest text-primary uppercase",
						children: [
							face === "de" ? "德文" : "提示",
							card.trap ? " · 干扰项" : "",
							card.usedAs ? ` · 笔记里的第 ${card.usedAs} 人` : ""
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						lang: face === "de" ? "de" : "zh-Hans",
						className: "mt-4 font-display text-2xl leading-snug text-ink",
						children: face === "de" ? card.de : card.zh || "这句笔记里没有中文。试着自己用一句话概括。"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-auto pt-8 text-sm font-semibold text-muted",
						children: "点卡片翻面"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid grid-cols-2 gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "h-12 rounded-full bg-paper text-sm font-semibold text-ink ring-1 ring-line",
					onClick: () => {
						setKnown((prev) => ({
							...prev,
							[order[cursor]]: false
						}));
						go(cursor + 1);
					},
					children: "还没稳"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "h-12 rounded-full bg-primary text-sm font-semibold text-primary-fg",
					onClick: () => {
						setKnown((prev) => ({
							...prev,
							[order[cursor]]: true
						}));
						go(cursor + 1);
					},
					children: "这句懂了"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex items-center justify-between",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => go(cursor - 1),
						className: "inline-flex h-11 items-center gap-1 text-sm font-semibold text-ink",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {
							className: "size-4",
							"aria-hidden": true
						}), "上一句"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "inline-flex h-11 items-center gap-1 text-sm font-semibold text-primary",
						onClick: () => {
							setOrder(shuffle(set.cards.map((_, index) => index)));
							setCursor(0);
							setFace("de");
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shuffle, {
							className: "size-4",
							"aria-hidden": true
						}), "打乱"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => go(cursor + 1),
						className: "inline-flex h-11 items-center gap-1 text-sm font-semibold text-ink",
						children: ["下一句", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
							className: "size-4",
							"aria-hidden": true
						})]
					})
				]
			})
		]
	});
}
var SplitComponent = function CardsPage() {
	const { set } = Route.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardsView, { set }, set.id);
};
//#endregion
export { SplitComponent as component };
