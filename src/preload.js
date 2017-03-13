export function loadImage(fileName) {
  return new Promise((resolve) => {
    let image = document.createElement("img");
    image.onload = _ => resolve(image);
    image.src = fileName;
  });
}

export function loadPrefabs(filename) {
  let terrainMatcher = /^TERRAIN: (\S+) = (\w+)/;
  let nameMatcher = /^NAME: (\w+)/;
  let weightMatcher = /^WEIGHT: (\d+)/;
  return new Promise((resolve) => {
    fetch(filename).then(response => {
      let tiles = {};
      let prefabs = {};
      response.text().then(text => {
        let lines = text.split('\n');
        let currentName = 'garbage';
        prefabs[currentName] = {name: currentName, weight: 0, tiles:[]};
        while (lines.length > 0) {
          let line = lines.shift();
          if (terrainMatcher.test(line)) {
            let [_, char, terrain] = line.match(terrainMatcher);
            tiles[char] = terrain;
          } else if (nameMatcher.test(line)) {
            let [_, name] = line.match(nameMatcher);
            prefabs[name] = {name, weight: 0, tiles:[]};
            currentName = name;
          } else if (weightMatcher.test(line)) {
            let [_, weight] = line.match(weightMatcher);
            prefabs[currentName].weight = weight
          } else if (line.trim() === 'MAP') { 
            while ( lines.length > 0 && line.trim() !== 'ENDMAP') {
              let line = lines.shift();
              if (line.trim() !== 'ENDMAP') {
                prefabs[currentName].tiles.push(line.split('').map(char=>tiles[char]));
              } else {
                prefabs[currentName].width = prefabs[currentName].tiles[0].length;
                prefabs[currentName].height = prefabs[currentName].tiles.length;
                break;
              }
            }
          }
        }
        delete prefabs.garbage;
        resolve(prefabs);
      });
    });
  });
}

export function loadTileMap(filename, tileWidth, tileHeight) {
  let tileMapMatcher = /^(\w+)\s+(\d+)\s+(\d+)/;
  return new Promise((resolve) => {
    fetch(filename).then(response => {
      let char = 32
      const nextChar = function() {
        return String.fromCharCode(char++);
      };
      let tiles = {};
      let tileMap = {};
      response.text().then(text => {
        let lines = text.split('\n');
        while (lines.length > 0) {
          let line = lines.shift();
          if (tileMapMatcher.test(line)) {
            let [_, name, x, y] = line.match(tileMapMatcher);
            tiles[name] = nextChar();
            tileMap[tiles[name]] = [x*tileWidth, y*tileHeight];
          }
        }
        resolve({tileMap, tiles});
      });
    });
  });
}