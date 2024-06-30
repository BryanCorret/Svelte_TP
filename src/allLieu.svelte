<script>
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import { chargerDonnees } from "./JS/DataService.js";
  import Header from "./header.svelte";
  import Lieu from "./Lieu.svelte";
  import FilterBar from "./filterBar.svelte"; // Import du composant FilterBar

  let lieux = [];
  let filteredLieux = [];
  let page = 1;
  let lieuxPerPage = 4;
  let totalPages = 0;
  let paginatedLieux = writable([]);
  let hasNextPage = false;
  let departements = [];
  let typesLieu = [];

  const filter = {
    prixMax: null,
    departement: "",
    typeLieu: ""
  };

  let lastFilter = { ...filter };

  async function getAllDepartements() {
    const response = await chargerDonnees();
    const data = await response.json();
    const allDepartements = data.lieux.map(lieu => lieu.departement);
    departements = Array.from(new Set(allDepartements));
  }

  async function getAllTypesLieu() {
    const response = await chargerDonnees();
    const data = await response.json();
    const allTypesLieu = data.lieux.map(lieu => lieu.type);
    typesLieu = Array.from(new Set(allTypesLieu));
  }

  async function loadData() {
    const response = await chargerDonnees();
    const data = await response.json();
    applyFilter(); // Applique les filtres initiaux
    lieux = data.lieux;
    filteredLieux = lieux; // Initialise filteredLieux avec tous les lieux
    totalPages = Math.ceil(filteredLieux.length / lieuxPerPage); // Calcul initial de totalPages
    hasNextPage = totalPages > page;
    paginateLieux(page);
  }

  function paginateLieux(pageNumber) {
    const startIndex = (pageNumber - 1) * lieuxPerPage;
    const endIndex = startIndex + lieuxPerPage;
    paginatedLieux.update(existingLieux => [...existingLieux, ...filteredLieux.slice(startIndex, endIndex)]);
    page = pageNumber;
    hasNextPage = totalPages > page;
  }

  function goToPage(pageNumber) {
    paginateLieux(pageNumber);
  }

  function loadMore() {
    if (hasNextPage) {
      goToPage(page + 1);
    }
  }

  async function applyFilter() {
    filteredLieux = lieux.filter(lieu => {
      if (filter.prixMax !== null && lieu.prix > filter.prixMax) {
        return false;
      }
      if (filter.departement !== "" && lieu.departement !== filter.departement) {
        return false;
      }
      if (filter.typeLieu !== "" && lieu.type !== filter.typeLieu) {
        return false;
      }
      return true;
    });

    totalPages = Math.ceil(filteredLieux.length / lieuxPerPage);
    hasNextPage = totalPages > 1;
    paginatedLieux.set([]); // Réinitialise la liste paginée
    paginateLieux(1); // Paginer à la première page des résultats filtrés
    lastFilter = { ...filter };
  }

  async function initialize() {
    await getAllDepartements();
    await getAllTypesLieu();
    await loadData();
  }

  onMount(initialize);

  $: filterChanged = JSON.stringify(filter) !== JSON.stringify(lastFilter);
</script>

<Header />

<main class="container">
  <h1 class="text-center mt-5">Tous les lieux</h1>

  <FilterBar {filter} {departements} {typesLieu} {applyFilter} />

  <div class="row mt-5">
    {#if filteredLieux.length === 0}
      <p>Aucun résultat trouvé.</p>
    {:else}
      {#each $paginatedLieux as lieu}
        <Lieu lieu={lieu} img_haut={false} />
      {/each}
    {/if}
  </div>

  {#if totalPages > 1 && !filterChanged}
    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-center mt-5">
        <li class="page-item">
          {#if hasNextPage}
            <button class="page-link" on:click={loadMore}>Voir plus</button>
          {/if}
        </li>
      </ul>
    </nav>
  {/if}
</main>
