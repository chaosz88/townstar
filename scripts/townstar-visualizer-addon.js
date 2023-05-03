// ==UserScript==
// @name         Town Star Visualizer Addon
// @namespace    http://tampermonkey.net/
// @version      0.5.0.1
// @description  Update citadelofthewind.
// @author       Oizys, Kewlhwip, TruckTonka, LowCat
// @match        http*://citadelofthewind.com/wp-content/visualizer*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let editVisualizerobserver = new MutationObserver(function(mutations){
        if (document.querySelector("#MainGrid") != null) {
            editVisualizerobserver.disconnect();
            EditVisualizer();
            SaveAsTownGuideEuCompatible();
        }
    });
    editVisualizerobserver.observe(document, {attributes: true, childList: true , subtree: true});

    async function LoadJsonData(id) {
        let jsonData;
        await fetch('https://json.extendsclass.com/bin/' + id).then(function(response) {
            return response.json();
        }).then(function(data) {
            jsonData = data;
        }).catch(function() {
            //
        });
        return jsonData;
    }

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
    AddCss('.maincontainer','grid-template-rows: 352px 24px 24px 376px 48px!important;');
    AddCss('.categories','grid-template-columns: repeat(7, 1fr)!important;');
    AddCss('.buildingmenu','grid-template-rows: 0fr 6fr!important;');
    AddCss('#Fishing','filter: brightness(100);-filter-webkit: brightness(100);');

    function SaveAsTownGuideEuCompatible() {
        const importExport = document.querySelector('.importexport');
        const fileName = "TownGuideBuild";
        const input = document.createElement('input');
        input.type = "button";
        input.value = "Save as town-guide.eu File";
        input.onclick = function () {
            const layout = GetTownGuideEuLayout(fileName);
            const blob = new Blob(
                [JSON.stringify(layout)],
                { type: "text/plain;charset=utf-8" }
            );
            const url = URL.createObjectURL(blob);
            const file = document.createElement(`a`);
            file.download = fileName + ".txt";
            file.href = url;
            document.body.appendChild(file);
            file.click();
            file.remove();
            URL.revokeObjectURL(url);
        };
        importExport.appendChild(input);
    }

    function GetTownGuideEuLayout(fileName) {
        const validTownGuideEuBiomes = ["forest", "plains", "desert"];
        const biome = document.querySelector("#biomes").value.toLowerCase();
        // Default layout structure
        const layout = {
            "borders": {
                "North": grid.northborder == "none" ? "OpenWorld" : grid.northborder,
                "East": grid.eastborder == "none" ? "OpenWorld" : grid.eastborder,
                "South": grid.southborder == "none" ? "OpenWorld" : grid.southborder,
                "West": grid.westborder == "none" ? "OpenWorld" : grid.westborder,
            },
            "biome": validTownGuideEuBiomes.includes(biome) ? biome : "forest",
            "name": fileName,
            "stages": [
                {
                    "index": 0,
                    "bank": 0,
                    "name": "First",
                    "limits": {},
                    "board": GetTownGuideEuBoard(),
                }
            ],
        };

        return layout
    }

    function GetTownGuideEuBoard() {
        const board = {};
        Object.keys(grid.grid).forEach(async key => {
            const z = Math.floor(key / 16);
            const x = key - (z * 16);
            const boardKey = "(" + x + ".0,0.0," + z + ".0)";
            board[boardKey] = { "type": grid.grid[key].type };
            if (grid.grid[key].craft) {
                board[boardKey].data = {
                    "craft": grid.grid[key].craft,
                    "state": "Complete"
                };
            }
        });
        return board;
    }
    // SCRIPT
    AddFunction('getCraftIcon(craft)',
        "return getFullURL(recipes[craft].FileUrl);"
    );
    AddFunction('setCellCraft(cellIndex, craft)',
        "grid.grid[cellIndex].craft = craft;" +
        "renderCellCraft(cellIndex);" +
        "updateExportGrid();"
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

    async function EditVisualizer() {
        let gameObjectData = await LoadJsonData('4538141fc18b');
        let gameCraftData = await LoadJsonData('a2524eca47d5');
        // Convert gameObject data to townstarObjects
        // Remove buildings with no image support
        delete gameObjectData?.Ancient_Tesla_Coil;
        delete gameObjectData?.K_Barter_Station;
        delete gameObjectData?.B_Barter_Station;

        townstarObjects = gameObjectData;

        // Convert gameCraft data to recipes
        recipes = gameCraftData;

        // Extra modification
        townstarObjects.Paved_Road.EdgeRequirements = "None";

        // Right click remove building.
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

        /*
        let originalRenderGrid = renderGrid;
        renderGrid = function(type) {
            originalRenderGrid(type);
            DisplayProximity();
        };
        */
        // Overwrite getFullURL
        getFullURL = function (assetPath) {
            let url = `https://townstar.sandbox-games.com/${assetPath}`;
            if (assetPath.substring(0,4) == "http") {
                url = assetPath;
            }
            return url;
        }

        // Overwrite renderGrid
        renderGrid = function (type) {
            calculatePassiveEffects();
            calculateBorderEffects();
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
            DisplayProximity();
        };

        // Overwrite updateExportGrid
        updateExportGrid = function () {
            exportGrid.northborder = grid.northborder;
            exportGrid.southborder = grid.southborder;
            exportGrid.eastborder = grid.eastborder;
            exportGrid.westborder = grid.westborder;
            exportGrid.grid = grid.grid.map((cell) => {
                let gridCell = { type: cell.type };
                if (cell.craft) {
                    gridCell.craft = cell.craft;
                }
                return gridCell;
                /*
                return {
                    type: cell.type,
                };
                */
            });
            $("#importexport").val(JSON.stringify(exportGrid));
        }

        // Overwrite importGrid
        importGrid = function () {
            if ($("#importexport").val() != "") {
                const importedGrid = JSON.parse($("#importexport").val());
                grid.northborder = importedGrid.northborder;
                grid.southborder = importedGrid.southborder;
                grid.eastborder = importedGrid.eastborder;
                grid.westborder = importedGrid.westborder;
                grid.grid = importedGrid.grid.map((cell) => {
                    return {
                        type: cell.type,
                        craft: cell.craft,
                        edgeSatisfied: true,
                    };
                });
                renderBorders();
                renderGrid();
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
                const buildingTypes = document.querySelectorAll('#' + removeSpecialCharacter(type));
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
                          `<input id="recipe_${rec}" name="recipe_${cell.type}" class="recipecraft" value="${rec}" type="radio"` + (cell.craft == rec ? ` checked` : ``) + ` onchange="setCellCraft(${cellIndex},'${rec}')"></input>` +
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
            Rare_Water_Pump: [3],
            Haunted_Maze: {
                "Haunted_Maze_-_Zone_1": [3, 2, 1],
                "Haunted_Maze_-_Zone_2": [2, 1],
                "Haunted_Maze_-_Zone_3": [3, 3],
                "Haunted_Maze_-_Zone_4": [1]
            },
            Diamond_Water_Pump: {
                Rare_Grand_Aquifer: [1],
                Water_Pump: [1],
                Diamond_Water_Pump: [2],
                Rare_Water_Pump: [3]
            }
        };
        const boostedNftProximityBonuses = {
            Haunted_Maze: {
                "Haunted_Maze_-_Zone_1": [6, 5, 4, 3, 2, 1],
                "Haunted_Maze_-_Zone_2": [4, 3, 2, 1],
                "Haunted_Maze_-_Zone_3": [4, 4, 4, 4],
                "Haunted_Maze_-_Zone_4": [2, 1]
            },
            Diamond_Water_Pump: {
                Rare_Grand_Aquifer: [2, 1],
                Water_Pump: [2],
                Diamond_Water_Pump: [2],
                Rare_Water_Pump: [6]
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

        // Overwrite calculatePassiveEffects
        calculatePassiveEffects = function() {
            resetAllPassive();
            for (let i = 0; i < grid.grid.length; i++) {
                const cell = grid.grid[i];
                const building = townstarObjects[cell.type];

                if (building == null) continue;

                let effectRadius = building.ProximityDist;
                let effects = building.ProximityEmit.split(",");
                let effectValue = effectRadius;
                let fixedEffectValue = 0;
                let immuneEffects = [];
                if (building.ProximityEmit == "None") {
                    effectRadius = 0;
                }
                if (cell.type === "888_Orb_of_Hope") {
                    effectRadius = 1;
                    effects = ['Dirty'];
                    immuneEffects = effects;
                }
                if (cell.type === "Beacon_of_Light") {
                    effectRadius = 3;
                    effects = ['Shady'];
                    immuneEffects = effects;
                }
                if (cell.type === "Rare_Water_Pump") {
                    effectValue = originalNFTProximityBonuses[cell.type][0];
                    effectRadius = (originalNFTProximityBonuses[cell.type]).length;
                }
                if (mazeSets.includes(cell.type)) {
                    if (isFullMazeSets() == false) {
                        effectValue = originalNFTProximityBonuses.Haunted_Maze[cell.type][0];
                        effectRadius = (originalNFTProximityBonuses.Haunted_Maze[cell.type]).length;
                        if (cell.type == "Haunted_Maze_-_Zone_3") {
                            fixedEffectValue = effectValue;
                        }
                    } else {
                        effectValue = boostedNftProximityBonuses.Haunted_Maze[cell.type][0];
                        effectRadius = (boostedNftProximityBonuses.Haunted_Maze[cell.type]).length;
                        if (cell.type == "Haunted_Maze_-_Zone_3") {
                            fixedEffectValue = effectValue;
                        }
                    }
                }
                if (diamondWaterPump.includes(cell.type)) {
                    if (isDiamondWaterPump() == false) {
                        effectValue = originalNFTProximityBonuses.Diamond_Water_Pump[cell.type][0];
                        effectRadius = (originalNFTProximityBonuses.Diamond_Water_Pump[cell.type]).length;
                    } else {
                        effectValue = boostedNftProximityBonuses.Diamond_Water_Pump[cell.type][0];
                        effectRadius = (boostedNftProximityBonuses.Diamond_Water_Pump[cell.type]).length;
                    }
                }
                if (effectRadius == 0) continue;

                for (const effect in effects) {
                    let value = effectValue;
                    if (effectRadius == 1) {
                        value = CheckSpecialEffectValue(effects[effect], immuneEffects[effect], value, fixedEffectValue);
                        setValueForInnerSquare(i, value--, effects[effect]);
                    }
                    if (effectRadius == 2) {
                        value = CheckSpecialEffectValue(effects[effect], immuneEffects[effect], value, fixedEffectValue);
                        setValueForInnerSquare(i, value--, effects[effect]);
                        value = CheckSpecialEffectValue(effects[effect], immuneEffects[effect], value, fixedEffectValue);
                        setValueFor2TileDistance(i, value--, effects[effect]);
                    }
                    if (effectRadius == 3) {
                        value = CheckSpecialEffectValue(effects[effect], immuneEffects[effect], value, fixedEffectValue);
                        setValueForInnerSquare(i, value--, effects[effect]);
                        value = CheckSpecialEffectValue(effects[effect], immuneEffects[effect], value, fixedEffectValue);
                        setValueFor2TileDistance(i, value--, effects[effect]);
                        value = CheckSpecialEffectValue(effects[effect], immuneEffects[effect], value, fixedEffectValue);
                        setValueFor3TileDistance(i, value--, effects[effect]);
                    }
                    if (effectRadius == 4) {
                        value = CheckSpecialEffectValue(effects[effect], immuneEffects[effect], value, fixedEffectValue);
                        setValueForInnerSquare(i, value--, effects[effect]);
                        value = CheckSpecialEffectValue(effects[effect], immuneEffects[effect], value, fixedEffectValue);
                        setValueFor2TileDistance(i, value--, effects[effect]);
                        value = CheckSpecialEffectValue(effects[effect], immuneEffects[effect], value, fixedEffectValue);
                        setValueFor3TileDistance(i, value--, effects[effect]);
                        value = CheckSpecialEffectValue(effects[effect], immuneEffects[effect], value, fixedEffectValue);
                        setValueFor4TileDistance(i, value--, effects[effect]);
                    }
                    if (effectRadius == 5) {
                        value = CheckSpecialEffectValue(effects[effect], immuneEffects[effect], value, fixedEffectValue);
                        setValueForInnerSquare(i, value--, effects[effect]);
                        value = CheckSpecialEffectValue(effects[effect], immuneEffects[effect], value, fixedEffectValue);
                        setValueFor2TileDistance(i, value--, effects[effect]);
                        value = CheckSpecialEffectValue(effects[effect], immuneEffects[effect], value, fixedEffectValue);
                        setValueFor3TileDistance(i, value--, effects[effect]);
                        value = CheckSpecialEffectValue(effects[effect], immuneEffects[effect], value, fixedEffectValue);
                        setValueFor4TileDistance(i, value--, effects[effect]);
                        value = CheckSpecialEffectValue(effects[effect], immuneEffects[effect], value, fixedEffectValue);
                        setValueFor5TileDistance(i, value--, effects[effect]);
                    }
                    if (effectRadius == 6) {
                        value = CheckSpecialEffectValue(effects[effect], immuneEffects[effect], value, fixedEffectValue);
                        setValueForInnerSquare(i, value--, effects[effect]);
                        value = CheckSpecialEffectValue(effects[effect], immuneEffects[effect], value, fixedEffectValue);
                        setValueFor2TileDistance(i, value--, effects[effect]);
                        value = CheckSpecialEffectValue(effects[effect], immuneEffects[effect], value, fixedEffectValue);
                        setValueFor3TileDistance(i, value--, effects[effect]);
                        value = CheckSpecialEffectValue(effects[effect], immuneEffects[effect], value, fixedEffectValue);
                        setValueFor4TileDistance(i, value--, effects[effect]);
                        value = CheckSpecialEffectValue(effects[effect], immuneEffects[effect], value, fixedEffectValue);
                        setValueFor5TileDistance(i, value--, effects[effect]);
                        value = CheckSpecialEffectValue(effects[effect], immuneEffects[effect], value, fixedEffectValue);
                        setValueFor6TileDistance(i, value--, effects[effect]);
                    }
                }
            }
        }

        function CheckSpecialEffectValue(effect, immuneEffect, value, fixedEffectValue) {
            let newValue = value;
            if (effect == "PositiveOnlySalty") {
                if (value < 3) newValue = 0;
            }
            if (immuneEffect == effect) {
                newValue = -999;
            }
            if (fixedEffectValue > 0) {
                newValue = fixedEffectValue;
            }
            return newValue;
        }

        // Overwrite setValueForInnerSquare
        setValueForInnerSquare = function(center, value, property) {
            /*
__ __ __
|__|__|__|
|__|__|__|
|__|__|__|
*/
            const cellRow = Math.floor(center / dimension);
            const cellCol = center % dimension;
            for (let x = cellRow - 1; x < cellRow + 2; x++) {
                if (x < 0) continue;
                for (let y = cellCol - 1; y < cellCol + 2; y++) {
                    if (x == cellRow && y == cellCol) continue;
                    if (y < 0 || y > dimension - 1) continue;
                    const index = dimension * x + y;
                    if (isOutOfBounds(index)) continue;

                    grid.grid[index][property] = grid.grid[index][property] + value;
                }
            }
        }

        function setValueFor5TileDistance(center, value, property) {
            /*
      __ __ __
   __|__|__|__|__
__|__|__|__|__|__|__
__|__|__|__|__|__|__|__|__
|__|__|__|__|__|__|__|__|__|
|__|__|__|__|__|__|__|__|__|
|__|__|__|__|__|__|__|__|__|
|__|__|__|__|__|__|__|
  |__|__|__|__|__|
     |__|__|__|
*/

            const cellRow = Math.floor(center / dimension);
            const cellCol = center % dimension;
            //do 1s row above (not including corners)
            if (cellRow - 5 >= 0) {
                for (let y = cellCol - 1; y < cellCol + 2; y++) {
                    if (y < 0 || y > dimension - 1) continue;
                    const index = dimension * (cellRow - 5) + y;
                    if (isOutOfBounds(index)) continue;

                    grid.grid[index][property] = grid.grid[index][property] + value;
                }
            }
            //do 1s row below (not including corners)
            if (cellRow + 5 < dimension) {
                for (let y = cellCol - 1; y < cellCol + 2; y++) {
                    if (y < 0 || y > dimension - 1) continue;
                    const index = dimension * (cellRow + 5) + y;
                    if (isOutOfBounds(index)) continue;

                    grid.grid[index][property] = grid.grid[index][property] + value;
                }
            }
            //do 1s col to left
            if (cellCol - 5 >= 0) {
                for (let y = cellRow - 1; y < cellRow + 2; y++) {
                    if (y < 0 || y > dimension - 1) continue;
                    const index = dimension * y + (cellCol - 5);
                    if (isOutOfBounds(index)) continue;

                    grid.grid[index][property] = grid.grid[index][property] + value;
                }
            }
            //do 1s col to right
            if (cellCol + 5 < dimension) {
                for (let y = cellRow - 1; y < cellRow + 2; y++) {
                    if (y < 0 || y > dimension - 1) continue;
                    const index = dimension * y + (cellCol + 5);
                    if (isOutOfBounds(index)) continue;

                    grid.grid[index][property] = grid.grid[index][property] + value;
                }
            }

            // //get corners
            //upper  left
            if (cellRow - 4 >= 0 && cellCol - 2 > 0) {
                const index = dimension * (cellRow - 4) + (cellCol - 2);
                if (!isOutOfBounds(index))
                    grid.grid[index][property] = grid.grid[index][property] + value;
            }
            if (cellRow - 2 >= 0 && cellCol - 4 >= 0) {
                const index = dimension * (cellRow - 2) + (cellCol - 4);
                if (!isOutOfBounds(index))
                    grid.grid[index][property] = grid.grid[index][property] + value;
            }
            if (cellRow - 3 >= 0 && cellCol - 3 >= 0) {
                const index = dimension * (cellRow - 3) + (cellCol - 3);
                if (!isOutOfBounds(index))
                    grid.grid[index][property] = grid.grid[index][property] + value;
            }
            //upper right
            if (cellRow - 4 >= 0 && cellCol + 2 < dimension) {
                const index = dimension * (cellRow - 4) + (cellCol + 2);
                if (!isOutOfBounds(index))
                    grid.grid[index][property] = grid.grid[index][property] + value;
            }
            if (cellRow - 2 >= 0 && cellCol + 4 < dimension) {
                const index = dimension * (cellRow - 2) + (cellCol + 4);
                if (!isOutOfBounds(index))
                    grid.grid[index][property] = grid.grid[index][property] + value;
            }
            if (cellRow - 3 >= 0 && cellCol + 3 < dimension) {
                const index = dimension * (cellRow - 3) + (cellCol + 3);
                if (!isOutOfBounds(index))
                    grid.grid[index][property] = grid.grid[index][property] + value;
            }
            //lower left
            if (cellRow + 4 < dimension && cellCol - 2 >= 0) {
                const index = dimension * (cellRow + 4) + (cellCol - 2);
                if (!isOutOfBounds(index))
                    grid.grid[index][property] = grid.grid[index][property] + value;
            }
            if (cellRow + 2 < dimension && cellCol - 4 >= 0) {
                const index = dimension * (cellRow + 2) + (cellCol - 4);
                if (!isOutOfBounds(index))
                    grid.grid[index][property] = grid.grid[index][property] + value;
            }
            if (cellRow + 3 < dimension && cellCol - 3 >= 0) {
                const index = dimension * (cellRow + 3) + (cellCol - 3);
                if (!isOutOfBounds(index))
                    grid.grid[index][property] = grid.grid[index][property] + value;
            }
            //lower right
            if (cellRow + 4 < dimension && cellCol + 2 < dimension) {
                const index = dimension * (cellRow + 4) + (cellCol + 2);
                if (!isOutOfBounds(index))
                    grid.grid[index][property] = grid.grid[index][property] + value;
            }
            if (cellRow + 2 < dimension && cellCol + 4 < dimension) {
                const index = dimension * (cellRow + 2) + (cellCol + 4);
                if (!isOutOfBounds(index))
                    grid.grid[index][property] = grid.grid[index][property] + value;
            }
            if (cellRow + 3 < dimension && cellCol + 3 < dimension) {
                const index = dimension * (cellRow + 3) + (cellCol + 3);
                if (!isOutOfBounds(index))
                    grid.grid[index][property] = grid.grid[index][property] + value;
            }
        }

        function setValueFor6TileDistance(center, value, property) {
            /*
      __ __ __
   __|__|__|__|__
__|__|__|__|__|__|__
__|__|__|__|__|__|__|__|__
|__|__|__|__|__|__|__|__|__|
|__|__|__|__|__|__|__|__|__|
|__|__|__|__|__|__|__|__|__|
|__|__|__|__|__|__|__|
  |__|__|__|__|__|
     |__|__|__|
*/

            const cellRow = Math.floor(center / dimension);
            const cellCol = center % dimension;
            //do 1s row above (not including corners)
            if (cellRow - 6 >= 0) {
                for (let y = cellCol - 1; y < cellCol + 2; y++) {
                    if (y < 0 || y > dimension - 1) continue;
                    const index = dimension * (cellRow - 6) + y;
                    if (isOutOfBounds(index)) continue;

                    grid.grid[index][property] = grid.grid[index][property] + value;
                }
            }
            //do 1s row below (not including corners)
            if (cellRow + 6 < dimension) {
                for (let y = cellCol - 1; y < cellCol + 2; y++) {
                    if (y < 0 || y > dimension - 1) continue;
                    const index = dimension * (cellRow + 6) + y;
                    if (isOutOfBounds(index)) continue;

                    grid.grid[index][property] = grid.grid[index][property] + value;
                }
            }
            //do 1s col to left
            if (cellCol - 6 >= 0) {
                for (let y = cellRow - 1; y < cellRow + 2; y++) {
                    if (y < 0 || y > dimension - 1) continue;
                    const index = dimension * y + (cellCol - 6);
                    if (isOutOfBounds(index)) continue;

                    grid.grid[index][property] = grid.grid[index][property] + value;
                }
            }
            //do 1s col to right
            if (cellCol + 6 < dimension) {
                for (let y = cellRow - 1; y < cellRow + 2; y++) {
                    if (y < 0 || y > dimension - 1) continue;
                    const index = dimension * y + (cellCol + 6);
                    if (isOutOfBounds(index)) continue;

                    grid.grid[index][property] = grid.grid[index][property] + value;
                }
            }

            // //get corners
            //upper  left
            if (cellRow - 5 >= 0 && cellCol - 2 > 0) {
                const index = dimension * (cellRow - 5) + (cellCol - 2);
                if (!isOutOfBounds(index))
                    grid.grid[index][property] = grid.grid[index][property] + value;
            }
            if (cellRow - 2 >= 0 && cellCol - 5 >= 0) {
                const index = dimension * (cellRow - 2) + (cellCol - 5);
                if (!isOutOfBounds(index))
                    grid.grid[index][property] = grid.grid[index][property] + value;
            }
            if (cellRow - 4 >= 0 && cellCol - 3 >= 0) {
                const index = dimension * (cellRow - 4) + (cellCol - 3);
                if (!isOutOfBounds(index))
                    grid.grid[index][property] = grid.grid[index][property] + value;
            }
            if (cellRow - 3 >= 0 && cellCol - 4 >= 0) {
                const index = dimension * (cellRow - 3) + (cellCol - 4);
                if (!isOutOfBounds(index))
                    grid.grid[index][property] = grid.grid[index][property] + value;
            }
            //upper right
            if (cellRow - 5 >= 0 && cellCol + 2 < dimension) {
                const index = dimension * (cellRow - 5) + (cellCol + 2);
                if (!isOutOfBounds(index))
                    grid.grid[index][property] = grid.grid[index][property] + value;
            }
            if (cellRow - 2 >= 0 && cellCol + 5 < dimension) {
                const index = dimension * (cellRow - 2) + (cellCol + 5);
                if (!isOutOfBounds(index))
                    grid.grid[index][property] = grid.grid[index][property] + value;
            }
            if (cellRow - 4 >= 0 && cellCol + 3 < dimension) {
                const index = dimension * (cellRow - 4) + (cellCol + 3);
                if (!isOutOfBounds(index))
                    grid.grid[index][property] = grid.grid[index][property] + value;
            }
            if (cellRow - 3 >= 0 && cellCol + 4 < dimension) {
                const index = dimension * (cellRow - 3) + (cellCol + 4);
                if (!isOutOfBounds(index))
                    grid.grid[index][property] = grid.grid[index][property] + value;
            }
            //lower left
            if (cellRow + 5 < dimension && cellCol - 2 >= 0) {
                const index = dimension * (cellRow + 5) + (cellCol - 2);
                if (!isOutOfBounds(index))
                    grid.grid[index][property] = grid.grid[index][property] + value;
            }
            if (cellRow + 2 < dimension && cellCol - 5 >= 0) {
                const index = dimension * (cellRow + 2) + (cellCol - 5);
                if (!isOutOfBounds(index))
                    grid.grid[index][property] = grid.grid[index][property] + value;
            }
            if (cellRow + 4 < dimension && cellCol - 3 >= 0) {
                const index = dimension * (cellRow + 4) + (cellCol - 3);
                if (!isOutOfBounds(index))
                    grid.grid[index][property] = grid.grid[index][property] + value;
            }
            if (cellRow + 3 < dimension && cellCol - 4 >= 0) {
                const index = dimension * (cellRow + 3) + (cellCol - 4);
                if (!isOutOfBounds(index))
                    grid.grid[index][property] = grid.grid[index][property] + value;
            }
            //lower right
            if (cellRow + 5 < dimension && cellCol + 2 < dimension) {
                const index = dimension * (cellRow + 5) + (cellCol + 2);
                if (!isOutOfBounds(index))
                    grid.grid[index][property] = grid.grid[index][property] + value;
            }
            if (cellRow + 2 < dimension && cellCol + 5 < dimension) {
                const index = dimension * (cellRow + 2) + (cellCol + 5);
                if (!isOutOfBounds(index))
                    grid.grid[index][property] = grid.grid[index][property] + value;
            }
            if (cellRow + 4 < dimension && cellCol + 3 < dimension) {
                const index = dimension * (cellRow + 4) + (cellCol + 3);
                if (!isOutOfBounds(index))
                    grid.grid[index][property] = grid.grid[index][property] + value;
            }
            if (cellRow + 3 < dimension && cellCol + 4 < dimension) {
                const index = dimension * (cellRow + 3) + (cellCol + 4);
                if (!isOutOfBounds(index))
                    grid.grid[index][property] = grid.grid[index][property] + value;
            }
        }

        renderBuildingMenu();
        renderOverlaysOptions();

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

        // Load Town Star latest star town template.
        maps={Forest:{north:{"(0.0,0.0,0.0)":{type:"Grass"},"(0.0,0.0,1.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(0.0,0.0,10.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(0.0,0.0,11.0)":{type:"Grass"},"(0.0,0.0,12.0)":{type:"Grass"},"(0.0,0.0,13.0)":{type:"Grass"},"(0.0,0.0,14.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(0.0,0.0,15.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(0.0,0.0,2.0)":{type:"Grass"},"(0.0,0.0,3.0)":{type:"Grass"},"(0.0,0.0,4.0)":{type:"Grass"},"(0.0,0.0,5.0)":{type:"Grass"},"(0.0,0.0,6.0)":{type:"Grass"},"(0.0,0.0,7.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(0.0,0.0,8.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(0.0,0.0,9.0)":{type:"Grass"},"(1.0,0.0,0.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(1.0,0.0,1.0)":{type:"Grass"},"(1.0,0.0,10.0)":{type:"Grass"},"(1.0,0.0,11.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(1.0,0.0,12.0)":{type:"Grass"},"(1.0,0.0,13.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(1.0,0.0,14.0)":{type:"Grass"},"(1.0,0.0,15.0)":{type:"Grass"},"(1.0,0.0,2.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(1.0,0.0,3.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(1.0,0.0,4.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(1.0,0.0,5.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(1.0,0.0,6.0)":{type:"Marsh"},"(1.0,0.0,7.0)":{type:"Marsh"},"(1.0,0.0,8.0)":{type:"Marsh"},"(1.0,0.0,9.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(10.0,0.0,0.0)":{type:"Grass"},"(10.0,0.0,1.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(10.0,0.0,10.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(10.0,0.0,11.0)":{type:"Grass"},"(10.0,0.0,12.0)":{type:"Rock"},"(10.0,0.0,13.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(10.0,0.0,14.0)":{type:"Grass"},"(10.0,0.0,15.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(10.0,0.0,2.0)":{type:"Grass"},"(10.0,0.0,3.0)":{type:"Grass"},"(10.0,0.0,4.0)":{type:"Farm_House"},"(10.0,0.0,5.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(10.0,0.0,6.0)":{type:"Grass"},"(10.0,0.0,7.0)":{type:"Grass"},"(10.0,0.0,8.0)":{type:"Grass"},"(10.0,0.0,9.0)":{type:"Grass"},"(11.0,0.0,0.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(11.0,0.0,1.0)":{type:"Grass"},"(11.0,0.0,10.0)":{type:"Marsh"},"(11.0,0.0,11.0)":{type:"Marsh"},"(11.0,0.0,12.0)":{type:"Grass"},"(11.0,0.0,13.0)":{type:"Grass"},"(11.0,0.0,14.0)":{type:"Grass"},"(11.0,0.0,15.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(11.0,0.0,2.0)":{type:"Grass"},"(11.0,0.0,3.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(11.0,0.0,4.0)":{type:"Grass"},"(11.0,0.0,5.0)":{type:"Grass"},"(11.0,0.0,6.0)":{type:"Grass"},"(11.0,0.0,7.0)":{type:"Grass"},"(11.0,0.0,8.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(11.0,0.0,9.0)":{type:"Grass"},"(12.0,0.0,0.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(12.0,0.0,1.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(12.0,0.0,10.0)":{type:"Pond"},"(12.0,0.0,11.0)":{type:"Pond"},"(12.0,0.0,12.0)":{type:"Marsh"},"(12.0,0.0,13.0)":{type:"Grass"},"(12.0,0.0,14.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(12.0,0.0,15.0)":{type:"Grass"},"(12.0,0.0,2.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(12.0,0.0,3.0)":{type:"Grass"},"(12.0,0.0,4.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(12.0,0.0,5.0)":{type:"Rock"},"(12.0,0.0,6.0)":{type:"Marsh"},"(12.0,0.0,7.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(12.0,0.0,8.0)":{type:"Grass"},"(12.0,0.0,9.0)":{type:"Marsh"},"(13.0,0.0,0.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(13.0,0.0,1.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(13.0,0.0,10.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(13.0,0.0,11.0)":{type:"Pond"},"(13.0,0.0,12.0)":{type:"Marsh"},"(13.0,0.0,13.0)":{type:"Grass"},"(13.0,0.0,14.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(13.0,0.0,15.0)":{type:"Grass"},"(13.0,0.0,2.0)":{type:"Grass"},"(13.0,0.0,3.0)":{type:"Grass"},"(13.0,0.0,4.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(13.0,0.0,5.0)":{type:"Pond"},"(13.0,0.0,6.0)":{type:"Pond"},"(13.0,0.0,7.0)":{type:"Marsh"},"(13.0,0.0,8.0)":{type:"Grass"},"(13.0,0.0,9.0)":{type:"Grass"},"(14.0,0.0,0.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(14.0,0.0,1.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(14.0,0.0,10.0)":{type:"Grass"},"(14.0,0.0,11.0)":{type:"Marsh"},"(14.0,0.0,12.0)":{type:"Grass"},"(14.0,0.0,13.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(14.0,0.0,14.0)":{type:"Grass"},"(14.0,0.0,15.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(14.0,0.0,2.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(14.0,0.0,3.0)":{type:"Grass"},"(14.0,0.0,4.0)":{type:"Marsh"},"(14.0,0.0,5.0)":{type:"Pond"},"(14.0,0.0,6.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(14.0,0.0,7.0)":{type:"Grass"},"(14.0,0.0,8.0)":{type:"Grass"},"(14.0,0.0,9.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(15.0,0.0,0.0)":{type:"Grass"},"(15.0,0.0,1.0)":{type:"Grass"},"(15.0,0.0,10.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(15.0,0.0,11.0)":{type:"Grass"},"(15.0,0.0,12.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(15.0,0.0,13.0)":{type:"Grass"},"(15.0,0.0,14.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(15.0,0.0,15.0)":{type:"Grass"},"(15.0,0.0,2.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(15.0,0.0,3.0)":{type:"Grass"},"(15.0,0.0,4.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(15.0,0.0,5.0)":{type:"Marsh"},"(15.0,0.0,6.0)":{type:"Grass"},"(15.0,0.0,7.0)":{type:"Grass"},"(15.0,0.0,8.0)":{type:"Grass"},"(15.0,0.0,9.0)":{type:"Grass"},"(2.0,0.0,0.0)":{type:"Grass"},"(2.0,0.0,1.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(2.0,0.0,10.0)":{type:"Grass"},"(2.0,0.0,11.0)":{type:"Grass"},"(2.0,0.0,12.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(2.0,0.0,13.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(2.0,0.0,14.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(2.0,0.0,15.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(2.0,0.0,2.0)":{type:"Grass"},"(2.0,0.0,3.0)":{type:"Grass"},"(2.0,0.0,4.0)":{type:"Grass"},"(2.0,0.0,5.0)":{type:"Grass"},"(2.0,0.0,6.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(2.0,0.0,7.0)":{type:"Pond"},"(2.0,0.0,8.0)":{type:"Pond"},"(2.0,0.0,9.0)":{type:"Marsh"},"(3.0,0.0,0.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(3.0,0.0,1.0)":{type:"Grass"},"(3.0,0.0,10.0)":{type:"Marsh"},"(3.0,0.0,11.0)":{type:"Grass"},"(3.0,0.0,12.0)":{type:"Grass"},"(3.0,0.0,13.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(3.0,0.0,14.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(3.0,0.0,15.0)":{type:"Grass"},"(3.0,0.0,2.0)":{type:"Grass"},"(3.0,0.0,3.0)":{type:"Grass"},"(3.0,0.0,4.0)":{type:"Grass"},"(3.0,0.0,5.0)":{type:"Grass"},"(3.0,0.0,6.0)":{type:"Grass"},"(3.0,0.0,7.0)":{type:"Rock"},"(3.0,0.0,8.0)":{type:"Pond"},"(3.0,0.0,9.0)":{type:"Pond"},"(4.0,0.0,0.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(4.0,0.0,1.0)":{type:"Dirt_Road"},"(4.0,0.0,10.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(4.0,0.0,11.0)":{type:"Grass"},"(4.0,0.0,12.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(4.0,0.0,13.0)":{type:"Grass"},"(4.0,0.0,14.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(4.0,0.0,15.0)":{type:"Grass"},"(4.0,0.0,2.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(4.0,0.0,3.0)":{type:"Grass"},"(4.0,0.0,4.0)":{type:"Grass"},"(4.0,0.0,5.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(4.0,0.0,6.0)":{type:"Grass"},"(4.0,0.0,7.0)":{type:"Grass"},"(4.0,0.0,8.0)":{type:"Marsh"},"(4.0,0.0,9.0)":{type:"Marsh"},"(5.0,0.0,0.0)":{type:"Grass"},"(5.0,0.0,1.0)":{type:"Dirt_Road"},"(5.0,0.0,10.0)":{type:"Grass"},"(5.0,0.0,11.0)":{type:"Grass"},"(5.0,0.0,12.0)":{type:"Grass"},"(5.0,0.0,13.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(5.0,0.0,14.0)":{type:"Grass"},"(5.0,0.0,15.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(5.0,0.0,2.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(5.0,0.0,3.0)":{type:"Rock"},"(5.0,0.0,4.0)":{type:"Wheat_Field",data:{craft:"Wheat",state:"Complete"}},"(5.0,0.0,5.0)":{type:"Grass"},"(5.0,0.0,6.0)":{type:"Grass"},"(5.0,0.0,7.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(5.0,0.0,8.0)":{type:"Grass"},"(5.0,0.0,9.0)":{type:"Grass"},"(6.0,0.0,0.0)":{type:"Trade_Depot"},"(6.0,0.0,1.0)":{type:"Dirt_Road"},"(6.0,0.0,10.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(6.0,0.0,11.0)":{type:"Grass"},"(6.0,0.0,12.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(6.0,0.0,13.0)":{type:"Grass"},"(6.0,0.0,14.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(6.0,0.0,15.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(6.0,0.0,2.0)":{type:"Grass"},"(6.0,0.0,3.0)":{type:"Grass"},"(6.0,0.0,4.0)":{type:"Wheat_Field",data:{craft:"Wheat",state:"Complete"}},"(6.0,0.0,5.0)":{type:"Marsh"},"(6.0,0.0,6.0)":{type:"Grass"},"(6.0,0.0,7.0)":{type:"Grass"},"(6.0,0.0,8.0)":{type:"Grass"},"(6.0,0.0,9.0)":{type:"Grass"},"(7.0,0.0,0.0)":{type:"Fuel_Storage",data:{storageList:{Gasoline:40}}},"(7.0,0.0,1.0)":{type:"Dirt_Road"},"(7.0,0.0,10.0)":{type:"Grass"},"(7.0,0.0,11.0)":{type:"Grass"},"(7.0,0.0,12.0)":{type:"Grass"},"(7.0,0.0,13.0)":{type:"Marsh"},"(7.0,0.0,14.0)":{type:"Grass"},"(7.0,0.0,15.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(7.0,0.0,2.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(7.0,0.0,3.0)":{type:"Grass"},"(7.0,0.0,4.0)":{type:"Dirt_Road"},"(7.0,0.0,5.0)":{type:"Pond"},"(7.0,0.0,6.0)":{type:"Marsh"},"(7.0,0.0,7.0)":{type:"Grass"},"(7.0,0.0,8.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(7.0,0.0,9.0)":{type:"Grass"},"(8.0,0.0,0.0)":{type:"Builder_House"},"(8.0,0.0,1.0)":{type:"Dirt_Road"},"(8.0,0.0,10.0)":{type:"Rock"},"(8.0,0.0,11.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(8.0,0.0,12.0)":{type:"Marsh"},"(8.0,0.0,13.0)":{type:"Pond"},"(8.0,0.0,14.0)":{type:"Marsh"},"(8.0,0.0,15.0)":{type:"Grass"},"(8.0,0.0,2.0)":{type:"Dirt_Road"},"(8.0,0.0,3.0)":{type:"Dirt_Road"},"(8.0,0.0,4.0)":{type:"Dirt_Road"},"(8.0,0.0,5.0)":{type:"Well",data:{craft:"Water",state:"Complete"}},"(8.0,0.0,6.0)":{type:"Grass"},"(8.0,0.0,7.0)":{type:"Grass"},"(8.0,0.0,8.0)":{type:"Grass"},"(8.0,0.0,9.0)":{type:"Grass"},"(9.0,0.0,0.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(9.0,0.0,1.0)":{type:"Wood_Shed",data:{storageList:{Wood:9}}},"(9.0,0.0,10.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(9.0,0.0,11.0)":{type:"Marsh"},"(9.0,0.0,12.0)":{type:"Pond"},"(9.0,0.0,13.0)":{type:"Pond"},"(9.0,0.0,14.0)":{type:"Marsh"},"(9.0,0.0,15.0)":{type:"Grass"},"(9.0,0.0,2.0)":{type:"Silo",data:{storageList:{Wheat:10}}},"(9.0,0.0,3.0)":{type:"Grass"},"(9.0,0.0,4.0)":{type:"Dirt_Road"},"(9.0,0.0,5.0)":{type:"Storehouse",data:{}},"(9.0,0.0,6.0)":{type:"Grass"},"(9.0,0.0,7.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(9.0,0.0,8.0)":{type:"Grass"},"(9.0,0.0,9.0)":{type:"Grass"}},south:{"(0.0,0.0,0.0)":{type:"Grass"},"(0.0,0.0,1.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(0.0,0.0,10.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(0.0,0.0,11.0)":{type:"Grass"},"(0.0,0.0,12.0)":{type:"Grass"},"(0.0,0.0,13.0)":{type:"Grass"},"(0.0,0.0,14.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(0.0,0.0,15.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(0.0,0.0,2.0)":{type:"Grass"},"(0.0,0.0,3.0)":{type:"Grass"},"(0.0,0.0,4.0)":{type:"Grass"},"(0.0,0.0,5.0)":{type:"Grass"},"(0.0,0.0,6.0)":{type:"Grass"},"(0.0,0.0,7.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(0.0,0.0,8.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(0.0,0.0,9.0)":{type:"Grass"},"(1.0,0.0,0.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(1.0,0.0,1.0)":{type:"Grass"},"(1.0,0.0,10.0)":{type:"Grass"},"(1.0,0.0,11.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(1.0,0.0,12.0)":{type:"Grass"},"(1.0,0.0,13.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(1.0,0.0,14.0)":{type:"Grass"},"(1.0,0.0,15.0)":{type:"Grass"},"(1.0,0.0,2.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(1.0,0.0,3.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(1.0,0.0,4.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(1.0,0.0,5.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(1.0,0.0,6.0)":{type:"Grass"},"(1.0,0.0,7.0)":{type:"Marsh"},"(1.0,0.0,8.0)":{type:"Marsh"},"(1.0,0.0,9.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(10.0,0.0,0.0)":{type:"Grass"},"(10.0,0.0,1.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(10.0,0.0,10.0)":{type:"Dirt_Road"},"(10.0,0.0,11.0)":{type:"Storehouse",data:{}},"(10.0,0.0,12.0)":{type:"Grass"},"(10.0,0.0,13.0)":{type:"Wood_Shed",data:{storageList:{Wood:9}}},"(10.0,0.0,14.0)":{type:"Dirt_Road"},"(10.0,0.0,15.0)":{type:"Grass"},"(10.0,0.0,2.0)":{type:"Grass"},"(10.0,0.0,3.0)":{type:"Marsh"},"(10.0,0.0,4.0)":{type:"Grass"},"(10.0,0.0,5.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(10.0,0.0,6.0)":{type:"Grass"},"(10.0,0.0,7.0)":{type:"Grass"},"(10.0,0.0,8.0)":{type:"Grass"},"(10.0,0.0,9.0)":{type:"Grass"},"(11.0,0.0,0.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(11.0,0.0,1.0)":{type:"Grass"},"(11.0,0.0,10.0)":{type:"Farm_House"},"(11.0,0.0,11.0)":{type:"Grass"},"(11.0,0.0,12.0)":{type:"Grass"},"(11.0,0.0,13.0)":{type:"Grass"},"(11.0,0.0,14.0)":{type:"Grass"},"(11.0,0.0,15.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(11.0,0.0,2.0)":{type:"Grass"},"(11.0,0.0,3.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(11.0,0.0,4.0)":{type:"Grass"},"(11.0,0.0,5.0)":{type:"Grass"},"(11.0,0.0,6.0)":{type:"Grass"},"(11.0,0.0,7.0)":{type:"Grass"},"(11.0,0.0,8.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(11.0,0.0,9.0)":{type:"Grass"},"(12.0,0.0,0.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(12.0,0.0,1.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(12.0,0.0,10.0)":{type:"Grass"},"(12.0,0.0,11.0)":{type:"Grass"},"(12.0,0.0,12.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(12.0,0.0,13.0)":{type:"Grass"},"(12.0,0.0,14.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(12.0,0.0,15.0)":{type:"Grass"},"(12.0,0.0,2.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(12.0,0.0,3.0)":{type:"Grass"},"(12.0,0.0,4.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(12.0,0.0,5.0)":{type:"Rock"},"(12.0,0.0,6.0)":{type:"Marsh"},"(12.0,0.0,7.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(12.0,0.0,8.0)":{type:"Grass"},"(12.0,0.0,9.0)":{type:"Grass"},"(13.0,0.0,0.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(13.0,0.0,1.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(13.0,0.0,10.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(13.0,0.0,11.0)":{type:"Grass"},"(13.0,0.0,12.0)":{type:"Grass"},"(13.0,0.0,13.0)":{type:"Grass"},"(13.0,0.0,14.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(13.0,0.0,15.0)":{type:"Grass"},"(13.0,0.0,2.0)":{type:"Grass"},"(13.0,0.0,3.0)":{type:"Grass"},"(13.0,0.0,4.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(13.0,0.0,5.0)":{type:"Pond"},"(13.0,0.0,6.0)":{type:"Pond"},"(13.0,0.0,7.0)":{type:"Marsh"},"(13.0,0.0,8.0)":{type:"Grass"},"(13.0,0.0,9.0)":{type:"Grass"},"(14.0,0.0,0.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(14.0,0.0,1.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(14.0,0.0,10.0)":{type:"Grass"},"(14.0,0.0,11.0)":{type:"Grass"},"(14.0,0.0,12.0)":{type:"Grass"},"(14.0,0.0,13.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(14.0,0.0,14.0)":{type:"Grass"},"(14.0,0.0,15.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(14.0,0.0,2.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(14.0,0.0,3.0)":{type:"Grass"},"(14.0,0.0,4.0)":{type:"Marsh"},"(14.0,0.0,5.0)":{type:"Pond"},"(14.0,0.0,6.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(14.0,0.0,7.0)":{type:"Grass"},"(14.0,0.0,8.0)":{type:"Grass"},"(14.0,0.0,9.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(15.0,0.0,0.0)":{type:"Grass"},"(15.0,0.0,1.0)":{type:"Grass"},"(15.0,0.0,10.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(15.0,0.0,11.0)":{type:"Grass"},"(15.0,0.0,12.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(15.0,0.0,13.0)":{type:"Grass"},"(15.0,0.0,14.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(15.0,0.0,15.0)":{type:"Grass"},"(15.0,0.0,2.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(15.0,0.0,3.0)":{type:"Grass"},"(15.0,0.0,4.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(15.0,0.0,5.0)":{type:"Marsh"},"(15.0,0.0,6.0)":{type:"Grass"},"(15.0,0.0,7.0)":{type:"Grass"},"(15.0,0.0,8.0)":{type:"Grass"},"(15.0,0.0,9.0)":{type:"Grass"},"(2.0,0.0,0.0)":{type:"Grass"},"(2.0,0.0,1.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(2.0,0.0,10.0)":{type:"Grass"},"(2.0,0.0,11.0)":{type:"Grass"},"(2.0,0.0,12.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(2.0,0.0,13.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(2.0,0.0,14.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(2.0,0.0,15.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(2.0,0.0,2.0)":{type:"Grass"},"(2.0,0.0,3.0)":{type:"Grass"},"(2.0,0.0,4.0)":{type:"Grass"},"(2.0,0.0,5.0)":{type:"Grass"},"(2.0,0.0,6.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(2.0,0.0,7.0)":{type:"Pond"},"(2.0,0.0,8.0)":{type:"Pond"},"(2.0,0.0,9.0)":{type:"Marsh"},"(3.0,0.0,0.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(3.0,0.0,1.0)":{type:"Grass"},"(3.0,0.0,10.0)":{type:"Marsh"},"(3.0,0.0,11.0)":{type:"Grass"},"(3.0,0.0,12.0)":{type:"Grass"},"(3.0,0.0,13.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(3.0,0.0,14.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(3.0,0.0,15.0)":{type:"Grass"},"(3.0,0.0,2.0)":{type:"Grass"},"(3.0,0.0,3.0)":{type:"Grass"},"(3.0,0.0,4.0)":{type:"Grass"},"(3.0,0.0,5.0)":{type:"Marsh"},"(3.0,0.0,6.0)":{type:"Grass"},"(3.0,0.0,7.0)":{type:"Rock"},"(3.0,0.0,8.0)":{type:"Pond"},"(3.0,0.0,9.0)":{type:"Pond"},"(4.0,0.0,0.0)":{type:"Grass"},"(4.0,0.0,1.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(4.0,0.0,10.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(4.0,0.0,11.0)":{type:"Grass"},"(4.0,0.0,12.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(4.0,0.0,13.0)":{type:"Grass"},"(4.0,0.0,14.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(4.0,0.0,15.0)":{type:"Grass"},"(4.0,0.0,2.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(4.0,0.0,3.0)":{type:"Grass"},"(4.0,0.0,4.0)":{type:"Marsh"},"(4.0,0.0,5.0)":{type:"Pond"},"(4.0,0.0,6.0)":{type:"Marsh"},"(4.0,0.0,7.0)":{type:"Grass"},"(4.0,0.0,8.0)":{type:"Marsh"},"(4.0,0.0,9.0)":{type:"Marsh"},"(5.0,0.0,0.0)":{type:"Grass"},"(5.0,0.0,1.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(5.0,0.0,10.0)":{type:"Grass"},"(5.0,0.0,11.0)":{type:"Rock"},"(5.0,0.0,12.0)":{type:"Grass"},"(5.0,0.0,13.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(5.0,0.0,14.0)":{type:"Grass"},"(5.0,0.0,15.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(5.0,0.0,2.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(5.0,0.0,3.0)":{type:"Grass"},"(5.0,0.0,4.0)":{type:"Grass"},"(5.0,0.0,5.0)":{type:"Marsh"},"(5.0,0.0,6.0)":{type:"Grass"},"(5.0,0.0,7.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(5.0,0.0,8.0)":{type:"Grass"},"(5.0,0.0,9.0)":{type:"Grass"},"(6.0,0.0,0.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(6.0,0.0,1.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(6.0,0.0,10.0)":{type:"Grass"},"(6.0,0.0,11.0)":{type:"Marsh"},"(6.0,0.0,12.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(6.0,0.0,13.0)":{type:"Grass"},"(6.0,0.0,14.0)":{type:"Dirt_Road"},"(6.0,0.0,15.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(6.0,0.0,2.0)":{type:"Rock"},"(6.0,0.0,3.0)":{type:"Grass"},"(6.0,0.0,4.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(6.0,0.0,5.0)":{type:"Grass"},"(6.0,0.0,6.0)":{type:"Grass"},"(6.0,0.0,7.0)":{type:"Rock"},"(6.0,0.0,8.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(6.0,0.0,9.0)":{type:"Grass"},"(7.0,0.0,0.0)":{type:"Grass"},"(7.0,0.0,1.0)":{type:"Grass"},"(7.0,0.0,10.0)":{type:"Wheat_Field",data:{craft:"Wheat",state:"Complete"}},"(7.0,0.0,11.0)":{type:"Pond"},"(7.0,0.0,12.0)":{type:"Marsh"},"(7.0,0.0,13.0)":{type:"Grass"},"(7.0,0.0,14.0)":{type:"Dirt_Road"},"(7.0,0.0,15.0)":{type:"Builder_House"},"(7.0,0.0,2.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(7.0,0.0,3.0)":{type:"Grass"},"(7.0,0.0,4.0)":{type:"Grass"},"(7.0,0.0,5.0)":{type:"Grass"},"(7.0,0.0,6.0)":{type:"Grass"},"(7.0,0.0,7.0)":{type:"Grass"},"(7.0,0.0,8.0)":{type:"Grass"},"(7.0,0.0,9.0)":{type:"Wheat_Field",data:{craft:"Wheat",state:"Complete"}},"(8.0,0.0,0.0)":{type:"Grass"},"(8.0,0.0,1.0)":{type:"Grass"},"(8.0,0.0,10.0)":{type:"Dirt_Road"},"(8.0,0.0,11.0)":{type:"Dirt_Road"},"(8.0,0.0,12.0)":{type:"Dirt_Road"},"(8.0,0.0,13.0)":{type:"Dirt_Road"},"(8.0,0.0,14.0)":{type:"Dirt_Road"},"(8.0,0.0,15.0)":{type:"Trade_Depot"},"(8.0,0.0,2.0)":{type:"Grass"},"(8.0,0.0,3.0)":{type:"Marsh"},"(8.0,0.0,4.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(8.0,0.0,5.0)":{type:"Grass"},"(8.0,0.0,6.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(8.0,0.0,7.0)":{type:"Grass"},"(8.0,0.0,8.0)":{type:"Grass"},"(8.0,0.0,9.0)":{type:"Grass"},"(9.0,0.0,0.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(9.0,0.0,1.0)":{type:"Grass"},"(9.0,0.0,10.0)":{type:"Dirt_Road"},"(9.0,0.0,11.0)":{type:"Well",data:{craft:"Water",state:"Complete"}},"(9.0,0.0,12.0)":{type:"Grass"},"(9.0,0.0,13.0)":{type:"Silo",data:{storageList:{Wheat:10}}},"(9.0,0.0,14.0)":{type:"Dirt_Road"},"(9.0,0.0,15.0)":{type:"Fuel_Storage",data:{storageList:{Gasoline:40}}},"(9.0,0.0,2.0)":{type:"Marsh"},"(9.0,0.0,3.0)":{type:"Pond"},"(9.0,0.0,4.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(9.0,0.0,5.0)":{type:"Grass"},"(9.0,0.0,6.0)":{type:"Grass"},"(9.0,0.0,7.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(9.0,0.0,8.0)":{type:"Grass"},"(9.0,0.0,9.0)":{type:"Grass"}},east:{"(0.0,0.0,0.0)":{type:"Grass"},"(0.0,0.0,1.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(0.0,0.0,10.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(0.0,0.0,11.0)":{type:"Grass"},"(0.0,0.0,12.0)":{type:"Grass"},"(0.0,0.0,13.0)":{type:"Grass"},"(0.0,0.0,14.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(0.0,0.0,15.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(0.0,0.0,2.0)":{type:"Grass"},"(0.0,0.0,3.0)":{type:"Grass"},"(0.0,0.0,4.0)":{type:"Grass"},"(0.0,0.0,5.0)":{type:"Grass"},"(0.0,0.0,6.0)":{type:"Grass"},"(0.0,0.0,7.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(0.0,0.0,8.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(0.0,0.0,9.0)":{type:"Grass"},"(1.0,0.0,0.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(1.0,0.0,1.0)":{type:"Grass"},"(1.0,0.0,10.0)":{type:"Grass"},"(1.0,0.0,11.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(1.0,0.0,12.0)":{type:"Grass"},"(1.0,0.0,13.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(1.0,0.0,14.0)":{type:"Grass"},"(1.0,0.0,15.0)":{type:"Grass"},"(1.0,0.0,2.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(1.0,0.0,3.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(1.0,0.0,4.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(1.0,0.0,5.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(1.0,0.0,6.0)":{type:"Grass"},"(1.0,0.0,7.0)":{type:"Marsh"},"(1.0,0.0,8.0)":{type:"Marsh"},"(1.0,0.0,9.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(10.0,0.0,0.0)":{type:"Grass"},"(10.0,0.0,1.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(10.0,0.0,10.0)":{type:"Wheat_Field",data:{craft:"Wheat",state:"Complete"}},"(10.0,0.0,11.0)":{type:"Rock"},"(10.0,0.0,12.0)":{type:"Grass"},"(10.0,0.0,13.0)":{type:"Grass"},"(10.0,0.0,14.0)":{type:"Grass"},"(10.0,0.0,15.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(10.0,0.0,2.0)":{type:"Grass"},"(10.0,0.0,3.0)":{type:"Marsh"},"(10.0,0.0,4.0)":{type:"Grass"},"(10.0,0.0,5.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(10.0,0.0,6.0)":{type:"Grass"},"(10.0,0.0,7.0)":{type:"Storehouse",data:{}},"(10.0,0.0,8.0)":{type:"Well",data:{craft:"Water",state:"Complete"}},"(10.0,0.0,9.0)":{type:"Grass"},"(11.0,0.0,0.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(11.0,0.0,1.0)":{type:"Grass"},"(11.0,0.0,10.0)":{type:"Wheat_Field",data:{craft:"Wheat",state:"Complete"}},"(11.0,0.0,11.0)":{type:"Grass"},"(11.0,0.0,12.0)":{type:"Grass"},"(11.0,0.0,13.0)":{type:"Grass"},"(11.0,0.0,14.0)":{type:"Grass"},"(11.0,0.0,15.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(11.0,0.0,2.0)":{type:"Grass"},"(11.0,0.0,3.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(11.0,0.0,4.0)":{type:"Grass"},"(11.0,0.0,5.0)":{type:"Grass"},"(11.0,0.0,6.0)":{type:"Farm_House"},"(11.0,0.0,7.0)":{type:"Dirt_Road"},"(11.0,0.0,8.0)":{type:"Dirt_Road"},"(11.0,0.0,9.0)":{type:"Dirt_Road"},"(12.0,0.0,0.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(12.0,0.0,1.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(12.0,0.0,10.0)":{type:"Marsh"},"(12.0,0.0,11.0)":{type:"Grass"},"(12.0,0.0,12.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(12.0,0.0,13.0)":{type:"Grass"},"(12.0,0.0,14.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(12.0,0.0,15.0)":{type:"Grass"},"(12.0,0.0,2.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(12.0,0.0,3.0)":{type:"Grass"},"(12.0,0.0,4.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(12.0,0.0,5.0)":{type:"Grass"},"(12.0,0.0,6.0)":{type:"Silo",data:{storageList:{Wheat:10}}},"(12.0,0.0,7.0)":{type:"Dirt_Road"},"(12.0,0.0,8.0)":{type:"Marsh"},"(12.0,0.0,9.0)":{type:"Pond"},"(13.0,0.0,0.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(13.0,0.0,1.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(13.0,0.0,10.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(13.0,0.0,11.0)":{type:"Grass"},"(13.0,0.0,12.0)":{type:"Grass"},"(13.0,0.0,13.0)":{type:"Grass"},"(13.0,0.0,14.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(13.0,0.0,15.0)":{type:"Grass"},"(13.0,0.0,2.0)":{type:"Grass"},"(13.0,0.0,3.0)":{type:"Grass"},"(13.0,0.0,4.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(13.0,0.0,5.0)":{type:"Marsh"},"(13.0,0.0,6.0)":{type:"Wood_Shed",data:{storageList:{Wood:9}}},"(13.0,0.0,7.0)":{type:"Dirt_Road"},"(13.0,0.0,8.0)":{type:"Grass"},"(13.0,0.0,9.0)":{type:"Marsh"},"(14.0,0.0,0.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(14.0,0.0,1.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(14.0,0.0,10.0)":{type:"Dirt_Road"},"(14.0,0.0,11.0)":{type:"Grass"},"(14.0,0.0,12.0)":{type:"Grass"},"(14.0,0.0,13.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(14.0,0.0,14.0)":{type:"Grass"},"(14.0,0.0,15.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(14.0,0.0,2.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(14.0,0.0,3.0)":{type:"Grass"},"(14.0,0.0,4.0)":{type:"Marsh"},"(14.0,0.0,5.0)":{type:"Pond"},"(14.0,0.0,6.0)":{type:"Dirt_Road"},"(14.0,0.0,7.0)":{type:"Dirt_Road"},"(14.0,0.0,8.0)":{type:"Dirt_Road"},"(14.0,0.0,9.0)":{type:"Dirt_Road"},"(15.0,0.0,0.0)":{type:"Grass"},"(15.0,0.0,1.0)":{type:"Grass"},"(15.0,0.0,10.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(15.0,0.0,11.0)":{type:"Grass"},"(15.0,0.0,12.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(15.0,0.0,13.0)":{type:"Grass"},"(15.0,0.0,14.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(15.0,0.0,15.0)":{type:"Grass"},"(15.0,0.0,2.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(15.0,0.0,3.0)":{type:"Grass"},"(15.0,0.0,4.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(15.0,0.0,5.0)":{type:"Marsh"},"(15.0,0.0,6.0)":{type:"Builder_House"},"(15.0,0.0,7.0)":{type:"Trade_Depot"},"(15.0,0.0,8.0)":{type:"Fuel_Storage",data:{storageList:{Gasoline:40}}},"(15.0,0.0,9.0)":{type:"Grass"},"(2.0,0.0,0.0)":{type:"Grass"},"(2.0,0.0,1.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(2.0,0.0,10.0)":{type:"Grass"},"(2.0,0.0,11.0)":{type:"Grass"},"(2.0,0.0,12.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(2.0,0.0,13.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(2.0,0.0,14.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(2.0,0.0,15.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(2.0,0.0,2.0)":{type:"Grass"},"(2.0,0.0,3.0)":{type:"Grass"},"(2.0,0.0,4.0)":{type:"Grass"},"(2.0,0.0,5.0)":{type:"Grass"},"(2.0,0.0,6.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(2.0,0.0,7.0)":{type:"Pond"},"(2.0,0.0,8.0)":{type:"Pond"},"(2.0,0.0,9.0)":{type:"Marsh"},"(3.0,0.0,0.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(3.0,0.0,1.0)":{type:"Grass"},"(3.0,0.0,10.0)":{type:"Marsh"},"(3.0,0.0,11.0)":{type:"Grass"},"(3.0,0.0,12.0)":{type:"Grass"},"(3.0,0.0,13.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(3.0,0.0,14.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(3.0,0.0,15.0)":{type:"Grass"},"(3.0,0.0,2.0)":{type:"Grass"},"(3.0,0.0,3.0)":{type:"Grass"},"(3.0,0.0,4.0)":{type:"Grass"},"(3.0,0.0,5.0)":{type:"Marsh"},"(3.0,0.0,6.0)":{type:"Grass"},"(3.0,0.0,7.0)":{type:"Rock"},"(3.0,0.0,8.0)":{type:"Pond"},"(3.0,0.0,9.0)":{type:"Pond"},"(4.0,0.0,0.0)":{type:"Grass"},"(4.0,0.0,1.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(4.0,0.0,10.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(4.0,0.0,11.0)":{type:"Grass"},"(4.0,0.0,12.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(4.0,0.0,13.0)":{type:"Grass"},"(4.0,0.0,14.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(4.0,0.0,15.0)":{type:"Grass"},"(4.0,0.0,2.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(4.0,0.0,3.0)":{type:"Grass"},"(4.0,0.0,4.0)":{type:"Marsh"},"(4.0,0.0,5.0)":{type:"Pond"},"(4.0,0.0,6.0)":{type:"Marsh"},"(4.0,0.0,7.0)":{type:"Grass"},"(4.0,0.0,8.0)":{type:"Marsh"},"(4.0,0.0,9.0)":{type:"Marsh"},"(5.0,0.0,0.0)":{type:"Grass"},"(5.0,0.0,1.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(5.0,0.0,10.0)":{type:"Rock"},"(5.0,0.0,11.0)":{type:"Grass"},"(5.0,0.0,12.0)":{type:"Grass"},"(5.0,0.0,13.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(5.0,0.0,14.0)":{type:"Grass"},"(5.0,0.0,15.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(5.0,0.0,2.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(5.0,0.0,3.0)":{type:"Grass"},"(5.0,0.0,4.0)":{type:"Grass"},"(5.0,0.0,5.0)":{type:"Marsh"},"(5.0,0.0,6.0)":{type:"Grass"},"(5.0,0.0,7.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(5.0,0.0,8.0)":{type:"Grass"},"(5.0,0.0,9.0)":{type:"Grass"},"(6.0,0.0,0.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(6.0,0.0,1.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(6.0,0.0,10.0)":{type:"Grass"},"(6.0,0.0,11.0)":{type:"Grass"},"(6.0,0.0,12.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(6.0,0.0,13.0)":{type:"Marsh"},"(6.0,0.0,14.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(6.0,0.0,15.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(6.0,0.0,2.0)":{type:"Grass"},"(6.0,0.0,3.0)":{type:"Grass"},"(6.0,0.0,4.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(6.0,0.0,5.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(6.0,0.0,6.0)":{type:"Grass"},"(6.0,0.0,7.0)":{type:"Grass"},"(6.0,0.0,8.0)":{type:"Grass"},"(6.0,0.0,9.0)":{type:"Grass"},"(7.0,0.0,0.0)":{type:"Grass"},"(7.0,0.0,1.0)":{type:"Grass"},"(7.0,0.0,10.0)":{type:"Grass"},"(7.0,0.0,11.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(7.0,0.0,12.0)":{type:"Marsh"},"(7.0,0.0,13.0)":{type:"Pond"},"(7.0,0.0,14.0)":{type:"Marsh"},"(7.0,0.0,15.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(7.0,0.0,2.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(7.0,0.0,3.0)":{type:"Grass"},"(7.0,0.0,4.0)":{type:"Grass"},"(7.0,0.0,5.0)":{type:"Grass"},"(7.0,0.0,6.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(7.0,0.0,7.0)":{type:"Grass"},"(7.0,0.0,8.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(7.0,0.0,9.0)":{type:"Grass"},"(8.0,0.0,0.0)":{type:"Grass"},"(8.0,0.0,1.0)":{type:"Grass"},"(8.0,0.0,10.0)":{type:"Grass"},"(8.0,0.0,11.0)":{type:"Grass"},"(8.0,0.0,12.0)":{type:"Grass"},"(8.0,0.0,13.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(8.0,0.0,14.0)":{type:"Pond"},"(8.0,0.0,15.0)":{type:"Marsh"},"(8.0,0.0,2.0)":{type:"Rock"},"(8.0,0.0,3.0)":{type:"Marsh"},"(8.0,0.0,4.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(8.0,0.0,5.0)":{type:"Grass"},"(8.0,0.0,6.0)":{type:"Grass"},"(8.0,0.0,7.0)":{type:"Grass"},"(8.0,0.0,8.0)":{type:"Grass"},"(8.0,0.0,9.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(9.0,0.0,0.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(9.0,0.0,1.0)":{type:"Grass"},"(9.0,0.0,10.0)":{type:"Grass"},"(9.0,0.0,11.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(9.0,0.0,12.0)":{type:"Grass"},"(9.0,0.0,13.0)":{type:"Grass"},"(9.0,0.0,14.0)":{type:"Marsh"},"(9.0,0.0,15.0)":{type:"Grass"},"(9.0,0.0,2.0)":{type:"Marsh"},"(9.0,0.0,3.0)":{type:"Pond"},"(9.0,0.0,4.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(9.0,0.0,5.0)":{type:"Rock"},"(9.0,0.0,6.0)":{type:"Grass"},"(9.0,0.0,7.0)":{type:"Grass"},"(9.0,0.0,8.0)":{type:"Grass"},"(9.0,0.0,9.0)":{type:"Grass"}},west:{"(0.0,0.0,0.0)":{type:"Grass"},"(0.0,0.0,1.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(0.0,0.0,10.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(0.0,0.0,11.0)":{type:"Grass"},"(0.0,0.0,12.0)":{type:"Grass"},"(0.0,0.0,13.0)":{type:"Grass"},"(0.0,0.0,14.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(0.0,0.0,15.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(0.0,0.0,2.0)":{type:"Grass"},"(0.0,0.0,3.0)":{type:"Grass"},"(0.0,0.0,4.0)":{type:"Grass"},"(0.0,0.0,5.0)":{type:"Fuel_Storage",data:{storageList:{Gasoline:40}}},"(0.0,0.0,6.0)":{type:"Trade_Depot"},"(0.0,0.0,7.0)":{type:"Builder_House"},"(0.0,0.0,8.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(0.0,0.0,9.0)":{type:"Grass"},"(1.0,0.0,0.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(1.0,0.0,1.0)":{type:"Grass"},"(1.0,0.0,10.0)":{type:"Grass"},"(1.0,0.0,11.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(1.0,0.0,12.0)":{type:"Grass"},"(1.0,0.0,13.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(1.0,0.0,14.0)":{type:"Grass"},"(1.0,0.0,15.0)":{type:"Grass"},"(1.0,0.0,2.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(1.0,0.0,3.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(1.0,0.0,4.0)":{type:"Dirt_Road"},"(1.0,0.0,5.0)":{type:"Dirt_Road"},"(1.0,0.0,6.0)":{type:"Dirt_Road"},"(1.0,0.0,7.0)":{type:"Dirt_Road"},"(1.0,0.0,8.0)":{type:"Dirt_Road"},"(1.0,0.0,9.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(10.0,0.0,0.0)":{type:"Grass"},"(10.0,0.0,1.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(10.0,0.0,10.0)":{type:"Grass"},"(10.0,0.0,11.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(10.0,0.0,12.0)":{type:"Grass"},"(10.0,0.0,13.0)":{type:"Grass"},"(10.0,0.0,14.0)":{type:"Grass"},"(10.0,0.0,15.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(10.0,0.0,2.0)":{type:"Grass"},"(10.0,0.0,3.0)":{type:"Marsh"},"(10.0,0.0,4.0)":{type:"Grass"},"(10.0,0.0,5.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(10.0,0.0,6.0)":{type:"Grass"},"(10.0,0.0,7.0)":{type:"Grass"},"(10.0,0.0,8.0)":{type:"Grass"},"(10.0,0.0,9.0)":{type:"Grass"},"(11.0,0.0,0.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(11.0,0.0,1.0)":{type:"Grass"},"(11.0,0.0,10.0)":{type:"Marsh"},"(11.0,0.0,11.0)":{type:"Marsh"},"(11.0,0.0,12.0)":{type:"Grass"},"(11.0,0.0,13.0)":{type:"Grass"},"(11.0,0.0,14.0)":{type:"Grass"},"(11.0,0.0,15.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(11.0,0.0,2.0)":{type:"Grass"},"(11.0,0.0,3.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(11.0,0.0,4.0)":{type:"Grass"},"(11.0,0.0,5.0)":{type:"Grass"},"(11.0,0.0,6.0)":{type:"Grass"},"(11.0,0.0,7.0)":{type:"Grass"},"(11.0,0.0,8.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(11.0,0.0,9.0)":{type:"Grass"},"(12.0,0.0,0.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(12.0,0.0,1.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(12.0,0.0,10.0)":{type:"Pond"},"(12.0,0.0,11.0)":{type:"Pond"},"(12.0,0.0,12.0)":{type:"Marsh"},"(12.0,0.0,13.0)":{type:"Grass"},"(12.0,0.0,14.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(12.0,0.0,15.0)":{type:"Grass"},"(12.0,0.0,2.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(12.0,0.0,3.0)":{type:"Grass"},"(12.0,0.0,4.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(12.0,0.0,5.0)":{type:"Rock"},"(12.0,0.0,6.0)":{type:"Marsh"},"(12.0,0.0,7.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(12.0,0.0,8.0)":{type:"Grass"},"(12.0,0.0,9.0)":{type:"Marsh"},"(13.0,0.0,0.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(13.0,0.0,1.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(13.0,0.0,10.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(13.0,0.0,11.0)":{type:"Pond"},"(13.0,0.0,12.0)":{type:"Marsh"},"(13.0,0.0,13.0)":{type:"Rock"},"(13.0,0.0,14.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(13.0,0.0,15.0)":{type:"Grass"},"(13.0,0.0,2.0)":{type:"Grass"},"(13.0,0.0,3.0)":{type:"Grass"},"(13.0,0.0,4.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(13.0,0.0,5.0)":{type:"Pond"},"(13.0,0.0,6.0)":{type:"Pond"},"(13.0,0.0,7.0)":{type:"Marsh"},"(13.0,0.0,8.0)":{type:"Grass"},"(13.0,0.0,9.0)":{type:"Grass"},"(14.0,0.0,0.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(14.0,0.0,1.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(14.0,0.0,10.0)":{type:"Grass"},"(14.0,0.0,11.0)":{type:"Marsh"},"(14.0,0.0,12.0)":{type:"Grass"},"(14.0,0.0,13.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(14.0,0.0,14.0)":{type:"Grass"},"(14.0,0.0,15.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(14.0,0.0,2.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(14.0,0.0,3.0)":{type:"Grass"},"(14.0,0.0,4.0)":{type:"Marsh"},"(14.0,0.0,5.0)":{type:"Pond"},"(14.0,0.0,6.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(14.0,0.0,7.0)":{type:"Grass"},"(14.0,0.0,8.0)":{type:"Grass"},"(14.0,0.0,9.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(15.0,0.0,0.0)":{type:"Grass"},"(15.0,0.0,1.0)":{type:"Grass"},"(15.0,0.0,10.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(15.0,0.0,11.0)":{type:"Grass"},"(15.0,0.0,12.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(15.0,0.0,13.0)":{type:"Grass"},"(15.0,0.0,14.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(15.0,0.0,15.0)":{type:"Grass"},"(15.0,0.0,2.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(15.0,0.0,3.0)":{type:"Grass"},"(15.0,0.0,4.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(15.0,0.0,5.0)":{type:"Marsh"},"(15.0,0.0,6.0)":{type:"Grass"},"(15.0,0.0,7.0)":{type:"Grass"},"(15.0,0.0,8.0)":{type:"Grass"},"(15.0,0.0,9.0)":{type:"Grass"},"(2.0,0.0,0.0)":{type:"Grass"},"(2.0,0.0,1.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(2.0,0.0,10.0)":{type:"Grass"},"(2.0,0.0,11.0)":{type:"Grass"},"(2.0,0.0,12.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(2.0,0.0,13.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(2.0,0.0,14.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(2.0,0.0,15.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(2.0,0.0,2.0)":{type:"Grass"},"(2.0,0.0,3.0)":{type:"Grass"},"(2.0,0.0,4.0)":{type:"Wood_Shed",data:{storageList:{Wood:9}}},"(2.0,0.0,5.0)":{type:"Silo",data:{storageList:{Wheat:10}}},"(2.0,0.0,6.0)":{type:"Dirt_Road"},"(2.0,0.0,7.0)":{type:"Grass"},"(2.0,0.0,8.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(2.0,0.0,9.0)":{type:"Grass"},"(3.0,0.0,0.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(3.0,0.0,1.0)":{type:"Grass"},"(3.0,0.0,10.0)":{type:"Grass"},"(3.0,0.0,11.0)":{type:"Grass"},"(3.0,0.0,12.0)":{type:"Grass"},"(3.0,0.0,13.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(3.0,0.0,14.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(3.0,0.0,15.0)":{type:"Grass"},"(3.0,0.0,2.0)":{type:"Grass"},"(3.0,0.0,3.0)":{type:"Grass"},"(3.0,0.0,4.0)":{type:"Grass"},"(3.0,0.0,5.0)":{type:"Grass"},"(3.0,0.0,6.0)":{type:"Dirt_Road"},"(3.0,0.0,7.0)":{type:"Marsh"},"(3.0,0.0,8.0)":{type:"Grass"},"(3.0,0.0,9.0)":{type:"Grass"},"(4.0,0.0,0.0)":{type:"Grass"},"(4.0,0.0,1.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(4.0,0.0,10.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(4.0,0.0,11.0)":{type:"Grass"},"(4.0,0.0,12.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(4.0,0.0,13.0)":{type:"Grass"},"(4.0,0.0,14.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(4.0,0.0,15.0)":{type:"Grass"},"(4.0,0.0,2.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(4.0,0.0,3.0)":{type:"Grass"},"(4.0,0.0,4.0)":{type:"Grass"},"(4.0,0.0,5.0)":{type:"Grass"},"(4.0,0.0,6.0)":{type:"Dirt_Road"},"(4.0,0.0,7.0)":{type:"Pond"},"(4.0,0.0,8.0)":{type:"Marsh"},"(4.0,0.0,9.0)":{type:"Grass"},"(5.0,0.0,0.0)":{type:"Grass"},"(5.0,0.0,1.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(5.0,0.0,10.0)":{type:"Grass"},"(5.0,0.0,11.0)":{type:"Grass"},"(5.0,0.0,12.0)":{type:"Grass"},"(5.0,0.0,13.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(5.0,0.0,14.0)":{type:"Grass"},"(5.0,0.0,15.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(5.0,0.0,2.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(5.0,0.0,3.0)":{type:"Farm_House"},"(5.0,0.0,4.0)":{type:"Dirt_Road"},"(5.0,0.0,5.0)":{type:"Dirt_Road"},"(5.0,0.0,6.0)":{type:"Dirt_Road"},"(5.0,0.0,7.0)":{type:"Wheat_Field",data:{craft:"Wheat",state:"Complete"}},"(5.0,0.0,8.0)":{type:"Grass"},"(5.0,0.0,9.0)":{type:"Grass"},"(6.0,0.0,0.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(6.0,0.0,1.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(6.0,0.0,10.0)":{type:"Grass"},"(6.0,0.0,11.0)":{type:"Marsh"},"(6.0,0.0,12.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(6.0,0.0,13.0)":{type:"Grass"},"(6.0,0.0,14.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(6.0,0.0,15.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(6.0,0.0,2.0)":{type:"Rock"},"(6.0,0.0,3.0)":{type:"Grass"},"(6.0,0.0,4.0)":{type:"Storehouse",data:{}},"(6.0,0.0,5.0)":{type:"Well",data:{craft:"Water",state:"Complete"}},"(6.0,0.0,6.0)":{type:"Grass"},"(6.0,0.0,7.0)":{type:"Wheat_Field",data:{craft:"Wheat",state:"Complete"}},"(6.0,0.0,8.0)":{type:"Grass"},"(6.0,0.0,9.0)":{type:"Grass"},"(7.0,0.0,0.0)":{type:"Grass"},"(7.0,0.0,1.0)":{type:"Grass"},"(7.0,0.0,10.0)":{type:"Marsh"},"(7.0,0.0,11.0)":{type:"Pond"},"(7.0,0.0,12.0)":{type:"Rock"},"(7.0,0.0,13.0)":{type:"Grass"},"(7.0,0.0,14.0)":{type:"Grass"},"(7.0,0.0,15.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(7.0,0.0,2.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(7.0,0.0,3.0)":{type:"Grass"},"(7.0,0.0,4.0)":{type:"Grass"},"(7.0,0.0,5.0)":{type:"Grass"},"(7.0,0.0,6.0)":{type:"Grass"},"(7.0,0.0,7.0)":{type:"Grass"},"(7.0,0.0,8.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(7.0,0.0,9.0)":{type:"Grass"},"(8.0,0.0,0.0)":{type:"Grass"},"(8.0,0.0,1.0)":{type:"Grass"},"(8.0,0.0,10.0)":{type:"Marsh"},"(8.0,0.0,11.0)":{type:"Pond"},"(8.0,0.0,12.0)":{type:"Pond"},"(8.0,0.0,13.0)":{type:"Marsh"},"(8.0,0.0,14.0)":{type:"Grass"},"(8.0,0.0,15.0)":{type:"Grass"},"(8.0,0.0,2.0)":{type:"Grass"},"(8.0,0.0,3.0)":{type:"Marsh"},"(8.0,0.0,4.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(8.0,0.0,5.0)":{type:"Grass"},"(8.0,0.0,6.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(8.0,0.0,7.0)":{type:"Grass"},"(8.0,0.0,8.0)":{type:"Grass"},"(8.0,0.0,9.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(9.0,0.0,0.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(9.0,0.0,1.0)":{type:"Grass"},"(9.0,0.0,10.0)":{type:"Grass"},"(9.0,0.0,11.0)":{type:"Marsh"},"(9.0,0.0,12.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(9.0,0.0,13.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(9.0,0.0,14.0)":{type:"Grass"},"(9.0,0.0,15.0)":{type:"Grass"},"(9.0,0.0,2.0)":{type:"Marsh"},"(9.0,0.0,3.0)":{type:"Pond"},"(9.0,0.0,4.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(9.0,0.0,5.0)":{type:"Rock"},"(9.0,0.0,6.0)":{type:"Grass"},"(9.0,0.0,7.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(9.0,0.0,8.0)":{type:"Grass"},"(9.0,0.0,9.0)":{type:"Grass"}}},Plains:{north:{"(0.0,0.0,0.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(0.0,0.0,1.0)":{type:"Scrub"},"(0.0,0.0,10.0)":{type:"Scrub"},"(0.0,0.0,11.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(0.0,0.0,12.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(0.0,0.0,13.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(0.0,0.0,14.0)":{type:"Scrub"},"(0.0,0.0,15.0)":{type:"Scrub"},"(0.0,0.0,2.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(0.0,0.0,3.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(0.0,0.0,4.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(0.0,0.0,5.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(0.0,0.0,6.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(0.0,0.0,7.0)":{type:"Scrub"},"(0.0,0.0,8.0)":{type:"Scrub"},"(0.0,0.0,9.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(1.0,0.0,0.0)":{type:"Scrub"},"(1.0,0.0,1.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(1.0,0.0,10.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(1.0,0.0,11.0)":{type:"Scrub"},"(1.0,0.0,12.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(1.0,0.0,13.0)":{type:"Scrub"},"(1.0,0.0,14.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(1.0,0.0,15.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(1.0,0.0,2.0)":{type:"Scrub"},"(1.0,0.0,3.0)":{type:"Scrub"},"(1.0,0.0,4.0)":{type:"Scrub"},"(1.0,0.0,5.0)":{type:"Scrub"},"(1.0,0.0,6.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(1.0,0.0,7.0)":{type:"Grass"},"(1.0,0.0,8.0)":{type:"Grass"},"(1.0,0.0,9.0)":{type:"Scrub"},"(10.0,0.0,0.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(10.0,0.0,1.0)":{type:"Scrub"},"(10.0,0.0,10.0)":{type:"Scrub"},"(10.0,0.0,11.0)":{type:"Grass"},"(10.0,0.0,12.0)":{type:"Rock"},"(10.0,0.0,13.0)":{type:"Scrub"},"(10.0,0.0,14.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(10.0,0.0,15.0)":{type:"Scrub"},"(10.0,0.0,2.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(10.0,0.0,3.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(10.0,0.0,4.0)":{type:"Farm_House"},"(10.0,0.0,5.0)":{type:"Scrub"},"(10.0,0.0,6.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(10.0,0.0,7.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(10.0,0.0,8.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(10.0,0.0,9.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(11.0,0.0,0.0)":{type:"Scrub"},"(11.0,0.0,1.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(11.0,0.0,10.0)":{type:"Grass"},"(11.0,0.0,11.0)":{type:"Grass"},"(11.0,0.0,12.0)":{type:"Grass"},"(11.0,0.0,13.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(11.0,0.0,14.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(11.0,0.0,15.0)":{type:"Scrub"},"(11.0,0.0,2.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(11.0,0.0,3.0)":{type:"Scrub"},"(11.0,0.0,4.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(11.0,0.0,5.0)":{type:"Grass"},"(11.0,0.0,6.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(11.0,0.0,7.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(11.0,0.0,8.0)":{type:"Scrub"},"(11.0,0.0,9.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(12.0,0.0,0.0)":{type:"Scrub"},"(12.0,0.0,1.0)":{type:"Scrub"},"(12.0,0.0,10.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(12.0,0.0,11.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(12.0,0.0,12.0)":{type:"Grass"},"(12.0,0.0,13.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(12.0,0.0,14.0)":{type:"Scrub"},"(12.0,0.0,15.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(12.0,0.0,2.0)":{type:"Scrub"},"(12.0,0.0,3.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(12.0,0.0,4.0)":{type:"Scrub"},"(12.0,0.0,5.0)":{type:"Rock"},"(12.0,0.0,6.0)":{type:"Grass"},"(12.0,0.0,7.0)":{type:"Scrub"},"(12.0,0.0,8.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(12.0,0.0,9.0)":{type:"Grass"},"(13.0,0.0,0.0)":{type:"Scrub"},"(13.0,0.0,1.0)":{type:"Scrub"},"(13.0,0.0,10.0)":{type:"Scrub"},"(13.0,0.0,11.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(13.0,0.0,12.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(13.0,0.0,13.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(13.0,0.0,14.0)":{type:"Scrub"},"(13.0,0.0,15.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(13.0,0.0,2.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(13.0,0.0,3.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(13.0,0.0,4.0)":{type:"Grass"},"(13.0,0.0,5.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(13.0,0.0,6.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(13.0,0.0,7.0)":{type:"Grass"},"(13.0,0.0,8.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(13.0,0.0,9.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(14.0,0.0,0.0)":{type:"Scrub"},"(14.0,0.0,1.0)":{type:"Scrub"},"(14.0,0.0,10.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(14.0,0.0,11.0)":{type:"Grass"},"(14.0,0.0,12.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(14.0,0.0,13.0)":{type:"Scrub"},"(14.0,0.0,14.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(14.0,0.0,15.0)":{type:"Scrub"},"(14.0,0.0,2.0)":{type:"Scrub"},"(14.0,0.0,3.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(14.0,0.0,4.0)":{type:"Grass"},"(14.0,0.0,5.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(14.0,0.0,6.0)":{type:"Scrub"},"(14.0,0.0,7.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(14.0,0.0,8.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(14.0,0.0,9.0)":{type:"Scrub"},"(15.0,0.0,0.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(15.0,0.0,1.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(15.0,0.0,10.0)":{type:"Scrub"},"(15.0,0.0,11.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(15.0,0.0,12.0)":{type:"Scrub"},"(15.0,0.0,13.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(15.0,0.0,14.0)":{type:"Scrub"},"(15.0,0.0,15.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(15.0,0.0,2.0)":{type:"Scrub"},"(15.0,0.0,3.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(15.0,0.0,4.0)":{type:"Scrub"},"(15.0,0.0,5.0)":{type:"Grass"},"(15.0,0.0,6.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(15.0,0.0,7.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(15.0,0.0,8.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(15.0,0.0,9.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(2.0,0.0,0.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(2.0,0.0,1.0)":{type:"Scrub"},"(2.0,0.0,10.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(2.0,0.0,11.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(2.0,0.0,12.0)":{type:"Scrub"},"(2.0,0.0,13.0)":{type:"Scrub"},"(2.0,0.0,14.0)":{type:"Scrub"},"(2.0,0.0,15.0)":{type:"Scrub"},"(2.0,0.0,2.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(2.0,0.0,3.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(2.0,0.0,4.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(2.0,0.0,5.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(2.0,0.0,6.0)":{type:"Scrub"},"(2.0,0.0,7.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(2.0,0.0,8.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(2.0,0.0,9.0)":{type:"Grass"},"(3.0,0.0,0.0)":{type:"Scrub"},"(3.0,0.0,1.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(3.0,0.0,10.0)":{type:"Grass"},"(3.0,0.0,11.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(3.0,0.0,12.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(3.0,0.0,13.0)":{type:"Scrub"},"(3.0,0.0,14.0)":{type:"Scrub"},"(3.0,0.0,15.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(3.0,0.0,2.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(3.0,0.0,3.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(3.0,0.0,4.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(3.0,0.0,5.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(3.0,0.0,6.0)":{type:"Grass"},"(3.0,0.0,7.0)":{type:"Rock"},"(3.0,0.0,8.0)":{type:"Pond"},"(3.0,0.0,9.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(4.0,0.0,0.0)":{type:"Scrub"},"(4.0,0.0,1.0)":{type:"Dirt_Road"},"(4.0,0.0,10.0)":{type:"Scrub"},"(4.0,0.0,11.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(4.0,0.0,12.0)":{type:"Scrub"},"(4.0,0.0,13.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(4.0,0.0,14.0)":{type:"Scrub"},"(4.0,0.0,15.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(4.0,0.0,2.0)":{type:"Scrub"},"(4.0,0.0,3.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(4.0,0.0,4.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(4.0,0.0,5.0)":{type:"Scrub"},"(4.0,0.0,6.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(4.0,0.0,7.0)":{type:"Grass"},"(4.0,0.0,8.0)":{type:"Grass"},"(4.0,0.0,9.0)":{type:"Grass"},"(5.0,0.0,0.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(5.0,0.0,1.0)":{type:"Dirt_Road"},"(5.0,0.0,10.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(5.0,0.0,11.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(5.0,0.0,12.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(5.0,0.0,13.0)":{type:"Scrub"},"(5.0,0.0,14.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(5.0,0.0,15.0)":{type:"Scrub"},"(5.0,0.0,2.0)":{type:"Scrub"},"(5.0,0.0,3.0)":{type:"Rock"},"(5.0,0.0,4.0)":{type:"Wheat_Field",data:{craft:"Wheat",state:"Complete"}},"(5.0,0.0,5.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(5.0,0.0,6.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(5.0,0.0,7.0)":{type:"Scrub"},"(5.0,0.0,8.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(5.0,0.0,9.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(6.0,0.0,0.0)":{type:"Trade_Depot"},"(6.0,0.0,1.0)":{type:"Dirt_Road"},"(6.0,0.0,10.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(6.0,0.0,11.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(6.0,0.0,12.0)":{type:"Scrub"},"(6.0,0.0,13.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(6.0,0.0,14.0)":{type:"Scrub"},"(6.0,0.0,15.0)":{type:"Scrub"},"(6.0,0.0,2.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(6.0,0.0,3.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(6.0,0.0,4.0)":{type:"Wheat_Field",data:{craft:"Wheat",state:"Complete"}},"(6.0,0.0,5.0)":{type:"Grass"},"(6.0,0.0,6.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(6.0,0.0,7.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(6.0,0.0,8.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(6.0,0.0,9.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(7.0,0.0,0.0)":{type:"Fuel_Storage",data:{storageList:{Gasoline:40}}},"(7.0,0.0,1.0)":{type:"Dirt_Road"},"(7.0,0.0,10.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(7.0,0.0,11.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(7.0,0.0,12.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(7.0,0.0,13.0)":{type:"Grass"},"(7.0,0.0,14.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(7.0,0.0,15.0)":{type:"Scrub"},"(7.0,0.0,2.0)":{type:"Scrub"},"(7.0,0.0,3.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(7.0,0.0,4.0)":{type:"Dirt_Road"},"(7.0,0.0,5.0)":{type:"Pond"},"(7.0,0.0,6.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(7.0,0.0,7.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(7.0,0.0,8.0)":{type:"Scrub"},"(7.0,0.0,9.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(8.0,0.0,0.0)":{type:"Builder_House"},"(8.0,0.0,1.0)":{type:"Dirt_Road"},"(8.0,0.0,10.0)":{type:"Rock"},"(8.0,0.0,11.0)":{type:"Scrub"},"(8.0,0.0,12.0)":{type:"Grass"},"(8.0,0.0,13.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(8.0,0.0,14.0)":{type:"Grass"},"(8.0,0.0,15.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(8.0,0.0,2.0)":{type:"Dirt_Road"},"(8.0,0.0,3.0)":{type:"Dirt_Road"},"(8.0,0.0,4.0)":{type:"Dirt_Road"},"(8.0,0.0,5.0)":{type:"Well",data:{craft:"Water",state:"Complete"}},"(8.0,0.0,6.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(8.0,0.0,7.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(8.0,0.0,8.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(8.0,0.0,9.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(9.0,0.0,0.0)":{type:"Scrub"},"(9.0,0.0,1.0)":{type:"Wood_Shed",data:{storageList:{Wood:9}}},"(9.0,0.0,10.0)":{type:"Scrub"},"(9.0,0.0,11.0)":{type:"Grass"},"(9.0,0.0,12.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(9.0,0.0,13.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(9.0,0.0,14.0)":{type:"Grass"},"(9.0,0.0,15.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(9.0,0.0,2.0)":{type:"Silo",data:{storageList:{Wheat:10}}},"(9.0,0.0,3.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(9.0,0.0,4.0)":{type:"Dirt_Road"},"(9.0,0.0,5.0)":{type:"Storehouse",data:{}},"(9.0,0.0,6.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(9.0,0.0,7.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(9.0,0.0,8.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(9.0,0.0,9.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}}},south:{"(0.0,0.0,0.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(0.0,0.0,1.0)":{type:"Scrub"},"(0.0,0.0,10.0)":{type:"Scrub"},"(0.0,0.0,11.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(0.0,0.0,12.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(0.0,0.0,13.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(0.0,0.0,14.0)":{type:"Scrub"},"(0.0,0.0,15.0)":{type:"Scrub"},"(0.0,0.0,2.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(0.0,0.0,3.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(0.0,0.0,4.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(0.0,0.0,5.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(0.0,0.0,6.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(0.0,0.0,7.0)":{type:"Scrub"},"(0.0,0.0,8.0)":{type:"Scrub"},"(0.0,0.0,9.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(1.0,0.0,0.0)":{type:"Scrub"},"(1.0,0.0,1.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(1.0,0.0,10.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(1.0,0.0,11.0)":{type:"Scrub"},"(1.0,0.0,12.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(1.0,0.0,13.0)":{type:"Scrub"},"(1.0,0.0,14.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(1.0,0.0,15.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(1.0,0.0,2.0)":{type:"Scrub"},"(1.0,0.0,3.0)":{type:"Scrub"},"(1.0,0.0,4.0)":{type:"Scrub"},"(1.0,0.0,5.0)":{type:"Scrub"},"(1.0,0.0,6.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(1.0,0.0,7.0)":{type:"Grass"},"(1.0,0.0,8.0)":{type:"Grass"},"(1.0,0.0,9.0)":{type:"Scrub"},"(10.0,0.0,0.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(10.0,0.0,1.0)":{type:"Scrub"},"(10.0,0.0,10.0)":{type:"Dirt_Road"},"(10.0,0.0,11.0)":{type:"Storehouse",data:{}},"(10.0,0.0,12.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(10.0,0.0,13.0)":{type:"Wood_Shed",data:{storageList:{Wood:9}}},"(10.0,0.0,14.0)":{type:"Dirt_Road"},"(10.0,0.0,15.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(10.0,0.0,2.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(10.0,0.0,3.0)":{type:"Grass"},"(10.0,0.0,4.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(10.0,0.0,5.0)":{type:"Scrub"},"(10.0,0.0,6.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(10.0,0.0,7.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(10.0,0.0,8.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(10.0,0.0,9.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(11.0,0.0,0.0)":{type:"Scrub"},"(11.0,0.0,1.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(11.0,0.0,10.0)":{type:"Farm_House"},"(11.0,0.0,11.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(11.0,0.0,12.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(11.0,0.0,13.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(11.0,0.0,14.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(11.0,0.0,15.0)":{type:"Scrub"},"(11.0,0.0,2.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(11.0,0.0,3.0)":{type:"Scrub"},"(11.0,0.0,4.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(11.0,0.0,5.0)":{type:"Grass"},"(11.0,0.0,6.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(11.0,0.0,7.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(11.0,0.0,8.0)":{type:"Scrub"},"(11.0,0.0,9.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(12.0,0.0,0.0)":{type:"Scrub"},"(12.0,0.0,1.0)":{type:"Scrub"},"(12.0,0.0,10.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(12.0,0.0,11.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(12.0,0.0,12.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(12.0,0.0,13.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(12.0,0.0,14.0)":{type:"Scrub"},"(12.0,0.0,15.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(12.0,0.0,2.0)":{type:"Scrub"},"(12.0,0.0,3.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(12.0,0.0,4.0)":{type:"Scrub"},"(12.0,0.0,5.0)":{type:"Rock"},"(12.0,0.0,6.0)":{type:"Grass"},"(12.0,0.0,7.0)":{type:"Scrub"},"(12.0,0.0,8.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(12.0,0.0,9.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(13.0,0.0,0.0)":{type:"Scrub"},"(13.0,0.0,1.0)":{type:"Scrub"},"(13.0,0.0,10.0)":{type:"Scrub"},"(13.0,0.0,11.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(13.0,0.0,12.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(13.0,0.0,13.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(13.0,0.0,14.0)":{type:"Scrub"},"(13.0,0.0,15.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(13.0,0.0,2.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(13.0,0.0,3.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(13.0,0.0,4.0)":{type:"Scrub"},"(13.0,0.0,5.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(13.0,0.0,6.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(13.0,0.0,7.0)":{type:"Grass"},"(13.0,0.0,8.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(13.0,0.0,9.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(14.0,0.0,0.0)":{type:"Scrub"},"(14.0,0.0,1.0)":{type:"Scrub"},"(14.0,0.0,10.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(14.0,0.0,11.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(14.0,0.0,12.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(14.0,0.0,13.0)":{type:"Scrub"},"(14.0,0.0,14.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(14.0,0.0,15.0)":{type:"Scrub"},"(14.0,0.0,2.0)":{type:"Scrub"},"(14.0,0.0,3.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(14.0,0.0,4.0)":{type:"Grass"},"(14.0,0.0,5.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(14.0,0.0,6.0)":{type:"Scrub"},"(14.0,0.0,7.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(14.0,0.0,8.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(14.0,0.0,9.0)":{type:"Scrub"},"(15.0,0.0,0.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(15.0,0.0,1.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(15.0,0.0,10.0)":{type:"Scrub"},"(15.0,0.0,11.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(15.0,0.0,12.0)":{type:"Scrub"},"(15.0,0.0,13.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(15.0,0.0,14.0)":{type:"Scrub"},"(15.0,0.0,15.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(15.0,0.0,2.0)":{type:"Scrub"},"(15.0,0.0,3.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(15.0,0.0,4.0)":{type:"Scrub"},"(15.0,0.0,5.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(15.0,0.0,6.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(15.0,0.0,7.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(15.0,0.0,8.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(15.0,0.0,9.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(2.0,0.0,0.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(2.0,0.0,1.0)":{type:"Scrub"},"(2.0,0.0,10.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(2.0,0.0,11.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(2.0,0.0,12.0)":{type:"Scrub"},"(2.0,0.0,13.0)":{type:"Scrub"},"(2.0,0.0,14.0)":{type:"Scrub"},"(2.0,0.0,15.0)":{type:"Scrub"},"(2.0,0.0,2.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(2.0,0.0,3.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(2.0,0.0,4.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(2.0,0.0,5.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(2.0,0.0,6.0)":{type:"Scrub"},"(2.0,0.0,7.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(2.0,0.0,8.0)":{type:"Pond"},"(2.0,0.0,9.0)":{type:"Grass"},"(3.0,0.0,0.0)":{type:"Scrub"},"(3.0,0.0,1.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(3.0,0.0,10.0)":{type:"Grass"},"(3.0,0.0,11.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(3.0,0.0,12.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(3.0,0.0,13.0)":{type:"Scrub"},"(3.0,0.0,14.0)":{type:"Scrub"},"(3.0,0.0,15.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(3.0,0.0,2.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(3.0,0.0,3.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(3.0,0.0,4.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(3.0,0.0,5.0)":{type:"Grass"},"(3.0,0.0,6.0)":{type:"Grass"},"(3.0,0.0,7.0)":{type:"Rock"},"(3.0,0.0,8.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(3.0,0.0,9.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(4.0,0.0,0.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(4.0,0.0,1.0)":{type:"Scrub"},"(4.0,0.0,10.0)":{type:"Scrub"},"(4.0,0.0,11.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(4.0,0.0,12.0)":{type:"Scrub"},"(4.0,0.0,13.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(4.0,0.0,14.0)":{type:"Scrub"},"(4.0,0.0,15.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(4.0,0.0,2.0)":{type:"Scrub"},"(4.0,0.0,3.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(4.0,0.0,4.0)":{type:"Grass"},"(4.0,0.0,5.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(4.0,0.0,6.0)":{type:"Grass"},"(4.0,0.0,7.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(4.0,0.0,8.0)":{type:"Grass"},"(4.0,0.0,9.0)":{type:"Grass"},"(5.0,0.0,0.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(5.0,0.0,1.0)":{type:"Scrub"},"(5.0,0.0,10.0)":{type:"Grass"},"(5.0,0.0,11.0)":{type:"Rock"},"(5.0,0.0,12.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(5.0,0.0,13.0)":{type:"Scrub"},"(5.0,0.0,14.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(5.0,0.0,15.0)":{type:"Scrub"},"(5.0,0.0,2.0)":{type:"Scrub"},"(5.0,0.0,3.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(5.0,0.0,4.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(5.0,0.0,5.0)":{type:"Grass"},"(5.0,0.0,6.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(5.0,0.0,7.0)":{type:"Scrub"},"(5.0,0.0,8.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(5.0,0.0,9.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(6.0,0.0,0.0)":{type:"Scrub"},"(6.0,0.0,1.0)":{type:"Scrub"},"(6.0,0.0,10.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(6.0,0.0,11.0)":{type:"Grass"},"(6.0,0.0,12.0)":{type:"Scrub"},"(6.0,0.0,13.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(6.0,0.0,14.0)":{type:"Dirt_Road"},"(6.0,0.0,15.0)":{type:"Scrub"},"(6.0,0.0,2.0)":{type:"Rock"},"(6.0,0.0,3.0)":{type:"Grass"},"(6.0,0.0,4.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(6.0,0.0,5.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(6.0,0.0,6.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(6.0,0.0,7.0)":{type:"Rock"},"(6.0,0.0,8.0)":{type:"Scrub"},"(6.0,0.0,9.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(7.0,0.0,0.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(7.0,0.0,1.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(7.0,0.0,10.0)":{type:"Wheat_Field",data:{craft:"Wheat",state:"Complete"}},"(7.0,0.0,11.0)":{type:"Pond"},"(7.0,0.0,12.0)":{type:"Grass"},"(7.0,0.0,13.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(7.0,0.0,14.0)":{type:"Dirt_Road"},"(7.0,0.0,15.0)":{type:"Builder_House"},"(7.0,0.0,2.0)":{type:"Scrub"},"(7.0,0.0,3.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(7.0,0.0,4.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(7.0,0.0,5.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(7.0,0.0,6.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(7.0,0.0,7.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(7.0,0.0,8.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(7.0,0.0,9.0)":{type:"Wheat_Field",data:{craft:"Wheat",state:"Complete"}},"(8.0,0.0,0.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(8.0,0.0,1.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(8.0,0.0,10.0)":{type:"Dirt_Road"},"(8.0,0.0,11.0)":{type:"Dirt_Road"},"(8.0,0.0,12.0)":{type:"Dirt_Road"},"(8.0,0.0,13.0)":{type:"Dirt_Road"},"(8.0,0.0,14.0)":{type:"Dirt_Road"},"(8.0,0.0,15.0)":{type:"Trade_Depot"},"(8.0,0.0,2.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(8.0,0.0,3.0)":{type:"Grass"},"(8.0,0.0,4.0)":{type:"Scrub"},"(8.0,0.0,5.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(8.0,0.0,6.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(8.0,0.0,7.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(8.0,0.0,8.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(8.0,0.0,9.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(9.0,0.0,0.0)":{type:"Scrub"},"(9.0,0.0,1.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(9.0,0.0,10.0)":{type:"Dirt_Road"},"(9.0,0.0,11.0)":{type:"Well",data:{craft:"Water",state:"Complete"}},"(9.0,0.0,12.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(9.0,0.0,13.0)":{type:"Silo",data:{storageList:{Wheat:10}}},"(9.0,0.0,14.0)":{type:"Dirt_Road"},"(9.0,0.0,15.0)":{type:"Fuel_Storage",data:{storageList:{Gasoline:40}}},"(9.0,0.0,2.0)":{type:"Grass"},"(9.0,0.0,3.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(9.0,0.0,4.0)":{type:"Scrub"},"(9.0,0.0,5.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(9.0,0.0,6.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(9.0,0.0,7.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(9.0,0.0,8.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(9.0,0.0,9.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}}},east:{"(0.0,0.0,0.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(0.0,0.0,1.0)":{type:"Scrub"},"(0.0,0.0,10.0)":{type:"Scrub"},"(0.0,0.0,11.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(0.0,0.0,12.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(0.0,0.0,13.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(0.0,0.0,14.0)":{type:"Scrub"},"(0.0,0.0,15.0)":{type:"Scrub"},"(0.0,0.0,2.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(0.0,0.0,3.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(0.0,0.0,4.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(0.0,0.0,5.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(0.0,0.0,6.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(0.0,0.0,7.0)":{type:"Scrub"},"(0.0,0.0,8.0)":{type:"Scrub"},"(0.0,0.0,9.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(1.0,0.0,0.0)":{type:"Scrub"},"(1.0,0.0,1.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(1.0,0.0,10.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(1.0,0.0,11.0)":{type:"Scrub"},"(1.0,0.0,12.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(1.0,0.0,13.0)":{type:"Scrub"},"(1.0,0.0,14.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(1.0,0.0,15.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(1.0,0.0,2.0)":{type:"Scrub"},"(1.0,0.0,3.0)":{type:"Scrub"},"(1.0,0.0,4.0)":{type:"Scrub"},"(1.0,0.0,5.0)":{type:"Scrub"},"(1.0,0.0,6.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(1.0,0.0,7.0)":{type:"Grass"},"(1.0,0.0,8.0)":{type:"Grass"},"(1.0,0.0,9.0)":{type:"Scrub"},"(10.0,0.0,0.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(10.0,0.0,1.0)":{type:"Scrub"},"(10.0,0.0,10.0)":{type:"Wheat_Field",data:{craft:"Wheat",state:"Complete"}},"(10.0,0.0,11.0)":{type:"Rock"},"(10.0,0.0,12.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(10.0,0.0,13.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(10.0,0.0,14.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(10.0,0.0,15.0)":{type:"Scrub"},"(10.0,0.0,2.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(10.0,0.0,3.0)":{type:"Grass"},"(10.0,0.0,4.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(10.0,0.0,5.0)":{type:"Scrub"},"(10.0,0.0,6.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(10.0,0.0,7.0)":{type:"Storehouse",data:{}},"(10.0,0.0,8.0)":{type:"Well",data:{craft:"Water",state:"Complete"}},"(10.0,0.0,9.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(11.0,0.0,0.0)":{type:"Scrub"},"(11.0,0.0,1.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(11.0,0.0,10.0)":{type:"Wheat_Field",data:{craft:"Wheat",state:"Complete"}},"(11.0,0.0,11.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(11.0,0.0,12.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(11.0,0.0,13.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(11.0,0.0,14.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(11.0,0.0,15.0)":{type:"Scrub"},"(11.0,0.0,2.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(11.0,0.0,3.0)":{type:"Scrub"},"(11.0,0.0,4.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(11.0,0.0,5.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(11.0,0.0,6.0)":{type:"Farm_House"},"(11.0,0.0,7.0)":{type:"Dirt_Road"},"(11.0,0.0,8.0)":{type:"Dirt_Road"},"(11.0,0.0,9.0)":{type:"Dirt_Road"},"(12.0,0.0,0.0)":{type:"Scrub"},"(12.0,0.0,1.0)":{type:"Scrub"},"(12.0,0.0,10.0)":{type:"Grass"},"(12.0,0.0,11.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(12.0,0.0,12.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(12.0,0.0,13.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(12.0,0.0,14.0)":{type:"Scrub"},"(12.0,0.0,15.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(12.0,0.0,2.0)":{type:"Scrub"},"(12.0,0.0,3.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(12.0,0.0,4.0)":{type:"Scrub"},"(12.0,0.0,5.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(12.0,0.0,6.0)":{type:"Silo",data:{storageList:{Wheat:10}}},"(12.0,0.0,7.0)":{type:"Dirt_Road"},"(12.0,0.0,8.0)":{type:"Grass"},"(12.0,0.0,9.0)":{type:"Pond"},"(13.0,0.0,0.0)":{type:"Scrub"},"(13.0,0.0,1.0)":{type:"Scrub"},"(13.0,0.0,10.0)":{type:"Scrub"},"(13.0,0.0,11.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(13.0,0.0,12.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(13.0,0.0,13.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(13.0,0.0,14.0)":{type:"Scrub"},"(13.0,0.0,15.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(13.0,0.0,2.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(13.0,0.0,3.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(13.0,0.0,4.0)":{type:"Scrub"},"(13.0,0.0,5.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(13.0,0.0,6.0)":{type:"Wood_Shed",data:{storageList:{Wood:9}}},"(13.0,0.0,7.0)":{type:"Dirt_Road"},"(13.0,0.0,8.0)":{type:"Grass"},"(13.0,0.0,9.0)":{type:"Grass"},"(14.0,0.0,0.0)":{type:"Scrub"},"(14.0,0.0,1.0)":{type:"Scrub"},"(14.0,0.0,10.0)":{type:"Dirt_Road"},"(14.0,0.0,11.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(14.0,0.0,12.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(14.0,0.0,13.0)":{type:"Scrub"},"(14.0,0.0,14.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(14.0,0.0,15.0)":{type:"Scrub"},"(14.0,0.0,2.0)":{type:"Scrub"},"(14.0,0.0,3.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(14.0,0.0,4.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(14.0,0.0,5.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(14.0,0.0,6.0)":{type:"Dirt_Road"},"(14.0,0.0,7.0)":{type:"Dirt_Road"},"(14.0,0.0,8.0)":{type:"Dirt_Road"},"(14.0,0.0,9.0)":{type:"Dirt_Road"},"(15.0,0.0,0.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(15.0,0.0,1.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(15.0,0.0,10.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(15.0,0.0,11.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(15.0,0.0,12.0)":{type:"Scrub"},"(15.0,0.0,13.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(15.0,0.0,14.0)":{type:"Scrub"},"(15.0,0.0,15.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(15.0,0.0,2.0)":{type:"Scrub"},"(15.0,0.0,3.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(15.0,0.0,4.0)":{type:"Scrub"},"(15.0,0.0,5.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(15.0,0.0,6.0)":{type:"Builder_House"},"(15.0,0.0,7.0)":{type:"Trade_Depot"},"(15.0,0.0,8.0)":{type:"Fuel_Storage",data:{storageList:{Gasoline:40}}},"(15.0,0.0,9.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(2.0,0.0,0.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(2.0,0.0,1.0)":{type:"Scrub"},"(2.0,0.0,10.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(2.0,0.0,11.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(2.0,0.0,12.0)":{type:"Scrub"},"(2.0,0.0,13.0)":{type:"Scrub"},"(2.0,0.0,14.0)":{type:"Scrub"},"(2.0,0.0,15.0)":{type:"Scrub"},"(2.0,0.0,2.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(2.0,0.0,3.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(2.0,0.0,4.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(2.0,0.0,5.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(2.0,0.0,6.0)":{type:"Scrub"},"(2.0,0.0,7.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(2.0,0.0,8.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(2.0,0.0,9.0)":{type:"Grass"},"(3.0,0.0,0.0)":{type:"Scrub"},"(3.0,0.0,1.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(3.0,0.0,10.0)":{type:"Grass"},"(3.0,0.0,11.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(3.0,0.0,12.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(3.0,0.0,13.0)":{type:"Scrub"},"(3.0,0.0,14.0)":{type:"Scrub"},"(3.0,0.0,15.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(3.0,0.0,2.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(3.0,0.0,3.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(3.0,0.0,4.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(3.0,0.0,5.0)":{type:"Grass"},"(3.0,0.0,6.0)":{type:"Grass"},"(3.0,0.0,7.0)":{type:"Rock"},"(3.0,0.0,8.0)":{type:"Pond"},"(3.0,0.0,9.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(4.0,0.0,0.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(4.0,0.0,1.0)":{type:"Scrub"},"(4.0,0.0,10.0)":{type:"Scrub"},"(4.0,0.0,11.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(4.0,0.0,12.0)":{type:"Scrub"},"(4.0,0.0,13.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(4.0,0.0,14.0)":{type:"Scrub"},"(4.0,0.0,15.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(4.0,0.0,2.0)":{type:"Scrub"},"(4.0,0.0,3.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(4.0,0.0,4.0)":{type:"Grass"},"(4.0,0.0,5.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(4.0,0.0,6.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(4.0,0.0,7.0)":{type:"Grass"},"(4.0,0.0,8.0)":{type:"Grass"},"(4.0,0.0,9.0)":{type:"Grass"},"(5.0,0.0,0.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(5.0,0.0,1.0)":{type:"Scrub"},"(5.0,0.0,10.0)":{type:"Rock"},"(5.0,0.0,11.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(5.0,0.0,12.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(5.0,0.0,13.0)":{type:"Scrub"},"(5.0,0.0,14.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(5.0,0.0,15.0)":{type:"Scrub"},"(5.0,0.0,2.0)":{type:"Scrub"},"(5.0,0.0,3.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(5.0,0.0,4.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(5.0,0.0,5.0)":{type:"Grass"},"(5.0,0.0,6.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(5.0,0.0,7.0)":{type:"Scrub"},"(5.0,0.0,8.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(5.0,0.0,9.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(6.0,0.0,0.0)":{type:"Scrub"},"(6.0,0.0,1.0)":{type:"Scrub"},"(6.0,0.0,10.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(6.0,0.0,11.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(6.0,0.0,12.0)":{type:"Scrub"},"(6.0,0.0,13.0)":{type:"Grass"},"(6.0,0.0,14.0)":{type:"Scrub"},"(6.0,0.0,15.0)":{type:"Scrub"},"(6.0,0.0,2.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(6.0,0.0,3.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(6.0,0.0,4.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(6.0,0.0,5.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(6.0,0.0,6.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(6.0,0.0,7.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(6.0,0.0,8.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(6.0,0.0,9.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(7.0,0.0,0.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(7.0,0.0,1.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(7.0,0.0,10.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(7.0,0.0,11.0)":{type:"Scrub"},"(7.0,0.0,12.0)":{type:"Grass"},"(7.0,0.0,13.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(7.0,0.0,14.0)":{type:"Grass"},"(7.0,0.0,15.0)":{type:"Scrub"},"(7.0,0.0,2.0)":{type:"Scrub"},"(7.0,0.0,3.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(7.0,0.0,4.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(7.0,0.0,5.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(7.0,0.0,6.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(7.0,0.0,7.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(7.0,0.0,8.0)":{type:"Scrub"},"(7.0,0.0,9.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(8.0,0.0,0.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(8.0,0.0,1.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(8.0,0.0,10.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(8.0,0.0,11.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(8.0,0.0,12.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(8.0,0.0,13.0)":{type:"Scrub"},"(8.0,0.0,14.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(8.0,0.0,15.0)":{type:"Grass"},"(8.0,0.0,2.0)":{type:"Rock"},"(8.0,0.0,3.0)":{type:"Grass"},"(8.0,0.0,4.0)":{type:"Scrub"},"(8.0,0.0,5.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(8.0,0.0,6.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(8.0,0.0,7.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(8.0,0.0,8.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(8.0,0.0,9.0)":{type:"Scrub"},"(9.0,0.0,0.0)":{type:"Scrub"},"(9.0,0.0,1.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(9.0,0.0,10.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(9.0,0.0,11.0)":{type:"Scrub"},"(9.0,0.0,12.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(9.0,0.0,13.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(9.0,0.0,14.0)":{type:"Grass"},"(9.0,0.0,15.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(9.0,0.0,2.0)":{type:"Grass"},"(9.0,0.0,3.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(9.0,0.0,4.0)":{type:"Scrub"},"(9.0,0.0,5.0)":{type:"Rock"},"(9.0,0.0,6.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(9.0,0.0,7.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(9.0,0.0,8.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(9.0,0.0,9.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}}},west:{"(0.0,0.0,0.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(0.0,0.0,1.0)":{type:"Scrub"},"(0.0,0.0,10.0)":{type:"Scrub"},"(0.0,0.0,11.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(0.0,0.0,12.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(0.0,0.0,13.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(0.0,0.0,14.0)":{type:"Scrub"},"(0.0,0.0,15.0)":{type:"Scrub"},"(0.0,0.0,2.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(0.0,0.0,3.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(0.0,0.0,4.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(0.0,0.0,5.0)":{type:"Fuel_Storage",data:{storageList:{Gasoline:40}}},"(0.0,0.0,6.0)":{type:"Trade_Depot"},"(0.0,0.0,7.0)":{type:"Builder_House"},"(0.0,0.0,8.0)":{type:"Scrub"},"(0.0,0.0,9.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(1.0,0.0,0.0)":{type:"Scrub"},"(1.0,0.0,1.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(1.0,0.0,10.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(1.0,0.0,11.0)":{type:"Scrub"},"(1.0,0.0,12.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(1.0,0.0,13.0)":{type:"Scrub"},"(1.0,0.0,14.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(1.0,0.0,15.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(1.0,0.0,2.0)":{type:"Scrub"},"(1.0,0.0,3.0)":{type:"Scrub"},"(1.0,0.0,4.0)":{type:"Dirt_Road"},"(1.0,0.0,5.0)":{type:"Dirt_Road"},"(1.0,0.0,6.0)":{type:"Dirt_Road"},"(1.0,0.0,7.0)":{type:"Dirt_Road"},"(1.0,0.0,8.0)":{type:"Dirt_Road"},"(1.0,0.0,9.0)":{type:"Scrub"},"(10.0,0.0,0.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(10.0,0.0,1.0)":{type:"Scrub"},"(10.0,0.0,10.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(10.0,0.0,11.0)":{type:"Scrub"},"(10.0,0.0,12.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(10.0,0.0,13.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(10.0,0.0,14.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(10.0,0.0,15.0)":{type:"Scrub"},"(10.0,0.0,2.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(10.0,0.0,3.0)":{type:"Grass"},"(10.0,0.0,4.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(10.0,0.0,5.0)":{type:"Scrub"},"(10.0,0.0,6.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(10.0,0.0,7.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(10.0,0.0,8.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(10.0,0.0,9.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(11.0,0.0,0.0)":{type:"Scrub"},"(11.0,0.0,1.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(11.0,0.0,10.0)":{type:"Grass"},"(11.0,0.0,11.0)":{type:"Grass"},"(11.0,0.0,12.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(11.0,0.0,13.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(11.0,0.0,14.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(11.0,0.0,15.0)":{type:"Scrub"},"(11.0,0.0,2.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(11.0,0.0,3.0)":{type:"Scrub"},"(11.0,0.0,4.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(11.0,0.0,5.0)":{type:"Grass"},"(11.0,0.0,6.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(11.0,0.0,7.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(11.0,0.0,8.0)":{type:"Scrub"},"(11.0,0.0,9.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(12.0,0.0,0.0)":{type:"Scrub"},"(12.0,0.0,1.0)":{type:"Scrub"},"(12.0,0.0,10.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(12.0,0.0,11.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(12.0,0.0,12.0)":{type:"Grass"},"(12.0,0.0,13.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(12.0,0.0,14.0)":{type:"Scrub"},"(12.0,0.0,15.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(12.0,0.0,2.0)":{type:"Scrub"},"(12.0,0.0,3.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(12.0,0.0,4.0)":{type:"Scrub"},"(12.0,0.0,5.0)":{type:"Rock"},"(12.0,0.0,6.0)":{type:"Grass"},"(12.0,0.0,7.0)":{type:"Scrub"},"(12.0,0.0,8.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(12.0,0.0,9.0)":{type:"Grass"},"(13.0,0.0,0.0)":{type:"Scrub"},"(13.0,0.0,1.0)":{type:"Scrub"},"(13.0,0.0,10.0)":{type:"Scrub"},"(13.0,0.0,11.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(13.0,0.0,12.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(13.0,0.0,13.0)":{type:"Rock"},"(13.0,0.0,14.0)":{type:"Scrub"},"(13.0,0.0,15.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(13.0,0.0,2.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(13.0,0.0,3.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(13.0,0.0,4.0)":{type:"Scrub"},"(13.0,0.0,5.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(13.0,0.0,6.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(13.0,0.0,7.0)":{type:"Grass"},"(13.0,0.0,8.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(13.0,0.0,9.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(14.0,0.0,0.0)":{type:"Scrub"},"(14.0,0.0,1.0)":{type:"Scrub"},"(14.0,0.0,10.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(14.0,0.0,11.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(14.0,0.0,12.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(14.0,0.0,13.0)":{type:"Scrub"},"(14.0,0.0,14.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(14.0,0.0,15.0)":{type:"Scrub"},"(14.0,0.0,2.0)":{type:"Scrub"},"(14.0,0.0,3.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(14.0,0.0,4.0)":{type:"Grass"},"(14.0,0.0,5.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(14.0,0.0,6.0)":{type:"Scrub"},"(14.0,0.0,7.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(14.0,0.0,8.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(14.0,0.0,9.0)":{type:"Scrub"},"(15.0,0.0,0.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(15.0,0.0,1.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(15.0,0.0,10.0)":{type:"Scrub"},"(15.0,0.0,11.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(15.0,0.0,12.0)":{type:"Scrub"},"(15.0,0.0,13.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(15.0,0.0,14.0)":{type:"Scrub"},"(15.0,0.0,15.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(15.0,0.0,2.0)":{type:"Scrub"},"(15.0,0.0,3.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(15.0,0.0,4.0)":{type:"Scrub"},"(15.0,0.0,5.0)":{type:"Grass"},"(15.0,0.0,6.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(15.0,0.0,7.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(15.0,0.0,8.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(15.0,0.0,9.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(2.0,0.0,0.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(2.0,0.0,1.0)":{type:"Scrub"},"(2.0,0.0,10.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(2.0,0.0,11.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(2.0,0.0,12.0)":{type:"Scrub"},"(2.0,0.0,13.0)":{type:"Scrub"},"(2.0,0.0,14.0)":{type:"Scrub"},"(2.0,0.0,15.0)":{type:"Scrub"},"(2.0,0.0,2.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(2.0,0.0,3.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(2.0,0.0,4.0)":{type:"Wood_Shed",data:{storageList:{Wood:9}}},"(2.0,0.0,5.0)":{type:"Silo",data:{storageList:{Wheat:10}}},"(2.0,0.0,6.0)":{type:"Dirt_Road"},"(2.0,0.0,7.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(2.0,0.0,8.0)":{type:"Scrub"},"(2.0,0.0,9.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(3.0,0.0,0.0)":{type:"Scrub"},"(3.0,0.0,1.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(3.0,0.0,10.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(3.0,0.0,11.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(3.0,0.0,12.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(3.0,0.0,13.0)":{type:"Scrub"},"(3.0,0.0,14.0)":{type:"Scrub"},"(3.0,0.0,15.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(3.0,0.0,2.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(3.0,0.0,3.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(3.0,0.0,4.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(3.0,0.0,5.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(3.0,0.0,6.0)":{type:"Dirt_Road"},"(3.0,0.0,7.0)":{type:"Grass"},"(3.0,0.0,8.0)":{type:"Grass"},"(3.0,0.0,9.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(4.0,0.0,0.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(4.0,0.0,1.0)":{type:"Scrub"},"(4.0,0.0,10.0)":{type:"Scrub"},"(4.0,0.0,11.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(4.0,0.0,12.0)":{type:"Scrub"},"(4.0,0.0,13.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(4.0,0.0,14.0)":{type:"Scrub"},"(4.0,0.0,15.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(4.0,0.0,2.0)":{type:"Scrub"},"(4.0,0.0,3.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(4.0,0.0,4.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(4.0,0.0,5.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(4.0,0.0,6.0)":{type:"Dirt_Road"},"(4.0,0.0,7.0)":{type:"Pond"},"(4.0,0.0,8.0)":{type:"Grass"},"(4.0,0.0,9.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(5.0,0.0,0.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(5.0,0.0,1.0)":{type:"Scrub"},"(5.0,0.0,10.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(5.0,0.0,11.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(5.0,0.0,12.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(5.0,0.0,13.0)":{type:"Scrub"},"(5.0,0.0,14.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(5.0,0.0,15.0)":{type:"Scrub"},"(5.0,0.0,2.0)":{type:"Scrub"},"(5.0,0.0,3.0)":{type:"Farm_House"},"(5.0,0.0,4.0)":{type:"Dirt_Road"},"(5.0,0.0,5.0)":{type:"Dirt_Road"},"(5.0,0.0,6.0)":{type:"Dirt_Road"},"(5.0,0.0,7.0)":{type:"Wheat_Field",data:{craft:"Wheat",state:"Complete"}},"(5.0,0.0,8.0)":{type:"Grass"},"(5.0,0.0,9.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(6.0,0.0,0.0)":{type:"Scrub"},"(6.0,0.0,1.0)":{type:"Scrub"},"(6.0,0.0,10.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(6.0,0.0,11.0)":{type:"Grass"},"(6.0,0.0,12.0)":{type:"Scrub"},"(6.0,0.0,13.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(6.0,0.0,14.0)":{type:"Scrub"},"(6.0,0.0,15.0)":{type:"Scrub"},"(6.0,0.0,2.0)":{type:"Rock"},"(6.0,0.0,3.0)":{type:"Grass"},"(6.0,0.0,4.0)":{type:"Storehouse",data:{}},"(6.0,0.0,5.0)":{type:"Well",data:{craft:"Water",state:"Complete"}},"(6.0,0.0,6.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(6.0,0.0,7.0)":{type:"Wheat_Field",data:{craft:"Wheat",state:"Complete"}},"(6.0,0.0,8.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(6.0,0.0,9.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(7.0,0.0,0.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(7.0,0.0,1.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(7.0,0.0,10.0)":{type:"Grass"},"(7.0,0.0,11.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(7.0,0.0,12.0)":{type:"Rock"},"(7.0,0.0,13.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(7.0,0.0,14.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(7.0,0.0,15.0)":{type:"Scrub"},"(7.0,0.0,2.0)":{type:"Scrub"},"(7.0,0.0,3.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(7.0,0.0,4.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(7.0,0.0,5.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(7.0,0.0,6.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(7.0,0.0,7.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(7.0,0.0,8.0)":{type:"Scrub"},"(7.0,0.0,9.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(8.0,0.0,0.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(8.0,0.0,1.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(8.0,0.0,10.0)":{type:"Grass"},"(8.0,0.0,11.0)":{type:"Pond"},"(8.0,0.0,12.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(8.0,0.0,13.0)":{type:"Grass"},"(8.0,0.0,14.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(8.0,0.0,15.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(8.0,0.0,2.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(8.0,0.0,3.0)":{type:"Grass"},"(8.0,0.0,4.0)":{type:"Scrub"},"(8.0,0.0,5.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(8.0,0.0,6.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(8.0,0.0,7.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(8.0,0.0,8.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(8.0,0.0,9.0)":{type:"Scrub"},"(9.0,0.0,0.0)":{type:"Scrub"},"(9.0,0.0,1.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(9.0,0.0,10.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(9.0,0.0,11.0)":{type:"Grass"},"(9.0,0.0,12.0)":{type:"Scrub"},"(9.0,0.0,13.0)":{type:"Scrub"},"(9.0,0.0,14.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(9.0,0.0,15.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(9.0,0.0,2.0)":{type:"Grass"},"(9.0,0.0,3.0)":{type:"Tree",data:{craft:"Wood",state:"Complete"}},"(9.0,0.0,4.0)":{type:"Scrub"},"(9.0,0.0,5.0)":{type:"Rock"},"(9.0,0.0,6.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(9.0,0.0,7.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(9.0,0.0,8.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(9.0,0.0,9.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}}}},Desert:{north:{"(0.0,0.0,0.0)":{type:"Arid"},"(0.0,0.0,1.0)":{type:"Scrub"},"(0.0,0.0,10.0)":{type:"Scrub"},"(0.0,0.0,11.0)":{type:"Arid"},"(0.0,0.0,12.0)":{type:"Arid"},"(0.0,0.0,13.0)":{type:"Arid"},"(0.0,0.0,14.0)":{type:"Scrub"},"(0.0,0.0,15.0)":{type:"Scrub"},"(0.0,0.0,2.0)":{type:"Arid"},"(0.0,0.0,3.0)":{type:"Arid"},"(0.0,0.0,4.0)":{type:"Arid"},"(0.0,0.0,5.0)":{type:"Arid"},"(0.0,0.0,6.0)":{type:"Arid"},"(0.0,0.0,7.0)":{type:"Scrub"},"(0.0,0.0,8.0)":{type:"Scrub"},"(0.0,0.0,9.0)":{type:"Arid"},"(1.0,0.0,0.0)":{type:"Scrub"},"(1.0,0.0,1.0)":{type:"Arid"},"(1.0,0.0,10.0)":{type:"Arid"},"(1.0,0.0,11.0)":{type:"Scrub"},"(1.0,0.0,12.0)":{type:"Arid"},"(1.0,0.0,13.0)":{type:"Scrub"},"(1.0,0.0,14.0)":{type:"Arid"},"(1.0,0.0,15.0)":{type:"Arid"},"(1.0,0.0,2.0)":{type:"Scrub"},"(1.0,0.0,3.0)":{type:"Scrub"},"(1.0,0.0,4.0)":{type:"Scrub"},"(1.0,0.0,5.0)":{type:"Scrub"},"(1.0,0.0,6.0)":{type:"Arid"},"(1.0,0.0,7.0)":{type:"Arid"},"(1.0,0.0,8.0)":{type:"Arid"},"(1.0,0.0,9.0)":{type:"Scrub"},"(10.0,0.0,0.0)":{type:"Arid"},"(10.0,0.0,1.0)":{type:"Scrub"},"(10.0,0.0,10.0)":{type:"Scrub"},"(10.0,0.0,11.0)":{type:"Arid"},"(10.0,0.0,12.0)":{type:"Rock"},"(10.0,0.0,13.0)":{type:"Scrub"},"(10.0,0.0,14.0)":{type:"Arid"},"(10.0,0.0,15.0)":{type:"Scrub"},"(10.0,0.0,2.0)":{type:"Arid"},"(10.0,0.0,3.0)":{type:"Arid"},"(10.0,0.0,4.0)":{type:"Farm_House"},"(10.0,0.0,5.0)":{type:"Scrub"},"(10.0,0.0,6.0)":{type:"Arid"},"(10.0,0.0,7.0)":{type:"Arid"},"(10.0,0.0,8.0)":{type:"Arid"},"(10.0,0.0,9.0)":{type:"Arid"},"(11.0,0.0,0.0)":{type:"Scrub"},"(11.0,0.0,1.0)":{type:"Arid"},"(11.0,0.0,10.0)":{type:"Arid"},"(11.0,0.0,11.0)":{type:"Arid"},"(11.0,0.0,12.0)":{type:"Arid"},"(11.0,0.0,13.0)":{type:"Arid"},"(11.0,0.0,14.0)":{type:"Arid"},"(11.0,0.0,15.0)":{type:"Scrub"},"(11.0,0.0,2.0)":{type:"Arid"},"(11.0,0.0,3.0)":{type:"Scrub"},"(11.0,0.0,4.0)":{type:"Arid"},"(11.0,0.0,5.0)":{type:"Arid"},"(11.0,0.0,6.0)":{type:"Arid"},"(11.0,0.0,7.0)":{type:"Arid"},"(11.0,0.0,8.0)":{type:"Scrub"},"(11.0,0.0,9.0)":{type:"Arid"},"(12.0,0.0,0.0)":{type:"Scrub"},"(12.0,0.0,1.0)":{type:"Scrub"},"(12.0,0.0,10.0)":{type:"Cactus"},"(12.0,0.0,11.0)":{type:"Cactus"},"(12.0,0.0,12.0)":{type:"Arid"},"(12.0,0.0,13.0)":{type:"Arid"},"(12.0,0.0,14.0)":{type:"Scrub"},"(12.0,0.0,15.0)":{type:"Arid"},"(12.0,0.0,2.0)":{type:"Scrub"},"(12.0,0.0,3.0)":{type:"Arid"},"(12.0,0.0,4.0)":{type:"Scrub"},"(12.0,0.0,5.0)":{type:"Rock"},"(12.0,0.0,6.0)":{type:"Arid"},"(12.0,0.0,7.0)":{type:"Scrub"},"(12.0,0.0,8.0)":{type:"Arid"},"(12.0,0.0,9.0)":{type:"Arid"},"(13.0,0.0,0.0)":{type:"Scrub"},"(13.0,0.0,1.0)":{type:"Scrub"},"(13.0,0.0,10.0)":{type:"Scrub"},"(13.0,0.0,11.0)":{type:"Cactus"},"(13.0,0.0,12.0)":{type:"Arid"},"(13.0,0.0,13.0)":{type:"Arid"},"(13.0,0.0,14.0)":{type:"Scrub"},"(13.0,0.0,15.0)":{type:"Arid"},"(13.0,0.0,2.0)":{type:"Arid"},"(13.0,0.0,3.0)":{type:"Arid"},"(13.0,0.0,4.0)":{type:"Scrub"},"(13.0,0.0,5.0)":{type:"Cactus"},"(13.0,0.0,6.0)":{type:"Cactus"},"(13.0,0.0,7.0)":{type:"Arid"},"(13.0,0.0,8.0)":{type:"Arid"},"(13.0,0.0,9.0)":{type:"Arid"},"(14.0,0.0,0.0)":{type:"Scrub"},"(14.0,0.0,1.0)":{type:"Scrub"},"(14.0,0.0,10.0)":{type:"Arid"},"(14.0,0.0,11.0)":{type:"Arid"},"(14.0,0.0,12.0)":{type:"Arid"},"(14.0,0.0,13.0)":{type:"Scrub"},"(14.0,0.0,14.0)":{type:"Arid"},"(14.0,0.0,15.0)":{type:"Scrub"},"(14.0,0.0,2.0)":{type:"Scrub"},"(14.0,0.0,3.0)":{type:"Arid"},"(14.0,0.0,4.0)":{type:"Arid"},"(14.0,0.0,5.0)":{type:"Cactus"},"(14.0,0.0,6.0)":{type:"Scrub"},"(14.0,0.0,7.0)":{type:"Arid"},"(14.0,0.0,8.0)":{type:"Arid"},"(14.0,0.0,9.0)":{type:"Scrub"},"(15.0,0.0,0.0)":{type:"Arid"},"(15.0,0.0,1.0)":{type:"Arid"},"(15.0,0.0,10.0)":{type:"Scrub"},"(15.0,0.0,11.0)":{type:"Arid"},"(15.0,0.0,12.0)":{type:"Scrub"},"(15.0,0.0,13.0)":{type:"Arid"},"(15.0,0.0,14.0)":{type:"Scrub"},"(15.0,0.0,15.0)":{type:"Arid"},"(15.0,0.0,2.0)":{type:"Scrub"},"(15.0,0.0,3.0)":{type:"Arid"},"(15.0,0.0,4.0)":{type:"Scrub"},"(15.0,0.0,5.0)":{type:"Arid"},"(15.0,0.0,6.0)":{type:"Arid"},"(15.0,0.0,7.0)":{type:"Arid"},"(15.0,0.0,8.0)":{type:"Arid"},"(15.0,0.0,9.0)":{type:"Arid"},"(2.0,0.0,0.0)":{type:"Arid"},"(2.0,0.0,1.0)":{type:"Scrub"},"(2.0,0.0,10.0)":{type:"Arid"},"(2.0,0.0,11.0)":{type:"Arid"},"(2.0,0.0,12.0)":{type:"Scrub"},"(2.0,0.0,13.0)":{type:"Scrub"},"(2.0,0.0,14.0)":{type:"Scrub"},"(2.0,0.0,15.0)":{type:"Scrub"},"(2.0,0.0,2.0)":{type:"Arid"},"(2.0,0.0,3.0)":{type:"Arid"},"(2.0,0.0,4.0)":{type:"Arid"},"(2.0,0.0,5.0)":{type:"Arid"},"(2.0,0.0,6.0)":{type:"Scrub"},"(2.0,0.0,7.0)":{type:"Cactus"},"(2.0,0.0,8.0)":{type:"Cactus"},"(2.0,0.0,9.0)":{type:"Arid"},"(3.0,0.0,0.0)":{type:"Scrub"},"(3.0,0.0,1.0)":{type:"Arid"},"(3.0,0.0,10.0)":{type:"Arid"},"(3.0,0.0,11.0)":{type:"Arid"},"(3.0,0.0,12.0)":{type:"Arid"},"(3.0,0.0,13.0)":{type:"Scrub"},"(3.0,0.0,14.0)":{type:"Scrub"},"(3.0,0.0,15.0)":{type:"Arid"},"(3.0,0.0,2.0)":{type:"Arid"},"(3.0,0.0,3.0)":{type:"Arid"},"(3.0,0.0,4.0)":{type:"Arid"},"(3.0,0.0,5.0)":{type:"Arid"},"(3.0,0.0,6.0)":{type:"Arid"},"(3.0,0.0,7.0)":{type:"Rock"},"(3.0,0.0,8.0)":{type:"Cactus"},"(3.0,0.0,9.0)":{type:"Cactus"},"(4.0,0.0,0.0)":{type:"Scrub"},"(4.0,0.0,1.0)":{type:"Dirt_Road"},"(4.0,0.0,10.0)":{type:"Scrub"},"(4.0,0.0,11.0)":{type:"Arid"},"(4.0,0.0,12.0)":{type:"Scrub"},"(4.0,0.0,13.0)":{type:"Arid"},"(4.0,0.0,14.0)":{type:"Scrub"},"(4.0,0.0,15.0)":{type:"Arid"},"(4.0,0.0,2.0)":{type:"Scrub"},"(4.0,0.0,3.0)":{type:"Arid"},"(4.0,0.0,4.0)":{type:"Arid"},"(4.0,0.0,5.0)":{type:"Scrub"},"(4.0,0.0,6.0)":{type:"Arid"},"(4.0,0.0,7.0)":{type:"Arid"},"(4.0,0.0,8.0)":{type:"Arid"},"(4.0,0.0,9.0)":{type:"Arid"},"(5.0,0.0,0.0)":{type:"Arid"},"(5.0,0.0,1.0)":{type:"Dirt_Road"},"(5.0,0.0,10.0)":{type:"Arid"},"(5.0,0.0,11.0)":{type:"Arid"},"(5.0,0.0,12.0)":{type:"Arid"},"(5.0,0.0,13.0)":{type:"Scrub"},"(5.0,0.0,14.0)":{type:"Arid"},"(5.0,0.0,15.0)":{type:"Scrub"},"(5.0,0.0,2.0)":{type:"Scrub"},"(5.0,0.0,3.0)":{type:"Rock"},"(5.0,0.0,4.0)":{type:"Wheat_Field",data:{craft:"Wheat",state:"Complete"}},"(5.0,0.0,5.0)":{type:"Arid"},"(5.0,0.0,6.0)":{type:"Arid"},"(5.0,0.0,7.0)":{type:"Scrub"},"(5.0,0.0,8.0)":{type:"Arid"},"(5.0,0.0,9.0)":{type:"Arid"},"(6.0,0.0,0.0)":{type:"Trade_Depot"},"(6.0,0.0,1.0)":{type:"Dirt_Road"},"(6.0,0.0,10.0)":{type:"Arid"},"(6.0,0.0,11.0)":{type:"Arid"},"(6.0,0.0,12.0)":{type:"Scrub"},"(6.0,0.0,13.0)":{type:"Arid"},"(6.0,0.0,14.0)":{type:"Scrub"},"(6.0,0.0,15.0)":{type:"Scrub"},"(6.0,0.0,2.0)":{type:"Arid"},"(6.0,0.0,3.0)":{type:"Arid"},"(6.0,0.0,4.0)":{type:"Wheat_Field",data:{craft:"Wheat",state:"Complete"}},"(6.0,0.0,5.0)":{type:"Grass"},"(6.0,0.0,6.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(6.0,0.0,7.0)":{type:"Arid"},"(6.0,0.0,8.0)":{type:"Arid"},"(6.0,0.0,9.0)":{type:"Arid"},"(7.0,0.0,0.0)":{type:"Fuel_Storage",data:{storageList:{Gasoline:40}}},"(7.0,0.0,1.0)":{type:"Dirt_Road"},"(7.0,0.0,10.0)":{type:"Arid"},"(7.0,0.0,11.0)":{type:"Arid"},"(7.0,0.0,12.0)":{type:"Arid"},"(7.0,0.0,13.0)":{type:"Arid"},"(7.0,0.0,14.0)":{type:"Arid"},"(7.0,0.0,15.0)":{type:"Scrub"},"(7.0,0.0,2.0)":{type:"Scrub"},"(7.0,0.0,3.0)":{type:"Arid"},"(7.0,0.0,4.0)":{type:"Dirt_Road"},"(7.0,0.0,5.0)":{type:"Pond"},"(7.0,0.0,6.0)":{type:"Grass"},"(7.0,0.0,7.0)":{type:"Arid"},"(7.0,0.0,8.0)":{type:"Scrub"},"(7.0,0.0,9.0)":{type:"Arid"},"(8.0,0.0,0.0)":{type:"Builder_House"},"(8.0,0.0,1.0)":{type:"Dirt_Road"},"(8.0,0.0,10.0)":{type:"Oil_Seep"},"(8.0,0.0,11.0)":{type:"Scrub"},"(8.0,0.0,12.0)":{type:"Arid"},"(8.0,0.0,13.0)":{type:"Cactus"},"(8.0,0.0,14.0)":{type:"Arid"},"(8.0,0.0,15.0)":{type:"Arid"},"(8.0,0.0,2.0)":{type:"Dirt_Road"},"(8.0,0.0,3.0)":{type:"Dirt_Road"},"(8.0,0.0,4.0)":{type:"Dirt_Road"},"(8.0,0.0,5.0)":{type:"Well",data:{craft:"Water",state:"Complete"}},"(8.0,0.0,6.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(8.0,0.0,7.0)":{type:"Arid"},"(8.0,0.0,8.0)":{type:"Arid"},"(8.0,0.0,9.0)":{type:"Arid"},"(9.0,0.0,0.0)":{type:"Scrub"},"(9.0,0.0,1.0)":{type:"Wood_Shed",data:{storageList:{Wood:9}}},"(9.0,0.0,10.0)":{type:"Scrub"},"(9.0,0.0,11.0)":{type:"Arid"},"(9.0,0.0,12.0)":{type:"Cactus"},"(9.0,0.0,13.0)":{type:"Cactus"},"(9.0,0.0,14.0)":{type:"Arid"},"(9.0,0.0,15.0)":{type:"Arid"},"(9.0,0.0,2.0)":{type:"Silo",data:{storageList:{Wheat:10}}},"(9.0,0.0,3.0)":{type:"Arid"},"(9.0,0.0,4.0)":{type:"Dirt_Road"},"(9.0,0.0,5.0)":{type:"Storehouse",data:{}},"(9.0,0.0,6.0)":{type:"Arid"},"(9.0,0.0,7.0)":{type:"Arid"},"(9.0,0.0,8.0)":{type:"Arid"},"(9.0,0.0,9.0)":{type:"Arid"}},south:{"(0.0,0.0,0.0)":{type:"Arid"},"(0.0,0.0,1.0)":{type:"Scrub"},"(0.0,0.0,10.0)":{type:"Scrub"},"(0.0,0.0,11.0)":{type:"Arid"},"(0.0,0.0,12.0)":{type:"Arid"},"(0.0,0.0,13.0)":{type:"Arid"},"(0.0,0.0,14.0)":{type:"Scrub"},"(0.0,0.0,15.0)":{type:"Scrub"},"(0.0,0.0,2.0)":{type:"Arid"},"(0.0,0.0,3.0)":{type:"Arid"},"(0.0,0.0,4.0)":{type:"Arid"},"(0.0,0.0,5.0)":{type:"Arid"},"(0.0,0.0,6.0)":{type:"Arid"},"(0.0,0.0,7.0)":{type:"Scrub"},"(0.0,0.0,8.0)":{type:"Scrub"},"(0.0,0.0,9.0)":{type:"Arid"},"(1.0,0.0,0.0)":{type:"Scrub"},"(1.0,0.0,1.0)":{type:"Arid"},"(1.0,0.0,10.0)":{type:"Arid"},"(1.0,0.0,11.0)":{type:"Scrub"},"(1.0,0.0,12.0)":{type:"Arid"},"(1.0,0.0,13.0)":{type:"Scrub"},"(1.0,0.0,14.0)":{type:"Arid"},"(1.0,0.0,15.0)":{type:"Arid"},"(1.0,0.0,2.0)":{type:"Scrub"},"(1.0,0.0,3.0)":{type:"Scrub"},"(1.0,0.0,4.0)":{type:"Scrub"},"(1.0,0.0,5.0)":{type:"Scrub"},"(1.0,0.0,6.0)":{type:"Arid"},"(1.0,0.0,7.0)":{type:"Arid"},"(1.0,0.0,8.0)":{type:"Arid"},"(1.0,0.0,9.0)":{type:"Scrub"},"(10.0,0.0,0.0)":{type:"Arid"},"(10.0,0.0,1.0)":{type:"Scrub"},"(10.0,0.0,10.0)":{type:"Dirt_Road"},"(10.0,0.0,11.0)":{type:"Storehouse",data:{}},"(10.0,0.0,12.0)":{type:"Arid"},"(10.0,0.0,13.0)":{type:"Wood_Shed",data:{storageList:{Wood:9}}},"(10.0,0.0,14.0)":{type:"Dirt_Road"},"(10.0,0.0,15.0)":{type:"Arid"},"(10.0,0.0,2.0)":{type:"Arid"},"(10.0,0.0,3.0)":{type:"Arid"},"(10.0,0.0,4.0)":{type:"Arid"},"(10.0,0.0,5.0)":{type:"Scrub"},"(10.0,0.0,6.0)":{type:"Arid"},"(10.0,0.0,7.0)":{type:"Arid"},"(10.0,0.0,8.0)":{type:"Arid"},"(10.0,0.0,9.0)":{type:"Arid"},"(11.0,0.0,0.0)":{type:"Scrub"},"(11.0,0.0,1.0)":{type:"Arid"},"(11.0,0.0,10.0)":{type:"Farm_House"},"(11.0,0.0,11.0)":{type:"Arid"},"(11.0,0.0,12.0)":{type:"Arid"},"(11.0,0.0,13.0)":{type:"Arid"},"(11.0,0.0,14.0)":{type:"Arid"},"(11.0,0.0,15.0)":{type:"Scrub"},"(11.0,0.0,2.0)":{type:"Arid"},"(11.0,0.0,3.0)":{type:"Scrub"},"(11.0,0.0,4.0)":{type:"Arid"},"(11.0,0.0,5.0)":{type:"Arid"},"(11.0,0.0,6.0)":{type:"Arid"},"(11.0,0.0,7.0)":{type:"Arid"},"(11.0,0.0,8.0)":{type:"Scrub"},"(11.0,0.0,9.0)":{type:"Arid"},"(12.0,0.0,0.0)":{type:"Scrub"},"(12.0,0.0,1.0)":{type:"Scrub"},"(12.0,0.0,10.0)":{type:"Arid"},"(12.0,0.0,11.0)":{type:"Arid"},"(12.0,0.0,12.0)":{type:"Arid"},"(12.0,0.0,13.0)":{type:"Arid"},"(12.0,0.0,14.0)":{type:"Scrub"},"(12.0,0.0,15.0)":{type:"Arid"},"(12.0,0.0,2.0)":{type:"Scrub"},"(12.0,0.0,3.0)":{type:"Arid"},"(12.0,0.0,4.0)":{type:"Scrub"},"(12.0,0.0,5.0)":{type:"Oil_Seep"},"(12.0,0.0,6.0)":{type:"Arid"},"(12.0,0.0,7.0)":{type:"Scrub"},"(12.0,0.0,8.0)":{type:"Arid"},"(12.0,0.0,9.0)":{type:"Arid"},"(13.0,0.0,0.0)":{type:"Scrub"},"(13.0,0.0,1.0)":{type:"Scrub"},"(13.0,0.0,10.0)":{type:"Scrub"},"(13.0,0.0,11.0)":{type:"Arid"},"(13.0,0.0,12.0)":{type:"Arid"},"(13.0,0.0,13.0)":{type:"Arid"},"(13.0,0.0,14.0)":{type:"Scrub"},"(13.0,0.0,15.0)":{type:"Arid"},"(13.0,0.0,2.0)":{type:"Arid"},"(13.0,0.0,3.0)":{type:"Arid"},"(13.0,0.0,4.0)":{type:"Scrub"},"(13.0,0.0,5.0)":{type:"Cactus"},"(13.0,0.0,6.0)":{type:"Cactus"},"(13.0,0.0,7.0)":{type:"Arid"},"(13.0,0.0,8.0)":{type:"Arid"},"(13.0,0.0,9.0)":{type:"Arid"},"(14.0,0.0,0.0)":{type:"Scrub"},"(14.0,0.0,1.0)":{type:"Scrub"},"(14.0,0.0,10.0)":{type:"Arid"},"(14.0,0.0,11.0)":{type:"Arid"},"(14.0,0.0,12.0)":{type:"Arid"},"(14.0,0.0,13.0)":{type:"Scrub"},"(14.0,0.0,14.0)":{type:"Arid"},"(14.0,0.0,15.0)":{type:"Scrub"},"(14.0,0.0,2.0)":{type:"Scrub"},"(14.0,0.0,3.0)":{type:"Arid"},"(14.0,0.0,4.0)":{type:"Arid"},"(14.0,0.0,5.0)":{type:"Cactus"},"(14.0,0.0,6.0)":{type:"Scrub"},"(14.0,0.0,7.0)":{type:"Arid"},"(14.0,0.0,8.0)":{type:"Arid"},"(14.0,0.0,9.0)":{type:"Scrub"},"(15.0,0.0,0.0)":{type:"Arid"},"(15.0,0.0,1.0)":{type:"Arid"},"(15.0,0.0,10.0)":{type:"Scrub"},"(15.0,0.0,11.0)":{type:"Arid"},"(15.0,0.0,12.0)":{type:"Scrub"},"(15.0,0.0,13.0)":{type:"Arid"},"(15.0,0.0,14.0)":{type:"Scrub"},"(15.0,0.0,15.0)":{type:"Arid"},"(15.0,0.0,2.0)":{type:"Scrub"},"(15.0,0.0,3.0)":{type:"Arid"},"(15.0,0.0,4.0)":{type:"Scrub"},"(15.0,0.0,5.0)":{type:"Arid"},"(15.0,0.0,6.0)":{type:"Arid"},"(15.0,0.0,7.0)":{type:"Arid"},"(15.0,0.0,8.0)":{type:"Arid"},"(15.0,0.0,9.0)":{type:"Arid"},"(2.0,0.0,0.0)":{type:"Arid"},"(2.0,0.0,1.0)":{type:"Scrub"},"(2.0,0.0,10.0)":{type:"Arid"},"(2.0,0.0,11.0)":{type:"Arid"},"(2.0,0.0,12.0)":{type:"Scrub"},"(2.0,0.0,13.0)":{type:"Scrub"},"(2.0,0.0,14.0)":{type:"Scrub"},"(2.0,0.0,15.0)":{type:"Scrub"},"(2.0,0.0,2.0)":{type:"Arid"},"(2.0,0.0,3.0)":{type:"Arid"},"(2.0,0.0,4.0)":{type:"Arid"},"(2.0,0.0,5.0)":{type:"Arid"},"(2.0,0.0,6.0)":{type:"Scrub"},"(2.0,0.0,7.0)":{type:"Cactus"},"(2.0,0.0,8.0)":{type:"Cactus"},"(2.0,0.0,9.0)":{type:"Arid"},"(3.0,0.0,0.0)":{type:"Scrub"},"(3.0,0.0,1.0)":{type:"Arid"},"(3.0,0.0,10.0)":{type:"Arid"},"(3.0,0.0,11.0)":{type:"Arid"},"(3.0,0.0,12.0)":{type:"Arid"},"(3.0,0.0,13.0)":{type:"Scrub"},"(3.0,0.0,14.0)":{type:"Scrub"},"(3.0,0.0,15.0)":{type:"Arid"},"(3.0,0.0,2.0)":{type:"Arid"},"(3.0,0.0,3.0)":{type:"Arid"},"(3.0,0.0,4.0)":{type:"Arid"},"(3.0,0.0,5.0)":{type:"Arid"},"(3.0,0.0,6.0)":{type:"Arid"},"(3.0,0.0,7.0)":{type:"Rock"},"(3.0,0.0,8.0)":{type:"Cactus"},"(3.0,0.0,9.0)":{type:"Cactus"},"(4.0,0.0,0.0)":{type:"Arid"},"(4.0,0.0,1.0)":{type:"Scrub"},"(4.0,0.0,10.0)":{type:"Scrub"},"(4.0,0.0,11.0)":{type:"Arid"},"(4.0,0.0,12.0)":{type:"Scrub"},"(4.0,0.0,13.0)":{type:"Arid"},"(4.0,0.0,14.0)":{type:"Scrub"},"(4.0,0.0,15.0)":{type:"Arid"},"(4.0,0.0,2.0)":{type:"Scrub"},"(4.0,0.0,3.0)":{type:"Arid"},"(4.0,0.0,4.0)":{type:"Arid"},"(4.0,0.0,5.0)":{type:"Cactus"},"(4.0,0.0,6.0)":{type:"Arid"},"(4.0,0.0,7.0)":{type:"Arid"},"(4.0,0.0,8.0)":{type:"Arid"},"(4.0,0.0,9.0)":{type:"Arid"},"(5.0,0.0,0.0)":{type:"Arid"},"(5.0,0.0,1.0)":{type:"Scrub"},"(5.0,0.0,10.0)":{type:"Arid"},"(5.0,0.0,11.0)":{type:"Rock"},"(5.0,0.0,12.0)":{type:"Arid"},"(5.0,0.0,13.0)":{type:"Scrub"},"(5.0,0.0,14.0)":{type:"Arid"},"(5.0,0.0,15.0)":{type:"Scrub"},"(5.0,0.0,2.0)":{type:"Scrub"},"(5.0,0.0,3.0)":{type:"Arid"},"(5.0,0.0,4.0)":{type:"Arid"},"(5.0,0.0,5.0)":{type:"Arid"},"(5.0,0.0,6.0)":{type:"Arid"},"(5.0,0.0,7.0)":{type:"Scrub"},"(5.0,0.0,8.0)":{type:"Arid"},"(5.0,0.0,9.0)":{type:"Arid"},"(6.0,0.0,0.0)":{type:"Scrub"},"(6.0,0.0,1.0)":{type:"Scrub"},"(6.0,0.0,10.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(6.0,0.0,11.0)":{type:"Grass"},"(6.0,0.0,12.0)":{type:"Scrub"},"(6.0,0.0,13.0)":{type:"Arid"},"(6.0,0.0,14.0)":{type:"Dirt_Road"},"(6.0,0.0,15.0)":{type:"Scrub"},"(6.0,0.0,2.0)":{type:"Rock"},"(6.0,0.0,3.0)":{type:"Arid"},"(6.0,0.0,4.0)":{type:"Arid"},"(6.0,0.0,5.0)":{type:"Arid"},"(6.0,0.0,6.0)":{type:"Arid"},"(6.0,0.0,7.0)":{type:"Rock"},"(6.0,0.0,8.0)":{type:"Scrub"},"(6.0,0.0,9.0)":{type:"Arid"},"(7.0,0.0,0.0)":{type:"Arid"},"(7.0,0.0,1.0)":{type:"Arid"},"(7.0,0.0,10.0)":{type:"Wheat_Field",data:{craft:"Wheat",state:"Complete"}},"(7.0,0.0,11.0)":{type:"Pond"},"(7.0,0.0,12.0)":{type:"Grass"},"(7.0,0.0,13.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(7.0,0.0,14.0)":{type:"Dirt_Road"},"(7.0,0.0,15.0)":{type:"Builder_House"},"(7.0,0.0,2.0)":{type:"Scrub"},"(7.0,0.0,3.0)":{type:"Arid"},"(7.0,0.0,4.0)":{type:"Arid"},"(7.0,0.0,5.0)":{type:"Arid"},"(7.0,0.0,6.0)":{type:"Arid"},"(7.0,0.0,7.0)":{type:"Arid"},"(7.0,0.0,8.0)":{type:"Arid"},"(7.0,0.0,9.0)":{type:"Wheat_Field",data:{craft:"Wheat",state:"Complete"}},"(8.0,0.0,0.0)":{type:"Arid"},"(8.0,0.0,1.0)":{type:"Arid"},"(8.0,0.0,10.0)":{type:"Dirt_Road"},"(8.0,0.0,11.0)":{type:"Dirt_Road"},"(8.0,0.0,12.0)":{type:"Dirt_Road"},"(8.0,0.0,13.0)":{type:"Dirt_Road"},"(8.0,0.0,14.0)":{type:"Dirt_Road"},"(8.0,0.0,15.0)":{type:"Trade_Depot"},"(8.0,0.0,2.0)":{type:"Arid"},"(8.0,0.0,3.0)":{type:"Arid"},"(8.0,0.0,4.0)":{type:"Scrub"},"(8.0,0.0,5.0)":{type:"Arid"},"(8.0,0.0,6.0)":{type:"Arid"},"(8.0,0.0,7.0)":{type:"Arid"},"(8.0,0.0,8.0)":{type:"Arid"},"(8.0,0.0,9.0)":{type:"Arid"},"(9.0,0.0,0.0)":{type:"Scrub"},"(9.0,0.0,1.0)":{type:"Arid"},"(9.0,0.0,10.0)":{type:"Dirt_Road"},"(9.0,0.0,11.0)":{type:"Well",data:{craft:"Water",state:"Complete"}},"(9.0,0.0,12.0)":{type:"Arid"},"(9.0,0.0,13.0)":{type:"Silo",data:{storageList:{Wheat:10}}},"(9.0,0.0,14.0)":{type:"Dirt_Road"},"(9.0,0.0,15.0)":{type:"Fuel_Storage",data:{storageList:{Gasoline:40}}},"(9.0,0.0,2.0)":{type:"Arid"},"(9.0,0.0,3.0)":{type:"Cactus"},"(9.0,0.0,4.0)":{type:"Scrub"},"(9.0,0.0,5.0)":{type:"Arid"},"(9.0,0.0,6.0)":{type:"Arid"},"(9.0,0.0,7.0)":{type:"Arid"},"(9.0,0.0,8.0)":{type:"Arid"},"(9.0,0.0,9.0)":{type:"Arid"}},east:{"(0.0,0.0,0.0)":{type:"Arid"},"(0.0,0.0,1.0)":{type:"Scrub"},"(0.0,0.0,10.0)":{type:"Scrub"},"(0.0,0.0,11.0)":{type:"Arid"},"(0.0,0.0,12.0)":{type:"Arid"},"(0.0,0.0,13.0)":{type:"Arid"},"(0.0,0.0,14.0)":{type:"Scrub"},"(0.0,0.0,15.0)":{type:"Scrub"},"(0.0,0.0,2.0)":{type:"Arid"},"(0.0,0.0,3.0)":{type:"Arid"},"(0.0,0.0,4.0)":{type:"Arid"},"(0.0,0.0,5.0)":{type:"Arid"},"(0.0,0.0,6.0)":{type:"Arid"},"(0.0,0.0,7.0)":{type:"Scrub"},"(0.0,0.0,8.0)":{type:"Scrub"},"(0.0,0.0,9.0)":{type:"Arid"},"(1.0,0.0,0.0)":{type:"Scrub"},"(1.0,0.0,1.0)":{type:"Arid"},"(1.0,0.0,10.0)":{type:"Arid"},"(1.0,0.0,11.0)":{type:"Scrub"},"(1.0,0.0,12.0)":{type:"Arid"},"(1.0,0.0,13.0)":{type:"Scrub"},"(1.0,0.0,14.0)":{type:"Arid"},"(1.0,0.0,15.0)":{type:"Arid"},"(1.0,0.0,2.0)":{type:"Scrub"},"(1.0,0.0,3.0)":{type:"Scrub"},"(1.0,0.0,4.0)":{type:"Scrub"},"(1.0,0.0,5.0)":{type:"Scrub"},"(1.0,0.0,6.0)":{type:"Arid"},"(1.0,0.0,7.0)":{type:"Arid"},"(1.0,0.0,8.0)":{type:"Arid"},"(1.0,0.0,9.0)":{type:"Scrub"},"(10.0,0.0,0.0)":{type:"Arid"},"(10.0,0.0,1.0)":{type:"Scrub"},"(10.0,0.0,10.0)":{type:"Wheat_Field",data:{craft:"Wheat",state:"Complete"}},"(10.0,0.0,11.0)":{type:"Rock"},"(10.0,0.0,12.0)":{type:"Arid"},"(10.0,0.0,13.0)":{type:"Arid"},"(10.0,0.0,14.0)":{type:"Arid"},"(10.0,0.0,15.0)":{type:"Scrub"},"(10.0,0.0,2.0)":{type:"Arid"},"(10.0,0.0,3.0)":{type:"Arid"},"(10.0,0.0,4.0)":{type:"Arid"},"(10.0,0.0,5.0)":{type:"Scrub"},"(10.0,0.0,6.0)":{type:"Arid"},"(10.0,0.0,7.0)":{type:"Storehouse",data:{}},"(10.0,0.0,8.0)":{type:"Well",data:{craft:"Water",state:"Complete"}},"(10.0,0.0,9.0)":{type:"Arid"},"(11.0,0.0,0.0)":{type:"Scrub"},"(11.0,0.0,1.0)":{type:"Arid"},"(11.0,0.0,10.0)":{type:"Wheat_Field",data:{craft:"Wheat",state:"Complete"}},"(11.0,0.0,11.0)":{type:"Arid"},"(11.0,0.0,12.0)":{type:"Arid"},"(11.0,0.0,13.0)":{type:"Arid"},"(11.0,0.0,14.0)":{type:"Arid"},"(11.0,0.0,15.0)":{type:"Scrub"},"(11.0,0.0,2.0)":{type:"Arid"},"(11.0,0.0,3.0)":{type:"Scrub"},"(11.0,0.0,4.0)":{type:"Arid"},"(11.0,0.0,5.0)":{type:"Arid"},"(11.0,0.0,6.0)":{type:"Farm_House"},"(11.0,0.0,7.0)":{type:"Dirt_Road"},"(11.0,0.0,8.0)":{type:"Dirt_Road"},"(11.0,0.0,9.0)":{type:"Dirt_Road"},"(12.0,0.0,0.0)":{type:"Scrub"},"(12.0,0.0,1.0)":{type:"Scrub"},"(12.0,0.0,10.0)":{type:"Grass"},"(12.0,0.0,11.0)":{type:"Arid"},"(12.0,0.0,12.0)":{type:"Arid"},"(12.0,0.0,13.0)":{type:"Arid"},"(12.0,0.0,14.0)":{type:"Scrub"},"(12.0,0.0,15.0)":{type:"Arid"},"(12.0,0.0,2.0)":{type:"Scrub"},"(12.0,0.0,3.0)":{type:"Arid"},"(12.0,0.0,4.0)":{type:"Scrub"},"(12.0,0.0,5.0)":{type:"Arid"},"(12.0,0.0,6.0)":{type:"Silo",data:{storageList:{Wheat:10}}},"(12.0,0.0,7.0)":{type:"Dirt_Road"},"(12.0,0.0,8.0)":{type:"Grass"},"(12.0,0.0,9.0)":{type:"Pond"},"(13.0,0.0,0.0)":{type:"Scrub"},"(13.0,0.0,1.0)":{type:"Scrub"},"(13.0,0.0,10.0)":{type:"Scrub"},"(13.0,0.0,11.0)":{type:"Arid"},"(13.0,0.0,12.0)":{type:"Arid"},"(13.0,0.0,13.0)":{type:"Arid"},"(13.0,0.0,14.0)":{type:"Scrub"},"(13.0,0.0,15.0)":{type:"Arid"},"(13.0,0.0,2.0)":{type:"Arid"},"(13.0,0.0,3.0)":{type:"Arid"},"(13.0,0.0,4.0)":{type:"Cactus"},"(13.0,0.0,5.0)":{type:"Arid"},"(13.0,0.0,6.0)":{type:"Wood_Shed",data:{storageList:{Wood:9}}},"(13.0,0.0,7.0)":{type:"Dirt_Road"},"(13.0,0.0,8.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(13.0,0.0,9.0)":{type:"Grass"},"(14.0,0.0,0.0)":{type:"Scrub"},"(14.0,0.0,1.0)":{type:"Scrub"},"(14.0,0.0,10.0)":{type:"Arid"},"(14.0,0.0,11.0)":{type:"Arid"},"(14.0,0.0,12.0)":{type:"Arid"},"(14.0,0.0,13.0)":{type:"Scrub"},"(14.0,0.0,14.0)":{type:"Arid"},"(14.0,0.0,15.0)":{type:"Scrub"},"(14.0,0.0,2.0)":{type:"Scrub"},"(14.0,0.0,3.0)":{type:"Arid"},"(14.0,0.0,4.0)":{type:"Arid"},"(14.0,0.0,5.0)":{type:"Dirt_Road"},"(14.0,0.0,6.0)":{type:"Dirt_Road"},"(14.0,0.0,7.0)":{type:"Dirt_Road"},"(14.0,0.0,8.0)":{type:"Dirt_Road"},"(14.0,0.0,9.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(15.0,0.0,0.0)":{type:"Arid"},"(15.0,0.0,1.0)":{type:"Arid"},"(15.0,0.0,10.0)":{type:"Scrub"},"(15.0,0.0,11.0)":{type:"Arid"},"(15.0,0.0,12.0)":{type:"Scrub"},"(15.0,0.0,13.0)":{type:"Arid"},"(15.0,0.0,14.0)":{type:"Scrub"},"(15.0,0.0,15.0)":{type:"Arid"},"(15.0,0.0,2.0)":{type:"Scrub"},"(15.0,0.0,3.0)":{type:"Arid"},"(15.0,0.0,4.0)":{type:"Scrub"},"(15.0,0.0,5.0)":{type:"Scrub"},"(15.0,0.0,6.0)":{type:"Builder_House"},"(15.0,0.0,7.0)":{type:"Trade_Depot"},"(15.0,0.0,8.0)":{type:"Fuel_Storage",data:{storageList:{Gasoline:40}}},"(15.0,0.0,9.0)":{type:"Arid"},"(2.0,0.0,0.0)":{type:"Arid"},"(2.0,0.0,1.0)":{type:"Scrub"},"(2.0,0.0,10.0)":{type:"Arid"},"(2.0,0.0,11.0)":{type:"Arid"},"(2.0,0.0,12.0)":{type:"Scrub"},"(2.0,0.0,13.0)":{type:"Scrub"},"(2.0,0.0,14.0)":{type:"Scrub"},"(2.0,0.0,15.0)":{type:"Scrub"},"(2.0,0.0,2.0)":{type:"Arid"},"(2.0,0.0,3.0)":{type:"Arid"},"(2.0,0.0,4.0)":{type:"Arid"},"(2.0,0.0,5.0)":{type:"Arid"},"(2.0,0.0,6.0)":{type:"Scrub"},"(2.0,0.0,7.0)":{type:"Cactus"},"(2.0,0.0,8.0)":{type:"Cactus"},"(2.0,0.0,9.0)":{type:"Arid"},"(3.0,0.0,0.0)":{type:"Scrub"},"(3.0,0.0,1.0)":{type:"Arid"},"(3.0,0.0,10.0)":{type:"Arid"},"(3.0,0.0,11.0)":{type:"Arid"},"(3.0,0.0,12.0)":{type:"Arid"},"(3.0,0.0,13.0)":{type:"Scrub"},"(3.0,0.0,14.0)":{type:"Scrub"},"(3.0,0.0,15.0)":{type:"Arid"},"(3.0,0.0,2.0)":{type:"Arid"},"(3.0,0.0,3.0)":{type:"Arid"},"(3.0,0.0,4.0)":{type:"Arid"},"(3.0,0.0,5.0)":{type:"Arid"},"(3.0,0.0,6.0)":{type:"Arid"},"(3.0,0.0,7.0)":{type:"Oil_Seep"},"(3.0,0.0,8.0)":{type:"Cactus"},"(3.0,0.0,9.0)":{type:"Cactus"},"(4.0,0.0,0.0)":{type:"Arid"},"(4.0,0.0,1.0)":{type:"Scrub"},"(4.0,0.0,10.0)":{type:"Scrub"},"(4.0,0.0,11.0)":{type:"Arid"},"(4.0,0.0,12.0)":{type:"Scrub"},"(4.0,0.0,13.0)":{type:"Arid"},"(4.0,0.0,14.0)":{type:"Scrub"},"(4.0,0.0,15.0)":{type:"Arid"},"(4.0,0.0,2.0)":{type:"Scrub"},"(4.0,0.0,3.0)":{type:"Arid"},"(4.0,0.0,4.0)":{type:"Arid"},"(4.0,0.0,5.0)":{type:"Cactus"},"(4.0,0.0,6.0)":{type:"Arid"},"(4.0,0.0,7.0)":{type:"Arid"},"(4.0,0.0,8.0)":{type:"Arid"},"(4.0,0.0,9.0)":{type:"Arid"},"(5.0,0.0,0.0)":{type:"Arid"},"(5.0,0.0,1.0)":{type:"Scrub"},"(5.0,0.0,10.0)":{type:"Rock"},"(5.0,0.0,11.0)":{type:"Arid"},"(5.0,0.0,12.0)":{type:"Arid"},"(5.0,0.0,13.0)":{type:"Scrub"},"(5.0,0.0,14.0)":{type:"Arid"},"(5.0,0.0,15.0)":{type:"Scrub"},"(5.0,0.0,2.0)":{type:"Scrub"},"(5.0,0.0,3.0)":{type:"Arid"},"(5.0,0.0,4.0)":{type:"Arid"},"(5.0,0.0,5.0)":{type:"Arid"},"(5.0,0.0,6.0)":{type:"Arid"},"(5.0,0.0,7.0)":{type:"Scrub"},"(5.0,0.0,8.0)":{type:"Arid"},"(5.0,0.0,9.0)":{type:"Arid"},"(6.0,0.0,0.0)":{type:"Scrub"},"(6.0,0.0,1.0)":{type:"Scrub"},"(6.0,0.0,10.0)":{type:"Arid"},"(6.0,0.0,11.0)":{type:"Arid"},"(6.0,0.0,12.0)":{type:"Scrub"},"(6.0,0.0,13.0)":{type:"Arid"},"(6.0,0.0,14.0)":{type:"Scrub"},"(6.0,0.0,15.0)":{type:"Scrub"},"(6.0,0.0,2.0)":{type:"Arid"},"(6.0,0.0,3.0)":{type:"Arid"},"(6.0,0.0,4.0)":{type:"Arid"},"(6.0,0.0,5.0)":{type:"Arid"},"(6.0,0.0,6.0)":{type:"Arid"},"(6.0,0.0,7.0)":{type:"Arid"},"(6.0,0.0,8.0)":{type:"Arid"},"(6.0,0.0,9.0)":{type:"Arid"},"(7.0,0.0,0.0)":{type:"Arid"},"(7.0,0.0,1.0)":{type:"Arid"},"(7.0,0.0,10.0)":{type:"Arid"},"(7.0,0.0,11.0)":{type:"Scrub"},"(7.0,0.0,12.0)":{type:"Arid"},"(7.0,0.0,13.0)":{type:"Cactus"},"(7.0,0.0,14.0)":{type:"Arid"},"(7.0,0.0,15.0)":{type:"Scrub"},"(7.0,0.0,2.0)":{type:"Scrub"},"(7.0,0.0,3.0)":{type:"Arid"},"(7.0,0.0,4.0)":{type:"Arid"},"(7.0,0.0,5.0)":{type:"Arid"},"(7.0,0.0,6.0)":{type:"Arid"},"(7.0,0.0,7.0)":{type:"Arid"},"(7.0,0.0,8.0)":{type:"Scrub"},"(7.0,0.0,9.0)":{type:"Arid"},"(8.0,0.0,0.0)":{type:"Arid"},"(8.0,0.0,1.0)":{type:"Arid"},"(8.0,0.0,10.0)":{type:"Arid"},"(8.0,0.0,11.0)":{type:"Arid"},"(8.0,0.0,12.0)":{type:"Arid"},"(8.0,0.0,13.0)":{type:"Scrub"},"(8.0,0.0,14.0)":{type:"Cactus"},"(8.0,0.0,15.0)":{type:"Arid"},"(8.0,0.0,2.0)":{type:"Rock"},"(8.0,0.0,3.0)":{type:"Arid"},"(8.0,0.0,4.0)":{type:"Scrub"},"(8.0,0.0,5.0)":{type:"Arid"},"(8.0,0.0,6.0)":{type:"Arid"},"(8.0,0.0,7.0)":{type:"Arid"},"(8.0,0.0,8.0)":{type:"Arid"},"(8.0,0.0,9.0)":{type:"Scrub"},"(9.0,0.0,0.0)":{type:"Scrub"},"(9.0,0.0,1.0)":{type:"Arid"},"(9.0,0.0,10.0)":{type:"Arid"},"(9.0,0.0,11.0)":{type:"Scrub"},"(9.0,0.0,12.0)":{type:"Arid"},"(9.0,0.0,13.0)":{type:"Arid"},"(9.0,0.0,14.0)":{type:"Arid"},"(9.0,0.0,15.0)":{type:"Arid"},"(9.0,0.0,2.0)":{type:"Arid"},"(9.0,0.0,3.0)":{type:"Cactus"},"(9.0,0.0,4.0)":{type:"Scrub"},"(9.0,0.0,5.0)":{type:"Rock"},"(9.0,0.0,6.0)":{type:"Arid"},"(9.0,0.0,7.0)":{type:"Arid"},"(9.0,0.0,8.0)":{type:"Arid"},"(9.0,0.0,9.0)":{type:"Arid"}},west:{"(0.0,0.0,0.0)":{type:"Arid"},"(0.0,0.0,1.0)":{type:"Scrub"},"(0.0,0.0,10.0)":{type:"Scrub"},"(0.0,0.0,11.0)":{type:"Arid"},"(0.0,0.0,12.0)":{type:"Arid"},"(0.0,0.0,13.0)":{type:"Arid"},"(0.0,0.0,14.0)":{type:"Scrub"},"(0.0,0.0,15.0)":{type:"Scrub"},"(0.0,0.0,2.0)":{type:"Arid"},"(0.0,0.0,3.0)":{type:"Arid"},"(0.0,0.0,4.0)":{type:"Arid"},"(0.0,0.0,5.0)":{type:"Fuel_Storage",data:{storageList:{Gasoline:40}}},"(0.0,0.0,6.0)":{type:"Trade_Depot"},"(0.0,0.0,7.0)":{type:"Builder_House"},"(0.0,0.0,8.0)":{type:"Scrub"},"(0.0,0.0,9.0)":{type:"Arid"},"(1.0,0.0,0.0)":{type:"Scrub"},"(1.0,0.0,1.0)":{type:"Arid"},"(1.0,0.0,10.0)":{type:"Arid"},"(1.0,0.0,11.0)":{type:"Scrub"},"(1.0,0.0,12.0)":{type:"Arid"},"(1.0,0.0,13.0)":{type:"Scrub"},"(1.0,0.0,14.0)":{type:"Arid"},"(1.0,0.0,15.0)":{type:"Arid"},"(1.0,0.0,2.0)":{type:"Scrub"},"(1.0,0.0,3.0)":{type:"Scrub"},"(1.0,0.0,4.0)":{type:"Dirt_Road"},"(1.0,0.0,5.0)":{type:"Dirt_Road"},"(1.0,0.0,6.0)":{type:"Dirt_Road"},"(1.0,0.0,7.0)":{type:"Dirt_Road"},"(1.0,0.0,8.0)":{type:"Dirt_Road"},"(1.0,0.0,9.0)":{type:"Scrub"},"(10.0,0.0,0.0)":{type:"Arid"},"(10.0,0.0,1.0)":{type:"Scrub"},"(10.0,0.0,10.0)":{type:"Arid"},"(10.0,0.0,11.0)":{type:"Scrub"},"(10.0,0.0,12.0)":{type:"Arid"},"(10.0,0.0,13.0)":{type:"Arid"},"(10.0,0.0,14.0)":{type:"Arid"},"(10.0,0.0,15.0)":{type:"Scrub"},"(10.0,0.0,2.0)":{type:"Arid"},"(10.0,0.0,3.0)":{type:"Arid"},"(10.0,0.0,4.0)":{type:"Arid"},"(10.0,0.0,5.0)":{type:"Scrub"},"(10.0,0.0,6.0)":{type:"Arid"},"(10.0,0.0,7.0)":{type:"Arid"},"(10.0,0.0,8.0)":{type:"Arid"},"(10.0,0.0,9.0)":{type:"Arid"},"(11.0,0.0,0.0)":{type:"Scrub"},"(11.0,0.0,1.0)":{type:"Arid"},"(11.0,0.0,10.0)":{type:"Arid"},"(11.0,0.0,11.0)":{type:"Arid"},"(11.0,0.0,12.0)":{type:"Arid"},"(11.0,0.0,13.0)":{type:"Arid"},"(11.0,0.0,14.0)":{type:"Arid"},"(11.0,0.0,15.0)":{type:"Scrub"},"(11.0,0.0,2.0)":{type:"Arid"},"(11.0,0.0,3.0)":{type:"Scrub"},"(11.0,0.0,4.0)":{type:"Arid"},"(11.0,0.0,5.0)":{type:"Arid"},"(11.0,0.0,6.0)":{type:"Arid"},"(11.0,0.0,7.0)":{type:"Arid"},"(11.0,0.0,8.0)":{type:"Scrub"},"(11.0,0.0,9.0)":{type:"Arid"},"(12.0,0.0,0.0)":{type:"Scrub"},"(12.0,0.0,1.0)":{type:"Scrub"},"(12.0,0.0,10.0)":{type:"Cactus"},"(12.0,0.0,11.0)":{type:"Cactus"},"(12.0,0.0,12.0)":{type:"Arid"},"(12.0,0.0,13.0)":{type:"Arid"},"(12.0,0.0,14.0)":{type:"Scrub"},"(12.0,0.0,15.0)":{type:"Arid"},"(12.0,0.0,2.0)":{type:"Scrub"},"(12.0,0.0,3.0)":{type:"Arid"},"(12.0,0.0,4.0)":{type:"Scrub"},"(12.0,0.0,5.0)":{type:"Oil_Seep"},"(12.0,0.0,6.0)":{type:"Arid"},"(12.0,0.0,7.0)":{type:"Scrub"},"(12.0,0.0,8.0)":{type:"Arid"},"(12.0,0.0,9.0)":{type:"Arid"},"(13.0,0.0,0.0)":{type:"Scrub"},"(13.0,0.0,1.0)":{type:"Scrub"},"(13.0,0.0,10.0)":{type:"Scrub"},"(13.0,0.0,11.0)":{type:"Cactus"},"(13.0,0.0,12.0)":{type:"Arid"},"(13.0,0.0,13.0)":{type:"Rock"},"(13.0,0.0,14.0)":{type:"Scrub"},"(13.0,0.0,15.0)":{type:"Arid"},"(13.0,0.0,2.0)":{type:"Arid"},"(13.0,0.0,3.0)":{type:"Arid"},"(13.0,0.0,4.0)":{type:"Scrub"},"(13.0,0.0,5.0)":{type:"Cactus"},"(13.0,0.0,6.0)":{type:"Cactus"},"(13.0,0.0,7.0)":{type:"Arid"},"(13.0,0.0,8.0)":{type:"Arid"},"(13.0,0.0,9.0)":{type:"Arid"},"(14.0,0.0,0.0)":{type:"Scrub"},"(14.0,0.0,1.0)":{type:"Scrub"},"(14.0,0.0,10.0)":{type:"Arid"},"(14.0,0.0,11.0)":{type:"Arid"},"(14.0,0.0,12.0)":{type:"Arid"},"(14.0,0.0,13.0)":{type:"Scrub"},"(14.0,0.0,14.0)":{type:"Arid"},"(14.0,0.0,15.0)":{type:"Scrub"},"(14.0,0.0,2.0)":{type:"Scrub"},"(14.0,0.0,3.0)":{type:"Arid"},"(14.0,0.0,4.0)":{type:"Arid"},"(14.0,0.0,5.0)":{type:"Cactus"},"(14.0,0.0,6.0)":{type:"Scrub"},"(14.0,0.0,7.0)":{type:"Arid"},"(14.0,0.0,8.0)":{type:"Arid"},"(14.0,0.0,9.0)":{type:"Scrub"},"(15.0,0.0,0.0)":{type:"Arid"},"(15.0,0.0,1.0)":{type:"Arid"},"(15.0,0.0,10.0)":{type:"Scrub"},"(15.0,0.0,11.0)":{type:"Arid"},"(15.0,0.0,12.0)":{type:"Scrub"},"(15.0,0.0,13.0)":{type:"Arid"},"(15.0,0.0,14.0)":{type:"Scrub"},"(15.0,0.0,15.0)":{type:"Arid"},"(15.0,0.0,2.0)":{type:"Scrub"},"(15.0,0.0,3.0)":{type:"Arid"},"(15.0,0.0,4.0)":{type:"Scrub"},"(15.0,0.0,5.0)":{type:"Arid"},"(15.0,0.0,6.0)":{type:"Arid"},"(15.0,0.0,7.0)":{type:"Arid"},"(15.0,0.0,8.0)":{type:"Arid"},"(15.0,0.0,9.0)":{type:"Arid"},"(2.0,0.0,0.0)":{type:"Arid"},"(2.0,0.0,1.0)":{type:"Scrub"},"(2.0,0.0,10.0)":{type:"Arid"},"(2.0,0.0,11.0)":{type:"Arid"},"(2.0,0.0,12.0)":{type:"Scrub"},"(2.0,0.0,13.0)":{type:"Scrub"},"(2.0,0.0,14.0)":{type:"Scrub"},"(2.0,0.0,15.0)":{type:"Scrub"},"(2.0,0.0,2.0)":{type:"Arid"},"(2.0,0.0,3.0)":{type:"Arid"},"(2.0,0.0,4.0)":{type:"Wood_Shed",data:{storageList:{Wood:9}}},"(2.0,0.0,5.0)":{type:"Silo",data:{storageList:{Wheat:10}}},"(2.0,0.0,6.0)":{type:"Dirt_Road"},"(2.0,0.0,7.0)":{type:"Arid"},"(2.0,0.0,8.0)":{type:"Scrub"},"(2.0,0.0,9.0)":{type:"Arid"},"(3.0,0.0,0.0)":{type:"Scrub"},"(3.0,0.0,1.0)":{type:"Arid"},"(3.0,0.0,10.0)":{type:"Arid"},"(3.0,0.0,11.0)":{type:"Arid"},"(3.0,0.0,12.0)":{type:"Arid"},"(3.0,0.0,13.0)":{type:"Scrub"},"(3.0,0.0,14.0)":{type:"Scrub"},"(3.0,0.0,15.0)":{type:"Arid"},"(3.0,0.0,2.0)":{type:"Arid"},"(3.0,0.0,3.0)":{type:"Arid"},"(3.0,0.0,4.0)":{type:"Arid"},"(3.0,0.0,5.0)":{type:"Arid"},"(3.0,0.0,6.0)":{type:"Dirt_Road"},"(3.0,0.0,7.0)":{type:"Grass"},"(3.0,0.0,8.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(3.0,0.0,9.0)":{type:"Arid"},"(4.0,0.0,0.0)":{type:"Arid"},"(4.0,0.0,1.0)":{type:"Scrub"},"(4.0,0.0,10.0)":{type:"Scrub"},"(4.0,0.0,11.0)":{type:"Arid"},"(4.0,0.0,12.0)":{type:"Scrub"},"(4.0,0.0,13.0)":{type:"Arid"},"(4.0,0.0,14.0)":{type:"Scrub"},"(4.0,0.0,15.0)":{type:"Arid"},"(4.0,0.0,2.0)":{type:"Scrub"},"(4.0,0.0,3.0)":{type:"Arid"},"(4.0,0.0,4.0)":{type:"Arid"},"(4.0,0.0,5.0)":{type:"Arid"},"(4.0,0.0,6.0)":{type:"Dirt_Road"},"(4.0,0.0,7.0)":{type:"Pond"},"(4.0,0.0,8.0)":{type:"Grass"},"(4.0,0.0,9.0)":{type:"Arid"},"(5.0,0.0,0.0)":{type:"Arid"},"(5.0,0.0,1.0)":{type:"Scrub"},"(5.0,0.0,10.0)":{type:"Arid"},"(5.0,0.0,11.0)":{type:"Arid"},"(5.0,0.0,12.0)":{type:"Arid"},"(5.0,0.0,13.0)":{type:"Scrub"},"(5.0,0.0,14.0)":{type:"Arid"},"(5.0,0.0,15.0)":{type:"Scrub"},"(5.0,0.0,2.0)":{type:"Scrub"},"(5.0,0.0,3.0)":{type:"Farm_House"},"(5.0,0.0,4.0)":{type:"Dirt_Road"},"(5.0,0.0,5.0)":{type:"Dirt_Road"},"(5.0,0.0,6.0)":{type:"Dirt_Road"},"(5.0,0.0,7.0)":{type:"Wheat_Field",data:{craft:"Wheat",state:"Complete"}},"(5.0,0.0,8.0)":{type:"Pasture",data:{craft:"Feed",state:"Complete"}},"(5.0,0.0,9.0)":{type:"Arid"},"(6.0,0.0,0.0)":{type:"Scrub"},"(6.0,0.0,1.0)":{type:"Scrub"},"(6.0,0.0,10.0)":{type:"Arid"},"(6.0,0.0,11.0)":{type:"Arid"},"(6.0,0.0,12.0)":{type:"Scrub"},"(6.0,0.0,13.0)":{type:"Arid"},"(6.0,0.0,14.0)":{type:"Scrub"},"(6.0,0.0,15.0)":{type:"Scrub"},"(6.0,0.0,2.0)":{type:"Rock"},"(6.0,0.0,3.0)":{type:"Arid"},"(6.0,0.0,4.0)":{type:"Storehouse",data:{}},"(6.0,0.0,5.0)":{type:"Well",data:{craft:"Water",state:"Complete"}},"(6.0,0.0,6.0)":{type:"Arid"},"(6.0,0.0,7.0)":{type:"Wheat_Field",data:{craft:"Wheat",state:"Complete"}},"(6.0,0.0,8.0)":{type:"Arid"},"(6.0,0.0,9.0)":{type:"Arid"},"(7.0,0.0,0.0)":{type:"Arid"},"(7.0,0.0,1.0)":{type:"Arid"},"(7.0,0.0,10.0)":{type:"Arid"},"(7.0,0.0,11.0)":{type:"Cactus"},"(7.0,0.0,12.0)":{type:"Rock"},"(7.0,0.0,13.0)":{type:"Arid"},"(7.0,0.0,14.0)":{type:"Arid"},"(7.0,0.0,15.0)":{type:"Scrub"},"(7.0,0.0,2.0)":{type:"Scrub"},"(7.0,0.0,3.0)":{type:"Arid"},"(7.0,0.0,4.0)":{type:"Arid"},"(7.0,0.0,5.0)":{type:"Arid"},"(7.0,0.0,6.0)":{type:"Arid"},"(7.0,0.0,7.0)":{type:"Arid"},"(7.0,0.0,8.0)":{type:"Scrub"},"(7.0,0.0,9.0)":{type:"Arid"},"(8.0,0.0,0.0)":{type:"Arid"},"(8.0,0.0,1.0)":{type:"Arid"},"(8.0,0.0,10.0)":{type:"Arid"},"(8.0,0.0,11.0)":{type:"Cactus"},"(8.0,0.0,12.0)":{type:"Cactus"},"(8.0,0.0,13.0)":{type:"Arid"},"(8.0,0.0,14.0)":{type:"Arid"},"(8.0,0.0,15.0)":{type:"Arid"},"(8.0,0.0,2.0)":{type:"Arid"},"(8.0,0.0,3.0)":{type:"Arid"},"(8.0,0.0,4.0)":{type:"Scrub"},"(8.0,0.0,5.0)":{type:"Arid"},"(8.0,0.0,6.0)":{type:"Arid"},"(8.0,0.0,7.0)":{type:"Arid"},"(8.0,0.0,8.0)":{type:"Arid"},"(8.0,0.0,9.0)":{type:"Scrub"},"(9.0,0.0,0.0)":{type:"Scrub"},"(9.0,0.0,1.0)":{type:"Arid"},"(9.0,0.0,10.0)":{type:"Arid"},"(9.0,0.0,11.0)":{type:"Arid"},"(9.0,0.0,12.0)":{type:"Scrub"},"(9.0,0.0,13.0)":{type:"Scrub"},"(9.0,0.0,14.0)":{type:"Arid"},"(9.0,0.0,15.0)":{type:"Arid"},"(9.0,0.0,2.0)":{type:"Arid"},"(9.0,0.0,3.0)":{type:"Cactus"},"(9.0,0.0,4.0)":{type:"Scrub"},"(9.0,0.0,5.0)":{type:"Rock"},"(9.0,0.0,6.0)":{type:"Arid"},"(9.0,0.0,7.0)":{type:"Arid"},"(9.0,0.0,8.0)":{type:"Arid"},"(9.0,0.0,9.0)":{type:"Arid"}}}};
        loadTemplateGrid();
        renderGrid();
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
