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
    <h1 class="noUnderscore" style="font-weight: bold">League of Horses Power Rankings</h1>
    <div>Each week, the lowest scorer in the league is required to write a weekly recap or power ranking of the league. This page
    is an archive of all previous power rankings. </div><p></p>
<div>
    <a style="color: black;">Season:</a>
    <select onchange="changeDisplay(document.getElementById('seasonContent').innerHTML=options[selectedIndex].value);">
        <option value="2024">2021</option>
        <option value="2023">2023</option>
        <option value="2022">2022</option>
        <option value="2021">2021</option>
    </select>
</div>
<div id="seasonContent" style="visibility: hidden">2023</div>
<script type="text/javascript">
    function changeDisplay(view1){
        twenty_four = document.getElementById("twentyFourTable");
        twenty_three = document.getElementById("twentyThreeTable");
        twenty_two = document.getElementById("twentyTwoTable");
        twenty_one = document.getElementById("twentyOneTable");
        if(view1 == "2024"){
            twenty_three.before(twenty_three, twenty_two, twenty_one);
            twenty_four.style.visibility = 'visible';
            twenty_three.style.visibility = 'collapse';
            twenty_two.style.visibility = 'collapse';
            twenty_one.style.visibility = 'collapse';
        }
        else if(view1 == "2023"){
            twenty_three.before(twenty_four, twenty_two, twenty_one);
            twenty_four.style.visibility = 'collapse';
            twenty_three.style.visibility = 'visible';
            twenty_two.style.visibility = 'collapse';
            twenty_one.style.visibility = 'collapse';
        }
        else if(view1 == "2022"){
            twenty_two.before(twenty_four, twenty_three, twenty_one);
            twenty_four.style.visibility = 'collapse';
            twenty_three.style.visibility = 'collapse';
            twenty_two.style.visibility = 'visible';
            twenty_one.style.visibility = 'collapse';
        }
        else{
            twenty_one.before(twenty_four, twenty_three, twenty_two);
            twenty_four.style.visibility = 'collapse';
            twenty_three.style.visibility = 'collapse';
            twenty_two.style.visibility = 'collapse';
            twenty_one.style.visibility = 'visible';
        }
    }
</script>
<div class="fourTable" id="twentyFourTable" style="visibility: visible;">
    <table>
      <tr>
        <th>Link</th>
        <th>Author</th>
        <th>Weekly Metrics</th>
      </tr>
      <tr>
        <td><a href="https://www.youtube.com/watch?v=1GiPcP30cFc">Week 1</a></td>
        <td>Mark</td>
        <td><a href="https://drive.google.com/file/d/1Ju-qwVoLhdgjCaenbsESSaDEkh9YQU4N">Week 1 League Metrics</a></td>
      </tr>
      
<!--       <tr>
        <td><a href="https://www.youtube.com/watch?v=1GiPcP30cFc">Week 12</a></td>
        <td>Richard</td>
        <td><a href="https://drive.google.com/file/d/1T1l0pH5Qq63k174u7EkIyr4TwwWbRXYi">Week 12 League Metrics</a></td>
      </tr> -->
    </table>
</div>
<div class="threeTable" id="twentyThreeTable" style="visibility: hidden;">
    <table>
      <tr>
        <th>Link</th>
        <th>Author</th>
        <th>Weekly Metrics</th>
      </tr>
      <tr>
        <td><a href="https://docs.google.com/document/d/16ivIEL2z3z9Y2FGfnHlltBON_8PAcXX68CFiD4JufcI">Week 1</a></td>
        <td>Aidan</td>
        <td><a href="https://drive.google.com/file/d/1Ju-qwVoLhdgjCaenbsESSaDEkh9YQU4N">Week 1 League Metrics</a></td>
      </tr>
      <tr>
        <td><a href="https://docs.google.com/document/d/1KDzFIACSRdNpxyhGMnl-T1dh18hr2GEMon7aXAFms5E">Week 2</a></td>
        <td>Luo</td>
        <td><a href="https://drive.google.com/file/d/1Kkq6BT9tmegCGEhAJJ_azwJAyDC1qPK7">Week 2 League Metrics</a></td>
      </tr>      
      <tr>
        <td><a href="https://docs.google.com/presentation/d/1ibuW4Ht1x1e_nRWJKnRhI9Nr0FG-zf52sEci2d1bBYo">Week 3</a></td>
        <td>Ian</td>
        <td><a href="https://drive.google.com/file/d/1LKhg1XKBB8OX_RrV1huuL6GtJpkcavx7">Week 3 League Metrics</a></td>
      </tr>
      <tr>
        <td><a href="https://docs.google.com/document/d/1UV5Rufv9A7n4EKuj-ZoTziOXszXIswYzfWrwluf9fPg">Week 4</a></td>
        <td>Luo</td>
        <td><a href="https://drive.google.com/file/d/1JSPgmRhXvw_e8lj6DJQQetS0Lq4_ioOp">Week 4 League Metrics</a></td>
      </tr>
      <tr>
        <td><a href="https://docs.google.com/document/d/1bcsXtMlWMi-J0Nl5VhX4oGVIbzxtqs0HKvDZeQoSayo">Week 5</a></td>
        <td>Austin</td>
        <td><a href="https://drive.google.com/file/d/1i22e6HrD-4x-YEzy1UOIAqsUGfn9kkN4">Week 5 League Metrics</a></td>
      </tr>
      <tr>
        <td><a href="https://www.youtube.com/watch?v=1GiPcP30cFc">Week 6</a></td>
        <td>Luo (Fine paid)</td>
        <td><a href="https://drive.google.com/file/d/1iNEVQafJ2ZNYdExKzSSXmm-gVFL_SXDf">Week 6 League Metrics</a></td>
      </tr>
      <tr>
        <td><a href="https://www.youtube.com/watch?v=1GiPcP30cFc">Week 7</a></td>
        <td>Kevin (Fine paid)</td>
        <td><a href="https://drive.google.com/file/d/1EyNCC5GAgAPWwWrKvBQUUEZo98f6dRgc">Week 7 League Metrics</a></td>
      </tr>
      <tr>
        <td><a href="https://docs.google.com/document/d/1He2j06HL_nRFYiarSdD1MVcn2Fz7zdlfSYFaaEGCRcY">Week 8</a></td>
        <td>Austin</td>
        <td><a href="https://drive.google.com/file/d/1ZcaDczvF3KuA-33Ad1YJ-7J19PUiSy1H">Week 8 League Metrics</a></td>
      </tr>
      <tr>
        <td><a href="https://www.youtube.com/watch?v=1GiPcP30cFc">Week 9</a></td>
        <td>Brian (Fine paid)</td>
        <td><a href="https://drive.google.com/file/d/1Bp-os0Nuz38Yy0BqN2fbjz7Ph6oWToSq">Week 9 League Metrics</a></td>
      </tr>
      <tr>
        <td><a href="https://www.youtube.com/watch?v=HlgVE-tP_cw">Week 10 "power rankings"</a></td>
        <td>Austin</td>
        <td><a href="https://drive.google.com/file/d/195l0XSWrdubrWz9T3wo0wiG-7yk7Ir2H">Week 10 League Metrics</a></td>
      </tr>
      <tr>
        <td><a href="https://www.youtube.com/watch?v=1GiPcP30cFc">Week 11</a></td>
        <td>Kevin (Fine Paid)</td>
        <td><a href="https://drive.google.com/file/d/1agKYnSJtispTsfo-_JPrbXjrLEFmU8VO">Week 11 League Metrics</a></td>
      </tr>
      <tr>
        <td><a href="https://docs.google.com/document/d/1wnsLUNApX1cavNlJU1M2x8fAgNKPuzne3QaCxNgwozo">Week 12</a></td>
        <td>Max</td>
        <td><a href="https://drive.google.com/file/d/1fUDoplspGK5zZL5hSuw8vsZOtcyY27-a">Week 12 League Metrics</a></td>
      </tr>
      <tr>
        <td><a href="https://docs.google.com/document/d/19kl4xqhkRbq1Co1LTl-rJJ7Mt5EBofFSYFZSEzcgBK0">Week 13</a></td>
        <td>Max</td>
        <td><a href="https://drive.google.com/file/d/1ZWFG7xunOooOZ_L4722z8QlKktsJwrhT">Week 13 League Metrics</a></td>
      </tr>      
      <tr>
        <td><a href="https://docs.google.com/document/d/19kl4xqhkRbq1Co1LTl-rJJ7Mt5EBofFSYFZSEzcgBK0">Week 14</a></td>
        <td>Bao</td>
        <td><a href="https://drive.google.com/file/d/13OZx0ayjAEiZ1duAyKC4WezPHTnKLmOQ">Week 14 League Metrics</a></td>
      </tr>
      
<!--       <tr>
        <td><a href="https://www.youtube.com/watch?v=1GiPcP30cFc">Week 12</a></td>
        <td>Richard</td>
        <td><a href="https://drive.google.com/file/d/1T1l0pH5Qq63k174u7EkIyr4TwwWbRXYi">Week 12 League Metrics</a></td>
      </tr> -->
    </table>
</div>


<div class="twoTable" id="twentyTwoTable" style="visibility: hidden;">
    <table>
      <tr>
        <th>Link</th>
        <th>Author</th>
        <th>Weekly Metrics</th>
      </tr>
      <tr>
        <td><a href="https://docs.google.com/document/d/1t1zDomETXJcNxgbeAsJbtff9QHe6iYzegB90TFjxU4Q">Week 1</a></td>
        <td>Chern</td>
        <td><a href="https://drive.google.com/file/d/1KcHl-yplK6Xj6YHD0sXdaVwMw_xao6C5">Week 1 League Metrics</a></td>
      </tr>
      <tr>
        <td><a href="https://docs.google.com/document/d/1MpY-6Kv4ArpVlBAjCF0_soH-DNkKmAeZu_e8Kivf_z4">Week 2</a></td>
        <td>Max</td>
        <td><a href="https://drive.google.com/file/d/1OuxL9bX7-vBGs2bbZjm_rAfXmp4AZX2L">Week 2 League Metrics</a></td>
      </tr>
      <tr>
        <td><a href="https://docs.google.com/document/d/171EsAGTRMlr0WGhesU2kIy0j9rMhgG1wubSgKOwr1Dc">Week 3</a></td>
        <td>Luo</td>
        <td><a href="https://drive.google.com/file/d/18dG0v5h3Pjgi8hIlCqyBSr70GrGHnSjV">Week 3 League Metrics</a></td>
      </tr>
      <tr>
        <td><a href="https://docs.google.com/document/d/1pHwwz252W7JimREtVMwLQsRRxDMTFnkCaIolshDeM0k">Week 4</a></td>
        <td>Ian</td>
        <td><a href="https://drive.google.com/file/d/1IPRSqdzPTBWqY50reVAy9xVu9yj69Lzc">Week 4 League Metrics</a></td>
      </tr>
      <tr>
        <td><a href="https://docs.google.com/document/d/1Rq_P5px2Xg4CG19jKSVc841gAwy1ymKqg5bjsebr4Qs">Week 5</a></td>
        <td>Bao</td>
        <td><a href="https://drive.google.com/file/d/1vH3QoPqgVjFufTsdAgsPzZJTdBlh5M_d">Week 5 League Metrics</a></td>
      </tr>
      <tr>
        <td><a href="https://docs.google.com/document/d/11_gGFcxn7BRpZBoOWebceRO2xoK26wIg4jzrOEhXKhM">Week 6</a></td>
        <td>Luo</td>
        <td><a href="https://drive.google.com/file/d/1CHpAjVpJHOS33DTwfNzJ5OGIjPQp45Yn">Week 6 League Metrics</a></td>
      </tr>
      <tr>
        <td><a href="https://docs.google.com/document/d/1v1Agjk4p9NFxbsBkOD1yuzrxnz7W19Saq535-W332ds">Week 7</a></td>
        <td>Aidan</td>
        <td><a href="https://drive.google.com/file/d/1Q6t2TvTqixepl540TBJN0h1GTzW6VoWK">Week 7 League Metrics</a></td>
      </tr>
      <tr>
        <td><a href="https://docs.google.com/document/d/1O64-AkOHNLJu29FAnLO-cRKIo4zLMZ1KZ4p-7XOmS1E">Week 8</a></td>
        <td>Daniel</td>
        <td><a href="https://drive.google.com/file/d/1Mhv6uxZwwxa0POjRpENY6nUSKWBty1a_">Week 8 League Metrics</a></td>
      </tr>
      <tr>
        <td><a href="https://docs.google.com/document/d/1N93-5dJeOkpKeGQfrB6pnjVA_cED37G3TrwEPT-RO1w">Week 9</a></td>
        <td>Chern</td>
        <td><a href="https://drive.google.com/file/d/1lTs0eOfmXZoHbDeVpITOc7f8TakKldFj">Week 9 League Metrics</a></td>
      </tr>
      <tr>
        <td><a href="https://docs.google.com/document/d/1FntSxRDjrD2DEmUzzSYXZjJ3b4i5j1jLEBI3XqwAVTU">Week 10</a></td>
        <td>Ian</td>
        <td><a href="https://drive.google.com/file/d/16SUftV3bC2JSjdQkFdalTjEkFHVPvcV-">Week 10 League Metrics</a></td>
      </tr>
      <tr>
        <td><a href="https://docs.google.com/document/d/1_rN-Dy_HgNwWXPJ_xa05fRnbC1175bkyJXkofGbmw7w">Week 11</a></td>
        <td>Richard</td>
        <td><a href="https://drive.google.com/file/d/1T1l0pH5Qq63k174u7EkIyr4TwwWbRXYi">Week 11 League Metrics</a></td>
      </tr>
      <tr>
        <td><a href="https://www.youtube.com/watch?v=1GiPcP30cFc">Week 12</a></td>
        <td>Luo</td>
        <td><a href="https://drive.google.com/file/d/1DNr9eeMKN_X81ntzwBqSwcyPremoxpnz">Week 12 League Metrics</a></td>
      </tr>
      <tr>
        <td><a href="https://docs.google.com/document/d/1__ZejHcpCt7-yDYQ1Dw6ZikTadI19G6T5QZhtughBKQ">Week 13</a></td>
        <td>Luo</td>
        <td><a href="https://drive.google.com/file/d/1J7CQvoKNAdwRHSIuU2yA6D1K_AfmcLaC">Week 13 League Metrics</a></td>
      </tr>
      <tr>
        <td><a href="https://www.youtube.com/watch?v=1GiPcP30cFc">Week 14</a></td>
        <td>Richard</td>
        <td><a href="https://drive.google.com/file/d/1KA4YQgrmvZV03JDiQYsGkCP7RfrVnSu_">Week 14 League Metrics</a></td>
      </tr>
      
<!--       <tr>
        <td><a href="https://www.youtube.com/watch?v=1GiPcP30cFc">Week 12</a></td>
        <td>Richard</td>
        <td><a href="https://drive.google.com/file/d/1T1l0pH5Qq63k174u7EkIyr4TwwWbRXYi">Week 12 League Metrics</a></td>
      </tr> -->

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
    <td><a href="https://docs.google.com/document/d/1wKWTQX0O_paTfkGgMJ_h18ShdijvkZK8e8VnQIDhAH8">Week 2</a></td>
    <td>Max</td>
  </tr>
  <tr>
    <td><a href="https://docs.google.com/document/d/1j9urHUNMHyXNiLp9iiab43CbF9m4rjoaA9Awjep5R9o">Week 3</a></td>
    <td>Richard</td>
  </tr>
  <tr>
    <td><a href="https://docs.google.com/document/d/1AU5uBy7uKWws_kBnsSdV0_AUVCV1NhugNL3j5Xoflp8">Week 4</a></td>
    <td>Aidan</td>
  </tr>
  <tr>
    <td><a href="https://docs.google.com/document/d/1K-bHwd9LsWyTMVEw2Es363ARuof476aV4pQQ4hErn8g">Week 5</a></td>
    <td>Richard</td>
  </tr>
  <tr>
    <td><a href="https://docs.google.com/document/d/17PluiqHJdDJlCgyDg0yCMJk3a2znjC-feWKs2r72XIQ">Week 6</a></td>
    <td>Max</td>
  </tr>
  <tr>
    <td><a href="https://docs.google.com/document/d/1u0X-OEvRkI4QSd7hRbl-OQa-tFakvICTWgkf40pKmXI">Week 7</a></td>
    <td>Austin</td>
  </tr>
  <tr>
    <td><a href="https://docs.google.com/document/d/1GkppIAwKjfgy4NTT7Lx3LtDCXb2ILt-dFpvqNa39UZ0">Week 8</a></td>
    <td>Aidan</td>
  </tr>
  <tr>
    <td><a href="https://docs.google.com/document/d/1VQbRyd2SvCeIn8dSC-Bzci8tpohaVJqcqcrVF21IdrM">Week 9</a></td>
    <td>Richard</td>
  </tr>
  <tr>
    <td><a href="https://www.youtube.com/watch?v=1GiPcP30cFc">Week 10</a></td>
    <td>Richard - Fine Paid</td>
  </tr>
  <tr>
    <td><a href="https://docs.google.com/document/d/1rdYIlc4l7n_uKGorLjAwHHu2eMKWWpbqioZWiMNYiSM">Week 11</a></td>
    <td>Austin</td>
  </tr>
  <tr>
    <td><a href="https://docs.google.com/document/d/1n4EfMWPwySH5826jgRxWC03fiQSgTQAMc84CALbyR04">Week 12</a></td>
    <td>Brian</td>
  </tr>
  <tr>
    <td><a href="https://docs.google.com/document/d/1n4EfMWPwySH5826jgRxWC03fiQSgTQAMc84CALbyR04">Week 13</a></td>
    <td>Brian</td>
  </tr>
  <tr>
    <td><a href="https://www.youtube.com/watch?v=1GiPcP30cFc">Week 14</a></td>
    <td>Kevin - Fine Paid</td>
  </tr>
  <tr>
    <td><a href="https://docs.google.com/document/d/1n4EfMWPwySH5826jgRxWC03fiQSgTQAMc84CALbyR04">Week 15</a></td>
    <td>Brian</td>
  </tr>
  <tr>
    <td><a href="https://docs.google.com/document/d/1n4EfMWPwySH5826jgRxWC03fiQSgTQAMc84CALbyR04">Week 16</a></td>
    <td>Brian</td>
  </tr>
</table>
</div>
</div>