import { notFound } from 'next/navigation';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { fetchNotes, NOTES_PER_PAGE } from '@/lib/api';
import { NOTE_TAGS } from '@/types/note';
import type { NoteTag } from '@/types/note';
import NotesClient from './Notes.client';

// Список нотаток має бути свіжим на кожен запит, а не зібраним під час білду
export const dynamic = 'force-dynamic';

const isNoteTag = (value: string): value is NoteTag =>
  (NOTE_TAGS as readonly string[]).includes(value);

export default async function NotesByTag({
  params,
}: PageProps<'/notes/filter/[...slug]'>) {
  const { slug } = await params;
  const filter = slug[0];

  // Дозволені лише /notes/filter/all і /notes/filter/{тег}
  if (slug.length > 1 || (filter !== 'all' && !isNoteTag(filter))) {
    notFound();
  }

  // «all» — це не тег: бекенд його не очікує, тому для всіх нотаток тег не передаємо
  const tag = filter === 'all' ? undefined : filter;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, '', tag ?? 'all'],
    queryFn: () =>
      fetchNotes({ page: 1, perPage: NOTES_PER_PAGE, search: '', tag }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {/* key: при зміні тегу скидаємо сторінку й пошук до початкових */}
      <NotesClient key={filter} tag={tag} />
    </HydrationBoundary>
  );
}
