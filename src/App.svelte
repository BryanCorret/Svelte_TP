<script>
    import { Router, Route } from 'svelte-routing';
    import Accueil from './Accueil.svelte';
    import Lieu from './allLieu.svelte';
    import LieuId from './LieuId.svelte';
</script>

<Router>
    <Route path="/" component={Accueil} />
    <Route path="/alllieu" component={Lieu} />
    <Route path="/lieu/:id" let:params>
        <LieuId id={params.id} />
    </Route>
</Router>
