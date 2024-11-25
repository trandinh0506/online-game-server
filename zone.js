class zone {
    constructor() {
        this.players = {};
        this.monsters = [];
    }
    update() {}
}

export default new zone();

/*
maps
{
    "mapid/zoneid": {
        zone.players[playerid]
    },

}
players
{
    "playerid": {
        ...
        player properties
        ...
    }
}
*/
