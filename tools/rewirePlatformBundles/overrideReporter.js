var fs = require('fs');
var path = require('path');
var chalk = require('chalk');
var filesize = require('filesize');
var stripAnsi = require('strip-ansi');
var gzipSize = require('gzip-size').sync;

module.exports = function({ measureFileSizesBeforeBuild }) {
  return {
    measureFileSizesBeforeBuild: measureFileSizesBeforeBuild,
    printFileSizesAfterBuild: printFileSizesAfterBuild
  };
}

function printFileSizesAfterBuild(
  webpackStats,
  previousSizeMap,
  buildFolder,
  maxBundleGzipSize,
  maxChunkGzipSize
) {
  var root = previousSizeMap.root;
  var sizes = previousSizeMap.sizes;
  var assets = resolveWebpackStats(webpackStats, sizes, root, buildFolder);
  assets.sort((a, b) => b.size - a.size);
  var longestSizeLabelLength = Math.max.apply(
    null,
    assets.map(a => stripAnsi(a.sizeLabel).length)
  );
  var suggestBundleSplitting = false;
  assets.forEach(asset => {
    var sizeLabel = asset.sizeLabel;
    var sizeLength = stripAnsi(sizeLabel).length;
    if (sizeLength < longestSizeLabelLength) {
      var rightPadding = ' '.repeat(longestSizeLabelLength - sizeLength);
      sizeLabel += rightPadding;
    }
    var isMainBundle = asset.name.indexOf('main.') === 0;
    var maxRecommendedSize = isMainBundle
      ? maxBundleGzipSize
      : maxChunkGzipSize;
    var isLarge = maxRecommendedSize && asset.size > maxRecommendedSize;
    if (isLarge && path.extname(asset.name) === '.js') {
      suggestBundleSplitting = true;
    }
    console.log(
      '  ' +
        (isLarge ? chalk.yellow(sizeLabel) : sizeLabel) +
        '  ' +
        chalk.dim(asset.folder + path.sep) +
        chalk.cyan(asset.name)
    );
  });
  if (suggestBundleSplitting) {
    console.log();
    console.log(
      chalk.yellow('The bundle size is significantly larger than recommended.')
    );
    console.log(
      chalk.yellow(
        'Consider reducing it with code splitting: https://goo.gl/9VhYWB'
      )
    );
    console.log(
      chalk.yellow(
        'You can also analyze the project dependencies: https://goo.gl/LeUzfb'
      )
    );
  }
}

function resolveWebpackStats(webpackStats, sizes, root, buildFolder) {
  const statsJson = webpackStats.toJson();

  if (!statsJson.assets) { // case of many webpack configs
    return statsJson.children.reduce((acc, { assets }) => {
      return acc.concat(filterAssets(assets).map(getAssetStats(sizes, root, buildFolder)));
    }, []);
  } else {
    return filterAssets(statsJson.assets).map(getAssetStats(sizes, root, buildFolder));
  }
}

function filterAssets(assets) {
  return assets.filter(asset => {
    return /\.(js|css)$/.test(asset.name);
  });
}

function getAssetStats(sizes, root, buildFolder) {
  return (asset) => {
    var fileContents = fs.readFileSync(path.join(root, asset.name));
    var size = gzipSize(fileContents);
    var previousSize = sizes[removeFileNameHash(root, asset.name)];
    var difference = getDifferenceLabel(size, previousSize);
    return {
      folder: path.join(path.basename(buildFolder), path.dirname(asset.name)),
      name: path.basename(asset.name),
      size: size,
      sizeLabel: filesize(size) + (difference ? ' (' + difference + ')' : ''),
    };
  }
}

function removeFileNameHash(buildFolder, fileName) {
  return fileName
    .replace(buildFolder, '')
    .replace(
      /\/?(.*)(\.[0-9a-f]+)(\.chunk)?(\.js|\.css)/,
      (match, p1, p2, p3, p4) => p1 + p4
    );
}

// Input: 1024, 2048
// Output: "(+1 KB)"
function getDifferenceLabel(currentSize, previousSize) {
  var FIFTY_KILOBYTES = 1024 * 50;
  var difference = currentSize - previousSize;
  var fileSize = !Number.isNaN(difference) ? filesize(difference) : 0;
  if (difference >= FIFTY_KILOBYTES) {
    return chalk.red('+' + fileSize);
  } else if (difference < FIFTY_KILOBYTES && difference > 0) {
    return chalk.yellow('+' + fileSize);
  } else if (difference < 0) {
    return chalk.green(fileSize);
  } else {
    return '';
  }
}
