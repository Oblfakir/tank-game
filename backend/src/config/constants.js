const constants = {
    socketUserActionName: 'user action',
    socketStateReceiveActionName: 'state receive action',
    directions: {
        up: 'upDirection',
        down: 'downDirection',
        right: 'rightDirection',
        left: 'leftDirection'
    },
    events: {
        click: {
            up: 'clickUpEvent',
            down: 'clickDownEvent',
            right: 'clickRightEvent',
            left: 'clickLeftEvent',
            fire: 'clickFireEvent'
        }
    },
    terrainTypes: {
        grass: 'grassTerrain',
        earth: 'earthTerrain',
        stone: 'stoneTerrain',
        wall: 'wallTerrain'
    }
};

module.exports = constants;
