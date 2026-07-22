import { useCallback, useEffect, useMemo, useState } from "react";
import { categories, menuItems } from "../data/menuData";
import { menuImages } from "../data/menuImages";
import { categoryLabels, englishMenu } from "../data/menuTranslations";

const ALL_CATEGORY = "all";
const STORAGE_KEY = "roshanAdminCredentials";

function encodeCredentials(username, password) {
  return window.btoa(`${username.trim()}:${password}`);
}

function getAuthHeaders(authToken) {
  return {
    Authorization: `Basic ${authToken}`,
  };
}

async function readResponseJson(response) {
  try {
    return await response.json();
  } catch {
    return {};
  }
}

function buildRows(prices = {}) {
  return menuItems.map((item) => {
    const englishItem = englishMenu[item.id] ?? {};
    const override = prices[String(item.id)] ?? {};
    const hasHindiPrice = Object.hasOwn(override, "hi");
    const hasEnglishPrice = Object.hasOwn(override, "en");

    return {
      id: item.id,
      category: item.category,
      image: menuImages[item.id],
      hiName: item.name,
      enName: englishItem.name ?? item.name,
      hiPrice: hasHindiPrice ? override.hi : item.price ?? "",
      enPrice: hasEnglishPrice ? override.en : englishItem.price ?? item.price ?? "",
    };
  });
}

function buildPricePayload(rows) {
  return Object.fromEntries(
    rows.map((row) => [
      String(row.id),
      {
        hi: row.hiPrice,
        en: row.enPrice,
      },
    ]),
  );
}

function rowsSignature(rows) {
  return JSON.stringify(
    rows.map((row) => ({
      id: row.id,
      hiPrice: row.hiPrice,
      enPrice: row.enPrice,
    })),
  );
}

function formatUpdatedAt(updatedAt) {
  if (!updatedAt) {
    return "Not synced yet";
  }

  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(updatedAt));
}

function AdminPanel() {
  const [authToken, setAuthToken] = useState(
    () => sessionStorage.getItem(STORAGE_KEY) || "",
  );
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });
  const [rows, setRows] = useState(() => buildRows());
  const [savedRows, setSavedRows] = useState(() => buildRows());
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORY);
  const [searchTerm, setSearchTerm] = useState("");
  const [lastUpdatedAt, setLastUpdatedAt] = useState("");
  const [isChecking, setIsChecking] = useState(Boolean(authToken));
  const [isSaving, setIsSaving] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [storageWarning, setStorageWarning] = useState("");

  const hasChanges = useMemo(
    () => rowsSignature(rows) !== rowsSignature(savedRows),
    [rows, savedRows],
  );

  const filteredRows = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return rows.filter((row) => {
      const matchesCategory =
        activeCategory === ALL_CATEGORY || row.category === activeCategory;
      const matchesQuery =
        !query ||
        [row.hiName, row.enName, row.hiPrice, row.enPrice]
          .join(" ")
          .toLowerCase()
          .includes(query);

      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, rows, searchTerm]);

  const loadPrices = useCallback(async (nextAuthToken) => {
    const response = await fetch(`/api/admin/menu-prices?ts=${Date.now()}`, {
      cache: "no-store",
      headers: getAuthHeaders(nextAuthToken),
    });
    const data = await readResponseJson(response);

    if (!response.ok) {
      throw new Error(data.message || "Rates load nahi ho paaye");
    }

    const nextRows = buildRows(data.prices);

    setRows(nextRows);
    setSavedRows(nextRows);
    setLastUpdatedAt(data.updatedAt || "");
    setStatusMessage("");
    setStorageWarning("");
  }, []);

  useEffect(() => {
    document.documentElement.lang = "en";
    document.title = "Rate Admin | Roshan Sweets";

    if (!authToken) {
      return;
    }

    let isMounted = true;

    async function verifyStoredLogin() {
      try {
        await loadPrices(authToken);
      } catch {
        if (isMounted) {
          sessionStorage.removeItem(STORAGE_KEY);
          setAuthToken("");
        }
      } finally {
        if (isMounted) {
          setIsChecking(false);
        }
      }
    }

    verifyStoredLogin();

    return () => {
      isMounted = false;
    };
  }, [authToken, loadPrices]);

  async function handleLogin(event) {
    event.preventDefault();
    setLoginError("");
    setStatusMessage("");
    setIsChecking(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginForm),
      });
      const data = await readResponseJson(response);

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      const nextAuthToken = encodeCredentials(
        loginForm.username,
        loginForm.password,
      );

      sessionStorage.setItem(STORAGE_KEY, nextAuthToken);
      setAuthToken(nextAuthToken);
      await loadPrices(nextAuthToken);
      setLoginForm({ username: "", password: "" });
    } catch (error) {
      setLoginError(error.message || "Login failed");
    } finally {
      setIsChecking(false);
    }
  }

  async function handleSave() {
    setIsSaving(true);
    setStatusMessage("");
    setStorageWarning("");

    try {
      const response = await fetch("/api/admin/menu-prices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders(authToken),
        },
        body: JSON.stringify({
          prices: buildPricePayload(rows),
        }),
      });
      const data = await readResponseJson(response);

      if (!response.ok) {
        if (data.code === "MISSING_GITHUB_TOKEN") {
          setStorageWarning(
            "MENU_GITHUB_TOKEN Vercel env me set nahi hai, isliye live save abhi locked hai.",
          );
        }

        throw new Error(data.message || "Rates save nahi ho paaye");
      }

      const nextRows = buildRows(data.prices);

      setRows(nextRows);
      setSavedRows(nextRows);
      setLastUpdatedAt(data.updatedAt || "");
      setStatusMessage("Rates save ho gaye. Public menu refresh karne par update dikhega.");
    } catch (error) {
      setStatusMessage(error.message || "Rates save nahi ho paaye");
    } finally {
      setIsSaving(false);
    }
  }

  function handleLogout() {
    sessionStorage.removeItem(STORAGE_KEY);
    setAuthToken("");
    setLoginForm({ username: "", password: "" });
    setRows(buildRows());
    setSavedRows(buildRows());
  }

  function updateRowPrice(id, value) {
    setRows((currentRows) =>
      currentRows.map((row) =>
        row.id === id
          ? {
              ...row,
              hiPrice: value,
              enPrice: value,
            }
          : row,
      ),
    );
  }

  if (!authToken) {
    return (
      <div className="site-shell min-h-screen text-zinc-900">
        <main className="mx-auto flex min-h-screen max-w-md items-center px-4 py-10">
          <section className="w-full rounded-[2rem] border border-orange-100 bg-white p-6 shadow-[0_24px_70px_rgba(124,45,18,0.12)]">
            <a
              href="/"
              className="mb-6 inline-flex rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-xs font-black text-orange-700 transition hover:bg-orange-100"
            >
              Back to menu
            </a>

            <p className="text-xs font-black uppercase tracking-[0.18em] text-orange-600">
              Roshan Sweets
            </p>
            <h1 className="mt-2 text-3xl font-black text-zinc-950">
              Rate Admin
            </h1>
            <p className="mt-2 text-sm font-medium text-zinc-500">
              Login karke item rates update karein.
            </p>

            <form className="mt-6 grid gap-4" onSubmit={handleLogin}>
              <label className="grid gap-1.5">
                <span className="text-xs font-black uppercase tracking-[0.14em] text-zinc-500">
                  Username
                </span>
                <input
                  type="text"
                  autoComplete="username"
                  value={loginForm.username}
                  onChange={(event) =>
                    setLoginForm((current) => ({
                      ...current,
                      username: event.target.value,
                    }))
                  }
                  className="rounded-2xl border border-orange-200 bg-orange-50/70 px-4 py-3 text-sm font-bold outline-none transition focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-100"
                  required
                />
              </label>

              <label className="grid gap-1.5">
                <span className="text-xs font-black uppercase tracking-[0.14em] text-zinc-500">
                  Password
                </span>
                <input
                  type="password"
                  autoComplete="current-password"
                  value={loginForm.password}
                  onChange={(event) =>
                    setLoginForm((current) => ({
                      ...current,
                      password: event.target.value,
                    }))
                  }
                  className="rounded-2xl border border-orange-200 bg-orange-50/70 px-4 py-3 text-sm font-bold outline-none transition focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-100"
                  required
                />
              </label>

              {loginError && (
                <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
                  {loginError}
                </p>
              )}

              <button
                type="submit"
                disabled={isChecking}
                className="rounded-2xl bg-zinc-950 px-5 py-3 text-sm font-black text-white shadow-lg shadow-zinc-950/15 transition hover:-translate-y-0.5 hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isChecking ? "Checking..." : "Login"}
              </button>
            </form>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="site-shell min-h-screen text-zinc-900">
      <header className="sticky top-0 z-40 border-b border-orange-100/80 bg-white/92 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <a
              href="/"
              className="mb-2 inline-flex rounded-full border border-orange-200 bg-orange-50 px-3 py-1.5 text-xs font-black text-orange-700 transition hover:bg-orange-100"
            >
              Back to menu
            </a>
            <h1 className="text-2xl font-black text-zinc-950">Rate Admin</h1>
            <p className="mt-1 text-xs font-bold text-zinc-500">
              Last update: {formatUpdatedAt(lastUpdatedAt)}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-xs font-black text-zinc-700 transition hover:border-orange-300 hover:text-orange-700"
            >
              Logout
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={!hasChanges || isSaving}
              className="rounded-full bg-zinc-950 px-5 py-2 text-xs font-black text-white shadow-lg shadow-zinc-950/15 transition hover:-translate-y-0.5 hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSaving ? "Saving..." : hasChanges ? "Save rates" : "Saved"}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <section className="mb-5 rounded-[2rem] border border-white/80 bg-white/90 p-4 shadow-[0_20px_60px_rgba(124,45,18,0.08)] backdrop-blur-xl sm:p-5">
          <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-orange-600">
                Price editor
              </p>
              <h2 className="mt-1 text-xl font-black text-zinc-950">
                Item ka rate ek hi field se update karein
              </h2>
            </div>

            <label className="relative block">
              <span className="sr-only">Search menu items</span>
              <input
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search item..."
                className="w-full rounded-2xl border border-orange-200 bg-orange-50/70 px-4 py-3 text-sm font-bold outline-none transition placeholder:text-zinc-400 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-100"
              />
            </label>
          </div>

          <div className="hide-scrollbar mt-4 flex gap-2 overflow-x-auto pb-1">
            <button
              type="button"
              onClick={() => setActiveCategory(ALL_CATEGORY)}
              className={`shrink-0 rounded-full px-4 py-2 text-xs font-black transition ${
                activeCategory === ALL_CATEGORY
                  ? "bg-zinc-950 text-white shadow-lg shadow-zinc-300"
                  : "border border-orange-200 bg-orange-50 text-orange-700 hover:bg-orange-100"
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`language-button shrink-0 rounded-full px-4 py-2 text-xs font-black transition ${
                  activeCategory === category
                    ? "bg-zinc-950 text-white shadow-lg shadow-zinc-300"
                    : "border border-orange-200 bg-orange-50 text-orange-700 hover:bg-orange-100"
                }`}
              >
                {categoryLabels.hi[category]}
              </button>
            ))}
          </div>

          {(statusMessage || storageWarning) && (
            <div className="mt-4 grid gap-2">
              {storageWarning && (
                <p className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-bold text-amber-800">
                  {storageWarning}
                </p>
              )}
              {statusMessage && (
                <p className="rounded-2xl border border-orange-100 bg-orange-50 px-4 py-3 text-sm font-bold text-orange-800">
                  {statusMessage}
                </p>
              )}
            </div>
          )}
        </section>

        <div className="grid gap-3">
          {filteredRows.map((row) => (
            <article
              key={row.id}
              className="grid gap-3 rounded-[1.5rem] border border-orange-100/80 bg-white p-3 shadow-[0_12px_35px_rgba(124,45,18,0.06)] sm:grid-cols-[80px_minmax(0,1fr)] sm:items-center"
            >
              <img
                src={row.image}
                alt={row.enName}
                className="h-20 w-20 rounded-2xl object-cover"
                loading="lazy"
              />

              <div className="grid gap-3 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-center">
                <div className="min-w-0">
                  <p className="text-base font-black text-zinc-950">
                    {row.hiName}
                  </p>
                  <p className="mt-1 text-sm font-bold text-zinc-500">
                    {row.enName}
                  </p>
                  <p className="mt-1 text-xs font-black uppercase tracking-[0.14em] text-orange-600">
                    {categoryLabels.en[row.category]}
                  </p>
                </div>

                <label className="grid gap-1.5">
                  <span className="text-xs font-black uppercase tracking-[0.14em] text-zinc-500">
                    Rate
                  </span>
                  <input
                    type="text"
                    value={row.hiPrice}
                    onChange={(event) =>
                      updateRowPrice(row.id, event.target.value)
                    }
                    placeholder="₹..."
                    className="w-full rounded-2xl border border-orange-200 bg-orange-50/60 px-4 py-3 text-sm font-black outline-none transition focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-100"
                  />
                </label>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}

export default AdminPanel;
