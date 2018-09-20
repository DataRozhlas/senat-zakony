title: "Senátorské grafy"
perex: "Pro Petra"
authors: ["<a href='https://www.irozhlas.cz/michal-zlatkovsky-5343912'>Michal Zlatkovský</a>"]
published: "20. dubna 2017"
coverimg: https://interaktivni.rozhlas.cz/brexit/media/cover.jpg
coverimg_note: "Foto <a href='#'>ČTK</a>"
styles: []
libraries: [jquery, "https://unpkg.com/popper.js/dist/umd/popper.min.js", "https://unpkg.com/tooltip.js/dist/umd/tooltip.min.js"]
options: "noheader, nopic" #wide, noheader (+nopic)
---

<style>
.law {
    border-radius: 50%;
    display: inline-block;
    width: 10px;
    height: 10px;
    background: #e31a1c;
    margin-left: 5px;
}

.tooltip-arrow {
    background: gray;
}

.tooltip-inner {
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 5px;
    padding: 5px;
}

.senInfo {
    font-size: small;
}
.submitted {
    font-size: small;
    font-style: italic;
}

td {
    padding-left: 10px;
    padding-right: 10px;
    vertical-align: middle;
}
</style>

Kolik kdo navrhl zákonů
<table id="graf1"></table>

Kolika senátním tiskům dělali zpravodaje
<div id="graf2"></div>

