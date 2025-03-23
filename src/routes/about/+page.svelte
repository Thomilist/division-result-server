<!-- @migration-task Error while migrating Svelte code: `<tr>` is invalid inside `<table>` -->
<svelte:head>
    <title>Om - Live Divisionsresultater</title>
</svelte:head>

<style>
    @import '../../styles/base.css';
    @import '../../styles/link-table.css';
</style>

<div class="base">
    <h1>Om</h1>

    <p>
        Live Divisionsresultater er udviklet af Thomas Emil Jensen fra Horsens OK
        &mdash; oprindeligt lavet i forbindelse med en divisionsmatch arrangeret af netop Horsens OK i september 2023,
        men også frit tilgængeligt for andre.
    </p>

    <p>
        Inspirationen var, at eksisterende programmer og tjenester <i>næsten</i> opfyldte målet om live formidling af divisionsresultater.
        Divisionsmatchberegning, som typisk benyttes til at beregne resultaterne, kunne allerede producere resultater i HTML-format,
        og det var allerede normen at udgive klasseresultater live på fx Liveresults.
        En kombination af disse elementer var altså oplagt.
    </p>

    <p>
        Løsningen består af to komponenter.
        Det ene er en server, hvorpå resultaterne opbevares, og hvorfra de vises på en hjemmeside som den, du kigger på lige nu.
        Den består af en simpel webserver og database, og er meget kreativt navngivet "Division Result Server".
    </p>

    <p>
        Det andet er et program, der fungerer som et bindeled i beregningen
        &mdash; og som med tilsvarende kreativitet har fået navnet "Division Result Bridge".
        Foruden fri adgang til selve programmet kan interesserede divisionsmatcharrangører også gøre brug af dertilhørende dokumentation på både dansk og engelsk.
    </p>

    <table class="link-table">
        <thead>
            <tr class="header">
                <th>Links</th>
            </tr>
        </thead>
        <tbody>
            <tr class="content">
                <td><a target="_blank" href="https://thomilist.github.io/division-result-bridge/">Dokumentation til beregningsprogrammet &mdash; "Division Result Bridge"</a></td>
            </tr>
            <tr class="content">
                <td><a target="_blank" href="https://github.com/Thomilist/division-result-server">Resultatserveren &mdash; "Division Result Server"</a></td>
            </tr>
            <tr class="content">
                <td><a target="_blank" href="https://github.com/AndersKlinting/divisionsmatchberegning/">Divisionsmatchberegning</a></td>
            </tr>
            <tr class="content">
                <td><a target="_blank" href="https://liveresultat.orientering.se/index.php?lang=en">Liveresults</a></td>
            </tr>
        </tbody>
    </table>
</div>
