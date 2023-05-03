// ==UserScript==
// @name         Town Star Visualizer Addon
// @namespace    http://tampermonkey.net/
// @version      0.6.0.1
// @description  Update citadelofthewind.
// @author       Oizys, Kewlhwip, TruckTonka, LowCat
// @match        http*://citadelofthewind.com/wp-content/visualizer*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let editVisualizerobserver = new MutationObserver(function(mutations) {
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
            DisplayProximity();
        };
        renderGrid();

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
                "Rare_Grand_Aquifer": [1],
                "Water_Pump": [1],
                "Diamond_Water_Pump": [2],
                "Rare_Water_Pump": [3]
            },
            Diamond_Charge_Station: {
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
            Haunted_Maze: {
                "Haunted_Maze_-_Zone_1": [6, 5, 4, 3, 2, 1],
                "Haunted_Maze_-_Zone_2": [4, 3, 2, 1],
                "Haunted_Maze_-_Zone_3": [4, 4, 4, 4],
                "Haunted_Maze_-_Zone_4": [2, 1]
            },
            Diamond_Water_Pump: {
                "Rare_Grand_Aquifer": [2, 1],
                "Water_Pump": [2],
                "Diamond_Water_Pump": [2],
                "Rare_Water_Pump": [6]
            },
            Diamond_Charge_Station: {
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

                let effectRadius = building.ProximityDist;
                let effects = building.ProximityEmit.split(",");
                let effectValue = effectRadius;
                let fixedEffectValue = 0;
                if (building.ProximityEmit == "None") {
                    effectRadius = 0;
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
                if (diamondChargeStation.includes(cell.type)) {
                    if (isDiamondChargeStation() == false) {
                        effectValue = originalNFTProximityBonuses.Diamond_Charge_Station[cell.type][0];
                        effectRadius = (originalNFTProximityBonuses.Diamond_Charge_Station[cell.type]).length;
                    } else {
                        effectValue = boostedNftProximityBonuses.Diamond_Charge_Station[cell.type][0];
                        effectRadius = (boostedNftProximityBonuses.Diamond_Charge_Station[cell.type]).length;
                    }
                }
                if (effectRadius == 0) continue;

                for (const index in effects) {
                    setTileProximity(i, effects[index], effectValue, effectRadius, fixedEffectValue);
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

        renderBuildingMenu();
        renderOverlaysOptions();
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
