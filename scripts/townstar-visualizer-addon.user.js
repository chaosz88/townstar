// ==UserScript==
// @name         Town Star Visualizer Addon
// @namespace    http://tampermonkey.net/
// @version      0.8.2.8
// @description  Update citadelofthewind.
// @author       Oizys, Jehosephat, Kewlhwip, TruckTonka, LowCat
// @match        http*://citadelofthewind.com/wp-content/visualizer*
// @run-at       document-start
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

(function() {
    'use strict';

    const newTownstarObjects = {"888_Orb_of_Hope":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"888_Orb_of_Hope","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"https://i.imgur.com/GIj0pZV.png"},"ATV":{"BuildCost":75000,"Class":"Ranch","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":150,"Name":"ATV","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/MwcY44U.png"},"Advanced_Fishing_Platform":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Advanced_Salmon","EdgeRequirements":"None","LaborCost":0,"Name":"Advanced_Fishing_Platform","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"https://i.imgur.com/3ItmuNf.png"},"Air_Cargo":{"BuildCost":150000,"Class":"Trade","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Plains","LaborCost":150,"Name":"Air_Cargo","ProximityDist":3,"ProximityEmit":"Dirty","ProximityImmune":false,"FileUrl":null},"Alfa_Fountain_Good":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Alfa_Fountain_Good","ProximityDist":3,"ProximityEmit":"Water","ProximityImmune":false,"FileUrl":"https://i.imgur.com/uAQYijk.png"},"Alfa_Fountain_Great":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Alfa_Fountain_Great","ProximityDist":4,"ProximityEmit":"Water","ProximityImmune":false,"FileUrl":"https://i.imgur.com/9QxtxhF.png"},"Alfa_Fountain_Majestic":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Alfa_Fountain_Majestic","ProximityDist":5,"ProximityEmit":"Water","ProximityImmune":false,"FileUrl":"https://i.imgur.com/lyY18m1.png"},"Alfa_Fountain_Ok":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Alfa_Fountain_Ok","ProximityDist":2,"ProximityEmit":"Water","ProximityImmune":false,"FileUrl":"https://i.imgur.com/KpexLxN.png"},"Ancient_Bitrue_Wheat":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Ancient_Bitrue_Wheat","ProximityDist":6,"ProximityEmit":"Wheat","ProximityImmune":false,"FileUrl":"https://i.imgur.com/Pe5cjbS.png"},"Ancient_Simplex_Sugarcane":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Ancient_Simplex_Sugarcane","ProximityDist":6,"ProximityEmit":"Sugarcane","ProximityImmune":false,"FileUrl":"https://i.imgur.com/lDOH039.png"},"Ancient_Tesla_Coil":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":true,"CraftTimeMod":0.25,"Crafts":"Energy","EdgeRequirements":"Road","LaborCost":0,"Name":"Ancient_Tesla_Coil","ProximityDist":10,"ProximityEmit":"Energy","ProximityImmune":true,"FileUrl":null},"Aquaculturist_Apartments":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":100,"Name":"Aquaculturist_Apartments","ProximityDist":0,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/qJEJG8w.png"},"Aquaculturist_House":{"BuildCost":50000,"Class":"Fishing","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":200,"Name":"Aquaculturist_House","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/jcfO9FA.png"},"Arid":{"BuildCost":0,"Class":"Terrain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Arid","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":null},"B_Barter_Station":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Wheat,Sugarcane,Wood","EdgeRequirements":"Road","LaborCost":10,"Name":"B_Barter_Station","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":true,"FileUrl":null},"Baa_Rilliant_Sheep_Pen":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Baa_Wool","EdgeRequirements":"None","LaborCost":0,"Name":"Baa_Rilliant_Sheep_Pen","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"https://i.imgur.com/j6UDV0a.png"},"Bakery":{"BuildCost":400000,"Class":"Farm","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Butter,Dough,Baguette,Jam","EdgeRequirements":"Road","LaborCost":750,"Name":"Bakery","ProximityDist":2,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/gA5Ldoa.png"},"Basketball_Court":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Basketball_Court","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"https://i.imgur.com/fltw8Pf.png"},"Beacon_of_Light":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Beacon_of_Light","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"https://i.imgur.com/l3TiOuT.png"},"Beehive":{"BuildCost":25000,"Class":"Ranch","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Honey,Honeycomb,Wax","EdgeRequirements":"None","LaborCost":0,"Name":"Beehive","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"https://i.imgur.com/lQSQYQp.png"},"Beekeeper_House":{"BuildCost":7500,"Class":"Ranch","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":150,"Name":"Beekeeper_House","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/UaErABx.png"},"Big_Oak_Shed":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Big_Oak_Shed","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"https://i.imgur.com/y2GyxUP.png"},"Big_Pantry":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Big_Pantry","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/lZSF3nD.png"},"Big_Storehouse":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Big_Storehouse","ProximityDist":2,"ProximityEmit":"Shady","ProximityImmune":true,"FileUrl":"https://i.imgur.com/QZ7cSeH.png"},"Big_Trough":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Big_Trough","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":true,"FileUrl":"https://i.imgur.com/S01yJod.png"},"Big_Warehouse":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Big_Warehouse","ProximityDist":2,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/rPHHXcg.png"},"Big_Wood_Shed":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Big_Wood_Shed","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"https://i.imgur.com/9K5msFo.png"},"Bitrue_Wheat":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Bitrue_Wheat","ProximityDist":2,"ProximityEmit":"Wheat","ProximityImmune":false,"FileUrl":"https://i.imgur.com/jybzIEg.png"},"Boxing_Facility":{"BuildCost":300000,"Class":"Industrial","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Food_Parcel,Gift_Parcel,Party_Box,Stack_Box,Jewelry_Set","EdgeRequirements":"Road","LaborCost":750,"Name":"Boxing_Facility","ProximityDist":2,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/YxJ5i8Y.png"},"Brine_Storage":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Brine_Storage","ProximityDist":2,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/bKWWsoK.png"},"Broken_History":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Broken_History","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"https://i.imgur.com/kCmeQXm.png"},"Buggy_Mr_Puddles_Home":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Buggy_Mr_Puddles_Home","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":true,"FileUrl":"https://i.imgur.com/7QCQWZH.png"},"Builder_House":{"BuildCost":2500,"Class":"Industrial","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"None","LaborCost":20,"Name":"Builder_House","ProximityDist":2,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/Z2j9GaW.png"},"Cabernet_Vines":{"BuildCost":3500,"Class":"Farm","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Cabernet_Grapes","EdgeRequirements":"None","LaborCost":0,"Name":"Cabernet_Vines","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"https://i.imgur.com/QumJhSu.png"},"Cactus":{"BuildCost":0,"Class":"Terrain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Cactus","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":null},"Cakery":{"BuildCost":1000000,"Class":"Farm","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Batter,Cake,Pumpkin_Pie","EdgeRequirements":"Road","LaborCost":1500,"Name":"Cakery","ProximityDist":2,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/hEWyquk.png"},"Candy_Shop":{"BuildCost":150000,"Class":"Farm","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Candy_Canes,Chocolate_Covered_Strawberries,Candy_Corn,Trick_or_Treat_Bag","EdgeRequirements":"Road","LaborCost":150,"Name":"Candy_Shop","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/6XEZwZo.png"},"Chardonnay_Vines":{"BuildCost":1500,"Class":"Farm","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Chardonnay_Grapes","EdgeRequirements":"None","LaborCost":0,"Name":"Chardonnay_Vines","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"https://i.imgur.com/1EUYIm0.png"},"Chicken_Coop":{"BuildCost":15000,"Class":"Ranch","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Eggs","EdgeRequirements":"None","LaborCost":0,"Name":"Chicken_Coop","ProximityDist":2,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"https://i.imgur.com/OOJmzjZ.png"},"Chocolate_Shop":{"BuildCost":300000,"Class":"Farm","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Chocolate_Bar,Fancy_Cake,Decorated_Cake","EdgeRequirements":"Road","LaborCost":300,"Name":"Chocolate_Shop","ProximityDist":2,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/mYKkfwC.png"},"Chocolatier":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Chocolate_Bar,Fancy_Cake,Decorated_Cake","EdgeRequirements":"Road","LaborCost":100,"Name":"Chocolatier","ProximityDist":2,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/CKHCUBO.png"},"Christmas_Sugarcane_Stand":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Christmas_Sugarcane_Stand","ProximityDist":2,"ProximityEmit":"Sugarcane","ProximityImmune":false,"FileUrl":"https://i.imgur.com/9MAoXv5.png"},"Clay_Field":{"BuildCost":10000,"Class":"Terrain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Clay_Lump","EdgeRequirements":"None","LaborCost":0,"Name":"Clay_Field","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"https://i.imgur.com/n4sImav.png"},"Cocoa_Tree":{"BuildCost":2500,"Class":"Farm","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Cocoa","EdgeRequirements":"None","LaborCost":0,"Name":"Cocoa_Tree","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"https://i.imgur.com/9GhDGU6.png"},"Common_Candy_Cane_Storage":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Common_Candy_Cane_Storage","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/eXfvYSE.png"},"Common_Cocoa_Storage":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Common_Cocoa_Storage","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/ZTllmM9.png"},"Common_Copper_Ore_Storage":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Common_Copper_Ore_Storage","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/EdNF06i.png"},"Common_Cotton_Storage":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Common_Cotton_Storage","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/68wha0B.png"},"Common_Flour_Storehouse":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Common_Flour_Storehouse","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":true,"FileUrl":"https://i.imgur.com/4lGuihR.png"},"Common_Gold_Ore_Storage":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Common_Gold_Ore_Storage","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/Mxv6Bku.png"},"Common_Ground_Academy":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Common_Ground_Academy","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"https://i.imgur.com/EMVkuz9.png"},"Common_Husk_Rice_Storage":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Common_Husk_Rice_Storage","ProximityDist":0,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/w9RQAru.png"},"Common_Milk_Storage":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Common_Milk_Storage","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/6bEm08p.png"},"Common_Peppermint_Storage":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Common_Peppermint_Storage","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/pOV5CQ5.png"},"Common_Pumpkin_Storage":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Common_Pumpkin_Storage","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/0gSfpYA.png"},"Common_Silver_Ore_Storage":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Common_Silver_Ore_Storage","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/dCRK2iZ.png"},"Common_Strawberry_Storage":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Common_Strawberry_Storage","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/7vMA1Jx.png"},"Common_Tomato_Storage":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Common_Tomato_Storage","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/pQHHNik.png"},"Common_Water_Barrel_Storage":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Common_Water_Barrel_Storage","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/hCXA1mR.png"},"Composting_Facility":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Composting_Facility","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"https://i.imgur.com/AvYUr6p.png"},"Construction_Site":{"BuildCost":0,"Class":"Industrial","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Construction_Site","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":true,"FileUrl":null},"Cooper":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"Road","LaborCost":20,"Name":"Cooper","ProximityDist":1,"ProximityEmit":"Copper_Ore","ProximityImmune":false,"FileUrl":"https://i.imgur.com/mkRATbX.png"},"Copper_Panning_Site":{"BuildCost":1500,"Class":"Jewelry","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Copper_Ore","EdgeRequirements":"None","LaborCost":0,"Name":"Copper_Panning_Site","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"https://i.imgur.com/a1nCm0K.png"},"Corn_Field":{"BuildCost":1,"Class":"Farm","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Corn","EdgeRequirements":"None","LaborCost":0,"Name":"Corn_Field","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"https://i.imgur.com/askmJLm.png"},"Corrupted_Cabernet_Grapes_Stand":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Corrupted_Cabernet_Grapes_Stand","ProximityDist":6,"ProximityEmit":"Cabernet_Grapes","ProximityImmune":false,"FileUrl":"https://i.imgur.com/zF3QrK7.png"},"Corrupted_Chardonnay_Grapes_Stand":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Corrupted_Chardonnay_Grapes_Stand","ProximityDist":6,"ProximityEmit":"Chardonnay_Grapes","ProximityImmune":false,"FileUrl":"https://i.imgur.com/u8lXb95.png"},"Corrupted_Chromium_Stand":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Corrupted_Chromium_Stand","ProximityDist":6,"ProximityEmit":"Chromium","ProximityImmune":false,"FileUrl":"https://i.imgur.com/7mMgMHc.png"},"Corrupted_Cocoa_Stand":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Corrupted_Cocoa_Stand","ProximityDist":6,"ProximityEmit":"Cocoa","ProximityImmune":false,"FileUrl":"https://i.imgur.com/S7WSRgJ.png"},"Corrupted_Limestone_Stand":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Corrupted_Limestone_Stand","ProximityDist":6,"ProximityEmit":"Limestone","ProximityImmune":false,"FileUrl":"https://i.imgur.com/a8ijp0z.png"},"Corrupted_Peppermint_Stand":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Corrupted_Peppermint_Stand","ProximityDist":6,"ProximityEmit":"Peppermint","ProximityImmune":false,"FileUrl":"https://i.imgur.com/Gm5Pq78.png"},"Corrupted_Pinot_Noir_Grapes_Stand":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Corrupted_Pinot_Noir_Grapes_Stand","ProximityDist":6,"ProximityEmit":"Pinot_Noir_Grapes","ProximityImmune":false,"FileUrl":"https://i.imgur.com/9pNVveP.png"},"Corrupted_Portal":{"BuildCost":2000000,"Class":"Industrial","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"350k_Stars","EdgeRequirements":"Paved_Road","LaborCost":1000,"Name":"Corrupted_Portal","ProximityDist":3,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/k09S3KY.png"},"Corrupted_Pumpkin_Stand":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Corrupted_Pumpkin_Stand","ProximityDist":6,"ProximityEmit":"Pumpkin","ProximityImmune":false,"FileUrl":"https://i.imgur.com/2BcBIf2.png"},"Corrupted_Silica_Stand":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Corrupted_Silica_Stand","ProximityDist":6,"ProximityEmit":"Silica","ProximityImmune":false,"FileUrl":"https://i.imgur.com/TrotW6T.png"},"Cotton_Field":{"BuildCost":250,"Class":"Farm","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Cotton","EdgeRequirements":"None","LaborCost":0,"Name":"Cotton_Field","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"https://i.imgur.com/KocOMNW.png"},"CraneBot_Home":{"BuildCost":0,"Class":"Industrial","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"None","LaborCost":20,"Name":"CraneBot_Home","ProximityDist":2,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/UszMjfh.png"},"Crystal_Sanctum":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Crystal_Sanctum","ProximityDist":1,"ProximityEmit":"Silica,Chromium,Limestone","ProximityImmune":true,"FileUrl":"https://i.imgur.com/bFVPVHY.png"},"Death_Row_Records":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Death_Row_Records","ProximityDist":2,"ProximityEmit":"Water","ProximityImmune":false,"FileUrl":"https://i.imgur.com/mXwFEDl.png"},"Diamond_Charge_Station":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Diamond_Charge_Station","ProximityDist":2,"ProximityEmit":"Energy","ProximityImmune":false,"FileUrl":"https://i.imgur.com/fcT7Osk.png"},"Diamond_Warehouse":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Diamond_Warehouse","ProximityDist":0,"ProximityEmit":"Shady","ProximityImmune":true,"FileUrl":"https://i.imgur.com/F5Wtg4L.png"},"Diamond_Water_Pump":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"Pond:OR:Waterway:OR:Bridge","LaborCost":0,"Name":"Diamond_Water_Pump","ProximityDist":1,"ProximityEmit":"Water_Drum","ProximityImmune":false,"FileUrl":"https://i.imgur.com/AdRmKay.png"},"DigiFinex_Cotton":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"DigiFinex_Cotton","ProximityDist":2,"ProximityEmit":"Cotton","ProximityImmune":false,"FileUrl":"https://i.imgur.com/egKnDsJ.png"},"Dirt_Road":{"BuildCost":1000,"Class":"Terrain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Dirt_Road","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"https://i.imgur.com/Qjdff4z.png"},"ElfBot_Home":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"ElfBot_Home","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"https://i.imgur.com/s2rP73z.png"},"Epic_Arcane_Earrings":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Epic_Arcane_Earrings","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"https://i.imgur.com/Fkk3F0S.png"},"Epic_Arcane_Ring":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Epic_Arcane_Ring","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"https://i.imgur.com/eqIfhi5.png"},"Epic_Basketball_Court":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Epic_Basketball_Court","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"https://i.imgur.com/VrJgusD.png"},"Epic_Bitrue_Wheat":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Epic_Bitrue_Wheat","ProximityDist":4,"ProximityEmit":"Wheat","ProximityImmune":false,"FileUrl":"https://i.imgur.com/FVYIxKN.png"},"Epic_Brine_Storage":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Epic_Brine_Storage","ProximityDist":2,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/FDZZuSP.png"},"Epic_Cake_Storage":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Epic_Cake_Storage","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/EQakjFg.png"},"Epic_Copper_Smith":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Smith_Copper_Wire,Smith_Copper_Jump_Ring","EdgeRequirements":"None","LaborCost":75,"Name":"Epic_Copper_Smith","ProximityDist":0,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/PyJNhQL.png"},"Epic_Gasoline_Refinery":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Epic_Gasoline","EdgeRequirements":"None","LaborCost":200,"Name":"Epic_Gasoline_Refinery","ProximityDist":2,"ProximityEmit":"Dirty,Shady","ProximityImmune":true,"FileUrl":"https://i.imgur.com/tx3Mslm.png"},"Epic_Grape_Storage":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Epic_Grape_Storage","ProximityDist":2,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/6dNDGW0.png"},"Epic_Master_Wizard":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Enchanted_Object,Magic_Powder,Ice_Block","EdgeRequirements":"Road","LaborCost":1400,"Name":"Epic_Master_Wizard","ProximityDist":2,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/2cU8177.png"},"Epic_Salt_Station":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":true,"CraftTimeMod":1.33,"Crafts":"Salt","EdgeRequirements":"Road","LaborCost":0,"Name":"Epic_Salt_Station","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":true,"FileUrl":"https://i.imgur.com/JBhbGUy.png"},"Epic_Seafood_Warehouse":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Epic_Seafood_Warehouse","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/1bjziVy.png"},"Epic_Simplex_Sugarcane":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Epic_Simplex_Sugarcane","ProximityDist":4,"ProximityEmit":"Sugarcane","ProximityImmune":false,"FileUrl":"https://i.imgur.com/sal1xvy.png"},"Epic_Stylin_Ride":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0.5,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Epic_Stylin_Ride","ProximityDist":1,"ProximityEmit":"Iron","ProximityImmune":false,"FileUrl":"https://i.imgur.com/K92MhLx.png"},"Epic_Sugar_Station":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":true,"CraftTimeMod":1.33,"Crafts":"Sugar","EdgeRequirements":"Road","LaborCost":0,"Name":"Epic_Sugar_Station","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":true,"FileUrl":"https://i.imgur.com/2NbF2WS.png"},"Epic_Sugarcane_Storage":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Epic_Sugarcane_Storage","ProximityDist":2,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/6VrUhmX.png"},"Epic_Turbo_Pump":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0.25,"Crafts":"Crude_Oil","EdgeRequirements":"Road","LaborCost":0,"Name":"Epic_Turbo_Pump","ProximityDist":1,"ProximityEmit":"Dirty","ProximityImmune":false,"FileUrl":"https://i.imgur.com/JqZxSu5.png"},"Epic_Water_Tower":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Epic_Water_Tower","ProximityDist":5,"ProximityEmit":"Water","ProximityImmune":true,"FileUrl":"https://i.imgur.com/edH66T6.png"},"Epic_Wheat_Stand":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Epic_Wheat_Stand","ProximityDist":4,"ProximityEmit":"Wheat","ProximityImmune":false,"FileUrl":"https://i.imgur.com/OJHj49T.png"},"Epic_Wheat_Storage":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Epic_Wheat_Storage","ProximityDist":2,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/DdzYJmd.png"},"Epic_Wine_Cellar":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Epic_Wine_Cellar","ProximityDist":2,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/0Yivdlf.png"},"Express_Depot":{"BuildCost":0,"Class":"Trade","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"OpenWorld:OR:Bridge","LaborCost":20,"Name":"Express_Depot","ProximityDist":2,"ProximityEmit":"Dirty","ProximityImmune":false,"FileUrl":"https://i.imgur.com/RmIMZsT.png"},"Express_Pier":{"BuildCost":0,"Class":"Trade","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"Waterway:OR:Bridge","LaborCost":0,"Name":"Express_Pier","ProximityDist":1,"ProximityEmit":"Dirty","ProximityImmune":false,"FileUrl":"https://i.imgur.com/tbKPIZA.png"},"Fabric_Plant":{"BuildCost":500000,"Class":"Industrial","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Cotton_Yarn,Wool_Yarn,Uniforms,Fabric_Box","EdgeRequirements":"Paved_Road","LaborCost":500,"Name":"Fabric_Plant","ProximityDist":2,"ProximityEmit":"Shady,Dirty","ProximityImmune":true,"FileUrl":"https://i.imgur.com/6nerxU0.png"},"Fancy_Barn":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Milk","EdgeRequirements":"None","LaborCost":0,"Name":"Fancy_Barn","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/MZqpuXy.png"},"FarmBot_Home":{"BuildCost":1250,"Class":"WorldMining","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"OpenWorld:OR:Bridge","LaborCost":0,"Name":"FarmBot_Home","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":null},"Farm_House":{"BuildCost":1250,"Class":"Farm","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":10,"Name":"Farm_House","ProximityDist":2,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/hLcUKzy.png"},"Farm_Tractor":{"BuildCost":75000,"Class":"Farm","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":150,"Name":"Farm_Tractor","ProximityDist":2,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/favxYHW.png"},"Feed_Mill":{"BuildCost":5000,"Class":"Ranch","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Feed","EdgeRequirements":"None","LaborCost":0,"Name":"Feed_Mill","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":true,"FileUrl":"https://i.imgur.com/Rx1RPXt.png"},"Feedbot_Shack":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Feedbot_Shack","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"https://i.imgur.com/Mt0MX5u.png"},"Fish_Farm":{"BuildCost":95000,"Class":"Fishing","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Eel,Roe","EdgeRequirements":"None","LaborCost":0,"Name":"Fish_Farm","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"https://i.imgur.com/nhqz1h6.png"},"Fisherman_House":{"BuildCost":75000,"Class":"Fishing","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":450,"Name":"Fisherman_House","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/geKvOyz.png"},"Fishing_Platform":{"BuildCost":300000,"Class":"Fishing","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Farm_Salmon","EdgeRequirements":"OpenWorld","LaborCost":0,"Name":"Fishing_Platform","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"https://i.imgur.com/vbD7Bab.png"},"Flow":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Flow","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"https://i.imgur.com/RQO0n7R.png"},"Forge":{"BuildCost":27500,"Class":"Jewelry","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Copper,Silver,Gold","EdgeRequirements":"Road","LaborCost":75,"Name":"Forge","ProximityDist":2,"ProximityEmit":"Dirty,Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/DOUP8eM.png"},"Forklift":{"BuildCost":75000,"Class":"Industrial","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":150,"Name":"Forklift","ProximityDist":2,"ProximityEmit":"Shady,Dirty","ProximityImmune":false,"FileUrl":"https://i.imgur.com/yb7xs6Y.png"},"Freight_Pier":{"BuildCost":250000,"Class":"Trade","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Waterway:OR:Bridge","LaborCost":300,"Name":"Freight_Pier","ProximityDist":3,"ProximityEmit":"Dirty","ProximityImmune":false,"FileUrl":"https://i.imgur.com/jDl04iB.png"},"Fuel_Storage":{"BuildCost":15000,"Class":"Industrial","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Fuel_Storage","ProximityDist":3,"ProximityEmit":"Dirty","ProximityImmune":false,"FileUrl":"https://i.imgur.com/tN3efFA.png"},"Foundry":{"BuildCost":1500000,"Class":"Jewelry","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Foundry_Copper_Jump_Ring,Foundry_Silver_Jump_Ring,Sterling_Silver,Sterling_Silver_Jump_Ring,Gold-Plated_Heart_Pendant","EdgeRequirements":"None","LaborCost":3000,"Name":"Foundry","ProximityDist":3,"ProximityEmit":"Dirty,Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/J4sssnf.png"},"Gala_Turntable":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Gala_Turntable","ProximityDist":1,"ProximityEmit":"Water","ProximityImmune":false,"FileUrl":"https://i.imgur.com/KhxLWDb.png"},"Galaverse_in_the_Mediterranean_Sea":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"OpenWorld:OR:Bridge:OR:Waterway","LaborCost":0,"Name":"Galaverse_in_the_Mediterranean_Sea","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"https://i.imgur.com/Fl3lSZq.png"},"GeckoCon_2022":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"GeckoCon_2022","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"https://i.imgur.com/sw3tn0B.png"},"Gift_Drone":{"BuildCost":1250,"Class":"Trade","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Gift_Drone","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":null},"Glass_Factory":{"BuildCost":100000,"Class":"Industrial","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Wine_Bottle,Molten_Glass","EdgeRequirements":"Road","LaborCost":750,"Name":"Glass_Factory","ProximityDist":2,"ProximityEmit":"Shady,Dirty","ProximityImmune":false,"FileUrl":"https://i.imgur.com/SJOTEjH.png"},"Gold_Panning_Site":{"BuildCost":5000,"Class":"Jewelry","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Gold_Ore","EdgeRequirements":"None","LaborCost":0,"Name":"Gold_Panning_Site","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"https://i.imgur.com/UVDSmXc.png"},"Goldy":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"Road","LaborCost":20,"Name":"Goldy","ProximityDist":1,"ProximityEmit":"Gold_Ore","ProximityImmune":false,"FileUrl":"https://i.imgur.com/7hdwiav.png"},"Grape_Storage":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Grape_Storage","ProximityDist":2,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/Tz55LJQ.png"},"Grass":{"BuildCost":0,"Class":"Terrain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Grass","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"https://i.imgur.com/D0b39m9.png"},"Great_Saw_Mill":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Lumber,Oak_Barrel,Wooden_Box","EdgeRequirements":"None","LaborCost":100,"Name":"Great_Saw_Mill","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":true,"FileUrl":"https://i.imgur.com/AHj7N2l.png"},"Green_Dragon_Express":{"BuildCost":0,"Class":"Trade","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"OpenWorld:OR:Bridge:OR:Waterway","LaborCost":20,"Name":"Green_Dragon_Express","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"https://i.imgur.com/Xu4dIeB.png"},"Ground_Silo":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Ground_Silo","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"https://i.imgur.com/eG774Fg.png"},"Hatched_Hank":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":150,"Name":"Hatched_Hank","ProximityDist":0,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/sdSPPcx.png"},"Hatched_Hank_Jr's":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":30,"Name":"Hatched_Hank_Jr's","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/M05Vd4x.png"},"Haunted_Crypt":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Haunted_Crypt","ProximityDist":1,"ProximityEmit":"Crude_Oil","ProximityImmune":true,"FileUrl":"https://i.imgur.com/1v800g5.png"},"Haunted_East_Wing":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Haunted_East_Wing","ProximityDist":2,"ProximityEmit":"Crude_Oil","ProximityImmune":true,"FileUrl":"https://i.imgur.com/atkQA6W.png"},"Haunted_Front_Porch":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":true,"CraftTimeMod":1,"Crafts":"Pumpkin","EdgeRequirements":"None","LaborCost":0,"Name":"Haunted_Front_Porch","ProximityDist":2,"ProximityEmit":"Crude_Oil","ProximityImmune":true,"FileUrl":"https://i.imgur.com/gXe3c2m.png"},"Haunted_Graveyard":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Haunted_Graveyard","ProximityDist":1,"ProximityEmit":"Crude_Oil","ProximityImmune":true,"FileUrl":"https://i.imgur.com/zg6CS8P.png"},"Haunted_Main_Tower":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Haunted_Main_Tower","ProximityDist":3,"ProximityEmit":"Crude_Oil","ProximityImmune":true,"FileUrl":"https://i.imgur.com/nsQJZCm.png"},"Haunted_Maze_-_Zone_1":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Haunted_Maze_-_Zone_1","ProximityDist":3,"ProximityEmit":"Nectar","ProximityImmune":false,"FileUrl":"https://i.imgur.com/rpAf2bD.png"},"Haunted_Maze_-_Zone_2":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Haunted_Maze_-_Zone_2","ProximityDist":2,"ProximityEmit":"Clay_Lump","ProximityImmune":false,"FileUrl":"https://i.imgur.com/3WMCVAK.png"},"Haunted_Maze_-_Zone_3":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Haunted_Maze_-_Zone_3","ProximityDist":4,"ProximityEmit":"PositiveOnlySalty","ProximityImmune":false,"FileUrl":"https://i.imgur.com/9vVBodY.png"},"Haunted_Maze_-_Zone_4":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Haunted_Maze_-_Zone_4","ProximityDist":1,"ProximityEmit":"Nectar","ProximityImmune":false,"FileUrl":"https://i.imgur.com/UJQOYvl.png"},"Haunted_West_Wing":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Haunted_West_Wing","ProximityDist":2,"ProximityEmit":"Crude_Oil","ProximityImmune":true,"FileUrl":"https://i.imgur.com/5zg4FMV.png"},"Holiday_Tree":{"BuildCost":0,"Class":"Terrain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Holiday_Tree","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"https://i.imgur.com/RpDL0UG.png"},"Into_The_Galaverse_2021":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"OpenWorld:OR:Bridge:OR:Waterway","LaborCost":0,"Name":"Into_The_Galaverse_2021","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"https://i.imgur.com/flFMmrM.png"},"Italian_Restaurant":{"BuildCost":850000,"Class":"Industrial","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Shrimp_Pizza,Pizza_Base,Four-Cheese_Pizza,Risotto,Lasagna","EdgeRequirements":"Paved_Road","LaborCost":0,"Name":"Italian_Restaurant","ProximityDist":2,"ProximityEmit":"Dirty,Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/nHcjuTe.png"},"Jewelry_Crafting_Table":{"BuildCost":300000,"Class":"Jewelry","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Copper_Jump_Ring,Silver_Jump_Ring,Chandelier_Earrings,Bracelet,Lobster_Clasp,Golden_Heart_Necklace","EdgeRequirements":"Road","LaborCost":600,"Name":"Jewelry_Crafting_Table","ProximityDist":2,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/mJpnJOc.png"},"Jewelry_Store":{"BuildCost":60000,"Class":"Jewelry","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Jewelry_Store","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/ZiSifey.png"},"K_Barter_Station":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Sugarcane,Cotton,Wood","EdgeRequirements":"Road","LaborCost":10,"Name":"K_Barter_Station","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":true,"FileUrl":null},"Legendary_Basketball_Court":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Legendary_Basketball_Court","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"https://i.imgur.com/Vzsn8w4.png"},"Legendary_Bitrue_Wheat":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Legendary_Bitrue_Wheat","ProximityDist":5,"ProximityEmit":"Wheat","ProximityImmune":false,"FileUrl":"https://i.imgur.com/DissAey.png"},"Legendary_Brine_Storage":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Legendary_Brine_Storage","ProximityDist":2,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/ehEMGSX.png"},"Legendary_Fabric_Plant":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Cotton_Yarn,Wool_Yarn,Uniforms,Fabric_Box","EdgeRequirements":"Paved_Road","LaborCost":250,"Name":"Legendary_Fabric_Plant","ProximityDist":2,"ProximityEmit":"Shady,Dirty","ProximityImmune":false,"FileUrl":"https://i.imgur.com/rE8eFli.png"},"Legendary_Grape_Storage":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Legendary_Grape_Storage","ProximityDist":2,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/lq0L2e6.png"},"Legendary_Lolli_and_Pop_Shop":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0.16,"Crafts":"Candy_Canes,Chocolate_Covered_Strawberries,Candy_Corn,Trick_or_Treat_Bag","EdgeRequirements":"Road","LaborCost":0,"Name":"Legendary_Lolli_and_Pop_Shop","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/YA1fPCa.png"},"Legendary_Lumber_Storage":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Legendary_Lumber_Storage","ProximityDist":2,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/cvvxaJv.png"},"Legendary_Nourish_Barn":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Milk","EdgeRequirements":"None","LaborCost":0,"Name":"Legendary_Nourish_Barn","ProximityDist":3,"ProximityEmit":"Barn_Feed,Barn_Water","ProximityImmune":false,"FileUrl":"https://i.imgur.com/a8NXPaP.png"},"Legendary_Oak_Tree_Farm":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Legendary_Oak_Wood","EdgeRequirements":"None","LaborCost":0,"Name":"Legendary_Oak_Tree_Farm","ProximityDist":0,"ProximityEmit":"Wood","ProximityImmune":false,"FileUrl":"https://i.imgur.com/R1QpocJ.png"},"Legendary_Santa's_Factory":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Bicycle,Rocking_Horse","EdgeRequirements":"Road","LaborCost":1250,"Name":"Legendary_Santa's_Factory","ProximityDist":4,"ProximityEmit":"Cold","ProximityImmune":false,"FileUrl":"https://i.imgur.com/7PYbjWN.png"},"Legendary_Simplex_Sugarcane":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Legendary_Simplex_Sugarcane","ProximityDist":5,"ProximityEmit":"Sugarcane","ProximityImmune":false,"FileUrl":"https://i.imgur.com/Hyv4e39.png"},"Legendary_Solar_Panel":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Legendary_Solar_Panel","ProximityDist":4,"ProximityEmit":"Energy","ProximityImmune":true,"FileUrl":"https://i.imgur.com/6cBWSzt.png"},"Legendary_Stylin_Ride":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0.5,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Legendary_Stylin_Ride","ProximityDist":2,"ProximityEmit":"Iron","ProximityImmune":false,"FileUrl":"https://i.imgur.com/KJFVawF.png"},"Legendary_Sugarcane_Storage":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Legendary_Sugarcane_Storage","ProximityDist":2,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/pKdJkFQ.png"},"Legendary_Tesla_Coil":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":true,"CraftTimeMod":0.5,"Crafts":"Energy","EdgeRequirements":"Road","LaborCost":0,"Name":"Legendary_Tesla_Coil","ProximityDist":4,"ProximityEmit":"Energy","ProximityImmune":true,"FileUrl":"https://i.imgur.com/vSCsQZj.png"},"Legendary_Tree_Farm":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Legendary_Wood","EdgeRequirements":"None","LaborCost":0,"Name":"Legendary_Tree_Farm","ProximityDist":0,"ProximityEmit":"Wood","ProximityImmune":false,"FileUrl":"https://i.imgur.com/96QHEUO.png"},"Legendary_Water_Tower":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Legendary_Water_Tower","ProximityDist":6,"ProximityEmit":"Water","ProximityImmune":true,"FileUrl":"https://i.imgur.com/hy8nOOf.png"},"Legendary_Wheat_Stand":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Legendary_Wheat_Stand","ProximityDist":5,"ProximityEmit":"Wheat","ProximityImmune":false,"FileUrl":"https://i.imgur.com/pdM3EGT.png"},"Legendary_Wheat_Storage":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Legendary_Wheat_Storage","ProximityDist":2,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/ISnKovA.png"},"Lolli_and_Pop_Shop":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0.5,"Crafts":"Candy_Canes,Chocolate_Covered_Strawberries,Candy_Corn,Trick_or_Treat_Bag","EdgeRequirements":"Road","LaborCost":100,"Name":"Lolli_and_Pop_Shop","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/7CKdLzG.png"},"Lumber_Mill":{"BuildCost":50000,"Class":"Industrial","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Lumber,Oak_Barrel,Wooden_Box","EdgeRequirements":"Road","LaborCost":100,"Name":"Lumber_Mill","ProximityDist":2,"ProximityEmit":"Shady","ProximityImmune":true,"FileUrl":"https://i.imgur.com/W7y5KTt.png"},"Lumber_Yard":{"BuildCost":20000,"Class":"Farm","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Lumber_Yard","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/9pcSfBT.png"},"Lumberjack_House":{"BuildCost":2500,"Class":"Farm","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":30,"Name":"Lumberjack_House","ProximityDist":2,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/hAXxyCP.png"},"Luxury_Cake_Storage":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Luxury_Cake_Storage","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"https://i.imgur.com/BI5uwGY.png"},"Luxury_Energy_Storage":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Luxury_Energy_Storage","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"https://i.imgur.com/Mqb8x7W.png"},"Luxury_Milk_Storage":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Luxury_Milk_Storage","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"https://i.imgur.com/WnJqH3d.png"},"Luxury_Mineral_Storage":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Luxury_Mineral_Storage","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"https://i.imgur.com/d5TPGyA.png"},"Luxury_Oak_Shed":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Luxury_Oak_Shed","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"https://i.imgur.com/ObR3KKY.png"},"Luxury_Sugar_Storage":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Luxury_Sugar_Storage","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"https://i.imgur.com/biA8oFM.png"},"Luxury_Uniform_Storage":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Luxury_Uniform_Storage","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"https://i.imgur.com/YwN2Mpe.png"},"Luxury_Wood_Shed":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Luxury_Wood_Shed","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"https://i.imgur.com/pxDO1d7.png"},"Marsh":{"BuildCost":0,"Class":"Terrain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Marsh","ProximityDist":1,"ProximityEmit":"Water","ProximityImmune":false,"FileUrl":null},"Mama_Panner":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"Road","LaborCost":20,"Name":"Mama_Panner","ProximityDist":1,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"https://i.imgur.com/EnklFT3.png"},"Master_Wizard":{"BuildCost":3000000,"Class":"Industrial","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Enchanted_Object,Magic_Powder,Magical_Ice_Block","EdgeRequirements":"Road","LaborCost":3000,"Name":"Master_Wizard","ProximityDist":2,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/Azqb2lE.png"},"Mayhem_-_Oopsie_'23":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Mayhem_-_Oopsie_'23","ProximityDist":0,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/wwpBlNz.png"},"Meadow":{"BuildCost":500,"Class":"Terrain","CraftReqsMet":true,"CraftTimeMod":4.5,"Crafts":"Feed","EdgeRequirements":"None","LaborCost":0,"Name":"Meadow","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"https://i.imgur.com/IRxcgfx.png"},"Milk_Barn":{"BuildCost":30000,"Class":"Ranch","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Milk","EdgeRequirements":"None","LaborCost":0,"Name":"Milk_Barn","ProximityDist":2,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/PqtZOUL.png"},"Mine":{"BuildCost":30000,"Class":"Industrial","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Iron,Chromium,Limestone","EdgeRequirements":"Paved_Road:AND:Mountains","LaborCost":100,"Name":"Mine","ProximityDist":3,"ProximityEmit":"Dirty","ProximityImmune":false,"FileUrl":"https://i.imgur.com/upTC0TP.png"},"Mirandus_VOX_Home":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Mirandus_VOX_Home","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":true,"FileUrl":"https://i.imgur.com/FL18cZU.png"},"Mixing_Tent":{"BuildCost":550000,"Class":"Fishing","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Fish_Chum,White_Rice,Food_Mix,Cheese","EdgeRequirements":"Road","LaborCost":500,"Name":"Mixing_Tent","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/N9wVVeh.png"},"Mr_Puddles_Home":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Mr_Puddles_Home","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":true,"FileUrl":"https://i.imgur.com/0hMDnOQ.png"},"Natural_Energy_Centre":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":true,"CraftTimeMod":3,"Crafts":"Energy","EdgeRequirements":"None","LaborCost":0,"Name":"Natural_Energy_Centre","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":true,"FileUrl":"https://i.imgur.com/ReUPGC4.png"},"Natural_Energy_Plant":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":true,"CraftTimeMod":0.5,"Crafts":"Energy","EdgeRequirements":"None","LaborCost":100,"Name":"Natural_Energy_Plant","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":true,"FileUrl":"https://i.imgur.com/sMIMbIg.png"},"Neighbor_Delivery":{"BuildCost":15000,"Class":"Trade","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Town","LaborCost":20,"Name":"Neighbor_Delivery","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"https://i.imgur.com/f0y53AY.png"},"North_Pole_Creation_Lab":{"BuildCost":1000000,"Class":"Industrial","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Lights,Boom_Canes","EdgeRequirements":"Road","LaborCost":1125,"Name":"North_Pole_Creation_Lab","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/o6x8EyI.png"},"Nuclear_Power":{"BuildCost":10000000,"Class":"Industrial","CraftReqsMet":true,"CraftTimeMod":1,"Crafts":"Energy","EdgeRequirements":"Paved_Road:AND:Water_Pump","LaborCost":3000,"Name":"Nuclear_Power","ProximityDist":4,"ProximityEmit":"Shady,Energy","ProximityImmune":true,"FileUrl":"https://i.imgur.com/XIcBb8o.png"},"OKEx_Barter_Station":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Wheat,Cotton,Wood","EdgeRequirements":"Road","LaborCost":10,"Name":"OKEx_Barter_Station","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":true,"FileUrl":"https://i.imgur.com/fAiFr6R.png"},"Oak_Tree_Farm":{"BuildCost":1000,"Class":"Farm","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Oak_Wood","EdgeRequirements":"None","LaborCost":0,"Name":"Oak_Tree_Farm","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"https://i.imgur.com/MPNyOhl.png"},"Oil_Pump":{"BuildCost":1250,"Class":"Industrial","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Crude_Oil","EdgeRequirements":"Road","LaborCost":0,"Name":"Oil_Pump","ProximityDist":3,"ProximityEmit":"Dirty","ProximityImmune":false,"FileUrl":"https://i.imgur.com/CWRR6sn.png"},"Oil_Seep":{"BuildCost":0,"Class":"Terrain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Oil_Seep","ProximityDist":4,"ProximityEmit":"Crude_Oil","ProximityImmune":false,"FileUrl":null},"Ore_Storage":{"BuildCost":20000,"Class":"Jewelry","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Ore_Storage","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/Drtv6Al.png"},"Panner_Bunk_House":{"BuildCost":75000,"Class":"Jewelry","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":40,"Name":"Panner_Bunk_House","ProximityDist":2,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/hHx0NXl.png"},"Panner_House":{"BuildCost":1500,"Class":"Jewelry","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":20,"Name":"Panner_House","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/2QI7cxu.png"},"Pantry":{"BuildCost":20000,"Class":"Farm","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Pantry","ProximityDist":2,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/yGlN2Hw.png"},"Papa_Panner":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"Road","LaborCost":20,"Name":"Papa_Panner","ProximityDist":1,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"https://i.imgur.com/0ccSF2f.png"},"Pasture":{"BuildCost":500,"Class":"Terrain","CraftReqsMet":true,"CraftTimeMod":120,"Crafts":"Feed","EdgeRequirements":"None","LaborCost":0,"Name":"Pasture","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"https://i.imgur.com/EKmyybe.png"},"Paved_Road":{"BuildCost":30000,"Class":"Terrain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Paved_Road","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"https://i.imgur.com/E53ulx3.png"},"Peppermint_Field":{"BuildCost":2500,"Class":"Farm","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Peppermint","EdgeRequirements":"None","LaborCost":0,"Name":"Peppermint_Field","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"https://i.imgur.com/4JWHv77.png"},"Pinot_Noir_Vines":{"BuildCost":5000,"Class":"Farm","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Pinot_Noir_Grapes","EdgeRequirements":"None","LaborCost":0,"Name":"Pinot_Noir_Vines","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"https://i.imgur.com/EYisCzl.png"},"Platinum_Bright_Wind":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Bright_Flour,Bright_Sugar,Bright_Salt,Bright_Corn_Starch","EdgeRequirements":"Road","LaborCost":50,"Name":"Platinum_Bright_Wind","ProximityDist":0,"ProximityEmit":"Shady","ProximityImmune":true,"FileUrl":"https://i.imgur.com/xvT0b8g.png"},"Platinum_Easy_Dough_Bakery":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Butter,Easy_Dough,Baguette,Jam","EdgeRequirements":"Road","LaborCost":600,"Name":"Platinum_Easy_Dough_Bakery","ProximityDist":0,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/m4hCtlK.png"},"Platinum_Master_Copper_Smith":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Smith_Copper_Wire,Smith_Copper_Jump_Ring","EdgeRequirements":"Road","LaborCost":75,"Name":"Platinum_Master_Copper_Smith","ProximityDist":1,"ProximityEmit":"Copper","ProximityImmune":false,"FileUrl":"https://i.imgur.com/j0Y4iZs.png"},"Platinum_Seaweed_Stand":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Platinum_Seaweed_Stand","ProximityDist":5,"ProximityEmit":"Seaweed","ProximityImmune":false,"FileUrl":"https://i.imgur.com/TeLAQzD.png"},"Pond":{"BuildCost":10000,"Class":"Terrain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Pond","ProximityDist":2,"ProximityEmit":"Water","ProximityImmune":false,"FileUrl":"https://i.imgur.com/PSDD33s.png"},"Pottery_Shop":{"BuildCost":120000,"Class":"Industrial","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Ceramic_Bowl,Jack_O_Lantern,Supply_Box,Heart-Shaped_Print","EdgeRequirements":"Road","LaborCost":600,"Name":"Pottery_Shop","ProximityDist":2,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/NXKuABm.png"},"Power_Plant":{"BuildCost":250000,"Class":"Industrial","CraftReqsMet":false,"CraftTimeMod":0.5,"Crafts":"Energy","EdgeRequirements":"Paved_Road:AND:Water_Pump","LaborCost":450,"Name":"Power_Plant","ProximityDist":3,"ProximityEmit":"Dirty,Shady,Energy","ProximityImmune":true,"FileUrl":"https://i.imgur.com/sl8TmKT.png"},"Pumpkin_Patch":{"BuildCost":250,"Class":"Farm","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Pumpkin","EdgeRequirements":"None","LaborCost":0,"Name":"Pumpkin_Patch","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"https://i.imgur.com/GGpI2w0.png"},"Quick_Builder_House":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"None","LaborCost":20,"Name":"Quick_Builder_House","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"https://i.imgur.com/QfrOC1P.png"},"Ranch_House":{"BuildCost":1250,"Class":"Ranch","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":10,"Name":"Ranch_House","ProximityDist":2,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/MZbxa7f.png"},"Rare_Arcane_Earrings":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Rare_Arcane_Earrings","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"https://i.imgur.com/60kf18z.png"},"Rare_Bakery":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Butter,Dough,Baguette,Jam","EdgeRequirements":"Road","LaborCost":600,"Name":"Rare_Bakery","ProximityDist":2,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/Ws1qj1x.png"},"Rare_Basketball_Court":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Rare_Basketball_Court","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"https://i.imgur.com/5XhtWKG.png"},"Rare_Bitrue_Wheat":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Rare_Bitrue_Wheat","ProximityDist":3,"ProximityEmit":"Wheat","ProximityImmune":false,"FileUrl":"https://i.imgur.com/AETCWMM.png"},"Rare_Brine_Storage":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Rare_Brine_Storage","ProximityDist":2,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/INhlTTO.png"},"Rare_Cakery":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Batter,Cake,Pumpkin_Pie","EdgeRequirements":"Road","LaborCost":1200,"Name":"Rare_Cakery","ProximityDist":2,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/RmLCuwP.png"},"Rare_Cocoa_Storage":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Rare_Cocoa_Storage","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/BKSejYj.png"},"Rare_Copper_Ore_Storage":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Rare_Copper_Ore_Storage","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/fznthxH.png"},"Rare_Egg_Storage":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Rare_Egg_Storage","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":true,"FileUrl":"https://i.imgur.com/vpNJv0f.png"},"Rare_Flour_Station":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":true,"CraftTimeMod":2,"Crafts":"Flour","EdgeRequirements":"Road","LaborCost":0,"Name":"Rare_Flour_Station","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":true,"FileUrl":"https://i.imgur.com/OgQD2oq.png"},"Rare_Gasoline_Refinery":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Rare_Gasoline","EdgeRequirements":"Road","LaborCost":200,"Name":"Rare_Gasoline_Refinery","ProximityDist":3,"ProximityEmit":"Dirty,Shady","ProximityImmune":true,"FileUrl":"https://i.imgur.com/qd2HDwA.png"},"Rare_Gold_Ore_Storage":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Rare_Gold_Ore_Storage","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/bAwfRVl.png"},"Rare_Grand_Aquifer":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Rare_Grand_Aquifer","ProximityDist":1,"ProximityEmit":"Water_Drum","ProximityImmune":false,"FileUrl":"https://i.imgur.com/UL5KB5P.png"},"Rare_Grape_Storage":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Rare_Grape_Storage","ProximityDist":2,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/K7BmsiJ.png"},"Rare_Green_Forge":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Green_Copper,Green_Silver,Green_Gold","EdgeRequirements":"Road","LaborCost":75,"Name":"Rare_Green_Forge","ProximityDist":0,"ProximityEmit":"Dirty,Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/sRk9svv.png"},"Rare_Husk_Rice_Storage":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Rare_Husk_Rice_Storage","ProximityDist":0,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/JCDpK7I.png"},"Rare_Lolli_and_Pop_Shop":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0.33,"Crafts":"Candy_Canes,Chocolate_Covered_Strawberries,Candy_Corn,Trick_or_Treat_Bag","EdgeRequirements":"Road","LaborCost":50,"Name":"Rare_Lolli_and_Pop_Shop","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/TsvDSVj.png"},"Rare_Milk_Storage":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Rare_Milk_Storage","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/tMFoeKa.png"},"Rare_Mixing_Tent":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Fish_Chum,White_Rice,Food_Mix,Cheese","EdgeRequirements":"Road","LaborCost":300,"Name":"Rare_Mixing_Tent","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/umijCZW.png"},"Rare_North_Pole_Creation_Lab":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Lights,Boom_Canes","EdgeRequirements":"Road","LaborCost":600,"Name":"Rare_North_Pole_Creation_Lab","ProximityDist":1,"ProximityEmit":"Shady,Cold","ProximityImmune":false,"FileUrl":"https://i.imgur.com/HrbTrdC.png"},"Rare_Pottery_Shop":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Ceramic_Bowl,Jack_O_Lantern,Supply_Box,Heart-Shaped_Print","EdgeRequirements":"Road","LaborCost":450,"Name":"Rare_Pottery_Shop","ProximityDist":2,"ProximityEmit":"Shady","ProximityImmune":true,"FileUrl":"https://i.imgur.com/DM0wanR.png"},"Rare_Salty_Salt_Field":{"BuildCost":1250,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Salty_Brine","EdgeRequirements":"None","LaborCost":0,"Name":"Rare_Salty_Salt_Field","ProximityDist":1,"ProximityEmit":"Salty","ProximityImmune":false,"FileUrl":"https://i.imgur.com/R0L1frM.png"},"Rare_Silver_Ore_Storage":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Rare_Silver_Ore_Storage","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/kCpyktK.png"},"Rare_Simplex_Sugarcane":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Rare_Simplex_Sugarcane","ProximityDist":3,"ProximityEmit":"Sugarcane","ProximityImmune":false,"FileUrl":"https://i.imgur.com/MmFQIww.png"},"Rare_Solar_Panel":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Rare_Solar_Panel","ProximityDist":2,"ProximityEmit":"Energy","ProximityImmune":true,"FileUrl":"https://i.imgur.com/i6vF7wP.png"},"Rare_Strawberry_Storage":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Rare_Strawberry_Storage","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/adozv6s.png"},"Rare_Sugarcane_Storage":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Rare_Sugarcane_Storage","ProximityDist":2,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/3Q2icXJ.png"},"Rare_Tomato_Storage":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Rare_Tomato_Storage","ProximityDist":0,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/cWy44mO.png"},"Rare_Tesla_Coil":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":true,"CraftTimeMod":1.67,"Crafts":"Energy","EdgeRequirements":"Road","LaborCost":0,"Name":"Rare_Tesla_Coil","ProximityDist":2,"ProximityEmit":"Energy","ProximityImmune":true,"FileUrl":"https://i.imgur.com/98Agitv.png"},"Rare_Trinity_Gem_Works":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Copper_Jump_Ring,Silver_Jump_Ring,Chandelier_Earrings,Bracelet,Lobster_Clasp,Golden_Heart_Necklace","EdgeRequirements":"Road","LaborCost":0,"Name":"Rare_Trinity_Gem_Works","ProximityDist":2,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/zNtqD39.png"},"Rare_Turbo_Pump":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0.5,"Crafts":"Crude_Oil","EdgeRequirements":"Road","LaborCost":0,"Name":"Epic_Turbo_Pump","ProximityDist":2,"ProximityEmit":"Dirty","ProximityImmune":false,"FileUrl":"https://i.imgur.com/jhrNRRZ.png"},"Rare_Water_Barrel_Storage":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Rare_Water_Barrel_Storage","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/E0zPuUq.png"},"Rare_Water_Pump":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Pond:OR:Waterway:OR:Bridge","LaborCost":0,"Name":"Rare_Water_Pump","ProximityDist":1,"ProximityEmit":"Water_Drum","ProximityImmune":false,"FileUrl":"https://i.imgur.com/SYeuUcb.png"},"Rare_Water_Tower":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Rare_Water_Tower","ProximityDist":4,"ProximityEmit":"Water","ProximityImmune":true,"FileUrl":"https://i.imgur.com/OBG6LyZ.png"},"Rare_Wheat_Stand":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Rare_Wheat_Stand","ProximityDist":3,"ProximityEmit":"Wheat","ProximityImmune":false,"FileUrl":"https://i.imgur.com/t5L0MK9.png"},"Rare_Wheat_Storage":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Rare_Wheat_Storage","ProximityDist":2,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/XvNucon.png"},"Rare_Winery":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Pinot_Noir,Cabernet_Sauvignon,Chardonnay,Sangria","EdgeRequirements":"Road","LaborCost":1600,"Name":"Rare_Winery","ProximityDist":2,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/xO34YGw.png"},"Rare_Wizards_Workshop":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Mystic_Matter,Glue","EdgeRequirements":"Road","LaborCost":1000,"Name":"Rare_Wizards_Workshop","ProximityDist":2,"ProximityEmit":"Shady,Cold","ProximityImmune":false,"FileUrl":"https://i.imgur.com/0R2ewi6.png"},"Refinery":{"BuildCost":15000,"Class":"Industrial","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Petroleum,Gasoline,Jet_Fuel","EdgeRequirements":"Road","LaborCost":200,"Name":"Refinery","ProximityDist":4,"ProximityEmit":"Dirty,Shady","ProximityImmune":true,"FileUrl":"https://i.imgur.com/QbK3xnj.png"},"Research_Centre":{"BuildCost":500000,"Class":"Industrial","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Tractor_Speed,Fisherman_Speed,Everyone_Else_Speed,Global_Speed","EdgeRequirements":"None","LaborCost":0,"Name":"Research_Centre","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"https://i.imgur.com/BPEzyO1.png"},"Rice_Field":{"BuildCost":1500,"Class":"Fishing","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Husk_Rice","EdgeRequirements":"None","LaborCost":0,"Name":"Rice_Field","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"https://i.imgur.com/6z5lwXK.png"},"Rock":{"BuildCost":0,"Class":"Terrain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Rock","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":null},"Rose_&_Lily":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"Road","LaborCost":20,"Name":"Rose_&_Lily","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/xk567GH.png"},"Salt_Field":{"BuildCost":1250,"Class":"Farm","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Brine","EdgeRequirements":"None","LaborCost":0,"Name":"Salt_Field","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"https://i.imgur.com/fFfAZcO.png"},"Salt_Storehouse":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Salt_Storehouse","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/rZOExBS.png"},"SaltyBot_Home":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"SaltyBot_Home","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"https://i.imgur.com/9bENtG1.png"},"SaltyBot_Shack":{"BuildCost":0,"Class":"Terrain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"SaltyBot_Shack","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"https://i.imgur.com/vHP6iqC.png"},"Sand_Mine":{"BuildCost":45000,"Class":"Industrial","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Silica","EdgeRequirements":"Road","LaborCost":0,"Name":"Sand_Mine","ProximityDist":1,"ProximityEmit":"Shady,Dirty","ProximityImmune":false,"FileUrl":"https://i.imgur.com/jKcSotj.png"},"Santa's_Factory":{"BuildCost":5000000,"Class":"Industrial","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Bicycle,Rocking_Horse","EdgeRequirements":"Road","LaborCost":3750,"Name":"Santa's_Factory","ProximityDist":2,"ProximityEmit":"Shady,Cold","ProximityImmune":false,"FileUrl":"https://i.imgur.com/d1dvezp.png"},"Sauce_Facility":{"BuildCost":450000,"Class":"Fishing","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Rice_Vinegar,Tomato_Paste,Pasta_Sauce","EdgeRequirements":"Road","LaborCost":700,"Name":"Sauce_Facility","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/Y2FfUlw.png"},"Scrub":{"BuildCost":0,"Class":"Terrain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Scrub","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":null},"Seafood_Warehouse":{"BuildCost":50000,"Class":"Fishing","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Seafood_Warehouse","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/dDvdXtF.png"},"Seaweed_Farm":{"BuildCost":3200,"Class":"Fishing","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Seaweed","EdgeRequirements":"None","LaborCost":0,"Name":"Seaweed_Farm","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"https://i.imgur.com/Ly6YQpk.png"},"Seaweed_Farmer_House":{"BuildCost":100000,"Class":"Fishing","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":250,"Name":"Seaweed_Farmer_House","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/NQ1KcOi.png"},"Shallow_Mine":{"BuildCost":30000,"Class":"Industrial","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Shallow_Iron,Shallow_Chromium,Shallow_Limestone","EdgeRequirements":"Paved_Road:AND:OpenWorld","LaborCost":100,"Name":"Shallow_Mine","ProximityDist":3,"ProximityEmit":"Dirty","ProximityImmune":false,"FileUrl":"https://i.imgur.com/SAe1G9j.png"},"Sheep_Pen":{"BuildCost":10000,"Class":"Ranch","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Wool","EdgeRequirements":"None","LaborCost":0,"Name":"Sheep_Pen","ProximityDist":2,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"https://i.imgur.com/x98DN5C.png"},"Shrimp_Farm":{"BuildCost":45000,"Class":"Fishing","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Shrimp","EdgeRequirements":"None","LaborCost":0,"Name":"Shrimp_Farm","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"https://i.imgur.com/Mv3vXLt.png"},"Silo":{"BuildCost":10000,"Class":"Farm","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Silo","ProximityDist":3,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/uZkxMyw.png"},"Silver_Panning_Site":{"BuildCost":4000,"Class":"Jewelry","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Silver_Ore","EdgeRequirements":"None","LaborCost":0,"Name":"Silver_Panning_Site","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"https://i.imgur.com/rZk8ALI.png"},"Simplex_Sugarcane":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Simplex_Sugarcane","ProximityDist":2,"ProximityEmit":"Sugarcane","ProximityImmune":false,"FileUrl":"https://i.imgur.com/SzQ7M1Q.png"},"Solar_Panel":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Solar_Panel","ProximityDist":1,"ProximityEmit":"Energy","ProximityImmune":true,"FileUrl":"https://i.imgur.com/tuseraj.png"},"Sphere_Of_Hope":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Sphere_Of_Hope","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"https://i.imgur.com/gLJ7eXV.png"},"Spooky_Ghost_Tracks":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Spooky_Ghost_Tracks","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"https://i.imgur.com/gTg7CsZ.png"},"Spooky_Go_'Round":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Spooky_Go_'Round","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"https://i.imgur.com/3X6tJAq.png"},"Spooky_House_of_Laughs":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Spooky_House_of_Laughs","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"https://i.imgur.com/xY9oTI2.png"},"Spooky_Wheel_of_Nightmares":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Spooky_Wheel_of_Nightmares","ProximityDist":3,"ProximityEmit":"Corn","ProximityImmune":false,"FileUrl":"https://i.imgur.com/kWtYOKn.png"},"Spooky_Windmill":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Flour,Sugar,Salt,Corn_Starch","EdgeRequirements":"Road","LaborCost":40,"Name":"Spooky_Windmill","ProximityDist":3,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/M8Y8hak.png"},"Steel_Mill":{"BuildCost":1500000,"Class":"Industrial","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Steel,Blue_Steel,Red_Steel","EdgeRequirements":"Paved_Road:AND:Water_Pump","LaborCost":750,"Name":"Steel_Mill","ProximityDist":4,"ProximityEmit":"Dirty,Shady","ProximityImmune":true,"FileUrl":"https://i.imgur.com/blslIfv.png"},"Storehouse":{"BuildCost":15000,"Class":"Farm","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Storehouse","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/1e84ToD.png"},"Strawberry_Field":{"BuildCost":1000,"Class":"Farm","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Strawberries","EdgeRequirements":"None","LaborCost":0,"Name":"Strawberry_Field","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"https://i.imgur.com/A5oSFyj.png"},"Sugar_Cane_Field":{"BuildCost":250,"Class":"Farm","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Sugarcane","EdgeRequirements":"None","LaborCost":0,"Name":"Sugar_Cane_Field","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"https://i.imgur.com/8DK4h1a.png"},"Sugar_Storehouse":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Sugar_Storehouse","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/47BfkS0.png"},"Sugar_Storehouse_CoinPH":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Sugar_Storehouse_CoinPH","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/JOvFgqc.png"},"Sugarcane_Storage":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Sugarcane_Storage","ProximityDist":2,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/YkURKmM.png"},"Super_Chicken":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Super_Chicken","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"https://i.imgur.com/AtSphUF.png"},"Supreme_Silo":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Supreme_Silo","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/aprzCfu.png"},"Supreme_Storehouse":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Supreme_Storehouse","ProximityDist":0,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/EzWIabI.png"},"Sushi_Restaurant":{"BuildCost":850000,"Class":"Fishing","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Salmon_Nigiri,Eel_Nigiri,Sushi_Boat","EdgeRequirements":"Paved_Road","LaborCost":1200,"Name":"Sushi_Restaurant","ProximityDist":2,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/0BEFiNZ.png"},"Sylvester":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"Road","LaborCost":20,"Name":"Sylvester","ProximityDist":1,"ProximityEmit":"Silver_Ore","ProximityImmune":false,"FileUrl":"https://i.imgur.com/uLbr21C.png"},"Tesla_Coil":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":true,"CraftTimeMod":2.33,"Crafts":"Energy","EdgeRequirements":"Road","LaborCost":0,"Name":"Tesla_Coil","ProximityDist":1,"ProximityEmit":"Energy","ProximityImmune":true,"FileUrl":"https://i.imgur.com/hOOxyGh.png"},"The_Golden_Egg":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"The_Golden_Egg","ProximityDist":4,"ProximityEmit":"Eggs","ProximityImmune":false,"FileUrl":"https://i.imgur.com/8nZgvND.png"},"The_Lab":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"The_Lab","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"https://i.imgur.com/Mpm6NrB.png"},"The_Logger_House":{"BuildCost":75000,"Class":"Farm","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":150,"Name":"The_Logger_House","ProximityDist":2,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/zQxHoDF.png"},"The_Noir_Hero":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"The_Noir_Hero","ProximityDist":3,"ProximityEmit":"Water","ProximityImmune":false,"FileUrl":"https://i.imgur.com/UodLw0x.png"},"Tomato_Farm":{"BuildCost":5000,"Class":"Farm","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Tomato","EdgeRequirements":"None","LaborCost":0,"Name":"Tomato_Farm","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"https://i.imgur.com/j7s6INZ.png"},"Trade_Depot":{"BuildCost":5000,"Class":"Trade","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"OpenWorld:OR:Bridge","LaborCost":20,"Name":"Trade_Depot","ProximityDist":2,"ProximityEmit":"Dirty","ProximityImmune":false,"FileUrl":"https://i.imgur.com/EoQGJL8.png"},"Trade_Pier":{"BuildCost":7500,"Class":"Trade","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Waterway:OR:Bridge","LaborCost":30,"Name":"Trade_Pier","ProximityDist":2,"ProximityEmit":"Dirty","ProximityImmune":false,"FileUrl":"https://i.imgur.com/oDjQOp2.png"},"Tree":{"BuildCost":0,"Class":"Terrain","CraftReqsMet":true,"CraftTimeMod":1.5,"Crafts":"Wood","EdgeRequirements":"None","LaborCost":0,"Name":"Tree","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":null},"Tree_Farm":{"BuildCost":500,"Class":"Farm","CraftReqsMet":false,"CraftTimeMod":0.5,"Crafts":"Wood","EdgeRequirements":"None","LaborCost":0,"Name":"Tree_Farm","ProximityDist":0,"ProximityEmit":"Wood","ProximityImmune":false,"FileUrl":"https://i.imgur.com/Js5sseo.png"},"Trophy_of_Epicness":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Trophy_of_Epicness","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":true,"FileUrl":"https://i.imgur.com/G95TEiO.png"},"Trough":{"BuildCost":5000,"Class":"Ranch","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Trough","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":true,"FileUrl":"https://i.imgur.com/6Nu2NDn.png"},"Unanimous":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Unanimous","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"https://i.imgur.com/BOT7rhs.png"},"Uncommon_Basketball_Court":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Uncommon_Basketball_Court","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"https://i.imgur.com/ME91g7k.png"},"Uncommon_Candy_Cane_Storage":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Uncommon_Candy_Cane_Storage","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/BwWod7O.png"},"Uncommon_Cotton_Storage":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Uncommon_Cotton_Storage","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/aZIG6hb.png"},"Uncommon_Copper_Ore_Storage":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Uncommon_Copper_Ore_Storage","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/BLSmQQ4.png"},"Uncommon_Gold_Ore_Storage":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Uncommon_Gold_Ore_Storage","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/Qtvr0vc.png"},"Uncommon_Husk_Rice_Storage":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Uncommon_Husk_Rice_Storage","ProximityDist":0,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/Koa3nSt.png"},"Uncommon_Milk_Storage":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Uncommon_Milk_Storage","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/iCKbR2w.png"},"Uncommon_Paved_Road":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Uncommon_Paved_Road","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"https://i.imgur.com/fv967oj.png"},"Uncommon_Peppermint_Storage":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Uncommon_Peppermint_Storage","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/45opy4l.png"},"Uncommon_Pumpkin_Storage":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Uncommon_Pumpkin_Storage","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/hI0ODZZ.png"},"Uncommon_Silver_Ore_Storage":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Uncommon_Silver_Ore_Storage","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/colCK2g.png"},"Uncommon_Strawberry_Storage":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Uncommon_Strawberry_Storage","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/ZdXCfPf.png"},"Uncommon_Tomato_Storage":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Uncommon_Tomato_Storage","ProximityDist":0,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/lANnjx2.png"},"Uncommon_Water_Barrel_Storage":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Uncommon_Water_Barrel_Storage","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/Caz2Otn.png"},"Valentines_Stand":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Valentines_Stand","ProximityDist":5,"ProximityEmit":"Strawberries","ProximityImmune":false,"FileUrl":"https://i.imgur.com/Dx7ca8V.png"},"VOX_Home":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"VOX_Home","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":true,"FileUrl":"https://i.imgur.com/P8AArjM.png"},"Warehouse":{"BuildCost":15000,"Class":"Industrial","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Warehouse","ProximityDist":2,"ProximityEmit":"Shady","ProximityImmune":true,"FileUrl":"https://i.imgur.com/qSupKVU.png"},"Warp":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Warp","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"https://i.imgur.com/ZjPH7jZ.png"},"Wasabi_Farm":{"BuildCost":250,"Class":"Fishing","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Wasabi","EdgeRequirements":"None","LaborCost":0,"Name":"Wasabi_Farm","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"https://i.imgur.com/l9UI4u0.png"},"Water_Facility":{"BuildCost":10000,"Class":"Industrial","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Water_Drum,Industrial_Ice_Block","EdgeRequirements":"Road","LaborCost":50,"Name":"Water_Facility","ProximityDist":2,"ProximityEmit":"None","ProximityImmune":true,"FileUrl":"https://i.imgur.com/1mxXPex.png"},"Water_Pump":{"BuildCost":30000,"Class":"Industrial","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Pond:OR:Waterway:OR:Bridge","LaborCost":0,"Name":"Water_Pump","ProximityDist":1,"ProximityEmit":"Water_Drum","ProximityImmune":false,"FileUrl":"https://i.imgur.com/vNc2f80.png"},"Water_Tank":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Water_Tank","ProximityDist":1,"ProximityEmit":"Water","ProximityImmune":true,"FileUrl":"https://i.imgur.com/mNWKEUL.png"},"Water_Tower":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":0,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Water_Tower","ProximityDist":3,"ProximityEmit":"Water","ProximityImmune":true,"FileUrl":"https://i.imgur.com/mh1u9dT.png"},"Well":{"BuildCost":1250,"Class":"Farm","CraftReqsMet":true,"CraftTimeMod":1,"Crafts":"Water","EdgeRequirements":"None","LaborCost":0,"Name":"Well","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"https://i.imgur.com/ZpLKYLw.png"},"Wheat_Field":{"BuildCost":250,"Class":"Farm","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Wheat","EdgeRequirements":"None","LaborCost":0,"Name":"Wheat_Field","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"https://i.imgur.com/JbI4Ugn.png"},"Wheat_Stand":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"None","LaborCost":0,"Name":"Wheat_Stand","ProximityDist":2,"ProximityEmit":"Wheat","ProximityImmune":false,"FileUrl":"https://i.imgur.com/etnfxfk.png"},"Wheat_Storage":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Wheat_Storage","ProximityDist":2,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/00AaSyP.png"},"Wild_Clover":{"BuildCost":3500,"Class":"Terrain","CraftReqsMet":true,"CraftTimeMod":1,"Crafts":"Nectar","EdgeRequirements":"None","LaborCost":0,"Name":"Wild_Clover","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"https://i.imgur.com/YW6CMUS.png"},"Wild_Net_Fishing":{"BuildCost":150000,"Class":"Fishing","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Salmon","EdgeRequirements":"Waterway:OR:Bridge","LaborCost":0,"Name":"Wild_Net_Fishing","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"https://i.imgur.com/pEcqdxT.png"},"Wind_Pump":{"BuildCost":12500,"Class":"Farm","CraftReqsMet":false,"CraftTimeMod":0.5,"Crafts":"Water","EdgeRequirements":"None","LaborCost":0,"Name":"Wind_Pump","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/Tmoj7Zb.png"},"Wind_Turbine":{"BuildCost":2500,"Class":"Industrial","CraftReqsMet":true,"CraftTimeMod":3,"Crafts":"Energy","EdgeRequirements":"Road","LaborCost":0,"Name":"Wind_Turbine","ProximityDist":2,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/21ReG1y.png"},"Windmill":{"BuildCost":2500,"Class":"Farm","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Flour,Sugar,Salt,Corn_Starch","EdgeRequirements":"Road","LaborCost":50,"Name":"Windmill","ProximityDist":3,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/PbEMOrw.png"},"Winery":{"BuildCost":1000000,"Class":"Farm","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Pinot_Noir,Cabernet_Sauvignon,Chardonnay,Sangria","EdgeRequirements":"Road","LaborCost":2000,"Name":"Winery","ProximityDist":2,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/I7SiXBM.png"},"Wire_Mill":{"BuildCost":100000,"Class":"Jewelry","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Copper_Wire,Silver_Wire","EdgeRequirements":"Road","LaborCost":200,"Name":"Wire_Mill","ProximityDist":2,"ProximityEmit":"Dirty,Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/tLJdj6s.png"},"Wizards_Workshop":{"BuildCost":1500000,"Class":"Industrial","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Mystic_Matter,Glue","EdgeRequirements":"Road","LaborCost":1875,"Name":"Wizards_Workshop","ProximityDist":1,"ProximityEmit":"Shady,Cold","ProximityImmune":false,"FileUrl":"https://i.imgur.com/MoXHbM9.png"},"Wood_Shed":{"BuildCost":5000,"Class":"Farm","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Wood_Shed","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/tsSw8XL.png"},"Wool_Storage":{"BuildCost":0,"Class":"BlockChain","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":0,"Name":"Wool_Storage","ProximityDist":1,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/JrIUWRY.png"},"Worker_House":{"BuildCost":2500,"Class":"Industrial","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"None","EdgeRequirements":"Road","LaborCost":60,"Name":"Worker_House","ProximityDist":2,"ProximityEmit":"Shady","ProximityImmune":false,"FileUrl":"https://i.imgur.com/axMu5fv.png"},"Worm_Farm":{"BuildCost":35000,"Class":"Fishing","CraftReqsMet":false,"CraftTimeMod":1,"Crafts":"Worms","EdgeRequirements":"None","LaborCost":0,"Name":"Worm_Farm","ProximityDist":0,"ProximityEmit":"None","ProximityImmune":false,"FileUrl":"https://i.imgur.com/0N24VCM.png"}};
    const newRecipes = {"350k_Stars":{"CityPoints":0,"CityPrice":0,"Class":"Produced","ProximityBonus":"None","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Cash","Req2":"none","Req3":"none","Time0":300,"Time1":600,"Time2":1200,"Time3":2400,"Value1":2500000,"Value2":0,"Value3":0,"FileUrl":"https://i.imgur.com/EOEsRwf.png"},"Advanced_Salmon":{"CityPoints":620,"CityPrice":19000,"Class":"Fish","Name":"Salmon","ProximityBonus":"Energy","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Fish_Chum","Req2":"Energy","Req3":"none","Time0":30,"Time1":60,"Time2":120,"Time3":240,"Value1":1,"Value2":3,"Value3":0,"FileUrl":"https://i.imgur.com/8IBWk83.png"},"Baa_Wool":{"CityPoints":28,"CityPrice":3750,"Class":"Crafted","Name":"Wool","ProximityBonus":"Water","ProximityPenalty":"Dirty","ProximityReverse":false,"Req1":"Feed","Req2":"Wood","Req3":"Water","Time0":30,"Time1":60,"Time2":120,"Time3":240,"Value1":4,"Value2":1,"Value3":2,"FileUrl":"https://i.imgur.com/a5U6JIq.png"},"Baguette":{"CityPoints":900,"CityPrice":110000,"Class":"Crafted","ProximityBonus":"None","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Dough","Req2":"Butter","Req3":"Flour","Time0":60,"Time1":120,"Time2":240,"Time3":480,"Value1":1,"Value2":1,"Value3":1,"FileUrl":"https://i.imgur.com/xeUd3Gx.png"},"Barn_Feed":{"CityPoints":1,"CityPrice":340,"Class":"Feed","Name":"Feed","ProximityBonus":"None","ProximityPenalty":"None","ProximityReverse":false,"Req1":"none","Req2":"none","Req3":"none","Time0":10,"Time1":20,"Time2":40,"Time3":80,"Value1":2,"Value2":0,"Value3":0,"FileUrl":"https://i.imgur.com/rkf3QF5.png"},"Barn_Water":{"CityPoints":1,"CityPrice":50,"Class":"Natural","Name":"Water","ProximityBonus":"None","ProximityPenalty":"None","ProximityReverse":false,"Req1":"none","Req2":"none","Req3":"none","Time0":30,"Time1":60,"Time2":120,"Time3":240,"Value1":0,"Value2":0,"Value3":0,"FileUrl":"https://i.imgur.com/KL9S2h6.png"},"Batter":{"CityPoints":450,"CityPrice":60700,"Class":"Crafted","ProximityBonus":"Eggs","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Flour","Req2":"Eggs","Req3":"Butter","Time0":30,"Time1":60,"Time2":120,"Time3":240,"Value1":5,"Value2":3,"Value3":2,"FileUrl":"https://i.imgur.com/3OtH8wV.png"},"Bicycle":{"CityPoints":16600,"CityPrice":120000,"Class":"Produced","ProximityBonus":"None","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Blue_Steel","Req2":"Mystic_Matter","Req3":"Lights","Time0":120,"Time1":240,"Time2":480,"Time3":960,"Value1":1,"Value2":1,"Value3":2,"FileUrl":"https://i.imgur.com/okMkjAD.png"},"Blue_Steel":{"CityPoints":6800,"CityPrice":270950,"Class":"Produced","ProximityBonus":"Energy","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Steel","Req2":"Uniforms","Req3":"Energy","Time0":90,"Time1":180,"Time2":360,"Time3":720,"Value1":5,"Value2":1,"Value3":10,"FileUrl":"https://i.imgur.com/ZqwSgF6.png"},"Boom_Canes":{"CityPoints":650,"CityPrice":12600,"Class":"Produced","ProximityBonus":"None","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Magic_Powder","Req2":"Mystic_Matter","Req3":"Candy_Canes","Time0":30,"Time1":60,"Time2":120,"Time3":240,"Value1":2,"Value2":1,"Value3":2,"FileUrl":"https://i.imgur.com/LGYwjMO.png"},"Bracelet":{"CityPoints":310,"CityPrice":110000,"Class":"Jewelry","ProximityBonus":"None","ProximityPenalty":"Dirty","ProximityReverse":false,"Req1":"Copper_Jump_Ring","Req2":"Silver_Jump_Ring","Req3":"Lobster_Clasp","Time0":150,"Time1":300,"Time2":600,"Time3":1200,"Value1":6,"Value2":3,"Value3":1,"FileUrl":"https://i.imgur.com/J87Tk95.png"},"Bread":{"CityPoints":153,"CityPrice":15550,"Class":"Crafted","ProximityBonus":"None","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Flour","Req2":"Milk","Req3":"Salt","Time0":30,"Time1":60,"Time2":120,"Time3":240,"Value1":4,"Value2":1,"Value3":1,"FileUrl":"https://i.imgur.com/cvRutvb.png"},"Bright_Corn_Starch":{"CityPoints":14,"CityPrice":2300,"Class":"Crafted","Name":"Corn_Starch","ProximityBonus":"Corn","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Corn","Req2":"none","Req3":"none","Time0":20,"Time1":40,"Time2":80,"Time3":160,"Value1":4,"Value2":0,"Value3":0,"FileUrl":"https://i.imgur.com/askmJLm.png"},"Bright_Flour":{"CityPoints":12,"CityPrice":2000,"Class":"Crafted","Name":"Flour","ProximityBonus":"Wheat","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Wheat","Req2":"none","Req3":"none","Time0":20,"Time1":40,"Time2":80,"Time3":160,"Value1":2,"Value2":0,"Value3":0,"FileUrl":"https://i.imgur.com/2ZcvsKX.png"},"Bright_Salt":{"CityPoints":16,"CityPrice":2250,"Class":"Crafted","Name":"Salt","ProximityBonus":"None","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Brine","Req2":"none","Req3":"none","Time0":20,"Time1":40,"Time2":80,"Time3":160,"Value1":4,"Value2":0,"Value3":0,"FileUrl":"https://i.imgur.com/qYtpBzT.png"},"Bright_Sugar":{"CityPoints":21,"CityPrice":2300,"Class":"Crafted","Name":"Sugar","ProximityBonus":"Sugarcane","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Sugarcane","Req2":"none","Req3":"none","Time0":20,"Time1":40,"Time2":80,"Time3":160,"Value1":3,"Value2":0,"Value3":0,"FileUrl":"https://i.imgur.com/hrgSaaA.png"},"Brine":{"CityPoints":1,"CityPrice":300,"Class":"Crop","ProximityBonus":"Water","ProximityPenalty":"Salty,PositiveOnlySalty","ProximityReverse":true,"Req1":"Water","Req2":"none","Req3":"none","Time0":180,"Time1":180,"Time2":75,"Time3":30,"TimeReverse":true,"Value1":3,"Value2":0,"Value3":0,"FileUrl":"https://i.imgur.com/BKuAY20.png"},"Butter":{"CityPoints":153,"CityPrice":20000,"Class":"Crafted","ProximityBonus":"None","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Milk","Req2":"Salt","Req3":"Sugar","Time0":30,"Time1":60,"Time2":120,"Time3":240,"Value1":2,"Value2":2,"Value3":1,"FileUrl":"https://i.imgur.com/rENuclc.png"},"Cabernet_Grapes":{"CityPoints":6,"CityPrice":1820,"Class":"Crop","ProximityBonus":"Water","ProximityPenalty":"Dirty,Salty,Shady","ProximityReverse":false,"Req1":"Water","Req2":"Wood","Req3":"none","Time0":420,"Time1":840,"Time2":1680,"Time3":3360,"Value1":2,"Value2":1,"Value3":0,"FileUrl":"https://i.imgur.com/BYslGtM.png"},"Cabernet_Sauvignon":{"CityPoints":536,"CityPrice":42000,"Class":"Crafted","ProximityBonus":"Cabernet_Grapes","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Cabernet_Grapes","Req2":"Wine_Bottle","Req3":"Oak_Barrel","Time0":270,"Time1":540,"Time2":1080,"Time3":2160,"Value1":5,"Value2":1,"Value3":1,"FileUrl":"https://i.imgur.com/w1wav9r.png"},"Cake":{"CityPoints":5500,"CityPrice":214050,"Class":"Crafted","ProximityBonus":"Energy","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Batter","Req2":"Sugar","Req3":"Energy","Time0":60,"Time1":120,"Time2":240,"Time3":480,"Value1":3,"Value2":6,"Value3":3,"FileUrl":"https://i.imgur.com/RM4pEzB.png"},"Candy_Canes":{"CityPoints":200,"CityPrice":22000,"Class":"Crafted","ProximityBonus":"Peppermint,Energy","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Peppermint","Req2":"Sugar","Req3":"Energy","Time0":120,"Time1":240,"Time2":480,"Time3":960,"Value1":3,"Value2":3,"Value3":5,"FileUrl":"https://i.imgur.com/7G0zz8Y.png"},"Candy_Corn":{"CityPoints":360,"CityPrice":22400,"Class":"Crafted","ProximityBonus":"Energy","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Corn_Starch","Req2":"Sugar","Req3":"Milk","Req4":"Energy","Time0":120,"Time1":240,"Time2":480,"Time3":960,"Value1":3,"Value2":3,"Value3":1,"Value4":2,"FileUrl":"https://i.imgur.com/askmJLm.png"},"Cash":{"CityPoints":0,"CityPrice":0,"Class":null,"ProximityBonus":"None","ProximityPenalty":"None","ProximityReverse":false,"Req1":"none","Req2":"none","Req3":"none","Time0":0,"Time1":0,"Time2":0,"Time3":0,"Value1":0,"Value2":0,"Value3":0,"FileUrl":"https://i.imgur.com/M0E8wxs.png"},"Ceramic_Bowl":{"CityPoints":9,"CityPrice":800,"Class":"Natural","ProximityBonus":"Clay_Lump,Water_Drum,Energy","ProximityPenalty":"Dirty","ProximityReverse":false,"Req1":"Clay_Lump","Req2":"Water_Drum","Req3":"Energy","Time0":150,"Time1":300,"Time2":600,"Time3":1200,"Value1":2,"Value2":1,"Value3":2,"FileUrl":"https://i.imgur.com/snWKv0Q.png"},"Chardonnay":{"CityPoints":350,"CityPrice":27950,"Class":"Crafted","ProximityBonus":"Chardonnay_Grapes","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Chardonnay_Grapes","Req2":"Wine_Bottle","Req3":"Oak_Barrel","Time0":240,"Time1":480,"Time2":960,"Time3":1920,"Value1":3,"Value2":1,"Value3":1,"FileUrl":"https://i.imgur.com/dPJY7Qp.png"},"Chardonnay_Grapes":{"CityPoints":2,"CityPrice":810,"Class":"Crop","ProximityBonus":"Water","ProximityPenalty":"Dirty,Salty,Shady","ProximityReverse":false,"Req1":"Water","Req2":"Wood","Req3":"none","Time0":360,"Time1":720,"Time2":1440,"Time3":2880,"Value1":2,"Value2":1,"Value3":0,"FileUrl":"https://i.imgur.com/N5Z1r8P.png"},"Chandelier_Earrings":{"CityPoints":311,"CityPrice":82740,"Class":"Jewelry","ProximityBonus":"None","ProximityPenalty":"Dirty","ProximityReverse":false,"Req1":"Copper_Jump_Ring","Req2":"Silver_Jump_Ring","Req3":"Silver_Wire","Time0":100,"Time1":200,"Time2":400,"Time3":800,"Value1":4,"Value2":2,"Value3":2,"FileUrl":"https://i.imgur.com/IzbI8N1.png"},"Cheese":{"CityPoints":150,"CityPrice":13000,"Class":"Crafted","ProximityBonus":"None","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Milk","Req2":"Rice_Vinegar","Req3":"none","Time0":20,"Time1":40,"Time2":80,"Time3":160,"Value1":2,"Value2":1,"Value3":0,"FileUrl":"https://i.imgur.com/C7HSH3r.png"},"Corn":{"CityPoints":1,"CityPrice":400,"Class":"Crafted","ProximityBonus":"Water","ProximityPenalty":"Dirty,Shady,Salty","ProximityReverse":false,"Req1":"Water","Req2":"none","Req3":"none","Time0":10,"Time1":20,"Time2":40,"Time3":80,"Value1":2,"Value2":0,"Value3":0,"FileUrl":"https://i.imgur.com/askmJLm.png"},"Corn_Starch":{"CityPoints":14,"CityPrice":2300,"Class":"Crafted","ProximityBonus":"Corn","ProximityPenalty":"Shady","ProximityReverse":false,"Req1":"Corn","Req2":"Wood","Req3":"none","Time0":30,"Time1":60,"Time2":120,"Time3":240,"Value1":4,"Value2":1,"Value3":0,"FileUrl":"https://i.imgur.com/askmJLm.png"},"Copper":{"CityPoints":7,"CityPrice":1860,"Class":"Produced","ProximityBonus":"Copper_Ore","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Copper_Ore","Req2":"Wood","Req3":"none","Time0":30,"Time1":60,"Time2":120,"Time3":240,"Value1":5,"Value2":1,"Value3":0,"FileUrl":"https://i.imgur.com/LdqqUnn.png"},"Copper_Jump_Ring":{"CityPoints":18,"CityPrice":4820,"Class":"Jewelry","ProximityBonus":"None","ProximityPenalty":"Dirty","ProximityReverse":false,"Req1":"Copper_Wire","Req2":"none","Req3":"none","Time0":10,"Time1":20,"Time2":40,"Time3":80,"Value1":1,"Value2":0,"Value3":0,"FileUrl":"https://i.imgur.com/hEymO76.png"},"Copper_Ore":{"CityPoints":2,"CityPrice":300,"Class":"Ore","ProximityBonus":"Water","ProximityPenalty":"Dirty,Salty,Shady","ProximityReverse":false,"Req1":"Water","Req2":"none","Req3":"none","Time0":10,"Time1":15,"Time2":20,"Time3":25,"Value1":1,"Value2":0,"Value3":0,"FileUrl":"https://i.imgur.com/VCyKIJO.png"},"Copper_Wire":{"CityPoints":17,"CityPrice":4420,"Class":"Produced","ProximityBonus":"Copper,Energy","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Copper","Req2":"Energy","Req3":"none","Time0":20,"Time1":40,"Time2":80,"Time3":160,"Value1":2,"Value2":1,"Value3":0,"FileUrl":"https://i.imgur.com/ztjQEsH.png"},"Four-Cheese_Pizza":{"CityPoints":1200,"CityPrice":138000,"Class":"Crafted","ProximityBonus":"None","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Pizza_Base","Req2":"Cheese","Req3":"Tomato","Time0":60,"Time1":120,"Time2":240,"Time3":480,"Value1":1,"Value2":2,"Value3":5,"FileUrl":"https://i.imgur.com/vmdaxQk.png"},"Chocolate_Bar":{"CityPoints":250,"CityPrice":6650,"Class":"Crafted","ProximityBonus":"Cocoa","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Cocoa","Req2":"Sugar","Req3":"Milk","Time0":90,"Time1":180,"Time2":360,"Time3":720,"Value1":3,"Value2":2,"Value3":1,"FileUrl":"https://i.imgur.com/dk3kjPf.png"},"Chocolate_Covered_Strawberries":{"CityPoints":500,"CityPrice":22000,"Class":"Crafted","ProximityBonus":"Strawberries,Energy","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Strawberries","Req2":"Chocolate_Bar","Req3":"Energy","Time0":45,"Time1":90,"Time2":180,"Time3":360,"Value1":6,"Value2":2,"Value3":2,"FileUrl":"https://i.imgur.com/SQgTgV1.png"},"Chromium":{"CityPoints":54,"CityPrice":4600,"Class":"Natural","ProximityBonus":"Energy,Water_Drum","ProximityPenalty":"Water","ProximityReverse":false,"Req1":"Lumber","Req2":"Energy","Req3":"Water_Drum","Time0":60,"Time1":120,"Time2":240,"Time3":480,"Value1":1,"Value2":3,"Value3":2,"FileUrl":"https://i.imgur.com/7XH7KLh.png"},"Clay_Lump":{"CityPoints":3,"CityPrice":300,"Class":"Natural","ProximityBonus":"Water","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Water","Req2":"none","Req3":"none","Time0":20,"Time1":40,"Time2":80,"Time3":160,"Value1":3,"Value2":0,"Value3":0,"FileUrl":"https://i.imgur.com/YNEVqub.png"},"Cocoa":{"CityPoints":5,"CityPrice":352,"Class":"Crop","ProximityBonus":"Water","ProximityPenalty":"Dirty,Salty,Shady","ProximityReverse":false,"Req1":"Water","Req2":"none","Req3":"none","Time0":60,"Time1":120,"Time2":240,"Time3":480,"Value1":5,"Value2":0,"Value3":0,"FileUrl":"https://i.imgur.com/ewr5ByG.png"},"Cold":{"CityPoints":0,"CityPrice":0,"Class":"Natural","ProximityBonus":"None","ProximityPenalty":"None","ProximityReverse":false,"Req1":"none","Req2":"none","Req3":"none","Time0":0,"Time1":0,"Time2":0,"Time3":0,"Value1":0,"Value2":0,"Value3":0,"FileUrl":"https://i.imgur.com/IlQOW9a.png"},"Cotton":{"CityPoints":1,"CityPrice":350,"Class":"Crop","ProximityBonus":"Water","ProximityPenalty":"Dirty,Salty,Shady","ProximityReverse":false,"Req1":"Water","Req2":"none","Req3":"none","Time0":20,"Time1":40,"Time2":80,"Time3":160,"Value1":4,"Value2":0,"Value3":0,"FileUrl":"https://i.imgur.com/8AS3TQ2.png"},"Cotton_Yarn":{"CityPoints":16,"CityPrice":3250,"Class":"Produced","ProximityBonus":"Cotton,Energy","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Cotton","Req2":"Lumber","Req3":"Energy","Time0":60,"Time1":120,"Time2":240,"Time3":480,"Value1":5,"Value2":1,"Value3":1,"FileUrl":"https://i.imgur.com/RcdKh6G.png"},"Crude_Oil":{"CityPoints":1,"CityPrice":50,"Class":"Fuel","ProximityBonus":"None","ProximityPenalty":"None","ProximityReverse":false,"Req1":"none","Req2":"none","Req3":"none","Time0":180,"Time1":360,"Time2":720,"Time3":1440,"Value1":0,"Value2":0,"Value3":0,"FileUrl":"https://i.imgur.com/6SAp178.png"},"Decorated_Cake":{"CityPoints":13757,"CityPrice":371050,"Class":"Crafted","ProximityBonus":"None","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Cake","Req2":"Chocolate_Bar","Req3":"Candy_Canes","Time0":60,"Time1":120,"Time2":240,"Time3":480,"Value1":1,"Value2":1,"Value3":2,"FileUrl":"https://i.imgur.com/I4IbfQn.png"},"Dough":{"CityPoints":270,"CityPrice":29150,"Class":"Crafted","ProximityBonus":"Eggs","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Flour","Req2":"Eggs","Req3":"Butter","Time0":30,"Time1":60,"Time2":120,"Time3":240,"Value1":5,"Value2":1,"Value3":1,"FileUrl":"https://i.imgur.com/led1vst.png"},"Easy_Dough":{"CityPoints":270,"CityPrice":29150,"Class":"Crafted","Name":"Dough","ProximityBonus":"Eggs","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Flour","Req2":"Eggs","Req3":"none","Time0":90,"Time1":180,"Time2":360,"Time3":720,"Value1":5,"Value2":1,"Value3":0,"FileUrl":"https://i.imgur.com/led1vst.png"},"Eel":{"CityPoints":95,"CityPrice":4500,"Class":"Fish","ProximityBonus":"None","ProximityPenalty":"Dirty","ProximityReverse":false,"Req1":"Food_Mix","Req2":"none","Req3":"none","Time0":80,"Time1":160,"Time2":320,"Time3":640,"Value1":1,"Value2":0,"Value3":0,"FileUrl":"https://i.imgur.com/QrPn2Qa.png"},"Eel_Nigiri":{"CityPoints":170,"CityPrice":16350,"Class":"Crafted","ProximityBonus":"Energy","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Eel","Req2":"White_Rice","Req3":"Wasabi","Time0":30,"Time1":60,"Time2":120,"Time3":240,"Value1":1,"Value2":1,"Value3":1,"FileUrl":"https://i.imgur.com/conz05a.png"},"Eggs":{"CityPoints":12,"CityPrice":1650,"Class":"Crafted","ProximityBonus":"Water","ProximityPenalty":"Dirty","ProximityReverse":false,"Req1":"Feed","Req2":"Wood","Req3":"Water","Time0":30,"Time1":60,"Time2":120,"Time3":240,"Value1":3,"Value2":1,"Value3":1,"FileUrl":"https://i.imgur.com/hAVwjLP.png"},"Enchanted_Object":{"CityPoints":560,"CityPrice":10500,"Class":"Produced","ProximityBonus":"Peppermint","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Mystic_Matter","Req2":"Peppermint","Req3":"Molten_Glass","Time0":120,"Time1":240,"Time2":480,"Time3":960,"Value1":1,"Value2":3,"Value3":1,"FileUrl":"https://i.imgur.com/Zy4sboA.png"},"Energy":{"CityPoints":1,"CityPrice":150,"Class":"Produced","ProximityBonus":"Crude_Oil,Water_Drum","ProximityPenalty":"Shady","ProximityReverse":false,"Req1":"Crude_Oil","Req2":"Water_Drum","Req3":"none","Time0":20,"Time1":40,"Time2":80,"Time3":160,"Value1":2,"Value2":1,"Value3":0,"FileUrl":"https://i.imgur.com/kLCUh2B.png"},"Epic_Gasoline":{"CityPoints":8,"CityPrice":1450,"Class":"Fuel","Name":"Gasoline","ProximityBonus":"Crude_Oil,Water_Drum,Energy","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Crude_Oil","Req2":"Water_Drum","Req3":"Energy","Time0":20,"Time1":40,"Time2":80,"Time3":160,"Value1":2,"Value2":2,"Value3":4,"FileUrl":"https://i.imgur.com/U81kRmG.png"},"Everyone_Else_Speed":{"CityPoints":0,"CityPrice":0,"Class":"Bonus","ProximityBonus":"None","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Cash","Req2":"Brine","Req3":"Salmon","Time0":600,"Time1":1200,"Time2":2400,"Time3":4800,"Value1":5000000,"Value2":100,"Value3":50,"FileUrl":"https://i.imgur.com/V3CUkrF.png"},"Fabric_Box":{"CityPoints":4840,"CityPrice":113350,"Class":"Produced","ProximityBonus":"None","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Wooden_Box","Req2":"Uniforms","Req3":"Wax","Time0":40,"Time1":80,"Time2":160,"Time3":320,"Value1":1,"Value2":3,"Value3":1,"FileUrl":"https://i.imgur.com/SgsBVwj.png"},"Fancy_Cake":{"CityPoints":7800,"CityPrice":274500,"Class":"Crafted","ProximityBonus":"Strawberries","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Cake","Req2":"Chocolate_Bar","Req3":"Strawberries","Time0":30,"Time1":60,"Time2":120,"Time3":240,"Value1":1,"Value2":3,"Value3":2,"FileUrl":"https://i.imgur.com/FcQNg59.png"},"Farm_Salmon":{"CityPoints":620,"CityPrice":19000,"Class":"Fish","Name":"Salmon","ProximityBonus":"Energy","ProximityPenalty":"Dirty","ProximityReverse":false,"Req1":"Fish_Chum","Req2":"Energy","Req3":"none","Time0":30,"Time1":60,"Time2":120,"Time3":240,"Value1":2,"Value2":6,"Value3":0,"FileUrl":"https://i.imgur.com/8IBWk83.png"},"Feed":{"CityPoints":2,"CityPrice":610,"Class":"Feed","ProximityBonus":"Wheat","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Wheat","Req2":"none","Req3":"none","Time0":10,"Time1":20,"Time2":40,"Time3":80,"Value1":2,"Value2":0,"Value3":0,"FileUrl":"https://i.imgur.com/rkf3QF5.png"},"Fish_Chum":{"CityPoints":110,"CityPrice":3800,"Class":"Fish","ProximityBonus":"Seaweed","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Seaweed","Req2":"Shrimp","Req3":"none","Time0":20,"Time1":40,"Time2":80,"Time3":160,"Value1":1,"Value2":2,"Value3":0,"FileUrl":"https://i.imgur.com/ot0ZROK.png"},"Fisherman_Speed":{"CityPoints":0,"CityPrice":0,"Class":"Bonus","ProximityBonus":"Seaweed","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Cash","Req2":"Seaweed","Req3":"Shrimp","Time0":600,"Time1":1200,"Time2":2400,"Time3":4800,"Value1":2500000,"Value2":100,"Value3":50,"FileUrl":"https://i.imgur.com/zHwYO29.png"},"Flour":{"CityPoints":12,"CityPrice":2000,"Class":"Crafted","ProximityBonus":"Wheat","ProximityPenalty":"Shady","ProximityReverse":false,"Req1":"Wheat","Req2":"Wood","Req3":"none","Time0":30,"Time1":60,"Time2":120,"Time3":240,"Value1":2,"Value2":1,"Value3":0,"FileUrl":"https://i.imgur.com/2ZcvsKX.png"},"Foundry_Copper_Jump_Ring":{"CityPoints":18,"CityPrice":4820,"Class":"Jewelry","Name":"Copper_Jump_Ring","ProximityBonus":"Copper,Silica","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Copper","Req2":"Silica","Req3":"none","Time0":30,"Time1":60,"Time2":120,"Time3":240,"Value1":2,"Value2":1,"Value3":0,"FileUrl":"https://i.imgur.com/hEymO76.png"},"Foundry_Silver_Jump_Ring":{"CityPoints":21,"CityPrice":4990,"Class":"Jewelry","Name":"Silver_Jump_Ring","ProximityBonus":"Silver,Silica","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Silver","Req2":"Silica","Req3":"none","Time0":30,"Time1":60,"Time2":120,"Time3":240,"Value1":2,"Value2":1,"Value3":0,"FileUrl":"https://i.imgur.com/R9eJu0C.png"},"Food_Mix":{"CityPoints":48,"CityPrice":2800,"Class":"Crafted","ProximityBonus":"None","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Roe","Req2":"Worms","Req3":"none","Time0":20,"Time1":40,"Time2":80,"Time3":160,"Value1":2,"Value2":1,"Value3":0,"FileUrl":"https://i.imgur.com/waprnlR.png"},"Food_Parcel":{"CityPoints":9650,"CityPrice":165000,"Class":"Produced","ProximityBonus":"None","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Honey","Req2":"Jam","Req3":"Baguette","Time0":30,"Time1":60,"Time2":120,"Time3":240,"Value1":1,"Value2":2,"Value3":3,"FileUrl":"https://i.imgur.com/ydNZHob.png"},"Gasoline":{"CityPoints":8,"CityPrice":1450,"Class":"Fuel","ProximityBonus":"Water_Drum,Energy","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Petroleum","Req2":"Water_Drum","Req3":"Energy","Time0":30,"Time1":60,"Time2":120,"Time3":240,"Value1":1,"Value2":2,"Value3":6,"FileUrl":"https://i.imgur.com/U81kRmG.png"},"Gift_Parcel":{"CityPoints":28000,"CityPrice":750000,"Class":"Produced","ProximityBonus":"None","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Decorated_Cake","Req2":"Sangria","Req3":"Pumpkin_Pie","Time0":30,"Time1":60,"Time2":120,"Time3":240,"Value1":1,"Value2":1,"Value3":1,"FileUrl":"https://i.imgur.com/KLp5f9B.png"},"Global_Speed":{"CityPoints":0,"CityPrice":0,"Class":"Bonus","ProximityBonus":"None","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Cash","Req2":"Fish_Chum","Req3":"Salmon_Nigiri","Time0":1800,"Time1":3600,"Time2":7200,"Time3":14400,"Value1":15000000,"Value2":100,"Value3":50,"FileUrl":"https://i.imgur.com/q0Rq6Kl.png"},"Glue":{"CityPoints":370,"CityPrice":5500,"Class":"Crafted","ProximityBonus":"Clay_Lump","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Honeycomb","Req2":"Honey","Req3":"Clay_Lump","Time0":30,"Time1":60,"Time2":120,"Time3":240,"Value1":1,"Value2":1,"Value3":2,"FileUrl":"https://i.imgur.com/TFxfsnI.png"},"Gold":{"CityPoints":10,"CityPrice":4880,"Class":"Produced","ProximityBonus":"Gold_Ore","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Gold_Ore","Req2":"Wood","Req3":"none","Time0":20,"Time1":40,"Time2":80,"Time3":160,"Value1":3,"Value2":1,"Value3":0,"FileUrl":"https://i.imgur.com/E1lEKh2.png"},"Golden_Heart_Necklace":{"CityPoints":370,"CityPrice":130800,"Class":"Ore","ProximityBonus":"None","ProximityPenalty":"Dirty","ProximityReverse":false,"Req1":"Gold-Plated_Heart_Pendant","Req2":"Lobster_Clasp","Req3":"Silver_Jump_Ring","Time0":180,"Time1":360,"Time2":720,"Time3":1440,"Value1":1,"Value2":1,"Value3":5,"FileUrl":"https://i.imgur.com/VRq2paZ.png"},"Gold_Ore":{"CityPoints":2,"CityPrice":800,"Class":"Ore","ProximityBonus":"Water","ProximityPenalty":"Dirty,Salty,Shady","ProximityReverse":false,"Req1":"Water","Req2":"none","Req3":"none","Time0":20,"Time1":30,"Time2":40,"Time3":50,"Value1":1,"Value2":0,"Value3":0,"FileUrl":"https://i.imgur.com/9C1chu6.png"},"Gold-Plated_Heart_Pendant":{"CityPoints":60,"CityPrice":12650,"Class":"Ore","ProximityBonus":"Copper,Gold","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Heart-Shaped_Print","Req2":"Copper","Req3":"Gold","Time0":40,"Time1":80,"Time2":160,"Time3":320,"Value1":1,"Value2":1,"Value3":2,"FileUrl":"https://i.imgur.com/r7DdH2n.png"},"Green_Copper":{"CityPoints":7,"CityPrice":1860,"Class":"Produced","Name":"Copper","ProximityBonus":"Copper_Ore","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Copper_Ore","Req2":"none","Req3":"none","Time0":30,"Time1":60,"Time2":120,"Time3":240,"Value1":5,"Value2":1,"Value3":0,"FileUrl":"https://i.imgur.com/LdqqUnn.png"},"Green_Gold":{"CityPoints":10,"CityPrice":4880,"Class":"Produced","Name":"Gold","ProximityBonus":"Gold_Ore","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Gold_Ore","Req2":"none","Req3":"none","Time0":20,"Time1":40,"Time2":80,"Time3":160,"Value1":3,"Value2":0,"Value3":0,"FileUrl":"https://i.imgur.com/E1lEKh2.png"},"Green_Silver":{"CityPoints":8,"CityPrice":1920,"Class":"Produced","Name":"Silver","ProximityBonus":"Silver_Ore","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Silver_Ore","Req2":"none","Req3":"none","Time0":10,"Time1":20,"Time2":40,"Time3":80,"Value1":2,"Value2":1,"Value3":0,"FileUrl":"https://i.imgur.com/yOz7olj.png"},"Heart-Shaped_Print":{"CityPoints":13,"CityPrice":3240,"Class":"Ore","ProximityBonus":"Clay_Lump,Energy,Strawberries","ProximityPenalty":"Dirty","ProximityReverse":false,"Req1":"Clay_Lump","Req2":"Energy","Req3":"Strawberries","Time0":150,"Time1":300,"Time2":600,"Time3":1200,"Value1":2,"Value2":2,"Value3":1,"FileUrl":"https://i.imgur.com/BV3QZFq.png"},"Honey":{"CityPoints":170,"CityPrice":7500,"Class":"Pantry","ProximityBonus":"Nectar","ProximityPenalty":"Dirty","ProximityReverse":false,"Req1":"Nectar","Req2":"Lumber","Req3":"Ceramic_Bowl","Time0":60,"Time1":120,"Time2":240,"Time3":480,"Value1":3,"Value2":1,"Value3":1,"FileUrl":"https://i.imgur.com/1NFghzU.png"},"Honeycomb":{"CityPoints":200,"CityPrice":1000,"Class":"Pantry","ProximityBonus":"Nectar","ProximityPenalty":"Dirty","ProximityReverse":false,"Req1":"Nectar","Req2":"Lumber","Req3":"Ceramic_Bowl","Time0":120,"Time1":240,"Time2":480,"Time3":960,"Value1":6,"Value2":2,"Value3":1,"FileUrl":"https://i.imgur.com/6dw9C7U.png"},"Husk_Rice":{"CityPoints":5,"CityPrice":470,"Class":"Crop","ProximityBonus":"Water","ProximityPenalty":"Dirty,Shady","ProximityReverse":false,"Req1":"Water","Req2":"none","Req3":"none","Time0":20,"Time1":40,"Time2":80,"Time3":160,"Value1":8,"Value2":0,"Value3":0,"FileUrl":"https://i.imgur.com/lpjBj4a.png"},"Ice_Block":{"CityPoints":70,"CityPrice":4500,"Class":"Crafted","ProximityBonus":"Cold,Water_Drum","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Cold","Req2":"Water_Drum","Req3":"none","Time0":30,"Time1":60,"Time2":120,"Time3":240,"Value1":3,"Value2":2,"Value3":0,"FileUrl":"https://i.imgur.com/sNux81d.png"},"Industrial_Ice_Block":{"CityPoints":70,"CityPrice":4500,"Class":"Crafted","Name":"Ice_Block","ProximityBonus":"Water_Drum,Cold","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Water_Drum","Req2":"Cold","Req3":"none","Time0":600,"Time1":1200,"Time2":2400,"Time3":4800,"Value1":2,"Value2":3,"Value3":0,"FileUrl":"https://i.imgur.com/sNux81d.png"},"Iron":{"CityPoints":54,"CityPrice":4600,"Class":"Produced","ProximityBonus":"Energy,Water_Drum","ProximityPenalty":"Water","ProximityReverse":false,"Req1":"Lumber","Req2":"Energy","Req3":"Water_Drum","Time0":30,"Time1":60,"Time2":120,"Time3":240,"Value1":1,"Value2":1,"Value3":1,"FileUrl":"https://i.imgur.com/eBO1su0.png"},"Jack_O_Lantern":{"CityPoints":721,"CityPrice":1000,"Class":"Produced","ProximityBonus":"Pumpkin","ProximityPenalty":"Dirty","ProximityReverse":false,"Req1":"Pumpkin","Req2":"Wax","Req3":"Cotton_Yarn","Time0":60,"Time1":120,"Time2":240,"Time3":480,"Value1":1,"Value2":2,"Value3":2,"FileUrl":"https://i.imgur.com/ygH14vk.png"},"Jam":{"CityPoints":275,"CityPrice":25000,"Class":"Pantry","ProximityBonus":"Strawberries,Water_Drum","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Strawberries","Req2":"Sugar","Req3":"Water_Drum","Time0":60,"Time1":120,"Time2":240,"Time3":480,"Value1":10,"Value2":3,"Value3":1,"FileUrl":"https://i.imgur.com/jACTQO0.png"},"Jet_Fuel":{"CityPoints":27,"CityPrice":1900,"Class":"Fuel","ProximityBonus":"Water_Drum,Energy","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Petroleum","Req2":"Water_Drum","Req3":"Energy","Time0":90,"Time1":180,"Time2":360,"Time3":720,"Value1":3,"Value2":2,"Value3":3,"FileUrl":"https://i.imgur.com/D45L9lw.png"},"Jewelry_Set":{"CityPoints":3600,"CityPrice":12650,"Class":"Ore","ProximityBonus":"Copper,Gold","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Wooden_Box","Req2":"Bracelet","Req3":"Chandelier_Earrings","Req4":"Golden_Heart_Necklace","Time0":30,"Time1":60,"Time2":120,"Time3":240,"Value1":1,"Value2":1,"Value3":2,"Value4":1,"FileUrl":"https://i.imgur.com/mCKotXb.png"},"Lasagna":{"CityPoints":25000,"CityPrice":150000,"Class":"Crafted","ProximityBonus":"Eggs","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Cheese","Req2":"Pasta_Sauce","Req3":"Eggs","Time0":60,"Time1":120,"Time2":240,"Time3":480,"Value1":2,"Value2":2,"Value3":1,"FileUrl":"https://i.imgur.com/LIpXJu9.png"},"Legendary_Oak_Wood":{"CityPoints":1,"CityPrice":300,"Class":"Timber","ProximityBonus":"Water","ProximityPenalty":"Dirty,Salty,Shady","ProximityReverse":false,"Req1":"Water","Req2":"none","Req3":"none","Time0":80,"Time1":160,"Time2":320,"Time3":640,"Value1":1,"Value2":0,"Value3":0,"FileUrl":"https://i.imgur.com/R1QpocJ.png"},"Legendary_Wood":{"CityPoints":1,"CityPrice":250,"Class":"Timber","ProximityBonus":"Water","ProximityPenalty":"Dirty,Salty,Shady","ProximityReverse":false,"Req1":"Water","Req2":"none","Req3":"none","Time0":20,"Time1":40,"Time2":80,"Time3":160,"Value1":1,"Value2":0,"Value3":0,"FileUrl":"https://i.imgur.com/96QHEUO.png"},"Lights":{"CityPoints":87,"CityPrice":2500,"Class":"Produced","ProximityBonus":"Energy","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Molten_Glass","Req2":"Energy","Req3":"none","Time0":120,"Time1":240,"Time2":480,"Time3":960,"Value1":2,"Value2":3,"Value3":0,"FileUrl":"https://i.imgur.com/MZuhHYx.png"},"Limestone":{"CityPoints":54,"CityPrice":4600,"Class":"Natural","ProximityBonus":"Energy,Water_Drum","ProximityPenalty":"Water","ProximityReverse":false,"Req1":"Lumber","Req2":"Energy","Req3":"Water_Drum","Time0":60,"Time1":120,"Time2":240,"Time3":480,"Value1":1,"Value2":3,"Value3":2,"FileUrl":"https://i.imgur.com/nHOtv78.png"},"Lobster_Clasp":{"CityPoints":100,"CityPrice":15000,"Class":"Jewelry","ProximityBonus":"None","ProximityPenalty":"Dirty","ProximityReverse":false,"Req1":"Sterling_Silver_Jump_Ring","Req2":"Copper_Jump_Ring","Req3":"Silver_Wire","Time0":20,"Time1":40,"Time2":80,"Time3":160,"Value1":1,"Value2":1,"Value3":1,"FileUrl":"https://i.imgur.com/5AsdApP.png"},"Lumber":{"CityPoints":8,"CityPrice":1350,"Class":"Timber","ProximityBonus":"Energy,Water_Drum","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Wood","Req2":"Energy","Req3":"Water_Drum","Time0":10,"Time1":20,"Time2":40,"Time3":80,"Value1":5,"Value2":2,"Value3":1,"FileUrl":"https://i.imgur.com/v9MQe35.png"},"Magic_Powder":{"CityPoints":55,"CityPrice":6500,"Class":"Produced","ProximityBonus":"Pumpkin,Strawberries","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Pumpkin","Req2":"Brine","Req3":"Strawberries","Time0":20,"Time1":40,"Time2":80,"Time3":160,"Value1":1,"Value2":2,"Value3":2,"FileUrl":"https://i.imgur.com/Jq6igg5.png"},"Magical_Ice_Block":{"CityPoints":70,"CityPrice":4500,"Class":"Crafted","Name":"Ice_Block","ProximityBonus":"Cold,Water_Drum","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Cold","Req2":"Water_Drum","Req3":"none","Time0":30,"Time1":60,"Time2":120,"Time3":240,"Value1":3,"Value2":2,"Value3":0,"FileUrl":"https://i.imgur.com/sNux81d.png"},"Milk":{"CityPoints":20,"CityPrice":4000,"Class":"Crafted","ProximityBonus":"Water,Barn_Water,Barn_Feed","ProximityPenalty":"Dirty","ProximityReverse":false,"Req1":"Feed","Req2":"Wood","Req3":"Water","Time0":30,"Time1":60,"Time2":120,"Time3":240,"Value1":8,"Value2":1,"Value3":3,"FileUrl":"https://i.imgur.com/gIcPnut.png"},"Milk_Barn_Speed":{"CityPoints":0,"CityPrice":0,"Class":"Bonus","ProximityBonus":"None","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Cash","Req2":"Milk","Req3":"Wood","Time0":600,"Time1":1200,"Time2":2400,"Time3":4800,"Value1":7000000,"Value2":100,"Value3":100,"FileUrl":"https://i.imgur.com/hUukDdb.png"},"Molten_Glass":{"CityPoints":145,"CityPrice":13500,"Class":"Produced","ProximityBonus":"Silica,Limestone,Chromium","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Silica","Req2":"Limestone","Req3":"Chromium","Time0":180,"Time1":360,"Time2":720,"Time3":1440,"Value1":4,"Value2":1,"Value3":2,"FileUrl":"https://i.imgur.com/gnuMC5T.png"},"Mystic_Matter":{"CityPoints":550,"CityPrice":26750,"Class":"Produced","ProximityBonus":"Limestone","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Glue","Req2":"Cotton_Yarn","Req3":"Limestone","Time0":120,"Time1":240,"Time2":480,"Time3":960,"Value1":1,"Value2":1,"Value3":1,"FileUrl":"https://i.imgur.com/qQIuxFn.png"},"Nectar":{"CityPoints":0,"CityPrice":0,"Class":"Natural","ProximityBonus":"None","ProximityPenalty":"None","ProximityReverse":false,"Req1":"none","Req2":"none","Req3":"none","Time0":50,"Time1":100,"Time2":200,"Time3":400,"Value1":0,"Value2":0,"Value3":0,"FileUrl":"https://i.imgur.com/9V3bX4u.png"},"Oak_Barrel":{"CityPoints":63,"CityPrice":5500,"Class":"Produced","ProximityBonus":"Iron,Energy","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Oak_Wood","Req2":"Iron","Req3":"Energy","Time0":30,"Time1":60,"Time2":120,"Time3":240,"Value1":3,"Value2":1,"Value3":1,"FileUrl":"https://i.imgur.com/sg6lu87.png"},"Oak_Wood":{"CityPoints":1,"CityPrice":300,"Class":"Timber","ProximityBonus":"Water","ProximityPenalty":"Dirty,Salty,Shady","ProximityReverse":false,"Req1":"Water","Req2":"none","Req3":"none","Time0":120,"Time1":240,"Time2":480,"Time3":960,"Value1":5,"Value2":0,"Value3":0,"FileUrl":"https://i.imgur.com/va1TgkX.png"},"Party_Box":{"CityPoints":37400,"CityPrice":1000000,"Class":"Produced","ProximityBonus":"None","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Food_Parcel","Req2":"Gift_Parcel","Req3":"Wooden_Box","Time0":30,"Time1":60,"Time2":120,"Time3":240,"Value1":1,"Value2":1,"Value3":1,"FileUrl":"https://i.imgur.com/6g9Syin.png"},"Pasta_Sauce":{"CityPoints":250,"CityPrice":17000,"Class":"Crafted","ProximityBonus":"None","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Tomato_Paste","Req2":"Salt","Req3":"Sugar","Time0":30,"Time1":60,"Time2":120,"Time3":240,"Value1":1,"Value2":3,"Value3":1,"FileUrl":"https://i.imgur.com/FEokFdK.png"},"Peppermint":{"CityPoints":8,"CityPrice":400,"Class":"Crop","ProximityBonus":"Water","ProximityPenalty":"Dirty,Salty","ProximityReverse":false,"Req1":"Water","Req2":"none","Req3":"none","Time0":180,"Time1":360,"Time2":720,"Time3":1440,"Value1":3,"Value2":0,"Value3":0,"FileUrl":"https://i.imgur.com/NnvaWQg.png"},"Petroleum":{"CityPoints":4,"CityPrice":450,"Class":"Fuel","ProximityBonus":"Crude_Oil,Water_Drum,Energy","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Crude_Oil","Req2":"Water_Drum","Req3":"Energy","Time0":30,"Time1":60,"Time2":120,"Time3":240,"Value1":2,"Value2":1,"Value3":2,"FileUrl":"https://i.imgur.com/M9H5po0.png"},"Pinot_Noir":{"CityPoints":808,"CityPrice":57200,"Class":"Crafted","ProximityBonus":"Pinot_Noir_Grapes","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Pinot_Noir_Grapes","Req2":"Wine_Bottle","Req3":"Oak_Barrel","Time0":300,"Time1":600,"Time2":1200,"Time3":2400,"Value1":6,"Value2":1,"Value3":1,"FileUrl":"https://i.imgur.com/8f0LtpW.png"},"Pinot_Noir_Grapes":{"CityPoints":10,"CityPrice":2670,"Class":"Crop","ProximityBonus":"Water","ProximityPenalty":"Dirty,Salty,Shady","ProximityReverse":false,"Req1":"Water","Req2":"Wood","Req3":"none","Time0":450,"Time1":900,"Time2":1800,"Time3":3600,"Value1":2,"Value2":1,"Value3":0,"FileUrl":"https://i.imgur.com/o3Lc4l4.png"},"Pizza_Base":{"CityPoints":750,"CityPrice":110000,"Class":"Produced","ProximityBonus":"None","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Dough","Req2":"Cheese","Req3":"Tomato_Paste","Time0":30,"Time1":60,"Time2":120,"Time3":240,"Value1":2,"Value2":2,"Value3":1,"FileUrl":"https://i.imgur.com/i1DfHYm.png"},"Pumpkin":{"CityPoints":2,"CityPrice":1000,"Class":"Crop","ProximityBonus":"Water","ProximityPenalty":"Dirty,Salty,Shady","ProximityReverse":false,"Req1":"Water","Req2":"none","Req3":"none","Time0":150,"Time1":300,"Time2":600,"Time3":1200,"Value1":10,"Value2":0,"Value3":0,"FileUrl":"https://i.imgur.com/0Uiqb63.png"},"Pumpkin_Pie":{"CityPoints":816,"CityPrice":49750,"Class":"Crafted","ProximityBonus":"Pumpkin,Eggs","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Pumpkin","Req2":"Sugar","Req3":"Eggs","Time0":180,"Time1":360,"Time2":720,"Time3":1440,"Value1":6,"Value2":5,"Value3":10,"FileUrl":"https://i.imgur.com/F0T6dQG.png"},"Rare_Gasoline":{"CityPoints":8,"CityPrice":1450,"Class":"Fuel","Name":"Gasoline","ProximityBonus":"Crude_Oil,Water_Drum,Energy","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Crude_Oil","Req2":"Water_Drum","Req3":"Energy","Time0":40,"Time1":80,"Time2":160,"Time3":320,"Value1":2,"Value2":2,"Value3":6,"FileUrl":"https://i.imgur.com/U81kRmG.png"},"Red_Steel":{"CityPoints":6800,"CityPrice":270950,"Class":"Produced","ProximityBonus":"Water_Drum,Energy","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Steel","Req2":"Water_Drum","Req3":"Energy","Time0":90,"Time1":180,"Time2":360,"Time3":720,"Value1":5,"Value2":5,"Value3":10,"FileUrl":"https://i.imgur.com/ixDsT7b.png"},"Rice_Vinegar":{"CityPoints":107,"CityPrice":4730,"Class":"Crafted","ProximityBonus":"Water,Sugarcane","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Water","Req2":"White_Rice","Req3":"Sugarcane","Time0":30,"Time1":60,"Time2":120,"Time3":240,"Value1":2,"Value2":1,"Value3":1,"FileUrl":"https://i.imgur.com/RTKpfGw.png"},"Risotto":{"CityPoints":700,"CityPrice":44000,"Class":"Crafted","ProximityBonus":"None","ProximityPenalty":"None","ProximityReverse":false,"Req1":"White_Rice","Req2":"Cheese","Req3":"Milk","Time0":60,"Time1":120,"Time2":240,"Time3":480,"Value1":7,"Value2":2,"Value3":1,"FileUrl":"https://i.imgur.com/ZPrRi5A.png"},"Rocking_Horse":{"CityPoints":1200,"CityPrice":24500,"Class":"Produced","ProximityBonus":"Iron","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Oak_Wood","Req2":"Enchanted_Object","Req3":"Iron","Time0":180,"Time1":360,"Time2":720,"Time3":1440,"Value1":4,"Value2":1,"Value3":1,"FileUrl":"https://i.imgur.com/qEkxDmA.png"},"Roe":{"CityPoints":17,"CityPrice":580,"Class":"Fish","ProximityBonus":"Seaweed","ProximityPenalty":"Dirty","ProximityReverse":false,"Req1":"Seaweed","Req2":"none","Req3":"none","Time0":30,"Time1":60,"Time2":120,"Time3":240,"Value1":1,"Value2":0,"Value3":0,"FileUrl":"https://i.imgur.com/YeWULFl.png"},"Salmon":{"CityPoints":620,"CityPrice":19000,"Class":"Fish","ProximityBonus":"Energy","ProximityPenalty":"Dirty","ProximityReverse":false,"Req1":"Fish_Chum","Req2":"Energy","Req3":"none","Time0":180,"Time1":360,"Time2":720,"Time3":1440,"Value1":1,"Value2":3,"Value3":0,"FileUrl":"https://i.imgur.com/8IBWk83.png"},"Salmon_Nigiri":{"CityPoints":1400,"CityPrice":45000,"Class":"Crafted","ProximityBonus":"Energy","ProximityPenalty":"None","ProximityReverse":false,"Req1":"White_Rice","Req2":"Salmon","Req3":"Energy","Time0":30,"Time1":60,"Time2":120,"Time3":240,"Value1":1,"Value2":1,"Value3":3,"FileUrl":"https://i.imgur.com/Y1m9Djb.png"},"Salt":{"CityPoints":16,"CityPrice":2250,"Class":"Crafted","ProximityBonus":"None","ProximityPenalty":"Shady","ProximityReverse":false,"Req1":"Brine","Req2":"Wood","Req3":"none","Time0":30,"Time1":60,"Time2":120,"Time3":240,"Value1":4,"Value2":2,"Value3":0,"FileUrl":"https://i.imgur.com/qYtpBzT.png"},"Salty_Brine":{"CityPoints":1,"CityPrice":300,"Class":"Crop","Name":"Brine","ProximityBonus":"Water","ProximityPenalty":"Salty,PositiveOnlySalty","ProximityReverse":true,"Req1":"Water","Req2":"none","Req3":"none","Time0":50,"Time1":20,"Time2":20,"Time3":20,"TimeReverse":true,"Value1":3,"Value2":0,"Value3":0,"FileUrl":"https://i.imgur.com/BKuAY20.png"},"Sangria":{"CityPoints":1290,"CityPrice":58900,"Class":"Crafted","ProximityBonus":"Strawberries","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Cabernet_Sauvignon","Req2":"Sugar","Req3":"Strawberries","Time0":120,"Time1":240,"Time2":480,"Time3":960,"Value1":1,"Value2":2,"Value3":2,"FileUrl":"https://i.imgur.com/3BjcSvD.png"},"Seaweed":{"CityPoints":6,"CityPrice":300,"Class":"Crop","ProximityBonus":"Water","ProximityPenalty":"Salty,PositiveOnlySalty","ProximityReverse":true,"Req1":"Water","Req2":"none","Req3":"none","Time0":40,"Time1":20,"Time2":10,"Time3":5,"TimeReverse":true,"Value1":2,"Value2":0,"Value3":0,"FileUrl":"https://i.imgur.com/Gd9zyA2.png"},"Shallow_Chromium":{"CityPoints":54,"CityPrice":4600,"Class":"Natural","Name":"Chromium","ProximityBonus":"Energy,Water_Drum","ProximityPenalty":"Water","ProximityReverse":false,"Req1":"Lumber","Req2":"Energy","Req3":"Water_Drum","Time0":120,"Time1":240,"Time2":480,"Time3":960,"Value1":1,"Value2":3,"Value3":2,"FileUrl":"https://i.imgur.com/wX7gehG.png"},"Shallow_Iron":{"CityPoints":54,"CityPrice":4600,"Class":"Produced","Name":"Iron","ProximityBonus":"Energy,Water_Drum","ProximityPenalty":"Water","ProximityReverse":false,"Req1":"Lumber","Req2":"Energy","Req3":"Water_Drum","Time0":60,"Time1":120,"Time2":240,"Time3":480,"Value1":1,"Value2":1,"Value3":1,"FileUrl":"https://i.imgur.com/ChwhJjy.png"},"Shallow_Limestone":{"CityPoints":54,"CityPrice":1000,"Class":"Natural","Name":"Limestone","ProximityBonus":"Energy,Water_Drum","ProximityPenalty":"Water","ProximityReverse":false,"Req1":"Lumber","Req2":"Energy","Req3":"Water_Drum","Time0":120,"Time1":240,"Time2":480,"Time3":960,"Value1":1,"Value2":3,"Value3":2,"FileUrl":"https://i.imgur.com/zPE0rC4.png"},"Shrimp":{"CityPoints":30,"CityPrice":1800,"Class":"Fish","ProximityBonus":"Seaweed","ProximityPenalty":"Dirty","ProximityReverse":false,"Req1":"Seaweed","Req2":"none","Req3":"none","Time0":20,"Time1":40,"Time2":80,"Time3":160,"Value1":2,"Value2":0,"Value3":0,"FileUrl":"https://i.imgur.com/fR7sYm1.png"},"Shrimp_Pizza":{"CityPoints":1300,"CityPrice":120000,"Class":"Produced","ProximityBonus":"Energy","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Pizza_Base","Req2":"Shrimp","Req3":"Energy","Time0":60,"Time1":120,"Time2":240,"Time3":480,"Value1":1,"Value2":5,"Value3":3,"FileUrl":"https://i.imgur.com/NoRNAQi.png"},"Silica":{"CityPoints":2,"CityPrice":1000,"Class":"Natural","ProximityBonus":"Energy","ProximityPenalty":"Salty,Sandy","ProximityReverse":true,"Req1":"Energy","Req2":"none","Req3":"none","Time0":120,"Time1":120,"Time2":60,"Time3":30,"TimeReverse":true,"Value1":2,"Value2":0,"Value3":0,"FileUrl":"https://i.imgur.com/zkRTHvE.png"},"Silver":{"CityPoints":8,"CityPrice":1920,"Class":"Produced","ProximityBonus":"Silver_Ore","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Silver_Ore","Req2":"Wood","Req3":"none","Time0":10,"Time1":20,"Time2":40,"Time3":80,"Value1":2,"Value2":1,"Value3":0,"FileUrl":"https://i.imgur.com/yOz7olj.png"},"Silver_Jump_Ring":{"CityPoints":21,"CityPrice":4990,"Class":"Jewelry","ProximityBonus":"None","ProximityPenalty":"Dirty","ProximityReverse":false,"Req1":"Silver_Wire","Req2":"none","Req3":"none","Time0":20,"Time1":40,"Time2":80,"Time3":160,"Value1":1,"Value2":0,"Value3":0,"FileUrl":"https://i.imgur.com/R9eJu0C.png"},"Silver_Ore":{"CityPoints":2,"CityPrice":400,"Class":"Ore","ProximityBonus":"Water","ProximityPenalty":"Dirty,Salty,Shady","ProximityReverse":false,"Req1":"Water","Req2":"none","Req3":"none","Time0":40,"Time1":60,"Time2":80,"Time3":100,"Value1":1,"Value2":0,"Value3":0,"FileUrl":"https://i.imgur.com/DTIfnWw.png"},"Silver_Wire":{"CityPoints":18,"CityPrice":4390,"Class":"Produced","ProximityBonus":"Silver,Energy","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Silver","Req2":"Energy","Req3":"none","Time0":10,"Time1":20,"Time2":40,"Time3":80,"Value1":2,"Value2":1,"Value3":0,"FileUrl":"https://i.imgur.com/trv2mhp.png"},"Smith_Copper_Jump_Ring":{"CityPoints":18,"CityPrice":4820,"Class":"Jewelry","Name":"Copper_Jump_Ring","ProximityBonus":"None","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Copper","Req2":"none","Req3":"none","Time0":15,"Time1":30,"Time2":60,"Time3":120,"Value1":1,"Value2":0,"Value3":0,"FileUrl":"https://i.imgur.com/hEymO76.png"},"Smith_Copper_Wire":{"CityPoints":17,"CityPrice":4420,"Class":"Produced","Name":"Copper_Wire","ProximityBonus":"None","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Copper","Req2":"none","Req3":"none","Time0":10,"Time1":20,"Time2":40,"Time3":80,"Value1":1,"Value2":0,"Value3":0,"FileUrl":"https://i.imgur.com/ztjQEsH.png"},"Stack_Box":{"CityPoints":79750,"CityPrice":2500000,"Class":"Produced","ProximityBonus":"None","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Party_Box","Req2":"Fabric_Box","Req3":"Supply_Box","Time0":30,"Time1":60,"Time2":120,"Time3":240,"Value1":1,"Value2":1,"Value3":1,"FileUrl":"https://i.imgur.com/IaVrnNS.png"},"Stars":{"CityPoints":0,"CityPrice":0,"Class":null,"ProximityBonus":"None","ProximityPenalty":"None","ProximityReverse":false,"Req1":"none","Req2":"none","Req3":"none","Time0":0,"Time1":0,"Time2":0,"Time3":0,"Value1":0,"Value2":0,"Value3":0,"FileUrl":"https://i.imgur.com/ruosoRd.png"},"Steel":{"CityPoints":768,"CityPrice":47000,"Class":"Produced","ProximityBonus":"Iron,Energy,Water_Drum","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Iron","Req2":"Energy","Req3":"Water_Drum","Time0":90,"Time1":180,"Time2":360,"Time3":720,"Value1":10,"Value2":5,"Value3":5,"FileUrl":"https://i.imgur.com/hft7PHy.png"},"Strawberries":{"CityPoints":2,"CityPrice":250,"Class":"Crop","ProximityBonus":"Water","ProximityPenalty":"Dirty,Salty","ProximityReverse":false,"Req1":"Water","Req2":"none","Req3":"none","Time0":30,"Time1":60,"Time2":120,"Time3":240,"Value1":2,"Value2":0,"Value3":0,"FileUrl":"https://i.imgur.com/lan0SyT.png"},"Sterling_Silver":{"CityPoints":20,"CityPrice":6400,"Class":"Ore","ProximityBonus":"Copper,Silver","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Copper","Req2":"Silver","Req3":"none","Time0":40,"Time1":80,"Time2":160,"Time3":320,"Value1":1,"Value2":1,"Value3":0,"FileUrl":"https://i.imgur.com/9OvxkcP.png"},"Sterling_Silver_Jump_Ring":{"CityPoints":45,"CityPrice":12500,"Class":"Ore","ProximityBonus":"Silica","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Sterling_Silver","Req2":"Silica","Req3":"none","Time0":60,"Time1":120,"Time2":240,"Time3":480,"Value1":1,"Value2":1,"Value3":0,"FileUrl":"https://i.imgur.com/ujWy5UX.png"},"Sugar":{"CityPoints":21,"CityPrice":2300,"Class":"Crafted","ProximityBonus":"Sugarcane","ProximityPenalty":"Shady","ProximityReverse":false,"Req1":"Sugarcane","Req2":"Wood","Req3":"none","Time0":30,"Time1":60,"Time2":120,"Time3":240,"Value1":3,"Value2":1,"Value3":0,"FileUrl":"https://i.imgur.com/hrgSaaA.png"},"Sugarcane":{"CityPoints":1,"CityPrice":400,"Class":"Crop","ProximityBonus":"Water","ProximityPenalty":"Dirty,Salty,Shady","ProximityReverse":false,"Req1":"Water","Req2":"none","Req3":"none","Time0":20,"Time1":40,"Time2":80,"Time3":160,"Value1":4,"Value2":0,"Value3":0,"FileUrl":"https://i.imgur.com/AZvlxki.png"},"Supply_Box":{"CityPoints":855,"CityPrice":22000,"Class":"Produced","ProximityBonus":"None","ProximityPenalty":"Dirty","ProximityReverse":false,"Req1":"Ceramic_Bowl","Req2":"Wax","Req3":"Wooden_Box","Time0":60,"Time1":120,"Time2":240,"Time3":480,"Value1":2,"Value2":2,"Value3":1,"FileUrl":"https://i.imgur.com/zuwf42y.png"},"Sushi_Boat":{"CityPoints":85000,"CityPrice":285000,"Class":"Crafted","ProximityBonus":"Energy","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Salmon_Nigiri","Req2":"Eel_Nigiri","Req3":"Rice_Vinegar","Time0":30,"Time1":60,"Time2":120,"Time3":240,"Value1":2,"Value2":1,"Value3":1,"FileUrl":"https://i.imgur.com/p2dwPhL.png"},"Trick_or_Treat_Bag":{"CityPoints":3126,"CityPrice":126820,"Class":"Crafted","ProximityBonus":"None","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Chocolate_Bar","Req2":"Candy_Corn","Req3":"Cotton_Yarn","Time0":40,"Time1":80,"Time2":160,"Time3":320,"Value1":3,"Value2":3,"Value3":1,"FileUrl":"https://i.imgur.com/askmJLm.png"},"Tomato":{"CityPoints":1,"CityPrice":350,"Class":"Crafted","ProximityBonus":"Water","ProximityPenalty":"Dirty,Salty","ProximityReverse":false,"Req1":"Water","Req2":"none","Req3":"none","Time0":30,"Time1":60,"Time2":120,"Time3":240,"Value1":3,"Value2":0,"Value3":0,"FileUrl":"https://i.imgur.com/hipbKO0.png"},"Tomato_Paste":{"CityPoints":150,"CityPrice":6000,"Class":"Crafted","ProximityBonus":"None","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Rice_Vinegar","Req2":"Tomato","Req3":"none","Time0":30,"Time1":60,"Time2":120,"Time3":240,"Value1":1,"Value2":3,"Value3":0,"FileUrl":"https://i.imgur.com/86ZrY5n.png"},"Tractor_Speed":{"CityPoints":0,"CityPrice":0,"Class":"Bonus","ProximityBonus":"None","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Cash","Req2":"Husk_Rice","Req3":"White_Rice","Time0":600,"Time1":1200,"Time2":2400,"Time3":4800,"Value1":2500000,"Value2":100,"Value3":50,"FileUrl":"https://i.imgur.com/ylFL9O9.png"},"Uniforms":{"CityPoints":560,"CityPrice":34450,"Class":"Produced","ProximityBonus":"Energy","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Cotton_Yarn","Req2":"Wool_Yarn","Req3":"Energy","Time0":60,"Time1":120,"Time2":240,"Time3":480,"Value1":3,"Value2":1,"Value3":3,"FileUrl":"https://i.imgur.com/BTktKM7.png"},"Wasabi":{"CityPoints":16,"CityPrice":450,"Class":"Crop","ProximityBonus":"Water","ProximityPenalty":"Shady","ProximityReverse":true,"Req1":"Water","Req2":"none","Req3":"none","Time0":240,"Time1":240,"Time2":120,"Time3":60,"TimeReverse":true,"Value1":3,"Value2":0,"Value3":0,"FileUrl":"https://i.imgur.com/hQELp3y.png"},"Water":{"CityPoints":1,"CityPrice":50,"Class":"Natural","ProximityBonus":"None","ProximityPenalty":"Dirty","ProximityReverse":false,"Req1":"none","Req2":"none","Req3":"none","Time0":30,"Time1":60,"Time2":120,"Time3":240,"Value1":0,"Value2":0,"Value3":0,"FileUrl":"https://i.imgur.com/KL9S2h6.png"},"Water_Drum":{"CityPoints":1,"CityPrice":50,"Class":"Produced","ProximityBonus":"Water","ProximityPenalty":"Dirty","ProximityReverse":false,"Req1":"Water","Req2":"none","Req3":"none","Time0":30,"Time1":60,"Time2":120,"Time3":240,"Value1":3,"Value2":0,"Value3":0,"FileUrl":"https://i.imgur.com/MyFn9NI.png"},"Water_Facility_Speed":{"CityPoints":0,"CityPrice":0,"Class":"Bonus","ProximityBonus":"Water_Drum","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Cash","Req2":"Water_Drum","Req3":"none","Time0":600,"Time1":1200,"Time2":2400,"Time3":4800,"Value1":75000000,"Value2":100,"Value3":0,"FileUrl":"https://i.imgur.com/KDFuGuB.png"},"Wax":{"CityPoints":170,"CityPrice":2000,"Class":"Natural","ProximityBonus":"Nectar","ProximityPenalty":"Dirty","ProximityReverse":false,"Req1":"Nectar","Req2":"Lumber","Req3":"Ceramic_Bowl","Time0":60,"Time1":120,"Time2":240,"Time3":480,"Value1":3,"Value2":1,"Value3":1,"FileUrl":"https://i.imgur.com/il0iZOt.png"},"Wheat":{"CityPoints":1,"CityPrice":300,"Class":"Crop","ProximityBonus":"Water","ProximityPenalty":"Dirty,Salty,Shady","ProximityReverse":false,"Req1":"Water","Req2":"none","Req3":"none","Time0":20,"Time1":40,"Time2":80,"Time3":160,"Value1":3,"Value2":0,"Value3":0,"FileUrl":"https://i.imgur.com/YkSWJAS.png"},"White_Rice":{"CityPoints":40,"CityPrice":1700,"Class":"Crafted","ProximityBonus":"Energy","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Husk_Rice","Req2":"Energy","Req3":"none","Time0":30,"Time1":60,"Time2":120,"Time3":240,"Value1":2,"Value2":1,"Value3":0,"FileUrl":"https://i.imgur.com/3ZXXmXM.png"},"Wine_Bottle":{"CityPoints":126,"CityPrice":12800,"Class":"Produced","ProximityBonus":"Silica,Chromium,Limestone","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Silica","Req2":"Chromium","Req3":"Limestone","Time0":60,"Time1":120,"Time2":240,"Time3":480,"Value1":3,"Value2":1,"Value3":1,"FileUrl":"https://i.imgur.com/30mEuTp.png"},"Wood":{"CityPoints":1,"CityPrice":250,"Class":"Timber","ProximityBonus":"Water","ProximityPenalty":"Dirty,Salty,Shady","ProximityReverse":false,"Req1":"Water","Req2":"none","Req3":"none","Time0":60,"Time1":120,"Time2":240,"Time3":480,"Value1":5,"Value2":0,"Value3":0,"FileUrl":"https://i.imgur.com/1aUDtKf.png"},"Wooden_Box":{"CityPoints":14,"CityPrice":2400,"Class":"Produced","ProximityBonus":"Energy","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Lumber","Req2":"Wood","Req3":"Energy","Time0":120,"Time1":240,"Time2":480,"Time3":960,"Value1":1,"Value2":2,"Value3":2,"FileUrl":"https://i.imgur.com/ZHVj6iR.png"},"Wool":{"CityPoints":28,"CityPrice":3750,"Class":"Crafted","ProximityBonus":"Water","ProximityPenalty":"Dirty","ProximityReverse":false,"Req1":"Feed","Req2":"Wood","Req3":"Water","Time0":60,"Time1":120,"Time2":240,"Time3":480,"Value1":8,"Value2":1,"Value3":5,"FileUrl":"https://i.imgur.com/a5U6JIq.png"},"Wool_Yarn":{"CityPoints":215,"CityPrice":14750,"Class":"Produced","ProximityBonus":"Energy","ProximityPenalty":"None","ProximityReverse":false,"Req1":"Wool","Req2":"Lumber","Req3":"Energy","Time0":60,"Time1":120,"Time2":240,"Time3":480,"Value1":5,"Value2":1,"Value3":1,"FileUrl":"https://i.imgur.com/vt9rRZ0.png"},"Worms":{"CityPoints":8,"CityPrice":250,"Class":"Crop","ProximityBonus":"Water","ProximityPenalty":"Dirty,Salty","ProximityReverse":false,"Req1":"Husk_Rice","Req2":"Water","Req3":"none","Time0":30,"Time1":60,"Time2":120,"Time3":240,"Value1":2,"Value2":1,"Value3":0,"FileUrl":"https://i.imgur.com/PRMpGXs.png"}};
    const nfts = {"Blueprint_Thrifty_Foundry_Common":{"class":"blueprint","category":"Thrifty_Foundry","name":"Blueprint: Thrifty Foundry (Common)","description":"The Common Blueprint: Thrifty Foundry reduces material by 40% and cash costs by 10% to build the Foundry.","utility":{"Foundry":{"Cost":-10,"Requirement":-40}}},"Blueprint_Thrifty_Foundry_Epic":{"class":"blueprint","category":"Thrifty_Foundry","name":"Blueprint: Thrifty Foundry (Epic)","description":"The Epic Blueprint: Thrifty Foundry reduces material costs by 40% and cash costs by 25% to build the Foundry.","utility":{"Foundry":{"Cost":-25,"Requirement":-40}}},"Blueprint_Thrifty_Foundry_Legendary":{"class":"blueprint","category":"Thrifty_Foundry","name":"Blueprint: Thrifty Foundry (Legendary)","description":"The Legendary Blueprint: Thrifty Foundry reduces material costs by 40% and cash costs by 30% to build the Foundry.","utility":{"Foundry":{"Cost":-30,"Requirement":-40}}},"Blueprint_Thrifty_Foundry_Luxury":{"class":"blueprint","category":"Thrifty_Foundry","title":"Blueprint: Thrifty Foundry (Luxury)","description":"The Luxury Blueprint: Thrifty Foundry reduces material costs by 40% and cash costs by 40% to build the Foundry.","utility":{"Foundry":{"Cost":-40,"Requirement":-40}}},"Blueprint_Thrifty_Foundry_Platinum":{"class":"blueprint","category":"Thrifty_Foundry","name":"Blueprint: Thrifty Foundry (Platinum)","description":"The Platinum Blueprint: Thrifty Foundry reduces material costs by 40% and cash costs by 35% to build the Foundry.","utility":{"Foundry":{"Cost":-35,"Requirement":-40}}},"Blueprint_Thrifty_Foundry_Rare":{"class":"blueprint","category":"Thrifty_Foundry","name":"Blueprint: Thrifty Foundry (Rare)","description":"The Rare Blueprint: Thrifty Foundry reduces material costs by 40% and cash costs by 20% to build the Foundry.","utility":{"Foundry":{"Cost":-20,"Requirement":-40}}},"Blueprint_Thrifty_Foundry_Uncommon":{"class":"blueprint","category":"Thrifty_Foundry","name":"Blueprint: Thrifty Foundry (Uncommon)","description":"The Uncommon Blueprint: Thrifty Foundry reduces material costs by 40% and cash costs by 15% to build the Foundry.","utility":{"Foundry":{"Cost":-15,"Requirement":-40}}},"Galaverse_in_the_Mediterranean_Sea":{"class":"other","description":"30% Global Wage Reduction","utilities":{"Wages":{"Global":-30}},"FileUrl":"https://i.imgur.com/Fl3lSZq.png"},"Ornament_One_Holiday_Tree_Card":{"class":"ornament","description":"8% Global Wage Reduction","utilities":{"Wages":{"Global":-8}},"FileUrl":"https://i.imgur.com/Pn7Zj7J.png"},"Ornament_Two_Holiday_Tree_Card":{"class":"ornament","description":"3.5% Global Wage Reduction","utilities":{"Wages":{"Global":-3.5}},"FileUrl":"https://i.imgur.com/F0Fk7gP.png"},"Ornament_Three_Holiday_Tree_Card":{"class":"ornament","description":"2% Building Cash Reduction","utilities":{"Cost":{"Global":-2}},"FileUrl":"https://i.imgur.com/agzMaj7.png"},"Ornament_Four_Holiday_Tree_Card":{"class":"ornament","description":"1.5% Global Wage Reduction","utilities":{"Wages":{"Global":-1.5}},"FileUrl":"https://i.imgur.com/Q8Up76T.png"},"Ornament_Five_Holiday_Tree_Card":{"class":"ornament","description":"9% Building Cash Reduction","utilities":{"Cost":{"Global":-9}},"FileUrl":"https://i.imgur.com/Sy6M3SN.png"},"Ornament_Six_Holiday_Tree_Card":{"class":"ornament","description":"5% Building Cash Reduction","utilities":{"Cost":{"Global":-5}},"FileUrl":"https://i.imgur.com/ykFhI7O.png"},"Ornament_Seven_Holiday_Tree_Card":{"class":"ornament","description":"1.5% Global Wage Reduction","utilities":{"Wages":{"Global":-1.5}},"FileUrl":"https://i.imgur.com/JyaTfjm.png"},"Ornament_Eight_Holiday_Tree_Card":{"class":"ornament","description":"2% Building Cash Reduction","utilities":{"Cost":{"Global":-2}},"FileUrl":"https://i.imgur.com/KBdfZpg.png"},"Ornament_Nine_Holiday_Tree_Card":{"class":"ornament","description":"5% Building Cash Reduction","utilities":{"Cost":{"Global":-5}},"FileUrl":"https://i.imgur.com/28ByPU1.png"},"Ornament_Ten_Holiday_Tree_Card":{"class":"ornament","description":"4% Global Wage Reduction","utilities":{"Wages":{"Global":-4}},"FileUrl":"https://i.imgur.com/89GynB2.png"},"Ornament_Eleven_Holiday_Tree_Card":{"class":"ornament","description":"2% Building Cash Reduction","utilities":{"Cost":{"Global":-2}},"FileUrl":"https://i.imgur.com/vfNGDar.png"},"Ornament_Twelve_Holiday_Tree_Card":{"class":"ornament","description":"1.5% Global Wage Reduction","utilities":{"Wages":{"Global":-1.5}},"FileUrl":"https://i.imgur.com/Q0rgeCS.png"}};
    const iconUrls = {
        "categoryFarm": "https://i.imgur.com/CqyWzXE.png",
        "categoryFishing": "https://i.imgur.com/mx3Ng8Y.png",
        "categoryIndustrial": "https://i.imgur.com/xEv8aiA.png",
        "categoryJewelry": "https://i.imgur.com/Ub5rptw.png",
        "categoryRanch": "https://i.imgur.com/Ad5071e.png",
        "categoryTerrain": "https://i.imgur.com/B0aLlsc.png",
        "categoryTrade": "https://i.imgur.com/jYatpFh.png",
        "remove": "https://i.imgur.com/lT5gf4m.png",
    }

    const correctionNames = {
        "Panner_Bunker_House": "Panner_Bunk_House",
        "Master_Copper_Smith": "Platinum_Master_Copper_Smith",
        "Copper_Smith": "Epic_Copper_Smith",
        "Hatched_Hank_Jr": "Hatched_Hank_Jr's",
        "Cheese_Pizza": "Four-Cheese_Pizza",
        "Tomatoes": "Tomato",
        "Wild_Salmon": "Salmon",
        "Oopsie_'23": "Mayhem_-_Oopsie_'23",
        "Nourish_Milk": "Milk",
        "Four_Cheese_Pizza": "Four-Cheese_Pizza",
    }

    function ConvertCorrectionName(name) {
        return !correctionNames[name] ? name : correctionNames[name];
    }

    let editVisualizerObserver = new MutationObserver(function(mutations) {
        if (document.querySelector("#MainGrid") != null) {
            editVisualizerObserver.disconnect();
            EditVisualizer();
            LoadEdgeNumbering();
            LoadBuildingSearch();
            // LoadFavouriteBuilding();
        }
    });
    editVisualizerObserver.observe(document, {attributes: true, childList: true , subtree: true});

    const defaultTownGuideFilename = 'TownGuideBuild';
    const localLayoutName = 'visualizer_layout';
    const appliedNftsName = 'applied_nfts';
    let canUpdateLocalLayout = false;
    let selectedCategory = "Farm";
    let appliedNfts = [];
    const appliedUtilities = {};

    let loadAfterTsvoperationObserver = new MutationObserver(function(mutations) {
        if (document.querySelector('.TSV_Operation') != null) {
            loadAfterTsvoperationObserver.disconnect();

            LoadInfoContent();
        }
    });
    loadAfterTsvoperationObserver.observe(document, {attributes: true, childList: true , subtree: true});

    function LoadInfoContent() {
        const infoContainer = document.createElement('div');
        infoContainer.id = 'info-container';
        infoContainer.classList.add('tileinfobody');

        const tabContainer = document.createElement('div');
        tabContainer.id = 'tab-container';
        infoContainer.appendChild(tabContainer);

        const infoContentContainer = document.createElement('div');
        infoContentContainer.id ='info-content-container';
        infoContainer.appendChild(infoContentContainer);

        document.querySelector('.maincontainer').appendChild(infoContainer);

        LoadLayoutTab();
        LoadCalculationTab();
        LoadSetupTab();
    }

    function GetTabContainerElement() {
        return document.querySelector('#tab-container');
    }

    function GetInfoContentContainer() {
        return document.querySelector('#info-content-container');
    }

    function GetSetupContainerContentContainer() {
        return document.querySelector('#setup-container-content-container');
    }

    const setup = {
        // Ornaments
        "ornaments": {
            "Ornament_One_Holiday_Tree_Card": {
                "name": "Ornament 1 (Wages -8%)",
            },
            "Ornament_Two_Holiday_Tree_Card": {
                "name": "Ornament 2 (Wages -3.5%)",
            },
            "Ornament_Three_Holiday_Tree_Card": {
                "name": "Ornament 3 (Cost -2%)",
            },
            "Ornament_Four_Holiday_Tree_Card": {
                "name": "Ornament 4 (Wages -1.5%)",
            },
            "Ornament_Five_Holiday_Tree_Card": {
                "name": "Ornament 5 (Cost -9%)",
            },
            "Ornament_Six_Holiday_Tree_Card": {
                "name": "Ornament 6 (Cost -5%)",
            },
            "Ornament_Seven_Holiday_Tree_Card": {
                "name": "Ornament 7 (Wages -1.5%)",
            },
            "Ornament_Eight_Holiday_Tree_Card": {
                "name": "Ornament 8 (Cost -2%)",
            },
            "Ornament_Nine_Holiday_Tree_Card": {
                "name": "Ornament 9 (Cost -5%)",
            },
            "Ornament_Ten_Holiday_Tree_Card": {
                "name": "Ornament 10 (Wages -4%)",
            },
            "Ornament_Eleven_Holiday_Tree_Card": {
                "name": "Ornament 11 (Cost -2%)",
            },
            "Ornament_Twelve_Holiday_Tree_Card": {
                "name": "Ornament 12 (Wages -1.5%)",
            },
        },
        // Blueprints
        "blueprints": {
            "Blueprint_Thrifty_Foundry_Luxury": {
                "name": "Luxury (Cost -40%, Requirement -40%)",
            },
            "Blueprint_Thrifty_Foundry_Platinum": {
                "name": "Platinum (Cost -35%, Requirement -40%)",
            },
            "Blueprint_Thrifty_Foundry_Legendary": {
                "name": "Legendary (Cost -30%, Requirement -40%)",
            },
            "Blueprint_Thrifty_Foundry_Epic": {
                "name": "Epic (Cost -25%, Requirement -40%)",
            },
            "Blueprint_Thrifty_Foundry_Rare": {
                "name": "Rare(Cost -20%, Requirement -40%)",
            },
            "Blueprint_Thrifty_Foundry_Uncommon": {
                "name": "Uncommon (Cost -15%, Requirement -40%)",
            },
            "Blueprint_Thrifty_Foundry_Common": {
                "name": "Common (Cost -10%, Requirement -40%)",
            },
        },
        // Others
        "others": {
            "Galaverse_in_the_Mediterranean_Sea": {
                "name": "Galaverse 2022 (Wages -30%)",
            },
        },
    };

    function CalculateAppliedUtilities() {
        // Reset
        Object.keys(appliedUtilities).forEach((utility) => {
            delete appliedUtilities[utility];
        });

        appliedNfts.forEach((nftName) => {
            const nft = nfts[nftName];
            if (
                nft &&
                nft.utilities
            ) {
                Object.keys(nft.utilities).forEach((utility) => {
                    Object.keys(nft.utilities[utility]).forEach((building) => {
                        if (!appliedUtilities[utility]) {
                            appliedUtilities[utility] = {};
                        }
                        if (!appliedUtilities[utility][building]) {
                            appliedUtilities[utility][building] = 0;
                        }
                        appliedUtilities[utility][building] += nft.utilities[utility][building];
                    });
                });
            }
        });
        ShowAppliedUtilities();
    }

    function ShowAppliedUtilities() {
        const sortedAppliedUtilities = SortObject(appliedUtilities);
        const infoContainer = document.querySelector('#setup-info-container');
        infoContainer.textContent = "";
        Object.keys(sortedAppliedUtilities).forEach((utility) => {
            const sortedAppliedUtilitiesBuildings = SortObject(sortedAppliedUtilities[utility]);
            Object.keys(sortedAppliedUtilitiesBuildings).forEach((building) => {
                const container = document.createElement('div');
                container.textContent = getPrettyName(utility) + " " + getPrettyName(building) + " : " + sortedAppliedUtilitiesBuildings[building] + "%";
                infoContainer.appendChild(container);
            });
        });
    }

    function LoadAppliedNfts() {
        appliedNfts = GM_getValue(appliedNftsName);
        if (!appliedNfts) {
            appliedNfts = [];
        }
    }

    function SetAppliedNfts() {
        GM_setValue(appliedNftsName, appliedNfts);
        CalculateAppliedUtilities();
    }

    function AddAppliedNfts(nftName) {
        if (!appliedNfts.includes(nftName)) {
            appliedNfts.push(nftName);
            SetAppliedNfts();
        }
    }

    function RemoveAppliedNfts(nftName) {
        if (appliedNfts.includes(nftName)) {
            const filtered = appliedNfts.filter((value) => {
                return value != nftName;
            });
            appliedNfts = filtered;
            SetAppliedNfts();
        }
    }

    function LoadSetupTab() {
        LoadAppliedNfts();

        // Tab
        const tab = document.createElement('div');
        tab.id = 'setup-tab';
        tab.textContent = 'Setup';
        tab.onclick = function() { ShowInfoSetupContent(); };
        const tabContainer = GetTabContainerElement();
        tabContainer.appendChild(tab);

        // Content
        const container = document.createElement('div');
        container.id = 'setup-container';
        container.style.display = 'none';

        const containerContentContainer = document.createElement('div');
        containerContentContainer.id = 'setup-container-content-container';
        container.appendChild(containerContentContainer);

        const contentContainer = GetInfoContentContainer();
        contentContainer.appendChild(container);

        LoadSetupInfo();
        LoadSetupOrnaments();
        LoadSetupOthers();
    }

    function LoadSetupInfo() {
        const infoContainer = document.createElement('div');
        infoContainer.id = 'setup-info-container';

        const contentContainer = GetSetupContainerContentContainer();
        contentContainer.appendChild(infoContainer);

        CalculateAppliedUtilities();
    }

    function LoadSetupOrnaments() {
        const ornaments = setup.ornaments;
        const ornamentContainer = document.createElement('div');
        ornamentContainer.id = 'ornament-container';

        const ornamentSectionTitle = document.createElement('div');
        ornamentSectionTitle.classList.add('setup-title');
        ornamentSectionTitle.textContent = 'Enchanted Ornaments';
        ornamentContainer.appendChild(ornamentSectionTitle);

        Object.keys(ornaments).forEach((nftName) => {
            const ornament = ornaments[nftName];
            const container = document.createElement('div');
            container.title = nfts[nftName].description;

            const input = document.createElement('input');
            input.type = 'checkbox';
            input.id = 'setup-' + nftName;
            input.name = 'setup-' + nftName;
            input.value = nftName;
            input.checked = appliedNfts.includes(nftName);
            input.onchange = function() { SetSetupNftNameCheckbox(this.value, this.checked); };
            container.appendChild(input);

            const label = document.createElement('label');
            label.htmlFor = 'setup-' + nftName;

            const image = document.createElement('img');
            image.src = getNftIcon(nftName);
            image.loading = "lazy";
            image.classList.add('recipeimage');
            label.appendChild(image);

            const name = document.createElement('span');
            name.classList.add('nft-title');
            name.textContent = ornament.name;
            label.appendChild(name);

            container.appendChild(label);

            ornamentContainer.appendChild(container);
        });

        const contentContainer = GetSetupContainerContentContainer();
        contentContainer.appendChild(ornamentContainer);
    }

    function LoadSetupOthers() {
        const others = setup.others;
        const otherContainer = document.createElement('div');
        otherContainer.id = 'other-container';

        const otherSectionTitle = document.createElement('div');
        otherSectionTitle.classList.add('setup-title');
        otherSectionTitle.textContent = 'Others';
        otherContainer.appendChild(otherSectionTitle);

        Object.keys(others).forEach((nftName) => {
            const other = others[nftName];
            const container = document.createElement('div');
            container.title = nfts[nftName].description;

            const input = document.createElement('input');
            input.type = 'checkbox';
            input.id = 'setup-' + nftName;
            input.name = 'setup-' + nftName;
            input.value = nftName;
            input.checked = appliedNfts.includes(nftName);
            input.onchange = function() { SetSetupNftNameCheckbox(this.value, this.checked); };
            container.appendChild(input);

            const label = document.createElement('label');
            label.htmlFor = 'setup-' + nftName;

            const image = document.createElement('img');
            image.src = getNftIcon(nftName);
            image.loading = "lazy";
            image.classList.add('recipeimage');
            label.appendChild(image);

            const name = document.createElement('span');
            name.classList.add('nft-title');
            name.textContent = other.name;
            label.appendChild(name);

            container.appendChild(label);

            otherContainer.appendChild(container);
        });

        const contentContainer = GetSetupContainerContentContainer();
        contentContainer.appendChild(otherContainer);
    }

    function SetSetupNftNameCheckbox(nftName, checked) {
        if (checked) {
            AddAppliedNfts(nftName);
        } else {
            RemoveAppliedNfts(nftName);
        }
    }

    function LoadLayoutTab() {
        // Tab
        const tab = document.createElement('div');
        tab.id = 'layout-tab';
        tab.classList.add('selected');
        tab.textContent = 'Layout';
        tab.onclick = function() { ShowInfoLayoutContent(); };
        const tabContainer = GetTabContainerElement();
        tabContainer.appendChild(tab);

        // Content
        const container = document.createElement('div');
        container.id = 'layout-container';
        const contentContainer = GetInfoContentContainer();
        contentContainer.appendChild(container);
    }

    function LoadCalculationTab() {
        // Tab
        const tab = document.createElement('div');
        tab.id = 'calculation-tab';
        tab.textContent = 'Calculation';
        tab.onclick = function() {
            // For testing many ingredients product.
            // document.querySelector('#product-rate-product-select').value = 'Stack_Box';
            // For testing many ingredients product.
            // ShowProductRate();
            ShowInfoCalculationContent();
        };
        const tabContainer = GetTabContainerElement();
        tabContainer.appendChild(tab);

        // Content
        const container = document.createElement('div');
        container.id = 'calculation-container';
        container.style.display = 'none';

        const productRateContainer = document.createElement('div');
        productRateContainer.id = 'product-rate-container';

        const productRateTitle = document.createElement('div');
        productRateTitle.id = 'product-rate-title';
        productRateTitle.classList.add('title');
        productRateTitle.textContent = 'Product Requirements Rate';
        productRateContainer.appendChild(productRateTitle);

        const productRateProduct = document.createElement('div');
        productRateProduct.id = 'product-rate-product';

        const productRateProductSelect = document.createElement('select');
        productRateProductSelect.id = 'product-rate-product-select';
        productRateProductSelect.onchange = function() { ShowProductRate(); };

        const option = document.createElement('option');
        option.value = '';
        option.textContent = '-- Select a Product --';
        productRateProductSelect.appendChild(option);

        const productNames = Object.keys(recipes);
        productNames.sort();
        for (const name of productNames) {
            const option = document.createElement('option');
            option.value = name;
            option.textContent = getPrettyName(name);
            productRateProductSelect.appendChild(option);
        }
        productRateProduct.appendChild(productRateProductSelect);
        productRateContainer.appendChild(productRateProduct);

        const productRateProductRate = document.createElement('div');
        productRateProductRate.id = 'product-rate-product-rate';

        const productRateProductRateInput = document.createElement('input');
        productRateProductRateInput.id = 'product-rate-product-rate-input';
        productRateProductRateInput.onchange = function() { ShowProductRate(); };
        productRateProductRateInput.type = 'number';
        productRateProductRateInput.min = 1;
        productRateProductRateInput.max = 9999;
        productRateProductRateInput.step = 1;
        productRateProductRateInput.value = 1;
        productRateProductRate.appendChild(productRateProductRateInput);

        const productRateProductRateLabel = document.createElement('label');
        productRateProductRateLabel.htmlFor = 'product-rate-product-rate';
        productRateProductRateLabel.textContent = ' / Hour';
        productRateProductRate.appendChild(productRateProductRateLabel);
        productRateContainer.appendChild(productRateProductRate);


        const productRateContent = document.createElement('div');
        productRateContent.id = 'product-rate-content';
        productRateContainer.appendChild(productRateContent);

        container.appendChild(productRateContainer);

        const contentContainer = GetInfoContentContainer();
        contentContainer.appendChild(container);
    }

    function RemoveInfoTabSelected() {
        const tabs = document.querySelectorAll('#tab-container > div');
        for (const tab of tabs) {
            tab.classList.remove('selected');
        }
        const containers = document.querySelectorAll('#info-content-container > div');
        for (const container of containers) {
            container.style.display = 'none';
        }
    }

    function ShowInfoLayoutContent() {
        RemoveInfoTabSelected();
        document.querySelector('#layout-tab').classList.add('selected');
        document.querySelector('#layout-container').style.display = 'block';
    }

    function ShowInfoCalculationContent() {
        RemoveInfoTabSelected();
        document.querySelector('#calculation-tab').classList.add('selected');
        document.querySelector('#calculation-container').style.display = 'block';
    }

    function ShowInfoSetupContent() {
        RemoveInfoTabSelected();
        document.querySelector('#setup-tab').classList.add('selected');
        document.querySelector('#setup-container').style.display = 'block';
    }

    const maxRequirement = 4;

    function ShowProductRate() {
        // Empty UI.
        const content = document.querySelector('#product-rate-content');
        content.textContent = "";

        // Prepare rate.
        const productName = document.querySelector('#product-rate-product-select').value;
        const rate = document.querySelector('#product-rate-product-rate-input').value;
        const craft = recipes[productName];
        if (
            craft == undefined ||
            rate <= 0
        ) {
            return;
        }

        const requirements = {};
        GetProductCraftRequirement(productName, 1, requirements);

        // Show on UI.
        const sortedRequirements = SortObject(requirements);
        for (const requirement in sortedRequirements) {
            const recipeRequirement = recipes[requirement];

            if (recipeRequirement == undefined) {
                continue;
            }

            const value = sortedRequirements[requirement] * rate;
            const requirementContainer = document.createElement('div');
            requirementContainer.classList.add('ingredient');

            const requirementImage = document.createElement('img');
            requirementImage.src = getCraftIcon(requirement);
            requirementImage.classList.add('recipeimage');
            requirementContainer.appendChild(requirementImage);

            const requirementName = document.createElement('span');
            requirementName.classList.add('product-rate-name');
            requirementName.textContent = getPrettyName(requirement);
            requirementContainer.appendChild(requirementName);

            const requirementValue = document.createElement('span');
            requirementValue.classList.add('product-rate-value');
            requirementValue.textContent = value;
            requirementContainer.appendChild(requirementValue);

            content.appendChild(requirementContainer);
        }
    }

    function GetProductCraftRequirement(productName, multiple = 1, requirements) {
        const craft = recipes[productName];
        for (let i = 1; i <= maxRequirement; i++) {
            const requirement = craft["Req" + i];
            if (
                requirement == "none" ||
                requirement == undefined
            ) {
                return;
            }

            if (requirements[requirement] == undefined) {
                requirements[requirement] = 0;
            }

            const value = craft["Value" + i];
            const newMultiple = value * multiple;
            requirements[requirement] += newMultiple;
            GetProductCraftRequirement(requirement, newMultiple, requirements);
        }
    }

    function SortObject(obj) {
        return Object.keys(obj).sort().reduce(function (result, key) {
            result[key] = obj[key];
            return result;
        }, {});
    }

    let loadAfterLayoutContainerObserver = new MutationObserver(function(mutations) {
        if (document.querySelector('#info-container') != null) {
            loadAfterLayoutContainerObserver.disconnect();

            var contentText = "";
            const txtArea = createEmbedElm("<textarea id=\"display-txtArea\" rows=\"49\" cols=\"35\"></textarea>", "div-display-txtArea", "display-txtArea", contentText, null);
            const newContainer = document.createElement('div');
            newContainer.className = 'TSV_Operation_DisplayInfo';
            newContainer.appendChild(txtArea);
            document.querySelector('#layout-container').appendChild(newContainer);

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
            showCategoryMenu(selectedCategory);
        }
    });
    loadAfterLayoutContainerObserver.observe(document, {attributes: true, childList: true , subtree: true});

    function AddCss(name, style) {
        let styleElement = document.createElement('style');
        styleElement.type = 'text/css';
        styleElement.textContent = name + ' {' + style + '}';
        document.getElementsByTagName('head')[0].appendChild(styleElement);
    }

    function AddFunction(name, content) {
        const newContent = 'function ' + name + ' {' + content + '}';
        AddScript(newContent);
    }

    function AddScript(content) {
        let scriptElement = document.createElement('script');
        scriptElement.type = 'text/javascript';
        scriptElement.textContent = content;
        document.getElementsByTagName('head')[0].appendChild(scriptElement);
    }

    // CSS
    AddCss('.tileinfo', 'overflow-y: scroll;');
    AddCss('.cell', 'position: relative; white-space: nowrap; overflow: hidden;');
    AddCss('.proximity-display', 'position: absolute; font-size: 16px; color: white; text-shadow: black 0 0 3px; top: 0; left: 0; pointer-events: none;');
    AddCss('.reciperow', 'grid-template-columns: 1fr 8fr 2fr!important; grid-template-rows: 1fr 1fr auto!important; margin-top: 5px;');
    AddCss('.recipeheader', 'position: relative; line-height: 18px;');
    AddCss('.recipecraft', 'height:100%; margin: auto 2px auto 5px;');
    AddCss('.recipetitle', 'position: absolute; width: 80%; white-space: nowrap;');
    AddCss('.recipeimage', 'width: auto; height: 23px; vertical-align: middle;');
    AddCss('.recipetimer', 'grid-column: 2 / 4;');
    AddCss('.cellcraft', 'position: absolute; z-index: 1; height: 24px; width: 24px; object-fit: contain; left: -2px; bottom: 0; -webkit-filter: drop-shadow(1px 1px 4px #666); filter: drop-shadow(1px 1px 4px #666);');
    AddCss('.categories','grid-template-columns: repeat(8, 1fr)!important;');
    AddCss('.buildingmenu','grid-template-rows: 30px 30px 6fr!important;');
    AddCss('#addon-version','position: absolute; right: 0; bottom: 0; padding: 5px; pointer-events: none;');
    AddCss('#town-guide-eu-container input', 'margin-right: 4px;');
    AddCss('#stages-body div.stage, #stage-control-container div, #add-stage-container div', 'display: inline-block; padding: 0px 8px; margin: 1px; font-size: 14px; font-weight: 400; line-height: 1.42857143; text-align: center; white-space: nowrap; vertical-align: middle; -ms-touch-action: manipulation; touch-action: manipulation; cursor: pointer; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; background-image: none; border: 1px solid transparent; border-radius: 4px; text-decoration: none;color: #000; background-color: #eee; border-color: #666;');
    AddCss('#stages-body div.stage:hover, #stage-control-container div:hover, #add-stage-container div:hover', 'background-color: #ddd;');
    AddCss('#stages-body div.stage.active', 'background-color: #333; color: #ccc;');
    AddCss('#stage-info-container', 'height: 24px;');
    AddCss('#stage-import-export-container input', 'margin-right: 4px;');
    AddCss('#stage-control-container', 'text-align: right;');
    AddCss('#stage-control-container div', 'width: 24px; height: 24px;padding:0;');
    AddCss('#stage-delete, #add-stage-div', 'background-size: cover; background-origin: content-box; padding: 2px!important; background-repeat: no-repeat!important; width: 20px!important; height: 20px!important;');
    AddCss('#stage-delete', 'background-image: url("https://cdn-icons-png.flaticon.com/512/1214/1214428.png")!important;');
    AddCss('#add-stage-container', 'display: inline-block;');
    AddCss('#add-stage-name', 'width: 115px;');
    AddCss('#add-stage-div', 'background-image: url("https://cdn-icons-png.flaticon.com/512/2997/2997933.png")!important; width:16px!important; height:16px!important;');
    AddCss('.startingtemplatecontrols', 'position: relative;');
    AddCss('#new-layout', 'position: absolute; right: 0; margin-right: 4px; color: #fff; background-color: red; cursor: pointer;');
    AddCss('#northborder, #eastborder, #southborder, #westborder', 'position: relative; display:grid; color: #eeeeee; user-select: none; background-color: #ccc; text-align: center; cursor: pointer;');
    AddCss('#northborder i, #eastborder i, #southborder i, #westborder i', 'position: absolute;');
    AddCss('#northborder i, #southborder i', 'left: 50%; transform: translate(-50%, 0)');
    AddCss('#eastborder i, #westborder i', 'top: 50%;; transform: translate(0, -50%); right: 0;');
    AddCss('#northborder i', 'top: 0;');
    AddCss('#southborder i', 'bottom: 0;');
    AddCss('#northborder, #southborder','grid-template-columns: repeat(16, 1fr);');
    AddCss('#eastborder, #westborder','grid-template-columns: repeat(16, 1fr); align-items: end; writing-mode: vertical-rl;');
    AddCss('#eastborder div, #westborder div','writing-mode: vertical-rl;');
    AddCss('#eastborder div','transform: rotate(-90deg);');
    AddCss('#westborder div','transform: rotate(90deg);');
    AddCss('#northborder','align-items: end;');
    AddCss('#southborder','align-items: start;');
    AddCss('#westborder','transform: rotate(180deg);');
    AddCss('.river','background-color: blue!important;');
    AddCss('.ocean','background-color: cornflowerblue!important;');
    AddCss('.mountains','background-color: brown!important;');
    AddCss('.desert','background-color: #f3b48b!important;');
    AddCss('.forest','background-color: #85bf85!important;');
    AddCss('.categorybutton.selected', 'border: 0; filter:brightness(150%);');
    AddCss('.buildings', 'grid-template-rows: repeat(6, 1fr)!important;');
    AddCss('.category', 'overflow-y: scroll; background-color: lightblue;');
    AddCss('#search-building-container', 'display: grid;');
    AddCss('#search-building', 'padding: 0 5px; z-index: 0;');
    AddCss('#All', 'display: none;');
    AddCss('.buildingmenubutton', 'border: 2px solid transparent;');
    AddCss('.selectedbuildingmenubutton', 'border: 2px solid black;');
    AddCss('.maincontainer', 'grid-template-columns: 240px 780px 280px!important; white-space: nowrap;');
    AddCss('.gameboard', 'grid-template-columns: 1fr 20fr 1fr!important; grid-template-rows: 1fr 20fr 1fr!important;');
    AddCss('.eastborder div, .southborder div, .westborder div, .northborder div', 'pointer-events: none;');
    AddCss('.ingredient', 'overflow: hidden;');
    AddCss('.recipes', 'grid-template-rows: auto!important;');
    AddCss('#info-container', 'display: grid; grid-area: 1 / 3 / 5 / 3; grid-template-rows: 30px auto;');
    AddCss('#tab-container', 'display: grid; grid-template-columns: repeat(3, 1fr);');
    AddCss('#tab-container div', 'color: #52a5d2; background-color: #335f8b; text-align: center; line-height: 30px; cursor: pointer;');
    AddCss('.title', 'text-align: center;');
    AddCss('#calculation-container', 'padding: 4px 0;');
    AddCss('#product-rate-product', 'padding: 0 32px;');
    AddCss('#product-rate-product-select', 'width: 100%;');
    AddCss('#product-rate-product-rate', 'text-align: center;');
    AddCss('#town-guide-eu-container', 'grid-area: 7 / 1 / 7 / 1;');
    AddCss('#stages-container', 'grid-area: 7 / 2 / 7 / 2;');
    AddCss('#div-display-txtArea', 'margin: 0!important;');
    AddCss('#info-content-container', 'overflow: hidden;');
    AddCss('#product-rate-content', 'overflow: auto; margin: 4px;');
    AddCss('#product-rate-content .recipeimage', 'margin-left: auto;');
    AddCss('#product-rate-content .ingredient', 'display: grid; grid-template-columns: 2fr 6fr 3fr;');
    AddCss('.product-rate-name', 'overflow: hidden;');
    AddCss('.product-rate-value', 'padding: 0 32px 0 4px; text-align: right;');
    AddCss('#product-rate-container', 'display: grid; height: 100%; grid-template-rows: 22px 22px 22px;');
    AddCss('#tab-container div.selected', 'border: 0; color: #335f8b; background-color: lightblue;');
    AddCss('#setup-container', 'padding: 0 8px');
    AddCss('.setup-title', 'margin-top: 4px;');
    AddCss('#setup-container-content-container', 'display: grid; grid-template-rows: 44px auto;');

    function LoadBuildingSearch() {
        const searchBuildingContainer = document.createElement("div");
        searchBuildingContainer.id = "search-building-container";
        const searchBuildingInput = document.createElement("input");
        searchBuildingInput.id = "search-building";
        searchBuildingInput.type = "text";
        searchBuildingInput.placeholder = "Search Building";
        searchBuildingInput.addEventListener("keyup", (event) => {
            if (event.isComposing || event.keyCode === 229) {
                return;
            }
            searchBuilding();
        });
        searchBuildingInput.addEventListener("blur", (event) => {
            if (event.isComposing || event.keyCode === 229) {
                return;
            }
            searchBuilding();
        });
        searchBuildingContainer.appendChild(searchBuildingInput);
        const categoriesClass = document.querySelector(".categories");
        categoriesClass.parentNode.insertBefore(searchBuildingContainer, categoriesClass.nextSibling);
    }

    function searchBuilding() {
        const searchBuildingText = document.querySelector("#search-building").value.trim();
        if (searchBuildingText.length > 0) {
            showCategoryMenu("All");
            const buildingElements = document.querySelectorAll("#All-menu div");
            for (const buildingElement of buildingElements) {
                let display = "none";
                if (new RegExp(searchBuildingText, "i").test(buildingElement.title)) {
                    display = "";
                }
                buildingElement.style.display = display;
            }
        } else {
            showCategoryMenu(selectedCategory);
        }
    }

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
            biome: "Forest",
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
            biome: "Forest",
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
            biome: "Forest",
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
        RightClickRemoveBuilding();
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

    const borders = [
        "northborder",
        "eastborder",
        "southborder",
        "westborder"
    ];

    function LoadEdgeNumbering() {
        for (const border of borders) {
            const borderElement = document.querySelector("#" + border);
            if (border != "westborder") {
                for (let i = 1; i <= dimension; i++) {
                    const div = document.createElement("div");
                    div.textContent = i;
                    borderElement.appendChild(div);
                }
            } else {
                for (let i = dimension; i > 0; i--) {
                    const div = document.createElement("div");
                    div.textContent = i;
                    borderElement.appendChild(div);
                }
            }
        }
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

    function CapitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
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
        let border = visualizerBorder;
        if (border == "none") {
            border = "OpenWorld";
        }
        return ["none","Desert","Forest"].includes(visualizerBorder) == false ? visualizerBorder : "OpenWorld";
    }

    function GetVisualizerBorderType(townGuideEuBorder) {
        return townGuideEuBorder == "OpenWorld" ? "none" : townGuideEuBorder;
    }

    function SetFromTownGuideEu(townGuideEuLayoutObject) {
        grid.biome = townGuideEuLayoutObject.biome ? CapitalizeFirstLetter(townGuideEuLayoutObject.biome) : "Forest";
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
                // renderGrid();
            });
        }
    }

    function getNftIcon(nft) {
        return getFullURL(nfts[nft]?.FileUrl);
    }

    // SCRIPT
    AddFunction('getCraftIcon(craft)',
        "return getFullURL(recipes[craft]?.FileUrl);"
    );
    AddFunction('setCellCraft(cellIndex, craft)',
        "grid.grid[cellIndex].craft = craft;" +
        "renderCellCraft(cellIndex);"
    );
    AddFunction('setRecipeCellCraft(cellIndex, building, craft)',
        "const selectedCraft = document.querySelector('input[name=\"recipe_\' + building + \'\"]:checked');" +
        "let cellCraft = undefined;" +
        "if (selectedCraft) {" +
            "cellCraft = craft;" +
        "}" +
        "setCellCraft(cellIndex, cellCraft);"
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
    AddScript('let selectedCraft = ""; let craftChecked = false;');
    AddFunction('checkCraft(input)',
        "if (" +
            "input.value == selectedCraft && " +
            "craftChecked" +
        ") {" +
            "input.checked = false;" +
            "craftChecked = false;" +
            "var event = new Event('change');" +
            "input.dispatchEvent(event);" +
            "return;" +
        "}" +
        "selectedCraft = input.value;" +
        "craftChecked = true;"
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
            var index = newBorderTypes.indexOf(grid[border]);

            index++;
            if (index > newBorderTypes.length - 1) index = 0;
            var newBorderType = newBorderTypes[index];
            grid[border] = newBorderType;
            renderBorders();
            renderGrid();
            // renderStats();
            updateExportGrid();
        }

        // Default maps
        maps = {
            "Forest": {
                "north": [{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Tree"},{"type":"Tree"},{"type":"Grass"},{"type":"Trade_Depot"},{"type":"Fuel_Storage"},{"type":"Builder_House"},{"type":"Tree"},{"type":"Grass"},{"type":"Tree"},{"type":"Tree"},{"type":"Tree"},{"type":"Tree"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Grass"},{"type":"Dirt_Road"},{"type":"Dirt_Road"},{"type":"Dirt_Road"},{"type":"Dirt_Road"},{"type":"Wood_Shed"},{"type":"Tree"},{"type":"Grass"},{"type":"Tree"},{"type":"Tree"},{"type":"Tree"},{"type":"Grass"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Grass"},{"type":"Tree"},{"type":"Tree"},{"type":"Grass"},{"type":"Tree"},{"type":"Dirt_Road"},{"type":"Silo"},{"type":"Tree"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Tree"},{"type":"Tree"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Rock"},{"type":"Grass"},{"type":"Grass"},{"type":"Dirt_Road"},{"type":"Grass"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Wheat_Field"},{"type":"Wheat_Field"},{"type":"Dirt_Road"},{"type":"Dirt_Road"},{"type":"Dirt_Road"},{"type":"Farm_House"},{"type":"Grass"},{"type":"Tree"},{"type":"Tree"},{"type":"Marsh"},{"type":"Tree"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Marsh"},{"type":"Pond"},{"type":"Well"},{"type":"Storehouse"},{"type":"Tree"},{"type":"Grass"},{"type":"Rock"},{"type":"Pond"},{"type":"Pond"},{"type":"Marsh"},{"type":"Grass"},{"type":"Marsh"},{"type":"Tree"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Marsh"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Marsh"},{"type":"Pond"},{"type":"Tree"},{"type":"Grass"},{"type":"Tree"},{"type":"Marsh"},{"type":"Pond"},{"type":"Rock"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Pasture"},{"type":"Grass"},{"type":"Grass"},{"type":"Tree"},{"type":"Marsh"},{"type":"Grass"},{"type":"Grass"},{"type":"Tree"},{"type":"Marsh"},{"type":"Pond"},{"type":"Pond"},{"type":"Marsh"},{"type":"Grass"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Tree"},{"type":"Marsh"},{"type":"Pond"},{"type":"Marsh"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Marsh"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Grass"},{"type":"Marsh"},{"type":"Tree"},{"type":"Grass"},{"type":"Pasture"},{"type":"Grass"},{"type":"Rock"},{"type":"Tree"},{"type":"Tree"},{"type":"Marsh"},{"type":"Pond"},{"type":"Tree"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Tree"},{"type":"Marsh"},{"type":"Grass"},{"type":"Marsh"},{"type":"Pond"},{"type":"Pond"},{"type":"Marsh"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Marsh"},{"type":"Pond"},{"type":"Rock"},{"type":"Grass"},{"type":"Marsh"},{"type":"Marsh"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Tree"},{"type":"Tree"},{"type":"Tree"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Marsh"},{"type":"Pond"},{"type":"Pond"},{"type":"Tree"},{"type":"Grass"},{"type":"Grass"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Tree"},{"type":"Tree"},{"type":"Grass"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Marsh"},{"type":"Marsh"},{"type":"Grass"},{"type":"Grass"},{"type":"Tree"},{"type":"Tree"},{"type":"Grass"},{"type":"Tree"},{"type":"Tree"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"},{"type":"Grass"},{"type":"Tree"},{"type":"Tree"},{"type":"Tree"},{"type":"Grass"},{"type":"Grass"},{"type":"Tree"},{"type":"Tree"},{"type":"Grass"},{"type":"Grass"},{"type":"Tree"},{"type":"Grass"}],
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

        // Overwrite renderBorders
        renderBorders = function () {
            borders.forEach((bdr) => {
                templateGrid[bdr] = grid[bdr];
                const borderElement = document.querySelector('#' + bdr);
                const borderBiome = grid[bdr];
                borderElement.setAttribute("class", "");
                borderElement.classList.add(bdr, borderBiome);
                borderElement.querySelector('i').textContent = borderBiome;
            });
        }

        // Overwrite hasEdge
        hasEdge = function (edgeType, i) {
            if (
                //check borders
                (edgeType == "Waterway" &&
                 (isBorderTile("Ocean", i) || isBorderTile("River", i))) ||
                (edgeType == "Mountains" && isBorderTile("Mountains", i)) ||
                (
                    (edgeType == "OpenWorld" || edgeType == "Town") &&
                    (
                        isBorderTile("none", i) ||
                        isBorderTile("Desert", i) ||
                        isBorderTile("Forest", i)
                    )
                ) ||
                //check NSEW
                (!isOutOfBounds(i - dimension) &&
                 isEdgeMatch(edgeType, grid.grid[i - dimension].type)) ||
                (!isOutOfBounds(i + dimension) &&
                 isEdgeMatch(edgeType, grid.grid[i + dimension].type)) ||
                (!isOutOfBounds(i - 1) &&
                 Math.floor(i / dimension) == Math.floor((i - 1) / dimension) &&
                 isEdgeMatch(edgeType, grid.grid[i - 1].type)) ||
                (!isOutOfBounds(i + 1) &&
                 Math.floor(i / dimension) == Math.floor((i + 1) / dimension) &&
                 isEdgeMatch(edgeType, grid.grid[i + 1].type))
            ) {
                return true;
            }
            return false;
        }

        // Overwrite getBorderProperty
        getBorderProperty = function (borderType) {
            switch (borderType) {
                case "River":
                    return "Water";
                case "Ocean":
                    return "Salty";
                case "Mountains":
                    return "Shady";
                case "Desert":
                    return "Sandy";
            }
        }

        // Overwrite calculateBorderEffects
        calculateBorderEffects = function () {
            const borderProximity = {
                "River": {
                    "Water": [5, 4, 3, 2, 1],
                },
                "Ocean": {
                    "Salty": [3, 2, 1],
                },
                "Mountains": {
                    "Shady": [5, 4, 3, 2, 1],
                },
                "Desert": {
                    "Sandy": [3, 2, 1],
                },
            };

            for (const border of borders) {
                if (Object.keys(borderProximity).includes(grid[border])) {
                    const proximities = borderProximity[grid[border]];
                    for (const proximity in proximities) {
                        const proximityRange = borderProximity[grid[border]][proximity].length;
                        for (let i = 0; i < proximityRange; i++) {
                            const proximityValue = borderProximity[grid[border]][proximity][i];
                            for (let j = 0; j < dimension; j++) {
                                let index = 0;
                                if (border == "northborder") {
                                    index = i * dimension + j;
                                } else if (border == "eastborder") {
                                    index = j * dimension + (dimension - i - 1);
                                } else if (border == "southborder") {
                                    index = (dimension - i - 1) * dimension + j;
                                } else if (border == "westborder") {
                                    index = j * dimension + i;
                                }

                                grid.grid[index][proximity] =
                                    grid.grid[index][proximity] + proximityValue;
                            }
                        }
                    }
                }
            }
        }

        // Overwrite updateBiome
        updateBiome = function (selection) {
            biome = selection.value;
            templateGrid.biome = biome;
            loadTemplateGrid();
            renderGrid();
        }

        // Overwrite loadTemplateGrid
        loadTemplateGrid = function () {
            grid.biome = templateGrid.biome;
            grid.northborder = templateGrid.northborder;
            grid.southborder = templateGrid.southborder;
            grid.eastborder = templateGrid.eastborder;
            grid.westborder = templateGrid.westborder;
            if (biome == "none") {
                clearGrid();
            } else {
                templateGrid.grid = getGridFromMap(biome, direction);
                setDefaultType();
                grid.grid = templateGrid.grid.map((cell) => {
                    return {
                        type: cell.type,
                        edgeSatisfied: true,
                    };
                });
            }

            updateExportGrid();
        }

        function calculateBiomeEffects() {
            const biomeProximity = {
                "Desert": {
                    "Sandy": [3]
                }
            }
            if (Object.keys(biomeProximity).includes(grid.biome)) {
                const proximities = biomeProximity[grid.biome];
                for (const proximity in proximities) {
                    const proximityRange = biomeProximity[grid.biome][proximity].length;
                    for (let i = 0; i < proximityRange; i++) {
                        const proximityValue = biomeProximity[grid.biome][proximity][i];
                        for (let index = 0, n = grid.grid.length; index < n; index++) {
                            grid.grid[index][proximity] = grid.grid[index][proximity] + proximityValue;
                        }
                    }
                }
            }
        }

        // Overwrite renderGrid
        renderGrid = function (type) {
            if (canUpdateLocalLayout) {
                resetAllPassive();
                calculateBiomeEffects();
                calculateBorderEffects();
                calculatePassiveEffects();
                calculateEdgeRequirements();
                const pageGrid = $(".gamegrid");
                for (let i = 0, n = grid.grid.length; i < n; i++) {
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
            if (selected) document.querySelector("#" + selected).classList.remove("selected");
            selected = cell.id;
            if (selectedBuilding != "") placeTile(selectedBuilding);
            cell.classList.add("selected");
            renderStats();
            // renderGrid();
        }

        // Overwrite updateExportGrid
        updateExportGrid = function () {
            if (canUpdateLocalLayout) {
                exportGrid.biome = grid.biome;
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
                grid.biome = importedGrid.biome? importedGrid.biome : "Forest";
                document.querySelector("#biomes").value = grid.biome;
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

        function removeSelectedBuildingClass() {
            const buildings = document.querySelectorAll('.buildingmenubutton');
            buildings.forEach((building) => {
                building.classList.remove("selectedbuildingmenubutton");
            });
        }

        function removeSelectedBuilding() {
            removeSelectedBuildingClass();
            selectedBuilding = "";
        }

        // Overwrite selectBuilding
        selectBuilding = function (type) {
            removeSelectedBuildingClass();
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
                "All",
                "Farm",
                "Ranch",
                "Terrain",
                "Industrial",
                "Trade",
                "Fishing",
                "Jewelry",
                "BlockChain",
            ];
            const categoryClass = document.querySelector(".category");
            const categoriesClass = document.querySelector(".categories");
            categoryClass.textContent = "";
            categoriesClass.textContent = "";
            categories.forEach((category) => {
                const isAllCategory = category == "All";
                const categoryElement = document.createElement("div");
                categoryElement.id = category;
                categoryElement.classList.add("categorybutton");
                categoryElement.onclick = function() { showCategoryMenu(category); };
                categoryElement.title = category;
                const categoryImage = document.createElement("img");
                let categoryImageSrc = "./images/" + category + "-menu.png";
                if (category === "All") {
                    categoryImageSrc = "https://cdn-icons-png.flaticon.com/512/3875/3875172.png";
                } else if (category === "Farm") {
                    categoryImageSrc = iconUrls.categoryFarm;
                } else if (category === "Ranch") {
                    categoryImageSrc = iconUrls.categoryRanch;
                } else if (category === "Terrain") {
                    categoryImageSrc = iconUrls.categoryTerrain;
                } else if (category === "Industrial") {
                    categoryImageSrc = iconUrls.categoryIndustrial;
                } else if (category === "Trade") {
                    categoryImageSrc = iconUrls.categoryTrade;
                } else if (category === "Fishing") {
                    categoryImageSrc = iconUrls.categoryFishing;
                } else if (category === "Jewelry") {
                    categoryImageSrc = iconUrls.categoryJewelry;
                }
                categoryImage.src = categoryImageSrc;
                categoryElement.appendChild(categoryImage);
                categoriesClass.appendChild(categoryElement);

                const buildingMenuElement = document.createElement("div");
                buildingMenuElement.id = category + "-menu";
                buildingMenuElement.classList.add("buildingshidden");

                for (const building in townstarObjects) {
                    if (excludedBuildings.includes(building)) continue;
                    if (
                        townstarObjects[building].Class == category ||
                        isAllCategory
                    ) {
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
                buildingImageElement.src = getFullURL(iconUrls.remove);
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
            "Barn_Feed",
            "Barn_Water",
            "Cabernet_Grapes",
            "Chardonnay_Grapes",
            "Chromium",
            "Clay_Lump",
            "Cocoa",
            "Cold",
            "Copper",
            "Copper_Ore",
            "Corn",
            "Cotton",
            "Eggs",
            "Gold",
            "Gold_Ore",
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
            "Silver",
            "Silver_Ore",
            "Strawberries",
            "Sugarcane",
            "Water_Drum",
            "Wheat",
        ];

        const newBorderTypes = [
            "none",
            "River",
            "Ocean",
            "Mountains",
            "Desert",
            "Forest"
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

                    const building = townstarObjects[type];
                    if (building) {
                        const buildingRecipes = building.Crafts.split(",");
                        if (
                            buildingRecipes.length == 1 &&
                            buildingRecipes[0] != "None"
                        ) {
                            grid.grid[id].craft = ConvertCorrectionName(buildingRecipes[0]);
                        }
                    }
                }
                renderGrid();
                updateExportGrid();
               //  renderStats();
            }
        }

        // Overwrite getCraftName
        function getCraftName(craft) {
            const name = recipes[craft]?.Name? recipes[craft].Name : craft;
            return getPrettyName(name);
        }

        // Overwrite renderStats
        renderStats = function () {
            HideStageInfo();
            const cellIndex = getCellIndex();
            const cell = grid.grid[cellIndex];
            selectedCraft = "";
            craftChecked = false;
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
            const buildingRecipes = building.Crafts.split(",");

            let recipesHTML = "";
            if (buildingRecipes.length != 0) {
                recipesHTML = "<span class='recipesheader'>Recipes</span>";
                buildingRecipes.forEach((rec) => {
                    if (rec == "None") return;
                    if (cell.craft == rec) {
                        selectedCraft = cell.craft;
                        craftChecked = true;
                    }
                    recipesHTML +=
                      `<div class="reciperow">` +
                        `<div class="recipeheader">` +
                          `<input id="recipe_${rec}" onclick="checkCraft(this);" name="recipe_${cell.type}" class="recipecraft" value="${rec}" type="radio"` + (cell.craft == rec ? ` checked` : ``) + ` onchange="setRecipeCellCraft(${cellIndex},'${cell.type}','${rec}'); updateExportGrid();"></input>` +
                          `<label for="recipe_${rec}" class="recipetitle">` +
                            `<img class='recipeimage' src='${getCraftIcon(rec)}' />` +
                          `${getCraftName(rec)}</label>` +
                        `</div>` +
                        `<div class="recipetimer">${getRecipeTime(rec, cell)}</div>` +
                        `${getIngredients(rec, cell)}` +
                      `</div>`;
                });
            }
            document.querySelector(".recipes").innerHTML = recipesHTML;
        }

        const timerGrade = [
            "besttimer",
            "oktimer",
            "badtimer",
            "worsttimer"
        ];

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
            const craftTimeMod = townstarObjects[cell.type].CraftTimeMod;
            const timeSpans = [];

            const time0 = document.createElement("span");
            time0.classList.add("timer");
            if (penalty <= 0) {
                time0.classList.add("timerselected");
            }
            time0.textContent = recipe.Time0 * craftTimeMod;
            timeSpans.push(time0);

            const time1 = document.createElement("span");
            time1.classList.add("timer");
            if (penalty == 1) {
                time1.classList.add("timerselected");
            }
            time1.textContent = recipe.Time1 * craftTimeMod;
            timeSpans.push(time1);

            const time2 = document.createElement("span");
            time2.classList.add("timer");
            if (penalty == 2) {
                time2.classList.add("timerselected");
            }
            time2.textContent = recipe.Time2 * craftTimeMod;
            timeSpans.push(time2);

            const time3 = document.createElement("span");
            time3.classList.add("timer");
            if (penalty > 2) {
                time3.classList.add("timerselected");
            }
            time3.textContent = recipe.Time3 * craftTimeMod;
            timeSpans.push(time3);

            if (recipe.TimeReverse) {
                timeSpans.reverse();
            }

            for (const key in timeSpans) {
                const timeSpan = timeSpans[key]
                timeSpan.classList.add(timerGrade[key]);
                timesHTML += timeSpan.outerHTML;
            }

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

        const ingredientBranches = {
            "Water": {
                "Barn_Water": [
                    "Fancy_Barn",
                    "Legendary_Nourish_Barn",
                    "Milk_Barn",
                ],
            },
            "Feed": {
                "Barn_Feed": [
                    "Fancy_Barn",
                    "Legendary_Nourish_Barn",
                    "Milk_Barn",
                ],
            },
        };

        // Overwrite getIngredients
        getIngredients = function (rec, cell) {
            let ingredientHTML = "";
            const recipe = recipes[rec];
            if (!townstarObjects[cell.type].CraftReqsMet) {
                for (let i = 1; i <= maxRequirement; i++) {
                    if (
                        recipe["Req" + i] == "none" ||
                        recipe["Req" + i] == undefined
                    ) {
                        return ingredientHTML;
                    }
                    ingredientHTML += getIngredientRatio(
                        recipe["Req" + i],
                        recipe["Value" + i],
                        cell
                    );
                }
            }
            return ingredientHTML;
        }

        // Overwrite getIngredientRatio
        getIngredientRatio = function (ingredient, needed, cell) {
            const present = cell[ingredient] == undefined ? 0 : cell[ingredient];
            const presentBranch = Object.keys(cell).reduce((acc, cur) => {
                if (!acc) {
                    acc = 0
                }
                if (
                    ingredientBranches[ingredient] &&
                    Object.keys(ingredientBranches[ingredient]).includes(cur) &&
                    ingredientBranches[ingredient][cur].includes(cell.type)
                ) {
                    return acc + cell[cur];
                }

                return acc;
            }, 0);
            const actualPresent = present + presentBranch;
            const ratio = `${actualPresent} / ${needed}`;

            return `<div class="ingredient">` +
                  `<img class='recipeimage' src='${getCraftIcon(ingredient)}' />` +
                  `<span>${getPrettyName(ingredient)}</span>` +
                `</div>` +
                `<div>` +
                  `${ratio}` +
                `</div>`;
        }

        // Overwrite showCategoryMenu
        showCategoryMenu = function (type) {
            removeSelectedBuilding();
            if (type != "All") {
                selectedCategory = type;
                document.querySelector("#search-building").value = "";
            }
            const categoriesElements = document.querySelectorAll(".categorybutton");
            for (const element of categoriesElements) {
                element.classList.remove("selected");
            }
            const selectedCategoryElement = document.querySelector("#" + type);
            selectedCategoryElement.classList.add("selected");

            const buildingsElements = document.querySelectorAll(".buildings");
            for (const element of buildingsElements) {
                element.setAttribute("class", "");
                element.classList.add("buildingshidden");
            }
            const selectedMenuElement = document.querySelector("#" + type + "-menu");
            selectedMenuElement.classList.remove("buildingshidden");
            selectedMenuElement.classList.add("buildings");
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
            },
            "Platinum_Master_Copper_Smith": {
                "Platinum_Master_Copper_Smith": [1],
            },
            "Panner_Brother": {
                "Cooper": [1],
                "Goldy": [1],
                "Sylvester": [1]
            },
            "Panner": {
                "Panner_Bunk_House": [2, 1],
                "Panner_House": [1],
                "Rose_&_Lily": [1],
            },
            "Legendary_Nourish_Barn": [3],
        };
        const boostedNftProximityBonuses = {
            "Haunted_Maze": {
                "Haunted_Maze_-_Zone_1": [6, 5, 4, 3, 2, 1],
                "Haunted_Maze_-_Zone_2": [4, 3, 2, 1],
                // "Haunted_Maze_-_Zone_3": [4, 4, 4, 4],
                // Custom maze3 modification to match Godot.
                "Haunted_Maze_-_Zone_3": [6, 6, 6, 6],
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
            },
            "Platinum_Master_Copper_Smith": {
                "Platinum_Master_Copper_Smith": [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            },
            "Panner_Brother": {
                "Cooper": [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                "Goldy": [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                "Sylvester": [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
            },
            "Panner": {
                "Panner_Bunk_House": [0],
                "Panner_House": [0],
                "Rose_&_Lily": [0],
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
            },
            "Platinum_Master_Copper_Smith": {
                "Platinum_Master_Copper_Smith": ["Copper"],
            },
            "Panner_Brother": {
                "Cooper": ["Copper_Ore"],
                "Goldy": ["Gold_Ore"],
                "Sylvester": ["Silver_Ore"]
            },
            "Panner": {
                "Panner_Bunk_House": ["Shady"],
                "Panner_House": ["Shady"],
                "Rose_&_Lily": ["Shady"],
            }
        };

        const mazeSets = Object.keys(originalNFTProximityBonuses.Haunted_Maze);
        function IsFullMazeSets() {
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
        function IsDiamondWaterPump() {
            let valid = false;
            Object.values(grid.grid).forEach(({type: type}) => {
                if (type == "Diamond_Water_Pump") {
                    valid = true;
                }
            });

            return valid;
        }

        const diamondChargeStation = Object.keys(originalNFTProximityBonuses.Diamond_Charge_Station);
        function IsDiamondChargeStation() {
            let valid = false;
            Object.values(grid.grid).forEach(({type: type}) => {
                if (type == "Diamond_Charge_Station") {
                    valid = true;
                }
            });

            return valid;
        }

        const pannerSets = Object.keys(originalNFTProximityBonuses.Panner);
        function IsFullPannerBrotherSets() {
            let cooper = false,
                goldy = false,
                sylvester = false;
            Object.values(grid.grid).forEach(({type: type}) => {
                if (type == "Cooper") {
                    cooper = true;
                } else if (type == "Goldy") {
                    goldy = true;
                } else if (type == "Sylvester") {
                    sylvester = true;
                }
            });

            return cooper && goldy && sylvester;
        }

        const applyOnceBuildings = [
            "Platinum_Master_Copper_Smith",
            "Cooper",
            "Goldy",
            "Sylvester",
        ];

        const selfProximityBuildings = [
            "Legendary_Nourish_Barn",
        ];

        // Overwrite calculatePassiveEffects
        calculatePassiveEffects = function() {
            let applied = {
                Platinum_Master_Copper_Smith: false,
                Cooper: false,
                Goldy: false,
                Sylvester: false
            };

            const isFullMazeSets = IsFullMazeSets();
            const isDiamondWaterPump = IsDiamondWaterPump();
            const isDiamondChargeStation = IsDiamondChargeStation();
            const isFullPannerBrotherSets = IsFullPannerBrotherSets();

            for (let i = 0; i < grid.grid.length; i++) {
                const cell = grid.grid[i];
                const building = townstarObjects[cell.type];
                const isMaze3 = cell.type == "Haunted_Maze_-_Zone_3";
                const isSelfProximity = selfProximityBuildings.includes(cell.type);

                if (building == null) continue;

                let effects = building.ProximityEmit.split(",");
                let effectRadius = building.ProximityDist;
                let proximityDistIndex = 0;
                let isProximityDistArray = Array.isArray(building.ProximityDist);
                if (isProximityDistArray) {
                    effectRadius = building.ProximityDist[proximityDistIndex];
                }
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
                if (cell.type === "Platinum_Master_Copper_Smith") {
                    effects = boostedNftProximityEffects.Platinum_Master_Copper_Smith.Platinum_Master_Copper_Smith;
                    if (applied[cell.type] === false) {
                        effectRadius = 32;
                        effectValue = effectRadius;
                        fixedEffectValue = 1;
                    } else {
                        effectRadius = 0;
                        effectValue = effectRadius;
                        fixedEffectValue = 0;
                    }
                }
                if (cell.type === "Cooper") {
                    effects = boostedNftProximityEffects.Panner_Brother.Cooper;
                    if (applied[cell.type] === false) {
                        effectRadius = 32;
                        effectValue = effectRadius;
                        fixedEffectValue = 1;
                    } else {
                        effectRadius = 0;
                        effectValue = effectRadius;
                        fixedEffectValue = 0;
                    }
                }
                if (cell.type === "Goldy") {
                    effects = boostedNftProximityEffects.Panner_Brother.Goldy;
                    if (applied[cell.type] === false) {
                        effectRadius = 32;
                        effectValue = effectRadius;
                        fixedEffectValue = 1;
                    } else {
                        effectRadius = 0;
                        effectValue = effectRadius;
                        fixedEffectValue = 0;
                    }
                }
                if (cell.type === "Sylvester") {
                    effects = boostedNftProximityEffects.Panner_Brother.Sylvester;
                    if (applied[cell.type] === false) {
                        effectRadius = 32;
                        effectValue = effectRadius;
                        fixedEffectValue = 1;
                    } else {
                        effectRadius = 0;
                        effectValue = effectRadius;
                        fixedEffectValue = 0;
                    }
                }
                if (cell.type === "Legendary_Nourish_Barn") {
                    effectValue = originalNFTProximityBonuses[cell.type][0];
                    effectRadius = (originalNFTProximityBonuses[cell.type]).length;
                }

                for (const index in effects) {
                    if (isProximityDistArray) {
                        effectRadius = building.ProximityDist[proximityDistIndex];
                        effectValue = building.ProximityDist[proximityDistIndex++];
                    }
                    const proximity = effects[index];
                    if (
                        building.ProximityEmit == "None"
                        && fixedEffectValue == 0
                    ) {
                        effectRadius = 0;
                    }
                    if (mazeSets.includes(cell.type)) {
                        if (
                            isFullMazeSets == true &&
                            boostedNftProximityEffects.Haunted_Maze[cell.type].includes(proximity) == true
                        ) {
                            const boostedBonuses = boostedNftProximityBonuses.Haunted_Maze[cell.type];
                            effectValue = boostedBonuses[0];
                            effectRadius = boostedBonuses.length;
                            if (isMaze3) {
                                fixedEffectValue = effectValue;
                            }
                        } else {
                            const originalBonuses = originalNFTProximityBonuses.Haunted_Maze[cell.type];
                            effectValue = originalBonuses[0];
                            effectRadius = originalBonuses.length;
                            if (isMaze3) {
                                fixedEffectValue = effectValue;
                            }
                        }
                    }
                    if (diamondWaterPump.includes(cell.type)) {
                        if (
                            isDiamondWaterPump == true &&
                            boostedNftProximityEffects.Diamond_Water_Pump[cell.type].includes(proximity) == true
                        ) {
                            const boostedBonuses = boostedNftProximityBonuses.Diamond_Water_Pump[cell.type];
                            effectValue = boostedBonuses[0];
                            effectRadius = boostedBonuses.length;
                        } else {
                            const originalBonuses = originalNFTProximityBonuses.Diamond_Water_Pump[cell.type];
                            effectValue = originalBonuses[0];
                            effectRadius = originalBonuses.length;
                        }
                    }
                    if (diamondChargeStation.includes(cell.type)) {
                        if (
                            isDiamondChargeStation == true &&
                            boostedNftProximityEffects.Diamond_Charge_Station[cell.type].includes(proximity) == true
                        ) {
                            const boostedBonuses = boostedNftProximityBonuses.Diamond_Charge_Station[cell.type];
                            effectValue = boostedBonuses[0];
                            effectRadius = boostedBonuses.length;
                        } else {
                            const originalBonuses = originalNFTProximityBonuses.Diamond_Charge_Station[cell.type];
                            effectValue = originalBonuses[0];
                            effectRadius = originalBonuses.length;
                        }
                    }
                    if (pannerSets.includes(cell.type)) {
                        if (
                            isFullPannerBrotherSets == true &&
                            boostedNftProximityEffects.Panner[cell.type].includes(proximity) == true
                        ) {
                            const boostedBonuses = boostedNftProximityBonuses.Panner[cell.type];
                            effectValue = boostedBonuses[0];
                            effectRadius = boostedBonuses.length;
                        } else {
                            const originalBonuses = originalNFTProximityBonuses.Panner[cell.type];
                            effectValue = originalBonuses[0];
                            effectRadius = originalBonuses.length;
                        }
                    }
                    if (effectRadius == 0) continue;
                    setTileProximity(i, proximity, effectValue, effectRadius, fixedEffectValue, isSelfProximity);
                }

                if (applyOnceBuildings.includes(cell.type)) {
                    applied[cell.type] = true;
                }
            }
        }

        function setTileProximity(index, proximity, value, radius, fixedEffectValue, isSelfProximity = false) {
            const tileRow = Math.floor(index / dimension);
            const tileCol = index % dimension;
            const tileType = grid.grid[index].type;

            if (isSelfProximity) {
                let proximityValue = value;
                if (fixedEffectValue != 0) {
                    proximityValue = fixedEffectValue;
                }
                grid.grid[index][proximity] += proximityValue;
            }

            for (let x1 = tileRow - radius, x2 = tileRow + radius; x1 <= x2; x1++) {
                for (let y1 = tileCol - radius, y2 = tileCol + radius; y1 <= y2; y1++) {
                    if (IsOutOfGrid(x1, y1) === false) {
                        const xOffset = Math.abs(tileRow - x1);
                        const yOffset = Math.abs(tileCol - y1);
                        const tileIndex = (dimension * x1) + y1;
                        let proximityValue = 0;
                        if (!(xOffset == 0 && yOffset == 0)) {
                            const yOffsetValue = Math.max(yOffset - 1, 0);
                            const xOffsetValue = Math.max(xOffset - 1, 0);
                            if (yOffsetValue + xOffsetValue <= radius) {
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
                        // If no proximity bonus allowed, remove the proximity on the building tile.
                        const type = grid.grid[tileIndex].type;
                        if (type) {
                            const crafts = townstarObjects[type].Crafts.split(",");
                            for (const craft of crafts) {
                                if (recipes[craft]) {
                                    const recipe = recipes[craft];
                                    if (
                                        [recipe.Req1, recipe.Req2, recipe.Req3, recipe.Req4].includes(proximity) &&
                                        (
                                            recipe.ProximityBonus == "None" ||
                                            recipe.ProximityBonus.split(",").includes(proximity) === false
                                        )
                                    ) {
                                        grid.grid[tileIndex][proximity] -= proximityValue;
                                        break;
                                    }
                                }
                            }
                        }
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
        if (
            appliedUtilities.Cost &&
            appliedUtilities.Cost.Global
        ) {
            totalBuildCost = totalBuildCost * (100 + appliedUtilities.Cost.Global) / 100;
        }
        if (
            appliedUtilities.Wages &&
            appliedUtilities.Wages.Global
        ) {
            totalLabourCost = totalLabourCost * (100 + appliedUtilities.Wages.Global) / 100;
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

        ShowInfoLayoutContent();
    };
})();
