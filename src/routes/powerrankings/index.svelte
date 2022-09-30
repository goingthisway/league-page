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

<div>
    <a style="color: black;">Season:</a>
    <select onchange="changeDisplay(document.getElementById('seasonContent').innerHTML=options[selectedIndex].value);">
        <option value="2022">2022</option>
        <option value="2021">2021</option>
    </select>
</div>
<div id="seasonContent" style="visibility: hidden">2022</div>
<script type="text/javascript">
    function changeDisplay(view1){
        console.log(document.getElementById("twentyTwoTable"));
        console.log(view1);
        twenty_two = document.getElementById("twentyTwoTable");
        twenty_one = document.getElementById("twentyOneTable");
        if(view1 == "2022"){
            console.log("in 2022")
            twenty_two.style.visibility = 'visible';
            twenty_one.style.visibility = 'hidden';
            twenty_two.after(twenty_one);
            console.log(document.getElementById("twentyTwoTable"));
            console.log(document.getElementById("twentyOneTable"));
        }
        else{
            console.log("in 2021")
            twenty_two.style.visibility = 'hidden';
            twenty_one.style.visibility = 'visible';
            twenty_one.after(twenty_two);
            console.log(document.getElementById("twentyTwoTable"));
            console.log(document.getElementById("twentyOneTable"));
        }
    }
</script>
<div class="twoTable" id="twentyTwoTable" style="visibility: visible;">
    <table>
      <tr>
        <th>Link</th>
        <th>Author</th>
      </tr>
      <tr>
        <td><a href="https://drive.google.com/file/d/1KcHl-yplK6Xj6YHD0sXdaVwMw_xao6C5/view?usp=sharing">Week 1</a></td>
        <td>Chern</td>
      </tr>
      <tr>
        <td><a href="https://drive.google.com/file/d/1OuxL9bX7-vBGs2bbZjm_rAfXmp4AZX2L/view?usp=sharing">Week 2</a></td>
        <td>Max</td>
      </tr>
      <tr>
        <td><a href="https://drive.google.com/file/d/18dG0v5h3Pjgi8hIlCqyBSr70GrGHnSjV/view?usp=sharing">Week 3</a></td>
        <td>Luo</td>
      </tr>
    </table>
</div>
<div class="oneTable" id="twentyOneTable" style="visibility: hidden;">
<table>
  <tr>
    <th>Link</th>
    <th>Author</th>
  </tr>
  <tr>
    <td><a href="https://docs.google.com/document/d/1XocBwsFSVmf2-Ghge-lMsFZzdOddLG8s109xJBWQFvM">Week 1</a></td>
    <td>Max</td>
  </tr>
  <tr>
    <td><a href="https://drive.google.com/file/d/1OuxL9bX7-vBGs2bbZjm_rAfXmp4AZX2L/view?usp=sharing">Week 2</a></td>
    <td>Max</td>
  </tr>
  <tr>
    <td><a href="https://drive.google.com/file/d/18dG0v5h3Pjgi8hIlCqyBSr70GrGHnSjV/view?usp=sharing">Week 3</a></td>
    <td>Luo</td>
  </tr>
  <tr>
    <td><a href="https://drive.google.com/file/d/18dG0v5h3Pjgi8hIlCqyBSr70GrGHnSjV/view?usp=sharing">Week 4</a></td>
    <td>Luo</td>
  </tr>
  <tr>
    <td><a href="https://drive.google.com/file/d/18dG0v5h3Pjgi8hIlCqyBSr70GrGHnSjV/view?usp=sharing">Week 5</a></td>
    <td>Luo</td>
  </tr>
  <tr>
    <td><a href="https://drive.google.com/file/d/18dG0v5h3Pjgi8hIlCqyBSr70GrGHnSjV/view?usp=sharing">Week 6</a></td>
    <td>Luo</td>
  </tr>
  <tr>
    <td><a href="https://drive.google.com/file/d/18dG0v5h3Pjgi8hIlCqyBSr70GrGHnSjV/view?usp=sharing">Week 7</a></td>
    <td>Luo</td>
  </tr>
  <tr>
    <td><a href="https://drive.google.com/file/d/18dG0v5h3Pjgi8hIlCqyBSr70GrGHnSjV/view?usp=sharing">Week 8</a></td>
    <td>Luo</td>
  </tr>
  <tr>
    <td><a href="https://drive.google.com/file/d/18dG0v5h3Pjgi8hIlCqyBSr70GrGHnSjV/view?usp=sharing">Week 9</a></td>
    <td>Luo</td>
  </tr>
  <tr>
    <td><a href="https://drive.google.com/file/d/18dG0v5h3Pjgi8hIlCqyBSr70GrGHnSjV/view?usp=sharing">Week 10</a></td>
    <td>Luo</td>
  </tr>
  <tr>
    <td><a href="https://drive.google.com/file/d/18dG0v5h3Pjgi8hIlCqyBSr70GrGHnSjV/view?usp=sharing">Week 11</a></td>
    <td>Luo</td>
  </tr>
  <tr>
    <td><a href="https://drive.google.com/file/d/18dG0v5h3Pjgi8hIlCqyBSr70GrGHnSjV/view?usp=sharing">Week 12</a></td>
    <td>Luo</td>
  </tr>
  <tr>
    <td><a href="https://drive.google.com/file/d/18dG0v5h3Pjgi8hIlCqyBSr70GrGHnSjV/view?usp=sharing">Week 13</a></td>
    <td>Luo</td>
  </tr>
  <tr>
    <td><a href="https://drive.google.com/file/d/18dG0v5h3Pjgi8hIlCqyBSr70GrGHnSjV/view?usp=sharing">Week 14</a></td>
    <td>Luo</td>
  </tr>
</table>
</div>
</div>