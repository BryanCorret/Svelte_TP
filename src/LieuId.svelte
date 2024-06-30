<script>
    import { onMount } from "svelte";
    import { chargerDonnees } from "./JS/DataService.js";
  import Header from "./header.svelte";

    export let id; 
    let lieu;

    onMount(async () => {
        const response = await chargerDonnees();
        const data = await response.json();
        const lieux = data.lieux;

        for (let i = 0; i < lieux.length; i++) {
            if (lieux[i].id == id) {
                lieu = lieux[i];
                break;
            }
        }

        console.log(lieu);
    });
</script>

<Header />
<div>
    <h1 class="mt-3 mb-4 text-center" >Détails du lieu</h1>           
</div>
<main>
    <div class="card-container">
        <div class="row justify-content-center" id='text'>
            <div class="col-md-6"  >
                <div class="card">
                    <div class="">
                        <img src="/IMG/{lieu && lieu.image}" class="img-fluid" alt="{lieu && lieu.nom}" >
                    </div>
                  <div class="card-body">
                    <h5 class="card-title">{lieu ? lieu.nom : 'Chargement...'}</h5>
                    <p class="card-text">{lieu ? lieu.description : 'Chargement...'}</p>
                    <p class="card-text">Prix : <span class="link-primary">{lieu && lieu.prix ? lieu.prix + ' €' : 'Chargement...'}</span></p>
                    <p class="card-text">Département : {lieu ? lieu.departement : 'Chargement...'}</p>
                    <p class="card-text">Type de lieu : {lieu ? lieu.type : 'Chargement...'}</p>
                  </div>
                </div>
              </div>
            
            </div>
          </div>        
        
      </main>
<style>
    .card-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 50vh;
    }
    
    #text {
      width: 100%;
      margin-top: 15em;
    }
  </style>