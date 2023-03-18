namespace SpriteKind {
    export const Finish = SpriteKind.create()
}
mp.onButtonEvent(mp.MultiplayerButton.A, ControllerButtonEvent.Pressed, function (player2) {
    mp.getPlayerSprite(player2).vy = -200
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Player, function (sprite, otherSprite) {
    sprites.destroy(sprite, effects.fire, 100)
    info.changeLifeBy(-1)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Finish, function (sprite, otherSprite) {
    info.changeScoreBy(1)
})
let projectile: Sprite = null
let playerImages = [assets.image`red duck`, assets.image`blue duck`, assets.image`orange duck`]
for (let index = 0; index <= 2; index++) {
    mp.setPlayerSprite(mp.getPlayerByIndex(index), sprites.create(playerImages[index], SpriteKind.Player))
    mp.getPlayerSprite(mp.getPlayerByIndex(index)).x = 75 + -30 * index
    mp.getPlayerSprite(mp.getPlayerByIndex(index)).ay = 600
    mp.getPlayerSprite(mp.getPlayerByIndex(index)).setStayInScreen(true)
}
let finish = sprites.create(assets.image`finishLine`, SpriteKind.Finish)
finish.x = 0
info.setLife(5)
game.onUpdateInterval(900, function () {
    projectile = sprites.createProjectileFromSide(assets.image`fireball`, -75, 0)
    projectile.y = randint(0, 120)
})
game.onUpdateInterval(500, function () {
    if (Math.percentChance(33)) {
        mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).vy = -200
    } else if (Math.percentChance(33)) {
        mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).vy = -200
    } else {
        mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Three)).vy = -200
    }
})
