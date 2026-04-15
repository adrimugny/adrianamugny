import kaplay from "https://unpkg.com/kaplay@3001.0.19/dist/kaplay.mjs";

kaplay();

loadSprite('bg', '/assets/Bathroom.png');
loadSprite('player', '/assets/Carlosblue.png');
loadSprite('poutre1', '/assets/Poutre1.png');
loadSprite('poutre2', '/assets/Poutre2.png');
loadSprite('panier', '/assets/panier .png');
loadSprite('start1', '/assets/start1.png');
loadSprite('buee', '/assets/buee.png');
loadSprite('house', '/assets/house.png');


scene('menu', () => {
    
    const house = add([
    sprite("house"),
    pos(0, 0),
    scale(1),]);
    const backgroundWidth = house.width;
    const backgroundHeight = house.height;

    add([
        text('Hide & Feel'),
        pos(width()/2, height()/2 - 100),
        anchor('center'),
    ]);

    const bouton = add([
        rect(300, 100),
        pos(width()/2, height()/2 + 100),
        anchor('center'),
        color(BLACK),
    ]);

    bouton.add([
        text('Start (space)'),
        pos(0, 0),
        anchor('center'),
    ]);
    
    onKeyPress('space', () => {
        go('intro');
    });
});

setGravity(800);

scene("intro", () => {

    setBackground(BLACK);

    const textes = [
        "Carlos est posé, rêveur, dans son terrarium...",
        "SOUDAIN, il entend une musique romantique provenant de l'extérieur...",
        "C'est Carlita !! Sa dulcinée lui fait de grands signes.",
        "Carlos est sous le charme et, tout rose d'amour, il veut s'échapper pour la rejoindre.",
        "Mais attention à ne pas te faire surprendre par les humains !!!\nTends les oreilles et va vite te cacher devant un objet de ta couleur puis appuie sur A !",
        "Bonne chance ! :)"
    ];

    let index = 0;

    const affichage = add([
        text(textes[index], {
            size: 28,
            width: width() - 100,
        }),
        pos(width() / 2, height() / 2),
        anchor("center"),
        color(255, 255, 255),
        fixed(),
    ]);

    onKeyPress("space", () => {
        index++;
        if (index < textes.length) {
            affichage.text = textes[index];
        }
        else {
            go("bathroom");
        }
    });
});


scene('bathroom', () => {
    
    const bg = add([
    sprite("bg"),
    pos(0, 0),
    scale(3),]);
    const backgroundWidth = bg.width * 3;
    const backgroundHeight = bg.height * 3;

    const buee = add([
        sprite("buee"),
        pos(0, 0),
        scale(3),
        z(4),
        opacity(0.3),]);
        const bueeWidth = buee.width * 3;
        const bueeHeight = buee.height * 3;
     
    // Caméra limitée
    onUpdate(() => {
    let x = player.pos.x;
    let y = player.pos.y;

    x = clamp(x, width() / 3, backgroundWidth - width() / 3);
    y = clamp(y, height() / 3, backgroundHeight - height() / 3);

    camPos(x, y);});
    add([pos(0, 0), rect(1, backgroundHeight), area(), body({ isStatic: true })]);
    add([pos(backgroundWidth, 0), rect(1, backgroundHeight), area(), body({ isStatic: true })]);
    add([pos(0, 0), rect(backgroundWidth, 1), area(), body({ isStatic: true })]);
    add([pos(0, backgroundHeight), rect(backgroundWidth, 1), area(), body({ isStatic: true })]);


let countdownActive = false;
let nextCountdownTime = 0;
let countdownText = null;

function scheduleNextCountdown() {
    nextCountdownTime = time() + rand(6, 12); 
}
scheduleNextCountdown();

function showCountdown(msg) {
    if (countdownText) destroy(countdownText);

    countdownText = add([
        text(msg, { size: 48 }),
        pos(width() / 2, height() / 4),
        anchor("center"),
        color(255, 0, 0),
        fixed(),
        z(400),
    ]);
}

onUpdate(() => {
    if (!countdownActive && time() > nextCountdownTime) {
        countdownActive = true;
        showCountdown("3");
        wait(1, () => {
            showCountdown("2");
            wait(1, () => {
                showCountdown("1");
                wait(1, () => {
                    showCountdown("HIDE!!!");

                    wait(1, () => {
                        const isHidden = player.opacity < 1;
                        if (!isHidden) {
                            go("bathroom");
                        }
                        destroy(countdownText);
                        countdownActive = false;
                        scheduleNextCountdown();
                    });
                });
            });
        });
    }
});

    const player = add([
        sprite('player'),
        pos(10, 62),
        scale(2),
        z(1),
        area(),
        body(),
    ]);

const bulle = add([
    rect(140, 40),
    pos(0, 0),
    color(255, 255, 255),
    outline(3, rgb(255, 255, 255)),
    opacity(0.9),
    z(100),
]);

const bulleTexte = add([
    text("oulala, ça glisse!!", {
        size: 12,
    }),
    pos(0, 0),
    color(0, 0, 0),
    z(101),
]);

onUpdate(() => {
    bulle.pos = vec2(player.pos.x - 70, player.pos.y - 60);
    bulleTexte.pos = vec2(bulle.pos.x + 10, bulle.pos.y + 10);
});

wait(4, () => {
    destroy(bulle);
    destroy(bulleTexte);
});


    const poutre1 = add([
        sprite('poutre1'),
        pos(786, 212),
        scale(3),
        z(2),
        area(),
    ]);

    const poutre2 = add([
        sprite('poutre2'),
        pos(970, 212),
        scale(3),
        z(2),
        area(),
    ]);
    
    add([
    rect(40, 10),
    color(RED),
    opacity(0),
    pos(0, 110),
    area(),
    body({ isStatic: true }), 
    ]);

    const start1 = add([
        sprite('start1'),
        pos(0, 57),
        scale(3),
        z(3),
        area(),
    ]);

    add([
    rect(1200, 15),
    color(RED),
    opacity(0),
    pos(0, 795),
    area(),
    body({ isStatic: true }), 
    ]);

    add([
    rect(110, 10),
    color(RED),
    opacity(0),
    pos(555 , 717),
    area(),
    body({ isStatic: true }), 
    ]);

    add([
    rect(40, 40),
    color(BLUE),
    pos(580 , 685),
    area(),
    body({ isStatic: true }), 
    ]);

    add([
    rect(390, 15),
    color(BLUE),
    opacity(0),
    pos(190, 600),
    area(),
    body({ isStatic: true }), 
    ]);

    add([
    rect(620, 10),
    color(RED),
    opacity(0),
    pos(400 , 455),
    area(),
    body({ isStatic: true }), 
    ]);

    const ladder = add([
    rect(15, 300),
    pos(364, 350),
    area(),
    color(150, 150, 255),
    opacity(0),
    "ladder"]);
    let onLadder = false;
    player.onCollide("ladder", () => {
    onLadder = true;});
    player.onCollideEnd("ladder", () => {
    onLadder = false;});

    onUpdate(() => {
    if (onLadder) {
        player.gravityScale = 0;
    } else {
        player.gravityScale = 1;
    }});

    add([
    rect(250, 10),
    color(RED),
    opacity(0),
    pos(992 , 489),
    area(),
    body({ isStatic: true }), 
    ]);

    add([
    rect(50, 10),
    color(RED),
    opacity(0),
    pos(980, 340),
    area(),
    body({ isStatic: true }), 
    ]);
    
    const panier = add([
        sprite('panier'),
        pos(1045, 430),
        scale(3),
        z(3),
        area(),
    ]);

    add([
    pos(panier.pos.x, panier.pos.y),
    rect(5, panier.height * 2),
    area(),
    body({ isStatic: true }),
    opacity(0),
    "panierWall"]);
  
    add([
    pos(panier.pos.x + panier.width * 2 + 35, panier.pos.y),
    rect(5, panier.height * 2),
    area(),
    body({ isStatic: true }),
    opacity(0),
    "panierWall"]);

    add([
    rect(250, 10),
    color(RED),
    opacity(0),
    pos(1215, 575),
    area(),
    body({ isStatic: true }), 
    ]);
    
    add([
    rect(90, 450),
    color(RED),
    pos(1300, 120),
    area(),
    opacity(0),
    "ladder"
    ]);

    const trigger = add([
    rect(50, 50),
    pos(1380, 50),
    area(),
    color(255, 0, 0),
    opacity(0),
    "nextScene",]);


function isInside(a, b) {
    return (
        a.pos.x >= b.pos.x &&
        a.pos.x + a.width <= b.pos.x + b.width &&
        a.pos.y >= b.pos.y &&
        a.pos.y + a.height <= b.pos.y + b.height
    );}
    
add([
    rect(110, 120),
    pos(650, 400),
    area(),
    color(0, 150, 0),
    opacity(0),
    "hideSpot"
]);

add([
    rect(110, 70),
    pos(555, 720),
    area(),
    color(0, 150, 0),
    opacity(0),
    "hideSpot"
]);

add([
    rect(90, 50),
    color(RED),
    opacity(0),
    pos(240 , 550),
    area(),
    "hideSpot"
    ]);

let canHide = false;

onUpdate(() => {
    canHide = false;

    const hideSpots = get("hideSpot");

    for (const spot of hideSpots) {
        if (isInside(player, spot)) {
            canHide = true;
        }
    }
    if (!canHide) {
        player.opacity = 1;
    }
});

onKeyDown("a", () => {
    if (canHide) {
        player.opacity = 0.4;
    }});
    
    onKeyRelease("a", () => {
    player.opacity = 1;});

    let nombreAleatoire=Math.random ()

    player.onCollide("nextScene", () => {
    go("conclusion");});

    let speedX = 0;
    const accel = 0.2;
    const maxSpeed = 4;
    const friction = 0.05;
    
    onKeyPress('left', () => player.flipX = true);
    onKeyPress('right', () => player.flipX = false);
    
    onKeyDown("left", () => {
    speedX = Math.max(speedX - accel, -maxSpeed);});
    onKeyDown("right", () => {
    speedX = Math.min(speedX + accel, maxSpeed);});
    
    onUpdate(() => {
    if (!isKeyDown("left") && !isKeyDown("right")) {
        if (speedX > 0) speedX = Math.max(speedX - friction, 0);
        if (speedX < 0) speedX = Math.min(speedX + friction, 0);
    }

    player.pos.x += speedX;});
    
    onKeyDown('up', () => player.pos.y -= 3);
    onKeyDown('down', () => player.pos.y += 3);
    
    onKeyPress("space", () => {
    if (player.isGrounded()) {
        player.jump(400);}});
});

scene("conclusion", () => {

    setBackground(BLACK);

    const textes = [
        "Bravo Carlos !",
        "Tu as réussi à traverser toute la maison sans te faire repérer.",
        "Carlita t’attend, impatiente et toute rose d’amour.",
        "Merci d’avoir joué ! :)"
    ];

    let index = 0;

    const affichage = add([
        text(textes[index], {
            size: 28,
            width: width() - 100,
        }),
        pos(width() / 2, height() / 2),
        anchor("center"),
        color(255, 255, 255),
        fixed(),
    ]);

    onKeyPress("space", () => {
        index++;

        if (index < textes.length) {
            affichage.text = textes[index];
        } else {
            go("menu"); 
        }
    });
});


go('menu');