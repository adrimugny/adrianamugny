import kaplay from "https://unpkg.com/kaplay@3001.0.19/dist/kaplay.mjs";

kaplay({
    width: 1200,
    height: 800,
    letterbox: true,
});

loadSprite('bg', 'assets/bathroom.png');
loadSprite('poutre1', 'assets/Poutre1.png');
loadSprite('poutre2', 'assets/Poutre2.png');
loadSprite('panier', 'assets/panier .png');
loadSprite('start1', 'assets/start1.png');
loadSprite('buee', 'assets/Buee.png');
loadSprite('house', 'assets/menu.png');
loadSprite('bulle', 'assets/bulle.png');
loadSprite('livingroombg', 'assets/livingroom.png');
loadSprite('kitchen', 'assets/kitchen.png');
loadSprite('flower', 'assets/flower.png');
loadSprite('cave', 'assets/cave.png');
loadSprite('carton', 'assets/box.png');
loadSprite('cage', 'assets/cage.png');
loadSprite('tableleft', 'assets/tableleft.png');
loadSprite('tableright', 'assets/tableright.png');
loadSprite('fruits', 'assets/fruits.png');
loadSprite('sink', 'assets/sink.png');
loadSprite('books', 'assets/Books.png');
loadSprite('cavetable', 'assets/cavetable.png');
loadSprite('fly', 'assets/fly.png');
loadSprite('perle', 'assets/pearl.png');
loadSprite('menupress', 'assets/menupress.png');
loadSprite('introbg1', 'assets/introbg1.png');
loadSprite('introbg2', 'assets/introbg2.png');
loadSprite('carlitapink', 'assets/carlitapink.png');
loadSprite('lightoff', 'assets/lightoff.png');
loadSprite('hearth', 'assets/hearth.png');

loadSprite("pinkidle1", "assets/pinkidle1.png");
loadSprite("pinkidle2", "assets/pinkidle2.png");
loadSprite("pinkwalk1", "assets/pinkwalk1.png");
loadSprite("pinkwalk2", "assets/pinkwalk2.png");

loadSprite("orangeidle1", "assets/orangeidle1.png");
loadSprite("orangeidle2", "assets/orangeidle2.png");
loadSprite("orangewalk1", "assets/orangewalk1.png");
loadSprite("orangewalk2", "assets/orangewalk2.png");

loadSprite("blueidle1", "assets/blueidle1.png");
loadSprite("blueidle2", "assets/blueidle2.png");
loadSprite("bluewalk1", "assets/bluewalk1.png");
loadSprite("bluewalk2", "assets/bluewalk2.png");

loadSprite("purpleidle1", "assets/purpleidle1.png");
loadSprite("purpleidle2", "assets/purpleidle2.png");
loadSprite("purplewalk1", "assets/purplewalk1.png");
loadSprite("purplewalk2", "assets/purplewalk2.png");

loadSound('soundbouton', 'assets/soundbouton.wav');
loadSound('ambiencemaison', 'assets/ambiencemaison.wav');
loadSound('tvmusic', 'assets/tvmusic.wav');
loadSound('livingroommusic', 'assets/livingroombg.mp3');
loadSound('kitchenmusic', 'assets/kitchenmusic.mp3');
loadSound('bathroommusic', 'assets/bathroommusic.mp3');
loadSound('cavemusic', 'assets/cavemusic.mp3');
loadSound("soundfootstep", "assets/soundfootstep.mp3");
loadSound("boiling", "assets/boiling.wav");
loadSound("ambiencespooky", "assets/spookyambiance.mp3");

loadFont("pixelfont", "assets/pixelfont.ttf");


let currentFootstep = null;

function fadeToScene(targetScene, musicToStop = null, musicToStop2 = null) {
    if (musicToStop) musicToStop.stop();
    if (musicToStop2) musicToStop2.stop();
    if (currentFootstep) { currentFootstep.stop(); currentFootstep = null; }
    const fadeOut = add([rect(width(), height()), pos(0, 0), color(0, 0, 0), opacity(0), fixed(), z(9999)]);
    const fadeUpdate = onUpdate(() => {
        fadeOut.opacity += 0.03;
        if (fadeOut.opacity >= 1) { fadeUpdate.cancel(); go(targetScene); }
    });
}

function setupHideMechanic(player, startX, startY) {
    let countdownActive = false;
    let nextCountdownTime = time() + rand(2, 5);
    onUpdate(() => {
        if (countdownActive || time() < nextCountdownTime) return;
        countdownActive = true;
        const footstep = play("soundfootstep", { volume: 1 });
        currentFootstep = footstep;
        footstep.onEnd(() => {
            currentFootstep = null;
            let stayedHidden = true;
            const shakeUpdate = onUpdate(() => { shake(0.1); if (player.opacity >= 1) stayedHidden = false; });
            wait(3, () => {
                shakeUpdate.cancel();
                if (!stayedHidden) {
                    const db = add([rect(width(), 80), pos(0, height() - 80), color(0, 0, 0), opacity(0.8), fixed(), z(499)]);
                    const d = add([text("CARLOS !! Tu fais quoi là?!", { size: 24 }), pos(width() / 2, height() - 40), anchor("center"), color(255, 255, 255), fixed(), z(500)]);
                    wait(1, () => {
                        destroy(d); destroy(db);
                        const fadeOut = add([rect(width(), height()), pos(0, 0), color(0, 0, 0), opacity(0), fixed(), z(600)]);
                        const fadeUpdate = onUpdate(() => {
                            fadeOut.opacity += 0.03;
                            if (fadeOut.opacity >= 1) {
                                fadeUpdate.cancel(); player.pos = vec2(startX, startY);
                                const fadeIn = onUpdate(() => { fadeOut.opacity -= 0.03; if (fadeOut.opacity <= 0) { fadeIn.cancel(); destroy(fadeOut); countdownActive = false; nextCountdownTime = time() + rand(2, 5); } });
                            }
                        });
                    });
                } else { countdownActive = false; nextCountdownTime = time() + rand(2, 5); }
            });
        });
    });
}

scene('menu', () => {
    let menuMusic = play('ambiencemaison', { loop: true, volume: 5 });
    add([sprite("house"), pos(width() / 2, height() / 2), anchor("center"), scale(5), z(-10), "menuBg"]);
    add([text("HIDE & FEEL", { size: 150, weight: "bolder", font: "pixelfont" }), pos(width() - 400, height() / 2 - 130), anchor("center"), color(255, 229, 242)]);
    wait(2, () => {
        const texteJaune = add([text("appuyez sur 'espace' pour allumer la télé", { size: 40, font: "serif" }), pos(width() / 2, height() - 50), anchor("center"), color(255, 255, 100), opacity(0), fixed(0), z(100)]);
        onUpdate(() => { texteJaune.opacity = Math.min(time() - 2, 1); });
    });
    onKeyPress('1', () => fadeToScene('livingroom', menuMusic));
    onKeyPress('2', () => fadeToScene('kitchen', menuMusic));
    onKeyPress('3', () => fadeToScene('bathroom', menuMusic));
    onKeyPress('4', () => fadeToScene('cave', menuMusic));
    onKeyPress('5', () => fadeToScene('conclusion', menuMusic));

    onKeyPress('space', () => {
    play('soundbouton');

    destroyAll("menuBg");
    add([
        sprite("menupress"),
        pos(width() / 2, height() / 2),
        anchor("center"),
        scale(5),
        z(-10),
        "menuBg"
    ]);

    fadeToScene('intro', menuMusic);
});

});

setGravity(800);

scene("intro", () => {
    setBackground(BLACK);
    let introMusic = play('tvmusic', { loop: true, volume: 2 });
    const textes = ["Bonjour et bienvenu dans notre émission : Les Nouvelles Du Jour !!", "Aujourd'hui, nous avons apperçu une caméléonne dans le parc central.", "Nous ne savons pas comment ni pourquoi elle est arrivée ici, mais ce qui est sûr, c'est qu'elle attend quelqu'un...", "...", "...", "Regardez-ça ! Elle devient rose ! Est-ce qu'elle attendrait pas son amoureux ?"];
    const bulles = [null, "CARLITA??", "Mon amoureuse est si belle!", null, null, "J'arrive ma dulcinée!"];
    const bullescarlita = [null, null, null, "coucou mon petit Carlito", "Rejoins-moi au parc ! J'ai apporté des grillons.", null];
    let index = 0; let carlitaSprite = null; let canAdvance = false; let continueText = null; let textComplete = false; let typewriterUpdate = null;
    const box = add([rect(width() - 80, 180, { radius: 12 }), pos(40, height() - 200), color(0, 0, 0), opacity(0.6), outline(4, rgb(255, 255, 255)), fixed(), z(10)]);
    const dialogue = add([text("", { size: 26, width: width() - 120, lineSpacing: 6 }), pos(60, height() - 180), color(255, 255, 255), fixed(), z(11)]);
    let currentBulle = null; let currentBulleTexte = null; let currentBulleCarlita = null; let currentBulleTexteCarlita = null;

    function typewriteAllTexts(mainText, bText, bcText) {
        textComplete = false; canAdvance = false; if (continueText) destroy(continueText);
        let currentIndex = 0; if (typewriterUpdate) typewriterUpdate.cancel();
        typewriterUpdate = onUpdate(() => {
            if (currentIndex < Math.max(mainText.length, bText?.length || 0, bcText?.length || 0)) {
                currentIndex++;
                dialogue.text = mainText.substring(0, currentIndex);
                if (currentBulleTexte && bText) currentBulleTexte.text = bText.substring(0, currentIndex);
                if (currentBulleTexteCarlita && bcText) currentBulleTexteCarlita.text = bcText.substring(0, currentIndex);
            } else {
                typewriterUpdate.cancel(); textComplete = true; canAdvance = true;
                continueText = add([text("'espace' pour continuer", { size: 20 }), pos(width() - 320, height() - 50), color(255, 255, 255), fixed(), z(102)]);
            }
        });
    }

    function showBulle(msg, bIdx) {
        if (currentBulle) destroy(currentBulle); if (currentBulleTexte) destroy(currentBulleTexte);
        if (!msg) return;
        let bw = bIdx === 2 ? 550 : 320;
        currentBulle = add([rect(bw, 80), pos(width() / 2 - bw / 2, 100), color(255, 255, 255), outline(3, rgb(0, 0, 0)), opacity(0.9), fixed(), z(100)]);
        currentBulleTexte = add([text("", { size: 24, width: bw - 40 }), pos(width() / 2 - bw / 2 + 20, 115), color(0, 0, 0), fixed(), z(101)]);
    }

    function showBulleCarlita(msg, bIdx) {
        if (currentBulleCarlita) destroy(currentBulleCarlita); if (currentBulleTexteCarlita) destroy(currentBulleTexteCarlita);
        if (!msg) return;
        currentBulleCarlita = add([rect(350, 80), pos(150, height() / 2 - 40), color(255, 200, 200), outline(3, rgb(0, 0, 0)), opacity(0.9), fixed(), z(100)]);
        currentBulleTexteCarlita = add([text("", { size: 20, width: 310 }), pos(170, height() / 2 - 30), color(0, 0, 0), fixed(), z(101)]);
        if (bIdx === 4) { 
            carlitaSprite = add([
                sprite("carlitapink"), 
                pos(width() - 600, height() / 2), 
                anchor("center"), 
                scale(4), 
                opacity(0),
                fixed(), 
                z(50)
            ]); 
            onUpdate(() => {
                if (carlitaSprite && carlitaSprite.opacity < 1) {
                    carlitaSprite.opacity += dt() * 0.5;
                }
            });
        }
    }

    const bg = add([sprite("introbg1"), pos(width() / 2, height() / 2), anchor("center"), scale(4), z(-10)]);
    
    let bgTimer = 0;
    onUpdate(() => {
        bgTimer += dt();
        if (bgTimer >= 0.5) {
            bgTimer = 0;
            bg.use(sprite(bg.sprite === "introbg1" ? "introbg2" : "introbg1"));
        }
    });

    typewriteAllTexts(textes[index], bulles[index], bullescarlita[index]);

    onKeyPress("space", () => {
        if (!textComplete) { dialogue.text = textes[index]; textComplete = true; canAdvance = true; return; }
        if (!canAdvance) return;
        index++;
        if (index < textes.length) {
            showBulle(bulles[index], index);
            showBulleCarlita(bullescarlita[index], index);
            typewriteAllTexts(textes[index], bulles[index], bullescarlita[index]);
        } else {
            fadeToScene("livingroom", introMusic);
        }
    });
});

scene("livingroom", () => {
    let livingroomMusic = play('livingroommusic', { loop: true, volume: 0.2 });
    
     onKeyPress("d", () => {
        livingroomMusic.stop();
        go("livingroom");
    });
    
    camScale(2);
    let gamePaused = true; let currentStep = 1;
    const introBulleBg = add([rect(width() - 200, 300, { radius: 10 }), pos(width() / 2, height() / 2), anchor("center"), color(0, 0, 0), opacity(0.85), outline(4, rgb(255, 255, 255)), fixed(), z(1000)]);
    const introBulleText = add([text("Sors de la maison pour retrouver Carlita. Mais attention ! cache toi quand les bruits de pas sont trop proches : place toi devant un objet de la même couleur que toi et maintient 'a' jusqu'à ce que le danger soit parti... Bonne chance !\n\n(Appuyez sur ESPACE pour continuer)", { size: 24, width: width() - 250, align: "center", lineSpacing: 8 }), pos(width() / 2, height() / 2), anchor("center"), color(255, 255, 255), fixed(), z(1001)]);
    onKeyPress("space", () => {
        if (currentStep === 1) { currentStep = 2; introBulleText.text = "Commandes du jeu :\n\n- FLECHES GAUCHE / DROITE : Se déplacer\n- ESPACE : Sauter\n- TOUCHE 'A' : Se cacher (devant un objet de sa couleur)\n- TOUCHE 'D' : Réinitialiser la pièce\n\n(Appuyez sur ESPACE pour commencer à jouer)"; }
        else if (currentStep === 2 && gamePaused) { 
            gamePaused = false; 
            destroy(introBulleBg); 
            destroy(introBulleText);
            setupHideMechanic(player, 10, 445);
            const b = add([rect(300, 40), pos(0, 0), color(255, 255, 255), outline(3, rgb(0, 0, 0)), opacity(0.9), z(100)]);
            const bt = add([text("je vais lui faire un bouquet", { size: 16 }), pos(0, 0), color(0, 0, 0), z(101)]);
            const u = onUpdate(() => { b.pos = vec2(player.pos.x - 150, player.pos.y - 60); bt.pos = vec2(b.pos.x + 10, b.pos.y + 10); });
            wait(4, () => { destroy(b); destroy(bt); u.cancel(); });
        }
    });

    const bg = add([sprite("livingroombg"), pos(0, 0), scale(3), z(-10)]);
    const player = add([sprite('pinkidle1'), pos(20, 445), scale(2), z(1), area(), body()]);
    let animTimer = 0;
    onUpdate(() => {
        if (gamePaused) return;
        animTimer += dt();
        const isMoving = isKeyDown("left") || isKeyDown("right") || isKeyDown("up") || isKeyDown("down");
        const type = isMoving ? "walk" : "idle";
        const frame = Math.floor(animTimer * 4) % 2 + 1;
        if (isKeyDown("left")) player.lastFlip = true; if (isKeyDown("right")) player.lastFlip = false;
        player.use(sprite(`pink${type}${frame}`));
        player.flipX = player.lastFlip || false;
        camPos(player.pos.x, player.pos.y);
        camScale(canHide && isKeyDown("a") ? 3 : 2);
    });

    const backgroundWidth = bg.width * 3; const backgroundHeight = bg.height * 3;
    add([pos(0, 0), rect(1, backgroundHeight), area(), body({ isStatic: true })]);
    add([pos(backgroundWidth, 0), rect(1, backgroundHeight), area(), body({ isStatic: true })]);
    add([pos(0, 0), rect(backgroundWidth, 1), area(), body({ isStatic: true })]);
    add([pos(0, backgroundHeight), rect(backgroundWidth, 1), area(), body({ isStatic: true })]);

    let totalFlowers = 0; let collectedFlowers = 0;
    function addFlower(x, y) {
        const f = add([sprite("flower"), pos(x, y), scale(1.5), area(), z(5), "flower"]);
        totalFlowers++;
        f.onUpdate(() => { f.pos.y = y + Math.sin(time() * 2) * 5; });
    }
    addFlower(40, 690); addFlower(600, 745); addFlower(540, 610);
    player.onCollide("flower", (f) => { destroy(f); collectedFlowers++; });

    add([rect(100, 5), color(RED), opacity(0), pos(0, 450), area(), body({ isStatic: true })]);
    add([rect(100, 5), color(RED), opacity(0), pos(15, 527), area(), body({ isStatic: true })]);
    add([rect(200, 5), color(RED), opacity(0), pos(100, 620), area(), body({ isStatic: true })]);
    add([rect(1700, 5), color(RED), opacity(0), pos(0, 780), area(), body({ isStatic: true }), "sol"]);
    const pOW = add([rect(100, 5), color(RED), opacity(0), pos(865, 700), area(), body({ isStatic: true })]);
    onUpdate(() => { pOW.collisionIgnore = (player.pos.y + player.height * 2 > pOW.pos.y) ? ["body"] : []; });
    player.onCollide("sol", () => { add([rect(405, 5), color(RED), opacity(0), pos(430, 657), area(), body({ isStatic: true })]); });

    add([rect(100, 70), color(BLUE), opacity(0), pos(130, 700), area(), "hideSpot"]);
    add([rect(100, 100), color(BLUE), opacity(0), pos(865, 700), area(), "hideSpot"]);
    add([rect(100, 60), color(BLUE), opacity(0), pos(660, 605), area(), "hideSpot"]);
    add([sprite("cage"), pos(0, 450), scale(3), z(3)]);
    add([sprite("tableleft"), pos(442, 697), scale(3), z(3)]);
    add([sprite("tableright"), pos(790, 696), scale(3), z(3)]);

    let canHide = false;
    onUpdate(() => {
        let can = false; for (const s of get("hideSpot")) { if (player.pos.x >= s.pos.x && player.pos.x + player.width <= s.pos.x + s.width && player.pos.y >= s.pos.y && player.pos.y + player.height <= s.pos.y + s.height) can = true; }
        canHide = can; if (!canHide) player.opacity = 1;
    });
    onKeyDown("a", () => { if (canHide) player.opacity = 0.4; });
    onKeyRelease("a", () => { player.opacity = 1; });
    onKeyDown("left", () => { if (!gamePaused) player.pos.x -= 3; }); onKeyDown("right", () => { if (!gamePaused) player.pos.x += 3; });
    onKeyPress("space", () => { if (!gamePaused && player.isGrounded()) player.jump(400); });

    add([rect(80, 80), pos(1400, 710), color(RED), area(), opacity(0), "tokitchen"]);
    player.onCollide("tokitchen", () => {
        if (collectedFlowers === totalFlowers) fadeToScene("kitchen", livingroomMusic);
        else {
            const b = add([rect(280, 40), pos(player.pos.x - 140, player.pos.y - 60), color(255, 255, 255), outline(3, rgb(0, 0, 0)), opacity(0.9), z(100)]);
            const bt = add([text("je devrais encore récolter\nquelques fleurs...", { size: 12 }), pos(b.pos.x + 10, b.pos.y + 5), color(0, 0, 0), z(101)]);
            wait(3, () => { destroy(b); destroy(bt); });
        }
    });
});

scene("kitchen", () => {
    let kitchenMusic = play('kitchenmusic', { loop: true, volume: 0.3 });
    let boilingMusic = play('boiling', { loop: true, volume: 5 });

onKeyPress("d", () => {
        kitchenMusic.stop();
        boilingMusic.stop();
        go("kitchen");
    });

    camScale(2);
    const bg = add([sprite("kitchen"), pos(0, 0), scale(3), z(-10)]);
    const backgroundWidth = bg.width * 3;
    const backgroundHeight = bg.height * 3;
    const player = add([sprite('orangeidle1'), pos(10, 445), scale(2), z(1), area(), body()]);
    let animTimer = 0;
    onUpdate(() => {
        animTimer += dt();
        const isMoving = isKeyDown("left") || isKeyDown("right") || isKeyDown("up") || isKeyDown("down");
        const type = isMoving ? "walk" : "idle";
        const frame = Math.floor(animTimer * 4) % 2 + 1;
        if (isKeyDown("left")) player.lastFlip = true; if (isKeyDown("right")) player.lastFlip = false;
        player.use(sprite(`orange${type}${frame}`));
        player.flipX = player.lastFlip || false;
        camPos(player.pos.x, player.pos.y);
        camScale(canHide && isKeyDown("a") ? 3 : 2);
    });

    let onLadder = false; player.onCollide("ladder", () => { onLadder = true; }); player.onCollideEnd("ladder", () => { onLadder = false; });
    onUpdate(() => { player.gravityScale = onLadder ? 0 : 1; });
    onKeyDown('up', () => { if (onLadder) player.pos.y -= 1.5; }); onKeyDown('down', () => { if (onLadder) player.pos.y += 3; });

    add([pos(0, 0), rect(1, bg.height * 3), area(), body({ isStatic: true })]);
    add([pos(bg.width * 3, 0), rect(1, bg.height * 3), area(), body({ isStatic: true })]);
    add([pos(0, 0), rect(bg.width * 3, 1), area(), body({ isStatic: true })]);

    add([rect(150, 5), color(RED), opacity(0), pos(0, 500), area(), body({ isStatic: true })]);
    add([rect(70, 500), color(RED), opacity(0), pos(90, 10), area(), "ladder"]);
    add([rect(370, 5), color(RED), opacity(0), pos(150, 69), area(), body({ isStatic: true })]);
    add([rect(155, 5), color(RED), opacity(0), pos(500, 400), area(), body({ isStatic: true })]);
    add([rect(55, 5), color(RED), opacity(0), pos(770, 410), area(), body({ isStatic: true })]);
    add([rect(300, 5), color(RED), opacity(0), pos(910, 400), area(), body({ isStatic: true })]);
    add([rect(120, 50), color(RED), opacity(0), pos(950, 350), area(), body({ isStatic: true })]);
    add([rect(90, 5), color(RED), opacity(0), pos(1110, 260), area(), body({ isStatic: true })]);
    add([rect(50, 170), color(RED), opacity(0), pos(1170, 100), area(), "ladder"]);
    add([rect(300, 5), color(RED), opacity(0), pos(1230, 100), area(), body({ isStatic: true })]);
    add([rect(20, 20), color(RED), opacity(0), pos(1430, 80), area(), "toBathroom"]);

    add([sprite("fruits"), pos(517, 320), scale(3), z(3)]);
    add([sprite("sink"), pos(665, 430), scale(3), z(3)]);
    add([rect(130, 70), color(RED), opacity(0), pos(290, 0), area(), "hideSpot"]);
    add([rect(70, 170), color(RED), opacity(0), pos(1170, 100), area(), "hideSpot"]);

    let tf = 0; let cf = 0;
    function addfly(x, y) { const f = add([sprite("fly"), pos(x, y), scale(1.5), area(), z(5), "fly"]); tf++; f.onUpdate(() => { f.pos.y = y + Math.sin(time() * 2) * 5; }); }
    addfly(350, 20); addfly(800, 370); addfly(1300, 30); addfly(600, 300);
    player.onCollide("fly", (f) => { destroy(f); cf++; });

    let canHide = false;
    onUpdate(() => {
        let can = false; for (const s of get("hideSpot")) { if (player.pos.x >= s.pos.x && player.pos.x + player.width <= s.pos.x + s.width && player.pos.y >= s.pos.y && player.pos.y + player.height <= s.pos.y + s.height) can = true; }
        canHide = can; if (!canHide) player.opacity = 1;
    });
    onKeyDown("a", () => { if (canHide) player.opacity = 0.4; });
    onKeyRelease("a", () => { player.opacity = 1; });
    onKeyDown("left", () => { player.pos.x -= 3; }); onKeyDown("right", () => { player.pos.x += 3; });
    onKeyPress("space", () => { if (!onLadder && player.isGrounded()) player.jump(400); });

    player.onCollide("toBathroom", () => {
        if (cf === tf) fadeToScene("bathroom", kitchenMusic, boilingMusic);
        else {
            const b = add([rect(280, 40), pos(player.pos.x - 140, player.pos.y - 60), color(255, 255, 255), outline(3, rgb(0, 0, 0)), opacity(0.9), z(100)]);
            const bt = add([text("je devrais encore récolter\nquelques mouches...", { size: 12 }), pos(b.pos.x + 10, b.pos.y + 5), color(0, 0, 0), z(101)]);
            wait(3, () => { destroy(b); destroy(bt); });
        }
    });
    setupHideMechanic(player, 10, 445);
    const bK = add([rect(350, 40), pos(0, 0), color(255, 255, 255), outline(3, rgb(0, 0, 0)), opacity(0.9), z(100)]);
    const btK = add([text("je ne dois pas tomber de la cuisine", { size: 16 }), pos(0, 0), color(0, 0, 0), z(101)]);
    const uK = onUpdate(() => { bK.pos = vec2(player.pos.x - 150, player.pos.y - 60); btK.pos = vec2(bK.pos.x + 10, bK.pos.y + 10); });
    wait(4, () => { destroy(bK); destroy(btK); uK.cancel(); });


    const kitchenStartX = 40;
    const kitchenStartY = 450;
    let fallingReset = false;
    onUpdate(() => {
        if (!fallingReset && player.pos.y > backgroundHeight) {
            fallingReset = true;

            const fadeOut = add([
                rect(width(), height()),
                pos(0, 0),
                color(0, 0, 0),
                opacity(0),
                fixed(),
                z(600),
            ]);

            const fadeUpdate = onUpdate(() => {
                fadeOut.opacity += 0.05;
                if (fadeOut.opacity >= 1) {
                    fadeUpdate.cancel();
                    player.pos.x = kitchenStartX;
                    player.pos.y = kitchenStartY;

                    const fadeIn = onUpdate(() => {
                        fadeOut.opacity -= 0.05;
                        if (fadeOut.opacity <= 0) {
                            fadeIn.cancel();
                            destroy(fadeOut);
                            fallingReset = false;
                        }
                    });
                }
            });
        }
    });
});

scene("bathroom", () => {
    let bathroomMusic = play('bathroommusic', { loop: true, volume: 2 });

onKeyPress("d", () => {
        bathroomMusic.stop();
        go("bathroom");
    });

    camScale(2);
    const bg = add([sprite("bg"), pos(0, 0), scale(3), z(-10)]);
    const player = add([sprite('blueidle1'), pos(10, 62), scale(2), z(1), area(), body()]);
    let animTimer = 0;
    onUpdate(() => {
        animTimer += dt();
        const isMoving = isKeyDown("left") || isKeyDown("right") || isKeyDown("up") || isKeyDown("down");
        const type = isMoving ? "walk" : "idle";
        const frame = Math.floor(animTimer * 4) % 2 + 1;
        if (isKeyDown("left")) player.lastFlip = true; if (isKeyDown("right")) player.lastFlip = false;
        player.use(sprite(`blue${type}${frame}`));
        player.flipX = player.lastFlip || false;
        camPos(player.pos.x, player.pos.y);
        camScale(canHide && isKeyDown("a") ? 3 : 2);
    });

    add([pos(0, 0), rect(1, bg.height * 3), area(), body({ isStatic: true })]);
    add([pos(bg.width * 3, 0), rect(1, bg.height * 3), area(), body({ isStatic: true })]);
    add([pos(0, 0), rect(bg.width * 3, 1), area(), body({ isStatic: true })]);
    add([pos(0, bg.height * 3), rect(bg.width * 3, 1), area(), body({ isStatic: true })]);

    add([sprite("buee"), pos(0, 0), scale(3), z(4), opacity(0.3)]);
    add([sprite("poutre1"), pos(786, 212), scale(3), z(2), area()]);
    add([sprite("poutre2"), pos(970, 212), scale(3), z(2), area()]);
    add([rect(40, 10), color(RED), opacity(0), pos(0, 110), area(), body({ isStatic: true })]);
    add([sprite("start1"), pos(0, 57), scale(3), z(3)]);
    add([rect(1200, 15), color(RED), opacity(0), pos(0, 795), area(), body({ isStatic: true }), "solBas"]);
    add([rect(110, 10), color(RED), opacity(0), pos(555, 717), area(), body({ isStatic: true })]);
    add([rect(40, 40), color(BLUE), pos(580, 685), area(), body({ isStatic: true })]);
    player.onCollide("solBas", () => { add([rect(390, 15), color(BLUE), opacity(0), pos(190, 600), area(), body({ isStatic: true })]); });
    add([rect(620, 10), color(RED), opacity(0), pos(400, 455), area(), body({ isStatic: true })]);
    add([rect(15, 300), pos(364, 350), area(), color(150, 150, 255), opacity(0), "ladder"]);
    let onLadder = false; player.onCollide("ladder", () => { onLadder = true; }); player.onCollideEnd("ladder", () => { onLadder = false; });
    onUpdate(() => { player.gravityScale = onLadder ? 0 : 1; });
    add([rect(250, 10), color(RED), opacity(0), pos(992, 489), area(), body({ isStatic: true })]);
    add([rect(50, 10), color(RED), opacity(0), pos(980, 340), area(), body({ isStatic: true })]);
    const panier = add([sprite("panier"), pos(1045, 430), scale(3), z(3)]);
    add([pos(panier.pos.x, panier.pos.y), rect(5, panier.height * 2), area(), body({ isStatic: true }), opacity(0)]);
    add([pos(panier.pos.x + panier.width * 2 + 35, panier.pos.y), rect(5, panier.height * 2), area(), body({ isStatic: true }), opacity(0)]);
    add([rect(250, 10), color(RED), opacity(0), pos(1215, 575), area(), body({ isStatic: true })]);
    add([rect(90, 450), color(RED), pos(1300, 120), area(), opacity(0), "ladder"]);
    add([rect(50, 50), pos(1380, 50), area(), color(255, 0, 0), opacity(0), "toCave"]);

    add([rect(110, 120), pos(650, 400), area(), color(0, 150, 0), opacity(0), "hideSpot"]);
    add([rect(110, 70), pos(555, 720), area(), color(0, 150, 0), opacity(0), "hideSpot"]);
    add([rect(90, 50), color(RED), opacity(0), pos(240, 550), area(), "hideSpot"]);
    add([rect(100, 60), color(RED), opacity(0), pos(1050, 430), area(), "hideSpot"]);

    let totalbulle = 0; let collectedbulle = 0;
    function addbulle(x, y) { const f = add([sprite("bulle"), pos(x, y), scale(1.5), area(), z(5), "bulle"]); totalbulle++; f.onUpdate(() => { f.pos.y = y + Math.sin(time() * 2) * 5; }); }
    addbulle(600, 750); addbulle(200, 550); addbulle(900, 430); addbulle(1300, 400);
    player.onCollide("bulle", (f) => { destroy(f); collectedbulle++; });

    let canHide = false;
    onUpdate(() => {
        let can = false; for (const s of get("hideSpot")) { if (player.pos.x >= s.pos.x && player.pos.x + player.width <= s.pos.x + s.width && player.pos.y >= s.pos.y && player.pos.y + player.height <= s.pos.y + s.height) can = true; }
        canHide = can; if (!canHide) player.opacity = 1;
    });
    onKeyDown("a", () => { if (canHide) player.opacity = 0.4; });
    onKeyRelease("a", () => { player.opacity = 1; });

    let speedX = 0;
    const accel = 0.2;
    const maxSpeed = 4;
    const friction = 0.05;

    onUpdate(() => {
        if (isKeyDown("left")) {
            speedX = Math.max(speedX - accel, -maxSpeed);
        } else if (isKeyDown("right")) {
            speedX = Math.min(speedX + accel, maxSpeed);
        } else {
            if (speedX > 0) speedX = Math.max(speedX - friction, 0);
            else if (speedX < 0) speedX = Math.min(speedX + friction, 0);
        }
        player.pos.x += speedX;
    });

    onKeyDown('up', () => { if (onLadder) player.pos.y -= 1.5; }); onKeyDown('down', () => { if (onLadder) player.pos.y += 1.5; });
    onKeyPress("space", () => { if (!onLadder && player.isGrounded()) player.jump(400); });

    player.onCollide("toCave", () => {
        if (collectedbulle === totalbulle) fadeToScene("cave", bathroomMusic);
        else {
            const b = add([rect(280, 40), pos(player.pos.x - 140, player.pos.y - 60), color(255, 255, 255), outline(3, rgb(0, 0, 0)), opacity(0.9), z(100)]);
            const bt = add([text("je devrais encore \nme laver un peu...", { size: 12 }), pos(b.pos.x + 10, b.pos.y + 5), color(0, 0, 0), z(101)]);
            wait(3, () => { destroy(b); destroy(bt); });
        }
    });
    setupHideMechanic(player, 10, 62);
    const bB = add([rect(200, 40), pos(0, 0), color(255, 255, 255), outline(3, rgb(0, 0, 0)), opacity(0.9), z(100)]);
    const btB = add([text("oulala ça glisse", { size: 16 }), pos(0, 0), color(0, 0, 0), z(101)]);
    const uB = onUpdate(() => { bB.pos = vec2(player.pos.x - 150, player.pos.y - 60); btB.pos = vec2(bB.pos.x + 10, bB.pos.y + 10); });
    wait(4, () => { destroy(bB); destroy(btB); uB.cancel(); });
});

scene("cave", () => {
    let caveMusic = play('cavemusic', { loop: true, volume: 1 });
    let caveambienceMusic = play('ambiencespooky', { loop: true, volume: 1.5 });

 onKeyPress("d", () => {
        caveMusic.stop();
        caveambienceMusic.stop();
        go("cave");
    });

    camScale(2);
    const bg = add([sprite("cave"), pos(0, 0), scale(3), z(-10)]);
    const player = add([sprite('purpleidle1'), pos(745, 650), scale(2), z(1), area(), body()]);
    let animTimer = 0;
    onUpdate(() => {
        animTimer += dt();
        const isMoving = isKeyDown("left") || isKeyDown("right") || isKeyDown("up") || isKeyDown("down");
        const type = isMoving ? "walk" : "idle";
        const frame = Math.floor(animTimer * 4) % 2 + 1;
        if (isKeyDown("left")) player.lastFlip = true; if (isKeyDown("right")) player.lastFlip = false;
        player.use(sprite(`purple${type}${frame}`));
        player.flipX = player.lastFlip || false;
        camPos(player.pos.x, player.pos.y);
        camScale(canHide && isKeyDown("a") ? 3 : 2);

    });

    const backgroundWidth = bg.width * 3;
    const backgroundHeight = bg.height * 3;

    add([pos(0, 0), rect(1, backgroundHeight), area(), body({ isStatic: true })]);
    add([pos(backgroundWidth, 0), rect(1, backgroundHeight), area(), body({ isStatic: true })]);
    add([pos(0, 0), rect(backgroundWidth, 1), area(), body({ isStatic: true })]);
    add([pos(0, backgroundHeight), rect(backgroundWidth, 1), area(), body({ isStatic: true })]);

    const darkness = add([rect(backgroundWidth, backgroundHeight), pos(0, 0), color(0, 0, 0), opacity(0.6), fixed(), z(10)]);
    add([rect(1500, 5), color(RED), opacity(0), pos(0, 720), area(), body({ isStatic: true })]);
    add([sprite('carton'), pos(760, 650), scale(3.1), z(1), area(), body(1), 'carton']);
    add([sprite('carton'), pos(200, 650), scale(3), z(1), area(), body(1), 'carton']);
    add([sprite('carton'), pos(550, 450), scale(2), z(1), area(), body(1), 'carton']);
    add([sprite('carton'), pos(120, 350), scale(2), z(1), area(), body(1), 'carton']);

    const pOW = add([rect(250, 5), color(RED), opacity(0), pos(1110, 565), area(), body({ isStatic: true })]);
    onUpdate(() => { pOW.collisionIgnore = (player.pos.y + player.height * 2 > pOW.pos.y) ? ["body"] : []; });
    add([rect(470, 5), color(RED), opacity(0), pos(480, 520), area(), body({ isStatic: true })]);
    add([rect(355, 5), color(RED), opacity(0), pos(0, 430), area(), body({ isStatic: true })]);
    add([rect(450, 5), color(RED), opacity(0), pos(510, 355), area(), body({ isStatic: true })]);
    add([rect(250, 5), color(RED), opacity(0), pos(965, 260), area(), body({ isStatic: true })]);

    add([rect(150, 100), color(RED), opacity(0), pos(300, 620), area(), "hideSpot"]);
    add([rect(120, 80), color(RED), opacity(0), pos(750, 300), area(), "hideSpot"]);
    add([rect(50, 80), color(122, 66, 168), opacity(1), pos(10, 360), area(), "hideSpot"]);


    const lightSwitch = add([rect(50, 30), color(RED), opacity(0), pos(460, 705), area(), "lightSwitch"]);
    const lightoff = add([sprite('lightoff'), pos(510, 135), scale(3), z(1)]);
    let lightActivated = false; let totalPerle = 4; let collectedPerle = 0;
    const perlePositions = [{ x: 1150, y: 520 }, { x: 700, y: 480 }, { x: 200, y: 400 }, { x: 900, y: 300 }];

    function spawnPerles() { for (const p of perlePositions) { const f = add([sprite("perle"), pos(p.x, p.y), scale(1.5), area(), z(5), "perle"]); f.onUpdate(() => { f.pos.y = p.y + Math.sin(time() * 2) * 5; }); } }
    function activateLight() { if (lightActivated) return; lightActivated = true; play('soundbouton'); darkness.opacity = 0.3; if (lightoff) lightoff.hidden = true; spawnPerles(); }
    function deactivateLight() { if (!lightActivated) return; lightActivated = false; darkness.opacity = 0.6; if (lightoff) lightoff.hidden = false; for (const p of get("perle")) destroy(p); }

    onUpdate(() => {
        let on = false; if (player.pos.x < lightSwitch.pos.x + 50 && player.pos.x + player.width > lightSwitch.pos.x && player.pos.y < lightSwitch.pos.y + 30 && player.pos.y + player.height > lightSwitch.pos.y) on = true;
        if (!on) { for (const c of get("carton")) { if (c.pos.x < lightSwitch.pos.x + 50 && c.pos.x + c.width * 3 > lightSwitch.pos.x && c.pos.y < lightSwitch.pos.y + 30 && c.pos.y + c.height * 3 > lightSwitch.pos.y) on = true; } }
        if (on && !lightActivated) activateLight(); else if (!on && lightActivated) deactivateLight();
    });

    let canHide = false;
    onUpdate(() => {
        let can = false; for (const s of get("hideSpot")) { if (player.pos.x >= s.pos.x && player.pos.x + player.width <= s.pos.x + s.width && player.pos.y >= s.pos.y && player.pos.y + player.height <= s.pos.y + s.height) can = true; }
        canHide = can; if (!canHide) player.opacity = 1;
    });
    onKeyDown("a", () => { if (canHide) player.opacity = 0.4; });
    onKeyRelease("a", () => { player.opacity = 1; });

    add([sprite("books"), pos(1145, 580), scale(3), z(3)]);
    add([sprite("cavetable"), pos(140, 530), scale(3), z(3)]);
    player.onCollide("perle", (f) => { destroy(f); collectedPerle++; });
    onKeyDown("left", () => { player.pos.x -= 3; }); onKeyDown("right", () => { player.pos.x += 3; });
    onKeyPress("space", () => { if (player.isGrounded()) player.jump(400); });

    add([rect(80, 50), pos(950, 100), color(RED), area(), opacity(0), "toConclusion"]);
    player.onCollide('toConclusion', () => { if (collectedPerle === totalPerle) fadeToScene('conclusion', caveMusic, caveambienceMusic); });
    setupHideMechanic(player, 745, 650);
    const bC = add([rect(450, 40), pos(0, 0), color(255, 255, 255), outline(3, rgb(0, 0, 0)), opacity(0.9), z(100)]);
    const btC = add([text("je devrais mettre le carton de gauche sur le bouton rouge", { size: 13 }), pos(0, 0), color(0, 0, 0), z(101)]);
    const uC = onUpdate(() => { bC.pos = vec2(player.pos.x - 175, player.pos.y - 60); btC.pos = vec2(bC.pos.x + 10, bC.pos.y + 10); });
    wait(4, () => { destroy(bC); destroy(btC); uC.cancel(); });
});

scene("conclusion", () => {
    setBackground(BLACK);
    let menuMusic = play('ambiencemaison', { loop: true, volume: 5 });

    let step = 0;
    let currentBulle = null;
    let currentText = null;

    function showBulle(txt, x, y, isPink = false) {
        if (currentBulle) destroy(currentBulle);
        if (currentText) destroy(currentText);
        currentBulle = add([
            rect(400, 100, { radius: 10 }),
            pos(x, y),
            anchor("center"),
            color(isPink ? rgb(255, 200, 200) : rgb(255, 255, 255)),
            outline(4, rgb(0, 0, 0)),
            z(10)
        ]);
        currentText = add([
            text(txt, { size: 24, width: 360, align: "center" }),
            pos(x, y),
            anchor("center"),
            color(0, 0, 0),
            z(11)
        ]);
    }

    showBulle("Ma chère Carlita ! Je suis enfin là !", width() - 300, height() / 2 - 100);

    onKeyPress("space", () => {
        step++;
        if (step === 1) {
            showBulle("Mon bien aimé Carlos ! Je suis heureuse que tu sois venu !", 300, height() / 2 - 100, true);
        } else if (step === 2) {
            if (currentBulle) destroy(currentBulle);
            if (currentText) destroy(currentText);
            
            const heart = add([
                sprite("hearth"),
                pos(width() / 2, height() / 2),
                anchor("center"),
                scale(0),
                z(20)
            ]);
            
            onUpdate(() => {
                if (heart.scale.x < 3) {
                    heart.scale = heart.scale.add(vec2(dt() * 0.5));
                }
            });

            const endMsg = add([
                text("merci d'avoir joué :)", { size: 32 }),
                pos(width() / 2, height() - 100),
                anchor("center"),
                color(255, 255, 255),
                opacity(0),
                z(30)
            ]);
            
            onUpdate(() => {
                if (endMsg.opacity < 1) {
                    endMsg.opacity += dt() * 0.3;
                }
            });
            
            wait(8, () => go("menu", menuMusic));
        }
    });
});

go('menu');
