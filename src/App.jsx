
import { useState } from "react";
import "./App.css";

const feelings = [
  { emoji: "🥹", name: "Missing You", hi: "Teri yaad aa rahi hai" },
  { emoji: "❤️", name: "Sending Love", hi: "Pyaar bhej raha hoon" },
  { emoji: "🫂", name: "Virtual Hug", hi: "Ek tight hug" },
  { emoji: "🌅", name: "Good Morning", hi: "Subah ka pyaar" },
  { emoji: "🌙", name: "Good Night", hi: "Raat ko yaad kiya" },
  { emoji: "💭", name: "Thinking of You", hi: "Tu mere khayalon mein hai" },
  { emoji: "😡", name: "Angry", hi: "Abhi gussa aa raha hai" },
  { emoji: "🥺", name: "Lonely", hi: "Akela feel kar raha hoon" },
  { emoji: "🤩", name: "Excited", hi: "Bahut excited hoon!" },
  { emoji: "😔", name: "Sad", hi: "Aaj udaas hoon" },
  { emoji: "😤", name: "Frustrated", hi: "Sab kuch irritate kar raha hai" },
  { emoji: "🥰", name: "Feeling Loved", hi: "Dil khush hai, pyaar mil raha hai" },
  { emoji: "🥳", name: "Celebrating", hi: "Aaj kuch special hai!" },
  { emoji: "😰", name: "Worried", hi: "Kisi baat ki tension hai" },
  { emoji: "🙏", name: "Grateful", hi: "Thank you for being in my life" },
  { emoji: "😌", name: "Feeling Peaceful", hi: "Bas sab achha lag raha hai" },
];

const initialFriends = ["Aarav", "Priya", "My Family"];
const initialInbox = [
  { id: 1, sender: "Priya", feeling: feelings[2], time: "Just now", reaction: "" },
  { id: 2, sender: "Aarav", feeling: feelings[1], time: "10 min ago", reaction: "" },
];

export default function App() {
  const [tab, setTab] = useState("Send");
  const [selected, setSelected] = useState(null);
  const [recipient, setRecipient] = useState("Priya");
  const [friends, setFriends] = useState(initialFriends);
  const [groups, setGroups] = useState(["Close Friends", "Family Circle"]);
  const [inbox, setInbox] = useState(initialInbox);
  const [sent, setSent] = useState([]);
  const [newName, setNewName] = useState("");
  const [notice, setNotice] = useState("");
  const [privateOnly, setPrivateOnly] = useState(true);
  const [allowFriends, setAllowFriends] = useState(true);
  const [blocked, setBlocked] = useState([]);

  function sendFeeling() {
    if (!selected) {
      setNotice("Pehle ek feeling choose karo 💗");
      return;
    }
    if (!recipient.trim()) {
      setNotice("Kisko feeling bhejni hai, select karo.");
      return;
    }

    const message = {
      id: Date.now(),
      sender: "You",
      recipient,
      feeling: selected,
      time: "Just now",
    };

    setSent((items) => [message, ...items]);
    setNotice(`Demo: ${selected.name} ${recipient} ke liye ready hai 💗`);
    setSelected(null);
  }

  function addPerson() {
    const name = newName.trim();
    if (!name) return;
    if (friends.some((friend) => friend.toLowerCase() === name.toLowerCase())) {
      setNotice("Ye friend pehle se list mein hai.");
      return;
    }
    setFriends((items) => [...items, name]);
    setNewName("");
    setNotice(`${name} demo friends list mein add ho gaya.`);
  }

  function addGroup() {
    const name = newName.trim();
    if (!name) return;
    if (groups.some((group) => group.toLowerCase() === name.toLowerCase())) {
      setNotice("Ye group pehle se hai.");
      return;
    }
    setGroups((items) => [...items, name]);
    setNewName("");
    setNotice(`${name} demo group create ho gaya.`);
  }

  function reactToMessage(id, reaction) {
    setInbox((items) =>
      items.map((item) => item.id === id ? { ...item, reaction } : item)
    );
  }

  function renderInbox() {
    return (
      <div className="message-list">
        {inbox.length === 0 ? (
          <div className="empty-state">Abhi koi feeling nahi aayi. 💌</div>
        ) : inbox.map((item) => (
          <article className="message-card" key={item.id}>
            <div className="message-top">
              <div className="avatar">{item.sender.slice(0, 1)}</div>
              <div className="message-meta">
                <strong>{item.sender}</strong>
                <span>{item.time}</span>
              </div>
              <span className="message-emoji">{item.feeling.emoji}</span>
            </div>
            <h3>{item.feeling.name}</h3>
            <p>{item.feeling.hi}</p>
            <div className="reaction-row">
              {["❤️", "🫂", "🥹", "🙏"].map((reaction) => (
                <button
                  key={reaction}
                  className={`reaction ${item.reaction === reaction ? "active" : ""}`}
                  onClick={() => reactToMessage(item.id, reaction)}
                  aria-label={`React with ${reaction}`}
                >
                  {reaction}
                </button>
              ))}
              <button
                className="text-button"
                onClick={() => {
                  setRecipient(item.sender);
                  setTab("Send");
                  setNotice(`${item.sender} ko feeling back bhejo.`);
                }}
              >
                Send back ↗
              </button>
            </div>
          </article>
        ))}
      </div>
    );
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="#home" onClick={() => setTab("Send")}>
          <span className="brand-mark">a</span>
          <span>atma<span className="brand-dot">.</span></span>
        </a>
        <span className="private-label"><span /> Your space, your people</span>
        <button className="profile-button" onClick={() => setTab("Privacy")} aria-label="Open privacy settings">
          M
        </button>
      </header>

      <section className="welcome" id="home">
        <p className="eyebrow">A LITTLE FEELING GOES A LONG WAY</p>
        <h1>Some things are<br />better <em>felt.</em></h1>
        <p className="welcome-copy">
          Bina kuch explain kiye, apne favourite logon ko batao ki tum kya feel kar rahe ho.
        </p>
      </section>

      <nav className="tabs" aria-label="Main navigation">
        {[
          ["Send", "♡ Send"],
          ["Inbox", `♡ Inbox${inbox.length ? ` · ${inbox.length}` : ""}`],
          ["People", "♧ People"],
          ["Privacy", "⌁ Privacy"],
        ].map(([key, label]) => (
          <button key={key} className={tab === key ? "tab active" : "tab"} onClick={() => { setTab(key); setNotice(""); }}>
            {label}
          </button>
        ))}
      </nav>

      {notice && <div className="notice" role="status">{notice}</div>}

      {tab === "Send" && (
        <section className="content-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">CHECK IN WITH YOUR HEART</p>
              <h2>What are you feeling?</h2>
            </div>
            <span className="count-pill">16 feelings</span>
          </div>

          <div className="feelings-grid">
            {feelings.map((feeling) => (
              <button
                key={feeling.name}
                className={`feeling-card ${selected?.name === feeling.name ? "selected" : ""}`}
                onClick={() => { setSelected(feeling); setNotice(""); }}
              >
                <span className="feeling-emoji">{feeling.emoji}</span>
                <span className="feeling-name">{feeling.name}</span>
                <span className="feeling-hindi">{feeling.hi}</span>
              </button>
            ))}
          </div>

          <div className="send-panel">
            <div className="send-panel-copy">
              <p className="eyebrow">SEND A LITTLE SOMETHING</p>
              <h3>{selected ? `${selected.emoji} ${selected.name}` : "Choose your feeling"}</h3>
              <p>{selected ? selected.hi : "Choose one feeling above, then pick your person."}</p>
            </div>
            <div className="send-controls">
              <label htmlFor="recipient">Send to</label>
              <select id="recipient" value={recipient} onChange={(event) => setRecipient(event.target.value)}>
                {friends.filter((friend) => !blocked.includes(friend)).map((friend) => (
                  <option key={friend} value={friend}>{friend}</option>
                ))}
              </select>
              <button className="primary-button" onClick={sendFeeling}>Send feeling ↗</button>
            </div>
            <p className="demo-note">Prototype only · Feelings abhi real users ko deliver nahi hoti.</p>
          </div>
        </section>
      )}

      {tab === "Inbox" && (
        <section className="content-section">
          <div className="section-heading">
            <div><p className="eyebrow">A LITTLE LOVE, RECEIVED</p><h2>Your inbox</h2></div>
          </div>
          <p className="subtle-copy">Demo messages dikh rahe hain. Real delivery Supabase integration ke baad aayegi.</p>
          {renderInbox()}
          <div className="sent-section">
            <h3>Sent feelings</h3>
            {sent.length === 0 ? <p className="subtle-copy">Abhi tumne koi demo feeling send nahi ki.</p> : sent.map((item) => (
              <div className="sent-row" key={item.id}>
                <span>{item.feeling.emoji}</span>
                <div><strong>{item.feeling.name}</strong><p>To {item.recipient} · Demo only</p></div>
                <span className="sent-status">Queued locally</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {tab === "People" && (
        <section className="content-section">
          <div className="section-heading">
            <div><p className="eyebrow">YOUR INNER CIRCLE</p><h2>Your people</h2></div>
          </div>
          <p className="subtle-copy">Apne favourite logon aur private circles ko ek jagah rakho.</p>
          <div className="add-panel">
            <label htmlFor="person-name">Friend or group name</label>
            <div className="add-row">
              <input id="person-name" value={newName} onChange={(event) => setNewName(event.target.value)} placeholder="e.g. Best Friends" />
              <button className="primary-button" onClick={addPerson}>Add friend</button>
              <button className="secondary-button" onClick={addGroup}>Create group</button>
            </div>
          </div>
          <h3 className="list-title">Friends & family <span>{friends.length}</span></h3>
          <div className="people-list">
            {friends.map((friend) => (
              <div className="person-row" key={friend}>
                <div className="avatar">{friend.slice(0, 1).toUpperCase()}</div>
                <div className="person-info"><strong>{friend}</strong><span>Private connection · Demo</span></div>
                <button className="small-action" onClick={() => { setRecipient(friend); setTab("Send"); }}>Send ♡</button>
                <button className="small-action muted" onClick={() => { setBlocked((items) => items.includes(friend) ? items.filter((x) => x !== friend) : [...items, friend]); setNotice(blocked.includes(friend) ? `${friend} unblocked in demo.` : `${friend} blocked in demo.`); }}>
                  {blocked.includes(friend) ? "Unblock" : "Block"}
                </button>
              </div>
            ))}
          </div>
          <h3 className="list-title">Private groups <span>{groups.length}</span></h3>
          <div className="group-grid">
            {groups.map((group, index) => (
              <div className="group-card" key={group}>
                <span className="group-icon">{index === 1 ? "⌂" : "♡"}</span>
                <strong>{group}</strong>
                <span>Private group · Demo</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {tab === "Privacy" && (
        <section className="content-section">
          <div className="section-heading">
            <div><p className="eyebrow">YOUR FEELINGS, YOUR RULES</p><h2>Privacy & safety</h2></div>
          </div>
          <p className="subtle-copy">Ye toggles abhi sirf prototype mein hain. Real privacy enforcement backend policies se hogi.</p>
          <div className="settings-list">
            <label className="setting-row">
              <span><strong>Private by default</strong><small>Feelings public profile par nahi dikhengi.</small></span>
              <input type="checkbox" checked={privateOnly} onChange={(event) => setPrivateOnly(event.target.checked)} />
            </label>
            <label className="setting-row">
              <span><strong>Allow feelings from friends</strong><small>Sirf approved connections se feelings receive karna.</small></span>
              <input type="checkbox" checked={allowFriends} onChange={(event) => setAllowFriends(event.target.checked)} />
            </label>
          </div>
          <div className="privacy-reminder">
            <span>🔒</span>
            <div><strong>Privacy reminder</strong><p>Real app mein har message ko sender, receiver aur access policy se protect karenge. UI toggle akela security nahi hota.</p></div>
          </div>
          <h3 className="list-title">Blocked people <span>{blocked.length}</span></h3>
          {blocked.length === 0 ? <p className="subtle-copy">Kisi ko block nahi kiya.</p> : blocked.map((name) => (
            <div className="person-row" key={name}><strong>{name}</strong><button className="small-action" onClick={() => setBlocked((items) => items.filter((x) => x !== name))}>Unblock</button></div>
          ))}
        </section>
      )}

      <footer className="footer">
        <a className="brand footer-brand" href="#home" onClick={() => setTab("Send")}><span className="brand-mark">a</span><span>atma<span className="brand-dot">.</span></span></a>
        <p>Made for the feelings we don't always say out loud.</p>
        <span>Private by intention. Human by nature.</span>
      </footer>
    </main>
  );
}
