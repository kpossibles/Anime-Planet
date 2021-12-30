// ==UserScript==
// @name           Mangaupdates External Links2
// @namespace      https://greasyfork.org/en/users/126394-anan377
// @include        http://www.mangaupdates.com/series.html?id=*
// @include        https://www.mangaupdates.com/series.html?id=*
// @grant          none
// @version        1.81
// @author         anan377          
// @description    Adds external links section to MU's series info page, with Anime-Planet, MAL, MangaDex, and Anilist. Modified by kpossibles for A-P mods.
// ==/UserScript==

function getElementByClassName(elementType, className, src)
{
    if (src == null)
    {
        src = document;
    }
    var tags = src.getElementsByTagName(elementType);
    var i;
    for (i = 0; i < tags.length; i++)
    {
        if (tags[i].className == className)
        {
            return tags[i];
        }
    }
    return null;
}

function redirect(link)
{
    //var uriSite;
    //uriSite = '<meta http-equiv=refresh content=\"0;url=' +encodeURIComponent(link)+ '\">';
    //uriSite = encodeURIComponent(link);
    //return uriSite;
    return link;
    //return 'data:text/html;charset=utf-8,' + uriSite;
}

var title = document.getElementsByClassName("releasestitle tabletitle")[0].innerHTML;
var table = document.getElementsByClassName("col-6 p-2 text")[1]; // 0 = left column, 1 = right column
var lastTableElement = table.children[0]; // choose row to position Links vertically
var adsCat = document.evaluate("/html/body/div/table/tbody/tr[3]/td/table/tbody/tr/td[2]/table/tbody/tr[2]/td/table[2]/tbody/tr/td/div/div[2]/div/div[27]", document, null, XPathResult.ANY_TYPE, null).iterateNext();
var linksCat = document.createElement('div');
linksCat.className = "sCat";
linksCat.innerHTML = "<b>External Links</b>";
var linksContent = document.createElement('div');
linksContent.className = "sContent";

table.insertBefore(linksCat, lastTableElement);
table.insertBefore(linksContent, lastTableElement);
table.insertBefore(document.createElement('br'), lastTableElement);

var pageNames = new Array();
var pageAdressBeginning = new Array();
var pageAdressEnding = new Array();
var searchName = new Array();

// Anime-Planet link
pageNames.push("Anime-Planet");
pageAdressBeginning.push("http://www.anime-planet.com/manga/all?name=");
searchName.push(encodeURIComponent(title));
pageAdressEnding.push("");

//MAL
pageNames.push("MAL");
pageAdressBeginning.push("http://myanimelist.net/manga.php?q=");
searchName.push(encodeURIComponent(title));
pageAdressEnding.push("");

// MangaDex link
pageNames.push("MangaDex");
//pageAdressBeginning.push("https://mangadex.org/?page=search&title=");
//new MangaDex search query
pageAdressBeginning.push("https://mangadex.org/titles?q=");
searchName.push(encodeURIComponent(title));
pageAdressEnding.push("");

// Anilist.Co
pageNames.push("AniList");
pageAdressBeginning.push("https://anilist.co/search/manga?sort=SEARCH_MATCH&search=");
searchName.push(encodeURIComponent(title));
pageAdressEnding.push("");

var tagsNode = document.getElementById("ajax_tag_data");
if (tagsNode !== null)
{
    var tags = tagsNode.innerHTML;
    //AniDB link
    if(tags.search("Adapted to Anime") >= 0 || tags.search("Based on an Anime") >= 0)
    {
        pageNames.push("AniDB");
        pageAdressBeginning.push("http://anidb.net/perl-bin/animedb.pl?show=animelist&adb.search=");
        searchName.push(encodeURIComponent(title));
        pageAdressEnding.push("&do.search=search");
    }
}


// broken
pageNames.push("");
pageAdressBeginning.push("http://0.0.0.0/");
searchName.push(encodeURIComponent(title));
pageAdressEnding.push("");


for(var i = 0; i < pageNames.length; i++)
{
    var newLink = document.createElement('a');
    newLink.href = redirect(pageAdressBeginning[i] + searchName[i] + pageAdressEnding[i]);
    newLink.innerHTML = pageNames[i];
    linksContent.appendChild(newLink);
    if (i < pageNames.length - 1)
    {
        linksContent.appendChild(document.createTextNode(", "));
    }
}
