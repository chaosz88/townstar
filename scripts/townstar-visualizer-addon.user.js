// ==UserScript==
// @name         Town Star Visualizer Addon
// @namespace    http://tampermonkey.net/
// @version      0.7.0.0
// @description  Update citadelofthewind.
// @author       Oizys, Jehosephat, Kewlhwip, TruckTonka, LowCat
// @match        http*://citadelofthewind.com/wp-content/visualizer*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let editVisualizerObserver = new MutationObserver(function(mutations) {
        if (document.querySelector("#MainGrid") != null) {
            editVisualizerObserver.disconnect();
            EditVisualizer();
        }
    });
    editVisualizerObserver.observe(document, {attributes: true, childList: true , subtree: true});

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

            loadTownGuideEuSupport();
            loadStagesSupport();
        }
    });
    loadAfterTsvOperationObserver.observe(document, {attributes: true, childList: true , subtree: true});

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

    const stages = [];

    function loadStagesSupport() {
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
        // stageDelete.textContent = 'D';
        stageDelete.onclick = function() {
            DeleteActiveStage();
        };
        // https://cdn-icons-png.flaticon.com/512/1214/1214428.png
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

        // initialize stage.
        SetStageData(0, "First", grid.grid);
        LoadStages();
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
            && index < stages.length - 1
        ) {
            stages.splice(index,1);
            LoadStages();
            let newIndex = index < stages.length - 1 ? index : stages.length - 1;
            SetActiveStage(newIndex);
        }
    }

    function LoadStages() {
        const stageBody = document.querySelector('#stages-body');
        ClearChildren(stageBody);
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
            index = stages.length - 1;
        }

        return index;
    }

    function SetActiveStage(index) {
        const stageDivs = document.querySelectorAll('div.stage');
        stageDivs.forEach(div => {
            div.classList.remove('active');
        });
        document.querySelector('#stage-' + index).classList.add('active');

        // clear tile info content
        ClearChildren(document.querySelector('.tileinfopic'));
        const tileInfoTile = document.querySelector('.tileinfotitle');
        ClearChildren(tileInfoTile);
        tileInfoTile.textContent = 'Stage Info';
        ClearChildren(document.querySelector('.recipes'));

        ShowStageInfo();
        document.querySelector('#stage-name').value = stages[index].name;
        document.querySelector('#stage-import-export').value = JSON.stringify(stages[index].grid);

        SetGridByStage(stages[index]);
        renderGrid();
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

    function loadTownGuideEuSupport() {
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
        inputFilename.value = "TownGuideBuild";
        inputFilename.style.width = "115px";
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
            "stages": []
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

    const townGuideEuNames = {
        "Tomato": "Tomatoes",
    };

    function ConvertTownGuideEuName(name) {
        return !townGuideEuNames[name] ? name : townGuideEuNames[name];
    }

    function SetFromTownGuideEu(townGuideEuLayoutObject) {
        document.querySelector('#town-guide-eu-filename').value = townGuideEuLayoutObject.name;
        grid.northborder = GetVisualizerBorderType(townGuideEuLayoutObject.borders.North);
        grid.southborder = GetVisualizerBorderType(townGuideEuLayoutObject.borders.South);
        grid.eastborder = GetVisualizerBorderType(townGuideEuLayoutObject.borders.East);
        grid.westborder = GetVisualizerBorderType(townGuideEuLayoutObject.borders.West);
        grid.defaultType = "Grass";
        grid.grid = [];

        ClearArray(stages);
        const layoutStages = townGuideEuLayoutObject.stages;

        layoutStages.forEach((stage, index) => {
            const grid = [];
            const board = stage.board;
            for (let i = 0; i < dimension; i++) {
                for (let j = 0; j < dimension; j++) {
                    const cell = board[`(${j}.0,0.0,${i}.0)`];
                    grid.push({
                        type: ConvertTownGuideEuName(cell.type),
                        craft: ConvertTownGuideEuName(cell.craft),
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
            let gridCell = { type: cell.type };
            if (cell.craft) {
                gridCell.craft = cell.craft;
            }
            return gridCell;
        });
        stages[index] = {
            name: name,
            grid: filteredGrid,
        }
    }

    // SCRIPT
    AddFunction('getCraftIcon(craft)',
        "return getFullURL(recipes[craft].FileUrl);"
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

    async function EditVisualizer() {
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
            let url = `https://townstar.sandbox-games.com/${assetPath}`;
            if (assetPath.substring(0,4) == "http") {
                url = assetPath;
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
console.log('renderGrid');
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
console.log('updateExportGrid');
            exportGrid.northborder = grid.northborder;
            exportGrid.southborder = grid.southborder;
            exportGrid.eastborder = grid.eastborder;
            exportGrid.westborder = grid.westborder;
            SetStageByGrid();
            exportGrid.stages = stages;
            document.querySelector("#importexport").value = JSON.stringify(exportGrid);
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
                ClearArray(stages);
                if (importedGrid.grid.length <= 0) {
                    importedGrid.stages.forEach((stage, index) => {
                        SetStageData(index, stage.name, stage.grid);
                    });
                } else {
                    const grid = importedGrid.grid.map((cell) => {
                        let gridCell = {
                            type: cell.type,
                            edgeSatisfied: true,
                        };
                        if (cell.craft) {
                            gridCell.craft = cell.craft;
                        }
                        return gridCell;
                    });
                    SetStageData(0, "First", grid);
                }
                LoadStages();
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
                    if (building.ProximityEmit == "None") {
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
