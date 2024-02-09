const pluralRules = new Intl.PluralRules('en', { type: 'ordinal' });
const suffixes = new Map([
  ['one', 'st'],
  ['two', 'nd'],
  ['few', 'rd'],
  ['other', 'th']
]);

export default function formatOrdinal(number: number) {
  const rule = pluralRules.select(number);
  const suffix = suffixes.get(rule);
  return `${number}${suffix}`;
}