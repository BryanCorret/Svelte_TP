// DataService.js
export async function chargerDonnees() {
  const data = await fetch('/data.json');
  return data;
}
