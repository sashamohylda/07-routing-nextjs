import css from './LayoutNotes.module.css';

// Паралельні маршрути: слот sidebar (меню тегів) лишається на місці,
// а при зміні тегу перемальовується лише children — область нотаток
interface NotesLayoutProps {
  children: React.ReactNode;
  // Слот @sidebar: меню тегів
  sidebar: React.ReactNode;
}

export default function NotesLayout({ children, sidebar }: NotesLayoutProps) {
  return (
    <section className={css.container}>
      <aside className={css.sidebar}>{sidebar}</aside>
      <div className={css.notesWrapper}>{children}</div>
    </section>
  );
}
