<script context="module">
  export const prerender = true;
</script>

<script>
    import { dues } from '$lib/utils/helper';
    let one, oneOne, oneOneOne, oneTwo, oneTwoOne, oneTwoTwo, oneTwoThree, oneTwoFour, oneTwoFive, oneThree;
    let two, twoOne, twoTwo, twoThree;
    let three, threeOne;
    let four, fourOne, fourTwo;
    let five, fiveOne;
    let six, sixOne, sixTwo, sixThree;
    let seven, sevenOne, sevenTwo, sevenThree;

    const goToSection = (section) => {
        const top = section.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({left: 0, top, behavior: 'smooth'});
    }
</script>

<style>
    .powerrankings {
        position: relative;
        z-index: 1;
        width: 92%;
        max-width: 800px;
        margin: 8em auto 10em;
    }

    h1 {
        font-size: 2em;
        line-height: 1.2em;
        text-align: center;
        margin: 2em 0 1.5em;
    }

    h2 {
        font-size: 1.5em;
        line-height: 1.2em;
    }

    h3 {
        text-decoration: underline;
        font-size: 1.3em;
        line-height: 1.2em;
    }

    h4 {
        text-decoration: underline;
        margin-left: 2em;
        font-size: 1.2em;
        line-height: 1.2em;
    }

    h5 {
        margin-left: 6em;
        font-size: 0.8em;
        line-height: 1.1em;
    }

    .subBlock {
        margin-left: 2.4em;
    }

    .sectionHeading {
        margin: 4em 0 1.5em;
    }

    .subSectionHeading {
        margin: 1.5em 0 1.5em;
    }

    .underscore {
        text-decoration: underline;
    }

    .right {
        text-align: right;
    }

    .positionMaximums td {
        min-width: 3em;
    }

    .noUnderscore {
        text-decoration: none;
    }

    .clickable {
        cursor: pointer;
    }

    .clickable:hover {
        color: #00316b;
    }

    p {
        color: #777;
    }
</style>

<div class="powerrankings">
    <h1 class="noUnderscore">League of Horses Power Rankings</h1>
    
    <h2 class="noUnderscore"><a href="https://docs.google.com/document/d/1CBAjr63X8JkzPCyxYRt-8hGvaSdOfPwAYSD-UaegiAg">League of Horses 2022 Season</a></h2> 

    <h2 class="noUnderscore"><a href="https://docs.google.com/spreadsheets/d/1MjXdye2mM4ieUQhGOE9s_ZMYLrnLOn1aCj9TXC3ziY4">League of Horses 2022 Bonus Schedule</a></h2>

<body>
   <script>
        function handleSelect(season) 
        {
            var twentyTwo = "<table><tr><td>22</td></tr></table>";
            var twentyOne = "<table><tr><td>21</td></tr></table>";
            switch(season)
            {
                case "twentyTwo":
                    document.getElementById("myTableContainer").innerHTML = twentyTwo
                case "twentyOne":
                    document.getElementById("myTableContainer").innerHTML = twentyOne
                break;
            }
        }
</script>
<select name="dropdown" id="dropdown" onLoad="handleSelect(this.value)" onChange="handleSelect(this.value)">
<option value="2022" selected>twentyTwo</option>
<option value="2021">twentyOne</option>
</select>
 <div id="myTableContainer"></div>

 </body>
</div>