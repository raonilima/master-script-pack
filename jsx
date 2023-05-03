// Rao Master Script Pack
// Version: 1.1.0

// Created by Raoni Lima (http://linktr.ee/raonilima)
// This is an experimental project using GPT-4 for atumation and efficiency in After Effects

function RAO_Master_Script_Pack(thisObj) {

    // Panel UI Build
    function createUI(thisObj) {
        var scriptVersionNumber = "1.2.0";
        var panel = (thisObj instanceof Panel) ? thisObj : new Window('palette', 'Raoni Master Script Pack ' + scriptVersionNumber, undefined, {resizeable: true});

        panel.grp = panel.add('group', undefined, 'Raoni Master Script Pack');
        panel.grp.orientation = 'column';
        panel.grp.alignChildren = ['left', 'top'];
        panel.grp.spacing = 10;
        panel.grp.margins = 16;

        // Resize Section
        panel.grp.resizeSection = panel.grp.add('panel', undefined, 'EASY COMP RESIZER');
        panel.grp.resizeSection.alignChildren = ['left', 'top'];
        panel.grp.resizeSection.spacing = 10;
        panel.grp.resizeSection.margins = 10;
        panel.grp.resizeSection.preferredSize.width = 200;

        var inputGroup = panel.grp.resizeSection.add('group');
        inputGroup.add('statictext', undefined, 'Width:');
        panel.grp.widthInput = inputGroup.add('edittext', undefined, '1920');
        panel.grp.widthInput.characters = 5;

        inputGroup.add('statictext', undefined, 'Height:');
        panel.grp.heightInput = inputGroup.add('edittext', undefined, '1080');
        panel.grp.heightInput.characters = 5;

        panel.grp.resizeBtn = panel.grp.resizeSection.add('button', undefined, 'Resize');
        panel.grp.resizeBtn.preferredSize = [180, 25];
        panel.grp.identifyDimensionsBtn = panel.grp.resizeSection.add('button', undefined, 'Identify Dimensions');
        panel.grp.identifyDimensionsBtn.preferredSize = [180, 25];

        // Rename Section
        panel.grp.renameSection = panel.grp.add('panel', undefined, 'BATCH COMP RENAMER');
        panel.grp.renameSection.alignChildren = ['left', 'top'];
        panel.grp.renameSection.spacing = 10;
        panel.grp.renameSection.margins = 10;
        panel.grp.renameSection.preferredSize.width = 200;

        panel.grp.updateAspectRatioBtn = panel.grp.renameSection.add('button', undefined, 'Update Aspect Ratio');
        panel.grp.updateAspectRatioBtn.preferredSize = [180, 25];

        panel.grp.newVersionBtn = panel.grp.renameSection.add('button', undefined, 'New Version');
        panel.grp.newVersionBtn.preferredSize = [180, 25];

        panel.grp.subVersionBtn = panel.grp.renameSection.add('button', undefined, 'New Sub-Version');
        panel.grp.subVersionBtn.preferredSize = [180, 25];

        panel.grp.resetVersionBtn = panel.grp.renameSection.add('button', undefined, 'Reset Version');
        panel.grp.resetVersionBtn.preferredSize = [180, 25];

        // True Duplicator Section
        panel.grp.duplicatorSection = panel.grp.add('panel', undefined, 'TRUE DUPLICATOR');
        panel.grp.duplicatorSection.alignChildren = ['left', 'top'];
        panel.grp.duplicatorSection.spacing = 10;
        panel.grp.duplicatorSection.margins = 10;
        panel.grp.duplicatorSection.preferredSize.width = 200;

        panel.grp.trueDuplicatorBtn = panel.grp.duplicatorSection.add('button', undefined, 'Duplicate Selected Composition');
        panel.grp.trueDuplicatorBtn.preferredSize = [180, 25];

        // Layer Management Section
        panel.grp.layerManagementSection = panel.grp.add('panel', undefined, 'LAYER BOSS');
        panel.grp.layerManagementSection.alignChildren = ['left', 'top'];
        panel.grp.layerManagementSection.spacing = 10;
        panel.grp.layerManagementSection.margins = 10;
        panel.grp.layerManagementSection.preferredSize.width = 200;

        // Layer Duplication and Cascade
        var layerDuplicationGroup = panel.grp.layerManagementSection.add('group');
        layerDuplicationGroup.add('statictext', undefined, 'Duplicate:');
        panel.grp.duplicateInput = layerDuplicationGroup.add('edittext', undefined, '1');
        panel.grp.duplicateInput.characters = 4;
        panel.grp.duplicateLayerBtn = layerDuplicationGroup.add('button', undefined, 'Duplicate');

        var layerCascadeGroup = panel.grp.layerManagementSection.add('group');
        layerCascadeGroup.add('statictext', undefined, 'Cascade:');
        panel.grp.layerManagementSection.cascadeInput = layerCascadeGroup.add('edittext', undefined, '1');
        panel.grp.layerManagementSection.cascadeInput.characters = 4;
        panel.grp.layerManagementSection.exponentialCascadeCheckbox = layerCascadeGroup.add('checkbox', undefined, 'Expo');
        panel.grp.layerManagementSection.cascadeBtn = layerCascadeGroup.add('button', undefined, 'Cascade');
        panel.grp.layerManagementSection.alignBtn = layerCascadeGroup.add('button', undefined, 'Align');

        // New Null Controller
        panel.grp.newNullControllerBtn = panel.grp.layerManagementSection.add('button', undefined, 'New Null Controller');
        panel.grp.newNullControllerBtn.preferredSize = [180, 25];

        // Button event listeners

        // Layer Management Event Listeners
        panel.grp.duplicateLayerBtn.onClick = function() {
            var numDuplicates = parseInt(panel.grp.duplicateInput.text);
            if (isNaN(numDuplicates) || numDuplicates < 1) {
                alert("Please enter a valid number for duplication.");
            } else {
                duplicateSelectedLayers(numDuplicates);
            }
        };

        panel.grp.layerManagementSection.cascadeBtn.onClick = function() {
            var comp = app.project.activeItem;
            if (comp && comp instanceof CompItem) {
                var layers = comp.selectedLayers.slice(0);
                var frames = parseInt(panel.grp.layerManagementSection.cascadeInput.text);
                var exponential = panel.grp.layerManagementSection.exponentialCascadeCheckbox.value;
                if (layers.length > 0) {
                    createCascade(frames, exponential);
                } else {
                    alert("No layers selected. Please select the layers you want to apply the cascade to.");
                }
            } else {
                alert("Please select a composition.");
            }
        };
        
        panel.grp.layerManagementSection.alignBtn.onClick = function() {
            var comp = app.project.activeItem;
            if (comp && comp instanceof CompItem) {
                var layers = comp.selectedLayers.slice(0);
                if (layers.length > 0) {
                    alignLayers();
                } else {
                    alert("No layers selected.\n\nPlease select the layers you want to align.");
                }
            }
        };   

        panel.grp.newNullControllerBtn.onClick = function() {
            createNewNullController();
        };

        panel.grp.resizeBtn.onClick = function () {
            var selectedComps = getSelectedCompositions();
            if (selectedComps.length === 0) {
                alert('Please select one or more compositions to resize.');
            } else {
                var width = parseInt(panel.grp.widthInput.text, 10);
                var height = parseInt(panel.grp.heightInput.text, 10);
                resizeCompositions(selectedComps, width, height);
            }
        };

        panel.grp.identifyDimensionsBtn.onClick = function () {
            var selectedComps = getSelectedCompositions();
            if (selectedComps.length === 0) {
                alert('Please select one or more compositions to identify dimensions.');
            } else {
                identifyDimensions(selectedComps);
            }
        };

        panel.grp.updateAspectRatioBtn.onClick = function () {
            var selectedComps = getSelectedCompositions();
            if (selectedComps.length === 0) {
                alert('Please select one or more compositions to update aspect ratio.');
            } else {
                updateAspectRatios(selectedComps);
            }
        };

        panel.grp.newVersionBtn.onClick = function () {
            var selectedComps = getSelectedCompositions();
            if (selectedComps.length === 0) {
                alert('Please select one or more compositions to create a new version.');
            } else {
                updateVersions(selectedComps, 'increment');
            }
        };

        panel.grp.subVersionBtn.onClick = function () {
            var selectedComps = getSelectedCompositions();
            if (selectedComps.length === 0) {
                alert('Please select one or more compositions to create a new sub-version.');
            } else {
                updateVersions(selectedComps, 'subIncrement');
            }
        };

        panel.grp.resetVersionBtn.onClick = function () {
            var selectedComps = getSelectedCompositions();
            if (selectedComps.length === 0) {
                alert('Please select one or more compositions to reset version.');
            } else {
                updateVersions(selectedComps, 'reset');
            }
        };

        panel.grp.trueDuplicatorBtn.onClick = function () {
            trueDuplicator();
        };

        if (panel instanceof Window) {
            panel.center();
            panel.show();
        } else {
            panel.layout.layout(true);
        }
        // Footer group
        panel.footerGroup = panel.add('group', undefined);
        panel.footerGroup.orientation = 'row';

        // Add help button
        panel.helpButton = panel.footerGroup.add('button', undefined, '?');
        panel.helpButton.maximumSize = [20, 20];
        panel.helpButton.onClick = function() {
            alert('Raoni Master Script Pack\n\nThis is an experimental project made with the help of GPT-4 AI chatbot.\n\nPlease report if you find any bugs or want specific functions tailored for you :)\n\nVersion: ' + scriptVersionNumber + ' | Created by Raoni Lima\nContact & links: http://linktr.ee/raonilima');
        };

        // Add credits and versioning
        panel.credits = panel.footerGroup.add('statictext', undefined, 'Created by Raoni Lima | Version: ' + scriptVersionNumber);
        panel.credits.alignment = 'left';
        panel.credits.characters = 40;

        panel.layout.layout(true);

    }

    // True Duplicator Functionality
    function duplicateHierarchy(sourceItem, destFolder) {
        if (!(sourceItem instanceof FolderItem)) {
            var duplicatedItem = sourceItem.duplicate();
            duplicatedItem.parentFolder = destFolder;
            return duplicatedItem;
        }

        var newFolder = app.project.items.addFolder(sourceItem.name);
        newFolder.parentFolder = destFolder;

        for (var i = 1; i <= sourceItem.numItems; i++) {
            duplicateHierarchy(sourceItem.item(i), newFolder);
        }
    }

    function trueDuplicator() {
        var selectedItem = app.project.activeItem;

        if (!selectedItem || !(selectedItem instanceof CompItem)) {
            alert('Please select a composition to duplicate.');
            return;
        }

        var duplicatesFolder = app.project.items.addFolder('Duplicated Compositions');
        app.beginUndoGroup('True Duplicator');
        duplicateHierarchy(selectedItem, duplicatesFolder);
        app.endUndoGroup();
    }

    // Auto Comp Handler Functionality
    function getSelectedCompositions() {
        var items = app.project.items;
        var selectedCompositions = [];
        for (var i = 1; i <=  items.length; i++) {
            var item = items[i];
            if (item.selected && item instanceof CompItem) {
                selectedCompositions.push(item);
            }
        }
        return selectedCompositions;
    }

    function getAspectRatio(comp) {
        var width = comp.width;
        var height = comp.height;

        var gcd = function (a, b) {
            if (b === 0) return a;
            return gcd(b, a % b);
        };

        var divisor = gcd(width, height);
        return (width / divisor) + 'x' + (height / divisor);
    }

    function updateAspectRatios(comps) {
        var versionRegex = /(v\d+([a-zA-Z])?)$/;

        for (var i = 0; i < comps.length; i++) {
            var comp = comps[i];
            var aspectRatio = getAspectRatio(comp);

            var currentName = comp.name;
            var newName;

            if (/\d+x\d+/.test(currentName)) {
                newName = currentName.replace(/(\d+x\d+)/, aspectRatio);
            } else {
                if (versionRegex.test(currentName)) {
                    newName = currentName.replace(versionRegex, aspectRatio + ' $1');
                } else {
                    newName = currentName + ' ' + aspectRatio;
                }
            }
            comp.name = newName;
        }
    }

    function resizeCompositions(comps, width, height) {
        app.beginUndoGroup('Resize Compositions');
        for (var i = 0; i < comps.length; i++) {
            var comp = comps[i];
            comp.width = width;
            comp.height = height;
        }
        app.endUndoGroup();
    }

    function identifyDimensions(comps) {
        for (var i = 0; i < comps.length; i++) {
            var comp = comps[i];
            var width = comp.width;
            var height = comp.height;
            var aspectRatio = getAspectRatio(comp);
            alert("Comp Name: " + comp.name + "\nWidth: " + width + "\nHeight: " + height + "\nAspect Ratio: " + aspectRatio);
        }
    }

    function updateVersions(comps, action) {
        app.beginUndoGroup('Update Versions');
        for (var i = 0; i < comps.length; i++) {
            var comp = comps[i];
            var currentName = comp.name;
            var versionRegex = /(?:^|\s)(v\d+([a-zA-Z])?)(?:\s|$)/;
            var newName;
            var reseted;

            if (versionRegex.test(currentName)) {
                newName = currentName.replace(versionRegex, function (match, p1, p2) {
                    var versionNumber = parseInt(p1.substring(1), 10);
                    var subVersion = p2 || '';

                    if (action === 'increment') {
                        versionNumber++;
                        subVersion = '';
                        reseted = false;
                    } else if (action === 'subIncrement') {
                        if (subVersion === '') {
                            subVersion = 'A';
                        } else {
                            if (subVersion == 'Z') {
                                versionNumber++;
                                subVersion = 'A';
                            } else {
                                subVersion = String.fromCharCode(subVersion.charCodeAt() + 1);
                            }
                        }
                        reseted = false;
                    } else if (action === 'reset') {
                        reseted = true;
                    }

                    if (reseted == true) {
                        return '';
                    } else {
                        return ' v' + versionNumber + subVersion;
                    }
                });
            } else {
                if (action !== 'reset') {
                    newName = currentName + ' v1';
                } else {
                    newName = currentName;
                }
            }

            comp.name = newName;
        }
        app.endUndoGroup();
    }

    // Layer Cascade Functionality
    function createCascade(numFrames, exponential) {
        app.beginUndoGroup('Layer Cascade');
        var comp = app.project.activeItem;
        if (comp && comp instanceof CompItem) {
            var selectedLayers = comp.selectedLayers;
            if (selectedLayers.length < 2) {
                alert('Please select at least two layers.');
            } else {
                for (var i = 0; i < selectedLayers.length; i++) {
                    var layer = selectedLayers[i];
                    var frameDuration = comp.frameDuration;
                    var cascadeDelay;
    
                    if (exponential) {
                        cascadeDelay = Math.pow(i, 2) * numFrames * frameDuration;
                    } else {
                        cascadeDelay = i * numFrames * frameDuration;
                    }
                    layer.startTime += cascadeDelay;
                }
            }
        } else {
            alert('Please select a composition first.');
        }
        app.endUndoGroup();
    }

    // Layer Alignment Functionality
    function alignLayers() {
        app.beginUndoGroup('Layer Align');
        var comp = app.project.activeItem;
        if (comp && comp instanceof CompItem) {
            var selectedLayers = comp.selectedLayers;
            if (selectedLayers.length < 2) {
                alert('Please select at least two layers.');
            } else {
                for (var i = 0; i < selectedLayers.length; i++) {
                    var layer = selectedLayers[i];
                    layer.startTime = 0;
                }
            }
        } else {
            alert('Please select a composition first.');
        }
        app.endUndoGroup();
    }
    

    // Duplicate Layer Functionality
    function duplicateSelectedLayers(numDuplicates) {
        app.beginUndoGroup('Duplicate Layers');
        var comp = app.project.activeItem;
        if (comp && comp instanceof CompItem) {
            var selectedLayers = comp.selectedLayers.slice(0);
            if (selectedLayers.length < 1) {
                alert('Please select at least one layer.');
            } else {
                for (var i = 0; i < selectedLayers.length; i++) {
                    var layer = selectedLayers[i];
                    for (var j = 0; j < numDuplicates; j++) {
                        var duplicatedLayer = layer.duplicate();
                        duplicatedLayer.moveAfter(layer);
                    }
                }
            }
        } else {
            alert('Please select a composition first.');
        }
        app.endUndoGroup();
    }
    

    // New Null Controller Functionality
    function createNewNullController() {
        var activeItem = app.project.activeItem;
        var selectedLayers = activeItem.selectedLayers;
        app.beginUndoGroup("New Null Controller");

        var nullController = activeItem.layers.addNull();
        nullController.name = "Null Controller";
        nullController.moveToBeginning();
        nullController.position.setValue([activeItem.width / 2, activeItem.height / 2]);

        for (var i = 0; i < selectedLayers.length; i++) {
            var layer = selectedLayers[i];
            layer.parent = nullController;
        }

        app.endUndoGroup();
    }

    createUI(thisObj);
}

RAO_Master_Script_Pack(this);
