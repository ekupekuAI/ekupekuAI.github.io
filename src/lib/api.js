import { useEffect, useState } from "react";

// GitHub Pages is static, so anything that needs a secret (sending mail, GitHub's
// authenticated API) runs on a small Next.js backend. Override for local dev with
// VITE_API_BASE in .env.local.
export const API_BASE = (import.meta.env.VITE_API_BASE || "https://portfolio-a5y6.vercel.app").replace(/\/$/, "");

const DAY = 24 * 60 * 60 * 1000;

/** LIVE if there's a demo; otherwise BUILDING ≤30 days, ACTIVE ≤120 days, STABLE. */
export function repoStatus({ pushedAt, hasLive, now = new Date() }) {
  if (hasLive) return "LIVE";
  if (!pushedAt) return null;
  const t = new Date(pushedAt).getTime();
  if (Number.isNaN(t)) return null;
  const days = (now.getTime() - t) / DAY;
  if (days <= 30) return "BUILDING";
  if (days <= 120) return "ACTIVE";
  return "STABLE";
}

export function relativeTime(iso, now = new Date()) {
  const days = Math.max(0, Math.floor((now.getTime() - new Date(iso).getTime()) / DAY));
  if (days === 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months === 1 ? "" : "s"} ago`;
  const years = Math.floor(days / 365);
  return `${years} year${years === 1 ? "" : "s"} ago`;
}

// One fetch per page load, shared by every component that asks.
let reposPromise = null;
let contributionsPromise = null;

function getJson(url) {
  return fetch(url)
    .then((r) => r.json())
    .then((j) => (j && j.ok ? j : null))
    .catch(() => null);
}

/** { repos, languages } from GitHub, or null while loading / when unavailable. */
export function useGithubRepos() {
  const [data, setData] = useState(null);
  useEffect(() => {
    reposPromise ||= getJson(`${API_BASE}/api/github-repos`);
    let on = true;
    reposPromise.then((j) => on && j && setData({ repos: j.repos, languages: j.languages }));
    return () => {
      on = false;
    };
  }, []);
  return data;
}

/** { totalContributions, weeks } from GitHub, or null. */
export function useGithubContributions() {
  const [data, setData] = useState(null);
  useEffect(() => {
    contributionsPromise ||= getJson(`${API_BASE}/api/github-contributions`);
    let on = true;
    contributionsPromise.then((j) => on && j && setData(j.calendar));
    return () => {
      on = false;
    };
  }, []);
  return data;
}

export async function sendContact(payload) {
  const res = await fetch(`${API_BASE}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
}
