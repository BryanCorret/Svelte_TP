<script>
  import { onMount } from "svelte";
  import { chargerDonnees } from "./JS/DataService.js";

  export let filter;
  export let departements;
  export let typesLieu;
  export let applyFilter;

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

  onMount(async () => {
    await getAllDepartements();
    await getAllTypesLieu();
  });

  $: filterChanged = JSON.stringify(filter) !== JSON.stringify(lastFilter);
</script>

<div class="row mt-5">
  <div class="col">
    <div class="input-group mb-3">
      <span class="input-group-text">Prix Max</span>
      <input type="number" class="form-control" bind:value={filter.prixMax} />
    </div>
  </div>
  <div class="col">
    <div class="input-group mb-3">
      <label class="input-group-text" for="departementDropdown">Département</label>
      <select class="form-select" id="departementDropdown" bind:value={filter.departement}>
        <option value="">Choisir un département</option>
        {#each departements as departement}
          <option value={departement}>{departement}</option>
        {/each}
      </select>
    </div>
  </div>
  <div class="col">
    <div class="input-group mb-3">
      <label class="input-group-text" for="typeLieuDropdown">Type de Lieu</label>
      <select class="form-select" id="typeLieuDropdown" bind:value={filter.typeLieu}>
        <option value="">Choisir un type de lieu</option>
        {#each typesLieu as typeLieu}
          <option value={typeLieu}>{typeLieu}</option>
        {/each}
      </select>
    </div>
  </div>
  <div class="col">
    <button class="btn btn-primary" on:click={applyFilter}>Appliquer les filtres</button>
  </div>
</div>