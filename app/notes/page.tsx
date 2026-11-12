import { redirect } from 'next/navigation';

// Список нотаток тепер живе на /notes/filter/{tag}; старий /notes веде на «All notes»
export default function NotesIndex() {
  redirect('/notes/filter/all');
}
