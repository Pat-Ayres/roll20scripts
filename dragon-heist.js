/**
 * Long Rest command for characters to use in Dragon Heist Campaign
 * CHARACTERS:
 * Hiro - Monk/Cleric
 * Whiskers - Fighter
 * Roy - Warlock
 * Mindy - Rogue
 * 
 * Commands: 
 *   !long - take a long rest
 *   !short - take a short rest
 *   !commands - see a list of available commands
 */
var DRAGONHEIST = DRAGONHEIST || (function(){
    /** set the default values for properties
     * of DRAGONHEIST on the global state
     */
    setDefaults = function(){
        // TODO: link players to their characters
    },

    /**validate that the state has persisted */
    stateCheck = function(){
        var fail = false;
        _.every(state.EASYEXPERIENCE.config.PCs,function(obj){
            if(!obj){
                state.EASYEXPERIENCE = {
                    version: schemaVersion,
                    config: {}   
                };
                setDefaults();
                loadSettings();
                outputConfig();
                sendChat('EASYEXPERIENCE','/w gm There was a corruption of PC data in the script memory. The script has reinitialized to defaults '
                    +'as shown below in the configuration output. Please submit a bug report to the script author, '
                    +'<b><u>[Scott C.](https://app.roll20.net/users/459831/scott-c)</u></b>.'//,null,{noarchive:true}
                );
                fail = true;
                return false;
            }else{return true};
        });
        return fail;
    },

    checkInstall = function(){
        var sFail;
        log('-=> EasyExperience v'+version+' <=-  ['+(new Date(lastUpdate*1000))+']');
        if(!_.has(state,'DRAGONHEIST') || state.DRAGONHEIST.version !== schemaVersion){
            state.DRAGONHEIST= state.DRAGONHEIST|| {};
            log('  > Updating Schema to v'+schemaVersion+' <');
            state.DRAGONHEIST.version = schemaVersion;
			state.DRAGONHEIST.config = state.DRAGONHEIST.config || {};
        };
        setDefaults();
        sFail = stateCheck();
        loadSettings();
        buildTemplates();
        if(sFail){
            outputConfig();
        };
	},

    registerEvents = function(){
        on("chat:message", function(msg){
            if(msg.type !== "general" || msg.content !== "take a long rest"){
                return false;
            }
            
            sendChat(msg.who, msg.who + " is taking a long rest.")
        });
    }

    return {
        CheckInstall: checkInstall,
        RegisterEvents: registerEvents
    }
}());

on("ready", function(){
    'use strict';

    DRAGONHEIST.CheckInstall();
    DRAGONHEIST.RegisterEvents();
});