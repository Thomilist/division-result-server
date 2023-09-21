<script>

	import { goto } from "$app/navigation";

</script>
<svelte:head>
    <title>About - Live Division Results</title>
</svelte:head>

<style lang="scss">
    @import '../../styles/base.scss';
    @import '../../styles/link-table.scss';
</style>

<div class="base">
    <h1>About</h1>

    <p>
        Live Division Results was developed by Thomas Emil Jensen from Horsens OK in a little over a week.
        It features two components: Division Result Server and Division Result Bridge.
    </p>

    <p>
        Division Result Server is what you are looking at right now.
        It stores and presents competition and division metadata, as well as division results.
        On the competition pages, new results are automatically loaded when available, providing convenient, live access to division results.
        In that sense, it is the division result counterpart to the existing Liveresults platform, albeit much simpler in terms of functionality.
    </p>

    <p>
        The server is a Node.js web server built with SvelteKit and connected to a PostgreSQL database using Prisma.
        Self-hosting the server is a viable option, but this particular instance is running on an Oracle Linux compute VM at Oracle Cloud Infrastructure,
        comfortably hidden away behind an Apache HTTP server in reverse proxy configuration.
    </p>

    <p>
        Division Result Bridge is the other component.
        As the name might suggest, it is meant to bridge the gap between the various programs involved.
        It fetches results from MeOS's information server,
        runs them through Divisionsmatchberegning once for every division configured,
        and then uploads the division results to the Division Result Server
        - all at a regular interval.
        For organisers, Division Result Bridge is the main interface with the server.
        In addition to managing the results processing pipeline,
        it also allows users to create competitions on the server and assign their metadata.
    </p>

    <p>
        Division Result Bridge is written exclusively in C++,
        making extensive use of Qt 6 and its Widgets framework.
        The program itself is cross-platform, running on Linux just as well as on Windows.
        This is not particularly relevant, however, since MeOS and Divisionsmatchberegning both target Windows exclusively.
    </p>

    <p>
        Division Result Server and Division Result Bridge are free and open-source software published under the MIT license.
        Feel free to use or modify them.
    </p>

    <table class="link-table">
        <tr class="header">
            <th>Resources</th>
        </tr>
        <tr class="content">
            <td><a target="_blank" href="https://github.com/Thomilist/division-result-server">Division Result Server</a></td>
        </tr>
        <tr class="content">
            <td><a target="_blank" href="https://github.com/Thomilist/division-result-bridge">Division Result Bridge</a></td>
        </tr>
        <tr class="content">
            <td><a target="_blank" href="https://www.melin.nu/meos/en/index.php">MeOS</a></td>
        </tr>
        <tr class="content">
            <td><a target="_blank" href="https://github.com/AndersKlinting/divisionsmatchberegning/">Divisionsmatchberegning</a></td>
        </tr>
        <tr class="content">
            <td><a target="_blank" href="https://liveresultat.orientering.se/index.php?lang=en">Liveresults</a></td>
        </tr>
        <tr class="content">
            <td><a target="_blank" href="https://nodejs.org/">Node.js</a></td>
        </tr>
        <tr class="content">
            <td><a target="_blank" href="https://kit.svelte.dev/">SvelteKit</a></td>
        </tr>
        <tr class="content">
            <td><a target="_blank" href="https://www.postgresql.org/">PostgreSQL</a></td>
        </tr>
        <tr class="content">
            <td><a target="_blank" href="https://www.prisma.io/">Prisma</a></td>
        </tr>
        <tr class="content">
            <td><a target="_blank" href="https://www.oracle.com/cloud/">Oracle Cloud Infrastructure</a></td>
        </tr>
        <tr class="content">
            <td><a target="_blank" href="https://httpd.apache.org/">Apache HTTP Server</a></td>
        </tr>
        <tr class="content">
            <td><a target="_blank" href="https://www.qt.io/">Qt Framework</a></td>
        </tr>
    </table>
</div>