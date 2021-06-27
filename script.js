var settings = {
    baseURL: "https://v2.jokeapi.dev",
    jokeEndpoint: "joke",
    anyCategoryName: "Any",
    defaultFormat: "json",
    submitUrl: "https://v2.jokeapi.dev/submit",
    defaultLang: "en",
    formatVersion: 3,
    categoryAliasesObject: JSON.parse('{"Miscellaneous":"Misc","Coding":"Programming","Development":"Programming","Halloween":"Spooky"}')
};

var tryItURL = "";

function gebid(id){return document.getElementById(id);}
var maxJokeIdRange = parseInt("342");


function reRender(langChanged)
{
    console.info("Re-rendering try-it form");

    var allOk = true;

    //#SECTION category
    var isValid = false;
    document.getElementsByName("catSelect").forEach(function(el) {
        if(!el.checked)
            return;

        if(el.value == "any")
        {
            isValid = true;
            ["cat-cb1", "cat-cb2", "cat-cb3", "cat-cb4", "cat-cb5", "cat-cb6"].forEach(function(cat) {
                gebid(cat).disabled = true;
            });
        }
        else
        {
            var isChecked = false;
            ["cat-cb1", "cat-cb2", "cat-cb3", "cat-cb4", "cat-cb5", "cat-cb6"].forEach(function(cat) {
                var cel = gebid(cat);
                cel.disabled = false;

                if(cel.checked)
                    isChecked = true;
            });

            if(isChecked)
                isValid = true;
        }
    });

    if(!isValid)
    {
        allOk = false;
        gebid("categoryWrapper").style.borderColor = "red";
    }
    else
    {
        gebid("categoryWrapper").style.borderColor = "initial";
    }

    buildURL();
}

//#MARKER build URL
function buildURL()
{
    var queryParams = [];

    //#SECTION categories
    var selectedCategories = [settings.anyCategoryName];
    if(gebid("cat-radio2").checked)
    {
        selectedCategories = [];
        if(gebid("cat-cb1").checked)
        {
            selectedCategories.push("Programming");
        }
        if(gebid("cat-cb2").checked)
        {
            selectedCategories.push("Miscellaneous");
        }
        if(gebid("cat-cb3").checked)
        {
            selectedCategories.push("Dark");
        }
        if(gebid("cat-cb4").checked)
        {
            selectedCategories.push("Pun");
        }
        if(gebid("cat-cb5").checked)
        {
            selectedCategories.push("Spooky");
        }
        if(gebid("cat-cb6").checked)
        {
            selectedCategories.push("Christmas");
        }

        if(selectedCategories.length == 0)
        {
            selectedCategories.push(settings.anyCategoryName);
        }
    }

    //#SECTION flags
    var flagElems = [gebid("blf-cb1"), gebid("blf-cb2"), gebid("blf-cb3"), gebid("blf-cb4"), gebid("blf-cb5"), gebid("blf-cb6")];
    var flagNames = JSON.parse('["nsfw","religious","political","racist","sexist","explicit"]');
    var selectedFlags = [];
    flagElems.forEach(function(el, i) {
        if(el.checked)
        {
            selectedFlags.push(flagNames[i]);
        }
    });

    if(selectedFlags.length > 0)
    {
        queryParams.push("blacklistFlags=" + selectedFlags.join(","));
    }


    //#SECTION type
    var singleJoke = gebid("typ-cb1").checked;
    var twopartJoke = gebid("typ-cb2").checked;
    if(singleJoke ^ twopartJoke == 1)
    {
        if(singleJoke)
        {
            queryParams.push("type=single");
        }
        else if(twopartJoke)
        {
            queryParams.push("type=twopart");
        }
    }


    //#SECTION search string
    var sstr = gebid("searchStringInput").value;
    if(sstr)
    {
        queryParams.push("contains=" + encodeURIComponent(sstr));
    }


    tryItURL = settings.baseURL + "/" + settings.jokeEndpoint + "/" + selectedCategories.join(",");

    if(queryParams.length > 0)
    {
        tryItURL += "?" + queryParams.join("&");
    }

    gebid("urlBuilderUrl").innerText = tryItURL;
}

const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// VoiceRSS Javascript SDK
const VoiceRSS={speech:function(e){this._validate(e),this._request(e)},_validate:function(e){if(!e)throw"The settings are undefined";if(!e.key)throw"The API key is undefined";if(!e.src)throw"The text is undefined";if(!e.hl)throw"The language is undefined";if(e.c&&"auto"!=e.c.toLowerCase()){var a=!1;switch(e.c.toLowerCase()){case"mp3":a=(new Audio).canPlayType("audio/mpeg").replace("no","");break;case"wav":a=(new Audio).canPlayType("audio/wav").replace("no","");break;case"aac":a=(new Audio).canPlayType("audio/aac").replace("no","");break;case"ogg":a=(new Audio).canPlayType("audio/ogg").replace("no","");break;case"caf":a=(new Audio).canPlayType("audio/x-caf").replace("no","")}if(!a)throw"The browser does not support the audio codec "+e.c}},_request:function(e){var a=this._buildRequest(e),t=this._getXHR();t.onreadystatechange=function(){if(4==t.readyState&&200==t.status){if(0==t.responseText.indexOf("ERROR"))throw t.responseText;audioElement.src=t.responseText,audioElement.play()}},t.open("POST","https://api.voicerss.org/",!0),t.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8"),t.send(a)},_buildRequest:function(e){var a=e.c&&"auto"!=e.c.toLowerCase()?e.c:this._detectCodec();return"key="+(e.key||"")+"&src="+(e.src||"")+"&hl="+(e.hl||"")+"&r="+(e.r||"")+"&c="+(a||"")+"&f="+(e.f||"")+"&ssml="+(e.ssml||"")+"&b64=true"},_detectCodec:function(){var e=new Audio;return e.canPlayType("audio/mpeg").replace("no","")?"mp3":e.canPlayType("audio/wav").replace("no","")?"wav":e.canPlayType("audio/aac").replace("no","")?"aac":e.canPlayType("audio/ogg").replace("no","")?"ogg":e.canPlayType("audio/x-caf").replace("no","")?"caf":""},_getXHR:function(){try{return new XMLHttpRequest}catch(e){}try{return new ActiveXObject("Msxml3.XMLHTTP")}catch(e){}try{return new ActiveXObject("Msxml2.XMLHTTP.6.0")}catch(e){}try{return new ActiveXObject("Msxml2.XMLHTTP.3.0")}catch(e){}try{return new ActiveXObject("Msxml2.XMLHTTP")}catch(e){}try{return new ActiveXObject("Microsoft.XMLHTTP")}catch(e){}throw"The browser does not support HTTP request"}};

//Disable/Enable button
function toggleButton() {
    button.disabled = !button.disabled; 
}

function tellMe(joke) {
        VoiceRSS.speech({
        key: '693c113dab744d1abe0d946585a345f6',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

async function getjokes() {
    let joke = '';
    const apiUrl = tryItURL;
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        }
        else {
            joke = data.joke;
        }
        tellMe(joke);
        toggleButton();
    }

    catch (error) {
        console.log('Error', error);
    }
}

//Event listeners
button.addEventListener('click', getjokes);
audioElement.addEventListener('ended', toggleButton);
