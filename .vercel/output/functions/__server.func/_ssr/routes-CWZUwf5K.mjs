import { i as __toESM } from "../_runtime.mjs";
import { a as groups, i as exams, n as cards } from "./data-DRf41Iny.mjs";
import { S as require_jsx_runtime, Y as require_react, b as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Headphones, c as BookOpen, r as RotateCcw } from "../_libs/lucide-react.mjs";
import { n as loadProgress, t as clearProgress } from "./progress-DH-VT4V6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CWZUwf5K.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function HomeView() {
	const navigate = useNavigate();
	const [progress, setProgress] = (0, import_react.useState)({});
	const [group, setGroup] = (0, import_react.useState)("全部");
	(0, import_react.useEffect)(() => {
		setProgress(loadProgress());
	}, []);
	const stats = (0, import_react.useMemo)(() => {
		const rows = Object.values(progress);
		return {
			attempted: rows.length,
			ratio: rows.length === 0 ? 0 : rows.reduce((sum, row) => sum + row.best / row.total, 0) / rows.length,
			wrong: rows.reduce((sum, row) => sum + row.wrong.length, 0)
		};
	}, [progress]);
	const visibleExams = exams.filter((set) => group === "全部" || set.group === group);
	const visibleCards = cards.filter((set) => group === "全部" || set.group === group);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto w-full max-w-5xl px-4 pb-16 pt-8 sm:px-6 sm:pt-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "max-w-2xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-semibold tracking-widest text-primary uppercase",
						children: "Hörverstehen 1"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 font-display text-5xl font-medium tracking-tight text-ink sm:text-6xl",
						children: "HörRaum"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 max-w-xl text-lg leading-relaxed text-muted",
						children: "八个人，各自说一通。你要选出每人真正的立场。先读原文，再对概括句，交卷后对答案。"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8 grid grid-cols-3 gap-3 sm:max-w-lg",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "练过",
						value: String(stats.attempted),
						hint: `共 ${exams.length} 套可模考`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "最好均分",
						value: stats.attempted ? `${Math.round(stats.ratio * 100)}%` : "—",
						hint: "按各套最高分"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "还没收拾的错题",
						value: String(stats.wrong),
						hint: "留在每套里"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex flex-wrap items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "inline-flex h-11 items-center gap-2 rounded-full bg-primary px-4 text-sm font-semibold text-primary-fg",
					onClick: () => {
						const pick = exams[Math.floor(Math.random() * exams.length)];
						navigate({
							to: "/exam/$setId",
							params: { setId: pick.id }
						});
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Headphones, {
						className: "size-4",
						"aria-hidden": true
					}), "随机一套"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "inline-flex h-11 items-center gap-2 rounded-full px-3 text-sm font-semibold text-muted",
					onClick: () => {
						clearProgress();
						setProgress({});
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, {
						className: "size-4",
						"aria-hidden": true
					}), "清空记录"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 flex gap-2 overflow-x-auto no-scrollbar",
				children: ["全部", ...groups].map((item) => {
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setGroup(item),
						className: `h-10 shrink-0 rounded-full px-4 text-sm font-semibold ${group === item ? "bg-ink text-paper" : "bg-paper text-muted ring-1 ring-line"}`,
						children: item
					}, item);
				})
			}),
			visibleExams.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl text-ink",
						children: "可以模考"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: "有原文，也有对应的概括句。八句都要用上，这批题没有多出来的干扰项。"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 grid gap-3 sm:grid-cols-2",
						children: visibleExams.map((set) => {
							const row = progress[set.id];
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/exam/$setId",
								params: { setId: set.id },
								className: "flex h-full flex-col rounded-2xl bg-paper p-4 ring-1 ring-line transition-colors hover:ring-primary",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-start justify-between gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs font-semibold tracking-wide text-primary uppercase",
												children: set.group
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
												className: "mt-1 font-display text-2xl leading-tight text-ink",
												children: set.title
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-sm text-muted",
												children: set.titleZh
											})
										] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScoreMark, { row })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-3 text-sm leading-relaxed text-muted",
										children: set.blurb
									}),
									row && row.wrong.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-3 text-sm font-semibold text-accent",
										children: [
											"上次还有 ",
											row.wrong.length,
											" 人没对上"
										]
									})
								]
							}) }, set.id);
						})
					})
				]
			}),
			visibleCards.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl text-ink",
						children: "只有选项，先精读"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: "这些新题笔记里没有说话人原文，不能诚实计分。先把概括句读到能立刻反应。"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 grid gap-3 sm:grid-cols-2",
						children: visibleCards.map((set) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/karten/$setId",
							params: { setId: set.id },
							className: "flex h-full gap-3 rounded-2xl bg-paper p-4 ring-1 ring-line transition-colors hover:ring-primary",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, {
								className: "mt-1 size-5 shrink-0 text-primary",
								"aria-hidden": true
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-semibold tracking-wide text-primary uppercase",
									children: set.group
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-1 font-display text-2xl leading-tight text-ink",
									children: set.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm text-muted",
									children: [
										set.titleZh,
										" · ",
										set.cards.length,
										" 句"
									]
								})
							] })]
						}) }, set.id))
					})
				]
			})
		]
	});
}
function Stat({ label, value, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl bg-paper px-3 py-3 ring-1 ring-line",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-semibold text-muted",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 font-display text-3xl tabular-nums text-ink",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted",
				children: hint
			})
		]
	});
}
function ScoreMark({ row }) {
	if (!row) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "rounded-full bg-deep px-2.5 py-1 text-xs font-semibold text-muted",
		children: "未练"
	});
	const good = row.best >= row.total - 1;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: `rounded-full px-2.5 py-1 text-xs font-semibold tabular-nums ${good ? "bg-good-bg text-good" : "bg-mark text-ink"}`,
		children: [
			"最高 ",
			row.best,
			"/",
			row.total
		]
	});
}
var SplitComponent = HomeView;
//#endregion
export { SplitComponent as component };
