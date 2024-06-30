<script>
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import { chargerDonnees } from "./JS/DataService.js";
  import Header from "./header.svelte";
  import Lieu from "./Lieu.svelte"; 

  let lieux = [];
  let searchQuery = "";
  let searchResults = writable([]);

  onMount(async () => {
    const response = await chargerDonnees();
    const data = await response.json();
    lieux = data.lieux;
  });
  
  function search(event) {
    const query = event.target.value;
    searchQuery = query;

    if (query.length >= 1) {
      const filteredResults = lieux.filter(
        (lieu) => lieu.nom.toLowerCase().includes(query.toLowerCase())
      );
      searchResults.set(filteredResults);
    } else {
      searchResults.set([]);
    }
  }

</script>

<main class="container-fluid d-flex flex-column justify-content-center align-items-center" style="background-image: url('IMG/fond.png'); background-size: cover; background-position: center; height: 65vh;">
  <Header aBlack={false} />
  <div class="container">
    <h1 class="text-center mt-5 title">Bienvenue sur FlyIUT un site de réservation !</h1>    
    <div class="input-group mb-3">
      <span class="input-group-text">
        <img src="IMG/loupe.png" alt="Loupe" class="search-icon" />
      </span>
      <input type="text" class="form-control" placeholder="Rechercher un lieu..." bind:value={searchQuery} on:input={search} />
    </div>

    <div class="search-results mt-2 {searchQuery.length > 0 ? 'visible' : 'hidden'}">
      {#if $searchResults.length > 0 && searchQuery.trim().length > 0}
        <ul class="list-group">
          {#each $searchResults.slice(0, 3) as lieu}
          <a href={`/lieu/${lieu.id}`}><li class="list-group-item">
              <p>{lieu.nom}</p>
            </li></a>
          {/each}
        </ul>
      {:else}
        <p class="">Aucun résultat pour la recherche : {searchQuery}</p>
      {/if}
    </div>
  </div>
  
</main>
  <div class="row mt-5">
    <h2 class="text-center mb-5">Les lieux les plus populaires</h2>
    {#each lieux.slice(0, 3) as lieu}
    <Lieu lieu={lieu} img_haut={false} /> 
    {/each}
  </div>
    
   
<style>
  .search-results.visible {
    display: block;
  }

  .search-results.hidden {
    display: none;
  }

  .search-results li:hover {
    background-color: #ef7c5d;
  }

  .title {
  color: #f9f1f1;
  font-weight: 500;
  line-height: 1.2;
}
  .search-results {
    background-color: #ffffff;
    border-radius: 20px;
    padding: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    color: blue;
  }

  .search-icon {
    width: 20px;
  }
</style>
