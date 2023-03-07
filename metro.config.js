

const { getDefaultConfig } = require("metro-config");
module.exports = (async () => {
  try {
    const {
      resolver: { sourceExts, assetExts },
    } = await getDefaultConfig();
    return {
      transformer: {
        babelTransformerPath: require.resolve("react-native-svg-transformer"),
      },
      resolver: {
        assetExts: assetExts.filter((ext) => ext !== "svg"),
        sourceExts: [...sourceExts, "svg"],
      },
    };
  } catch (error) {
    console.error("Error fetching default config: ", error);
    return {
      transformer: {
        babelTransformerPath: require.resolve("react-native-svg-transformer"),
      },
      resolver: {
        assetExts: ["bmp", "gif", "jpg", "jpeg", "png", "psd", "svg", "webp"],
        sourceExts: ["js", "json", "ts", "tsx", "jsx"],
      },
    };
  }
})();
