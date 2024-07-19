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
        w: 20,
        h: 50,
    },
    rifle: {
        name: "rifle",
        battleType: "distant",
        rapidity: 70,
        grouping: 1,
        deviation: 0.1,
        onGround: "public/assets/Weapon/weapon1.png",
        inHand: "public/assets/Weapon/weaponUp1.png",
        amount: 40,
        rechargeTime: 3000,
        w: 25,
        h: 120,
    },
    machineGun: {
        name: "machineGun",
        battleType: "distant",
        rapidity: 500,
        grouping: 5,
        deviation: 0.4,
        onGround: "public/assets/Weapon/weapon2.png",
        inHand: "public/assets/Weapon/weaponUp2.png",
        amount: 8,
        rechargeTime: 3000,
        w: 40,
        h: 130,
    },
    pistol: {
        name: "pistol",
        battleType: "distant",
        rapidity: 300,
        grouping: 1,
        deviation: 0.05,
        onGround: "public/assets/Weapon/weapon3.png",
        inHand: "public/assets/Weapon/weaponUp3.png",
        amount: 15,
        rechargeTime: 1500,
        w: 20,
        h: 70,
    },
    glock: {
        name: "glock",
        battleType: "distant",
        rapidity: 200,
        grouping: 1,
        deviation: 0.05,
        onGround: "public/assets/Weapon/weapon4.png",
        inHand: "public/assets/Weapon/weaponUp4.png",
        amount: 15,
        rechargeTime: 2000,
        w: 20,
        h: 70,
    }
}