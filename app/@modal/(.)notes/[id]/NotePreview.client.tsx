'use client';

import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import Modal from '@/components/Modal/Modal';
import css from './NotePreview.module.css';

export default function NotePreviewClient() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    // Дані вже прийшли з сервера (prefetch + HydrationBoundary) — не тягнемо їх вдруге.
    // Якщо серверний запит упав, кешу немає, і запит усе одно виконається
    refetchOnMount: false,
  });

  // Закриття = повернення на сторінку, з якої відкрили модалку
  // (наприклад, /notes/filter/Work)
  const handleClose = () => router.back();

  const createdDate = note
    ? new Date(note.createdAt).toLocaleString('en-GB', {
        dateStyle: 'medium',
        timeStyle: 'short',
        timeZone: 'UTC',
      })
    : '';

  return (
    <Modal onClose={handleClose}>
      {isLoading && <p>Loading, please wait...</p>}
      {!isLoading && (error || !note) && <p>Something went wrong.</p>}
      {note && (
        <div className={css.container}>
          <div className={css.item}>
            <div className={css.header}>
              <h2>{note.title}</h2>
            </div>
            <p className={css.tag}>{note.tag}</p>
            <p className={css.content}>{note.content}</p>
            <p className={css.date}>Created: {createdDate}</p>
            <button type="button" className={css.backBtn} onClick={handleClose}>
              Close
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}
