String.prototype.replaceAll = function(search, replace)
{
    //if replace is null, return original string otherwise it will
    //replace search string with 'undefined'.
    if(!replace) 
        return this;

    return this.replace(new RegExp('[' + search + ']', 'g'), replace);
};


function github(username){
    var mess = "Repositories:\n";
    var list = [];

    jQuery.githubUser = function(username, callback) {
        jQuery.getJSON('https://api.github.com/users/'+username+'/repos?callback=?',callback);
    }
    

    $.githubUser(username, function(data) {
        var repos = data.data; // JSON Parsing
        
        $(repos).each(function() {
            var message = this.name + " - " + this.description + "\n";
            if (this.name != (username.toLowerCase()+'.github.com')) {
               
                list.push(message);
                mess += message;
            }
            
        });
        console.log(mess);
        return mess;
    });
   
 return mess;
}

// Command map
var commandMap = {};
var commandFunctionMap = {};

function init(){
    splash += introduction;
    splash += "\n" + lookingfor;
    splash += contact;
    splash += "\nType [[b;#ffffff;#000]help] for commands\n"

    commandMap["name"] = " - owner of the résumé.";
    commandFunctionMap["name"] = name;

    commandMap["whoami"] = " - an introduction to who I am.";
    commandFunctionMap["whoami"] = introduction;

    commandMap["location"] = " - current location.";
    commandFunctionMap["location"] = loc;

    commandMap["lookingfor"] = " - looking for.";
    commandFunctionMap["lookingfor"] = lookingfor;

    commandMap["education"] = " - education history. [-top]";
    commandFunctionMap["education -top"] = getTop(education);
    commandFunctionMap["education"] = getAll("Education:\n", education);

    commandMap["employment"] = " - employment history. [-top]";
    commandFunctionMap["employment -top"] = getTop(employment);
    commandFunctionMap["employment"] = getAll("Employment:\n", employment);

    commandMap["projects"] = " - a list of personal projects which I have been working on.";
    commandFunctionMap["projects"] = getAllProjects("Projects:\n", projects);

    commandMap["skills"] = " - skills obtained. [-languages|l][-tools|t][-concepts|c]";
    commandFunctionMap["skills"] = getSkillTable();
    commandFunctionMap["skills -l"] = commandFunctionMap["skills -language"] 
        = getAll("Languages:\n", skillsLanguages);
    commandFunctionMap["skills -t"] = commandFunctionMap["skills -tools"] 
        = getAll("Tools:\n", skillsTools);
    commandFunctionMap["skills -c"] = commandFunctionMap["skills -concepts"] 
        = getAll("Concepts:\n", skillsConcepts);

    commandMap["volunteering"] = " - volunteering history. [-top]";
    commandFunctionMap["volunteering -top"] = getTop(volunteering);
    commandFunctionMap["volunteering"] = getAll("Volunteering:\n", volunteering);

    commandMap["github"] = " - list Github repositories.";

    commandMap["socialmedia"] = " - Social Media profiles.";
    commandFunctionMap["socialmedia"] = getSocialMedia();

    commandMap["pgpkey"] = " - my public PGP key. Signature: 474AC37D";
    commandFunctionMap["pgpkey"] = publicPGPkey;

    commandMap["pdf"] = " - pdf version of the resume.";
    commandFunctionMap["pdf"] = pdfLink;

    commandMap["splash"] = " - print the welcome screen.";
    commandFunctionMap["splash"] = splash;

    commandMap["clear"] = " - clear command history from screen.";

    commandMap.getKeys = function (){
    var commands = "Available Commands:\n";
    for(var key in this) {

        if( typeof this[key] !== 'function') {
            commands += "   [[b;#ffffff;#000]" + key + "]" + commandMap[key] + "\n";
        }
    }
    return commands;
    };
}

//function pdf(){
//    window.open(pdfLink);
//    return "Hint: May need to allow pop-ups.";
//}

function getAll(result, array){ 
    array.map( function(item) {
        result += (item.join()).replaceAll(",","\t") + "\n";
    });
    return result;
}

function getAllProjects(result, array){ 
    array.map( function(item) {
        result += (item.join()).replaceAll(",","\n") + "\n\n";
    });
    return result;
}

function getSocialMedia(){
    var result = "Social Media:\n";
    socialMedia.map(function(item){
        if (item[1].length > 0){
            result += item[0] + " - " + item[1] + "\n";
        }
    });
    return result;
}

function getRequired(skillList){
    var result = [];
    var i = 0;
    skillList.map(function(item){
        result[i] = item[1];
        i++;
    });
    return result;
}

function getSkillTable(){
    var result = "";

    var languages = "Languages:\n";
    result += getAll(languages, skillsLanguages);

    var tools = "\nTools:\n";
    result += getAll(tools, skillsTools);

    var concepts = "\nConcepts:\n";
    result += getAll(concepts, skillsConcepts) + "\n";

    return result;
}

function getTop(array){
    return (array[0].join()).replaceAll(",","\t");
}

