import React, { useEffect, useState } from "react";
import "./index.css";

type FeedItem = {
  title: string;
  link?: string;
  enclosure?: string;
  pubDate?: string;
  description?: string;
};

const fetchFeed = async (): Promise<FeedItem[]> => {
  const xmlText = await (window as any).electronAPI.fetchFeed();
  const parser = new DOMParser();
  const xml = parser.parseFromString(xmlText, "application/xml");
  const items = Array.from(xml.querySelectorAll("item")).map((item) => ({
    title: item.querySelector("title")?.textContent || "",
    link: item.querySelector("link")?.textContent || "",
    enclosure: item.querySelector("enclosure")?.getAttribute("url") || "",
    pubDate: item.querySelector("pubDate")?.textContent || "",
    description: item.querySelector("description")?.textContent || "",
  }));
  return items;
};

const openMagnet = async (magnetUrl: string) => {
  await (window as any).electronAPI.openMagnet(magnetUrl);
};

const App: React.FC = () => {
  const [items, setItems] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchFeed()
      .then(data => {
        setItems(data);
        setError(null);
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container">
      <h1>Linux Magnet Distro RSS</h1>
      {loading && <p>Caricamento feed...</p>}
      {error && <p style={{ color: "red" }}>Errore: {error}</p>}
      <ul className="feed-list">
        {items.map((item, idx) => {
          const magnet =
            item.enclosure && item.enclosure.startsWith("magnet:")
              ? item.enclosure
              : null;
          return (
            <li key={idx} className="feed-item">
              <h2 className="post-link">
                {item.link ? (
                  <a
                    href={item.link}
                    rel="noopener noreferrer"                    
                  >
                    {item.title}
                  </a>
                ) : (
                  item.title
                )}
              </h2>
              {item.pubDate && (
                <div className="pubdate">
                  <small>{new Date(item.pubDate).toLocaleString()}</small>
                </div>
              )}
              {item.description && (
                <div
                  className="description"
                  dangerouslySetInnerHTML={{ __html: item.description }}
                />
              )}
              {magnet ? (
                <button
                  className="magnet-btn"
                  onClick={() => openMagnet(magnet)}
                >
                  Scarica Magnet
                </button>
              ) : (
                <span className="no-magnet">Nessun magnet link</span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default App;