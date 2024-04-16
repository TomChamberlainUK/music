import { writable } from 'svelte/store';

const mode = writable('ionian');

export default mode;