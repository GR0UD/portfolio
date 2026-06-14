import { useState } from "react";
import {
  FaXmark,
  FaPencil,
  FaCheck,
  FaTrash,
  FaCircleCheck,
  FaRegCircleCheck,
} from "react-icons/fa6";
import styles from "./MarkdownPanel.module.scss";
import type { Feature } from "../types";
import type { TmpLang } from "../i18n";

// Minimal markdown renderer - handles headers, bold, italic, lists, code, links
function renderMarkdown(md: string): string {
  if (!md) return '<p class="empty">No notes yet. Click Edit to add some.</p>';

  const html = md
    // Escape HTML first
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    // Code blocks (must come before inline code)
    .replace(/```[\s\S]*?```/g, (m) => {
      const code = m.slice(3, -3).replace(/^\n/, "").replace(/\n$/, "");
      return `<pre><code>${code}</code></pre>`;
    })
    // Inline code
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    // Headers
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^# (.+)$/gm, "<h1>$1</h1>")
    // Bold + italic
    .replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    // Strikethrough
    .replace(/~~(.+?)~~/g, "<del>$1</del>")
    // Unordered lists
    .replace(/^[-*+] (.+)$/gm, "<li>$1</li>")
    // Ordered lists
    .replace(/^\d+\. (.+)$/gm, "<li>$1</li>")
    // Blockquotes
    .replace(/^&gt; (.+)$/gm, "<blockquote>$1</blockquote>")
    // Links
    .replace(
      /\[(.+?)\]\((.+?)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>',
    )
    // Horizontal rule
    .replace(/^---$/gm, "<hr />")
    // Wrap consecutive <li> in <ul>
    .replace(/(<li>.*<\/li>(\n|$))+/g, (m) => `<ul>${m}</ul>`)
    // Line breaks to paragraphs (skip already-wrapped block elements)
    .split(/\n{2,}/)
    .map((block) => {
      if (/^<(h[1-6]|ul|ol|pre|blockquote|hr)/.test(block.trim())) {
        return block;
      }
      const inner = block.replace(/\n/g, "<br />");
      return `<p>${inner}</p>`;
    })
    .join("\n");

  return html;
}

interface Props {
  feature: Feature;
  lang: TmpLang;
  onClose: () => void;
  onSave: (id: string, notes: string) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
}

const MarkdownPanel = ({
  feature,
  lang,
  onClose,
  onSave,
  onDelete,
  onToggle,
}: Props) => {
  const name =
    lang === "ru" ? feature.nameRu || feature.nameEn : feature.nameEn;
  const isDone = feature.status === "done";
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState("");
  const [saving, setSaving] = useState(false);

  const startEditing = () => {
    setDraft(feature.notes ?? "");
    setEditing(true);
  };

  const handleSave = async () => {
    setSaving(true);
    await onSave(feature.id, draft);
    setSaving(false);
    setEditing(false);
  };

  const handleClose = () => {
    if (editing) {
      setEditing(false);
      return;
    }
    onClose();
  };

  const handleDelete = () => {
    if (window.confirm(`Delete "${name}"? This can't be undone.`)) {
      onDelete(feature.id);
    }
  };

  return (
    <div className={styles.panel}>
      <div className={styles.panelHeader}>
        <div className={styles.panelMeta}>
          <span className={styles.panelVersion}>v{feature.version}</span>
          <h2 className={styles.panelTitle}>{name}</h2>
        </div>
        <div className={styles.panelActions}>
          {editing ? (
            <button
              type="button"
              className={`${styles.actionBtn} ${styles.saveBtn}`}
              onClick={handleSave}
              disabled={saving}
              aria-label="Save notes"
              title="Save"
            >
              <FaCheck />
            </button>
          ) : (
            <>
              <button
                type="button"
                className={`${styles.actionBtn} ${isDone ? styles.doneBtnActive : ""}`}
                onClick={() => onToggle(feature.id)}
                aria-pressed={isDone}
                aria-label={isDone ? "Mark in progress" : "Mark done"}
                title={isDone ? "Mark in progress" : "Mark done"}
              >
                {isDone ? <FaCircleCheck /> : <FaRegCircleCheck />}
              </button>
              <button
                type="button"
                className={styles.actionBtn}
                onClick={startEditing}
                aria-label="Edit notes"
                title="Edit"
              >
                <FaPencil />
              </button>
              <button
                type="button"
                className={`${styles.actionBtn} ${styles.deleteBtn}`}
                onClick={handleDelete}
                aria-label="Delete feature"
                title="Delete"
              >
                <FaTrash />
              </button>
            </>
          )}
          <button
            type="button"
            className={styles.closeBtn}
            onClick={handleClose}
            aria-label={editing ? "Exit editing" : "Close panel"}
            title={editing ? "Back" : "Close"}
          >
            <FaXmark />
          </button>
        </div>
      </div>

      <div className={styles.panelBody}>
        {editing ? (
          <textarea
            className={styles.editor}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder={
              "# Feature Notes\n\nWrite markdown here...\n\n- bullet points\n- **bold**, *italic*\n- `inline code`"
            }
            autoFocus
            spellCheck
          />
        ) : (
          <div
            className={styles.preview}
            dangerouslySetInnerHTML={{
              __html: renderMarkdown(feature.notes ?? ""),
            }}
          />
        )}
      </div>
    </div>
  );
};

export default MarkdownPanel;
