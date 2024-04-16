import type { SelectedNote } from '@/types';
import { writable } from 'svelte/store';

const selectedNote = writable<SelectedNote | null>(null);

export default selectedNote;