export const WEAPON_MODELS = {
    knife: {
        name: "knife",
        battleType: "close",  //ближний или дальний бой
        rapidity: 10,           //скорострельность (задержка в миллисек)
        grouping: 10,           //кучность
        deviation: 0.5,          //отклонение
        onGround: "public/assets/Weapon/weapon5.png",       //текстура на земле
        inHand: "public/assets/Weapon/weaponUp5.png", //текстура в руках
        amount: 0, //количество пуль в магазине(для холодного - 0)
        rechargeTime: 0, //время перезарядки
        w: 40,
        h: 100,
    },
    rifle: {
        name: "rifle",
        battleType: "distant",
        rapidity: 70,
        grouping: 1,
        deviation: 0.07,
        onGround: "public/assets/Weapon/weapon1.png",
        inHand: "public/assets/Weapon/weaponUp1.png",
        amount: 50,
        rechargeTime: 3000,
        w: 25,
        h: 120,
    },
    shotGun: {
        name: "shotGun",
        battleType: "distant",
        rapidity: 600,
        grouping: 7,
        deviation: 0.4,
        onGround: "public/assets/Weapon/weapon2.png",
        inHand: "public/assets/Weapon/weaponUp2.png",
        amount: 8,
        rechargeTime: 3000,
        w: 40,
        h: 130,
    },
    uzi: {
        name: "uzi",
        battleType: "distant",
        rapidity: 60,
        grouping: 1,
        deviation: 0.25,
        onGround: "public/assets/Weapon/weapon3.png",
        inHand: "public/assets/Weapon/weaponUp3.png",
        amount: 40,
        rechargeTime: 1500,
        w: 20,
        h: 70,
    },
    glock: {
        name: "glock",
        battleType: "distant",
        rapidity: 300,
        grouping: 3,
        deviation: 0,
        onGround: "public/assets/Weapon/weapon4.png",
        inHand: "public/assets/Weapon/weaponUp4.png",
        amount: 20,
        rechargeTime: 2000,
        w: 20,
        h: 70,
    }
}