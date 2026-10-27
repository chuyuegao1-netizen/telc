//#region node_modules/.nitro/vite/services/ssr/assets/progress-DH-VT4V6.js
var KEY = "hoerraum-progress-v1";
function read() {
	if (typeof window === "undefined") return {};
	try {
		const raw = localStorage.getItem(KEY);
		return raw ? JSON.parse(raw) : {};
	} catch {
		return {};
	}
}
function write(data) {
	localStorage.setItem(KEY, JSON.stringify(data));
}
function loadProgress() {
	return read();
}
function saveFullAttempt(setId, correct, total, wrong) {
	const all = read();
	const prev = all[setId];
	all[setId] = {
		best: Math.max(prev?.best ?? 0, correct),
		total,
		attempts: (prev?.attempts ?? 0) + 1,
		last: correct,
		wrong
	};
	write(all);
	return all[setId];
}
/** Update the wrong-list after a partial redo. Does not change the best score. */
function patchWrong(setId, practiced, stillWrong) {
	const all = read();
	const prev = all[setId];
	if (!prev) return;
	const next = new Set(prev.wrong);
	const still = new Set(stillWrong);
	for (const n of practiced) if (still.has(n)) next.add(n);
	else next.delete(n);
	all[setId] = {
		...prev,
		wrong: [...next].sort((a, b) => a - b)
	};
	write(all);
}
function clearProgress() {
	localStorage.removeItem(KEY);
}
//#endregion
export { saveFullAttempt as i, loadProgress as n, patchWrong as r, clearProgress as t };
