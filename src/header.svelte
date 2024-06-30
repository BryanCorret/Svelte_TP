<script>
    export let Lieu_re = "Tous nos billets";
    export let acceuil_re = "FlyIUT";
    export let aBlack = true; // Par défaut, la valeur est true
</script>

<header>
    <div class="logo">
        {#if (aBlack) }
            <a href="/" class="aBlack">
                <img src="/IMG/logo.png" alt="Logo" />
                {acceuil_re}
            </a>
        {:else}
            <a href="/" class="aWhite">
                <img src="/IMG/logo.png" alt="Logo" />
                {acceuil_re}
            </a>
        {/if}
      
    </div>
    {#if (aBlack) }
        <a href="/alllieu" class="aBlack">{Lieu_re}</a>
    {:else}
        <a href="/alllieu" class="aWhite">{Lieu_re}</a>
    {/if}
</header>

<style>
    header {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 20px;
    }

    .logo {
        flex: 1; 
    }

    img {
        max-width: 10em; 
        max-height: 5em; 
    }
    .aWhite {
        text-decoration: none;
        color: #f9f1f1;
        font-size: 1.2em;
    }
    .aBlack {
        text-decoration: none;
        color: #352e2e;
        font-size: 1.2em;
    }
</style>
