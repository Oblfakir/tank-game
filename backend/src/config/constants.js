const constants = {
    socketUserActionName: 'user move action',
    socketStateReceiveActionName: 'state receive action',
    directions: {
        up: { x: 0, y: -1, name: 'upDirection'},
        down: { x: 0, y: 1, name: 'downDirection' },
        right: { x: 1, y: 0, name: 'rightDirection' },
        left: { x: -1, y: 0, name: 'leftDirection' }
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
