title: "Senátorské grafy"
perex: "Pro Petra"
authors: ["<a href='https://www.irozhlas.cz/michal-zlatkovsky-5343912'>Michal Zlatkovský</a>"]
published: "20. dubna 2017"
coverimg: https://interaktivni.rozhlas.cz/brexit/media/cover.jpg
coverimg_note: "Foto <a href='#'>ČTK</a>"
styles: []
libraries: [jquery]
options: "noheader, nopic" #wide, noheader (+nopic)
---

<style>
.law {
    border-radius: 50%;
    display: inline-block;
    width: 10px;
    height: 10px;
    background: #e31a1c;
    margin-left: 2px;
}
.senBox {
    font-size: smaller;
}
.senInfo {
    font-size: x-small;
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

.tooltip
{
    text-align: center;
    font-size: smaller;
    color: #fff;
    background: rgba(0,0,0,0.8);
    position: absolute;
    z-index: 100;
    padding: 5px;
}

.tooltip a {
    color: #fff;
}

@media only screen and (max-width: 600px) {
    .law {
        width: 8px;
        height: 8px;
    }

    td {
        padding-bottom: 10px;
    }
}
</style>

Kolik kdo navrhl zákonů
<table id="graf1"></table>

Kolika senátním tiskům dělali zpravodaje
<table id="graf2"></table>