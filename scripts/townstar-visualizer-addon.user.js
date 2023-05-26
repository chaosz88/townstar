// ==UserScript==
// @name         Town Star Visualizer Addon
// @namespace    http://tampermonkey.net/
// @version      0.7.1.20
// @description  Update citadelofthewind.
// @author       Oizys, Jehosephat, Kewlhwip, TruckTonka, LowCat
// @match        http*://citadelofthewind.com/wp-content/visualizer*
// @run-at       document-start
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

(function() {
    'use strict';

    const newTownstarObjects = {"888_Orb_of_Hope":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"888_Orb_of_Hope","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"files/assets/80778988/1/icon_888OrbOfHope.png?t=57260d5eecb236fbbacd610a41d032a9"},"ATV":{"BuildCost":75000,"Class":"Ranch","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":150,"Name":"ATV","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"files/assets/31262483/1/icon_ATV.png?t=f18fe305e039247b1921b67b6d7f72c4"},"Air_Cargo":{"BuildCost":150000,"Class":"Trade","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Plains","LaborCost":150,"Name":"Air_Cargo","ProximityDist":3,"ProximityEmit":"Dirty","ProximityImmune":false,"FileUrl":null},"Alfa_Fountain_Good":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Alfa_Fountain_Good","ProximityDist":3,"ProximityEmit":"Water","ProximityImmune":false,"FileUrl":"files/assets/29822691/1/icon_alfaFountainGood.png?t=8ac70af72c64d9a9bda4a40383d04529"},"Alfa_Fountain_Great":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Alfa_Fountain_Great","ProximityDist":4,"ProximityEmit":"Water","ProximityImmune":false,"FileUrl":"files/assets/29822692/1/icon_alfaFountainGreat.png?t=38ddc5e1b1ca9f8b313f3b4e1da005ca"},"Alfa_Fountain_Majestic":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Alfa_Fountain_Majestic","ProximityDist":5,"ProximityEmit":"Water","ProximityImmune":false,"FileUrl":"files/assets/29822693/1/icon_alfaFountainMajestic.png?t=d4dc22163d79d7c27964bd8191814600"},"Alfa_Fountain_Ok":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Alfa_Fountain_Ok","ProximityDist":2,"ProximityEmit":"Water","ProximityImmune":false,"FileUrl":"files/assets/29591758/1/icon_alfaFountainOK.png?t=f7d371397bbfa57ec906dba39ae8f26a"},"Ancient_Bitrue_Wheat":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Ancient_Bitrue_Wheat","ProximityDist":6,"ProximityEmit":"Wheat","ProximityImmune":false,"FileUrl":"files/assets/37506889/1/icon_ancientBitrueWheat.png?t=1c76cedd2d47f7a147cca8ef3a3653ed"},"Ancient_Simplex_Sugarcane":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Ancient_Simplex_Sugarcane","ProximityDist":6,"ProximityEmit":"Sugarcane","ProximityImmune":false,"FileUrl":"files/assets/37733319/1/icon_ancientSimplexSugarcane.png?t=5953f5766451aaf95cc72b4cef2b66ef"},"Ancient_Tesla_Coil":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":true,"CraftTimeMod":0.25,"Crafts":"Energy","EdgeRequirements":"Road","LaborCost":0,"Name":"Ancient_Tesla_Coil","ProximityDist":10,"ProximityEmit":"Energy","ProximityImmune":true,"FileUrl":null},"Aquaculturist_House":{"BuildCost":50000,"Class":"Fishing","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":200,"Name":"Aquaculturist_House","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"files/assets/106563247/1/icon_aquaculturistHouse.png?t=fd891902037896d377a9de5b516c835c"},"Arid":{"BuildCost":0,"Class":"Terrain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Arid","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":null},"B_Barter_Station":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Wheat,Sugarcane,Wood","EdgeRequirements":"Road","LaborCost":10,"Name":"B_Barter_Station","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":true,"FileUrl":null},"Bakery":{"BuildCost":400000,"Class":"Farm","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Butter,Dough,Baguette,Jam","EdgeRequirements":"Road","LaborCost":750,"Name":"Bakery","ProximityDist":2,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"files/assets/27093470/1/icon_bakery.png?t=fec337e7652643e61f7626e4611577e0"},"Basketball_Court":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Basketball_Court","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"files/assets/63382835/1/icon_basketballCourt.png?t=45f26c72f297d3f9ab6ed5d8e127335e"},"Beacon_of_Light":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Beacon_of_Light","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"files/assets/99090395/1/icon_beaconofLight.png?t=6d832a645c756cf334cc13cb281e7e4f"},"Beehive":{"BuildCost":25000,"Class":"Ranch","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Honey,Honeycomb,Wax","EdgeRequirements":"None","LaborCost":0,"Name":"Beehive","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"files/assets/94519805/1/icon_beehive.png?t=a077d0fa8a4aea33ab4d402951ca8c31"},"Beekeeper_House":{"BuildCost":7500,"Class":"Ranch","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":150,"Name":"Beekeeper_House","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"files/assets/94519806/1/icon_beekeeperHouse.png?t=03de854ab9fe15c9e6e6a4f07acf70ba"},"Big_Oak_Shed":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Big_Oak_Shed","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"files/assets/115883996/1/icon_bigOakShed.png?t=d5e6169c364fce92ce9030e06a42a8f9"},"Big_Pantry":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Big_Pantry","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"files/assets/123572318/1/icon_bigPantry.png?t=f8c0e8c0a0660376d45d0053b06d4d37"},"Big_Storehouse":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Big_Storehouse","ProximityDist":2,"ProximityEmit":"Shady","ProximityImmune":true,"FileUrl":"files/assets/111162249/1/icon_bigStorehouse.png?t=5746261c1376ec931b8fdaa1b7056de4"},"Big_Warehouse":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Big_Warehouse","ProximityDist":2,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"files/assets/108839505/1/icon_bigWarehouse.png?t=5dd3af26f81b778b3ea51f76ea861496"},"Big_Wood_Shed":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Big_Wood_Shed","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"files/assets/120586433/1/icon_bigWoodShed.png?t=574d712ea36f4df6022a3a49969c7c0f"},"Bitrue_Wheat":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Bitrue_Wheat","ProximityDist":2,"ProximityEmit":"Wheat","ProximityImmune":false,"FileUrl":"files/assets/35830017/1/icon_bitrueWheat.png?t=7f455141f1738fae0916132241f6c66c"},"Boxing_Facility":{"BuildCost":300000,"Class":"Industrial","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Food_Parcel,Gift_Parcel,Party_Box,Stack_Box","EdgeRequirements":"Road","LaborCost":750,"Name":"Boxing_Facility","ProximityDist":2,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"files/assets/99282463/1/icon_boxingFacility.png?t=89eaf2bd0f07ebc23308b821a4404865"},"Brine_Storage":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Brine_Storage","ProximityDist":2,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"files/assets/46947907/1/icon_brineStorage.png?t=9eb242b92847106f19102de41b56c339"},"Broken_History":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Broken_History","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"files/assets/63382912/1/icon_brokenHistory.png?t=7093ed61d6557824187ac04df40e4c2d"},"Buggy_Mr_Puddles_Home":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Buggy_Mr_Puddles_Home","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":true,"FileUrl":"files/assets/51789049/1/icon_buggyMrPuddlesHome.png?t=7a4ad2c4824f2a93ca4c90ee00f5cc33"},"Builder_House":{"BuildCost":2500,"Class":"Industrial","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"None","LaborCost":20,"Name":"Builder_House","ProximityDist":2,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"files/assets/34583570/1/icon_builderHouse.png?t=7af94d83ecce7fc7d8faf65a13fd360b"},"Cabernet_Vines":{"BuildCost":3500,"Class":"Farm","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Cabernet_Grapes","EdgeRequirements":"None","LaborCost":0,"Name":"Cabernet_Vines","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"files/assets/43726665/1/icon_cabernetVines.png?t=ca0a03dbe8518f1f25b1a16b612d967d"},"Cactus":{"BuildCost":0,"Class":"Terrain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Cactus","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":null},"Cakery":{"BuildCost":1000000,"Class":"Farm","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Batter,Cake,Pumpkin_Pie","EdgeRequirements":"Road","LaborCost":1500,"Name":"Cakery","ProximityDist":2,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"files/assets/27093821/1/icon_cakery.png?t=ce35e95b6ab0095b6e1cc800e01de3ff"},"Candy_Shop":{"BuildCost":150000,"Class":"Farm","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Candy_Canes,Chocolate_Covered_Strawberries","EdgeRequirements":"Road","LaborCost":150,"Name":"Candy_Shop","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"files/assets/60803155/1/icon_candyShop.png?t=0b534997882a8c2f7c6d1351cf725145"},"Chardonnay_Vines":{"BuildCost":1500,"Class":"Farm","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Chardonnay_Grapes","EdgeRequirements":"None","LaborCost":0,"Name":"Chardonnay_Vines","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"files/assets/43726666/1/icon_chardonnayVines.png?t=325371772eb9fa2e63341e933821a7c1"},"Chicken_Coop":{"BuildCost":15000,"Class":"Ranch","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Eggs","EdgeRequirements":"None","LaborCost":0,"Name":"Chicken_Coop","ProximityDist":2,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"files/assets/27093843/1/icon_chickenCoop.png?t=405c10cf3c32c8d8dcb0030d0dd509af"},"Chocolate_Shop":{"BuildCost":300000,"Class":"Farm","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Chocolate_Bar,Fancy_Cake,Decorated_Cake","EdgeRequirements":"Road","LaborCost":300,"Name":"Chocolate_Shop","ProximityDist":2,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"files/assets/60803161/1/icon_chocolateShop.png?t=6a0734b41ec8c93e619f2db7b20bb515"},"Chocolatier":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Chocolate_Bar,Fancy_Cake,Decorated_Cake","EdgeRequirements":"Road","LaborCost":100,"Name":"Chocolatier","ProximityDist":2,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"files/assets/87150246/1/icon_chocolatier.png?t=6a0734b41ec8c93e619f2db7b20bb515"},"Christmas_Sugarcane_Stand":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Christmas_Sugarcane_Stand","ProximityDist":2,"ProximityEmit":"Sugarcane","ProximityImmune":false,"FileUrl":"files/assets/111818876/1/icon_christmasSugarcaneStand.png?t=0afb4d82ea617815cb619f500984b5c4"},"Clay_Field":{"BuildCost":10000,"Class":"Terrain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Clay_Lump","EdgeRequirements":"None","LaborCost":0,"Name":"Clay_Field","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"files/assets/94519812/1/icon_clayField.png?t=5e03e88d53091a33e99e02a177d4a983"},"Cocoa_Tree":{"BuildCost":2500,"Class":"Farm","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Cocoa","EdgeRequirements":"None","LaborCost":0,"Name":"Cocoa_Tree","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"files/assets/60815348/1/icon_cocoaTree.png?t=62abfc0da92ef39268f30d669c8cef87"},"Common_Candy_Cane_Storage":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Common_Candy_Cane_Storage","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"files/assets/116052200/1/icon_commonCandyCaneStorage.png?t=d2c9f686096f7ffd291106c9a188aedf"},"Common_Cotton_Storage":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Common_Cotton_Storage","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"files/assets/104838712/1/icon_commonCottonStorage.png?t=1ab7b1c40ddc3af2c4d56aa0f1eb4e94"},"Common_Flour_Storehouse":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Common_Flour_Storehouse","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":true,"FileUrl":"files/assets/68809213/1/icon_commonFlourStorehouse.png?t=bcccbf3c5eea482cc5d0720aae63e8f3"},"Common_Husk_Rice_Storage":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Common_Husk_Rice_Storage","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://lh3.googleusercontent.com/docs/ADP-6oEWzaJSqw82Nz36nX2yYKiun_-8D-bxN6rJSYZT8KRNkUuA9jiC7jV6rqPPvdPScZYPoRxbhVzvjwmBJtHv7fOokmq2Dkt0hnN5tPO2kaBqXKFsrl2IFH6TH0zHzwxK8IJPREIuvtFlYTSXlOEwPr5pFKmhxZ7YOz422ovCM_LZBudCDXPyGJptkzQACz8eIH8"},"Common_Milk_Storage":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Common_Milk_Storage","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"files/assets/128374912/1/icon_commonMilkStorage.png?t=f2a39c043dfa3a51dba4d498b2ce458d"},"Common_Peppermint_Storage":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Common_Peppermint_Storage","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"files/assets/114165305/1/icon_commonPeppermintStorage.png?t=db99635257d13eb64e91a81bb64afc6b"},"Common_Pumpkin_Storage":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Common_Pumpkin_Storage","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"files/assets/102114683/1/icon_commonPumpkinStorage.png?t=faf4f88de6db4ad64bd257bc09e8b19e"},"Common_Strawberry_Storage":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Common_Strawberry_Storage","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"files/assets/122186767/1/icon_commonStrawberryStorage.png?t=997363ef4a121d272e4a2f521c795a0a"},"Common_Water_Barrel_Storage":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Common_Water_Barrel_Storage","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"files/assets/119037332/1/icon_commonWaterBarrelStorage.png?t=8c34c4a09c264dec16dbb631bf3186ef"},"Construction_Site":{"BuildCost":0,"Class":"Industrial","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Construction_Site","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":true,"FileUrl":null},"Corrupted_Cabernet_Grapes_Stand":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Corrupted_Cabernet_Grapes_Stand","ProximityDist":6,"ProximityEmit":"Cabernet_Grapes","ProximityImmune":false,"FileUrl":"files/assets/124428645/1/icon_corruptedCabernetGrapesStand.png?t=e955ece70dcd11b7009138c321cd6d98"},"Corrupted_Chardonnay_Grapes_Stand":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Corrupted_Chardonnay_Grapes_Stand","ProximityDist":6,"ProximityEmit":"Chardonnay_Grapes","ProximityImmune":false,"FileUrl":"files/assets/124428650/1/icon_corruptedChardonnayGrapesStand.png?t=2b2ec99ae1af348b9eec44f58e9ab143"},"Corrupted_Chromium_Stand":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Corrupted_Chromium_Stand","ProximityDist":6,"ProximityEmit":"Chromium","ProximityImmune":false,"FileUrl":"files/assets/124428652/1/icon_corruptedChromiumStand.png?t=f570f1c243fa44cb69b936c20da9ec25"},"Corrupted_Cocoa_Stand":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Corrupted_Cocoa_Stand","ProximityDist":6,"ProximityEmit":"Cocoa","ProximityImmune":false,"FileUrl":"files/assets/124428653/1/icon_corruptedCocoaStand.png?t=1cfa16e8a79977186de88e64d183e4d3"},"Corrupted_Limestone_Stand":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Corrupted_Limestone_Stand","ProximityDist":6,"ProximityEmit":"Limestone","ProximityImmune":false,"FileUrl":"files/assets/124428648/1/icon_corruptedLimestoneStand.png?t=31d9f75a9ab14a8acf7e0c7c9e6845ab"},"Corrupted_Peppermint_Stand":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Corrupted_Peppermint_Stand","ProximityDist":6,"ProximityEmit":"Peppermint","ProximityImmune":false,"FileUrl":"files/assets/124428647/1/icon_corruptedPeppermintStand.png?t=b0a65e2f6e8adb129bdca159e63b7558"},"Corrupted_Pinot_Noir_Grapes_Stand":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Corrupted_Pinot_Noir_Grapes_Stand","ProximityDist":6,"ProximityEmit":"Pinot_Noir_Grapes","ProximityImmune":false,"FileUrl":"files/assets/124428646/1/icon_corruptedPinotNoirGrapesStand.png?t=20175a35427e45a254328f8cee0ce591"},"Corrupted_Portal":{"BuildCost":2000000,"Class":"Industrial","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"350k_Stars","EdgeRequirements":"Paved_Road","LaborCost":1000,"Name":"Corrupted_Portal","ProximityDist":3,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"files/assets/124211616/1/icon_corruptedPortal.png?t=889806db086a9feadfde3f4b3f2dcc4d"},"Corrupted_Pumpkin_Stand":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Corrupted_Pumpkin_Stand","ProximityDist":6,"ProximityEmit":"Pumpkin","ProximityImmune":false,"FileUrl":"files/assets/124428649/1/icon_corruptedPumpkinStand.png?t=14d2e154e5aac09dfb27ecc3b68dcc38"},"Corrupted_Silica_Stand":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Corrupted_Silica_Stand","ProximityDist":6,"ProximityEmit":"Silica","ProximityImmune":false,"FileUrl":"files/assets/124428651/1/icon_corruptedSilicaStand.png?t=decd951edaba659adbe137bcd236df74"},"Cotton_Field":{"BuildCost":250,"Class":"Farm","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Cotton","EdgeRequirements":"None","LaborCost":0,"Name":"Cotton_Field","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"files/assets/24496931/1/icon_cottonField.png?t=84fd0fd88264e105f3dbf9c061f888a6"},"CraneBot_Home":{"BuildCost":0,"Class":"Industrial","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"None","LaborCost":20,"Name":"CraneBot_Home","ProximityDist":2,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"files/assets/34587157/1/icon_craneBotHome.png?t=aba568542a381f53d2e53a1d540f77d8"},"Death_Row_Records":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Death_Row_Records","ProximityDist":2,"ProximityEmit":"Water","ProximityImmune":false,"FileUrl":"files/assets/68179029/1/icon_deathRowRecords.png?t=c70475f0df5ced0657e9f6298dddb2eb"},"Diamond_Charge_Station":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Diamond_Charge_Station","ProximityDist":2,"ProximityEmit":"Energy","ProximityImmune":false,"FileUrl":"files/assets/128668578/1/icon_diamondChargeStation.png?t=ffa7d0c2fdf18b56369819cca454dd99"},"Diamond_Warehouse":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Diamond_Warehouse","ProximityDist":0,"ProximityEmit":"Shady","ProximityImmune":true,"FileUrl":"files/assets/122658782/1/icon_diamondWarehouse.png?t=79061d5d2043d134d995274563612932"},"Diamond_Water_Pump":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"Pond:OR:Waterway:OR:Bridge","LaborCost":0,"Name":"Diamond_Water_Pump","ProximityDist":1,"ProximityEmit":"Water_Drum","ProximityImmune":false,"FileUrl":"files/assets/119476328/1/icon_diamondWaterPump.png?t=ffa7d0c2fdf18b56369819cca454dd99"},"DigiFinex_Cotton":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"DigiFinex_Cotton","ProximityDist":2,"ProximityEmit":"Cotton","ProximityImmune":false,"FileUrl":"files/assets/35830065/1/icon_digifinexCotton.png?t=dfce8fcaa9c9165ec5ec34ea86545490"},"Dirt_Road":{"BuildCost":1000,"Class":"Terrain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Dirt_Road","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"files/assets/24496929/1/icon_dirtRoad.png?t=0eeffa9062f981d1d5a912108ab85722"},"ElfBot_Home":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"ElfBot_Home","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"files/assets/40932602/1/icon_elfBotHome.png?t=ddcdc2bdefb1c010257af3c3bd333ac2"},"Epic_Basketball_Court":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Epic_Basketball_Court","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"files/assets/63382837/1/icon_epicBasketballCourt.png?t=ba4497367ad507b8d889ff7b07632e3d"},"Epic_Bitrue_Wheat":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Epic_Bitrue_Wheat","ProximityDist":4,"ProximityEmit":"Wheat","ProximityImmune":false,"FileUrl":"files/assets/37506888/1/icon_epicBitrueWheat.png?t=fe424f1741e98bf71fb55efd1876fd6b"},"Epic_Brine_Storage":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Epic_Brine_Storage","ProximityDist":2,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"files/assets/46947934/1/icon_epicBrineStorage.png?t=b85a2ab2f452ad8dbd00fa2bd0422dd5"},"Epic_Cake_Storage":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Epic_Cake_Storage","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"files/assets/121871194/1/icon_epicCakeStorage.png?t=3970c9f85b49e81d44a6892aafce33fe"},"Epic_Grape_Storage":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Epic_Grape_Storage","ProximityDist":2,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"files/assets/46947931/1/icon_epicGrapeStorage.png?t=dffbd003f33033cf715b214487f27211"},"Epic_Master_Wizard":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Enchanted_Object,Magic_Powder,Ice_Block","EdgeRequirements":"Road","LaborCost":1400,"Name":"Epic_Master_Wizard","ProximityDist":2,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"files/assets/113188823/1/icon_epicMasterWizard.png?t=06de5020e3b8126328ced35618990051"},"Epic_Salt_Station":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":true,"CraftTimeMod":1.33,"Crafts":"Salt","EdgeRequirements":"Road","LaborCost":0,"Name":"Epic_Salt_Station","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":true,"FileUrl":"files/assets/80466847/1/icon_epicSaltStation.png?t=b1360a23c2425dc1b924b2db107779ca"},"Epic_Seafood_Warehouse":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Epic_Seafood_Warehouse","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"files/assets/128588611/1/icon_epicSeafoodWarehouse.png?t=b7c4b9bcbc534957796a5f0988e88918"},"Epic_Simplex_Sugarcane":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Epic_Simplex_Sugarcane","ProximityDist":4,"ProximityEmit":"Sugarcane","ProximityImmune":false,"FileUrl":"files/assets/37733321/1/icon_epicSimplexSugarcane.png?t=04e63bdd7db7960c3fd79360044bc7d2"},"Epic_Stylin_Ride":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0.5,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Epic_Stylin_Ride","ProximityDist":1,"ProximityEmit":"Iron","ProximityImmune":false,"FileUrl":"files/assets/68283121/1/icon_epicStylinRide.png?t=5be9fe6dbec224d67b8713a4b2702690"},"Epic_Sugar_Station":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":true,"CraftTimeMod":1.33,"Crafts":"Sugar","EdgeRequirements":"Road","LaborCost":0,"Name":"Epic_Sugar_Station","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":true,"FileUrl":"files/assets/80466806/1/icon_epicSugarStation.png?t=aeaff66007c608cad116851236d4d47d"},"Epic_Sugarcane_Storage":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Epic_Sugarcane_Storage","ProximityDist":2,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"files/assets/46947919/1/icon_epicSugarcaneStorage.png?t=6da856344c8815c4de59543e534e53e4"},"Epic_Turbo_Pump":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0.25,"Crafts":"Crude_Oil","EdgeRequirements":"Road","LaborCost":0,"Name":"Epic_Turbo_Pump","ProximityDist":1,"ProximityEmit":"Dirty","ProximityImmune":false,"FileUrl":"https://lh3.googleusercontent.com/docs/ADP-6oEAcEvl__qP5-cYvNs4Mubi0KQs0aWV7ZskTdMxrpZEQQ55mCa1s3Nj3CXeXHBt2ni1uOKMMZfYWz2DA8zA763h_LosGquiXOxklq7IBpA8a-b5LUYMh-frwXadE0g80JEwK80A71pJ1z8pf24h0oChLIVdluGNEUIeLIznz5hgJE5QHAzWq-x7hPwYl62ixqA"},"Epic_Water_Tower":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Epic_Water_Tower","ProximityDist":5,"ProximityEmit":"Water","ProximityImmune":true,"FileUrl":"files/assets/47142644/1/icon_epicWaterTower.png?t=e504666881d4d0e90a57c73f34704ef2"},"Epic_Wheat_Stand":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Epic_Wheat_Stand","ProximityDist":4,"ProximityEmit":"Wheat","ProximityImmune":false,"FileUrl":"files/assets/46947927/1/icon_epicWheatStand.png?t=0ac6e681164cafdc603cb8cc9fbdf731"},"Epic_Wheat_Storage":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Epic_Wheat_Storage","ProximityDist":2,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"files/assets/46947923/1/icon_epicWheatStorage.png?t=050ff3acf1b4201e2cd14df66f8c7aaa"},"Epic_Wine_Cellar":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Epic_Wine_Cellar","ProximityDist":2,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"files/assets/73205956/1/icon_epicWineCellar.png?t=232434c0e6cca2acbb2a7bdd912ba13a"},"Express_Depot":{"BuildCost":0,"Class":"Trade","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"OpenWorld:OR:Bridge","LaborCost":20,"Name":"Express_Depot","ProximityDist":2,"ProximityEmit":"Dirty","ProximityImmune":false,"FileUrl":"files/assets/31159160/1/icon_expressDepot.png?t=b46aeabb6dc37f452b55c7a269a5253a"},"Express_Pier":{"BuildCost":0,"Class":"Trade","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"Waterway:OR:Bridge","LaborCost":0,"Name":"Express_Pier","ProximityDist":1,"ProximityEmit":"Dirty","ProximityImmune":false,"FileUrl":"files/assets/115867721/1/icon_expressPier.png?t=59cc23f82701a6eefe48dd714752bd5d"},"Fabric_Plant":{"BuildCost":500000,"Class":"Industrial","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Cotton_Yarn,Wool_Yarn,Uniforms,Fabric_Box","EdgeRequirements":"Paved_Road","LaborCost":500,"Name":"Fabric_Plant","ProximityDist":2,"ProximityEmit":"Shady,Dirty","ProximityImmune":true,"FileUrl":"files/assets/27094290/1/icon_fabricPlant.png?t=1be98e25cf2a2b60d47c0e7c5a44f380"},"Fancy_Barn":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Milk","EdgeRequirements":"None","LaborCost":0,"Name":"Fancy_Barn","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"files/assets/125517620/1/icon_fancyBarn.png?t=cf5a942fef1a87b29678040888b937cf"},"FarmBot_Home":{"BuildCost":1250,"Class":"WorldMining","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"OpenWorld:OR:Bridge","LaborCost":0,"Name":"FarmBot_Home","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":null},"Farm_House":{"BuildCost":1250,"Class":"Farm","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":10,"Name":"Farm_House","ProximityDist":2,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"files/assets/27097298/1/icon_farmHouse.png?t=e0f2a9d7c634e148dbfa19705abd51d7"},"Farm_Tractor":{"BuildCost":75000,"Class":"Farm","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":150,"Name":"Farm_Tractor","ProximityDist":2,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"files/assets/27097314/1/icon_farmTractor.png?t=4095bac7c6039139acaf81096eb75245"},"Feed_Mill":{"BuildCost":5000,"Class":"Ranch","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Feed","EdgeRequirements":"None","LaborCost":0,"Name":"Feed_Mill","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":true,"FileUrl":"files/assets/28840383/1/icon_feedMill.png?t=112c00184c18c72caac3e6d79316f618"},"Feedbot_Shack":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Feedbot_Shack","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"files/assets/85150825/1/icon_feedbotShack.png?t=0dd9e9efe211b9cf67546204610b15ae"},"Fish_Farm":{"BuildCost":95000,"Class":"Fishing","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Eel,Roe","EdgeRequirements":"None","LaborCost":0,"Name":"Fish_Farm","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"files/assets/106563254/1/icon_fishFarm.png?t=1d93e9b7ec39d172780d76709470fafa"},"Fisherman_House":{"BuildCost":75000,"Class":"Fishing","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":450,"Name":"Fisherman_House","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"files/assets/106562665/1/icon_fishermanHouse.png?t=67e0f6405e156d062d4d720fcc30dc3e"},"Fishing_Platform":{"BuildCost":300000,"Class":"Fishing","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Farm_Salmon","EdgeRequirements":"OpenWorld","LaborCost":0,"Name":"Fishing_Platform","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"files/assets/127524655/1/icon_fishingPlatform.png?t=99a3efdbcfad0a8322df9c8474e4e592"},"Flow":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Flow","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"files/assets/64089921/1/icon_flow.png?t=7093ed61d6557824187ac04df40e4c2d"},"Forklift":{"BuildCost":75000,"Class":"Industrial","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":150,"Name":"Forklift","ProximityDist":2,"ProximityEmit":"Shady,Dirty","ProximityImmune":false,"FileUrl":"files/assets/27097354/1/icon_forklift.png?t=7e171c4589396231d6bbbdee20c01e6c"},"Freight_Pier":{"BuildCost":250000,"Class":"Trade","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Waterway:OR:Bridge","LaborCost":300,"Name":"Freight_Pier","ProximityDist":3,"ProximityEmit":"Dirty","ProximityImmune":false,"FileUrl":"files/assets/27097473/1/icon_freightPier.png?t=1665e7571b50c83e5751f15510ad4692"},"Fuel_Storage":{"BuildCost":15000,"Class":"Industrial","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Fuel_Storage","ProximityDist":3,"ProximityEmit":"Dirty","ProximityImmune":false,"FileUrl":"files/assets/27135144/1/icon_fuelStorage.png?t=c98704f1cad83ddaf4b8b5ad462fbf13"},"Gala_Turntable":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Gala_Turntable","ProximityDist":1,"ProximityEmit":"Water","ProximityImmune":false,"FileUrl":"files/assets/68325459/1/icon_galaTurntable.png?t=85ca43a29b95d1cd1cf86137ead60373"},"Galaverse_in_the_Mediterranean_Sea":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"OpenWorld:OR:Bridge:OR:Waterway","LaborCost":0,"Name":"Galaverse_in_the_Mediterranean_Sea","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"files/assets/90349544/1/icon_GalaverseintheMediterraneanSea.png?t=c0b7b03a345854ac210b55d8dd589f83"},"GeckoCon_2022":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"GeckoCon_2022","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"files/assets/97194626/1/icon_geckoCon2022.png?t=7c057b015f132350bf3f365597f8686b"},"Gift_Drone":{"BuildCost":1250,"Class":"Trade","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Gift_Drone","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":null},"Glass_Factory":{"BuildCost":100000,"Class":"Industrial","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Wine_Bottle,Molten_Glass","EdgeRequirements":"Road","LaborCost":750,"Name":"Glass_Factory","ProximityDist":2,"ProximityEmit":"Shady,Dirty","ProximityImmune":false,"FileUrl":"files/assets/43726663/1/icon_glassFactory.png?t=22585ca9ebdcfae920c1f1f1f555edad"},"Grape_Storage":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Grape_Storage","ProximityDist":2,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"files/assets/46947929/1/icon_grapeStorage.png?t=92021a54432ed33f3eca48844fc219d6"},"Grass":{"BuildCost":0,"Class":"Terrain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Grass","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"files/assets/24496928/1/icon_grass.png?t=4f472cfba7c7b5a87938a51deb233133"},"Great_Saw_Mill":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Lumber,Oak_Barrel,Wooden_Box","EdgeRequirements":"None","LaborCost":100,"Name":"Great_Saw_Mill","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":true,"FileUrl":"files/assets/117228960/1/icon_greatSawMill.png?t=997583d2a6b703221f809cb162a9e065"},"Green_Dragon_Express":{"BuildCost":0,"Class":"Trade","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"OpenWorld:OR:Bridge:OR:Waterway","LaborCost":20,"Name":"Green_Dragon_Express","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"files/assets/78018516/1/icon_greenDragonExpress.png?t=6dcc3ac990266b7b6fef6e7ba7f4fde9"},"Ground_Silo":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Ground_Silo","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"files/assets/120344237/1/icon_groundSilo.png?t=fa85f25331ba1921fd2c741a693c60d2"},"Haunted_Crypt":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Haunted_Crypt","ProximityDist":1,"ProximityEmit":"Crude_Oil","ProximityImmune":true,"FileUrl":"files/assets/58402291/1/icon_hauntedCrypt.png?t=d6d96dde5909f4bfd9c69afed62623a9"},"Haunted_East_Wing":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Haunted_East_Wing","ProximityDist":2,"ProximityEmit":"Crude_Oil","ProximityImmune":true,"FileUrl":"files/assets/58402293/1/icon_hauntedEastWing.png?t=cca3d9b650a7d383dea1e871bf341a01"},"Haunted_Front_Porch":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":true,"CraftTimeMod":1,"Crafts":"Pumpkin","EdgeRequirements":"None","LaborCost":0,"Name":"Haunted_Front_Porch","ProximityDist":2,"ProximityEmit":"Crude_Oil","ProximityImmune":true,"FileUrl":"files/assets/58402289/1/icon_hauntedFrontPorch.png?t=a69477620d9e30a5816d422023bd80f9"},"Haunted_Graveyard":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Haunted_Graveyard","ProximityDist":1,"ProximityEmit":"Crude_Oil","ProximityImmune":true,"FileUrl":"files/assets/58402292/1/icon_hauntedGraveyard.png?t=5d8441d58fece4749bcb3ba60be1db73"},"Haunted_Main_Tower":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Haunted_Main_Tower","ProximityDist":3,"ProximityEmit":"Crude_Oil","ProximityImmune":true,"FileUrl":"files/assets/58402288/1/icon_hauntedMainTower.png?t=7a372f33b069b56696c5804e4f70c6c0"},"Haunted_Maze_-_Zone_1":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Haunted_Maze_-_Zone_1","ProximityDist":3,"ProximityEmit":"Nectar","ProximityImmune":false,"FileUrl":"files/assets/105993291/1/icon_hauntedMaze-Zone1.png?t=3f55533c2eac47719187749680ced9c0"},"Haunted_Maze_-_Zone_2":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Haunted_Maze_-_Zone_2","ProximityDist":2,"ProximityEmit":"Clay_Lump","ProximityImmune":false,"FileUrl":"files/assets/106148443/1/icon_hauntedMaze-Zone2.png?t=5fa7b16928c71b2c5381cd6effdb91bb"},"Haunted_Maze_-_Zone_3":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Haunted_Maze_-_Zone_3","ProximityDist":4,"ProximityEmit":"PositiveOnlySalty","ProximityImmune":false,"FileUrl":"files/assets/106148442/1/icon_hauntedMaze-Zone3.png?t=0c535a43a600530b0a8973ef94a70bbf"},"Haunted_Maze_-_Zone_4":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Haunted_Maze_-_Zone_4","ProximityDist":1,"ProximityEmit":"Nectar","ProximityImmune":false,"FileUrl":"files/assets/106148444/1/icon_hauntedMaze-Zone4.png?t=4935f3062d37ce9217f9d2afe96e7de8"},"Haunted_West_Wing":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Haunted_West_Wing","ProximityDist":2,"ProximityEmit":"Crude_Oil","ProximityImmune":true,"FileUrl":"files/assets/58402290/1/icon_hauntedWestWing.png?t=9486a8b6b9608fdc6f56be3dc06517e6"},"Holiday_Tree":{"BuildCost":0,"Class":"Terrain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Holiday_Tree","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"files/assets/38607494/1/icon_holidayTree.png?t=ddcdc2bdefb1c010257af3c3bd333ac2"},"Into_The_Galaverse_2021":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"OpenWorld:OR:Bridge:OR:Waterway","LaborCost":0,"Name":"Into_The_Galaverse_2021","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"files/assets/63384155/1/icon_intoTheGalaverse2021.png?t=aa06968437b3571b137cb0c25a73cb33"},"Italian_Restaurant":{"BuildCost":850000,"Class":"Industrial","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Shrimp_Pizza,Pizza_Base,Four_Cheese_Pizza,Risotto,Lasagna","EdgeRequirements":"Paved_Road","LaborCost":0,"Name":"Italian_Restaurant","ProximityDist":2,"ProximityEmit":"Dirty,Shady","ProximityImmune":false,"FileUrl":"https://lh3.googleusercontent.com/docs/ADP-6oF4LxmMsSrUrzM1KpS2H3ZMjFayo8gDdGr2iM9ktLQpnMw85OFkK48aB5Yvm0VXwXLe35iWG-ra3K2oTL88jeEcQfiBejSEXIVQg3avRGwy_taHXTmM0dTlcrbmVjJTZz4v7huZGMc1h_pso_CBV1wMnMSX3d5cef_403nG6rtJBVy0wmbDtAgi_pkGRcJI"},"K_Barter_Station":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Sugarcane,Cotton,Wood","EdgeRequirements":"Road","LaborCost":10,"Name":"K_Barter_Station","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":true,"FileUrl":null},"Legendary_Basketball_Court":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Legendary_Basketball_Court","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"files/assets/63382834/1/icon_legendaryBasketballCourt.png?t=6f9327d5f4d069b62436e37f63768eda"},"Legendary_Bitrue_Wheat":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Legendary_Bitrue_Wheat","ProximityDist":5,"ProximityEmit":"Wheat","ProximityImmune":false,"FileUrl":"files/assets/37506887/1/icon_legendaryBitrueWheat.png?t=802ddf7494794feaed62b94e57404615"},"Legendary_Brine_Storage":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Legendary_Brine_Storage","ProximityDist":2,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"files/assets/46947933/1/icon_legendaryBrineStorage.png?t=ceb7b5e369b8ca099cd79d155695b696"},"Legendary_Fabric_Plant":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Cotton_Yarn,Wool_Yarn,Uniforms,Fabric_Box","EdgeRequirements":"Paved_Road","LaborCost":250,"Name":"Legendary_Fabric_Plant","ProximityDist":2,"ProximityEmit":"Shady,Dirty","ProximityImmune":false,"FileUrl":"files/assets/109903794/1/icon_legendaryFabricPlant.png?t=6e3998438941b82883738add0055396e"},"Legendary_Grape_Storage":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Legendary_Grape_Storage","ProximityDist":2,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"files/assets/46947932/1/icon_legendaryGrapeStorage.png?t=142610b9ff1206896ba4082293289b21"},"Legendary_Lolli_and_Pop_Shop":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0.16,"Crafts":"Candy_Canes,Chocolate_Covered_Strawberries","EdgeRequirements":"Road","LaborCost":0,"Name":"Legendary_Lolli_and_Pop_Shop","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"files/assets/63513372/1/icon_legendaryLolliandPopShop.png?t=5c4a9e19f103ece5203bd16373dcb7db"},"Legendary_Lumber_Storage":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Legendary_Lumber_Storage","ProximityDist":2,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"files/assets/68809188/1/icon_legendaryLumberStorage.png?t=c8ba5f7bc8c7ca33c48ce1328a998a6c"},"Legendary_Oak_Tree_Farm":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Legendary_Oak_Wood","EdgeRequirements":"None","LaborCost":0,"Name":"Legendary_Oak_Tree_Farm","ProximityDist":0,"ProximityEmit":"Wood","ProximityImmune":false,"FileUrl":"files/assets/101219970/1/icon_LegendaryOakTreeFarm.png?t=5c36927218f48b399ebb09d9caf792a5"},"Legendary_Santa's_Factory":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Bicycle,Rocking_Horse","EdgeRequirements":"Road","LaborCost":1250,"Name":"Legendary_Santa's_Factory","ProximityDist":4,"ProximityEmit":"Cold","ProximityImmune":false,"FileUrl":"files/assets/113188779/1/icon_legendarySanta'sFactory.png?t=f26f1fb23720a9038ec2f68feee61463"},"Legendary_Simplex_Sugarcane":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Legendary_Simplex_Sugarcane","ProximityDist":5,"ProximityEmit":"Sugarcane","ProximityImmune":false,"FileUrl":"files/assets/37733320/1/icon_legendarySimplexSugarcane.png?t=baa5bcbf3d321a090796961db9017fe6"},"Legendary_Solar_Panel":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Legendary_Solar_Panel","ProximityDist":4,"ProximityEmit":"Energy","ProximityImmune":true,"FileUrl":"files/assets/55544749/1/icon_legendarySolarPanel.png?t=ff353c0fe9809418b61f4b495da71a65"},"Legendary_Stylin_Ride":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0.5,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Legendary_Stylin_Ride","ProximityDist":2,"ProximityEmit":"Iron","ProximityImmune":false,"FileUrl":"files/assets/68268734/1/icon_legendaryStylinRide.png?t=57126feb7151f1629edafd2d626fb3ac"},"Legendary_Sugarcane_Storage":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Legendary_Sugarcane_Storage","ProximityDist":2,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"files/assets/46947920/1/icon_legendarySugarcaneStorage.png?t=f3090e62f3ecf88efdc3bda10ce05c63"},"Legendary_Tesla_Coil":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":true,"CraftTimeMod":0.5,"Crafts":"Energy","EdgeRequirements":"Road","LaborCost":0,"Name":"Legendary_Tesla_Coil","ProximityDist":4,"ProximityEmit":"Energy","ProximityImmune":true,"FileUrl":"files/assets/55542382/1/icon_legendaryTeslaCoil.png?t=52c36b62608293f40a3c8505339cb3f1"},"Legendary_Tree_Farm":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Legendary_Wood","EdgeRequirements":"None","LaborCost":0,"Name":"Legendary_Tree_Farm","ProximityDist":0,"ProximityEmit":"Wood","ProximityImmune":false,"FileUrl":"files/assets/100773177/1/icon_legendaryTreeFarm.png?t=3fdd808c819e6d123e0d47c6cf3cff82"},"Legendary_Water_Tower":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Legendary_Water_Tower","ProximityDist":6,"ProximityEmit":"Water","ProximityImmune":true,"FileUrl":"files/assets/47142642/1/icon_legendaryWaterTower.png?t=98365021e48e09febc750b7695f0e701"},"Legendary_Wheat_Stand":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Legendary_Wheat_Stand","ProximityDist":5,"ProximityEmit":"Wheat","ProximityImmune":false,"FileUrl":"files/assets/46947928/1/icon_legendaryWheatStand.png?t=d3b7c179a04cdd79fdef4759a89358cc"},"Legendary_Wheat_Storage":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Legendary_Wheat_Storage","ProximityDist":2,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"files/assets/46947924/1/icon_legendaryWheatStorage.png?t=e15049b808c66931f2b07837e5e33993"},"Lolli_and_Pop_Shop":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0.5,"Crafts":"Candy_Canes,Chocolate_Covered_Strawberries","EdgeRequirements":"Road","LaborCost":100,"Name":"Lolli_and_Pop_Shop","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"files/assets/63513374/1/icon_lolliandPopShop.png?t=78b5be5da93530a313a9b39a6920668d"},"Lumber_Mill":{"BuildCost":50000,"Class":"Industrial","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Lumber,Oak_Barrel,Wooden_Box","EdgeRequirements":"Road","LaborCost":100,"Name":"Lumber_Mill","ProximityDist":2,"ProximityEmit":"Shady","ProximityImmune":true,"FileUrl":"files/assets/27132410/1/icon_lumberMill.png?t=64cf84c586416b23a7885867bd04e2bd"},"Lumber_Yard":{"BuildCost":20000,"Class":"Farm","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Lumber_Yard","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"files/assets/34585238/1/icon_LumberYard.png?t=cc4b368aa9625213b6ef13b9a661198b"},"Lumberjack_House":{"BuildCost":2500,"Class":"Farm","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":30,"Name":"Lumberjack_House","ProximityDist":2,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"files/assets/27132449/1/icon_lumberjackHouse.png?t=6c0306a1c47ac3837a496e16d87ace42"},"Luxury_Cake_Storage":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Luxury_Cake_Storage","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"files/assets/68785598/1/icon_luxuryCakeStorage.png?t=cefd7991f53aafe0517805939e450f13"},"Luxury_Energy_Storage":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Luxury_Energy_Storage","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"files/assets/69929534/1/icon_luxuryEnergyStorage.png?t=d74c8a67c9ed6fc5f675aa89d7ecf0fb"},"Luxury_Milk_Storage":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Luxury_Milk_Storage","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"files/assets/124205244/1/icon_luxuryMilkStorage.png?t=834997a0a551d476e9dd077a29e74804"},"Luxury_Mineral_Storage":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Luxury_Mineral_Storage","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"files/assets/124726934/1/icon_luxuryMineralStorage.png?t=78a8b9ee2baec3d65c821e7d268aaa19"},"Luxury_Oak_Shed":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Luxury_Oak_Shed","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"files/assets/115883995/1/icon_luxuryOakShed.png?t=511e861da0aa9b5e07929568f8f9a751"},"Luxury_Sugar_Storage":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Luxury_Sugar_Storage","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"files/assets/72040656/1/icon_luxurySugarStorage.png?t=979c6569c608b9a73313f6aca68ebf5e"},"Luxury_Uniform_Storage":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Luxury_Uniform_Storage","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"files/assets/69933161/1/icon_luxuryUniformStorage.png?t=3a5676603c675de7ebb7772a102b297a"},"Luxury_Wood_Shed":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Luxury_Wood_Shed","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"files/assets/124727186/1/icon_luxuryWoodShed.png?t=d807f3880328dbd6874517dc088e04cb"},"Marsh":{"BuildCost":0,"Class":"Terrain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Marsh","ProximityDist":1,"ProximityEmit":"Water","ProximityImmune":false,"FileUrl":null},"Master_Wizard":{"BuildCost":3000000,"Class":"Industrial","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Enchanted_Object,Magic_Powder,Magical_Ice_Block","EdgeRequirements":"Road","LaborCost":3000,"Name":"Master_Wizard","ProximityDist":2,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"files/assets/113178791/1/icon_masterWizard.png?t=06de5020e3b8126328ced35618990051"},"Meadow":{"BuildCost":500,"Class":"Terrain","CraftReqsMet":true,"CraftTimeMod":4.5,"Crafts":"Feed","EdgeRequirements":"None","LaborCost":0,"Name":"Meadow","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"files/assets/78734571/1/icon_meadow.png?t=5bc6fb011e39f2071de2a75999e15dbc"},"Milk_Barn":{"BuildCost":30000,"Class":"Ranch","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Milk","EdgeRequirements":"None","LaborCost":0,"Name":"Milk_Barn","ProximityDist":2,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"files/assets/27132514/1/icon_milkBarn.png?t=14d350f351860b9d25ae01b56ec4a272"},"Mine":{"BuildCost":30000,"Class":"Industrial","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Iron,Chromium,Limestone","EdgeRequirements":"Paved_Road:AND:Mountains","LaborCost":100,"Name":"Mine","ProximityDist":3,"ProximityEmit":"Dirty","ProximityImmune":false,"FileUrl":"files/assets/27132249/1/icon_mine.png?t=877d1d2736c6745814099ff0d815c44f"},"Mirandus_VOX_Home":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Mirandus_VOX_Home","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":true,"FileUrl":"files/assets/74665149/1/icon_mirandusVOXHome.png?t=37f065b6a83d9cf15f4ddfba116486d9"},"Mixing_Tent":{"BuildCost":550000,"Class":"Fishing","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Fish_Chum,White_Rice,Food_Mix,Cheese,Pasta_Sauce","EdgeRequirements":"Road","LaborCost":500,"Name":"Mixing_Tent","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"files/assets/126884024/1/icon_mixingTent.png?t=edbb3fca4a74340f76e700f435eff39e"},"Mr_Puddles_Home":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Mr_Puddles_Home","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":true,"FileUrl":"files/assets/51789047/1/icon_mrPuddlesHome.png?t=7a4ad2c4824f2a93ca4c90ee00f5cc33"},"Natural_Energy_Centre":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":true,"CraftTimeMod":3,"Crafts":"Energy","EdgeRequirements":"None","LaborCost":0,"Name":"Natural_Energy_Centre","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":true,"FileUrl":"files/assets/125297740/1/icon_naturalEnergyCentre.png?t=cf7510cd3c603df9289e68debd62d787"},"Natural_Energy_Plant":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":true,"CraftTimeMod":0.5,"Crafts":"Energy","EdgeRequirements":"None","LaborCost":100,"Name":"Natural_Energy_Plant","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":true,"FileUrl":"files/assets/125297275/1/icon_naturalEnergyPlant.png?t=52623771a9b218147ce9b850068a5885"},"Neighbor_Delivery":{"BuildCost":15000,"Class":"Trade","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Town","LaborCost":20,"Name":"Neighbor_Delivery","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"files/assets/30521497/1/icon_neighborDelivery.png?t=e0959289a774e8139db2d1c5517e7e3b"},"North_Pole_Creation_Lab":{"BuildCost":1000000,"Class":"Industrial","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Lights,Boom_Canes","EdgeRequirements":"Road","LaborCost":1125,"Name":"North_Pole_Creation_Lab","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"files/assets/113054229/1/icon_northPoleCreationLab.png?t=cc9acd10119da0d9a4708354df0165d7"},"Nuclear_Power":{"BuildCost":10000000,"Class":"Industrial","CraftReqsMet":true,"CraftTimeMod":1,"Crafts":"Energy","EdgeRequirements":"Paved_Road:AND:Water_Pump","LaborCost":3000,"Name":"Nuclear_Power","ProximityDist":4,"ProximityEmit":"Shady,Energy","ProximityImmune":true,"FileUrl":"files/assets/27132609/1/icon_nuclearPower.png?t=4f5c92c2b086114126fff3be7c7df020"},"OKEx_Barter_Station":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Wheat,Cotton,Wood","EdgeRequirements":"Road","LaborCost":10,"Name":"OKEx_Barter_Station","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":true,"FileUrl":"files/assets/56116770/1/icon_oKExBarterStation.png?t=49844a58224f4d245d28cd2b92ff1c42"},"Oak_Tree_Farm":{"BuildCost":1000,"Class":"Farm","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Oak_Wood","EdgeRequirements":"None","LaborCost":0,"Name":"Oak_Tree_Farm","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"files/assets/43726664/1/icon_oakTreeFarm.png?t=4d4f34c905abd963903a8161991d87b4"},"Oil_Pump":{"BuildCost":1250,"Class":"Industrial","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Crude_Oil","EdgeRequirements":"Road","LaborCost":0,"Name":"Oil_Pump","ProximityDist":3,"ProximityEmit":"Dirty","ProximityImmune":false,"FileUrl":"files/assets/27133060/1/icon_oilPump.png?t=79d1db91eef8ca4432387bfe3329754b"},"Oil_Seep":{"BuildCost":0,"Class":"Terrain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Oil_Seep","ProximityDist":4,"ProximityEmit":"Crude_Oil","ProximityImmune":false,"FileUrl":null},"Pantry":{"BuildCost":20000,"Class":"Farm","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Pantry","ProximityDist":2,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"files/assets/94519810/1/icon_pantry.png?t=417853a77f17b84b179139b06e8d08df"},"Pasture":{"BuildCost":500,"Class":"Terrain","CraftReqsMet":true,"CraftTimeMod":120,"Crafts":"Feed","EdgeRequirements":"None","LaborCost":0,"Name":"Pasture","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"files/assets/28840357/1/icon_pasture.png?t=5bc6fb011e39f2071de2a75999e15dbc"},"Paved_Road":{"BuildCost":30000,"Class":"Terrain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Paved_Road","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"files/assets/27133192/1/icon_pavedRoad.png?t=a34298517411b368875150df59c822f3"},"Peppermint_Field":{"BuildCost":2500,"Class":"Farm","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Peppermint","EdgeRequirements":"None","LaborCost":0,"Name":"Peppermint_Field","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"files/assets/60815349/1/icon_peppermintField.png?t=6db9942474215b7e6863ffb48d32e9a8"},"Pinot_Noir_Vines":{"BuildCost":5000,"Class":"Farm","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Pinot_Noir_Grapes","EdgeRequirements":"None","LaborCost":0,"Name":"Pinot_Noir_Vines","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"files/assets/43726662/1/icon_pinotNoirVines.png?t=ab3e2d2df9e3e54c1d6fc774e745b2e6"},"Platinum_Easy_Dough_Bakery":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Butter,Easy_Dough,Baguette,Jam","EdgeRequirements":"Road","LaborCost":600,"Name":"Platinum_Easy_Dough_Bakery","ProximityDist":0,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://lh3.googleusercontent.com/u/0/docs/ADP-6oGB9umNvWvb54czCAwF8mnBWTclgV0-Gmi0AiSHDRLRse7x6iVfukDws3P1S4R1uyW4zgCoL-_L0lUyVotBsFVNHmBjnQP-b24gsXaw8cvfEz5W584pa1Eut-5Fb2_IP1uFvcc7XPOEljkEjqVbJPBNXxJGqueN51hNH3nSKHfM2F6aBNdMDyijphPL_LhwSH8NZamhI0W_8VOfAKLmzRJmP4BeJPdVhtbDc0h17L6A07pv_gfLj20PX_Dlw03980RYokhe1qaT-4nWiXKa6xdKgG_9fo3A7BJzhxETNurNTYvpCq-sSH1GKYYOpHWegemgXBamFlImQ8ZYvwfJIqA0adP8ngOUTRWZ1wmUollK1bfKWIyFxXMTP80VO2qKKy-nEdU2LnoqUR1TS5iczH1xo7AxuVev3xnDldMGpTKvASxJWI2WiplPTCeXFq_UxZajkTXlAyfPpsMYhLfp-fyaBpo5Ygyaz22kErqaoqsElxx4JW15U3jg3VwnRg7Ata4qP1pFFZZHboTf7F3HEKfOl7lzAaf87ISsGBHSEH9yZaxdKkdegor4exazI1KLowrGmjy9t-egoF8l5CbiCZ5PALAae8juV_ChhB6I1Hxgiz2U2-ryqWc0W53BZb8d2EJ1PE58TpSTLnIJ7BANDuy6cqPFZTuYcdVO8avcE4buiP5q82QCHsM_r3XjCHVKeBuJZpDx7pCASZRbcueDV-GSKPnwhGFGN7A_3nfN5JLHq_8FtUS1ubHYnI5ZIUcoO_8ZUDLvKme9HV6hEKeAO7JPCbiHWjz1wHEAdYaPVYs1Sp7iJOA2i6d347aWDioSZ_ZWPZP9zKIeashRPZ23GC44jLOvZuKLd_M3Zqe6_Tk8PQ6--H1ZRL-pofmHD2m2XIUrLT1nIqRDU_JRvDNyAKwyVLeUBVgqEXjKei0pCFpZIj2SwiLChOGrA5rtE-a2oa_f3Vk4BFFusVwsWYGA1PoYW_bWRnKUkpDXosT8ZhPqv1f6rNdj"},"Platinum_Seaweed_Stand":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Platinum_Seaweed_Stand","ProximityDist":5,"ProximityEmit":"Seaweed","ProximityImmune":false,"FileUrl":"files/assets/128589389/1/icon_platinumSeaweedStand.png?t=0d96f2633b36d7e0f809fc6f5faa6b7b"},"Pond":{"BuildCost":10000,"Class":"Terrain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Pond","ProximityDist":2,"ProximityEmit":"Water","ProximityImmune":false,"FileUrl":"files/assets/27133272/1/icon_pond.png?t=6be8cd432516f492b3b378361ccb440a"},"Pottery_Shop":{"BuildCost":120000,"Class":"Industrial","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Ceramic_Bowl,Jack_O_Lantern,Supply_Box","EdgeRequirements":"Road","LaborCost":600,"Name":"Pottery_Shop","ProximityDist":2,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"files/assets/94519808/1/icon_potteryShop.png?t=289a30947d794a0b6ec0095bbc5bcfcd"},"Power_Plant":{"BuildCost":250000,"Class":"Industrial","CraftReqsMet":false,"CraftTimeMod":0.5,"Crafts":"Energy","EdgeRequirements":"Paved_Road:AND:Water_Pump","LaborCost":450,"Name":"Power_Plant","ProximityDist":3,"ProximityEmit":"Dirty,Shady,Energy","ProximityImmune":true,"FileUrl":"files/assets/27133335/1/icon_powerPlant.png?t=699f6c53cf2f0e67fc045ca538d1c790"},"Pumpkin_Patch":{"BuildCost":250,"Class":"Farm","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Pumpkin","EdgeRequirements":"None","LaborCost":0,"Name":"Pumpkin_Patch","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"files/assets/36897914/1/icon_pumpkinPatch.png?t=0ae37f73ec97a680160a30cc30608280"},"Quick_Builder_House":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"None","LaborCost":20,"Name":"Quick_Builder_House","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"files/assets/97703434/1/icon_quickBuilderHouse.png?t=6f093c3418fc8cf5c49dd7a5b38a665a"},"Ranch_House":{"BuildCost":1250,"Class":"Ranch","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":10,"Name":"Ranch_House","ProximityDist":2,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"files/assets/28840258/1/icon_ranchHouse.png?t=2260863d308bebb5bc8aa63f2bb93783"},"Rare_Bakery":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Butter,Dough,Baguette,Jam","EdgeRequirements":"Road","LaborCost":600,"Name":"Rare_Bakery","ProximityDist":2,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"files/assets/102037925/1/icon_rareBakery.png?t=6e59bff5d8afc3b71a4580e05d478066"},"Rare_Basketball_Court":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Rare_Basketball_Court","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"files/assets/63382832/1/icon_rareBasketballCourt.png?t=8372fc431e41b99836f441496bc02eca"},"Rare_Bitrue_Wheat":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Rare_Bitrue_Wheat","ProximityDist":3,"ProximityEmit":"Wheat","ProximityImmune":false,"FileUrl":"files/assets/37506890/1/icon_rareBitrueWheat.png?t=6b727216148372b639d1a6320fe6cf2d"},"Rare_Brine_Storage":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Rare_Brine_Storage","ProximityDist":2,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"files/assets/46947916/1/icon_rareBrineStorage.png?t=ea145d7b81b1c5766181d3efa7761ffb"},"Rare_Cakery":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Batter,Cake,Pumpkin_Pie","EdgeRequirements":"Road","LaborCost":1200,"Name":"Rare_Cakery","ProximityDist":2,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"files/assets/102037922/1/icon_rareCakery.png?t=4ee72522ad5b2c531119f0c49d4aaa0a"},"Rare_Egg_Storage":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Rare_Egg_Storage","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":true,"FileUrl":"files/assets/68784624/1/icon_rareEggStorage.png?t=df21b659a1b8a52f091a0819b0e0c5b9"},"Rare_Flour_Station":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":true,"CraftTimeMod":2,"Crafts":"Flour","EdgeRequirements":"Road","LaborCost":0,"Name":"Rare_Flour_Station","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":true,"FileUrl":"files/assets/80517438/1/icon_rareFlourStation.png?t=d0b1fa7d091044482407f75051f7b3ca"},"Rare_Grand_Aquifer":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Rare_Grand_Aquifer","ProximityDist":1,"ProximityEmit":"Water_Drum","ProximityImmune":false,"FileUrl":"files/assets/118911533/1/icon_rareGrandAquifer.png?t=30539f95baa3405c06d55b58a633feed"},"Rare_Grape_Storage":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Rare_Grape_Storage","ProximityDist":2,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"files/assets/46947930/1/icon_rareGrapeStorage.png?t=c32d9580b0fab11b2e1f42afe80f6dcd"},"Rare_Husk_Rice_Storage":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Rare_Husk_Rice_Storage","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://lh3.googleusercontent.com/u/0/docs/ADP-6oE9AefIc4O6rPdbxsw6jbKeY_hiJOorIsdOJRBWyBPqgoI3jJ2FgR7Zb-GNoP6f2pdy7JAh427U0uT64aXMq5BWOS-btgFz-vj3JoZOBYPODxn2EgsR_GpYrtZmLQ3g91Q5oL_K0gZtdBqjPL2r-kcfBS-3zKkMhTMhqRTKtck1PwAQKYZkYtkNxTHrS5BgTe9AzGx4OmQyQQitzpH762hLj1F7KVEbjdJjdKMDt60lwSvwghdSghmku_LSoFmHjp3R78kUXtiUx5rerA7_g8Cun4Ej16v0u3PKZGvm3i38ql3Zc-opYrKzGPMNjI8l9twYZ2hE-Ul7G0sDtHxAC83I86lxO3BFrunbdWMiFzb8fXXgYiZ5UonzNbLYzMSL0Ps8NobKonRoqT5oSRvZKiJm97I8p9iS6DJ3uovX64FeZA0TGW8nr3V3Z4gfTrnLWoTHQ3bImJa8tpZ0rqLT5JlU1FBqCRmwFESvEN_XpyFVg1UANnXMs13MiI-SndNfYQV1Sqthj4mK-VjQkuuPxQCtzd6Mb7UjJBo6583AkfhOOozvNrX9yv903gmGfN3oyikeIoPecXPB32ktwfZvp6lC8IPZ398bJ2iWRkyRlxIFaQsiD1cfOglCBXq4ZtupPcvHwHVB6uzPdGZJ5JNHJnjGpqGM8P3GeF2qpCglBxYYqAYR2GtS63t8zHnvf3dei7bRrpg8bVlMF2bYAbY-sZF3ATqYs9VpE7IJuaBIauu3G_Mgw86EZB7vIHcrEt8MuT0shXKurwVVeUGBEuR6EZfsKTNqWgTs5pJttZlcMc3SxFxSf3uzV3O6UsPa4QXPbE6nkZ_H2T1T4-RDOLhMf5wic1OEIP33QLiZ_89ovSyPcGL1N87nz0TqpV6JFMAZVgjKxLEOEPGlNVH6jMEHVHLP0YnHo3nD-NeztonY5UWYHSL-542yvB6W8HrgblykmYfpiTbljin6r5vMA19_WQ5wPaAz_wdQT4LT01ojx0PTvtoe0P_E"},"Rare_Lolli_and_Pop_Shop":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0.33,"Crafts":"Candy_Canes,Chocolate_Covered_Strawberries","EdgeRequirements":"Road","LaborCost":50,"Name":"Rare_Lolli_and_Pop_Shop","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"files/assets/63513373/1/icon_rareLolliandPopShop.png?t=6b13d00f3a5c3a61c06edaf95b7df683"},"Rare_Milk_Storage":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Rare_Milk_Storage","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"files/assets/124205243/1/icon_rareMilkStorage.png?t=d3513b11202d6526347e8e74c73a3d66"},"Rare_Mixing_Tent":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Fish_Chum,White_Rice,Food_Mix,Cheese,Pasta_Sauce","EdgeRequirements":"Road","LaborCost":300,"Name":"Rare_Mixing_Tent","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://lh3.googleusercontent.com/u/0/docs/ADP-6oEVL_INGAKnDX4PE3-nqDl-M5OgeI92LimmVSKcuzfIDlY024qmi9k-TEtnVZc6UEdIH8skiOnZsjoUsdud4KqGxN_VqvxWye-A9-Rar7vjtFK1hpCWAw0rU4z-zApL2BZqK__rCd5nQ6JAi8FiV2sIkWHSnQ2QPcnHbH2XYAWN7PJZhJRVZMykDnSr03jD5imxtGOtHIcZTXFWQzgIkyeq8MfBf24RNIFPooYWB1d42qrrXv778or4meMrnA4h4d0WhRX7hNlsmtDQsh7FONH2s8XqGrY0ZiIyjSussoQadQrU16l9uJ_0L861aTbATDvjg9SIp8OrhVEtXm2fUK9uQoNigfM9tF93rtc3nj7HCJWyv9sLqghcya-EAWq06qAQB1BfdYFQmY9OHyqwjhxwCUHEAWT7MTzv3YHSomUHoADQmEIlbXoslCrjFjXXRWCBeRp_2-jeyMyzrN8rmPB_B4crPK0DgsKKtoWKvXYT4e1Y3B91qVqRWVtGm6XFdMi7L9YEGSe_vX1qGwyPNfjLwblSK59_URUUY9IQfeelsBvo3Y0fVoyjIVd5GIlbeybsBsXGtbjaTuPIJ3cwllrH18gx5_PUlcOsnyMudRdKnpT7s0fm_X0LKDECTLcCYhckAA8bM9zoOaL6fEQngnNwX1XtipOc9_Tz2G1ZrttbrBVW6A4Ry93fLEbvP4Xi5ZpxMFNgi7cU7iI_OTVF6FhMwpBXPR89vJd6aE_mnwh3vTFGOCUXeEx49kAU3XGpvYEPvQVDr2h_HCODCqgeX9l3wGwk4wdKVOzXDg974rD_XHvYqLZvJpsr6fA8kXxz7WiMQMQE5SKMrbUwyp4nXyKu1MGFusthEgkUqSX-OLrpuH1xZ7Ejiq94Ufk3KBCTusCITSRpzQTeEHT1yCzWoRkvHRIG_Seu01MbXv7YXyf3Y8xWpjvdEwEkcNIu0SQwxsAr-1LfFjHAR4bBPZzy_LuFTsNqCq4CcYDAKK_WAxeX0YXqJrA9"},"Rare_North_Pole_Creation_Lab":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Lights,Boom_Canes","EdgeRequirements":"Road","LaborCost":600,"Name":"Rare_North_Pole_Creation_Lab","ProximityDist":1,"ProximityEmit":"Shady,Cold","ProximityImmune":false,"FileUrl":"files/assets/113188822/1/icon_rareNorthPoleCreationLab.png?t=cc9acd10119da0d9a4708354df0165d7"},"Rare_Pottery_Shop":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Ceramic_Bowl,Jack_O_Lantern,Supply_Box","EdgeRequirements":"Road","LaborCost":450,"Name":"Rare_Pottery_Shop","ProximityDist":2,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"files/assets/125008320/1/icon_rarePotteryShop.png?t=3117ba1b11dd04324a235173ca729dde"},"Rare_Simplex_Sugarcane":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Rare_Simplex_Sugarcane","ProximityDist":3,"ProximityEmit":"Sugarcane","ProximityImmune":false,"FileUrl":"files/assets/37733322/1/icon_rareSimplexSugarcane.png?t=e51c17a244f0ffe6f29089a63a5a4fd7"},"Rare_Solar_Panel":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Rare_Solar_Panel","ProximityDist":2,"ProximityEmit":"Energy","ProximityImmune":true,"FileUrl":"files/assets/55544744/1/icon_rareSolarPanel.png?t=56ca538d408dbab21b94bafcba24c356"},"Rare_Strawberry_Storage":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Rare_Strawberry_Storage","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"files/assets/122186768/1/icon_rareStrawberryStorage.png?t=48c368d4056b0f5d24f0cce40da03f86"},"Rare_Sugarcane_Storage":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Rare_Sugarcane_Storage","ProximityDist":2,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"files/assets/46947918/1/icon_rareSugarcaneStorage.png?t=bb0fe4855f86aa90e9259d652358e398"},"Rare_Tesla_Coil":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":true,"CraftTimeMod":1.67,"Crafts":"Energy","EdgeRequirements":"Road","LaborCost":0,"Name":"Rare_Tesla_Coil","ProximityDist":2,"ProximityEmit":"Energy","ProximityImmune":true,"FileUrl":"files/assets/55542383/1/icon_rareTeslaCoil.png?t=b18637fd19a6fe4812b5f9024e27e51c"},"Rare_Turbo_Pump":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0.5,"Crafts":"Crude_Oil","EdgeRequirements":"Road","LaborCost":0,"Name":"Epic_Turbo_Pump","ProximityDist":2,"ProximityEmit":"Dirty","ProximityImmune":false,"FileUrl":"https://lh3.googleusercontent.com/docs/ADP-6oFedAyiKpGeSLvM8FYqJUlZNUo8WYt-wCh6BB8tHWw-YJlHZCgkUyICSQpoMJrRrgqnYjPCHZzBXWMkGBKTXL03ZCJiYgq-tB7BDgFsmEpEENIlAPDrl0xZdggMd5LgGVd0gteZ2Ksli-ukAvjXwmafL0KLU4jnCUxzW-V9OP0m_VgZUsjABH6WOhB2brCqRW4"},"Rare_Water_Barrel_Storage":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Rare_Water_Barrel_Storage","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"files/assets/119037333/1/icon_rareWaterBarrelStorage.png?t=937f36bfcd63ccfa2a8791a67770e335"},"Rare_Water_Pump":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Pond:OR:Waterway:OR:Bridge","LaborCost":0,"Name":"Rare_Water_Pump","ProximityDist":1,"ProximityEmit":"Water_Drum","ProximityImmune":false,"FileUrl":"files/assets/104406314/1/icon_rareWaterPump.png?t=1a0b65fbd9acc5d085e2903debbf8607"},"Rare_Water_Tower":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Rare_Water_Tower","ProximityDist":4,"ProximityEmit":"Water","ProximityImmune":true,"FileUrl":"files/assets/47142641/1/icon_rareWaterTower.png?t=c4c7fc5724319ef9f811352f707fb490"},"Rare_Wheat_Stand":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Rare_Wheat_Stand","ProximityDist":3,"ProximityEmit":"Wheat","ProximityImmune":false,"FileUrl":"files/assets/46947926/1/icon_rareWheatStand.png?t=877820446b75e1a4ec3675c8194c244e"},"Rare_Wheat_Storage":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Rare_Wheat_Storage","ProximityDist":2,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"files/assets/46947922/1/icon_rareWheatStorage.png?t=6673d12d9693a8c8f27f286b838bd312"},"Rare_Winery":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Pinot_Noir,Cabernet_Sauvignon,Chardonnay,Sangria","EdgeRequirements":"Road","LaborCost":1600,"Name":"Rare_Winery","ProximityDist":2,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"files/assets/110125241/1/icon_rareWinery.png?t=74cc99b9d18796ec0083718a925b34e2"},"Rare_Wizards_Workshop":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Mystic_Matter,Glue","EdgeRequirements":"Road","LaborCost":1000,"Name":"Rare_Wizards_Workshop","ProximityDist":2,"ProximityEmit":"Shady,Cold","ProximityImmune":false,"FileUrl":"files/assets/113188825/1/icon_rareWizardsWorkshop.png?t=99ae835f865fa6577ad78fcb61c750d9"},"Refinery":{"BuildCost":15000,"Class":"Industrial","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Petroleum,Gasoline,Jet_Fuel","EdgeRequirements":"Road","LaborCost":200,"Name":"Refinery","ProximityDist":4,"ProximityEmit":"Dirty,Shady","ProximityImmune":true,"FileUrl":"files/assets/27133374/1/icon_refinery.png?t=7be8f7e57ee27ed2fa5f1438317938c0"},"Research_Centre":{"BuildCost":500000,"Class":"Industrial","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Tractor_Speed,Fisherman_Speed,Everyone_Else_Speed,Global_Speed","EdgeRequirements":"None","LaborCost":0,"Name":"Research_Centre","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"files/assets/119477480/1/icon_researchCentre.png?t=f30955f79079c9a6b29a3f8771517dce"},"Rice_Field":{"BuildCost":1500,"Class":"Fishing","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Husk_Rice","EdgeRequirements":"None","LaborCost":0,"Name":"Rice_Field","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"files/assets/106562688/1/icon_riceField.png?t=6aca4ca1010010a16abbf1618b4ce68c"},"Rock":{"BuildCost":0,"Class":"Terrain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Rock","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":null},"Salt_Field":{"BuildCost":1250,"Class":"Farm","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Brine","EdgeRequirements":"None","LaborCost":0,"Name":"Salt_Field","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"files/assets/27133806/1/icon_saltField.png?t=3028c95e3a548c70ca32c1f7f4674ace"},"Salt_Storehouse":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Salt_Storehouse","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"files/assets/72009450/1/icon_saltStorehouse.png?t=824585081b8273e9e1d86121e4f2d71f"},"SaltyBot_Home":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"SaltyBot_Home","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"files/assets/40948905/1/icon_saltyBotHome.png?t=1a91944861e0cd87ac3963b6a7810ed7"},"SaltyBot_Shack":{"BuildCost":0,"Class":"Terrain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"SaltyBot_Shack","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"files/assets/44406711/1/icon_saltyBotShack.png?t=1a91944861e0cd87ac3963b6a7810ed7"},"Sand_Mine":{"BuildCost":45000,"Class":"Industrial","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Silica","EdgeRequirements":"Road","LaborCost":0,"Name":"Sand_Mine","ProximityDist":1,"ProximityEmit":"Shady,Dirty","ProximityImmune":false,"FileUrl":"files/assets/43726661/1/icon_sandMine.png?t=88ebedde9cd3b1ed6eb6cd78321a1cd1"},"Santa's_Factory":{"BuildCost":5000000,"Class":"Industrial","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Bicycle,Rocking_Horse","EdgeRequirements":"Road","LaborCost":3750,"Name":"Santa's_Factory","ProximityDist":2,"ProximityEmit":"Shady,Cold","ProximityImmune":false,"FileUrl":"files/assets/113057024/1/icon_santa'sFactory.png?t=f26f1fb23720a9038ec2f68feee61463"},"Sauce_Facility":{"BuildCost":450000,"Class":"Fishing","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Rice_Vinegar,Tomato_Paste","EdgeRequirements":"Road","LaborCost":700,"Name":"Sauce_Facility","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"files/assets/129624245/1/icon_sauceFacility.png?t=86990c138c8551e6c46fbaeb0b5c2896"},"Scrub":{"BuildCost":0,"Class":"Terrain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Scrub","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":null},"Seafood_Warehouse":{"BuildCost":50000,"Class":"Fishing","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Seafood_Warehouse","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"files/assets/106971310/1/icon_seafoodWarehouse.png?t=3fc85e6d869430becc2992a64c91c643"},"Seaweed_Farm":{"BuildCost":3200,"Class":"Fishing","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Seaweed","EdgeRequirements":"None","LaborCost":0,"Name":"Seaweed_Farm","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"files/assets/106563243/1/icon_seaweedFarm.png?t=13ae4f3517423c44e5dd0f33fc9fbe2c"},"Seaweed_Farmer_House":{"BuildCost":100000,"Class":"Fishing","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":250,"Name":"Seaweed_Farmer_House","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"files/assets/106563244/1/icon_seaweedFarmerHouse.png?t=cf508913562f36baa82ab2afae7bf21a"},"Shallow_Mine":{"BuildCost":30000,"Class":"Industrial","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Shallow_Iron,Shallow_Chromium,Shallow_Limestone","EdgeRequirements":"Paved_Road:AND:OpenWorld","LaborCost":100,"Name":"Shallow_Mine","ProximityDist":3,"ProximityEmit":"Dirty","ProximityImmune":false,"FileUrl":"files/assets/102267173/1/icon_shallowMine.png?t=177aae8cf3b5b8039aec5ef696bb146a"},"Sheep_Pen":{"BuildCost":10000,"Class":"Ranch","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Wool","EdgeRequirements":"None","LaborCost":0,"Name":"Sheep_Pen","ProximityDist":2,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"files/assets/27134180/1/icon_sheepPen.png?t=8d73b92f3f0cf3d472500e3228d33c4c"},"Shrimp_Farm":{"BuildCost":45000,"Class":"Fishing","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Shrimp","EdgeRequirements":"None","LaborCost":0,"Name":"Shrimp_Farm","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"files/assets/126986736/1/icon_shrimpFarm.png?t=4c04c049e76047adf33b9c36c4a8fefa"},"Silo":{"BuildCost":10000,"Class":"Farm","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Silo","ProximityDist":3,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"files/assets/27134253/1/icon_silo.png?t=e9fed144537b59d70c4e66f46ad7b497"},"Simplex_Sugarcane":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Simplex_Sugarcane","ProximityDist":2,"ProximityEmit":"Sugarcane","ProximityImmune":false,"FileUrl":"files/assets/35830018/1/icon_simplexSugarcane.png?t=18de83b2da48526b589ed8fe9426ae0b"},"Solar_Panel":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Solar_Panel","ProximityDist":1,"ProximityEmit":"Energy","ProximityImmune":true,"FileUrl":"files/assets/55544738/1/icon_solarPanel.png?t=0be611d3f914f1e9de3966d2dc3405d8"},"Sphere_Of_Hope":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Sphere_Of_Hope","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"files/assets/115185876/1/icon_sphereOfHope.png?t=2e891fa878af2053bbf7454c241f2824"},"Spooky_Windmill":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Flour,Sugar,Salt","EdgeRequirements":"Road","LaborCost":40,"Name":"Spooky_Windmill","ProximityDist":3,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"files/assets/106286965/1/icon_spookyWindmill.png?t=8645f115079accfd4d68678e4950e137"},"Steel_Mill":{"BuildCost":1500000,"Class":"Industrial","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Steel,Blue_Steel,Red_Steel","EdgeRequirements":"Paved_Road:AND:Water_Pump","LaborCost":750,"Name":"Steel_Mill","ProximityDist":4,"ProximityEmit":"Dirty,Shady","ProximityImmune":true,"FileUrl":"files/assets/27134507/1/icon_steelMill.png?t=76a607082ce2caddcd499a878a1360a7"},"Storehouse":{"BuildCost":15000,"Class":"Farm","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Storehouse","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"files/assets/27134598/1/icon_storehouse.png?t=92c3688fce06fbe89708dacf61b8d7ff"},"Strawberry_Field":{"BuildCost":1000,"Class":"Farm","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Strawberries","EdgeRequirements":"None","LaborCost":0,"Name":"Strawberry_Field","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"files/assets/80660271/1/icon_strawberryField.png?t=df31aada7d08e0c9331e9cf56c7634ea"},"Sugar_Cane_Field":{"BuildCost":250,"Class":"Farm","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Sugarcane","EdgeRequirements":"None","LaborCost":0,"Name":"Sugar_Cane_Field","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"files/assets/27134612/1/icon_sugarCaneField.png?t=6e94ce4c99f53f284879ef78d17f7ff2"},"Sugar_Storehouse":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Sugar_Storehouse","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"files/assets/91706053/1/icon_sugarStorehouse.png?t=062cadde6e0ef7fdf5dbdb1b7d99cce5"},"Sugar_Storehouse_CoinPH":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Sugar_Storehouse_CoinPH","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"files/assets/96233965/1/icon_sugarStorehouseCoinPH.png?t=ee11739288bce60ca0327a94f0f2514e"},"Sugarcane_Storage":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Sugarcane_Storage","ProximityDist":2,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"files/assets/46947917/1/icon_sugarcaneStorage.png?t=a428850dcb9c886c5b123dee3d4656b3"},"Sushi_Restaurant":{"BuildCost":850000,"Class":"Fishing","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Salmon_Nigiri,Eel_Nigiri,Sushi_Boat","EdgeRequirements":"Paved_Road","LaborCost":1200,"Name":"Sushi_Restaurant","ProximityDist":2,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"files/assets/126574704/1/icon_sushiRestaurant.png?t=36cc8b189ef86142134093876fb0dbb8"},"Tesla_Coil":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":true,"CraftTimeMod":2.33,"Crafts":"Energy","EdgeRequirements":"Road","LaborCost":0,"Name":"Tesla_Coil","ProximityDist":1,"ProximityEmit":"Energy","ProximityImmune":true,"FileUrl":"files/assets/55542381/1/icon_teslaCoil.png?t=65fcaf51f6e03e62c63ca32cb8b3e11a"},"The_Golden_Egg":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"The_Golden_Egg","ProximityDist":4,"ProximityEmit":"Eggs","ProximityImmune":false,"FileUrl":"files/assets/66907198/1/icon_theGoldenEgg.png?t=3149b6865104b504f3a0952044e08a84"},"The_Lab":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"The_Lab","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"files/assets/64089925/1/icon_theLab.png?t=7093ed61d6557824187ac04df40e4c2d"},"The_Logger_House":{"BuildCost":75000,"Class":"Farm","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":150,"Name":"The_Logger_House","ProximityDist":2,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"files/assets/32374941/1/icon_theLoggerHouse.png?t=fea3dbd014a8421bf23b113b68b334cf"},"The_Noir_Hero":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"The_Noir_Hero","ProximityDist":3,"ProximityEmit":"Water","ProximityImmune":false,"FileUrl":"files/assets/64670404/1/icon_theNoirHero.png?t=2edae51dabad0cac84aa986dba76cdb0"},"Tomato_Farm":{"BuildCost":5000,"Class":"Farm","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Tomato","EdgeRequirements":"None","LaborCost":0,"Name":"Tomato_Field","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"https://lh3.googleusercontent.com/docs/ADP-6oEpEi3t3E-bt1ABGiJQc0tV8TZmP3q58wzGPdKCRDpU_sFnIbfbM4j3Ll54iFJBJk5cvm6j0AWyhFMWxMOLIh9mwLFTNXSfaSdF30wXwmEtsYqo1qxlRG98UusewxCkCPA0CbRlvW8WZMdhWM241mWeLQzKCH8UEiJzNS_sflI16Wu8tmdDSnASZR_OP0kg"},"Trade_Depot":{"BuildCost":5000,"Class":"Trade","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"OpenWorld:OR:Bridge","LaborCost":20,"Name":"Trade_Depot","ProximityDist":2,"ProximityEmit":"Dirty","ProximityImmune":false,"FileUrl":"files/assets/27134633/1/icon_tradeDepot.png?t=ce1eca848365502f06a108906ce10f88"},"Trade_Pier":{"BuildCost":7500,"Class":"Trade","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Waterway:OR:Bridge","LaborCost":30,"Name":"Trade_Pier","ProximityDist":2,"ProximityEmit":"Dirty","ProximityImmune":false,"FileUrl":"files/assets/27134701/1/icon_tradePier.png?t=24ff92f5a659bdc3a4d3c99c89f87688"},"Tree":{"BuildCost":0,"Class":"Terrain","CraftReqsMet":true,"CraftTimeMod":1.5,"Crafts":"Wood","EdgeRequirements":"None","LaborCost":0,"Name":"Tree","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":null},"Tree_Farm":{"BuildCost":500,"Class":"Farm","CraftReqsMet":false,"CraftTimeMod":0.5,"Crafts":"Wood","EdgeRequirements":"None","LaborCost":0,"Name":"Tree_Farm","ProximityDist":0,"ProximityEmit":"Wood","ProximityImmune":false,"FileUrl":"files/assets/27134707/1/icon_treeFarm.png?t=3fdd808c819e6d123e0d47c6cf3cff82"},"Trophy_of_Epicness":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Trophy_of_Epicness","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":true,"FileUrl":"files/assets/64662461/1/icon_trophyofEpicness.png?t=d2a07dfc71dff30abafe360b5a26da08"},"Trough":{"BuildCost":5000,"Class":"Ranch","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Trough","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":true,"FileUrl":"files/assets/27134720/1/icon_trough.png?t=c43a42dc2d8f1f6c71e38d8e510e82b3"},"Unanimous":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Unanimous","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"files/assets/64089922/1/icon_unanimous.png?t=7093ed61d6557824187ac04df40e4c2d"},"Uncommon_Basketball_Court":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Uncommon_Basketball_Court","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"files/assets/63382833/1/icon_uncommonBasketballCourt.png?t=e1d0a5bf6b7b653c1a9251f6a94f0c79"},"Uncommon_Candy_Cane_Storage":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Uncommon_Candy_Cane_Storage","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"files/assets/115867989/1/icon_uncommonCandyCaneStorage.png?t=11daeaf093ed7c08cbae79670de2876d"},"Uncommon_Cotton_Storage":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Uncommon_Cotton_Storage","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"files/assets/66828590/1/icon_uncommonCottonStorage.png?t=9cdf3f89f182fc3b2da2aefa3e43aa08"},"Uncommon_Milk_Storage":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Uncommon_Milk_Storage","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"files/assets/124205242/1/icon_uncommonMilkStorage.png?t=3d25d645dbc729f62365a311ab6fb197"},"Uncommon_Paved_Road":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Uncommon_Paved_Road","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"files/assets/101218467/1/icon_uncommonPavedRoad.png?t=5fc47b75ea86382b0a86d1c6e4e1597c"},"Uncommon_Peppermint_Storage":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Uncommon_Peppermint_Storage","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"files/assets/114165306/1/icon_uncommonPeppermintStorage.png?t=b169dea507d5f5c37b3b55fcbc787f93"},"Uncommon_Pumpkin_Storage":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Uncommon_Pumpkin_Storage","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"files/assets/102114682/1/icon_uncommonPumpkinStorage.png?t=c757f1b13f5cc6df45cdd4a5ea7abff9"},"Uncommon_Strawberry_Storage":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Uncommon_Strawberry_Storage","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"files/assets/122186766/1/icon_uncommonStrawberryStorage.png?t=521ba46f279dc85f877907021591a9f1"},"Uncommon_Water_Barrel_Storage":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Uncommon_Water_Barrel_Storage","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"files/assets/119037331/1/icon_uncommonWaterBarrelStorage.png?t=d13b40956a1afe5604050e75db0e82c4"},"VOX_Home":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"VOX_Home","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":true,"FileUrl":"files/assets/55919750/1/icon_vOXHome.png?t=41290c22e7695953601d3d57b2acb951"},"Valentines_Stand":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Valentines_Stand","ProximityDist":5,"ProximityEmit":"Strawberries","ProximityImmune":false,"FileUrl":"files/assets/120732264/1/icon_valentinesStand.png?t=edcca1c1b2464434b762ba384a78a066"},"Warehouse":{"BuildCost":15000,"Class":"Industrial","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Warehouse","ProximityDist":2,"ProximityEmit":"Shady","ProximityImmune":true,"FileUrl":"files/assets/27134751/1/icon_warehouse.png?t=dc41069df4a96b66e45c67405cf907b2"},"Warp":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Warp","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"files/assets/64089924/1/icon_warp.png?t=7093ed61d6557824187ac04df40e4c2d"},"Wasabi_Farm":{"BuildCost":250,"Class":"Farm","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Wasabi","EdgeRequirements":"None","LaborCost":0,"Name":"Wasabi_Farm","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"files/assets/129153470/1/icon_wasabiFarm.png?t=eb5bc0e26af19b4da03f79d2fc6c0707"},"Water_Facility":{"BuildCost":10000,"Class":"Industrial","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Water_Drum,Industrial_Ice_Block","EdgeRequirements":"Road","LaborCost":50,"Name":"Water_Facility","ProximityDist":2,"ProximityEmit":"None","ProximityImmune":true,"FileUrl":"files/assets/32462106/1/icon_waterFacility.png?t=547bfce1f08def76cd176010cb6d9f3f"},"Water_Pump":{"BuildCost":30000,"Class":"Industrial","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Pond:OR:Waterway:OR:Bridge","LaborCost":0,"Name":"Water_Pump","ProximityDist":1,"ProximityEmit":"Water_Drum","ProximityImmune":false,"FileUrl":"files/assets/27134796/1/icon_waterPump.png?t=9445880cc2a873b5296880553357c543"},"Water_Tank":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Water_Tank","ProximityDist":1,"ProximityEmit":"Water","ProximityImmune":true,"FileUrl":"files/assets/66828519/1/icon_waterTank.png?t=65c6bad8734782f1e70e471867174742"},"Water_Tower":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Water_Tower","ProximityDist":3,"ProximityEmit":"Water","ProximityImmune":true,"FileUrl":"files/assets/47142643/1/icon_waterTower.png?t=de595774ac42cb7088c4ff29d10bd96b"},"Well":{"BuildCost":1250,"Class":"Farm","CraftReqsMet":true,"CraftTimeMod":1,"Crafts":"Water","EdgeRequirements":"None","LaborCost":0,"Name":"Well","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"files/assets/27134863/1/icon_well.png?t=3f90f1f8984d715c772680fe60d994a9"},"Wheat_Field":{"BuildCost":250,"Class":"Farm","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Wheat","EdgeRequirements":"None","LaborCost":0,"Name":"Wheat_Field","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"files/assets/27134876/1/icon_wheatField.png?t=193296b25e16d8cdc9c9cb832a8ad20e"},"Wheat_Stand":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Wheat_Stand","ProximityDist":2,"ProximityEmit":"Wheat","ProximityImmune":false,"FileUrl":"files/assets/46947925/1/icon_wheatStand.png?t=4b069faea2fd5044fdf269527f97c3e3"},"Wheat_Storage":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Wheat_Storage","ProximityDist":2,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"files/assets/46947921/1/icon_wheatStorage.png?t=1cd5c7efd2c8319fdeefe4a9f057baa1"},"Wild_Clover":{"BuildCost":3500,"Class":"Terrain","CraftReqsMet":true,"CraftTimeMod":1,"Crafts":"Nectar","EdgeRequirements":"None","LaborCost":0,"Name":"Wild_Clover","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"files/assets/94519807/1/icon_wildClover.png?t=e4c3314f6b6a60ab3178349784d087bc"},"Wild_Net_Fishing":{"BuildCost":150000,"Class":"Fishing","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Wild_Salmon","EdgeRequirements":"Waterway:OR:Bridge","LaborCost":0,"Name":"Wild_Net_Fishing","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"files/assets/106562683/1/icon_wildNetFishing.png?t=f533b947748513bad3caf2664b11fd4e"},"Wind_Pump":{"BuildCost":12500,"Class":"Farm","CraftReqsMet":false,"CraftTimeMod":0.5,"Crafts":"Water","EdgeRequirements":"None","LaborCost":0,"Name":"Wind_Pump","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"files/assets/27134913/1/icon_windPump.png?t=2fa79ef83461579b902d44f257bf037b"},"Wind_Turbine":{"BuildCost":2500,"Class":"Industrial","CraftReqsMet":true,"CraftTimeMod":3,"Crafts":"Energy","EdgeRequirements":"Road","LaborCost":0,"Name":"Wind_Turbine","ProximityDist":2,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"files/assets/27134918/1/icon_windTurbine.png?t=3f6f004f0e6f856aaaee000638db891e"},"Windmill":{"BuildCost":2500,"Class":"Farm","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Flour,Sugar,Salt","EdgeRequirements":"Road","LaborCost":50,"Name":"Windmill","ProximityDist":3,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"files/assets/27134921/1/icon_windmill.png?t=5a090e8875d63aa66220a0bbc1b8ebbe"},"Winery":{"BuildCost":1000000,"Class":"Farm","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Pinot_Noir,Cabernet_Sauvignon,Chardonnay,Sangria","EdgeRequirements":"Road","LaborCost":2000,"Name":"Winery","ProximityDist":2,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"files/assets/43726667/1/icon_winery.png?t=d3174cc9b593d32f08f86e58b7edb37d"},"Wizards_Workshop":{"BuildCost":1500000,"Class":"Industrial","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Mystic_Matter,Glue","EdgeRequirements":"Road","LaborCost":1875,"Name":"Wizards_Workshop","ProximityDist":1,"ProximityEmit":"Shady,Cold","ProximityImmune":false,"FileUrl":"files/assets/113320394/1/icon_wizardsWorkshop.png?t=99ae835f865fa6577ad78fcb61c750d9"},"Wood_Shed":{"BuildCost":5000,"Class":"Farm","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Wood_Shed","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"files/assets/29319325/1/icon_woodShed.png?t=11be99eaabceacd82a3359c6fe835e83"},"Wool_Storage":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Wool_Storage","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"files/assets/68784437/1/icon_woolStorage.png?t=0238b93f1dfa006b44994fccd0838751"},"Worker_House":{"BuildCost":2500,"Class":"Industrial","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":60,"Name":"Worker_House","ProximityDist":2,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"files/assets/27134943/1/icon_workerHouse.png?t=f3cafddce3c241fe75efe4f414c67f11"},"Worm_Farm":{"BuildCost":35000,"Class":"Fishing","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Worms","EdgeRequirements":"None","LaborCost":0,"Name":"Worm_Farm","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"files/assets/128773766/1/icon_wormFarm.png?t=12d4356f72b6bf4c83f061f46153e7c5"}};
    const newRecipes = {"350k_Stars":{"CityPoints":0,"CityPrice":0,"Class":"Produced","ProximityBonus":"None","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Cash","Req2":"none","Req3":"none","Time0":300,"Time1":600,"Time2":1200,"Time3":2400,"Value1":2500000,"Value2":0,"Value3":0,"FileUrl":"files/assets/123368345/1/icon_350kStars.png?t=2b3c023ac3f194ab8e875a3fd955a773"},"Baguette":{"CityPoints":900,"CityPrice":110000,"Class":"Crafted","ProximityBonus":"None","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Dough","Req2":"Butter","Req3":"Flour","Time0":60,"Time1":120,"Time2":240,"Time3":480,"Value1":1,"Value2":1,"Value3":1,"FileUrl":"files/assets/24496986/1/icon_baguette.png?t=37cd3e325e708883a4acc6b75c1d0625"},"Batter":{"CityPoints":450,"CityPrice":60700,"Class":"Crafted","ProximityBonus":"Eggs","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Flour","Req2":"Eggs","Req3":"Butter","Time0":30,"Time1":60,"Time2":120,"Time3":240,"Value1":5,"Value2":3,"Value3":2,"FileUrl":"files/assets/24496985/1/icon_batter.png?t=714a371fa955fef84f9d372fb5f09e25"},"Bicycle":{"CityPoints":16600,"CityPrice":120000,"Class":"Produced","ProximityBonus":"None","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Blue_Steel","Req2":"Mystic_Matter","Req3":"Lights","Time0":120,"Time1":240,"Time2":480,"Time3":960,"Value1":1,"Value2":1,"Value3":2,"FileUrl":"files/assets/113156610/1/icon_bicycle.png?t=724028a107c9d6d20f49eebd7d966181"},"Blue_Steel":{"CityPoints":6800,"CityPrice":270950,"Class":"Produced","ProximityBonus":"Energy","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Steel","Req2":"Uniforms","Req3":"Energy","Time0":90,"Time1":180,"Time2":360,"Time3":720,"Value1":5,"Value2":1,"Value3":10,"FileUrl":"files/assets/24496984/1/icon_blueSteel.png?t=0d58012fad449746318c356986708750"},"Boom_Canes":{"CityPoints":650,"CityPrice":12600,"Class":"Produced","ProximityBonus":"None","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Magic_Powder","Req2":"Mystic_Matter","Req3":"Candy_Canes","Time0":30,"Time1":60,"Time2":120,"Time3":240,"Value1":2,"Value2":1,"Value3":2,"FileUrl":"files/assets/113652698/1/icon_boomCanes.png?t=a445be6b8111cd791da685a028ba0142"},"Bread":{"CityPoints":153,"CityPrice":15550,"Class":"Crafted","ProximityBonus":"None","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Flour","Req2":"Milk","Req3":"Salt","Time0":30,"Time1":60,"Time2":120,"Time3":240,"Value1":4,"Value2":1,"Value3":1,"FileUrl":"files/assets/24496982/1/icon_bread.png?t=eae581e650676b6f48df84ea3de055ef"},"Brine":{"CityPoints":1,"CityPrice":300,"Class":"Crop","ProximityBonus":"Water","ProximityPenalty":"Salty,PositiveOnlySalty","ProximityReverse":true,"Req1":"Water","Req2":"none","Req3":"none","Time0":180,"Time1":180,"Time2":75,"Time3":30,"Value1":3,"Value2":0,"Value3":0,"FileUrl":"files/assets/24496979/1/icon_brine.png?t=b3c42c4a37547d53e25b0bd4a4706e36"},"Butter":{"CityPoints":153,"CityPrice":20000,"Class":"Crafted","ProximityBonus":"None","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Milk","Req2":"Salt","Req3":"Sugar","Time0":30,"Time1":60,"Time2":120,"Time3":240,"Value1":2,"Value2":2,"Value3":1,"FileUrl":"files/assets/24496980/1/icon_butter.png?t=85cb1cdd97b555153961015587cb11ae"},"Cabernet_Grapes":{"CityPoints":6,"CityPrice":1820,"Class":"Crop","ProximityBonus":"Water","ProximityPenalty":"Dirty,Salty,Shady","ProximityReverse":false,"Req1":"Water","Req2":"Wood","Req3":"none","Time0":420,"Time1":840,"Time2":1680,"Time3":3360,"Value1":2,"Value2":1,"Value3":0,"FileUrl":"files/assets/43726733/1/icon_cabernetGrapes.png?t=d8d158a2287c083ecb38dd7cf85c0a29"},"Cabernet_Sauvignon":{"CityPoints":536,"CityPrice":42000,"Class":"Crafted","ProximityBonus":"Cabernet_Grapes","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Cabernet_Grapes","Req2":"Wine_Bottle","Req3":"Oak_Barrel","Time0":270,"Time1":540,"Time2":1080,"Time3":2160,"Value1":5,"Value2":1,"Value3":1,"FileUrl":"files/assets/43726732/1/icon_cabernetSauvignon.png?t=0502b79a4793abb9a0be172655eccc8d"},"Cake":{"CityPoints":5500,"CityPrice":214050,"Class":"Crafted","ProximityBonus":"Energy","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Batter","Req2":"Sugar","Req3":"Energy","Time0":60,"Time1":120,"Time2":240,"Time3":480,"Value1":3,"Value2":6,"Value3":3,"FileUrl":"files/assets/24496983/1/icon_cake.png?t=1691034adb80686649e28684bb2e6cf1"},"Candy_Canes":{"CityPoints":200,"CityPrice":22000,"Class":"Crafted","ProximityBonus":"Peppermint,Energy","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Peppermint","Req2":"Sugar","Req3":"Energy","Time0":120,"Time1":240,"Time2":480,"Time3":960,"Value1":3,"Value2":3,"Value3":5,"FileUrl":"files/assets/60802460/1/icon_candyCanes.png?t=1737de5b91722524304c7ce357f2c943"},"Cash":{"CityPoints":0,"CityPrice":0,"Class":null,"ProximityBonus":"None","ProximityPenalty":"None","ProximityReverse":false,"Req1":"none","Req2":"none","Req3":"none","Time0":0,"Time1":0,"Time2":0,"Time3":0,"Value1":0,"Value2":0,"Value3":0,"FileUrl":"files/assets/24639092/1/icon_cash.png?t=14c610fca631db05c767c1d447bdb456"},"Ceramic_Bowl":{"CityPoints":9,"CityPrice":800,"Class":"Natural","ProximityBonus":"Clay_Lump,Water_Drum,Energy","ProximityPenalty":"Dirty","ProximityReverse":false,"Req1":"Clay_Lump","Req2":"Water_Drum","Req3":"Energy","Time0":150,"Time1":300,"Time2":600,"Time3":1200,"Value1":2,"Value2":1,"Value3":2,"FileUrl":"files/assets/94518245/1/icon_ceramicBowl.png?t=99272b276b4739e5386dbfdaf951e1d8"},"Chardonnay":{"CityPoints":350,"CityPrice":27950,"Class":"Crafted","ProximityBonus":"Chardonnay_Grapes","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Chardonnay_Grapes","Req2":"Wine_Bottle","Req3":"Oak_Barrel","Time0":240,"Time1":480,"Time2":960,"Time3":1920,"Value1":3,"Value2":1,"Value3":1,"FileUrl":"files/assets/43726734/1/icon_chardonnay.png?t=6d854a703d00942cef9eb62b42d6a15a"},"Chardonnay_Grapes":{"CityPoints":2,"CityPrice":810,"Class":"Crop","ProximityBonus":"Water","ProximityPenalty":"Dirty,Salty,Shady","ProximityReverse":false,"Req1":"Water","Req2":"Wood","Req3":"none","Time0":360,"Time1":720,"Time2":1440,"Time3":2880,"Value1":2,"Value2":1,"Value3":0,"FileUrl":"files/assets/43726735/1/icon_chardonnayGrapes.png?t=8dba9a4bc01f8f48c1a1bdba262801bd"},"Cheese":{"CityPoints":150,"CityPrice":15000,"Class":"Crafted","ProximityBonus":"None","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Milk","Req2":"Rice_Vinegar","Req3":"none","Time0":20,"Time1":40,"Time2":80,"Time3":160,"Value1":2,"Value2":1,"Value3":0,"FileUrl":"https://lh3.googleusercontent.com/docs/ADP-6oFrWP1z9KIfnxUMmBjgcawUgFh6T0eSI0PSG36SnZ4iBhIzDa9Bgin8MiOeGeApuZdmdyBK-e14yYTi64apQ-YUA3qm7C5xPmFdZHOg86dqEmSC0or8in3tsNTNS9QddBKw-BUQKQrGNb7b5IQAZRTy7C3BmsEu6SHY4MUJnlQfZyIame5CVriUw-w-k96NGvM"},"Four_Cheese_Pizza":{"CityPoints":1200,"CityPrice":138000,"Class":"Crafted","ProximityBonus":"None","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Pizza_Base","Req2":"Cheese","Req3":"Tomato","Time0":60,"Time1":120,"Time2":240,"Time3":480,"Value1":1,"Value2":2,"Value3":5,"FileUrl":"https://lh3.googleusercontent.com/docs/ADP-6oEWgjVXU5p4tLOY29dKLtboqN_3mHYn9tPQKvH736kbGQ99ODt3KMIepi1PpqXlIpay8JLP40t6In446G_IhzHfQo-9whSfs-GhgSi23myAolc0KzNtVkl7XRDX1S4l1bEKQeKwgqi33nl5fqSJftuoSHWeAK_jP-KCB_1evBrY6NmJZpSFbnkyrw-OrbIq"},"Chocolate_Bar":{"CityPoints":250,"CityPrice":6650,"Class":"Crafted","ProximityBonus":"Cocoa","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Cocoa","Req2":"Sugar","Req3":"Milk","Time0":90,"Time1":180,"Time2":360,"Time3":720,"Value1":3,"Value2":2,"Value3":1,"FileUrl":"files/assets/60802462/1/icon_chocolateBar.png?t=a85b9c08d9bc904391317743c93eadb6"},"Chocolate_Covered_Strawberries":{"CityPoints":500,"CityPrice":22000,"Class":"Crafted","ProximityBonus":"Strawberries,Energy","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Strawberries","Req2":"Chocolate_Bar","Req3":"Energy","Time0":45,"Time1":90,"Time2":180,"Time3":360,"Value1":6,"Value2":2,"Value3":2,"FileUrl":"files/assets/87147622/1/icon_chocolateCoveredStrawberries.png?t=1fa90bac2c88a40c7c9e3f36a4d2710a"},"Chromium":{"CityPoints":54,"CityPrice":4600,"Class":"Natural","ProximityBonus":"Energy,Water_Drum","ProximityPenalty":"Water","ProximityReverse":false,"Req1":"Lumber","Req2":"Energy","Req3":"Water_Drum","Time0":60,"Time1":120,"Time2":240,"Time3":480,"Value1":1,"Value2":3,"Value3":2,"FileUrl":"files/assets/43726739/1/icon_chromium.png?t=bc91ea3d6a7913438fa6ae66a5cad598"},"Clay_Lump":{"CityPoints":3,"CityPrice":300,"Class":"Natural","ProximityBonus":"Water","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Water","Req2":"none","Req3":"none","Time0":20,"Time1":40,"Time2":80,"Time3":160,"Value1":3,"Value2":0,"Value3":0,"FileUrl":"files/assets/94518239/1/icon_clayLump.png?t=ac4ab0670a5c72c3087694a535a537e4"},"Cocoa":{"CityPoints":5,"CityPrice":352,"Class":"Crop","ProximityBonus":"Water","ProximityPenalty":"Dirty,Salty,Shady","ProximityReverse":false,"Req1":"Water","Req2":"none","Req3":"none","Time0":60,"Time1":120,"Time2":240,"Time3":480,"Value1":5,"Value2":0,"Value3":0,"FileUrl":"files/assets/60802463/1/icon_cocoa.png?t=3debc2a549da52d5eda754ed87708b2b"},"Cold":{"CityPoints":0,"CityPrice":0,"Class":"Natural","ProximityBonus":"None","ProximityPenalty":"None","ProximityReverse":false,"Req1":"none","Req2":"none","Req3":"none","Time0":0,"Time1":0,"Time2":0,"Time3":0,"Value1":0,"Value2":0,"Value3":0,"FileUrl":"files/assets/113760714/1/icon_cold.png?t=0ab031252cd572403a7a8a5e5cf0e543"},"Cotton":{"CityPoints":1,"CityPrice":350,"Class":"Crop","ProximityBonus":"Water","ProximityPenalty":"Dirty,Salty,Shady","ProximityReverse":false,"Req1":"Water","Req2":"none","Req3":"none","Time0":20,"Time1":40,"Time2":80,"Time3":160,"Value1":4,"Value2":0,"Value3":0,"FileUrl":"files/assets/24496930/1/icon_cotton.png?t=88c43d55100a3af0aae808b337e70a6f"},"Cotton_Yarn":{"CityPoints":16,"CityPrice":3250,"Class":"Produced","ProximityBonus":"Cotton,Energy","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Cotton","Req2":"Lumber","Req3":"Energy","Time0":60,"Time1":120,"Time2":240,"Time3":480,"Value1":5,"Value2":1,"Value3":1,"FileUrl":"files/assets/24496977/1/icon_cottonYarn.png?t=536a340e113734fd820d78ba4dc9d1ba"},"Crude_Oil":{"CityPoints":1,"CityPrice":50,"Class":"Fuel","ProximityBonus":"None","ProximityPenalty":"None","ProximityReverse":false,"Req1":"none","Req2":"none","Req3":"none","Time0":180,"Time1":360,"Time2":720,"Time3":1440,"Value1":0,"Value2":0,"Value3":0,"FileUrl":"files/assets/24496975/1/icon_crudeOil.png?t=b8613c6cd6f16ef2e09f117cb8e72d55"},"Decorated_Cake":{"CityPoints":13757,"CityPrice":371050,"Class":"Crafted","ProximityBonus":"None","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Cake","Req2":"Chocolate_Bar","Req3":"Candy_Canes","Time0":60,"Time1":120,"Time2":240,"Time3":480,"Value1":1,"Value2":1,"Value3":2,"FileUrl":"files/assets/87526795/1/icon_decoratedCake.png?t=c6faaa9091ce41ea776974b45b98611a"},"Dough":{"CityPoints":270,"CityPrice":29150,"Class":"Crafted","ProximityBonus":"Eggs","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Flour","Req2":"Eggs","Req3":"Butter","Time0":30,"Time1":60,"Time2":120,"Time3":240,"Value1":5,"Value2":1,"Value3":1,"FileUrl":"files/assets/24496972/1/icon_dough.png?t=a69233c027a3d6ebfefdb1ff759d866c"},"Easy_Dough":{"CityPoints":270,"CityPrice":29150,"Class":"Crafted","ProximityBonus":"Eggs","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Flour","Req2":"Eggs","Req3":"none","Time0":90,"Time1":180,"Time2":360,"Time3":720,"Value1":5,"Value2":1,"Value3":0,"FileUrl":"files/assets/24496972/1/icon_dough.png?t=a69233c027a3d6ebfefdb1ff759d866c"},"Eel":{"CityPoints":95,"CityPrice":4500,"Class":"Fish","ProximityBonus":"None","ProximityPenalty":"Dirty","ProximityReverse":false,"Req1":"Food_Mix","Req2":"none","Req3":"none","Time0":80,"Time1":160,"Time2":320,"Time3":640,"Value1":1,"Value2":0,"Value3":0,"FileUrl":"files/assets/106782046/1/icon_eel.png?t=1db90cb8a2b97c3b377d3ebb04d02fac"},"Eel_Nigiri":{"CityPoints":170,"CityPrice":16350,"Class":"Crafted","ProximityBonus":"Energy","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Eel","Req2":"White_Rice","Req3":"Wasabi","Time0":30,"Time1":60,"Time2":120,"Time3":240,"Value1":1,"Value2":1,"Value3":1,"FileUrl":"files/assets/128233159/1/icon_eelNigiri.png?t=22eef0185131964d18eddaf796e56394"},"Eggs":{"CityPoints":12,"CityPrice":1650,"Class":"Crafted","ProximityBonus":"Water","ProximityPenalty":"Dirty","ProximityReverse":false,"Req1":"Feed","Req2":"Wood","Req3":"Water","Time0":30,"Time1":60,"Time2":120,"Time3":240,"Value1":3,"Value2":1,"Value3":1,"FileUrl":"files/assets/24496927/1/icon_eggs.png?t=bf433510dcec27001157733569809d53"},"Enchanted_Object":{"CityPoints":560,"CityPrice":10500,"Class":"Produced","ProximityBonus":"Peppermint","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Mystic_Matter","Req2":"Peppermint","Req3":"Molten_Glass","Time0":120,"Time1":240,"Time2":480,"Time3":960,"Value1":1,"Value2":3,"Value3":1,"FileUrl":"files/assets/113747927/1/icon_enchantedObject.png?t=1231b10410b01b792d58fe3a94ec3f8e"},"Energy":{"CityPoints":1,"CityPrice":150,"Class":"Produced","ProximityBonus":"Crude_Oil,Water_Drum","ProximityPenalty":"Shady","ProximityReverse":false,"Req1":"Crude_Oil","Req2":"Water_Drum","Req3":"none","Time0":20,"Time1":40,"Time2":80,"Time3":160,"Value1":2,"Value2":1,"Value3":0,"FileUrl":"files/assets/24496973/1/icon_energy.png?t=6e3adfe40f9403610f4b9b972d04f5d4"},"Everyone_Else_Speed":{"CityPoints":0,"CityPrice":0,"Class":"Bonus","ProximityBonus":"None","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Cash","Req2":"Brine","Req3":"Salmon","Time0":600,"Time1":1200,"Time2":2400,"Time3":4800,"Value1":5000000,"Value2":100,"Value3":50,"FileUrl":"files/assets/36113290/1/icon_everyoneElseSpeed.png?t=51b07322d867ed2445db57adf63ffae4"},"Fabric_Box":{"CityPoints":4840,"CityPrice":113350,"Class":"Produced","ProximityBonus":"None","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Wooden_Box","Req2":"Uniforms","Req3":"Wax","Time0":40,"Time1":80,"Time2":160,"Time3":320,"Value1":1,"Value2":3,"Value3":1,"FileUrl":"files/assets/98540672/1/icon_fabricBox.png?t=2fd4d468efe1b141e89b3d69bbfbc7a4"},"Fancy_Cake":{"CityPoints":7800,"CityPrice":274500,"Class":"Crafted","ProximityBonus":"Strawberries","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Cake","Req2":"Chocolate_Bar","Req3":"Strawberries","Time0":30,"Time1":60,"Time2":120,"Time3":240,"Value1":1,"Value2":3,"Value3":2,"FileUrl":"files/assets/87526796/1/icon_fancyCake.png?t=31bf7a471c4f443f93a41bec3944c4aa"},"Farm_Salmon":{"CityPoints":620,"CityPrice":19000,"Class":"Fish","ProximityBonus":"Energy","ProximityPenalty":"Dirty","ProximityReverse":false,"Req1":"Fish_Chum","Req2":"Energy","Req3":"none","Time0":30,"Time1":60,"Time2":120,"Time3":240,"Value1":2,"Value2":8,"Value3":0,"FileUrl":"files/assets/127806752/1/icon_farmSalmon.png?t=6789450e261a0b82da0ee22dbf7cc01c"},"Feed":{"CityPoints":1,"CityPrice":340,"Class":"Feed","ProximityBonus":"Wheat","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Wheat","Req2":"none","Req3":"none","Time0":10,"Time1":20,"Time2":40,"Time3":80,"Value1":2,"Value2":0,"Value3":0,"FileUrl":"files/assets/24496969/1/icon_feed.png?t=cee83bd2adbf464528860abd32601847"},"Fish_Chum":{"CityPoints":165,"CityPrice":3800,"Class":"Fish","ProximityBonus":"Seaweed","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Seaweed","Req2":"Shrimp","Req3":"none","Time0":20,"Time1":40,"Time2":80,"Time3":160,"Value1":1,"Value2":2,"Value3":0,"FileUrl":"files/assets/126978415/1/icon_fishChum.png?t=e9edf050020307291d6be9772e34815c"},"Fisherman_Speed":{"CityPoints":0,"CityPrice":0,"Class":"Bonus","ProximityBonus":"Seaweed","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Cash","Req2":"Seaweed","Req3":"Shrimp","Time0":600,"Time1":1200,"Time2":2400,"Time3":4800,"Value1":2500000,"Value2":100,"Value3":50,"FileUrl":"files/assets/127661011/1/icon_fishermanSpeed.png?t=9de043819400720731206fa9c9a97c78"},"Flour":{"CityPoints":12,"CityPrice":2000,"Class":"Crafted","ProximityBonus":"Wheat","ProximityPenalty":"Shady","ProximityReverse":false,"Req1":"Wheat","Req2":"Wood","Req3":"none","Time0":30,"Time1":60,"Time2":120,"Time3":240,"Value1":2,"Value2":1,"Value3":0,"FileUrl":"files/assets/24496968/1/icon_flour.png?t=54b202363da43d50e30fdf511b571609"},"Food_Mix":{"CityPoints":48,"CityPrice":2800,"Class":"Crafted","ProximityBonus":"None","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Roe","Req2":"Worms","Req3":"none","Time0":20,"Time1":40,"Time2":80,"Time3":160,"Value1":2,"Value2":1,"Value3":0,"FileUrl":"files/assets/128897567/1/icon_foodMix.png?t=b0a58d4197a3f2c84f503d438ff64f25"},"Food_Parcel":{"CityPoints":9650,"CityPrice":165000,"Class":"Produced","ProximityBonus":"None","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Honey","Req2":"Jam","Req3":"Baguette","Time0":30,"Time1":60,"Time2":120,"Time3":240,"Value1":1,"Value2":2,"Value3":3,"FileUrl":"files/assets/98540886/1/icon_foodParcel.png?t=d523e3767594d309fc4402438ed6ac80"},"Gasoline":{"CityPoints":8,"CityPrice":1450,"Class":"Fuel","ProximityBonus":"Water_Drum,Energy","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Petroleum","Req2":"Water_Drum","Req3":"Energy","Time0":30,"Time1":60,"Time2":120,"Time3":240,"Value1":1,"Value2":2,"Value3":6,"FileUrl":"files/assets/24496966/1/icon_gasoline.png?t=a231669433ff6cc683e15871404c8f05"},"Gift_Parcel":{"CityPoints":35000,"CityPrice":750000,"Class":"Produced","ProximityBonus":"None","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Decorated_Cake","Req2":"Sangria","Req3":"Pumpkin_Pie","Time0":30,"Time1":60,"Time2":120,"Time3":240,"Value1":1,"Value2":1,"Value3":1,"FileUrl":"files/assets/98540887/1/icon_giftParcel.png?t=ab74c738d259622ff650e293361b5d6c"},"Global_Speed":{"CityPoints":0,"CityPrice":0,"Class":"Bonus","ProximityBonus":"None","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Cash","Req2":"Fish_Chum","Req3":"Salmon_Nigiri","Time0":1800,"Time1":3600,"Time2":7200,"Time3":14400,"Value1":15000000,"Value2":100,"Value3":50,"FileUrl":"files/assets/119698546/1/icon_globalSpeed.png?t=c5c523e39781c4afc3d9dfdae5e3c899"},"Glue":{"CityPoints":370,"CityPrice":5500,"Class":"Crafted","ProximityBonus":"Clay_Lump","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Honeycomb","Req2":"Honey","Req3":"Clay_Lump","Time0":30,"Time1":60,"Time2":120,"Time3":240,"Value1":1,"Value2":1,"Value3":2,"FileUrl":"files/assets/113238167/1/icon_glue.png?t=8034bcaaa7dea0bb390147dc095f53ba"},"Honey":{"CityPoints":170,"CityPrice":7500,"Class":"Pantry","ProximityBonus":"Nectar","ProximityPenalty":"Dirty","ProximityReverse":false,"Req1":"Nectar","Req2":"Lumber","Req3":"Ceramic_Bowl","Time0":60,"Time1":120,"Time2":240,"Time3":480,"Value1":3,"Value2":1,"Value3":1,"FileUrl":"files/assets/94518244/1/icon_honey.png?t=6b81306f7ce787c1206a0a037914ca2a"},"Honeycomb":{"CityPoints":200,"CityPrice":1000,"Class":"Pantry","ProximityBonus":"Nectar","ProximityPenalty":"Dirty","ProximityReverse":false,"Req1":"Nectar","Req2":"Lumber","Req3":"Ceramic_Bowl","Time0":120,"Time1":240,"Time2":480,"Time3":960,"Value1":6,"Value2":2,"Value3":1,"FileUrl":"files/assets/94518238/1/icon_honeycomb.png?t=236ecf62976bec81827fc509e04e4f93"},"Husk_Rice":{"CityPoints":5,"CityPrice":470,"Class":"Crop","ProximityBonus":"Water","ProximityPenalty":"Dirty,Shady","ProximityReverse":false,"Req1":"Water","Req2":"none","Req3":"none","Time0":20,"Time1":40,"Time2":80,"Time3":160,"Value1":8,"Value2":0,"Value3":0,"FileUrl":"files/assets/126666837/1/icon_huskRice.png?t=416724c0380d9e867b6daa482e78a8f9"},"Ice_Block":{"CityPoints":70,"CityPrice":4500,"Class":"Crafted","ProximityBonus":"Cold,Water_Drum","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Cold","Req2":"Water_Drum","Req3":"none","Time0":30,"Time1":60,"Time2":120,"Time3":240,"Value1":3,"Value2":2,"Value3":0,"FileUrl":"files/assets/113656564/1/icon_iceBlock.png?t=08b8b84b788052760ca1d34f7a5ebccb"},"Industrial_Ice_Block":{"CityPoints":70,"CityPrice":4500,"Class":"Crafted","ProximityBonus":"Water_Drum,Cold","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Water_Drum","Req2":"Cold","Req3":"none","Time0":600,"Time1":1200,"Time2":2400,"Time3":4800,"Value1":2,"Value2":3,"Value3":0,"FileUrl":"files/assets/127806923/1/icon_industrialIceBlock.png?t=08b8b84b788052760ca1d34f7a5ebccb"},"Iron":{"CityPoints":54,"CityPrice":4600,"Class":"Produced","ProximityBonus":"Energy,Water_Drum","ProximityPenalty":"Water","ProximityReverse":false,"Req1":"Lumber","Req2":"Energy","Req3":"Water_Drum","Time0":30,"Time1":60,"Time2":120,"Time3":240,"Value1":1,"Value2":1,"Value3":1,"FileUrl":"files/assets/24496967/1/icon_iron.png?t=9385218ac79d399c00d60e815abc039c"},"Jack_O_Lantern":{"CityPoints":721,"CityPrice":1000,"Class":"Produced","ProximityBonus":"Pumpkin","ProximityPenalty":"Dirty","ProximityReverse":false,"Req1":"Pumpkin","Req2":"Wax","Req3":"Cotton_Yarn","Time0":60,"Time1":120,"Time2":240,"Time3":480,"Value1":1,"Value2":2,"Value3":2,"FileUrl":"files/assets/105790267/1/icon_jackOLantern.png?t=163a7d78f2d3b010e4226e2f057ca77e"},"Jam":{"CityPoints":275,"CityPrice":25000,"Class":"Pantry","ProximityBonus":"Strawberries,Water_Drum","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Strawberries","Req2":"Sugar","Req3":"Water_Drum","Time0":60,"Time1":120,"Time2":240,"Time3":480,"Value1":10,"Value2":3,"Value3":1,"FileUrl":"files/assets/86818175/1/icon_jam.png?t=caa7502d1ff1e7859643a41422d7f6ae"},"Jet_Fuel":{"CityPoints":27,"CityPrice":1900,"Class":"Fuel","ProximityBonus":"Water_Drum,Energy","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Petroleum","Req2":"Water_Drum","Req3":"Energy","Time0":90,"Time1":180,"Time2":360,"Time3":720,"Value1":3,"Value2":2,"Value3":3,"FileUrl":"files/assets/24496964/1/icon_jetFuel.png?t=bbeb4de39f03aba76d960a96ee8599f6"},"Lasagna":{"CityPoints":25000,"CityPrice":150000,"Class":"Crafted","ProximityBonus":"Eggs","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Cheese","Req2":"Pasta_Sauce","Req3":"Eggs","Time0":60,"Time1":120,"Time2":240,"Time3":480,"Value1":2,"Value2":2,"Value3":1,"FileUrl":"https://lh3.googleusercontent.com/u/0/docs/ADP-6oExqMPDaTYraspqHWG8vZsV2U6N2DSF5A4HiT5lqQx9sTcW2RXsJVZtHuUt1FPKNDKAEMs8dFpexuWW5Tpy-N2MHLgKXim_qkFjdrGIBo68vA0iykEpT78_FNd5VEyMOCYajKonYR_C_niOkeodq8YjZEdDB0XbNZzToKUVQO_-nWHikROrXN5rg8gR0dXy2LkyUVLk39-2WzE9uhS0Z01P8MSagS6z_pOTVq_-2_2NqO5m8r8U49lB81yokUJzqGEnLJCpxS1wtKP8wrGMvDODIsqg12EsmC6DpOVuDdf1Cs4JeMg7JRHlS8bnyzHrsSdtoTRquQbX9cs0wR7J6jf4f9R8twwRZZwX93pIaPVZgwIdghbyakzXj1COK6dCrKQ4qRztJvAMpMWlZ5PHRkzi3IncM-7UaHvX2gMIVxcm3QdULQ5wSPVkIE7mPHAK7DUfoyyG9Lrr-n87K3sAbLXj8pd1TEIT3SMyxUvsadWgWyn4qJdIJnStEQx81Y2i6HFois_WKSwVUAEovCzDM_7YWBBKq71GLTupPbjBWCp57YQUdqao-jTwGdbOvImDbXH8G3dggwnkvHPecdJ0sqIlrUdmsEAy8dIzBodujrtSPt9GX7hXCXPZwtIejYB5VgHwg5twsgKC9JPcWWw3BHlvU92OKrqQ3D2P0QvoW7BfQXw5X6zGvrT7a4EnyGYiA4WKEmPuDBM2wb4v_6I3zw5-kCi-colRmQJS7JBfE6wzcFvzqJqPDtViQoTl72p0rqmJp5os7pz-BzhHux58ei2mzDxpFNFyoT01CMNStsBdsMBWTlI2q2bT2AI9HNU8sd03_MpwJLwMeL-XKHXdyXnk2aFtu8gun2TmiImd04TerMlXx_DG2kVaN6VVao51qdW2zrDHYqWnk-_pv3OXzSUrICSVadG9n93gXlyj-YZWzZmYBgpAv2ydX5HK_mkKlw8yN7GdiYoVjbgKzpyO3d8jkxuuRT0-BkL-o-XJB0BirwmbmJFS"},"Legendary_Oak_Wood":{"CityPoints":1,"CityPrice":300,"Class":"Timber","ProximityBonus":"Water","ProximityPenalty":"Dirty,Salty,Shady","ProximityReverse":false,"Req1":"Water","Req2":"none","Req3":"none","Time0":80,"Time1":160,"Time2":320,"Time3":640,"Value1":1,"Value2":0,"Value3":0,"FileUrl":"files/assets/104052614/1/icon_legendaryOakWood.png?t=6fb2a970d4fce8f8ff913cba5734e6f1"},"Legendary_Wood":{"CityPoints":1,"CityPrice":250,"Class":"Timber","ProximityBonus":"Water","ProximityPenalty":"Dirty,Salty,Shady","ProximityReverse":false,"Req1":"Water","Req2":"none","Req3":"none","Time0":20,"Time1":40,"Time2":80,"Time3":160,"Value1":1,"Value2":0,"Value3":0,"FileUrl":"files/assets/100773174/1/icon_legendaryWood.png?t=5813663b26908d759b293a10d5557cca"},"Lights":{"CityPoints":87,"CityPrice":2500,"Class":"Produced","ProximityBonus":"Energy","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Molten_Glass","Req2":"Energy","Req3":"none","Time0":120,"Time1":240,"Time2":480,"Time3":960,"Value1":2,"Value2":3,"Value3":0,"FileUrl":"files/assets/113238166/1/icon_lights.png?t=c0a6f33c878cebe9f86295d1b2bbf52b"},"Limestone":{"CityPoints":54,"CityPrice":4600,"Class":"Natural","ProximityBonus":"Energy,Water_Drum","ProximityPenalty":"Water","ProximityReverse":false,"Req1":"Lumber","Req2":"Energy","Req3":"Water_Drum","Time0":60,"Time1":120,"Time2":240,"Time3":480,"Value1":1,"Value2":3,"Value3":2,"FileUrl":"files/assets/43726737/1/icon_limestone.png?t=01fa2771cbf79e1954ccb83914497d53"},"Lumber":{"CityPoints":8,"CityPrice":1350,"Class":"Timber","ProximityBonus":"Energy,Water_Drum","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Wood","Req2":"Energy","Req3":"Water_Drum","Time0":10,"Time1":20,"Time2":40,"Time3":80,"Value1":5,"Value2":2,"Value3":1,"FileUrl":"files/assets/24496963/1/icon_lumber.png?t=3821bb767168e17ed77fa8fb6429e96a"},"Magic_Powder":{"CityPoints":55,"CityPrice":6500,"Class":"Produced","ProximityBonus":"Pumpkin,Strawberries","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Pumpkin","Req2":"Brine","Req3":"Strawberries","Time0":20,"Time1":40,"Time2":80,"Time3":160,"Value1":1,"Value2":2,"Value3":2,"FileUrl":"files/assets/113652699/1/icon_magicPowder.png?t=13c9f49fb7b9e5cb1f68a2ce76cdcaab"},"Magical_Ice_Block":{"CityPoints":70,"CityPrice":4500,"Class":"Crafted","ProximityBonus":"Cold,Water_Drum","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Cold","Req2":"Water_Drum","Req3":"none","Time0":30,"Time1":60,"Time2":120,"Time3":240,"Value1":3,"Value2":2,"Value3":0,"FileUrl":"files/assets/127807569/1/icon_magicalIceBlock.png?t=08b8b84b788052760ca1d34f7a5ebccb"},"Milk":{"CityPoints":20,"CityPrice":4000,"Class":"Crafted","ProximityBonus":"Water","ProximityPenalty":"Dirty","ProximityReverse":false,"Req1":"Feed","Req2":"Wood","Req3":"Water","Time0":30,"Time1":60,"Time2":120,"Time3":240,"Value1":8,"Value2":1,"Value3":3,"FileUrl":"files/assets/24496962/1/icon_milk.png?t=bf243cea5c9cdc7457d693b50a1adfd1"},"Milk_Barn_Speed":{"CityPoints":0,"CityPrice":0,"Class":"Bonus","ProximityBonus":"None","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Cash","Req2":"Milk","Req3":"Wood","Time0":600,"Time1":1200,"Time2":2400,"Time3":4800,"Value1":7000000,"Value2":100,"Value3":100,"FileUrl":"files/assets/123183603/1/icon_milkBarnSpeed.png?t=6555183080f83dfd70342287ca4cba7a"},"Molten_Glass":{"CityPoints":145,"CityPrice":13500,"Class":"Produced","ProximityBonus":"Silica,Limestone,Chromium","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Silica","Req2":"Limestone","Req3":"Chromium","Time0":180,"Time1":360,"Time2":720,"Time3":1440,"Value1":4,"Value2":1,"Value3":2,"FileUrl":"files/assets/113238165/1/icon_moltenGlass.png?t=d71f320ea5aef1fea95996639d786c4b"},"Mystic_Matter":{"CityPoints":550,"CityPrice":26750,"Class":"Produced","ProximityBonus":"Limestone","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Glue","Req2":"Cotton_Yarn","Req3":"Limestone","Time0":120,"Time1":240,"Time2":480,"Time3":960,"Value1":1,"Value2":1,"Value3":1,"FileUrl":"files/assets/113238168/1/icon_mysticMatter.png?t=9f1ac59d11a02133701274b8e3dcf84a"},"Nectar":{"CityPoints":0,"CityPrice":0,"Class":"Natural","ProximityBonus":"None","ProximityPenalty":"None","ProximityReverse":false,"Req1":"none","Req2":"none","Req3":"none","Time0":50,"Time1":100,"Time2":200,"Time3":400,"Value1":0,"Value2":0,"Value3":0,"FileUrl":"files/assets/94533067/1/icon_nectar.png?t=e4c3314f6b6a60ab3178349784d087bc"},"Oak_Barrel":{"CityPoints":63,"CityPrice":5500,"Class":"Produced","ProximityBonus":"Iron,Energy","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Oak_Wood","Req2":"Iron","Req3":"Energy","Time0":30,"Time1":60,"Time2":120,"Time3":240,"Value1":3,"Value2":1,"Value3":1,"FileUrl":"files/assets/43726738/1/icon_oakBarrel.png?t=4a61c81bbdd998c733a5ebc74fed372d"},"Oak_Wood":{"CityPoints":1,"CityPrice":300,"Class":"Timber","ProximityBonus":"Water","ProximityPenalty":"Dirty,Salty,Shady","ProximityReverse":false,"Req1":"Water","Req2":"none","Req3":"none","Time0":120,"Time1":240,"Time2":480,"Time3":960,"Value1":5,"Value2":0,"Value3":0,"FileUrl":"files/assets/43726736/1/icon_oakWood.png?t=6fb2a970d4fce8f8ff913cba5734e6f1"},"Party_Box":{"CityPoints":50000,"CityPrice":1000000,"Class":"Produced","ProximityBonus":"None","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Food_Parcel","Req2":"Gift_Parcel","Req3":"Wooden_Box","Time0":30,"Time1":60,"Time2":120,"Time3":240,"Value1":1,"Value2":1,"Value3":1,"FileUrl":"files/assets/98540674/1/icon_partyBox.png?t=2da83bfc177154ceccb2728c7608aaf5"},"Pasta_Sauce":{"CityPoints":250,"CityPrice":17000,"Class":"Crafted","ProximityBonus":"None","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Tomato_Paste","Req2":"Salt","Req3":"Sugar","Time0":30,"Time1":60,"Time2":120,"Time3":240,"Value1":1,"Value2":3,"Value3":1,"FileUrl":"https://lh3.googleusercontent.com/u/0/docs/ADP-6oGXXSPbNTkF85M-XgaHr3GPGT_imGUYyAK59UxM3f-Sul12n0A-3_yWc9Woe9c5ExhvNfnNg_o6mk59TQ0sgPWDT39UaGWVsNBBcPxfO7XPCIMXVG01R3qRaz53P4Ccg1ANadsEjEEqjFftMXY9R3rpSIf3gnYEeHYU8RaSbSW6z5VvTdYn97s5PoKDIfY4S9r2f9wKBnhPqMire7wwVC8w1YLBYNhbx9yBkvMGU_Xigi4jFIyRBrfQpGD-3wxOIZotnsvSGq289eAp_vXBKyms13U5duCweql4KtVywFdhtVlblRZJYOY0N20Cla0JI0_7y88y-v9Ll_bWgLpTFQx0XezpXXVFtggf2nP9Q2BvrqRdTs3F409pBDmh27tk_mOAUCEphRhSNBUXmOFyL7P7B_rNM81uyj8uVqxFBUYhGWHjsjcATL1dpFQCm19h9XUOPm5JqPPoWiu3GT2A5DTYSbT8aYQBEoBSs1EpJOljWCfO6gwYAZ2qjVDExAMvCV-3CogP-xurtcNkdcGtYxFzNYPr3-I7Bt5KrH83NCYZ_sfJFk_klKxxIxd8btTiy5JbZZJpsSWi57zdvGGAFG6E3EqyALVmurWcefru2VfRMyLixqydt_F5tZVxlN0NOTX-ODb-xM8CSP2-quWxN9Ox6ef-UaXtzrAXEmluf8yxFtrerPHqiAhFeRdFgibwzpe1OJBJ_xksPfiu_QgrnV_6xeVJu1lPZRPZqL4amaYZZmO0qe0UkDZGLYTZsKtKVDwPaOWircfhLwgsGd7cgEYSWEHJk0W5eFCncH_0JnZRxAqS9-pJ7kaZ9cPQKoTFTWjbnIB9qtKdFo0QKEMB23-y2geGcWe2uTXhXUqKmujSJL_ZpJr_L0Lpv279CZt-4IN5YT_Hq31nER7985JswPPKQBzPe1uL15peRe5Ff9gD27DDGszcmThMGcDkYlZIM8XFUUu2efA_D9sIisaIyWxYLz-4BvLQeO9ungSWJpBHa4DWBXtm"},"Peppermint":{"CityPoints":8,"CityPrice":400,"Class":"Crop","ProximityBonus":"Water","ProximityPenalty":"Dirty,Salty","ProximityReverse":false,"Req1":"Water","Req2":"none","Req3":"none","Time0":180,"Time1":360,"Time2":720,"Time3":1440,"Value1":3,"Value2":0,"Value3":0,"FileUrl":"files/assets/60802464/1/icon_peppermint.png?t=3f5fd165f9e366ee23815047a403dd6a"},"Petroleum":{"CityPoints":4,"CityPrice":450,"Class":"Fuel","ProximityBonus":"Crude_Oil,Water_Drum,Energy","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Crude_Oil","Req2":"Water_Drum","Req3":"Energy","Time0":30,"Time1":60,"Time2":120,"Time3":240,"Value1":2,"Value2":1,"Value3":2,"FileUrl":"files/assets/24496959/1/icon_petroleum.png?t=a4473cadfc09d4f0672e009303509b1f"},"Pinot_Noir":{"CityPoints":808,"CityPrice":57200,"Class":"Crafted","ProximityBonus":"Pinot_Noir_Grapes","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Pinot_Noir_Grapes","Req2":"Wine_Bottle","Req3":"Oak_Barrel","Time0":300,"Time1":600,"Time2":1200,"Time3":2400,"Value1":6,"Value2":1,"Value3":1,"FileUrl":"files/assets/43726740/1/icon_pinotNoir.png?t=c48e5f006b84f8ac995d588403126737"},"Pinot_Noir_Grapes":{"CityPoints":10,"CityPrice":2670,"Class":"Crop","ProximityBonus":"Water","ProximityPenalty":"Dirty,Salty,Shady","ProximityReverse":false,"Req1":"Water","Req2":"Wood","Req3":"none","Time0":450,"Time1":900,"Time2":1800,"Time3":3600,"Value1":2,"Value2":1,"Value3":0,"FileUrl":"files/assets/43726741/1/icon_pinotNoirGrapes.png?t=cd70f710d9ffa9e3079b444344ee43fb"},"Pizza_Base":{"CityPoints":750,"CityPrice":110000,"Class":"Produced","ProximityBonus":"None","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Dough","Req2":"Cheese","Req3":"Tomato_Paste","Time0":30,"Time1":60,"Time2":120,"Time3":240,"Value1":2,"Value2":2,"Value3":1,"FileUrl":"https://lh3.googleusercontent.com/docs/ADP-6oFwxBXCHZXXcGGic7_69ueqZ4TLflbxZ8CtbumRD1D1wopDvVxPwV0imgDfDXUJeSbeHMOx-UW6SQSNNKLg0TjsTAWY_gfImd28Oek-v3w7LVERSdBt-So1W3jjj1WcOxEaL1Tb9_cqJ11qJWjsgN9wJ7Idod5QRAvQUddfIZnZwt857q5yFmj2RPPYLyv6eAU"},"Pumpkin":{"CityPoints":2,"CityPrice":1000,"Class":"Crop","ProximityBonus":"Water","ProximityPenalty":"Dirty,Salty,Shady","ProximityReverse":false,"Req1":"Water","Req2":"none","Req3":"none","Time0":150,"Time1":300,"Time2":600,"Time3":1200,"Value1":10,"Value2":0,"Value3":0,"FileUrl":"files/assets/36897915/1/icon_Pumpkin.png?t=c0af83e4e234482d619f70bb536941b1"},"Pumpkin_Pie":{"CityPoints":816,"CityPrice":49750,"Class":"Crafted","ProximityBonus":"Pumpkin,Eggs","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Pumpkin","Req2":"Sugar","Req3":"Eggs","Time0":180,"Time1":360,"Time2":720,"Time3":1440,"Value1":6,"Value2":5,"Value3":10,"FileUrl":"files/assets/37126455/1/icon_pumpkinPie.png?t=6d2b3f6730dd7eb844f5fe188c2d43ea"},"Red_Steel":{"CityPoints":6800,"CityPrice":270950,"Class":"Produced","ProximityBonus":"Water_Drum,Energy","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Steel","Req2":"Water_Drum","Req3":"Energy","Time0":90,"Time1":180,"Time2":360,"Time3":720,"Value1":5,"Value2":5,"Value3":10,"FileUrl":"files/assets/119798114/1/icon_redSteel.png?t=288db012b0973fdcbbb7be59fca85481"},"Rice_Vinegar":{"CityPoints":107,"CityPrice":4730,"Class":"Crafted","ProximityBonus":"Water,Sugarcane","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Water","Req2":"White_Rice","Req3":"Sugarcane","Time0":30,"Time1":60,"Time2":120,"Time3":240,"Value1":2,"Value2":1,"Value3":1,"FileUrl":"https://lh3.googleusercontent.com/docs/ADP-6oEPjqs4pH6HPsaF_WYBVWtlWHVDpcU66YDNsDkfFP_pgFFKhViaLdDNH-R6x_xC7EUxx4gpp4692hcO0JcfZgHwQQPxXTMSikrjhmF_hNyVFPHRe3l0lio-wGgYO0Sbvwgqv64iyZbWCse-aRntkptTr_MyOS4qssrxII2zUrVu-zI5tL2kWRU4joq2WpBJuV8"},"Risotto":{"CityPoints":700,"CityPrice":44000,"Class":"Crafted","ProximityBonus":"None","ProximityPenalty":"None","ProximityReverse":false,"Req1":"White_Rice","Req2":"Cheese","Req3":"Milk","Time0":60,"Time1":120,"Time2":240,"Time3":480,"Value1":7,"Value2":2,"Value3":1,"FileUrl":"https://lh3.googleusercontent.com/docs/ADP-6oF1R0Udw6_PFpUwRLlV8gDtGbpb6_VceGeBDOMY8yrEEDS23f9nLapGqaNqtsUga-5fXW7C_L2ZLBDqH6u1FOLZ6ICd_A1w8R1Vejncc_KUgCyJ910iKF0wfNQrnCEVefScm5--kO3XGIS3d2htrRyJXLjb4xHNP4CDT2e6_WpsYUTJDTm2YwO0F1znGMRZ"},"Rocking_Horse":{"CityPoints":1200,"CityPrice":24500,"Class":"Produced","ProximityBonus":"Iron","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Oak_Wood","Req2":"Enchanted_Object","Req3":"Iron","Time0":180,"Time1":360,"Time2":720,"Time3":1440,"Value1":4,"Value2":1,"Value3":1,"FileUrl":"files/assets/113764005/1/icon_rockingHorse.png?t=a7f058674307cf5cf71d433b67081a06"},"Roe":{"CityPoints":17,"CityPrice":580,"Class":"Fish","ProximityBonus":"Seaweed","ProximityPenalty":"Dirty","ProximityReverse":false,"Req1":"Seaweed","Req2":"none","Req3":"none","Time0":30,"Time1":60,"Time2":120,"Time3":240,"Value1":1,"Value2":0,"Value3":0,"FileUrl":"files/assets/106782051/1/icon_roe.png?t=abb8650f4207403f85dd246add592d87"},"Salmon":{"CityPoints":620,"CityPrice":19000,"Class":"Fish","ProximityBonus":"Energy","ProximityPenalty":"Dirty","ProximityReverse":false,"Req1":"Fish_Chum","Req2":"Energy","Req3":"none","Time0":180,"Time1":360,"Time2":720,"Time3":1440,"Value1":1,"Value2":4,"Value3":0,"FileUrl":"files/assets/106782043/1/icon_salmon.png?t=6789450e261a0b82da0ee22dbf7cc01c"},"Salmon_Nigiri":{"CityPoints":1400,"CityPrice":45000,"Class":"Crafted","ProximityBonus":"Energy","ProximityPenalty":"None","ProximityReverse":false,"Req1":"White_Rice","Req2":"Salmon","Req3":"Energy","Time0":30,"Time1":60,"Time2":120,"Time3":240,"Value1":1,"Value2":1,"Value3":3,"FileUrl":"files/assets/127521007/1/icon_salmonNigiri.png?t=9ebe4f8db8a069650eeedb1d399bc91b"},"Sushi_Boat":{"CityPoints":85000,"CityPrice":285000,"Class":"Crafted","ProximityBonus":"Energy","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Salmon_Nigiri","Req2":"Eel_Nigiri","Req3":"Rice_Vinegar","Time0":30,"Time1":60,"Time2":120,"Time3":240,"Value1":2,"Value2":1,"Value3":1,"FileUrl":"files/assets/106782052/1/icon_sushiBoat.png?t=0bc915aaa5585fc149378c1d47f68b84"},"Salt":{"CityPoints":16,"CityPrice":2250,"Class":"Crafted","ProximityBonus":"None","ProximityPenalty":"Shady","ProximityReverse":false,"Req1":"Brine","Req2":"Wood","Req3":"none","Time0":30,"Time1":60,"Time2":120,"Time3":240,"Value1":4,"Value2":2,"Value3":0,"FileUrl":"files/assets/24496956/1/icon_salt.png?t=966ccd519247d3d9303b8b6dd003b070"},"Sangria":{"CityPoints":1290,"CityPrice":58900,"Class":"Crafted","ProximityBonus":"Strawberries","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Cabernet_Sauvignon","Req2":"Sugar","Req3":"Strawberries","Time0":120,"Time1":240,"Time2":480,"Time3":960,"Value1":1,"Value2":2,"Value3":2,"FileUrl":"files/assets/96233967/1/icon_sangria.png?t=629335475a46e62e79dcc09c01d7a2bc"},"Seaweed":{"CityPoints":12,"CityPrice":300,"Class":"Crop","ProximityBonus":"Water","ProximityPenalty":"Salty,PositiveOnlySalty","ProximityReverse":true,"Req1":"Water","Req2":"none","Req3":"none","Time0":40,"Time1":40,"Time2":20,"Time3":10,"Value1":2,"Value2":0,"Value3":0,"FileUrl":"files/assets/127516936/1/icon_seaweed.png?t=b8e7967b56adc558d643727c4483eead"},"Shallow_Chromium":{"CityPoints":54,"CityPrice":4600,"Class":"Natural","ProximityBonus":"Energy,Water_Drum","ProximityPenalty":"Water","ProximityReverse":false,"Req1":"Lumber","Req2":"Energy","Req3":"Water_Drum","Time0":120,"Time1":240,"Time2":480,"Time3":960,"Value1":1,"Value2":3,"Value3":2,"FileUrl":"files/assets/102442531/1/icon_shallowChromium.png?t=bc91ea3d6a7913438fa6ae66a5cad598"},"Shallow_Iron":{"CityPoints":54,"CityPrice":4600,"Class":"Produced","ProximityBonus":"Energy,Water_Drum","ProximityPenalty":"Water","ProximityReverse":false,"Req1":"Lumber","Req2":"Energy","Req3":"Water_Drum","Time0":60,"Time1":120,"Time2":240,"Time3":480,"Value1":1,"Value2":1,"Value3":1,"FileUrl":"files/assets/102442534/1/icon_shallowIron.png?t=9385218ac79d399c00d60e815abc039c"},"Shallow_Limestone":{"CityPoints":54,"CityPrice":1000,"Class":"Natural","ProximityBonus":"Energy,Water_Drum","ProximityPenalty":"Water","ProximityReverse":false,"Req1":"Lumber","Req2":"Energy","Req3":"Water_Drum","Time0":120,"Time1":240,"Time2":480,"Time3":960,"Value1":1,"Value2":3,"Value3":2,"FileUrl":"files/assets/102642649/1/icon_shallowLimestone.png?t=01fa2771cbf79e1954ccb83914497d53"},"Shrimp":{"CityPoints":57,"CityPrice":1800,"Class":"Fish","ProximityBonus":"Seaweed","ProximityPenalty":"Dirty","ProximityReverse":false,"Req1":"Seaweed","Req2":"none","Req3":"none","Time0":20,"Time1":40,"Time2":80,"Time3":160,"Value1":2,"Value2":0,"Value3":0,"FileUrl":"files/assets/106782044/1/icon_shrimp.png?t=8bc16a6abfb14c0ac0f600944f1e6803"},"Shrimp_Pizza":{"CityPoints":1300,"CityPrice":120000,"Class":"Produced","ProximityBonus":"Energy","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Pizza_Base","Req2":"Shrimp","Req3":"Energy","Time0":60,"Time1":120,"Time2":240,"Time3":480,"Value1":1,"Value2":5,"Value3":3,"FileUrl":"https://lh3.googleusercontent.com/docs/ADP-6oH2SQkvK5vwWAYShE4l9p5GfCAWhGvrvRgxUMSkjvGFjJ5azy5FgEFC1WXwjhyw3SMFcG2pvmVoHt4mr96AuzEN3cJnQHKKIUzoCgOXPqvY2K4sDgytsnoDkUBLZ5w6vfmMkAaeDd5J-YCImmub0bNg76lPUzm_tyXMVQ0lje7ANKo9TsbrzXwAYUjrkYJS59w"},"Silica":{"CityPoints":2,"CityPrice":1000,"Class":"Natural","ProximityBonus":"Energy","ProximityPenalty":"Salty,Sandy","ProximityReverse":true,"Req1":"Energy","Req2":"none","Req3":"none","Time0":120,"Time1":120,"Time2":60,"Time3":30,"Value1":2,"Value2":0,"Value3":0,"FileUrl":"files/assets/43726742/1/icon_silica.png?t=32700ede2d2144dab72fd17a274484d6"},"Stack_Box":{"CityPoints":164000,"CityPrice":2500000,"Class":"Produced","ProximityBonus":"None","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Party_Box","Req2":"Fabric_Box","Req3":"Supply_Box","Time0":30,"Time1":60,"Time2":120,"Time3":240,"Value1":1,"Value2":1,"Value3":1,"FileUrl":"files/assets/98540669/1/icon_stackBox.png?t=a7ce335249751e27d936f6f2dae390fa"},"Stars":{"CityPoints":0,"CityPrice":0,"Class":null,"ProximityBonus":"None","ProximityPenalty":"None","ProximityReverse":false,"Req1":"none","Req2":"none","Req3":"none","Time0":0,"Time1":0,"Time2":0,"Time3":0,"Value1":0,"Value2":0,"Value3":0,"FileUrl":"files/assets/121859456/1/icon_stars.png?t=2b3c023ac3f194ab8e875a3fd955a773"},"Steel":{"CityPoints":768,"CityPrice":47000,"Class":"Produced","ProximityBonus":"Iron,Energy,Water_Drum","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Iron","Req2":"Energy","Req3":"Water_Drum","Time0":90,"Time1":180,"Time2":360,"Time3":720,"Value1":10,"Value2":5,"Value3":5,"FileUrl":"files/assets/24496955/1/icon_steel.png?t=633c24af6182ecb6a1a857e4873f86aa"},"Strawberries":{"CityPoints":2,"CityPrice":250,"Class":"Crop","ProximityBonus":"Water","ProximityPenalty":"Dirty,Salty","ProximityReverse":false,"Req1":"Water","Req2":"none","Req3":"none","Time0":30,"Time1":60,"Time2":120,"Time3":240,"Value1":2,"Value2":0,"Value3":0,"FileUrl":"files/assets/87142360/1/icon_strawberries.png?t=af693d328a33a94b5ad1eca268300ede"},"Sugar":{"CityPoints":21,"CityPrice":2300,"Class":"Crafted","ProximityBonus":"Sugarcane","ProximityPenalty":"Shady","ProximityReverse":false,"Req1":"Sugarcane","Req2":"Wood","Req3":"none","Time0":30,"Time1":60,"Time2":120,"Time3":240,"Value1":3,"Value2":1,"Value3":0,"FileUrl":"files/assets/24496954/1/icon_sugar.png?t=f9a32fe1e00c61e73a7437ec68bcd9a4"},"Sugarcane":{"CityPoints":1,"CityPrice":400,"Class":"Crop","ProximityBonus":"Water","ProximityPenalty":"Dirty,Salty,Shady","ProximityReverse":false,"Req1":"Water","Req2":"none","Req3":"none","Time0":20,"Time1":40,"Time2":80,"Time3":160,"Value1":4,"Value2":0,"Value3":0,"FileUrl":"files/assets/24496957/1/icon_sugarcane.png?t=51aeb4a0643ee5aca60b4fcbe4e2b2cb"},"Supply_Box":{"CityPoints":855,"CityPrice":22000,"Class":"Produced","ProximityBonus":"None","ProximityPenalty":"Dirty","ProximityReverse":false,"Req1":"Ceramic_Bowl","Req2":"Wax","Req3":"Wooden_Box","Time0":60,"Time1":120,"Time2":240,"Time3":480,"Value1":2,"Value2":2,"Value3":1,"FileUrl":"files/assets/98540675/1/icon_supplyBox.png?t=ddb97d37baaae09a54811e2cdeb27f55"},"Tomato":{"CityPoints":1,"CityPrice":350,"Class":"Crafted","ProximityBonus":"Water","ProximityPenalty":"Dirty,Salty","ProximityReverse":false,"Req1":"Water","Req2":"none","Req3":"none","Time0":30,"Time1":60,"Time2":120,"Time3":240,"Value1":4,"Value2":0,"Value3":0,"FileUrl":"https://lh3.googleusercontent.com/docs/ADP-6oFufsujgaqWZLw1paVAtek04cWOjbZDuD2-5eP76amDT4rClgTf4nVYelmI2EgXWaxa2j8ugMydgpV7VOsB3gVmqcG1Ibv4jyi5o7iwnIIWoNCsF3y7p6VUiHw9UFdchziR6XhTOVYkNnj5roKkbiuNBtg0m26ODL8uQXyen42ZgILPc2OIDnflri0RUxzXXh0"},"Tomato_Paste":{"CityPoints":150,"CityPrice":6000,"Class":"Crafted","ProximityBonus":"None","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Rice_Vinegar","Req2":"Tomato","Req3":"none","Time0":30,"Time1":60,"Time2":120,"Time3":240,"Value1":1,"Value2":3,"Value3":0,"FileUrl":"https://lh3.googleusercontent.com/docs/ADP-6oG8xrfuynjAi53Q8LPBOv0OQCmCO4qgUYs40_3GQd-iiddJdQEIbHxoZSkGASeBIzY5S2c8bubTvNQt1OESnYdBiH4OKqRLr0zkayXhgkZAk2SqBXvh4qFbNjZ7Mru8Lt2wDSrDc46WZ0W3xof__8DPrM8TpDgZsixJzfwlBfe12RITDWY2ssXhihurHFB8"},"Tractor_Speed":{"CityPoints":0,"CityPrice":0,"Class":"Bonus","ProximityBonus":"None","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Cash","Req2":"Husk_Rice","Req3":"White_Rice","Time0":600,"Time1":1200,"Time2":2400,"Time3":4800,"Value1":2500000,"Value2":100,"Value3":50,"FileUrl":"files/assets/123183604/1/icon_tractorSpeed.png?t=de3e0ff17f25ae1c9eab2726c388b8e9"},"Uniforms":{"CityPoints":560,"CityPrice":34450,"Class":"Produced","ProximityBonus":"Energy","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Cotton_Yarn","Req2":"Wool_Yarn","Req3":"Energy","Time0":60,"Time1":120,"Time2":240,"Time3":480,"Value1":3,"Value2":1,"Value3":3,"FileUrl":"files/assets/24496958/1/icon_uniforms.png?t=c3758c33624d5e93f69598d848c1f222"},"Wasabi":{"CityPoints":16,"CityPrice":450,"Class":"Crop","ProximityBonus":"Water","ProximityPenalty":"Shady","ProximityReverse":true,"Req1":"Water","Req2":"none","Req3":"none","Time0":240,"Time1":240,"Time2":120,"Time3":60,"Value1":3,"Value2":0,"Value3":0,"FileUrl":"files/assets/128573671/1/icon_wasabi.png?t=b8c310e3810a8febf19efd084e1b9ccf"},"Water":{"CityPoints":1,"CityPrice":50,"Class":"Natural","ProximityBonus":"None","ProximityPenalty":"Dirty","ProximityReverse":false,"Req1":"none","Req2":"none","Req3":"none","Time0":30,"Time1":60,"Time2":120,"Time3":240,"Value1":0,"Value2":0,"Value3":0,"FileUrl":"files/assets/24496953/1/icon_water.png?t=f7dfc58adc3d81b7b2d6efdc11bb71c2"},"Water_Drum":{"CityPoints":1,"CityPrice":50,"Class":"Produced","ProximityBonus":"Water","ProximityPenalty":"Dirty","ProximityReverse":false,"Req1":"Water","Req2":"none","Req3":"none","Time0":30,"Time1":60,"Time2":120,"Time3":240,"Value1":3,"Value2":0,"Value3":0,"FileUrl":"files/assets/32374821/1/icon_waterDrum.png?t=06ee1896b7c3fbbe42b747d31adf4f15"},"Water_Facility_Speed":{"CityPoints":0,"CityPrice":0,"Class":"Bonus","ProximityBonus":"Water_Drum","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Cash","Req2":"Water_Drum","Req3":"none","Time0":600,"Time1":1200,"Time2":2400,"Time3":4800,"Value1":75000000,"Value2":100,"Value3":0,"FileUrl":"files/assets/121729522/1/icon_waterFacilitySpeed.png?t=e8211da3502678c619ac1fafd2ea99be"},"Wax":{"CityPoints":170,"CityPrice":2000,"Class":"Natural","ProximityBonus":"Nectar","ProximityPenalty":"Dirty","ProximityReverse":false,"Req1":"Nectar","Req2":"Lumber","Req3":"Ceramic_Bowl","Time0":60,"Time1":120,"Time2":240,"Time3":480,"Value1":3,"Value2":1,"Value3":1,"FileUrl":"files/assets/94518237/1/icon_wax.png?t=43cf28f5a93b281c67779ceea842c9fa"},"Wheat":{"CityPoints":1,"CityPrice":300,"Class":"Crop","ProximityBonus":"Water","ProximityPenalty":"Dirty,Salty,Shady","ProximityReverse":false,"Req1":"Water","Req2":"none","Req3":"none","Time0":20,"Time1":40,"Time2":80,"Time3":160,"Value1":3,"Value2":0,"Value3":0,"FileUrl":"files/assets/24496952/1/icon_wheat.png?t=98cdc630e5951ef3f4b7cab7e504e6ad"},"White_Rice":{"CityPoints":40,"CityPrice":1700,"Class":"Crafted","ProximityBonus":"Energy","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Husk_Rice","Req2":"Energy","Req3":"none","Time0":30,"Time1":60,"Time2":120,"Time3":240,"Value1":2,"Value2":1,"Value3":0,"FileUrl":"files/assets/126666838/1/icon_whiteRice.png?t=4fd8a59d0b981cf4835cab616b136f27"},"Wild_Salmon":{"CityPoints":620,"CityPrice":19000,"Class":"Fish","ProximityBonus":"Energy","ProximityPenalty":"Dirty","ProximityReverse":false,"Req1":"Fish_Chum","Req2":"Energy","Req3":"none","Time0":180,"Time1":360,"Time2":720,"Time3":1440,"Value1":1,"Value2":4,"Value3":0,"FileUrl":"files/assets/127807564/1/icon_wildSalmon.png?t=6789450e261a0b82da0ee22dbf7cc01c"},"Wine_Bottle":{"CityPoints":126,"CityPrice":12800,"Class":"Produced","ProximityBonus":"Silica,Chromium,Limestone","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Silica","Req2":"Chromium","Req3":"Limestone","Time0":60,"Time1":120,"Time2":240,"Time3":480,"Value1":3,"Value2":1,"Value3":1,"FileUrl":"files/assets/43726743/1/icon_wineBottle.png?t=04041ab6c35dc173822c370af9467f49"},"Wood":{"CityPoints":1,"CityPrice":250,"Class":"Timber","ProximityBonus":"Water","ProximityPenalty":"Dirty,Salty,Shady","ProximityReverse":false,"Req1":"Water","Req2":"none","Req3":"none","Time0":60,"Time1":120,"Time2":240,"Time3":480,"Value1":5,"Value2":0,"Value3":0,"FileUrl":"files/assets/24496903/1/icon_wood.png?t=5813663b26908d759b293a10d5557cca"},"Wooden_Box":{"CityPoints":14,"CityPrice":2400,"Class":"Produced","ProximityBonus":"Energy","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Lumber","Req2":"Wood","Req3":"Energy","Time0":120,"Time1":240,"Time2":480,"Time3":960,"Value1":1,"Value2":2,"Value3":2,"FileUrl":"files/assets/98540676/1/icon_woodenBox.png?t=1fb2113cc405373782b3fddbd72d02d3"},"Wool":{"CityPoints":28,"CityPrice":3750,"Class":"Crafted","ProximityBonus":"Water","ProximityPenalty":"Dirty","ProximityReverse":false,"Req1":"Feed","Req2":"Wood","Req3":"Water","Time0":60,"Time1":120,"Time2":240,"Time3":480,"Value1":8,"Value2":1,"Value3":5,"FileUrl":"files/assets/24496950/1/icon_wool.png?t=70a6c832dbf65cc405378ad00a0fbac9"},"Wool_Yarn":{"CityPoints":215,"CityPrice":14750,"Class":"Produced","ProximityBonus":"Energy","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Wool","Req2":"Lumber","Req3":"Energy","Time0":60,"Time1":120,"Time2":240,"Time3":480,"Value1":5,"Value2":1,"Value3":1,"FileUrl":"files/assets/24496900/1/icon_yarn.png?t=40ca00c8293fe3c12489901c58e00dad"},"Worms":{"CityPoints":8,"CityPrice":250,"Class":"Crop","ProximityBonus":"Water","ProximityPenalty":"Dirty,Salty","ProximityReverse":false,"Req1":"Husk_Rice","Req2":"Water","Req3":"none","Time0":30,"Time1":60,"Time2":120,"Time3":240,"Value1":2,"Value2":1,"Value3":0,"FileUrl":"files/assets/128779922/1/icon_worms.png?t=8d5d492b004261bcbb7b5cef358c3432"}};

    const correctionNames = {
        "Tomatoes": "Tomato",
        "Cheese_Pizza": "Four_Cheese_Pizza",
    }

    function ConvertCorrectionName(name) {
        return !correctionNames[name] ? name : correctionNames[name];
    }

    let editVisualizerObserver = new MutationObserver(function(mutations) {
        if (document.querySelector("#MainGrid") != null) {
            editVisualizerObserver.disconnect();
            EditVisualizer();
        }
    });
    editVisualizerObserver.observe(document, {attributes: true, childList: true , subtree: true});

    const defaultTownGuideFilename = 'TownGuideBuild';
    const localLayoutName = 'visualizer_layout';
    let canUpdateLocalLayout = false;

    let loadAfterTsvOperationObserver = new MutationObserver(function(mutations) {
        if (document.querySelector('.TSV_Operation') != null) {
            loadAfterTsvOperationObserver.disconnect();

            var contentText = "";
            const txtArea = createEmbedElm("<textarea id=\"display-txtArea\" rows=\"51\" cols=\"35\"></textarea>", "div-display-txtArea", "display-txtArea", contentText, null);
            const newContainer = document.createElement('div');
            newContainer.className = 'TSV_Operation_DisplayInfo';
            newContainer.style.paddingTop = '.1rem';
            newContainer.style.display = 'grid';
            newContainer.style.gridColumn = '3/3';
            newContainer.style.gridRow = '1/6';
            newContainer.appendChild(txtArea);
            document.querySelector('.maincontainer').appendChild(newContainer);

            LoadTownGuideEuSupport();
            LoadStagesSupport();
            LoadNewLayoutButton();

            canUpdateLocalLayout = true;

            const layout = GM_getValue(localLayoutName);

            if (layout) {
                document.querySelector('#importexport').value = JSON.stringify(layout);
                importGrid();
            } else {
                LoadStages();
            }
            RightClickRemoveBuilding();
        }
    });
    loadAfterTsvOperationObserver.observe(document, {attributes: true, childList: true , subtree: true});

    function AddCss(name, style) {
        let styleElement = document.createElement('style');
        styleElement.type = 'text/css';
        styleElement.textContent = name + ' {' + style + '}';
        document.getElementsByTagName('head')[0].appendChild(styleElement);
    }

    function AddFunction(name, content) {
        let scriptElement = document.createElement('script');
        scriptElement.type = 'text/javascript';
        scriptElement.textContent = 'function ' + name + ' {' + content + '}';
        document.getElementsByTagName('head')[0].appendChild(scriptElement);
    }

    // CSS
    AddCss('.buildingmenu', 'overflow-y: scroll;');
    AddCss('.tileinfo', 'overflow-y: scroll;');
    AddCss('.cell', 'position: relative;');
    AddCss('.proximity-display', 'position: absolute; font-size: 16px; color: white; text-shadow: black 0 0 3px; top: 0; left: 0; pointer-events: none;');
    AddCss('.reciperow', 'grid-template-columns: 1fr 6fr 2fr!important;');
    AddCss('.recipeheader', 'position: relative; line-height: 22px;');
    AddCss('.recipecraft', 'height:100%; margin: auto 2px auto 5px;');
    AddCss('.recipetitle', 'position: absolute; width: 80%; white-space: nowrap;');
    AddCss('.recipeimage', 'width: auto; height: 23px; vertical-align: middle;');
    AddCss('.recipetimer', 'grid-column: 2 / 4;');
    AddCss('.cellcraft', 'position: absolute; z-index: 1; height: 24px; width: 24px; object-fit: contain; left: -2px; bottom: 0; -webkit-filter: drop-shadow(1px 1px 4px #666); filter: drop-shadow(1px 1px 4px #666);');
    AddCss('.categories','grid-template-columns: repeat(7, 1fr)!important;');
    AddCss('.buildingmenu','grid-template-rows: 0fr 6fr!important;');
    AddCss('#Fishing','filter: brightness(100);-filter-webkit: brightness(100);');
    AddCss('#addon-version','position: absolute; right: 0; bottom: 0; padding: 5px; pointer-events: none;');
    AddCss('#town-guide-eu-container input', 'margin-right: 4px;');
    AddCss('#stages-body div.stage, #stage-control-container div, #add-stage-container div', 'display: inline-block; padding: 0px 8px; margin: 1px; font-size: 14px; font-weight: 400; line-height: 1.42857143; text-align: center; white-space: nowrap; vertical-align: middle; -ms-touch-action: manipulation; touch-action: manipulation; cursor: pointer; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; background-image: none; border: 1px solid transparent; border-radius: 4px; text-decoration: none;color: #000; background-color: #eee; border-color: #666;');
    AddCss('#stages-body div.stage:hover, #stage-control-container div:hover, #add-stage-container div:hover', 'background-color: #ddd;');
    AddCss('#stages-body div.stage.active', 'background-color: #333; color: #ccc;');
    AddCss('#stage-info-container', 'height: 24px;');
    AddCss('#stage-import-export-container input', 'margin-right: 4px;');
    AddCss('.tileinfobody', 'padding-left: 2px!important;');
    AddCss('#stage-control-container', 'text-align: right;');
    AddCss('#stage-control-container div', 'width: 24px; height: 24px;padding:0;');
    AddCss('#stage-delete, #add-stage-div', 'background-size: cover; background-origin: content-box; padding: 2px!important; background-repeat: no-repeat!important; width: 20px!important; height: 20px!important;');
    AddCss('#stage-delete', 'background-image: url("https://cdn-icons-png.flaticon.com/512/1214/1214428.png")!important;');
    AddCss('#add-stage-container', 'display: inline-block;');
    AddCss('#add-stage-name', 'width: 115px;');
    AddCss('#add-stage-div', 'background-image: url("https://cdn-icons-png.flaticon.com/512/2997/2997933.png")!important; width:16px!important; height:16px!important;');
    AddCss('.startingtemplatecontrols', 'position: relative;');
    AddCss('#new-layout', 'position: absolute; right: 0; margin-right: 4px; color: #fff; background-color: red; cursor: pointer;');

    function LoadNewLayoutButton() {
        const newLayoutButton = document.createElement('input');
        newLayoutButton.id = 'new-layout';
        newLayoutButton.type = 'button';
        newLayoutButton.value = 'RESET';
        newLayoutButton.onclick = function() {
            if (confirm("This will reset local cache layout, and start as a new layout.  Are you sure?") == true) {
                NewLayout();
            }
        }

        document.querySelector('.startingtemplatecontrols').appendChild(newLayoutButton);
    }

    function NewLayout() {
        grid = {
            name: "4x4",
            defaultType: "Grass",
            grid: [],
            northborder: "none",
            southborder: "none",
            eastborder: "none",
            westborder: "none",
            stages: [],
            stageIndex: null,
            filename: defaultTownGuideFilename,
        };
        exportGrid = {
            name: "export",
            defaultType: "Grass",
            grid: [],
            northborder: "none",
            southborder: "none",
            eastborder: "none",
            westborder: "none",
            stages: [],
            stageIndex: null,
            filename: defaultTownGuideFilename,
        };
        templateGrid = {
            name: "export",
            defaultType: "Grass",
            grid: [],
            northborder: "none",
            southborder: "none",
            eastborder: "none",
            westborder: "none",
            stages: [],
            stageIndex: null,
            filename: defaultTownGuideFilename,
        };
        overlayMode = "none";
        dimension = 16;
        selected = "";
        selectedBuilding = "";
        biome = "Forest";
        direction = "north";
        document.querySelector('#biomes').value = biome;
        document.querySelector('#directons').value = direction;
        initialize();
        renderBorders();
        ClearArray(stages);
        LoadStages();
        updateExportGrid();
        importGrid();
    }

    const stages = [];

    function LoadStagesSupport() {
        const stagesContainer = document.createElement('div');
        stagesContainer.id = 'stages-container';

        // stages header
        const header = document.createElement('div');
        header.id = 'stages-header';
        header.textContent = 'Stages';
        stagesContainer.appendChild(header);

        // stages body
        const stageBody = document.createElement('div');
        stageBody.id = 'stages-body';

        stagesContainer.appendChild(stageBody);
        const mainContainer = document.querySelector('.maincontainer');
        mainContainer.appendChild(stagesContainer);

        const stageInfoContainer = document.createElement('div');
        stageInfoContainer.id = 'stage-info-container';

        // stage-manage-container
        const stageManageContainer = document.createElement('div');
        stageManageContainer.id = 'stage-manage-container';

        const stageControlContainer = document.createElement('div');
        stageControlContainer.id = 'stage-control-container';

        const stageMoveUp = document.createElement('div');
        stageMoveUp.id = 'stage-move-up';
        stageMoveUp.textContent = '<';
        stageMoveUp.onclick = function() {
            MoveActiveStageUp();
        };
        stageControlContainer.appendChild(stageMoveUp);

        const stageMoveDown = document.createElement('div');
        stageMoveDown.id = 'stage-move-down';
        stageMoveDown.textContent = '>';
        stageMoveDown.onclick = function() {
            MoveActiveStageDown();
        };
        stageControlContainer.appendChild(stageMoveDown);

        const stageDelete = document.createElement('div');
        stageDelete.id = 'stage-delete';
        stageDelete.onclick = function() {
            DeleteActiveStage();
        };
        stageControlContainer.appendChild(stageDelete);

        stageManageContainer.appendChild(stageControlContainer);

        const stageNameHeader = document.createElement('div');
        stageNameHeader.id = 'stage-name-header';
        stageNameHeader.textContent = 'Name';
        stageManageContainer.appendChild(stageNameHeader);

        const stageNameInput = document.createElement('input');
        stageNameInput.id = 'stage-name';
        stageNameInput.type = 'text';
        stageNameInput.placeholder = 'Stage Name Here';
        stageNameInput.onchange = function() {
            UpdateActiveStageName(this.value);
        };
        stageManageContainer.appendChild(stageNameInput);

        stageInfoContainer.appendChild(stageManageContainer);

        // stage-import-export-container
        const stageImportExportContainer = document.createElement('div');
        stageImportExportContainer.id = 'stage-import-export-container';

        const stageImportExportHeader = document.createElement('div');
        stageImportExportHeader.id = 'stage-import-export-header';
        stageImportExportHeader.textContent = 'Layout';
        stageImportExportContainer.appendChild(stageImportExportHeader);

        const stageImportExportInputText = document.createElement('input');
        stageImportExportInputText.id = 'stage-import-export';
        stageImportExportInputText.type = 'text';
        stageImportExportInputText.placeholder = 'place here';
        stageImportExportInputText.style.width = '65px';
        stageImportExportContainer.appendChild(stageImportExportInputText);

        const stageImportExportCopy = document.createElement('input');
        stageImportExportCopy.id = 'stage-import-export-copy';
        stageImportExportCopy.type = 'button';
        stageImportExportCopy.value = 'Copy';
        stageImportExportCopy.onclick = function() {
            StageCopyToClipboard();
        };
        stageImportExportContainer.appendChild(stageImportExportCopy);

        const stageImportExportLoad = document.createElement('input');
        stageImportExportLoad.id = 'stage-import-export-load';
        stageImportExportLoad.type = 'button';
        stageImportExportLoad.value = 'Load';
        stageImportExportLoad.onclick = function() {
            StageImportGrid();
        };
        stageImportExportContainer.appendChild(stageImportExportLoad);

        stageInfoContainer.appendChild(stageImportExportContainer);

        document.querySelector('.tileinfobody').appendChild(stageInfoContainer);

        HideStageInfo();
    }

    function StageCopyToClipboard() {
        const copyText = document.querySelector("#stage-import-export");
        copyText.select();
        // copyText.setSelectionRange(0, 99999); /*For mobile devices*/
        document.execCommand("copy");
    }

    function StageImportGrid() {
        const index = GetActiveStageIndex();
        const importExport = document.querySelector("#stage-import-export").value;
        stages[index].grid = JSON.parse(importExport);
        SetGridByStage(stages[index]);
        renderGrid();
    }

    function MoveActiveStageUp() {
        const index = GetActiveStageIndex();
        if (
            index >= 0
            && index != 0
        ) {
            const previousIndex = index - 1;
            const previousStage = stages[previousIndex];
            const currentStage = stages[index];
            stages[previousIndex] = currentStage;
            stages[index] = previousStage;
            LoadStages();
            SetActiveStage(previousIndex);
        }
    }

    function MoveActiveStageDown() {
        const index = GetActiveStageIndex();
        if (
            index >= 0
            && index < stages.length - 1
        ) {
            const nextIndex = index + 1;
            const nextStage = stages[nextIndex];
            const currentStage = stages[index];
            stages[nextIndex] = currentStage;
            stages[index] = nextStage;
            LoadStages();
            SetActiveStage(nextIndex);
        }
    }

    function DeleteActiveStage() {
        const index = GetActiveStageIndex();
        if (
            index >= 0
            && index <= stages.length - 1
        ) {
            stages.splice(index,1);
            LoadStages();
            const newLastIndex = stages.length - 1;
            const newIndex = index < newLastIndex ? index : newLastIndex;
            SetActiveStage(newIndex);
        }
    }

    function LoadStages() {
        const stageBody = document.querySelector('#stages-body');
        ClearChildren(stageBody);

        if (stages.length <= 0) {
            // initialize stage.
            SetStageData(0, "First", grid.grid);
        }
        stages.forEach((stage, index) => {
            const stageDiv = document.createElement('div');
            stageDiv.id = 'stage-' + index;
            stageDiv.classList.add('stage');
            stageDiv.textContent = stage.name;
            stageDiv.onclick = function() {
                SetActiveStage(index);
            };
            stageBody.appendChild(stageDiv);
        });
        // Add new stage
        const addStageContainer = document.createElement('div');
        addStageContainer.id = 'add-stage-container';

        const addStageName = document.createElement('input');
        addStageName.id = 'add-stage-name';
        addStageName.type = 'text';
        addStageName.placeholder = 'New Stage Name';
        addStageContainer.appendChild(addStageName);

        const addStageButton = document.createElement('div');
        addStageButton.id = 'add-stage-div';
        addStageButton.onclick = function() {
            AddNewStage();
        };
        addStageContainer.appendChild(addStageButton);

        stageBody.appendChild(addStageContainer);
        SetActiveStage(stages.length - 1);
        updateExportGrid();
    }

    function AddNewStage() {
        const name = document.querySelector('#add-stage-name').value;
        if (name.length > 0) {
            const index = GetActiveStageIndex();
            const stage = {...stages[index]};
            const newIndex = index + 1;
            stage.name = name;
            stages.splice(newIndex, 0, stage);
            LoadStages();
            SetActiveStage(newIndex);
        }
    }

    function UpdateActiveStageName(name) {
        if (name.length > 0) {
            const index = GetActiveStageIndex();
            stages[index].name = name;
            LoadStages();
            SetActiveStage(index);
        }
    }

    function HideStageInfo() {
        document.querySelector('#stage-info-container').style.display = "none";
    }

    function ShowStageInfo() {
        document.querySelector('#stage-info-container').style.display = "";
    }

    function GetActiveStageIndex() {
        let activeStageDiv = null;

        const stageDivs = document.querySelectorAll('div.stage');
        stageDivs.forEach(div => {
            if (div.classList.contains('active')) {
                activeStageDiv = div;
            }
        });

        let index = 0;

        if (activeStageDiv) {
            index = parseInt(activeStageDiv.id.replace('stage-', ''));
        } else {
            index = grid.stageIndex;
        }

        return index;
    }

    function SetActiveStage(index) {
        const stageDivs = document.querySelectorAll('div.stage');
        stageDivs.forEach(div => {
            div.classList.remove('active');
        });

        const lastStageIndex = stages.length - 1;

        if (
            index <= lastStageIndex
            && index >= 0
        ) {
            if (document.querySelector('#stage-' + index)) {
                document.querySelector('#stage-' + index).classList.add('active');
            }

            // clear tile info content
            ClearChildren(document.querySelector('.tileinfopic'));
            const tileInfoTile = document.querySelector('.tileinfotitle');
            ClearChildren(tileInfoTile);
            tileInfoTile.textContent = 'Stage Info';
            ClearChildren(document.querySelector('.recipes'));

            ShowStageInfo();
            document.querySelector('#stage-name').value = stages[index].name;
            document.querySelector('#stage-import-export').value = JSON.stringify(stages[index].grid);

            if (
                index != grid.stageIndex
                || index == lastStageIndex
            ) {
                grid.stageIndex = index;

                SetGridByStage(stages[index]);
                renderGrid();
            }
        }
    }

    function SetGridByStage(stage) {
        grid.grid = stage.grid.map((cell) => {
            let gridCell = {
                type: cell.type,
                edgeSatisfied: true,
            };
            if (cell.craft) {
                gridCell.craft = cell.craft;
            }
            return gridCell;
        });
    }

    function SetStageByGrid() {
        const index = GetActiveStageIndex();

        if (index >= 0) {
            stages[index].grid = grid.grid.map((cell) => {
                let gridCell = {
                    type: cell.type,
                };
                if (cell.craft) {
                    gridCell.craft = cell.craft;
                }
                return gridCell;
            });
        }
    }

    function ClearChildren(element) {
        element.replaceChildren();
    }

    function ClearArray(array) {
        array.length = 0;
    }

    function LoadTownGuideEuSupport() {
        const townGuideEuContainer = document.createElement('div');
        townGuideEuContainer.id = 'town-guide-eu-container';

        // town-guide.eu header
        const header = document.createElement('div');
        header.id = 'town-guide-eu-header';
        header.textContent = 'town-guide.eu Compatible';
        townGuideEuContainer.appendChild(header);

        // town-guide.eu filename
        const inputFilename = document.createElement('input');
        inputFilename.id = "town-guide-eu-filename";
        inputFilename.type = "text";
        inputFilename.placeholder = "Filename";
        inputFilename.value = defaultTownGuideFilename;
        inputFilename.style.width = "115px";
        inputFilename.onchange = function() {
            grid.filename = this.value;
        };
        townGuideEuContainer.appendChild(inputFilename);

        // town-guide.eu save
        const inputSave = document.createElement('input');
        inputSave.id = "town-guide-eu-save";
        inputSave.type = "button";
        inputSave.value = "Save";
        inputSave.onclick = function () {
            const filename = document.querySelector('#town-guide-eu-filename').value;
            const layout = GetTownGuideEuLayout(filename);
            const blob = new Blob(
                [JSON.stringify(layout)],
                { type: "text/plain;charset=utf-8" }
            );
            const url = URL.createObjectURL(blob);
            const file = document.createElement(`a`);
            file.download = filename + ".txt";
            file.href = url;
            document.body.appendChild(file);
            file.click();
            file.remove();
            URL.revokeObjectURL(url);
        };
        townGuideEuContainer.appendChild(inputSave);

        // town-guide.eu load
        const fileLoad = document.createElement('input');
        fileLoad.id = "town-guide-eu-file-load";
        fileLoad.type = "file";
        fileLoad.accept = ".txt";
        fileLoad.style.display = "none";
        fileLoad.addEventListener('change', (event) => {
            const fileList = event.target.files;
            ReadTextFile(fileList[0]);
            event.target.value = "";
        });
        const inputLoad = document.createElement('input');
        inputLoad.id = "town-guide-eu-load";
        inputLoad.type = "button";
        inputLoad.value = "Load";
        inputLoad.onclick = function () {
            fileLoad.click();
        };
        townGuideEuContainer.appendChild(inputLoad);

        const mainContainer = document.querySelector('.maincontainer');
        mainContainer.appendChild(townGuideEuContainer);
    }

    function ReadTextFile(file) {
        // Check if the file is an image.
        if (file.type && !file.type.startsWith('text/')) {
            alert('File is not a text.', file.type, file);
            console.log('File is not a text.', file.type, file);
            return;
        }

        const reader = new FileReader();
        reader.addEventListener('load', (event) => {
            const layout = JSON.parse(reader.result);
            SetFromTownGuideEu(layout);
        });
        reader.readAsText(file);
    }

    function GetTownGuideEuLayout(fileName) {
        const validTownGuideEuBiomes = ["forest", "plains", "desert"];
        const biome = document.querySelector("#biomes").value.toLowerCase();
        // Default layout structure
        const layout = {
            "borders": {
                "North": GetTownGuideEuBorderType(grid.northborder),
                "East": GetTownGuideEuBorderType(grid.eastborder),
                "South": GetTownGuideEuBorderType(grid.southborder),
                "West": GetTownGuideEuBorderType(grid.westborder),
            },
            "biome": validTownGuideEuBiomes.includes(biome) ? biome : "forest",
            "name": fileName,
            "stages": [],
            "stageIndex": grid.stageIndex,
            "filename": grid.filename,
        };

        stages.forEach((stage, index) => {
            layout.stages[index] = {
                "index": index,
                "bank": 0,
                "name": stage.name,
                "limits": {},
                "board": GetTownGuideEuBoard(stage),
            };
        });

        return layout
    }

    function GetTownGuideEuBoard(stage) {
        const grid = stage.grid;
        const board = {};
        Object.keys(grid).forEach(key => {
            const z = Math.floor(key / 16);
            const x = key - (z * 16);
            const boardKey = "(" + x + ".0,0.0," + z + ".0)";
            board[boardKey] = { "type": grid[key].type };
            if (grid[key].craft) {
                board[boardKey].data = {
                    "craft": grid[key].craft,
                    "state": "Complete"
                };
            }
        });
        return board;
    }

    function GetTownGuideEuBorderType(visualizerBorder) {
        return visualizerBorder == "none" ? "OpenWorld" : visualizerBorder;
    }

    function GetVisualizerBorderType(townGuideEuBorder) {
        return townGuideEuBorder == "OpenWorld" ? "none" : townGuideEuBorder;
    }

    function SetFromTownGuideEu(townGuideEuLayoutObject) {
        grid.northborder = GetVisualizerBorderType(townGuideEuLayoutObject.borders.North);
        grid.southborder = GetVisualizerBorderType(townGuideEuLayoutObject.borders.South);
        grid.eastborder = GetVisualizerBorderType(townGuideEuLayoutObject.borders.East);
        grid.westborder = GetVisualizerBorderType(townGuideEuLayoutObject.borders.West);
        grid.defaultType = "Grass";
        grid.grid = templateGrid.grid;
        grid.filename = townGuideEuLayoutObject.name;
        document.querySelector('#town-guide-eu-filename').value = grid.filename;

        ClearArray(stages);
        const layoutStages = townGuideEuLayoutObject.stages;

        layoutStages.forEach((stage, index) => {
            const grid = [];
            const board = stage.board;
            for (let i = 0; i < dimension; i++) {
                for (let j = 0; j < dimension; j++) {
                    const cell = board[`(${j}.0,0.0,${i}.0)`];
                    grid.push({
                        type: ConvertCorrectionName(cell.type),
                        craft: ConvertCorrectionName(cell.data?.craft),
                    });
                }
            }
            SetStageData(index, stage.name, grid);
        });

        renderBorders();
        LoadStages();
    }

    function SetStageData(index, name, grid) {
        const filteredGrid = grid.map((cell) => {
            let gridCell = { type: ConvertCorrectionName(cell.type) };
            if (cell.craft) {
                gridCell.craft = ConvertCorrectionName(cell.craft);
            }
            return gridCell;
        });
        stages[index] = {
            name: name,
            grid: filteredGrid,
        }
    }

    // Right click remove building.
    function RightClickRemoveBuilding() {
        const cells = document.querySelectorAll(".cell");

        for (let i = 0, n = cells.length; i < n; i++) {
            const cell = cells[i];
            cell.addEventListener("contextmenu", (e) => {
                e.preventDefault();
                selected = cell.id;
                placeTile("remove");
                renderStats();
                renderGrid();
            });
        }
    }

    // SCRIPT
    AddFunction('getCraftIcon(craft)',
        "return getFullURL(recipes[craft]?.FileUrl);"
    );
    AddFunction('setCellCraft(cellIndex, craft)',
        "grid.grid[cellIndex].craft = craft;" +
        "renderCellCraft(cellIndex);"
    );
    AddFunction('renderCellCraft(cellIndex)',
        "const cellElement = document.querySelector('#cell' + cellIndex);" +
        "if (cellElement) {" +
            "const cellImages = cellElement.querySelectorAll('img.cellcraft');" +
            "if (cellImages.length > 0) {" +
                "cellImages.forEach(element => {" +
                    "element.remove();" +
                "})" +
            "}" +
            "const cell = grid.grid[cellIndex];" +
            "if (cell.craft) {" +
                "let cellCraft = document.createElement('img');" +
                "cellCraft.classList.add('cellcraft');" +
                "cellCraft.src = getCraftIcon(cell.craft);" +
                "cellElement.appendChild(cellCraft);" +
            "}" +
        "}" +
        ""
    );
    AddFunction('removeSpecialCharacter(string)',
        "return string.replace(/'/g, '').replace(/\"/g, '');"
    );

    function IsEmptyObject(object) {
        return object
        && Object.keys(object).length === 0
        && Object.getPrototypeOf(object) === Object.prototype
    }

    function EditVisualizer() {
        copyToClipboard = function () {
            const copyText = document.querySelector('#importexport');
            copyText.select();
            // copyText.setSelectionRange(0, 999999);
            document.execCommand("copy");
        }

        // Overwrite selectBorder
        selectBorder = function (border) {
            var index = borderTypes.indexOf(grid[border]);

            index++;
            if (index > borderTypes.length - 1) index = 0;
            var newBorderType = borderTypes[index];
            grid[border] = newBorderType;
            renderBorders();
            renderGrid();
            renderStats();
            updateExportGrid();
        }

        // Default maps
        maps = {
            "Forest": {
                "north": [{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Grass"},{"type":"Trade_Depot"},{"type":"Fuel_Storage"},{"type":"Builder_House"},{"type":"Tree"},{"type":"Tree"},{"type":"Tree"},{"type":"Tree"},{"type":"Tree"},{"type":"Tree"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Dirt_Road"},{"type":"Dirt_Road"},{"type":"Dirt_Road"},{"type":"Dirt_Road"},{"type":"Wood_Shed"},{"type":"Grass"},{"type":"Grass"},{"type":"Tree"},{"type":"Tree"},{"type":"Tree"},{"type":"Grass"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Tree"},{"type":"Dirt_Road"},{"type":"Silo"},{"type":"Tree"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Tree"},{"type":"Tree"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Rock"},{"type":"Grass"},{"type":"Grass"},{"type":"Dirt_Road"},{"type":"Grass"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Wheat_Field"},{"type":"Wheat_Field"},{"type":"Dirt_Road"},{"type":"Dirt_Road"},{"type":"Dirt_Road"},{"type":"Farm_House"},{"type":"Grass"},{"type":"Tree"},{"type":"Tree"},{"type":"Marsh"},{"type":"Tree"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Marsh"},{"type":"Pond"},{"type":"Well"},{"type":"Storehouse"},{"type":"Tree"},{"type":"Grass"},{"type":"Rock"},{"type":"Pond"},{"type":"Pond"},{"type":"Grass"},{"type":"Grass"},{"type":"Marsh"},{"type":"Tree"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Marsh"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Marsh"},{"type":"Pond"},{"type":"Tree"},{"type":"Grass"},{"type":"Tree"},{"type":"Marsh"},{"type":"Pond"},{"type":"Rock"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Pasture"},{"type":"Grass"},{"type":"Grass"},{"type":"Tree"},{"type":"Marsh"},{"type":"Grass"},{"type":"Grass"},{"type":"Tree"},{"type":"Marsh"},{"type":"Pond"},{"type":"Pond"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Grass"},{"type":"Marsh"},{"type":"Tree"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Tree"},{"type":"Marsh"},{"type":"Pond"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Marsh"},{"type":"Grass"},{"type":"Marsh"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Grass"},{"type":"Marsh"},{"type":"Grass"},{"type":"Grass"},{"type":"Pasture"},{"type":"Grass"},{"type":"Rock"},{"type":"Tree"},{"type":"Tree"},{"type":"Marsh"},{"type":"Pond"},{"type":"Tree"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Tree"},{"type":"Marsh"},{"type":"Grass"},{"type":"Marsh"},{"type":"Pond"},{"type":"Pond"},{"type":"Marsh"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Grass"},{"type":"Marsh"},{"type":"Pond"},{"type":"Tree"},{"type":"Grass"},{"type":"Marsh"},{"type":"Marsh"},{"type":"Rock"},{"type":"Tree"},{"type":"Grass"},{"type":"Tree"},{"type":"Tree"},{"type":"Tree"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Marsh"},{"type":"Pond"},{"type":"Pond"},{"type":"Tree"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Grass"},{"type":"Marsh"},{"type":"Marsh"},{"type":"Tree"},{"type":"Grass"},{"type":"Tree"},{"type":"Tree"},{"type":"Grass"},{"type":"Tree"},{"type":"Tree"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Grass"},{"type":"Tree"},{"type":"Tree"},{"type":"Grass"},{"type":"Grass"},{"type":"Tree"},{"type":"Tree"}],
                "east": [{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Tree"},{"type":"Tree"},{"type":"Tree"},{"type":"Tree"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Tree"},{"type":"Tree"},{"type":"Tree"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Tree"},{"type":"Tree"},{"type":"Tree"},{"type":"Grass"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Grass"},{"type":"Tree"},{"type":"Tree"},{"type":"Grass"},{"type":"Tree"},{"type":"Rock"},{"type":"Marsh"},{"type":"Grass"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Tree"},{"type":"Tree"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Marsh"},{"type":"Pond"},{"type":"Marsh"},{"type":"Tree"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Grass"},{"type":"Marsh"},{"type":"Grass"},{"type":"Pasture"},{"type":"Grass"},{"type":"Tree"},{"type":"Tree"},{"type":"Grass"},{"type":"Grass"},{"type":"Tree"},{"type":"Tree"},{"type":"Marsh"},{"type":"Tree"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Marsh"},{"type":"Pond"},{"type":"Marsh"},{"type":"Pasture"},{"type":"Grass"},{"type":"Grass"},{"type":"Rock"},{"type":"Tree"},{"type":"Grass"},{"type":"Grass"},{"type":"Marsh"},{"type":"Pond"},{"type":"Marsh"},{"type":"Grass"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Marsh"},{"type":"Grass"},{"type":"Grass"},{"type":"Pasture"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Farm_House"},{"type":"Silo"},{"type":"Wood_Shed"},{"type":"Dirt_Road"},{"type":"Builder_House"},{"type":"Tree"},{"type":"Marsh"},{"type":"Pond"},{"type":"Rock"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Storehouse"},{"type":"Dirt_Road"},{"type":"Dirt_Road"},{"type":"Dirt_Road"},{"type":"Dirt_Road"},{"type":"Trade_Depot"},{"type":"Tree"},{"type":"Marsh"},{"type":"Pond"},{"type":"Pond"},{"type":"Marsh"},{"type":"Grass"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Grass"},{"type":"Well"},{"type":"Dirt_Road"},{"type":"Marsh"},{"type":"Grass"},{"type":"Dirt_Road"},{"type":"Fuel_Storage"},{"type":"Grass"},{"type":"Tree"},{"type":"Marsh"},{"type":"Pond"},{"type":"Marsh"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Grass"},{"type":"Dirt_Road"},{"type":"Pond"},{"type":"Marsh"},{"type":"Dirt_Road"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Grass"},{"type":"Marsh"},{"type":"Tree"},{"type":"Rock"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Wheat_Field"},{"type":"Wheat_Field"},{"type":"Marsh"},{"type":"Tree"},{"type":"Dirt_Road"},{"type":"Tree"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Tree"},{"type":"Rock"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Tree"},{"type":"Marsh"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Pasture"},{"type":"Grass"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Tree"},{"type":"Tree"},{"type":"Tree"},{"type":"Grass"},{"type":"Tree"},{"type":"Marsh"},{"type":"Pond"},{"type":"Tree"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Tree"},{"type":"Tree"},{"type":"Tree"},{"type":"Grass"},{"type":"Tree"},{"type":"Marsh"},{"type":"Pond"},{"type":"Marsh"},{"type":"Grass"},{"type":"Grass"},{"type":"Tree"},{"type":"Tree"},{"type":"Grass"},{"type":"Tree"},{"type":"Tree"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Grass"},{"type":"Tree"},{"type":"Tree"},{"type":"Tree"},{"type":"Marsh"},{"type":"Grass"},{"type":"Tree"},{"type":"Tree"},{"type":"Grass"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"}],
                "south": [{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Tree"},{"type":"Tree"},{"type":"Tree"},{"type":"Tree"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Tree"},{"type":"Tree"},{"type":"Tree"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Tree"},{"type":"Tree"},{"type":"Tree"},{"type":"Grass"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Grass"},{"type":"Tree"},{"type":"Tree"},{"type":"Rock"},{"type":"Tree"},{"type":"Grass"},{"type":"Marsh"},{"type":"Grass"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Tree"},{"type":"Tree"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Marsh"},{"type":"Pond"},{"type":"Marsh"},{"type":"Tree"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Grass"},{"type":"Marsh"},{"type":"Grass"},{"type":"Pasture"},{"type":"Grass"},{"type":"Tree"},{"type":"Tree"},{"type":"Grass"},{"type":"Grass"},{"type":"Tree"},{"type":"Tree"},{"type":"Marsh"},{"type":"Tree"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Marsh"},{"type":"Pond"},{"type":"Marsh"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Rock"},{"type":"Pond"},{"type":"Pond"},{"type":"Marsh"},{"type":"Grass"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Marsh"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Pasture"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Marsh"},{"type":"Pond"},{"type":"Tree"},{"type":"Grass"},{"type":"Tree"},{"type":"Marsh"},{"type":"Pond"},{"type":"Rock"},{"type":"Grass"},{"type":"Tree"},{"type":"Rock"},{"type":"Grass"},{"type":"Grass"},{"type":"Pasture"},{"type":"Grass"},{"type":"Grass"},{"type":"Tree"},{"type":"Marsh"},{"type":"Grass"},{"type":"Grass"},{"type":"Tree"},{"type":"Marsh"},{"type":"Pond"},{"type":"Pond"},{"type":"Marsh"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Tree"},{"type":"Marsh"},{"type":"Pond"},{"type":"Marsh"},{"type":"Grass"},{"type":"Grass"},{"type":"Wheat_Field"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Grass"},{"type":"Marsh"},{"type":"Tree"},{"type":"Grass"},{"type":"Grass"},{"type":"Wheat_Field"},{"type":"Dirt_Road"},{"type":"Dirt_Road"},{"type":"Dirt_Road"},{"type":"Farm_House"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Rock"},{"type":"Marsh"},{"type":"Pond"},{"type":"Dirt_Road"},{"type":"Well"},{"type":"Storehouse"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Tree"},{"type":"Marsh"},{"type":"Dirt_Road"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Pasture"},{"type":"Grass"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Tree"},{"type":"Tree"},{"type":"Tree"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Grass"},{"type":"Dirt_Road"},{"type":"Silo"},{"type":"Wood_Shed"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Tree"},{"type":"Tree"},{"type":"Tree"},{"type":"Grass"},{"type":"Dirt_Road"},{"type":"Dirt_Road"},{"type":"Dirt_Road"},{"type":"Dirt_Road"},{"type":"Dirt_Road"},{"type":"Grass"},{"type":"Tree"},{"type":"Tree"},{"type":"Grass"},{"type":"Tree"},{"type":"Tree"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Grass"},{"type":"Tree"},{"type":"Tree"},{"type":"Builder_House"},{"type":"Trade_Depot"},{"type":"Fuel_Storage"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"}],
                "west": [{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Tree"},{"type":"Tree"},{"type":"Tree"},{"type":"Tree"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Tree"},{"type":"Tree"},{"type":"Tree"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Tree"},{"type":"Tree"},{"type":"Tree"},{"type":"Grass"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Grass"},{"type":"Tree"},{"type":"Tree"},{"type":"Rock"},{"type":"Tree"},{"type":"Grass"},{"type":"Marsh"},{"type":"Grass"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Tree"},{"type":"Tree"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Farm_House"},{"type":"Grass"},{"type":"Grass"},{"type":"Marsh"},{"type":"Pond"},{"type":"Marsh"},{"type":"Tree"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Dirt_Road"},{"type":"Wood_Shed"},{"type":"Grass"},{"type":"Grass"},{"type":"Dirt_Road"},{"type":"Storehouse"},{"type":"Grass"},{"type":"Tree"},{"type":"Tree"},{"type":"Grass"},{"type":"Grass"},{"type":"Tree"},{"type":"Tree"},{"type":"Marsh"},{"type":"Tree"},{"type":"Fuel_Storage"},{"type":"Dirt_Road"},{"type":"Silo"},{"type":"Grass"},{"type":"Grass"},{"type":"Dirt_Road"},{"type":"Well"},{"type":"Grass"},{"type":"Grass"},{"type":"Rock"},{"type":"Tree"},{"type":"Grass"},{"type":"Rock"},{"type":"Pond"},{"type":"Pond"},{"type":"Marsh"},{"type":"Trade_Depot"},{"type":"Dirt_Road"},{"type":"Dirt_Road"},{"type":"Dirt_Road"},{"type":"Dirt_Road"},{"type":"Dirt_Road"},{"type":"Grass"},{"type":"Grass"},{"type":"Pasture"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Marsh"},{"type":"Pond"},{"type":"Tree"},{"type":"Grass"},{"type":"Builder_House"},{"type":"Dirt_Road"},{"type":"Grass"},{"type":"Marsh"},{"type":"Pond"},{"type":"Wheat_Field"},{"type":"Wheat_Field"},{"type":"Grass"},{"type":"Grass"},{"type":"Pasture"},{"type":"Grass"},{"type":"Grass"},{"type":"Tree"},{"type":"Marsh"},{"type":"Grass"},{"type":"Grass"},{"type":"Tree"},{"type":"Dirt_Road"},{"type":"Tree"},{"type":"Grass"},{"type":"Marsh"},{"type":"Grass"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Marsh"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Grass"},{"type":"Marsh"},{"type":"Marsh"},{"type":"Grass"},{"type":"Grass"},{"type":"Marsh"},{"type":"Pond"},{"type":"Tree"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Marsh"},{"type":"Pond"},{"type":"Pond"},{"type":"Marsh"},{"type":"Tree"},{"type":"Marsh"},{"type":"Pond"},{"type":"Pond"},{"type":"Marsh"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Tree"},{"type":"Rock"},{"type":"Pond"},{"type":"Tree"},{"type":"Grass"},{"type":"Grass"},{"type":"Marsh"},{"type":"Marsh"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Tree"},{"type":"Tree"},{"type":"Tree"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Grass"},{"type":"Marsh"},{"type":"Tree"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Rock"},{"type":"Tree"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Tree"},{"type":"Tree"},{"type":"Tree"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Tree"},{"type":"Tree"},{"type":"Grass"},{"type":"Tree"},{"type":"Tree"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Grass"},{"type":"Tree"},{"type":"Tree"},{"type":"Tree"},{"type":"Grass"},{"type":"Grass"},{"type":"Tree"},{"type":"Tree"},{"type":"Grass"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"}],
            },
            "Plains": {
                "north": [{"type":"Pasture"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Trade_Depot"},{"type":"Fuel_Storage"},{"type":"Builder_House"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Dirt_Road"},{"type":"Dirt_Road"},{"type":"Dirt_Road"},{"type":"Dirt_Road"},{"type":"Dirt_Road"},{"type":"Wood_Shed"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Dirt_Road"},{"type":"Silo"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Rock"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Dirt_Road"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Wheat_Field"},{"type":"Wheat_Field"},{"type":"Dirt_Road"},{"type":"Dirt_Road"},{"type":"Dirt_Road"},{"type":"Farm_House"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Grass"},{"type":"Grass"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Grass"},{"type":"Pond"},{"type":"Well"},{"type":"Storehouse"},{"type":"Scrub"},{"type":"Grass"},{"type":"Rock"},{"type":"Tree"},{"type":"Tree"},{"type":"Grass"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Grass"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Grass"},{"type":"Tree"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Grass"},{"type":"Tree"},{"type":"Rock"},{"type":"Grass"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Grass"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Grass"},{"type":"Tree"},{"type":"Pond"},{"type":"Grass"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Grass"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Grass"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Rock"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Grass"},{"type":"Tree"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Tree"},{"type":"Tree"},{"type":"Grass"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Grass"},{"type":"Tree"},{"type":"Rock"},{"type":"Grass"},{"type":"Grass"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Grass"},{"type":"Tree"},{"type":"Tree"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Grass"},{"type":"Grass"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Pasture"}],
                "east": [{"type":"Pasture"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Rock"},{"type":"Grass"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Grass"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Rock"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Tree"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Grass"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Farm_House"},{"type":"Silo"},{"type":"Wood_Shed"},{"type":"Dirt_Road"},{"type":"Builder_House"},{"type":"Scrub"},{"type":"Grass"},{"type":"Tree"},{"type":"Rock"},{"type":"Grass"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Storehouse"},{"type":"Dirt_Road"},{"type":"Dirt_Road"},{"type":"Dirt_Road"},{"type":"Dirt_Road"},{"type":"Trade_Depot"},{"type":"Scrub"},{"type":"Grass"},{"type":"Tree"},{"type":"Pond"},{"type":"Grass"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Well"},{"type":"Dirt_Road"},{"type":"Grass"},{"type":"Grass"},{"type":"Dirt_Road"},{"type":"Fuel_Storage"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Dirt_Road"},{"type":"Pond"},{"type":"Grass"},{"type":"Dirt_Road"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Grass"},{"type":"Scrub"},{"type":"Rock"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Wheat_Field"},{"type":"Wheat_Field"},{"type":"Grass"},{"type":"Scrub"},{"type":"Dirt_Road"},{"type":"Tree"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Rock"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Grass"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Grass"},{"type":"Tree"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Grass"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Pasture"}],
                "south": [{"type":"Pasture"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Rock"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Grass"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Grass"},{"type":"Pasture"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Grass"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Grass"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Grass"},{"type":"Rock"},{"type":"Tree"},{"type":"Tree"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Grass"},{"type":"Grass"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Grass"},{"type":"Tree"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Grass"},{"type":"Tree"},{"type":"Rock"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Rock"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Grass"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Grass"},{"type":"Pond"},{"type":"Tree"},{"type":"Grass"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Wheat_Field"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Grass"},{"type":"Scrub"},{"type":"Grass"},{"type":"Pasture"},{"type":"Wheat_Field"},{"type":"Dirt_Road"},{"type":"Dirt_Road"},{"type":"Dirt_Road"},{"type":"Farm_House"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Rock"},{"type":"Grass"},{"type":"Pond"},{"type":"Dirt_Road"},{"type":"Well"},{"type":"Storehouse"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Grass"},{"type":"Dirt_Road"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Dirt_Road"},{"type":"Silo"},{"type":"Wood_Shed"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Dirt_Road"},{"type":"Dirt_Road"},{"type":"Dirt_Road"},{"type":"Dirt_Road"},{"type":"Dirt_Road"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Builder_House"},{"type":"Trade_Depot"},{"type":"Fuel_Storage"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Pasture"}],
                "west": [{"type":"Pasture"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Rock"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Grass"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Farm_House"},{"type":"Grass"},{"type":"Pasture"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Dirt_Road"},{"type":"Wood_Shed"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Dirt_Road"},{"type":"Storehouse"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Grass"},{"type":"Scrub"},{"type":"Fuel_Storage"},{"type":"Dirt_Road"},{"type":"Silo"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Dirt_Road"},{"type":"Well"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Rock"},{"type":"Scrub"},{"type":"Grass"},{"type":"Rock"},{"type":"Tree"},{"type":"Tree"},{"type":"Grass"},{"type":"Trade_Depot"},{"type":"Dirt_Road"},{"type":"Dirt_Road"},{"type":"Dirt_Road"},{"type":"Dirt_Road"},{"type":"Dirt_Road"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Grass"},{"type":"Tree"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Builder_House"},{"type":"Dirt_Road"},{"type":"Pasture"},{"type":"Grass"},{"type":"Pond"},{"type":"Wheat_Field"},{"type":"Wheat_Field"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Grass"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Dirt_Road"},{"type":"Scrub"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Grass"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Grass"},{"type":"Grass"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Grass"},{"type":"Tree"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Grass"},{"type":"Tree"},{"type":"Pond"},{"type":"Grass"},{"type":"Scrub"},{"type":"Grass"},{"type":"Tree"},{"type":"Tree"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Rock"},{"type":"Tree"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Grass"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Grass"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Rock"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Pasture"},{"type":"Scrub"},{"type":"Pasture"}],
            },
            "Desert": {
                "north": [{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Arid"},{"type":"Trade_Depot"},{"type":"Fuel_Storage"},{"type":"Builder_House"},{"type":"Scrub"},{"type":"Arid"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Dirt_Road"},{"type":"Dirt_Road"},{"type":"Dirt_Road"},{"type":"Dirt_Road"},{"type":"Dirt_Road"},{"type":"Wood_Shed"},{"type":"Scrub"},{"type":"Arid"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Arid"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Arid"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Arid"},{"type":"Scrub"},{"type":"Dirt_Road"},{"type":"Silo"},{"type":"Arid"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Rock"},{"type":"Arid"},{"type":"Arid"},{"type":"Dirt_Road"},{"type":"Arid"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Wheat_Field"},{"type":"Wheat_Field"},{"type":"Dirt_Road"},{"type":"Dirt_Road"},{"type":"Dirt_Road"},{"type":"Farm_House"},{"type":"Arid"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Grass"},{"type":"Pond"},{"type":"Well"},{"type":"Storehouse"},{"type":"Scrub"},{"type":"Arid"},{"type":"Rock"},{"type":"Cactus"},{"type":"Cactus"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Pasture"},{"type":"Grass"},{"type":"Pasture"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Cactus"},{"type":"Scrub"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Cactus"},{"type":"Rock"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Cactus"},{"type":"Cactus"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Cactus"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Oil_Seep"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Arid"},{"type":"Cactus"},{"type":"Scrub"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Cactus"},{"type":"Cactus"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Arid"},{"type":"Cactus"},{"type":"Rock"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Arid"},{"type":"Cactus"},{"type":"Cactus"},{"type":"Scrub"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Arid"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Arid"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Arid"},{"type":"Arid"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Arid"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"}],
                "east": [{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Arid"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Arid"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Arid"},{"type":"Scrub"},{"type":"Rock"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Cactus"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Arid"},{"type":"Arid"},{"type":"Scrub"},{"type":"Cactus"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Arid"},{"type":"Cactus"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Rock"},{"type":"Scrub"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Dirt_Road"},{"type":"Scrub"},{"type":"Arid"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Farm_House"},{"type":"Silo"},{"type":"Wood_Shed"},{"type":"Dirt_Road"},{"type":"Builder_House"},{"type":"Scrub"},{"type":"Arid"},{"type":"Cactus"},{"type":"Oil_Seep"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Storehouse"},{"type":"Dirt_Road"},{"type":"Dirt_Road"},{"type":"Dirt_Road"},{"type":"Dirt_Road"},{"type":"Trade_Depot"},{"type":"Scrub"},{"type":"Arid"},{"type":"Cactus"},{"type":"Cactus"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Arid"},{"type":"Well"},{"type":"Dirt_Road"},{"type":"Grass"},{"type":"Pasture"},{"type":"Dirt_Road"},{"type":"Fuel_Storage"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Cactus"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Arid"},{"type":"Dirt_Road"},{"type":"Pond"},{"type":"Grass"},{"type":"Pasture"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Scrub"},{"type":"Rock"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Wheat_Field"},{"type":"Wheat_Field"},{"type":"Grass"},{"type":"Scrub"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Scrub"},{"type":"Rock"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Cactus"},{"type":"Scrub"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Cactus"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Arid"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Arid"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Arid"},{"type":"Arid"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Arid"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"}],
                "south": [{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Arid"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Arid"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Rock"},{"type":"Scrub"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Cactus"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Arid"},{"type":"Arid"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Arid"},{"type":"Cactus"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Oil_Seep"},{"type":"Cactus"},{"type":"Cactus"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Cactus"},{"type":"Scrub"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Cactus"},{"type":"Rock"},{"type":"Arid"},{"type":"Scrub"},{"type":"Rock"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Cactus"},{"type":"Cactus"},{"type":"Arid"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Cactus"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Wheat_Field"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Pasture"},{"type":"Wheat_Field"},{"type":"Dirt_Road"},{"type":"Dirt_Road"},{"type":"Dirt_Road"},{"type":"Farm_House"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Rock"},{"type":"Grass"},{"type":"Pond"},{"type":"Dirt_Road"},{"type":"Well"},{"type":"Storehouse"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Scrub"},{"type":"Grass"},{"type":"Dirt_Road"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Pasture"},{"type":"Dirt_Road"},{"type":"Silo"},{"type":"Wood_Shed"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Arid"},{"type":"Dirt_Road"},{"type":"Dirt_Road"},{"type":"Dirt_Road"},{"type":"Dirt_Road"},{"type":"Dirt_Road"},{"type":"Arid"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Arid"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Arid"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Builder_House"},{"type":"Trade_Depot"},{"type":"Fuel_Storage"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"}],
                "west": [{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Arid"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Arid"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Rock"},{"type":"Scrub"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Farm_House"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Cactus"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Dirt_Road"},{"type":"Wood_Shed"},{"type":"Arid"},{"type":"Arid"},{"type":"Dirt_Road"},{"type":"Storehouse"},{"type":"Arid"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Arid"},{"type":"Arid"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Arid"},{"type":"Scrub"},{"type":"Fuel_Storage"},{"type":"Dirt_Road"},{"type":"Silo"},{"type":"Arid"},{"type":"Arid"},{"type":"Dirt_Road"},{"type":"Well"},{"type":"Arid"},{"type":"Arid"},{"type":"Rock"},{"type":"Scrub"},{"type":"Arid"},{"type":"Oil_Seep"},{"type":"Cactus"},{"type":"Cactus"},{"type":"Arid"},{"type":"Trade_Depot"},{"type":"Dirt_Road"},{"type":"Dirt_Road"},{"type":"Dirt_Road"},{"type":"Dirt_Road"},{"type":"Dirt_Road"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Cactus"},{"type":"Scrub"},{"type":"Arid"},{"type":"Builder_House"},{"type":"Dirt_Road"},{"type":"Arid"},{"type":"Grass"},{"type":"Pond"},{"type":"Wheat_Field"},{"type":"Wheat_Field"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Scrub"},{"type":"Dirt_Road"},{"type":"Scrub"},{"type":"Pasture"},{"type":"Grass"},{"type":"Pasture"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Cactus"},{"type":"Scrub"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Cactus"},{"type":"Cactus"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Cactus"},{"type":"Cactus"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Scrub"},{"type":"Rock"},{"type":"Cactus"},{"type":"Scrub"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Rock"},{"type":"Scrub"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Arid"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Arid"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"},{"type":"Arid"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Arid"},{"type":"Arid"},{"type":"Scrub"},{"type":"Scrub"},{"type":"Arid"},{"type":"Arid"},{"type":"Scrub"},{"type":"Arid"}],
            },
        };

        // Overwrite getGridFromMap
        getGridFromMap = function(biome, direction) {
            return maps[biome][direction];
        }

        // Overwrite getFullURL
        getFullURL = function (assetPath) {
            let url = '';
            if (assetPath) {
                url = `https://townstar.sandbox-games.com/${assetPath}`;
                if (assetPath.substring(0,4) == "http") {
                    url = assetPath;
                }
            }
            return url;
        }

        renderBorders = function () {
            borders.forEach((bdr) => {
                templateGrid[bdr] = grid[bdr];
                $(`#${bdr}`).attr("class", `${bdr} ${grid[bdr]}`);
            });
        }

        // Overwrite renderGrid
        renderGrid = function (type) {
            if (canUpdateLocalLayout) {
                resetAllPassive();
                calculateBorderEffects();
                calculatePassiveEffects();
                calculateEdgeRequirements();
                const pageGrid = $(".gamegrid");
                for (let i = 0; i < grid.grid.length; i++) {
                    const cell = grid.grid[i];
                    const classes = getClasses(i);
                    const pageGridChild = pageGrid.children().eq(i);
                    pageGridChild.html("");
                    pageGridChild.attr("class", classes);
                    const imageElement = document.createElement('img');
                    imageElement.src = getTileIcon(cell.type);
                    pageGridChild.append(imageElement);
                    setIconTitle(pageGridChild, cell);
                    setCellCraft(i, cell.craft);
                }
                updateExportGrid();
                DisplayProximity();
            }
        };

        // Overwrite selectCell
        selectCell = function (cell) {
            HideStageInfo();
            selected = cell.id;
            if (selectedBuilding != "") placeTile(selectedBuilding);
            renderStats();
            renderGrid();
        }

        // Overwrite updateExportGrid
        updateExportGrid = function () {
            if (canUpdateLocalLayout) {
                exportGrid.northborder = grid.northborder;
                exportGrid.southborder = grid.southborder;
                exportGrid.eastborder = grid.eastborder;
                exportGrid.westborder = grid.westborder;
                exportGrid.stageIndex = GetActiveStageIndex();
                exportGrid.filename = grid.filename;
                SetStageByGrid();
                exportGrid.stages = stages;
                document.querySelector("#importexport").value = JSON.stringify(exportGrid);

                GM_setValue(localLayoutName, exportGrid);
            }
        }

        // Overwrite importGrid
        importGrid = function () {
            const importExport = document.querySelector('#importexport');
            if (importExport.value != "") {
                const importedGrid = JSON.parse(importExport.value);
                grid.northborder = importedGrid.northborder;
                grid.southborder = importedGrid.southborder;
                grid.eastborder = importedGrid.eastborder;
                grid.westborder = importedGrid.westborder;
                renderBorders();
                grid.filename = importedGrid.filename;
                // null will force later SetActiveStage.
                grid.stageIndex = null;
                ClearArray(stages);
                if (
                    importedGrid.stages
                    && importedGrid.stages.length > 0
                ) {
                    if (importedGrid.stages.length)
                    grid.stageIndex = null;
                    importedGrid.stages.forEach((stage, index) => {
                        SetStageData(index, stage.name, stage.grid);
                    });
                } else {
                    const filteredGrid = importedGrid.grid.map((cell) => {
                        let gridCell = {
                            type: ConvertCorrectionName(cell.type),
                            edgeSatisfied: true,
                        };
                        if (cell.craft) {
                            gridCell.craft = ConvertCorrectionName(cell.craft);
                        }
                        return gridCell;
                    });
                    grid.grid = filteredGrid;
                }
                LoadStages();

                if (importedGrid.stageIndex >= 0) {
                    SetActiveStage(importedGrid.stageIndex);
                }
                if (
                    grid.filename
                    && grid.filename.length > 0
                ) {
                    document.querySelector('#town-guide-eu-filename').value = grid.filename;
                }
            }
        }

        // Overwrite selectBuilding
        selectBuilding = function (type) {
            const buildings = document.querySelectorAll('.buildingmenubutton');
            buildings.forEach((building) => {
                building.classList.remove("selectedbuildingmenubutton");
            });
            if (selectedBuilding != type) {
                selectedBuilding = type;
                const buildingTypes = document.querySelectorAll('[id="' + removeSpecialCharacter(type) + '"]');
                buildingTypes.forEach((buildingType) => {
                    buildingType.classList.add("selectedbuildingmenubutton");
                });
                if (type == "remove") {
                    document.querySelector('.buildingmenudeletebutton').classList.add("selectedbuildingmenubutton");
                }
            } else {
                selectedBuilding = "";
            }
        }

        // Overwrite renderBuildingMenu
        renderBuildingMenu = function () {
            const categories = [
                "Farm",
                "Ranch",
                "Terrain",
                "Industrial",
                "Fishing",
                "Trade",
                "BlockChain",
            ];
            const categoryClass = document.querySelector(".category");
            const categoriesClass = document.querySelector(".categories");
            categoryClass.textContent = "";
            categoriesClass.textContent = "";
            categories.forEach((category) => {
                const categoryElement = document.createElement("div");
                categoryElement.id = category;
                categoryElement.classList.add("categorybutton");
                categoryElement.onclick = function() { showCategoryMenu(category); };
                categoryElement.title = category;
                const categoryImage = document.createElement("img");
                let categoryImageSrc = "./images/" + category + "-menu.png";
                if (category === "Fishing") {
                    categoryImageSrc = "https://townstar.sandbox-games.com/files/assets/127806922/1/icon_store_fishing.png";
                }
                categoryImage.src = categoryImageSrc;
                categoryElement.appendChild(categoryImage);
                categoriesClass.appendChild(categoryElement);

                const buildingMenuElement = document.createElement("div");
                buildingMenuElement.id = category + "-menu";
                buildingMenuElement.classList.add("buildingshidden");

                for (const building in townstarObjects) {
                    if (excludedBuildings.includes(building)) continue;
                    if (townstarObjects[building].Class == category) {
                        const removedBuilding = removeSpecialCharacter(building);
                        const buildingElement = document.createElement("div");
                        buildingElement.id = removedBuilding;
                        buildingElement.classList.add("buildingmenubutton");
                        buildingElement.title = getPrettyName(building);
                        buildingElement.onclick = function() { selectBuilding(building); };
                        const buildingImageElement = document.createElement("img");
                        buildingImageElement.src = getTileIcon(building);
                        buildingElement.appendChild(buildingImageElement);
                        buildingMenuElement.appendChild(buildingElement);
                    }
                }
                const buildingElement = document.createElement("div");
                buildingElement.id = "remove";
                buildingElement.classList.add("buildingmenubutton");
                buildingElement.classList.add("buildingmenudeletebutton");
                buildingElement.title = "Remove";
                buildingElement.onclick = function() { selectBuilding(this.id); };
                const buildingImageElement = document.createElement("img");
                buildingImageElement.src = getFullURL(removeIcon);
                buildingElement.appendChild(buildingImageElement);
                buildingMenuElement.appendChild(buildingElement);
                categoryClass.appendChild(buildingMenuElement);
            });
        }

        // Overwrite clearGrid
        clearGrid = function () {
            for (let i = 0; i < 256; i++) {
                grid.grid[i].type = grid.defaultType;
                grid.grid[i].craft = undefined;
            }
            renderGrid();
        }

        const newPassiveTypes = [
            "Water",
            "Shady",
            "Energy",
            "Dirty",
            "Salty",
            "Crude_Oil",
            "Cabernet_Grapes",
            "Chardonnay_Grapes",
            "Chromium",
            "Clay_Lump",
            "Cocoa",
            "Cold",
            "Cotton",
            "Eggs",
            "Iron",
            "Limestone",
            "Nectar",
            "Peppermint",
            "PositiveOnlySalty",
            "Pinot_Noir_Grapes",
            "Pumpkin",
            "Sandy",
            "Seaweed",
            "Silica",
            "Strawberries",
            "Sugarcane",
            "Water_Drum",
            "Wheat",
        ];

        // Overwrite getTileIcon
        getTileIcon = function (type) {
            let objectType = type;
            let fileUrl = townstarObjects[objectType]?.FileUrl;
            if (
                ["Grass","Marsh","Tree","Rock","Scrub","Arid","Cactus","Oil_Seep","Construction_Site"].includes(objectType) == false &&
                fileUrl == null
            ) {
                objectType = "NO_IMAGE";
            }

            switch (objectType) {
                case "Grass":
                    return "./images/grass-icon.png";
                case "Marsh":
                    return "./images/marsh-icon.png";
                case "Tree":
                    return "./images/tree-icon.png";
                case "Rock":
                    return "./images/rock-icon.png";
                case "Scrub":
                    return "./images/scrub-icon.png";
                case "Arid":
                    return "./images/arid-icon.png";
                case "Cactus":
                    return "./images/cactus-icon.png";
                case "Oil_Seep":
                    return "./images/seep-icon.png";
                case "Construction_Site":
                    return "https://cdn-icons-png.flaticon.com/512/1012/1012232.png";
                case "NO_IMAGE":
                    return "https://cdn-icons-png.flaticon.com/512/3875/3875172.png";
                default:
                    return getFullURL(fileUrl);
            }
        }

        // Overwrite renderOverlaysOptions
        renderOverlaysOptions = function () {
            var optionsHtml = "<option value='none'>None</option>";
            newPassiveTypes.forEach((type) => {
                optionsHtml += `<option value="${type}">${type}</option>`;
            });
            $("#overlays").html(optionsHtml);
        }

        // Overwrite setIconTitle
        setIconTitle = function (divCell, cell) {
            var titleString = `${getPrettyName(cell.type)}`;
            newPassiveTypes.forEach((type) => {
                let proximityCount = cell[type];
                if (proximityCount < 0) {
                    proximityCount = 0;
                } else if (proximityCount > 99) {
                    proximityCount = 99;
                }
                if (proximityCount != undefined && proximityCount != 0) {
                    titleString += `\n${type}: ${cell[type]}`;
                }
            });

            divCell.children().eq(0).attr("title", titleString);
        }

        // Overwrite getClasses
        getClasses = function (index) {
            const cell = grid.grid[index];
            let classes = [];
            classes.push("cell");
            //classes.push(cell.type);
            if (getCellIndex() == index) classes.push("selected");
            newPassiveTypes.forEach((type) => {
                classes.push(getPenaltyClass(type, cell));
            });
            classes.push(getWateredClass(cell));
            if (!cell.edgeSatisfied) classes.push("noedge");
            return classes.join(" ");
        }

        // Overwrite resetAllPassive
        resetAllPassive = function () {
            grid.grid.forEach((cell) => {
                newPassiveTypes.forEach((property) => {
                    cell[property] = 0;
                });
            });
        }

        // Overwrite placeTile
        placeTile = function (type) {
            const id = getCellIndex();
            if (id != null) {
                delete grid.grid[id].craft;
                if (grid.grid[id].type == type || type == "remove") {
                    grid.grid[id].type = grid.defaultType;
                    grid.grid[id].edgeSatisfied = true;
                } else {
                    grid.grid[id].type = type;
                }
                renderGrid();
                updateExportGrid();
            }
        }

        // Overwrite renderStats
        renderStats = function () {
            const cellIndex = getCellIndex();
            const cell = grid.grid[cellIndex];
            if (!cell) return;
            const building = townstarObjects[cell.type];
            if (building === undefined) return;
            const infoSpan = document.createElement('span');
            const infoImage = document.createElement('img');
            infoImage.src = getTileIcon(cell.type);
            infoSpan.appendChild(infoImage);
            const tileinfopic = document.querySelector(".tileinfopic");
            tileinfopic.textContent = "";
            tileinfopic.appendChild(infoSpan);
            const recipeBuildingName = getPrettyName(cell.type);
            document.querySelector(".tileinfotitle").innerHTML = `<span>${getPrettyName(cell.type)}</span`;
            const buildingRecipies = building.Crafts.split(",");

            let recipesHTML = "";
            if (buildingRecipies.length != 0) {
                recipesHTML = "<span class='recipesheader'>Recipes</span>";
                buildingRecipies.forEach((rec) => {
                    if (rec == "None") return;
                    recipesHTML +=
                      `<div class="reciperow">` +
                        `<div class="recipeheader">` +
                          `<input id="recipe_${rec}" name="recipe_${cell.type}" class="recipecraft" value="${rec}" type="radio"` + (cell.craft == rec ? ` checked` : ``) + ` onchange="setCellCraft(${cellIndex},'${rec}'); updateExportGrid();"></input>` +
                          `<label for="recipe_${rec}" class="recipetitle">` +
                            `<img class='recipeimage' src='${getCraftIcon(rec)}' />` +
                          `${getPrettyName(rec)}</label>` +
                        `</div>` +
                        `<div class="recipetimer">${getRecipeTime(rec, cell)}</div>` +
                        `${getIngredients(rec, cell)}` +
                      `</div>`;
                });
            }
            document.querySelector(".recipes").innerHTML = recipesHTML;
        }

        // Overwrite getRecipeTime
        getRecipeTime = function (rec, cell) {
            const recipe = recipes[rec];
            let timesHTML = "";
            let penalty = -1;
            if (
                townstarObjects[cell.type].ProximityImmune == false &&
                recipe.ProximityPenalty != "None"
            ) {
                penalty = getTimerClass(recipe.ProximityPenalty, cell);
            }
            const craftTimeMode =  townstarObjects[cell.type].CraftTimeMod;
            timesHTML += `<span class="timer${
                penalty <= 0 ? " timerselected" : ""
            } besttimer">${recipe.Time0 * craftTimeMode}</span>`;
                timesHTML += `<span class="timer${
                penalty == 1 ? " timerselected" : ""
            } oktimer">${recipe.Time1 * craftTimeMode}</span>`;
                timesHTML += `<span class="timer${
                penalty == 2 ? " timerselected" : ""
            } badtimer">${recipe.Time2 * craftTimeMode}</span>`;
                timesHTML += `<span class="timer${
                penalty > 2 ? " timerselected" : ""
            } worsttimer">${recipe.Time3 * craftTimeMode}</span>`;

            return timesHTML;
        }

        // Overwrite getTimerClass
        getTimerClass = function (penaltyType, cell) {
            let totalPenalty = 0;
            penaltyType.split(",").forEach((type) => {
                totalPenalty += cell[type];
            });

            return totalPenalty;
        }

        // Overwrite getIngredients
        getIngredients = function (rec, cell) {
            let ingredientHTML = "";
            const recipe = recipes[rec];
            if (!townstarObjects[cell.type].CraftReqsMet) {
                for (let i = 1; i < 4; i++) {
                    if (recipe["Req" + i] == "none") return ingredientHTML;
                    ingredientHTML += getIngredientRatio(
                        recipe["Req" + i],
                        recipe["Value" + i],
                        cell
                    );
                }
            }
            return ingredientHTML;
        }

        // Overwrite
        getIngredientRatio = function (ingredient, needed, cell) {
            var present = cell[ingredient] == undefined ? 0 : cell[ingredient];
            var ratio = `${present} / ${needed}`;

            return `<div class="ingredient">` +
                  `<img class='recipeimage' src='${getCraftIcon(ingredient)}' />` +
                  `<span>${getPrettyName(ingredient)}</span>` +
                `</div>` +
                `<div>` +
                  `${ratio}` +
                `</div>`;
        }

        // Overwrite isEdgeMatch
        isEdgeMatch = function (edge1, edge2) {
            //TODO: use EdgeClass of building objects if possible
            if (edge1 == "Road") {
                return edge2 == "Dirt_Road" || edge2 == "Paved_Road" || edge2 == "Uncommon_Paved_Road";
            }
            if (edge1 == "Water_Pump") {
                return edge2 == "Water_Pump" || edge2 == "Rare_Water_Pump" || edge2 == "Diamond_Water_Pump" || edge2 == "Rare_Grand_Aquifer";
            }
            if (edge1 == "Paved_Road") {
                return edge2 == "Paved_Road" || edge2 == "Uncommon_Paved_Road";
            }
            return edge1 == edge2;
        }

        const originalNFTProximityBonuses = {
            "Rare_Water_Pump": [3],
            "Haunted_Maze": {
                "Haunted_Maze_-_Zone_1": [3, 2, 1],
                "Haunted_Maze_-_Zone_2": [2, 1],
                "Haunted_Maze_-_Zone_3": [3, 3],
                "Haunted_Maze_-_Zone_4": [1]
            },
            "Diamond_Water_Pump": {
                "Rare_Grand_Aquifer": [1],
                "Water_Pump": [1],
                "Diamond_Water_Pump": [2],
                "Rare_Water_Pump": [3]
            },
            "Diamond_Charge_Station": {
                "Solar_Panel": [1],
                "Rare_Solar_Panel": [2, 1],
                "Legendary_Solar_Panel": [4, 3, 2, 1],
                "Tesla_Coil": [1],
                "Rare_Tesla_Coil": [2, 1],
                "Legendary_Tesla_Coil": [4, 3, 2, 1],
                "Nuclear_Power": [4, 3, 2, 1],
                "Power_Plant": [3, 2, 1]
            }
        };
        const boostedNftProximityBonuses = {
            "Haunted_Maze": {
                "Haunted_Maze_-_Zone_1": [6, 5, 4, 3, 2, 1],
                "Haunted_Maze_-_Zone_2": [4, 3, 2, 1],
                "Haunted_Maze_-_Zone_3": [4, 4, 4, 4],
                "Haunted_Maze_-_Zone_4": [2, 1]
            },
            "Diamond_Water_Pump": {
                "Rare_Grand_Aquifer": [2, 1],
                "Water_Pump": [2],
                "Diamond_Water_Pump": [2],
                "Rare_Water_Pump": [6]
            },
            "Diamond_Charge_Station": {
                "Solar_Panel": [2, 1],
                "Rare_Solar_Panel": [4, 3, 2, 1],
                "Legendary_Solar_Panel": [8, 7, 6, 5, 4, 3, 2, 1],
                "Tesla_Coil": [2, 1],
                "Rare_Tesla_Coil": [4, 3, 2, 1],
                "Legendary_Tesla_Coil": [8, 7, 6, 5, 4, 3, 2, 1],
                "Nuclear_Power": [8, 7, 6, 5, 4, 3, 2, 1],
                "Power_Plant": [6, 5, 4, 3, 2, 1]
            }
        };
        const boostedNftProximityEffects = {
            "Haunted_Maze": {
                "Haunted_Maze_-_Zone_1": ["Nectar"],
                "Haunted_Maze_-_Zone_2": ["Clay_Lump"],
                "Haunted_Maze_-_Zone_3": ["PositiveOnlySalty"],
                "Haunted_Maze_-_Zone_4": ["Nectar"]
            },
            "Diamond_Water_Pump": {
                "Rare_Grand_Aquifer": ["Water_Drum"],
                "Water_Pump": ["Water_Drum"],
                "Diamond_Water_Pump": ["Water_Drum"],
                "Rare_Water_Pump": ["Water_Drum"]
            },
            "Diamond_Charge_Station": {
                "Solar_Panel": ["Energy"],
                "Rare_Solar_Panel": ["Energy"],
                "Legendary_Solar_Panel": ["Energy"],
                "Tesla_Coil": ["Energy"],
                "Rare_Tesla_Coil": ["Energy"],
                "Legendary_Tesla_Coil": ["Energy"],
                "Nuclear_Power": ["Energy"],
                "Power_Plant": ["Energy"]
            }
        };

        const mazeSets = Object.keys(originalNFTProximityBonuses.Haunted_Maze);
        function isFullMazeSets() {
            let maze1 = false,
                maze2 = false,
                maze3 = false,
                maze4 = false;
            Object.values(grid.grid).forEach(({type: type}) => {
                if (type == "Haunted_Maze_-_Zone_1") {
                    maze1 = true;
                } else if (type == "Haunted_Maze_-_Zone_2") {
                    maze2 = true;
                } else if (type == "Haunted_Maze_-_Zone_3") {
                    maze3 = true;
                } else if (type == "Haunted_Maze_-_Zone_4") {
                    maze4 = true;
                }
            });

            return maze1 && maze2 && maze3 && maze4;
        }

        const diamondWaterPump = Object.keys(originalNFTProximityBonuses.Diamond_Water_Pump);
        function isDiamondWaterPump() {
            let valid = false;
            Object.values(grid.grid).forEach(({type: type}) => {
                if (type == "Diamond_Water_Pump") {
                    valid = true;
                }
            });

            return valid;
        }

        const diamondChargeStation = Object.keys(originalNFTProximityBonuses.Diamond_Charge_Station);
        function isDiamondChargeStation() {
            let valid = false;
            Object.values(grid.grid).forEach(({type: type}) => {
                if (type == "Diamond_Charge_Station") {
                    valid = true;
                }
            });

            return valid;
        }

        // Overwrite calculatePassiveEffects
        calculatePassiveEffects = function() {
            for (let i = 0; i < grid.grid.length; i++) {
                const cell = grid.grid[i];
                const building = townstarObjects[cell.type];

                if (building == null) continue;

                let effects = building.ProximityEmit.split(",");
                let effectRadius = building.ProximityDist;
                let effectValue = effectRadius;
                let fixedEffectValue = 0;
                if (cell.type === "Rare_Water_Pump") {
                    effectValue = originalNFTProximityBonuses[cell.type][0];
                    effectRadius = (originalNFTProximityBonuses[cell.type]).length;
                }
                if (cell.type === "888_Orb_of_Hope") {
                    effects = ['Dirty'];
                    effectRadius = 1;
                    effectValue = effectRadius;
                    fixedEffectValue = -999;
                }
                if (cell.type === "Beacon_of_Light") {
                    effects = ['Shady'];
                    effectRadius = 3;
                    effectValue = effectRadius;
                    fixedEffectValue = -999;
                }
                if (cell.type === "Sphere_Of_Hope") {
                    effects = ['Dirty','Salty'];
                    effectRadius = 5;
                    effectValue = effectRadius;
                    fixedEffectValue = -999;
                }

                for (const index in effects) {
                    const proximity = effects[index];
                    if (
                        building.ProximityEmit == "None"
                        && fixedEffectValue == 0
                    ) {
                        effectRadius = 0;
                    }
                    if (mazeSets.includes(cell.type)) {
                        if (
                            isFullMazeSets() == true &&
                            boostedNftProximityEffects.Haunted_Maze[cell.type].includes(proximity) == true
                        ) {
                            effectValue = boostedNftProximityBonuses.Haunted_Maze[cell.type][0];
                            effectRadius = (boostedNftProximityBonuses.Haunted_Maze[cell.type]).length;
                            if (cell.type == "Haunted_Maze_-_Zone_3") {
                                fixedEffectValue = effectValue;
                            }
                        } else {
                            effectValue = originalNFTProximityBonuses.Haunted_Maze[cell.type][0];
                            effectRadius = (originalNFTProximityBonuses.Haunted_Maze[cell.type]).length;
                            if (cell.type == "Haunted_Maze_-_Zone_3") {
                                fixedEffectValue = effectValue;
                            }
                        }
                    }
                    if (diamondWaterPump.includes(cell.type)) {
                        if (
                            isDiamondWaterPump() == true &&
                            boostedNftProximityEffects.Diamond_Water_Pump[cell.type].includes(proximity) == true
                        ) {
                            effectValue = boostedNftProximityBonuses.Diamond_Water_Pump[cell.type][0];
                            effectRadius = (boostedNftProximityBonuses.Diamond_Water_Pump[cell.type]).length;
                        } else {
                            effectValue = originalNFTProximityBonuses.Diamond_Water_Pump[cell.type][0];
                            effectRadius = (originalNFTProximityBonuses.Diamond_Water_Pump[cell.type]).length;
                        }
                    }
                    if (diamondChargeStation.includes(cell.type)) {
                        if (
                            isDiamondChargeStation() == true &&
                            boostedNftProximityEffects.Diamond_Charge_Station[cell.type].includes(proximity) == true
                        ) {
                            effectValue = boostedNftProximityBonuses.Diamond_Charge_Station[cell.type][0];
                            effectRadius = (boostedNftProximityBonuses.Diamond_Charge_Station[cell.type]).length;
                        } else {
                            effectValue = originalNFTProximityBonuses.Diamond_Charge_Station[cell.type][0];
                            effectRadius = (originalNFTProximityBonuses.Diamond_Charge_Station[cell.type]).length;
                        }
                    }
                    if (effectRadius == 0) continue;
                    setTileProximity(i, proximity, effectValue, effectRadius, fixedEffectValue);
                }
            }
        }

        function setTileProximity(index, proximity, value, radius, fixedEffectValue) {
            const tileRow = Math.floor(index / dimension);
            const tileCol = index % dimension;
            for (let x1 = tileRow - value, x2 = tileRow + value; x1 <= x2; x1++) {
                for (let y1 = tileCol - value, y2 = tileCol + value; y1 <= y2; y1++) {
                    if (IsOutOfGrid(x1, y1) === false) {
                        let xOffset = Math.abs(tileRow - x1);
                        let yOffset = Math.abs(tileCol - y1);
                        let tileIndex = (dimension * x1) + y1;
                        let proximityValue = 0;
                        if (!(xOffset == 0 && yOffset == 0)) {
                            let yOffsetValue = Math.max(yOffset - 1, 0);
                            let xOffsetValue = Math.max(xOffset - 1, 0);
                            if (yOffsetValue + xOffsetValue < radius) {
                                proximityValue = Math.max(value - yOffsetValue - xOffsetValue, 0);
                                if (fixedEffectValue != 0) {
                                    proximityValue = fixedEffectValue;
                                }
                            }
                        } else {
                            if (fixedEffectValue != 0) {
                                proximityValue = fixedEffectValue;
                            }
                        }
                        grid.grid[tileIndex][proximity] += proximityValue;
                    }
                }
            }
        }

        function IsOutOfGrid(x, y) {
            return x < 0 || x > dimension - 1 || y < 0 || y > dimension - 1;
        }

        function DisplayProximity() {
            let cells = document.querySelectorAll('.cell');
            cells.forEach(cell => {
                let proximityDisplayElement = cell.querySelector('.proximity-display');
                if (proximityDisplayElement) {
                    proximityDisplayElement.remove();
                }
                let proximity = GetCellProximity(cell);
                if (!IsEmptyObject(proximity)) {
                    let overlay = document.querySelector('#overlays').value;
                    Object.keys(proximity).forEach(key => {
                        if (key === overlay) {
                            let proximityAmount = proximity[key];
                            let proximityElement = document.createElement('div');
                            proximityElement.classList.add('proximity-display');
                            // proximityElement.style.color = window.getComputedStyle(cell).borderColor;
                            proximityElement.textContent = proximityAmount;
                            cell.appendChild(proximityElement);
                        }
                    });
                }
            });
        }

        function GetCellProximity(selector) {
            let proximityTitle = selector.querySelector('img').title.replaceAll(" ","").split("\n");
            proximityTitle.shift();
            let proximityText = proximityTitle.join(",");
            let proximityObject = {};
            if (proximityText !== "") {
                let proximities = proximityText.split(",");
                proximities.forEach(proximity => {
                    let proximityArray = proximity.split(':');
                    proximityObject[proximityArray[0]] = proximityArray[1];
                });
            }

            return proximityObject;
        }

        townstarObjects = newTownstarObjects;
        recipes = newRecipes;
        delete townstarObjects.Ancient_Tesla_Coil;
        delete townstarObjects.K_Barter_Station;
        delete townstarObjects.B_Barter_Station;

        // Extra modification
        townstarObjects.Paved_Road.EdgeRequirements = "None";

        renderBuildingMenu();
        renderOverlaysOptions();

        // Versioning
        const version = GM_info.script.version;
        const versionDiv = document.createElement("div");
        versionDiv.id = "addon-version";
        versionDiv.textContent = "Addon v" + version;
        document.querySelector(".maincontainer").appendChild(versionDiv);
    }

    // TS Visualizer Addon 1.29 by TruckTonka, LowCat
    var prevGrid = [];
    var newButtonDefn;

    let observer = new MutationObserver(function(mutations){
        if (document.querySelector("#MainGrid") != null) {
            if (typeof(grid) !== "undefined") {
                if ((prevGrid.length == 0) && (grid.grid.length == 256)) {
                    rememberGrid();
                    const rotateBtn = createElm("button", "rotate-btn", "Rotate", ()=>{rotateLayout()});
                    const flipNSBtn = createElm("button", "flipN-btn", "Flip NS", ()=>{flipLayoutNS()});
                    const flipEWBtn = createElm("button", "flipEW-btn", "Flip EW", ()=>{flipLayoutEW()});
                    const displayBtn = createElm("button", "display-btn", "Display Details", ()=>{displayInfo()});

                    const newContainer = document.createElement('div');
                    newContainer.className = 'TSV_Operation';
                    newContainer.style.paddingTop = '.1rem';
                    newContainer.appendChild(rotateBtn);
                    newContainer.appendChild(flipNSBtn);
                    newContainer.appendChild(flipEWBtn);
                    newContainer.appendChild(displayBtn);
                    document.querySelector('.maincontainer').appendChild(newContainer);
                    observer.disconnect();
                }
            }
        }
    })
    observer.observe(document, {attributes: true, childList: true , subtree: true});

    function createElm(tag, id, text, onClickAction) {
        const theElm = document.createElement(tag);
        theElm.id = id;
        theElm.innerText = text;
        if(onClickAction) {
            theElm.addEventListener('click', onClickAction);
        }
        theElm.style.marginRight = '.1rem'
        return theElm;
    }

    // create div with embeded element
    function createEmbedElm(innerTag, div_id, inner_id, value, onClickAction) {
        var theElm = document.querySelector("#"+div_id);

        if (theElm == null) {
            theElm = document.createElement('div');
            theElm.id = div_id;
            theElm.innerHTML = innerTag;
            const theEmbedElm = theElm.querySelector("#"+inner_id);

            theEmbedElm.value = value;
            if(onClickAction) {
                theEmbedElm.addEventListener('click', onClickAction);
            }
            theElm.style.marginRight = '.1rem'
        }
        return theElm;
    }

    // rotate the current layout and refresh the screen
    function rotateLayout() {
        //console.log("*** function rotateLayout");
        var i,x,y;
        var tempBorder = grid.southborder;
        grid.southborder = grid.eastborder;
        grid.eastborder = grid.northborder;
        grid.northborder = grid.westborder;
        grid.westborder = tempBorder;

        for (i=0; i<256; i++) {
            x = Math.round(i/16 + 0.5) - 1;
            y = i % 16;
            // prevGrid[i] = grid.grid[16*(15-y) + x].type;
            initPrevGrid(i);
            prevGrid[i].type = grid.grid[16*(15-y) + x].type;
            prevGrid[i].craft = grid.grid[16*(15-y) + x].craft;
        };
        updateGrid();
        renderBorders();
        renderGrid();
        updateExportGrid();
    }

    // flip the town upside down
    function flipLayoutNS() {
        console.log ("*** function rememberGrid");
        var i,x,y;
        var tempBorder = grid.southborder;
        grid.southborder = grid.northborder;
        grid.northborder = tempBorder;
        for (i=0; i<256; i++) {
            x = Math.round(i/16 + 0.5) - 1;
            y = i % 16;
            // prevGrid[i] = grid.grid[16*(15-x) + y].type;
            initPrevGrid(i);
            prevGrid[i].type = grid.grid[16*(15-x) + y].type;
            prevGrid[i].craft = grid.grid[16*(15-x) + y].craft;
        };
        updateGrid();
        renderBorders();
        renderGrid();
        updateExportGrid();
    };

    // flip the town left and right
    function flipLayoutEW() {
        //console.log ("*** function rememberGrid");
        var i,x,y;
        var tempBorder = grid.eastborder;
        grid.eastborder = grid.westborder;
        grid.westborder = tempBorder;
        for (i=0; i<256; i++) {
            x = Math.round(i/16 + 0.5) - 1;
            y = i % 16;
            // prevGrid[i] = grid.grid[16*x + (15-y)].type;
            initPrevGrid(i);
            prevGrid[i].type = grid.grid[16*x + (15-y)].type;
            prevGrid[i].craft = grid.grid[16*x + (15-y)].craft;
        };
        updateGrid();
        renderBorders();
        renderGrid();
        updateExportGrid();
    };

    // Update the current grid layout
    function updateGrid() {
        //console.log ("*** function updateGrid");
        var i;
        for (i=0; i<256; i++) {
            // grid.grid[i].type = prevGrid[i];
            initPrevGrid(i);
            grid.grid[i].type = prevGrid[i].type;
            grid.grid[i].craft = prevGrid[i].craft;
        }
    }

    // Remeber the previous grid layout
    function rememberGrid() {
        //console.log ("*** function rememberGrid");
        var i;
        for (i=0; i<256; i++) {
            // prevGrid[i] = grid.grid[i].type;
            initPrevGrid(i);
            prevGrid[i].type = grid.grid[i].type;
            prevGrid[i].craft = grid.grid[i].craft;
        }
    }

    function initPrevGrid(index) {
        if (prevGrid[index] == undefined) {
            prevGrid[index] = {
                type: undefined,
                craft: undefined,
            };
        }
    }

    //extract the cell index
    function parseCellIndex(cellName) {
        //console.log ("*** cellName.substring(0, 4) = " + cellName.substring(0, 4));
        if (cellName.substring(0, 4) == "cell") {
            return parseInt(cellName.substr(4));
        } else {
            return null;
        }
    }
    function displayInfo() {
        var contentText = "";

        if (getCellIndex() != null) {
            console.log("*** Selected cell position: ("+getCellIndex() % 16+","+ (Math.round(getCellIndex()/16 + 0.5) - 1)+")");

            contentText += "*** Selected cell position: ("+getCellIndex() % 16+","+ (Math.round(getCellIndex()/16 + 0.5) - 1)+")\n\n";
        }
        var units={};
        var totalBuildCost=0;
        var totalLabourCost=0;
        for (const i in grid.grid) {
            // if unit types is not maped, initialize it
            if (!units[grid.grid[i].type]){
                units[grid.grid[i].type] = 0;
            }
            units[grid.grid[i].type]++;
            // some entry, the buildcost field is string instead of number.
            totalBuildCost = totalBuildCost + Number(townstarObjects[grid.grid[i].type].BuildCost);
            totalLabourCost = totalLabourCost + Number(townstarObjects[grid.grid[i].type].LaborCost);
        }

        console.log("*** Total build cost: \n$" + totalBuildCost.toLocaleString("en-US") + "\n\n");
        console.log("*** Total labour cost/min: \n$" + totalLabourCost.toLocaleString("en-US") + "\n\n");
        console.log("*** Object counts:\n" + JSON.stringify(Object.fromEntries(Object.entries(units).sort()), null, "   "));
        contentText += "*** Total build cost: \n$" + totalBuildCost.toLocaleString("en-US") + "\n\n";
        contentText += "*** Total labour cost/min: \n$" + totalLabourCost.toLocaleString("en-US") + "\n\n";
        contentText += "*** Object counts:\n" + JSON.stringify(Object.fromEntries(Object.entries(units).sort()), null, "   ");

        var theElm = document.querySelector("#div-display-txtArea");

        // refresh value instead of recreate if found to exist
        if (theElm != null) {
            const theEmbedElm = theElm.querySelector("#display-txtArea");

            theEmbedElm.value = contentText;
        } else {
            const txtArea = createEmbedElm("<textarea id=\"display-txtArea\" rows=\"51\" cols=\"35\"></textarea>", "div-display-txtArea", "display-txtArea", contentText, null);
            const newContainer = document.createElement('div');
            newContainer.className = 'TSV_Operation_DisplayInfo';
            newContainer.style.paddingTop = '.1rem';
            newContainer.style.display = 'grid';
            newContainer.style.gridColumn = '3/3';
            newContainer.style.gridRow = '1/5';
            newContainer.appendChild(txtArea);
            document.querySelector('.maincontainer').appendChild(newContainer);
        }
    };
})();
