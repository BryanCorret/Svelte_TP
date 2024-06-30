<script>
  export let lieu;
  export let img_haut = true;
</script>

<div class="card mb-3" style="width: 18rem; margin : 1em;">
  <img class={img_haut ? 'card-img-top' : 'card-img-bottom'} src={"IMG/" +lieu.image} alt={lieu.nom} style="height: 200px; object-fit: cover; ">
  <div class="card-body">
    <h5 class="card-title">{lieu.nom}</h5>
    <p class="card-text">{lieu.adresse}, {lieu.departement}</p>
    <a href={`/lieu/${lieu.id}`}>Voir détails</a>
  </div>
</div>

<style>
  .card {
    margin-bottom: 20px;
  }
</style>
