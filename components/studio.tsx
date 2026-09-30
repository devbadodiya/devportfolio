"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { now, profile } from "@/lib/content";
import { answerQuestion, suggestions, type GuideLink } from "@/lib/guide";
import { TextLink } from "./links";

type Message = {
  id: string;
  role: "user" | "desk";
  paragraphs: string[];
  links?: GuideLink[];
};

export function Studio() {
  const params = useSearchParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");
  const [pending, setPending] = useState("");
  const started = useRef(false);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, []);

  useEffect(() => {
    const initial = params.get("q");
    if (initial && !started.current) {
      started.current = true;
      ask(initial);
    }
  }, [params]);

  function ask(raw: string) {
    const text = raw.trim();
    if (!text || pending) return;
    const reply = answerQuestion(text);
    const userMessage: Message = { id: crypto.randomUUID(), role: "user", paragraphs: [text] };
    setMessages((current) => [...current, userMessage]);
    setDraft("");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setMessages((current) => [
        ...current,
        { id: crypto.randomUUID(), role: "desk", paragraphs: reply.paragraphs, links: reply.links },
      ]);
      return;
    }
    const words = reply.paragraphs.join("\n\n").split(" ");
    let index = 0;
    setPending(words[0] ?? "");
    timer.current = window.setInterval(() => {
      index += 2;
      if (index >= words.length) {
        if (timer.current) window.clearInterval(timer.current);
        setPending("");
        setMessages((current) => [
          ...current,
          { id: crypto.randomUUID(), role: "desk", paragraphs: reply.paragraphs, links: reply.links },
        ]);
        return;
      }
      setPending(words.slice(0, index).join(" "));
    }, 28);
  }

  const lastLinks = [...messages].reverse().find((message) => message.role === "desk")?.links ?? [];

  return (
    <div className="chat-layout">
      <div className="chat-stream">
        <div className="messages" aria-live="polite">
          {messages.length === 0 && !pending ? (
            <div className="bubble">
              <div className="who">Desk</div>
              <p>How can I help you look around? I answer from this site. I do not browse the web.</p>
            </div>
          ) : null}
          {messages.map((message) => (
            <div key={message.id} className={`bubble ${message.role}`}>
              <div className="who">{message.role === "desk" ? "Desk" : "You"}</div>
              {message.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          ))}
          {pending ? (
            <div className="bubble">
              <div className="who">Desk</div>
              <p>{pending}</p>
            </div>
          ) : null}
        </div>
        {messages.length === 0 ? (
          <div className="suggestions">
            {suggestions.map((suggestion) => (
              <button key={suggestion} className="chip" type="button" onClick={() => ask(suggestion)}>
                {suggestion}
              </button>
            ))}
          </div>
        ) : null}
        <form
          className="composer"
          onSubmit={(event) => {
            event.preventDefault();
            ask(draft);
          }}
        >
          <input
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder={`Ask about ${profile.name}`}
            aria-label="Ask Desk"
          />
          <button className="send" type="submit" disabled={Boolean(pending)}>
            Send
          </button>
        </form>
      </div>
      <aside>
        <div className="side-card">
          <h2>From the reply</h2>
          <div className="link-row">
            {lastLinks.length === 0 ? <p className="quiet">Links land here after you ask.</p> : null}
            {lastLinks.map((link) => (
              <TextLink key={link.href + link.label} href={link.href}>
                {link.label}
              </TextLink>
            ))}
          </div>
        </div>
        <div className="side-card">
          <h2>Right now</h2>
          <p className="quiet">{now.sections[0].body}</p>
        </div>
        <div className="side-card">
          <h2>Write directly</h2>
          <TextLink href={`mailto:${profile.email}`}>{profile.email}</TextLink>
        </div>
      </aside>
    </div>
  );
}
